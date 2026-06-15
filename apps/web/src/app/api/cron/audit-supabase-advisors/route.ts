import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M6 — Supabase advisor watch-list.
//
// Supabase exposes /v1/projects/{ref}/advisors which returns security +
// performance lints (missing indexes, RLS gaps, SECURITY DEFINER misuse,
// etc.). The 2026-05-22 spatial_ref_sys exposure took manual investigation
// to surface; ditto the 2026-05-23 egress freeze. Nothing in our code
// polls these advisors — they're only seen via the dashboard or MCP.
//
// This cron calls the Management API every 6h, diffs against the last
// snapshot stored in ops_reports, and alerts when a NEW ERROR-level lint
// appears (or a previously-resolved one comes back). Known false-positives
// are filtered out via the ALLOW_LIST.
//
// Auth: Supabase Management API personal access token (SUPABASE_PAT env).
// Without it, the cron will skip with a clear error instead of failing.

const ALERT_TO = "taneja.ashish5@gmail.com";
const PROJECT_REF = "dudzsdzfvikjjhurxrgc";

// Cache keys of known false positives or intentional design choices we
// don't want to be re-alerted about. Each entry should have a one-line
// justification.
const ALLOW_LIST: Record<string, string> = {
  // Per memory/session_2026_05_22_spatial_ref_sys_write_guard.md — PostgREST
  // db-pre-request hook guards write access at the role level; lint stays
  // RED because Supabase's check is RLS-flag-only but the hole IS closed.
  "rls_disabled_in_public_public_spatial_ref_sys": "guarded by pgrst.db_pre_request role hook (2026-05-22)",
  // PostGIS + vector intentionally in public schema — moving them would
  // break every geography/embedding query in the app.
  "extension_in_public_postgis": "intentional — moving breaks every geography query",
  "extension_in_public_vector": "intentional — moving breaks embedding queries",
};

type Lint = {
  name: string;
  title: string;
  level: "INFO" | "WARN" | "ERROR";
  categories: string[];
  detail: string;
  cache_key: string;
  metadata?: Record<string, unknown>;
  remediation?: string;
};

async function fetchAdvisors(pat: string, type: "security" | "performance"): Promise<Lint[]> {
  // Supabase moved advisors from the `?type=` query form to a path segment
  // (`/advisors/security` | `/advisors/performance`) — the old query form
  // started 404'ing ~2026-06-14, producing the daily "audit-supabase-advisors
  // errored" DEGRADED alert (advisors fetch failed: 404). Response shape is
  // unchanged: { lints: [...] }.
  const url = `https://api.supabase.com/v1/projects/${PROJECT_REF}/advisors/${type}`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${pat}` } });
  if (!r.ok) throw new Error(`advisors fetch ${type} failed: ${r.status}`);
  const body = await r.json();
  return (body?.lints ?? []) as Lint[];
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const supabaseUrlEarly = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKeyEarly = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Failure-path heartbeat. Without this, a missing PAT or Management-API
  // outage produces ZERO ops_reports rows — and the watchdog can't tell that
  // apart from "the cron never fired". The 2026-05-28 DEGRADED email
  // (audit-supabase-advisors = missing) was caused by SUPABASE_PAT being
  // unset on Vercel after the M1-M7 deploy; surface that with a clear summary
  // (needs_review for a config gap, errored for a real API failure), not as
  // missing — see logFailure's severity split below.
  async function logFailure(reason: string, detail: string): Promise<void> {
    if (!supabaseUrlEarly || !serviceKeyEarly) return;
    // config_missing (SUPABASE_PAT not yet on Vercel) is a known setup gap,
    // NOT a live degradation — surface it as needs_review (yellow, Monday-
    // digest only) so it stops firing the daily DEGRADED alert. A genuine
    // Management-API failure stays ok:false → errored (red, daily alert).
    // Watchdog: ok:false → errored; ok:true + alerts_count>0 → needs_review.
    const isConfigMissing = reason === "config_missing";
    try {
      const supa = createClient(supabaseUrlEarly, serviceKeyEarly);
      await supa.from("ops_reports").insert({
        job: "audit-supabase-advisors",
        summary: { reason, detail },
        alerts_count: isConfigMissing ? 1 : 0,
        ok: isConfigMissing ? true : false,
      });
    } catch {
      // Best-effort. If logging itself fails, the watchdog will still see
      // "missing" — same state we'd be in without this hook.
    }
  }

  const pat = process.env.SUPABASE_PAT;
  if (!pat) {
    await logFailure(
      "config_missing",
      "SUPABASE_PAT env var not set — cannot reach Management API. Create a PAT at https://supabase.com/dashboard/account/tokens and add as Vercel env var."
    );
    return NextResponse.json({
      ok: false,
      error: "SUPABASE_PAT env var not set — cannot reach Management API. Create a PAT at https://supabase.com/dashboard/account/tokens and add as Vercel env var.",
    }, { status: 503 });
  }

  let security: Lint[], performance: Lint[];
  try {
    [security, performance] = await Promise.all([
      fetchAdvisors(pat, "security"),
      fetchAdvisors(pat, "performance"),
    ]);
  } catch (e: unknown) {
    const detail = (e as Error)?.message ?? "unknown error";
    await logFailure("management_api_failed", detail);
    return NextResponse.json({ ok: false, error: detail }, { status: 503 });
  }

  const all = [...security, ...performance];
  // Drop allow-listed cache_keys.
  const active = all.filter((l) => !(l.cache_key in ALLOW_LIST));
  const allowed = all.filter((l) => l.cache_key in ALLOW_LIST);
  const errors = active.filter((l) => l.level === "ERROR");
  const warns = active.filter((l) => l.level === "WARN");

  let newErrors: Lint[] = [];
  let resolvedErrors: string[] = [];

  if (supabaseUrlEarly && serviceKeyEarly) {
    const supabase = createClient(supabaseUrlEarly, serviceKeyEarly);

    // Read the most recent snapshot to compute the diff. We compare by
    // cache_key — that's Supabase's stable identifier for each lint.
    const { data: prior } = await supabase
      .from("ops_reports")
      .select("summary")
      .eq("job", "audit-supabase-advisors")
      .order("run_at", { ascending: false })
      .limit(1);

    // Type-safe extraction of prior cache keys.
    let priorErrorKeys: Set<string> = new Set();
    if (prior?.[0]?.summary && typeof prior[0].summary === "object") {
      const summary = prior[0].summary as { errors?: Array<{ cache_key?: string }> };
      const keys = summary.errors?.map((e) => e.cache_key).filter((k): k is string => typeof k === "string");
      if (keys) priorErrorKeys = new Set(keys);
    }
    const currentErrorKeys = new Set(errors.map((e) => e.cache_key));
    newErrors = errors.filter((e) => !priorErrorKeys.has(e.cache_key));
    resolvedErrors = [...priorErrorKeys].filter((k) => !currentErrorKeys.has(k));

    await supabase.from("ops_reports").insert({
      job: "audit-supabase-advisors",
      summary: {
        security_count: security.length,
        performance_count: performance.length,
        allowed_count: allowed.length,
        errors: errors.map((e) => ({ cache_key: e.cache_key, title: e.title, detail: e.detail.slice(0, 200) })),
        warn_count: warns.length,
        new_errors: newErrors.map((e) => e.cache_key),
        resolved_errors: resolvedErrors,
      },
      alerts_count: newErrors.length,
      ok: newErrors.length === 0,
    });
  }

  let emailed = false;
  if (newErrors.length > 0 || resolvedErrors.length > 0) {
    const resend = getResend();
    if (resend) {
      try {
        const text = renderText(newErrors, resolvedErrors, errors, warns);
        const html = renderHtml(newErrors, resolvedErrors, errors, warns);
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] Supabase advisors — ${newErrors.length} new ERROR(s), ${resolvedErrors.length} resolved`,
          html,
          text,
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-supabase-advisors] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: newErrors.length === 0,
    security_count: security.length,
    performance_count: performance.length,
    errors_count: errors.length,
    warns_count: warns.length,
    allowed_count: allowed.length,
    new_errors: newErrors.map((e) => ({ cache_key: e.cache_key, title: e.title, detail: e.detail })),
    resolved_errors: resolvedErrors,
    alert_emailed: emailed,
  });
}

function renderText(newErrors: Lint[], resolved: string[], allErrors: Lint[], warns: Lint[]): string {
  const lines: string[] = [];
  lines.push(`NakshIQ Supabase advisors — ${newErrors.length} NEW ERROR(s), ${resolved.length} resolved.`);
  lines.push(`Active ERRORs: ${allErrors.length} · Active WARNs: ${warns.length}\n`);
  if (newErrors.length > 0) {
    lines.push(`NEW ERRORS:`);
    newErrors.forEach((e) => {
      lines.push(`  • ${e.title}`);
      lines.push(`    ${e.detail.slice(0, 300)}`);
      if (e.remediation) lines.push(`    ${e.remediation}`);
    });
  }
  if (resolved.length > 0) {
    lines.push(`\nRESOLVED (previously errored, now gone):`);
    resolved.forEach((k) => lines.push(`  • ${k}`));
  }
  return lines.join("\n");
}

function renderHtml(newErrors: Lint[], resolved: string[], allErrors: Lint[], warns: Lint[]): string {
  const newRows = newErrors
    .map(
      (e) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#dc2626;font-weight:600">NEW</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${e.title}</td>
      <td style="padding:8px 12px;font-size:13px;line-height:1.4">${e.detail.slice(0, 300)}${e.remediation ? `<br><a href="${e.remediation}">Remediation</a>` : ""}</td>
    </tr>`
    )
    .join("");
  const resolvedRows = resolved
    .map(
      (k) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#16a34a;font-weight:600">RESOLVED</td>
      <td colspan="2" style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#525252">${k}</td>
    </tr>`
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:900px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Supabase advisors — ${newErrors.length} new, ${resolved.length} resolved</h1>
    <p style="color:#525252;margin:0 0 16px">Active total: ${allErrors.length} ERROR(s), ${warns.length} WARN(s)</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Status</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Title</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Detail</th>
      </tr></thead>
      <tbody>${newRows}${resolvedRows}</tbody>
    </table>
  </body></html>`;
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Worst case (full outage): every probe burning its 15s timeout + a retry
// pass — 60s is not enough, 120s is.
export const maxDuration = 120;

// Content canary. Runs every 30 minutes. GETs one representative URL per
// surface family and asserts it actually RENDERS: status 200, body above an
// error-shell-sized floor, no Next error shell, and (where a cheap stable
// marker exists) the content marker itself — e.g. the explore catalog count
// must be >= 500 and destination pages must render a confidence card.
//
// This monitor exists because of 2026-06-10: 14 destination pages served 500s
// (null jsonb × unguarded renderer) and /explore cached "0 places" for 6h —
// both found by the founder, not by tooling. audit-cache-headers (M1) checks
// HEADERS hourly; this checks CONTENT every 30 min. Detection target: ≤30min.
//
// Alert policy: any failure after one retry → email, but deduped against the
// previous run's failure set (no 48-email storms while something is down) +
// a recovery email when a failing canary goes green again.

const ALERT_TO = "taneja.ashish5@gmail.com";
const BASE = "https://www.nakshiq.com";

type Probe = {
  path: string;
  family: string;
  // body must contain this string (cheap render-proof marker)
  marker?: string;
  // body must match this regex with a capture group >= minCount
  countPattern?: RegExp;
  minCount?: number;
  // body-size floor in bytes; Next's error shell is ~10KB (default 20000)
  minBytes?: number;
};

const PROBES: Probe[] = [
  { path: "/en", family: "homepage", minBytes: 50000 },
  // explore headline is `{destinations.length} places,` — the 2026-06-10 "0 places" class
  { path: "/en/explore", family: "explore", countPattern: /(\d+)(?:<!-- -->)?\s*places,/, minCount: 500 },
  { path: "/hi/explore", family: "explore (hi)", countPattern: /(\d+)(?:<!-- -->)?\s*places,/, minCount: 500 },
  // "Safety Rating" is a rendered-only literal (NOT in the i18n catalog) —
  // proves the confidence card mounted. katra = the null-heavy row class.
  { path: "/en/destination/jaipur", family: "destination", marker: "Safety Rating", minBytes: 50000 },
  { path: "/en/destination/katra", family: "destination (null-heavy card)", marker: "Safety Rating", minBytes: 50000 },
  { path: "/hi/destination/jaipur", family: "destination (hi)", minBytes: 50000 },
  { path: "/en/destination/chakrata/june", family: "destination/month" },
  { path: "/en/vs/kasauli-vs-manali", family: "vs" },
  { path: "/en/cost/manali", family: "cost" },
  { path: "/en/festivals", family: "festivals hub" },
  { path: "/en/itinerary/jaipur", family: "itinerary" },
  // "Within 3 hours" = the first drive-time band heading; it only renders when
  // the PostGIS RPC returned destinations. Without this marker the canary went
  // green on a baked "000 destinations" empty page (2026-06-14, delhi).
  { path: "/en/weekend-from-delhi", family: "weekend-from (PostGIS RPC)", marker: "Within 3 hours" },
  { path: "/en/collections", family: "collections hub" },
  { path: "/en/sos", family: "sos" },
  { path: "/en/pilgrimage/char-dham", family: "pilgrimage" },
  { path: "/en/safari/ranthambore", family: "safari" },
];

// /api/search-index feeds all 3 client search surfaces — probe it as JSON.
const SEARCH_INDEX_MIN = 500;

type ProbeResult = {
  path: string;
  family: string;
  status: number;
  bytes: number;
  problems: string[];
};

async function fetchBody(url: string): Promise<{ status: number; body: string }> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const r = await fetch(url, {
      headers: { "user-agent": "NakshIQ-ContentCanary/1.0" },
      cache: "no-store",
      signal: ctrl.signal,
    });
    return { status: r.status, body: await r.text() };
  } finally {
    clearTimeout(t);
  }
}

async function runProbe(p: Probe): Promise<ProbeResult> {
  const problems: string[] = [];
  let status = 0;
  let bytes = 0;
  try {
    const { status: s, body } = await fetchBody(`${BASE}${p.path}`);
    status = s;
    bytes = Buffer.byteLength(body);
    if (s !== 200) problems.push(`status ${s}`);
    if (bytes < (p.minBytes ?? 20000)) problems.push(`only ${bytes}B`);
    if (body.includes("__next_error__")) problems.push("Next error shell");
    if (p.marker && !body.includes(p.marker)) problems.push(`marker "${p.marker}" missing`);
    if (p.countPattern) {
      const m = body.match(p.countPattern);
      const n = m ? Number(m[1]) : 0;
      if (n < (p.minCount ?? 1)) problems.push(`count ${n} < ${p.minCount}`);
    }
  } catch (e: unknown) {
    problems.push(`fetch failed: ${(e as Error)?.message ?? "unknown"}`);
  }
  return { path: p.path, family: p.family, status, bytes, problems };
}

async function probeSearchIndex(): Promise<ProbeResult> {
  const problems: string[] = [];
  let status = 0;
  let bytes = 0;
  try {
    const { status: s, body } = await fetchBody(`${BASE}/api/search-index`);
    status = s;
    bytes = Buffer.byteLength(body);
    if (s !== 200) problems.push(`status ${s}`);
    else {
      const n = (JSON.parse(body)?.destinations ?? []).length;
      if (n < SEARCH_INDEX_MIN) problems.push(`destinations ${n} < ${SEARCH_INDEX_MIN}`);
    }
  } catch (e: unknown) {
    problems.push(`fetch/parse failed: ${(e as Error)?.message ?? "unknown"}`);
  }
  return { path: "/api/search-index", family: "search index", status, bytes, problems };
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const started = Date.now();

  // First pass, 4-way concurrency.
  const queue = [...PROBES];
  const firstPass: ProbeResult[] = [];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const p = queue.shift();
        if (p) firstPass.push(await runProbe(p));
      }
    }),
  );
  firstPass.push(await probeSearchIndex());

  // Retry failures once after 3s — a single transient blip is not an incident.
  let results = firstPass;
  if (firstPass.some((r) => r.problems.length)) {
    await new Promise((r) => setTimeout(r, 3000));
    results = await Promise.all(
      firstPass.map(async (r) => {
        if (!r.problems.length) return r;
        if (r.path === "/api/search-index") return probeSearchIndex();
        const probe = PROBES.find((p) => p.path === r.path);
        return probe ? runProbe(probe) : r;
      }),
    );
  }

  const failures = results.filter((r) => r.problems.length);
  const ok = failures.length === 0;
  const failureKey = failures.map((f) => `${f.path}:${f.problems[0]}`).sort().join("|");

  // Dedupe alerts against the previous run so a sustained outage emails once,
  // and a recovery emails once.
  let prevOk = true;
  let prevKey = "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null;
  if (supabase) {
    const { data: prev } = await supabase
      .from("ops_reports")
      .select("ok, summary")
      .eq("job", "canary-probe")
      .order("run_at", { ascending: false })
      .limit(1);
    if (prev?.length) {
      prevOk = prev[0].ok !== false;
      prevKey = (prev[0].summary as { failure_key?: string })?.failure_key ?? "";
    }
    await supabase.from("ops_reports").insert({
      job: "canary-probe",
      summary: {
        total: results.length,
        duration_ms: Date.now() - started,
        failure_key: failureKey,
        failures: failures.map((f) => ({ path: f.path, status: f.status, problems: f.problems })),
      },
      alerts_count: failures.length,
      ok,
    });
  }

  const shouldEmail = (!ok && failureKey !== prevKey) || (ok && !prevOk);
  let emailed = false;
  if (shouldEmail) {
    const resend = getResend();
    if (resend) {
      try {
        const subject = ok
          ? "[NakshIQ ops] canary RECOVERED — all surfaces rendering again"
          : `[NakshIQ ops] canary FAILED — ${failures.length}/${results.length} surfaces broken on prod`;
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject,
          text: renderAlertText(ok, failures, results.length),
          html: renderAlertHtml(ok, failures, results.length),
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[canary-probe] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok,
    total: results.length,
    failures_count: failures.length,
    failures,
    alert_emailed: emailed,
    duration_ms: Date.now() - started,
  });
}

function renderAlertText(ok: boolean, failures: ProbeResult[], total: number): string {
  if (ok) return `All ${total} canary surfaces are rendering again. No action needed.`;
  const lines: string[] = [];
  lines.push(`${failures.length} of ${total} prod surfaces are broken right now:\n`);
  failures.forEach((f) => {
    lines.push(`  • ${f.family} — ${BASE}${f.path}`);
    lines.push(`      ${f.problems.join("; ")} (status ${f.status})`);
  });
  lines.push(`\nThe canary re-checks every 30 minutes; you'll get one email when the`);
  lines.push(`failure set changes and one when it recovers. Ask Claude to investigate:`);
  lines.push(`"canary failed — check ops_reports job canary-probe and the failing URLs".`);
  return lines.join("\n");
}

function renderAlertHtml(ok: boolean, failures: ProbeResult[], total: number): string {
  if (ok) {
    return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:800px;margin:0 auto;padding:24px">
      <h1 style="font-size:20px;margin:0 0 8px">Canary: <span style="color:#16a34a">RECOVERED</span></h1>
      <p style="color:#525252">All ${total} prod surfaces are rendering again. No action needed.</p>
    </body></html>`;
  }
  const rows = failures
    .map(
      (f) => `<tr>
      <td style="padding:8px 12px;font-size:12px;color:#525252">${f.family}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;word-break:break-all"><a href="${BASE}${f.path}">${f.path}</a></td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#dc2626">${f.problems.join("; ")}</td>
    </tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:800px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Canary: <span style="color:#dc2626">FAILED</span></h1>
    <p style="color:#525252;margin:0 0 16px">${failures.length} of ${total} prod surfaces are broken right now.</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Surface</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">URL</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Problem</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#525252;font-size:12px;margin:16px 0 0">Re-checks every 30 min; one email per failure-set change + one on recovery. Ask Claude: "canary failed — check ops_reports job canary-probe and the failing URLs".</p>
  </body></html>`;
}

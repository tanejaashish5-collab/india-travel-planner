import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M2 + M3 — GSC audit alerts.
//
// The 2026-05-27 audit-gap investigation found that the daily GSC audit
// markdown files (gsc-audits/gsc-audit-YYYY-MM-DD.md) contain the signals
// we needed to catch the ISR regression on day 1, but no automated logic
// reads them to fire alerts. Specifically:
//
//   M2 — Indexed-pages drop alert
//     • Indexed-page count dropped from 14.1K (2026-04-25) → 10.5K
//       (2026-05-15) — a 3,600-page deindexing — and the audits noted
//       it in prose but never escalated.
//     • The same indexed-page count was reported for 4+ consecutive
//       audits (2026-05-19 → 5/25) — a "frozen snapshot" pattern that
//       the audit prose flagged but no alert handled.
//
//   M3 — Per-cohort click delta
//     • Top-10 page tables in each audit show which URL prefixes own
//       clicks. The destination/month family lost share through the
//       regression while hub pages compensated, so property-level
//       totals stayed green.
//
// This cron reads the most recent N GSC audit markdowns from
// gsc-audits/, parses indexed-page count and top-10 page tables, runs
// the alert rules, and persists results to ops_reports. Resend alerts
// fire on any structural finding.
//
// Reads via the repo filesystem on Vercel — these markdowns are
// committed to git and shipped in the build.

const ALERT_TO = "taneja.ashish5@gmail.com";

// Rolling window — 14 days is enough to catch both the slow-decline
// pattern (3 weeks total in the original regression) and the
// snapshot-frozen pattern (8 days). Older runs are read for the rolling
// baseline but not analyzed.
const ANALYSIS_WINDOW_DAYS = 14;

// Thresholds. Each tuned to fire on the ORIGINAL regression but not on
// the normal day-to-day GSC noise.
const INDEXED_DROP_PCT = 5;          // -5% week-over-week = alert
const INDEXED_FROZEN_RUN_LIMIT = 3;  // same number 3 audits in a row = alert
const COHORT_CLICKS_DROP_PCT = 30;   // -30% rolling 7d vs prior 7d = alert
const COHORT_MIN_CLICKS = 20;        // below this, sample too small

type AuditFile = { date: string; path: string; raw: string };
type ParsedAudit = {
  date: string;
  indexed_pages: number | null;
  // Top-10 page tables, captured as { url, clicks, impressions }.
  top_pages: Array<{ url: string; clicks: number; impressions: number }>;
};

function urlPrefix(url: string): string {
  // Bucket into route families. Order matters — most specific first.
  const u = url.toLowerCase();
  const families: Array<[RegExp, string]> = [
    [/^\/?(en|hi)\/destination\/[^/]+\/[a-z]+\/q\/[^/]+/, "destination/q"],
    [/^\/?(en|hi)\/destination\/[^/]+\/[a-z]+$/, "destination/month"],
    [/^\/?(en|hi)\/destination\/[^/]+$/, "destination"],
    [/^\/?(en|hi)\/state\/[^/]+$/, "state"],
    [/^\/?(en|hi)\/region\/[^/]+(\/[^/]+)?$/, "region"],
    [/^\/?(en|hi)\/where-to-go\/[^/]+$/, "where-to-go/month"],
    [/^\/?(en|hi)\/festivals\/(month|state)\//, "festivals"],
    [/^\/?(en|hi)\/treks\//, "treks"],
    [/^\/?(en|hi)\/explore\//, "explore"],
    [/^\/?(en|hi)\/stays\//, "stays"],
    [/^\/?(en|hi)\/vs\/[^/]+$/, "vs/pair"],
    [/^\/?(en|hi)\/luxury\//, "luxury"],
    [/^\/?(en|hi)\/collections\//, "collections"],
    [/^\/?destination\//, "destination (un-prefixed — canonical bug)"],
  ];
  for (const [re, name] of families) if (re.test(u)) return name;
  return "other";
}

function parseAudit(raw: string, date: string): ParsedAudit {
  // Indexed-pages — captured from prose. Audits format it inconsistently;
  // try several patterns and pick the most credible reading.
  const indexedCandidates: number[] = [];
  // Pattern 1: bold pipe-cell — "**15.9K**" or "**14,100**"
  for (const m of raw.matchAll(/(?:^|\|\s*)\*\*([\d,.]+)K?\*\*/g)) {
    const v = parseFloat(m[1].replace(/,/g, ""));
    const final = m[0].includes("K") ? v * 1000 : v;
    // Indexed-pages is in the 5K-60K range on this property.
    if (final >= 4000 && final <= 80000) indexedCandidates.push(final);
  }
  // Pattern 2: prose — "indexed pages | **N** |"
  for (const m of raw.matchAll(/indexed[^\n|]*\|\s*\*\*([\d,.]+)K?\*\*/gi)) {
    const v = parseFloat(m[1].replace(/,/g, ""));
    const final = m[0].includes("K") && /K\*\*$/.test(m[0]) ? v * 1000 : v;
    if (final >= 4000 && final <= 80000) indexedCandidates.push(final);
  }
  const indexed_pages = indexedCandidates.length > 0 ? indexedCandidates[0] : null;

  // Top-10 page tables — format is "| 1 | /url | clicks | impr | ctr |".
  const top_pages: ParsedAudit["top_pages"] = [];
  for (const m of raw.matchAll(/\|\s*\d+\s*\|\s*(\/[^\s|]+)\s*\|\s*([\d,.]+)\s*\|\s*([\d,.]+)\s*\|/g)) {
    const url = m[1].trim();
    if (!url.startsWith("/")) continue;
    const clicks = parseInt(m[2].replace(/,/g, ""), 10);
    const impr = parseInt(m[3].replace(/,/g, ""), 10);
    if (!isNaN(clicks) && !isNaN(impr)) {
      top_pages.push({ url, clicks, impressions: impr });
    }
  }

  return { date, indexed_pages, top_pages };
}

async function readAuditFiles(): Promise<AuditFile[]> {
  // Read the bundled audit markdowns from /gsc-audits at the repo root.
  // process.cwd() resolves to apps/web at runtime; the audits live one
  // level up. We bundle them via fs at runtime (Node.js runtime, not edge).
  const fs = await import("fs/promises");
  const path = await import("path");
  // Find the gsc-audits directory by walking up. In Vercel Node runtime,
  // the cwd is the project root (apps/web), and the audits are at the
  // monorepo root (../gsc-audits relative to apps/web).
  const candidates = [
    path.join(process.cwd(), "..", "..", "gsc-audits"),
    path.join(process.cwd(), "..", "gsc-audits"),
    path.join(process.cwd(), "gsc-audits"),
  ];
  let dir = "";
  for (const c of candidates) {
    try {
      const stat = await fs.stat(c);
      if (stat.isDirectory()) {
        dir = c;
        break;
      }
    } catch {
      // not here, try next
    }
  }
  if (!dir) return [];
  const entries = await fs.readdir(dir);
  const files = entries.filter((e) => /^gsc-audit-\d{4}-\d{2}-\d{2}\.md$/.test(e)).sort();
  // Keep the last N — buffer for ANALYSIS_WINDOW + prior-week baseline.
  const wanted = files.slice(-30);
  const out: AuditFile[] = [];
  for (const f of wanted) {
    const date = f.replace(/^gsc-audit-/, "").replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(dir, f), "utf8");
    out.push({ date, path: path.join(dir, f), raw });
  }
  return out;
}

type Finding = {
  rule: "indexed_pages_drop" | "indexed_pages_frozen" | "cohort_clicks_drop";
  severity: "high" | "medium";
  detail: string;
  data: Record<string, unknown>;
};

function evaluate(parsed: ParsedAudit[]): Finding[] {
  const findings: Finding[] = [];

  // Sort by date ascending and limit to analysis window.
  parsed.sort((a, b) => a.date.localeCompare(b.date));
  const recent = parsed.slice(-ANALYSIS_WINDOW_DAYS);
  if (recent.length < 3) return findings;

  // --- M2.a — indexed-pages drop ---
  const latest = recent[recent.length - 1];
  const baseline = recent.slice(0, Math.max(1, recent.length - 7));
  if (latest.indexed_pages !== null) {
    const baselineValues = baseline.map((a) => a.indexed_pages).filter((v): v is number => v !== null);
    if (baselineValues.length >= 2) {
      const avg = baselineValues.reduce((a, b) => a + b, 0) / baselineValues.length;
      const pct = ((latest.indexed_pages - avg) / avg) * 100;
      if (pct <= -INDEXED_DROP_PCT) {
        findings.push({
          rule: "indexed_pages_drop",
          severity: "high",
          detail: `Indexed pages dropped ${pct.toFixed(1)}% vs prior ${baselineValues.length}-day average (${avg.toFixed(0)} → ${latest.indexed_pages}). This is the signature of a deindexing event — same pattern as the 2026-05-05 ISR regression.`,
          data: { latest: latest.indexed_pages, baseline_avg: avg, pct_change: pct, audit_date: latest.date },
        });
      }
    }
  }

  // --- M2.b — indexed-pages frozen snapshot ---
  const recentIndexed = recent
    .slice(-INDEXED_FROZEN_RUN_LIMIT - 1)
    .map((a) => a.indexed_pages)
    .filter((v): v is number => v !== null);
  if (recentIndexed.length > INDEXED_FROZEN_RUN_LIMIT) {
    const allSame = recentIndexed.every((v) => v === recentIndexed[0]);
    if (allSame) {
      findings.push({
        rule: "indexed_pages_frozen",
        severity: "medium",
        detail: `GSC indexed-pages reading frozen at ${recentIndexed[0]} for ${recentIndexed.length} consecutive audits. Snapshot likely stale — masking any real movement.`,
        data: { value: recentIndexed[0], runs_frozen: recentIndexed.length },
      });
    }
  }

  // --- M3 — per-cohort clicks delta ---
  // Bucket the most-recent 7 audits' top-10 page tables by URL family.
  // Compare cohort-sum-of-clicks to the prior 7 audits' cohort sum.
  if (recent.length >= 14) {
    const prior = recent.slice(-14, -7);
    const current = recent.slice(-7);
    const byFamily = (audits: ParsedAudit[]) => {
      const sums = new Map<string, number>();
      for (const a of audits) for (const p of a.top_pages) {
        const fam = urlPrefix(p.url);
        sums.set(fam, (sums.get(fam) ?? 0) + p.clicks);
      }
      return sums;
    };
    const priorSums = byFamily(prior);
    const currentSums = byFamily(current);
    for (const [fam, priorClicks] of priorSums.entries()) {
      if (priorClicks < COHORT_MIN_CLICKS) continue;
      const curClicks = currentSums.get(fam) ?? 0;
      const pct = ((curClicks - priorClicks) / priorClicks) * 100;
      if (pct <= -COHORT_CLICKS_DROP_PCT) {
        findings.push({
          rule: "cohort_clicks_drop",
          severity: "high",
          detail: `Cohort '${fam}' lost ${Math.abs(pct).toFixed(1)}% of clicks (${priorClicks} → ${curClicks} over the last 7 vs prior 7 audits). This is the signature of a per-URL-family regression — same pattern as the destination/month family during the ISR regression.`,
          data: { family: fam, prior_7d: priorClicks, current_7d: curClicks, pct_change: pct },
        });
      }
    }
  }

  return findings;
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const files = await readAuditFiles();
  if (files.length === 0) {
    return NextResponse.json({ ok: false, error: "no gsc-audit files found on disk" }, { status: 500 });
  }

  const parsed = files.map((f) => parseAudit(f.raw, f.date));
  const findings = evaluate(parsed);
  const high = findings.filter((f) => f.severity === "high");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("ops_reports").insert({
      job: "audit-gsc-alerts",
      summary: {
        files_read: files.length,
        latest_audit: parsed[parsed.length - 1]?.date,
        latest_indexed: parsed[parsed.length - 1]?.indexed_pages,
        findings,
      },
      alerts_count: findings.length,
      ok: high.length === 0,
    });
  }

  let emailed = false;
  if (high.length > 0) {
    const resend = getResend();
    if (resend) {
      try {
        const text = renderText(findings, parsed);
        const html = renderHtml(findings, parsed);
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] GSC alerts — ${high.length} high-severity finding(s)`,
          html,
          text,
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-gsc-alerts] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: high.length === 0,
    files_read: files.length,
    latest_audit: parsed[parsed.length - 1]?.date,
    findings,
    alert_emailed: emailed,
  });
}

function renderText(findings: Finding[], parsed: ParsedAudit[]): string {
  const lines: string[] = [];
  lines.push(`NakshIQ GSC alerts — ${findings.length} finding(s).\n`);
  lines.push(`Latest audit: ${parsed[parsed.length - 1]?.date}. Indexed pages: ${parsed[parsed.length - 1]?.indexed_pages ?? "?"}\n`);
  findings.forEach((f) => {
    lines.push(`[${f.severity.toUpperCase()}] ${f.rule}`);
    lines.push(`  ${f.detail}\n`);
  });
  return lines.join("\n");
}

function renderHtml(findings: Finding[], parsed: ParsedAudit[]): string {
  const rows = findings
    .map(
      (f) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:${f.severity === "high" ? "#dc2626" : "#d97706"};font-weight:600">${f.severity}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.rule}</td>
      <td style="padding:8px 12px;font-size:13px;line-height:1.4">${f.detail}</td>
    </tr>`
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:800px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">GSC alerts — ${findings.length} finding(s)</h1>
    <p style="color:#525252;margin:0 0 16px">Latest audit: <code>${parsed[parsed.length - 1]?.date}</code> · Indexed pages: <code>${parsed[parsed.length - 1]?.indexed_pages ?? "?"}</code></p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Severity</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Rule</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Detail</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

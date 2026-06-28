import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";
import snapshots from "@/data/audit-snapshots.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M2 + M3 — GSC audit alerts.
//
// Reads audit metrics from apps/web/data/audit-snapshots.json — a
// build-time JSON compiled by scripts/build-audit-snapshot.mjs from the
// gsc-audits/*.md history. Static-import means Turbopack's NFT can scope
// the bundle correctly (the original fs-walk version pushed the function
// past Vercel's 300 MB limit).
//
//   M2 — Indexed-pages drop alert
//     • >5% drop vs prior-7d average
//     • same indexed-page count for 3+ consecutive audits (frozen snapshot)
//
//   M3 — Per-cohort click delta (MEDIUM, contextual — not a standalone alarm)
//     • Any URL family losing >30% of clicks rolling 7d vs prior 7d.
//       This is derived from the parsed TOP-10 page tables, which only
//       capture whichever pages charted that day — NOT real cohort traffic.
//       As the seasonal mix rotates (e.g. June→July) and high-converting
//       /vs/ pages climb, other families get pushed out of the visible
//       top-10 and register as "click loss" even while TOTAL site clicks
//       set records. It fired false HIGHs on vs/pair (06-23..28) and on
//       destination/month while the site was at all-time-high clicks, so
//       it is severity=medium: a watch-signal, never a standalone "errored".
//       The reliable regression detector is M2 indexed_pages_drop above
//       (smoothed/sustained) — it ALSO collapsed during the real 2026-05
//       ISR regression, so demoting M3 loses no genuine coverage.

const ALERT_TO = "taneja.ashish5@gmail.com";

const ANALYSIS_WINDOW_DAYS = 14;
// Indexed-pages drop, smoothed. The indexed counts are stratified-sample
// ESTIMATES from scripts/gsc-inspect-sweep.mjs (round numbers that jitter
// ±~8% sample-to-sample — e.g. 17200→16800→16000→17300 over 06-01..06-12).
// The old single-reading 5% threshold sat BELOW that noise floor and fired
// ~half the time: a lone 16000 sample produced the 2026-06-09..14 daily
// "audit-gsc-alerts errored" storm even though the trend was flat/up. We now
// compare a trailing N-reading average to the prior N and only fire on a
// SUSTAINED ≥12% loss — a real ISR/indexing regression collapses the count
// and holds it down; sampling noise averages out and bounces back next read.
const INDEXED_DROP_PCT = 12;
const INDEXED_SMOOTH_WINDOW = 5;
const INDEXED_FROZEN_RUN_LIMIT = 3;
const COHORT_CLICKS_DROP_PCT = 30;
const COHORT_MIN_CLICKS = 20;

type GscAudit = {
  date: string;
  indexed_pages: number | null;
  top_pages: Array<{ url: string; clicks: number; impressions: number }>;
};

function urlPrefix(url: string): string {
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

type Finding = {
  rule: "indexed_pages_drop" | "indexed_pages_frozen" | "cohort_clicks_drop";
  severity: "high" | "medium";
  detail: string;
  data: Record<string, unknown>;
};

function evaluate(parsed: GscAudit[]): Finding[] {
  const findings: Finding[] = [];
  parsed.sort((a, b) => a.date.localeCompare(b.date));
  const recent = parsed.slice(-ANALYSIS_WINDOW_DAYS);
  if (recent.length < 3) return findings;

  const latest = recent[recent.length - 1];

  // M2.a — indexed-pages drop (smoothed, sustained). Average the last N
  // readings against the prior N so a single noisy sample can't fire; only a
  // genuine, held drop survives. See INDEXED_DROP_PCT comment above.
  const series = recent
    .map((a) => a.indexed_pages)
    .filter((v): v is number => v !== null);
  const W = INDEXED_SMOOTH_WINDOW;
  if (series.length >= W * 2) {
    const current = series.slice(-W);
    const prior = series.slice(-W * 2, -W);
    const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
    const currentAvg = mean(current);
    const priorAvg = mean(prior);
    const pct = ((currentAvg - priorAvg) / priorAvg) * 100;
    if (pct <= -INDEXED_DROP_PCT) {
      findings.push({
        rule: "indexed_pages_drop",
        severity: "high",
        detail: `Indexed pages dropped ${pct.toFixed(1)}% — trailing ${W}-read average ${currentAvg.toFixed(0)} vs prior ${W}-read average ${priorAvg.toFixed(0)} (sustained, not a single-sample dip). Same shape as the 2026-05-05 ISR regression.`,
        data: { current_avg: currentAvg, prior_avg: priorAvg, pct_change: pct, audit_date: latest.date },
      });
    }
  }

  // M2.b — frozen indexed-pages snapshot
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

  // M3 — per-cohort clicks delta (need ≥14 audits to compare 7-vs-prior-7)
  if (recent.length >= 14) {
    const prior = recent.slice(-14, -7);
    const current = recent.slice(-7);
    const byFamily = (audits: GscAudit[]) => {
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
        // MEDIUM by design — see the M3 note at the top of this file. This is
        // top-10-table composition, which rotates seasonally; it cannot
        // distinguish "cohort lost traffic" from "cohort rotated out of the
        // daily top-10". Never let it drive a standalone "errored" status.
        findings.push({
          rule: "cohort_clicks_drop",
          severity: "medium",
          detail: `Cohort '${fam}' fell ${Math.abs(pct).toFixed(1)}% in top-10 click share (${priorClicks} → ${curClicks} over the last 7 vs prior 7 audits). Contextual only — top-10 tables rotate seasonally, so this is NOT by itself a regression (cross-check against the M2 indexed-pages trend and total clicks).`,
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

  const gsc = snapshots.gsc as GscAudit[];
  if (!gsc || gsc.length === 0) {
    return NextResponse.json({ ok: false, error: "audit-snapshots.json contains no gsc data" }, { status: 500 });
  }

  const findings = evaluate(gsc);
  const high = findings.filter((f) => f.severity === "high");
  const latest = gsc[gsc.length - 1];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("ops_reports").insert({
      job: "audit-gsc-alerts",
      summary: {
        audits_read: gsc.length,
        snapshot_generated_at: (snapshots as { generated_at?: string }).generated_at,
        latest_audit: latest.date,
        latest_indexed: latest.indexed_pages,
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
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] GSC alerts — ${high.length} high-severity finding(s)`,
          html: renderHtml(findings, latest),
          text: renderText(findings, latest),
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-gsc-alerts] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: high.length === 0,
    audits_read: gsc.length,
    snapshot_generated_at: (snapshots as { generated_at?: string }).generated_at,
    latest_audit: latest.date,
    findings,
    alert_emailed: emailed,
  });
}

function renderText(findings: Finding[], latest: GscAudit): string {
  const lines: string[] = [];
  lines.push(`NakshIQ GSC alerts — ${findings.length} finding(s).\n`);
  lines.push(`Latest audit: ${latest.date}. Indexed pages: ${latest.indexed_pages ?? "?"}\n`);
  findings.forEach((f) => {
    lines.push(`[${f.severity.toUpperCase()}] ${f.rule}`);
    lines.push(`  ${f.detail}\n`);
  });
  return lines.join("\n");
}

function renderHtml(findings: Finding[], latest: GscAudit): string {
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
    <p style="color:#525252;margin:0 0 16px">Latest audit: <code>${latest.date}</code> · Indexed pages: <code>${latest.indexed_pages ?? "?"}</code></p>
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

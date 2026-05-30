import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";
import snapshots from "@/data/audit-snapshots.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M4 — GSC↔GA4 cross-correlation by URL pattern.
//
// Reads audit metrics from apps/web/data/audit-snapshots.json (built at
// build time from gsc-audits/*.md + ga4-audits/*.md). Bucketed by URL
// family. Alerts when GA4 engaged-sessions / GSC clicks ratio falls
// outside 0.3-3.0 on a cohort with ≥20 clicks/week.
//
// IMPORTANT: both snapshots are TRUNCATED top-N exports (~10 pages each),
// and the two lists barely overlap — GSC surfaces the pages that *rank*,
// GA4 surfaces the pages that get *traffic*, which are usually different
// URLs. Summing a family's clicks from one list and its engaged-sessions
// from the other compares disjoint URL sets and mechanically produces a
// low ratio whenever a page is in GSC's top-N but below GA4's floor (and
// vice-versa). That misfired on destination/month three times (2026-05-28
// to -30) — 86 clicks vs 23 sessions where only ONE shared URL existed.
//
// Fix (2026-05-30): compute the ratio ONLY over URLs present in BOTH
// snapshots (apples-to-apples), and require the shared clicks to clear the
// floor. A family with too little overlap is skipped, not alerted. This
// under-alerts on thin snapshots rather than crying wolf on truncation
// noise. Deeper improvement (capture more rows per audit) tracked separately.

const ALERT_TO = "taneja.ashish5@gmail.com";

const RATIO_LOW_THRESHOLD = 0.3;
const RATIO_HIGH_THRESHOLD = 3.0;
const MIN_CLICKS_PER_COHORT = 20;

function normUrl(u: string): string {
  return u.toLowerCase().replace(/\/+$/, "") || "/";
}

function urlPrefix(url: string): string {
  const u = url.toLowerCase();
  const families: Array<[RegExp, string]> = [
    [/^\/?(en|hi)\/destination\/[^/]+\/[a-z]+\/q\/[^/]+/, "destination/q"],
    [/^\/?(en|hi)\/destination\/[^/]+\/[a-z]+$/, "destination/month"],
    [/^\/?(en|hi)\/destination\/[^/]+$/, "destination"],
    [/^\/?(en|hi)\/state\/[^/]+$/, "state"],
    [/^\/?(en|hi)\/where-to-go\/[^/]+$/, "where-to-go/month"],
    [/^\/?(en|hi)\/festivals\//, "festivals"],
    [/^\/?(en|hi)\/treks\//, "treks"],
    [/^\/?(en|hi)\/explore\//, "explore"],
    [/^\/?(en|hi)\/stays\//, "stays"],
    [/^\/?(en|hi)\/vs\/[^/]+$/, "vs/pair"],
    [/^\/?(en|hi)\/collections\//, "collections"],
    [/^\/?(en|hi)\/?$/, "homepage"],
    [/^\/?destination\//, "destination (un-prefixed)"],
  ];
  for (const [re, name] of families) if (re.test(u)) return name;
  return "other";
}

type GscAudit = { date: string; top_pages: Array<{ url: string; clicks: number; impressions: number }> };
type Ga4Audit = { date: string; top_pages: Array<{ url: string; engaged: number }> };

// family -> (normalised url -> metric). Per-URL so we can intersect the two
// sides instead of summing across disjoint truncated lists.
function bucketGscByUrl(audit: GscAudit | undefined): Map<string, Map<string, number>> {
  const out = new Map<string, Map<string, number>>();
  if (!audit) return out;
  for (const p of audit.top_pages) {
    const fam = urlPrefix(p.url);
    const m = out.get(fam) ?? new Map<string, number>();
    m.set(normUrl(p.url), (m.get(normUrl(p.url)) ?? 0) + p.clicks);
    out.set(fam, m);
  }
  return out;
}

function bucketGa4ByUrl(audit: Ga4Audit | undefined): Map<string, Map<string, number>> {
  const out = new Map<string, Map<string, number>>();
  if (!audit) return out;
  for (const p of audit.top_pages) {
    const fam = urlPrefix(p.url);
    const m = out.get(fam) ?? new Map<string, number>();
    m.set(normUrl(p.url), (m.get(normUrl(p.url)) ?? 0) + p.engaged);
    out.set(fam, m);
  }
  return out;
}

type Finding = {
  family: string;
  gsc_clicks: number;
  ga4_sessions: number;
  ratio: number;
  shared_urls: number;
  flag: "low" | "high";
  detail: string;
};

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const gsc = (snapshots.gsc as GscAudit[]) ?? [];
  const ga4 = (snapshots.ga4 as Ga4Audit[]) ?? [];
  if (gsc.length === 0 || ga4.length === 0) {
    return NextResponse.json({
      ok: false,
      error: `snapshot missing — gsc:${gsc.length} ga4:${ga4.length}`,
    }, { status: 500 });
  }

  // Use the latest entry from each side. They won't always share a date —
  // GSC audits run more often than GA4 ones — but the cohort ratios are
  // stable enough across a few days that this is fine.
  const latestGsc = gsc[gsc.length - 1];
  const latestGa4 = ga4[ga4.length - 1];

  const gscBucket = bucketGscByUrl(latestGsc);
  const ga4Bucket = bucketGa4ByUrl(latestGa4);

  const allFamilies = new Set<string>([...gscBucket.keys(), ...ga4Bucket.keys()]);
  const findings: Finding[] = [];
  const summary: Array<{ family: string; gsc_clicks: number; ga4_sessions: number; ratio: number | null; shared_urls: number }> = [];

  for (const fam of allFamilies) {
    const gscUrls = gscBucket.get(fam) ?? new Map<string, number>();
    const ga4Urls = ga4Bucket.get(fam) ?? new Map<string, number>();

    // Intersect: only count URLs present in BOTH audits, so the numerator
    // and denominator describe the same pages. A page in GSC's top-N but
    // below GA4's floor (or vice-versa) is excluded, not silently dragging
    // the ratio down.
    let clicks = 0;
    let sessions = 0;
    let shared = 0;
    for (const [url, c] of gscUrls) {
      const s = ga4Urls.get(url);
      if (s !== undefined) {
        clicks += c;
        sessions += s;
        shared += 1;
      }
    }
    const ratio = clicks > 0 ? sessions / clicks : null;
    summary.push({ family: fam, gsc_clicks: clicks, ga4_sessions: sessions, ratio, shared_urls: shared });

    // Skip thin cohorts: too few shared clicks to be a reliable signal.
    if (clicks < MIN_CLICKS_PER_COHORT) continue;
    if (ratio === null) continue;
    if (ratio < RATIO_LOW_THRESHOLD) {
      findings.push({
        family: fam,
        gsc_clicks: clicks,
        ga4_sessions: sessions,
        ratio,
        shared_urls: shared,
        flag: "low",
        detail: `Across ${shared} URL(s) present in both audits, /${fam} drew ${clicks} GSC clicks but only ${sessions} GA4 engaged sessions (ratio ${ratio.toFixed(2)}). Same-URL underperformance — check render health / TTFB for this family before treating as real.`,
      });
    } else if (ratio > RATIO_HIGH_THRESHOLD) {
      findings.push({
        family: fam,
        gsc_clicks: clicks,
        ga4_sessions: sessions,
        ratio,
        shared_urls: shared,
        flag: "high",
        detail: `Across ${shared} URL(s) present in both audits, /${fam} drew ${sessions} GA4 engaged sessions but only ${clicks} GSC clicks (ratio ${ratio.toFixed(2)}). Engagement inflated — bot traffic, internal-link routing skipping GSC, or session-attribution drift.`,
      });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("ops_reports").insert({
      job: "audit-gsc-ga4-correlation",
      summary: { gsc_date: latestGsc.date, ga4_date: latestGa4.date, findings, full_summary: summary },
      alerts_count: findings.length,
      // The job ran fine — a cohort mismatch is a *flagged item*, not a crash.
      // `ok: true` lets the watchdog classify findings as `needs_review`
      // (yellow) via alerts_count, instead of short-circuiting to `errored`
      // (red, daily DEGRADED email). A low ratio here is often a GSC clicks
      // spike against a stable GA4 denominator, not a render regression.
      ok: true,
    });
  }

  let emailed = false;
  if (findings.length > 0) {
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] GSC↔GA4 mismatch — ${findings.length} cohort(s) flagged`,
          html: renderHtml(findings, latestGsc.date, latestGa4.date),
          text: renderText(findings, latestGsc.date, latestGa4.date),
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-gsc-ga4-correlation] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: findings.length === 0,
    gsc_date: latestGsc.date,
    ga4_date: latestGa4.date,
    findings,
    summary,
    alert_emailed: emailed,
  });
}

function renderText(findings: Finding[], gscDate: string, ga4Date: string): string {
  const lines: string[] = [];
  lines.push(`NakshIQ GSC↔GA4 cohort mismatch — ${findings.length} finding(s).`);
  lines.push(`GSC audit: ${gscDate}  ·  GA4 audit: ${ga4Date}\n`);
  findings.forEach((f) => {
    lines.push(`[${f.flag.toUpperCase()}] ${f.family}: GSC ${f.gsc_clicks} clicks → GA4 ${f.ga4_sessions} sessions (ratio ${f.ratio.toFixed(2)})`);
    lines.push(`  ${f.detail}\n`);
  });
  return lines.join("\n");
}

function renderHtml(findings: Finding[], gscDate: string, ga4Date: string): string {
  const rows = findings
    .map(
      (f) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:${f.flag === "low" ? "#dc2626" : "#d97706"};font-weight:600">${f.flag}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.family}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.gsc_clicks}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.ga4_sessions}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.ratio.toFixed(2)}</td>
      <td style="padding:8px 12px;font-size:13px;line-height:1.4">${f.detail}</td>
    </tr>`
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:900px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">GSC ↔ GA4 cohort mismatch — ${findings.length}</h1>
    <p style="color:#525252;margin:0 0 16px">GSC audit: <code>${gscDate}</code> · GA4 audit: <code>${ga4Date}</code></p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Flag</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Family</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">GSC clicks</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">GA4 engaged</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Ratio</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Detail</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

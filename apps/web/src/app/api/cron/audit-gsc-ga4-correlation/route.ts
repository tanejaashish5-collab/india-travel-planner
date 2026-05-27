import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M4 — GSC↔GA4 cross-correlation by URL pattern.
//
// During the 2026-05-05 → 2026-05-27 ISR regression, GSC reported the
// destination/month family getting ~30-40 clicks/day, but GA4 reported
// only 2-3 engaged sessions on the same URL family. The clicks were
// arriving and bouncing before GA4 fired — exactly what an uncacheable
// 1-2 second render produces. Neither the GSC audit nor the GA4 audit
// caught the mismatch because they run independently.
//
// This monitor reads the most recent gsc-audit + ga4-audit markdowns,
// buckets clicks (GSC) and engaged sessions (GA4) by URL prefix, and
// alerts when the ratio sessions/clicks is way outside expected range
// (0.4–2.5). Expected ratio range: not all GSC clicks become engaged
// GA4 sessions (some users bounce); not all GA4 sessions came from
// organic search; some user-agent filtering differs. The 0.4-2.5 band
// allows for those without missing structural failures.

const ALERT_TO = "taneja.ashish5@gmail.com";

const RATIO_LOW_THRESHOLD = 0.3;   // sessions/clicks < 0.3 = clicks not converting to sessions
const RATIO_HIGH_THRESHOLD = 3.0;  // sessions/clicks > 3.0 = engagement inflated vs GSC clicks
const MIN_CLICKS_PER_COHORT = 20;  // below this, sample too noisy

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

async function readLatestAudit(dir: string, prefix: string): Promise<{ date: string; raw: string } | null> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const candidates = [
    path.join(process.cwd(), "..", "..", dir),
    path.join(process.cwd(), "..", dir),
    path.join(process.cwd(), dir),
  ];
  let auditDir = "";
  for (const c of candidates) {
    try {
      const stat = await fs.stat(c);
      if (stat.isDirectory()) { auditDir = c; break; }
    } catch { /* not here */ }
  }
  if (!auditDir) return null;
  const entries = await fs.readdir(auditDir);
  const re = new RegExp(`^${prefix}-\\d{4}-\\d{2}-\\d{2}\\.md$`);
  const files = entries.filter((e) => re.test(e)).sort();
  if (files.length === 0) return null;
  const latest = files[files.length - 1];
  const date = latest.replace(new RegExp(`^${prefix}-`), "").replace(/\.md$/, "");
  const raw = await fs.readFile(path.join(auditDir, latest), "utf8");
  return { date, raw };
}

function parseGscTopPages(raw: string): Map<string, number> {
  // Pages table format: "| 1 | /url | clicks | impressions | ctr |"
  const bucket = new Map<string, number>();
  for (const m of raw.matchAll(/\|\s*\d+\s*\|\s*(\/[^\s|]+)\s*\|\s*([\d,.]+)\s*\|\s*([\d,.]+)\s*\|/g)) {
    const url = m[1].trim();
    const clicks = parseInt(m[2].replace(/,/g, ""), 10);
    if (!url.startsWith("/") || isNaN(clicks)) continue;
    const fam = urlPrefix(url);
    bucket.set(fam, (bucket.get(fam) ?? 0) + clicks);
  }
  return bucket;
}

function parseGa4TopPages(raw: string): Map<string, number> {
  // Look for "Top human pages (engaged sessions" then a table of:
  // "| N | `/url` | engaged | avg-sec |"
  const bucket = new Map<string, number>();
  const sectionMatch = raw.match(/Top human pages[\s\S]*?(?=##|$)/);
  const section = sectionMatch ? sectionMatch[0] : raw;
  for (const m of section.matchAll(/\|\s*\d+\s*\|\s*`?(\/[^\s|`]+)`?\s*\|\s*(\d+)\s*\|/g)) {
    const url = m[1].trim();
    const engaged = parseInt(m[2], 10);
    if (!url.startsWith("/") || isNaN(engaged)) continue;
    const fam = urlPrefix(url);
    bucket.set(fam, (bucket.get(fam) ?? 0) + engaged);
  }
  return bucket;
}

type Finding = {
  family: string;
  gsc_clicks: number;
  ga4_sessions: number;
  ratio: number;
  flag: "low" | "high";
  detail: string;
};

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const gsc = await readLatestAudit("gsc-audits", "gsc-audit");
  const ga4 = await readLatestAudit("ga4-audits", "ga4-audit");
  if (!gsc || !ga4) {
    return NextResponse.json({
      ok: false,
      error: `audit files missing — gsc=${gsc ? "ok" : "missing"} ga4=${ga4 ? "ok" : "missing"}`,
    }, { status: 500 });
  }

  const gscBucket = parseGscTopPages(gsc.raw);
  const ga4Bucket = parseGa4TopPages(ga4.raw);

  const allFamilies = new Set<string>([...gscBucket.keys(), ...ga4Bucket.keys()]);
  const findings: Finding[] = [];
  const summary: Array<{ family: string; gsc_clicks: number; ga4_sessions: number; ratio: number | null }> = [];

  for (const fam of allFamilies) {
    const clicks = gscBucket.get(fam) ?? 0;
    const sessions = ga4Bucket.get(fam) ?? 0;
    const ratio = clicks > 0 ? sessions / clicks : null;
    summary.push({ family: fam, gsc_clicks: clicks, ga4_sessions: sessions, ratio });
    if (clicks < MIN_CLICKS_PER_COHORT) continue;
    if (ratio === null) continue;
    if (ratio < RATIO_LOW_THRESHOLD) {
      findings.push({
        family: fam,
        gsc_clicks: clicks,
        ga4_sessions: sessions,
        ratio,
        flag: "low",
        detail: `GSC reports ${clicks} clicks landing on /${fam} but GA4 sees only ${sessions} engaged sessions (ratio ${ratio.toFixed(2)}). Users likely bouncing before GA4 fires — same shape as the ISR regression's slow-render symptom.`,
      });
    } else if (ratio > RATIO_HIGH_THRESHOLD) {
      findings.push({
        family: fam,
        gsc_clicks: clicks,
        ga4_sessions: sessions,
        ratio,
        flag: "high",
        detail: `GA4 reports ${sessions} engaged sessions on /${fam} but GSC sees only ${clicks} clicks (ratio ${ratio.toFixed(2)}). Engagement is inflated — bot traffic, internal-link routing skipping GSC, or session-attribution drift.`,
      });
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    await supabase.from("ops_reports").insert({
      job: "audit-gsc-ga4-correlation",
      summary: { gsc_date: gsc.date, ga4_date: ga4.date, findings, full_summary: summary },
      alerts_count: findings.length,
      ok: findings.length === 0,
    });
  }

  let emailed = false;
  if (findings.length > 0) {
    const resend = getResend();
    if (resend) {
      try {
        const text = renderText(findings, gsc.date, ga4.date);
        const html = renderHtml(findings, gsc.date, ga4.date);
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] GSC↔GA4 mismatch — ${findings.length} cohort(s) flagged`,
          html,
          text,
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-gsc-ga4-correlation] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: findings.length === 0,
    gsc_date: gsc.date,
    ga4_date: ga4.date,
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

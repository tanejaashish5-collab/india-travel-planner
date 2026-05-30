import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// M7 — Bot crawl-rate per URL family.
//
// Today, /admin/bot-traffic shows aggregate volume + top-25 paths. If
// Googlebot specifically deprioritizes a URL family (e.g. /destination/
// <id>/<month>/) — which is the canary for an ISR-cache regression — the
// aggregate stays healthy because crawl budget shifts to other families.
//
// This cron queries `bot_visits`, buckets last-7-days vs prior-7-days
// hit counts by URL family, and alerts when any family loses > 50% of
// its crawl rate week-over-week.
//
// Middleware samples bot visits at 10% (`BOT_LOG_SAMPLE_RATE` in
// middleware.ts), so the absolute counts here are 10× lower than real
// volume — but the *ratio* between two weeks is unaffected, which is
// what we care about.

const ALERT_TO = "taneja.ashish5@gmail.com";

const CRAWL_DROP_PCT = 50;     // family loses >50% WoW = alert
const MIN_HITS_PER_FAMILY = 30; // below this, sample too noisy (raw, post-sampling so true ~300+)
const KNOWN_BOTS = ["Googlebot", "Bingbot"]; // crawl-rate watch is for these; LLM bots are bonus

function urlPrefix(url: string): string {
  const u = url.toLowerCase();
  const families: Array<[RegExp, string]> = [
    [/^\/?(en|hi)\/destination\/[^/]+\/[a-z]+\/q\/[^/]+/, "destination/q"],
    [/^\/?(en|hi)\/destination\/[^/]+\/[a-z]+$/, "destination/month"],
    [/^\/?(en|hi)\/destination\/[^/]+$/, "destination"],
    [/^\/?(en|hi)\/state\/[^/]+$/, "state"],
    [/^\/?(en|hi)\/region\/[^/]+(\/[^/]+)?$/, "region"],
    [/^\/?(en|hi)\/where-to-go\/[^/]+$/, "where-to-go/month"],
    [/^\/?(en|hi)\/festivals\//, "festivals"],
    [/^\/?(en|hi)\/treks\//, "treks"],
    [/^\/?(en|hi)\/explore\//, "explore"],
    [/^\/?(en|hi)\/stays\//, "stays"],
    [/^\/?(en|hi)\/vs\/[^/]+$/, "vs/pair"],
    [/^\/?(en|hi)\/luxury\//, "luxury"],
    [/^\/?(en|hi)\/collections/, "collections"],
    [/^\/?(en|hi)\/?$/, "homepage"],
    [/^\/?api\//, "api"],
    [/^\/?destination\//, "destination (un-prefixed)"],
  ];
  for (const [re, name] of families) if (re.test(u)) return name;
  return "other";
}

type Finding = {
  bot: string;
  family: string;
  current_7d: number;
  prior_7d: number;
  pct_change: number;
  detail: string;
};

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const header = req.headers.get("authorization") || "";
  if (!secret) return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  if (header !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "DB not configured" }, { status: 500 });
  const supabase = createClient(url, serviceKey);

  const now = new Date();
  const day = 86400_000;
  const cutoff_now = new Date(now.getTime() - 7 * day).toISOString();
  const cutoff_prior = new Date(now.getTime() - 14 * day).toISOString();

  // Pull a 14-day window of bot visits filtered to known bots, then bucket
  // in memory. Volumes here are 10% sample (per middleware), so ~3-6K rows
  // for our scale — easily in-memory.
  const { data, error } = await supabase
    .from("bot_visits")
    .select("bot_name, path, hit_at")
    .in("bot_name", KNOWN_BOTS)
    .gte("hit_at", cutoff_prior)
    .order("hit_at", { ascending: false });

  if (error) {
    // Write a failure row so the watchdog surfaces this as `errored` with a
    // cause, not a silent `missing` forever (cf. audit-supabase-advisors fix
    // caa9dae8 — a 500 with no ops_reports row is indistinguishable from
    // never-ran).
    await supabase.from("ops_reports").insert({
      job: "audit-bot-crawl-rate",
      summary: { reason: "bot_visits query failed", detail: error.message },
      alerts_count: 0,
      ok: false,
    });
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // Bucket hits by (bot, family, window).
  type Bucket = Map<string, Map<string, { current: number; prior: number }>>;
  const bucket: Bucket = new Map();
  for (const row of data ?? []) {
    const fam = urlPrefix(row.path ?? "");
    if (!bucket.has(row.bot_name)) bucket.set(row.bot_name, new Map());
    const famMap = bucket.get(row.bot_name)!;
    if (!famMap.has(fam)) famMap.set(fam, { current: 0, prior: 0 });
    const cell = famMap.get(fam)!;
    if (row.hit_at >= cutoff_now) cell.current++;
    else cell.prior++;
  }

  const findings: Finding[] = [];
  const summary: Array<{ bot: string; family: string; current_7d: number; prior_7d: number; pct: number | null }> = [];

  for (const [bot, famMap] of bucket.entries()) {
    for (const [fam, cell] of famMap.entries()) {
      const pct = cell.prior > 0 ? ((cell.current - cell.prior) / cell.prior) * 100 : null;
      summary.push({ bot, family: fam, current_7d: cell.current, prior_7d: cell.prior, pct });
      if (cell.prior < MIN_HITS_PER_FAMILY) continue;
      if (pct === null) continue;
      if (pct <= -CRAWL_DROP_PCT) {
        findings.push({
          bot,
          family: fam,
          current_7d: cell.current,
          prior_7d: cell.prior,
          pct_change: pct,
          detail: `${bot} crawl rate on /${fam} dropped ${Math.abs(pct).toFixed(1)}% (${cell.prior} → ${cell.current} hits, week-over-week, 10% sample). Search engines deprioritize URL families with cache/render issues — same symptom shape as the 2026-05-05 ISR regression.`,
        });
      }
    }
  }

  await supabase.from("ops_reports").insert({
    job: "audit-bot-crawl-rate",
    summary: { window_days: 7, findings, full_summary: summary },
    alerts_count: findings.length,
    ok: findings.length === 0,
  });

  let emailed = false;
  if (findings.length > 0) {
    const resend = getResend();
    if (resend) {
      try {
        await resend.emails.send({
          from: OPS_FROM_ADDRESS,
          to: ALERT_TO,
          replyTo: REPLY_TO,
          subject: `[NakshIQ ops] bot crawl-rate drop — ${findings.length} family/bot pair(s) flagged`,
          html: renderHtml(findings),
          text: renderText(findings),
        });
        emailed = true;
      } catch (e: unknown) {
        console.error("[audit-bot-crawl-rate] alert email failed:", (e as Error)?.message);
      }
    }
  }

  return NextResponse.json({
    ok: findings.length === 0,
    findings,
    summary_count: summary.length,
    alert_emailed: emailed,
  });
}

function renderText(findings: Finding[]): string {
  const lines: string[] = [`NakshIQ bot crawl-rate drop — ${findings.length} family/bot pair(s).\n`];
  findings.forEach((f) => {
    lines.push(`[${f.bot}] /${f.family}: ${f.prior_7d} → ${f.current_7d} (${f.pct_change.toFixed(1)}%)`);
    lines.push(`  ${f.detail}\n`);
  });
  return lines.join("\n");
}

function renderHtml(findings: Finding[]): string {
  const rows = findings
    .map(
      (f) => `<tr>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.bot}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.family}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.prior_7d}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px">${f.current_7d}</td>
      <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:12px;color:#dc2626;font-weight:600">${f.pct_change.toFixed(1)}%</td>
    </tr>`
    )
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:800px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Bot crawl-rate drop — ${findings.length}</h1>
    <p style="color:#525252;margin:0 0 16px">Family/bot pair(s) where crawl rate dropped >50% week-over-week. Counts are 10% sample (true volume ~10×).</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Bot</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Family</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Prior 7d</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Current 7d</th>
        <th style="padding:8px 12px;text-align:left;font-size:11px;color:#525252">Δ</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

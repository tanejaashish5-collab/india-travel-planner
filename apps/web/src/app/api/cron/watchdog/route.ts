import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Daily watchdog. Runs 02:00 UTC = 07:30 IST. Two jobs in one cron:
// 1. ALWAYS — read ops_reports, compute "days since last run" per cron,
//    write a watchdog row capturing the snapshot. If any job is errored,
//    missing past its grace window, or stale past SLA, send an alert email.
//    needs_review (job ran fine but flagged items) and scheduled (monthly
//    cron not yet calendar-due) are informational only — digest only.
// 2. ON MONDAYS — additionally send a weekly digest email with the full
//    health table, even if everything is green.
//
// Watching the watchman: if THIS cron fails, no row gets written. The
// row's absence is itself a signal — surface on /methodology/freshness.
// External heartbeat (Healthchecks.io) is the recommended belt-and-braces.

const ALERT_TO = "taneja.ashish5@gmail.com";

// Expected cadence per job. Values are max days between runs before we
// declare the job overdue. A 1-day buffer is added to absorb cron drift.
const EXPECTED_CADENCE_DAYS: Record<string, number> = {
  "refresh-stay-picks": 2,    // daily cron 22:00 UTC
  "freshness-drift": 8,       // weekly cron Mon 01:00 UTC
  "news-sweep": 32,           // monthly cron 1st 01:00 UTC
  "prewarm-next-month": 32,   // monthly cron 28th 01:00 UTC
};

// Earliest expected first run per job. Monthly crons deployed mid-cycle may
// be weeks away from their first calendar opportunity to fire — without this,
// a "never run" job is indistinguishable from "not yet had a chance to run"
// and watchdog cries MISSING every day. Set to null once the job has fired
// at least once in production.
const EARLIEST_EXPECTED_FIRST_RUN: Record<string, string | null> = {
  "refresh-stay-picks": null,
  "freshness-drift": null,
  "news-sweep": null,
  "prewarm-next-month": "2026-05-28T01:00:00Z", // first 28th after Apr 30 deploy
};

// Statuses that should trigger the daily alert email. needs_review (cron ran
// fine but found items to review) and scheduled (monthly cron not yet due)
// are informational — they show in the Monday digest but never wake anyone up.
const ALERT_STATUSES = new Set(["errored", "missing", "stale"]);

type JobHealth = {
  job: string;
  expected_cadence_days: number;
  last_run_at: string | null;
  days_since: number | null;
  status: "ok" | "stale" | "missing" | "errored" | "needs_review" | "scheduled";
  last_alerts_count: number | null;
  last_ok: boolean | null;
};

type AssetCoverage = {
  collections_total: number;
  collections_with_video: number;
  collections_pct: number;
  unlinked_examples: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function computeAssetCoverage(supabase: any): Promise<AssetCoverage | null> {
  // One query, two counters. Informational only — never alertable.
  // Surfaces the gap until Cowork's collection-cover queue is drained.
  const { data, error } = await supabase
    .from("collections")
    .select("id, name, cover_video");
  if (error || !data) return null;
  const total = data.length;
  const linked = data.filter((c: any) => c.cover_video).length;
  const unlinked = data
    .filter((c: any) => !c.cover_video)
    .slice(0, 5)
    .map((c: any) => c.id);
  return {
    collections_total: total,
    collections_with_video: linked,
    collections_pct: total > 0 ? Number(((linked / total) * 100).toFixed(1)) : 0,
    unlinked_examples: unlinked,
  };
}

function isMondayIST(d: Date): boolean {
  // toLocaleString with weekday returns the Asia/Kolkata day-of-week regardless of server tz.
  return d.toLocaleString("en-US", { timeZone: "Asia/Kolkata", weekday: "short" }) === "Mon";
}

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
  const monday = isMondayIST(now);

  // First-run guard. Without it, the very first watchdog fire after deploy
  // would alert "prewarm-next-month MISSING" / "news-sweep MISSING" simply
  // because those monthly crons haven't fired yet — false positive that
  // teaches you to ignore the alert. We detect first-run by the absence
  // of any prior watchdog row in ops_reports and skip emails this time.
  const { count: priorWatchdogRuns } = await supabase
    .from("ops_reports")
    .select("*", { count: "exact", head: true })
    .eq("job", "watchdog");
  const isFirstRun = (priorWatchdogRuns ?? 0) === 0;

  // For each tracked job, fetch the most recent ops_reports row and
  // compute days-since. We use a separate query per job rather than one
  // window function because Supabase JS doesn't expose DISTINCT ON cleanly.
  const jobs = Object.keys(EXPECTED_CADENCE_DAYS);
  const health: JobHealth[] = [];
  for (const job of jobs) {
    const { data } = await supabase
      .from("ops_reports")
      .select("run_at, alerts_count, ok")
      .eq("job", job)
      .order("run_at", { ascending: false })
      .limit(1);
    const last = data?.[0] ?? null;
    const cadence = EXPECTED_CADENCE_DAYS[job];
    let status: JobHealth["status"];
    let daysSince: number | null = null;
    if (!last) {
      const earliest = EARLIEST_EXPECTED_FIRST_RUN[job];
      if (earliest && new Date(earliest).getTime() > now.getTime()) status = "scheduled";
      else status = "missing";
    } else {
      daysSince = (now.getTime() - new Date(last.run_at).getTime()) / 86400000;
      if (last.ok === false) status = "errored";
      else if (daysSince > cadence) status = "stale";
      else if ((last.alerts_count ?? 0) > 0) status = "needs_review";
      else status = "ok";
    }
    health.push({
      job,
      expected_cadence_days: cadence,
      last_run_at: last?.run_at ?? null,
      days_since: daysSince === null ? null : Number(daysSince.toFixed(1)),
      status,
      last_alerts_count: last?.alerts_count ?? null,
      last_ok: last?.ok ?? null,
    });
  }

  const alertable = health.filter((h) => ALERT_STATUSES.has(h.status));
  const reviewable = health.filter((h) => h.status === "needs_review");
  // Digest tiers: degraded (red) > review (yellow) > ok (green). The Monday
  // subject must reflect the body — claiming "ALL GREEN" while needs_review
  // rows render in orange teaches the founder to ignore the digest.
  const overall: "ok" | "degraded" = alertable.length === 0 ? "ok" : "degraded";
  const digestTier: "ok" | "review" | "degraded" =
    alertable.length > 0 ? "degraded" : reviewable.length > 0 ? "review" : "ok";
  const digestSubjectLabel =
    digestTier === "ok"
      ? "ALL GREEN"
      : digestTier === "review"
        ? `REVIEW NEEDED — ${reviewable.length} job(s) flagged items`
        : "DEGRADED";

  // Asset-coverage snapshot — informational, never alertable. Surfaces the
  // gap of collections without a cover_video URL until Cowork's queue drains.
  const assetCoverage = await computeAssetCoverage(supabase);

  // Persist the snapshot before any side effects so we always have the
  // record even if email sending throws.
  await supabase.from("ops_reports").insert({
    job: "watchdog",
    summary: { overall, monday_digest: monday, health, asset_coverage: assetCoverage },
    alerts_count: alertable.length,
    ok: overall === "ok",
  });

  // Email sends — only on alertable failures OR Monday digest. Skip on first
  // run (see priorWatchdogRuns guard above) so brand-new monthly crons don't
  // trigger spurious alerts before they've had a chance to fire.
  let alertEmailed = false;
  let digestEmailed = false;
  const resend = getResend();
  if (resend && alertable.length > 0 && !isFirstRun) {
    try {
      await resend.emails.send({
        from: OPS_FROM_ADDRESS,
        to: ALERT_TO,
        replyTo: REPLY_TO,
        subject: `[NakshIQ ops] cron health DEGRADED — ${alertable.length} job(s) need attention`,
        html: renderAlertHtml(alertable, health),
        text: renderAlertText(alertable, health),
      });
      alertEmailed = true;
    } catch (err: any) {
      console.error("[watchdog] alert email failed:", err?.message);
    }
  }
  if (resend && monday && !isFirstRun) {
    try {
      await resend.emails.send({
        from: OPS_FROM_ADDRESS,
        to: ALERT_TO,
        replyTo: REPLY_TO,
        subject: `[NakshIQ ops] weekly cron health digest — ${digestSubjectLabel}`,
        html: renderDigestHtml(digestTier, health, assetCoverage),
        text: renderDigestText(digestTier, health, assetCoverage),
      });
      digestEmailed = true;
    } catch (err: any) {
      console.error("[watchdog] digest email failed:", err?.message);
    }
  }

  // External heartbeat. If Healthchecks.io doesn't see this ping by the
  // expected time, THEY email the user — covers the case where the
  // watchdog itself fails silently (Vercel infra, deploy regression, etc.).
  // Fire-and-forget; never let a heartbeat failure mask a real result.
  let heartbeatPinged = false;
  const hcUrl = process.env.HEALTHCHECKS_WATCHDOG_URL;
  if (hcUrl) {
    try {
      const hcRes = await fetch(hcUrl, {
        method: "POST",
        body: JSON.stringify({ overall, alertable: alertable.length, first_run: isFirstRun }),
        headers: { "content-type": "application/json" },
      });
      heartbeatPinged = hcRes.ok;
    } catch (err: any) {
      console.error("[watchdog] healthchecks ping failed:", err?.message);
    }
  }

  return NextResponse.json({
    ok: true,
    overall,
    alertable_count: alertable.length,
    monday_digest: monday,
    first_run: isFirstRun,
    alert_emailed: alertEmailed,
    digest_emailed: digestEmailed,
    heartbeat_pinged: heartbeatPinged,
    health,
    asset_coverage: assetCoverage,
  });
}

function statusColour(status: JobHealth["status"]): string {
  if (status === "ok" || status === "scheduled") return "#16a34a";
  if (status === "needs_review") return "#d97706";
  return "#dc2626"; // errored, missing, stale
}

function fmtRow(h: JobHealth): string {
  const last = h.last_run_at ? new Date(h.last_run_at).toISOString().slice(0, 16).replace("T", " ") + " UTC" : "(never)";
  const days = h.days_since === null ? "—" : `${h.days_since}d ago`;
  return `${h.job} — ${h.status.toUpperCase()} — last ${last} (${days}, expected ≤${h.expected_cadence_days}d)`;
}

function renderAlertText(alertable: JobHealth[], all: JobHealth[]): string {
  const lines: string[] = [];
  lines.push(`NakshIQ cron health DEGRADED — ${alertable.length} of ${all.length} jobs need attention.\n`);
  lines.push(`Failing jobs:`);
  alertable.forEach((h) => lines.push(`  • ${fmtRow(h)}`));
  const others = all.filter((h) => !ALERT_STATUSES.has(h.status));
  if (others.length > 0) {
    lines.push(`\nOther jobs:`);
    others.forEach((h) => lines.push(`  • ${fmtRow(h)}`));
  }
  lines.push(`\nDashboard: https://www.nakshiq.com/methodology/freshness`);
  lines.push(`Vercel cron logs: https://vercel.com/dashboard → project → Cron Jobs`);
  return lines.join("\n");
}

function renderAlertHtml(alertable: JobHealth[], all: JobHealth[]): string {
  const rows = all
    .map((h) => {
      const colour = statusColour(h.status);
      const last = h.last_run_at ? new Date(h.last_run_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "(never)";
      return `<tr>
        <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:13px">${h.job}</td>
        <td style="padding:8px 12px;color:${colour};font-weight:600;font-family:ui-monospace,monospace;font-size:13px">${h.status}</td>
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${last}</td>
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${h.days_since ?? "—"}d / ≤${h.expected_cadence_days}d</td>
      </tr>`;
    })
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">NakshIQ cron health: <span style="color:#dc2626">DEGRADED</span></h1>
    <p style="color:#525252;margin:0 0 24px">${alertable.length} of ${all.length} scheduled jobs need attention.</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Job</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Status</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Last run (IST)</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Age / SLA</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="color:#525252;font-size:13px;margin:24px 0 0">
      Dashboard: <a href="https://www.nakshiq.com/methodology/freshness">/methodology/freshness</a><br>
      Vercel cron logs: dashboard → project → Cron Jobs
    </p>
  </body></html>`;
}

function renderDigestText(
  tier: "ok" | "review" | "degraded",
  all: JobHealth[],
  coverage: AssetCoverage | null
): string {
  const label = tier === "ok" ? "ALL GREEN" : tier === "review" ? "REVIEW NEEDED" : "DEGRADED";
  const lines: string[] = [];
  lines.push(`NakshIQ weekly cron health — ${label}\n`);
  all.forEach((h) => lines.push(`  • ${fmtRow(h)}`));
  if (coverage) {
    lines.push(`\nAsset coverage:`);
    lines.push(
      `  • Collection cover videos: ${coverage.collections_with_video}/${coverage.collections_total} (${coverage.collections_pct}%)`
    );
    if (coverage.unlinked_examples.length > 0) {
      lines.push(`    Sample unlinked: ${coverage.unlinked_examples.join(", ")}`);
    }
  }
  lines.push(`\nDashboard: https://www.nakshiq.com/methodology/freshness`);
  return lines.join("\n");
}

function renderDigestHtml(
  tier: "ok" | "review" | "degraded",
  all: JobHealth[],
  coverage: AssetCoverage | null
): string {
  const colour = tier === "ok" ? "#16a34a" : tier === "review" ? "#d97706" : "#dc2626";
  const label = tier === "ok" ? "OK" : tier === "review" ? "REVIEW NEEDED" : "DEGRADED";
  const rows = all
    .map((h) => {
      const c = statusColour(h.status);
      const last = h.last_run_at ? new Date(h.last_run_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "(never)";
      return `<tr>
        <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:13px">${h.job}</td>
        <td style="padding:8px 12px;color:${c};font-weight:600;font-family:ui-monospace,monospace;font-size:13px">${h.status}</td>
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${last}</td>
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${h.days_since ?? "—"}d / ≤${h.expected_cadence_days}d</td>
      </tr>`;
    })
    .join("");
  const coverageBlock = coverage
    ? `<h2 style="font-size:14px;margin:24px 0 8px;color:#525252;text-transform:uppercase;letter-spacing:.05em">Asset coverage</h2>
       <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
         <tbody>
           <tr>
             <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:13px">Collection cover videos</td>
             <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${coverage.collections_with_video}/${coverage.collections_total} (${coverage.collections_pct}%)</td>
           </tr>
         </tbody>
       </table>
       ${coverage.unlinked_examples.length > 0 ? `<p style="color:#525252;font-size:12px;margin:8px 0 0">Sample unlinked: ${coverage.unlinked_examples.join(", ")}</p>` : ""}`
    : "";
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Weekly cron health: <span style="color:${colour}">${label}</span></h1>
    <p style="color:#525252;margin:0 0 24px">All four scheduled jobs and their last-known-good runs.</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5">
      <thead><tr style="background:#fafafa">
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Job</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Status</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Last run (IST)</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#525252">Age / SLA</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${coverageBlock}
    <p style="color:#525252;font-size:13px;margin:24px 0 0">
      Dashboard: <a href="https://www.nakshiq.com/methodology/freshness">/methodology/freshness</a>
    </p>
  </body></html>`;
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getResend, OPS_FROM_ADDRESS, REPLY_TO } from "@/lib/resend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

// Daily watchdog. Runs 02:00 UTC = 07:30 IST. Two jobs in one cron:
// 1. ALWAYS — read ops_reports, compute "days since last run" per cron,
//    write a watchdog row capturing the snapshot. If anything is overdue
//    (or its last run had alerts_count > 0 / ok=false), send an alert
//    email immediately. Silent when everything is green.
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

type JobHealth = {
  job: string;
  expected_cadence_days: number;
  last_run_at: string | null;
  days_since: number | null;
  status: "ok" | "stale" | "missing" | "errored";
  last_alerts_count: number | null;
  last_ok: boolean | null;
};

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
      status = "missing";
    } else {
      daysSince = (now.getTime() - new Date(last.run_at).getTime()) / 86400000;
      if (last.ok === false || (last.alerts_count ?? 0) > 0) status = "errored";
      else if (daysSince > cadence) status = "stale";
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

  const degraded = health.filter((h) => h.status !== "ok");
  const overall: "ok" | "degraded" = degraded.length === 0 ? "ok" : "degraded";

  // Persist the snapshot before any side effects so we always have the
  // record even if email sending throws.
  await supabase.from("ops_reports").insert({
    job: "watchdog",
    summary: { overall, monday_digest: monday, health },
    alerts_count: degraded.length,
    ok: overall === "ok",
  });

  // Email sends — only on degraded OR Monday digest. Skip on first run
  // (see priorWatchdogRuns guard above) so brand-new monthly crons don't
  // trigger spurious "MISSING" alerts before they've had a chance to fire.
  let alertEmailed = false;
  let digestEmailed = false;
  const resend = getResend();
  if (resend && degraded.length > 0 && !isFirstRun) {
    try {
      await resend.emails.send({
        from: OPS_FROM_ADDRESS,
        to: ALERT_TO,
        replyTo: REPLY_TO,
        subject: `[NakshIQ ops] cron health DEGRADED — ${degraded.length} job(s) need attention`,
        html: renderAlertHtml(degraded, health),
        text: renderAlertText(degraded, health),
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
        subject: `[NakshIQ ops] weekly cron health digest — ${overall === "ok" ? "ALL GREEN" : "DEGRADED"}`,
        html: renderDigestHtml(overall, health),
        text: renderDigestText(overall, health),
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
        body: JSON.stringify({ overall, degraded: degraded.length, first_run: isFirstRun }),
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
    degraded_count: degraded.length,
    monday_digest: monday,
    first_run: isFirstRun,
    alert_emailed: alertEmailed,
    digest_emailed: digestEmailed,
    heartbeat_pinged: heartbeatPinged,
    health,
  });
}

function fmtRow(h: JobHealth): string {
  const last = h.last_run_at ? new Date(h.last_run_at).toISOString().slice(0, 16).replace("T", " ") + " UTC" : "(never)";
  const days = h.days_since === null ? "—" : `${h.days_since}d ago`;
  return `${h.job} — ${h.status.toUpperCase()} — last ${last} (${days}, expected ≤${h.expected_cadence_days}d)`;
}

function renderAlertText(degraded: JobHealth[], all: JobHealth[]): string {
  const lines: string[] = [];
  lines.push(`NakshIQ cron health DEGRADED — ${degraded.length} of ${all.length} jobs need attention.\n`);
  lines.push(`Failing jobs:`);
  degraded.forEach((h) => lines.push(`  • ${fmtRow(h)}`));
  if (all.length > degraded.length) {
    lines.push(`\nHealthy jobs:`);
    all.filter((h) => h.status === "ok").forEach((h) => lines.push(`  • ${fmtRow(h)}`));
  }
  lines.push(`\nDashboard: https://www.nakshiq.com/methodology/freshness`);
  lines.push(`Vercel cron logs: https://vercel.com/dashboard → project → Cron Jobs`);
  return lines.join("\n");
}

function renderAlertHtml(degraded: JobHealth[], all: JobHealth[]): string {
  const rows = all
    .map((h) => {
      const colour = h.status === "ok" ? "#16a34a" : "#dc2626";
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
    <p style="color:#525252;margin:0 0 24px">${degraded.length} of ${all.length} scheduled jobs need attention.</p>
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

function renderDigestText(overall: "ok" | "degraded", all: JobHealth[]): string {
  const lines: string[] = [];
  lines.push(`NakshIQ weekly cron health — ${overall.toUpperCase()}\n`);
  all.forEach((h) => lines.push(`  • ${fmtRow(h)}`));
  lines.push(`\nDashboard: https://www.nakshiq.com/methodology/freshness`);
  return lines.join("\n");
}

function renderDigestHtml(overall: "ok" | "degraded", all: JobHealth[]): string {
  const colour = overall === "ok" ? "#16a34a" : "#dc2626";
  const rows = all
    .map((h) => {
      const c = h.status === "ok" ? "#16a34a" : "#dc2626";
      const last = h.last_run_at ? new Date(h.last_run_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "(never)";
      return `<tr>
        <td style="padding:8px 12px;font-family:ui-monospace,monospace;font-size:13px">${h.job}</td>
        <td style="padding:8px 12px;color:${c};font-weight:600;font-family:ui-monospace,monospace;font-size:13px">${h.status}</td>
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${last}</td>
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${h.days_since ?? "—"}d / ≤${h.expected_cadence_days}d</td>
      </tr>`;
    })
    .join("");
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;color:#171717;max-width:640px;margin:0 auto;padding:24px">
    <h1 style="font-size:20px;margin:0 0 8px">Weekly cron health: <span style="color:${colour}">${overall.toUpperCase()}</span></h1>
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
    <p style="color:#525252;font-size:13px;margin:24px 0 0">
      Dashboard: <a href="https://www.nakshiq.com/methodology/freshness">/methodology/freshness</a>
    </p>
  </body></html>`;
}

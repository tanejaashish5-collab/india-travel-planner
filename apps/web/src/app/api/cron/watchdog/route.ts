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
  // refresh-stay-picks removed 2026-08-04 with the metered Vercel cron. The
  // refresh now runs as a scheduled Claude Code agent on the Max plan, which
  // writes its own ops_reports row under the job name "refresh-stay-picks-agent".
  "refresh-stay-picks-agent": 2,
  "freshness-drift": 8,       // weekly cron Mon 01:00 UTC
  "news-sweep": 32,           // monthly cron 1st 01:00 UTC
  "prewarm-next-month": 32,   // monthly cron 28th 01:00 UTC
  "audit-cache-headers": 0.1, // hourly cron — 2h max gap before suspicious
  "audit-gsc-alerts": 2,      // daily cron 03:30 UTC
  "audit-gsc-ga4-correlation": 2, // daily cron 03:45 UTC
  "audit-supabase-advisors": 0.5, // every 6h
  "audit-bot-crawl-rate": 2,  // daily cron 03:00 UTC
  // Added 2026-08-10. These six had been RUNNING but UNWATCHED since they were
  // written — if any had stopped, nothing would have noticed. Cadences are set
  // from measured history (scripts/probe-cron-health.mjs), not from the cron
  // expression, so they reflect what the jobs actually do in production.
  "canary-probe": 0.1,          // every 30 min — measured 30 consecutive clean runs
  "audit-hero-images": 2,       // daily 03:50 UTC — measured exactly 1.0d apart, 30 runs
  "data-baseline": 8,           // weekly — measured exactly 7.0d apart, 18 runs
  "road-conditions-sweep": 8,   // weekly 02:00 UTC — measured 7.0d, 15 runs
  "sos-auto-reverify": 8,       // weekly — the SOS number safety loop
  "sos-verify-reminder": 8,     // weekly
  // DELIBERATELY NOT WATCHED, with reasons:
  //  - send-destination-alerts: writes no ops_reports row at all, so there is
  //    nothing to watch. Instrument it first, then add it here.
  //  - watchdog: watching itself is circular. Its absence is the signal (see the
  //    header note) and an external heartbeat is the belt-and-braces.
  //  - refresh-stay-picks: dead job name, superseded by -agent on 2026-08-04.
  //  - road-sweep-agent: only one run so far (2026-08-10); no cadence can be
  //    inferred from a single point. Add once it has a few weeks of history.
};

// Earliest expected first run per job. Monthly crons deployed mid-cycle may
// be weeks away from their first calendar opportunity to fire — without this,
// a "never run" job is indistinguishable from "not yet had a chance to run"
// and watchdog cries MISSING every day. Set to null once the job has fired
// at least once in production.
const EARLIEST_EXPECTED_FIRST_RUN: Record<string, string | null> = {
  // Grace until the first agent run lands, so the switchover doesn't alert.
  "refresh-stay-picks-agent": "2026-08-06T00:00:00Z",
  "freshness-drift": null,
  "news-sweep": null,
  "prewarm-next-month": "2026-05-28T01:00:00Z", // first 28th after Apr 30 deploy
  // M1-M7 monitors — first-run grace until 2026-05-28 03:00 UTC, after which
  // they should have all fired at least once.
  "audit-cache-headers": "2026-05-27T17:17:00Z",
  "audit-gsc-alerts": "2026-05-28T03:30:00Z",
  "audit-gsc-ga4-correlation": "2026-05-28T03:45:00Z",
  "audit-supabase-advisors": "2026-05-27T18:23:00Z",
  "audit-bot-crawl-rate": "2026-05-28T03:00:00Z",
};

// How long a job may sit CONTINUOUSLY in needs_review before it escalates to
// an alert. Born from the 2026-08-04 scar: refresh-stay-picks wrote ok:true
// with every item failing, which lands as needs_review — a status that by
// design never wakes anyone. It stayed broken 10 days. The watchdog could not
// have caught it: it only ever read the LAST run (limit 1), so "flagged once"
// and "flagged every run for a fortnight" were indistinguishable.
//
// One needs_review is information. A PERSISTENT one is an outage. But the
// right threshold is per-job, because the status means different things:
//   - canary-probe needs_review = pages are 500ing. Escalate fast.
//   - freshness-drift needs_review = editorial review-debt, which it finds most
//     weeks by design and which has a documented 21-day grace window. Escalating
//     that on a short fuse is pure noise, and an alert you learn to ignore is
//     worse than no alert (same reasoning as the first-run suppression below).
// Jobs absent from this map fall back to DEFAULT_ESCALATION_MULTIPLIER × cadence.
//
// ⚠️ OPT-IN, NOT OPT-OUT — and that is the whole point.
//
// The first draft of this gave every job a default fuse. Probing the real
// ops_reports history (scripts/probe-cron-health.mjs, 2026-08-10) showed that
// would have been wrong, because **alerts_count does not mean the same thing in
// different jobs**. Two would have fired a false alarm on day one:
//
//   - refresh-stay-picks-agent had been "flagged" 3 runs running. Its actual
//     payload: ok 20, fail 0, total 20, 43 picks written. The alert was HONEST
//     SCARCITY — the agent declining to invent stays where none exist, which is
//     the data rule working exactly as intended. Escalating it would punish the
//     system for being correct.
//   - audit-gsc-alerts has been flagged 30 runs out of 30. Its own findings say
//     "Contextual only — this is NOT by itself a regression." It is an advisory
//     job whose resting state is needs_review; escalating it can never inform.
//
// So a job only escalates if listed here, and it is only listed if alerts_count
// genuinely counts FAILURES. Everywhere else the number counts findings,
// exceptions, or deliberate honest-scarcity notes, and escalating it would
// manufacture the alert fatigue this file exists to avoid.
const NEEDS_REVIEW_ESCALATION_DAYS: Record<string, number> = {
  "canary-probe": 1,        // alerts_count = failures.length — pages returning 500
  "audit-cache-headers": 2, // alerts_count = violations.length — real cache misconfig
};

// How many recent runs to read per job. Must be enough to measure the longest
// escalation window above at that job's cadence — freshness-drift is weekly
// with a 22-day fuse, so ~4 runs; hourly jobs need far more. 24 covers both
// without a meaningful query-cost change (one extra page of the same index).
const HISTORY_LIMIT = 24;

// Statuses that should trigger the daily alert email. Plain needs_review (cron
// ran fine but found items to review) and scheduled (monthly cron not yet due)
// stay informational — digest only, never wake anyone up. needs_review_stuck is
// the escalation of the former once it has persisted past its per-job window.
const ALERT_STATUSES = new Set([
  "errored",
  "missing",
  "stale",
  "needs_review_stuck",
  "silent_failure",
]);

export type OpsRun = {
  run_at: string;
  alerts_count: number | null;
  ok: boolean | null;
  summary?: unknown;
};

// Share of a job's own items that must fail before we call it a silent failure
// even though it reported ok:true. 0.5 = "half or more of the work didn't work".
const SILENT_FAILURE_RATIO = 0.5;

/**
 * Detect the 2026-08-04 shape directly: a job that reports ok:true while most of
 * its OWN items failed.
 *
 * This is the precise detector for that incident, and it exists because the
 * needs_review escalation above turned out NOT to cover it — alerts_count is
 * semantically overloaded across jobs (see the note on NEEDS_REVIEW_ESCALATION_DAYS),
 * so it cannot be trusted as a failure signal in general. A job's own
 * fail/total counters can be.
 *
 * Reads whatever the job puts in `summary`, so it costs nothing for jobs that
 * don't report counters — they simply return null and are unaffected. Today
 * refresh-stay-picks-agent writes {ok, fail, total}; the old refresh-stay-picks
 * wrote the same shape while failing every item, which is exactly what went
 * unnoticed for 10 days.
 */
export function detectSilentFailure(
  run: OpsRun | null
): { total: number; failed: number; ratio: number } | null {
  if (!run || run.ok !== true) return null; // ok:false already alerts as "errored"
  const s = run.summary as Record<string, unknown> | null | undefined;
  if (!s || typeof s !== "object") return null;
  const total = typeof s.total === "number" ? s.total : null;
  const fail = typeof s.fail === "number" ? s.fail : null;
  if (total === null || fail === null || total <= 0 || fail < 0) return null;
  const ratio = fail / total;
  return ratio >= SILENT_FAILURE_RATIO ? { total, failed: fail, ratio } : null;
}

/**
 * Measure the unbroken run of "flagged but ok" results ending at the newest row.
 *
 * Exported (and unit-tested by scripts/test-watchdog-streak.mjs) because this is
 * the single piece of logic standing between us and another silent outage — the
 * 2026-08-04 one lasted 10 days precisely because nothing measured persistence.
 * Logic that exists to catch silent failure must not itself fail silently, and
 * "it compiles" is not evidence that it fires.
 *
 * `rows` MUST be newest-first. Walking stops at the first clean or errored run:
 * either resets the clock, because the job demonstrably recovered.
 */
export function classifyReviewStreak(
  rows: OpsRun[],
  now: Date,
  escalateAfterDays: number
): { since: string | null; days: number | null; runs: number; stuck: boolean } {
  let since: string | null = null;
  let runs = 0;
  for (const row of rows) {
    if (row.ok === false || (row.alerts_count ?? 0) === 0) break;
    since = row.run_at;
    runs++;
  }
  if (runs === 0 || !since) return { since: null, days: null, runs: 0, stuck: false };
  const days = (now.getTime() - new Date(since).getTime()) / 86400000;
  // Require 2+ runs as well as elapsed time. A single flagged run on a slow
  // cadence can be older than the fuse without the job being stuck — we need to
  // have watched it fail to clear at least once.
  return { since, days, runs, stuck: days >= escalateAfterDays && runs >= 2 };
}

type JobHealth = {
  job: string;
  expected_cadence_days: number;
  last_run_at: string | null;
  days_since: number | null;
  status:
    | "ok"
    | "stale"
    | "missing"
    | "errored"
    | "needs_review"
    | "needs_review_stuck"
    | "silent_failure"
    | "scheduled";
  last_alerts_count: number | null;
  last_ok: boolean | null;
  // Set only when the job reported ok:true while most of its own items failed.
  silent_failure: { total: number; failed: number; ratio: number } | null;
  // Set only while the job is in needs_review / needs_review_stuck: when the
  // unbroken run of flagged runs began, how long it has lasted, and the fuse.
  needs_review_since: string | null;
  needs_review_days: number | null;
  needs_review_runs: number | null;
  escalation_after_days: number | null;
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
      .select("run_at, alerts_count, ok, summary")
      .eq("job", job)
      .order("run_at", { ascending: false })
      .limit(HISTORY_LIMIT);
    const last = data?.[0] ?? null;
    const cadence = EXPECTED_CADENCE_DAYS[job];
    let status: JobHealth["status"];
    let daysSince: number | null = null;
    let reviewSince: string | null = null;
    let reviewDays: number | null = null;
    let reviewRuns: number | null = null;
    // undefined = this job never escalates on a needs_review streak (opt-in).
    const escalateAfter: number | undefined = NEEDS_REVIEW_ESCALATION_DAYS[job];
    const silent = detectSilentFailure(last);
    if (!last) {
      const earliest = EARLIEST_EXPECTED_FIRST_RUN[job];
      if (earliest && new Date(earliest).getTime() > now.getTime()) status = "scheduled";
      else status = "missing";
    } else {
      daysSince = (now.getTime() - new Date(last.run_at).getTime()) / 86400000;
      if (last.ok === false) status = "errored";
      else if (daysSince > cadence) status = "stale";
      // Checked BEFORE the alerts_count branch: a job whose own counters say
      // most of its work failed is broken regardless of what it flagged, and
      // that reading is far more trustworthy than alerts_count.
      else if (silent) status = "silent_failure";
      else if ((last.alerts_count ?? 0) > 0) {
        // Only measure the streak for jobs that opted in — for everyone else
        // needs_review is their normal resting state and carries no signal.
        if (escalateAfter !== undefined) {
          const streak = classifyReviewStreak(data ?? [], now, escalateAfter);
          reviewSince = streak.since;
          reviewDays = streak.days;
          reviewRuns = streak.runs;
          status = streak.stuck ? "needs_review_stuck" : "needs_review";
        } else status = "needs_review";
      } else status = "ok";
    }
    health.push({
      job,
      expected_cadence_days: cadence,
      last_run_at: last?.run_at ?? null,
      days_since: daysSince === null ? null : Number(daysSince.toFixed(1)),
      status,
      last_alerts_count: last?.alerts_count ?? null,
      last_ok: last?.ok ?? null,
      needs_review_since: reviewSince,
      needs_review_days: reviewDays === null ? null : Number(reviewDays.toFixed(1)),
      needs_review_runs: reviewRuns,
      escalation_after_days: reviewSince ? (escalateAfter ?? null) : null,
      silent_failure: silent,
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
        // Name the stuck jobs in the subject. A silently-failing job reporting
        // ok:true reads as healthy everywhere else, so the subject is the only
        // place it can announce itself before you open anything.
        subject: (() => {
          const silent = alertable.filter(
            (h) => h.status === "silent_failure" || h.status === "needs_review_stuck"
          );
          return silent.length > 0
            ? `[NakshIQ ops] cron health DEGRADED — ${alertable.length} job(s), ${silent.length} FAILING SILENTLY (${silent.map((h) => h.job).join(", ")})`
            : `[NakshIQ ops] cron health DEGRADED — ${alertable.length} job(s) need attention`;
        })(),
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
  return "#dc2626"; // errored, missing, stale, needs_review_stuck
}

// Explains a needs_review streak in the email body. Without this the reader
// sees the word "needs_review_stuck" and has no idea why today differs from
// yesterday, which is how an alert becomes wallpaper.
function reviewSuffix(h: JobHealth): string {
  if (h.silent_failure) {
    const { failed, total, ratio } = h.silent_failure;
    return ` — SILENT FAILURE: ${failed} of ${total} items failed (${Math.round(ratio * 100)}%) but the job reported ok:true, so every other signal reads healthy. This is the 2026-08-04 shape.`;
  }
  if (h.needs_review_days === null || h.needs_review_runs === null) return "";
  const fuse = h.escalation_after_days;
  const core = `flagged ${h.needs_review_runs} run(s) in a row over ${h.needs_review_days}d`;
  return h.status === "needs_review_stuck"
    ? ` — STUCK: ${core}, past its ${fuse}d limit. Reporting ok:true, so it looks healthy; check whether its items are actually failing.`
    : ` — ${core} (escalates at ${fuse}d)`;
}

// HTML twin of reviewSuffix, for the table cell in both email renderers.
function reviewCell(h: JobHealth, colour: string): string {
  if (h.silent_failure) {
    const { failed, total } = h.silent_failure;
    return `<br><span style="color:${colour}">${failed}/${total} items failed, reported ok:true</span>`;
  }
  if (h.needs_review_days === null) return "";
  const tail =
    h.status === "needs_review_stuck"
      ? `(past ${h.escalation_after_days}d limit)`
      : `(escalates at ${h.escalation_after_days}d)`;
  return `<br><span style="color:${colour}">flagged ${h.needs_review_runs}× over ${h.needs_review_days}d ${tail}</span>`;
}

function fmtRow(h: JobHealth): string {
  const last = h.last_run_at ? new Date(h.last_run_at).toISOString().slice(0, 16).replace("T", " ") + " UTC" : "(never)";
  const days = h.days_since === null ? "—" : `${h.days_since}d ago`;
  return `${h.job} — ${h.status.toUpperCase()} — last ${last} (${days}, expected ≤${h.expected_cadence_days}d)${reviewSuffix(h)}`;
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
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${h.days_since ?? "—"}d / ≤${h.expected_cadence_days}d${reviewCell(h, colour)}</td>
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
        <td style="padding:8px 12px;color:#525252;font-family:ui-monospace,monospace;font-size:13px">${h.days_since ?? "—"}d / ≤${h.expected_cadence_days}d${reviewCell(h, c)}</td>
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

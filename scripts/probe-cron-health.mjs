/**
 * probe-cron-health.mjs — READ-ONLY. Report the real ops_reports history for
 * every cron, so watchdog coverage can be extended on evidence instead of guesses.
 *
 * WHY
 * ---
 * Eight running crons are absent from the watchdog's EXPECTED_CADENCE_DAYS map,
 * so if they stopped, nothing would notice. Adding them blind is dangerous in the
 * opposite direction: a job with no recent row lands as MISSING and alerts every
 * single day forever, which trains you to ignore the alert — the exact failure
 * the watchdog is written to avoid. So: measure first, then set cadences.
 *
 * Writes nothing. Reads one small page per job (well under the 500-row bulk
 * threshold that would require direct Postgres per the egress rules).
 *
 * USAGE
 *   node --env-file=apps/web/.env.local scripts/probe-cron-health.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✗ NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing.");
  console.error("  Run with: node --env-file=apps/web/.env.local scripts/probe-cron-health.mjs");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Every job name that appears in ops_reports, not just the ones we expect —
// a job writing under a name nobody watches is exactly how this goes wrong.
const { data: recent, error } = await supabase
  .from("ops_reports")
  .select("job, run_at, ok, alerts_count")
  .order("run_at", { ascending: false })
  .limit(4000);

if (error) {
  console.error("✗ query failed:", error.message);
  process.exit(1);
}

const byJob = new Map();
for (const r of recent ?? []) {
  if (!byJob.has(r.job)) byJob.set(r.job, []);
  byJob.get(r.job).push(r);
}

const now = Date.now();
const rows = [];
for (const [job, runs] of byJob) {
  const last = runs[0];
  const daysSince = (now - new Date(last.run_at).getTime()) / 86400000;

  // Median gap between consecutive runs = the job's observed real cadence.
  const gaps = [];
  for (let i = 0; i < Math.min(runs.length - 1, 20); i++) {
    gaps.push((new Date(runs[i].run_at) - new Date(runs[i + 1].run_at)) / 86400000);
  }
  gaps.sort((a, b) => a - b);
  const medianGap = gaps.length ? gaps[Math.floor(gaps.length / 2)] : null;

  // Current unbroken streak of flagged-but-ok runs (the watchdog's new signal).
  let streak = 0;
  let streakDays = 0;
  for (const r of runs) {
    if (r.ok === false || (r.alerts_count ?? 0) === 0) break;
    streak++;
    streakDays = (now - new Date(r.run_at).getTime()) / 86400000;
  }

  const flaggedShare = runs.filter((r) => (r.alerts_count ?? 0) > 0).length / runs.length;

  rows.push({
    job,
    runs: runs.length,
    lastAgo: daysSince,
    medianGap,
    lastOk: last.ok,
    lastAlerts: last.alerts_count ?? 0,
    streak,
    streakDays,
    flaggedShare,
  });
}

rows.sort((a, b) => a.job.localeCompare(b.job));

const f = (n, d = 1) => (n === null || n === undefined ? "—" : Number(n).toFixed(d));
console.log(
  "job".padEnd(30) +
    "runs".padStart(6) +
    "last".padStart(9) +
    "cadence".padStart(9) +
    "ok".padStart(6) +
    "alerts".padStart(8) +
    "streak".padStart(8) +
    "flagged%".padStart(10)
);
console.log("-".repeat(86));
for (const r of rows) {
  console.log(
    r.job.padEnd(30) +
      String(r.runs).padStart(6) +
      `${f(r.lastAgo)}d`.padStart(9) +
      `${f(r.medianGap)}d`.padStart(9) +
      String(r.lastOk).padStart(6) +
      String(r.lastAlerts).padStart(8) +
      (r.streak ? `${r.streak}/${f(r.streakDays)}d` : "—").padStart(8) +
      `${(r.flaggedShare * 100).toFixed(0)}%`.padStart(10)
  );
}

console.log(`\n${rows.length} distinct job names in ops_reports.`);
console.log(
  "\nReading this: `cadence` is the OBSERVED median gap — set EXPECTED_CADENCE_DAYS\n" +
    "above it with headroom. `flagged%` is how often the job sits in needs_review;\n" +
    "a high share means it is review-by-design and needs a LONG escalation fuse.\n" +
    "`streak` is the current unbroken flagged-but-ok run — anything non-trivial here\n" +
    "is a candidate silent failure worth opening before it gets a fuse."
);

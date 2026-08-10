/**
 * simulate-watchdog.mjs — READ-ONLY dry run of the watchdog's classification
 * against the REAL ops_reports table, without sending anything.
 *
 * WHY
 * ---
 * Changing what wakes someone up is only safe if you know what it will do on the
 * first run. Unit tests prove the logic is correct on invented inputs; this
 * proves it is quiet on live data. Two false alarms on deploy day would teach
 * the reader to ignore the alert, which is worse than the gap being fixed.
 *
 * Mirrors the route's config and classification. If the two ever drift, the
 * check below fails loudly rather than reporting a comforting fiction.
 *
 * USAGE
 *   node --env-file=apps/web/.env.local scripts/simulate-watchdog.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const SRC = "apps/web/src/app/api/cron/watchdog/route.ts";
const src = readFileSync(SRC, "utf8");

// Pull the real config + logic out of the route so this cannot drift from it.
const grab = (re, label) => {
  const m = src.match(re);
  if (!m) {
    console.error(`✗ could not extract ${label} from ${SRC} — refusing to simulate against a guess.`);
    process.exit(1);
  }
  return m[0];
};
const cadenceBlock = grab(/const EXPECTED_CADENCE_DAYS[\s\S]*?\n\};\n/, "EXPECTED_CADENCE_DAYS");
const escalationBlock = grab(/const NEEDS_REVIEW_ESCALATION_DAYS[\s\S]*?\n\};\n/, "NEEDS_REVIEW_ESCALATION_DAYS");
const earliestBlock = grab(/const EARLIEST_EXPECTED_FIRST_RUN[\s\S]*?\n\};\n/, "EARLIEST_EXPECTED_FIRST_RUN");
const ratioLine = grab(/const SILENT_FAILURE_RATIO = [^\n]*\n/, "SILENT_FAILURE_RATIO");
const opsType = grab(/export type OpsRun = \{[\s\S]*?\n\};\n/, "OpsRun");
const streakFn = grab(/export function classifyReviewStreak\([\s\S]*?\n\}\n/, "classifyReviewStreak");
const silentFn = grab(/export function detectSilentFailure\([\s\S]*?\n\}\n/, "detectSilentFailure");

const dir = mkdtempSync(join(tmpdir(), "watchdog-sim-"));
const tmp = join(dir, "logic.ts");
writeFileSync(
  tmp,
  [opsType, ratioLine, streakFn, silentFn,
   cadenceBlock.replace("const ", "export const "),
   escalationBlock.replace("const ", "export const "),
   earliestBlock.replace("const ", "export const ")].join("\n")
);
const L = await import(tmp);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✗ run with: node --env-file=apps/web/.env.local scripts/simulate-watchdog.mjs");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const ALERT_STATUSES = new Set(["errored", "missing", "stale", "needs_review_stuck", "silent_failure"]);
const now = new Date();
const HISTORY_LIMIT = 24;

const results = [];
for (const job of Object.keys(L.EXPECTED_CADENCE_DAYS)) {
  const { data } = await supabase
    .from("ops_reports")
    .select("run_at, alerts_count, ok, summary")
    .eq("job", job)
    .order("run_at", { ascending: false })
    .limit(HISTORY_LIMIT);
  const last = data?.[0] ?? null;
  const cadence = L.EXPECTED_CADENCE_DAYS[job];
  const escalateAfter = L.NEEDS_REVIEW_ESCALATION_DAYS[job];
  const silent = L.detectSilentFailure(last);
  let status, detail = "";
  let daysSince = null;
  if (!last) {
    const earliest = L.EARLIEST_EXPECTED_FIRST_RUN[job];
    status = earliest && new Date(earliest) > now ? "scheduled" : "missing";
  } else {
    daysSince = (now - new Date(last.run_at)) / 86400000;
    if (last.ok === false) status = "errored";
    else if (daysSince > cadence) status = "stale";
    else if (silent) {
      status = "silent_failure";
      detail = `${silent.failed}/${silent.total} failed`;
    } else if ((last.alerts_count ?? 0) > 0) {
      if (escalateAfter !== undefined) {
        const s = L.classifyReviewStreak(data ?? [], now, escalateAfter);
        status = s.stuck ? "needs_review_stuck" : "needs_review";
        detail = `${s.runs} run(s)/${s.days?.toFixed(1)}d, fuse ${escalateAfter}d`;
      } else {
        status = "needs_review";
        detail = `${last.alerts_count} flagged (no escalation — opted out)`;
      }
    } else status = "ok";
  }
  results.push({ job, status, daysSince, cadence, detail, alerts: last?.alerts_count ?? 0 });
}

const alertable = results.filter((r) => ALERT_STATUSES.has(r.status));

console.log("SIMULATED WATCHDOG RUN — nothing sent\n");
console.log("job".padEnd(28) + "status".padEnd(20) + "age/SLA".padEnd(16) + "detail");
console.log("-".repeat(96));
for (const r of results.sort((a, b) => a.job.localeCompare(b.job))) {
  const mark = ALERT_STATUSES.has(r.status) ? "\x1b[31m!\x1b[0m " : "  ";
  const age = r.daysSince === null ? "(never)" : `${r.daysSince.toFixed(1)}d / ≤${r.cadence}d`;
  console.log(mark + r.job.padEnd(26) + r.status.padEnd(20) + age.padEnd(16) + r.detail);
}

console.log(`\n${results.length} jobs watched · ${alertable.length} would ALERT on the next run`);
if (alertable.length === 0) {
  console.log("\n\x1b[32m✓ deploying this sends no new alert email.\x1b[0m");
} else {
  console.log("\n\x1b[31m! these would fire immediately:\x1b[0m");
  alertable.forEach((r) => console.log(`   ${r.job} — ${r.status} ${r.detail}`));
  console.log("\n  Decide deliberately: is each a REAL problem worth an email, or a\n  mis-set threshold? Shipping a known false alarm is how alerts die.");
}

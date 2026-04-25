#!/usr/bin/env node
/**
 * audit-thin-content.mjs — surface Mahabaleshwar/May-tier pages.
 *
 * Research context: R2 (compass forensic) flagged the Mahabaleshwar/May
 * production error — "Hot and humid. Pre-monsoon. Not ideal." — as the
 * quality-floor smoking gun: "Google and LLMs grade on the crappiest page
 * they crawl." R2 §9 #4 and R1 §2.2 both say: audit every (dest, month)
 * pair; anything sub-150 words gets rewritten, merged, or 410'd.
 *
 * This script is the first half of that — it surfaces the queue. The
 * second half is the rewrite (Sprint 8).
 *
 * Output tiers:
 *   - CRITICAL: verdict='go' with why_go < 150 chars (the worst class)
 *   - HIGH:     verdict='skip' with why_not < 100 chars (justify your skip)
 *   - MEDIUM:   verdict='wait' with either field thin
 *   - LOW:      null verdict + thin prose (unscored months are acceptable
 *               as placeholders during backfill)
 *
 * Usage:
 *   node scripts/audit-thin-content.mjs                    # full report
 *   node scripts/audit-thin-content.mjs --state himachal   # filter by state
 *   node scripts/audit-thin-content.mjs --limit 50         # first N rows
 *   node scripts/audit-thin-content.mjs --export           # write to data/thin-content-queue.json
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return fallback;
  const next = args[i + 1];
  return !next || next.startsWith("--") ? true : next;
}

const STATE_FILTER = flag("state");
const LIMIT = flag("limit") ? Number(flag("limit")) : null;
const EXPORT = args.includes("--export");
// --ci → exit non-zero when any CRITICAL row exists. Used by GitHub Actions
// to block merges that re-introduce sub-150-char "go" pages (R2 §9 #4).
const CI = args.includes("--ci");

const GO_MIN = 150;
const SKIP_MIN = 100;
const WAIT_MIN = 120;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

console.log(`audit-thin-content · surface Mahabaleshwar/May-tier pages\n`);

const MONTH_NAMES = {
  1: "January", 2: "February", 3: "March", 4: "April",
  5: "May", 6: "June", 7: "July", 8: "August",
  9: "September", 10: "October", 11: "November", 12: "December",
};

// Pull all destination_months with parent destination info — paginated past
// Supabase's 1000-row default (the earlier version of this script hit that
// silent cap and reported 999 thin rows when the true count was ~5,800).
async function fetchAll() {
  const all = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destination_months")
      .select(`
        destination_id, month, verdict, score,
        why_go, why_not,
        destinations!inner(name, state:states!inner(id, name))
      `)
      .range(from, from + page - 1);
    if (error) {
      console.error(`✗ query failed: ${error.message}`);
      process.exit(1);
    }
    all.push(...(data ?? []));
    if (!data || data.length < page) break;
    from += page;
  }
  return all;
}

const data = await fetchAll();

const rows = (data ?? []).filter((r) => {
  if (!STATE_FILTER) return true;
  const stateName = Array.isArray(r.destinations?.state)
    ? r.destinations.state[0]?.name
    : r.destinations?.state?.name;
  return stateName?.toLowerCase().includes(STATE_FILTER.toLowerCase()) ||
         r.destinations?.state?.id?.toLowerCase() === STATE_FILTER.toLowerCase();
});

console.log(`Scanned ${rows.length} destination_months rows${STATE_FILTER ? ` (filtered to ${STATE_FILTER})` : ""}\n`);

// Tier the results
const critical = [];
const high = [];
const medium = [];
const low = [];

for (const r of rows) {
  const goLen = (r.why_go || "").length;
  const notLen = (r.why_not || "").length;
  const name = r.destinations?.name ?? r.destination_id;
  const state = Array.isArray(r.destinations?.state)
    ? r.destinations.state[0]?.name
    : r.destinations?.state?.name ?? "?";
  const entry = {
    destination_id: r.destination_id,
    destination_name: name,
    state,
    month: r.month,
    month_name: MONTH_NAMES[r.month],
    verdict: r.verdict,
    score: r.score,
    why_go_len: goLen,
    why_not_len: notLen,
    sample_text: (r.why_go || r.why_not || "").slice(0, 80),
  };

  if (r.verdict === "go" && goLen < GO_MIN) critical.push(entry);
  else if (r.verdict === "skip" && notLen < SKIP_MIN) high.push(entry);
  else if (r.verdict === "wait" && (goLen < WAIT_MIN && notLen < WAIT_MIN)) medium.push(entry);
  else if (!r.verdict && goLen < GO_MIN && notLen < 50) low.push(entry);
}

function sortByState(arr) {
  return arr.sort((a, b) =>
    a.state.localeCompare(b.state) ||
    a.destination_id.localeCompare(b.destination_id) ||
    a.month - b.month
  );
}

critical.sort((a, b) => a.why_go_len - b.why_go_len);
high.sort((a, b) => a.why_not_len - b.why_not_len);
sortByState(medium);
sortByState(low);

console.log(`═══════════════════════════════════════════════`);
console.log(`  CRITICAL: verdict='go' with why_go < ${GO_MIN} chars`);
console.log(`  ${critical.length} rows`);
console.log(`═══════════════════════════════════════════════`);
const showCritical = LIMIT ? critical.slice(0, LIMIT) : critical.slice(0, 30);
for (const c of showCritical) {
  console.log(`  ${c.destination_id.padEnd(25)} ${c.month_name.padEnd(10)} ${String(c.why_go_len).padStart(4)} ch · "${c.sample_text}"`);
}
if (critical.length > showCritical.length) {
  console.log(`  (+${critical.length - showCritical.length} more)`);
}

console.log(`\n═══════════════════════════════════════════════`);
console.log(`  HIGH: verdict='skip' with why_not < ${SKIP_MIN} chars`);
console.log(`  ${high.length} rows`);
console.log(`═══════════════════════════════════════════════`);
const showHigh = LIMIT ? high.slice(0, LIMIT) : high.slice(0, 20);
for (const c of showHigh) {
  console.log(`  ${c.destination_id.padEnd(25)} ${c.month_name.padEnd(10)} ${String(c.why_not_len).padStart(4)} ch`);
}
if (high.length > showHigh.length) {
  console.log(`  (+${high.length - showHigh.length} more)`);
}

console.log(`\n═══════════════════════════════════════════════`);
console.log(`  SUMMARY`);
console.log(`═══════════════════════════════════════════════`);
console.log(`  CRITICAL (go verdict, bare why_go):   ${String(critical.length).padStart(4)}`);
console.log(`  HIGH     (skip verdict, bare why_not): ${String(high.length).padStart(4)}`);
console.log(`  MEDIUM   (wait verdict, both thin):    ${String(medium.length).padStart(4)}`);
console.log(`  LOW      (no verdict + empty prose):   ${String(low.length).padStart(4)}`);
console.log(`  TOTAL ROWS NEEDING ATTENTION:          ${String(critical.length + high.length + medium.length + low.length).padStart(4)}`);
console.log(`  % OF 5856 MONTH ROWS:                   ${String(Math.round((critical.length + high.length + medium.length + low.length) / 5856 * 100)).padStart(3)}%`);

if (EXPORT) {
  const path = "data/thin-content-queue.json";
  writeFileSync(path, JSON.stringify({
    generated_at: new Date().toISOString(),
    thresholds: { go: GO_MIN, skip: SKIP_MIN, wait: WAIT_MIN },
    counts: {
      critical: critical.length,
      high: high.length,
      medium: medium.length,
      low: low.length,
    },
    rows: { critical, high, medium, low },
  }, null, 2));
  console.log(`\n  → exported to ${path}`);
}

console.log(`\n  Next step: Sprint 8 rewrite queue. Prioritize CRITICAL; merge or 410 LOW.`);

if (CI) {
  if (critical.length > 0) {
    console.error(`\n✗ CI gate failed: ${critical.length} CRITICAL rows (verdict=go with why_go < ${GO_MIN} chars).`);
    console.error(`  Fix the critical rows above before merging. Run without --ci for the full report.`);
    process.exit(1);
  }
  console.log(`\n✓ CI gate passed: 0 CRITICAL rows below ${GO_MIN}-char threshold.`);
}

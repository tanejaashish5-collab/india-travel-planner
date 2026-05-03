#!/usr/bin/env node
/**
 * audit-emergency-numbers.mjs — manual monthly run.
 *
 * Lists emergency_sos rows that need re-verification:
 *   - never marked verified, OR
 *   - last verified > 30 days ago, OR
 *   - missing source_url
 *
 * Output is grouped by state so the editorial pass is easy:
 * "this week: re-check all Tamil Nadu SOS rows".
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/audit-emergency-numbers.mjs
 *
 * Optional flags:
 *   --json          emit machine-readable JSON instead of grouped text
 *   --max=N         cap output (default unlimited)
 *   --state=tamil   filter to one state (substring, case-insensitive)
 */
import { createClient } from "@supabase/supabase-js";

const args = process.argv.slice(2);
const flagJson = args.includes("--json");
const maxFlag = args.find((a) => a.startsWith("--max="));
const stateFlag = args.find((a) => a.startsWith("--state="));
const cap = maxFlag ? parseInt(maxFlag.split("=")[1], 10) : Infinity;
const stateFilter = stateFlag ? stateFlag.split("=")[1].toLowerCase() : null;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

const { data: rows, error } = await supabase
  .from("emergency_sos")
  .select("destination_id, verified, verified_date, last_verified_attempt_at, source_url, source_label, destinations:destination_id(name, state_id)");
if (error) {
  console.error("Fetch failed:", error.message);
  process.exit(1);
}

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const nowMs = Date.now();

const stale = rows
  .map((r) => {
    const verifiedMs = r.verified_date ? new Date(r.verified_date).getTime() : 0;
    const attemptedMs = r.last_verified_attempt_at ? new Date(r.last_verified_attempt_at).getTime() : 0;
    const lastTouch = Math.max(verifiedMs, attemptedMs);
    const daysSince = lastTouch ? Math.floor((nowMs - lastTouch) / 86400_000) : null;
    const reasons = [];
    if (!r.verified) reasons.push("not_verified");
    if (!r.verified_date) reasons.push("no_verified_date");
    else if (verifiedMs < nowMs - THIRTY_DAYS_MS) reasons.push(`stale_${daysSince}d`);
    if (!r.source_url) reasons.push("no_source_url");
    return {
      destination_id: r.destination_id,
      name: r.destinations?.name ?? r.destination_id,
      state: r.destinations?.state_id ?? "?",
      verified: r.verified ?? false,
      verified_date: r.verified_date,
      source_url: r.source_url,
      source_label: r.source_label,
      days_since: daysSince,
      reasons,
    };
  })
  .filter((r) => r.reasons.length > 0)
  .filter((r) => !stateFilter || r.state.toLowerCase().includes(stateFilter))
  .sort((a, b) => (b.days_since ?? 99999) - (a.days_since ?? 99999))
  .slice(0, cap);

if (flagJson) {
  console.log(JSON.stringify(stale, null, 2));
  process.exit(0);
}

console.log(`\n=== SOS verification audit ===`);
console.log(`Run at: ${new Date().toISOString()}`);
console.log(`Total rows in emergency_sos: ${rows.length}`);
console.log(`Need attention: ${stale.length}\n`);

const byState = new Map();
for (const r of stale) {
  if (!byState.has(r.state)) byState.set(r.state, []);
  byState.get(r.state).push(r);
}

for (const [state, items] of [...byState.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`── ${state.toUpperCase()} (${items.length}) ──`);
  for (const r of items) {
    const days = r.days_since == null ? "never" : `${r.days_since}d ago`;
    const src = r.source_url ? `[${r.source_label ?? new URL(r.source_url).host}]` : "[NO SOURCE]";
    console.log(`  ${r.name.padEnd(28)} · last check ${days.padEnd(12)} ${src}  →  ${r.reasons.join(", ")}`);
  }
  console.log();
}

console.log(`Action: WebFetch each row's likely source (state-police.gov.in / hospital site / tourist board), confirm numbers, then UPDATE emergency_sos SET verified=true, verified_date=NOW(), source_url=..., source_label=... WHERE destination_id='...';`);

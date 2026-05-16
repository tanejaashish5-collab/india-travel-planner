#!/usr/bin/env node
/**
 * seed-missing-month-rows.mjs — deterministic fill for dests with 0/12 destination_months.
 *
 * Targets the 14 dests surfaced by qa/cinematic-readiness.json (mostly Maharashtra
 * Ashtavinayak temples + Buddhist caves + Katra/Tiruvannamalai pilgrimages).
 *
 * Fill rule (no LLM, no editorial calls):
 *   month in destinations.best_months    → score=4, note=GOOD_NOTE(month)
 *   month in destinations.avoid_months   → score=2, note=AVOID_NOTE(month)
 *   else                                 → score=3, note=NEUTRAL_NOTE(month)
 *   verdict = NULL on every row (allowed by dm_prose_floor; surfaces later
 *   in MOAT audit so prose backfill picks them up).
 *
 * The note is short on purpose — these rows exist to unblock readiness counts,
 * not to ship editorial prose. prose_lead stays NULL (Tier C → Tier C still,
 * just with all 12 months scored).
 *
 * Usage: node scripts/seed-missing-month-rows.mjs [--dry]
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const DRY = process.argv.includes("--dry");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

console.log(`seed-missing-month-rows · dry=${DRY}\n`);

// Supabase server-caps .select() at 1000 rows. Page through with .range().
async function selectAll(table, columns) {
  const PAGE = 1000;
  let from = 0;
  const all = [];
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    all.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

// 1. Find dests with <12 destination_months rows
const allDests = await selectAll("destinations", "id, name, best_months, avoid_months");
const existingRows = await selectAll("destination_months", "destination_id, month");
console.log(`destinations: ${allDests.length}  destination_months rows: ${existingRows.length}`);

const existingByDest = new Map();
for (const r of existingRows) {
  if (!existingByDest.has(r.destination_id)) existingByDest.set(r.destination_id, new Set());
  existingByDest.get(r.destination_id).add(r.month);
}

const targets = allDests.filter((d) => {
  const set = existingByDest.get(d.id) || new Set();
  return set.size < 12;
});
console.log(`dests needing fill: ${targets.length}`);
for (const d of targets) {
  const have = (existingByDest.get(d.id) || new Set()).size;
  console.log(`  ${d.id} — has ${have}/12 — best=${JSON.stringify(d.best_months)} avoid=${JSON.stringify(d.avoid_months)}`);
}

// 2. Build rows to insert
function noteFor(monthIdx, score) {
  const m = MONTH_NAMES[monthIdx - 1];
  if (score === 4) return `${m} is one of the better windows here.`;
  if (score === 2) return `${m} is a weaker window — check weather and crowds before locking dates.`;
  return `${m} is workable. Crowds and weather are mid-range.`;
}

const rows = [];
for (const d of targets) {
  const have = existingByDest.get(d.id) || new Set();
  const best = new Set(d.best_months || []);
  const avoid = new Set(d.avoid_months || []);
  for (let m = 1; m <= 12; m++) {
    if (have.has(m)) continue;
    let score = 3;
    if (best.has(m)) score = 4;
    else if (avoid.has(m)) score = 2;
    rows.push({
      destination_id: d.id,
      month: m,
      score,
      note: noteFor(m, score),
      verdict: null,
    });
  }
}
console.log(`\nrows to upsert: ${rows.length}`);

if (DRY) {
  console.log("(dry run — not writing)");
  process.exit(0);
}

// 3. Upsert in batches
const BATCH = 50;
let done = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const slice = rows.slice(i, i + BATCH);
  const { error } = await supabase
    .from("destination_months")
    .upsert(slice, { onConflict: "destination_id,month" });
  if (error) {
    console.error(`batch ${i}: ${error.message}`);
    process.exit(1);
  }
  done += slice.length;
  console.log(`  upserted ${done}/${rows.length}`);
}

console.log(`\ndone — ${rows.length} rows upserted across ${targets.length} dests.`);

#!/usr/bin/env node
/**
 * Batch 3 · Phase 1 — backfill supplementary tables for the 8 new destinations.
 *
 * Fills points_of_interest, hidden_gems, festivals, local_legends, viral_eats,
 * local_stays for kaza, chandratal, har-ki-doon, hemkund-sahib, khardung-la,
 * turtuk, dambuk, aalo.
 *
 * Every row is research-verified. Sources documented inline in the seed JSON.
 *
 * Behaviour:
 *   - points_of_interest + hidden_gems use TEXT ids → upsert on id (safe re-run)
 *   - festivals / local_legends / viral_eats / local_stays use UUID auto-gen →
 *     we first delete existing rows for the 8 destinations, then insert.
 *     This makes the script idempotent for this subset.
 *
 * Freshness invariant (2026-04-23):
 *   These supplementary tables don't carry content_reviewed_at columns —
 *   the parent destination's stamp is the source of truth. This seeder
 *   also bumps the parent destinations' content_reviewed_at to now() to
 *   reflect the research pass that produced these supplementary rows.
 *
 * Usage:
 *   node scripts/seed-batch3-supplementary.mjs          # dry
 *   node scripts/seed-batch3-supplementary.mjs --commit # write
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const COMMIT = process.argv.includes("--commit");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const BATCH3_IDS = ["kaza", "chandratal", "har-ki-doon", "hemkund-sahib", "khardung-la", "turtuk", "dambuk", "aalo"];

const data = JSON.parse(readFileSync("supabase/seed/batch3-supplementary-data.json", "utf-8"));

async function wipeForBatch3(table, column) {
  if (!COMMIT) {
    console.log(`  (would wipe ${table} rows where ${column} in batch3)`);
    return;
  }
  const { error } = await supabase.from(table).delete().in(column, BATCH3_IDS);
  if (error) console.error(`  ✗ wipe ${table}: ${error.message}`);
  else console.log(`  ✓ wiped ${table} rows for batch3 destinations`);
}

async function upsert(table, rows, conflict) {
  if (!COMMIT) {
    console.log(`  (would upsert ${rows.length} into ${table})`);
    return { ok: rows.length, err: 0 };
  }
  let ok = 0, err = 0;
  for (const r of rows) {
    const { error } = await supabase.from(table).upsert(r, { onConflict: conflict });
    if (error) { console.error(`  ✗ ${table} ${r.id ?? r.name}: ${error.message}`); err++; }
    else ok++;
  }
  console.log(`  ✓ ${table}: ${ok} upserted, ${err} failed`);
  return { ok, err };
}

async function insert(table, rows) {
  if (!COMMIT) {
    console.log(`  (would insert ${rows.length} into ${table})`);
    return { ok: rows.length, err: 0 };
  }
  const { error } = await supabase.from(table).insert(rows);
  if (error) {
    console.error(`  ✗ ${table}: ${error.message}`);
    return { ok: 0, err: rows.length };
  }
  console.log(`  ✓ ${table}: ${rows.length} inserted`);
  return { ok: rows.length, err: 0 };
}

console.log(`Batch 3 supplementary-data seeder (${COMMIT ? "COMMIT" : "DRY"})\n`);

// Section 1 — idempotent upserts (TEXT ids)
console.log("== points_of_interest ==");
await upsert("points_of_interest", data.points_of_interest, "id");

console.log("\n== hidden_gems ==");
await upsert("hidden_gems", data.hidden_gems, "id");

// Section 2 — wipe + insert (UUID auto-gen)
console.log("\n== festivals (wipe + insert) ==");
await wipeForBatch3("festivals", "destination_id");
await insert("festivals", data.festivals);

console.log("\n== local_legends (wipe + insert) ==");
await wipeForBatch3("local_legends", "destination_id");
await insert("local_legends", data.local_legends);

console.log("\n== viral_eats (wipe + insert) ==");
await wipeForBatch3("viral_eats", "destination_id");
await insert("viral_eats", data.viral_eats);

console.log("\n== local_stays (wipe + insert) ==");
await wipeForBatch3("local_stays", "destination_id");
await insert("local_stays", data.local_stays);

// Bump parent destinations' content_reviewed_at — this research pass IS a review.
if (COMMIT) {
  console.log("\n== parent destinations content_reviewed_at ==");
  const { error: stampErr, count } = await supabase
    .from("destinations")
    .update({ content_reviewed_at: new Date().toISOString() }, { count: "exact" })
    .in("id", BATCH3_IDS);
  if (stampErr) console.error(`  ✗ stamp: ${stampErr.message}`);
  else console.log(`  ✓ stamped ${count ?? BATCH3_IDS.length} destinations as reviewed`);
}

console.log(`\nDone (${COMMIT ? "committed" : "dry only"}).`);

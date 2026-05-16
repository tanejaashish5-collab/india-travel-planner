#!/usr/bin/env node
/**
 * Session 4 unified applier: PB+HR+CH + JH+CG + MN+MZ — eats + gems + stays.
 * Same pattern as _apply-s3-topup.mjs.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const eatFiles = [
  "data/research/eateries/pbhrch-2026-05-08.json",
  "data/research/eateries/jhcg-2026-05-08.json",
  "data/research/eateries/mnmz-2026-05-08.json",
];
const gemFiles = [
  "data/research/pbhrch-gems-2026-05-08.json",
  "data/research/jhcg-gems-2026-05-08.json",
  "data/research/mnmz-gems-2026-05-08.json",
];
const stayFiles = [
  "data/research/pbhrch-stays-2026-05-08.json",
  "data/research/jhcg-stays-2026-05-08.json",
  "data/research/mnmz-stays-2026-05-08.json",
];

function readJsonFlat(paths) {
  return paths.flatMap((p) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : []));
}

function normalizePriceRange(pr) {
  if (!pr) return null;
  const ALLOWED = new Set(["₹", "₹₹", "₹₹₹", "₹₹₹₹"]);
  if (ALLOWED.has(pr)) return pr;
  // Parse "₹X-Y per head" / "₹X-₹Y" / etc.
  const match = pr.match(/(\d+)/);
  if (!match) return null;
  const low = parseInt(match[1], 10);
  if (low < 100) return "₹";
  if (low < 500) return "₹₹";
  if (low < 1500) return "₹₹₹";
  return "₹₹₹₹";
}

function cleanEat(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== null) out[k] = v;
  }
  if (out.price_range) {
    const normalized = normalizePriceRange(out.price_range);
    if (normalized) out.price_range = normalized;
    else delete out.price_range;
  }
  out.is_active = true;
  if (out.is_legendary === undefined) out.is_legendary = false;
  return out;
}

// --- Eateries ---
const eats = readJsonFlat(eatFiles);
console.log(`eats from JSON: ${eats.length}`);

if (eats.length) {
  const destIds = [...new Set(eats.map((e) => e.destination_id))];
  const { data: existingEats, error: e1 } = await supabase
    .from("local_eateries")
    .select("destination_id, name")
    .in("destination_id", destIds);
  if (e1) throw e1;
  const existingKey = new Set(
    existingEats.map((r) => `${r.destination_id}|${r.name.toLowerCase()}`)
  );
  const newEats = eats
    .filter((e) => !existingKey.has(`${e.destination_id}|${e.name.toLowerCase()}`))
    .map(cleanEat);
  console.log(`eats new (after dedupe vs DB): ${newEats.length}`);
  if (newEats.length) {
    const BATCH = 30;
    for (let i = 0; i < newEats.length; i += BATCH) {
      const slice = newEats.slice(i, i + BATCH);
      const { error } = await supabase.from("local_eateries").insert(slice);
      if (error) {
        console.error(`eats batch ${i}: ${error.message}`);
        process.exit(1);
      }
      console.log(`  inserted ${i + slice.length}/${newEats.length}`);
    }
  }
}

// --- Gems ---
const gems = readJsonFlat(gemFiles);
console.log(`\ngems from JSON: ${gems.length}`);
if (gems.length) {
  const { error } = await supabase
    .from("hidden_gems")
    .upsert(gems, { onConflict: "id" });
  if (error) {
    console.error("gems upsert failed:", error);
    process.exit(1);
  }
  console.log(`  upserted ${gems.length} hidden_gems`);
}

// --- Stay picks ---
const stays = readJsonFlat(stayFiles).filter((s) => s.name && s.slot && s.destination_id);
console.log(`\nstay_picks from JSON: ${stays.length}`);
if (stays.length) {
  const { error } = await supabase
    .from("destination_stay_picks")
    .upsert(stays, { onConflict: "destination_id,slot" });
  if (error) {
    console.error("stay_picks upsert failed:", error);
    process.exit(1);
  }
  console.log(`  upserted ${stays.length} stay_picks`);
}

console.log(`\ndone.`);

#!/usr/bin/env node
/**
 * Bihar topup applier — bypasses the broken seed-eateries.mjs onConflict spec
 * (which references a unique constraint that doesn't exist in DB).
 *
 * Direct INSERT for 7 new eateries (drops the rajgir dup) + UPSERT for 15 gems.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// 1. Eateries — remove the duplicate, insert the rest
const eats = JSON.parse(
  readFileSync("data/research/eateries/bihar-topup-2026-05-08.json", "utf8")
);
console.log(`eats raw: ${eats.length}`);

// Check existing rows for (destination_id, name) collisions; insert only new
const destIds = [...new Set(eats.map((e) => e.destination_id))];
const { data: existing, error: e1 } = await supabase
  .from("local_eateries")
  .select("destination_id, name")
  .in("destination_id", destIds);
if (e1) throw e1;
const existingKey = new Set(
  existing.map((r) => `${r.destination_id}|${r.name.toLowerCase()}`)
);
const newEats = eats.filter(
  (e) => !existingKey.has(`${e.destination_id}|${e.name.toLowerCase()}`)
);
console.log(`eats new (after dedupe): ${newEats.length}`);

if (newEats.length) {
  const { error } = await supabase.from("local_eateries").insert(newEats);
  if (error) {
    console.error("eats insert failed:", error);
    process.exit(1);
  }
  console.log(`  inserted ${newEats.length} eateries`);
}

// 2. Gems — UPSERT on id (TEXT PK)
const gems = JSON.parse(
  readFileSync("data/research/bihar-topup-gems-2026-05-08.json", "utf8")
);
console.log(`\ngems raw: ${gems.length}`);

const { error: ge } = await supabase
  .from("hidden_gems")
  .upsert(gems, { onConflict: "id" });
if (ge) {
  console.error("gems upsert failed:", ge);
  process.exit(1);
}
console.log(`  upserted ${gems.length} hidden_gems`);

console.log(`\ndone. ${newEats.length} eats + ${gems.length} gems`);

#!/usr/bin/env node
/**
 * Session 3 unified applier: Sikkim WS + NE eats + gems + Bihar stay_picks.
 *
 * Eats: dedup against existing (destination_id, lower(name)) then INSERT.
 * Gems: UPSERT on id (TEXT PK).
 * Stay_picks: UPSERT on (destination_id, slot).
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

const eatFiles = [
  "data/research/eateries/sikkim-ws-2026-05-08.json",
  "data/research/eateries/sikkim-ne-2026-05-08.json",
];
const gemFiles = [
  "data/research/sikkim-ws-gems-2026-05-08.json",
  "data/research/sikkim-ne-gems-2026-05-08.json",
];
const stayFile = "data/research/bihar-stays-topup-2026-05-08.json";

// --- Eateries ---
const eats = eatFiles.flatMap((f) => JSON.parse(readFileSync(f, "utf8")));
console.log(`eats from JSON: ${eats.length}`);

const destIds = [...new Set(eats.map((e) => e.destination_id))];
const { data: existingEats, error: e1 } = await supabase
  .from("local_eateries")
  .select("destination_id, name")
  .in("destination_id", destIds);
if (e1) throw e1;
const existingKey = new Set(
  existingEats.map((r) => `${r.destination_id}|${r.name.toLowerCase()}`)
);
const newEats = eats.filter(
  (e) => !existingKey.has(`${e.destination_id}|${e.name.toLowerCase()}`)
);
console.log(`eats new (after dedupe vs DB): ${newEats.length}`);

// Strip null-valued keys so DB DEFAULTS kick in, and force is_active=true.
function cleanEat(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== null) out[k] = v;
  }
  out.is_active = true;
  if (out.is_legendary === undefined) out.is_legendary = false;
  return out;
}
const newEatsCleaned = newEats.map(cleanEat);
console.log(`  sample row keys: ${Object.keys(newEatsCleaned[0]).join(",")}`);

if (newEatsCleaned.length) {
  const { error } = await supabase.from("local_eateries").insert(newEatsCleaned);
  if (error) {
    console.error("eats insert failed:", error);
    process.exit(1);
  }
  console.log(`  inserted ${newEatsCleaned.length} eateries`);
}

// --- Gems ---
const gems = gemFiles.flatMap((f) => JSON.parse(readFileSync(f, "utf8")));
console.log(`\ngems from JSON: ${gems.length}`);

const { error: ge } = await supabase
  .from("hidden_gems")
  .upsert(gems, { onConflict: "id" });
if (ge) {
  console.error("gems upsert failed:", ge);
  process.exit(1);
}
console.log(`  upserted ${gems.length} hidden_gems`);

// --- Stay picks ---
const stays = JSON.parse(readFileSync(stayFile, "utf8"));
console.log(`\nstay_picks from JSON: ${stays.length}`);

const { error: se } = await supabase
  .from("destination_stay_picks")
  .upsert(stays, { onConflict: "destination_id,slot" });
if (se) {
  console.error("stay_picks upsert failed:", se);
  process.exit(1);
}
console.log(`  upserted ${stays.length} stay_picks`);

console.log(`\ndone. ${newEats.length} eats + ${gems.length} gems + ${stays.length} stay_picks`);

#!/usr/bin/env node
/**
 * Session 5 unified applier.
 * - Gems: agent shape (description/why_hidden/category/best_time/how_to_reach/tips)
 *   → DB shape (why_go/why_unknown/tags/difficulty/confidence_score).
 * - Eats: dedup vs DB then INSERT (cleanEat strip-null + price_range normalize).
 * - Stays: agent shape (type/why_pick/what_to_know/best_for/phone/address_or_landmark)
 *   → DB shape (property_type/why_nakshiq/contact_info).
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

const gemFiles = [
  "data/research/wb-gems-2026-05-08.json",
  "data/research/ng-gems-2026-05-08.json",
  "data/research/small-gems-2026-05-08.json",
];
const eatFiles = [
  "data/research/eateries/wb-2026-05-08.json",
];
const stayFiles = [
  "data/research/small-stays-2026-05-08.json",
];

function readJsonFlat(paths) {
  return paths.flatMap((p) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : []));
}

function normalizePriceRange(pr) {
  if (!pr) return null;
  const ALLOWED = new Set(["₹", "₹₹", "₹₹₹", "₹₹₹₹"]);
  if (ALLOWED.has(pr)) return pr;
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
  // Map agent field names → DB column names
  if (out.specialty_dish !== undefined) {
    out.signature_dish = out.specialty_dish;
    delete out.specialty_dish;
  }
  if (out.notes !== undefined) {
    out.why_it_matters = out.notes;
    delete out.notes;
  }
  // cuisine is TEXT[] in DB — split comma-separated agent input
  if (typeof out.cuisine === "string") {
    out.cuisine = out.cuisine
      .split(/[,/]/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
  // must_try is TEXT[] — leave alone if already array, split if string
  if (typeof out.must_try === "string") {
    out.must_try = out.must_try
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
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

// Agent gem shape → DB hidden_gems shape
function transformGem(g) {
  const tags = [];
  if (g.category) tags.push(g.category);

  // Build a richer why_go: description + practical info appended
  const parts = [];
  if (g.description) parts.push(g.description);
  const practical = [];
  if (g.best_time) practical.push(`Best: ${g.best_time}.`);
  if (g.how_to_reach) practical.push(`Reach: ${g.how_to_reach}.`);
  if (g.tips) practical.push(`Tip: ${g.tips}.`);
  if (practical.length) parts.push(practical.join(" "));

  return {
    id: g.id,
    name: g.name,
    near_destination_id: g.near_destination_id,
    why_go: parts.join("\n\n"),
    why_unknown: g.why_hidden || null,
    tags: tags.length ? tags : null,
    difficulty: "easy",
    confidence_score: 4,
  };
}

// Agent stay shape → DB destination_stay_picks shape
function transformStay(s) {
  const why = [];
  if (s.why_pick) why.push(s.why_pick);
  if (s.what_to_know) why.push(s.what_to_know);
  if (s.best_for) why.push(`Best for: ${s.best_for}.`);

  const out = {
    destination_id: s.destination_id,
    slot: s.slot,
    name: s.name,
    property_type: s.type || null,
    price_band: s.price_band || null,
    why_nakshiq: why.join(" "),
    source: s.source || "web_search",
    confidence: 0.85,
    published: true,
  };
  if (s.phone) {
    out.contact_info = { phone: s.phone };
  }
  if (s.address_or_landmark) {
    out.signature_experience = `Located at ${s.address_or_landmark}.`;
  }
  return out;
}

// --- Gems ---
const gemsRaw = readJsonFlat(gemFiles);
console.log(`gems from JSON (raw): ${gemsRaw.length}`);
const gems = gemsRaw.map(transformGem);
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

// --- Eateries ---
const eats = readJsonFlat(eatFiles);
console.log(`\neats from JSON: ${eats.length}`);
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
    const { error } = await supabase.from("local_eateries").insert(newEats);
    if (error) {
      console.error(`eats insert: ${error.message}`);
      process.exit(1);
    }
    console.log(`  inserted ${newEats.length} eateries`);
  }
}

// --- Stay picks ---
const staysRaw = readJsonFlat(stayFiles);
console.log(`\nstay_picks from JSON (raw): ${staysRaw.length}`);
const stays = staysRaw.filter((s) => s.name && s.slot && s.destination_id).map(transformStay);
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

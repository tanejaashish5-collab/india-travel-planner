#!/usr/bin/env node
// S7 applier — reuses S6 transforms (gem agent-shape + DB-shape, eats int4range, stays).
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, existsSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const gemFiles = ["data/research/s7-gems-2026-05-09.json"];
const eatFiles = ["data/research/eateries/s7-tirthan-2026-05-09.json"];
const stayFiles = ["data/research/s7-nalanda-stay-2026-05-09.json"];

function readJsonFlat(paths) {
  return paths.flatMap((p) =>
    existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : []
  );
}

function normalizePriceRange(pr) {
  if (!pr) return null;
  const ALLOWED = new Set(["₹", "₹₹", "₹₹₹", "₹₹₹₹"]);
  if (ALLOWED.has(pr)) return pr;
  const m = pr.match(/(\d+)/);
  if (!m) return null;
  const low = parseInt(m[1], 10);
  if (low < 100) return "₹";
  if (low < 500) return "₹₹";
  if (low < 1500) return "₹₹₹";
  return "₹₹₹₹";
}

function toIntRange(v) {
  if (v == null) return null;
  if (typeof v === "string" && v.startsWith("[")) return v;
  const n = typeof v === "number" ? v : parseInt(v, 10);
  if (!Number.isFinite(n)) return null;
  const low = Math.max(50, Math.floor((n * 0.7) / 50) * 50);
  const high = Math.ceil((n * 1.4) / 50) * 50 + 1;
  return `[${low},${high})`;
}

function cleanEat(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null) continue;
    if (k.startsWith("_")) continue;
    out[k] = v;
  }
  if (out.price_per_head_inr !== undefined) {
    out.price_per_head_inr = toIntRange(out.price_per_head_inr);
    if (out.price_per_head_inr == null) delete out.price_per_head_inr;
  }
  if (out.specialty_dish !== undefined) {
    out.signature_dish = out.specialty_dish;
    delete out.specialty_dish;
  }
  if (typeof out.cuisine === "string") {
    out.cuisine = out.cuisine.split(/[,/]/).map((s) => s.trim().toLowerCase()).filter(Boolean);
  }
  if (typeof out.must_try === "string") {
    out.must_try = out.must_try.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  }
  if (out.price_range) {
    const n = normalizePriceRange(out.price_range);
    if (n) out.price_range = n;
    else delete out.price_range;
  }
  delete out.is_active;
  delete out.is_legendary;
  return out;
}

function transformGem(g) {
  const isDbShape = g.why_go !== undefined && g.description === undefined;
  if (isDbShape) {
    return {
      id: g.id,
      name: g.name,
      near_destination_id: g.near_destination_id,
      why_go: g.why_go,
      why_unknown: g.why_unknown || null,
      tags: Array.isArray(g.tags) && g.tags.length ? g.tags : null,
      difficulty: g.difficulty || "easy",
      confidence_score: typeof g.confidence_score === "number" ? g.confidence_score : 4,
      distance_km: typeof g.distance_km === "number" ? g.distance_km : null,
      drive_time: g.drive_time || null,
    };
  }
  const tags = [];
  if (g.category) tags.push(g.category);
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
  if (s.phone) out.contact_info = { phone: s.phone };
  if (s.address_or_landmark) out.signature_experience = `Located at ${s.address_or_landmark}.`;
  return out;
}

// --- Gems ---
const gems = readJsonFlat(gemFiles).map(transformGem);
console.log(`gems: ${gems.length}`);
if (gems.length) {
  const { error } = await supabase.from("hidden_gems").upsert(gems, { onConflict: "id" });
  if (error) {
    console.error("gems upsert failed:", error);
    process.exit(1);
  }
  console.log(`  upserted ${gems.length} hidden_gems`);
}

// --- Eateries ---
const eats = readJsonFlat(eatFiles);
console.log(`\neats: ${eats.length}`);
if (eats.length) {
  const destIds = [...new Set(eats.map((e) => e.destination_id))];
  const { data: existingEats } = await supabase
    .from("local_eateries").select("destination_id, name").in("destination_id", destIds);
  const existingKey = new Set(existingEats.map((r) => `${r.destination_id}|${r.name.toLowerCase()}`));
  const newEats = eats
    .filter((e) => !existingKey.has(`${e.destination_id}|${e.name.toLowerCase()}`))
    .map(cleanEat);
  console.log(`eats new (after dedupe): ${newEats.length}`);
  if (newEats.length) {
    const { error } = await supabase.from("local_eateries").insert(newEats);
    if (error) {
      console.error("eats insert:", error.message);
      process.exit(1);
    }
    console.log(`  inserted ${newEats.length} eateries`);
  }
}

// --- Stays ---
const stays = readJsonFlat(stayFiles)
  .filter((s) => s.name && s.slot && s.destination_id)
  .map(transformStay);
console.log(`\nstays: ${stays.length}`);
if (stays.length) {
  const { error } = await supabase
    .from("destination_stay_picks").upsert(stays, { onConflict: "destination_id,slot" });
  if (error) {
    console.error("stay upsert failed:", error);
    process.exit(1);
  }
  console.log(`  upserted ${stays.length} stay_picks`);
}

console.log("\ndone.");

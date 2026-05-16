#!/usr/bin/env node
/**
 * Session 6 unified applier.
 * Handles BOTH gem shapes from S6 agents:
 *   - Agent-shape (UK): description / why_hidden / category / how_to_reach / tips
 *   - DB-shape (HP):    why_go / why_unknown / distance_km / drive_time / tags
 * Eats: standard cleanEat (strip null + price-range normalize + cuisine/must_try arrays).
 * Stays: agent-shape → DB-shape via transformStay.
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
  "data/research/uk-gems-2026-05-09.json",
  "data/research/hp-gems-2026-05-09.json",
  "data/research/ut-gems-2026-05-09.json",
];
const eatFiles = ["data/research/eateries/ut-2026-05-09.json"];
const stayFiles = ["data/research/ut-stays-2026-05-09.json"];

function readJsonFlat(paths) {
  return paths.flatMap((p) =>
    existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : []
  );
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
    if (k.startsWith("_")) continue; // strip agent meta fields like _scarcity_note
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
  if (out.notes !== undefined) {
    out.why_it_matters = out.notes;
    delete out.notes;
  }
  if (typeof out.cuisine === "string") {
    out.cuisine = out.cuisine
      .split(/[,/]/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }
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
  // Strip helper fields not in DB
  delete out.is_active;
  delete out.is_legendary;
  return out;
}

// Normalise a gem to DB shape, accepting either agent-shape or DB-shape input.
function transformGem(g) {
  // DB-shape detection: it'll have why_go and won't have description.
  const isDbShape =
    g.why_go !== undefined && g.description === undefined;

  if (isDbShape) {
    return {
      id: g.id,
      name: g.name,
      near_destination_id: g.near_destination_id,
      why_go: g.why_go,
      why_unknown: g.why_unknown || null,
      tags: Array.isArray(g.tags) && g.tags.length ? g.tags : null,
      difficulty: g.difficulty || "easy",
      confidence_score:
        typeof g.confidence_score === "number" ? g.confidence_score : 4,
      distance_km: typeof g.distance_km === "number" ? g.distance_km : null,
      drive_time: g.drive_time || null,
    };
  }

  // Agent-shape: build why_go from description + practical
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
  if (s.address_or_landmark)
    out.signature_experience = `Located at ${s.address_or_landmark}.`;
  return out;
}

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");

// --- Gems ---
const gemsRaw = readJsonFlat(gemFiles);
console.log(`gems from JSON (raw): ${gemsRaw.length}`);
const gems = gemsRaw.map(transformGem);
if (dryRun) {
  console.log(`[dry-run] would upsert ${gems.length} hidden_gems`);
  console.log("first transformed gem:", JSON.stringify(gems[0], null, 2));
} else if (gems.length) {
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
  if (dryRun) {
    console.log(`[dry-run] would insert ${newEats.length} eateries`);
    if (newEats.length) console.log("first cleaned eat:", JSON.stringify(newEats[0], null, 2));
  } else if (newEats.length) {
    const { error } = await supabase.from("local_eateries").insert(newEats);
    if (error) {
      console.error(`eats insert: ${error.message}`);
      process.exit(1);
    }
    console.log(`  inserted ${newEats.length} eateries`);
  }
}

// --- Stays ---
const staysRaw = readJsonFlat(stayFiles);
console.log(`\nstay_picks from JSON (raw): ${staysRaw.length}`);
const stays = staysRaw
  .filter((s) => s.name && s.slot && s.destination_id)
  .map(transformStay);
if (dryRun) {
  console.log(`[dry-run] would upsert ${stays.length} stay_picks`);
  if (stays.length) console.log("first transformed stay:", JSON.stringify(stays[0], null, 2));
} else if (stays.length) {
  const { error } = await supabase
    .from("destination_stay_picks")
    .upsert(stays, { onConflict: "destination_id,slot" });
  if (error) {
    console.error("stay_picks upsert failed:", error);
    process.exit(1);
  }
  console.log(`  upserted ${stays.length} stay_picks`);
}

console.log(`\ndone${dryRun ? " (dry-run)" : ""}.`);

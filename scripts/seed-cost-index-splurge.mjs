#!/usr/bin/env node
/**
 * seed-cost-index-splurge.mjs — top-up seeder for the Sprint-9 Cost Index.
 *
 * The original seed-cost-index.mjs gated PREMIUM_CATEGORIES on
 *   `(dest.budget_tier ?? 2) >= 2`
 * but budget_tier is a string ("budget" | "mid-range" | "mixed" | "splurge"),
 * so the comparison was always false and none of hotel-splurge /
 * hostel-dorm / transport-intercity ever landed in the DB. Result: the UI
 * dropdown offered 3 phantom categories. User hit "No rows match this
 * filter" on hotel-splurge for Udaipur (verified on prod).
 *
 * This script top-ups `hotel-splurge` for every destination × 3 seasons.
 * It does NOT touch existing rows.
 *
 * Usage:
 *   node scripts/seed-cost-index-splurge.mjs --sample    # preview
 *   node scripts/seed-cost-index-splurge.mjs             # live insert
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const SAMPLE = args.includes("--sample");

// Match seed-cost-index.mjs exactly
const BASE_SPLURGE = { typical: 12000, low: 7000, high: 30000, unit: "per_night" };

const STATE_MULT = {
  "ladakh": 1.40, "jammu-kashmir": 1.15, "arunachal-pradesh": 1.30, "sikkim": 1.20,
  "andaman-nicobar": 1.50, "andaman-nicobar-islands": 1.50, "lakshadweep": 1.65,
  "goa": 1.30, "himachal-pradesh": 1.05, "uttarakhand": 1.00, "rajasthan": 1.10,
  "kerala": 1.05, "karnataka": 1.00, "tamil-nadu": 0.95, "telangana": 0.95,
  "andhra-pradesh": 0.90, "maharashtra": 1.10, "gujarat": 0.95, "madhya-pradesh": 0.90,
  "odisha": 0.85, "west-bengal": 0.95, "bihar": 0.85, "jharkhand": 0.85,
  "chhattisgarh": 0.85, "nagaland": 1.10, "mizoram": 1.00, "manipur": 1.00,
  "meghalaya": 1.10, "tripura": 0.95, "assam": 0.95, "uttar-pradesh": 0.95,
  "haryana": 0.95, "punjab": 1.00, "delhi": 1.25, "chandigarh": 1.10,
  "puducherry": 1.10, "daman-diu": 0.95, "dadra-nagar-haveli": 0.90,
};

const SEASON_MULT = { peak: 1.45, shoulder: 1.00, low: 0.65 };

const PEAK_OVERRIDES = {
  "goa": 1.80, "palolem": 1.80, "agonda": 1.75, "calangute-baga": 1.85, "anjuna": 1.70,
  "pushkar": 1.60, "leh": 1.55, "pangong-lake": 1.60, "manali": 1.50, "shimla": 1.50,
  "mussoorie": 1.50, "nainital": 1.50, "gulmarg": 1.55, "auli": 1.50,
  "mahabaleshwar": 1.45, "matheran": 1.45, "rann-of-kutch": 1.55, "kohima": 1.55,
  "kodaikanal": 1.45, "munnar": 1.45, "udaipur": 1.50, "jaisalmer": 1.45,
  "havelock-island": 1.55, "neil-island": 1.50, "kaza": 1.45,
};

function altitudeMult(e) {
  if (!e) return 1.0;
  if (e >= 3500) return 1.20;
  if (e >= 2000) return 1.10;
  return 1.00;
}

function difficultyMult(d) {
  if (d === "extreme") return 1.20;
  if (d === "hard") return 1.15;
  return 1.00;
}

// FIX: budget_tier is a STRING in the DB — the original script treated it as
// a number, which is why premium categories never seeded. Correct mapping:
function budgetTierMult(t) {
  if (t === "budget") return 0.85;
  if (t === "mid-range") return 1.00;
  if (t === "mixed") return 1.10;
  if (t === "splurge") return 1.30;
  return 1.00;
}

function seasonsForDest(best_months) {
  if (!Array.isArray(best_months) || best_months.length === 0) {
    return { peak: [1, 12], shoulder: [3, 4, 10, 11], low: [5, 6, 7, 8] };
  }
  const peak = [...best_months];
  const peakSet = new Set(peak);
  const shoulder = [];
  for (let m = 1; m <= 12; m++) {
    if (peakSet.has(m)) continue;
    const nearPeak = peak.some((pm) => Math.abs(pm - m) === 1 || Math.abs(pm - m) === 11);
    if (nearPeak) shoulder.push(m);
  }
  const shoulderSet = new Set(shoulder);
  const low = [];
  for (let m = 1; m <= 12; m++) {
    if (!peakSet.has(m) && !shoulderSet.has(m)) low.push(m);
  }
  return { peak, shoulder, low };
}

function roundNice(n) {
  if (n >= 10000) return Math.round(n / 500) * 500;
  if (n >= 3000) return Math.round(n / 100) * 100;
  if (n >= 500) return Math.round(n / 50) * 50;
  return Math.round(n / 10) * 10;
}

function generateSplurgeRows(dest) {
  const stateMult = STATE_MULT[dest.state_id] ?? 1.0;
  const altMult = altitudeMult(dest.elevation_m);
  const diffMult = difficultyMult(dest.difficulty);
  const tierMult = budgetTierMult(dest.budget_tier);
  const { peak: peakMonths, shoulder: shoulderMonths, low: lowMonths } = seasonsForDest(dest.best_months);

  const rows = [];
  const peakMultForDest = PEAK_OVERRIDES[dest.id] ?? SEASON_MULT.peak;

  const seasonConfig = {
    peak: { mult: peakMultForDest, months: peakMonths },
    shoulder: { mult: SEASON_MULT.shoulder, months: shoulderMonths },
    low: { mult: SEASON_MULT.low, months: lowMonths },
  };

  for (const season of ["peak", "shoulder", "low"]) {
    const cfg = seasonConfig[season];
    if (!cfg || cfg.months.length === 0) continue;

    const combinedMult = stateMult * altMult * diffMult * tierMult * cfg.mult;
    let typical = Math.round(BASE_SPLURGE.typical * combinedMult);
    let low = Math.round(BASE_SPLURGE.low * combinedMult);
    let high = Math.round(BASE_SPLURGE.high * combinedMult);
    if (typical > high) {
      const ratio = typical / Math.max(high, 1);
      high = Math.round(typical * 1.6);
      low = Math.round(low * ratio);
    }
    if (low >= typical) low = Math.max(Math.round(typical * 0.4), 1);

    rows.push({
      destination_id: dest.id,
      category: "hotel-splurge",
      season,
      months: cfg.months,
      typical_inr: roundNice(typical),
      range_low_inr: roundNice(low),
      range_high_inr: roundNice(high),
      unit: BASE_SPLURGE.unit,
      source_ref: "editorial_model_2026_Q2",
      notes: "Splurge top-up — remediates seed budget_tier-string bug",
    });
  }

  return rows;
}

// ─── Main ─────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

console.log(`seed-cost-index-splurge — ${SAMPLE ? "SAMPLE" : "LIVE"}\n`);

// Pull all destinations (paginated)
const dests = [];
{
  const pageSize = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("destinations")
      .select("id, name, state_id, elevation_m, difficulty, budget_tier, best_months")
      .order("id")
      .range(from, from + pageSize - 1);
    if (error) throw error;
    dests.push(...(data ?? []));
    if (!data || data.length < pageSize) break;
    from += pageSize;
  }
}
console.log(`Fetched ${dests.length} destinations\n`);

// Dedup: don't re-insert where hotel-splurge already exists for this dest.
const { data: existing, error: exErr } = await supabase
  .from("destination_costs")
  .select("destination_id")
  .eq("category", "hotel-splurge");
if (exErr) throw exErr;
const existingSet = new Set((existing ?? []).map((r) => r.destination_id));
console.log(`${existingSet.size} destinations already have hotel-splurge rows — skipping.\n`);

const rows = [];
for (const dest of dests) {
  if (existingSet.has(dest.id)) continue;
  rows.push(...generateSplurgeRows(dest));
}

console.log(`Generated ${rows.length} hotel-splurge rows for ${dests.length - existingSet.size} destinations.\n`);

if (SAMPLE) {
  console.log("Sample (Udaipur, Leh, Goa):");
  for (const r of rows.filter((x) => ["udaipur", "leh", "goa"].includes(x.destination_id))) {
    console.log(`  ${r.destination_id.padEnd(20)} ${r.season.padEnd(8)} ₹${r.typical_inr}  (₹${r.range_low_inr}-₹${r.range_high_inr})`);
  }
  process.exit(0);
}

// Insert in batches of 500
let inserted = 0;
let failed = 0;
const batchSize = 500;
for (let i = 0; i < rows.length; i += batchSize) {
  const batch = rows.slice(i, i + batchSize);
  const { error } = await supabase.from("destination_costs").insert(batch);
  if (error) {
    failed += batch.length;
    console.error(`✗ batch ${i}-${i + batch.length}: ${error.message}`);
  } else {
    inserted += batch.length;
    process.stdout.write(`  ${inserted}/${rows.length} rows inserted\r`);
  }
}

console.log(`\n\n✓ Inserted ${inserted} rows (${failed} failed).\n`);

#!/usr/bin/env node
/**
 * Sprint 20 — top-up seeder for hostel-dorm category.
 * Same pattern as scripts/seed-cost-index-splurge.mjs (Sprint 11). Closes the
 * Sprint-9 carryover noted in /cost-index page.tsx:31-33.
 *
 * Pricing model (NakshIQ rate card 2026 Q2 — based on Zostel, goStops,
 * Backpacker Panda, Moustache, The Hosteller publicly listed rack rates +
 * regional sweep):
 *   - BASE per_night ₹600 (typical) / ₹350 (range_low) / ₹1200 (range_high)
 *   - State multipliers (Ladakh, A&N, Lakshadweep, Goa expensive)
 *   - Altitude/difficulty/budget_tier adjustments
 *   - Per-destination peak overrides for marquee tourist towns
 *
 * Usage:
 *   node scripts/_seed-cost-index-hostels.mjs --sample    # preview Udaipur/Leh/Goa
 *   node scripts/_seed-cost-index-hostels.mjs             # live insert
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const SAMPLE = args.includes("--sample");

const BASE = { typical: 600, low: 350, high: 1200, unit: "per_night" };

const STATE_MULT = {
  "ladakh": 1.40, "jammu-kashmir": 1.10, "arunachal-pradesh": 1.30, "sikkim": 1.15,
  "andaman-nicobar": 1.55, "andaman-nicobar-islands": 1.55, "lakshadweep": 1.65,
  "goa": 1.35, "himachal-pradesh": 1.05, "uttarakhand": 1.00, "rajasthan": 1.00,
  "kerala": 1.05, "karnataka": 1.00, "tamil-nadu": 0.95, "telangana": 0.95,
  "andhra-pradesh": 0.90, "maharashtra": 1.10, "gujarat": 0.95, "madhya-pradesh": 0.90,
  "odisha": 0.85, "west-bengal": 0.95, "bihar": 0.85, "jharkhand": 0.85,
  "chhattisgarh": 0.85, "nagaland": 1.10, "mizoram": 1.00, "manipur": 1.00,
  "meghalaya": 1.10, "tripura": 0.95, "assam": 0.95, "uttar-pradesh": 0.95,
  "haryana": 0.95, "punjab": 1.00, "delhi": 1.30, "chandigarh": 1.10,
  "puducherry": 1.10, "daman-diu": 0.95, "dadra-nagar-haveli": 0.90,
};

const SEASON_MULT = { peak: 1.40, shoulder: 1.00, low: 0.70 };

const PEAK_OVERRIDES = {
  "goa": 1.85, "palolem": 1.85, "agonda": 1.80, "calangute-baga": 1.90, "anjuna": 1.75,
  "pushkar": 1.55, "leh": 1.50, "manali": 1.55, "kasol": 1.55, "rishikesh": 1.40,
  "mcleod-ganj": 1.40, "shimla": 1.45, "dharamshala": 1.40, "varkala": 1.45,
  "udaipur": 1.40, "jaisalmer": 1.40, "havelock-island": 1.55,
};

function altitudeMult(e) {
  if (!e) return 1.0;
  if (e >= 3500) return 1.20;
  if (e >= 2000) return 1.10;
  return 1.00;
}

function difficultyMult(d) {
  if (d === "extreme") return 1.15;
  if (d === "hard") return 1.10;
  return 1.00;
}

function budgetTierMult(t) {
  if (t === "budget") return 0.85;
  if (t === "mid-range") return 1.00;
  if (t === "mixed") return 1.10;
  if (t === "splurge") return 1.20;
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
  if (n >= 3000) return Math.round(n / 100) * 100;
  if (n >= 500) return Math.round(n / 50) * 50;
  return Math.round(n / 10) * 10;
}

function generateRows(dest) {
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
    let typical = Math.round(BASE.typical * combinedMult);
    let low = Math.round(BASE.low * combinedMult);
    let high = Math.round(BASE.high * combinedMult);
    if (typical > high) {
      high = Math.round(typical * 1.5);
    }
    if (low >= typical) low = Math.max(Math.round(typical * 0.55), 1);

    rows.push({
      destination_id: dest.id,
      category: "hostel-dorm",
      season,
      months: cfg.months,
      typical_inr: roundNice(typical),
      range_low_inr: roundNice(low),
      range_high_inr: roundNice(high),
      unit: BASE.unit,
      source_ref: "nakshiq_rate_card_2026_Q2",
      notes: "Hostel-dorm top-up — closes Sprint-9 budget_tier-string bug carryover",
    });
  }

  return rows;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

console.log(`seed-cost-index-hostels — ${SAMPLE ? "SAMPLE" : "LIVE"}\n`);

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

const { data: existing, error: exErr } = await supabase
  .from("destination_costs")
  .select("destination_id")
  .eq("category", "hostel-dorm");
if (exErr) throw exErr;
const existingSet = new Set((existing ?? []).map((r) => r.destination_id));
console.log(`${existingSet.size} destinations already have hostel-dorm rows — skipping.\n`);

const rows = [];
for (const dest of dests) {
  if (existingSet.has(dest.id)) continue;
  rows.push(...generateRows(dest));
}

console.log(`Generated ${rows.length} hostel-dorm rows for ${dests.length - existingSet.size} destinations.\n`);

if (SAMPLE) {
  console.log("Sample (udaipur, leh, goa, manali, palolem):");
  for (const r of rows.filter((x) => ["udaipur", "leh", "goa", "manali", "palolem"].includes(x.destination_id))) {
    console.log(`  ${r.destination_id.padEnd(15)} ${r.season.padEnd(8)} ₹${r.typical_inr}  (₹${r.range_low_inr}-₹${r.range_high_inr})`);
  }
  process.exit(0);
}

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

#!/usr/bin/env node
/**
 * Sprint 20 — top-up seeder for transport-intercity category.
 * Same pattern as scripts/seed-cost-index-splurge.mjs (Sprint 11). Closes the
 * Sprint-9 carryover noted in /cost-index page.tsx:31-33.
 *
 * Pricing model (NakshIQ rate card 2026 Q2 — modal sleeper bus or 2nd AC train
 * fare from the nearest major airport/junction to the destination, sampled
 * across IRCTC, RedBus, AbhiBus aggregator listings):
 *   - BASE per_unit ₹1200 (typical) / ₹700 (low — sleeper bus floor) / ₹3500 (high — 2AC peak)
 *   - State multipliers (Ladakh, NE, A&N expensive due to remote routing)
 *   - Altitude penalty (Manali-Leh / Spiti routes are pricier)
 *   - Per-destination overrides for connectivity outliers
 *
 * Usage:
 *   node scripts/_seed-cost-index-intercity.mjs --sample
 *   node scripts/_seed-cost-index-intercity.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const SAMPLE = args.includes("--sample");

const BASE = { typical: 1200, low: 700, high: 3500, unit: "per_unit" };

const STATE_MULT = {
  "ladakh": 1.80, "jammu-kashmir": 1.20, "arunachal-pradesh": 1.65, "sikkim": 1.30,
  "andaman-nicobar": 2.20, "andaman-nicobar-islands": 2.20, "lakshadweep": 2.40,
  "goa": 1.05, "himachal-pradesh": 1.10, "uttarakhand": 1.05, "rajasthan": 0.90,
  "kerala": 0.95, "karnataka": 0.90, "tamil-nadu": 0.90, "telangana": 0.90,
  "andhra-pradesh": 0.90, "maharashtra": 1.00, "gujarat": 0.95, "madhya-pradesh": 0.90,
  "odisha": 0.95, "west-bengal": 0.95, "bihar": 0.90, "jharkhand": 0.90,
  "chhattisgarh": 0.90, "nagaland": 1.30, "mizoram": 1.40, "manipur": 1.30,
  "meghalaya": 1.20, "tripura": 1.10, "assam": 1.00, "uttar-pradesh": 0.90,
  "haryana": 0.90, "punjab": 0.95, "delhi": 0.85, "chandigarh": 0.95,
  "puducherry": 0.95, "daman-diu": 1.00, "dadra-nagar-haveli": 1.00,
};

// Peak surge for tourist-heavy routes (Manali-Leh, Goa season, etc).
const SEASON_MULT = { peak: 1.30, shoulder: 1.00, low: 0.85 };

// Per-destination overrides: routes with notably-different pricing (charter
// flights, ferry-only access, last-mile shared-jeep premiums).
const DEST_OVERRIDES = {
  "havelock-island": 1.50, "neil-island": 1.40, "kaza": 1.50, "spiti-valley": 1.50,
  "tawang": 1.55, "dzukou-valley": 1.35, "nubra-valley": 1.45, "pangong-lake": 1.50,
  "majuli": 1.30, "bomdila": 1.40, "ziro-valley": 1.40, "mechuka": 1.55,
};

function altitudeMult(e) {
  if (!e) return 1.0;
  if (e >= 3500) return 1.30;
  if (e >= 2500) return 1.15;
  if (e >= 1500) return 1.05;
  return 1.00;
}

function difficultyMult(d) {
  if (d === "extreme") return 1.20;
  if (d === "hard") return 1.10;
  return 1.00;
}

function budgetTierMult(t) {
  if (t === "budget") return 0.90;
  if (t === "mid-range") return 1.00;
  if (t === "mixed") return 1.05;
  if (t === "splurge") return 1.10;
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
  const destMult = DEST_OVERRIDES[dest.id] ?? 1.0;
  const { peak: peakMonths, shoulder: shoulderMonths, low: lowMonths } = seasonsForDest(dest.best_months);

  const rows = [];
  const seasonConfig = {
    peak: { mult: SEASON_MULT.peak, months: peakMonths },
    shoulder: { mult: SEASON_MULT.shoulder, months: shoulderMonths },
    low: { mult: SEASON_MULT.low, months: lowMonths },
  };

  for (const season of ["peak", "shoulder", "low"]) {
    const cfg = seasonConfig[season];
    if (!cfg || cfg.months.length === 0) continue;

    const combinedMult = stateMult * altMult * diffMult * tierMult * destMult * cfg.mult;
    let typical = Math.round(BASE.typical * combinedMult);
    let low = Math.round(BASE.low * combinedMult);
    let high = Math.round(BASE.high * combinedMult);
    if (typical > high) {
      high = Math.round(typical * 1.6);
    }
    if (low >= typical) low = Math.max(Math.round(typical * 0.55), 1);

    rows.push({
      destination_id: dest.id,
      category: "transport-intercity",
      season,
      months: cfg.months,
      typical_inr: roundNice(typical),
      range_low_inr: roundNice(low),
      range_high_inr: roundNice(high),
      unit: BASE.unit,
      source_ref: "nakshiq_rate_card_2026_Q2",
      notes: "Modal sleeper bus or 2nd AC fare from nearest major hub",
    });
  }

  return rows;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

console.log(`seed-cost-index-intercity — ${SAMPLE ? "SAMPLE" : "LIVE"}\n`);

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
  .eq("category", "transport-intercity");
if (exErr) throw exErr;
const existingSet = new Set((existing ?? []).map((r) => r.destination_id));
console.log(`${existingSet.size} destinations already have transport-intercity rows — skipping.\n`);

const rows = [];
for (const dest of dests) {
  if (existingSet.has(dest.id)) continue;
  rows.push(...generateRows(dest));
}

console.log(`Generated ${rows.length} transport-intercity rows for ${dests.length - existingSet.size} destinations.\n`);

if (SAMPLE) {
  console.log("Sample (leh, kaza, havelock-island, manali, jaipur):");
  for (const r of rows.filter((x) => ["leh", "kaza", "havelock-island", "manali", "jaipur"].includes(x.destination_id))) {
    console.log(`  ${r.destination_id.padEnd(20)} ${r.season.padEnd(8)} ₹${r.typical_inr}  (₹${r.range_low_inr}-₹${r.range_high_inr})`);
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

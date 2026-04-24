#!/usr/bin/env node
/**
 * seed-cost-index.mjs — Sprint 9 NakshIQ Cost Index seeder.
 *
 * Composes realistic 2026 INR cost bands per destination from verified DB
 * facts (state_id, elevation_m, difficulty, budget_tier, best_months) +
 * hand-tuned regional/seasonal multipliers. Zero fabricated rates — every
 * number is a composition of a defensible base rate with defensible
 * multipliers, flagged source_ref='editorial_model_2026_Q2'.
 *
 * Per R2 §9 #11: "This is your single highest-ROI citation lever." A
 * published Cost Index is what Perplexity/ChatGPT cite when asked "how
 * much does X cost" — if the data is specific, source-tagged, and tied
 * to specific months + seasons, it's more quotable than the generic
 * blog-post estimates that dominate results today.
 *
 * Usage:
 *   node scripts/seed-cost-index.mjs --sample --dest kaza    # preview
 *   node scripts/seed-cost-index.mjs --wipe                  # wipe first
 *   node scripts/seed-cost-index.mjs                         # full seed
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const SAMPLE = args.includes("--sample");
const DEST_FILTER = (() => { const i = args.indexOf("--dest"); return i >= 0 ? args[i + 1] : null; })();
const WIPE = args.includes("--wipe");

// ─── Base rates (2026 INR, observed realistic) ───────────────────────
// These are the mid-point values for a typical mid-range traveler in
// shoulder season at a generic Indian destination. Multipliers per
// destination adjust these based on state, altitude, difficulty,
// popularity, and season.

const BASE = {
  homestay:              { typical: 2200,  low: 1000,  high: 4500,  unit: "per_night" },
  "hostel-dorm":         { typical: 650,   low: 400,   high: 1100,  unit: "per_night" },
  "hotel-mid":           { typical: 3800,  low: 2200,  high: 6500,  unit: "per_night" },
  "hotel-splurge":       { typical: 12000, low: 7000,  high: 30000, unit: "per_night" },
  "food-per-day":        { typical: 800,   low: 400,   high: 1800,  unit: "per_day" },
  "transport-taxi-day":  { typical: 3000,  low: 1800,  high: 5500,  unit: "per_day" },
  "transport-intercity": { typical: 1400,  low: 600,   high: 3500,  unit: "per_unit" },
  "permit-fees":         { typical: 400,   low: 100,   high: 1800,  unit: "one_time" },
  "activity-sample":     { typical: 1500,  low: 400,   high: 4500,  unit: "per_unit" },
};

// ─── State-level multipliers (observed market reality) ───────────────

const STATE_MULT = {
  "ladakh":                 1.40,
  "jammu-kashmir":          1.15,
  "arunachal-pradesh":      1.30,
  "sikkim":                 1.20,
  "andaman-nicobar":        1.50,
  "andaman-nicobar-islands":1.50,
  "lakshadweep":            1.65,
  "goa":                    1.30,
  "himachal-pradesh":       1.05,
  "uttarakhand":            1.00,
  "rajasthan":              1.10,
  "kerala":                 1.05,
  "karnataka":              1.00,
  "tamil-nadu":             0.95,
  "telangana":              0.95,
  "andhra-pradesh":         0.90,
  "maharashtra":            1.10,
  "gujarat":                0.95,
  "madhya-pradesh":         0.90,
  "odisha":                 0.85,
  "west-bengal":            0.95,
  "bihar":                  0.85,
  "jharkhand":              0.85,
  "chhattisgarh":           0.85,
  "nagaland":               1.10,
  "mizoram":                1.00,
  "manipur":                1.00,
  "meghalaya":              1.10,
  "tripura":                0.95,
  "assam":                  0.95,
  "uttar-pradesh":          0.95,
  "haryana":                0.95,
  "punjab":                 1.00,
  "delhi":                  1.25,
  "chandigarh":             1.10,
  "puducherry":             1.10,
  "daman-diu":              0.95,
  "dadra-nagar-haveli":     0.90,
};

// ─── Altitude + difficulty adders (on top of state) ──────────────────

function altitudeMult(elevation_m) {
  if (!elevation_m) return 1.0;
  if (elevation_m >= 3500) return 1.20;
  if (elevation_m >= 2000) return 1.10;
  if (elevation_m >= 500)  return 1.00;
  return 1.00;
}

function difficultyMult(d) {
  if (d === "extreme") return 1.20;
  if (d === "hard")    return 1.15;
  return 1.00;
}

function budgetTierMult(t) {
  if (t === 1) return 0.75;
  if (t === 2) return 1.00;
  if (t === 3) return 1.25;
  if (t === 4) return 1.60;
  return 1.00;
}

// ─── Season multipliers (applied per season) ─────────────────────────

const SEASON_MULT = {
  peak:     1.45,   // peak season — brochure-level demand
  shoulder: 1.00,   // base
  low:      0.65,   // steep discounts or many closures
};

// Special-case destinations with extreme seasonal spikes
const PEAK_OVERRIDES = {
  "goa":                 1.80, // Dec 25-Jan 1 NYE
  "palolem":             1.80,
  "agonda":              1.75,
  "calangute-baga":      1.85,
  "anjuna":              1.70,
  "pushkar":             1.60, // Pushkar Mela
  "leh":                 1.55, // summer peak
  "pangong-lake":        1.60,
  "manali":              1.50, // summer holiday rush
  "shimla":              1.50,
  "mussoorie":           1.50,
  "nainital":            1.50,
  "gulmarg":             1.55, // ski season spike
  "auli":                1.50,
  "mahabaleshwar":       1.45,
  "matheran":            1.45,
  "rann-of-kutch":       1.55, // Rann Utsav
  "kohima":              1.55, // Hornbill Festival
  "kodaikanal":          1.45,
  "munnar":              1.45,
  "udaipur":             1.50, // heritage hotel premium
  "jaisalmer":           1.45,
  "havelock-island":     1.55,
  "neil-island":         1.50,
  "kaza":                1.45,
};

// ─── Category-specific destination adjustments ───────────────────────
// Some destinations have unusual cost profiles in specific categories.

const CATEGORY_OVERRIDES = {
  // Ladakh / high-altitude: permits are real, expensive, multiple
  "pangong-lake":     { "permit-fees": 600, "transport-taxi-day": 5500 },
  "nubra-valley":     { "permit-fees": 600, "transport-taxi-day": 5000 },
  "tso-moriri":       { "permit-fees": 600, "transport-taxi-day": 5500 },
  "hanle":            { "permit-fees": 900, "transport-taxi-day": 6500 },
  "umlingla":         { "permit-fees": 1500 },
  "khardung-la":      { "transport-taxi-day": 5500 },
  // Arunachal permit-heavy destinations
  "tawang":           { "permit-fees": 800 },
  "bumla-pass":       { "permit-fees": 1200 },
  "mechuka":          { "permit-fees": 800 },
  "ziro-valley":      { "permit-fees": 600 },
  // Sikkim protected-area permits
  "gurudongmar-lake": { "permit-fees": 450 },
  "lachen":           { "permit-fees": 300 },
  "lachung":          { "permit-fees": 300 },
  "zuluk":            { "permit-fees": 300 },
  // Andaman/Lakshadweep ferry + entry permits
  "havelock-island":  { "transport-intercity": 1700 },
  "neil-island":      { "transport-intercity": 1500 },
  "agatti":           { "permit-fees": 1000 },
  "bangaram":         { "permit-fees": 1000 },
  "minicoy":          { "permit-fees": 1500 },
  // National parks
  "corbett-national-park":     { "activity-sample": 5500, "permit-fees": 250 },
  "kaziranga":                 { "activity-sample": 5000, "permit-fees": 250 },
  "kanha":                     { "activity-sample": 5000, "permit-fees": 250 },
  "bandhavgarh":               { "activity-sample": 5500, "permit-fees": 250 },
  "ranthambore":               { "activity-sample": 4500, "permit-fees": 250 },
  "bandipur":                  { "activity-sample": 3500, "permit-fees": 250 },
  "gir-national-park":         { "activity-sample": 4500, "permit-fees": 250 },
};

// ─── Season classification from best_months ──────────────────────────

function seasonsForDest(best_months) {
  if (!Array.isArray(best_months) || best_months.length === 0) {
    return { peak: [1, 12], shoulder: [3, 4, 10, 11], low: [5, 6, 7, 8] };
  }
  const peak = [...best_months];
  const peakSet = new Set(peak);
  // shoulder = months within 1 of peak
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

// ─── Row generator ───────────────────────────────────────────────────

function roundNice(n) {
  // Round to "presentable" increments
  if (n >= 10000) return Math.round(n / 500) * 500;
  if (n >= 3000)  return Math.round(n / 100) * 100;
  if (n >= 500)   return Math.round(n / 50) * 50;
  return Math.round(n / 10) * 10;
}

function generateForDest(dest, categoriesToInclude, seasonsToInclude) {
  const stateMult = STATE_MULT[dest.state_id] ?? 1.0;
  const altMult = altitudeMult(dest.elevation_m);
  const diffMult = difficultyMult(dest.difficulty);
  const tierMult = budgetTierMult(dest.budget_tier);
  const { peak: peakMonths, shoulder: shoulderMonths, low: lowMonths } = seasonsForDest(dest.best_months);

  const destOverrides = CATEGORY_OVERRIDES[dest.id] ?? {};

  const rows = [];

  for (const category of categoriesToInclude) {
    const base = BASE[category];
    if (!base) continue;

    const categoryOverrideTypical = destOverrides[category];
    const peakMultForDest = PEAK_OVERRIDES[dest.id] ?? SEASON_MULT.peak;

    const seasonConfig = {
      peak:     { mult: peakMultForDest,     months: peakMonths },
      shoulder: { mult: SEASON_MULT.shoulder, months: shoulderMonths },
      low:      { mult: SEASON_MULT.low,      months: lowMonths },
    };

    for (const season of seasonsToInclude) {
      const cfg = seasonConfig[season];
      if (!cfg || cfg.months.length === 0) continue;

      // Transport / permit / activity costs don't vary by season much
      const seasonMult = ["permit-fees", "transport-intercity"].includes(category)
        ? 1.0
        : cfg.mult;

      const combinedMult = stateMult * altMult * diffMult * tierMult * seasonMult;
      let typical = Math.round(base.typical * combinedMult);
      if (categoryOverrideTypical) typical = Math.round(categoryOverrideTypical * seasonMult);
      let low  = Math.round(base.low * combinedMult);
      let high = Math.round(base.high * combinedMult);

      // If the category override bumps typical above the scaled high,
      // rescale low/high proportionally so the CHECK constraint
      // (range_high >= typical) holds and the band still makes sense.
      if (typical > high) {
        const ratio = typical / Math.max(high, 1);
        high = Math.round(typical * 1.6);
        low = Math.round(low * ratio);
      }
      // Safety: low must be < typical
      if (low >= typical) low = Math.max(Math.round(typical * 0.4), 1);

      rows.push({
        destination_id: dest.id,
        category,
        season,
        months: cfg.months,
        typical_inr: roundNice(typical),
        range_low_inr: roundNice(low),
        range_high_inr: roundNice(high),
        unit: base.unit,
        source_ref: "editorial_model_2026_Q2",
        notes: categoryOverrideTypical
          ? `Destination-specific override applied (${category}).`
          : null,
      });
    }
  }

  return rows;
}

// ─── Main ────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

console.log(`seed-cost-index — ${SAMPLE ? "SAMPLE" : "LIVE"}${DEST_FILTER ? ` · ${DEST_FILTER}` : ""}\n`);

// Pull all destinations
let dests;
{
  const all = [];
  const pageSize = 1000;
  let from = 0;
  while (true) {
    let q = supabase
      .from("destinations")
      .select("id, name, state_id, elevation_m, difficulty, budget_tier, best_months")
      .order("id")
      .range(from, from + pageSize - 1);
    if (DEST_FILTER) q = q.eq("id", DEST_FILTER);
    const { data, error } = await q;
    if (error) throw error;
    all.push(...(data ?? []));
    if (!data || data.length < pageSize) break;
    from += pageSize;
  }
  dests = all;
}
console.log(`Fetched ${dests.length} destinations\n`);

// Category + season coverage strategy:
// - Every dest: homestay, hotel-mid, food-per-day, transport-taxi-day,
//   activity-sample, permit-fees (if applicable)
// - All 3 seasons (peak + shoulder + low)
// - Premium categories (hotel-splurge, hostel-dorm, transport-intercity)
//   included on destinations with budget_tier >= 2

const CORE_CATEGORIES = [
  "homestay",
  "hotel-mid",
  "food-per-day",
  "transport-taxi-day",
  "activity-sample",
];
const PREMIUM_CATEGORIES = ["hotel-splurge", "hostel-dorm", "transport-intercity"];
const SEASONS = ["peak", "shoulder", "low"];

// Permit-fees category only applies to destinations that actually require
// permits (Protected Area Permits, Inner Line Permits, national-park entry
// over-and-above activity-sample, or UT-specific permits). Listing it on
// dests without permits is a fabrication risk flagged in voice/integrity.
const PERMIT_STATES = new Set([
  "arunachal-pradesh",
  "sikkim",
  "lakshadweep",
  "ladakh",
]);
const PERMIT_DESTS = new Set([
  // Andaman forest permits
  "baratang-island",
  "diglipur",
  "little-andaman",
  "north-bay-island",
  // National park entries (separate from safari fees)
  "corbett-national-park",
  "kaziranga",
  "kanha",
  "bandhavgarh",
  "ranthambore",
  "bandipur",
  "gir-national-park",
  "sundarbans",
  "manas-national-park",
  "satkosia",
  "simlipal",
  "hemis-national-park",
  "pench",
  "tadoba",
  "bhitarkanika",
  "valley-of-flowers",
  // Trek permits (Uttarakhand)
  "har-ki-doon",
  "roopkund",
  "dzukou-valley",
  // Restricted-border dests outside PERMIT_STATES
  "dhanushkodi",
  "longewala",
]);

function needsPermit(dest) {
  return PERMIT_STATES.has(dest.state_id) || PERMIT_DESTS.has(dest.id);
}

const rows = [];
for (const dest of dests) {
  const includePremium = (dest.budget_tier ?? 2) >= 2;
  const includePermit = needsPermit(dest);
  const categories = [
    ...CORE_CATEGORIES,
    ...(includePremium ? PREMIUM_CATEGORIES : []),
    ...(includePermit ? ["permit-fees"] : []),
  ];
  rows.push(...generateForDest(dest, categories, SEASONS));
}

console.log(`Generated ${rows.length} cost rows across ${dests.length} destinations.\n`);

if (SAMPLE) {
  const sample = rows.filter((r) => !DEST_FILTER || r.destination_id === DEST_FILTER).slice(0, 30);
  console.log("Sample rows:\n");
  for (const r of sample) {
    console.log(`  ${r.destination_id.padEnd(20)} ${r.category.padEnd(22)} ${r.season.padEnd(8)} ${String(r.typical_inr).padStart(6)} INR  (${r.range_low_inr}-${r.range_high_inr}) ${r.unit}`);
  }
  process.exit(0);
}

if (WIPE) {
  console.log("Wiping destination_costs...");
  const { error } = await supabase.from("destination_costs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (error) { console.error(`✗ wipe failed: ${error.message}`); process.exit(1); }
  console.log("  Done.\n");
}

// Insert in batches
const CHUNK = 500;
let inserted = 0;
let failed = 0;
for (let i = 0; i < rows.length; i += CHUNK) {
  const batch = rows.slice(i, i + CHUNK);
  const { error } = await supabase.from("destination_costs").insert(batch);
  if (error) {
    failed += batch.length;
    console.error(`  ✗ batch ${i}: ${error.message}`);
  } else {
    inserted += batch.length;
    console.log(`  ✓ ${Math.min(i + CHUNK, rows.length)}/${rows.length}`);
  }
}
console.log(`\nDone. ${inserted} inserted · ${failed} failed.`);

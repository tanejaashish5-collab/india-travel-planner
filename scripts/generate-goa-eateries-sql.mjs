// Generates idempotent INSERT SQL for Goa eateries.
// Reads all 6 zone JSON files, dedupes by (name, area), normalises enum values.

import fs from "node:fs";
import path from "node:path";

const ZONES = [
  "goa-zone-1-north-beach-shacks.json",
  "goa-zone-2-panjim-fontainhas.json",
  "goa-zone-3-south-goa.json",
  "goa-zone-4-assagao-saligao.json",
  "goa-zone-5-cafes-bakeries.json",
  "goa-zone-6-luxury-fine-dining.json",
];

const DIR = "data/research/eateries";

const RESERVATION_NORMALISE = {
  "not-required": "walk-in",
  "not-accepted": "walk-in",
  "essential": "required",
};

const VEG_NORMALISE = {
  "veg-only": "pure-veg",
};

const CATEGORY_NORMALISE = {
  "casual_dining": "casual",
  "bakery": "sweet_shop",
};

// Map each restaurant's area_slug to a real destination_id.
// Existing Goa destinations in DB: agonda, anjuna, arambol, calangute-baga,
// chorao-divar, colva-benaulim, dudhsagar-falls, fort-aguada, mandrem, margao,
// mollem, morjim, old-goa, palolem, panaji, ponda-spice, reis-magos, vagator.
// Plus 3 NEW we're adding: candolim, assagao, siolim.
const GOA_DESTINATION_MAP = {
  // North coast — direct matches and combined slugs
  "anjuna": "anjuna",
  "baga": "calangute-baga",
  "calangute": "calangute-baga",
  "candolim": "candolim",            // NEW destination
  "assagao": "assagao",               // NEW destination
  "saligao": "assagao",               // NEW — adjacent neighbour
  "siolim": "siolim",                 // NEW destination
  "vagator": "vagator",
  // Panjim cluster — Fontainhas is Panjim's Latin Quarter
  "panjim": "panaji",
  "fontainhas": "panaji",
  // Far north → morjim/mandrem
  "mandrem": "mandrem",
  "morjim": "morjim",
  "ashwem": "morjim",
  // South Goa town + central south → margao or colva-benaulim
  "margao": "margao",
  "raia": "margao",                   // Margao-adjacent inland
  "betalbatim": "colva-benaulim",     // South Goa beach cluster
  "utorda": "colva-benaulim",
  "majorda": "colva-benaulim",
  "cansaulim": "colva-benaulim",      // Park Hyatt cluster
  "arossim": "colva-benaulim",
  "cavelossim": "colva-benaulim",
  "mobor": "colva-benaulim",
  "colva": "colva-benaulim",
  "varca": "colva-benaulim",
  "benaulim": "colva-benaulim",
  // South beach cluster → palolem
  "palolem": "palolem",
  "agonda": "agonda",                 // its own destination
  "patnem": "palolem",
};

const sqlEscape = (s) => {
  if (s === null || s === undefined) return "NULL";
  return `'${String(s).replace(/'/g, "''")}'`;
};

const sqlArray = (arr) => {
  if (!arr || !arr.length) return "ARRAY[]::text[]";
  const items = arr.map((x) => sqlEscape(x)).join(", ");
  return `ARRAY[${items}]`;
};

const rangeLiteral = (rangeStr) => {
  if (!rangeStr) return "NULL";
  const m = String(rangeStr).match(/^\[\s*(\d+)\s*,\s*(\d+)\s*\]$/);
  if (!m) return "NULL";
  return `int4range(${m[1]}, ${m[2]}, '[]')`;
};

const seen = new Map();
let total = 0;
let duplicates = 0;
const dupLog = [];

for (const file of ZONES) {
  const fp = path.join(DIR, file);
  const rows = JSON.parse(fs.readFileSync(fp, "utf8"));
  total += rows.length;
  for (const r of rows) {
    // Dedupe by name only — Goa restaurants in this dataset are single
    // establishments, not multi-branch chains. (Bombay/Bengaluru data uses
    // name+area because Truffles, Karavalli etc. have multiple legit branches.)
    const key = r.name.toLowerCase();
    if (seen.has(key)) {
      duplicates++;
      dupLog.push(`${r.name} @ ${r.area} (dropped from ${file})`);
      continue;
    }
    seen.set(key, r);
  }
}

const rows = Array.from(seen.values());

const cols = [
  "destination_id", "name", "area", "area_slug", "cuisine", "category",
  "signature_dish", "must_try", "price_range", "price_per_head_inr",
  "vegetarian", "kid_friendly", "reservation", "dress_code", "established_year",
  "why_it_matters", "insider_tip", "signature_address", "google_maps_url",
  "zomato_url", "source_urls", "last_verified", "is_legendary", "is_active",
];

const valuesSql = rows.map((r) => {
  const reservation = RESERVATION_NORMALISE[r.reservation] ?? r.reservation;
  const vegetarian = VEG_NORMALISE[r.vegetarian] ?? r.vegetarian;
  const category = CATEGORY_NORMALISE[r.category] ?? r.category;
  return `(
  ${sqlEscape(GOA_DESTINATION_MAP[r.area_slug] ?? r.area_slug)},
  ${sqlEscape(r.name)},
  ${sqlEscape(r.area)},
  ${sqlEscape(r.area_slug)},
  ${sqlArray(r.cuisine)},
  ${sqlEscape(category)},
  ${sqlEscape(r.signature_dish)},
  ${sqlArray(r.must_try)},
  ${sqlEscape(r.price_range)},
  ${rangeLiteral(r.price_per_head_inr)},
  ${sqlEscape(vegetarian)},
  ${r.kid_friendly ? "true" : "false"},
  ${sqlEscape(reservation)},
  ${sqlEscape(r.dress_code)},
  ${r.established_year ?? "NULL"},
  ${sqlEscape(r.why_it_matters)},
  ${sqlEscape(r.insider_tip)},
  ${sqlEscape(r.signature_address)},
  ${sqlEscape(r.google_maps_url)},
  ${sqlEscape(r.zomato_url)},
  ${sqlArray(r.source_urls)},
  ${sqlEscape(r.last_verified)}::date,
  ${r.is_legendary ? "true" : "false"},
  ${r.is_active ? "true" : "false"}
)`;
}).join(",\n");

const updateSet = cols.filter((c) => !["destination_id", "name", "area"].includes(c))
  .map((c) => `  ${c} = EXCLUDED.${c}`).join(",\n");

const sql = `-- Goa eateries: ${rows.length} rows (raw ${total}, deduped ${duplicates})
-- Generated ${new Date().toISOString()}

INSERT INTO local_eateries (${cols.join(", ")})
VALUES
${valuesSql}
ON CONFLICT (destination_id, name, area) DO UPDATE SET
${updateSet},
  updated_at = NOW();
`;

fs.writeFileSync("/tmp/goa-eateries.sql", sql);
console.log(`Wrote /tmp/goa-eateries.sql`);
console.log(`Raw rows: ${total}`);
console.log(`Duplicates removed: ${duplicates}`);
if (dupLog.length) console.log("Duplicate entries:\n  " + dupLog.join("\n  "));
console.log(`Final rows: ${rows.length}`);

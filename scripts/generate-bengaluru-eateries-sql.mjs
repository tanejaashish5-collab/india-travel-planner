// Generates idempotent INSERT SQL for Bengaluru eateries.
// Reads all 7 zone JSON files, dedupes by (name, area), normalises enum values,
// outputs to /tmp/bengaluru-eateries.sql for paste in Supabase Studio.

import fs from "node:fs";
import path from "node:path";

const ZONES = [
  "bengaluru-zone-1-darshinis-udupi.json",
  "bengaluru-zone-2-indiranagar.json",
  "bengaluru-zone-3-koramangala-hsr-whitefield.json",
  "bengaluru-zone-4-fine-dining.json",
  "bengaluru-zone-5-heritage-old-bangalore.json",
  "bengaluru-zone-6-street-food.json",
  "bengaluru-zone-7-cafes-brunch.json",
];

const DIR = "data/research/eateries";

const RESERVATION_NORMALISE = {
  "not-required": "walk-in",
  "not-accepted": "walk-in",
};

const VEG_NORMALISE = {
  "veg-only": "pure-veg",
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
  const m = rangeStr.match(/^\[\s*(\d+)\s*,\s*(\d+)\s*\]$/);
  if (!m) return "NULL";
  return `int4range(${m[1]}, ${m[2]}, '[]')`;
};

const seen = new Map();
let total = 0;
let duplicates = 0;

for (const file of ZONES) {
  const fp = path.join(DIR, file);
  const rows = JSON.parse(fs.readFileSync(fp, "utf8"));
  total += rows.length;
  for (const r of rows) {
    const key = `${r.name}::${r.area}`;
    if (seen.has(key)) {
      duplicates++;
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
  return `(
  ${sqlEscape(r.destination_id)},
  ${sqlEscape(r.name)},
  ${sqlEscape(r.area)},
  ${sqlEscape(r.area_slug)},
  ${sqlArray(r.cuisine)},
  ${sqlEscape(r.category)},
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

const sql = `-- Bengaluru eateries: ${rows.length} rows (raw ${total}, deduped ${duplicates})
-- Generated ${new Date().toISOString()}

INSERT INTO local_eateries (${cols.join(", ")})
VALUES
${valuesSql}
ON CONFLICT (destination_id, name, area) DO UPDATE SET
${updateSet},
  updated_at = NOW();
`;

fs.writeFileSync("/tmp/bengaluru-eateries.sql", sql);
console.log(`Wrote /tmp/bengaluru-eateries.sql`);
console.log(`Raw rows: ${total}`);
console.log(`Duplicates removed: ${duplicates}`);
console.log(`Final rows: ${rows.length}`);

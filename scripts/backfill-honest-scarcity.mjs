/**
 * Backfill destinations.honest_scarcity from S30/S37/S39/S40-S50 session memory.
 *
 * Phase A — Plan: ~/.claude/plans/does-the-cinematic-experience-immutable-candle.md
 *
 * Each row: { id, slot, category, specifics: { base_town?, base_distance_km?, note? } }
 * The script:
 *   1. Validates all ids exist in destinations (reports missing, exits if any).
 *   2. Merges per-slot entries into existing honest_scarcity via jsonb_set with COALESCE.
 *   3. Reports post-apply row count by category and slot.
 *
 * Run: node --env-file=apps/web/.env.local scripts/backfill-honest-scarcity.mjs
 *      DRY=1 node --env-file=apps/web/.env.local scripts/backfill-honest-scarcity.mjs
 *
 * Idempotent — re-running is safe (same id+slot just overwrites the slot entry).
 */
import pg from "pg";

const dbUrl = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("Set SUPABASE_DB_URL or DATABASE_URL.");
  process.exit(1);
}
const DRY = process.env.DRY === "1";

const ROWS = [
  // ── np_core ──────────────────────────────────────────────────────────
  { id: "charaideo", slot: "eateries", category: "np_core",
    specifics: { base_town: "Sivasagar", base_distance_km: 33,
      note: "UNESCO 2024 — first cultural NE inscription." } },
  { id: "charaideo", slot: "stays", category: "np_core",
    specifics: { base_town: "Sivasagar", base_distance_km: 33,
      note: "Maidam burial-mound buffer; commercial stays sit in Sivasagar." } },
  { id: "manas-national-park", slot: "eateries", category: "np_core",
    specifics: { base_town: "Barpeta Road", base_distance_km: 22,
      note: "Tiger Reserve core — forest-lodge canteens only." } },
  { id: "manas-national-park", slot: "stays", category: "np_core",
    specifics: { base_town: "Barpeta Road", base_distance_km: 22,
      note: "Mathanguri Forest Lodge inside the park; everything else is fringe." } },
  { id: "dzukou-valley", slot: "eateries", category: "np_core",
    specifics: { base_town: "Kohima", base_distance_km: 25,
      note: "UNESCO biodiversity hotspot — trek-only, no commerce permitted." } },
  { id: "dzukou-valley", slot: "stays", category: "np_core",
    specifics: { base_town: "Kohima", base_distance_km: 25,
      note: "Dzukou Rest House at the rim is the only sanctioned overnight." } },
  { id: "phawngpui-peak", slot: "eateries", category: "np_core",
    specifics: { base_town: "Sangau", base_distance_km: 14,
      note: "Blue Mountain National Park core — no on-peak food infrastructure." } },
  { id: "phawngpui-peak", slot: "stays", category: "np_core",
    specifics: { base_town: "Sangau", base_distance_km: 14,
      note: "Sangau village homestays are the only sanctioned base." } },
  { id: "namdapha", slot: "eateries", category: "np_core",
    specifics: { base_town: "Miao", base_distance_km: 25,
      note: "India's easternmost national park; forest-camp canteens only." } },
  { id: "namdapha", slot: "stays", category: "np_core",
    specifics: { base_town: "Miao", base_distance_km: 25,
      note: "India's easternmost national park; deeper-than-Miao stays are forest-camp only." } },
  { id: "unakoti", slot: "eateries", category: "np_core",
    specifics: { base_town: "Kailashahar", base_distance_km: 10,
      note: "ASI-protected rock-cut shrine site — no on-site commerce." } },
  { id: "unakoti", slot: "stays", category: "np_core",
    specifics: { base_town: "Kailashahar", base_distance_km: 10,
      note: "ASI rest-house aside, Kailashahar holds the inventory." } },
  { id: "chinnar", slot: "eateries", category: "np_core",
    specifics: { base_town: "Marayoor", base_distance_km: 18,
      note: "Wildlife sanctuary core — no commercial dining inside the buffer; eat in Marayoor or Munnar." } },
  { id: "dudhwa-national-park", slot: "eateries", category: "np_core",
    specifics: { base_town: "Palia Kalan", base_distance_km: 10,
      note: "Tiger Reserve core — forest-lodge canteens only; commercial dining sits in Palia Kalan." } },

  // ── military_or_restricted ───────────────────────────────────────────
  { id: "tosamaidan", slot: "eateries", category: "military_or_restricted",
    specifics: { base_town: "Srinagar", base_distance_km: 62,
      note: "Active firing range until 2014; no permanent commerce permitted on the meadow." } },
  { id: "tosamaidan", slot: "stays", category: "military_or_restricted",
    specifics: { base_town: "Srinagar", base_distance_km: 62,
      note: "Active firing range until 2014; JKTDC's 70-tent sanctioned install (2022) is the only in-meadow option." } },
  { id: "gurudongmar-lake", slot: "eateries", category: "military_or_restricted",
    specifics: { base_town: "Lachen", base_distance_km: 67,
      note: "Army-controlled lake at 5,430m; ILP-restricted, day-trip only." } },
  { id: "gurudongmar-lake", slot: "stays", category: "military_or_restricted",
    specifics: { base_town: "Lachen", base_distance_km: 67,
      note: "No overnight at altitude; civilians sleep in Lachen and ascend at dawn." } },
  { id: "tsomgo-lake", slot: "eateries", category: "military_or_restricted",
    specifics: { base_town: "Gangtok", base_distance_km: 38,
      note: "Army-controlled lake at 3,753m; ILP-restricted day-trip only." } },
  { id: "tsomgo-lake", slot: "stays", category: "military_or_restricted",
    specifics: { base_town: "Gangtok", base_distance_km: 38,
      note: "Army-controlled lake, ILP-restricted; stays prohibited inside the buffer." } },
  { id: "moreh", slot: "stays", category: "military_or_restricted",
    specifics: { base_town: "Imphal", base_distance_km: 110,
      note: "India–Myanmar border town; ILP regime and limited sanctioned inventory." } },
  { id: "bangus-valley", slot: "eateries", category: "military_or_restricted",
    specifics: { base_town: "Kupwara", base_distance_km: 30,
      note: "LoC-proximate meadow — no permanent commerce permitted; eat in Kupwara on the way up or rely on the JKTDC camp kitchen." } },

  // ── sub_5k_tribal ────────────────────────────────────────────────────
  { id: "anini", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Roing", base_distance_km: 250,
      note: "Dibang Valley HQ, Idu Mishmi community under 5,000." } },
  { id: "anini", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Roing", base_distance_km: 250,
      note: "Every overnight is a community homestay; Circuit House aside, there's no inn." } },
  { id: "dambuk", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Roing", base_distance_km: 65,
      note: "Orange-festival village; commerce is December-pop-up only." } },
  { id: "mechuka", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Aalo", base_distance_km: 180,
      note: "Memba community high-altitude valley; no standalone restaurants." } },
  { id: "nongriat", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Tyrna trailhead", base_distance_km: 0,
      note: "Trek-only village of ~150; meals come from homestay kitchens at the bottom." } },
  { id: "nongriat", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Tyrna trailhead", base_distance_km: 0,
      note: "Reachable only on foot via 3,500 steps; all stays are homestay-attached." } },
  { id: "tamenglong", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Imphal", base_distance_km: 150,
      note: "Rongmei-Naga district HQ; no Zomato-tier inventory." } },
  { id: "tamenglong", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Imphal", base_distance_km: 150,
      note: "Circuit House plus a handful of homestays comprise the full sanctioned list." } },
  { id: "pfutsero", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Kohima", base_distance_km: 70,
      note: "Nagaland's highest town; Chakhesang community, sub-5,000 population." } },
  { id: "mawsynram", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Shillong", base_distance_km: 65,
      note: "World's wettest place; Khasi village, homestay-only ecosystem." } },
  { id: "ukhrul", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Imphal", base_distance_km: 84,
      note: "Tangkhul Naga district HQ; Shirui-lily belt with thin commercial inventory." } },
  { id: "mawphlang", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Shillong", base_distance_km: 25,
      note: "Sacred Grove village; Khasi community-run homestays only." } },
  { id: "dawki", slot: "stays", category: "sub_5k_tribal",
    specifics: { base_town: "Shillong", base_distance_km: 82,
      note: "Border village on the Umngot; the documented stays sit across the river in Shnongpdeng." } },
  { id: "kumbalangi", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Kochi", base_distance_km: 14,
      note: "India's first model tourism village (declared 2003) — community homestays carry the dining, no standalone restaurants on the backwater." } },
  { id: "lambasingi", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Chintapalli", base_distance_km: 28,
      note: "3,000-pop hill village — December-only tourism, no year-round standalone commerce." } },
  { id: "ahobilam", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Allagadda", base_distance_km: 20,
      note: "Pilgrim village under 5,000 — annadanam (temple meals) is the dining; no standalone restaurants beyond the Nava-Narasimha shrine cluster." } },
  { id: "kadmat", slot: "eateries", category: "sub_5k_tribal",
    specifics: { base_town: "Agatti", base_distance_km: 50,
      note: "Permit-restricted Lakshadweep atoll — SPORTS resort canteen and a handful of local homestays carry the dining; no standalone restaurants." } },

  // ── uninhabited_island ───────────────────────────────────────────────
  { id: "bangaram", slot: "eateries", category: "uninhabited_island",
    specifics: { base_town: "Agatti", base_distance_km: 8,
      note: "Uninhabited atoll; resort canteen only when the lease is active." } },
  { id: "bangaram", slot: "stays", category: "uninhabited_island",
    specifics: { base_town: "Agatti", base_distance_km: 8,
      note: "Lone resort lease in handover (CGH Earth → IHCL SeleQtions, Mar 2025); day-trip until reopened." } },
  { id: "barren-island", slot: "eateries", category: "uninhabited_island",
    specifics: { base_town: "Port Blair", base_distance_km: 138,
      note: "Active volcano; uninhabited, day-trip via PADI live-aboards only." } },
  { id: "barren-island", slot: "stays", category: "uninhabited_island",
    specifics: { base_town: "Port Blair", base_distance_km: 138,
      note: "No landings permitted; you sleep on the dive boat." } },
  { id: "north-bay-island", slot: "eateries", category: "uninhabited_island",
    specifics: { base_town: "Port Blair", base_distance_km: 5,
      note: "Lighthouse-on-the-₹20-note island; uninhabited, water-sports day-trip only." } },
  { id: "north-bay-island", slot: "stays", category: "uninhabited_island",
    specifics: { base_town: "Port Blair", base_distance_km: 5,
      note: "No overnight permitted; back to Port Blair by sunset." } },
  { id: "ross-island", slot: "eateries", category: "uninhabited_island",
    specifics: { base_town: "Port Blair", base_distance_km: 2,
      note: "Renamed Netaji Subhas Chandra Bose Dweep (2018); ruins-museum island, day-trip only." } },
  { id: "ross-island", slot: "stays", category: "uninhabited_island",
    specifics: { base_town: "Port Blair", base_distance_km: 2,
      note: "ASI-protected ruins, no overnight permitted." } },
  { id: "elephanta-caves", slot: "eateries", category: "uninhabited_island",
    specifics: { base_town: "Mumbai Gateway", base_distance_km: 11,
      note: "UNESCO 1987; last ferry 5:30pm sharp, no on-island commercial dining." } },
  { id: "elephanta-caves", slot: "stays", category: "uninhabited_island",
    specifics: { base_town: "Mumbai Gateway", base_distance_km: 11,
      note: "No overnight on the island; sleep on the Mumbai side of the harbour." } },

  // ── high_altitude_pass ───────────────────────────────────────────────
  { id: "umlingla", slot: "eateries", category: "high_altitude_pass",
    specifics: { base_town: "Hanle", base_distance_km: 200,
      note: "World's highest motorable pass at 5,798m; no settlement, no infrastructure." } },
  { id: "umlingla", slot: "stays", category: "high_altitude_pass",
    specifics: { base_town: "Hanle", base_distance_km: 200,
      note: "Acclimatise in Hanle; overnight at 5,798m is medically unwise." } },
  { id: "sinthan-top", slot: "eateries", category: "high_altitude_pass",
    specifics: { base_town: "Kishtwar", base_distance_km: 65,
      note: "3,748m pass between Anantnag and Kishtwar; transit point, no settlement." } },
  { id: "sinthan-top", slot: "stays", category: "high_altitude_pass",
    specifics: { base_town: "Kishtwar", base_distance_km: 65,
      note: "Pass only — no overnight; descend to Kishtwar or Anantnag." } },
];

const client = new pg.Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
console.log(`Connected. ${ROWS.length} HS rows queued. DRY=${DRY ? "on" : "off"}.`);

try {
  // 1. Validate ids.
  const uniqueSlugs = [...new Set(ROWS.map((r) => r.id))];
  const { rows: existing } = await client.query(
    "SELECT id FROM destinations WHERE id = ANY($1)",
    [uniqueSlugs],
  );
  const existingSet = new Set(existing.map((r) => r.id));
  const missing = uniqueSlugs.filter((s) => !existingSet.has(s));
  if (missing.length) {
    console.error(`\n✗ ${missing.length} ids not in destinations:`);
    missing.forEach((s) => console.error(`    ${s}`));
    console.error("\nFix the ROWS array or seed the destinations first. Aborting.");
    process.exit(1);
  }
  console.log(`✓ All ${uniqueSlugs.length} unique ids exist.`);

  if (DRY) {
    console.log("\nDRY run — would apply:");
    for (const r of ROWS) {
      console.log(`  ${r.id.padEnd(28)} ${r.slot.padEnd(9)} ${r.category}`);
    }
    process.exit(0);
  }

  // 2. Apply.
  await client.query("BEGIN");
  for (const r of ROWS) {
    const slotEntry = {
      confirmed: true,
      category: r.category,
      specifics: r.specifics,
    };
    await client.query(
      `UPDATE destinations
         SET honest_scarcity = jsonb_set(
           COALESCE(honest_scarcity, '{}'::jsonb),
           ARRAY[$2],
           $3::jsonb,
           true
         )
         WHERE id = $1`,
      [r.id, r.slot, JSON.stringify(slotEntry)],
    );
  }
  await client.query("COMMIT");
  console.log(`✓ Applied ${ROWS.length} HS rows.`);

  // 3. Verify.
  const { rows: counts } = await client.query(
    `SELECT
       jsonb_object_keys(honest_scarcity) AS slot,
       honest_scarcity -> jsonb_object_keys(honest_scarcity) ->> 'category' AS category,
       COUNT(*) AS n
     FROM destinations
     WHERE honest_scarcity IS NOT NULL
     GROUP BY 1, 2
     ORDER BY 1, 2`,
  );
  console.log("\nPost-apply counts (slot · category · n):");
  for (const r of counts) {
    console.log(`  ${r.slot.padEnd(9)} ${r.category.padEnd(24)} ${r.n}`);
  }
} catch (e) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("Apply failed, rolled back:", e.message);
  process.exit(1);
} finally {
  await client.end();
}

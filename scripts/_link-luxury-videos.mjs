// Maps each luxury_experiences row to its hero video slug and UPDATEs the
// DB. Mirrors the canonical hero choice from the brief: train exteriors
// (more recognisable than interiors for SEO + thumbnail), iconic-stay
// signature arrival (boat launch, horse-carriage, palace driveway), and
// the 1:1 ultra-luxury mapping.
//
// Run: node scripts/_link-luxury-videos.mjs            # dry-run
//      node scripts/_link-luxury-videos.mjs --commit   # write to prod
//
// The 2 'Pending' brief rows still get a fallback assignment:
//   umaid-bhawan exterior pending → use umaid-bhawan-dining as hero
//   royal-rajasthan-by-car master pending → leave hero_video_slug NULL

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const COMMIT = process.argv.includes("--commit");

// entry_id → hero_video_slug
// Trains: exterior wins over interior for hero (more recognisable, better
// thumbnail). Interiors are still on R2 and can be referenced later via
// a future `secondary_video_slugs` column.
// Iconic stays: signature arrival wins over suite interior (boat launch,
// horse carriage, driveway approach — the canonical brand moment).
// Ultra-luxury stays: 1:1 mapping (each property has exactly one video).
const MAPPING = {
  // Trains (4)
  "palace-on-wheels":                "palace-on-wheels-exterior",
  "maharajas-express":               "maharajas-express-exterior",
  "deccan-odyssey":                  "deccan-odyssey-exterior",
  "golden-chariot":                  "golden-chariot-exterior",

  // Iconic stays (5)
  "taj-lake-palace-udaipur":         "taj-lake-palace-arrival",
  "taj-umaid-bhawan-palace-jodhpur": "umaid-bhawan-dining",  // exterior pending — dining as fallback
  "rambagh-palace-jaipur":           "rambagh-driveway",
  "taj-falaknuma-palace-hyderabad":  "falaknuma-driveway",
  "the-taj-mahal-palace-mumbai":     "taj-mahal-palace-mumbai-facade",

  // Ultra-luxury stays (15)
  "oberoi-udaivilas-udaipur":        "oberoi-udaivilas-domes",
  "oberoi-rajvilas-jaipur":          "oberoi-rajvilas-walkway",
  "aman-i-khas-ranthambore":         "aman-i-khas-tent",
  "amanbagh-alwar":                  "amanbagh-pool",
  "oberoi-amarvilas-agra":           "oberoi-amarvilas-taj-view",
  "itc-grand-bharat-manesar":        "itc-grand-bharat-golf",
  "the-leela-palace-new-delhi":      "leela-palace-delhi-suite",
  "wildflower-hall-shimla":          "wildflower-hall-balcony",
  "ananda-in-the-himalayas-rishikesh": "ananda-rishikesh-yoga",
  "six-senses-vana-dehradun":        "six-senses-vana-treatment",
  "glenburn-tea-estate-darjeeling":  "glenburn-veranda",
  "brunton-boatyard-fort-kochi":     "brunton-boatyard-backwater",
  "banjaar-tola-kanha":              "banjaar-tola-safari",
  "mahua-kothi-bandhavgarh":         "mahua-kothi-kutiya",
  "sujan-sher-bagh-ranthambore":     "sujan-sher-bagh-tent",

  // Itineraries — only Royal Rajasthan was briefed and it's PENDING, so
  // leave its hero NULL until the master cut is generated.
};

const updates = Object.entries(MAPPING);
console.log(`Plan: link ${updates.length} luxury entries to hero videos\n`);

const { data: existing } = await s
  .from("luxury_experiences")
  .select("id, hero_video_slug")
  .in("id", updates.map(([id]) => id));
const before = new Map((existing ?? []).map((r) => [r.id, r.hero_video_slug]));

for (const [entryId, videoSlug] of updates) {
  const cur = before.get(entryId);
  const status = cur === videoSlug ? "(already set)" : cur ? `(was: ${cur})` : "(new)";
  console.log(`  ${entryId.padEnd(40)} → ${videoSlug.padEnd(40)} ${status}`);
}

if (!COMMIT) {
  console.log("\nDRY RUN — rerun with --commit to write.");
  process.exit(0);
}

console.log("\nWriting…");
let changed = 0;
for (const [entryId, videoSlug] of updates) {
  const { error, count } = await s
    .from("luxury_experiences")
    .update({ hero_video_slug: videoSlug, updated_at: new Date().toISOString() }, { count: "exact" })
    .eq("id", entryId);
  if (error) {
    console.error(`  ✗ ${entryId}: ${error.message}`);
    continue;
  }
  if (count) changed += count;
}
console.log(`  ✓ ${changed} rows updated`);

const { data: final } = await s
  .from("luxury_experiences")
  .select("hero_video_slug", { count: "exact" })
  .not("hero_video_slug", "is", null);
console.log(`\nFinal: ${final?.length ?? 0} rows with hero_video_slug set`);

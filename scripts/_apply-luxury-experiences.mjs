// Bulk upsert luxury_experiences from data/luxury/luxury-experiences.json.
// Usage:
//   node scripts/_apply-luxury-experiences.mjs            # dry-run
//   node scripts/_apply-luxury-experiences.mjs --commit   # write to prod
//   node scripts/_apply-luxury-experiences.mjs --commit --publish   # also flip published=true
//
// Conflict key: (id) — PK. Upsert keeps existing rows in sync.
//
// Egress note: ~30 small rows over REST is well under the bulk-dump threshold
// (per reference_supabase_egress_rules.md the >500-row rule kicks in for
// dumps). Using @supabase/supabase-js here is fine.

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { config } from "dotenv";
import path from "node:path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local");
  process.exit(1);
}
const s = createClient(url, key, { auth: { persistSession: false } });

const COMMIT = process.argv.includes("--commit");
const PUBLISH = process.argv.includes("--publish");

const file = path.join(process.cwd(), "data", "luxury", "luxury-experiences.json");
if (!existsSync(file)) {
  console.error(`File not found: ${file}`);
  console.error("Run consolidation first: combine data/luxury/draft-*.json into luxury-experiences.json");
  process.exit(1);
}

const rows = JSON.parse(readFileSync(file, "utf-8"));
if (!Array.isArray(rows)) {
  console.error("luxury-experiences.json must be a JSON array");
  process.exit(1);
}

console.log(`Loaded ${rows.length} luxury experiences from ${file}`);
const byCategory = rows.reduce((acc, r) => {
  acc[r.category] = (acc[r.category] ?? 0) + 1;
  return acc;
}, {});
console.log("  by category:", byCategory);

// Validate: every row must have id, name, category, tier, official_url, sources >= 2
const errors = [];
for (const r of rows) {
  if (!r.id) errors.push(`row missing id: ${JSON.stringify(r).slice(0, 80)}`);
  if (!r.name) errors.push(`${r.id}: missing name`);
  if (!["train", "stay", "itinerary"].includes(r.category)) errors.push(`${r.id}: invalid category ${r.category}`);
  if (!["luxury", "ultra_luxury", "iconic"].includes(r.tier)) errors.push(`${r.id}: invalid tier ${r.tier}`);
  // itineraries may legitimately have no operator URL — they're our curations
  if (r.category !== "itinerary" && !r.official_url) errors.push(`${r.id}: missing official_url`);
  const srcCount = Array.isArray(r.sources) ? r.sources.length : 0;
  if (srcCount < 2) errors.push(`${r.id}: needs >=2 sources, has ${srcCount}`);
}
if (errors.length) {
  console.error("\nValidation errors:");
  for (const e of errors) console.error(`  ✗ ${e}`);
  console.error("\nFix and re-run.");
  process.exit(1);
}
console.log(`  ✓ all ${rows.length} rows pass schema + source-count validation\n`);

const now = new Date().toISOString();
const upserts = rows.map((r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  tier: r.tier,
  state_id: r.state_id ?? null,
  primary_destination_id: r.primary_destination_id ?? null,
  secondary_destination_ids: r.secondary_destination_ids ?? [],
  operator: r.operator ?? null,
  official_url: r.official_url ?? null,
  hero_image_url: r.hero_image_url ?? null,
  tagline: r.tagline ?? null,
  editorial: r.editorial ?? null,
  signature_experience: r.signature_experience ?? null,
  price_band_inr: r.price_band_inr ?? null,
  duration: r.duration ?? null,
  best_months: r.best_months ?? [],
  route_legs: r.route_legs ?? [],
  included: r.included ?? [],
  booking_links: r.booking_links ?? {},
  sources: r.sources ?? [],
  voice_flags: r.voice_flags ?? {},
  translations: r.translations ?? {},
  published: PUBLISH ? true : (r.published ?? false),
  updated_at: now,
}));

if (!COMMIT) {
  console.log("DRY RUN — rerun with --commit to write. Sample row:");
  console.log(JSON.stringify(upserts[0], null, 2).slice(0, 1200));
  process.exit(0);
}

console.log(`Upserting ${upserts.length} rows…`);
const { data, error } = await s
  .from("luxury_experiences")
  .upsert(upserts, { onConflict: "id" })
  .select("id, category, tier, published");

if (error) {
  console.error("Upsert failed:", error);
  process.exit(1);
}
console.log(`  ✓ ${data?.length ?? 0} rows written`);
const publishedCount = data?.filter((r) => r.published).length ?? 0;
console.log(`  ✓ ${publishedCount} published, ${(data?.length ?? 0) - publishedCount} draft`);

const { data: counts } = await s
  .from("luxury_experiences")
  .select("category, tier, published", { count: "exact" });
const summary = (counts ?? []).reduce((acc, r) => {
  const key = `${r.category}/${r.tier}/${r.published ? "pub" : "draft"}`;
  acc[key] = (acc[key] ?? 0) + 1;
  return acc;
}, {});
console.log("\nFinal DB state by category/tier/status:");
for (const [k, v] of Object.entries(summary).sort()) {
  console.log(`  ${k.padEnd(40)} ${v}`);
}

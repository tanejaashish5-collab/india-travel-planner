#!/usr/bin/env node
/**
 * Apply the 10-dest enrichment pilot — Kotagiri, Coonoor, Trichy, Hyderabad,
 * Nainital, Vrindavan, Kannur, Bekal, Mawphlang, Khonoma — replacing thin
 * daily_cost / crowd_calendar / food_scene / persona_blocks JSONB with the
 * researched, sourced versions. Sets section_reviews timestamps so the
 * freshness pip on each section reads "Reviewed today".
 *
 * Idempotent — uses .update() so no other columns are touched.
 *
 * Run: node --env-file=apps/web/.env.local scripts/apply-enrichment-pilot.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const data = JSON.parse(readFileSync(resolve(__dirname, "../data/enrichment-pilot-2026-05-03.json"), "utf-8"));
console.log(`Applying ${data.length} enriched destinations…\n`);

let ok = 0, fail = 0;
for (const row of data) {
  // Read current section_reviews so we merge instead of overwriting other keys
  const { data: existing, error: readErr } = await supabase
    .from("destinations")
    .select("section_reviews")
    .eq("id", row.id)
    .single();
  if (readErr) {
    console.error(`  ✗ ${row.id} read: ${readErr.message}`);
    fail++;
    continue;
  }
  const now = new Date().toISOString();
  const mergedReviews = {
    ...(existing?.section_reviews ?? {}),
    cost: now,
    crowd: now,
    food: now,
  };

  const { error } = await supabase
    .from("destinations")
    .update({
      daily_cost: row.daily_cost,
      crowd_calendar: row.crowd_calendar,
      food_scene: row.food_scene,
      persona_blocks: row.persona_blocks,
      section_reviews: mergedReviews,
      content_reviewed_at: now,
    })
    .eq("id", row.id);

  if (error) {
    console.error(`  ✗ ${row.id}: ${error.message}`);
    fail++;
  } else {
    ok++;
    console.log(`  ✓ ${row.id}`);
  }
}

console.log(`\nDone. ${ok} ok, ${fail} failed.`);
process.exit(fail > 0 ? 1 : 0);

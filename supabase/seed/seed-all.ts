/**
 * Master seed script: imports ALL data files into Supabase
 * Run: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx supabase/seed/seed-all.ts
 *
 * Processes:
 * 1. Original destinations.json (8 existing)
 * 2. hp-new-destinations.json (7 new HP)
 * 3. uk-new-destinations.json (5 new UK)
 * 4. kids-friendly.json (all destinations)
 * 5. confidence-cards.json (all destinations)
 * 6. spiti-sub-destinations.json
 * 7. hidden-gems.json
 * + future: jk-destinations.json, ladakh-destinations.json, etc.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const SEED_DIR = resolve(__dirname);

function loadJSON<T>(filename: string): T | null {
  const path = resolve(SEED_DIR, filename);
  if (!existsSync(path)) {
    console.warn(`  ⚠ ${filename} not found, skipping`);
    return null;
  }
  return JSON.parse(readFileSync(path, "utf-8"));
}

const STATE_MAP: Record<string, string> = {
  "Himachal Pradesh": "himachal-pradesh",
  "Uttarakhand": "uttarakhand",
  "Jammu & Kashmir": "jammu-kashmir",
  "Ladakh": "ladakh",
  "Rajasthan": "rajasthan",
  "Uttar Pradesh": "uttar-pradesh",
  "Punjab": "punjab",
  "Delhi": "delhi",
  "Haryana": "haryana",
  "Chandigarh": "chandigarh",
};

// --- Seed original destinations ---
async function seedOriginalDestinations() {
  const raw = loadJSON<{ destinations: any[] }>("destinations.json");
  if (!raw) return;

  console.log(`\n📍 Seeding ${raw.destinations.length} original destinations...`);

  for (const dest of raw.destinations) {
    const stateId = STATE_MAP[dest.state];
    if (!stateId) {
      console.warn(`  Unknown state: ${dest.state} for ${dest.id}`);
      continue;
    }

    const { error } = await supabase.from("destinations").upsert({
      id: dest.id,
      name: dest.name,
      state_id: stateId,
      region: dest.region,
      coords: `POINT(${dest.coords[1]} ${dest.coords[0]})`,
      elevation_m: dest.elevation_m,
      type: dest.type,
      vibe: dest.vibe,
      difficulty: dest.difficulty,
      nearest_airport: dest.nearest_airport,
      nearest_railhead: dest.nearest_railhead,
      tagline: dest.tagline,
      why_special: dest.why_special,
      budget_tier: "mixed",
      ideal_duration_min: 2,
      ideal_duration_max: 5,
      tags: [...(dest.type || []), ...(dest.vibe || [])],
      best_months: dest.best_months,
      avoid_months: dest.avoid_months,
      deep_dive: { ...dest.deep_dive, top_experiences: dest.top_experiences },
      translations: {},
    });

    if (error) {
      console.error(`  ✗ ${dest.id}: ${error.message}`);
      continue;
    }

    // Monthly suitability
    for (const ms of dest.monthly_suitability) {
      await supabase.from("destination_months").upsert({
        destination_id: dest.id,
        month: ms.m,
        score: ms.score,
        note: ms.note,
        why_go: ms.score >= 4 ? ms.note : null,
        why_not: ms.score <= 2 ? ms.note : null,
      });
    }

    console.log(`  ✓ ${dest.id}`);
  }
}

// --- Seed new destinations (HP, UK, JK, Ladakh, etc.) ---
async function seedNewDestinations(filename: string) {
  const data = loadJSON<any[]>(filename);
  if (!data) return;

  console.log(`\n📍 Seeding ${data.length} destinations from ${filename}...`);

  for (const dest of data) {
    // Extract nested data before inserting destination
    const { monthly_suitability, kids_friendly, confidence_card, ...destData } = dest;

    // Convert coords if needed
    const coords = dest.coords
      ? `POINT(${dest.coords.lng} ${dest.coords.lat})`
      : null;

    const { error } = await supabase.from("destinations").upsert({
      ...destData,
      coords,
    });

    if (error) {
      console.error(`  ✗ ${dest.id}: ${error.message}`);
      continue;
    }

    // Monthly suitability
    if (monthly_suitability) {
      for (const ms of monthly_suitability) {
        await supabase.from("destination_months").upsert({
          destination_id: dest.id,
          month: ms.m,
          score: ms.score,
          note: ms.note,
          why_go: ms.score >= 4 ? ms.note : null,
          why_not: ms.score <= 2 ? ms.note : null,
        });
      }
    }

    // Kids friendly
    if (kids_friendly) {
      await supabase.from("kids_friendly").upsert({
        destination_id: dest.id,
        ...kids_friendly,
      });
    }

    console.log(`  ✓ ${dest.id}`);
  }
}

// --- Seed kids-friendly data ---
async function seedKidsFriendly() {
  const data = loadJSON<any[]>("kids-friendly.json");
  if (!data) return;

  console.log(`\n👶 Seeding ${data.length} kids-friendly records...`);

  for (const kf of data) {
    const { error } = await supabase.from("kids_friendly").upsert(kf);
    if (error) {
      console.error(`  ✗ ${kf.destination_id}: ${error.message}`);
    } else {
      console.log(`  ✓ ${kf.destination_id} (rating: ${kf.rating}/5)`);
    }
  }
}

// --- Seed confidence cards ---
async function seedConfidenceCards() {
  const data = loadJSON<any[]>("confidence-cards.json");
  if (!data) return;

  console.log(`\n🛡️ Seeding ${data.length} confidence cards...`);

  for (const cc of data) {
    const { error } = await supabase.from("confidence_cards").upsert(cc);
    if (error) {
      console.error(`  ✗ ${cc.destination_id}: ${error.message}`);
    } else {
      console.log(`  ✓ ${cc.destination_id} (safety: ${cc.safety_rating}/5)`);
    }
  }
}

// --- Seed sub-destinations ---
async function seedSubDestinations(filename: string) {
  const data = loadJSON<any[]>(filename);
  if (!data) return;

  console.log(`\n🏘️ Seeding ${data.length} sub-destinations from ${filename}...`);

  for (const sub of data) {
    const coords = sub.coords
      ? `POINT(${sub.coords.lng} ${sub.coords.lat})`
      : null;

    const { error } = await supabase.from("sub_destinations").upsert({
      ...sub,
      coords,
    });

    if (error) {
      console.error(`  ✗ ${sub.id}: ${error.message}`);
    } else {
      console.log(`  ✓ ${sub.id}`);
    }
  }
}

// --- Seed hidden gems ---
async function seedHiddenGems() {
  const data = loadJSON<any[]>("hidden-gems.json");
  if (!data) return;

  console.log(`\n💎 Seeding ${data.length} hidden gems...`);

  for (const gem of data) {
    const coords = gem.coords
      ? `POINT(${gem.coords.lng} ${gem.coords.lat})`
      : null;

    const { error } = await supabase.from("hidden_gems").upsert({
      ...gem,
      coords,
    });

    if (error) {
      console.error(`  ✗ ${gem.id}: ${error.message}`);
    } else {
      console.log(`  ✓ ${gem.id}`);
    }
  }
}

// --- Main ---
async function main() {
  console.log("🌍 India Travel Planner — Seeding database...\n");

  // Phase 1: Original destinations
  await seedOriginalDestinations();

  // Phase 1: Kids-friendly + Confidence cards for originals
  await seedKidsFriendly();
  await seedConfidenceCards();

  // Phase 1: Sub-destinations
  await seedSubDestinations("spiti-sub-destinations.json");

  // Phase 1: Hidden gems
  await seedHiddenGems();

  // Phase 2: New HP destinations
  await seedNewDestinations("hp-new-destinations.json");

  // Phase 2: New UK destinations
  await seedNewDestinations("uk-new-destinations.json");

  // Phase 3: J&K destinations
  await seedNewDestinations("jk-destinations.json");

  // Phase 3: Ladakh destinations
  await seedNewDestinations("ladakh-destinations.json");

  // Phase 4: Plains
  await seedNewDestinations("rajasthan-destinations.json");
  await seedNewDestinations("up-destinations.json");
  await seedNewDestinations("punjab-delhi-haryana-destinations.json");

  // TODO: Routes, treks, camping, collections, superlatives, permits, festivals

  console.log("\n✅ Seeding complete!");
}

main().catch(console.error);

/**
 * Seed script: reads destinations.json (old schema) and inserts into Supabase
 * Run: SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx supabase/seed/seed.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
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

// State mapping from destination data
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

interface OldDestination {
  id: string;
  name: string;
  state: string;
  region: string;
  coords: [number, number]; // [lat, lng]
  elevation_m: number;
  type: string[];
  vibe: string[];
  difficulty: string;
  nearest_airport: string;
  nearest_railhead: string;
  tagline: string;
  why_special: string;
  top_experiences: string[];
  monthly_suitability: Array<{ m: number; score: number; note: string }>;
  best_months: number[];
  avoid_months: number[];
  deep_dive: Record<string, unknown>;
}

async function seed() {
  const jsonPath = resolve(__dirname, "destinations.json");
  const raw = JSON.parse(readFileSync(jsonPath, "utf-8"));
  const destinations: OldDestination[] = raw.destinations;

  console.log(`Seeding ${destinations.length} destinations...`);

  for (const dest of destinations) {
    const stateId = STATE_MAP[dest.state];
    if (!stateId) {
      console.warn(`Unknown state: ${dest.state} for ${dest.id}, skipping`);
      continue;
    }

    // 1. Upsert destination
    const { error: destError } = await supabase.from("destinations").upsert({
      id: dest.id,
      name: dest.name,
      state_id: stateId,
      region: dest.region,
      coords: `POINT(${dest.coords[1]} ${dest.coords[0]})`, // PostGIS: POINT(lng lat)
      elevation_m: dest.elevation_m,
      type: dest.type,
      vibe: dest.vibe,
      difficulty: dest.difficulty,
      nearest_airport: dest.nearest_airport,
      nearest_railhead: dest.nearest_railhead,
      tagline: dest.tagline,
      why_special: dest.why_special,
      budget_tier: "mixed", // default for existing data
      ideal_duration_min: 2,
      ideal_duration_max: 5,
      tags: [...dest.type, ...dest.vibe],
      best_months: dest.best_months,
      avoid_months: dest.avoid_months,
      deep_dive: {
        ...dest.deep_dive,
        top_experiences: dest.top_experiences,
      },
      translations: {},
    });

    if (destError) {
      console.error(`Error seeding ${dest.id}:`, destError.message);
      continue;
    }

    // 2. Upsert monthly suitability
    for (const ms of dest.monthly_suitability) {
      const { error: monthError } = await supabase
        .from("destination_months")
        .upsert({
          destination_id: dest.id,
          month: ms.m,
          score: ms.score,
          note: ms.note,
          why_go: ms.score >= 4 ? ms.note : null,
          why_not: ms.score <= 2 ? ms.note : null,
        });

      if (monthError) {
        console.error(`  Month ${ms.m} error for ${dest.id}:`, monthError.message);
      }
    }

    console.log(`  ✓ ${dest.id} (${dest.monthly_suitability.length} months)`);
  }

  console.log("\nDone! Seeded destinations + monthly suitability.");
  console.log("Note: kids_friendly, confidence_cards, sub_destinations need manual data entry.");
}

seed().catch(console.error);

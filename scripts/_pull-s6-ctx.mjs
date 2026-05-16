import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const clusters = {
  uk: {
    label: "Uttarakhand — gem-only sweep (23 dests, 1 gem each)",
    ids: [
      "almora", "badrinath", "bhimtal", "binsar", "chakrata", "champawat",
      "chaukori", "chopta", "corbett-national-park", "dhanaulti", "gopeshwar",
      "guptkashi", "haridwar", "joshimath", "kanatal", "kausani", "landour",
      "mukteshwar", "munsiyari", "pithoragarh", "ranikhet", "tehri", "uttarkashi",
    ],
  },
  hp: {
    label: "Himachal Pradesh — gem-only sweep (14 dests, 1 gem each)",
    ids: [
      "bir-billing", "chail", "dalhousie", "jibhi", "kasauli", "keylong",
      "kullu", "lahaul-valley", "mandi", "mcleodganj", "palampur",
      "parvati-valley", "sissu", "solan",
    ],
  },
  ut: {
    label: "Pondy + Daman-Diu — widget greenfield (6 dests: eats + gems; daman/diu/silvassa also need stays)",
    ids: ["auroville", "karaikal", "puducherry", "daman", "diu", "silvassa"],
  },
};

for (const [key, c] of Object.entries(clusters)) {
  const { data: dests } = await supabase
    .from("destinations")
    .select(
      "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken"
    )
    .in("id", c.ids);

  const { data: existingGems } = await supabase
    .from("hidden_gems")
    .select("id, near_destination_id, name")
    .in("near_destination_id", c.ids);

  const { data: existingEats } = await supabase
    .from("local_eateries")
    .select("destination_id, name, area")
    .in("destination_id", c.ids);

  const { data: existingStays } = await supabase
    .from("destination_stay_picks")
    .select("destination_id, slot, name")
    .in("destination_id", c.ids);

  writeFileSync(
    `/tmp/s6-${key}-ctx.json`,
    JSON.stringify(
      {
        label: c.label,
        dests,
        existing: {
          gems: existingGems,
          eats: existingEats,
          stays: existingStays,
        },
      },
      null,
      2
    )
  );
  console.log(
    `${c.label}: ${dests.length} dests · ${existingGems.length} existing gems · ${existingEats.length} existing eats · ${existingStays.length} existing stays → /tmp/s6-${key}-ctx.json`
  );
}

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
  hp: {
    label: "S10 Agent A — HP belt (9 dests × 2 gems)",
    ids: ["chail", "jibhi", "keylong", "kullu", "lahaul-valley", "mandi", "palampur", "parvati-valley", "solan"],
  },
  ukEast: {
    label: "S10 Agent B — UK Kumaon + outliers (8 dests × 2 gems)",
    ids: ["bhimtal", "binsar", "champawat", "chaukori", "pithoragarh", "kanatal", "patnitop", "kargil"],
  },
  ukWest: {
    label: "S10 Agent C — UK Garhwal + char dham (8 dests × 2 gems)",
    ids: ["chakrata", "dhanaulti", "gopeshwar", "guptkashi", "joshimath", "landour", "tehri", "uttarkashi"],
  },
};

for (const [key, c] of Object.entries(clusters)) {
  const { data: dests } = await supabase.from("destinations")
    .select("id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken")
    .in("id", c.ids);

  const { data: existingGems } = await supabase.from("hidden_gems")
    .select("id, near_destination_id, name").in("near_destination_id", c.ids);

  writeFileSync(`/tmp/s10-${key}-ctx.json`, JSON.stringify({
    label: c.label,
    dests,
    existing: { gems: existingGems },
  }, null, 2));

  console.log(`${c.label}: ${dests.length} dests · ${existingGems.length} existing gems → /tmp/s10-${key}-ctx.json`);
}

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const ids = [
  "chamba", "cherrapunji", "tawang", "chitkul",
  "agra", "mcleodganj", "pahalgam", "pangong-lake",
  "ranthambore", "haridwar",
];

const { data: dests } = await supabase
  .from("destinations")
  .select(
    "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken"
  )
  .in("id", ids);

const { data: existingGems } = await supabase
  .from("hidden_gems")
  .select("id, near_destination_id, name")
  .in("near_destination_id", ids);

const { data: existingEats } = await supabase
  .from("local_eateries")
  .select("destination_id, name, area")
  .in("destination_id", ids);

const { data: existingStays } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name")
  .in("destination_id", ids);

writeFileSync(
  "/tmp/s8-ctx.json",
  JSON.stringify(
    {
      label: "S8 — gap=2 flip cohort (10 dests, 20 rows)",
      task_per_dest: {
        chamba: "+1 gem + 1 stay (any missing slot)",
        cherrapunji: "+1 gem + 1 eat",
        tawang: "+1 gem + 1 eat",
        chitkul: "+2 eats",
        agra: "+2 gems — TIER-1, exclude Taj Mahal / Agra Fort / Mehtab Bagh / Itimad-ud-Daulah / Akbar's Tomb / Fatehpur Sikri / Jama Masjid",
        mcleodganj: "+2 gems",
        pahalgam: "+2 gems",
        "pangong-lake": "+2 gems",
        ranthambore: "+2 gems",
        haridwar: "+2 gems — TIER-1, exclude Har Ki Pauri / Ganga Aarti / Mansa Devi / Chandi Devi / Daksha Mahadev (already in DB)",
      },
      dests,
      existing: { gems: existingGems, eats: existingEats, stays: existingStays },
    },
    null,
    2
  )
);
console.log(
  `wrote /tmp/s8-ctx.json — ${dests.length} dests · ${existingGems.length} gems · ${existingEats.length} eats · ${existingStays.length} stays`
);

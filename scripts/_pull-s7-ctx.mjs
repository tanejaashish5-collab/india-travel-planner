import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Guaranteed B→A flip cohort (1-row-away).
const ids = [
  // gems==2 (need +1 gem)
  "bir-billing", "chopta", "jaipur", "jaisalmer", "jodhpur",
  "munsiyari", "varanasi", "vrindavan",
  // eats==4 (need +1 eat)
  "tirthan-valley",
  // stays==2 (need +1 stay)
  "nalanda",
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
  "/tmp/s7-ctx.json",
  JSON.stringify(
    {
      label: "S7 — guaranteed B→A flip cohort (10 dests)",
      task_per_dest: {
        "bir-billing": "+1 gem",
        chopta: "+1 gem",
        jaipur: "+1 gem",
        jaisalmer: "+1 gem",
        jodhpur: "+1 gem",
        munsiyari: "+1 gem",
        varanasi: "+1 gem",
        vrindavan: "+1 gem",
        "tirthan-valley": "+1 eat",
        nalanda: "+1 stay (any missing slot)",
      },
      dests,
      existing: { gems: existingGems, eats: existingEats, stays: existingStays },
    },
    null,
    2
  )
);
console.log(
  `wrote /tmp/s7-ctx.json — ${dests.length} dests · ${existingGems.length} gems · ${existingEats.length} eats · ${existingStays.length} stays`
);

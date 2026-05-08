import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const ids = [
  "barren-island",
  "chidiya-tapu",
  "little-andaman",
  "long-island-andaman",
  "north-bay-island",
  "rangat",
  "ross-island",
];
const { data } = await supabase
  .from("destinations")
  .select(
    "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, nearest_railhead, languages_spoken, cell_network, atm_available, permit_required"
  )
  .in("id", ids);
console.log(JSON.stringify(data, null, 2));

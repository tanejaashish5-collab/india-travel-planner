import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// 1. Sikkim contexts (all 11 dests)
const sikkimIds = [
  "gangtok", "gurudongmar-lake", "khangchendzonga-np", "lachen", "lachung",
  "namchi", "pelling", "ravangla", "tsomgo-lake", "yuksom", "zuluk",
];
const { data: sikkim } = await supabase
  .from("destinations")
  .select(
    "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, best_months, avoid_months, deep_dive, nearest_airport, languages_spoken, cell_network, atm_available, permit_required"
  )
  .in("id", sikkimIds);

// 2. Bihar stays-needing context
const biharIds = ["nalanda", "pawapuri", "vaishali"];
const { data: bihar } = await supabase
  .from("destinations")
  .select(
    "id, name, state_id, region, elevation_m, type, vibe, tagline, why_special, deep_dive, nearest_airport"
  )
  .in("id", biharIds);

// 3. Existing stay picks for those Bihar dests (so agent doesn't suggest dups)
const { data: biharStays } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name, property_type, source, why_nakshiq")
  .in("destination_id", biharIds);

// 4. Sample of high-quality stay picks for the AGENT MODEL (3 dests with all 4 slots filled)
const { data: stayModel } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name, property_type, price_band, source, why_nakshiq")
  .in("destination_id", ["bodh-gaya", "patna", "pelling"])
  .limit(12);

writeFileSync("/tmp/s3-sikkim-ctx.json", JSON.stringify(sikkim, null, 2));
writeFileSync("/tmp/s3-bihar-ctx.json", JSON.stringify(bihar, null, 2));
writeFileSync("/tmp/s3-bihar-existing-stays.json", JSON.stringify(biharStays, null, 2));
writeFileSync("/tmp/s3-stay-model.json", JSON.stringify(stayModel, null, 2));

console.log(`sikkim: ${sikkim.length} dests`);
console.log(`bihar: ${bihar.length} dests`);
console.log(`bihar existing stays: ${biharStays.length}`);
console.log(`stay model: ${stayModel.length} sample rows`);

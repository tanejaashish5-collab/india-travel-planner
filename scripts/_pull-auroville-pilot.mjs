import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data: dest } = await supabase.from("destinations")
  .select("*").eq("id", "auroville").single();

const { data: existingMonths } = await supabase.from("destination_months")
  .select("*").eq("destination_id", "auroville");

const { data: gems } = await supabase.from("hidden_gems")
  .select("name, why_go, tags").eq("near_destination_id", "auroville");

const { data: eats } = await supabase.from("local_eateries")
  .select("name, area, signature_dish, why_it_matters")
  .eq("destination_id", "auroville");

const { data: stays } = await supabase.from("destination_stay_picks")
  .select("slot, name, property_type, why_nakshiq")
  .eq("destination_id", "auroville");

writeFileSync("/tmp/auroville-pilot-ctx.json", JSON.stringify({
  dest, existingMonths, gems, eats, stays
}, null, 2));

console.log("dest keys:", Object.keys(dest).join(", "));
console.log("\nbest_months:", dest.best_months);
console.log("avoid_months:", dest.avoid_months);
console.log("vibe:", dest.vibe);
console.log("tagline:", dest.tagline);
console.log("why_special:", (dest.why_special||"").slice(0,300));
console.log("\nexistingMonths rows:", existingMonths.length);
if (existingMonths.length) console.log("sample existing month row:", JSON.stringify(existingMonths[0], null, 2));
console.log("\ngems:", gems.length);
console.log("eats:", eats.length);
console.log("stays:", stays.length);

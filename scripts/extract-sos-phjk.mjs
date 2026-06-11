// Extract Punjab, Haryana, Chandigarh SOS data
import { createClient } from "@supabase/supabase-js";

const url = "https://dudzsdzfvikjjhurxrgc.supabase.co";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!anonKey) {
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY not set");
  process.exit(1);
}

const client = createClient(url, anonKey);

const { data, error } = await client
  .from("emergency_sos")
  .select("destination_id,rescue_contact,mountain_rescue,nearest_hospital,destinations(state_id)")
  .in("destinations.state_id", ["punjab", "haryana", "chandigarh"]);

if (error) {
  console.error("Error:", error);
  process.exit(1);
}

console.log(JSON.stringify(data, null, 2));

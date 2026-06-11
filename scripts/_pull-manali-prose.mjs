import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const { data } = await supabase
  .from("destination_months")
  .select("month, score, verdict, note, why_go, why_not, prose_lead")
  .eq("destination_id", "manali")
  .order("month");
console.log(JSON.stringify(data, null, 2));

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { count, data } = await supabase
  .from("local_eateries")
  .select("name, area", { count: "exact" })
  .eq("destination_id", "mussoorie")
  .eq("is_active", true)
  .order("area")
  .order("name");

console.log(`Rishikesh: ${count} eateries\n`);
let prevArea = '';
for (const r of data) {
  if (r.area !== prevArea) { console.log(`\n[${r.area}]`); prevArea = r.area; }
  console.log(`  ${r.name}`);
}

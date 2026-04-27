import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const dests = ["dalhousie", "kasauli", "palampur", "bir-billing", "chamba"];
let total = 0;
for (const d of dests) {
  const { count } = await supabase
    .from("local_eateries")
    .select("*", { count: "exact", head: true })
    .eq("destination_id", d)
    .eq("is_active", true);
  console.log(`${d.padEnd(15)} ${count ?? 0} eateries`);
  total += count ?? 0;
}
console.log(`\nTotal: ${total}`);

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Pull all HP destinations from destinations table
const { data: hpDests } = await supabase
  .from("destinations")
  .select("id, name, state_id")
  .in("state_id", ["himachal-pradesh", "himachal_pradesh"])
  .order("id");

console.log(`HP destinations: ${hpDests.length}\n`);

let withE = 0, totalE = 0;
const empty = [];
for (const d of hpDests) {
  const { count } = await supabase
    .from("local_eateries")
    .select("*", { count: "exact", head: true })
    .eq("destination_id", d.id)
    .eq("is_active", true);
  totalE += count ?? 0;
  if ((count ?? 0) > 0) withE++;
  else empty.push(d.id);
  console.log(`${d.id.padEnd(28)} ${count ?? 0}`);
}
console.log(`\n${withE}/${hpDests.length} dests with eateries · ${totalE} total rows`);
if (empty.length) console.log(`\nEmpty (${empty.length}): ${empty.join(", ")}`);

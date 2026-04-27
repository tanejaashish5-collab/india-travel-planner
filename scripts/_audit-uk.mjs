import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data: ukDests } = await s.from("destinations").select("id, name").eq("state_id", "uttarakhand").order("id");
console.log(`UK destinations: ${ukDests.length}\n`);

let withE = 0, totalE = 0;
const empty = [];
for (const d of ukDests) {
  const { count } = await s.from("local_eateries").select("*", { count: "exact", head: true }).eq("destination_id", d.id).eq("is_active", true);
  totalE += count ?? 0;
  if ((count ?? 0) > 0) withE++;
  else empty.push(d.id);
  console.log(`${d.id.padEnd(28)} ${count ?? 0}`);
}
console.log(`\n${withE}/${ukDests.length} dests with eateries · ${totalE} total rows`);
if (empty.length) console.log(`\nEmpty (${empty.length}): ${empty.join(", ")}`);

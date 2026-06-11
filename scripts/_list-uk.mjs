import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { data: dests } = await supabase
  .from("destinations")
  .select("id, name")
  .eq("state_id", "uttarakhand")
  .order("id");

console.log(`Uttarakhand destinations: ${dests.length}\n`);
for (const d of dests) {
  const { count } = await supabase
    .from("local_eateries")
    .select("*", { count: "exact", head: true })
    .eq("destination_id", d.id)
    .eq("is_active", true);
  console.log(`${d.id.padEnd(28)} ${(count ?? 0).toString().padEnd(3)} ${d.name}`);
}

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const states = ["punjab", "haryana", "chandigarh", "himachal-pradesh", "uttarakhand"];
const all = {};
for (const st of states) {
  const { data } = await s.from("destinations").select("id").eq("state_id", st).order("id");
  all[st] = (data ?? []).map(d => d.id);
  console.log(`${st.padEnd(20)} ${all[st].length} dests`);
}
const flat = Object.values(all).flat();
console.log(`\nTotal: ${flat.length} dests`);
console.log("\nComma-joined for --ids:");
console.log(flat.join(","));

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const states = ["punjab", "haryana", "chandigarh"];
for (const st of states) {
  const { data } = await s.from("destinations").select("id, name").eq("state_id", st).order("id");
  console.log(`\n${st.toUpperCase()} (${data?.length ?? 0} dests):`);
  data?.forEach(d => console.log(`  ${d.id.padEnd(28)} ${d.name}`));
}

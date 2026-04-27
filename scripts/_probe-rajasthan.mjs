import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data } = await s.from("destinations").select("id, name").eq("state_id", "rajasthan").order("id");
console.log(`RAJASTHAN (${data?.length ?? 0} dests):`);
data?.forEach(d => console.log(`  ${d.id.padEnd(28)} ${d.name}`));

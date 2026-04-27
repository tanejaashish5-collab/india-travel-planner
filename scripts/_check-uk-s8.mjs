import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const dests = ['landour','lansdowne','pithoragarh','munsiyari','champawat','chaukori','devprayag','rudraprayag','guptkashi','gopeshwar','uttarkashi','har-ki-doon','chakrata','corbett-national-park'];
let total = 0;
for (const d of dests) {
  const { count } = await s.from("local_eateries").select("*", { count: "exact", head: true }).eq("destination_id", d).eq("is_active", true);
  console.log(`${d.padEnd(25)} ${count ?? 0}`);
  total += count ?? 0;
}
console.log(`\nTotal: ${total}`);

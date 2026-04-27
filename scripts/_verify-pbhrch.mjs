import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const dests = ["amritsar","anandpur-sahib","damdama-sahib","patiala","kurukshetra","morni-hills","pinjore-gardens","chandigarh"];
let total = 0;
for (const d of dests) {
  const { count } = await s.from("local_eateries").select("*", { count: "exact", head: true }).eq("destination_id", d);
  console.log(`${d.padEnd(20)} ${count}`);
  total += count ?? 0;
}
console.log(`---\nTotal: ${total}`);

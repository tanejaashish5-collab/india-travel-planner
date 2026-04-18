import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const ids = ["pattadakal","shravanabelagola","konaseema","machilipatnam","pulicat-lake","araku-valley","laknavaram","auroville","maredumilli","gandikota","belum-caves","undavalli-caves","vijayawada","rajahmundry","nagarjuna-sagar","hyderabad","ananthagiri-hills","bhongir","warangal","ramappa-temple","alampur","basara","medak","pochampally","visakhapatnam","kolanupaka","nagarjuna-konda","adilabad","pillalamarri","puducherry","karaikal"];

const { data } = await supabase.from("destinations").select("id, name, tagline, state_id").in("id", ids).order("state_id").order("name");
for (const d of data) console.log(`${d.state_id.padEnd(18)} ${d.id.padEnd(22)} ${d.name} — ${d.tagline || ""}`);
console.log(`\nTotal: ${data.length}/31`);

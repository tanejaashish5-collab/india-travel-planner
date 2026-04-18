import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const { data } = await supabase.from("destination_stay_picks").select("*").limit(1);
console.log(Object.keys(data[0] || {}));

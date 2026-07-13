import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
config({ path: "apps/web/.env.local" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const { data, error } = await supabase.from("destinations").select("id").order("id");
if (error) { console.error(error); process.exit(1); }
writeFileSync("qa/findings/2026-07-08/dest-ids.txt", data.map(d => d.id).join("\n") + "\n");
console.log("wrote", data.length, "ids");

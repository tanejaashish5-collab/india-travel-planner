import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const { data: dests } = await s.from("destinations").select("id").eq("state_id", "nagaland");
const ids = dests.map((d) => d.id);
const { error, count } = await s
  .from("destination_stay_picks")
  .update({ source: "manual" }, { count: "exact" })
  .in("destination_id", ids)
  .eq("source", "web_search");
if (error) { console.error(error); process.exit(1); }
console.log(`Flipped ${count} rows web_search → manual`);
const { data: after } = await s.from("destination_stay_picks").select("source, sources").in("destination_id", ids);
const bySource = after.reduce((acc, p) => { acc[p.source ?? "null"] = (acc[p.source ?? "null"] ?? 0) + 1; return acc; }, {});
const sourced = after.filter((p) => Array.isArray(p.sources) && p.sources.length >= 2).length;
console.log(`NL FINAL: ${after.length} picks · ${sourced}/${after.length} sourced (${Math.round(sourced/after.length*100)}%) · by source:`, bySource);

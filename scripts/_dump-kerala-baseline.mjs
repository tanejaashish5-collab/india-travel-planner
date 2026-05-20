import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data: dests } = await s.from("destinations").select("id, name, tagline, region").eq("state_id", "kerala").order("id");
const ids = dests.map((d) => d.id);
const { data: e } = await s.from("local_eateries").select("*").in("destination_id", ids);
const { data: ls } = await s.from("local_stays").select("*").in("destination_id", ids);
const { data: p } = await s.from("destination_stay_picks").select("*").in("destination_id", ids);

const byDest = {};
for (const d of dests) byDest[d.id] = { destination_id: d.id, destination_name: d.name, tagline: d.tagline, region: d.region, eateries: [], stays: [], picks: [] };
for (const row of e ?? []) byDest[row.destination_id]?.eateries.push(row);
for (const row of ls ?? []) byDest[row.destination_id]?.stays.push(row);
for (const row of p ?? []) byDest[row.destination_id]?.picks.push(row);

writeFileSync("/Users/ashishtaneja/Desktop/India Travel Planner/data/research/_kerala-baseline.json", JSON.stringify(byDest, null, 2));
console.log(`Wrote baseline for ${dests.length} Kerala dests. Totals: ${e?.length ?? 0} eateries · ${ls?.length ?? 0} stays · ${p?.length ?? 0} picks`);

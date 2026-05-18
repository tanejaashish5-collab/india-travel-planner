import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data: dests, error } = await s
  .from("destinations")
  .select("id, name, state_id, region, tagline")
  .eq("state_id", "maharashtra")
  .order("id");

if (error) { console.error(error); process.exit(1); }
console.log(`Maharashtra destinations: ${dests.length}\n`);

const ids = dests.map((d) => d.id);

const { data: eCounts } = await s.from("local_eateries").select("destination_id").in("destination_id", ids);
const eByDest = {};
for (const r of eCounts ?? []) eByDest[r.destination_id] = (eByDest[r.destination_id] ?? 0) + 1;

const { data: sCounts } = await s.from("local_stays").select("destination_id").in("destination_id", ids);
const sByDest = {};
for (const r of sCounts ?? []) sByDest[r.destination_id] = (sByDest[r.destination_id] ?? 0) + 1;

const { data: pCounts } = await s.from("destination_stay_picks").select("destination_id, slot").in("destination_id", ids);
const pByDest = {};
for (const r of pCounts ?? []) {
  pByDest[r.destination_id] = pByDest[r.destination_id] ?? [];
  pByDest[r.destination_id].push(r.slot);
}

console.log("id".padEnd(32) + "name".padEnd(32) + "eat".padStart(5) + "stay".padStart(6) + "  picks");
console.log("-".repeat(85));
for (const d of dests) {
  const e = eByDest[d.id] ?? 0;
  const st = sByDest[d.id] ?? 0;
  const p = (pByDest[d.id] ?? []).join(",") || "-";
  console.log(d.id.padEnd(32) + (d.name ?? "").slice(0, 31).padEnd(32) + String(e).padStart(5) + String(st).padStart(6) + "  " + p);
}

console.log(`\nTotal: ${dests.length} dests`);
console.log(`Dests with 0 eateries: ${dests.filter((d) => !eByDest[d.id]).length}`);
console.log(`Dests with 0 stays:    ${dests.filter((d) => !sByDest[d.id]).length}`);
console.log(`Dests with 0 picks:    ${dests.filter((d) => !pByDest[d.id]).length}`);
console.log(`Total existing: ${eCounts?.length ?? 0} eateries · ${sCounts?.length ?? 0} stays · ${pCounts?.length ?? 0} picks`);

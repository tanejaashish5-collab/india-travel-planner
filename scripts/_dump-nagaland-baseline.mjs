// Inspect Nagaland baseline — dests, current eateries/stays state.
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Resolve state_id
const { data: states } = await s.from("destinations").select("state_id").ilike("state_id", "%nagaland%").limit(1);
const stateId = states?.[0]?.state_id;
console.log(`Nagaland state_id: ${stateId}`);
if (!stateId) { console.error("No Nagaland state_id found"); process.exit(1); }

const { data: dests, error: dErr } = await s.from("destinations").select("id, name").eq("state_id", stateId).order("id");
if (dErr) { console.error("dests query error:", dErr); process.exit(1); }
console.log(`\n=== ${dests.length} Nagaland destinations ===`);
for (const d of dests) console.log(`  - ${d.id.padEnd(28)} ${d.name}`);

const ids = dests.map((d) => d.id);

// Current eateries
const { data: eateries, error: eErr } = await s.from("local_eateries").select("destination_id, name").in("destination_id", ids);
if (eErr) console.error("eateries err:", eErr);
const eByDest = (eateries ?? []).reduce((acc, e) => { acc[e.destination_id] = (acc[e.destination_id] ?? 0) + 1; return acc; }, {});
console.log(`\n=== local_eateries: ${eateries?.length ?? 0} rows ===`);
console.log(`Per-dest:`, eByDest);

// Current stays
const { data: stays, error: sErr } = await s.from("local_stays").select("destination_id, name").in("destination_id", ids);
if (sErr) console.error("stays err:", sErr);
const sByDest = (stays ?? []).reduce((acc, e) => { acc[e.destination_id] = (acc[e.destination_id] ?? 0) + 1; return acc; }, {});
console.log(`\n=== local_stays: ${stays?.length ?? 0} rows ===`);
console.log(`Per-dest:`, sByDest);

// Stay picks
const { data: picks } = await s
  .from("destination_stay_picks")
  .select("destination_id, slot, name, source")
  .in("destination_id", ids);
const pByDest = picks.reduce((acc, p) => {
  acc[p.destination_id] = (acc[p.destination_id] ?? []).concat(`${p.slot}:${p.source}`);
  return acc;
}, {});
console.log(`\n=== destination_stay_picks: ${picks.length} rows ===`);
for (const [d, slots] of Object.entries(pByDest)) console.log(`  ${d}: ${slots.join(", ")}`);

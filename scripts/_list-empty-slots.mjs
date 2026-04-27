import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync } from "node:fs";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// All affected dests from audit
const audit = JSON.parse((await import("node:fs")).readFileSync("/tmp/audit-results.json", "utf-8"));
const affectedDests = [...new Set(audit.map(r => r.destination_id))];

const { data: dests } = await s.from("destinations")
  .select("id, name, state_id, region")
  .in("id", affectedDests);

const { data: existingPicks } = await s.from("destination_stay_picks")
  .select("destination_id, slot, name")
  .in("destination_id", affectedDests);

const SLOTS = ["experience", "value", "location", "xfactor"];
const byDest = {};
for (const d of dests) {
  byDest[d.id] = { id: d.id, name: d.name, state_id: d.state_id, region: d.region, filled_slots: [], empty_slots: SLOTS.slice() };
}
for (const p of existingPicks) {
  if (!byDest[p.destination_id]) continue;
  byDest[p.destination_id].filled_slots.push({ slot: p.slot, name: p.name });
  byDest[p.destination_id].empty_slots = byDest[p.destination_id].empty_slots.filter(s => s !== p.slot);
}

const work = Object.values(byDest).map(d => ({
  destination_id: d.id,
  destination_name: d.name,
  state_id: d.state_id,
  region: d.region,
  filled_slots: d.filled_slots,
  empty_slots: d.empty_slots,
})).filter(d => d.empty_slots.length > 0);

writeFileSync("/tmp/empty-slots-to-fill.json", JSON.stringify(work, null, 2));

console.log(`Dests with empty slots: ${work.length}`);
let totalEmpty = 0;
for (const d of work) {
  console.log(`  ${d.destination_id.padEnd(22)} (${d.state_id.padEnd(15)}) empty: ${d.empty_slots.join(",")} (filled: ${d.filled_slots.length})`);
  totalEmpty += d.empty_slots.length;
}
console.log(`\nTotal empty slots to fill: ${totalEmpty}`);

#!/usr/bin/env node
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const states = ["goa", "maharashtra", "gujarat"];
const { data: dests } = await supabase
  .from("destinations")
  .select("id, name, tagline, state_id, stay_intelligence")
  .in("state_id", states)
  .order("state_id")
  .order("name");

const { data: picks } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, published")
  .in("destination_id", dests.map((d) => d.id));

const picksByDest = {};
for (const p of picks) {
  picksByDest[p.destination_id] = picksByDest[p.destination_id] || [];
  picksByDest[p.destination_id].push(p);
}

console.log("\n=== WEST DESTINATIONS ===\n");
const needsWork = [];
const hasIntel = [];
const hasPicks = [];

for (const d of dests) {
  const picks = picksByDest[d.id] || [];
  const hasIntelligence = d.stay_intelligence?.upgrade_reasoning;
  const pubPicks = picks.filter((p) => p.published).length;
  const totalPicks = picks.length;
  const status = hasIntelligence && pubPicks > 0 ? "✓ DONE" : hasIntelligence ? "~ INTEL ONLY" : totalPicks > 0 ? "~ HAIKU-ERA" : "✗ EMPTY";
  const row = `${d.state_id.padEnd(13)} ${d.id.padEnd(28)} ${status.padEnd(18)} intel=${hasIntelligence ? "Y" : "N"} picks=${pubPicks}/${totalPicks}`;
  if (hasIntelligence && pubPicks > 0) hasPicks.push(row);
  else if (hasIntelligence) hasIntel.push(row);
  else needsWork.push({ row, id: d.id });
}

console.log(`## Already fully curated (${hasPicks.length}):`);
for (const r of hasPicks) console.log(`  ${r}`);
console.log(`\n## Has intelligence, no picks (${hasIntel.length}):`);
for (const r of hasIntel) console.log(`  ${r}`);
console.log(`\n## NEEDS MANUAL WORK (${needsWork.length}):`);
for (const r of needsWork) console.log(`  ${r.row}`);

console.log(`\n\n## Pending destination IDs (for batch):`);
console.log(JSON.stringify(needsWork.map((r) => r.id)));

const byState = {};
for (const d of dests) byState[d.state_id] = (byState[d.state_id] || 0) + 1;
const byStatePending = {};
for (const n of needsWork) {
  const dest = dests.find((d) => d.id === n.id);
  byStatePending[dest.state_id] = (byStatePending[dest.state_id] || 0) + 1;
}
console.log(`\n## Totals:`);
for (const s of states) console.log(`  ${s.padEnd(13)} ${byState[s] || 0} total / ${byStatePending[s] || 0} pending`);
console.log(`  ${"ALL".padEnd(13)} ${dests.length} total / ${needsWork.length} pending`);

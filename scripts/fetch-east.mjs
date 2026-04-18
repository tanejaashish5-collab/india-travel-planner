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

// East: WB, Bihar, Jharkhand, Odisha
// NE: Assam, Arunachal, Nagaland, Manipur, Mizoram, Meghalaya, Tripura, Sikkim
// Central: MP, CG
// Islands: Andaman, Lakshadweep
const states = [
  "west-bengal", "bihar", "jharkhand", "odisha",
  "assam", "arunachal-pradesh", "nagaland", "manipur", "mizoram", "meghalaya", "tripura", "sikkim",
  "madhya-pradesh", "chhattisgarh",
  "andaman-nicobar-islands", "lakshadweep"
];
const { data: dests } = await supabase
  .from("destinations")
  .select("id, name, state_id, stay_intelligence")
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

const byState = {};
const pendingIds = [];
for (const d of dests) {
  const pks = picksByDest[d.id] || [];
  const hasIntel = d.stay_intelligence?.upgrade_reasoning;
  const pub = pks.filter((p) => p.published).length;
  const key = d.state_id;
  byState[key] = byState[key] || { total: 0, pending: 0, intel: 0, withPicks: 0 };
  byState[key].total++;
  if (hasIntel) byState[key].intel++;
  if (pub > 0) byState[key].withPicks++;
  if (!hasIntel) {
    byState[key].pending++;
    pendingIds.push({ id: d.id, state: d.state_id, name: d.name });
  }
}

console.log(`\n=== East + NE + Central + Islands status ===\n`);
for (const [s, stats] of Object.entries(byState)) {
  console.log(`  ${s.padEnd(24)} ${stats.total} total · ${stats.intel} with intel · ${stats.withPicks} with picks · ${stats.pending} pending`);
}
const grand = Object.values(byState).reduce((a, b) => a + b.total, 0);
const grandPending = Object.values(byState).reduce((a, b) => a + b.pending, 0);
console.log(`\n  TOTAL: ${grand} destinations, ${grandPending} pending manual curation\n`);

console.log(`## Pending destinations by state:\n`);
const byStateIds = {};
for (const p of pendingIds) {
  byStateIds[p.state] = byStateIds[p.state] || [];
  byStateIds[p.state].push(p.id);
}
for (const [s, ids] of Object.entries(byStateIds)) {
  console.log(`\n[${s}] ${ids.length} pending:`);
  console.log("  " + ids.join(", "));
}

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

const { count: total } = await supabase.from("destinations").select("id", { count: "exact", head: true });
const { data: dests } = await supabase.from("destinations").select("id, name, state_id, stay_intelligence").order("state_id").order("name");
const { count: picks } = await supabase.from("destination_stay_picks").select("destination_id", { count: "exact", head: true }).eq("published", true);

const withIntel = dests.filter((d) => d.stay_intelligence?.upgrade_reasoning);
const missing = dests.filter((d) => !d.stay_intelligence?.upgrade_reasoning);

console.log(`\n=== Stay Data Coverage ===\n`);
console.log(`Total destinations:            ${total}`);
console.log(`With upgrade_reasoning:        ${withIntel.length}  (${Math.round(withIntel.length/total*100)}%)`);
console.log(`Published picks site-wide:     ${picks}`);
console.log(`MISSING intel:                 ${missing.length}`);
if (missing.length) {
  console.log(`\n## Destinations still without stay_intelligence:\n`);
  const byState = {};
  for (const d of missing) { byState[d.state_id] = byState[d.state_id] || []; byState[d.state_id].push(d.id); }
  for (const [s, ids] of Object.entries(byState)) console.log(`  ${s.padEnd(24)} (${ids.length}): ${ids.join(", ")}`);
}

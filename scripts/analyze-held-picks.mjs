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

const { data } = await supabase
  .from("destination_stay_picks")
  .select("destination_id, slot, name, confidence, sources, voice_flags")
  .eq("published", false);

const zeroSources = data.filter((p) => !Array.isArray(p.sources) || p.sources.length === 0);
const oneSource = data.filter((p) => Array.isArray(p.sources) && p.sources.length === 1);
const lowConf = data.filter((p) => (p.confidence ?? 0) < 0.6 && Array.isArray(p.sources) && p.sources.length >= 2);
const voiceFlagged = data.filter((p) => Array.isArray(p.voice_flags) && p.voice_flags.length > 0);

console.log(`\nTotal held: ${data.length}\n`);
console.log(`By reason (not mutually exclusive):`);
console.log(`  0 sources:              ${zeroSources.length}  ← likely hallucinated, recommend REJECT`);
console.log(`  1 source (need 2+):     ${oneSource.length}  ← plausible, needs verification`);
console.log(`  Low confidence + 2+ src:${lowConf.length}  ← real property, Claude unsure — review`);
console.log(`  Voice flagged:          ${voiceFlagged.length}  ← copy edit required`);

console.log(`\nBy slot:`);
const bySlot = {};
for (const p of data) bySlot[p.slot] = (bySlot[p.slot] || 0) + 1;
for (const [k, v] of Object.entries(bySlot).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(12)} ${v}`);

console.log(`\nTop destinations by held count:`);
const byDest = {};
for (const p of data) byDest[p.destination_id] = (byDest[p.destination_id] || 0) + 1;
const sorted = Object.entries(byDest).sort((a, b) => b[1] - a[1]);
for (const [k, v] of sorted.slice(0, 15)) console.log(`  ${k.padEnd(24)} ${v}`);

console.log(`\n═══ Bulk-reject candidates (0 sources) ═══`);
for (const p of zeroSources.slice(0, 20)) {
  console.log(`  [${p.destination_id}] ${p.slot} — ${p.name} (conf ${p.confidence})`);
}
if (zeroSources.length > 20) console.log(`  ... and ${zeroSources.length - 20} more`);

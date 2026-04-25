#!/usr/bin/env node
/**
 * Sprint 8 — mirror new state descriptions to regions.description.
 * The state-page UI body reads from regions, not states. Both surfaces
 * need the same copy so SEO (states.description → meta) and on-page
 * prose (regions.description → body) stay aligned.
 *
 * Skips Kerala + Tamil Nadu — they have subregion-only rows
 * (kerala-backwaters, tn-coast etc.) and no state-level row.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Pull all states with their (now-curated) descriptions
const { data: states } = await supabase.from("states").select("id, description");
const byId = Object.fromEntries(states.map(s => [s.id, s.description]));

// Pull regions, group by state_id
const { data: regions } = await supabase.from("regions").select("id, state_id, description");
const byState = {};
for (const r of regions) {
  if (!byState[r.state_id]) byState[r.state_id] = [];
  byState[r.state_id].push(r);
}

// Update only single-region states
let updated = 0;
let skippedMulti = 0;
let skippedNoState = 0;
const errors = [];

for (const [stateId, regs] of Object.entries(byState)) {
  if (regs.length > 1) { skippedMulti++; continue; }  // Kerala, Tamil Nadu
  const stateDesc = byId[stateId];
  if (!stateDesc) { skippedNoState++; continue; }
  const r = regs[0];
  const { error } = await supabase
    .from("regions")
    .update({ description: stateDesc })
    .eq("id", r.id);
  if (error) { errors.push({ id: r.id, error: error.message }); continue; }
  console.log(`  ✓ ${stateId.padEnd(22)} → regions.${r.id.padEnd(40)} (${stateDesc.length} ch)`);
  updated++;
}

console.log(`\n  updated: ${updated}`);
console.log(`  skipped (multi-region): ${skippedMulti}`);
console.log(`  skipped (no state desc): ${skippedNoState}`);
if (errors.length) console.log(errors);

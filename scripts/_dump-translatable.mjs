#!/usr/bin/env node
/* eslint-disable no-console */
// Dump the English prose fields of a state's eateries / stays / picks so a
// translation sub-agent can produce Hindi. Prose only — names, areas,
// dishes, addresses are NOT dumped (they stay in Latin script).
//
// Usage:
//   node scripts/_dump-translatable.mjs --state <state_id>
//
// Output: data/research/translations/_<state_id>-en.json — an array of
//   { table, id?|destination_id+slot, destination_id, fields: {<field>:<en>} }

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const i = process.argv.indexOf("--state");
if (i === -1 || !process.argv[i + 1]) {
  console.error("Usage: node scripts/_dump-translatable.mjs --state <state_id>");
  process.exit(1);
}
const STATE = process.argv[i + 1];

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data: dests } = await s.from("destinations").select("id").eq("state_id", STATE).order("id");
if (!dests || dests.length === 0) {
  console.error(`No destinations for state_id "${STATE}"`);
  process.exit(1);
}
const ids = dests.map((d) => d.id);

const EAT_FIELDS = ["signature_dish", "why_it_matters", "insider_tip"];
const STAY_FIELDS = ["why_special"];
const PICK_FIELDS = ["why_nakshiq", "signature_experience"];

function pickFields(row, fields) {
  const out = {};
  for (const f of fields) {
    if (typeof row[f] === "string" && row[f].trim().length > 0) out[f] = row[f];
  }
  return out;
}

const rows = [];

const { data: eat } = await s
  .from("local_eateries")
  .select(`id, destination_id, ${EAT_FIELDS.join(", ")}`)
  .in("destination_id", ids)
  .eq("is_active", true);
for (const r of eat ?? []) {
  const fields = pickFields(r, EAT_FIELDS);
  if (Object.keys(fields).length) rows.push({ table: "local_eateries", id: r.id, destination_id: r.destination_id, fields });
}

const { data: stays } = await s
  .from("local_stays")
  .select(`id, destination_id, ${STAY_FIELDS.join(", ")}`)
  .in("destination_id", ids);
for (const r of stays ?? []) {
  const fields = pickFields(r, STAY_FIELDS);
  if (Object.keys(fields).length) rows.push({ table: "local_stays", id: r.id, destination_id: r.destination_id, fields });
}

const { data: picks } = await s
  .from("destination_stay_picks")
  .select(`destination_id, slot, ${PICK_FIELDS.join(", ")}`)
  .in("destination_id", ids)
  .eq("published", true);
for (const r of picks ?? []) {
  const fields = pickFields(r, PICK_FIELDS);
  if (Object.keys(fields).length) rows.push({ table: "destination_stay_picks", destination_id: r.destination_id, slot: r.slot, fields });
}

const OUT_DIR = path.join(ROOT, "data", "research", "translations");
mkdirSync(OUT_DIR, { recursive: true });
const outFile = path.join(OUT_DIR, `_${STATE}-en.json`);
writeFileSync(outFile, JSON.stringify(rows, null, 2));

const byTable = rows.reduce((a, r) => ((a[r.table] = (a[r.table] ?? 0) + 1), a), {});
const strings = rows.reduce((a, r) => a + Object.keys(r.fields).length, 0);
console.log(`${STATE}: ${dests.length} dests · ${rows.length} rows ${JSON.stringify(byTable)} · ${strings} strings`);
console.log(`→ ${outFile}`);

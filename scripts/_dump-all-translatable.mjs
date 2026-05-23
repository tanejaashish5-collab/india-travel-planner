#!/usr/bin/env node
/* eslint-disable no-console */
// Dump the English prose fields of ALL eateries / stays / picks (every state)
// into one file, so a Hindi re-pass can re-translate the whole DB content
// layer. Prose only — names, areas, dishes, addresses are NOT dumped.
//
// Usage:  node scripts/_dump-all-translatable.mjs
// Output: data/research/translations/_all-en.json — an array of
//   { table, id?|destination_id+slot, destination_id, fields: {<field>:<en>} }

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync, mkdirSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

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

// Supabase caps a select at 1000 rows — page through everything.
async function fetchAll(table, cols, apply) {
  const all = [];
  for (let from = 0; ; from += 1000) {
    let q = s.from(table).select(cols).range(from, from + 999).order("id", { ascending: true });
    q = apply(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    all.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return all;
}

const rows = [];

const eat = await fetchAll("local_eateries", `id, destination_id, ${EAT_FIELDS.join(", ")}`, (q) =>
  q.eq("is_active", true),
);
for (const r of eat) {
  const fields = pickFields(r, EAT_FIELDS);
  if (Object.keys(fields).length) rows.push({ table: "local_eateries", id: r.id, destination_id: r.destination_id, fields });
}

const stays = await fetchAll("local_stays", `id, destination_id, ${STAY_FIELDS.join(", ")}`, (q) => q);
for (const r of stays) {
  const fields = pickFields(r, STAY_FIELDS);
  if (Object.keys(fields).length) rows.push({ table: "local_stays", id: r.id, destination_id: r.destination_id, fields });
}

// destination_stay_picks has no id column in the pipeline key — use slot.
const picks = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await s
    .from("destination_stay_picks")
    .select(`destination_id, slot, ${PICK_FIELDS.join(", ")}`)
    .eq("published", true)
    .range(from, from + 999)
    .order("destination_id", { ascending: true })
    .order("slot", { ascending: true });
  if (error) throw new Error(`destination_stay_picks: ${error.message}`);
  picks.push(...(data ?? []));
  if (!data || data.length < 1000) break;
}
for (const r of picks) {
  const fields = pickFields(r, PICK_FIELDS);
  if (Object.keys(fields).length) rows.push({ table: "destination_stay_picks", destination_id: r.destination_id, slot: r.slot, fields });
}

const OUT_DIR = path.join(ROOT, "data", "research", "translations");
mkdirSync(OUT_DIR, { recursive: true });
const outFile = path.join(OUT_DIR, `_all-en.json`);
writeFileSync(outFile, JSON.stringify(rows, null, 2));

const byTable = rows.reduce((a, r) => ((a[r.table] = (a[r.table] ?? 0) + 1), a), {});
const strings = rows.reduce((a, r) => a + Object.keys(r.fields).length, 0);
console.log(`ALL: ${rows.length} rows ${JSON.stringify(byTable)} · ${strings} strings`);
console.log(`→ ${outFile}`);

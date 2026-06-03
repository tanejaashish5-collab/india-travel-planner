#!/usr/bin/env node
/* eslint-disable no-console */
// Dump destination_stay_picks rows missing translations.hi, split into N chunks
// for translation agents. English fields: why_nakshiq, signature_experience.
// Output: data/research/backfill/hindi/sp-en-<i>.json (each an array of
//   { destination_id, slot, why_nakshiq, signature_experience }).
// Usage: node scripts/_dump-staypicks-hindi.mjs [chunks=5]

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { writeFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
const CHUNKS = parseInt(process.argv[2] || "5", 10);
const OUTDIR = path.join(ROOT, "data", "research", "backfill", "hindi");

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// page through to be safe; select only what's needed
const rows = [];
for (let from = 0; ; from += 1000) {
  const { data, error } = await s.from("destination_stay_picks")
    .select("destination_id,slot,why_nakshiq,signature_experience,translations")
    .range(from, from + 999);
  if (error) { console.error(error.message); process.exit(1); }
  rows.push(...data);
  if (data.length < 1000) break;
}
const missing = rows.filter((r) => !(r.translations && r.translations.hi))
  .map((r) => ({ destination_id: r.destination_id, slot: r.slot, why_nakshiq: r.why_nakshiq, signature_experience: r.signature_experience }));

console.log(`stay_picks total ${rows.length} · missing hi ${missing.length}`);
const per = Math.ceil(missing.length / CHUNKS);
for (let i = 0; i < CHUNKS; i++) {
  const slice = missing.slice(i * per, (i + 1) * per);
  if (!slice.length) continue;
  const f = path.join(OUTDIR, `sp-en-${i + 1}.json`);
  writeFileSync(f, JSON.stringify(slice, null, 0));
  console.log(`  ${f}: ${slice.length} rows`);
}

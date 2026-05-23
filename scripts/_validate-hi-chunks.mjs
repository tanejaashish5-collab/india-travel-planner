#!/usr/bin/env node
/* eslint-disable no-console */
// Validate agent-produced Hindi chunk files against their English source:
//  - entry count + order (key match by index)
//  - hi field keys exactly match the English `fields` keys
//  - code-mixing leak: lowercase Latin words inside Hindi strings
//    (proper nouns are Capitalised / all-caps and are allowed)
//
// Usage: node scripts/_validate-hi-chunks.mjs            (all all-hi-c*.json)
//        node scripts/_validate-hi-chunks.mjs c01 c02    (specific chunks)

import path from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";

const DIR = path.resolve(import.meta.dirname, "..", "data", "research", "translations");
const keyOf = (r) =>
  r.table === "destination_stay_picks" ? `pick:${r.destination_id}:${r.slot}` : `${r.table}:${r.id}`;

// lowercase Latin words that legitimately survive in Hindi text
const ALLOW = new Set(["am", "pm", "km", "kg", "wi", "fi", "ac", "kmph", "sq", "ml"]);

const args = process.argv.slice(2);
const chunks = args.length
  ? args.map((a) => `all-hi-${a.startsWith("c") ? a : "c" + a}.json`)
  : readdirSync(DIR).filter((f) => /^all-hi-c\d+\.json$/.test(f)).sort();

let totalLeaks = 0;
let totalErrors = 0;
let totalEntries = 0;

for (const hf of chunks) {
  const cNum = hf.match(/c\d+/)[0];
  const ef = `_all-en-${cNum}.json`;
  if (!existsSync(path.join(DIR, hf))) { console.log(`${cNum}  MISSING ${hf}`); totalErrors++; continue; }
  const en = JSON.parse(readFileSync(path.join(DIR, `${ef}`), "utf8"));
  const hi = JSON.parse(readFileSync(path.join(DIR, hf), "utf8"));

  const errs = [];
  if (en.length !== hi.length) errs.push(`count en=${en.length} hi=${hi.length}`);
  const n = Math.min(en.length, hi.length);
  let leaks = 0;
  const leakSamples = [];
  for (let i = 0; i < n; i++) {
    if (keyOf(en[i]) !== keyOf(hi[i])) { errs.push(`#${i} key ${keyOf(en[i])} != ${keyOf(hi[i])}`); continue; }
    const enKeys = Object.keys(en[i].fields).sort().join(",");
    const hiKeys = Object.keys(hi[i].hi ?? {}).sort().join(",");
    if (enKeys !== hiKeys) errs.push(`#${i} ${keyOf(en[i])} fieldkeys [${hiKeys}] != [${enKeys}]`);
    for (const [f, v] of Object.entries(hi[i].hi ?? {})) {
      if (typeof v !== "string") { errs.push(`#${i} ${f} not a string`); continue; }
      // a "word" is a run of letters; flag lowercase-initial Latin runs >=3
      for (const w of v.match(/[A-Za-z][A-Za-z'’-]*/g) ?? []) {
        const bare = w.replace(/[^A-Za-z]/g, "");
        if (bare.length >= 3 && bare[0] === bare[0].toLowerCase() && !ALLOW.has(bare.toLowerCase())) {
          leaks++;
          if (leakSamples.length < 4) leakSamples.push(`${keyOf(hi[i])}/${f}: "${w}"`);
        }
      }
    }
  }
  totalEntries += hi.length;
  totalErrors += errs.length;
  totalLeaks += leaks;
  const flag = errs.length || leaks ? " !!" : " ok";
  console.log(`${cNum}  entries=${String(hi.length).padStart(3)}  errors=${errs.length}  leaks=${leaks}${flag}`);
  for (const e of errs.slice(0, 6)) console.log(`     ERR ${e}`);
  for (const s of leakSamples) console.log(`     leak ${s}`);
}

console.log(`\nTOTAL: ${chunks.length} chunks · ${totalEntries} entries · ${totalErrors} errors · ${totalLeaks} leaks`);
if (totalErrors) process.exitCode = 1;

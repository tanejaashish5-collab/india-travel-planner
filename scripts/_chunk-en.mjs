#!/usr/bin/env node
/* eslint-disable no-console */
// Split a state's English translatable dump into ≤SIZE-row chunk files so a
// translation sub-agent can produce one Hindi file per chunk (1:1, no gaps).
// Each chunk's translated output stays small enough to write in one call.
//
// Usage:
//   node scripts/_chunk-en.mjs --state <state_id> [--exclude-existing]
//
// --exclude-existing: drop rows already covered by existing <state>-hi*.json
// Output: data/research/translations/_<state>-en-cNN.json

import path from "node:path";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "data", "research", "translations");
const SIZE = 40;

const args = process.argv.slice(2);
const si = args.indexOf("--state");
if (si === -1 || !args[si + 1]) {
  console.error("Usage: node scripts/_chunk-en.mjs --state <state_id> [--exclude-existing]");
  process.exit(1);
}
const STATE = args[si + 1];
const EXCLUDE = args.includes("--exclude-existing");

const keyOf = (r) =>
  r.table === "destination_stay_picks" ? `pick:${r.destination_id}:${r.slot}` : `${r.table}:${r.id}`;

let en = JSON.parse(readFileSync(path.join(DIR, `_${STATE}-en.json`), "utf8"));

if (EXCLUDE) {
  const covered = new Set();
  for (const f of readdirSync(DIR)) {
    if (f.startsWith(`${STATE}-hi`) && f.endsWith(".json")) {
      for (const e of JSON.parse(readFileSync(path.join(DIR, f), "utf8"))) covered.add(keyOf(e));
    }
  }
  const before = en.length;
  en = en.filter((r) => !covered.has(keyOf(r)));
  console.log(`${STATE}: excluded ${before - en.length} already-covered · ${en.length} remain`);
}

let n = 0;
const files = [];
for (let i = 0; i < en.length; i += SIZE) {
  n++;
  const nn = String(n).padStart(2, "0");
  const file = `_${STATE}-en-c${nn}.json`;
  writeFileSync(path.join(DIR, file), JSON.stringify(en.slice(i, i + SIZE), null, 2));
  files.push(`${file} (${en.slice(i, i + SIZE).length})`);
}
console.log(`${STATE}: ${en.length} rows → ${n} chunks`);
for (const f of files) console.log(`  ${f}`);

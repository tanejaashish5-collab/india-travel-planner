#!/usr/bin/env node
/* eslint-disable no-console */
// Merge a state's per-chunk Hindi files into one clean <state>-hi.json:
//  - dedups (first occurrence wins)
//  - repairs a single mistyped id (when exactly 1 en key is missing and 1
//    hi key is extra in the same table — an unambiguous copy typo)
//  - drops any remaining hallucinated extras
//  - emits entries in the English dump's row order
//
// Usage: node scripts/_consolidate-translations.mjs

import path from "node:path";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const DIR = path.resolve(import.meta.dirname, "..", "data", "research", "translations");
const keyOf = (r) =>
  r.table === "destination_stay_picks" ? `pick:${r.destination_id}:${r.slot}` : `${r.table}:${r.id}`;

const all = readdirSync(DIR);
const states = all.filter((f) => f.startsWith("_") && f.endsWith("-en.json")).map((f) => f.slice(1, -8)).sort();

for (const st of states) {
  const en = JSON.parse(readFileSync(path.join(DIR, `_${st}-en.json`), "utf8"));
  const enKeys = en.map(keyOf);
  const enSet = new Set(enKeys);
  const chunkFiles = all.filter((f) => f.startsWith(`${st}-hi-`) && f.endsWith(".json"));
  if (chunkFiles.length === 0) {
    console.log(`${st.padEnd(20)} no chunk files — skipped (already consolidated)`);
    continue;
  }
  const map = new Map();
  let rawEntries = 0;
  for (const f of chunkFiles) {
    for (const e of JSON.parse(readFileSync(path.join(DIR, f), "utf8"))) {
      rawEntries++;
      const k = keyOf(e);
      if (!map.has(k)) map.set(k, e);
    }
  }
  const missing = enKeys.filter((k) => !map.has(k));
  const extra = [...map.keys()].filter((k) => !enSet.has(k));

  let repairs = 0;
  if (missing.length === 1 && extra.length === 1) {
    const mTable = missing[0].split(":")[0];
    const xTable = extra[0].split(":")[0];
    if (mTable === xTable && mTable !== "pick") {
      const e = map.get(extra[0]);
      e.id = missing[0].slice(mTable.length + 1);
      map.delete(extra[0]);
      map.set(missing[0], e);
      repairs = 1;
    }
  }
  let dropped = 0;
  for (const k of [...map.keys()]) {
    if (!enSet.has(k)) { map.delete(k); dropped++; }
  }
  const out = [];
  const stillMissing = [];
  for (const k of enKeys) {
    if (map.has(k)) out.push(map.get(k));
    else stillMissing.push(k);
  }
  writeFileSync(path.join(DIR, `${st}-hi.json`), JSON.stringify(out, null, 2));
  const flag = stillMissing.length || out.length !== en.length ? "  !!" : "";
  console.log(
    `${st.padEnd(20)} en=${String(en.length).padStart(4)} raw=${String(rawEntries).padStart(4)} → out=${String(out.length).padStart(4)} dedup=${rawEntries - out.length - dropped} repairs=${repairs} dropped=${dropped} missing=${stillMissing.length}${flag}`,
  );
  if (stillMissing.length) console.log(`     stillMissing: ${stillMissing.slice(0, 5).join(", ")}`);
}

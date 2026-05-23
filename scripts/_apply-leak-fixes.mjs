#!/usr/bin/env node
/* eslint-disable no-console */
// Patch the polish-agent corrections (_leaks-fixed-*.json) back into the
// per-chunk Hindi files in place.
//
// Usage: node scripts/_apply-leak-fixes.mjs

import path from "node:path";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DIR = path.resolve(import.meta.dirname, "..", "data", "research", "translations");
const keyOf = (r) =>
  r.table === "destination_stay_picks" ? `pick:${r.destination_id}:${r.slot}` : `${r.table}:${r.id}`;

const fixes = [];
for (const f of ["_leaks-fixed-a.json", "_leaks-fixed-b.json"]) {
  if (!existsSync(path.join(DIR, f))) throw new Error(`missing ${f}`);
  fixes.push(...JSON.parse(readFileSync(path.join(DIR, f), "utf8")));
}

// group fixes by chunk file
const byChunk = new Map();
for (const fx of fixes) {
  if (!fx.hi_fixed || typeof fx.hi_fixed !== "string") throw new Error(`no hi_fixed for ${keyOf(fx)}/${fx.field}`);
  if (!byChunk.has(fx.chunk)) byChunk.set(fx.chunk, []);
  byChunk.get(fx.chunk).push(fx);
}

let patched = 0;
let notFound = 0;
for (const [cNum, list] of byChunk) {
  const file = path.join(DIR, `all-hi-${cNum}.json`);
  const arr = JSON.parse(readFileSync(file, "utf8"));
  const idx = new Map(arr.map((e) => [keyOf(e), e]));
  for (const fx of list) {
    const e = idx.get(keyOf(fx));
    if (!e || !e.hi || !(fx.field in e.hi)) { console.error(`  ✗ not found: ${cNum} ${keyOf(fx)}/${fx.field}`); notFound++; continue; }
    e.hi[fx.field] = fx.hi_fixed;
    patched++;
  }
  writeFileSync(file, JSON.stringify(arr, null, 2));
}

console.log(`patched ${patched} fields across ${byChunk.size} chunks · not-found ${notFound}`);
if (notFound) process.exitCode = 1;

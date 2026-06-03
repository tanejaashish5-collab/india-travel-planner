#!/usr/bin/env node
/* eslint-disable no-console */
// Validate + merge agent-written enrichment JSON batches before applying.
// Usage: node scripts/_validate-enrichment.mjs <file1.json> [file2.json ...] [--out merged.json]
//   - checks each is a valid JSON array of enrichment entries
//   - per destination_id: months 1-12 all present, no dups
//   - field types correct; scans for banned influencer/dashboard words
//   - --out merges all entries into one file for the applier

import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";

const args = process.argv.slice(2);
const oi = args.indexOf("--out");
const OUT = oi !== -1 ? args[oi + 1] : null;
const files = args.filter((a, i) => !(oi !== -1 && (i === oi || i === oi + 1)) && a.endsWith(".json"));
if (!files.length) { console.error("No input .json files."); process.exit(1); }

const BANNED = ["hidden gem", "must-visit", "must visit", "paradise", "ultimate", "unforgettable", "breathtaking", "amazing", "stunning", "nestled", "bucket list", "magical", "jaw-dropping", "must-see", "must see", "pristine paradise", "majestic"];
const ARRAY_FIELDS = ["who_should_go", "who_should_avoid", "things_to_do", "pack_list", "festivals_this_month"];

let all = [];
const errors = [];
const warnings = [];
const bannedHits = [];

for (const f of files) {
  let data;
  try { data = JSON.parse(readFileSync(f, "utf-8")); }
  catch (e) { errors.push(`${f}: invalid JSON — ${e.message}`); continue; }
  if (!Array.isArray(data)) { errors.push(`${f}: not a JSON array`); continue; }

  const byDest = {};
  for (const [i, e] of data.entries()) {
    const tag = `${f}[${i}]`;
    if (!e || typeof e.destination_id !== "string") { errors.push(`${tag}: missing destination_id`); continue; }
    if (!Number.isInteger(e.month) || e.month < 1 || e.month > 12) errors.push(`${tag} ${e.destination_id}: bad month ${e.month}`);
    for (const af of ARRAY_FIELDS) if (e[af] !== undefined && e[af] !== null && !Array.isArray(e[af])) errors.push(`${tag} ${e.destination_id}/${e.month}: ${af} not array`);
    if (e.why_go !== undefined && e.why_go !== null && typeof e.why_go !== "string") errors.push(`${tag}: why_go not string/null`);
    if (e.why_not !== undefined && e.why_not !== null && typeof e.why_not !== "string") errors.push(`${tag}: why_not not string/null`);
    // dm_prose_floor constraint: go→why_go≥150, skip→why_not≥150, wait→both≥120 (or null)
    const wg = e.why_go?.length ?? 0, wn = e.why_not?.length ?? 0;
    if (e.verdict === "go") { if (e.why_go != null && wg < 150) errors.push(`${tag} ${e.destination_id}/${e.month}: go why_go ${wg}<150`); if (e.why_go == null) warnings.push(`${tag} ${e.destination_id}/${e.month}: go month has null why_go`); }
    else if (e.verdict === "skip") { if (e.why_not != null && wn < 150) errors.push(`${tag} ${e.destination_id}/${e.month}: skip why_not ${wn}<150`); if (e.why_not == null) warnings.push(`${tag} ${e.destination_id}/${e.month}: skip month has null why_not`); }
    else if (e.verdict === "wait") { if (e.why_go != null && wg < 120) errors.push(`${tag} ${e.destination_id}/${e.month}: wait why_go ${wg}<120`); if (e.why_not != null && wn < 120) errors.push(`${tag} ${e.destination_id}/${e.month}: wait why_not ${wn}<120`); }
    else warnings.push(`${tag} ${e.destination_id}/${e.month}: missing/unknown verdict (floor not checked)`);
    (byDest[e.destination_id] ??= []).push(e.month);
    // banned scan
    const blob = JSON.stringify([e.who_should_go, e.who_should_avoid, e.things_to_do, e.pack_list, e.why_go, e.why_not, e.festivals_this_month]).toLowerCase();
    for (const b of BANNED) if (blob.includes(b)) bannedHits.push(`${tag} ${e.destination_id}/${e.month}: "${b}"`);
  }
  for (const [d, months] of Object.entries(byDest)) {
    const set = new Set(months);
    if (set.size !== months.length) warnings.push(`${f} ${d}: duplicate months`);
    const missing = [];
    for (let m = 1; m <= 12; m++) if (!set.has(m)) missing.push(m);
    if (missing.length) warnings.push(`${f} ${d}: missing months ${missing.join(",")}`);
  }
  all = all.concat(data);
}

const dests = new Set(all.map((e) => e.destination_id));
console.log(`Files: ${files.length} · entries: ${all.length} · dests: ${dests.size}`);
console.log(`Errors: ${errors.length} · warnings: ${warnings.length} · banned-word hits: ${bannedHits.length}`);
for (const e of errors.slice(0, 30)) console.error(`  ✗ ${e}`);
for (const w of warnings.slice(0, 30)) console.warn(`  ⚠ ${w}`);
for (const b of bannedHits.slice(0, 40)) console.error(`  🚫 ${b}`);

if (errors.length || bannedHits.length) { console.error(`\n✗ FIX before applying.`); process.exit(1); }
if (OUT) { writeFileSync(OUT, JSON.stringify(all, null, 0)); console.log(`\n✓ Merged ${all.length} → ${OUT}`); }
console.log(`✅ Validation passed.`);

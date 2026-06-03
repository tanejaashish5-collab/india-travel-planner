#!/usr/bin/env node
/* eslint-disable no-console */
// Apply points_of_interest backfill. Reads an agent-produced JSON array and
// UPSERTs by id (slug). Hindi ships inline (translations.hi.description) so new
// POIs keep 100% parity. Idempotent / re-runnable.
//
// Entry shape:
//   { id, destination_id, name, type, description, tags[], time_needed,
//     entry_fee, kids_suitable, address?, opening_hours?, google_maps_url?,
//     hi_description?, source_urls?[] }
//   - `type` MUST be in TYPE_VOCAB.
//   - `source_urls` is for human audit only (no DB column) — stripped on write.
//
// Usage:
//   node scripts/apply-poi-backfill.mjs --file data/research/backfill/poi/<batch>.json --dry-run
//   node scripts/apply-poi-backfill.mjs --file data/research/backfill/poi/<batch>.json --commit

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = process.argv.slice(2);
const fi = args.indexOf("--file");
if (fi === -1 || !args[fi + 1]) {
  console.error("Usage: node scripts/apply-poi-backfill.mjs --file <path> [--commit]");
  process.exit(1);
}
const FILE = path.resolve(args[fi + 1]);
const DRY_RUN = !args.includes("--commit");

// The fixed type vocabulary already present in points_of_interest.
const TYPE_VOCAB = new Set([
  "viewpoint", "temple", "monument", "museum", "monastery", "lake", "fort",
  "garden", "waterfall", "palace", "bazaar", "ghat", "market", "hot-spring",
  "gurudwara", "church", "bridge", "cafe", "mosque",
]);
const COLS = ["id", "destination_id", "name", "type", "description", "tags", "time_needed", "entry_fee", "kids_suitable", "address", "opening_hours", "google_maps_url"];

const entries = JSON.parse(readFileSync(FILE, "utf-8"));
if (!Array.isArray(entries)) throw new Error("poi file must be a JSON array");

const errs = [];
const seen = new Set();
for (const [i, e] of entries.entries()) {
  if (!e || !e.id || !e.destination_id || !e.name) { errs.push(`[${i}] missing id/destination_id/name`); continue; }
  if (seen.has(e.id)) errs.push(`[${i}] duplicate id ${e.id}`);
  seen.add(e.id);
  if (!TYPE_VOCAB.has(e.type)) errs.push(`[${i}] ${e.id}: type "${e.type}" not in vocab`);
  if (!e.description || e.description.length < 10) errs.push(`[${i}] ${e.id}: description too short`);
  if (e.tags !== undefined && !Array.isArray(e.tags)) errs.push(`[${i}] ${e.id}: tags must be an array`);
}

const byDest = entries.reduce((a, e) => ((a[e?.destination_id] = (a[e?.destination_id] ?? 0) + 1), a), {});
console.log(`File: ${FILE}`);
console.log(`POIs: ${entries.length} across ${Object.keys(byDest).length} dests · errors: ${errs.length}`);
if (errs.length) { for (const x of errs.slice(0, 25)) console.error(`  ✗ ${x}`); process.exit(1); }
if (DRY_RUN) { console.log(`\n[DRY-RUN] No writes. Re-run with --commit.`); process.exit(0); }

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

console.log(`\n[COMMIT] Writing points_of_interest …`);
let ok = 0;
const failures = [];
const CHUNK = 25;
for (let i = 0; i < entries.length; i += CHUNK) {
  const slice = entries.slice(i, i + CHUNK);
  const rows = slice.map((e) => {
    const row = {};
    for (const c of COLS) if (e[c] !== undefined && e[c] !== null) row[c] = e[c];
    if (e.hi_description) row.translations = { hi: { description: e.hi_description } };
    return row;
  });
  const { error } = await s.from("points_of_interest").upsert(rows, { onConflict: "id" });
  if (error) failures.push(`chunk@${i}: ${error.message}`);
  else ok += rows.length;
}

console.log(`\n✓ Wrote ${ok} · failed chunks ${failures.length}`);
if (failures.length) { for (const f of failures.slice(0, 20)) console.error(`  ✗ ${f}`); process.exit(1); }
console.log(`✅ POIs applied.`);

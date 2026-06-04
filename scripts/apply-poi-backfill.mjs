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
const DRY_RUN = !args.includes("--commit");
// Accept multiple input files: any positional .json arg, plus --file <path>.
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--file" && args[i + 1]) { files.push(args[++i]); }
  else if (args[i].endsWith(".json")) files.push(args[i]);
}
if (!files.length) {
  console.error("Usage: node scripts/apply-poi-backfill.mjs <file.json> [more.json ...] [--commit]");
  process.exit(1);
}

// The fixed type vocabulary already present in points_of_interest.
const TYPE_VOCAB = new Set([
  "viewpoint", "temple", "monument", "museum", "monastery", "lake", "fort",
  "garden", "waterfall", "palace", "bazaar", "ghat", "market", "hot-spring",
  "gurudwara", "church", "bridge", "cafe", "mosque",
]);
// Forgiving aliases for common agent type-synonyms → vocab.
const TYPE_ALIASES = {
  cave: "monument", caves: "monument", stupa: "monument", ruins: "monument", memorial: "monument",
  beach: "viewpoint", "national-park": "viewpoint", park: "garden", "wildlife-sanctuary": "viewpoint",
  dam: "lake", reservoir: "lake", river: "ghat", "hot-springs": "hot-spring", spring: "hot-spring",
  shrine: "temple", mandir: "temple", masjid: "mosque", cathedral: "church", "art-gallery": "museum",
  statue: "monument", tower: "monument", tomb: "monument", mausoleum: "monument", dargah: "temple",
  "wildlife-sanctuary": "viewpoint", sanctuary: "viewpoint", island: "viewpoint", hill: "viewpoint",
  trek: "viewpoint", "view-point": "viewpoint", lighthouse: "monument", "spice-farm": "garden",
  wildlife: "viewpoint", forest: "viewpoint", "eco-park": "garden", plantation: "garden", estate: "garden",
  zoo: "garden", aquarium: "museum", peak: "viewpoint", mountain: "viewpoint", canyon: "viewpoint",
  gorge: "viewpoint", "national-park-viewpoint": "viewpoint", backwater: "viewpoint", backwaters: "viewpoint",
  jetty: "viewpoint", "dive-site": "viewpoint", "diving-site": "viewpoint", reef: "viewpoint", confluence: "ghat",
};
const EVENT_RE = /\b(yatra|jatra|utsav|festival|pushkaralu|pooram|mela)\b/i;
const COLS = ["id", "destination_id", "name", "type", "description", "tags", "time_needed", "entry_fee", "kids_suitable", "address", "opening_hours", "google_maps_url"];

// Merge all files, map type aliases, drop event-named entries, dedupe by id.
let raw = [];
for (const f of files) {
  const arr = JSON.parse(readFileSync(path.resolve(f), "utf-8"));
  if (!Array.isArray(arr)) throw new Error(`${f}: not a JSON array`);
  raw = raw.concat(arr);
}
let droppedEvents = 0, aliased = 0;
const byId = new Map();
for (const e of raw) {
  if (e && e.name && EVENT_RE.test(e.name)) { droppedEvents++; continue; }
  if (e && TYPE_ALIASES[e.type]) { e.type = TYPE_ALIASES[e.type]; aliased++; }
  if (e && e.id && !byId.has(e.id)) byId.set(e.id, e);
}
const entries = [...byId.values()];
console.log(`Merged ${files.length} file(s): ${raw.length} raw → ${entries.length} unique · aliased ${aliased} · dropped ${droppedEvents} event-named`);

const errs = [];
for (const [i, e] of entries.entries()) {
  if (!e || !e.id || !e.destination_id || !e.name) { errs.push(`[${i}] missing id/destination_id/name`); continue; }
  if (!TYPE_VOCAB.has(e.type)) errs.push(`[${i}] ${e.id}: type "${e.type}" not in vocab`);
  if (!e.description || e.description.length < 10) errs.push(`[${i}] ${e.id}: description too short`);
  if (e.tags !== undefined && !Array.isArray(e.tags)) errs.push(`[${i}] ${e.id}: tags must be an array`);
}

const byDest = entries.reduce((a, e) => ((a[e?.destination_id] = (a[e?.destination_id] ?? 0) + 1), a), {});
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

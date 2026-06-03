#!/usr/bin/env node
/* eslint-disable no-console */
// Apply festivals backfill. INSERT-ONLY + GUARDED: festivals has no natural
// unique key (id defaults to gen_random_uuid()), so to stay re-runnable we only
// insert for dests that currently have ZERO festivals — the exact gap we're
// filling. Any dest that already has ≥1 festival is skipped (protects curated
// rows + prevents duplicates on re-run).
//
// Entry shape:
//   { destination_id, name, month, approximate_date?, description?, significance? }
//   - `name` required. `month` 1-12 if present.
//   - Generic national festivals (Diwali everywhere) do NOT belong here — only
//     festivals where the destination is notably THE venue.
//
// Usage:
//   node scripts/apply-festival-backfill.mjs --file data/research/backfill/festival/<batch>.json --dry-run
//   node scripts/apply-festival-backfill.mjs --file data/research/backfill/festival/<batch>.json --commit

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
  console.error("Usage: node scripts/apply-festival-backfill.mjs --file <path> [--commit]");
  process.exit(1);
}
const FILE = path.resolve(args[fi + 1]);
const DRY_RUN = !args.includes("--commit");
const COLS = ["destination_id", "name", "month", "approximate_date", "description", "significance"];

const entries = JSON.parse(readFileSync(FILE, "utf-8"));
if (!Array.isArray(entries)) throw new Error("festival file must be a JSON array");

const errs = [];
for (const [i, e] of entries.entries()) {
  if (!e || !e.destination_id || !e.name) { errs.push(`[${i}] missing destination_id/name`); continue; }
  if (e.month != null && (!Number.isInteger(e.month) || e.month < 1 || e.month > 12)) errs.push(`[${i}] ${e.destination_id}: month must be int 1-12`);
}
const byDest = entries.reduce((a, e) => ((a[e?.destination_id] = (a[e?.destination_id] ?? 0) + 1), a), {});
console.log(`File: ${FILE}`);
console.log(`Festivals: ${entries.length} across ${Object.keys(byDest).length} dests · errors: ${errs.length}`);
if (errs.length) { for (const x of errs.slice(0, 25)) console.error(`  ✗ ${x}`); process.exit(1); }

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Guard: skip dests that already have any festival.
const { data: existing, error: exErr } = await s.from("festivals").select("destination_id");
if (exErr) { console.error(`✗ guard query failed: ${exErr.message}`); process.exit(1); }
const haveFest = new Set((existing ?? []).map((r) => r.destination_id));
const skipped = entries.filter((e) => haveFest.has(e.destination_id));
const toInsert = entries.filter((e) => !haveFest.has(e.destination_id));
const skipDests = [...new Set(skipped.map((e) => e.destination_id))];
console.log(`Guard: ${toInsert.length} insertable · ${skipped.length} skipped (${skipDests.length} dests already have festivals)`);
if (skipDests.length) console.log(`  skipped dests: ${skipDests.slice(0, 30).join(", ")}${skipDests.length > 30 ? " …" : ""}`);

if (DRY_RUN) { console.log(`\n[DRY-RUN] No writes. Re-run with --commit.`); process.exit(0); }
if (!toInsert.length) { console.log(`Nothing to insert.`); process.exit(0); }

console.log(`\n[COMMIT] Inserting festivals …`);
let ok = 0;
const failures = [];
const CHUNK = 50;
for (let i = 0; i < toInsert.length; i += CHUNK) {
  const rows = toInsert.slice(i, i + CHUNK).map((e) => {
    const row = {};
    for (const c of COLS) if (e[c] !== undefined && e[c] !== null) row[c] = e[c];
    return row;
  });
  const { error } = await s.from("festivals").insert(rows);
  if (error) failures.push(`chunk@${i}: ${error.message}`);
  else ok += rows.length;
}

console.log(`\n✓ Inserted ${ok} · failed chunks ${failures.length}`);
if (failures.length) { for (const f of failures.slice(0, 20)) console.error(`  ✗ ${f}`); process.exit(1); }
console.log(`✅ Festivals applied.`);

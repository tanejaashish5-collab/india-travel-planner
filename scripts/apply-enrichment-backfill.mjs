#!/usr/bin/env node
/* eslint-disable no-console */
// Apply month-enrichment backfill to destination_months. No generation API —
// reads an agent-produced JSON array and writes it to the DB. Idempotent.
//
// Two entry shapes (branch on presence of `score`):
//   ENRICH (row already exists, just fill text fields) — no `score`:
//     { destination_id, month, who_should_go[], who_should_avoid[],
//       things_to_do[], why_go, why_not, pack_list[], festivals_this_month[] }
//     → UPDATE the provided enrichment columns WHERE destination_id+month.
//   FULL (row does NOT exist yet — the 20 unscored sacred-trek dests) — has `score`:
//     { destination_id, month, score, verdict, go_or_skip_verdict, note,
//       skip_reason, prose_lead, prose_payoff, + the enrich fields }
//     → UPSERT the whole row on (destination_id, month).
//
// Usage:
//   node scripts/apply-enrichment-backfill.mjs --file data/research/backfill/enrichment/<batch>.json --dry-run
//   node scripts/apply-enrichment-backfill.mjs --file data/research/backfill/enrichment/<batch>.json --commit

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
  console.error("Usage: node scripts/apply-enrichment-backfill.mjs --file <path> [--commit]");
  process.exit(1);
}
const FILE = path.resolve(args[fi + 1]);
const DRY_RUN = !args.includes("--commit");

const ENRICH_COLS = ["who_should_go", "who_should_avoid", "things_to_do", "why_go", "why_not", "pack_list", "festivals_this_month"];
const FULL_EXTRA = ["score", "verdict", "go_or_skip_verdict", "note", "skip_reason", "prose_lead", "prose_payoff"];
const ARRAY_COLS = new Set(["who_should_go", "who_should_avoid", "things_to_do", "pack_list", "festivals_this_month"]);

const pick = (obj, keys) => {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined && obj[k] !== null) out[k] = obj[k];
  return out;
};

const entries = JSON.parse(readFileSync(FILE, "utf-8"));
if (!Array.isArray(entries)) throw new Error("enrichment file must be a JSON array");

const errs = [];
for (const [i, e] of entries.entries()) {
  if (!e || typeof e.destination_id !== "string") { errs.push(`[${i}] missing destination_id`); continue; }
  if (!Number.isInteger(e.month) || e.month < 1 || e.month > 12) errs.push(`[${i}] ${e.destination_id}: month must be int 1-12`);
  if (e.score !== undefined && e.score !== null && (!Number.isInteger(e.score) || e.score < 0 || e.score > 5))
    errs.push(`[${i}] ${e.destination_id}/${e.month}: score must be int 0-5`);
  for (const c of ARRAY_COLS) if (e[c] !== undefined && e[c] !== null && !Array.isArray(e[c]))
    errs.push(`[${i}] ${e.destination_id}/${e.month}: ${c} must be an array`);
  // at least one enrichment field present
  const hasContent = ENRICH_COLS.some((c) => e[c] != null) || e.score != null;
  if (!hasContent) errs.push(`[${i}] ${e.destination_id}/${e.month}: no content fields`);
}

const full = entries.filter((e) => e.score != null).length;
console.log(`File: ${FILE}`);
console.log(`Entries: ${entries.length} (full/new=${full} · enrich-only=${entries.length - full}) · errors: ${errs.length}`);
if (errs.length) { for (const x of errs.slice(0, 25)) console.error(`  ✗ ${x}`); process.exit(1); }
if (DRY_RUN) { console.log(`\n[DRY-RUN] No writes. Re-run with --commit.`); process.exit(0); }

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

console.log(`\n[COMMIT] Writing destination_months …`);
let ok = 0;
const failures = [];
const CHUNK = 20;
for (let i = 0; i < entries.length; i += CHUNK) {
  const slice = entries.slice(i, i + CHUNK);
  await Promise.all(slice.map(async (e) => {
    let error;
    if (e.score != null) {
      const row = { destination_id: e.destination_id, month: e.month, ...pick(e, [...ENRICH_COLS, ...FULL_EXTRA]) };
      ({ error } = await s.from("destination_months").upsert(row, { onConflict: "destination_id,month" }));
    } else {
      const patch = pick(e, ENRICH_COLS);
      ({ error } = await s.from("destination_months").update(patch).eq("destination_id", e.destination_id).eq("month", e.month));
    }
    if (error) failures.push(`${e.destination_id}/${e.month}: ${error.message}`);
    else ok++;
  }));
}

console.log(`\n✓ Wrote ${ok} · failed ${failures.length}`);
if (failures.length) { for (const f of failures.slice(0, 20)) console.error(`  ✗ ${f}`); process.exit(1); }
console.log(`✅ Enrichment applied.`);

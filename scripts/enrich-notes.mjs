#!/usr/bin/env node
/**
 * enrich-notes.mjs — bulk-enrich destination_months.note from a staging JSON.
 *
 * Usage:
 *   node scripts/enrich-notes.mjs data/enrichment/<cluster>.json           # dry-run
 *   node scripts/enrich-notes.mjs data/enrichment/<cluster>.json --commit  # write
 *
 * Staging JSON format:
 *   [
 *     { "destination_id": "alleppey", "month": 1, "note": "Peak … " },
 *     ...
 *   ]
 *
 * Voice audit (mandatory, pre-commit):
 *   Any note containing one of the banned words below is rejected. Reuses the
 *   list locked in for stay-curation (brand bible, project/README.md §Voice).
 *
 * Safety:
 *   - Default mode is dry-run; only --commit writes.
 *   - Updates `note` column only. Does not touch score, prose_lead, or any
 *     other field.
 *   - Skips rows where the existing DB note is already longer than the proposed
 *     one (protects prior curation work).
 */

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
];
const MIN_LEN = 40;
const MAX_LEN = 200;

function voiceAudit(note) {
  const lower = note.toLowerCase();
  const hits = BANNED.filter((w) => lower.includes(w));
  return {
    ok: hits.length === 0 && note.length >= MIN_LEN && note.length <= MAX_LEN,
    bannedHits: hits,
    tooShort: note.length < MIN_LEN,
    tooLong: note.length > MAX_LEN,
  };
}

function loadEnv() {
  const env = {};
  for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const commit = args.includes("--commit");

if (!file) {
  console.error("Usage: node scripts/enrich-notes.mjs <staging.json> [--commit]");
  process.exit(1);
}

const staging = JSON.parse(readFileSync(file, "utf-8"));
const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

console.log(`\nLoaded ${staging.length} entries from ${file}`);
console.log(`Mode: ${commit ? "\x1b[31mCOMMIT\x1b[0m" : "dry-run (pass --commit to write)"}\n`);

// Voice-audit every proposed note up-front
const audited = staging.map((row, i) => {
  const v = voiceAudit(row.note ?? "");
  return { ...row, _index: i, _audit: v };
});

const rejects = audited.filter((r) => !r._audit.ok);
if (rejects.length > 0) {
  console.error(`\n\x1b[31m✗ ${rejects.length} rows failed voice audit — nothing committed.\x1b[0m\n`);
  for (const r of rejects) {
    console.error(`  [${r._index}] ${r.destination_id} m=${r.month}`);
    if (r._audit.bannedHits.length) console.error(`       banned words: ${r._audit.bannedHits.join(", ")}`);
    if (r._audit.tooShort) console.error(`       too short (${r.note?.length ?? 0} < ${MIN_LEN})`);
    if (r._audit.tooLong) console.error(`       too long (${r.note?.length ?? 0} > ${MAX_LEN})`);
  }
  process.exit(2);
}

console.log(`✓ All ${audited.length} entries pass voice audit.\n`);

// Fetch current state for diff preview
const ids = [...new Set(staging.map((r) => r.destination_id))];
const months = [...new Set(staging.map((r) => r.month))];
const { data: current } = await supabase
  .from("destination_months")
  .select("destination_id, month, note")
  .in("destination_id", ids)
  .in("month", months);
const existing = new Map();
for (const c of current ?? []) existing.set(`${c.destination_id}:${c.month}`, c.note ?? "");

let willWrite = 0;
let willSkip = 0;
for (const r of audited) {
  const key = `${r.destination_id}:${r.month}`;
  const have = existing.get(key) ?? "";
  const skip = have.length >= r.note.length && have.length >= MIN_LEN;
  console.log(`  ${skip ? "SKIP" : "WRITE"}  ${r.destination_id.padEnd(32)} m=${String(r.month).padStart(2)}  len ${String(have.length).padStart(3)} → ${r.note.length}`);
  if (skip) willSkip++; else willWrite++;
}

console.log(`\nWill write: ${willWrite} · Skip: ${willSkip} (existing note longer)\n`);

if (!commit) {
  console.log("Run again with --commit to persist.\n");
  process.exit(0);
}

// Commit — update each row individually (composite PK: destination_id + month)
let ok = 0;
let fail = 0;
for (const r of audited) {
  const key = `${r.destination_id}:${r.month}`;
  const have = existing.get(key) ?? "";
  if (have.length >= r.note.length && have.length >= MIN_LEN) continue;
  const { error } = await supabase
    .from("destination_months")
    .update({ note: r.note })
    .eq("destination_id", r.destination_id)
    .eq("month", r.month);
  if (error) { console.error(`  ✗ ${r.destination_id} m=${r.month}: ${error.message}`); fail++; }
  else ok++;
}

console.log(`\n✓ Committed: ${ok}  ✗ Failed: ${fail}\n`);
process.exit(fail > 0 ? 3 : 0);

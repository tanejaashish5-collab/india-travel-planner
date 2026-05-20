#!/usr/bin/env node
/* eslint-disable no-console */
// Apply Hindi translations to translations.hi on local_eateries / local_stays
// / destination_stay_picks. No translation API — reads an agent-produced JSON
// file and writes it to the DB.
//
// Usage:
//   node scripts/apply-translations.mjs --file data/research/translations/<state>-hi.json --dry-run
//   node scripts/apply-translations.mjs --file data/research/translations/<state>-hi.json --commit
//
// Input file: an array of entries
//   { table: "local_eateries"|"local_stays", id: "<uuid>", hi: {<field>:<hi>} }
//   { table: "destination_stay_picks", destination_id, slot, hi: {<field>:<hi>} }
//
// The translations column on these tables only ever holds { hi: {...} }, so
// each row's translations is set wholesale — idempotent, re-runnable.

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
  console.error("Usage: node scripts/apply-translations.mjs --file <path> [--commit]");
  process.exit(1);
}
const FILE = path.resolve(args[fi + 1]);
const DRY_RUN = !args.includes("--commit");

const VALID_TABLES = new Set(["local_eateries", "local_stays", "destination_stay_picks"]);

const entries = JSON.parse(readFileSync(FILE, "utf-8"));
if (!Array.isArray(entries)) throw new Error("translation file must be a JSON array");

let bad = 0;
for (const e of entries) {
  if (!e || !VALID_TABLES.has(e.table) || !e.hi || typeof e.hi !== "object" || Array.isArray(e.hi)) { bad++; continue; }
  if (e.table === "destination_stay_picks") { if (!e.destination_id || !e.slot) bad++; }
  else if (!e.id) bad++;
}
const byTable = entries.reduce((a, e) => ((a[e?.table] = (a[e?.table] ?? 0) + 1), a), {});
console.log(`File: ${FILE}`);
console.log(`Entries: ${entries.length} ${JSON.stringify(byTable)} · invalid: ${bad}`);
if (bad > 0) { console.error(`✗ ${bad} invalid entries — fix the file before applying`); process.exit(1); }

if (DRY_RUN) { console.log(`\n[DRY-RUN] No writes. Re-run with --commit.`); process.exit(0); }

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

console.log(`\n[COMMIT] Writing translations.hi …`);
let ok = 0;
const failures = [];
const CHUNK = 25;
for (let i = 0; i < entries.length; i += CHUNK) {
  const slice = entries.slice(i, i + CHUNK);
  await Promise.all(
    slice.map(async (e) => {
      let q = s.from(e.table).update({ translations: { hi: e.hi } });
      q = e.table === "destination_stay_picks"
        ? q.eq("destination_id", e.destination_id).eq("slot", e.slot)
        : q.eq("id", e.id);
      const { error } = await q;
      if (error) failures.push(`${e.table} ${e.id ?? `${e.destination_id}/${e.slot}`}: ${error.message}`);
      else ok++;
    }),
  );
}

console.log(`\n✓ Updated ${ok} · failed ${failures.length}`);
if (failures.length) {
  for (const f of failures.slice(0, 20)) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`✅ Translations applied.`);

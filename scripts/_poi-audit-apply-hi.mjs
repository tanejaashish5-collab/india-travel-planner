#!/usr/bin/env node
/* eslint-disable no-console */
// Apply Hindi POI-audit corrections to translations->hi->description (jsonb path).
// Each: {id, value} (full set) or {id, find, replace} (validated substring swap).
// Idempotent. Reads data/research/backfill/poi-audit/HI-CORRECTIONS.json.
//
//   node scripts/_poi-audit-apply-hi.mjs            # dry-run
//   node scripts/_poi-audit-apply-hi.mjs --commit

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
const COMMIT = process.argv.includes("--commit");
const fi = process.argv.indexOf("--file");
const FILE = fi !== -1 && process.argv[fi + 1] ? process.argv[fi + 1] : "data/research/backfill/poi-audit/HI-CORRECTIONS.json";

const corrections = JSON.parse(readFileSync(path.join(ROOT, FILE), "utf-8"));
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

let applied = 0, skipped = 0, failed = 0;
for (const c of corrections) {
  const { data: row, error } = await s.from("points_of_interest").select("id, translations").eq("id", c.id).maybeSingle();
  if (error) { console.error(`✗ ${c.id}: fetch ${error.message}`); failed++; continue; }
  if (!row) { console.error(`✗ ${c.id}: NOT FOUND`); failed++; continue; }
  const tr = row.translations || {};
  const cur = tr?.hi?.description ?? null;
  if (cur == null) { console.error(`✗ ${c.id}: no hi.description`); failed++; continue; }
  let next;
  if ("value" in c) {
    if (cur === c.value) { console.log(`· ${c.id} already set — skip`); skipped++; continue; }
    next = c.value;
  } else {
    const n = cur.split(c.find).length - 1;
    if (n === 0) {
      if (cur.includes(c.replace)) { console.log(`· ${c.id} already corrected — skip`); skipped++; continue; }
      console.error(`✗ ${c.id}: HI find-string NOT present`); failed++; continue;
    }
    if (n > 1) { console.error(`✗ ${c.id}: HI find-string appears ${n}× (ambiguous)`); failed++; continue; }
    next = cur.replace(c.find, c.replace);
  }
  console.log(`${COMMIT ? "✓" : "DRY"} ${c.id} [hi.description]`);
  if (!COMMIT) { applied++; continue; }
  const newTr = { ...tr, hi: { ...tr.hi, description: next } };
  const { error: uErr } = await s.from("points_of_interest").update({ translations: newTr }).eq("id", c.id);
  if (uErr) { console.error(`  ✗ update failed: ${uErr.message}`); failed++; continue; }
  applied++;
}
console.log(`\n${COMMIT ? "APPLIED" : "[DRY-RUN]"} ok=${applied} skip=${skipped} fail=${failed} / ${corrections.length}`);
if (!COMMIT) console.log("Re-run with --commit to write.");
if (failed) process.exit(1);

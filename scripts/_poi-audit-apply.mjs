#!/usr/bin/env node
/* eslint-disable no-console */
// Apply confirmed POI-audit corrections (data/research/backfill/poi-audit/CORRECTIONS.json).
// Each correction is either {id, field, value} (full set) or {id, field, find, replace}
// (validated substring swap — find MUST exist exactly once). Idempotent: a correction
// whose `find` is already gone (or value already set) is reported as skip, not error.
//
//   node scripts/_poi-audit-apply.mjs            # dry-run
//   node scripts/_poi-audit-apply.mjs --commit

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
const COMMIT = process.argv.includes("--commit");
const fi = process.argv.indexOf("--file");
const FILE = fi !== -1 && process.argv[fi + 1] ? process.argv[fi + 1] : "data/research/backfill/poi-audit/CORRECTIONS.json";

const corrections = JSON.parse(readFileSync(path.join(ROOT, FILE), "utf-8"));

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

let applied = 0, skipped = 0, failed = 0;
for (const c of corrections) {
  const { data: row, error } = await s.from("points_of_interest").select(`id, ${c.field}`).eq("id", c.id).maybeSingle();
  if (error) { console.error(`✗ ${c.id}: fetch ${error.message}`); failed++; continue; }
  if (!row) { console.error(`✗ ${c.id}: NOT FOUND`); failed++; continue; }
  const cur = row[c.field] ?? "";
  let next;
  if ("value" in c) {
    next = c.value;
    if (cur === next) { console.log(`· ${c.id} [${c.field}] already set — skip`); skipped++; continue; }
  } else {
    const n = cur.split(c.find).length - 1;
    if (n === 0) {
      // maybe already applied
      if (cur.includes(c.replace)) { console.log(`· ${c.id} already corrected — skip`); skipped++; continue; }
      console.error(`✗ ${c.id}: find-string NOT present: "${c.find.slice(0, 50)}…"`); failed++; continue;
    }
    if (n > 1) { console.error(`✗ ${c.id}: find-string appears ${n}× (ambiguous), skipping`); failed++; continue; }
    next = cur.replace(c.find, c.replace);
  }
  console.log(`${COMMIT ? "✓" : "DRY"} ${c.id} [${c.field}]  (${c.reason})`);
  if (!COMMIT) { applied++; continue; }
  const { error: uErr } = await s.from("points_of_interest").update({ [c.field]: next }).eq("id", c.id);
  if (uErr) { console.error(`  ✗ update failed: ${uErr.message}`); failed++; continue; }
  applied++;
}

console.log(`\n${COMMIT ? "APPLIED" : "[DRY-RUN]"} ok=${applied} skip=${skipped} fail=${failed} / ${corrections.length} total`);
if (!COMMIT) console.log("Re-run with --commit to write.");
if (failed) process.exit(1);

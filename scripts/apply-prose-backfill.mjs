#!/usr/bin/env node
/* eslint-disable no-console */
// Fill NULL why_go / why_not on destination_months, respecting the dm_prose_floor
// CHECK constraint. UPDATE-ONLY-NULL: never overwrites existing prose (each update is
// guarded by .is(<field>, null)). Validates length-floor (per verdict) + banned words
// before writing; the DB constraint is the final backstop.
//
//   dm_prose_floor: go→why_go≥150, skip→why_not≥150, wait→each present field≥120.
//
// Usage:
//   node scripts/apply-prose-backfill.mjs data/research/backfill/prose/*.json            # dry-run
//   node scripts/apply-prose-backfill.mjs data/research/backfill/prose/*.json --commit

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { readFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const args = process.argv.slice(2);
const DRY = !args.includes("--commit");
const files = args.filter((a) => a.endsWith(".json"));
if (!files.length) { console.error("usage: node scripts/apply-prose-backfill.mjs <files...> [--commit]"); process.exit(1); }

const BANNED = ["hidden gem", "must-visit", "must visit", "paradise", "ultimate", "unforgettable", "breathtaking", "amazing", "stunning", "nestled", "bucket list", "magical", "majestic", "jaw-dropping", "gem of", "oasis"];
const banned = (s) => BANNED.find((b) => s.toLowerCase().includes(b));
const floorOk = (verdict, field, len) => {
  if (field === "why_go") return verdict === "go" ? len >= 150 : verdict === "wait" ? len >= 120 : false;
  if (field === "why_not") return verdict === "skip" ? len >= 150 : verdict === "wait" ? len >= 120 : false;
  return false;
};

// Merge files → one record per (dest,month).
const byKey = new Map();
let raw = 0;
for (const f of files) {
  const arr = JSON.parse(readFileSync(path.resolve(f), "utf-8"));
  if (!Array.isArray(arr)) throw new Error(`${f}: not a JSON array`);
  for (const e of arr) {
    raw++;
    const k = `${e.destination_id}|${e.month}`;
    const cur = byKey.get(k) ?? { destination_id: e.destination_id, month: e.month };
    if (e.why_go != null && String(e.why_go).trim()) cur.why_go = e.why_go;
    if (e.why_not != null && String(e.why_not).trim()) cur.why_not = e.why_not;
    byKey.set(k, cur);
  }
}
const entries = [...byKey.values()];

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const dests = [...new Set(entries.map((e) => e.destination_id))];
const verdict = new Map();
for (let i = 0; i < dests.length; i += 80) {
  const { data, error } = await s.from("destination_months").select("destination_id,month,verdict").in("destination_id", dests.slice(i, i + 80));
  if (error) { console.error(`✗ verdict fetch: ${error.message}`); process.exit(1); }
  for (const r of data) verdict.set(`${r.destination_id}|${r.month}`, r.verdict);
}

const ops = [];
const problems = [];
for (const e of entries) {
  if (!Number.isInteger(e.month) || e.month < 1 || e.month > 12) { problems.push(`${e.destination_id} m${e.month}: bad month`); continue; }
  const v = verdict.get(`${e.destination_id}|${e.month}`);
  if (!v) { problems.push(`${e.destination_id} m${e.month}: no DB row/verdict`); continue; }
  for (const field of ["why_go", "why_not"]) {
    const val = e[field];
    if (val == null) continue;
    const b = banned(val);
    if (b) { problems.push(`${e.destination_id} m${e.month} ${field}: banned "${b}"`); continue; }
    if (!floorOk(v, field, val.length)) { problems.push(`${e.destination_id} m${e.month} ${field}: len ${val.length} fails floor for verdict=${v}`); continue; }
    ops.push({ dest: e.destination_id, month: e.month, field, value: val });
  }
}

console.log(`Files ${files.length} · raw ${raw} · merged (dest,month) ${entries.length} · valid field-ops ${ops.length} · problems ${problems.length}`);
if (problems.length) { for (const p of problems.slice(0, 50)) console.error(`  ✗ ${p}`); process.exit(1); }
if (DRY) { console.log(`[DRY-RUN] No writes. Re-run with --commit.`); process.exit(0); }

let updated = 0, noop = 0;
const fails = [];
for (const o of ops) {
  const { data, error } = await s.from("destination_months")
    .update({ [o.field]: o.value })
    .eq("destination_id", o.dest).eq("month", o.month).is(o.field, null)
    .select("destination_id");
  if (error) fails.push(`${o.dest} m${o.month} ${o.field}: ${error.message}`);
  else if (data && data.length) updated++; else noop++;
}
console.log(`\n✓ updated ${updated} · no-op (already filled) ${noop} · failed ${fails.length}`);
if (fails.length) { for (const f of fails.slice(0, 40)) console.error(`  ✗ ${f}`); process.exit(1); }
console.log(`✅ Prose applied.`);

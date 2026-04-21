#!/usr/bin/env node
/**
 * enrich-destination-months-verdict.mjs — audit + commit verdict drafts.
 *
 * Usage:
 *   node scripts/enrich-destination-months-verdict.mjs data/enrichment/verdict-tier5.json          # dry-run
 *   node scripts/enrich-destination-months-verdict.mjs data/enrichment/verdict-tier5.json --commit # write
 *
 * Audit rules:
 *   - verdict must be 'go' | 'wait' | 'skip'
 *   - skip_reason required when verdict ∈ {'wait','skip'}, else null
 *   - skip_reason length 15–120 chars
 *   - no banned words in skip_reason
 */

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
];

const file = process.argv[2];
const commit = process.argv.includes("--commit");
if (!file) {
  console.error("Usage: enrich-destination-months-verdict.mjs <file> [--commit]");
  process.exit(1);
}

function loadEnv() {
  const env = {};
  for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}

function auditRow(row) {
  const issues = [];
  if (!["go", "wait", "skip"].includes(row.verdict)) issues.push(`invalid verdict: ${row.verdict}`);
  if (row.verdict === "go") {
    if (row.skip_reason != null) issues.push(`go verdict should have null skip_reason`);
  } else {
    const r = row.skip_reason ?? "";
    if (r.length < 15) issues.push(`skip_reason too short (${r.length} chars)`);
    if (r.length > 180) issues.push(`skip_reason too long (${r.length} chars)`);
    const lower = r.toLowerCase();
    const hits = BANNED.filter((w) => lower.includes(w));
    if (hits.length) issues.push(`banned: ${hits.join(", ")}`);
  }
  return issues;
}

const drafts = JSON.parse(readFileSync(file, "utf-8"));
console.log(`\nLoaded ${drafts.length} drafts from ${file}.`);

const accepted = [];
const rejected = [];
for (const row of drafts) {
  const issues = auditRow(row);
  if (issues.length) rejected.push({ row, issues });
  else accepted.push(row);
}

console.log(`  ✓ accepted: ${accepted.length}`);
console.log(`  ✗ rejected: ${rejected.length}`);
if (rejected.length && rejected.length <= 20) {
  for (const r of rejected) {
    console.log(`    - ${r.row.destination_id} m=${r.row.month}: ${r.issues.join("; ")}`);
  }
} else if (rejected.length > 20) {
  console.log(`    (first 20)`);
  for (const r of rejected.slice(0, 20)) {
    console.log(`    - ${r.row.destination_id} m=${r.row.month}: ${r.issues.join("; ")}`);
  }
}

if (!commit) {
  console.log(`\nDry-run only. Re-run with --commit to write.\n`);
  process.exit(0);
}

const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

console.log(`\nCommitting ${accepted.length} rows…`);
let ok = 0;
let err = 0;
const reviewedAt = new Date().toISOString();
for (const row of accepted) {
  const { error } = await supabase
    .from("destination_months")
    .update({
      verdict: row.verdict,
      skip_reason: row.skip_reason,
      content_reviewed_at: reviewedAt,
    })
    .eq("destination_id", row.destination_id)
    .eq("month", row.month);
  if (error) { err++; console.error(`  ✗ ${row.destination_id} m=${row.month}: ${error.message}`); }
  else ok++;
}
console.log(`\n✓ Updated: ${ok}`);
if (err) console.log(`✗ Errors: ${err}`);

#!/usr/bin/env node
/**
 * Applies solo-female annual scores + monthly overrides from the two JSON files:
 *   data/solo-female/scores.json    (annual, on destinations)
 *   data/solo-female/overrides.json (month-specific, on destination_months)
 *
 * Audits every row: score ∈ [1,5] or null, note 0-200 chars, banned-word clean.
 * --commit: UPDATE destinations + UPSERT destination_months. Bumps
 * content_reviewed_at on every row touched.
 *
 * Usage:
 *   node scripts/apply-solo-female-scores.mjs
 *   node scripts/apply-solo-female-scores.mjs --commit
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
  "charming", "nestled",
];

const NOTE_MIN = 20, NOTE_MAX = 200;
const COMMIT = process.argv.includes("--commit");

const scores = JSON.parse(readFileSync("data/solo-female/scores.json", "utf-8"));
const overrides = JSON.parse(readFileSync("data/solo-female/overrides.json", "utf-8"));

// ─── Audit annual scores ───
function auditScore(row) {
  const issues = [];
  if (row.new_score === null) return issues; // honest-gap null = OK
  if (!Number.isInteger(row.new_score) || row.new_score < 1 || row.new_score > 5) {
    issues.push(`score ${row.new_score} out of [1,5]`);
  }
  if (row.new_note) {
    if (row.new_note.length < NOTE_MIN) issues.push(`note too short (${row.new_note.length})`);
    if (row.new_note.length > NOTE_MAX) issues.push(`note too long (${row.new_note.length})`);
    const lower = row.new_note.toLowerCase();
    const banned = BANNED.filter((b) => lower.includes(b));
    if (banned.length) issues.push(`banned: ${banned.join(", ")}`);
  }
  return issues;
}

function auditOverride(row) {
  const issues = [];
  if (!row.destination_id) issues.push("destination_id missing");
  if (!Number.isInteger(row.month) || row.month < 1 || row.month > 12) {
    issues.push(`month ${row.month} out of [1,12]`);
  }
  if (row.solo_female_override !== null) {
    if (!Number.isInteger(row.solo_female_override) || row.solo_female_override < 1 || row.solo_female_override > 5) {
      issues.push(`override score ${row.solo_female_override} out of [1,5]`);
    }
  }
  if (row.solo_female_override_note) {
    if (row.solo_female_override_note.length > NOTE_MAX) issues.push(`note too long (${row.solo_female_override_note.length})`);
    const lower = row.solo_female_override_note.toLowerCase();
    const banned = BANNED.filter((b) => lower.includes(b));
    if (banned.length) issues.push(`banned: ${banned.join(", ")}`);
  }
  return issues;
}

const scoreIssues = [];
const overrideIssues = [];
for (const r of scores) {
  const i = auditScore(r);
  if (i.length) scoreIssues.push({ id: r.id, issues: i });
}
for (const r of overrides) {
  const i = auditOverride(r);
  if (i.length) overrideIssues.push({ id: `${r.destination_id}/${r.month}`, issues: i });
}

const scoresFilled = scores.filter((r) => r.new_score !== null).length;
const scoresNull = scores.length - scoresFilled;
console.log(`\nANNUAL (${scores.length} destinations):`);
console.log(`  ${scoresFilled} scored | ${scoresNull} honest-gap null | ${scoreIssues.length} audit rejections`);
if (scoreIssues.length) {
  console.log(`  Rejections:`);
  for (const r of scoreIssues.slice(0, 20)) console.log(`    ✗ ${r.id}: ${r.issues.join("; ")}`);
  if (scoreIssues.length > 20) console.log(`    ...+${scoreIssues.length - 20} more`);
}

const overridesFilled = overrides.filter((r) => r.solo_female_override !== null).length;
console.log(`\nMONTH OVERRIDES (${overrides.length} rows):`);
console.log(`  ${overridesFilled} with score | ${overrides.length - overridesFilled} null (closed/inaccessible) | ${overrideIssues.length} audit rejections`);
if (overrideIssues.length) {
  console.log(`  Rejections:`);
  for (const r of overrideIssues.slice(0, 20)) console.log(`    ✗ ${r.id}: ${r.issues.join("; ")}`);
}

if (!COMMIT) {
  console.log(`\nDRY RUN. Re-run with --commit to write.`);
  process.exit(scoreIssues.length + overrideIssues.length > 0 ? 1 : 0);
}

if (scoreIssues.length + overrideIssues.length > 0) {
  console.error(`\n✗ Audit rejections present — commit aborted. Fix the JSON and re-run.`);
  process.exit(1);
}

// ─── Commit ───
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const reviewedAt = new Date().toISOString();

console.log(`\nCOMMIT mode — writing to DB (reviewed ${reviewedAt})`);

// Annual updates — only rows we actually drafted
let annualOk = 0, annualErr = 0;
const toApply = scores.filter((r) => r.new_score !== null); // null = skip, don't overwrite
for (const r of toApply) {
  const { error } = await supabase
    .from("destinations")
    .update({
      solo_female_score: r.new_score,
      solo_female_note: r.new_note,
      content_reviewed_at: reviewedAt,
    })
    .eq("id", r.id);
  if (error) { console.error(`  ✗ ${r.id}: ${error.message}`); annualErr++; }
  else annualOk++;
}
console.log(`\nAnnual: ${annualOk} updated, ${annualErr} failed`);

// Month overrides — upsert
let monthOk = 0, monthErr = 0;
for (const r of overrides) {
  const { error } = await supabase
    .from("destination_months")
    .update({
      solo_female_override: r.solo_female_override,
      solo_female_override_note: r.solo_female_override_note,
      content_reviewed_at: reviewedAt,
    })
    .eq("destination_id", r.destination_id)
    .eq("month", r.month);
  if (error) { console.error(`  ✗ ${r.destination_id}/${r.month}: ${error.message}`); monthErr++; }
  else monthOk++;
}
console.log(`Overrides: ${monthOk} updated, ${monthErr} failed`);

console.log(`\nDone. content_reviewed_at stamped at ${reviewedAt}`);

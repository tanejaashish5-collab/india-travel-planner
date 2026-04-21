#!/usr/bin/env node
/**
 * Apply voice rewrites from a JSON file to the destinations table.
 *
 * Input format (see data/voice-rewrites/top100-voice.json):
 *   [
 *     { id, status: "REWRITE" | "KEEP", new_tagline, new_why_special, ... },
 *     ...
 *   ]
 *
 * Behaviour:
 *   - Only rows with status="REWRITE" are processed.
 *   - Each gets an audit: no banned words, length targets, non-empty.
 *   - On --commit: UPDATE destinations SET tagline, why_special,
 *     content_reviewed_at = now() WHERE id = ?.
 *   - KEEP rows are counted but not touched.
 *
 * Usage:
 *   node scripts/apply-voice-rewrites.mjs data/voice-rewrites/top100-voice.json
 *   node scripts/apply-voice-rewrites.mjs data/voice-rewrites/top100-voice.json --commit
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

const TAG_MIN = 30, TAG_MAX = 220;
const WHY_MIN = 120, WHY_MAX = 900;

const file = process.argv[2];
const COMMIT = process.argv.includes("--commit");

if (!file) {
  console.error("Usage: apply-voice-rewrites.mjs <file.json> [--commit]");
  process.exit(1);
}

const entries = JSON.parse(readFileSync(file, "utf-8"));
const rewrites = entries.filter((e) => e.status === "REWRITE");
const keeps = entries.filter((e) => e.status === "KEEP");

console.log(`Loaded: ${entries.length} total, ${rewrites.length} REWRITE, ${keeps.length} KEEP`);
console.log(`Mode: ${COMMIT ? "COMMIT" : "DRY"}\n`);

// ─── Audit ───
const accepted = [];
const rejected = [];

for (const e of rewrites) {
  const issues = [];
  const t = (e.new_tagline ?? "").trim();
  const w = (e.new_why_special ?? "").trim();

  if (!t) issues.push("new_tagline empty");
  if (!w) issues.push("new_why_special empty");
  if (t.length < TAG_MIN) issues.push(`tagline too short (${t.length} chars, min ${TAG_MIN})`);
  if (t.length > TAG_MAX) issues.push(`tagline too long (${t.length} chars, max ${TAG_MAX})`);
  if (w.length < WHY_MIN) issues.push(`why_special too short (${w.length} chars, min ${WHY_MIN})`);
  if (w.length > WHY_MAX) issues.push(`why_special too long (${w.length} chars, max ${WHY_MAX})`);

  const combined = `${t} ${w}`.toLowerCase();
  const hits = BANNED.filter((b) => combined.includes(b));
  if (hits.length) issues.push(`banned: ${hits.join(", ")}`);

  if (issues.length) rejected.push({ e, issues });
  else accepted.push(e);
}

console.log(`Audit: ${accepted.length} accepted, ${rejected.length} rejected\n`);
if (rejected.length) {
  console.log("Rejected rows:");
  for (const r of rejected) {
    console.log(`  ✗ ${r.e.id}: ${r.issues.join("; ")}`);
  }
  console.log("");
}

if (!COMMIT) {
  if (accepted.length) {
    console.log(`Would UPDATE ${accepted.length} destinations. Sample:`);
    for (const e of accepted.slice(0, 3)) {
      console.log(`  • ${e.id}: "${e.new_tagline.slice(0, 80)}..."`);
    }
  }
  console.log(`\nRe-run with --commit to write.\n`);
  process.exit(rejected.length > 0 ? 1 : 0);
}

// ─── Commit ───
if (rejected.length > 0) {
  console.error("✗ Aborting commit: audit rejections present. Fix the JSON and re-run.");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const reviewedAt = new Date().toISOString();
let ok = 0, err = 0;

for (const e of accepted) {
  const { error } = await supabase
    .from("destinations")
    .update({
      tagline: e.new_tagline.trim(),
      why_special: e.new_why_special.trim(),
      content_reviewed_at: reviewedAt,
    })
    .eq("id", e.id);
  if (error) { console.error(`  ✗ ${e.id}: ${error.message}`); err++; }
  else { console.log(`  ✓ ${e.id}`); ok++; }
}

console.log(`\n${ok} updated, ${err} failed.`);
console.log(`content_reviewed_at stamped at ${reviewedAt}`);

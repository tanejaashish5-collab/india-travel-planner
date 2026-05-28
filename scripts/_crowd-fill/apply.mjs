#!/usr/bin/env node
/**
 * Validate + apply crowd-fill agent output (scripts/_crowd-fill/out-*.json).
 *
 * Each out file is an array of { id, peak_months:[1-12], quiet_months:[1-12], note }.
 * peak_months MAY be empty — honest scarcity for destinations with no real
 * tourist-crowd peak (genuinely offbeat / low-footfall year round).
 *
 * Merges into any existing crowd_calendar (preserves other keys), sets
 * peak_months / quiet_months / note. Dry-run by default; --commit writes.
 *
 * Run: node scripts/_crowd-fill/apply.mjs            (audit + preview)
 *      node scripts/_crowd-fill/apply.mjs --commit   (write to prod)
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

config({ path: "apps/web/.env.local" });
const __dirname = dirname(fileURLToPath(import.meta.url));
const COMMIT = process.argv.includes("--commit");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "paradise",
  "pristine", "charming", "nestled",
];

// ── Load all agent output ──
const files = readdirSync(__dirname).filter((f) => /^out-\d+\.json$/.test(f)).sort();
if (files.length === 0) {
  console.error("No out-NN.json files found. Did the agents run?");
  process.exit(1);
}
const rows = [];
for (const f of files) {
  const parsed = JSON.parse(readFileSync(resolve(__dirname, f), "utf-8"));
  if (!Array.isArray(parsed)) { console.error(`${f} is not an array`); process.exit(1); }
  for (const r of parsed) rows.push({ ...r, _file: f });
}
console.log(`Loaded ${rows.length} rows from ${files.length} files.`);

// ── Audit ──
const validMonths = (a) => Array.isArray(a) && a.every((m) => Number.isInteger(m) && m >= 1 && m <= 12);
const uniq = (a) => new Set(a).size === a.length;
const issues = [];
const seen = new Set();
for (const r of rows) {
  const tag = `${r.id} [${r._file}]`;
  if (!r.id || typeof r.id !== "string") { issues.push(`${tag}: missing id`); continue; }
  if (seen.has(r.id)) issues.push(`${tag}: duplicate id`);
  seen.add(r.id);
  if (!validMonths(r.peak_months)) issues.push(`${tag}: peak_months invalid`);
  if (!validMonths(r.quiet_months)) issues.push(`${tag}: quiet_months invalid`);
  if (validMonths(r.peak_months) && !uniq(r.peak_months)) issues.push(`${tag}: peak_months has dupes`);
  if (validMonths(r.quiet_months) && !uniq(r.quiet_months)) issues.push(`${tag}: quiet_months has dupes`);
  if (Array.isArray(r.peak_months) && r.peak_months.length > 8) issues.push(`${tag}: peak_months too broad (${r.peak_months.length})`);
  if (validMonths(r.peak_months) && validMonths(r.quiet_months)) {
    const overlap = r.peak_months.filter((m) => r.quiet_months.includes(m));
    if (overlap.length) issues.push(`${tag}: months in BOTH peak+quiet: ${overlap.join(",")}`);
  }
  if (r.note != null) {
    if (typeof r.note !== "string") issues.push(`${tag}: note not a string`);
    else {
      if (r.note.length > 240) issues.push(`${tag}: note too long (${r.note.length})`);
      const lower = r.note.toLowerCase();
      const bad = BANNED.filter((b) => lower.includes(b));
      if (bad.length) issues.push(`${tag}: banned words: ${bad.join(", ")}`);
    }
  }
}

if (issues.length) {
  console.error(`\n✗ ${issues.length} audit issue(s):`);
  issues.forEach((i) => console.error("  - " + i));
  process.exit(1);
}
console.log("✓ Audit clean.");

// ── Confirm ids exist in DB (catches hallucinated slugs) ──
const ids = rows.map((r) => r.id);
const { data: existingRows, error: exErr } = await supabase
  .from("destinations")
  .select("id, crowd_calendar")
  .in("id", ids);
if (exErr) { console.error("existence query failed:", exErr.message); process.exit(1); }
const existing = new Map((existingRows ?? []).map((d) => [d.id, d.crowd_calendar]));
const unknown = ids.filter((id) => !existing.has(id));
if (unknown.length) {
  console.error(`\n✗ ${unknown.length} id(s) not in destinations table:`, unknown.join(", "));
  process.exit(1);
}

// ── Preview distribution ──
const withPeak = rows.filter((r) => r.peak_months.length > 0).length;
console.log(`\nDestinations with a crowd peak: ${withPeak}/${rows.length} (rest = honest no-peak [])`);

if (!COMMIT) {
  console.log("\nDry run. Sample:");
  rows.slice(0, 5).forEach((r) =>
    console.log(`  ${r.id}: peak=[${r.peak_months}] quiet=[${r.quiet_months}] — ${r.note ?? ""}`));
  console.log("\nRe-run with --commit to write.");
  process.exit(0);
}

// ── Apply (merge into existing crowd_calendar) ──
let ok = 0, fail = 0;
for (const r of rows) {
  const prev = existing.get(r.id) && typeof existing.get(r.id) === "object" ? existing.get(r.id) : {};
  const merged = {
    ...prev,
    peak_months: r.peak_months,
    quiet_months: r.quiet_months,
    ...(r.note ? { note: r.note } : prev.note ? { note: prev.note } : {}),
  };
  const { error } = await supabase
    .from("destinations")
    .update({ crowd_calendar: merged, updated_at: new Date().toISOString() })
    .eq("id", r.id);
  if (error) { console.error(`  ✗ ${r.id}: ${error.message}`); fail++; }
  else ok++;
}
console.log(`\n✓ Applied ${ok} rows. ${fail ? `✗ ${fail} failed.` : ""}`);
process.exit(fail ? 1 : 0);

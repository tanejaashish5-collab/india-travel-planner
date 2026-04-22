#!/usr/bin/env node
/**
 * Apply data/solo-female-note-rewrites.json to destinations.solo_female_note.
 * Each rewrite is a surgical find/replace — strips unverified property names
 * while preserving the structural advice (state-tourism brand, operator type).
 *
 * Usage:
 *   node scripts/rewrite-solo-female-notes.mjs               # dry
 *   node scripts/rewrite-solo-female-notes.mjs --commit      # apply + re-audit
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { execSync } from "child_process";

config({ path: "apps/web/.env.local" });

const COMMIT = process.argv.includes("--commit");
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const { rewrites } = JSON.parse(
  readFileSync("data/solo-female-note-rewrites.json", "utf-8")
);

console.log(`${rewrites.length} solo-female note rewrites (${COMMIT ? "COMMIT" : "DRY"})`);

let ok = 0, skipped = 0, failed = 0;
for (const r of rewrites) {
  const { data: row, error } = await supabase
    .from("destinations")
    .select("id, solo_female_note")
    .eq("id", r.id)
    .maybeSingle();
  if (error || !row) { console.log(`  ? ${r.id}: not found`); failed++; continue; }
  if (!row.solo_female_note?.includes(r.find)) {
    console.log(`  - ${r.id}: find-string already absent (already patched or drifted)`);
    skipped++;
    continue;
  }
  const next = row.solo_female_note.replace(r.find, r.replace);
  console.log(`  ${COMMIT ? "✓" : "would update"} ${r.id}`);
  if (!COMMIT) { ok++; continue; }
  const now = new Date().toISOString();
  // Rewriting trust-sensitive prose IS a review — bump content_reviewed_at
  // so the freshness pipeline (news-sweep, mark-reviewed --only-stale) knows
  // these rows are current. See feedback_data_integrity.md.
  const { error: upErr } = await supabase
    .from("destinations")
    .update({ solo_female_note: next, updated_at: now, content_reviewed_at: now })
    .eq("id", r.id);
  if (upErr) { console.error(`    ✗ ${upErr.message}`); failed++; continue; }
  ok++;
}

console.log(`\n${ok} ok, ${skipped} skipped, ${failed} failed`);

if (COMMIT && ok > 0) {
  console.log("\nRe-running audit to confirm…");
  try {
    execSync("node scripts/audit-solo-female-notes.mjs", { stdio: "inherit" });
  } catch {
    console.error("Audit non-zero — inspect manually.");
  }
}

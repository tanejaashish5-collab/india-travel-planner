#!/usr/bin/env node
/**
 * Apply data/blog-eatery-rewrites.json to articles.content.
 * Strips unverified eatery names; preserves structural guidance via
 * pattern-pointers to destination eats sections.
 *
 * Usage:
 *   node scripts/rewrite-blog-eateries.mjs           # dry
 *   node scripts/rewrite-blog-eateries.mjs --commit  # apply + re-audit
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
  readFileSync("data/blog-eatery-rewrites.json", "utf-8")
);

console.log(`${rewrites.length} blog-eatery rewrites (${COMMIT ? "COMMIT" : "DRY"})`);

// Group by slug
const bySlug = new Map();
for (const r of rewrites) {
  if (!bySlug.has(r.slug)) bySlug.set(r.slug, []);
  bySlug.get(r.slug).push(r);
}

let ok = 0, skipped = 0, failed = 0;
for (const [slug, patches] of bySlug) {
  const { data: row, error } = await supabase
    .from("articles")
    .select("content")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !row) { console.log(`  ? ${slug}: not found`); failed++; continue; }

  let next = row.content;
  let applied = 0, missing = 0;
  for (const p of patches) {
    if (!next.includes(p.find)) { missing++; continue; }
    next = next.replace(p.find, p.replace);
    applied++;
  }
  if (!applied) { console.log(`  - ${slug}: all ${patches.length} find-strings absent (drifted)`); skipped++; continue; }
  console.log(`  ${COMMIT ? "✓" : "would update"} ${slug} (${applied}/${patches.length} patches${missing ? `, ${missing} drifted` : ""})`);
  if (!COMMIT) { ok++; continue; }
  const { error: upErr } = await supabase
    .from("articles")
    .update({ content: next, updated_at: new Date().toISOString() })
    .eq("slug", slug);
  if (upErr) { console.error(`    ✗ ${upErr.message}`); failed++; continue; }
  ok++;
}

console.log(`\n${ok} ok, ${skipped} skipped, ${failed} failed`);

if (COMMIT && ok > 0) {
  console.log("\nRe-running audit to confirm…");
  try {
    execSync("node scripts/audit-blog-eateries.mjs", { stdio: "inherit" });
  } catch {
    console.error("Audit non-zero — inspect manually.");
  }
}

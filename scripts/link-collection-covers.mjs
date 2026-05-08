#!/usr/bin/env node
/**
 * Idempotent: scan collections.cover_video, find rows where it's null AND a
 * matching local video exists in /videos/ (either `coll-<id>.mp4` or
 * `<id>.mp4`), set the column, then print a coverage summary.
 *
 * Run after sync-assets.mjs / upload-videos.mjs so every Cowork drop
 * automatically wires its newly-rendered cover videos into the DB. No CLI
 * flag needed — the linker only writes when there's a matching local file
 * AND the column is currently null, so re-running is a no-op.
 *
 * Usage:
 *   node scripts/link-collection-covers.mjs           # apply (default — idempotent)
 *   node scripts/link-collection-covers.mjs --dry     # report only
 */
import { createClient } from "@supabase/supabase-js";
import { readdirSync } from "fs";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const DRY = process.argv.includes("--dry");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local");
  process.exit(1);
}
const sb = createClient(url, key);

const localVideos = new Set(
  readdirSync("videos").filter((f) => f.endsWith(".mp4")).map((f) => f.replace(/\.mp4$/, ""))
);

const { data: cols, error } = await sb.from("collections").select("id, name, cover_video");
if (error) {
  console.error("collections fetch failed:", error.message);
  process.exit(1);
}

const total = cols.length;
const alreadySet = cols.filter((c) => c.cover_video).length;

const candidates = [];
for (const c of cols) {
  if (c.cover_video) continue;
  let videoId = null;
  if (localVideos.has("coll-" + c.id)) videoId = "coll-" + c.id;
  else if (localVideos.has(c.id)) videoId = c.id;
  if (videoId) candidates.push({ id: c.id, name: c.name, video: videoId });
}

console.log(`──── Collection cover coverage ────`);
console.log(`Total collections:     ${total}`);
console.log(`Already linked:        ${alreadySet} (${((alreadySet / total) * 100).toFixed(1)}%)`);
console.log(`Linkable now (local):  ${candidates.length}`);
console.log(`Will remain unlinked:  ${total - alreadySet - candidates.length}`);

if (candidates.length === 0) {
  const pct = ((alreadySet / total) * 100).toFixed(1);
  console.log(`\nNothing to link. Coverage: ${alreadySet}/${total} (${pct}%)`);
  process.exit(0);
}

if (DRY) {
  console.log("\nWould link (dry):");
  for (const r of candidates) console.log(`  ${r.id.padEnd(35)} → ${r.video}`);
  process.exit(0);
}

console.log("\nLinking...");
let updated = 0;
for (const r of candidates) {
  const { error: e } = await sb.from("collections").update({ cover_video: r.video }).eq("id", r.id);
  if (e) {
    console.error(`  ✗ ${r.id}: ${e.message}`);
    continue;
  }
  console.log(`  ✓ ${r.id} → ${r.video}`);
  updated++;
}

const after = alreadySet + updated;
const pct = ((after / total) * 100).toFixed(1);
console.log(`\nLinked ${updated}/${candidates.length}. Coverage: ${after}/${total} (${pct}%)`);

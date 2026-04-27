#!/usr/bin/env node
/**
 * One-shot Cowork-handoff loop.
 *
 *   1. Upload any new local images/videos to R2
 *   2. Re-run the audit and trim image-prompts.csv + video-prompts.csv
 *   3. Print a summary of what shipped + what remains
 *
 * Run after Cowork (or anyone) drops new files in
 *   - apps/web/public/images/{destinations,collections}/
 *   - videos/
 *
 * With --commit, also git-add + commit + push the CSV/version-file changes.
 */
import { spawnSync } from "child_process";
import { readFileSync } from "fs";

const args = process.argv.slice(2);
const COMMIT = args.includes("--commit");

function run(cmd, label) {
  console.log(`\n──── ${label} ────`);
  const t0 = Date.now();
  const res = spawnSync(cmd[0], cmd.slice(1), { stdio: "inherit" });
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  if (res.status !== 0) {
    console.error(`✗ ${label} failed (exit ${res.status}) after ${elapsed}s`);
    process.exit(res.status ?? 1);
  }
  console.log(`✓ ${label} done in ${elapsed}s`);
}

function lineCount(path) {
  try {
    return readFileSync(path, "utf-8").split("\n").filter(Boolean).length - 1;
  } catch {
    return -1;
  }
}

const before = {
  images: lineCount("image-prompts.csv"),
  videos: lineCount("video-prompts.csv"),
};

run(["node", "scripts/upload-images.mjs"], "Upload new images to R2");
run(["node", "scripts/upload-videos.mjs"], "Upload new videos to R2");
run(["node", "scripts/audit-prompts.mjs", "--apply"], "Trim shipped rows from prompt CSVs");

const after = {
  images: lineCount("image-prompts.csv"),
  videos: lineCount("video-prompts.csv"),
};

console.log("\n──── Summary ────");
console.log(`Image queue: ${before.images} → ${after.images} (${before.images - after.images} shipped)`);
console.log(`Video queue: ${before.videos} → ${after.videos} (${before.videos - after.videos} shipped)`);
console.log(`Total remaining: ${after.images + after.videos}`);

if (COMMIT) {
  console.log("\n──── Committing & pushing ────");
  const status = spawnSync("git", ["status", "--porcelain", "image-prompts.csv", "video-prompts.csv", "apps/web/src/lib/video-version.ts"], { encoding: "utf-8" });
  if (!status.stdout.trim()) {
    console.log("Nothing to commit — CSVs and version file are clean.");
    process.exit(0);
  }

  const shipped = (before.images - after.images) + (before.videos - after.videos);
  const msg = `chore(assets): sync ${shipped} new assets from Cowork drop\n\n` +
    `- Images: ${before.images} → ${after.images} (${before.images - after.images} shipped)\n` +
    `- Videos: ${before.videos} → ${after.videos} (${before.videos - after.videos} shipped)\n` +
    `- Remaining queue: ${after.images + after.videos}\n\n` +
    `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`;

  run(["git", "add", "image-prompts.csv", "video-prompts.csv", "apps/web/src/lib/video-version.ts"], "git add");
  run(["git", "commit", "-m", msg], "git commit");
  run(["git", "push", "origin", "main"], "git push");
}

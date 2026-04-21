#!/usr/bin/env node
/**
 * voice-lint.mjs — scans our editorial surfaces for NakshIQ's banned words.
 *
 * Scans:
 *   - data/blog-drafts/*.md
 *   - apps/web/src/messages/en.json · hi.json
 *   - apps/web/src/emails/*.tsx
 *
 * Exits 1 if any banned word appears. Not wired as a pre-commit hook yet —
 * legacy prose in existing tables still has banned words, which would block
 * every commit. Ship as opt-in check first; harden later.
 *
 * Usage:
 *   node scripts/voice-lint.mjs
 *   npm run voice-lint
 */

import { readFileSync } from "fs";
import { globSync } from "fs";
import { readdirSync, statSync } from "fs";
import { join } from "path";

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
];

function walk(dir, out = []) {
  try {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const s = statSync(p);
      if (s.isDirectory()) walk(p, out);
      else out.push(p);
    }
  } catch {}
  return out;
}

const TARGETS = [
  ...walk("data/blog-drafts").filter((p) => p.endsWith(".md")),
  "apps/web/src/messages/en.json",
  "apps/web/src/messages/hi.json",
  ...walk("apps/web/src/emails").filter((p) => p.endsWith(".tsx") || p.endsWith(".ts")),
];

let hits = 0;
for (const file of TARGETS) {
  let content;
  try {
    content = readFileSync(file, "utf-8");
  } catch {
    continue;
  }
  const lower = content.toLowerCase();
  const lineMap = content.split("\n");

  for (const word of BANNED) {
    let idx = 0;
    while ((idx = lower.indexOf(word, idx)) !== -1) {
      const before = content.slice(0, idx);
      const lineNum = before.split("\n").length;
      const lineText = lineMap[lineNum - 1]?.trim() ?? "";
      // Skip if this is the banned-word reference list itself (e.g. voice-lint.mjs, enrich-notes.mjs, PLAYBOOKs).
      // Heuristic: if the line also contains 3+ other banned words, it's the reference list.
      const otherHits = BANNED.filter((w) => w !== word && lineText.toLowerCase().includes(w)).length;
      if (otherHits >= 3) { idx += word.length; continue; }
      console.log(`  ✗ ${file}:${lineNum}  "${word}"`);
      console.log(`      ${lineText.slice(0, 120)}${lineText.length > 120 ? "…" : ""}`);
      hits++;
      idx += word.length;
    }
  }
}

console.log();
if (hits === 0) {
  console.log(`✓ voice-lint clean across ${TARGETS.length} files.`);
  process.exit(0);
}
console.log(`✗ ${hits} banned-word hit(s) across ${TARGETS.length} scanned files.`);
process.exit(1);

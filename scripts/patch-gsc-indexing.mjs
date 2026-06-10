#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/patch-gsc-indexing.mjs — patches today's GSC audit md with the
// Coverage/Indexing block that the Search Analytics API can't return.
//
// The GSC Coverage dashboard (indexed-pages count + 12 "why pages aren't
// indexed" buckets) is UI-only — no public API. Pre-2026-05-27 audits had
// it because a human-driven Chrome session pulled it; the new auto-pull
// (scripts/data-pull.mjs gsc) cannot. Without it, the M2 indexed-pages
// monitor in apps/web/src/app/api/cron/audit-gsc-alerts loses signal.
//
// Workflow:
//   1. Founder opens https://search.google.com/search-console/index
//      (property www.nakshiq.com), reads Indexed + Not indexed counts.
//   2. Founder runs: node scripts/patch-gsc-indexing.mjs --indexed 15900 --not-indexed 9450
//      (optionally --date YYYY-MM-DD to patch a different audit)
//   3. Script appends an "## Indexing Status" block to the audit md.
//   4. Script re-runs build-audit-snapshot.mjs to refresh the JSON the
//      cron monitors read.
//
// Idempotent: replaces the block if it already exists.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);

function arg(name, dflt) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
}

function istToday() {
  const d = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

const date = arg("date", istToday());
const indexedRaw = arg("indexed");
const notIndexedRaw = arg("not-indexed");
// --source inspection-sample → numbers are estimates from the stratified
// URL Inspection sweep (scripts/gsc-inspect-sweep.mjs), not dashboard reads.
// --note adds free text (CI, sample size) to the block footnote.
const source = arg("source", "dashboard");
const note = arg("note", "");

if (!indexedRaw || !notIndexedRaw) {
  console.error("Usage: node scripts/patch-gsc-indexing.mjs --indexed N --not-indexed N [--date YYYY-MM-DD] [--source dashboard|inspection-sample] [--note text]");
  console.error("");
  console.error("Pull these from https://search.google.com/search-console/index (property www.nakshiq.com).");
  console.error("");
  console.error("Examples:");
  console.error("  node scripts/patch-gsc-indexing.mjs --indexed 15900 --not-indexed 9450");
  console.error("  node scripts/patch-gsc-indexing.mjs --date 2026-05-28 --indexed 15.9K --not-indexed 9.45K");
  process.exit(1);
}

function parseCount(s) {
  if (typeof s !== "string") return NaN;
  const trimmed = s.trim().replace(/,/g, "");
  const m = trimmed.match(/^(-?[\d.]+)\s*([kK])?$/);
  if (!m) return NaN;
  return parseFloat(m[1]) * (m[2] ? 1000 : 1);
}

const indexed = parseCount(indexedRaw);
const notIndexed = parseCount(notIndexedRaw);

if (isNaN(indexed) || isNaN(notIndexed)) {
  console.error(`ERR: could not parse counts. Got indexed="${indexedRaw}" not-indexed="${notIndexedRaw}"`);
  process.exit(1);
}
if (indexed < 1000 || indexed > 100000) {
  console.error(`WARN: indexed=${indexed} is outside expected 1K-100K range. Refusing to patch — re-check the GSC dashboard.`);
  process.exit(1);
}

const mdPath = path.join(ROOT, "gsc-audits", `gsc-audit-${date}.md`);
if (!existsSync(mdPath)) {
  console.error(`ERR: no audit md at ${mdPath} — run today's GSC audit first.`);
  process.exit(1);
}

function formatCount(n) {
  return n >= 10000 ? `${(n / 1000).toFixed(1)}K` : n.toLocaleString();
}

const indexedFmt = formatCount(indexed);
const notIndexedFmt = formatCount(notIndexed);
const totalFmt = formatCount(indexed + notIndexed);

const footnote =
  source === "inspection-sample"
    ? `_ESTIMATED from a stratified URL Inspection API sample via \`scripts/gsc-inspect-sweep.mjs\` — sitemap-submitted URLs only, so "Not indexed" runs lower than the dashboard's (which also counts discovered non-sitemap URLs).${note ? ` ${note}.` : ""} Patched via \`scripts/patch-gsc-indexing.mjs\`._`
    : `_Pulled manually from the GSC Coverage dashboard — the Search Analytics API doesn't expose these counts.${note ? ` ${note}.` : ""} Patched via \`scripts/patch-gsc-indexing.mjs\`._`;

const block = `
## Indexing Status

| Bucket               | ${date}    |
|----------------------|-----------:|
| Indexed              | **${indexedFmt}** |
| Not indexed          | ${notIndexedFmt} |
| Total submitted      | ${totalFmt} |

${footnote}
`;

const BLOCK_START = "## Indexing Status";
const BLOCK_END_MARKER = /\n## |\n---\n|$/;

let md = readFileSync(mdPath, "utf8");
const startIdx = md.indexOf(BLOCK_START);

if (startIdx >= 0) {
  const tail = md.slice(startIdx + BLOCK_START.length);
  const endMatch = tail.match(BLOCK_END_MARKER);
  const endIdx = endMatch ? startIdx + BLOCK_START.length + endMatch.index : md.length;
  md = md.slice(0, startIdx) + block.trimStart() + md.slice(endIdx);
  console.log(`✏️  replaced existing Indexing Status block in ${path.relative(ROOT, mdPath)}`);
} else {
  md = md.trimEnd() + "\n\n" + block.trimStart();
  console.log(`✏️  appended Indexing Status block to ${path.relative(ROOT, mdPath)}`);
}

writeFileSync(mdPath, md, "utf8");
console.log(`   indexed=${indexedFmt}, not_indexed=${notIndexedFmt}`);

console.log("\n→ rebuilding audit-snapshots.json so the M2 cron sees fresh data...");
const result = spawnSync("node", ["scripts/build-audit-snapshot.mjs"], {
  cwd: ROOT,
  stdio: "inherit",
});
process.exit(result.status ?? 0);

#!/usr/bin/env node
/**
 * audit-hi-messages.mjs — Programmatic check for transliteration smell in
 * the i18n message file (apps/web/src/messages/hi.json).
 *
 * Sister to audit-hindi-parity.mjs which audits DB-side `translations.hi`
 * on destinations/articles. This one audits the UI strings.
 *
 * Native /hi pages should render Devanagari, not transliterated Hinglish.
 * "Manali ke baare mein" is bad; "मनाली के बारे में" is good. The detector
 * flags Hindi strings where Latin-character density exceeds a threshold —
 * a strong signal that the value never got a native Hindi translation pass.
 *
 * What's expected to pass: short brand tokens like "NakshIQ", "OK", "GO",
 * proper-noun place names that don't transliterate well, numeric-only
 * strings. Anything else with >40% Latin chars is suspicious.
 *
 * Usage:
 *   node scripts/audit-hi-messages.mjs            # full report
 *   node scripts/audit-hi-messages.mjs --strict   # 25% threshold (tighter)
 *
 * No network, no DB writes. Pure file walk.
 */

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const STRICT = args.includes("--strict");
const THRESHOLD = STRICT ? 0.25 : 0.4;

const enPath = path.resolve("apps/web/src/messages/en.json");
const hiPath = path.resolve("apps/web/src/messages/hi.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const hi = JSON.parse(fs.readFileSync(hiPath, "utf8"));

function leaves(o, p = "", out = []) {
  if (o && typeof o === "object" && !Array.isArray(o)) {
    for (const k of Object.keys(o)) leaves(o[k], p ? p + "." + k : k, out);
  } else out.push({ path: p, value: o });
  return out;
}

const enLeaves = new Map(leaves(en).map((x) => [x.path, x.value]));
const hiLeaves = leaves(hi);

const flagged = [];
let cleanCount = 0;
let scanned = 0;

for (const { path: kpath, value } of hiLeaves) {
  if (typeof value !== "string") continue;
  if (value.length < 4) continue;
  scanned++;

  // Count Devanagari chars vs. Latin chars; whitespace/digits/punct excluded.
  const dev = (value.match(/[ऀ-ॿ]/g) || []).length;
  const lat = (value.match(/[A-Za-z]/g) || []).length;
  const meaningful = dev + lat;
  if (meaningful === 0) continue;

  const latinRatio = lat / meaningful;

  if (dev === 0) {
    // Pure Latin string in Hindi file — flag if longer than a brand token.
    if (value.length > 12) {
      flagged.push({ path: kpath, value, latinRatio: 1, reason: "all-Latin (no Devanagari)" });
    }
    continue;
  }

  if (latinRatio > THRESHOLD) {
    flagged.push({ path: kpath, value, latinRatio: Number(latinRatio.toFixed(2)), reason: "high-Latin ratio" });
  } else {
    cleanCount++;
  }
}

console.log(`audit-hi-messages · ${scanned} leaves scanned · threshold ${Math.round(THRESHOLD * 100)}%`);
console.log(`clean (low-Latin Devanagari): ${cleanCount}`);
console.log(`flagged: ${flagged.length}`);
console.log("");

if (flagged.length === 0) {
  console.log("✓ no transliteration smell detected");
  process.exit(0);
}

console.log(`# Flagged keys — review for native Devanagari rewrite\n`);
const grouped = flagged.sort((a, b) => b.latinRatio - a.latinRatio);
for (const f of grouped.slice(0, 40)) {
  const enVal = enLeaves.get(f.path);
  console.log(`  ${f.path}  [${Math.round(f.latinRatio * 100)}% Latin]`);
  console.log(`    en: ${typeof enVal === "string" ? enVal : JSON.stringify(enVal)}`);
  console.log(`    hi: ${f.value}`);
  console.log("");
}
if (grouped.length > 40) console.log(`... and ${grouped.length - 40} more`);

process.exit(flagged.length > 0 ? 1 : 0);

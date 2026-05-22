#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_emit-vs-pairs-block.mjs — Phase 4 of the /vs/ comparison-page
// expansion. Writes apps/web/src/lib/vs-pairs.generated.ts from the validated
// pair list. Merges with any existing generated file so re-runs are additive
// and idempotent (a re-run never shrinks the shipped set).
//
// Usage:  node scripts/_emit-vs-pairs-block.mjs
// Input:  data/cro/vs-validated-<date>.json
// Output: apps/web/src/lib/vs-pairs.generated.ts

import { writeFileSync } from "node:fs";
import { today, readJson, canonKey, extractPairObjects, VS_PAIRS_GEN_TS } from "./_vs-lib.mjs";

const stamp = today();
const validated = readJson(`data/cro/vs-validated-${stamp}.json`);
if (!validated) {
  console.error(`No data/cro/vs-validated-${stamp}.json — run the mine→cluster→validate pipeline first.`);
  process.exit(1);
}

// Merge: existing generated pairs (so re-runs stay additive) + newly validated.
const seen = new Set();
const merged = [];
for (const p of extractPairObjects(VS_PAIRS_GEN_TS)) {
  const k = canonKey(p.id1, p.id2);
  if (seen.has(k)) continue;
  seen.add(k);
  merged.push(p);
}
const existingCount = merged.length;
for (const p of validated.pairs) {
  const k = canonKey(p.id1, p.id2);
  if (seen.has(k)) continue;
  seen.add(k);
  merged.push({ id1: p.id1, id2: p.id2, theme: p.theme });
}
const added = merged.length - existingCount;

// Group by theme in a stable order (mirrors the curated section ordering).
const THEME_ORDER = [
  "hill-stations", "south-hills", "west-hills", "lakes-valleys", "offbeat-valleys",
  "high-altitude", "kashmir", "uttarakhand", "beaches", "kerala", "wildlife",
  "pilgrimage", "spiritual-retreats", "jyotirlinga-circuit", "char-dham",
  "buddhist-circuit", "heritage", "rajasthan", "metros", "northeast", "cross-region",
];
const byTheme = new Map();
for (const p of merged) {
  if (!byTheme.has(p.theme)) byTheme.set(p.theme, []);
  byTheme.get(p.theme).push(p);
}
const orderedThemes = [...byTheme.keys()].sort((a, b) => {
  const ia = THEME_ORDER.indexOf(a), ib = THEME_ORDER.indexOf(b);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
});

const lines = [];
for (const theme of orderedThemes) {
  const ps = byTheme.get(theme);
  lines.push(`  // ─── ${theme} (${ps.length}) ───`);
  for (const p of ps) {
    lines.push(`  { id1: ${JSON.stringify(p.id1)}, id2: ${JSON.stringify(p.id2)}, theme: ${JSON.stringify(p.theme)} },`);
  }
}

const out = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Machine-written /vs/ comparison pairs, spread into VS_PAIRS by vs-pairs.ts.
// Source: GSC demand-mined comparison queries + region/type cluster fill.
// Pipeline: scripts/_mine-vs-queries.mjs -> _gen-vs-clusters.mjs ->
//   _validate-vs-pairs.mjs -> _emit-vs-pairs-block.mjs
// Generated: ${stamp} — ${merged.length} pairs.

export const VS_PAIRS_GENERATED: { id1: string; id2: string; theme: string }[] = [
${lines.join("\n")}
];
`;

writeFileSync(VS_PAIRS_GEN_TS, out);
console.log(`→ wrote ${VS_PAIRS_GEN_TS}`);
console.log(`  ${merged.length} generated pairs total (${added} new this run, ${existingCount} pre-existing)`);
console.log(`  themes: ${orderedThemes.map((t) => `${t}:${byTheme.get(t).length}`).join("  ")}`);

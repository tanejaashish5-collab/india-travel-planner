#!/usr/bin/env node
/* eslint-disable no-console */
// One-shot drafter for tranche 2 of the title-override pipeline.
// Drafts 10 entries grounded in data/cro/grounding-2026-05-28.json,
// validates char budgets, and appends them to data/cro/title-overrides.csv
// as pending (founder reviews via _build-override-review.mjs → applies).

import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CSV = path.join(ROOT, "data", "cro", "title-overrides.csv");

const TITLE_MAX = 50;
const META_MAX = 155;
function visualLen(s) {
  let n = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x0900 && cp <= 0x0903) || (cp >= 0x093a && cp <= 0x094f) ||
        (cp >= 0x0951 && cp <= 0x0957) || (cp >= 0x0962 && cp <= 0x0963)) continue;
    n++;
  }
  return n;
}
function csvCell(v) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const entries = [
  {
    destination_id: "darjeeling", month: "may", locale: "hi",
    title: "दार्जिलिंग में मई: 14–22°C, धुंध और भीड़",
    meta: "पर्वत के दृश्य धुंधले हो जाते हैं, स्कूल छुट्टियों की भीड़ Mall Road पैक करती है। चाय बगान हरे — माहौल गरम। verdict: 3/5।",
  },
  {
    destination_id: "landour", month: "june", locale: "en",
    title: "Landour in June: monsoon arrives mid-month",
    meta: "Pre-monsoon 22–30°C until the second week, then clouds roll through Char Dukan and visibility collapses. Quieter than Mussoorie's siege. Verdict: 3/5.",
  },
  {
    destination_id: "mussoorie", month: "may", locale: "en",
    title: "Mussoorie in May: 14–26°C, Mall Road siege",
    meta: "Weather's mild — Mall Road is not. 80–100K weekend footfall, rates double, traffic stacks for hours. Try Dhanaulti or Landour. Verdict: 2/5.",
  },
  {
    destination_id: "igatpuri", month: "june", locale: "hi",
    title: "इगतपुरी में जून: मानसून, झरने वापस",
    meta: "जून 7-12 के बीच दक्षिण-पश्चिम मानसून पहुँचता है — Tringalwadi Falls और Camel Valley सक्रिय, सहयाद्री हरी। ट्रेल पर जोंक। verdict: 4/5।",
  },
  {
    destination_id: "ajmer", month: "may", locale: "en",
    title: "Ajmer in May: 30–43°C, brutal heat",
    meta: "42–45°C regularly. Outdoor sightseeing biologically stops working midday. The Dargah interior stays cool; everything else is endurance. Verdict: 1/5.",
  },
  {
    destination_id: "pachmarhi", month: "june", locale: "en",
    title: "Pachmarhi in June: monsoon hasn't committed",
    meta: "Humidity builds, leeches arrive before the rain justifies them. Tiger reserves start their monsoon closure rotation. Wait for July. Verdict: 2/5.",
  },
  {
    destination_id: "gulmarg", month: "june", locale: "en",
    title: "Gulmarg in June: 12–25°C, meadows in bloom",
    meta: "Meadow rolls green and flower-carpeted, gondola Phase 1+2 running, golf course open. Heavy domestic crowds — book early. Verdict: 5/5.",
  },
  {
    destination_id: "bhandardara", month: "june", locale: "en",
    title: "Bhandardara in June: fireflies + first rain",
    meta: "First 10 days hold the firefly tail; Arthur Lake refills, Umbrella Falls cascading by month-end. Sahyadri's most magical week. Verdict: 5/5.",
  },
  {
    destination_id: "hogenakkal", month: "may", locale: "en",
    title: "Hogenakkal in May: 26–38°C, falls are gone",
    meta: "Cauvery at dry-season floor, falls reduced to a trickle, 36–38°C midday. Pre-monsoon storms don't sustain flow. Wait for August. Verdict: 1/5.",
  },
  {
    destination_id: "varkala", month: "june", locale: "en",
    title: "Varkala in June: monsoon shuts the cliffs",
    meta: "700–900mm rain across 22–25 wet days. Papanasam Beach forbidden, cliff erosion danger zone, shacks shut. Wait for October. Verdict: 1/5.",
  },
];

let errors = 0;
for (const e of entries) {
  const t = visualLen(e.title);
  const m = visualLen(e.meta);
  const tOK = t <= TITLE_MAX;
  const mOK = m <= META_MAX;
  if (!tOK || !mOK) errors++;
  console.log(`${tOK ? "✓" : "✗"} title ${String(t).padStart(2)}/${TITLE_MAX}  ${mOK ? "✓" : "✗"} meta ${String(m).padStart(3)}/${META_MAX}  ${e.destination_id}/${e.month}/${e.locale}`);
}
if (errors > 0) {
  console.error(`\n✗ ${errors} entries over budget — fix before append.`);
  process.exit(1);
}

const existing = readFileSync(CSV, "utf8");
const existingKeys = new Set();
for (const r of existing.split("\n").slice(1)) {
  const m = r.match(/^([^,]+),([^,]+),([^,]+),/);
  if (m) existingKeys.add(`${m[1]}|${m[2]}|${m[3]}`);
}
const toAppend = entries.filter(e => !existingKeys.has(`${e.destination_id}|${e.month}|${e.locale}`));
if (toAppend.length === 0) {
  console.log("\n— nothing new to append (all 10 already in CSV)");
  process.exit(0);
}

const rows = toAppend.map(e => [e.destination_id, e.month, e.locale, e.title, e.meta, "", ""].map(csvCell).join(","));
const needsNl = !existing.endsWith("\n");
appendFileSync(CSV, (needsNl ? "\n" : "") + rows.join("\n") + "\n", "utf8");
console.log(`\n✓ appended ${toAppend.length} entries to ${path.relative(ROOT, CSV)} as pending`);
console.log("→ next: node scripts/_build-override-review.mjs   # founder review draft");
console.log("→ then: node scripts/apply-title-overrides.mjs --commit --revalidate   # apply + flush ISR");

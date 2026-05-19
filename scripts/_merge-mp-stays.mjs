#!/usr/bin/env node
/* eslint-disable no-console */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const STAYS_DIR = path.join(ROOT, "data/research/stays-per-dest");
const PICKS_DIR = path.join(ROOT, "data/research/stays-picks-per-dest");

const stayFiles = readdirSync(STAYS_DIR).filter((f) => f.startsWith("madhya-pradesh-") && f.endsWith(".json"));
const pickFiles = readdirSync(PICKS_DIR).filter((f) => f.startsWith("madhya-pradesh-") && f.endsWith(".json"));

const allStays = [];
const allPickVerdicts = [];
const stayCountByDest = {};
const verdictCounts = { keep_existing: 0, replace: 0, honest_scarcity: 0 };

for (const f of stayFiles.sort()) {
  const rows = JSON.parse(readFileSync(path.join(STAYS_DIR, f), "utf-8"));
  for (const r of rows) {
    allStays.push(r);
    stayCountByDest[r.destination_id] = (stayCountByDest[r.destination_id] ?? 0) + 1;
  }
}
for (const f of pickFiles.sort()) {
  const rows = JSON.parse(readFileSync(path.join(PICKS_DIR, f), "utf-8"));
  for (const r of rows) {
    allPickVerdicts.push(r);
    verdictCounts[r.verdict] = (verdictCounts[r.verdict] ?? 0) + 1;
  }
}

console.log(`Stays: ${allStays.length} rows from ${stayFiles.length} files (${Object.keys(stayCountByDest).length} dests)`);
console.log(`Picks: ${allPickVerdicts.length} verdicts from ${pickFiles.length} files`);
console.log(`Verdict breakdown: ${JSON.stringify(verdictCounts)}`);

writeFileSync(
  path.join(ROOT, "data/research/stays/madhya-pradesh-new-stays-2026-05-19.json"),
  JSON.stringify(allStays, null, 2),
);
writeFileSync(
  path.join(ROOT, "data/research/stays-audit/madhya-pradesh-replacements-2026-05-19.json"),
  JSON.stringify({ metadata: { state: "madhya-pradesh", date: "2026-05-19", total_picks: allPickVerdicts.length, verdict_counts: verdictCounts }, task_a_results: allPickVerdicts }, null, 2),
);

console.log("\nStays per dest:");
for (const d of Object.keys(stayCountByDest).sort()) console.log(`  ${d.padEnd(20)} ${stayCountByDest[d]}`);

const MP_DESTS = ["bandhavgarh", "bhimbetka", "bhopal", "gwalior", "jabalpur", "kanha", "khajuraho", "mandu", "omkareshwar", "orchha", "pachmarhi", "sanchi", "ujjain"];
const ZERO = [];
for (const d of MP_DESTS) if (!stayCountByDest[d]) ZERO.push(d);
console.log(`\nDests with 0 stays: ${ZERO.length}`);
for (const d of ZERO) console.log(`  ${d}`);

console.log("\n✓ Wrote merged files");

#!/usr/bin/env node
/* eslint-disable no-console */
// Merge per-dest stays + picks files into canonical maharashtra stays files.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const STAYS_DIR = path.join(ROOT, "data/research/stays-per-dest");
const PICKS_DIR = path.join(ROOT, "data/research/stays-picks-per-dest");

const stayFiles = readdirSync(STAYS_DIR).filter((f) => f.startsWith("maharashtra-") && f.endsWith(".json"));
const pickFiles = readdirSync(PICKS_DIR).filter((f) => f.startsWith("maharashtra-") && f.endsWith(".json"));

const allStays = [];
const allPickVerdicts = [];
const stayCountByDest = {};
const verdictCounts = { keep_existing: 0, replace: 0, honest_scarcity: 0 };

for (const f of stayFiles.sort()) {
  const rows = JSON.parse(readFileSync(path.join(STAYS_DIR, f), "utf-8"));
  if (!Array.isArray(rows)) throw new Error(`${f} not array`);
  for (const r of rows) {
    allStays.push(r);
    stayCountByDest[r.destination_id] = (stayCountByDest[r.destination_id] ?? 0) + 1;
  }
}

for (const f of pickFiles.sort()) {
  const rows = JSON.parse(readFileSync(path.join(PICKS_DIR, f), "utf-8"));
  if (!Array.isArray(rows)) throw new Error(`${f} not array`);
  for (const r of rows) {
    allPickVerdicts.push(r);
    verdictCounts[r.verdict] = (verdictCounts[r.verdict] ?? 0) + 1;
  }
}

console.log(`Stays: ${allStays.length} rows from ${stayFiles.length} files (${Object.keys(stayCountByDest).length} dests)`);
console.log(`Picks: ${allPickVerdicts.length} verdicts from ${pickFiles.length} files`);
console.log(`Verdict breakdown: ${JSON.stringify(verdictCounts)}`);

// Write canonical files matching Gujarat format
writeFileSync(
  path.join(ROOT, "data/research/stays/maharashtra-new-stays-2026-05-18.json"),
  JSON.stringify(allStays, null, 2),
);

writeFileSync(
  path.join(ROOT, "data/research/stays-audit/maharashtra-replacements-2026-05-18.json"),
  JSON.stringify(
    {
      metadata: {
        state: "maharashtra",
        date: "2026-05-18",
        total_picks: allPickVerdicts.length,
        verdict_counts: verdictCounts,
      },
      task_a_results: allPickVerdicts,
    },
    null,
    2,
  ),
);

// Per-dest stays counts (sorted)
console.log("\nStays per dest:");
const sorted = Object.keys(stayCountByDest).sort();
for (const d of sorted) console.log(`  ${d.padEnd(28)} ${stayCountByDest[d]}`);

// Dests with 0 stays
const ZERO_DESTS = [];
const MAHARASHTRA_DESTS = ["ajanta-caves", "alibaug", "amboli", "astavinayak-circuit", "aurangabad", "bhandardara", "bhimashankar", "daulatabad", "elephanta-caves", "ellora-caves", "ganpatipule", "harihareshwar", "igatpuri", "kanheri-caves", "karla-bhaja-caves", "kashid", "khandala", "kolad", "kolhapur", "lenyadri", "lonar-crater", "lonavala", "mahabaleshwar", "mahad-raigad", "malvan", "matheran", "morgaon", "mumbai", "murud-janjira", "nagpur", "nashik", "ozar", "pali-raigad", "panchgani", "pench-maharashtra", "pune", "raigad-fort", "ranjangaon", "ratnagiri", "satara", "shirdi", "siddhatek", "tadoba", "tarkarli", "theur", "trimbakeshwar"];
for (const d of MAHARASHTRA_DESTS) if (!stayCountByDest[d]) ZERO_DESTS.push(d);
console.log(`\nDests with 0 stays (honest scarcity): ${ZERO_DESTS.length}`);
for (const d of ZERO_DESTS) console.log(`  ${d}`);

console.log("\n✓ Wrote:");
console.log("  data/research/stays/maharashtra-new-stays-2026-05-18.json");
console.log("  data/research/stays-audit/maharashtra-replacements-2026-05-18.json");

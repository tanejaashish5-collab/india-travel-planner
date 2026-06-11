#!/usr/bin/env node
// Filter the MastersUnion index for likely NakshIQ-relevant videos and chunk into agent-sized JSON files.
// Heuristic only — agents do the real relevance call. We just drop obvious internal/school-promo noise
// to control token cost.

import fs from "node:fs";
import path from "node:path";

const indexPath = process.argv[2];
const outDir = process.argv[3];
if (!indexPath || !outDir) {
  console.error("usage: chunk-youtube-for-agents.mjs <index.json> <out-dir>");
  process.exit(1);
}

const records = JSON.parse(fs.readFileSync(indexPath, "utf8"));
fs.mkdirSync(outDir, { recursive: true });

// Drop patterns — obvious internal / school-promo / classroom format
const DROP_PATTERNS = [
  /undergraduate programme/i,
  /what.?s it like to study/i,
  /life at masters.? union/i,
  /CEO challenge.*ep\.\s*\d/i,
  /class 11.*12/i,
  /apply now/i,
  /admissions? (open|deadline)/i,
  /masters.? union announce/i,
  /campus tour/i,
  /open house/i,
  /placement (week|report|stats)/i,
  /scholarship/i,
  /^shorts?:/i,
  /#shorts/i,
];

// Hard-keep patterns — strong NakshIQ relevance signals
const KEEP_PATTERNS = [
  /travel|tourism|hotel|hospitality|airbnb|oyo|makemytrip|cleartrip|goibibo|booking\.com|easemytrip/i,
  /seo|search engine|google ranking|organic (traffic|growth)|content (strategy|marketing)/i,
  /D2C|direct.to.consumer|consumer brand|brand building/i,
  /audience build|email list|newsletter|community/i,
  /india.?(consumer|market|economy|customer)/i,
  /content (creator|brand|business)|creator economy/i,
  /AI (content|tool|moat|defensibility|product)/i,
  /distribution|whatsapp|vernacular|tier.?2|tier.?3/i,
  /trust|verification|fake review|fraud/i,
  /booking|reservation|review platform/i,
  /\bUX\b|product (design|market fit)|growth (loop|hack|engine)/i,
];

function classify(rec) {
  const t = `${rec.title} ${rec.description}`;
  if (!rec.has_transcript) return { keep: false, reason: "no transcript" };
  if (rec.transcript_word_count < 500) return { keep: false, reason: "transcript too short" };
  for (const p of DROP_PATTERNS) if (p.test(t)) return { keep: false, reason: `drop: ${p}` };
  for (const p of KEEP_PATTERNS) if (p.test(t)) return { keep: true, reason: `hard-keep: ${p}` };
  // soft keep: long-form podcast / interview / masterclass — likely substantive
  if (rec.duration_sec > 20 * 60 && /(masterclass|how to build|how.* scaled|founder|podcast|series\s*c|interview|conversation)/i.test(t)) {
    return { keep: true, reason: "soft-keep: long-form founder content" };
  }
  // soft drop: short videos with no relevance signal
  if (rec.duration_sec < 10 * 60) return { keep: false, reason: "short + no signal" };
  // default keep medium-form unless clearly internal
  return { keep: true, reason: "default-keep medium-form" };
}

const kept = [];
const dropped = [];
for (const r of records) {
  const c = classify(r);
  (c.keep ? kept : dropped).push({ ...r, _classification: c });
}

// Trim transcripts to first 5000 words per video — agents get plenty of signal,
// token cost stays sane. Full transcript stays in index.json if a deeper read is needed.
function trim(rec) {
  const TRIM = 3000;
  const words = rec.transcript_text.split(/\s+/);
  const trimmed = words.slice(0, TRIM).join(" ");
  return {
    id: rec.id,
    url: rec.url,
    title: rec.title,
    description: rec.description.slice(0, 500),
    upload_date: rec.upload_date,
    duration_min: Math.round(rec.duration_sec / 60),
    view_count: rec.view_count,
    transcript_excerpt: trimmed,
    transcript_truncated: words.length > TRIM,
    full_word_count: words.length,
  };
}

const trimmedKept = kept.map(trim);

// Split into N chunks
const N_CHUNKS = 6;
const perChunk = Math.ceil(trimmedKept.length / N_CHUNKS);
for (let i = 0; i < N_CHUNKS; i++) {
  const slice = trimmedKept.slice(i * perChunk, (i + 1) * perChunk);
  fs.writeFileSync(path.join(outDir, `chunk-${i + 1}.json`), JSON.stringify(slice, null, 2));
}

// Drop log for transparency
fs.writeFileSync(
  path.join(outDir, "dropped.json"),
  JSON.stringify(dropped.map((r) => ({ id: r.id, title: r.title, reason: r._classification.reason })), null, 2),
);

console.log(`kept ${kept.length} | dropped ${dropped.length}`);
console.log(`split into ${N_CHUNKS} chunks of ~${perChunk} videos each`);
const totalWordsKept = trimmedKept.reduce((s, r) => s + r.transcript_excerpt.split(/\s+/).length, 0);
console.log(`total kept-excerpt words: ${totalWordsKept.toLocaleString()}`);

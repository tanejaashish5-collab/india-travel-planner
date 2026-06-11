#!/usr/bin/env node
// Walk a yt-dlp dump dir, pair .info.json + .srt per video, emit clean index.json.
// Usage: node scripts/build-youtube-index.mjs <dump-dir>

import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: build-youtube-index.mjs <dump-dir>");
  process.exit(1);
}

const files = fs.readdirSync(dir);
const byId = new Map();

for (const f of files) {
  const m = f.match(/^(\d{8})_([A-Za-z0-9_-]{6,})\.(info\.json|en\.srt)$/);
  if (!m) continue;
  const [, date, id, ext] = m;
  if (!byId.has(id)) byId.set(id, { id, upload_date: date });
  const rec = byId.get(id);
  rec[ext === "info.json" ? "info_path" : "srt_path"] = path.join(dir, f);
}

function srtToText(srtPath) {
  if (!srtPath || !fs.existsSync(srtPath)) return { text: "", timestamped: [] };
  const raw = fs.readFileSync(srtPath, "utf8");
  const blocks = raw.split(/\n\n+/);
  const timestamped = [];
  const textParts = [];
  for (const b of blocks) {
    const lines = b.split("\n").filter(Boolean);
    if (lines.length < 2) continue;
    const tsLine = lines.find((l) => l.includes("-->"));
    if (!tsLine) continue;
    const start = tsLine.split("-->")[0].trim().split(",")[0]; // HH:MM:SS
    const textLines = lines.filter((l) => l !== tsLine && !/^\d+$/.test(l.trim()));
    const text = textLines.join(" ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!text) continue;
    timestamped.push({ t: start, text });
    textParts.push(text);
  }
  return { text: textParts.join(" "), timestamped };
}

const records = [];
for (const [, rec] of byId) {
  if (!rec.info_path) continue;
  let info;
  try {
    info = JSON.parse(fs.readFileSync(rec.info_path, "utf8"));
  } catch {
    continue;
  }
  const { text, timestamped } = srtToText(rec.srt_path);
  records.push({
    id: rec.id,
    url: `https://youtu.be/${rec.id}`,
    title: info.title || "",
    description: (info.description || "").slice(0, 2000),
    upload_date: rec.upload_date,
    duration_sec: info.duration || 0,
    view_count: info.view_count || 0,
    like_count: info.like_count || 0,
    has_transcript: timestamped.length > 0,
    transcript_word_count: text ? text.split(/\s+/).length : 0,
    transcript_text: text,
    transcript_timestamped: timestamped,
  });
}

records.sort((a, b) => (b.upload_date || "").localeCompare(a.upload_date || ""));

const outPath = path.join(dir, "index.json");
fs.writeFileSync(outPath, JSON.stringify(records, null, 2));

const totalWords = records.reduce((s, r) => s + r.transcript_word_count, 0);
const withT = records.filter((r) => r.has_transcript).length;
const dates = records.map((r) => r.upload_date).filter(Boolean).sort();

console.log(`wrote ${outPath}`);
console.log(`videos: ${records.length} | with transcript: ${withT} | total words: ${totalWords.toLocaleString()}`);
console.log(`date range: ${dates[0]} → ${dates[dates.length - 1]}`);
console.log(`top 10 by views:`);
records
  .slice()
  .sort((a, b) => b.view_count - a.view_count)
  .slice(0, 10)
  .forEach((r) => console.log(`  ${r.view_count.toLocaleString().padStart(10)} | ${r.id} | ${r.title}`));

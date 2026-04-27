#!/usr/bin/env node
/**
 * Strict audit of image-prompts.csv and video-prompts.csv against
 * local filesystem + Cloudflare R2.
 *
 * "Available" = local file exists AND HEAD on R2 returns 200.
 *
 * Output: writes audit JSON to /tmp/prompts-audit.json and prints summary.
 *   --apply  also rewrites the CSVs in place, removing rows that are AVAILABLE.
 *            Original files are git-tracked, so revert with `git restore` if needed.
 *   --csv    additionally writes /tmp/{image,video}-deletions.csv for review.
 */
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, writeFileSync, existsSync } from "fs";

const APPLY = process.argv.includes("--apply");
const WRITE_CSV = process.argv.includes("--csv");

// --- env ---
const env = {};
for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].trim();
}
const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = env;
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.error("missing R2 creds in apps/web/.env.local");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const r2HeadCache = new Map();
async function r2Head(bucket, key) {
  const cacheKey = `${bucket}/${key}`;
  if (r2HeadCache.has(cacheKey)) return r2HeadCache.get(cacheKey);
  let result = false;
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    result = true;
  } catch {
    result = false;
  }
  r2HeadCache.set(cacheKey, result);
  return result;
}

// --- minimal CSV parser that respects quoted fields ---
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQ = false; }
      else { field += c; }
    } else {
      if (c === '"') { inQ = true; }
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === "\r") { /* skip */ }
      else { field += c; }
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
}

function quoteCSV(v) {
  if (v == null) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

// --- image audit ---
async function auditImages() {
  const text = readFileSync("image-prompts.csv", "utf-8");
  const rows = parseCSV(text);
  const header = rows[0];
  const data = rows.slice(1);

  console.log(`\n=== IMAGES: ${data.length} rows ===`);

  const results = [];
  let done = 0;
  const concurrency = 12;
  let cursor = 0;

  async function worker() {
    while (cursor < data.length) {
      const idx = cursor++;
      const row = data[idx];
      const [id, name, state, type] = row;
      const isCollection = /^collection/.test(type || "");
      const subdir = isCollection ? "collections" : "destinations";
      const exts = ["jpg", "png", "webp", "jpeg"];

      let localFile = null;
      for (const ext of exts) {
        const p = `apps/web/public/images/${subdir}/${id}.${ext}`;
        if (existsSync(p)) { localFile = p; break; }
      }

      let r2Key = null;
      let onR2 = false;
      if (localFile) {
        const ext = localFile.split(".").pop();
        r2Key = `${subdir}/${id}.${ext}`;
        onR2 = await r2Head("nakshiq-images", r2Key);
      }

      results.push({
        idx,
        id, name, state, type,
        localFile,
        r2Key,
        onR2,
        available: !!localFile && onR2,
      });

      done++;
      if (done % 100 === 0) console.log(`  images: ${done}/${data.length}`);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  results.sort((a, b) => a.idx - b.idx);

  return { header, data, results };
}

// --- video audit ---
async function auditVideos() {
  const text = readFileSync("video-prompts.csv", "utf-8");
  const rows = parseCSV(text);
  const header = rows[0];
  const data = rows.slice(1);

  console.log(`\n=== VIDEOS: ${data.length} rows ===`);

  const results = [];
  let done = 0;
  const concurrency = 12;
  let cursor = 0;

  async function worker() {
    while (cursor < data.length) {
      const idx = cursor++;
      const row = data[idx];
      const [id, name, region, useCase] = row;
      const candidates = [
        `videos/${id}.mp4`,
        `videos/VIDEO_${id}.mp4`,
      ];
      let localFile = null;
      for (const p of candidates) {
        if (existsSync(p)) { localFile = p; break; }
      }
      // R2 key always matches the CSV id directly (e.g. "spiti-valley.mp4"),
      // even when the local file has a "VIDEO_" prefix.
      const r2Key = `${id}.mp4`;
      const onR2 = await r2Head("nakshiq-videos", r2Key);

      results.push({
        idx,
        id, name, region, useCase,
        localFile,
        r2Key,
        onR2,
        available: !!localFile && onR2,
      });

      done++;
      if (done % 100 === 0) console.log(`  videos: ${done}/${data.length}`);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  results.sort((a, b) => a.idx - b.idx);

  return { header, data, results };
}

function summarize(label, results) {
  const total = results.length;
  const available = results.filter((r) => r.available).length;
  const localOnly = results.filter((r) => r.localFile && !r.onR2).length;
  const missing = results.filter((r) => !r.localFile).length;
  console.log(`\n[${label}] total=${total}  available=${available}  local-only(not on R2)=${localOnly}  missing=${missing}`);
  console.log(`  → would DELETE ${available} rows from ${label.toLowerCase()}-prompts.csv`);
  console.log(`  → would KEEP ${total - available} rows`);
  return { total, available, localOnly, missing };
}

function sample(label, results, predicate, n = 5) {
  const hits = results.filter(predicate).slice(0, n);
  if (!hits.length) return;
  console.log(`\n  Sample ${label} (${Math.min(n, hits.length)} of ${results.filter(predicate).length}):`);
  for (const h of hits) {
    const reason = h.localFile ? (h.onR2 ? "ok" : "local only") : "no local";
    console.log(`    ${h.id.padEnd(40)} ${reason.padEnd(10)} ${h.localFile || "-"}`);
  }
}

(async () => {
  const img = await auditImages();
  const vid = await auditVideos();

  const imgStats = summarize("IMAGES", img.results);
  sample("AVAILABLE (would delete)", img.results, (r) => r.available);
  sample("LOCAL-ONLY (keep, needs R2 upload)", img.results, (r) => r.localFile && !r.onR2);
  sample("MISSING (keep, needs creation)", img.results, (r) => !r.localFile);

  const vidStats = summarize("VIDEOS", vid.results);
  sample("AVAILABLE (would delete)", vid.results, (r) => r.available);
  sample("LOCAL-ONLY (keep, needs R2 upload)", vid.results, (r) => r.localFile && !r.onR2);
  sample("MISSING (keep, needs creation)", vid.results, (r) => !r.localFile);

  writeFileSync(
    "/tmp/prompts-audit.json",
    JSON.stringify({ images: { stats: imgStats, results: img.results }, videos: { stats: vidStats, results: vid.results } }, null, 2)
  );
  console.log("\nFull audit → /tmp/prompts-audit.json");

  if (WRITE_CSV) {
    const imgDel = img.results.filter((r) => r.available);
    const vidDel = vid.results.filter((r) => r.available);
    writeFileSync(
      "/tmp/image-deletions.csv",
      [img.header.join(","), ...imgDel.map((r) => img.data[r.idx].map(quoteCSV).join(","))].join("\n")
    );
    writeFileSync(
      "/tmp/video-deletions.csv",
      [vid.header.join(","), ...vidDel.map((r) => vid.data[r.idx].map(quoteCSV).join(","))].join("\n")
    );
    console.log("Deletion preview CSVs → /tmp/image-deletions.csv, /tmp/video-deletions.csv");
  }

  if (APPLY) {
    const imgKeep = img.results.filter((r) => !r.available);
    const vidKeep = vid.results.filter((r) => !r.available);
    const imgOut = [img.header.join(","), ...imgKeep.map((r) => img.data[r.idx].map(quoteCSV).join(","))].join("\n") + "\n";
    const vidOut = [vid.header.join(","), ...vidKeep.map((r) => vid.data[r.idx].map(quoteCSV).join(","))].join("\n") + "\n";
    writeFileSync("image-prompts.csv", imgOut);
    writeFileSync("video-prompts.csv", vidOut);
    console.log(`\nAPPLIED — image-prompts.csv now ${imgKeep.length} rows, video-prompts.csv now ${vidKeep.length} rows`);
  }
})();

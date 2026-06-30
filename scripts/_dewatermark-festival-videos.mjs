#!/usr/bin/env node
/**
 * De-watermark Flow/Veo festival celebration clips.
 *
 * Every clip rendered via Flow (Veo 3.1) carries a small "Veo" watermark in
 * the bottom-right corner. This crops the bottom-right 5% (1280x720 ->
 * 1216x684 anchored top-left, which is still exactly 16:9) and rescales back
 * to 1280x720 — removes the watermark with NO blur smudge, slight ~5% zoom.
 *
 * Reads  data/festivals/videos/<slug>.mp4   (watermarked masters)
 * Writes data/festivals/videos-clean/<slug>.mp4
 *
 * Idempotent: skips a clip whose clean output already exists with size > 0.
 * Parallelised (CONC ffmpeg workers).
 *
 * Run: node scripts/_dewatermark-festival-videos.mjs
 */
import { readdirSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const SRC = "data/festivals/videos";
const OUT = "data/festivals/videos-clean";
const CONC = 6;
const CROP = "crop=1216:684:0:0,scale=1280:720";

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter(
  (f) => f.endsWith(".mp4") && !f.startsWith("._") && !f.includes(" 2"),
);
console.log(`Source clips: ${files.length}`);

function ffmpeg(inPath, outPath) {
  return new Promise((resolve) => {
    const args = [
      "-y", "-loglevel", "error",
      "-i", inPath,
      "-vf", CROP,
      "-c:v", "libx264", "-crf", "20", "-preset", "veryfast", "-pix_fmt", "yuv420p",
      "-c:a", "copy",
      "-movflags", "+faststart",
      outPath,
    ];
    const p = spawn("ffmpeg", args);
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("close", (code) => resolve({ code, err }));
  });
}

let done = 0, skipped = 0, failed = 0;
const failures = [];
const queue = [...files];

async function worker() {
  while (queue.length) {
    const f = queue.shift();
    const outPath = join(OUT, f);
    if (existsSync(outPath) && statSync(outPath).size > 0) { skipped++; continue; }
    const { code, err } = await ffmpeg(join(SRC, f), outPath);
    if (code === 0 && existsSync(outPath) && statSync(outPath).size > 0) {
      done++;
      if ((done + skipped) % 25 === 0) console.log(`...${done} done, ${skipped} skipped [${done + skipped + failed}/${files.length}]`);
    } else {
      failed++; failures.push(f);
      console.log(`FAIL ${f}: ${(err || "").trim().split("\n").pop()}`);
    }
  }
}

await Promise.all(Array.from({ length: CONC }, worker));
console.log(`Done: ${done} de-watermarked, ${skipped} already-clean, ${failed} failed`);
if (failures.length) console.log("Failed:\n" + failures.map((k) => "  " + k).join("\n"));

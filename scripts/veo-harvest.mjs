#!/usr/bin/env node
/**
 * veo-harvest.mjs — collect Flow downloads into slug-named destination clips.
 *
 * Flow names its outputs by PROMPT CONTENT, and a batch download arrives as a
 * download.zip whose inner filenames can carry bytes that break `unzip`. Both
 * problems are handled here so the browser session only has to click, never
 * name anything.
 *
 * Run it ONCE PER DESTINATION, right after downloading that destination's
 * batches, while it is still unambiguous which files belong to which place:
 *
 *   node scripts/veo-harvest.mjs <slug>
 *
 * It sweeps every .mp4 and download*.zip out of apps' .playwright-mcp/ download
 * dir, appends them to ~/Desktop/Reports/NakshIQ-Veo-Harvest/<slug>/ numbered
 * from the next free index, and empties the download dir so the next
 * destination starts clean.
 *
 * Numbering starts at 2: "<slug>.mp4" is the clip already in R2, so the new
 * ones are <slug>-2.mp4, <slug>-3.mp4 … matching r2_videos.variant_filename().
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const DL = path.join(REPO, ".playwright-mcp");
const OUT_ROOT = path.join(os.homedir(), "Desktop", "Reports", "NakshIQ-Veo-Harvest");

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error("usage: node scripts/veo-harvest.mjs <destination-slug>");
  process.exit(2);
}

const outDir = path.join(OUT_ROOT, slug);
fs.mkdirSync(outDir, { recursive: true });

/** Highest existing <slug>-N.mp4, so re-runs append instead of overwriting. */
function nextIndex() {
  let max = 1; // <slug>.mp4 lives in R2 and is index 1
  for (const f of fs.readdirSync(outDir)) {
    const m = f.match(new RegExp(`^${slug}-(\\d+)\\.mp4$`));
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

/** Unzip with Python: the inner names can contain bytes `unzip` rejects. */
function extractZip(zipPath, destDir) {
  const py = `
import zipfile, shutil, sys, pathlib
z = zipfile.ZipFile(sys.argv[1]); out = pathlib.Path(sys.argv[2]); n = 0
for i in z.infolist():
    if not i.filename.lower().endswith('.mp4'):
        continue
    n += 1
    with z.open(i) as s, open(out / ('_unz_%03d.mp4' % n), 'wb') as d:
        shutil.copyfileobj(s, d)
print(n)
`;
  return Number(execFileSync("python3", ["-c", py, zipPath, destDir], { encoding: "utf8" }).trim());
}

if (!fs.existsSync(DL)) {
  console.error(`no download dir at ${DL}`);
  process.exit(1);
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "veo-"));
let found = 0;

// 1. zips first (a batch), then loose mp4s (a single x1 render)
for (const f of fs.readdirSync(DL).filter((f) => /\.zip$/i.test(f)).sort()) {
  const n = extractZip(path.join(DL, f), tmp);
  console.log(`  ${f} → ${n} clip(s)`);
  found += n;
  fs.unlinkSync(path.join(DL, f));
}
for (const f of fs.readdirSync(DL).filter((f) => /\.mp4$/i.test(f)).sort()) {
  fs.renameSync(path.join(DL, f), path.join(tmp, `_loose_${f}`));
  found++;
}

if (!found) {
  console.log("nothing to harvest — download dir held no .mp4 or .zip");
  fs.rmSync(tmp, { recursive: true, force: true });
  process.exit(0);
}

// 2. verify each file is a real 9:16 video before it earns a slug name. A
//    truncated or wrong-shape download that reaches R2 would publish as a
//    broken reel, and nothing downstream re-checks dimensions.
let i = nextIndex();
const kept = [];
for (const f of fs.readdirSync(tmp).sort()) {
  const src = path.join(tmp, f);
  let dims;
  try {
    dims = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=width,height", "-of", "csv=p=0", src],
      { encoding: "utf8" }).trim();
  } catch {
    console.log(`  SKIP ${f} — ffprobe could not read it`);
    continue;
  }
  const [w, h] = dims.split(",").map(Number);
  if (!(w && h) || w >= h) {
    console.log(`  SKIP ${f} — ${dims} is not portrait`);
    continue;
  }
  const name = `${slug}-${i++}.mp4`;
  fs.renameSync(src, path.join(outDir, name));
  kept.push(`${name} (${dims})`);
}
fs.rmSync(tmp, { recursive: true, force: true });

console.log(`\n${slug}: kept ${kept.length}`);
for (const k of kept) console.log(`  ${k}`);
const total = fs.readdirSync(outDir).filter((f) => f.endsWith(".mp4")).length;
console.log(`${slug} now has ${total} extra clip(s) → variants count = ${total + 1}`);

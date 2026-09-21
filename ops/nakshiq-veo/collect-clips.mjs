#!/usr/bin/env node
/**
 * collect-clips.mjs — move Flow downloads into beat-named files.
 *
 * Flow names its output by PROMPT CONTENT, and a batch download arrives as a
 * download.zip whose inner filenames can carry bytes that break `unzip` — both
 * documented 2026-09-15 and both handled here, the same way veo-harvest.mjs
 * handles them for the manual path.
 *
 * Pairing is by ORDER against the rows this run marked `generated`, because the
 * downloaded filename tells us nothing reliable. If the counts disagree we
 * collect NOTHING rather than mislabel a clip: a beat pointing at the wrong
 * footage is worse than a beat with no footage, which merely shortens a shot.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const DL = join(HERE, "downloads");
const OUT = join(HERE, "clips");
const QUEUE = join(HERE, "veo_queue.json");

mkdirSync(OUT, { recursive: true });
if (!existsSync(DL)) { console.log("[collect] no downloads dir"); process.exit(0); }

// Unpack any zips with python's zipfile — `unzip` chokes on Flow's inner names.
for (const f of readdirSync(DL).filter((x) => x.endsWith(".zip"))) {
  try {
    execFileSync("python3", ["-c",
      `import zipfile,sys,os
z=zipfile.ZipFile(sys.argv[1])
for i,n in enumerate(z.namelist()):
    if not n.lower().endswith('.mp4'): continue
    with z.open(n) as s, open(os.path.join(sys.argv[2], f'unzipped_{i}.mp4'),'wb') as d:
        d.write(s.read())`, join(DL, f), DL]);
    console.log(`[collect] unpacked ${f}`);
  } catch (e) { console.log(`[collect] could not unpack ${f}: ${e}`); }
}

const mp4s = readdirSync(DL).filter((f) => f.endsWith(".mp4"))
  .map((f) => ({ f, t: statSync(join(DL, f)).mtimeMs }))
  .sort((a, b) => a.t - b.t).map((x) => x.f);

const q = JSON.parse(readFileSync(QUEUE, "utf-8"));
const want = q.filter((r) => r.status === "generated");

if (mp4s.length !== want.length) {
  console.log(`[collect] REFUSING: ${mp4s.length} downloads vs ${want.length} generated rows.`);
  console.log("[collect] pairing is by order, so a mismatch would mislabel clips.");
  process.exit(0);
}

want.forEach((row, i) => {
  renameSync(join(DL, mp4s[i]), join(OUT, row.clip));
  row.status = "collected";
  console.log(`[collect] ${mp4s[i]} -> ${row.clip}`);
});
writeFileSync(QUEUE, JSON.stringify(q, null, 2));
console.log(`[collect] ${want.length} clips named`);

#!/usr/bin/env node
/**
 * intake-named.mjs — take clips that were saved under their BEAT NAME.
 *
 * The safe sibling of intake-manual.mjs. That one pairs by order because a
 * human pasting into Flow gets files named after prompt content; this one
 * matches by filename, so order is irrelevant, a partial batch is fine, and a
 * clip can never land on the wrong beat.
 *
 * An unrecognised filename is REPORTED AND LEFT ALONE, never guessed at. The
 * whole value of this path is that it refuses to infer.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, renameSync, copyFileSync, unlinkSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import os from "os";

const HERE = dirname(fileURLToPath(import.meta.url));
const INBOX = process.env.VEO_INBOX || join(HERE, "inbox");
const OUT = join(HERE, "clips");
const QUEUE = join(HERE, "veo_queue.json");
const DRY = process.argv.includes("--dry");
const SETTLE_S = Number(process.env.VEO_SETTLE_S || 90);

// THE DROP FOLDER. The Cowork session can write into ~/Downloads (through
// Desktop Commander) but cannot reach this folder, while its linked-folder
// access is the reverse -- found by its own pre-flight, 2026-09-21. No single
// tool it has can move a clip from Downloads into inbox/, so it does not try:
// it saves each clip, under its exact name, into DROP, and this LaunchAgent run
// (/bin/bash holds Full Disk Access, so it reads both) collects them.
const DROP = process.env.VEO_DROP || join(os.homedir(), "Downloads", "nakshiq-veo-inbox");

mkdirSync(OUT, { recursive: true });
mkdirSync(INBOX, { recursive: true });
mkdirSync(DROP, { recursive: true });

{
  const known = new Set(JSON.parse(readFileSync(QUEUE, "utf-8")).map((r) => r.clip));
  const gathered = [], strangers = [], waiting = [];
  for (const f of readdirSync(DROP)) {
    if (!/\.(mp4|jpe?g|png)$/i.test(f)) continue;   // v3 reference stills are images
    if (!known.has(f)) { strangers.push(f); continue; }         // never guessed at
    const st = statSync(join(DROP, f));
    if (Date.now() - st.mtimeMs < SETTLE_S * 1000) { waiting.push(f); continue; }
    if (!DRY) {
      try { renameSync(join(DROP, f), join(INBOX, f)); }
      catch { copyFileSync(join(DROP, f), join(INBOX, f)); unlinkSync(join(DROP, f)); }
    }
    gathered.push(f);
  }
  if (gathered.length) console.log(`[named] ${DRY ? "would gather" : "gathered"} ${gathered.length} clip(s) from ${DROP}`);
  if (waiting.length) console.log(`[named] ${waiting.length} clip(s) in the drop folder still settling, left for the next run`);
  if (strangers.length) console.log(`[named] ${strangers.length} .mp4 in the drop folder match no queued clip — LEFT IN PLACE: ${strangers.slice(0, 5).join(", ")}`);
}

// Flow's batch zips break `unzip`; python's zipfile does not care. Inner names
// are preserved here because under this contract the NAME is the identity.
for (const f of readdirSync(INBOX).filter((x) => x.toLowerCase().endsWith(".zip"))) {
  if (DRY) { console.log(`[named] would unpack ${f}`); continue; }
  try {
    execFileSync("python3", ["-c",
      `import zipfile,sys,os
z=zipfile.ZipFile(sys.argv[1])
for n in z.namelist():
    if not n.lower().endswith('.mp4'): continue
    out=os.path.join(sys.argv[2], os.path.basename(n))
    if os.path.exists(out): continue
    with z.open(n) as s, open(out,'wb') as d: d.write(s.read())`, join(INBOX, f), INBOX]);
    console.log(`[named] unpacked ${f}`);
  } catch (e) { console.log(`[named] could not unpack ${f}: ${String(e).slice(0, 90)}`); }
}

// FIRST FRAME MUST BE ITS OWN START STILL (2026-11-08). Cowork's 11-07 run saved three videos made
// from the WRONG start frame under correct names: namdapha's opener was Rajahmundry's ghat, and
// rajahmundry + pushkar s1 were both Patna's skip-month scene. The name check passes; the picture is
// another place. A frames-mode take opens on its start still: across 176 good takes the first frame
// differed from it by 1.5-12.8 (mean grey-level gap on a 36x64 thumbnail, 0-255); the three swaps
// were 87-92. Above MAX_FRAME_DIFF the take is refused: the file goes to _wrong_frame/, the row goes
// back to pending, and the next export asks for it again. If the gap cannot be measured, the take is
// kept with a warning (the clip check still looks at every clip before a reel posts).
const MAX_FRAME_DIFF = Number(process.env.VEO_MAX_FRAME_DIFF || 30);
const WRONG = join(HERE, "_wrong_frame");
function thumb(p, video) {
  return execFileSync("ffmpeg", ["-loglevel", "error", ...(video ? ["-ss", "0.05"] : []), "-i", p,
    "-frames:v", "1", "-vf", "scale=36:64,format=gray", "-f", "rawvideo", "-"], { maxBuffer: 1 << 20 });
}
function frameDiff(video, still) {
  try {
    const a = thumb(video, true), b = thumb(still, false);
    if (!a.length || a.length !== b.length) return null;
    let s = 0;
    for (let i = 0; i < a.length; i++) s += Math.abs(a[i] - b[i]);
    return s / a.length;
  } catch { return null; }
}

const q = JSON.parse(readFileSync(QUEUE, "utf-8"));
const byClip = new Map(q.map((r) => [r.clip, r]));
const wrongFrame = [];
const files = readdirSync(INBOX).filter((f) => /\.(mp4|jpe?g|png)$/i.test(f));

if (!files.length) { console.log(`[named] no .mp4 in ${INBOX}`); process.exit(0); }

let ok = 0; const unknown = [], empty = [], settling = [];
for (const f of files) {
  const row = byClip.get(f);
  if (!row) { unknown.push(f); continue; }
  const st = statSync(join(INBOX, f));
  if (st.size < 10000) { empty.push(f); continue; }   // (a real still is >100KB too)
  // Still being written? A scheduled ingest can fire while the Flow session is
  // mid-download, and a half-written file already carrying its final name
  // would be moved, uploaded and marked live. Leave anything touched in the
  // last SETTLE_S seconds for the next run.
  if (Date.now() - st.mtimeMs < SETTLE_S * 1000) { settling.push(f); continue; }
  if (/\.mp4$/i.test(f) && row.start_frame && row.start_frame !== "None") {
    const sf = [join(OUT, row.start_frame), join(INBOX, row.start_frame)].find((p) => existsSync(p));
    const d = sf ? frameDiff(join(INBOX, f), sf) : null;
    if (d === null) {
      console.log(`[named] WARN ${f}: could not compare its first frame with ${row.start_frame}; taking it`);
    } else if (d > MAX_FRAME_DIFF) {
      console.log(`[named] ${DRY ? "would REFUSE" : "REFUSED"} ${f}: its first frame is not ${row.start_frame} ` +
                  `(gap ${d.toFixed(1)}, limit ${MAX_FRAME_DIFF}) — made from the wrong start frame`);
      if (!DRY) {
        mkdirSync(WRONG, { recursive: true });
        const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "");
        renameSync(join(INBOX, f), join(WRONG, f.replace(/\.mp4$/i, `__${stamp}.mp4`)));
        row.status = "pending";
      }
      wrongFrame.push(f);
      continue;
    }
  }
  console.log(`[named] ${DRY ? "would take" : "take"} ${f}  (${row.role}, ${row.seconds}s)`);
  if (!DRY) {
    try { renameSync(join(INBOX, f), join(OUT, f)); }
    catch { copyFileSync(join(INBOX, f), join(OUT, f)); unlinkSync(join(INBOX, f)); }
    row.status = "collected";
  }
  ok++;
}

if (unknown.length) {
  console.log(`\n[named] ${unknown.length} file(s) do not match any queued clip — LEFT IN PLACE, not guessed:`);
  for (const f of unknown.slice(0, 12)) console.log(`   ? ${f}`);
  console.log("[named] expected form: <slug>__<format>__b<N>.mp4");
}
if (empty.length) console.log(`[named] ${empty.length} file(s) under 10KB, left alone: ${empty.slice(0,5).join(", ")}`);
if (wrongFrame.length) console.log(`[named] ${wrongFrame.length} video(s) refused (wrong start frame), re-queued as pending: ${wrongFrame.join(", ")}`);

if (settling.length) console.log(`[named] ${settling.length} file(s) still settling (<${SETTLE_S}s old), left for the next run: ${settling.slice(0,5).join(", ")}`);
if (DRY) { console.log("\n[named] --dry: nothing written"); process.exit(0); }
writeFileSync(QUEUE, JSON.stringify(q, null, 2));
console.log(`\n[named] ${ok} clip(s) named and ready to upload`);

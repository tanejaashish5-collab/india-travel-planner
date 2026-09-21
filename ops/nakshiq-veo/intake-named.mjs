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
    if (!f.toLowerCase().endsWith(".mp4")) continue;
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

const q = JSON.parse(readFileSync(QUEUE, "utf-8"));
const byClip = new Map(q.map((r) => [r.clip, r]));
const files = readdirSync(INBOX).filter((f) => f.endsWith(".mp4"));

if (!files.length) { console.log(`[named] no .mp4 in ${INBOX}`); process.exit(0); }

let ok = 0; const unknown = [], empty = [], settling = [];
for (const f of files) {
  const row = byClip.get(f);
  if (!row) { unknown.push(f); continue; }
  const st = statSync(join(INBOX, f));
  if (st.size < 10000) { empty.push(f); continue; }
  // Still being written? A scheduled ingest can fire while the Flow session is
  // mid-download, and a half-written file already carrying its final name
  // would be moved, uploaded and marked live. Leave anything touched in the
  // last SETTLE_S seconds for the next run.
  if (Date.now() - st.mtimeMs < SETTLE_S * 1000) { settling.push(f); continue; }
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

if (settling.length) console.log(`[named] ${settling.length} file(s) still settling (<${SETTLE_S}s old), left for the next run: ${settling.slice(0,5).join(", ")}`);
if (DRY) { console.log("\n[named] --dry: nothing written"); process.exit(0); }
writeFileSync(QUEUE, JSON.stringify(q, null, 2));
console.log(`\n[named] ${ok} clip(s) named and ready to upload`);

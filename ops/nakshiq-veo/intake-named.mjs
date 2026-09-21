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

const HERE = dirname(fileURLToPath(import.meta.url));
const INBOX = process.env.VEO_INBOX || join(HERE, "inbox");
const OUT = join(HERE, "clips");
const QUEUE = join(HERE, "veo_queue.json");
const DRY = process.argv.includes("--dry");

mkdirSync(OUT, { recursive: true });
mkdirSync(INBOX, { recursive: true });

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

let ok = 0; const unknown = [], empty = [];
for (const f of files) {
  const row = byClip.get(f);
  if (!row) { unknown.push(f); continue; }
  if (statSync(join(INBOX, f)).size < 10000) { empty.push(f); continue; }
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

if (DRY) { console.log("\n[named] --dry: nothing written"); process.exit(0); }
writeFileSync(QUEUE, JSON.stringify(q, null, 2));
console.log(`\n[named] ${ok} clip(s) named and ready to upload`);

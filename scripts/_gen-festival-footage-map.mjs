#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_gen-festival-footage-map.mjs
//
// Emits apps/web/src/lib/festival-footage-map.ts — the slug→footage-family map
// the festival page uses to pick a REAL festival clip (fam-<family>.mp4 in R2).
//
// SOURCED families are auto-detected from data/festivals/footage/fam-*.mp4, so
// the map only ever points at clips that actually exist. Every other festival
// gets no entry → the page falls back to the destination hero IMAGE (an honest
// still beats a landscape clip that misreads as the festival).
//
// Re-run after adding/normalising new fam-*.mp4 clips:
//   node scripts/_gen-festival-footage-map.mjs
//
// Classification rules live in scripts/_lib/festival-footage-rules.mjs (shared
// with the coverage-report script) — keep footage families in sync there.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { classifyFootage } from "./_lib/festival-footage-rules.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CSV = path.join(ROOT, "data", "festivals", "video-prompts.csv");
const FOOTAGE_DIR = path.join(ROOT, "data", "festivals", "footage");
const PHOTO_DIR = path.join(ROOT, "data", "festivals", "photos");
const OUT = path.join(ROOT, "apps", "web", "src", "lib", "festival-footage-map.ts");

// Families sourced from Wikimedia Commons (CC BY-SA) need a visible credit line.
// Map family → credit string. Pexels/Pixabay (no-attribution) families omit it.
const ATTRIBUTION = {
  "monastery-cham": "Cham dance: Sumita Roy Dutta / Wikimedia Commons, CC BY-SA 3.0",
};

// Festival CELEBRATION photos (famphoto-<family>.jpg in R2) — the hero fallback
// for festivals with no real video: an honest still of the actual festival,
// shown instead of the destination/place photo. Credits (Wikimedia CC BY-SA)
// come from data/festivals/photo-sources.json (the provenance record).
const PHOTO_ATTRIBUTION = (() => {
  const p = path.join(ROOT, "data", "festivals", "photo-sources.json");
  if (!existsSync(p)) return {};
  const src = JSON.parse(readFileSync(p, "utf8"));
  const out = {};
  for (const [fam, v] of Object.entries(src)) if (v.credit) out[fam] = v.credit;
  return out;
})();

// ─── tiny CSV parser ──────────────────────────────────────────────────────────
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// ─── sourced families = fam-*.mp4 on disk ─────────────────────────────────────
const sourced = new Set(
  readdirSync(FOOTAGE_DIR)
    .filter((f) => /^fam-.+\.mp4$/.test(f))
    .map((f) => f.replace(/^fam-/, "").replace(/\.mp4$/, "")),
);
if (!sourced.size) { console.error("No fam-*.mp4 clips in", FOOTAGE_DIR); process.exit(1); }

// ─── classify + build map ─────────────────────────────────────────────────────
const rows = parseCsv(readFileSync(CSV, "utf8"));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
const data = rows.slice(1).filter((r) => r.length > 1);

const map = {};
const perFamily = {};
for (const r of data) {
  const slug = r[col.festival_slug];
  const name = r[col.festival_name];
  const cls = classifyFootage(name);
  if (sourced.has(cls.family)) {
    map[slug] = cls.family;
    perFamily[cls.family] = (perFamily[cls.family] || 0) + 1;
  }
}

const credits = {};
for (const fam of sourced) if (ATTRIBUTION[fam]) credits[fam] = ATTRIBUTION[fam];

// ─── photos: famphoto-<family>.jpg on disk → FESTIVAL_PHOTO map ────────────────
const sourcedPhotos = new Set(
  existsSync(PHOTO_DIR)
    ? readdirSync(PHOTO_DIR).filter((f) => /^famphoto-.+\.jpg$/.test(f)).map((f) => f.replace(/^famphoto-/, "").replace(/\.jpg$/, ""))
    : [],
);
// A photo key is either a FAMILY (famphoto-<family>.jpg, serves many festivals)
// or a SLUG (famphoto-<slug>.jpg, a per-festival photo for the obscure long tail).
// Per-festival wins over family — it's the more specific image.
const photoMap = {};
const perPhotoFamily = {};
for (const r of data) {
  const slug = r[col.festival_slug];
  let key = null;
  if (sourcedPhotos.has(slug)) key = slug;
  else {
    const fam = classifyFootage(r[col.festival_name]).family;
    if (sourcedPhotos.has(fam)) key = fam;
  }
  if (key) {
    photoMap[slug] = key;
    perPhotoFamily[key] = (perPhotoFamily[key] || 0) + 1;
  }
}
const photoCredits = {};
for (const fam of sourcedPhotos) if (PHOTO_ATTRIBUTION[fam]) photoCredits[fam] = PHOTO_ATTRIBUTION[fam];
// A festival shows a video if it has one, else a festival photo, else the
// destination image — so "celebration imagery" = video families ∪ photo families.
const celebrationSlugs = new Set([...Object.keys(map), ...Object.keys(photoMap)]);

// ─── emit TS ──────────────────────────────────────────────────────────────────
const entries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
const photoEntries = Object.entries(photoMap).sort(([a], [b]) => a.localeCompare(b));
const lines = [];
lines.push("// AUTO-GENERATED by scripts/_gen-festival-footage-map.mjs — do not edit by hand.");
lines.push("//");
lines.push("// Maps a festival page-slug to a REAL-footage \"family\" clip stored in R2 as");
lines.push("// fam-<family>.mp4. Each clip is authentic, free-licensed footage of that");
lines.push("// festival type (verified frame-by-frame at source). A festival with NO entry");
lines.push("// here falls back to the destination hero image on its page — an honest still,");
lines.push("// never a landscape clip that misreads as the festival.");
lines.push(`//`);
lines.push(`// ${entries.length} festivals mapped across ${Object.keys(perFamily).length} family clips; the rest use the hero image.`);
lines.push("");
lines.push("export const FESTIVAL_FOOTAGE: Record<string, string> = {");
for (const [slug, fam] of entries) lines.push(`  ${JSON.stringify(slug)}: ${JSON.stringify(fam)},`);
lines.push("};");
lines.push("");
lines.push("// Families whose clip requires visible attribution (Wikimedia CC BY-SA).");
lines.push("// family key → credit string shown as a small caption on the festival hero.");
lines.push("export const FOOTAGE_CREDIT: Record<string, string> = {");
for (const [fam, txt] of Object.entries(credits)) lines.push(`  ${JSON.stringify(fam)}: ${JSON.stringify(txt)},`);
lines.push("};");
lines.push("");
lines.push("// Festival CELEBRATION photo (famphoto-<family>.jpg in R2) — the hero fallback");
lines.push("// when a festival has no video: a real still of the festival, shown instead of");
lines.push("// the destination/place photo. slug → photo family.");
lines.push(`// ${photoEntries.length} festivals mapped across ${Object.keys(perPhotoFamily).length} photo families.`);
lines.push("export const FESTIVAL_PHOTO: Record<string, string> = {");
for (const [slug, fam] of photoEntries) lines.push(`  ${JSON.stringify(slug)}: ${JSON.stringify(fam)},`);
lines.push("};");
lines.push("");
lines.push("// Photo families requiring visible attribution (Wikimedia CC BY-SA).");
lines.push("export const PHOTO_CREDIT: Record<string, string> = {");
for (const [fam, txt] of Object.entries(photoCredits)) lines.push(`  ${JSON.stringify(fam)}: ${JSON.stringify(txt)},`);
lines.push("};");
lines.push("");
writeFileSync(OUT, lines.join("\n"), "utf8");

console.log(`Sourced video families (${sourced.size}): ${[...sourced].sort().join(", ")}`);
console.log(`Sourced photo families (${sourcedPhotos.size}): ${[...sourcedPhotos].sort().join(", ") || "none"}`);
console.log(`\nMapped ${entries.length} festivals → real video:`);
for (const [fam, n] of Object.entries(perFamily).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${fam.padEnd(20)} ${String(n).padStart(3)} festivals${credits[fam] ? "  (CC-BY-SA credit)" : ""}`);
}
console.log(`Mapped ${photoEntries.length} festivals → real festival photo (video families excluded show video):`);
for (const [fam, n] of Object.entries(perPhotoFamily).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${fam.padEnd(20)} ${String(n).padStart(3)} festivals${photoCredits[fam] ? "  (CC-BY-SA credit)" : ""}`);
}
console.log(`\n${celebrationSlugs.size}/${data.length} festivals now show real celebration imagery (video or photo); ${data.length - celebrationSlugs.size} use the destination image.`);
console.log(`Wrote ${path.relative(ROOT, OUT)}`);

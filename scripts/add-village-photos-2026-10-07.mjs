#!/usr/bin/env node
// Top-up for village-page photos, 2026-10-07. Cowork's batch 1 searched Commons by
// category and found no photos of Kheerganga, Nathatop or Shoja themselves; a
// full-text Commons search found them (uncategorised files). Each pick was looked
// at: it shows the place, no watermark/date stamp, no identifiable faces. Two
// "Photos Worldwide" CC0 uploads were skipped (EXIF stripped, date 0010-10-10,
// provenance untraceable) and one photo of people bathing in the pool.
// Author + licence are read from the Commons API at run time, not restated here.
// The Flickr photo (Sethan) is gated behind FLICKR=1: the page credit said
// "via Wikimedia Commons" for every photo until the Credit fix in village-page.tsx
// is live, so writing it earlier would mis-credit it.
// Per photo: original saved to ~/Downloads/nakshiq-villages/<slug>/ + credits.csv row,
// 1600px JPEG + WebP 400/800/1200/1600 to R2 villages/<slug>/, merged into page.photos.
// A new hero replaces the old hero flag. DRY by default; APPLY=1 uploads and writes.
// Usage: node --env-file=apps/web/.env.local scripts/add-village-photos-2026-10-07.mjs
import { existsSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";

sharp.cache(false);
const SRC = path.join(os.homedir(), "Downloads", "nakshiq-villages");
const BUCKET = "nakshiq-images";
const WIDTHS = [400, 800, 1200, 1600];
const UA = { "User-Agent": "NakshIQ-village-photos/1.0 (taneja.ashish5@gmail.com)" };
const PARENT = { kheerganga: "parvati-valley", nathatop: "patnitop", shoja: "jibhi", sethan: "manali" };

// [slug, file, Commons file title | flickr object, caption, hero?]
const ADD = [
  ["kheerganga", "kheerganga-2.jpg", "File:Kheerganga.JPG", "The Kheerganga meadow in 2014; overnight camps were banned in July 2024", true],
  ["kheerganga", "kheerganga-3.jpg", "File:Kheerganga Camp site.jpg", "Fresh snow on the Kheerganga meadow, April 2015"],
  ["kheerganga", "kheerganga-4.jpg", "File:Lord Shiva Temple Kheer Ganga.jpg", "The Shiva temple and hot spring pool across the meadow"],
  ["kheerganga", "kheerganga-5.jpg", "File:Khirganga1.jpg", "Camps at Kheerganga in March 2017, before the 2024 camping ban"],
  ["kheerganga", "kheerganga-6.jpg", "File:\"The hot water bath at Kheer Ganga\" - May 2017\" 06.jpg", "The hot spring outlet at the Kheerganga shrine"],
  ["nathatop", "nathatop-4.jpg", "File:Nathatop, Jammu.jpg", "Meadows and the valley from Nathatop", true],
  ["nathatop", "nathatop-5.jpg", "File:Nathatopjammu.jpg", "Nathatop meadows under cloud"],
  ["nathatop", "nathatop-6.jpg", "File:View of Nathatop covered in snow.jpg", "Nathatop in snow, December"],
  ["shoja", "shoja-6.jpg", "File:Slate Roof with Mountain Silhouette, Sohja Village, Himachal Pradesh.jpg", "A slate roof in Shoja village", true],
  ["sethan", "sethan-2.jpg", {
    flickr: true, url: "https://live.staticflickr.com/65535/52807669586_a528b208bd_4k.jpg",
    page: "https://www.flickr.com/photos/64924693@N00/52807669586", author: "Kandukuru Nagarjun", licence: "CC BY 2.0", month: "2023-04",
  }, "Goats grazing at Sethan, April"],
];

const apply = !!process.env.APPLY;
const items = ADD.filter(([, , src]) => !(src.flickr && !process.env.FLICKR));
const strip = (s) => (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function commonsInfo(title) {
  const u = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(title)}`;
  const page = Object.values((await (await fetch(u, { headers: UA })).json()).query.pages)[0];
  const ii = page.imageinfo?.[0];
  if (!ii) throw new Error(`not on Commons: ${title}`);
  const m = ii.extmetadata;
  return { url: ii.url, page: ii.descriptionurl, author: strip(m.Artist?.value), licence: strip(m.LicenseShortName?.value), month: strip(m.DateTimeOriginal?.value).slice(0, 7) };
}

const s3 = new S3Client({ region: "auto", endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } });
const put = (Key, Body, ContentType) => s3.send(new PutObjectCommand({ Bucket: BUCKET, Key, Body, ContentType, CacheControl: "public, max-age=31536000, immutable" }));
const csvCell = (s) => (/[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

const bySlug = {};
for (const [slug, file, src, caption, hero] of items) {
  const info = src.flickr ? src : await commonsInfo(src);
  if (!/^(cc0|cc by(-sa)? [\d.]+|public domain)/i.test(info.licence)) throw new Error(`${file}: licence not allowed: ${info.licence}`);
  const local = path.join(SRC, slug, file);
  const key = `villages/${slug}/${file}`;
  if (apply) {
    if (!existsSync(local)) {
      const res = await fetch(info.url, { headers: UA });
      if (!res.ok) throw new Error(`${file}: download ${res.status}`);
      writeFileSync(local, Buffer.from(await res.arrayBuffer()));
      await new Promise((r) => setTimeout(r, 1500));
    }
    const csv = readFileSync(path.join(SRC, "credits.csv"), "utf8");
    if (!csv.includes(`,${file},`)) appendFileSync(path.join(SRC, "credits.csv"), [slug, file, info.page, info.author, info.licence, info.month].map(csvCell).join(",") + "\n");
    const base = sharp(local, { limitInputPixels: false, failOn: "none" }).rotate();
    await put(key, await base.clone().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer(), "image/jpeg");
    const stem = file.replace(/\.jpe?g$/i, "");
    for (const w of WIDTHS) {
      await put(`villages/${slug}/${stem}-w${w}.webp`, await base.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(), "image/webp");
    }
  }
  (bySlug[slug] ??= []).push({ src: `/images/${key}`, caption, hero: !!hero, author: info.author, licence: info.licence, source_url: info.page });
  console.log(`${apply ? "UP" : "DRY"} ${key}${hero ? "  [hero]" : ""}  ${info.licence}  ${info.author}`);
}

if (apply) {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  for (const [slug, added] of Object.entries(bySlug)) {
    const { data: row, error } = await sb.from("sub_destinations").select("id, page").eq("parent_id", PARENT[slug]).eq("slug", slug).maybeSingle();
    if (error || !row?.page) { console.log(`✗ ${slug}: ${error?.message ?? "no published row"}`); continue; }
    const srcs = new Set(added.map((p) => p.src));
    const newHero = added.some((p) => p.hero);
    const kept = (row.page.photos ?? []).filter((p) => !srcs.has(p.src)).map((p) => (newHero ? { ...p, hero: false } : p));
    const photos = [...added.filter((p) => p.hero), ...kept.filter((p) => p.hero), ...added.filter((p) => !p.hero), ...kept.filter((p) => !p.hero)];
    const { error: e2 } = await sb.from("sub_destinations").update({ page: { ...row.page, photos } }).eq("id", row.id);
    console.log(e2 ? `✗ ${slug}: ${e2.message}` : `DB ${slug}: ${photos.length} photos, hero = ${photos.find((p) => p.hero)?.caption ?? "none"}`);
  }
}
console.log(`\n${items.length} photos across ${Object.keys(bySlug).length} villages${process.env.FLICKR ? "" : " (Flickr photo held; FLICKR=1 after the Credit fix is live)"}`);

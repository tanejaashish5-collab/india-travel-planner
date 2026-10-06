#!/usr/bin/env node
// Upload village-page photos (Wikimedia Commons, credited) to R2 and attach
// them to sub_destinations.page.photos. 2026-10-06, batch 1.
// Source: ~/Downloads/nakshiq-villages/<slug>/<file>.jpg + credits.csv (Cowork).
// Per photo: a 1600px JPEG (OG/JSON-LD) + WebP 400/800/1200/1600 under
// villages/<slug>/, matching the r2Loader variant scheme.
// `hero` only where the photo shows the village itself; `nearby` captions name
// the real place shown (Patnitop for Nathatop etc) so nothing is mislabelled.
// DRY by default (no upload, no DB write); APPLY=1 does both.
// Usage: node --env-file=apps/web/.env.local scripts/upload-village-photos.mjs
import { readFileSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";

sharp.cache(false);
const SRC = path.join(os.homedir(), "Downloads", "nakshiq-villages");
const BUCKET = "nakshiq-images";
const WIDTHS = [400, 800, 1200, 1600];

// filename -> [caption, hero?]. Anything not listed is skipped.
const P = {
  "aru-valley-1.jpg": ["Mountains above Aru"], "aru-valley-2.jpg": ["Aru village and meadow", true],
  "aru-valley-3.jpg": ["Aru Valley"], "aru-valley-4.jpg": ["Aru Valley in autumn"], "aru-valley-5.jpg": ["Aru Valley in spring"],
  "deoria-tal-1.jpg": ["Deoria Tal"], "deoria-tal-2.jpg": ["Himalayan peaks reflected in Deoria Tal", true],
  "deoria-tal-3.jpg": ["Deoria Tal"], "deoria-tal-4.jpg": ["Deoria Tal lake"], "deoria-tal-5.jpg": ["Deoria Tal"],
  "dharamkot-1.jpg": ["Mustard fields and a shrine in upper Dharamkot", true], "dharamkot-2.jpg": ["Dharamkot above McLeod Ganj"], "dharamkot-3.jpg": ["Hindu temple in Dharamkot"],
  "ghangaria-1.jpg": ["On the Govindghat to Ghangaria trail"], "ghangaria-2.jpg": ["On the Govindghat to Ghangaria trail"], "ghangaria-3.jpg": ["On the Govindghat to Ghangaria trail"],
  "jispa-1.jpg": ["The Bhaga river near Darcha, just above Jispa"], "jispa-2.jpg": ["The Bhaga river upstream of Jispa"],
  "jispa-3.jpg": ["Jispa village and the Bhaga valley", true], "jispa-4.jpg": ["Jispa"], "jispa-5.jpg": ["Jispa"],
  "kalga-pulga-1.jpg": ["Pulga village", true], "kalga-pulga-2.jpg": ["Pulga"], "kalga-pulga-3.jpg": ["Pulga"],
  "kasar-devi-1.jpg": ["Kasar Devi"], "kasar-devi-2.jpg": ["View from Crank's Ridge"], "kasar-devi-3.jpg": ["Kasar Devi village", true],
  "kasar-devi-4.jpg": ["View from Kasar Devi village"], "kasar-devi-5.jpg": ["View from Crank's Ridge"],
  "khaliya-top-1.jpg": ["Panchachuli range, seen from the Munsiyari area"], "khaliya-top-2.jpg": ["Panchachuli at evening, Munsiyari area"],
  "khaliya-top-3.jpg": ["Panchachuli seen from Khaliya"], "khaliya-top-4.jpg": ["Hansling peak from Munsiyari"],
  "khaliya-top-5.jpg": ["Alpine meadow at Khaliya", true],
  "kheerganga-1.jpg": ["On the trek to Kheerganga"],
  "malana-1.jpg": ["Malana village on its ridge", true], "malana-2.jpg": ["Malana village"], "malana-3.jpg": ["Malana village"],
  "mana-1.jpg": ["Bhim Pul, Mana"], "mana-2.jpg": ["Bhim Pul, Mana"], "mana-3.jpg": ["Mana village below the peaks", true],
  "mashobra-1.jpg": ["Mashobra", true], "mashobra-2.jpg": ["Mashobra"], "mashobra-3.jpg": ["Mashobra"],
  "naddi-1.jpg": ["Naddi village", true], "naddi-2.jpg": ["A house in Naddi"], "naddi-3.jpg": ["Naddi village"], "naddi-4.jpg": ["Naddi village"],
  "naggar-1.jpg": ["Roerich Art Gallery, Naggar"], "naggar-2.jpg": ["The Kullu valley from Naggar", true],
  "naggar-3.jpg": ["Naggar Castle"], "naggar-4.jpg": ["Chaturbhuja temple, Naggar"],
  "nathatop-1.jpg": ["Patnitop, a few km below Nathatop"], "nathatop-2.jpg": ["Hills at Patnitop, near Nathatop"], "nathatop-3.jpg": ["Houses at Patnitop, near Nathatop"],
  "sethan-1.jpg": ["Sethan in snow", true],
  "shoja-1.jpg": ["Raghupur Fort, above Jalori Pass near Shoja"], "shoja-2.jpg": ["Serolsar Lake, a trek from Jalori Pass near Shoja"],
  "shoja-3.jpg": ["Camping at Jalori Pass, above Shoja"], "shoja-4.jpg": ["Great Himalayan National Park from Jalori Pass"], "shoja-5.jpg": ["Jalori Pass, above Shoja"],
  "tosh-1.jpg": ["Tosh", true], "tosh-2.jpg": ["Autumn stream on the trail above Tosh"], "tosh-3.jpg": ["Snow on the Parvati range from Tosh"], "tosh-4.jpg": ["View on the trail above Tosh"],
  "tungnath-1.jpg": ["Snow on the hills from the Tungnath trek", true], "tungnath-2.jpg": ["The view from Tungnath"], "tungnath-3.jpg": ["Chandrashila peak above Tungnath"],
};
// research slug -> sub_destinations parent (published rows are matched by slug+parent)
const PARENT = { tosh: "parvati-valley", kheerganga: "parvati-valley", "kalga-pulga": "parvati-valley", malana: "parvati-valley",
  sethan: "manali", naggar: "manali", jispa: "keylong", dharamkot: "dharamshala", naddi: "dharamshala", mashobra: "shimla",
  shoja: "jibhi", "aru-valley": "pahalgam", nathatop: "patnitop", tungnath: "chopta", "deoria-tal": "chopta",
  "khaliya-top": "munsiyari", "kasar-devi": "almora", ghangaria: "valley-of-flowers", mana: "badrinath" };

function parseCsv(text) {
  const [head, ...lines] = text.trim().split(/\r?\n/);
  const cols = head.split(",");
  return lines.map((l) => {
    const out = []; let cur = "", q = false;
    for (const ch of l) { if (ch === '"') q = !q; else if (ch === "," && !q) { out.push(cur); cur = ""; } else cur += ch; }
    out.push(cur);
    return Object.fromEntries(cols.map((c, i) => [c, (out[i] ?? "").trim()]));
  });
}

const rows = parseCsv(readFileSync(path.join(SRC, "credits.csv"), "utf8")).filter((r) => P[r.filename] && PARENT[r.slug]);
const apply = !!process.env.APPLY;
const s3 = new S3Client({ region: "auto", endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY } });
const put = (Key, Body, ContentType) => s3.send(new PutObjectCommand({ Bucket: BUCKET, Key, Body, ContentType, CacheControl: "public, max-age=31536000, immutable" }));

const bySlug = {};
for (const r of rows) {
  const [caption, hero] = P[r.filename];
  const stem = r.filename.replace(/\.jpe?g$/i, "");
  const key = `villages/${r.slug}/${stem}.jpg`;
  if (apply) {
    const src = path.join(SRC, r.slug, r.filename);
    const base = sharp(src, { limitInputPixels: false, failOn: "none" }).rotate();
    await put(key, await base.clone().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toBuffer(), "image/jpeg");
    for (const w of WIDTHS) {
      await put(`villages/${r.slug}/${stem}-w${w}.webp`, await base.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(), "image/webp");
    }
  }
  (bySlug[r.slug] ??= []).push({ src: `/images/${key}`, caption, hero: !!hero, author: r.author, licence: r.licence, source_url: r.commons_file_page_url });
  console.log(`${apply ? "UP" : "DRY"} ${key}${hero ? "  [hero]" : ""}  ${r.licence}`);
}

if (apply) {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  for (const [slug, photos] of Object.entries(bySlug)) {
    photos.sort((a, b) => Number(b.hero) - Number(a.hero));
    const { data: row, error } = await sb.from("sub_destinations").select("id, page").eq("parent_id", PARENT[slug]).eq("slug", slug).maybeSingle();
    if (error || !row?.page) { console.log(`✗ ${slug}: ${error?.message ?? "no published row"}`); continue; }
    const { error: e2 } = await sb.from("sub_destinations").update({ page: { ...row.page, photos } }).eq("id", row.id);
    console.log(e2 ? `✗ ${slug}: ${e2.message}` : `DB ${slug}: ${photos.length} photos${photos[0].hero ? " (hero)" : " (no hero)"}`);
  }
}
console.log(`\n${rows.length} photos across ${Object.keys(bySlug).length} villages`);

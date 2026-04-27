#!/usr/bin/env node
/**
 * Upload destination + collection images from apps/web/public/images/ to R2,
 * AND generate optimized WebP variants for responsive delivery.
 *
 * For every JPG/PNG, we ship to R2:
 *   - the original (key: `<subdir>/<file>`) — kept as a marker + raw fallback
 *   - 4 WebP variants: <stem>-w400.webp, -w800.webp, -w1200.webp, -w1600.webp
 *
 * The custom Next.js image loader (apps/web/src/lib/image-loader.ts) maps the
 * runtime `width` arg → the smallest variant ≥ width, so the browser pulls
 * sized WebP instead of a full-resolution JPEG. Cuts hero image weight ~80%.
 *
 * Run: node scripts/upload-images.mjs
 * Backfill mode: re-running this script will skip uploads where ALL variants
 * already exist on R2, so it's safe to run repeatedly.
 *
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in
 * apps/web/.env.local. Sharp must be installed (it is — pulled in by Next).
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import sharp from "sharp";

const envPath = "apps/web/.env.local";
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].trim();
}

const accountId = env.R2_ACCOUNT_ID;
const accessKeyId = env.R2_ACCESS_KEY_ID;
const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error("Missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, or R2_SECRET_ACCESS_KEY in apps/web/.env.local");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

const BUCKET = "nakshiq-images";
const LOCAL_ROOT = "apps/web/public/images";
const SUBDIRS = ["destinations", "collections"];
const VARIANT_WIDTHS = [400, 800, 1200, 1600];
const WEBP_QUALITY = 80;
const CONCURRENCY = 6;

const MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

async function exists(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function putR2(key, body, contentType) {
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

function variantKey(subdir, stem, width) {
  return `${subdir}/${stem}-w${width}.webp`;
}

async function processFile(subdir, filename, stats) {
  const localPath = join(LOCAL_ROOT, subdir, filename);
  const ext = extname(filename).toLowerCase();
  const stem = filename.slice(0, -ext.length);
  const originalKey = `${subdir}/${filename}`;

  // 1. Upload original if missing (preserves audit-prompts.mjs marker)
  const originalExists = await exists(originalKey);
  if (!originalExists) {
    const buf = readFileSync(localPath);
    await putR2(originalKey, buf, MIME[ext] ?? "application/octet-stream");
    stats.originalUploaded++;
    stats.bytes += buf.length;
  }

  // 2. SVG / non-rasterizable: skip variants
  if (ext === ".svg" || ext === ".gif") {
    return;
  }

  // 3. Generate + upload WebP variants for any width missing on R2
  const variantChecks = await Promise.all(
    VARIANT_WIDTHS.map((w) => exists(variantKey(subdir, stem, w)))
  );
  const missing = VARIANT_WIDTHS.filter((_, i) => !variantChecks[i]);
  if (missing.length === 0) {
    stats.skipped++;
    return;
  }

  const inputBuf = readFileSync(localPath);
  const meta = await sharp(inputBuf).metadata();
  const sourceWidth = meta.width ?? 1600;

  for (const w of missing) {
    // Don't upscale: cap the resize at the source width
    const targetWidth = Math.min(w, sourceWidth);
    const out = await sharp(inputBuf)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    await putR2(variantKey(subdir, stem, w), out, "image/webp");
    stats.variantsUploaded++;
    stats.bytes += out.length;
  }
}

async function runPool(items, fn) {
  let cursor = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      try {
        await fn(items[i], i);
      } catch (err) {
        console.error(`  ✗ ${items[i].subdir}/${items[i].filename}: ${err.message}`);
      }
      const { variantsUploaded, originalUploaded, skipped } = items[i].stats;
      const total = variantsUploaded + originalUploaded + skipped;
      if (total % 20 === 0) {
        process.stdout.write(`  ${cursor}/${items.length}…\n`);
      }
    }
  });
  await Promise.all(workers);
}

async function main() {
  const stats = {
    originalUploaded: 0,
    variantsUploaded: 0,
    skipped: 0,
    bytes: 0,
  };

  const queue = [];
  for (const subdir of SUBDIRS) {
    const localDir = join(LOCAL_ROOT, subdir);
    let files;
    try {
      files = readdirSync(localDir).filter((f) => {
        const ext = extname(f).toLowerCase();
        if (!MIME[ext]) return false;
        if (f.match(/ \d\.(jpg|png|jpeg|webp|avif|svg)$/i)) return false;
        const st = statSync(join(localDir, f));
        return st.isFile() && st.size > 0;
      });
    } catch {
      console.log(`Skipping ${subdir} — directory not found`);
      continue;
    }
    console.log(`── ${subdir}/: ${files.length} files queued ──`);
    for (const f of files) {
      queue.push({ subdir, filename: f, stats });
    }
  }

  console.log(`\nProcessing ${queue.length} files (${CONCURRENCY} workers, ${VARIANT_WIDTHS.length} variants each)…\n`);

  const t0 = Date.now();
  await runPool(queue, ({ subdir, filename }) => processFile(subdir, filename, stats));
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

  console.log(
    `\nDone in ${elapsed}s: ${stats.originalUploaded} originals + ${stats.variantsUploaded} variants uploaded ` +
      `(${(stats.bytes / 1024 / 1024).toFixed(1)}MB), ${stats.skipped} fully cached`
  );
}

main();

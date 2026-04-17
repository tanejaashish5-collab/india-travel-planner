#!/usr/bin/env node
/**
 * Upload destination + collection images from apps/web/public/images/ to R2.
 *
 * Preserves the folder structure:
 *   apps/web/public/images/destinations/<id>.jpg → destinations/<id>.jpg
 *   apps/web/public/images/collections/COLLECTION_<id>.jpg → collections/COLLECTION_<id>.jpg
 *
 * Run: node scripts/upload-images.mjs
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in apps/web/.env.local
 *
 * Before running, create the bucket `nakshiq-images` in the Cloudflare R2
 * dashboard and enable Public access (copy the pub-*.r2.dev URL for use as
 * NEXT_PUBLIC_IMAGE_BASE_URL).
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

// Load env from apps/web/.env.local
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

async function main() {
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;
  let bytes = 0;

  for (const subdir of SUBDIRS) {
    const localDir = join(LOCAL_ROOT, subdir);
    let files;
    try {
      files = readdirSync(localDir).filter((f) => {
        const ext = extname(f).toLowerCase();
        if (!MIME[ext]) return false;
        if (f.match(/ \d\.(jpg|png|jpeg|webp|avif|svg)$/i)) return false; // skip " 2.jpg" dupes
        const st = statSync(join(localDir, f));
        return st.isFile() && st.size > 0;
      });
    } catch {
      console.log(`Skipping ${subdir} — directory not found`);
      continue;
    }

    console.log(`\n── ${subdir}/ (${files.length} files) ──`);

    for (const f of files) {
      const key = `${subdir}/${f}`;

      if (await exists(key)) {
        skipped++;
        continue;
      }

      const filePath = join(localDir, f);
      const buf = readFileSync(filePath);
      const ext = extname(f).toLowerCase();
      process.stdout.write(`  ${key} (${(buf.length / 1024).toFixed(0)}KB)... `);

      try {
        await client.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: buf,
            ContentType: MIME[ext] ?? "application/octet-stream",
            CacheControl: "public, max-age=31536000, immutable",
          })
        );
        console.log("OK");
        uploaded++;
        bytes += buf.length;
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
        failed++;
      }
    }
  }

  console.log(
    `\nDone: ${uploaded} uploaded (${(bytes / 1024 / 1024).toFixed(1)}MB), ${skipped} already in bucket, ${failed} failed`
  );
  if (uploaded === 0 && skipped === 0 && failed === 0) {
    console.log("\nNo files processed. Did you point at the right directory?");
  }
}

main();

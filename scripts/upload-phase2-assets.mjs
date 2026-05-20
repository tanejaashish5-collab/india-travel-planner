#!/usr/bin/env node
/**
 * Upload Phase 2 social assets to R2.
 *
 * Reads the manifest at nakshiq-autoposter/data/phase2_r2_manifest.txt and
 * ships each named file from nakshiq-autoposter/social_image_library/ to
 * the `nakshiq-images` bucket under the `social_image_library/` prefix —
 * i.e. exactly where the autoposter cron's R2 sync step fetches them:
 *   https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/social_image_library/{name}
 *
 * Idempotent: PutObject overwrites, so re-running is safe (re-renders ship
 * the corrected bytes). Missing local files are reported, not fatal.
 *
 * Run: node scripts/upload-phase2-assets.mjs
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in
 * apps/web/.env.local.
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname } from "path";

const envPath = "apps/web/.env.local";
const env = {};
for (const line of readFileSync(envPath, "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].trim();
}

const accountId = env.R2_ACCOUNT_ID;
const accessKeyId = env.R2_ACCESS_KEY_ID;
const secretAccessKey = env.R2_SECRET_ACCESS_KEY;
if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error("Missing R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY in apps/web/.env.local");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

const BUCKET = "nakshiq-images";
const PREFIX = "social_image_library";
const MANIFEST = "nakshiq-autoposter/data/phase2_r2_manifest.txt";
const LOCAL_ROOT = "nakshiq-autoposter/social_image_library";

const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
};

const names = readFileSync(MANIFEST, "utf-8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"));

console.log(`Manifest: ${names.length} entries\n`);

let uploaded = 0;
let bytes = 0;
const missing = [];

for (const name of names) {
  const localPath = join(LOCAL_ROOT, name);
  if (!existsSync(localPath)) {
    missing.push(name);
    console.log(`  ✗ MISSING LOCALLY  ${name}`);
    continue;
  }
  const body = readFileSync(localPath);
  const size = statSync(localPath).size;
  const ct = MIME[extname(name).toLowerCase()] || "application/octet-stream";
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: `${PREFIX}/${name}`,
      Body: body,
      ContentType: ct,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  uploaded++;
  bytes += size;
  console.log(`  ✓ ${(size / 1048576).toFixed(2).padStart(7)} MB  ${name}`);
}

console.log(
  `\nDone: ${uploaded}/${names.length} uploaded (${(bytes / 1048576).toFixed(1)} MB total)` +
    (missing.length ? ` — ${missing.length} missing locally: ${missing.join(", ")}` : "")
);
process.exit(missing.length ? 1 : 0);

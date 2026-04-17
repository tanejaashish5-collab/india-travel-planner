#!/usr/bin/env node
/**
 * Upload videos from local videos/ folder to Cloudflare R2 bucket.
 * Run: node scripts/upload-videos.mjs
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in apps/web/.env.local
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

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

const BUCKET = "nakshiq-videos";
const LOCAL_DIR = "videos";

async function exists(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const localFiles = readdirSync(LOCAL_DIR).filter(
    (f) => f.endsWith(".mp4") && !f.includes(" 2") // skip duplicates
  );
  console.log(`Found ${localFiles.length} unique videos locally`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const f of localFiles) {
    // Strip VIDEO_ or ARTICLE_ prefix for bucket name
    const bucketName = f.replace(/^(VIDEO_|ARTICLE_)/, "");

    // Check if already in bucket
    if (await exists(bucketName)) {
      skipped++;
      continue;
    }

    const filePath = join(LOCAL_DIR, f);
    const fileBuffer = readFileSync(filePath);
    process.stdout.write(`Uploading ${bucketName} (${(fileBuffer.length / 1024 / 1024).toFixed(1)}MB)... `);

    try {
      await client.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: bucketName,
          Body: fileBuffer,
          ContentType: "video/mp4",
          CacheControl: "public, max-age=31536000, immutable",
        })
      );
      console.log("OK");
      uploaded++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${uploaded} uploaded, ${skipped} already exist, ${failed} failed`);
}

main();

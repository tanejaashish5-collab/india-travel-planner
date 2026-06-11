#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Upload real festival-footage family clips from data/festivals/footage/ to the
 * nakshiq-videos R2 bucket, flat as fam-<family>.mp4 (the key festivalHeroSrc()
 * resolves via videoSrc("fam-<family>")). Size-aware idempotent: PUTs only when
 * the key is missing OR the local byte size differs. --force re-uploads all.
 *
 * These are NEW keys (fam-*), so they don't collide with the per-destination
 * {id}.mp4 clips or the retired per-slug landscape clips — no cache-version bump
 * needed.
 *
 * Run: node scripts/_upload-festival-footage.mjs
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in apps/web/.env.local
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const FORCE = process.argv.includes("--force");

const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^"|"$/g, "");
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

const BUCKET = "nakshiq-videos";
const LOCAL_DIR = "data/festivals/footage";

async function head(key) {
  try { return await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key })); }
  catch { return null; }
}

async function main() {
  const files = readdirSync(LOCAL_DIR).filter((f) => /^fam-.+\.mp4$/.test(f));
  console.log(`Found ${files.length} family clips in ${LOCAL_DIR}`);

  let uploaded = 0, replaced = 0, skipped = 0, failed = 0;
  const failures = [];

  for (const f of files) {
    const key = f; // flat fam-<family>.mp4
    const filePath = join(LOCAL_DIR, f);
    const localSize = statSync(filePath).size;

    const r2 = await head(key);
    let action = null;
    if (!r2) action = "new";
    else if (FORCE) action = "forced";
    else if (r2.ContentLength !== localSize) action = "replace";
    if (!action) { console.log(`  unchanged ${key}`); skipped++; continue; }

    const buf = readFileSync(filePath);
    process.stdout.write(`${action === "replace" ? "Replacing" : action === "forced" ? "Forcing" : "Uploading"} ${key} (${(buf.length / 1024 / 1024).toFixed(1)}MB)... `);
    try {
      await client.send(new PutObjectCommand({
        Bucket: BUCKET, Key: key, Body: buf,
        ContentType: "video/mp4",
        CacheControl: "public, max-age=31536000, immutable",
      }));
      console.log("OK");
      if (action === "replace") replaced++; else uploaded++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failed++; failures.push(key);
    }
  }

  console.log(`\nDone: ${uploaded} new, ${replaced} replaced, ${skipped} unchanged, ${failed} failed`);
  if (failures.length) { console.log("Failed:\n" + failures.map((k) => "  " + k).join("\n")); process.exit(1); }
}

main();

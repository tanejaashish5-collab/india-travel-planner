#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Upload real festival-CELEBRATION photos from data/festivals/photos/ to the
 * nakshiq-images R2 bucket as festivals/famphoto-<family>.jpg — the hero
 * fallback festivalHeroPhotoSrc() resolves when a festival has no video.
 * Size-aware idempotent; --force re-uploads all.
 *
 * Run: node scripts/_upload-festival-photos.mjs
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in apps/web/.env.local
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const FORCE = process.argv.includes("--force");
const env = {};
for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^"|"$/g, "");
}
const client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});
const BUCKET = "nakshiq-images";
const LOCAL_DIR = "data/festivals/photos";
const PREFIX = "festivals/"; // → festivals/famphoto-<family>.jpg

async function head(key) {
  try { return await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key })); } catch { return null; }
}
async function main() {
  const files = readdirSync(LOCAL_DIR).filter((f) => /^famphoto-.+\.jpg$/.test(f));
  console.log(`Found ${files.length} festival photos in ${LOCAL_DIR}`);
  let up = 0, rep = 0, skip = 0, fail = 0; const failed = [];
  for (const f of files) {
    const key = PREFIX + f;
    const localSize = statSync(join(LOCAL_DIR, f)).size;
    const r2 = await head(key);
    let action = !r2 ? "new" : FORCE ? "forced" : r2.ContentLength !== localSize ? "replace" : null;
    if (!action) { console.log(`  unchanged ${key}`); skip++; continue; }
    const buf = readFileSync(join(LOCAL_DIR, f));
    process.stdout.write(`${action} ${key} (${(buf.length / 1024).toFixed(0)}KB)... `);
    try {
      await client.send(new PutObjectCommand({
        Bucket: BUCKET, Key: key, Body: buf, ContentType: "image/jpeg",
        CacheControl: "public, max-age=31536000, immutable",
      }));
      console.log("OK"); action === "replace" ? rep++ : up++;
    } catch (e) { console.log(`FAILED: ${e.message}`); fail++; failed.push(key); }
  }
  console.log(`\nDone: ${up} new, ${rep} replaced, ${skip} unchanged, ${fail} failed`);
  if (failed.length) { console.log(failed.join("\n")); process.exit(1); }
}
main();

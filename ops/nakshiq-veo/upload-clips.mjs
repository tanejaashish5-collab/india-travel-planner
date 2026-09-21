#!/usr/bin/env node
/**
 * upload-clips.mjs — push beat clips to the nakshiq-videos R2 bucket.
 *
 * Same bucket and credentials as scripts/_upload-festival-videos.mjs, flat keys,
 * so `r2_videos.fetch_named()` finds them at <slug>__<format>__b3.mp4 with no
 * manifest to keep in step. Idempotent on byte size.
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "clips");
const QUEUE = join(HERE, "veo_queue.json");
const BUCKET = "nakshiq-videos";

// Credentials come from the process environment, handed over by the wrapper via
// `node --env-file`. This file never reads or prints the env file itself.
const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
  console.log("[upload] R2 credentials not in env — skipping upload");
  process.exit(0);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
});

const head = async (Key) => {
  try { return await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key })); }
  catch { return null; }
};

const files = existsSync(OUT) ? readdirSync(OUT).filter((f) => f.endsWith(".mp4")) : [];
const q = existsSync(QUEUE) ? JSON.parse(readFileSync(QUEUE, "utf-8")) : [];
let up = 0, skip = 0;

for (const f of files) {
  const body = readFileSync(join(OUT, f));
  const h = await head(f);
  if (h && Number(h.ContentLength) === body.length) { skip++; continue; }
  await client.send(new PutObjectCommand({
    Bucket: BUCKET, Key: f, Body: body, ContentType: "video/mp4",
  }));
  up++;
  console.log(`[upload] ${f} (${(body.length / 1e6).toFixed(1)} MB)`);
  const row = q.find((r) => r.clip === f);
  if (row) row.status = "live";
}
if (q.length) writeFileSync(QUEUE, JSON.stringify(q, null, 2));
console.log(`[upload] uploaded ${up}, already current ${skip}`);

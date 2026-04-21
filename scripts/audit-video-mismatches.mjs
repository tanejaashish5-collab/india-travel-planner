#!/usr/bin/env node
/**
 * Compare each local videos/*.mp4 byte size against the R2 object size.
 * Flags every mismatch — those need re-upload.
 */
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const envContent = readFileSync("apps/web/.env.local", "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
  if (m) env[m[1]] = m[2].trim();
}
const client = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env.R2_ACCESS_KEY_ID, secretAccessKey: env.R2_SECRET_ACCESS_KEY },
});

const files = readdirSync("videos").filter(f => f.endsWith(".mp4") && !f.includes(" 2"));
const mismatch = [], missing = [], match = [];
for (const f of files) {
  const localSize = statSync(join("videos", f)).size;
  const key = f.replace(/^(VIDEO_|ARTICLE_)/, "");
  try {
    const head = await client.send(new HeadObjectCommand({ Bucket: "nakshiq-videos", Key: key }));
    if (head.ContentLength !== localSize) mismatch.push({ f, key, local: localSize, r2: head.ContentLength, lastMod: head.LastModified });
    else match.push(f);
  } catch {
    missing.push({ f, key, local: localSize });
  }
}
console.log(`\n${match.length} match, ${mismatch.length} MISMATCH (R2 stale), ${missing.length} missing from R2\n`);
if (mismatch.length) {
  console.log("── MISMATCH (will re-upload) ──");
  for (const m of mismatch) console.log(`  ${m.key.padEnd(30)} local=${(m.local/1024/1024).toFixed(1)}MB r2=${(m.r2/1024/1024).toFixed(1)}MB (R2 uploaded ${m.lastMod.toISOString().slice(0,10)})`);
}
if (missing.length) {
  console.log("\n── MISSING from R2 ──");
  for (const m of missing) console.log(`  ${m.key.padEnd(30)} local=${(m.local/1024/1024).toFixed(1)}MB  (from ${m.f})`);
}

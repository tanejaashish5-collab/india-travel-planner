#!/usr/bin/env node
/**
 * READ-ONLY delete-safety gate. HEADs every local clip in
 * data/festivals/videos/ against the nakshiq-videos R2 bucket and compares
 * byte sizes. Prints SAFE-TO-DELETE only if all 330 are present AND every
 * local byte size exactly matches its R2 object. Lists any missing or
 * size-mismatched key otherwise. Deletes NOTHING.
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

const BUCKET = "nakshiq-videos";
const LOCAL_DIR = "data/festivals/videos";

const files = readdirSync(LOCAL_DIR).filter((f) => f.endsWith(".mp4") && !f.includes(" 2"));
console.log(`Verifying ${files.length} local clips against R2 "${BUCKET}"...`);

let ok = 0;
const missing = [];
const mismatch = [];

for (const f of files) {
  const localSize = statSync(join(LOCAL_DIR, f)).size;
  let r2;
  try {
    r2 = await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: f }));
  } catch {
    r2 = null;
  }
  if (!r2) { missing.push(f); continue; }
  if (r2.ContentLength !== localSize) {
    mismatch.push(`${f} (local ${localSize} vs R2 ${r2.ContentLength})`);
    continue;
  }
  ok++;
}

console.log(`\nByte-exact match in R2: ${ok}/${files.length}`);
console.log(`Missing from R2:        ${missing.length}`);
console.log(`Size mismatch:          ${mismatch.length}`);
if (missing.length) console.log(`\nMISSING:\n${missing.slice(0, 30).map((s) => "  " + s).join("\n")}`);
if (mismatch.length) console.log(`\nMISMATCH:\n${mismatch.slice(0, 30).map((s) => "  " + s).join("\n")}`);

if (ok === files.length) {
  console.log(`\n✅ SAFE-TO-DELETE: all ${files.length} clips byte-exact in R2.`);
} else {
  console.log(`\n⛔ DO NOT DELETE: ${missing.length + mismatch.length} clip(s) not verified in R2.`);
}

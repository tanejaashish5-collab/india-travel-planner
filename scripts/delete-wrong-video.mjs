#!/usr/bin/env node
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
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
const keys = process.argv.slice(2).filter(a => !a.startsWith("-"));
if (!keys.length) { console.error("Usage: node delete-wrong-video.mjs <key1> [key2 ...]"); process.exit(1); }
for (const key of keys) {
  await client.send(new DeleteObjectCommand({ Bucket: "nakshiq-videos", Key: key }));
  console.log(`✓ Deleted ${key}`);
}

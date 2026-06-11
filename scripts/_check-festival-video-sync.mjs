#!/usr/bin/env node
/**
 * READ-ONLY. Lists the nakshiq-videos R2 bucket and compares against the
 * 330 local festival B-roll clips in data/festivals/videos/.
 * Reports: which festival slugs are already in R2 (flat {slug}.mp4 and/or
 * under a festivals/ prefix), which are missing, and total bucket size.
 */
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync } from "fs";

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

// All keys in the bucket
const keys = new Set();
let token;
do {
  const r = await client.send(new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: token }));
  for (const o of r.Contents || []) keys.add(o.Key);
  token = r.IsTruncated ? r.NextContinuationToken : undefined;
} while (token);

console.log(`R2 bucket "${BUCKET}" total objects: ${keys.size}`);
const festivalPrefixed = [...keys].filter((k) => k.startsWith("festivals/"));
console.log(`  objects under festivals/ prefix: ${festivalPrefixed.length}`);

const local = readdirSync("data/festivals/videos").filter((f) => f.endsWith(".mp4"));
console.log(`\nLocal festival clips: ${local.length}`);

const missingFlat = [];
const missingBoth = [];
for (const f of local) {
  const slug = f; // {slug}.mp4
  const flat = keys.has(slug);
  const pref = keys.has(`festivals/${slug}`);
  if (!flat) missingFlat.push(slug);
  if (!flat && !pref) missingBoth.push(slug);
}

console.log(`\nMatched as flat "{slug}.mp4" in bucket: ${local.length - missingFlat.length}/${local.length}`);
console.log(`Missing from flat keys: ${missingFlat.length}`);
console.log(`Missing from BOTH flat and festivals/ prefix: ${missingBoth.length}`);
if (missingBoth.length) {
  console.log(`\nFirst 20 fully-missing:`);
  console.log(missingBoth.slice(0, 20).map((s) => "  " + s).join("\n"));
}

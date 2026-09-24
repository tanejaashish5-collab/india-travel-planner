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
// The PUBLIC base the renderer actually fetches from (r2_videos.py R2_VIDEO_BASE).
// A HEAD against the S3 API is not proof of anything the renderer can use.
const PUBLIC = process.env.R2_VIDEO_BASE
  || "https://pub-bcda9bac2f63408880ee3f23aa3548e5.r2.dev";

/** Does the object actually SERVE? A matching ContentLength does not mean it
 *  does: on 2026-09-21 achabal__sos_rescue__b2.mp4 HEADed at the correct 1618271
 *  bytes and returned HTTP 500 from r2.dev on every request, so the renderer
 *  silently dropped that beat and cut the reel from 3 clips instead of 4. A
 *  re-PUT of the identical bytes fixed it. Verify the thing the consumer uses,
 *  not the thing that is convenient to check. */
const serves = async (Key, size) => {
  try {
    const r = await fetch(`${PUBLIC}/${encodeURIComponent(Key)}`, { method: "GET" });
    if (!r.ok) return `HTTP ${r.status}`;
    const got = (await r.arrayBuffer()).byteLength;
    return got === size ? true : `served ${got} of ${size} bytes`;
  } catch (e) { return String(e).slice(0, 60); }
};

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
let up = 0, skip = 0; const bad = [];

for (const f of files) {
  // A row still "pending" was never taken in this cycle (intake sets
  // "collected" first), so a file under its name is OLD footage left over from
  // an earlier storyboard with the same clip name. Marking it live would pass
  // stale footage off as the new prompt: on 2026-09-24 the old champawat noodle
  // clips satisfied four freshly re-queued bal mithai rows this way.
  const pend = q.find((r) => r.clip === f && r.status === "pending");
  if (pend) {
    console.log(`[upload] ${f} is on disk but its row is still pending — stale file, ignored`);
    continue;
  }
  const body = readFileSync(join(OUT, f));
  const h = await head(f);
  // Already on R2 at the same byte size. Mark the row live ANYWAY: the object
  // being present is what "live" means, and the previous version only set it on
  // the PUT path, so a re-run left 20 of 25 rows saying "collected" while the
  // footage was actually serving (observed 2026-09-21). A status that
  // under-reports reality is how a working thing gets redone.
  if (h && Number(h.ContentLength) === body.length) {
    const ok = await serves(f, body.length);
    if (ok === true) {
      skip++;
      const done = q.find((r) => r.clip === f);
      if (done && done.status !== "live") done.status = "live";
      continue;
    }
    // Right size, will not serve. Re-PUT the same bytes; that is what fixed it.
    console.log(`[upload] ${f} is the right size but does not serve (${ok}) — re-uploading`);
  }
  await client.send(new PutObjectCommand({
    Bucket: BUCKET, Key: f, Body: body, ContentType: "video/mp4",
  }));
  up++;
  const ok = await serves(f, body.length);
  console.log(`[upload] ${f} (${(body.length / 1e6).toFixed(1)} MB) ` +
              (ok === true ? "serving" : `NOT SERVING: ${ok}`));
  const row = q.find((r) => r.clip === f);
  // "live" means the renderer can fetch it. Anything else stays "collected" so
  // the next run retries rather than reporting a clip that is not there.
  if (row && ok === true) row.status = "live";
  if (ok !== true) bad.push(f);
}
if (q.length) writeFileSync(QUEUE, JSON.stringify(q, null, 2));
console.log(`[upload] uploaded ${up}, already current ${skip}`);
if (bad.length) {
  console.log(`[upload] ⚠️  ${bad.length} clip(s) are in the bucket but do NOT serve:`);
  for (const f of bad) console.log(`   ${f}`);
  process.exitCode = 1;   // a clip the renderer cannot fetch is a failed upload
}

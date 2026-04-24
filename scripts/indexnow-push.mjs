#!/usr/bin/env node
/**
 * indexnow-push.mjs — push a list of URLs to our /api/indexnow route so
 * Bing, Yandex, and federated IndexNow partners re-crawl in minutes,
 * not days.
 *
 * Usage (piped):
 *   echo "https://www.nakshiq.com/en/destination/kaza" | node scripts/indexnow-push.mjs
 *
 * Usage (list file):
 *   node scripts/indexnow-push.mjs --file data/urls-to-refresh.txt
 *
 * Usage (arg list):
 *   node scripts/indexnow-push.mjs https://www.nakshiq.com/en/destination/kaza https://www.nakshiq.com/en/destination/leh
 *
 * Env required:
 *   NAKSHIQ_BASE_URL           (defaults to https://www.nakshiq.com)
 *   INDEXNOW_WEBHOOK_SECRET    (shared secret for /api/indexnow)
 */
import { readFileSync } from "fs";
import { config } from "dotenv";

config({ path: "apps/web/.env.local" });

const BASE = process.env.NAKSHIQ_BASE_URL ?? "https://www.nakshiq.com";
const SECRET = process.env.INDEXNOW_WEBHOOK_SECRET;
const BATCH = 1000;

if (!SECRET) {
  console.error("✗ INDEXNOW_WEBHOOK_SECRET is not set in apps/web/.env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
let urls = [];

const fileFlagIdx = args.indexOf("--file");
if (fileFlagIdx >= 0 && args[fileFlagIdx + 1]) {
  const path = args[fileFlagIdx + 1];
  urls = readFileSync(path, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
} else if (args.length > 0) {
  urls = args.filter((a) => a.startsWith("http"));
}

if (urls.length === 0 && !process.stdin.isTTY) {
  const stdin = await new Promise((resolve) => {
    let data = "";
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
  urls = stdin
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
}

if (urls.length === 0) {
  console.error("✗ no URLs supplied (pass args, --file, or pipe via stdin)");
  process.exit(1);
}

console.log(`IndexNow push · ${urls.length} URLs · batches of ${BATCH}\n`);

let total = 0;
for (let i = 0; i < urls.length; i += BATCH) {
  const batch = urls.slice(i, i + BATCH);
  const res = await fetch(`${BASE}/api/indexnow`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-indexnow-secret": SECRET,
    },
    body: JSON.stringify({ urls: batch }),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) {
    console.error(`  ✗ batch ${i}-${i + batch.length}: ${json.error ?? res.status}`);
    process.exit(2);
  }
  total += batch.length;
  console.log(
    `  ✓ batch ${i}-${i + batch.length} · upstream ${json.upstream_status} · submitted ${batch.length}`
  );
}

console.log(`\nDone. Submitted ${total} URLs to IndexNow (Bing/Yandex/federated).`);

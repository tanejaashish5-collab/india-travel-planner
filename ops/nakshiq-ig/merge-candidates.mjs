#!/usr/bin/env node
/**
 * merge-candidates.mjs — verify scouted Instagram handles and merge into pool.json
 *
 * Usage: node merge-candidates.mjs candidates.json [--dry]
 *   candidates.json = [{ "handle": "x", "niche": "y", "states": ["himachal-pradesh"] }, ...]
 *
 * Web search invents handles that look plausible and do not exist, so nothing
 * enters the pool without a live public-profile check. Also enforces the size
 * band: tiny accounts are usually dormant, huge ones never follow back.
 *
 * Read-only against Instagram. No login, no session, no actions.
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/ashishtaneja/Automation/nakshiq-ig";
const POOL = path.join(ROOT, "pool.json");
const MIN_FOLLOWERS = 800;
const MAX_FOLLOWERS = 200000;

const infile = process.argv[2];
const DRY = process.argv.includes("--dry");
if (!infile) { console.error("usage: node merge-candidates.mjs candidates.json [--dry]"); process.exit(2); }

const candidates = JSON.parse(fs.readFileSync(infile, "utf8"));
const pool = JSON.parse(fs.readFileSync(POOL, "utf8"));
const existing = new Set(pool.accounts.map((a) => a.handle.toLowerCase()));

function toNumber(s) {
  const t = String(s).replace(/,/g, "").trim();
  if (/K$/i.test(t)) return Math.round(parseFloat(t) * 1000);
  if (/M$/i.test(t)) return Math.round(parseFloat(t) * 1e6);
  return parseInt(t, 10) || 0;
}

const browser = await chromium.launch({ headless: true, channel: "chrome" });
const ctx = await browser.newContext({
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36",
});
const page = await ctx.newPage();

const added = [], rejected = [];
for (const c of candidates) {
  const handle = String(c.handle || "").replace(/^@/, "").trim();
  if (!handle) continue;
  if (existing.has(handle.toLowerCase())) { rejected.push([handle, "already in pool"]); continue; }
  let followers = null, reason = null;
  for (let attempt = 0; attempt < 2 && followers === null; attempt++) {
    try {
      await page.goto(`https://www.instagram.com/${handle}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(2200 + Math.random() * 1300);
      const desc = await page.evaluate(() =>
        document.querySelector('meta[name="description"]')?.content || document.title);
      const m = desc.match(/([\d.,]+[KM]?)\s+followers?,\s*([\d.,]+[KM]?)\s+following,\s*([\d.,]+[KM]?)\s+posts/i);
      if (m) followers = m[1];
      else { reason = /isn't available|page not found/i.test(desc) ? "does not exist" : "unreadable"; if (reason === "does not exist") break; }
    } catch (e) { reason = String(e.message).slice(0, 40); }
  }
  if (followers === null) { rejected.push([handle, reason || "unreadable"]); console.log(`  ✗ @${handle} — ${reason}`); continue; }
  const n = toNumber(followers);
  if (n < MIN_FOLLOWERS) { rejected.push([handle, `too small (${followers})`]); console.log(`  ✗ @${handle} — too small (${followers})`); continue; }
  if (n > MAX_FOLLOWERS) { rejected.push([handle, `too big (${followers})`]); console.log(`  ✗ @${handle} — too big (${followers})`); continue; }
  added.push({ handle, niche: c.niche || "India travel", states: c.states || [] });
  existing.add(handle.toLowerCase());
  console.log(`  ✓ @${handle} — ${followers}`);
}
await browser.close();

console.log(`\nverified ${added.length} new, rejected ${rejected.length}`);
if (!DRY && added.length) {
  pool.accounts.push(...added);
  fs.writeFileSync(POOL, JSON.stringify(pool, null, 2) + "\n");
  console.log(`pool.json now holds ${pool.accounts.length} accounts`);
} else if (DRY) {
  console.log("(dry run — pool.json untouched)");
}
fs.writeFileSync(path.join(ROOT, "logs", "last-merge.json"),
  JSON.stringify({ when: new Date().toISOString(), added, rejected }, null, 1));

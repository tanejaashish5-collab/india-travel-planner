#!/usr/bin/env node
/**
 * flow-run.mjs — work through veo_queue.json in Google Flow, across 6 accounts.
 *
 * THIS IS THE JOB THAT NEVER EXISTED. Audited 2026-09-20: nothing in the repo
 * ever submitted a prompt to Flow. `scripts/veo-harvest.mjs` only collects files
 * a human had already downloaded by hand; there was no LaunchAgent, no crontab
 * line and no workflow. The 30 clips of 2026-09-15 were one manual session, and
 * the daily allowance has gone unused every day since. Not a bug — an absent job.
 *
 * BUDGET: 6 accounts x 50 credits/day, Veo 3.1 Lite at 10 credits = 5 clips per
 * account per day = 30/day.
 *
 * MODEL SELECTION IS NOT OPTIONAL. Flow's default family is Omni 1.1 Flash at 12
 * credits; Veo 3.1 Lite at 10 must be picked explicitly in EVERY project or the
 * run silently costs 20% more and yields 4 clips per account instead of 5. If
 * the model control cannot be found this script REFUSES the account rather than
 * generating on the default.
 *
 * AUTH: this never touches a credential screen. It drives a persistent profile
 * that the founder signed into once (`--login`). If an account shows a sign-in
 * wall it is recorded and skipped — the script will not attempt to log in.
 *
 * SELECTORS: Flow is a Google app with generated class names and no stable test
 * ids, so every selector below is a best-effort guess until the first
 * AUTHENTICATED run confirms it. `--probe` dumps what is actually on the page so
 * they can be corrected in one pass instead of by trial and error. Nothing here
 * pretends to have been verified against a logged-in Flow session.
 */
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import os from "os";

const HERE = dirname(fileURLToPath(import.meta.url));
const PROFILE = join(HERE, "profile");
const QUEUE = join(HERE, "veo_queue.json");
const DOWNLOADS = join(HERE, "downloads");
const OUT = join(HERE, "clips");

const ACCOUNTS = Number(process.env.VEO_ACCOUNTS || 6);
const PER_ACCOUNT = Number(process.env.VEO_PER_ACCOUNT || 5);   // 50 credits / 10
const MODE = process.argv.includes("--login") ? "login"
  : process.argv.includes("--probe") ? "probe" : "run";
const HEADFUL = MODE !== "run" || process.argv.includes("--headful");
const GEN_TIMEOUT_MS = Number(process.env.VEO_GEN_TIMEOUT_MS || 6 * 60 * 1000);

// Every DOM assumption in one place. Each entry is a list of candidates tried in
// order; the first that resolves wins. See the SELECTORS note in the header.
const SEL = {
  signedOut: ['a[href*="accounts.google.com/ServiceLogin"]', 'text=/^Sign in$/'],
  agentToggle: ['button:has-text("Agent")', '[aria-label*="Agent" i]'],
  settings: ['button[aria-label*="setting" i]', 'button:has-text("Settings")'],
  modelPicker: ['[aria-label*="model" i]', 'button:has-text("Omni")', 'button:has-text("Veo")'],
  modelLite: ['text=/Veo 3\\.1 Lite/i'],
  promptBox: ['textarea', '[contenteditable="true"]', '[role="textbox"]'],
  submit: ['button[aria-label*="generate" i]', 'button[type="submit"]',
           'button:has-text("Create")', 'button:has-text("Generate")'],
  tileDone: ['video', '[data-generated="true"]'],
};

const log = (...a) => console.log(`[flow-run ${new Date().toISOString().slice(11, 19)}]`, ...a);

async function first(scope, cands, { timeout = 4000 } = {}) {
  for (const c of cands) {
    const loc = scope.locator(c).first();
    try {
      await loc.waitFor({ state: "visible", timeout });
      return loc;
    } catch { /* try the next candidate */ }
  }
  return null;
}

function loadQueue() {
  if (!existsSync(QUEUE)) return [];
  return JSON.parse(readFileSync(QUEUE, "utf-8"));
}
function saveQueue(q) {
  writeFileSync(QUEUE, JSON.stringify(q, null, 2));
}

async function probe(page) {
  log("PROBE — what is actually on this page:");
  const info = await page.evaluate(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const grab = (sel, n) => [...document.querySelectorAll(sel)].filter(vis).slice(0, n).map((e) => ({
      tag: e.tagName.toLowerCase(),
      label: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 60),
      cls: (e.className || "").toString().slice(0, 40),
    }));
    return {
      title: document.title,
      url: location.href,
      buttons: grab("button", 25),
      textboxes: grab('textarea,[contenteditable="true"],[role="textbox"]', 6),
    };
  });
  console.log(JSON.stringify(info, null, 2));
}

async function runAccount(ctx, n, rows) {
  const page = await ctx.newPage();
  const res = { account: n, done: [], failed: [], reason: null };
  try {
    await page.goto(`https://flow.google.com/?authuser=${n}`,
                    { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3500);

    if (MODE === "probe") { await probe(page); return res; }

    if (await first(page, SEL.signedOut, { timeout: 2500 })) {
      // Never attempt a login. That is the founder's identity, and a script
      // that types credentials is a script that leaks them.
      res.reason = "signed out — run `--login` once for this account";
      log(`account ${n}: ${res.reason}`);
      return res;
    }

    // Agent mode HIDES the settings button (hidden attribute), which makes the
    // page look broken rather than misconfigured. Documented 2026-09-15.
    const agent = await first(page, SEL.agentToggle, { timeout: 2000 });
    if (agent) { try { await agent.click(); await page.waitForTimeout(800); } catch {} }

    // Veo 3.1 Lite or nothing — see the header. Generating on the default model
    // costs 20% more per clip and is exactly the silent waste this job exists
    // to end, so a missing control is a refusal, not a fallback.
    const gear = await first(page, SEL.settings, { timeout: 5000 });
    if (gear) { try { await gear.click(); await page.waitForTimeout(700); } catch {} }
    const picker = await first(page, SEL.modelPicker, { timeout: 4000 });
    if (picker) { try { await picker.click(); await page.waitForTimeout(600); } catch {} }
    const lite = await first(page, SEL.modelLite, { timeout: 4000 });
    if (!lite) {
      res.reason = "could not select Veo 3.1 Lite — refusing to generate on the "
                 + "default model (Omni 1.1 Flash, 12 credits vs 10)";
      log(`account ${n}: ${res.reason}`);
      return res;
    }
    await lite.click();
    await page.waitForTimeout(900);

    for (const row of rows) {
      const box = await first(page, SEL.promptBox, { timeout: 8000 });
      if (!box) { res.failed.push({ clip: row.clip, why: "no prompt box" }); break; }
      await box.click();
      await box.fill(row.prompt);
      await page.waitForTimeout(400);
      const go = await first(page, SEL.submit, { timeout: 5000 });
      if (!go) { res.failed.push({ clip: row.clip, why: "no submit control" }); break; }
      await go.click();
      log(`account ${n}: submitted ${row.clip}`);
      try {
        await page.locator(SEL.tileDone[0]).first()
          .waitFor({ state: "visible", timeout: GEN_TIMEOUT_MS });
        res.done.push(row.clip);
      } catch {
        res.failed.push({ clip: row.clip, why: "generation timed out" });
      }
      await page.waitForTimeout(1500);
    }
  } catch (e) {
    res.reason = String(e).slice(0, 200);
  } finally {
    await page.close().catch(() => {});
  }
  return res;
}

async function main() {
  mkdirSync(PROFILE, { recursive: true });
  mkdirSync(DOWNLOADS, { recursive: true });
  mkdirSync(OUT, { recursive: true });

  const ctx = await chromium.launchPersistentContext(PROFILE, {
    channel: "chrome",
    headless: !HEADFUL,
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
    downloadsPath: DOWNLOADS,
  });

  if (MODE === "login") {
    const page = await ctx.newPage();
    await page.goto("https://flow.google.com/");
    log("A browser window is open. Sign in to each Google account you want this");
    log("job to use, then close the window. Nothing is typed for you and no");
    log("credential is stored by this script — the browser profile holds the");
    log("session, exactly as it would if you had opened Chrome yourself.");
    await page.waitForEvent("close", { timeout: 20 * 60 * 1000 }).catch(() => {});
    await ctx.close();
    return 0;
  }

  const q = loadQueue();
  const pending = q.filter((r) => r.status === "pending");
  log(`queue: ${pending.length} pending of ${q.length}`);
  if (!pending.length && MODE === "run") { await ctx.close(); log("nothing to do"); return 0; }

  const results = [];
  for (let n = 0; n < ACCOUNTS; n++) {
    const slice = pending.slice(n * PER_ACCOUNT, (n + 1) * PER_ACCOUNT);
    if (!slice.length && MODE === "run") break;
    results.push(await runAccount(ctx, n, slice));
  }
  await ctx.close();

  if (MODE === "probe") return 0;

  const done = new Set(results.flatMap((r) => r.done));
  for (const row of q) if (done.has(row.clip)) row.status = "generated";
  saveQueue(q);

  const okCount = done.size;
  const failed = results.flatMap((r) => r.failed);
  log(`generated ${okCount}, failed ${failed.length}`);
  for (const r of results) if (r.reason) log(`  account ${r.account}: ${r.reason}`);

  // Total failure MUST be loud. A job that reports success while producing
  // nothing is how the last one stayed invisible for five days.
  if (okCount === 0) {
    log("ERROR: zero clips generated — exiting non-zero so the wrapper alerts");
    return 1;
  }
  return 0;
}

main().then((c) => process.exit(c)).catch((e) => { console.error(e); process.exit(1); });

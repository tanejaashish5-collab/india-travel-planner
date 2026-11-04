#!/usr/bin/env node
// hi-noindex-check.mjs: the pre-registered read of the 2026-11-05 cleanup, which
// noindexed 7,499 mostly-English Hindi URLs and took 1,080 region URLs out of the
// sitemap (list: apps/web/src/lib/hi-noindex.ts). Rules agreed with the founder
// BEFORE shipping, so the result cannot be argued afterwards:
//
//   watch  Two full weeks in a row under 450 clicks: email him the reversal
//          decision. Silent otherwise. Weeks count from Mon 2026-11-09.
//   final  From 2026-12-16, re-inspect the same URLs as the 2026-11-04 baseline.
//          Worked = kept pages gain 10+ points of indexed rate AND clicks stay at
//          500+ a week. Also reads the Request Indexing test against its controls.
//
// It only reads Search Console and emails him. It never changes the site.
// Runner: scripts/hi-noindex-check.sh (LaunchAgent com.nakshiq.hi-noindex-check).
//   node --no-warnings --env-file=apps/web/.env.local scripts/hi-noindex-check.mjs watch|final [--no-email] [--limit N]

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { google } from "googleapis";
import { isHiNoindexedPath } from "../apps/web/src/lib/hi-noindex.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const AUDITS = path.join(ROOT, "gsc-audits");
const BASELINE = path.join(AUDITS, "index-sample-2026-11-04.tsv");
const TEST = path.join(AUDITS, "request-indexing-test-2026-11-05.tsv");
const TEST_LOG = path.join(AUDITS, "request-indexing-test-log.tsv"); // written by the Cowork GSC audit
const STATE = path.join(os.homedir(), "Automation", "hi-noindex-check");
const FIRST_WEEK = "2026-11-09";
const REVERSE_BELOW = 450;
const SUCCESS_CLICKS = 500;
const SUCCESS_POINTS = 10;

const args = process.argv.slice(2);
const mode = args[0];
const noEmail = args.includes("--no-email");
const limitAt = args.indexOf("--limit");
const limit = limitAt >= 0 ? Number(args[limitAt + 1]) : Infinity;
const siteUrl = process.env.GSC_SITE_URL;
if (!siteUrl) throw new Error("GSC_SITE_URL not set: run with --env-file=apps/web/.env.local");
mkdirSync(STATE, { recursive: true });

const secrets = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const oauth = JSON.parse(readFileSync(path.join(secrets, "gsc-oauth-client.json"), "utf8"));
const cfg = oauth.web ?? oauth.installed ?? oauth.desktop;
const auth = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
auth.setCredentials({ refresh_token: readFileSync(path.join(secrets, "gsc-refresh-token.txt"), "utf8").trim() });
const gsc = google.searchconsole({ version: "v1", auth });

const iso = (d) => d.toISOString().slice(0, 10);
// Local date, to match `date +%Y-%m-%d` in the runner. UTC is the day before here until 11am.
const localDay = () => new Date().toLocaleDateString("en-CA");
const DAY = 864e5;

/** The two latest complete Mon-Sun weeks with final data, oldest first. */
function latestWeeks(now = new Date()) {
  const last = new Date(now.getTime() - 3 * DAY);
  const sunday = new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate() - last.getUTCDay()));
  return [1, 0].map((back) => {
    const end = new Date(sunday.getTime() - back * 7 * DAY);
    return { start: iso(new Date(end.getTime() - 6 * DAY)), end: iso(end) };
  });
}

/** Clicks for a week: total, and how many landed on the pages we removed. */
async function weekClicks({ start, end }) {
  let total = 0;
  let removed = 0;
  for (let startRow = 0; ; startRow += 25000) {
    const { data } = await gsc.searchanalytics.query({
      siteUrl,
      requestBody: { startDate: start, endDate: end, dimensions: ["page"], rowLimit: 25000, startRow, dataState: "final" },
    });
    const rows = data.rows ?? [];
    for (const r of rows) {
      total += r.clicks;
      if (isRemoved(r.keys[0])) removed += r.clicks;
    }
    if (rows.length < 25000) break;
  }
  return { start, end, total, removed };
}

function isRemoved(url) {
  const [, locale, ...rest] = new URL(url).pathname.split("/");
  return rest[0] === "region" || (locale === "hi" && isHiNoindexedPath(rest.join("/")));
}

function family(url) {
  const [, locale, first = "home", , third] = new URL(url).pathname.split("/");
  return `${locale} ${first === "destination" ? (third ? "month" : "hub") : first}`;
}

async function inspect(url) {
  for (let attempt = 0; ; attempt++) {
    try {
      const { data } = await gsc.urlInspection.index.inspect({ requestBody: { inspectionUrl: url, siteUrl } });
      const idx = data.inspectionResult?.indexStatusResult ?? {};
      return { url, indexed: idx.verdict === "PASS" ? 1 : 0, coverage: idx.coverageState ?? "(none)", last_crawl: idx.lastCrawlTime?.slice(0, 10) ?? "(never)" };
    } catch (e) {
      if (attempt >= 4) return { url, indexed: null, coverage: `ERROR ${e.code ?? e.message}`, last_crawl: "" };
      await new Promise((r) => setTimeout(r, 2 ** attempt * 2000 + Math.random() * 1000));
    }
  }
}

async function inspectAll(urls, concurrency = 4) {
  const out = [];
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < urls.length) out.push(await inspect(urls[next++]));
  }));
  return out;
}

async function sendEmail(subject, text) {
  if (noEmail) return console.log(`--no-email, would send: ${subject}\n${text}`);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "NakshIQ Ops <ops@nakshiq.com>", to: [process.env.ADMIN_EMAIL], subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  console.log(`emailed: ${subject}`);
}

const weekLine = (w) => `${w.start} to ${w.end}: ${w.total} clicks (${w.removed} on the removed pages)`;
const readTsv = (file) => {
  const [head, ...rows] = readFileSync(file, "utf8").trim().split("\n").map((l) => l.split("\t"));
  return rows.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i]])));
};
const rate = (rows) => (rows.length ? (100 * rows.filter((r) => Number(r.indexed) === 1).length) / rows.length : 0);

async function watch() {
  const weeks = latestWeeks();
  if (weeks[0].start < FIRST_WEEK) return console.log(`${localDay()}: under two full weeks since the change, nothing to judge yet`);
  const read = await Promise.all(weeks.map(weekClicks));
  read.forEach((w) => console.log(weekLine(w)));
  if (!read.every((w) => w.total < REVERSE_BELOW)) return;
  const marker = path.join(STATE, `.alerted-${weeks[1].end}`);
  if (existsSync(marker)) return;
  await sendEmail(
    `NakshIQ: clicks under ${REVERSE_BELOW} for two weeks after the Hindi page cleanup`,
    `The rule we set on 5 Nov has tripped, so the cleanup should be reversed unless something else explains the fall.\n\n${read.map(weekLine).join("\n")}\n\nIf the removed-pages number is small, the fall came from elsewhere (season, rankings) and reversing will not fix it. To reverse, tell Claude: "reverse the Hindi noindex".`,
  );
  writeFileSync(marker, localDay());
}

async function final() {
  const baseline = readTsv(BASELINE).slice(0, limit);
  const now = await inspectAll(baseline.map((r) => r.url));
  const nowBy = new Map(now.map((r) => [r.url, r]));
  const errors = now.filter((r) => r.indexed === null).length;
  const pairs = baseline.filter((b) => nowBy.get(b.url)?.indexed !== null);
  const kept = pairs.filter((b) => !isRemoved(b.url));
  const removed = pairs.filter((b) => isRemoved(b.url));
  const after = (rows) => rows.map((b) => nowBy.get(b.url));
  const gain = rate(after(kept)) - rate(kept);
  const weeks = await Promise.all(latestWeeks().map(weekClicks));

  const verdict = weeks.every((w) => w.total < REVERSE_BELOW)
    ? `REVERSE: clicks stayed under ${REVERSE_BELOW} a week for two weeks`
    : gain >= SUCCESS_POINTS && weeks.every((w) => w.total >= SUCCESS_CLICKS)
      ? `WORKED: kept pages gained ${gain.toFixed(0)} points and clicks held at ${SUCCESS_CLICKS}+`
      : `NO CLEAR GAIN: kept pages moved ${gain.toFixed(0)} points (needed +${SUCCESS_POINTS}), clicks ${weeks.map((w) => w.total).join(" and ")} (needed ${SUCCESS_CLICKS}+)`;

  const families = [...new Set(kept.map((b) => family(b.url)))].sort();
  const table = families.map((f) => {
    const rows = kept.filter((b) => family(b.url) === f);
    return `| ${f} | ${rows.length} | ${rate(rows).toFixed(0)}% | ${rate(after(rows)).toFixed(0)}% |`;
  });

  let testBlock = "Request Indexing test: no test file found.";
  if (existsSync(TEST)) {
    const test = readTsv(TEST);
    const result = new Map((await inspectAll(test.map((t) => t.url))).map((r) => [r.url, r]));
    const log = existsSync(TEST_LOG) ? readFileSync(TEST_LOG, "utf8") : "";
    const requested = test.filter((t) => t.group === "request" && new RegExp(`^${t.url}\\trequested`, "m").test(log));
    const control = test.filter((t) => t.group === "control");
    const line = (label, rows) => `- ${label}: ${rows.filter((t) => result.get(t.url)?.indexed === 1).length} of ${rows.length} indexed now`;
    testBlock = requested.length
      ? `Request Indexing test, all were not indexed on 2026-11-05:\n${line("requested", requested)}\n${line("control (not requested)", control)}`
      : "Request Indexing test: no request was logged as made, so this part of the test did not run.";
  }

  const stamp = localDay();
  const summary = [
    verdict,
    "",
    `Kept pages indexed: ${rate(kept).toFixed(0)}% on 2026-11-04, ${rate(after(kept)).toFixed(0)}% now (same ${kept.length} URLs).`,
    `Removed pages indexed: ${rate(removed).toFixed(0)}% on 2026-11-04, ${rate(after(removed)).toFixed(0)}% now (same ${removed.length} URLs).`,
    ...weeks.map(weekLine),
    "",
    testBlock,
    errors ? `\n${errors} URLs could not be inspected and are left out.` : "",
  ].join("\n");
  const report = `# Hindi noindex: 6-week read, ${stamp}\n\n${summary}\n\n| Kept family | URLs | 2026-11-04 | now |\n|---|---|---|---|\n${table.join("\n")}\n\nA sample of 20 to 40 URLs per family, so a family's own number moves a lot by chance. This does not prove cause: rankings and season moved over the same six weeks.\n`;
  console.log(report);
  // A --limit run is a trial: it writes nothing and emails nothing. The dated names
  // below can never equal the baseline file (a trial once overwrote it, 2026-11-05).
  if (Number.isFinite(limit)) return;
  writeFileSync(path.join(AUDITS, `hi-noindex-recheck-${stamp}.tsv`), ["url\tindexed\tcoverage\tlast_crawl", ...now.map((r) => [r.url, r.indexed, r.coverage, r.last_crawl].join("\t"))].join("\n") + "\n");
  writeFileSync(path.join(AUDITS, `hi-noindex-recheck-${stamp}.md`), report);

  const marker = path.join(STATE, ".final-emailed");
  if (!existsSync(marker)) {
    await sendEmail(`NakshIQ Hindi page cleanup, 6-week result: ${verdict.split(":")[0]}`, summary);
    if (!noEmail) writeFileSync(marker, stamp);
  }
}

if (mode === "watch") await watch();
else if (mode === "final") await final();
else throw new Error("usage: hi-noindex-check.mjs watch|final [--no-email] [--limit N]");

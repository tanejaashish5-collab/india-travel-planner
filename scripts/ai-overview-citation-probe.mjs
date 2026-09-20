#!/usr/bin/env node
/**
 * ai-overview-citation-probe.mjs — measure whether Google's AI Overview CITES
 * nakshiq.com, per query.
 *
 * WHY THIS EXISTS (2026-09-20)
 * ----------------------------
 * Three live SERP probes that day showed an AI Overview on every query checked,
 * pushing the first organic link 628–940px down the page. That is the mechanism
 * behind the site's headline anomaly: NakshIQ holds position 1-3 on 3,016
 * queries and converts them at 1.39%, where a top-3 listing should convert far
 * higher. On "lansdowne vs kasauli" NakshIQ is cited inside the AI Overview AND
 * ranks #1, and that page has the best CTR in the /vs/ family. On
 * "shimla vs mussoorie" a small blog (travelcoffee.in) is cited four times and
 * NakshIQ is not cited at all.
 *
 * Citation is becoming the real position 1, and until this script there was no
 * measurement of it whatsoever. Ranking is measured daily by GSC; being quoted
 * is measured by nothing.
 *
 * HONESTY RULES BAKED IN (not left to the caller)
 * -----------------------------------------------
 * 1. A BLOCKED probe is never recorded as "not cited". Google captchas headless
 *    sessions, and a run that silently scored every query as uncited would look
 *    like a catastrophic ranking loss. Blocked probes are their own status.
 * 2. If EVERY probe fails, the run exits non-zero and sets ok:false. A cron that
 *    reports success while 100% of items failed never alerts anyone — that exact
 *    failure mode is already a scar in this repo.
 * 3. The run records the raw cited-source list per query, so a later reader can
 *    check the verdict rather than trust it.
 *
 * Google blocks headless Chromium here, so this runs HEADFUL and therefore needs
 * a logged-in Aqua session — schedule it as a LaunchAgent, never as cron.
 *
 * Usage:
 *   node scripts/ai-overview-citation-probe.mjs                # frozen target-set queries
 *   node scripts/ai-overview-citation-probe.mjs --limit 10
 *   node scripts/ai-overview-citation-probe.mjs --query "shimla vs mussoorie"
 */
import path from "node:path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "gsc-audits");
const TARGET_SET = path.join(OUT_DIR, "decision-target-set-2026-09-20.json");

const argv = process.argv.slice(2);
const argOf = (flag, dflt) => {
  const i = argv.indexOf(flag);
  return i === -1 ? dflt : argv[i + 1];
};
const LIMIT = Number(argOf("--limit", 20));
const ONE = argOf("--query", null);

// ---- query list ------------------------------------------------------------
// Default: the highest-impression queries from the frozen decision target set,
// so citation tracking and the ranking push measure the SAME cohort.
// POSITIVE CONTROL. On 2026-09-20 this query was verified by hand to cite
// NakshIQ inside the AI Overview (we are also organic #1 on it). It is probed
// FIRST on every run. If the control comes back "not cited", the extractor is
// broken or Google changed its markup — and a 0% citation rate that run is a
// measurement failure, not a result. Without this, a silently-broken selector
// reports a catastrophic-looking 0% forever. An earlier version of this script
// did exactly that: it scored 0/12 while scraping "Skip to main content" as a
// citation.
const CONTROL_QUERY = "lansdowne vs kasauli";

function queryList() {
  if (ONE) return [{ query: ONE, page: null, impressions: null, position: null, isControl: false }];
  if (!existsSync(TARGET_SET)) {
    console.error(`ERR: no target set at ${path.relative(ROOT, TARGET_SET)} — run scripts/gsc-decision-target-set.mjs first`);
    process.exit(2);
  }
  const t = JSON.parse(readFileSync(TARGET_SET, "utf8"));
  const seen = new Set([CONTROL_QUERY]);
  const out = [{ query: CONTROL_QUERY, page: "/en/vs/lansdowne-vs-kasauli", impressions: null, position: null, isControl: true }];
  for (const r of t.targets) {
    if (seen.has(r.query)) continue;
    seen.add(r.query);
    out.push({ query: r.query, page: r.page, impressions: r.impressions, position: r.position, isControl: false });
    if (out.length > LIMIT) break;
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function probe(ctx, q) {
  const page = await ctx.newPage();
  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(q)}&gl=in&hl=en&num=20`,
      { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(3000);
    for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 1300); await page.waitForTimeout(600); }
    await page.waitForTimeout(1200);

    const text = await page.evaluate(() => document.body.innerText);
    if (/unusual traffic|not a robot|detected unusual|before you continue/i.test(text)) {
      return { status: "blocked" };
    }

    return await page.evaluate(() => {
      const t = document.body.innerText;
      const hasAio = /AI Overview/.test(t);

      // yOf is still needed for the first-organic measurement below.
      const yOf = (el) => el.getBoundingClientRect().top + window.scrollY;

      // How far down the page the first organic result begins — the whole
      // point of the measurement, since an AI Overview pushes it down.
      const firstOrganic = document.querySelector("a h3") || document.querySelector("h3");
      const firstOrganicY = firstOrganic ? Math.round(yOf(firstOrganic)) : null;

      // Organic order by source label under each result heading.
      const organic = [];
      for (const h3 of document.querySelectorAll("h3")) {
        const box = h3.closest("div");
        const lbl = box ? (box.innerText || "").split("\n").map((s) => s.trim()).filter(Boolean) : [];
        organic.push({ title: h3.innerText.trim().slice(0, 90), context: lbl.slice(0, 4).join(" | ").slice(0, 160) });
      }

      // Slice the AI Overview out of the page TEXT, bounded by the next
      // section heading rather than by a fixed character count. A fixed 1200
      // characters silently truncated the source list: on the control query
      // "NakshIQ" sits at index ~1838, just past the cut, so the probe reported
      // "not cited" for a query where we ARE cited. Geometry alone was not
      // enough either, hence belt and braces — text range OR in-band anchors.
      let aioText = "";
      if (hasAio) {
        const i = t.search(/AI Overview/);
        const rest = t.slice(i);
        const stop = rest.search(/\n(Web results|People also ask|Discussions and forums)\n/);
        aioText = (stop > 0 ? rest.slice(0, stop) : rest.slice(0, 4000)).replace(/\s+/g, " ").trim();
      }
      // Google labels each AI Overview claim with its SOURCE NAME as link text
      // ("NakshIQ", "Quora", "Travel Coffee"). Hrefs are /goto? redirects that
      // hide the real domain, so the visible label is the only reliable signal.
      const CHROME = /^(Skip to main content|Accessibility help|Sign in|All|Images|Videos|News|Maps|Books|Flights|Finance|Shopping|More|Tools|Short videos|Forums|Web|Show more|Show all|Read more|View all|Translate this page|AI Mode|Feedback|More results from .*|\d+ answers?|\d+:\d+|More short videos|\+\d+)$/i;
      // Source names are collected by asking which anchor labels actually
      // appear INSIDE that text range. Pure geometry was unreliable — it
      // captured one label out of eight on the control query — because the
      // citation chips are nested in scroll containers whose bounding boxes
      // do not line up with the visual band.
      const cited = [];
      if (aioText) {
        for (const a of document.querySelectorAll("a")) {
          const label = (a.innerText || "").trim().split("\n")[0].trim();
          if (!label || label.length > 40 || label.length < 2) continue;
          if (CHROME.test(label)) continue;
          if (!aioText.includes(label)) continue;
          if (!cited.includes(label)) cited.push(label);
        }
      }

      const nakshInAio = /nakshiq/i.test(cited.join(" ")) || /nakshiq/i.test(aioText);
      const nakshOrganicRank = organic.findIndex((o) => /nakshiq/i.test(o.title + " " + o.context));

      return {
        status: "ok",
        hasAiOverview: hasAio,
        citedInAiOverview: nakshInAio,
        citedSources: cited.slice(0, 25),
        firstOrganicY,
        pageHeight: document.body.scrollHeight,
        organicRankVisible: nakshOrganicRank === -1 ? null : nakshOrganicRank + 1,
        topOrganic: organic.slice(0, 6).map((o) => o.title),
        aiOverviewExcerpt: aioText.slice(0, 400),
      };
    });
  } catch (e) {
    return { status: "error", error: e.message.split("\n")[0] };
  } finally {
    await page.close();
  }
}

// ---- run -------------------------------------------------------------------
const queries = queryList();
console.log(`# probing ${queries.length} queries (headful Chromium, en-IN)`);

const browser = await chromium.launch({ headless: false, args: ["--disable-blink-features=AutomationControlled"] });
const ctx = await browser.newContext({
  locale: "en-IN", viewport: { width: 1400, height: 1000 },
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
});

const results = [];
for (const [i, q] of queries.entries()) {
  const r = await probe(ctx, q.query);
  results.push({ ...q, ...r });
  const mark = r.status !== "ok" ? r.status.toUpperCase()
    : r.citedInAiOverview ? "CITED"
      : r.hasAiOverview ? "not cited" : "no AIO";
  console.log(`${String(i + 1).padStart(3)}/${queries.length}  ${mark.padEnd(10)} ${q.query}`);
  await sleep(2000 + Math.random() * 1500);
}
await browser.close();

const measured = results.filter((r) => !r.isControl);
const okRuns = measured.filter((r) => r.status === "ok");
const blocked = results.filter((r) => r.status === "blocked").length;
const errored = results.filter((r) => r.status === "error").length;
const withAio = okRuns.filter((r) => r.hasAiOverview);
const citedN = withAio.filter((r) => r.citedInAiOverview).length;

// Positive control: did the query we KNOW cites us come back cited?
const control = results.find((r) => r.isControl);
const controlStatus = !control ? "absent"
  : control.status !== "ok" ? control.status
    : control.citedInAiOverview ? "pass" : "FAIL";

// Rule 2: total failure must be loud. A failed control makes the run's numbers
// untrustworthy even when every probe technically "succeeded".
const ok = okRuns.length > 0 && controlStatus !== "FAIL";

const date = new Date().toISOString().slice(0, 10);
mkdirSync(OUT_DIR, { recursive: true });
const jsonPath = path.join(OUT_DIR, `ai-citation-${date}.json`);
const mdPathEarly = path.join(OUT_DIR, `ai-citation-${date}.md`);

// A failed run must never DESTROY a good one. Google rate-limits after a burst,
// so a retry later the same day can come back 100% blocked; letting that
// overwrite the morning's real measurement would turn a transient block into a
// permanent hole in the series. Caught in testing on 2026-09-20, when exactly
// this wiped a clean 12-query run.
if (!ok && (existsSync(jsonPath) || existsSync(mdPathEarly))) {
  console.error(`\nERR: every probe failed (${blocked} blocked, ${errored} errored).`);
  console.error(controlStatus === "FAIL"
    ? `Cause: the positive control came back UNCITED, so this run cannot be trusted.`
    : `Cause: ${blocked} blocked, ${errored} errored.`);
  console.error(`REFUSING to overwrite the existing ${date} result — it holds real data.`);
  console.error(`Re-run later; Google rate-limits bursts from one IP.`);
  process.exit(1);
}
writeFileSync(jsonPath, JSON.stringify({
  ok, date, controlQuery: CONTROL_QUERY, controlStatus,
  probed: measured.length,
  succeeded: okRuns.length, blocked, errored,
  withAiOverview: withAio.length,
  citedCount: citedN,
  citationRate: withAio.length ? +(100 * citedN / withAio.length).toFixed(1) : null,
  results,
}, null, 2));

const pct = (n, d) => (d ? `${(100 * n / d).toFixed(0)}%` : "n/a");
const md = [
  `# AI Overview citation probe — ${date}`,
  ``,
  `Measures whether Google's AI Overview quotes nakshiq.com, for the decision-intent`,
  `queries in \`decision-target-set-2026-09-20.json\`. Citation is the new position 1:`,
  `an AI Overview pushes the first organic link 600-950px down the page, so being`,
  `quoted matters more than being ranked.`,
  ``,
  `| Metric | Value |`,
  `|---|---:|`,
  `| Queries probed | ${measured.length} |`,
  `| Probes that succeeded | ${okRuns.length} |`,
  `| Blocked by Google | ${blocked} |`,
  `| Errored | ${errored} |`,
  `| SERPs showing an AI Overview | ${withAio.length} (${pct(withAio.length, okRuns.length)} of successful) |`,
  `| **AI Overviews citing NakshIQ** | **${citedN} (${pct(citedN, withAio.length)} of those)** |`,
  ``,
  `| Positive control (\`${CONTROL_QUERY}\`) | ${controlStatus === "pass" ? "pass" : `**${controlStatus}**`} |`,
  ``,
  controlStatus === "FAIL"
    ? `> **CONTROL FAILED — the query verified by hand to cite NakshIQ came back uncited. Treat every number above as a measurement fault (broken selector or changed Google markup), NOT as a citation loss.**`
    : okRuns.length === 0
      ? `> **RUN FAILED — every probe was blocked or errored. The numbers above are not a ranking signal; do not read them as a loss of citations.**`
      : ``,
  ``,
  `## Per query`,
  ``,
  `| Query | AIO | NakshIQ cited | Our visible rank | First organic (px) |`,
  `|---|---|---|---:|---:|`,
  ...measured.map((r) => r.status !== "ok"
    ? `| ${r.query} | — | _${r.status}_ | — | — |`
    : `| ${r.query} | ${r.hasAiOverview ? "yes" : "no"} | ${r.citedInAiOverview ? "**yes**" : "no"} | ${r.organicRankVisible ?? "—"} | ${r.firstOrganicY ?? "—"} |`),
  ``,
  `## Who gets cited instead`,
  ``,
  ...(() => {
    const tally = {};
    for (const r of withAio) for (const s of r.citedSources || []) tally[s] = (tally[s] || 0) + 1;
    const top = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 15);
    return top.length
      ? [`| Source | AI Overviews citing it |`, `|---|---:|`,
         ...top.map(([s, n]) => `| ${s} | ${n} |`)]
      : [`_No citation labels captured._`];
  })(),
  ``,
  `_Generated by \`scripts/ai-overview-citation-probe.mjs\`. Headful Chromium, en-IN, logged out._`,
  ``,
].join("\n");

const mdPath = path.join(OUT_DIR, `ai-citation-${date}.md`);
writeFileSync(mdPath, md);

console.log(`\n# wrote ${path.relative(ROOT, mdPath)}`);
console.log(`# wrote ${path.relative(ROOT, jsonPath)}`);
console.log(`# positive control "${CONTROL_QUERY}": ${controlStatus}`);
console.log(`# AI Overview present on ${withAio.length}/${okRuns.length} successful probes; NakshIQ cited in ${citedN} (${pct(citedN, withAio.length)})`);
if (controlStatus === "FAIL") {
  console.error(`\nERR: positive control came back UNCITED. The extractor or Google's markup changed.`);
  console.error(`Do not read this run's 0% as a citation loss — it is a measurement fault.`);
  process.exit(3);
}
if (!ok) {
  console.error(`\nERR: every probe failed (${blocked} blocked, ${errored} errored). Not a ranking signal.`);
  process.exit(1);
}

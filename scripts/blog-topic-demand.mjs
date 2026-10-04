#!/usr/bin/env node
// blog-topic-demand.mjs — snapshot of real GSC demand, bucketed into the
// weekly blog batch's 4 lanes, written to data/seo/blog-topic-demand.json.
//
// Why: the cloud blog routine cannot reach GSC (.secrets is gitignored), and
// the daily audits only list top-10 queries, so it kept picking the same
// "is X in <month> worth it" topic. This file gives it the long tail per lane.
//
// Lanes (mix decided 2026-09-27 from 28d/90d GSC). No itinerary lane: those
// queries already land on /itinerary/<dest> pages, so a blog would cannibalise.
//   month_verdict        — "<dest> in/weather <month>" for the NEXT 3 months (lead time)
//   distance_difficulty  — km / steps / how hard / how long (treks, parikramas, routes)
//   hindi_cost           — घूमने का खर्च / kharcha / budget queries
//   seasonal_timing      — week-of-month, crowds, snow, "safe now", opening/closing
//                          (added 2026-10-04; replaces the routine's "rotating" slot)
//
// Added 2026-10-04 (founder-approved), because GSC only shows demand we are
// already visible for:
//   structured_page — our own /cost, /treks, /pilgrimage or /permits page already
//                     ranks top-15 for the query → improve that page, no blog.
//   autocomplete    — Google suggests this phrase in India = people really type it.
//   reddit_questions— real questions from r/IndiaTravel (top of month + new),
//                     tagged with the destinations they name.
// External checks are best-effort: a failure is recorded in `external`, never fatal.
//
// Run locally (weekly via scripts/demand-gaps-cron.sh):
//   node scripts/blog-topic-demand.mjs
// Read-only: searchanalytics.query + public autocomplete/RSS GETs.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local"), quiet: true });
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }
const sd = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const cj = JSON.parse(readFileSync(path.join(sd, "gsc-oauth-client.json"), "utf8"));
const cfg = cj.web ?? cj.installed ?? cj.desktop;
const rt = process.env.GSC_OAUTH_REFRESH_TOKEN ?? readFileSync(path.join(sd, "gsc-refresh-token.txt"), "utf8").trim();
const { google } = await import("googleapis");
const o = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
o.setCredentials({ refresh_token: rt });
const gsc = google.searchconsole({ version: "v1", auth: o });

const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2);
const start = new Date(end); start.setDate(start.getDate() - 90);

const MONTHS = ["january", "february", "march", "april", "may", "june", "july",
  "august", "september", "october", "november", "december"];
const now = new Date();
const target = [1, 2, 3].map((k) => MONTHS[(now.getMonth() + k) % 12]);
const monthRe = new RegExp(`\\b(${target.join("|")}|${target.map((m) => m.slice(0, 3)).join("|")})\\b`);

const ALL_MONTHS_RE = new RegExp(`\\b(${MONTHS.join("|")}|${MONTHS.map((m) => m.slice(0, 3)).join("|")}|sept)\\b`);
const SEASONAL_RE = /(first|1st|second|2nd|last|mid|end) week|\b(mid|end|start|early|late) (of )?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|crowd|rush|\bsnow|\bsafe\b|safety|\bnow\b|current situation|landslide|(opening|closing|kapat|kapaat|open|close) date|kab khul|kab band|is .* (open|closed)/;

const MONSOON_AHEAD = target.some((m) => ["june", "july", "august", "september"].includes(m));
// Order matters: first matching lane wins.
const LANES = {
  hindi_cost: (q) => /खर्च|kharch|kharcha|budget|कितना|cost of|trip cost|total cost/.test(q),
  distance_difficulty: (q) => /\b(km|kms|distance|steps|kitni|difficulty|difficult|treks?|trekking|hikes?|hiking|parikrama|climb|altitude|height)\b|how long|how many|how hard/.test(q),
  // A month named in the query must be one of the next 3 (lead time); no month is fine ("kedarnath closing date").
  seasonal_timing: (q) => SEASONAL_RE.test(q) && (!ALL_MONTHS_RE.test(q) || monthRe.test(q)) && (!/monsoon/.test(q) || MONSOON_AHEAD),
  month_verdict: (q) => monthRe.test(q),
};
// Families whose own page may already answer the query. The routine SKIPS such
// candidates in distance_difficulty; in hindi_cost it is a flag only, because
// darjeeling-ghumne-ka-kharcha won clicks with /hi/cost/darjeeling at #3 (GSC 90d to 2026-10-02).
const STRUCTURED = ["cost", "treks", "pilgrimage", "permits"];
const family = (p) => { const seg = p.split("/").filter(Boolean); return (["en", "hi"].includes(seg[0]) ? seg[1] : seg[0]) ?? ""; };

const rows = [];
for (let startRow = 0; startRow < 75000; startRow += 25000) {
  const { data } = await gsc.searchanalytics.query({ siteUrl: SITE_URL, requestBody: {
    startDate: iso(start), endDate: iso(end), dimensions: ["query", "page"], rowLimit: 25000, startRow } });
  rows.push(...(data.rows ?? []));
  if ((data.rows ?? []).length < 25000) break;
}

const norm = (q) => q.toLowerCase().replace(/\b20\d\d\b/g, "").replace(/\s+/g, " ").trim();
const out = {};
for (const lane of Object.keys(LANES)) out[lane] = new Map();
for (const r of rows) {
  const [query, page] = r.keys;
  const q = norm(query);
  const lane = Object.keys(LANES).find((l) => LANES[l](q));
  if (!lane) continue;
  const m = out[lane];
  const e = m.get(q) ?? { query: q, impressions: 0, clicks: 0, posSum: 0, pages: {} };
  e.impressions += r.impressions; e.clicks += r.clicks; e.posSum += r.position * r.impressions;
  const p = page.replace(/^https?:\/\/[^/]+/, "");
  const pg = (e.pages[p] ??= { imp: 0, posSum: 0 });
  pg.imp += r.impressions; pg.posSum += r.position * r.impressions;
  m.set(q, e);
}

const result = {
  generated: iso(now),
  window: { start: iso(start), end: iso(end) },
  month_verdict_targets: target,
  note: "Candidates only. The routine must still check the articles table + data/blog-drafts/ for an existing angle, grep vs-pairs for comparisons, and ground every claim in DB rows. blog_ranks=true means a /blog/ page already gets impressions for this query: skip unless the new article is a clearly different question. structured_page set = our own /cost, /treks, /pilgrimage or /permits page already ranks top-15: in distance_difficulty skip it (improve that page instead); in hindi_cost it is allowed, but the post must link that page and add what its table lacks. autocomplete.confirmed=true = Google suggests the phrase in India: prefer these. reddit_questions = real traveller questions; usable only when the DB can answer them.",
  external: {},
  lanes: {},
};
for (const [lane, m] of Object.entries(out)) {
  result.lanes[lane] = [...m.values()]
    .filter((e) => e.impressions >= 10)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 60)
    .map((e) => {
      const pages = Object.entries(e.pages).sort((a, b) => b[1].imp - a[1].imp);
      const own = pages
        .map(([p, v]) => ({ page: p, family: family(p), position: +(v.posSum / v.imp).toFixed(1) }))
        .filter((x) => STRUCTURED.includes(x.family) && x.position <= 15)
        .sort((a, b) => a.position - b.position)[0];
      return {
        query: e.query,
        impressions: e.impressions,
        clicks: e.clicks,
        avg_position: +(e.posSum / e.impressions).toFixed(1),
        top_page: pages[0][0],
        blog_ranks: pages.some(([p]) => p.includes("/blog/")),
        ...(own ? { structured_page: own } : {}),
      };
    });
}

// ── External demand (best-effort) ──────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/128 Safari/537.36" };
async function suggest(q) {
  const hl = /[\u0900-\u097F]/.test(q) ? "hi" : "en";
  const u = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&gl=in&q=${encodeURIComponent(q)}`;
  const r = await fetch(u, { headers: UA, signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return (JSON.parse(await r.text())[1] ?? []).map(norm);
}
const AC_PER_LANE = 20;
let acChecked = 0, acFailed = 0;
const usable = (lane, x) => !x.blog_ranks && !(x.structured_page && lane === "distance_difficulty");
for (const [lane, list] of Object.entries(result.lanes)) {
  for (const c of list.filter((x) => usable(lane, x)).slice(0, AC_PER_LANE)) {
    try {
      const s = await suggest(c.query);
      c.autocomplete = { confirmed: s.some((x) => x === c.query || x.startsWith(c.query + " ")), suggestions: s.slice(0, 5) };
      acChecked++;
    } catch { acFailed++; }
    await sleep(350);
  }
}
result.external.autocomplete = acFailed && !acChecked ? "failed" : `ok: ${acChecked} checked, ${acFailed} failed`;

const known = JSON.parse(readFileSync(path.join(ROOT, "apps", "web", "data", "known-destination-slugs.json"), "utf8")).slugs;
const SUFFIX = /-(valley|national-park|np|lake|falls|caves|island|hills|fort|temple|crater)$/;
const destTerms = known.flatMap((id) => {
  const t = [id.replace(/-/g, " ")];
  if (SUFFIX.test(id)) t.push(id.replace(SUFFIX, "").replace(/-/g, " "));
  return t.filter((x) => x.length >= 4).map((term) => ({ id, re: new RegExp(`\\b${term}\\b`, "i") }));
});
const QUESTION_RE = /\?|^(is|are|how|what|which|where|when|should|can|could|any|need|help|planning|best|suggest|advice)\b/i;
const decode = (x) => x.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const seen = new Map();
const redditStatus = [];
for (const feed of ["top/.rss?t=month&limit=100", "new/.rss?limit=100"]) {
  try {
    let r;
    for (let attempt = 0; attempt < 3; attempt++) { // reddit 429s back-to-back feed reads
      r = await fetch(`https://www.reddit.com/r/IndiaTravel/${feed}`, { headers: UA, signal: AbortSignal.timeout(15000) });
      if (r.status !== 429) break;
      await sleep(8000 * (attempt + 1));
    }
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const xml = await r.text();
    let n = 0;
    for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const title = decode((m[1].match(/<title>([\s\S]*?)<\/title>/) ?? [])[1] ?? "").trim();
      const url = (m[1].match(/<link href="([^"]+)"/) ?? [])[1];
      const published = ((m[1].match(/<published>([^<]+)<\/published>/) ?? [])[1] ?? "").slice(0, 10);
      if (!title || !url || seen.has(url)) continue;
      const destinations = [...new Set(destTerms.filter((d) => d.re.test(title)).map((d) => d.id))];
      if (!QUESTION_RE.test(title) || !destinations.length) continue;
      seen.set(url, { title, url, published, destinations }); n++;
    }
    redditStatus.push(`${feed.split("/")[0]} ok (${n})`);
  } catch (err) { redditStatus.push(`${feed.split("/")[0]} failed: ${err.message}`); }
  await sleep(5000);
}
result.reddit_questions = [...seen.values()].slice(0, 40);
result.external.reddit = redditStatus.join("; ");
const file = path.join(ROOT, "data", "seo", "blog-topic-demand.json");
writeFileSync(file, JSON.stringify(result, null, 2) + "\n");
for (const [lane, list] of Object.entries(result.lanes)) {
  const open = list.filter((x) => usable(lane, x));
  const ac = open.filter((x) => x.autocomplete?.confirmed).length;
  console.log(`${lane}: ${list.length} candidates (${open.length} open, ${list.filter((x) => x.structured_page).length} own-page, ${ac} autocomplete-confirmed), top: ${open.slice(0, 4).map((x) => `${x.query} [${x.impressions}]`).join(" · ")}`);
}
console.log(`reddit questions: ${result.reddit_questions.length} · external: ${JSON.stringify(result.external)}`);
console.log(`wrote ${path.relative(ROOT, file)}`);

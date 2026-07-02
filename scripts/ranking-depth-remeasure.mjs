#!/usr/bin/env node
// Ranking-depth cycle — day-14 re-measure (read-only, searchanalytics.query only).
// Compares each target + control page's current 14d GSC window against the
// baseline snapshot, so the internal-link intervention is judged against a
// matched control set rather than seasonality.
//
// Usage: node scripts/ranking-depth-remeasure.mjs [--baseline data/ranking-depth-cycle/baseline-2026-07-03.json]
// The current window auto-derives: same length as the baseline window, ending
// 2 days before today (GSC freshness lag).
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
config({ path: path.join(ROOT, ".env.local") });

const { google } = await import("googleapis");

const baselineArg = process.argv.indexOf("--baseline");
const baselinePath = baselineArg > -1
  ? path.resolve(ROOT, process.argv[baselineArg + 1])
  : path.join(ROOT, "data", "ranking-depth-cycle", "baseline-2026-07-03.json");
const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));

// Cycle 1 sets (2026-07-03). Targets got the July rail cohort + festivals link
// + hubOnly entries (commit on main, 2026-07-03); controls were left alone.
const TARGETS = [
  "https://www.nakshiq.com/en/destination/wayanad/july",
  "https://www.nakshiq.com/en/festivals/month/july",
  "https://www.nakshiq.com/hi/destination/chandratal",
  "https://www.nakshiq.com/en/destination/shrikhand-mahadev",
  "https://www.nakshiq.com/en/destination/landour/july",
];
const CONTROLS = [
  "https://www.nakshiq.com/en/destination/varkala/july",
  "https://www.nakshiq.com/en/destination/matheran/july",
  "https://www.nakshiq.com/en/destination/morni-hills",
  "https://www.nakshiq.com/en/festivals/state/lakshadweep",
  "https://www.nakshiq.com/hi/cost/jaisalmer",
];

const clientJson = JSON.parse(readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const client = clientJson.installed || clientJson.web;
const refreshToken = process.env.GSC_OAUTH_REFRESH_TOKEN
  || readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim();
const oauth2 = new google.auth.OAuth2(client.client_id, client.client_secret);
oauth2.setCredentials({ refresh_token: refreshToken });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const siteUrl = process.env.GSC_SITE_URL;

// Same window length as baseline, ending 2 days ago (GSC lag).
const msDay = 86400000;
const baseLen = Math.round((new Date(baseline.window.e) - new Date(baseline.window.s)) / msDay);
const end = new Date(Date.now() - 2 * msDay);
const start = new Date(end.getTime() - baseLen * msDay);
const iso = (d) => d.toISOString().slice(0, 10);
const WIN = { s: iso(start), e: iso(end) };

async function pageMetrics(url) {
  const r = await gsc.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: WIN.s, endDate: WIN.e, dimensions: ["page"], rowLimit: 1,
      dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "equals", expression: url }] }],
    },
  });
  const row = r.data.rows?.[0];
  return row
    ? { clicks: row.clicks, impressions: row.impressions, ctr: +(row.ctr * 100).toFixed(2), position: +row.position.toFixed(1) }
    : { clicks: 0, impressions: 0, ctr: 0, position: null };
}

const baseFor = (url) => baseline.striking.find((r) => r.page === url) ?? null;

function fmtDelta(cur, base, key, invert = false) {
  if (!base || cur[key] == null || base[key] == null) return "n/a";
  const d = +(cur[key] - base[key]).toFixed(1);
  const good = invert ? d < 0 : d > 0;
  return `${d > 0 ? "+" : ""}${d}${good ? " ✅" : d === 0 ? "" : " 🔻"}`;
}

const lines = [];
lines.push(`# Ranking-depth cycle — day-14 re-measure`);
lines.push(``);
lines.push(`Baseline window: ${baseline.window.s}..${baseline.window.e} · Current window: ${WIN.s}..${WIN.e}`);
lines.push(``);
for (const [label, set] of [["TARGETS (got internal links)", TARGETS], ["CONTROLS (untouched)", CONTROLS]]) {
  lines.push(`## ${label}`);
  lines.push(``);
  lines.push(`| Page | Pos then | Pos now | Δpos | Imp then | Imp now | Clicks then | Clicks now |`);
  lines.push(`|---|---|---|---|---|---|---|---|`);
  for (const url of set) {
    const cur = await pageMetrics(url);
    const base = baseFor(url);
    const p = url.replace("https://www.nakshiq.com", "");
    lines.push(
      `| ${p} | ${base?.position ?? "n/a"} | ${cur.position ?? "gone"} | ${fmtDelta(cur, base, "position", true)} | ${base?.impressions ?? "n/a"} | ${cur.impressions} | ${base?.clicks ?? "n/a"} | ${cur.clicks} |`,
    );
  }
  lines.push(``);
}
lines.push(`Read: intervention worked if TARGET Δpos is meaningfully more negative (better) than CONTROL Δpos — position is the primary metric (CTR follows position at these ranks). July seasonality inflates/deflates both sets equally; the control delta is the seasonality estimate.`);
lines.push(``);

const outPath = path.join(ROOT, "data", "ranking-depth-cycle", `remeasure-${iso(new Date())}.md`);
writeFileSync(outPath, lines.join("\n"));
console.log(lines.join("\n"));
console.log(`\nWritten: ${outPath}`);

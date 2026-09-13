#!/usr/bin/env node
/**
 * gen-high-impression-pages.mjs — regenerate apps/web/src/lib/high-impression-pages.ts from GSC
 *
 *   node --env-file=apps/web/.env.local scripts/gen-high-impression-pages.mjs [--days 28] [--min-imp 75]
 *
 * The rail on /where-to-go and /explore links to dest×month pages that sit at
 * positions 5-12 with real impressions — the band where one position bump
 * doubles clicks. The list was hand-curated in May/June/July 2026 and never
 * refreshed, so by September it surfaced nothing current. This makes it a
 * generated artefact: anchor text = the page's top GSC query, verbatim, minus
 * the year (that literal match is where the leverage is).
 *
 * Only destination×month and destination-hub URLs qualify (the rail's type).
 * Cost / vs / festival pages in the same band are handled elsewhere.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const DAYS = Number(arg("days", 28)), MIN_IMP = Number(arg("min-imp", 75));
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }
const sd = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const cj = JSON.parse(readFileSync(path.join(sd, "gsc-oauth-client.json"), "utf8")); const cfg = cj.web ?? cj.installed ?? cj.desktop;
const rt = process.env.GSC_OAUTH_REFRESH_TOKEN ?? readFileSync(path.join(sd, "gsc-refresh-token.txt"), "utf8").trim();
const { google } = await import("googleapis");
const o = new google.auth.OAuth2(cfg.client_id, cfg.client_secret); o.setCredentials({ refresh_token: rt });
const gsc = google.searchconsole({ version: "v1", auth: o });
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2); const start = new Date(end); start.setDate(start.getDate() - DAYS);

const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const q = async (dimensions, extra = {}) => (await gsc.searchanalytics.query({ siteUrl: SITE_URL,
  requestBody: { startDate: iso(start), endDate: iso(end), dimensions, rowLimit: 5000, ...extra } })).data.rows ?? [];

// 1. Candidate pages: en destination×month or hub, position 5-12, ≥MIN_IMP impressions.
const pages = (await q(["page"])).map((r) => ({ page: r.keys[0].replace(/^https?:\/\/[^/]+/, ""), clicks: r.clicks, impressions: r.impressions, position: r.position }))
  .filter((r) => r.position >= 5 && r.position <= 12 && r.impressions >= MIN_IMP)
  .map((r) => { const m = r.page.match(/^\/en\/destination\/([^/]+)(?:\/([a-z]+))?$/); return m ? { ...r, destId: m[1], monthSlug: m[2] } : null; })
  .filter((r) => r && (!r.monthSlug || MONTHS.includes(r.monthSlug)));

// 2. Top query per candidate page — one call with page+query dims, grouped.
const pq = await q(["page", "query"]);
const topQuery = new Map();
for (const r of pq) {
  const p = r.keys[0].replace(/^https?:\/\/[^/]+/, "");
  const cur = topQuery.get(p);
  if (!cur || r.impressions > cur.impressions) topQuery.set(p, { query: r.keys[1], impressions: r.impressions });
}

// 3. Validate slugs against the known-destination allowlist so the rail never 404s.
const known = new Set(JSON.parse(readFileSync(path.join(ROOT, "apps/web/data/known-destination-slugs.json"), "utf8")).slugs);
// Sentence case per apps/web/docs/voice.md: capitalise the first word, the
// destination's own words (from its slug) and month names; leave the rest.
const MONTH_RE = new RegExp(`\\b(${MONTHS.join("|")})\\b`, "g");
const anchorFor = (query, destId) => {
  const own = new Set(destId.split("-"));
  const words = query.split(/\s+/).map((w, i) => (i === 0 || own.has(w.toLowerCase())) ? w.charAt(0).toUpperCase() + w.slice(1) : w);
  return words.join(" ").replace(MONTH_RE, (m) => m.charAt(0).toUpperCase() + m.slice(1));
};
const rows = [];
for (const r of pages) {
  if (!known.has(r.destId)) { console.error(`  skip unknown slug ${r.destId}`); continue; }
  const tq = topQuery.get(r.page); if (!tq) continue;
  const query = tq.query.replace(/\s*20\d\d\s*/g, " ").trim();
  if (!/[a-z]/i.test(query)) continue;                        // rail is the en locale
  const monthSlug = r.monthSlug ?? MONTHS[new Date().getMonth()];
  rows.push({ destId: r.destId, monthSlug, anchor: anchorFor(query, r.destId), query, position: +r.position.toFixed(1), impressions: r.impressions, hubOnly: !r.monthSlug });
}
rows.sort((a, b) => a.monthSlug.localeCompare(b.monthSlug) || b.impressions - a.impressions);

const src = readFileSync(path.join(ROOT, "apps/web/src/lib/high-impression-pages.ts"), "utf8");
const head = src.slice(0, src.indexOf("export const HIGH_IMPRESSION_PAGES"));
const tail = src.slice(src.indexOf("];", src.indexOf("export const HIGH_IMPRESSION_PAGES")) + 2);
const body = rows.map((r) => `  { destId: ${JSON.stringify(r.destId)}, monthSlug: ${JSON.stringify(r.monthSlug)}, anchor: ${JSON.stringify(r.anchor)}, query: ${JSON.stringify(r.query)}, position: ${r.position}, impressions: ${r.impressions}${r.hubOnly ? ", hubOnly: true" : ""} },`).join("\n");
const banner = `// GENERATED by scripts/gen-high-impression-pages.mjs on ${iso(new Date())} from GSC\n// ${iso(start)} → ${iso(end)} (${DAYS}d), position 5-12, ≥${MIN_IMP} impressions. Do not hand-edit;\n// re-run the script (monthly, or when the weekly audit shows the cohort shifted).\n`;
writeFileSync(path.join(ROOT, "apps/web/src/lib/high-impression-pages.ts"), head + banner + "export const HIGH_IMPRESSION_PAGES: HighImpressionPage[] = [\n" + body + "\n];" + tail);
console.log(`wrote ${rows.length} entries (${rows.filter((r) => r.hubOnly).length} hub-only) → apps/web/src/lib/high-impression-pages.ts`);
const byMonth = {}; for (const r of rows) byMonth[r.monthSlug] = (byMonth[r.monthSlug] || 0) + 1; console.log("by month:", byMonth);

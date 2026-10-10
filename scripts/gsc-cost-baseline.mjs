#!/usr/bin/env node
/**
 * Search Console baseline for the cost work (2026-10-10): did accurate prices change anything?
 *   node --env-file=apps/web/.env.local scripts/gsc-cost-baseline.mjs <out.json> [blog-slugs.txt] [endDate]
 * Groups: /cost/ pages, the blog posts whose prices were rewritten, and site queries about cost/budget/price/hotel.
 * Window: 28 complete days ending endDate (default: 3 days ago, GSC lags). Re-run ~4 weeks later and compare.
 */
import path from "node:path";
import fs from "node:fs";
import { google } from "googleapis";
const ROOT = path.resolve(import.meta.dirname, "..");
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("ERR: GSC_SITE_URL not set"); process.exit(1); }
const cfgJson = JSON.parse(fs.readFileSync(path.join(ROOT, ".secrets", "gsc-oauth-client.json"), "utf8"));
const cfg = cfgJson.web ?? cfgJson.installed ?? cfgJson.desktop;
const oauth2 = new google.auth.OAuth2(cfg.client_id, cfg.client_secret);
oauth2.setCredentials({ refresh_token: process.env.GSC_OAUTH_REFRESH_TOKEN || fs.readFileSync(path.join(ROOT, ".secrets", "gsc-refresh-token.txt"), "utf8").trim() });
const gsc = google.searchconsole({ version: "v1", auth: oauth2 });
const [out, slugFile, endArg] = process.argv.slice(2);
const end = endArg ? new Date(endArg) : new Date(Date.now() - 3 * 86400e3);
const start = new Date(end.getTime() - 27 * 86400e3);
const d = (x) => x.toISOString().slice(0, 10);
const q = async (body) => (await gsc.searchanalytics.query({ siteUrl: SITE_URL, requestBody: { startDate: d(start), endDate: d(end), rowLimit: 25000, ...body } })).data.rows ?? [];
const sum = (rows) => { const c = rows.reduce((s, r) => s + r.clicks, 0), i = rows.reduce((s, r) => s + r.impressions, 0);
  return { pages: rows.length, clicks: c, impressions: i, ctr: i ? +(c / i * 100).toFixed(2) : 0, avg_position: i ? +(rows.reduce((s, r) => s + r.position * r.impressions, 0) / i).toFixed(1) : null }; };
const costPages = await q({ dimensions: ["page"], dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: "/cost/" }] }] });
const slugs = slugFile ? fs.readFileSync(slugFile, "utf8").split("\n").filter(Boolean) : [];
const allPages = await q({ dimensions: ["page"] });
const blogRows = allPages.filter((r) => slugs.some((s) => r.keys[0].includes(`/blog/${s}`)));
const queries = await q({ dimensions: ["query"], dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "includingRegex", expression: "(cost|budget|price|prices|hotel|hotels|cheap|kharcha|खर्च)" }] }] });
const res = { site: SITE_URL, window: { start: d(start), end: d(end) }, generated_at: new Date().toISOString(),
  site_total: sum(allPages),
  cost_pages: { ...sum(costPages), top: costPages.sort((a, b) => b.impressions - a.impressions).slice(0, 25).map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1) })) },
  edited_blogs: { slugs: slugs.length, ...sum(blogRows), rows: blogRows.map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1) })) },
  cost_queries: { ...sum(queries), top: queries.sort((a, b) => b.impressions - a.impressions).slice(0, 30).map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: +r.position.toFixed(1) })) } };
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ window: res.window, site: res.site_total, cost_pages: { ...res.cost_pages, top: undefined }, edited_blogs: { ...res.edited_blogs, rows: undefined }, cost_queries: { ...res.cost_queries, top: undefined } }, null, 1));

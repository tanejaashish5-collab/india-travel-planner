#!/usr/bin/env node
/**
 * ranking-push-check.mjs — score the 2026-09-13 ranking push against its pre-registered baseline
 *
 *   node --env-file=apps/web/.env.local scripts/ranking-push-check.mjs [--baseline gsc-audits/ranking-push-candidates-2026-09-13.json]
 *
 * Re-pulls the same 28-day GSC page table the baseline was cut from, joins on
 * page, and reports the movement of (a) the /hi/cost/* family — the TITLE
 * lever — and (b) the Sep/Oct dest×month rail cohort — the INTERNAL-LINK lever.
 * The two are separable by construction: cost pages are not in the rail.
 *
 * Targets are the ones written down on 2026-09-13 in
 * gsc-audits/ranking-push-baseline-2026-09-13.md. This script does not move
 * them. A miss is a finding.
 *
 * Writes gsc-audits/ranking-push-check-YYYY-MM-DD.md and exits 0 on success,
 * 1 on any failure to measure (never a silent "ok").
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const BASELINE = arg("baseline", "gsc-audits/ranking-push-candidates-2026-09-13.json");
const SITE_URL = process.env.GSC_SITE_URL;
if (!SITE_URL) { console.error("FATAL: GSC_SITE_URL not set"); process.exit(1); }
if (!existsSync(BASELINE)) { console.error(`FATAL: baseline ${BASELINE} missing`); process.exit(1); }

const base = JSON.parse(readFileSync(BASELINE, "utf8"));
const baseAll = new Map(base.all.map((r) => [r.page.replace(/^https?:\/\/[^/]+/, ""), r]));
const railPath = path.join(ROOT, "apps/web/src/lib/high-impression-pages.ts");
const railSrc = existsSync(railPath) ? readFileSync(railPath, "utf8") : "";
const railPages = new Set([...railSrc.matchAll(/destId: "([^"]+)", monthSlug: "([^"]+)"[^}]*?(hubOnly: true)?\s*}/g)]
  .map((m) => (m[3] ? `/en/destination/${m[1]}` : `/en/destination/${m[1]}/${m[2]}`)));

const sd = process.env.GSC_SECRETS_DIR ?? path.join(ROOT, ".secrets");
const cj = JSON.parse(readFileSync(path.join(sd, "gsc-oauth-client.json"), "utf8")); const cfg = cj.web ?? cj.installed ?? cj.desktop;
const rt = process.env.GSC_OAUTH_REFRESH_TOKEN ?? readFileSync(path.join(sd, "gsc-refresh-token.txt"), "utf8").trim();
const { google } = await import("googleapis");
const o = new google.auth.OAuth2(cfg.client_id, cfg.client_secret); o.setCredentials({ refresh_token: rt });
const gsc = google.searchconsole({ version: "v1", auth: o });
const iso = (d) => d.toISOString().slice(0, 10);
const end = new Date(); end.setDate(end.getDate() - 2); const start = new Date(end); start.setDate(start.getDate() - 28);
const q = async (dimensions, extra = {}) => (await gsc.searchanalytics.query({ siteUrl: SITE_URL,
  requestBody: { startDate: iso(start), endDate: iso(end), dimensions, rowLimit: 5000, ...extra } })).data.rows ?? [];

const nowRows = (await q(["page"])).map((r) => ({ page: r.keys[0].replace(/^https?:\/\/[^/]+/, ""), clicks: r.clicks, impressions: r.impressions, position: r.position }));
if (!nowRows.length) { console.error("FATAL: GSC returned 0 rows — not writing a check"); process.exit(1); }
const now = new Map(nowRows.map((r) => [r.page, r]));

const sum = (rows, k) => rows.reduce((a, r) => a + (r[k] || 0), 0);
const avgPos = (rows) => rows.length ? rows.reduce((a, r) => a + r.position * r.impressions, 0) / Math.max(1, sum(rows, "impressions")) : 0;
const family = (pred) => {
  const b = [...baseAll.values()].filter((r) => pred(r.page.replace(/^https?:\/\/[^/]+/, "")));
  const n = b.map((r) => now.get(r.page.replace(/^https?:\/\/[^/]+/, ""))).filter(Boolean);
  return { b, n };
};
const hiCost = family((p) => p.startsWith("/hi/cost/"));
const rail = family((p) => railPages.has(p));
const site = { b: [...baseAll.values()], n: nowRows };

// Named queries from the baseline doc.
const named = [["जैसलमेर घूमने का खर्चा", "/hi/cost/jaisalmer", 8.3], ["मसूरी घूमने का खर्च", "/hi/cost/mussoorie", 7.1]];
const namedNow = [];
for (const [query, page, basePos] of named) {
  const rows = await q(["query"], { dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "contains", expression: page }] }] });
  const hit = rows.find((r) => r.keys[0] === query);
  namedNow.push({ query, page, basePos, pos: hit ? hit.position : null, clicks: hit ? hit.clicks : 0, impressions: hit ? hit.impressions : 0 });
}

const pct = (a, b) => (b ? `${(100 * (a - b) / b).toFixed(0)}%` : "n/a");
const verdict = (ok) => (ok ? "MET" : "MISSED");
const today = iso(new Date());
const L = [];
L.push(`# Ranking push check — ${today}`, "");
L.push(`Baseline window ${base.window.start} → ${base.window.end} · this window ${iso(start)} → ${iso(end)} (same 28-day length). Targets are the ones pre-registered in \`gsc-audits/ranking-push-baseline-2026-09-13.md\`; nothing here was moved after the fact.`, "");
L.push("## Site", "");
L.push("| Metric | Baseline | Now | Change | Target | Result |", "|---|---|---|---|---|---|");
const sc = sum(site.b, "clicks"), nc = sum(site.n, "clicks");
L.push(`| Clicks / 28d | ${sc} | ${nc} | ${pct(nc, sc)} | ≈ 2× (900/wk equiv) | ${verdict(nc >= 2 * sc * 0.9)} |`);
L.push(`| Impressions / 28d | ${sum(site.b, "impressions")} | ${sum(site.n, "impressions")} | ${pct(sum(site.n, "impressions"), sum(site.b, "impressions"))} | — | — |`);
L.push(`| Impression-weighted avg position | ${avgPos(site.b).toFixed(1)} | ${avgPos(site.n).toFixed(1)} | ${(avgPos(site.n) - avgPos(site.b)).toFixed(1)} | — | — |`, "");
L.push("## Lever 1 — Hindi cost titles (`/hi/cost/*`, not in the rail)", "");
L.push("| Metric | Baseline | Now | Change | Target | Result |", "|---|---|---|---|---|---|");
const hb = sum(hiCost.b, "clicks"), hn = sum(hiCost.n, "clicks");
L.push(`| Clicks across ${hiCost.b.length} pages | ${hb} | ${hn} | ${pct(hn, hb)} | 2× | ${verdict(hn >= 2 * hb)} |`);
L.push(`| CTR | ${(100 * hb / Math.max(1, sum(hiCost.b, "impressions"))).toFixed(2)}% | ${(100 * hn / Math.max(1, sum(hiCost.n, "impressions"))).toFixed(2)}% | — | ≥1.5% on jaisalmer | see below |`);
L.push(`| Avg position | ${avgPos(hiCost.b).toFixed(1)} | ${avgPos(hiCost.n).toFixed(1)} | ${(avgPos(hiCost.n) - avgPos(hiCost.b)).toFixed(1)} | — | — |`);
for (const p of ["/hi/cost/jaisalmer", "/hi/cost/mussoorie"]) {
  const b = baseAll.get(p), n = now.get(p);
  if (b && n) L.push(`| ${p} clicks | ${b.clicks} (pos ${b.position.toFixed(1)}, CTR ${(100 * b.clicks / b.impressions).toFixed(2)}%) | ${n.clicks} (pos ${n.position.toFixed(1)}, CTR ${(100 * n.clicks / Math.max(1, n.impressions)).toFixed(2)}%) | ${pct(n.clicks, b.clicks)} | ${p.endsWith("jaisalmer") ? "90" : "40"} | ${verdict(n.clicks >= (p.endsWith("jaisalmer") ? 90 : 40))} |`);
}
for (const r of namedNow) L.push(`| "${r.query}" position | ${r.basePos} | ${r.pos === null ? "not seen" : r.pos.toFixed(1)} | — | ≤ 5 | ${verdict(r.pos !== null && r.pos <= 5)} |`);
L.push("", "## Lever 2 — high-impression rail cohort (Sep/Oct dest×month pages)", "");
L.push("| Metric | Baseline | Now | Change | Target | Result |", "|---|---|---|---|---|---|");
L.push(`| Pages matched | ${rail.b.length} | ${rail.n.length} | — | — | — |`);
L.push(`| Impression-weighted avg position | ${avgPos(rail.b).toFixed(1)} | ${avgPos(rail.n).toFixed(1)} | ${(avgPos(rail.n) - avgPos(rail.b)).toFixed(1)} | −1.5 | ${verdict(avgPos(rail.n) <= avgPos(rail.b) - 1.5)} |`);
L.push(`| Clicks | ${sum(rail.b, "clicks")} | ${sum(rail.n, "clicks")} | ${pct(sum(rail.n, "clicks"), sum(rail.b, "clicks"))} | — | — |`, "");
L.push("## How to read this", "");
L.push("- Lever 1 moved and Lever 2 did not: the colloquial-title hypothesis holds; two hub pages are too little link weight, next is state hubs.");
L.push("- Lever 2 moved and Lever 1 did not: internal links work; the Hindi title hypothesis is wrong for this family, revert or retest wording.");
L.push("- Neither moved: position is gated by external authority, not on-site changes. The next lever is links from other sites, which needs the citable data asset.");
L.push("- Seasonality caveat: October queries differ from September ones; the rail cohort is compared on the same pages, not the same queries.");
const out = `gsc-audits/ranking-push-check-${today}.md`;
writeFileSync(out, L.join("\n") + "\n");
console.log(`wrote ${out}`);
console.log(L.slice(4, 8).join("\n"));

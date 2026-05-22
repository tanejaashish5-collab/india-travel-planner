#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_build-override-review.mjs
//
// Phase 4 of the title-override pipeline. Joins the grounding pack with the
// drafted CSV and emits a human-review Markdown doc — the artifact the founder
// approves BEFORE apply-title-overrides.mjs touches the DB. Every page block
// shows the GSC reason it is in scope, the current vs proposed copy, and the
// exact DB fields the new copy is grounded in (the anti-fabrication audit
// trail).
//
// Usage:
//   node scripts/_build-override-review.mjs
//     [--grounding data/cro/grounding-YYYY-MM-DD.json]
//     [--csv data/cro/title-overrides.csv]
// Writes: data/cro/title-overrides-review-<today>.md

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
function argval(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? path.resolve(ROOT, args[i + 1]) : null;
}

const croDir = path.join(ROOT, "data", "cro");
const groundingPath = argval("grounding") || (() => {
  const f = readdirSync(croDir).filter((x) => /^grounding-\d{4}-\d{2}-\d{2}\.json$/.test(x)).sort();
  if (!f.length) { console.error("ERR: no data/cro/grounding-*.json"); process.exit(1); }
  return path.join(croDir, f[f.length - 1]);
})();
const csvPath = argval("csv") || path.join(croDir, "title-overrides.csv");

const MONTH_NUM = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};
function visualLen(s) {
  let n = 0;
  for (const ch of s ?? "") {
    const cp = ch.codePointAt(0);
    if ((cp >= 0x0900 && cp <= 0x0903) || (cp >= 0x093a && cp <= 0x094f) ||
        (cp >= 0x0951 && cp <= 0x0957) || (cp >= 0x0962 && cp <= 0x0963)) continue;
    n++;
  }
  return n;
}
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  const rows = lines.map((line) => {
    const out = []; let cur = "", inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQ = false; }
        else cur += c;
      } else if (c === '"') inQ = true;
      else if (c === ",") { out.push(cur); cur = ""; }
      else cur += c;
    }
    out.push(cur);
    return out;
  });
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

const grounding = JSON.parse(readFileSync(groundingPath, "utf8"));
const csvRows = parseCsv(readFileSync(csvPath, "utf8"));
const groundByKey = new Map(
  grounding.pages.map((p) => [`${p.destination_id}/${MONTH_NUM[p.month]}/${p.locale}`, p]),
);

const out = [];
out.push(`# Title-override review — ${new Date().toISOString().slice(0, 10)}`);
out.push("");
out.push(`Drafted SERP titles + meta descriptions for **${csvRows.length} destination/month pages** in the`);
out.push(`Tier-A cohort (page-1 ranking, high impressions, sub-2% CTR). Each block: the GSC reason it is`);
out.push(`in scope, the current vs proposed copy, and the DB fields the new copy is grounded in.`);
out.push("");
out.push(`**Source:** \`${path.basename(groundingPath)}\` + \`${path.basename(csvPath)}\``);
out.push(`**Approve / edit / reject each, then run** \`node scripts/apply-title-overrides.mjs --commit --revalidate\`.`);
out.push("");
out.push("---");
out.push("");

csvRows.forEach((r, i) => {
  const monthNum = MONTH_NUM[r.month];
  const g = groundByKey.get(`${r.destination_id}/${monthNum}/${r.locale}`);
  const gsc = g?.gsc;
  const md = g?.month_data;
  const tLen = visualLen(r.title_override);
  const mLen = visualLen(r.meta_description_override);
  out.push(`## ${i + 1}. ${r.destination_id} — ${r.month} \`[${r.locale}]\``);
  out.push("");
  if (gsc) {
    out.push(`**GSC 28d:** ${gsc.impressions.toLocaleString()} impressions · ` +
      `${(gsc.ctr * 100).toFixed(2)}% CTR · position ${gsc.position} · ` +
      `score ${md?.score ?? "?"}/5 (${md?.verdict ?? "?"})`);
  }
  out.push(`URL: https://www.nakshiq.com${g?.page ?? `/${r.locale}/destination/${r.destination_id}/${r.month}`}`);
  out.push("");
  out.push(`| | |`);
  out.push(`|---|---|`);
  out.push(`| Title now | ${g?.current_serp?.title ?? "(unknown)"} |`);
  out.push(`| **Title new** (${tLen}/50) | **${r.title_override}** |`);
  out.push(`| Meta now | ${(g?.current_serp?.meta_description ?? "(unknown)").replace(/\|/g, "\\|")} |`);
  out.push(`| **Meta new** (${mLen}/155) | **${r.meta_description_override.replace(/\|/g, "\\|")}** |`);
  out.push("");
  out.push(`*Grounded in:*`);
  if (md?.note) out.push(`- note: "${md.note}"`);
  if (g?.weather?.temp_range) out.push(`- temp range: ${g.weather.temp_range}`);
  if (md?.go_or_skip_verdict) out.push(`- verdict line: "${md.go_or_skip_verdict}"`);
  if (g?.destination?.tagline) out.push(`- tagline: "${g.destination.tagline}"`);
  out.push("");
  out.push(`**Decision:** _______ (approve / edit / reject)`);
  out.push("");
  out.push("---");
  out.push("");
});

const outPath = path.join(croDir, `title-overrides-review-${new Date().toISOString().slice(0, 10)}.md`);
writeFileSync(outPath, out.join("\n"));
console.log(`→ wrote ${path.relative(ROOT, outPath)} — ${csvRows.length} pages`);

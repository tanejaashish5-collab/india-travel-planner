#!/usr/bin/env node
// Machine source check for data/research/villages/*.json (village pages, 2026-10-06).
// For every named item (stay, eat, thing to do) fetch its source_url and require the
// item's distinctive name words in the page body; for every other fact require the
// page to at least mention the village. Agents' own "verified" claims are ignored
// (Haiku research 10-04: 37/112 items passed). Read-only; writes a report next to
// the files. Usage: node scripts/check-village-sources.mjs [slug ...]
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const DIR = path.resolve(import.meta.dirname, "..", "data", "research", "villages");
const only = process.argv.slice(2);
const files = readdirSync(DIR).filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .filter((f) => !only.length || only.includes(f.replace(/\.json$/, "")));

const STOP = new Set(["the", "and", "cafe", "hotel", "homestay", "guest", "house", "guesthouse", "hostel", "camp", "camps", "restaurant", "temple", "trek", "village", "valley", "view", "point", "lake", "of", "at", "in", "by", "a"]);
const words = (s) => (s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
const BAD_HOST = /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/;

const cache = new Map();
async function body(url) {
  if (cache.has(url)) return cache.get(url);
  let text = null;
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "user-agent": "Mozilla/5.0 (Macintosh) NakshIQ-source-check" } });
    text = r.ok ? (await r.text()).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").toLowerCase().normalize("NFKD") : `__HTTP_${r.status}`;
  } catch (e) { text = `__ERR_${e.name}`; }
  cache.set(url, text);
  return text;
}

const report = [];
let pass = 0, fail = 0;
for (const f of files) {
  const v = JSON.parse(readFileSync(path.join(DIR, f), "utf8"));
  // aliases: spellings sources use for the same place (Harsil/Harshil).
  const vWords = words([v.name, ...(v.aliases || [])].join(" ").replace(/&/g, " "));
  // Road/status/reach facts are often reported for the corridor or parent town
  // (e.g. "NH-305 near Jibhi"), so facts may match the parent; named items may not.
  const pWords = words(String(v.parent_id || "").replace(/-/g, " "));
  const checks = [];
  const named = [...(v.stays || []), ...(v.eats || []), ...(v.things_to_do || [])].map((x) => ({ label: x.name, url: x.source_url, need: words(x.name) }));
  const facts = [v.coords, v.elevation_m, v.permits, v.road_and_season_access, v.status_2025_2026, ...(v.how_to_reach || [])]
    .filter((x) => x && x.source_url).map((x) => ({ label: "fact", url: x.source_url, need: [] }));
  for (const c of [...named, ...facts]) {
    let ok = false, why = "";
    const manual = (v.manual_checks || []).find((m) => m.url === c.url);
    if (manual) { pass++; checks.push({ ok: true, label: c.label, url: c.url, why: `manual: ${manual.note}` }); continue; }
    if (!c.url) why = "no source_url";
    else if (BAD_HOST.test(c.url)) why = "maps url is not a source";
    else {
      const t = await body(c.url);
      if (t.startsWith("__")) why = t.slice(2);
      else {
        const hitV = vWords.some((w) => t.includes(w)) || (c.label === "fact" && pWords.some((w) => t.includes(w)));
        const missing = c.need.filter((w) => !t.includes(w));
        ok = hitV && missing.length <= Math.floor(c.need.length / 3);
        if (!ok) why = !hitV ? "page never mentions the village (or parent, for facts)" : `name words missing: ${missing.join(" ")}`;
      }
    }
    ok ? pass++ : fail++;
    checks.push({ ok, label: c.label, url: c.url, why });
  }
  const bad = checks.filter((c) => !c.ok);
  report.push({ slug: v.slug, checked: checks.length, failed: bad.length, failures: bad });
  console.log(`${v.slug}: ${checks.length - bad.length}/${checks.length} pass` + (bad.length ? "\n  " + bad.map((b) => `✗ ${b.label} | ${b.why} | ${b.url}`).join("\n  ") : ""));
}
writeFileSync(path.join(DIR, "_source-check.json"), JSON.stringify({ at: new Date().toISOString(), pass, fail, report }, null, 1));
console.log(`\nTOTAL ${pass} pass / ${fail} fail → data/research/villages/_source-check.json`);

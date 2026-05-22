#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_grounding-for-cohort.mjs
//
// Phase 2 of the title-override pipeline. Reads the Tier-A cohort produced by
// `node scripts/data-pull.mjs cohort`, then assembles a "grounding pack" — the
// ONLY source the drafting step may quote from. Anti-fabrication gate: every
// fact in an override must trace back to a field in this file.
//
// For each cohort page it gathers:
//   - destinations: name, hi name, tagline, state
//   - destination_months: score, verdict, note, why_go/why_not, prose,
//     go_or_skip_verdict, festivals_this_month, things_to_do, + the 4 existing
//     override columns (so a re-run sees what is already applied)
//   - confidence_cards.weather_night → derived temp range (same logic as
//     generateMetadata in apps/web/.../[month]/page.tsx)
//   - current_serp: the live <title> + <meta description> Google sees today
//     (the template output the new copy must demonstrably beat)
//
// Usage:
//   node scripts/_grounding-for-cohort.mjs [--file data/cro/cohort-YYYY-MM-DD.json]
// Writes: data/cro/grounding-<today>.json

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config: dotenvConfig } = await import("dotenv");
dotenvConfig({ path: path.join(ROOT, "apps", "web", ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("ERR: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set");
  process.exit(1);
}
const { createClient } = await import("@supabase/supabase-js");
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const MONTH_NUM = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

// ─── Locate the cohort file ───────────────────────────────────────────────
const fileArgIdx = process.argv.indexOf("--file");
let cohortPath;
if (fileArgIdx !== -1 && process.argv[fileArgIdx + 1]) {
  cohortPath = path.resolve(ROOT, process.argv[fileArgIdx + 1]);
} else {
  const croDir = path.join(ROOT, "data", "cro");
  const candidates = readdirSync(croDir)
    .filter((f) => /^cohort-\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();
  if (!candidates.length) {
    console.error("ERR: no data/cro/cohort-*.json — run `node scripts/data-pull.mjs cohort` first");
    process.exit(1);
  }
  cohortPath = path.join(croDir, candidates[candidates.length - 1]);
}
const cohortDoc = JSON.parse(readFileSync(cohortPath, "utf8"));
const cohort = cohortDoc.cohort ?? [];
console.log(`Cohort: ${cohort.length} pages from ${path.basename(cohortPath)}\n`);

// ─── Batch-fetch DB rows ──────────────────────────────────────────────────
const destIds = [...new Set(cohort.map((c) => c.destination_id))];
console.log(`Fetching ${destIds.length} destinations + their month rows + weather cards…`);

async function fetchInChunks(table, column, ids, select) {
  const out = [];
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const { data, error } = await supabase.from(table).select(select).in(column, chunk);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data ?? []));
  }
  return out;
}

const destinations = await fetchInChunks(
  "destinations", "id", destIds,
  "id, name, tagline, translations, state:states(name)",
);
const monthRows = await fetchInChunks("destination_months", "destination_id", destIds, "*");
const cards = await fetchInChunks("confidence_cards", "destination_id", destIds, "destination_id, weather_night");

const destById = new Map(destinations.map((d) => [d.id, d]));
const monthByKey = new Map(monthRows.map((m) => [`${m.destination_id}/${m.month}`, m]));
const cardByDest = new Map(cards.map((c) => [c.destination_id, c]));

// ─── Temp-range derivation (mirrors generateMetadata page.tsx:108-133) ─────
function tempRange(note, weatherNight, monthNum) {
  const noteStr = (note ?? "").toString();
  const m = noteStr.match(/(-?\d{1,2})\s*(?:to|-|–|—)\s*(-?\d{1,2})\s*°?\s*[Cc]/);
  if (m) return `${Number(m[1])}–${Number(m[2])}°C`;
  const w = weatherNight ?? {};
  const isSummer = monthNum >= 4 && monthNum <= 9;
  const lo = isSummer ? (w.summer_low_c ?? w.min_temp_c) : (w.winter_low_c ?? w.min_temp_c);
  const hi = isSummer ? (w.summer_high_c ?? w.max_temp_c) : (w.winter_high_c ?? w.max_temp_c);
  if (typeof lo === "number" && typeof hi === "number") return `${lo}–${hi}°C`;
  if (typeof lo === "number") return `${lo}°C nights`;
  return "";
}

// ─── Live SERP fetch — what Google sees today ─────────────────────────────
async function fetchCurrentSerp(pagePath) {
  const url = `https://www.nakshiq.com${pagePath}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "NakshIQ-CRO-grounding/1.0" },
      redirect: "follow",
    });
    if (!res.ok) return { title: null, meta_description: null, _http: res.status };
    const html = await res.text();
    const t = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const d = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const decode = (s) =>
      s == null ? null : s
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").trim();
    return { title: decode(t?.[1] ?? null), meta_description: decode(d?.[1] ?? null), _http: 200 };
  } catch (err) {
    return { title: null, meta_description: null, _http: `ERR:${err.message}` };
  }
}

// Fetch live SERP in small concurrent batches.
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let idx = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (idx < items.length) {
        const i = idx++;
        results[i] = await fn(items[i], i);
      }
    }),
  );
  return results;
}

console.log(`Fetching live <title>/<meta> for ${cohort.length} pages…`);
const serps = await mapLimit(cohort, 8, (c) => fetchCurrentSerp(c.page));

// ─── Assemble grounding pack ──────────────────────────────────────────────
const pack = [];
const missing = [];
cohort.forEach((c, i) => {
  const monthNum = MONTH_NUM[c.month];
  const dest = destById.get(c.destination_id);
  const mrow = monthByKey.get(`${c.destination_id}/${monthNum}`);
  const card = cardByDest.get(c.destination_id);
  if (!dest || !mrow) {
    missing.push(`${c.page} — ${!dest ? "no destination row" : "no destination_months row"}`);
  }
  const stateName = Array.isArray(dest?.state) ? dest?.state?.[0]?.name : dest?.state?.name;
  pack.push({
    page: c.page,
    locale: c.locale,
    destination_id: c.destination_id,
    month: c.month,
    month_num: monthNum,
    gsc: { impressions: c.impressions, clicks: c.clicks, ctr: c.ctr, position: c.position },
    destination: {
      name: dest?.name ?? null,
      name_hi: dest?.translations?.hi?.name ?? null,
      tagline: dest?.tagline ?? null,
      state: stateName ?? null,
    },
    month_data: {
      score: mrow?.score ?? null,
      verdict: mrow?.verdict ?? null,
      note: mrow?.note ?? null,
      why_go: mrow?.why_go ?? null,
      why_not: mrow?.why_not ?? null,
      skip_reason: mrow?.skip_reason ?? null,
      go_or_skip_verdict: mrow?.go_or_skip_verdict ?? null,
      prose_lead: mrow?.prose_lead ?? null,
      prose_payoff: mrow?.prose_payoff ?? null,
      festivals_this_month: mrow?.festivals_this_month ?? null,
      things_to_do: mrow?.things_to_do ?? null,
      who_should_go: mrow?.who_should_go ?? null,
      who_should_avoid: mrow?.who_should_avoid ?? null,
    },
    weather: {
      temp_range: tempRange(mrow?.note, card?.weather_night, monthNum),
      raw: card?.weather_night ?? null,
    },
    existing_override: {
      title_override: mrow?.title_override ?? null,
      title_override_hi: mrow?.title_override_hi ?? null,
      meta_description_override: mrow?.meta_description_override ?? null,
      meta_description_override_hi: mrow?.meta_description_override_hi ?? null,
    },
    current_serp: serps[i],
  });
});

const stamp = new Date().toISOString().slice(0, 10);
const outPath = path.join(ROOT, "data", "cro", `grounding-${stamp}.json`);
mkdirSync(path.dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify({
  generated: new Date().toISOString(),
  source_cohort: path.basename(cohortPath),
  count: pack.length,
  pages: pack,
}, null, 2) + "\n");

// ─── Summary ──────────────────────────────────────────────────────────────
const withOverride = pack.filter((p) =>
  (p.locale === "hi" ? p.existing_override.title_override_hi : p.existing_override.title_override));
console.log(`\n→ wrote ${outPath}`);
console.log(`  ${pack.length} pages grounded`);
console.log(`  ${withOverride.length} already carry a ${"locale-matched"} title_override:`);
for (const p of withOverride) console.log(`    • ${p.page}`);
if (missing.length) {
  console.log(`\n  ⚠ ${missing.length} pages missing DB rows:`);
  for (const m of missing) console.log(`    • ${m}`);
}
const httpBad = pack.filter((p) => p.current_serp?._http !== 200);
if (httpBad.length) {
  console.log(`\n  ⚠ ${httpBad.length} pages where live SERP fetch did not return 200:`);
  for (const p of httpBad) console.log(`    • ${p.page} — ${p.current_serp?._http}`);
}
console.log("");

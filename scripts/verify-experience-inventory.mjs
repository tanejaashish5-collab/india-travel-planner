#!/usr/bin/env node
/**
 * verify-experience-inventory.mjs — proves, per destination, that an experience
 * partner actually sells something THERE before we link to it.
 *
 *   node --env-file=apps/web/.env.local scripts/verify-experience-inventory.mjs [--limit N] [--only id,id] [--concurrency N] [--refresh]
 *
 * Why this exists (measured 2026-09-13): experience-links.ts built free-text
 * SEARCH urls for all 533 destinations. For a destination a partner does not
 * cover, those searches do not 404 and do not come back empty — they come back
 * CONFIDENT AND WRONG. GetYourGuide answered "500+ results" for Mukteshwar,
 * Chikmagalur and Ziro and served activities in Urubamba, Muscat, Zurich and
 * Tokyo; Viator served Porto and Zurich for Ziro and an empty page for
 * Mukteshwar. Hampi, which has real supply, answered "24 results" with 10 of
 * them in Hampi. The honest signal is therefore never the result COUNT — a big
 * number means the search fell through to a global catalogue. The only signal
 * that means anything is whether a bookable PRODUCT sits in a location whose
 * name matches the destination.
 *
 * So: parse the product links, keep the ones whose location slug matches the
 * destination, and emit the partner's canonical location page (not a search)
 * only when at least one real product backs it. Everything else gets no link,
 * which is the correct answer and the one the reader deserves.
 *
 * Output: apps/web/data/experience-inventory.json, consumed by experience-links.ts.
 * Raw partner responses are cached under .cache/experience-inventory/ so a
 * re-run is cheap and reviewable; pass --refresh to ignore the cache.
 */
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i === -1 ? d : args[i + 1]; };
const LIMIT = Number(flag("--limit", "0")) || 0;
const ONLY = (flag("--only", "") || "").split(",").filter(Boolean);
const CONC = Number(flag("--concurrency", "4")) || 4;
const REFRESH = args.includes("--refresh");

const CACHE = ".cache/experience-inventory";
const OUT = "apps/web/data/experience-inventory.json";
mkdirSync(CACHE, { recursive: true });

/**
 * A partner response that is a CAPTCHA wall or a stub is NOT evidence of
 * absence. Viator answered /search/Coorg with 189 bytes of "This page maybe
 * requiring CAPTCHA" — read naively that becomes "Coorg has no tours", which
 * is both false and unfalsifiable. Anything that fails this check is recorded
 * as INDETERMINATE and never written as a negative.
 */
const isUsable = (body) =>
  Boolean(body) && body.length >= 2000 && !/requiring CAPTCHA/i.test(body);

/**
 * Partners index some destinations under a neighbouring or administrative
 * name. GetYourGuide sells 5 Coorg products under "madikeri", Coorg's main
 * town, so strict name matching reports a false negative. Aliases are added
 * only after seeing the product counts in the diagnostics file — never guessed.
 */
const ALIASES = {
  coorg: ["madikeri", "kodagu"],
};

/** Words that identify a category, not a place — they must never carry a match. */
const STOP = new Set(["valley","national","park","rock","shelters","lake","lakes","hills","hill","fort","temple","beach","island","islands","town","city","sanctuary","wildlife","tiger","reserve","falls","caves","cave","the","and","of","monastery","garden","gardens","dam","peak","pass","river","springs","ghat","ghats","circuit","range","forest","plateau","desert","bird","marine","biosphere","stupa","palace","museum","church","mosque","masjid","mandir","sahib","new","old","east","west","north","south","upper","lower","great","sri","shri"]);

const keyTokens = (name) => {
  const t = name.replace(/\([^)]*\)/g, " ").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const k = t.filter((x) => !STOP.has(x) && x.length >= 3);
  return k.length ? k : t;
};

/**
 * True when a partner's location slug names the same place as the destination.
 * Deliberately strict: a 3-4 letter destination (Bir, Goa, Leh) matches only on
 * an exact slug part, so "bir" can never be satisfied by "birmingham".
 */
function matchesPlace(destName, slug, destId) {
  const parts = slug.toLowerCase().split(/[-_]/).filter(Boolean);
  const terms = [...keyTokens(destName), ...(ALIASES[destId] ?? [])];
  for (const k of terms) {
    for (const p of parts) {
      if (p === k) return true;
      if (k.length >= 5 && p.startsWith(k)) return true;
      if (p.length >= 5 && k.startsWith(p)) return true;
    }
  }
  return false;
}

async function fetchVia(url, cacheKey) {
  const f = join(CACHE, `${cacheKey}.txt`);
  if (!REFRESH && existsSync(f)) {
    const cached = readFileSync(f, "utf8");
    if (isUsable(cached)) return cached;   // a cached CAPTCHA is a cache miss
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(`https://r.jina.ai/${url}`, { signal: AbortSignal.timeout(60_000) });
      if (r.ok) {
        const t = await r.text();
        writeFileSync(f, t);
        if (isUsable(t)) return t;
        await new Promise((s) => setTimeout(s, 4000 * (attempt + 1)));  // CAPTCHA — back off and retry
        continue;
      }
      if (r.status === 429) await new Promise((s) => setTimeout(s, 5000 * (attempt + 1)));
    } catch { /* retry */ }
    await new Promise((s) => setTimeout(s, 1500 * (attempt + 1)));
  }
  return null;
}

/**
 * GetYourGuide: an activity url is /<place>-l<id>/<product-slug>-t<id>.
 *
 * Two signals, in priority order:
 *  1. The LOCATION names the destination — the clean case (Hampi).
 *  2. The PRODUCT names the destination while the location names the gateway
 *     city it departs from. Ajanta Caves has no location of its own on
 *     GetYourGuide; its tours live under Aurangabad and say "ajanta" in the
 *     product slug. Ignoring those reports "no tours for Ajanta Caves", which
 *     is as wrong as the Zurich link this script exists to kill — just wrong in
 *     the other direction. We pin the location page hosting the most matching
 *     products, so the reader lands where those tours actually sell.
 *
 * Location beats product, so Agra pins Agra rather than the Delhi page that
 * happens to sell a "from-delhi-agra-day-trip".
 */
function checkGyg(body, name, destId) {
  if (!isUsable(body)) return { status: "indeterminate" };
  const byLocation = new Map(), byProduct = new Map(), others = new Map();
  for (const m of body.matchAll(/getyourguide\.com\/([a-z0-9-]+)-l(\d+)\/([a-z0-9-]+)-t\d+/g)) {
    const [, place, placeId, productSlug] = m;
    const key = `${place}-l${placeId}`;
    if (matchesPlace(name, place, destId)) byLocation.set(key, (byLocation.get(key) ?? 0) + 1);
    else if (matchesPlace(name, productSlug, destId)) byProduct.set(key, (byProduct.get(key) ?? 0) + 1);
    else others.set(place, (others.get(place) ?? 0) + 1);
  }
  const hits = byLocation.size ? byLocation : byProduct;
  const via = byLocation.size ? "location" : "product";
  if (!hits.size) return { status: "none", top: [...others.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3) };
  const [best, products] = [...hits.entries()].sort((a, b) => b[1] - a[1])[0];
  return { status: "verified", url: `https://www.getyourguide.com/${best}/`, products, via };
}

/** Viator: products are /tours/<Place>/..., the place page is /<Place>/d<id>. */
function checkViator(body, name, destId, query) {
  if (!isUsable(body)) return { status: "indeterminate" };
  const hits = new Map(), others = new Map();
  for (const m of body.matchAll(/viator\.com\/tours\/([A-Za-z0-9-]+)\//g)) {
    if (!matchesPlace(name, m[1], destId)) { others.set(m[1], (others.get(m[1]) ?? 0) + 1); continue; }
    hits.set(m[1], (hits.get(m[1]) ?? 0) + 1);
  }
  if (!hits.size) return { status: "none", top: [...others.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3) };
  const [place, products] = [...hits.entries()].sort((a, b) => b[1] - a[1])[0];
  let url = null;
  for (const m of body.matchAll(/viator\.com\/([A-Za-z0-9-]+)\/d(\d+)/g)) {
    if (m[1].toLowerCase() === place.toLowerCase()) { url = `https://www.viator.com/${m[1]}/d${m[2]}`; break; }
  }
  // Viator does not always expose a /d<id> page in its search markup. Falling
  // back to the search url is safe HERE and only here: we just read that exact
  // page and counted real products in a matching location. The rule this script
  // enforces is "never link to an unverified search", not "never link to a
  // search". It must be the SAME query we verified, though — the destination
  // name with any parenthetical stripped. Pinning search/"Coorg (Kodagu)" after
  // verifying search/"Coorg" would ship a url nobody ever checked.
  return { status: "verified", url: url ?? `https://www.viator.com/search/${query}`, products, via: url ? "location-page" : "verified-search" };
}

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
let dests = [], from = 0;
for (;;) {
  const { data, error } = await s.from("destinations").select("id, name").order("id").range(from, from + 999);
  if (error) { console.error("supabase:", error.message); process.exit(1); }
  dests = dests.concat(data);
  if (data.length < 1000) break;
  from += 1000;
}
if (ONLY.length) dests = dests.filter((d) => ONLY.includes(d.id));
if (LIMIT) dests = dests.slice(0, LIMIT);
console.log(`checking ${dests.length} destinations, concurrency ${CONC}`);

const result = {};
const cleared = new Set();
const diagnostics = { indeterminate: [], unmatched: {} };
let done = 0, withAny = 0;

async function work(d) {
  const q = encodeURIComponent(d.name.replace(/\([^)]*\)/g, "").trim());
  const [g, v] = await Promise.all([
    fetchVia(`https://www.getyourguide.com/s/?q=${q}`, `gyg-${d.id}`),
    fetchVia(`https://www.viator.com/search/${q}`, `via-${d.id}`),
  ]);
  const gyg = checkGyg(g, d.name, d.id);
  const via = checkViator(v, d.name, d.id, q);

  const entry = {};
  if (gyg.status === "verified") entry.getyourguide = gyg.url;
  if (via.status === "verified") entry.viator = via.url;
  if (Object.keys(entry).length) { result[d.id] = entry; withAny++; }
  // A destination checked and found to have nothing must be PRUNED from any
  // previous run's output — but only when both partners answered. If a partner
  // was indeterminate we know nothing new, so we leave the old entry standing.
  else if (gyg.status === "none" && via.status === "none") cleared.add(d.id);

  // An indeterminate partner is neither a link nor a proven absence — it is an
  // unanswered question, and it goes in the diagnostics so the next run retries
  // it rather than quietly hardening into "this place has nothing".
  for (const [partner, res] of [["getyourguide", gyg], ["viator", via]]) {
    if (res.status === "indeterminate") diagnostics.indeterminate.push(`${d.id}:${partner}`);
    else if (res.status === "none" && res.top?.length) {
      (diagnostics.unmatched[d.id] ??= {})[partner] = res.top.map(([k, n]) => `${k}=${n}`);
    }
  }

  done++;
  const fmt = (r) => (r.status === "verified" ? String(r.products) : r.status === "indeterminate" ? "?" : "-");
  console.log(`${Object.keys(entry).length ? "OK " : "   "}[${done}/${dests.length}] ${d.id}: gyg=${fmt(gyg)} viator=${fmt(via)}`);
}

const queue = [...dests];
await Promise.all(Array.from({ length: CONC }, async () => {
  for (;;) { const d = queue.shift(); if (!d) return; await work(d); }
}));

/**
 * Merge over whatever the last run wrote, never replace it. A `--only` or
 * `--limit` run knows nothing about the destinations it skipped, so replacing
 * the file would silently delete 250+ verified entries and strip live links
 * from the site. (It did exactly that once, which is why this is here.)
 * Skipped destinations keep their entry; checked-and-empty ones are pruned.
 */
const previous = existsSync(OUT)
  ? Object.fromEntries(Object.entries(JSON.parse(readFileSync(OUT, "utf8"))).filter(([k]) => !k.startsWith("_")))
  : {};
for (const id of cleared) delete previous[id];
const merged = { ...previous, ...result };
const sorted = Object.fromEntries(Object.keys(merged).sort().map((k) => [k, merged[k]]));
writeFileSync(OUT, JSON.stringify({ _doc: "VERIFIED experience-partner location pages, generated by scripts/verify-experience-inventory.mjs. A destination appears here ONLY when the partner has at least one bookable product whose location matches it. Absence means the partner does not cover it, and the correct behaviour is to render no link — never a search url, which comes back confident and wrong. Re-run to refresh.", _generated: new Date().toISOString(), _checked: dests.length, _total: Object.keys(sorted).length, ...sorted }, null, 1) + "\n");
mkdirSync("data/research", { recursive: true });
writeFileSync("data/research/experience-inventory-diagnostics.json", JSON.stringify(diagnostics, null, 1) + "\n");
console.log(`\n${withAny}/${dests.length} checked have a verified partner; ${Object.keys(sorted).length} total in ${OUT}`);
console.log(`${diagnostics.indeterminate.length} partner checks were INDETERMINATE (captcha/stub) and are NOT recorded as absent — re-run to settle them.`);
console.log("diagnostics (incl. top unmatched place per destination, for alias review) -> data/research/experience-inventory-diagnostics.json");

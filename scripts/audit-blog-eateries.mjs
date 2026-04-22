#!/usr/bin/env node
/**
 * Lints all published blog articles for named restaurant / cafe / dhaba /
 * bakery mentions against our curated `viral_eats` table.
 *
 * Same rule as stays: every named eatery in blog prose must exist in
 * viral_eats for (ideally) the destination tagged in the article, or at
 * least globally. Unverified restaurant recommendations carry the same
 * trust risk as unverified stays.
 *
 * Usage:
 *   node scripts/audit-blog-eateries.mjs              # full audit
 *   node scripts/audit-blog-eateries.mjs --slug X     # single blog
 *   node scripts/audit-blog-eateries.mjs --strict     # exit 1 on UNVERIFIED
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync, mkdirSync } from "fs";

config({ path: "apps/web/.env.local" });

const SLUG_FILTER = (() => {
  const i = process.argv.indexOf("--slug");
  return i >= 0 ? process.argv[i + 1] : null;
})();
const STRICT = process.argv.includes("--strict");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Food/dining keywords — only these count as potential eatery names.
// Food/dining keywords — only these count as potential eatery names.
// "Bar" removed: too ambiguous with English ("within bar", "the bar is set").
// Real bar mentions typically use more specific terms (Pub, Taproom) or are
// caught via Cafe/Restaurant which most multi-cuisine venues include.
const FOOD_KW = [
  "Cafe", "Café", "Cafes",
  "Restaurant", "Restaurants",
  "Dhaba", "Dhabas",
  "Bakery", "Bakeries",
  "Kitchen", "Kitchens",
  "Eatery", "Eateries",
  "Bistro", "Bistros",
  "Tavern",
  "Diner",
  "Pizzeria",
  "Pub", "Pubs", "Taproom",
  "Grill", "Grills",
  "Canteen",
  "Tearoom", "Tea Room",
  "Coffee House", "Coffeehouse",
  "Momo Stall",
  "Tiffin Room", "Tiffin Centre",
  "Sweet Shop", "Sweetshop",
];

// FALSE POSITIVES — categoricals, chains we treat as categorical brands,
// neighborhoods, general phrases.
const FALSE_POSITIVES = new Set([
  // Categorical chains (equivalent to state-tourism brands for stays)
  "Indian Coffee House", "India Coffee House", "Coffee House", "Cafe Coffee Day",
  "Barista", "Starbucks", "Costa Coffee",
  "McDonald's", "KFC", "Domino's", "Pizza Hut", "Subway",
  "Haldiram's", "Haldirams", "Bikanervala",
  // Generic / categorical phrasing
  "Street Food", "Local Cafe", "Local Restaurant", "Local Dhaba",
  "Roadside Dhaba", "Highway Dhaba", "Truck Dhaba",
  "Vegetarian Restaurant", "Non-veg Restaurant", "Seafood Restaurant",
  "Fine Dining", "Rooftop Cafe", "Rooftop Restaurant", "Rooftop Bar",
  "Beach Cafe", "Beach Restaurant", "Beach Bar",
  "Food Truck", "Food Trucks", "Food Court", "Food Courts",
  "Restaurant Week", "Food Street", "Food Walk", "Food Tour",
  "Cafe Culture", "Cafe Scene", "Restaurant Scene",
  "Cloud Kitchen", "Cloud Kitchens",
  "Breakfast Cafe", "Brunch Cafe", "Lunch Cafe",
  "Your Cafe", "Any Cafe", "The Cafe", "A Cafe", "This Cafe", "Every Cafe",
  "Your Restaurant", "Any Restaurant", "The Restaurant", "A Restaurant",
  "Kitchen Garden", "Open Kitchen", "Ghost Kitchen",
  "Tea Garden", "Tea Estate", "Tea Factory", "Tea Museum",
  "Bar None", "Bar Code", "Bar Area",
  // Neighborhood / area descriptors
  "Bakery Row", "Cafe Row", "Restaurant Row", "Restaurant District",
  // Common phrasing
  "Cafe Menu", "Restaurant Menu",
  "Kitchen Staff", "Restaurant Staff",
  "Cafe Hop", "Cafe Hopping", "Restaurant Hop",
]);

const BLOCKED_FIRST_WORDS = new Set([
  "While", "From", "Some", "Your", "Three", "The", "Choose", "Fly", "Drive",
  "These", "This", "That", "Any", "Every", "Most", "Best", "Cheap", "Cheaper",
  "Luxury", "Premium", "Mid-range", "Book", "Find", "Avoid", "Skip",
  "Why", "When", "Where", "How", "What", "Who", "Which",
  "Small", "Large", "Tiny", "Huge", "No", "Many", "Several", "Various",
  "Popular", "Famous", "Trendy", "Authentic", "Local",
]);

function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/[^a-z0-9&' -]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function lev(a, b, cap = 3) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = new Array(n + 1);
  let cur = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    let rowMin = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      if (cur[j] < rowMin) rowMin = cur[j];
    }
    if (rowMin > cap) return cap + 1;
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}

const [articlesRes, eatsRes, destsRes] = await Promise.all([
  supabase.from("articles").select("id, slug, title, content, destinations").order("slug"),
  supabase.from("viral_eats").select("destination_id, name"),
  supabase.from("destinations").select("id, name"),
]);

if (articlesRes.error || eatsRes.error) {
  console.error("Fetch failed:", articlesRes.error || eatsRes.error);
  process.exit(1);
}

const articles = SLUG_FILTER
  ? articlesRes.data.filter((a) => a.slug === SLUG_FILTER)
  : articlesRes.data;

const dbNamesGlobal = new Set();
const dbNamesByDest = new Map();
for (const r of eatsRes.data) {
  const n = norm(r.name);
  if (!n) continue;
  dbNamesGlobal.add(n);
  if (!dbNamesByDest.has(r.destination_id)) dbNamesByDest.set(r.destination_id, new Set());
  dbNamesByDest.get(r.destination_id).add(n);
}
const destNames = new Set(destsRes.data.map((d) => norm(d.name)));

function classify(candidate, articleDestinations) {
  const normCand = norm(candidate);
  if (!normCand) return { kind: "FALSE_POSITIVE", reason: "empty" };

  if (FALSE_POSITIVES.has(candidate.trim())) {
    return { kind: "FALSE_POSITIVE", reason: "known chain/categorical" };
  }
  for (const fp of FALSE_POSITIVES) {
    if (norm(fp) === normCand) return { kind: "FALSE_POSITIVE", reason: "known chain/categorical" };
  }

  if (dbNamesGlobal.has(normCand)) {
    const inArticleDest = (articleDestinations || []).some((d) => dbNamesByDest.get(d)?.has(normCand));
    return inArticleDest
      ? { kind: "MATCH", reason: "exact + correct destination" }
      : { kind: "MATCH_WRONG_DEST", reason: "exact match but different destination" };
  }

  for (const dbN of dbNamesGlobal) {
    if (dbN.length < 5 || normCand.length < 5) continue;
    if (dbN.includes(normCand) || normCand.includes(dbN)) {
      return { kind: "CLOSE_DB_MATCH", reason: `substring of '${dbN}'`, dbName: dbN };
    }
  }

  const candTokens = new Set(normCand.split(/\s+/).filter((t) => t.length >= 3));
  if (candTokens.size >= 2) {
    for (const dbN of dbNamesGlobal) {
      const dbTokens = new Set(dbN.split(/\s+/).filter((t) => t.length >= 3));
      if (dbTokens.size < candTokens.size) continue;
      let allIn = true;
      for (const t of candTokens) if (!dbTokens.has(t)) { allIn = false; break; }
      if (allIn) return { kind: "CLOSE_DB_MATCH", reason: `token-subset of '${dbN}'`, dbName: dbN };
    }
  }

  for (const dbN of dbNamesGlobal) {
    if (Math.abs(dbN.length - normCand.length) <= 3) {
      const d = lev(dbN, normCand);
      if (d <= 2) return { kind: "CLOSE_DB_MATCH", reason: `levenshtein ${d} from '${dbN}'`, dbName: dbN };
    }
  }

  return { kind: "UNVERIFIED", reason: "no DB match" };
}

function extractCandidates(text) {
  const results = [];
  if (!text) return results;

  const chunks = text.split(/\n+/);
  const sentences = [];
  for (const chunk of chunks) {
    const cleaned = chunk
      .replace(/^\s*[#*>\-+]\s*/, "")
      .replace(/^\s*\d+\.\s*/, "")
      .replace(/^\s*\[[xX ]\]\s*/, "")
      .replace(/^\s*\|/, "")
      .trim();
    if (!cleaned) continue;
    const sents = cleaned.split(/(?<=[.!?])\s+(?=[A-Z])/);
    for (const s of sents) if (s.length > 6) sentences.push(s.trim());
  }

  const kwPattern = FOOD_KW.map((k) => k.replace(/\s+/g, "\\s+")).join("|");
  // Pattern A: 1-3 cap words + food keyword + optional 2 cap words trailing
  const reA = new RegExp(
    `((?:[A-Z][a-zA-Z0-9''&\\-]*\\s+){1,3}(?:${kwPattern})(?:\\s+[A-Z][a-zA-Z0-9''&\\-]*){0,2})`,
    "g"
  );
  // Pattern B: food keyword + 1-3 cap words ("Cafe Diggin", "Restaurant X")
  const reB = new RegExp(
    `((?:${kwPattern})\\s+[A-Z][a-zA-Z0-9''&\\-]*(?:\\s+[A-Z][a-zA-Z0-9''&\\-]*){0,2})`,
    "g"
  );

  for (const sent of sentences) {
    const phrases = new Set();
    let m;
    while ((m = reA.exec(sent)) !== null) phrases.add(m[1].trim());
    reA.lastIndex = 0;
    while ((m = reB.exec(sent)) !== null) phrases.add(m[1].trim());
    reB.lastIndex = 0;

    for (const p of phrases) {
      const stripped = p.replace(new RegExp(`^(?:${kwPattern})$`, "i"), "").trim();
      if (!stripped) continue;
      const firstWord = p.split(/\s+/)[0];
      if (BLOCKED_FIRST_WORDS.has(firstWord)) continue;
      // Drop city+keyword ("Delhi Restaurant", "Goa Cafe")
      const words = p.split(/\s+/);
      if (words.length === 2) {
        const first = norm(words[0]);
        if (destNames.has(first)) continue;
      }
      results.push({ phrase: p, sentence: sent.slice(0, 240) });
    }
  }
  return results;
}

function dedup(hits) {
  const best = new Map();
  for (const h of hits) {
    const key = norm(h.phrase);
    const prev = best.get(key);
    if (!prev || h.phrase.length > prev.phrase.length) best.set(key, h);
  }
  const unique = [...best.values()];
  return unique.filter((h) => {
    const normH = norm(h.phrase);
    return !unique.some((other) =>
      other !== h &&
      other.sentence === h.sentence &&
      other.phrase.length > h.phrase.length &&
      norm(other.phrase).includes(normH)
    );
  });
}

const report = [];
for (const a of articles) {
  const raw = extractCandidates(a.content);
  const hits = dedup(raw);
  for (const h of hits) {
    const cls = classify(h.phrase, a.destinations);
    report.push({
      slug: a.slug,
      destinations: a.destinations || [],
      candidate: h.phrase,
      sentence: h.sentence,
      classification: cls.kind,
      reason: cls.reason,
      dbName: cls.dbName || null,
    });
  }
}

const kinds = {};
for (const r of report) kinds[r.classification] = (kinds[r.classification] || 0) + 1;

console.log(`Audited ${articles.length} article(s). Found ${report.length} eatery candidates.`);
console.log(`Classification:`);
for (const [k, v] of Object.entries(kinds).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(20)} ${v}`);
}

const unverifiedByBlog = new Map();
for (const r of report) {
  if (r.classification !== "UNVERIFIED") continue;
  if (!unverifiedByBlog.has(r.slug)) unverifiedByBlog.set(r.slug, []);
  unverifiedByBlog.get(r.slug).push(r.candidate);
}

console.log(`\nBlogs with UNVERIFIED hits (${unverifiedByBlog.size}):`);
for (const [slug, names] of [...unverifiedByBlog.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 40)) {
  const uniq = [...new Set(names)];
  console.log(`  ${uniq.length.toString().padStart(3)}  ${slug}`);
  for (const n of uniq) console.log(`       − ${n}`);
}

mkdirSync("data", { recursive: true });
writeFileSync("data/blog-eateries-audit.json", JSON.stringify(report, null, 2));
console.log(`\nFull report: data/blog-eateries-audit.json`);

if (STRICT && (kinds.UNVERIFIED || 0) > 0) {
  console.error(`\n✗ ${kinds.UNVERIFIED} UNVERIFIED — blocking.`);
  process.exit(1);
}

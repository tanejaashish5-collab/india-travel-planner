#!/usr/bin/env node
/**
 * Lints all published blog articles for named lodging mentions (Hotel X,
 * Y Resort, Z Houseboat, etc.) against our curated DB (local_stays +
 * destination_stay_picks).
 *
 * The rule: every hotel/resort/houseboat/ashram/homestay name in blog prose
 * must appear in local_stays or destination_stay_picks for the destination
 * tagged in the article's `destinations` array. Fake/unverified names
 * destroy trust — especially for solo-female and kids-family readers —
 * and violate the project's standing no-fake-data rule.
 *
 * Extraction: capitalised multi-word phrases ending in a lodging keyword
 * OR starting with Hotel/Resort/Inn/etc followed by proper nouns.
 *
 * Matching: normalised exact + substring + Levenshtein <= 3 against the
 * global DB name set. Substring matches both ways so "Anand Prakash Ashram"
 * matches DB "Anand Prakash Yoga Ashram".
 *
 * False-positive filter: known monuments/attractions that share lodging
 * keywords (City Palace, Monsoon Palace = Udaipur monuments, Beatles Ashram
 * = ASI site, Golden Temple = gurdwara not hotel, etc.) pass through.
 *
 * Output: data/blog-audit.json with per-hit classification.
 *
 * Usage:
 *   node scripts/audit-blog-stays.mjs              # full audit
 *   node scripts/audit-blog-stays.mjs --slug X     # single blog
 *   node scripts/audit-blog-stays.mjs --strict     # exit 1 on any UNVERIFIED
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

// Lodging keywords — only these count as potential stay-names.
const LODGING_KW = [
  "Hotel", "Hotels", "Resort", "Resorts", "Houseboat", "Houseboats",
  "Ashram", "Ashrams", "Homestay", "Homestays", "Lodge", "Lodges",
  "Inn", "Retreat", "Retreats", "Camp", "Camps", "Villa", "Villas",
  "Guest House", "Guesthouse", "Guesthouses", "Hostel", "Hostels",
  "Cottage", "Cottages", "Farm", "Farmstay", "Dharamshala",
  "Stay", "B&B", "Residency", "Manor",
];

// FALSE POSITIVE allow-list — these look like lodging names but aren't hotels.
// They're monuments, archaeological sites, regulated public venues, or common English phrases.
// Safe to appear in blog prose without DB entry.
const FALSE_POSITIVES = new Set([
  // Monuments + palaces (not hotels)
  "City Palace", "Monsoon Palace", "Umaid Bhawan Palace", "Mysore Palace",
  "Amber Palace", "Mehrangarh", "Gwalior Fort", "Jagmandir Palace",
  "Lake Palace", "Rambagh Palace", "Jahaz Mahal", "Jaipur Palace",
  "Hawa Mahal", "Sheesh Mahal", "Jal Mahal", "Nahargarh Fort", "Jaigarh Fort",
  "Red Fort", "Agra Fort", "Chittorgarh Fort", "Kumbhalgarh Fort",
  "Jaisalmer Fort", "Meherangarh Fort",
  // Religious / archaeological (sites, not stays)
  "Beatles Ashram", "The Beatles Ashram", "Sivananda Ashram", "Parmarth Niketan",
  "Sri Aurobindo Ashram", "Osho Ashram", "Swarg Ashram",
  "Golden Temple", "Lotus Temple", "Akshardham Temple",
  "Kedarnath Temple", "Badrinath Temple", "Somnath Temple",
  "Hazratbal Shrine", "Mahabodhi Temple",
  "Chaurasi Kutia", "Dhamek Stupa",
  // Generic structural words
  "UNESCO World Heritage", "World Heritage", "Heritage Site", "World Heritage Site",
  "Heritage Walk", "Heritage Property", "Heritage Town",
  "Tea Estate", "Tea Garden", "Coffee Estate",
  "Tiger Reserve", "National Park", "Wildlife Sanctuary", "Bird Sanctuary",
  "Rest House", "Forest Rest House", "Circuit House",
  "Dharma Retreat", "Vipassana Retreat", "Silent Retreat", "Yoga Retreat",
  "Wellness Retreat",
  // Common phrasing noise (English, not hotel names)
  "Family Hotel", "Budget Hotel", "Boutique Hotel", "Luxury Hotel", "Party Hostel",
  "Beach Resort", "Mountain Resort", "Ski Resort",
  "Heritage Hotel", "Heritage Stay", "Heritage Homestay",
  "Camp Sites", "Camp Site",
  "Hotel Staff", "Your Hotel", "Your Hotel Is Closed",
  "The Hotel", "A Hotel", "Any Hotel", "This Hotel",
  "Hotel Price", "Hotel Prices", "Hotel Room", "Hotel Rooms", "Hotel Reception",
  "Houseboat Kerala", "The Houseboat Reality",
  "Stay Away", "Stay Here", "Stay There", "Stay Home", "Stay Safe",
  "Stay Options", "Stay Experience", "Stay Longer", "Stay Alcohol", "Stay Single",
  "Choose Dharamshala If", "From Dharamshala", "While Dharamshala",
  "Fly Dharamshala", "Drive Dharamshala",
  // Generic categoricals
  "Homestay Network", "Community Homestay", "Village Homestay",
  "Tent City", "Tent Village", "Tent Camp",
  // Specific program/brand categories (not single stays)
  "Atithi Devo Bhava", "Incredible India",
  // More phrase-fragments / contextual noise
  "Stay Hidden", "An Inn", "A Inn", "Everest Base Camp",
  "Hotel Is Closed", "Houseboat Reality", "Hauz Khas Villa",
  "Zonal Hospital Dharamshala", "Kisama Heritage Villa", "Spangmik Villa",
  "India's Last Villa", "Desert Camp Dinner",
  // Historic/museum sites the blogs reference for context (not stay recommendations)
  "Anasakti Ashram", "Gandhi's Anasakti Ashram", "The Anasakti Ashram",
  "Sumitranandan Pant Museum",
  // Categorical phrases we use as pattern-pointers, not specific stays
  "Portuguese-quarter B&B", "Portuguese-quarter B&Bs",
  "Family Homestay", "Village Homestay",
]);

// First-word block list — phrases starting with these are almost never hotel names.
// E.g. "While Dharamshala", "From Dharamshala", "Three Hotels..." etc.
const BLOCKED_FIRST_WORDS = new Set([
  "While", "From", "Some", "Your", "Three", "The", "Choose", "Fly", "Drive",
  "These", "This", "That", "Any", "Every", "Most", "Best", "Cheap", "Cheaper",
  "Luxury", "Premium", "Mid-range", "Book", "Find", "Avoid", "Skip",
  "Why", "When", "Where", "How", "What", "Who", "Which",
  "Small", "Large", "Tiny", "Huge",
]);

// Normalise: lowercase, strip punctuation, collapse whitespace
function norm(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/[^a-z0-9&' -]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Levenshtein, capped at 3 for speed
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

// Fetch everything
const [articlesRes, staysRes, picksRes, destsRes] = await Promise.all([
  supabase.from("articles").select("id, slug, title, content, destinations").order("slug"),
  supabase.from("local_stays").select("destination_id, name"),
  supabase.from("destination_stay_picks").select("destination_id, name"),
  supabase.from("destinations").select("id, name"),
]);

if (articlesRes.error || staysRes.error || picksRes.error) {
  console.error("Fetch failed:", articlesRes.error || staysRes.error || picksRes.error);
  process.exit(1);
}

const articles = SLUG_FILTER
  ? articlesRes.data.filter((a) => a.slug === SLUG_FILTER)
  : articlesRes.data;

// Build DB name set (global) + per-destination index
const dbNamesGlobal = new Set();
const dbNamesByDest = new Map(); // destId -> Set<normName>
for (const r of [...staysRes.data, ...picksRes.data]) {
  const n = norm(r.name);
  if (!n) continue;
  dbNamesGlobal.add(n);
  if (!dbNamesByDest.has(r.destination_id)) dbNamesByDest.set(r.destination_id, new Set());
  dbNamesByDest.get(r.destination_id).add(n);
}

// Also index destination names (we don't want "Udaipur Palace" to flag as UNVERIFIED when
// "City Palace" is a monument IN Udaipur — covered by FALSE_POSITIVES, but destinations names
// help classify borderline cases).
const destNames = new Set(destsRes.data.map((d) => norm(d.name)));

// Match a candidate against the DB
function classify(candidate, articleDestinations) {
  const normCand = norm(candidate);
  if (!normCand) return { kind: "FALSE_POSITIVE", reason: "empty" };

  // Known false-positive (monuments, categoricals)
  if (FALSE_POSITIVES.has(candidate.trim())) {
    return { kind: "FALSE_POSITIVE", reason: "known monument/categorical" };
  }
  // Also check normalised against FP
  for (const fp of FALSE_POSITIVES) {
    if (norm(fp) === normCand) return { kind: "FALSE_POSITIVE", reason: "known monument/categorical" };
  }

  // Exact DB hit (any destination)
  if (dbNamesGlobal.has(normCand)) {
    // Tighter: is it in DB for one of this article's declared destinations?
    const inArticleDest = (articleDestinations || []).some((d) => dbNamesByDest.get(d)?.has(normCand));
    return inArticleDest
      ? { kind: "MATCH", reason: "exact + correct destination" }
      : { kind: "MATCH_WRONG_DEST", reason: "exact match but different destination" };
  }

  // Substring either direction
  for (const dbN of dbNamesGlobal) {
    if (dbN.includes(normCand) || normCand.includes(dbN)) {
      // Require one side ≥ 6 chars to avoid spurious matches on short words
      if (dbN.length >= 6 && normCand.length >= 6) {
        return { kind: "CLOSE_DB_MATCH", reason: `substring of '${dbN}'`, dbName: dbN };
      }
    }
  }

  // Token-subset: blog tokens must all appear in DB tokens (handles
  // "anand prakash ashram" vs DB "anand prakash yoga ashram")
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

  // Levenshtein near-match (cap 3) on the longer side
  for (const dbN of dbNamesGlobal) {
    if (Math.abs(dbN.length - normCand.length) <= 3) {
      const d = lev(dbN, normCand);
      if (d <= 2) return { kind: "CLOSE_DB_MATCH", reason: `levenshtein ${d} from '${dbN}'`, dbName: dbN };
    }
  }

  // Nothing — unverified
  return { kind: "UNVERIFIED", reason: "no DB match" };
}

// Extract candidates from a blob of text. Returns [{phrase, sentence}]
function extractCandidates(text) {
  const results = [];
  if (!text) return results;

  // Split on newlines first (headings, list items, paragraphs all break) then sentences
  const chunks = text.split(/\n+/);
  const sentences = [];
  for (const chunk of chunks) {
    // Strip markdown: leading #, *, -, >, [x], numbered list prefixes
    const cleaned = chunk
      .replace(/^\s*[#*>\-+]\s*/, "")
      .replace(/^\s*\d+\.\s*/, "")
      .replace(/^\s*\[[xX ]\]\s*/, "")
      .replace(/^\s*\|/, "")
      .trim();
    if (!cleaned) continue;
    // Split by sentence boundaries within a chunk
    const sents = cleaned.split(/(?<=[.!?])\s+(?=[A-Z])/);
    for (const s of sents) {
      if (s.length > 6) sentences.push(s.trim());
    }
  }

  const kwPattern = LODGING_KW.map((k) => k.replace(/\s+/g, "\\s+")).join("|");
  // Pattern A: 1-3 capitalised words followed by a lodging keyword, optional trailing proper nouns.
  // Anchored: can't cross punctuation/newlines (the sentence split handles newlines).
  const reA = new RegExp(
    `((?:[A-Z][a-zA-Z0-9''&\\-]*\\s+){1,3}(?:${kwPattern})(?:\\s+[A-Z][a-zA-Z0-9''&\\-]*){0,2})`,
    "g"
  );
  // Pattern B: lodging keyword followed by 1-3 capitalised words (e.g. "Hotel Heevan", "Villa Pottipati")
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
      // Drop bare keyword
      const stripped = p.replace(new RegExp(`^(?:${kwPattern})$`, "i"), "").trim();
      if (!stripped) continue;
      // Drop if first word is in the block list
      const firstWord = p.split(/\s+/)[0];
      if (BLOCKED_FIRST_WORDS.has(firstWord)) continue;
      // Drop if phrase is exactly a destination name + keyword (e.g. "Chitkul Stay", "Dharamshala Hotel")
      // — these are blog-section phrases, not hotel names.
      const words = p.split(/\s+/);
      if (words.length === 2) {
        const first = norm(words[0]);
        if (destNames.has(first)) continue; // "Dharamshala Hotel" = city + keyword
      }
      results.push({ phrase: p, sentence: sent.slice(0, 240) });
    }
  }

  return results;
}

// Dedup helper — prefer longer phrases over shorter substrings
function dedup(hits) {
  // Build a map: normalised phrase → hit (longest-wins)
  const best = new Map();
  for (const h of hits) {
    const key = norm(h.phrase);
    const prev = best.get(key);
    if (!prev || h.phrase.length > prev.phrase.length) best.set(key, h);
  }
  const unique = [...best.values()];

  // Drop hits that are substrings of a longer hit in the SAME sentence
  const filtered = unique.filter((h) => {
    const normH = norm(h.phrase);
    return !unique.some((other) =>
      other !== h &&
      other.sentence === h.sentence &&
      other.phrase.length > h.phrase.length &&
      norm(other.phrase).includes(normH)
    );
  });

  return filtered;
}

// ─── Run ───
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

// ─── Stats ───
const kinds = {};
for (const r of report) kinds[r.classification] = (kinds[r.classification] || 0) + 1;

console.log(`Audited ${articles.length} article(s). Found ${report.length} lodging candidates.`);
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
for (const [slug, names] of [...unverifiedByBlog.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const uniq = [...new Set(names)];
  console.log(`  ${uniq.length.toString().padStart(3)}  ${slug}`);
  for (const n of uniq) console.log(`       − ${n}`);
}

mkdirSync("data", { recursive: true });
writeFileSync("data/blog-audit.json", JSON.stringify(report, null, 2));
console.log(`\nFull report: data/blog-audit.json`);

if (STRICT && (kinds.UNVERIFIED || 0) > 0) {
  console.error(`\n✗ ${kinds.UNVERIFIED} UNVERIFIED hits — blocking.`);
  process.exit(1);
}

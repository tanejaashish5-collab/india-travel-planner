#!/usr/bin/env node
/**
 * Lints the 445 `destinations.solo_female_note` strings for named lodging
 * mentions (Hotel X, Y Resort, Z Houseboat etc.) against our curated DB
 * (local_stays + destination_stay_picks) — same rule that governs blog prose.
 *
 * Why: notes render on the destination Safety tab + card badges for the most
 * trust-sensitive audience. A single unverified operator name here compounds
 * the same credibility risk as the blog sweep.
 *
 * Mirrors scripts/audit-blog-stays.mjs — same FALSE_POSITIVES, same
 * fuzzy-match cascade (exact → substring → token-subset → Levenshtein).
 *
 * Usage:
 *   node scripts/audit-solo-female-notes.mjs              # full audit
 *   node scripts/audit-solo-female-notes.mjs --strict     # exit 1 on any UNVERIFIED
 *   node scripts/audit-solo-female-notes.mjs --id srinagar # single destination
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync, mkdirSync } from "fs";

config({ path: "apps/web/.env.local" });

const STRICT = process.argv.includes("--strict");
const ID_FILTER = (() => {
  const i = process.argv.indexOf("--id");
  return i >= 0 ? process.argv[i + 1] : null;
})();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// ─── Shared rule set (copy-aligned with audit-blog-stays.mjs) ───
const LODGING_KW = [
  "Hotel", "Hotels", "Resort", "Resorts", "Houseboat", "Houseboats",
  "Ashram", "Ashrams", "Homestay", "Homestays", "Lodge", "Lodges",
  "Inn", "Retreat", "Retreats", "Camp", "Camps", "Villa", "Villas",
  "Guest House", "Guesthouse", "Guesthouses", "Hostel", "Hostels",
  "Cottage", "Cottages", "Farm", "Farmstay", "Dharamshala",
  "Stay", "B&B", "Residency", "Manor",
];

const FALSE_POSITIVES = new Set([
  "City Palace", "Monsoon Palace", "Umaid Bhawan Palace", "Mysore Palace",
  "Amber Palace", "Mehrangarh", "Gwalior Fort", "Jagmandir Palace",
  "Lake Palace", "Rambagh Palace", "Jahaz Mahal", "Jaipur Palace",
  "Hawa Mahal", "Sheesh Mahal", "Jal Mahal", "Nahargarh Fort", "Jaigarh Fort",
  "Red Fort", "Agra Fort", "Chittorgarh Fort", "Kumbhalgarh Fort",
  "Jaisalmer Fort", "Meherangarh Fort",
  "Beatles Ashram", "The Beatles Ashram", "Sivananda Ashram", "Parmarth Niketan",
  "Sri Aurobindo Ashram", "Osho Ashram", "Swarg Ashram",
  "Golden Temple", "Lotus Temple", "Akshardham Temple",
  "Kedarnath Temple", "Badrinath Temple", "Somnath Temple",
  "Hazratbal Shrine", "Mahabodhi Temple",
  "Chaurasi Kutia", "Dhamek Stupa",
  "UNESCO World Heritage", "World Heritage", "Heritage Site", "World Heritage Site",
  "Heritage Walk", "Heritage Property", "Heritage Town",
  "Tea Estate", "Tea Garden", "Coffee Estate",
  "Tiger Reserve", "National Park", "Wildlife Sanctuary", "Bird Sanctuary",
  "Rest House", "Forest Rest House", "Circuit House",
  "Dharma Retreat", "Vipassana Retreat", "Silent Retreat", "Yoga Retreat",
  "Wellness Retreat",
  "Family Hotel", "Budget Hotel", "Boutique Hotel", "Luxury Hotel", "Party Hostel",
  "Beach Resort", "Mountain Resort", "Ski Resort",
  "Heritage Hotel", "Heritage Stay", "Heritage Homestay",
  "Camp Sites", "Camp Site",
  "Hotel Staff", "Your Hotel", "The Hotel", "A Hotel", "Any Hotel", "This Hotel",
  "Hotel Price", "Hotel Prices", "Hotel Room", "Hotel Rooms", "Hotel Reception",
  "Stay Away", "Stay Here", "Stay There", "Stay Home", "Stay Safe",
  "Stay Options", "Stay Experience", "Stay Longer", "Stay Single",
  "Homestay Network", "Community Homestay", "Village Homestay",
  "Tent City", "Tent Village", "Tent Camp",
  "Anasakti Ashram", "Gandhi's Anasakti Ashram", "The Anasakti Ashram",
  // Categoricals common in solo-female notes
  "Yoga Retreat", "Women-only Retreat", "Solo-female Hostel",
  "Zostel Plus", "Zostel", "Moustache", "The Hosteller",  // known chains — NOT individual properties
]);

const BLOCKED_FIRST_WORDS = new Set([
  "While", "From", "Some", "Your", "Three", "The", "Choose", "Fly", "Drive",
  "These", "This", "That", "Any", "Every", "Most", "Best", "Cheap", "Cheaper",
  "Luxury", "Premium", "Mid-range", "Book", "Find", "Avoid", "Skip",
  "Why", "When", "Where", "How", "What", "Who", "Which",
  "Small", "Large", "Tiny", "Huge", "No",
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

// ─── Fetch ───
const [destsRes, staysRes, picksRes] = await Promise.all([
  supabase
    .from("destinations")
    .select("id, name, solo_female_note")
    .not("solo_female_note", "is", null)
    .order("id"),
  supabase.from("local_stays").select("destination_id, name"),
  supabase.from("destination_stay_picks").select("destination_id, name"),
]);

if (destsRes.error || staysRes.error || picksRes.error) {
  console.error("Fetch failed:", destsRes.error || staysRes.error || picksRes.error);
  process.exit(1);
}

const rows = ID_FILTER
  ? destsRes.data.filter((d) => d.id === ID_FILTER)
  : destsRes.data;

// Build DB name set
const dbNamesGlobal = new Set();
const dbNamesByDest = new Map();
for (const r of [...staysRes.data, ...picksRes.data]) {
  const n = norm(r.name);
  if (!n) continue;
  dbNamesGlobal.add(n);
  if (!dbNamesByDest.has(r.destination_id)) dbNamesByDest.set(r.destination_id, new Set());
  dbNamesByDest.get(r.destination_id).add(n);
}

// State-tourism brand prefixes — treat as categoricals (govt entities, not
// private operators). Equivalent to "Indian Railways" — institutional, not
// a trust risk if the specific hotel isn't in our DB.
const STATE_TOURISM_PREFIXES = [
  "MPTDC", "KTDC", "APTDC", "HPTDC", "MTDC", "GMVN", "KMVN", "JKTDC",
  "UPTDC", "CTDC", "TTDC", "OTDC", "RTDC", "GTDC", "WBTDC", "ITDC",
  "NETDC", "TNSTDC", "STDC",
];
// Generic phrase patterns that are categoricals, not specific named properties
const CATEGORICAL_PATTERNS = [
  /^[A-Z][a-z]+ Hotel$/,              // "Bhaderwah Hotel" — city + keyword
  /^Organi[sz]ed \w+ Camp(s)?$/i,      // "Organised Jungle Camp"
  /^Char Dham Camp(s)?$/,              // pilgrimage-circuit categorical
  /^\w+ Research Farm$/,               // attraction, not stay
  /Base Camp$/,                        // trek-base phrase
  /^Community Homestay/,               // categorical
  /Homestay Network$/,                 // categorical
];

function classify(candidate, destId, sentence = "") {
  const normCand = norm(candidate);
  if (!normCand) return { kind: "FALSE_POSITIVE", reason: "empty" };

  if (FALSE_POSITIVES.has(candidate.trim())) {
    return { kind: "FALSE_POSITIVE", reason: "known monument/categorical" };
  }
  for (const fp of FALSE_POSITIVES) {
    if (norm(fp) === normCand) return { kind: "FALSE_POSITIVE", reason: "known monument/categorical" };
  }

  // State-tourism prefix — govt entity, not a private property
  const firstWord = candidate.split(/\s+/)[0];
  if (STATE_TOURISM_PREFIXES.includes(firstWord)) {
    return { kind: "FALSE_POSITIVE", reason: `state-tourism brand (${firstWord})` };
  }

  // Sentence-context check: if the note mentions a state-tourism prefix
  // immediately before the candidate (e.g. "MPTDC White Tiger Forest Lodge"),
  // treat the whole phrase as state-tourism branded.
  if (sentence) {
    for (const prefix of STATE_TOURISM_PREFIXES) {
      if (sentence.includes(`${prefix} ${candidate}`)) {
        return { kind: "FALSE_POSITIVE", reason: `state-tourism ${prefix} property` };
      }
    }
  }

  // Categorical patterns
  for (const pat of CATEGORICAL_PATTERNS) {
    if (pat.test(candidate.trim())) {
      return { kind: "FALSE_POSITIVE", reason: "categorical phrase" };
    }
  }

  if (dbNamesGlobal.has(normCand)) {
    const inDest = dbNamesByDest.get(destId)?.has(normCand);
    return inDest
      ? { kind: "MATCH", reason: "exact + this destination" }
      : { kind: "MATCH_WRONG_DEST", reason: "exact match but different destination" };
  }

  for (const dbN of dbNamesGlobal) {
    if (dbN.length < 6 || normCand.length < 6) continue;
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
    const cleaned = chunk.replace(/^\s*[#*>\-+]\s*/, "").trim();
    if (!cleaned) continue;
    const sents = cleaned.split(/(?<=[.!?])\s+(?=[A-Z])/);
    for (const s of sents) if (s.length > 6) sentences.push(s.trim());
  }

  const kwPattern = LODGING_KW.map((k) => k.replace(/\s+/g, "\\s+")).join("|");
  const reA = new RegExp(
    `((?:[A-Z][a-zA-Z0-9''&\\-]*\\s+){1,3}(?:${kwPattern})(?:\\s+[A-Z][a-zA-Z0-9''&\\-]*){0,2})`,
    "g"
  );
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
      results.push({ phrase: p, sentence: sent.slice(0, 200) });
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
  return [...best.values()];
}

// ─── Run ───
const report = [];
for (const d of rows) {
  const raw = extractCandidates(d.solo_female_note);
  const hits = dedup(raw);
  for (const h of hits) {
    const cls = classify(h.phrase, d.id, h.sentence);
    report.push({
      destination_id: d.id,
      destination_name: d.name,
      note: d.solo_female_note,
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

console.log(`Audited ${rows.length} solo-female notes. Found ${report.length} lodging candidates.`);
console.log(`Classification:`);
for (const [k, v] of Object.entries(kinds).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k.padEnd(20)} ${v}`);
}

const unverified = report.filter((r) => r.classification === "UNVERIFIED");
const wrongDest = report.filter((r) => r.classification === "MATCH_WRONG_DEST");

if (unverified.length) {
  console.log(`\nUNVERIFIED hits (${unverified.length}):`);
  for (const r of unverified) {
    console.log(`  ${r.destination_id.padEnd(25)} '${r.candidate}'`);
    console.log(`      note: "${r.note.slice(0, 160)}..."`);
  }
}
if (wrongDest.length) {
  console.log(`\nMATCH_WRONG_DEST hits (${wrongDest.length}):`);
  for (const r of wrongDest) {
    console.log(`  ${r.destination_id.padEnd(25)} '${r.candidate}' (in DB for another destination)`);
  }
}

mkdirSync("data", { recursive: true });
writeFileSync("data/solo-female-notes-audit.json", JSON.stringify(report, null, 2));
console.log(`\nFull report: data/solo-female-notes-audit.json`);

if (STRICT && unverified.length > 0) {
  console.error(`\n✗ ${unverified.length} UNVERIFIED — blocking.`);
  process.exit(1);
}

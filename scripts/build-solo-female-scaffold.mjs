#!/usr/bin/env node
/**
 * Fetch all destinations + attributes, categorise by type/tags/difficulty,
 * write scaffold JSON for solo-female annual scoring. Claude fills scores
 * + notes inline in fill-solo-female-drafts.mjs using this scaffold.
 *
 * Output:
 *   data/solo-female/scores.json
 *
 * Categorisation buckets (for drafting speed, not display):
 *   yoga-pilgrim-hub | heritage-city-tier1 | metro-city | beach-resort-peak
 *   hill-station-tier1 | trek-remote | wildlife-park | tribal-remote
 *   spiritual-rural | festival-town-mela | other
 *
 * Usage:
 *   node scripts/build-solo-female-scaffold.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { mkdirSync, writeFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

// Explicit lists for the highest-confidence buckets.
const YOGA_PILGRIM = new Set([
  "rishikesh", "haridwar", "mcleodganj", "dharamshala", "pushkar",
  "bodh-gaya", "bodhgaya", "amritsar", "varanasi", "ayodhya", "tirupati",
  "mathura", "vrindavan", "dwarka", "kedarnath", "badrinath", "gangotri",
  "yamunotri", "somnath", "shirdi", "sabarimala",
]);

const HERITAGE_TIER1 = new Set([
  "udaipur", "jaipur", "jodhpur", "agra", "khajuraho", "hampi", "mandu",
  "orchha", "gwalior", "bijapur", "halebidu", "belur", "mahabalipuram",
  "thanjavur", "madurai", "bikaner", "jaisalmer", "chittorgarh", "mysuru",
  "lucknow", "bhubaneswar", "konark", "puri", "patan", "champaner",
]);

const METRO_CITY = new Set([
  "delhi", "new-delhi", "mumbai", "bangalore", "bengaluru", "chennai",
  "hyderabad", "pune", "kolkata", "ahmedabad", "jaipur-city", "surat",
]);

const BEACH_PEAK = new Set([
  "goa", "old-goa", "palolem", "anjuna", "arambol", "baga", "calangute",
  "gokarna", "varkala", "kovalam", "alleppey", "pondicherry", "puducherry",
  "mahabalipuram-beach", "marari", "agonda",
]);

const HILL_TIER1 = new Set([
  "manali", "shimla", "nainital", "mussoorie", "darjeeling", "gangtok",
  "coorg", "madikeri", "munnar", "kodaikanal", "ooty", "dalhousie",
  "kasauli", "chail", "dharamshala-upper", "landsdowne", "binsar", "almora",
  "kausani", "chopta", "auli", "bhimtal", "kanatal", "lansdowne", "ranikhet",
  "shillong", "cherrapunji", "tawang", "lachung", "lachen", "yuksom",
  "pelling", "pachmarhi", "mahabaleshwar", "lonavala", "khandala", "matheran",
  "panchgani", "mt-abu", "mount-abu", "ooty-coonoor", "horsley-hills",
]);

const TREK_REMOTE = new Set([
  "har-ki-doon", "hampta-pass", "kheerganga", "chandratal", "kibber",
  "khardung-la", "nubra", "nubra-valley", "pangong", "pangong-tso",
  "tso-moriri", "stok-kangri", "markha-valley", "rupin-pass", "bhrigu-lake",
  "valley-of-flowers", "hemkund-sahib", "roopkund", "kuari-pass",
  "goechala", "dzongri", "sandakphu", "triund", "kedarkantha", "brahmatal",
  "deoriatal", "ali-bedni", "kasol", "tosh", "malana", "parvati-valley",
  "dayara-bugyal", "chopta-tungnath", "zanskar", "padum",
]);

const WILDLIFE = new Set([
  "jim-corbett", "corbett", "bandhavgarh", "kanha", "ranthambore",
  "pench", "satpura", "tadoba", "nagarhole", "bandipur", "wayanad",
  "periyar", "kaziranga", "manas", "gir", "sundarbans", "desert-nat-park",
  "panna", "mudumalai", "anamalai", "silent-valley", "bhitarkanika",
  "dachigam", "hemis-wildlife", "dibru-saikhowa", "namdapha", "keoladeo",
]);

const TRIBAL_REMOTE = new Set([
  "longwa", "mon", "kohima", "khonoma", "majuli", "ziro", "tawang-remote",
  "aalo", "dambuk", "mechuka", "anini", "pasighat", "namsai",
  "daporijo", "roing", "khetolai", "ukhrul", "phek",
]);

const SPIRITUAL_RURAL = new Set([
  "hampi-village", "orchha", "mandu-village", "khajuraho-village",
  "halebidu", "belur", "srirangapatna", "shravanabelagola", "badami",
  "pattadakal", "aihole", "lepakshi", "sanchi", "nalanda", "rajgir",
  "vaishali", "kushinagar",
]);

const FESTIVAL_MELA = new Set([
  "varanasi", "allahabad", "prayagraj", "ujjain", "nashik", "haridwar",
  "pushkar", "kumbh-mela", "jagannath-puri", "puri",
]);

function categorise(d) {
  const id = d.id;
  const types = (d.type || []).map((t) => t?.toLowerCase());
  const vibes = (d.vibe || []).map((v) => v?.toLowerCase());
  const tags = (d.tags || []).map((t) => t?.toLowerCase());
  const allLabels = new Set([...types, ...vibes, ...tags]);

  if (YOGA_PILGRIM.has(id)) return "yoga-pilgrim-hub";
  if (FESTIVAL_MELA.has(id)) return "festival-town-mela";
  if (HERITAGE_TIER1.has(id)) return "heritage-city-tier1";
  if (METRO_CITY.has(id)) return "metro-city";
  if (BEACH_PEAK.has(id)) return "beach-resort-peak";
  if (HILL_TIER1.has(id)) return "hill-station-tier1";
  if (TREK_REMOTE.has(id)) return "trek-remote";
  if (WILDLIFE.has(id)) return "wildlife-park";
  if (TRIBAL_REMOTE.has(id)) return "tribal-remote";
  if (SPIRITUAL_RURAL.has(id)) return "spiritual-rural";

  // Fall-back inference from arrays
  if (allLabels.has("trek") || d.difficulty === "hard" || d.difficulty === "extreme") return "trek-remote";
  if (allLabels.has("pilgrimage") || allLabels.has("pilgrim") || allLabels.has("temple") || allLabels.has("yoga")) return "yoga-pilgrim-hub";
  if (allLabels.has("beach")) return "beach-resort-peak";
  if (allLabels.has("wildlife") || allLabels.has("safari") || allLabels.has("national-park")) return "wildlife-park";
  if (allLabels.has("hill-station") || allLabels.has("hill station") || allLabels.has("mountain")) return "hill-station-tier1";
  if (allLabels.has("heritage") || allLabels.has("historical") || allLabels.has("monument")) return "heritage-city-tier1";
  if (allLabels.has("tribal") || allLabels.has("remote")) return "tribal-remote";
  return "other";
}

// ─── Fetch ───
const { data: dests, error } = await supabase
  .from("destinations")
  .select("id, name, state_id, region, type, vibe, tags, difficulty, elevation_m, permit_required, tagline, why_special, best_months, avoid_months")
  .order("id");

if (error) {
  console.error("Fetch failed:", error.message);
  process.exit(1);
}

const entries = dests.map((d) => ({
  id: d.id,
  name: d.name,
  state: d.state_id,
  region: d.region,
  category: categorise(d),
  difficulty: d.difficulty,
  elevation_m: d.elevation_m,
  permit_required: d.permit_required,
  type: d.type,
  vibe: d.vibe,
  tags: d.tags,
  best_months: d.best_months,
  avoid_months: d.avoid_months,
  tagline: d.tagline,
  new_score: null,
  new_note: null,
}));

// ─── Category distribution summary ───
const dist = {};
for (const e of entries) dist[e.category] = (dist[e.category] || 0) + 1;

mkdirSync("data/solo-female", { recursive: true });
writeFileSync("data/solo-female/scores.json", JSON.stringify(entries, null, 2));

console.log(`Scaffold written: data/solo-female/scores.json`);
console.log(`Total destinations: ${entries.length}`);
console.log("\nCategory distribution:");
for (const [cat, n] of Object.entries(dist).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat.padEnd(25)} ${n}`);
}
console.log(`\nNext: Claude fills new_score + new_note for all ${entries.length} entries in fill-solo-female-drafts.mjs`);

#!/usr/bin/env node
/* eslint-disable no-console */
// scripts/_gen-festival-celebration-prompts.mjs
//
// Builds the FESTIVAL-CELEBRATION video-prompt spreadsheet — one detailed,
// festival-SPECIFIC prompt per festival that depicts the CELEBRATION itself
// (people, rituals, decorations, attire, crowds), NOT the host landscape.
//
// This supersedes data/festivals/video-prompts.csv (the deprecated 2026-06-09
// "location-only B-roll" sheet, whose policy was "never render the festival").
// Founder direction 2026-06-11: relevant videos for ALL festivals showing the
// celebration — so each prompt now leads with the festival, grounded in the
// festival row's OWN description/significance (no invented rituals; thin rows
// fall back to a family-level iconic visual and are flagged generic).
//
// Output: data/festivals/festival-celebration-prompts.csv  (xlsx built after).
//
// Also tags each festival with whether REAL footage already exists (via the
// shared footage classifier + the fam-*.mp4 clips already on disk/R2), so the
// "needs generation vs has real footage" split is explicit.
//
// Usage: node scripts/_gen-festival-celebration-prompts.mjs

import { writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROOT, loadEnv, getSupabase, fetchAll } from "./_vs-lib.mjs";
import { classifyFootage } from "./_lib/festival-footage-rules.mjs";

await loadEnv();

const OUT_DIR = path.join(ROOT, "data", "festivals");
const OUT_CSV = path.join(OUT_DIR, "festival-celebration-prompts.csv");
const FOOTAGE_DIR = path.join(OUT_DIR, "footage");

const MONTH = ["", "January","February","March","April","May","June","July","August","September","October","November","December"];
// Season cue by month (drives light/weather, kept light-touch — the festival
// is the subject, not the terrain).
const SEASON = {
  1:"crisp winter daylight",2:"clear late-winter light",3:"warm spring light",4:"warm pre-summer light",
  5:"bright summer light",6:"early-monsoon overcast, fresh greens",7:"monsoon light, wet sheen",8:"monsoon light, lush greens",
  9:"clear post-monsoon light",10:"golden autumn light",11:"cool early-winter light",12:"cold winter light, long shadows",
};

// Per-family ICONIC CELEBRATION visual — the safety net that fills a thin DB
// description so even sparse rows get a festival-true prompt (never a landscape).
// Keyed by the footage family from _lib/festival-footage-rules.mjs.
const CELEBRATION_VISUAL = {
  "holi": "crowds drenched in bright dry-colour powder, throwing fistfuls of gulal, clouds of pink/green/yellow in the air, dancing to dhol drums",
  "diwali": "rows of lit clay oil-diyas and lantern light, colourful rangoli, families lighting lamps, fireworks over rooftops at night",
  "ganesh": "vividly decorated Ganesha idols carried through streets, dancing crowds with drums and colour, immersion (visarjan) at the water's edge",
  "durga-navratri": "elaborately lit pandals and Durga idols, dhunuchi incense dance, garba/dandiya circles in colourful chaniya-choli",
  "monastery-cham": "masked Buddhist monks in brocade robes performing the whirling Cham dance in a monastery courtyard, long dungchen horns, drums, prayer flags, seated crowds",
  "onam-boatrace": "long snake-boats with dozens of rowers paddling in perfect sync, helmsman urging them on, cheering crowds along the backwater; pookalam flower carpets",
  "kumbh-snan": "vast sea of pilgrims and ash-smeared sadhus bathing at the river confluence at dawn, marigold offerings, saffron flags, mass devotion",
  "bathukamma": "women in silk saris circling tall conical stacks of marigold and seasonal flowers, clapping and singing, lamps on top",
  "camel-fair": "thousands of decorated camels and turbaned traders on the desert fairground, folk music, moustache and turban contests, hot-air balloons over the dunes",
  "goa-carnival": "flamboyant float parade led by King Momo, costumed dancers, brass bands, confetti through Panaji's streets",
  "bihu": "rows of dancers in red-and-white attire performing the Bihu dance to dhol and pepa horn, bamboo stage, gamosa cloth",
  "rath-yatra": "enormous wooden temple chariots hauled by thousands on thick ropes through a packed processional avenue, drums and conch",
  "chhath": "devotees standing waist-deep in the river at sunrise offering to the sun, bamboo soop baskets of fruit, earthen lamps on the ghats",
  "hornbill": "Naga tribes in feathered headdresses and warrior attire performing log-drum and spear dances at a heritage village, bonfires, traditional crafts",
  "thrissur-pooram": "a grand line of caparisoned elephants with golden caparisons and ceremonial parasols, panchavadyam percussion, huge temple crowd",
  "dasara-mysore": "caparisoned elephants carrying golden howdahs in the Jamboo Savari procession, the illuminated palace ablaze with lights",
  "dussehra-kullu": "hundreds of village deity palanquins converging on the maidan, drummers and horn players, the rath of Raghunath",
  "dussehra-tribal-bastar": "tribal communities hauling a great wooden chariot of Danteshwari Devi, drums, tribal attire, forest-town streets",
  "bonalu": "women balancing decorated bonam pots on their heads in procession to a Mahankali temple, potharaju in red, drums and trance",
  "theyyam": "a Theyyam performer in towering headdress and red costume with painted face, ringed by fire, drums building, awed villagers",
  "shivaratri": "night-long temple vigil — oil lamps and aarti flames before a Shiva shrine, bel leaves and milk offerings, chanting crowds, processions",
  "islamic": "crowds gathered for prayer and feasting at a mosque or dargah courtyard, qawwali, festive markets and lights (no close-ups of worship)",
  "colonial-christian": "decorated church and street lights, carols and parades, midnight-mass crowds, festive lights and stars",
  "flower-bloom": "vast geometric beds of blooming flowers, visitors strolling the gardens, colour as far as the eye can see",
  "harvest-sankranti": "kite-filled skies and bonfires, harvest dances, boiling pongal pots, decorated cattle, fresh-cut fields",
  "newyear-harvest": "regional new-year celebration — festive attire, ceremonial first-fruits, folk dance, decorated thresholds",
  "litfest": "open-air tented festival sessions, packed audiences, heritage venue, book stalls and conversation",
  "folk-women": "women in bright traditional dress at swings and fairs, folk songs and dance, seasonal decorations",
};

// Generic, honest fallback when a festival has no family AND a thin description.
const GENERIC_VISUAL = "the community gathered in celebration — festive attire, music and dance, decorations and rituals true to the local tradition";

function cleanText(s) {
  return (s || "")
    .replace(/\s+/g, " ")
    .replace(/^["'\s]+|["'\s]+$/g, "")
    .trim();
}

function csvEscape(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function baseSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]+/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function buildSlugMap(rows) {
  const count = new Map();
  for (const r of rows) { const b = baseSlug(r.name); count.set(b, (count.get(b) ?? 0) + 1); }
  const m = new Map();
  for (const r of rows) {
    const b = baseSlug(r.name);
    m.set(r.id, (count.get(b) ?? 1) > 1 && r.destination_id ? `${b}-${r.destination_id}` : b);
  }
  return m;
}

const RAIN_SHADOW_STATES = new Set(["ladakh", "lahaul-spiti", "spiti"]);

function titleCase(s) { return (s || "").replace(/\b\w/g, (c) => c.toUpperCase()); }

function buildPrompt({ name, destName, state, stateId, month, description, family }) {
  const desc = cleanText(description);
  const famVisual = CELEBRATION_VISUAL[family];
  // Grounding: prefer the festival's OWN description (specific, real). Family
  // visual augments; generic only when both description and family are absent.
  const grounded = desc.length >= 40;
  const celebration = grounded
    ? desc
    : (famVisual || GENERIC_VISUAL);
  const augment = grounded && famVisual ? ` Key visuals: ${famVisual}.` : "";
  const where = destName ? ` as celebrated in ${destName}, ${titleCase(state)}` : "";
  // Avoid "<Name> Festival festival" when the name already carries an event word.
  const noun = /\b(festival|fest|mela|fair|utsav|mahotsav|yatra|jatra|jatara|puja|pooram|carnival|parva|jayanti|purnima|dussehra|dasara|navratri|navaratri|eid|carnaval)\b/i.test(name)
    ? "" : " festival";
  // Ladakh/Spiti are rain-shadow — never "monsoon" in Jun–Sep.
  const season = (RAIN_SHADOW_STATES.has(stateId) && month >= 6 && month <= 9)
    ? "clear high-altitude mountain light, sharp shadows" : (SEASON[month] || "natural daylight");
  const prompt =
    `Cinematic documentary-style video, 16:9, 6–8 seconds, authentic real-footage look, of the ${name}${noun}${where}. ` +
    `Celebration: ${celebration}.${augment} ` +
    `${season}; show real people, actual rituals, decorations and crowds with genuine festive energy; ` +
    `vibrant true-to-life colour, natural handheld motion, shallow depth of field. ` +
    `No on-screen text, subtitles, captions, logos or watermarks; no distorted or extra faces/limbs; documentary realism, not cartoonish or AI-looking.`;
  return { prompt, celebration: grounded ? desc : (famVisual || GENERIC_VISUAL), grounded };
}

async function main() {
  const supabase = await getSupabase();
  const festivals = await fetchAll(
    supabase, "festivals",
    "id, destination_id, name, month, approximate_date, description, significance",
  );
  const destIds = [...new Set(festivals.map((f) => f.destination_id).filter(Boolean))];
  const destById = new Map();
  for (let i = 0; i < destIds.length; i += 200) {
    const { data } = await supabase.from("destinations")
      .select("id, name, state_id, type, elevation_m").in("id", destIds.slice(i, i + 200));
    for (const d of data ?? []) destById.set(d.id, d);
  }

  const sourced = new Set(
    existsSync(FOOTAGE_DIR)
      ? readdirSync(FOOTAGE_DIR).filter((f) => /^fam-.+\.mp4$/.test(f)).map((f) => f.replace(/^fam-/, "").replace(/\.mp4$/, ""))
      : [],
  );

  const slugMap = buildSlugMap(festivals);
  const HEADER = [
    "festival_id","festival_slug","festival_name","destination","state","month_num","month_name",
    "approximate_date","footage_family","has_real_footage","prompt_grounding",
    "celebration","full_video_prompt","negative_prompt","reference_image_url","page_url_en",
  ];
  const NEG = "on-screen text, subtitles, captions, watermarks, logos, brand names, distorted faces, extra limbs, cartoonish, CGI sheen, oversaturated, low quality";
  const lines = [HEADER.map(csvEscape).join(",")];
  let grounded = 0, generic = 0, real = 0;

  for (const f of festivals) {
    const d = destById.get(f.destination_id);
    const cls = classifyFootage(f.name);
    const hasReal = sourced.has(cls.family);
    if (hasReal) real++;
    const slug = slugMap.get(f.id) ?? baseSlug(f.name);
    const state = cleanText((d?.state_id ?? "").replace(/-/g, " "));
    const { prompt, celebration, grounded: isGrounded } = buildPrompt({
      name: f.name, destName: d?.name, state, stateId: (d?.state_id ?? "").toLowerCase(),
      month: f.month, description: f.description, family: cls.family,
    });
    if (isGrounded) grounded++; else generic++;
    const refImg = f.destination_id
      ? `https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev/destinations/${f.destination_id}.jpg` : "";
    lines.push([
      f.id, slug, f.name, d?.name ?? "", state, f.month, MONTH[f.month] ?? "",
      f.approximate_date ?? "", cls.family, hasReal ? "yes" : "no",
      isGrounded ? "db-description" : (CELEBRATION_VISUAL[cls.family] ? "family-template" : "generic"),
      celebration, prompt, NEG, refImg, `https://www.nakshiq.com/en/festivals/${slug}`,
    ].map(csvEscape).join(","));
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_CSV, lines.join("\n") + "\n", "utf8");
  console.log(`Wrote ${lines.length - 1} festival-celebration prompts → ${path.relative(ROOT, OUT_CSV)}`);
  console.log(`  prompt grounding: ${grounded} from DB description, ${generic} family/generic fallback`);
  console.log(`  real footage already exists: ${real}; needs sourcing/generation: ${festivals.length - real}`);
}

main().catch((e) => { console.error(e); process.exit(1); });

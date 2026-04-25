#!/usr/bin/env node
/**
 * Sprint Hindi parity (R1 §3.2 closure).
 * Translates name + tagline + why_special into translations.hi JSONB
 * for all 272 destinations missing HI parity.
 *
 * Voice doc explicitly permits literal translations. Uses Claude Haiku
 * for speed + cost (~$0.50 total at current pricing for the full run).
 *
 * Modes:
 *   --pilot       run on first 5 destinations, print output, no DB writes
 *   --bulk        run on all 272 destinations, write to DB in 20-row batches
 *   --resume      skip destinations that already have hi.name + hi.tagline
 *
 * Usage:
 *   node scripts/_sprint-i18n-full.mjs --pilot
 *   node scripts/_sprint-i18n-full.mjs --bulk
 */
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { config } from "dotenv";
import { readFileSync, writeFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const PILOT = args.includes("--pilot");
const BULK = args.includes("--bulk");
const RESUME = args.includes("--resume");
if (!PILOT && !BULK) {
  console.error("Usage: --pilot or --bulk required");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a professional translator producing Hindi (हिंदी) translations for an India travel website.

Style rules:
1. Translate to natural, modern, conversational Hindi — the kind a confident travel editor would write.
2. KEEP proper nouns (place names, monument names, fort names) in Devanagari transliteration. Example: "Manali" → "मनाली", "Khajuraho" → "खजुराहो".
3. Translate descriptive vocabulary literally — "hill station" → "पहाड़ी स्थल", "ancient temple" → "प्राचीन मंदिर".
4. NEVER use heavy Sanskritised Hindi. NEVER add filler ("amazing", "must-visit", "breathtaking") that isn't in the English source.
5. Sentence case in headings; no UPPERCASE.
6. Keep numerals as-is (e.g. "2,500m" stays "2,500m").
7. Output ONLY a JSON object — no preamble, no markdown.`;

const QUEUE_PATH = "data/hindi-parity-queue.json";

async function fetchEnglishFields(ids) {
  // Fetch name, tagline, why_special for the queued destinations
  const { data, error } = await supabase
    .from("destinations")
    .select("id, name, tagline, why_special, translations")
    .in("id", ids);
  if (error) throw error;
  return data ?? [];
}

async function translateBatch(rows) {
  // rows: array of { id, name, tagline, why_special }
  const userPayload = rows.map((r) => ({
    id: r.id,
    name: r.name,
    tagline: r.tagline ?? "",
    why_special: r.why_special ?? "",
  }));

  const userMessage = `Translate the following ${rows.length} destinations to Hindi.

Return JSON with this exact shape:
{
  "<id>": {
    "name": "हिंदी नाम",
    "tagline": "हिंदी में टैगलाइन",
    "why_special": "हिंदी में विवरण"
  }
}

Translate ONLY non-empty fields; if a field in the input is empty string, return empty string in the output.

Input:
${JSON.stringify(userPayload, null, 2)}`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text = response.content[0]?.type === "text" ? response.content[0].text : "";
  // Strip code fences if Claude added them
  const cleaned = text.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Claude response. Raw:", text.slice(0, 500));
    throw err;
  }
}

async function applyTranslations(idToHi) {
  let updated = 0;
  const errors = [];
  for (const [id, hi] of Object.entries(idToHi)) {
    // Read existing translations to merge (don't clobber other locales)
    const { data: existing } = await supabase
      .from("destinations")
      .select("translations")
      .eq("id", id)
      .single();

    const next = {
      ...(existing?.translations ?? {}),
      hi: { ...((existing?.translations ?? {}).hi ?? {}), ...hi },
    };

    const { error } = await supabase
      .from("destinations")
      .update({ translations: next })
      .eq("id", id);

    if (error) errors.push({ id, error: error.message });
    else updated++;
  }
  return { updated, errors };
}

const queue = JSON.parse(readFileSync(QUEUE_PATH, "utf-8"));
const allMissing = queue.queue.destinations_missing_both;
console.log(`Queue size: ${allMissing.length}`);

let toProcess = allMissing;

if (RESUME) {
  // Skip destinations that already have name + tagline (race-condition recovery)
  const ids = allMissing.map((d) => d.id);
  const checked = await fetchEnglishFields(ids);
  toProcess = allMissing.filter((d) => {
    const row = checked.find((r) => r.id === d.id);
    const hi = row?.translations?.hi ?? {};
    return !(hi.name && hi.tagline);
  });
  console.log(`After --resume filter: ${toProcess.length} remaining`);
}

if (PILOT) {
  toProcess = toProcess.slice(0, 5);
  console.log(`PILOT MODE: processing first ${toProcess.length} destinations only`);
}

const ids = toProcess.map((d) => d.id);
const englishRows = await fetchEnglishFields(ids);
console.log(`Fetched ${englishRows.length} English source rows`);

// Batch in groups of 8 destinations per Claude call (each translation ~600+ chars,
// 8 keeps responses comfortably under max_tokens=8192 ceiling).
const BATCH_SIZE = 8;
const batches = [];
for (let i = 0; i < englishRows.length; i += BATCH_SIZE) {
  batches.push(englishRows.slice(i, i + BATCH_SIZE));
}
console.log(`Translating in ${batches.length} batch(es)...`);

let totalUpdated = 0;
const allErrors = [];
const allTranslations = {};

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  console.log(`\nBatch ${i + 1}/${batches.length} — ${batch.length} dests`);

  let translations;
  try {
    translations = await translateBatch(batch);
  } catch (err) {
    console.error(`  ✗ Translation call failed: ${err.message}`);
    // Retry once with a smaller sub-batch (split in halves)
    if (batch.length > 1) {
      const half = Math.ceil(batch.length / 2);
      const sub1 = batch.slice(0, half);
      const sub2 = batch.slice(half);
      try {
        const t1 = await translateBatch(sub1);
        const t2 = await translateBatch(sub2);
        translations = { ...t1, ...t2 };
        console.log(`    retry succeeded after split`);
      } catch (err2) {
        console.error(`    retry also failed: ${err2.message}`);
        continue;
      }
    } else {
      continue;
    }
  }

  Object.assign(allTranslations, translations);

  if (PILOT) {
    console.log("  Translations preview:");
    console.log(JSON.stringify(translations, null, 2));
  } else {
    const { updated, errors } = await applyTranslations(translations);
    totalUpdated += updated;
    if (errors.length > 0) allErrors.push(...errors);
    console.log(`  ✓ DB updated: ${updated}/${batch.length} ${errors.length ? `(errors: ${errors.length})` : ""}`);
  }
}

if (PILOT) {
  writeFileSync("data/hindi-parity-pilot.json", JSON.stringify(allTranslations, null, 2));
  console.log("\nPilot output written to data/hindi-parity-pilot.json");
  console.log("Inspect, then re-run with --bulk to apply across all 272.");
} else {
  console.log(`\n═══ FINAL SUMMARY ═══`);
  console.log(`Updated: ${totalUpdated}/${englishRows.length}`);
  if (allErrors.length) console.log(`Errors:`, allErrors.slice(0, 5));
}

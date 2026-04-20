#!/usr/bin/env node
/**
 * generate-enrichment-drafts.mjs — Claude-backed drafter for the 4 deep
 * content columns on destination_months:
 *   - things_to_do        (3–5 month-specific verbs)
 *   - festivals_this_month (0–3 verified festivals, default empty)
 *   - pack_list           (5–7 items tuned to altitude + weather)
 *   - go_or_skip_verdict  (one sentence, 25–40 words, starts with
 *                          "Go"/"Skip"/"Mixed")
 *
 * Usage:
 *   node scripts/generate-enrichment-drafts.mjs --tier 5
 *   node scripts/generate-enrichment-drafts.mjs --tier 4 --limit 50
 *   node scripts/generate-enrichment-drafts.mjs --tier 5 --only-missing
 *
 * Output:
 *   data/enrichment/deep-tier{N}.json
 *
 * Safety:
 *   - Does NOT write to Supabase. Only generates staging JSON.
 *   - Audit + commit is a separate script (enrich-destination-months-deep.mjs).
 *   - Prompt hard-constrains Claude to grounded facts only; no invented
 *     hospitals, festivals, or specifics.
 *   - Default batch size = 20 concurrent. Use --concurrency to tune.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

// ── Banned words (brand voice — match enrich-notes.mjs) ─────────
const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
];

// ── CLI args ──────────────────────────────────────────────────
const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return fallback;
  return args[i + 1]?.startsWith("--") ? true : (args[i + 1] ?? true);
}
const tier = Number(flag("tier"));
const limit = flag("limit") ? Number(flag("limit")) : null;
const onlyMissing = args.includes("--only-missing");
const concurrency = Number(flag("concurrency") ?? 20);
const outFile = flag("out") ?? `data/enrichment/deep-tier${tier}.json`;

if (![3, 4, 5].includes(tier)) {
  console.error("Usage: generate-enrichment-drafts.mjs --tier {3|4|5} [--limit N] [--only-missing]");
  process.exit(1);
}

// ── Env ───────────────────────────────────────────────────────
function loadEnv() {
  const env = {};
  for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}
const env = loadEnv();
if (!env.ANTHROPIC_API_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing ANTHROPIC_API_KEY or SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local");
  process.exit(1);
}
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const claude = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

// ── Fetch rows to enrich ──────────────────────────────────────
console.log(`\nFetching tier-${tier} destination-months…`);
const { data: rows, error } = await supabase
  .from("destination_months")
  .select(`
    destination_id, month, score, note, why_go, why_not, prose_lead,
    go_or_skip_verdict, things_to_do, festivals_this_month, pack_list,
    destination:destinations(name, tagline, state_id, elevation_m, tags, difficulty, budget_tier)
  `)
  .eq("score", tier);

if (error) { console.error(error); process.exit(1); }

const filtered = onlyMissing
  ? rows.filter((r) => !r.go_or_skip_verdict || !r.things_to_do || !r.pack_list)
  : rows;
const batch = limit ? filtered.slice(0, limit) : filtered;

console.log(`  → ${rows.length} rows at score=${tier}, ${batch.length} after filters.\n`);

// ── Prompt template ──────────────────────────────────────────
const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildPrompt(row) {
  const d = Array.isArray(row.destination) ? row.destination[0] : row.destination;
  const month = MONTH_NAMES[row.month];
  const tagsStr = Array.isArray(d?.tags) && d.tags.length ? d.tags.join(", ") : "";
  return `You are writing editorial content for NakshIQ, an India travel intelligence site. The reader is an informed traveller who wants to know whether to go and what to expect — not a brochure.

DESTINATION: ${d?.name} (id: ${row.destination_id})
STATE: ${d?.state_id}
MONTH: ${month}
MONTHLY SCORE: ${row.score}/5 (${["","avoid","caution","fair","good","peak"][row.score]})
ELEVATION: ${d?.elevation_m ? `${d.elevation_m}m` : "low/unknown"}
DIFFICULTY: ${d?.difficulty ?? "n/a"}
TAGS: ${tagsStr}
EXISTING NOTE: ${row.note ?? "(none)"}
WHY GO: ${row.why_go ?? "(none)"}
WHY NOT: ${row.why_not ?? "(none)"}

Generate strict JSON with these 4 keys:

1. "things_to_do" — array of 3 to 5 strings. Each a short, month-specific activity starting with a verb ("ski", "trek", "paddle", "walk"). Concrete, grounded in the destination's known character (from tags + elevation + existing note). No generic "explore the area."

2. "festivals_this_month" — array of 0 to 3 strings. ONLY include festivals you are certain happen in ${d?.state_id} in ${month}. Examples of verified festivals: Hornbill (Nagaland, Dec), Pushkar Camel Fair (Rajasthan, Nov), Rann Utsav (Gujarat, Nov–Feb), Hemis (Ladakh, Jun/Jul), Onam (Kerala, Aug/Sep), Ziro Music (Arunachal, Sep). If you cannot name a verified festival for THIS state in THIS month, return []. Do not invent.

3. "pack_list" — array of 5 to 7 items. Tuned to altitude (${d?.elevation_m ?? "?"}m) and ${month}'s weather. Short item names, not prose. Include specific gear (e.g. "trekking poles" at high altitude, "water shoes" at beaches) not generic ("comfortable clothes").

4. "go_or_skip_verdict" — exactly one sentence, 25–40 words. MUST begin with "Go", "Skip", or "Mixed". Combine the score with one concrete reason. Example: "Go in May — Spiti's passes are just open, daytime temps are pleasant, but nights still hit -5°C so carry layers."

HARD RULES:
- Never invent specific hospital names, phone numbers, police stations, homestay owners, or tourism helplines.
- Never mention a festival unless you are certain of the state + month.
- No banned words: ${BANNED.join(", ")}.
- All content in English. No Hindi romanisation except proper nouns.
- Respond with ONLY the JSON object. No prose, no markdown fences.`;
}

// ── Generator ────────────────────────────────────────────────
async function generateOne(row) {
  try {
    const res = await claude.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      messages: [{ role: "user", content: buildPrompt(row) }],
    });
    const text = res.content.find((b) => b.type === "text")?.text?.trim() ?? "";
    const cleaned = text.replace(/^```json\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      destination_id: row.destination_id,
      month: row.month,
      things_to_do: Array.isArray(parsed.things_to_do) ? parsed.things_to_do : [],
      festivals_this_month: Array.isArray(parsed.festivals_this_month) ? parsed.festivals_this_month : [],
      pack_list: Array.isArray(parsed.pack_list) ? parsed.pack_list : [],
      go_or_skip_verdict: String(parsed.go_or_skip_verdict ?? "").trim(),
    };
  } catch (e) {
    console.error(`  ✗ ${row.destination_id} m=${row.month}: ${e.message}`);
    return null;
  }
}

// ── Parallel batch loop with checkpoint writes ──────────────
// Flush to disk after every chunk so a mid-run crash (e.g. API
// quota hit) preserves everything generated so far. Resume via
// --only-missing on the next run.
mkdirSync(dirname(outFile), { recursive: true });
const results = [];
for (let i = 0; i < batch.length; i += concurrency) {
  const chunk = batch.slice(i, i + concurrency);
  process.stdout.write(`  [${i + 1}–${Math.min(i + concurrency, batch.length)}/${batch.length}]…`);
  const chunkResults = await Promise.all(chunk.map(generateOne));
  results.push(...chunkResults.filter(Boolean));
  writeFileSync(outFile, JSON.stringify(results, null, 2));
  process.stdout.write(` ✓ ${results.length}\n`);
}
console.log(`\n✓ Wrote ${results.length} drafts → ${outFile}`);
console.log(`Next: node scripts/enrich-destination-months-deep.mjs ${outFile} --commit\n`);

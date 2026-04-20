#!/usr/bin/env node
/**
 * enrich-kids-verdicts.mjs — generate + commit family_verdict for
 * top-100 kid-friendly destinations (kids_friendly.rating >= 4).
 *
 * Combined generate-and-commit because this is a one-shot per row
 * and the audit rules are simple enough to embed directly.
 *
 * Usage:
 *   node scripts/enrich-kids-verdicts.mjs                    # dry-run
 *   node scripts/enrich-kids-verdicts.mjs --commit           # write
 *   node scripts/enrich-kids-verdicts.mjs --rating 3 --commit
 *   node scripts/enrich-kids-verdicts.mjs --only-missing --commit
 *
 * Verdict format:
 *   - 2 to 3 sentences
 *   - Total 30–90 words
 *   - Starts with action advice, not adjective
 *     Good: "Go with kids 6+, skip under 4 — altitude is the single risk."
 *     Bad:  "Coorg is a wonderful family destination."
 */

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
  "wonderful", "perfect family", "amazing",
];

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return fallback;
  return args[i + 1]?.startsWith("--") ? true : (args[i + 1] ?? true);
}
const minRating = Number(flag("rating") ?? 4);
const onlyMissing = args.includes("--only-missing") || !args.includes("--all");
const commit = args.includes("--commit");
const concurrency = Number(flag("concurrency") ?? 10);

function loadEnv() {
  const env = {};
  for (const line of readFileSync("apps/web/.env.local", "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.+)$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return env;
}
const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const claude = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

console.log(`\nFetching kids_friendly with rating >= ${minRating}${onlyMissing ? " and family_verdict IS NULL" : ""}…`);

let query = supabase
  .from("kids_friendly")
  .select(`
    destination_id, suitable, rating, min_recommended_age, best_age_group,
    stroller_accessible, reasons, concerns, kid_highlights, not_suitable_reason,
    family_verdict,
    destination:destinations(name, tagline, state_id, elevation_m, tags, difficulty)
  `)
  .gte("rating", minRating);

const { data: rows, error } = await query;
if (error) { console.error(error); process.exit(1); }

const batch = onlyMissing ? rows.filter((r) => !r.family_verdict) : rows;
console.log(`  → ${rows.length} rows at rating >= ${minRating}, ${batch.length} need verdicts.`);
console.log(`Mode: ${commit ? "\x1b[31mCOMMIT\x1b[0m" : "dry-run (pass --commit to write)"}\n`);

function buildPrompt(r) {
  const d = Array.isArray(r.destination) ? r.destination[0] : r.destination;
  return `You are writing a family verdict for NakshIQ, an India travel intelligence site. The reader is a parent deciding whether to take their kids here.

DESTINATION: ${d?.name}
STATE: ${d?.state_id}
ELEVATION: ${d?.elevation_m ?? "low/unknown"}m
RATING FOR KIDS: ${r.rating}/5 (${r.suitable ? "suitable" : "not ideal"})
MIN AGE: ${r.min_recommended_age ?? "n/a"}
BEST AGE GROUP: ${r.best_age_group ?? "n/a"}
STROLLER ACCESSIBLE: ${r.stroller_accessible ? "yes" : "no"}
REASONS: ${Array.isArray(r.reasons) ? r.reasons.join("; ") : r.reasons ?? ""}
CONCERNS: ${Array.isArray(r.concerns) ? r.concerns.join("; ") : r.concerns ?? ""}
KID HIGHLIGHTS: ${Array.isArray(r.kid_highlights) ? r.kid_highlights.join("; ") : r.kid_highlights ?? ""}
NOT SUITABLE REASON: ${r.not_suitable_reason ?? "n/a"}

Write a family_verdict:
- 2 to 3 sentences, 30–90 words total.
- Opens with action advice (Go / Skip / Go if…). Not an adjective.
- Names the specific age window that works (e.g. "kids 6+") if derivable.
- Names the ONE biggest risk (altitude, roads, lack of food options, etc.) if the data supports it.
- Ends with a concrete practical tip where possible.

Example (good): "Go with kids 6+ — the homestays are safe and the trails are short. Skip under 5 because the altitude (2,500m) will hit them hard. Pack Diamox if anyone's prone to AMS."
Example (bad): "Coorg is a wonderful family destination for all ages."

HARD RULES:
- Ground every claim in the data above. Never invent specifics not provided.
- No banned words: ${BANNED.join(", ")}
- No vague praise. Concrete, grounded advice only.
- Respond with ONLY the verdict text. No JSON, no markdown, no preamble.`;
}

function auditVerdict(v) {
  if (!v || typeof v !== "string") return ["empty verdict"];
  const errors = [];
  const words = v.trim().split(/\s+/).filter(Boolean);
  if (words.length < 25 || words.length > 100)
    errors.push(`word count ${words.length} (want 25–100)`);
  const lower = v.toLowerCase();
  const hits = BANNED.filter((w) => lower.includes(w));
  if (hits.length) errors.push(`banned: ${hits.join(", ")}`);
  // Must contain some advice word in the first 15 words
  const firstWords = words.slice(0, 15).join(" ").toLowerCase();
  if (!/\b(go|skip|avoid|take|bring|wait|book|consider|don'?t)\b/.test(firstWords))
    errors.push("missing advice verb in opening");
  return errors;
}

async function generateOne(r) {
  try {
    const res = await claude.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [{ role: "user", content: buildPrompt(r) }],
    });
    const text = res.content.find((b) => b.type === "text")?.text?.trim() ?? "";
    return { destination_id: r.destination_id, family_verdict: text };
  } catch (e) {
    console.error(`  ✗ ${r.destination_id}: ${e.message}`);
    return null;
  }
}

const drafts = [];
for (let i = 0; i < batch.length; i += concurrency) {
  const chunk = batch.slice(i, i + concurrency);
  process.stdout.write(`  [${i + 1}–${Math.min(i + concurrency, batch.length)}/${batch.length}]…`);
  const chunkResults = await Promise.all(chunk.map(generateOne));
  drafts.push(...chunkResults.filter(Boolean));
  process.stdout.write(` ✓ ${drafts.length}\n`);
}

// Audit
const audited = drafts.map((d) => ({ ...d, errors: auditVerdict(d.family_verdict) }));
const rejects = audited.filter((d) => d.errors.length > 0);
console.log(`\nAudit: ${audited.length - rejects.length} pass, ${rejects.length} fail.`);
if (rejects.length > 0) {
  for (const r of rejects.slice(0, 20)) {
    console.error(`  ${r.destination_id}: ${r.errors.join("; ")}`);
    console.error(`    "${r.family_verdict.slice(0, 120)}…"`);
  }
}

const passed = audited.filter((d) => d.errors.length === 0);
console.log(`\nWill write ${passed.length} verdicts.`);

if (!commit) {
  console.log("Run again with --commit to persist.\n");
  process.exit(0);
}

let ok = 0, fail = 0;
for (const r of passed) {
  const { error } = await supabase
    .from("kids_friendly")
    .update({ family_verdict: r.family_verdict })
    .eq("destination_id", r.destination_id);
  if (error) { console.error(`  ✗ ${r.destination_id}: ${error.message}`); fail++; }
  else ok++;
}
console.log(`\n✓ Committed: ${ok}  ✗ Failed: ${fail}\n`);
process.exit(fail > 0 ? 3 : 0);

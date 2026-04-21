#!/usr/bin/env node
/**
 * generate-verdict-drafts.mjs — drafts the 3-value verdict + skip_reason for
 * destination_months, one row at a time.
 *
 * Hybrid strategy (see /Users/ashishtaneja/.claude/plans/smooth-orbiting-music.md):
 *   - score >= 4 → verdict='go', skip_reason=NULL, no Haiku call (deterministic).
 *   - score == 3 → verdict='wait', Haiku generates 15–120-char skip_reason.
 *   - score <= 2 → verdict='skip', Haiku generates 15–120-char skip_reason.
 *
 * This trims the API bill to ~2,700 rows instead of 5,520 across all tiers.
 *
 * Usage:
 *   node scripts/generate-verdict-drafts.mjs --tier 5
 *   node scripts/generate-verdict-drafts.mjs --tier 4 --limit 50
 *   node scripts/generate-verdict-drafts.mjs --tier 3 --only-missing
 *
 * Output:
 *   data/enrichment/verdict-tier{N}.json
 *
 * Safety:
 *   - Does NOT write to Supabase. Staging JSON only.
 *   - Audit + commit is scripts/enrich-destination-months-verdict.mjs.
 *   - Incremental write-on-chunk so a mid-run crash preserves partial work.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const BANNED = [
  "hidden gem", "unforgettable", "stunning", "must-visit", "must visit",
  "bucket list", "breathtaking", "magical", "incredible", "authentic",
  "curated", "elevated", "immersive", "paradise", "pristine",
];

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return fallback;
  return args[i + 1]?.startsWith("--") ? true : (args[i + 1] ?? true);
}
const tier = Number(flag("tier"));
const limit = flag("limit") ? Number(flag("limit")) : null;
const onlyMissing = args.includes("--only-missing");
const onlyStaleDays = flag("only-stale") ? Number(flag("only-stale")) : null;
const concurrency = Number(flag("concurrency") ?? 10);
const outFile = flag("out") ?? `data/enrichment/verdict-tier${tier}.json`;

if (![1, 2, 3, 4, 5].includes(tier)) {
  console.error("Usage: generate-verdict-drafts.mjs --tier {1|2|3|4|5} [--limit N] [--only-missing] [--only-stale DAYS]");
  process.exit(1);
}

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

console.log(`\nFetching tier-${tier} destination-months (paginated)…`);
const rows = [];
const pageSize = 1000;
for (let from = 0; ; from += pageSize) {
  const { data, error } = await supabase
    .from("destination_months")
    .select(`
      destination_id, month, score, note, why_go, why_not, go_or_skip_verdict,
      verdict, skip_reason, content_reviewed_at,
      destination:destinations(name, tagline, state_id, elevation_m, tags, difficulty)
    `)
    .eq("score", tier)
    .order("destination_id", { ascending: true })
    .order("month", { ascending: true })
    .range(from, from + pageSize - 1);
  if (error) { console.error(error); process.exit(1); }
  rows.push(...data);
  if (data.length < pageSize) break;
}

let filtered = onlyMissing ? rows.filter((r) => !r.verdict) : rows;
if (onlyStaleDays != null) {
  const cutoff = Date.now() - onlyStaleDays * 24 * 60 * 60 * 1000;
  filtered = filtered.filter((r) => {
    const t = r.content_reviewed_at;
    if (!t) return true;              // null → always stale
    return new Date(t).getTime() < cutoff;
  });
  console.log(`  → --only-stale ${onlyStaleDays} days filter applied`);
}
const batch = limit ? filtered.slice(0, limit) : filtered;

console.log(`  → ${rows.length} rows at score=${tier}, ${batch.length} after filters.\n`);

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildPrompt(row) {
  const d = Array.isArray(row.destination) ? row.destination[0] : row.destination;
  const month = MONTH_NAMES[row.month];
  const intent = row.score === 3 ? "wait" : "skip";
  return `You write the ${intent}-reason one-liner for NakshIQ, an India travel site. The reader is an informed traveller who wants to know WHY — not be told "don't go" with no reason.

DESTINATION: ${d?.name}
STATE: ${d?.state_id}
MONTH: ${month}
MONTHLY SCORE: ${row.score}/5
ELEVATION: ${d?.elevation_m ? `${d.elevation_m}m` : "low/unknown"}
DIFFICULTY: ${d?.difficulty ?? "n/a"}
EXISTING NOTE: ${row.note ?? "(none)"}
WHY GO: ${row.why_go ?? "(none)"}
WHY NOT: ${row.why_not ?? "(none)"}
GO/SKIP VERDICT PROSE: ${row.go_or_skip_verdict ?? "(none)"}

Output ONE concrete reason, 15–120 characters. Not a sentence fragment — a readable clause that tells the traveller the single most important thing to know. Grounded in the data above. No banned words.

BANNED: ${BANNED.join(", ")}

Format: plain text, no quotes, no JSON, no trailing period unless it naturally ends a clause. Just the reason.`;
}

async function generateOne(row) {
  if (row.score >= 4) {
    return {
      destination_id: row.destination_id,
      month: row.month,
      verdict: "go",
      skip_reason: null,
    };
  }
  const verdict = row.score === 3 ? "wait" : "skip";
  try {
    const res = await claude.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 150,
      messages: [{ role: "user", content: buildPrompt(row) }],
    });
    const text = res.content.find((b) => b.type === "text")?.text?.trim() ?? "";
    const cleaned = text.replace(/^["']|["']$/g, "").trim();
    return {
      destination_id: row.destination_id,
      month: row.month,
      verdict,
      skip_reason: cleaned,
    };
  } catch (e) {
    console.error(`  ✗ ${row.destination_id} m=${row.month}: ${e.message}`);
    return null;
  }
}

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
console.log(`Next: node scripts/enrich-destination-months-verdict.mjs ${outFile} --commit\n`);

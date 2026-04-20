#!/usr/bin/env node
/**
 * generate-blog-draft.mjs — produce a grounded markdown draft for the
 * 3 strategic blog formats: month-specific vs, verdict, ranked-data.
 * Output goes to data/blog-drafts/<slug>.md for Ashish review before
 * manual INSERT into the articles table.
 *
 * Usage:
 *   node scripts/generate-blog-draft.mjs --type vs --a gurez-valley --b sonmarg --month may
 *   node scripts/generate-blog-draft.mjs --type verdict --dest bhaderwah
 *   node scripts/generate-blog-draft.mjs --type ranked --state himachal-pradesh --month may
 *
 * Each run:
 *   1. Pulls grounded data from Supabase for the subject(s)
 *   2. Prompts Claude Sonnet for the draft
 *   3. Writes markdown + suggested title/slug/category/callouts to
 *      data/blog-drafts/<slug>.md with YAML front-matter
 *   4. Does NOT insert into DB — that's a manual step after review.
 *
 * Never invents facts. All claims must trace to data we pulled.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return fallback;
  return args[i + 1]?.startsWith("--") ? true : (args[i + 1] ?? true);
}

const type = flag("type");
if (!["vs", "verdict", "ranked"].includes(type)) {
  console.error("Usage: --type vs|verdict|ranked + format-specific flags. See header.");
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
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const claude = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

const MONTH_NUMBER = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};
const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

async function fetchDest(id) {
  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, state_id, elevation_m, difficulty, budget_tier, tags,
      confidence_cards(*), kids_friendly(*), destination_months(*)
    `)
    .eq("id", id).single();
  return data;
}

function pickMonth(dest, monthNum) {
  return (dest?.destination_months ?? []).find((m) => m.month === monthNum);
}

function groundingBlock(dest, monthNum) {
  const mm = pickMonth(dest, monthNum);
  const cc = Array.isArray(dest.confidence_cards) ? dest.confidence_cards[0] : dest.confidence_cards;
  const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
  return JSON.stringify({
    id: dest.id,
    name: dest.name,
    state: dest.state_id,
    elevation_m: dest.elevation_m,
    difficulty: dest.difficulty,
    budget_tier: dest.budget_tier,
    tags: dest.tags,
    month_score: mm?.score,
    month_note: mm?.note,
    why_go: mm?.why_go,
    why_not: mm?.why_not,
    things_to_do: mm?.things_to_do,
    festivals: mm?.festivals_this_month,
    pack_list: mm?.pack_list,
    verdict: mm?.go_or_skip_verdict,
    all_months: (dest.destination_months ?? []).map((m) => ({ month: m.month, score: m.score })),
    confidence: cc,
    kids: kf,
  }, null, 2);
}

let slug, title, category, markdown;

if (type === "vs") {
  const a = flag("a"), b = flag("b"), month = flag("month");
  const monthNum = MONTH_NUMBER[(month ?? "").toLowerCase()];
  if (!a || !b || !monthNum) { console.error("--type vs needs --a <id> --b <id> --month <name>"); process.exit(1); }
  const [destA, destB] = await Promise.all([fetchDest(a), fetchDest(b)]);
  if (!destA || !destB) { console.error("Destination not found"); process.exit(1); }
  slug = `${a}-vs-${b}-in-${month.toLowerCase()}`;
  title = `${destA.name} vs ${destB.name} in ${MONTH_NAMES[monthNum]} — the honest call`;
  category = "comparison";
  const prompt = `Write a blog post titled "${title}". NakshIQ's voice: direct, data-driven, no filler, no adjectives without evidence.

Grounding data for both destinations (use only this; do not invent):
A) ${groundingBlock(destA, monthNum)}
B) ${groundingBlock(destB, monthNum)}

Structure (markdown):
# ${title}
A 50-word lede that gives the verdict in the first sentence.
## The scores, side by side
A small markdown table: metric | ${destA.name} | ${destB.name}. Rows: ${MONTH_NAMES[monthNum]} score, elevation, difficulty, budget tier, kid-rating.
## When ${destA.name} wins
2-3 short paragraphs + 1 bullet list of what A does better, tied to actual data.
## When ${destB.name} wins
Same shape for B.
## The tiebreaker
One short section with a concrete decision rule ("if you're travelling with kids under 8…", "if you've never driven Himalayan roads…").
## Verdict
One bold sentence starting with "Go ${destA.name} if…" and the mirror for B.

HARD RULES:
- Every comparative claim must reference something in the grounding blob. If the data doesn't support a claim, don't make it.
- No generic travel-brochure language. No "breathtaking", "unforgettable", etc.
- Total length: 500–800 words.
- Output ONLY the markdown. No preamble.`;
  const res = await claude.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });
  markdown = res.content.find((b) => b.type === "text")?.text ?? "";
} else if (type === "verdict") {
  const dest = flag("dest");
  if (!dest) { console.error("--type verdict needs --dest <id>"); process.exit(1); }
  const d = await fetchDest(dest);
  if (!d) { console.error("Destination not found"); process.exit(1); }
  const peakMonth = (d.destination_months ?? []).sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0]?.month ?? 5;
  slug = `is-${dest}-worth-visiting`;
  title = `Is ${d.name} worth visiting? The unhyped answer`;
  category = "verdict";
  const prompt = `Write a verdict blog post titled "${title}". NakshIQ voice: direct, evidence-first.

Grounding:
${groundingBlock(d, peakMonth)}

Structure:
# ${title}
## The short answer
A one-paragraph verdict — who should go, who should skip, and when. 60-90 words.
## What it actually is
3-4 short paragraphs explaining the place grounded in tags, elevation, confidence_cards. No PR speak.
## When to go
Table: month | score | one-line note. Derive from all_months + month_note.
## The real risk
One section on the biggest concern from confidence data (roads, altitude, medical, network, etc.).
## If you decide yes
A short "what to pack / plan" bullet list from pack_list + confidence reach.
## Verdict
Bold restatement of the short answer.

HARD RULES:
- Anchor every claim in the grounding blob.
- No filler, no padding, no adjectives without evidence.
- 600–900 words total.
- Output ONLY the markdown.`;
  const res = await claude.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 3500,
    messages: [{ role: "user", content: prompt }],
  });
  markdown = res.content.find((b) => b.type === "text")?.text ?? "";
} else {
  // ranked
  const state = flag("state"), month = flag("month"), topN = Number(flag("n") ?? 7);
  const monthNum = MONTH_NUMBER[(month ?? "").toLowerCase()];
  if (!state || !monthNum) { console.error("--type ranked needs --state <id> --month <name> [--n 7]"); process.exit(1); }
  const { data: destsRaw } = await supabase
    .from("destinations")
    .select(`
      id, name, elevation_m, difficulty, budget_tier, tags,
      destination_months!inner(score, note, why_go, things_to_do, go_or_skip_verdict, month)
    `)
    .eq("state_id", state)
    .eq("destination_months.month", monthNum)
    .eq("destination_months.score", 5)
    .limit(topN);
  if (!destsRaw?.length) { console.error("No tier-5 destinations found for that state/month"); process.exit(1); }
  slug = `best-offbeat-${state}-destinations-${month.toLowerCase()}-${new Date().getFullYear()}`;
  title = `${destsRaw.length} offbeat ${state.replace(/-/g, " ")} destinations scored 5/5 for ${MONTH_NAMES[monthNum]} ${new Date().getFullYear()}`;
  category = "data-story";
  const grounded = destsRaw.map((d) => ({
    id: d.id,
    name: d.name,
    elevation: d.elevation_m,
    difficulty: d.difficulty,
    tags: d.tags,
    note: d.destination_months[0]?.note,
    why_go: d.destination_months[0]?.why_go,
    things_to_do: d.destination_months[0]?.things_to_do,
    verdict: d.destination_months[0]?.go_or_skip_verdict,
  }));
  const prompt = `Write a ranked blog post titled "${title}". NakshIQ voice.

Grounded list of ${destsRaw.length} destinations, all scoring 5/5 this month:
${JSON.stringify(grounded, null, 2)}

Structure:
# ${title}
## Why this list exists
One 60-word paragraph on why score=5 + offbeat matters this month.
## The list
For each destination (in the order given):
### N. ${`{{name}}`}
- One-line stat bar: Elevation · Difficulty
- 2-3 sentence editorial drawing from note + why_go
- 2-3 bullets from things_to_do
- One-line verdict from verdict field
## How we scored these
One short paragraph on the NakshIQ scoring method (month score reflects weather, access, infra, crowds).

HARD RULES:
- Every claim anchored in the data.
- 700–1100 words.
- Output ONLY the markdown.`;
  const res = await claude.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });
  markdown = res.content.find((b) => b.type === "text")?.text ?? "";
}

// ── Write draft with front-matter ─────────────────────────────
const frontMatter = `---
slug: ${slug}
title: ${JSON.stringify(title)}
category: ${category}
generated_at: ${new Date().toISOString()}
review_status: draft
---

`;
const outFile = `data/blog-drafts/${slug}.md`;
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, frontMatter + markdown);
console.log(`\n✓ Draft written → ${outFile}`);
console.log(`Review it, edit inline, then INSERT into articles table with published_at=NOW() to ship.\n`);

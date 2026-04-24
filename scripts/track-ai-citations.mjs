#!/usr/bin/env node
/**
 * track-ai-citations.mjs — weekly AI-citation tracker. Walks the 100-prompt
 * list in data/citation-prompts.json and lets you log whether each AI engine
 * cited NakshIQ. Results write to Supabase `ai_citations` for trend analysis.
 *
 * Per R2 §12 Tier-4 #22, R4 §7.5 — AI-citation tracking is the GEO
 * equivalent of Google Search Console. Without it you can't tell if the
 * Sprint 7 schema work is actually compounding into citations.
 *
 * Engines to cover each week:
 *   - perplexity  (https://www.perplexity.ai/search?q=...)
 *   - chatgpt     (https://chatgpt.com/?hints=search&prompt=...)
 *   - aio         (https://www.google.com/search?udm=50&q=...)  [Google AI Overviews]
 *   - gemini      (https://gemini.google.com/app?q=...)
 *   - claude      (https://claude.ai/new?q=...)
 *   - copilot     (https://www.bing.com/search?q=...) — regular Bing shows inline Copilot AI answer for most queries. Old &showconv=1 flag now redirects to copilot.microsoft.com which rejects URL-param queries, so tracker uses plain search URL.
 *
 * Usage:
 *   node scripts/track-ai-citations.mjs --list                    # print all 100 prompts
 *   node scripts/track-ai-citations.mjs --open btv-spiti-june     # open in browsers for manual check
 *   node scripts/track-ai-citations.mjs --log btv-spiti-june perplexity true "cited /destination/kaza"
 *   node scripts/track-ai-citations.mjs --log btv-spiti-june chatgpt false
 *   node scripts/track-ai-citations.mjs --report                  # last-7-day rollup per engine
 *   node scripts/track-ai-citations.mjs --report --since 30       # last-N-day rollup
 *
 * Suggested weekly cadence: Monday morning, batch 20 prompts × 6 engines =
 * 120 checks in ~1 hour. Over 5 weeks you cover the full 100 × 6.
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { exec } from "child_process";

config({ path: "apps/web/.env.local" });

const ENGINES = ["perplexity", "chatgpt", "aio", "gemini", "claude", "copilot"];

const ENGINE_URL = {
  perplexity: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
  chatgpt:    (q) => `https://chatgpt.com/?hints=search&prompt=${encodeURIComponent(q)}`,
  aio:        (q) => `https://www.google.com/search?udm=50&q=${encodeURIComponent(q)}`,
  gemini:     (q) => `https://gemini.google.com/app?q=${encodeURIComponent(q)}`,
  claude:     (q) => `https://claude.ai/new?q=${encodeURIComponent(q)}`,
  copilot:    (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
};

const args = process.argv.slice(2);
const CMD_LIST = args.includes("--list");
const CMD_REPORT = args.includes("--report");
const CMD_OPEN = args.includes("--open");
const CMD_LOG = args.includes("--log");

const prompts = JSON.parse(readFileSync("data/citation-prompts.json", "utf8")).prompts;
const promptById = new Map(prompts.map((p) => [p.id, p]));

function supa() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}

if (CMD_LIST) {
  console.log(`AI-citation tracker — ${prompts.length} prompts\n`);
  const byCategory = new Map();
  for (const p of prompts) {
    const k = p.category;
    if (!byCategory.has(k)) byCategory.set(k, []);
    byCategory.get(k).push(p);
  }
  for (const [cat, list] of byCategory) {
    console.log(`── ${cat} (${list.length}) ──`);
    for (const p of list) {
      console.log(`  ${p.id.padEnd(28)} ${p.query}`);
    }
    console.log();
  }
  process.exit(0);
}

if (CMD_OPEN) {
  const id = args[args.indexOf("--open") + 1];
  if (!id || !promptById.has(id)) {
    console.error(`✗ unknown prompt id: ${id}`);
    process.exit(1);
  }
  const p = promptById.get(id);
  console.log(`Opening "${p.query}" in ${ENGINES.length} engines...\n`);
  console.log(`Target NakshIQ page: https://www.nakshiq.com${p.target_url}\n`);
  for (const engine of ENGINES) {
    const url = ENGINE_URL[engine](p.query);
    console.log(`  ${engine.padEnd(12)} ${url}`);
    exec(`open "${url}"`);
    await new Promise((r) => setTimeout(r, 400)); // stagger so browser can handle
  }
  console.log(`\nAfter checking each tab, log results with:`);
  console.log(`  node scripts/track-ai-citations.mjs --log ${id} <engine> <true|false> "<optional note>"`);
  process.exit(0);
}

if (CMD_LOG) {
  const logIdx = args.indexOf("--log");
  const id = args[logIdx + 1];
  const engine = args[logIdx + 2];
  const citedRaw = args[logIdx + 3];
  const note = args.slice(logIdx + 4).join(" ").trim() || null;

  if (!id || !engine || !citedRaw) {
    console.error(`✗ usage: --log <prompt-id> <engine> <true|false> ["note"]`);
    process.exit(1);
  }
  if (!ENGINES.includes(engine)) {
    console.error(`✗ engine must be one of: ${ENGINES.join(", ")}`);
    process.exit(1);
  }
  if (!promptById.has(id)) {
    console.error(`✗ unknown prompt id: ${id}`);
    process.exit(1);
  }
  const cited = citedRaw === "true" || citedRaw === "1" || citedRaw === "yes";

  const sb = supa();
  const { error } = await sb.from("ai_citations").insert({
    query_id: id,
    engine,
    cited,
    note,
  });
  if (error) {
    console.error(`✗ insert failed: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ logged ${id} · ${engine} · ${cited ? "CITED" : "not cited"}${note ? ` · "${note}"` : ""}`);
  process.exit(0);
}

if (CMD_REPORT) {
  const sinceIdx = args.indexOf("--since");
  const sinceDays = sinceIdx >= 0 ? Number(args[sinceIdx + 1]) : 7;
  const since = new Date(Date.now() - sinceDays * 86400000).toISOString();

  const sb = supa();
  const { data, error } = await sb
    .from("ai_citations")
    .select("engine, cited, query_id, ran_at")
    .gte("ran_at", since);
  if (error) {
    console.error(`✗ query failed: ${error.message}`);
    process.exit(1);
  }

  const byEngine = new Map();
  for (const r of data ?? []) {
    if (!byEngine.has(r.engine)) byEngine.set(r.engine, { checks: 0, cited: 0 });
    const e = byEngine.get(r.engine);
    e.checks++;
    if (r.cited) e.cited++;
  }

  console.log(`AI-citation rollup — last ${sinceDays} days\n`);
  if (byEngine.size === 0) {
    console.log(`  (no results yet — log via --log first)`);
    process.exit(0);
  }
  console.log(`  engine       checks  cited  rate`);
  console.log(`  ───────────  ──────  ─────  ─────`);
  for (const engine of ENGINES) {
    const e = byEngine.get(engine);
    if (!e) continue;
    const rate = e.checks > 0 ? Math.round((e.cited / e.checks) * 100) : 0;
    console.log(`  ${engine.padEnd(11)}  ${String(e.checks).padStart(6)}  ${String(e.cited).padStart(5)}  ${String(rate).padStart(3)}%`);
  }
  process.exit(0);
}

// Default: help
console.log(`track-ai-citations.mjs — weekly AI-citation tracker (100 prompts × 6 engines)`);
console.log();
console.log(`  --list                       list all 100 prompts grouped by category`);
console.log(`  --open <prompt-id>           open all 6 engines for this prompt in browser tabs`);
console.log(`  --log <id> <engine> <t|f>    log a cited / not-cited result`);
console.log(`  --report [--since N]         show rollup (default last 7 days)`);

#!/usr/bin/env node
/**
 * Guard: no metered AI provider calls in the deployed app.
 *
 * 2026-08-04 — NakshIQ stopped paying for per-token API access. The founder is
 * on the Claude Max plan, so any generation work that used to run as a metered
 * API call from a Vercel route now runs as a scheduled Claude Code agent that
 * writes to Supabase directly. Marginal cost of that path is zero.
 *
 * This guard exists because the failure mode is silent and expensive: an
 * exhausted Anthropic balance took down chat, itinerary and the nightly
 * stay-picks cron for 10+ days while every health signal still read "ok", and
 * nothing alerted. Removing the calls only helps if they stay removed.
 *
 * If you are re-adding a provider call on purpose, add the path to ALLOWLIST
 * with a comment saying who pays for it.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// fileURLToPath, not .pathname — the repo path contains a space, which stays
// percent-encoded in a URL pathname and makes readdirSync ENOENT.
const ROOT = fileURLToPath(new URL("../src", import.meta.url));

// Substrings that mean "this code bills per token at runtime".
const BANNED = [
  "api.anthropic.com",
  "api.openai.com",
  "ANTHROPIC_API_KEY",
  "OPENAI_API_KEY",
];

// Paths permitted to reference a provider, with the reason. Keep this short.
const ALLOWLIST = [
  // Embeddings refresh is invoked manually/monthly and is being migrated to the
  // agent path; it is not reachable from a user request.
  "lib/embed-refresh.ts",
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|js|jsx|mjs)$/.test(entry)) out.push(full);
  }
  return out;
}

const offenders = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (ALLOWLIST.some((a) => rel === a || rel.startsWith(a))) continue;
  const src = readFileSync(file, "utf8");
  for (const needle of BANNED) {
    if (src.includes(needle)) offenders.push({ rel, needle });
  }
}

if (offenders.length > 0) {
  console.error("\n\x1b[31m\x1b[1m✗ Build blocked — metered AI call in the deployed app\x1b[0m\n");
  for (const { rel, needle } of offenders) {
    console.error(`  \x1b[1msrc/${rel}\x1b[0m — references \x1b[1m${needle}\x1b[0m`);
  }
  console.error(
    "\n\x1b[1mWhy:\x1b[0m NakshIQ does not pay per token. Generation belongs in a\n" +
      "scheduled Claude Code agent (Max plan, $0 marginal) writing to Supabase,\n" +
      "not in a Vercel route.\n\n" +
      "\x1b[1mFix:\x1b[0m move the work to an agent, or — if this really must bill —\n" +
      "add the path to ALLOWLIST in apps/web/scripts/check-no-metered-ai.mjs\n" +
      "with a comment naming who pays for it.\n"
  );
  process.exit(1);
}

console.log(`✓ no metered AI calls in apps/web/src (${BANNED.length} patterns checked)`);

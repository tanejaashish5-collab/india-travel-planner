#!/usr/bin/env node
/**
 * supabase-recovery-check.mjs — is the data layer actually better yet?
 *
 * WHY THIS EXISTS (2026-09-20)
 * ----------------------------
 * Supabase ran a platform incident ("401 errors due to JWT rejections",
 * API Gateway degraded_performance) whose own status update said the fix would
 * be rolled out "throughout this weekend". While it was degraded, NakshIQ
 * destination pages whose ISR cache had expired blocked on regeneration and
 * never returned — 3 of 8 sampled. Pages with a live prerender served fine, so
 * the site decays gradually as caches age rather than failing outright.
 *
 * The repo's standing rule is that after any Supabase outage you FORCE a Vercel
 * rebuild, because ISR caches survive the recovery poisoned (that is what cost
 * the landing page in the 2026-05-23 egress freeze). This script is the
 * "is it safe to do that yet" gate.
 *
 * It checks the EFFECT, not just the data layer, because a healthy REST call
 * does not prove a page renders — the repo has a scar for exactly that
 * confusion. Two independent signals must agree:
 *
 *   1. Our own PostgREST endpoint answers a trivial query inside the timeout.
 *   2. Pages that were observed HANGING during the incident now return 200.
 *
 * Exit 0 = healthy. Exit 1 = still degraded. Exit 2 = could not tell (config).
 * Prints one JSON line to stdout so the wrapper can log it verbatim.
 */
import path from "node:path";
import { readFileSync } from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..");
const { config } = await import("dotenv");
// quiet: dotenv otherwise prints a rotating tip banner to STDOUT, which
// corrupts the single JSON line this script is contracted to emit.
config({ path: path.join(ROOT, "apps", "web", ".env.local"), quiet: true });

const SITE = "https://www.nakshiq.com";
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

// Pages observed hanging at 2026-09-20 22:0x while the gateway was degraded.
// They are the canaries: each had an expired ISR cache, so serving them again
// means regeneration can reach the database.
const CANARIES = [
  "/en/destination/kasauli",
  "/en/destination/gandikota",
  "/en/destination/tungnath",
];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.log(JSON.stringify({ healthy: false, reason: "missing NEXT_PUBLIC_SUPABASE_* in apps/web/.env.local" }));
  process.exit(2);
}

const timed = async (fn, ms) => {
  const t0 = Date.now();
  try {
    const v = await fn(AbortSignal.timeout(ms));
    return { ok: true, ms: Date.now() - t0, ...v };
  } catch (e) {
    return { ok: false, ms: Date.now() - t0, error: e.message.slice(0, 80) };
  }
};

// 1. Data layer
const rest = await timed(async (signal) => {
  const r = await fetch(`${url}/rest/v1/destinations?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` }, signal,
  });
  await r.text();
  if (r.status !== 200) throw new Error(`HTTP ${r.status}`);
  return { status: r.status };
}, 20000);

// 2. Effect layer — the canary pages, in parallel so one slow page does not
//    serialise the whole check.
const pages = await Promise.all(CANARIES.map(async (p) => {
  const r = await timed(async (signal) => {
    const res = await fetch(SITE + p, { headers: { "user-agent": UA }, signal });
    await res.text();
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    return { status: res.status, cache: res.headers.get("x-vercel-cache") };
  }, 20000);
  return { page: p, ...r };
}));

const pagesOk = pages.filter((p) => p.ok).length;

// Require BOTH: the database answers, and a clear majority of canaries render.
// One canary passing could just be a fresh cache rather than a working
// regeneration path, which is why it is a majority and not an "any".
const healthy = rest.ok && pagesOk >= 2;

console.log(JSON.stringify({
  healthy,
  at: new Date().toISOString(),
  rest: { ok: rest.ok, ms: rest.ms, ...(rest.error ? { error: rest.error } : {}) },
  canaries: { serving: pagesOk, of: CANARIES.length, detail: pages.map((p) => ({ page: p.page, ok: p.ok, ms: p.ms, cache: p.cache ?? null })) },
}));

process.exit(healthy ? 0 : 1);

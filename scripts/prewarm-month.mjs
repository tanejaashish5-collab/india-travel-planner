#!/usr/bin/env node
/**
 * Pre-warm ISR cache for destination-month pages before search traffic spikes.
 *
 * GSC pattern (2026-04-27): May queries are surging at pos 7-12. June queries
 * will spike around May 1-10 as travelers plan 2-4 weeks ahead. Pre-warming
 * primes Vercel ISR so first Googlebot/user hit serves cached HTML instantly
 * (revalidate=86400 means 24h cache once warmed).
 *
 * Usage:
 *   node scripts/prewarm-month.mjs --month june              # default: june, all 488 dests, both locales
 *   node scripts/prewarm-month.mjs --month july --locale en  # en only
 *   node scripts/prewarm-month.mjs --month june --top 50     # top 50 by June score (>= 4 = recommended)
 *   node scripts/prewarm-month.mjs --month june --dry-run    # print URLs only
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });

const args = process.argv.slice(2);
const argVal = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i >= 0 ? args[i + 1] : d;
};
const argFlag = (k) => args.includes(`--${k}`);

const MONTH = (argVal("month", "june") || "june").toLowerCase();
const LOCALE = argVal("locale", null); // null = both
const TOP = argVal("top", null);
const DRY = argFlag("dry-run");
const CONCURRENCY = Number(argVal("concurrency", "5"));

const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const monthNum = MONTHS.indexOf(MONTH) + 1;
if (monthNum === 0) {
  console.error(`✗ invalid --month: ${MONTH}. Must be lowercase english month name.`);
  process.exit(1);
}

const BASE = "https://www.nakshiq.com";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

console.log(`◇ pre-warming ${MONTH} pages · top=${TOP ?? "all"} · locale=${LOCALE ?? "en+hi"} · concurrency=${CONCURRENCY}\n`);

let dests;
if (TOP) {
  // Score-ranked: top dests by month score (4+ = recommended), most click-worthy first.
  const { data } = await supabase
    .from("destination_months")
    .select("destination_id, score, destinations!inner(id)")
    .eq("month", monthNum)
    .gte("score", 4)
    .order("score", { ascending: false })
    .limit(Number(TOP));
  dests = data?.map(d => d.destination_id) ?? [];
} else {
  // All dests, alphabetical.
  const { data } = await supabase.from("destinations").select("id").order("id");
  dests = data?.map(d => d.id) ?? [];
}

if (!dests.length) {
  console.error("✗ no destinations matched");
  process.exit(1);
}

const locales = LOCALE ? [LOCALE] : ["en", "hi"];
const urls = dests.flatMap(slug =>
  locales.map(loc => `${BASE}/${loc}/destination/${slug}/${MONTH}`)
);

console.log(`◇ ${urls.length} URLs to warm (${dests.length} dests × ${locales.length} locales)\n`);

if (DRY) {
  urls.slice(0, 20).forEach(u => console.log(`  ${u}`));
  if (urls.length > 20) console.log(`  ... and ${urls.length - 20} more`);
  process.exit(0);
}

let ok = 0, fail = 0;
const startedAt = Date.now();

// Parallel batches with concurrency limit.
async function warm(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        // Identify ourselves so logs are clean (matches our middleware bot list = no, intentionally not).
        "user-agent": "NakshIQ-PreWarmer/1.0",
        "accept": "text/html",
      },
      redirect: "follow",
    });
    if (res.ok) ok++;
    else fail++;
    return { url, status: res.status };
  } catch (e) {
    fail++;
    return { url, error: e.message };
  }
}

// Run in batches of CONCURRENCY.
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  const batch = urls.slice(i, i + CONCURRENCY);
  const results = await Promise.all(batch.map(warm));
  const failed = results.filter(r => r.status && r.status >= 400);
  if (failed.length) failed.forEach(r => console.log(`  ✗ ${r.status} ${r.url}`));
  if ((i + CONCURRENCY) % 50 === 0 || i + CONCURRENCY >= urls.length) {
    const done = Math.min(i + CONCURRENCY, urls.length);
    const pct = Math.round((done / urls.length) * 100);
    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
    console.log(`  ◇ ${done}/${urls.length} (${pct}%) · ${elapsed}s · ok=${ok} fail=${fail}`);
  }
}

const totalSec = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`\n${ok}/${urls.length} warmed · ${fail} failed · ${totalSec}s total`);
if (fail > urls.length * 0.1) {
  console.log("⚠ >10% failure rate — check Vercel logs and retry the failed URLs.");
  process.exit(1);
}

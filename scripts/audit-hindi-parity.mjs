#!/usr/bin/env node
/**
 * audit-hindi-parity.mjs — surface Hindi-translation gaps across destinations
 * + articles. Per R1 §3.2 and R2 §3 — Hindi parity is flagged as incomplete;
 * this script measures the actual gap honestly (paginated past the 1000-row
 * Supabase default that silently capped earlier audits).
 *
 * Usage:
 *   node scripts/audit-hindi-parity.mjs              # summary report
 *   node scripts/audit-hindi-parity.mjs --state himachal-pradesh
 *   node scripts/audit-hindi-parity.mjs --export     # write data/hindi-parity-queue.json
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const STATE_FILTER = (() => { const i = args.indexOf("--state"); return i >= 0 ? args[i + 1] : null; })();
const EXPORT = args.includes("--export");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function fetchAllDestinations() {
  const all = [];
  const page = 1000;
  let from = 0;
  while (true) {
    let q = supabase
      .from("destinations")
      .select("id, name, state_id, translations")
      .order("id")
      .range(from, from + page - 1);
    if (STATE_FILTER) q = q.eq("state_id", STATE_FILTER);
    const { data, error } = await q;
    if (error) { console.error(error.message); process.exit(1); }
    all.push(...(data ?? []));
    if (!data || data.length < page) break;
    from += page;
  }
  return all;
}

async function fetchAllArticles() {
  const all = [];
  const page = 1000;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, translations")
      .order("id")
      .range(from, from + page - 1);
    if (error) return []; // table may not have translations column
    all.push(...(data ?? []));
    if (!data || data.length < page) break;
    from += page;
  }
  return all;
}

console.log(`audit-hindi-parity · measuring HI translation gap${STATE_FILTER ? ` · state=${STATE_FILTER}` : ""}\n`);

const dests = await fetchAllDestinations();
const articles = await fetchAllArticles();

// Destinations classification
const destClass = {
  missing_both: [],       // no hi.name AND no hi.tagline
  partial: [],            // has one but not the other
  complete: [],           // both
};

for (const d of dests) {
  const hi = d.translations?.hi ?? {};
  const hasName = typeof hi.name === "string" && hi.name.length > 0;
  const hasTagline = typeof hi.tagline === "string" && hi.tagline.length > 0;
  if (hasName && hasTagline) destClass.complete.push(d);
  else if (hasName || hasTagline) destClass.partial.push(d);
  else destClass.missing_both.push(d);
}

// Article classification
const articleClass = {
  missing_title: [],
  missing_body: [],
  complete: [],
};

for (const a of articles) {
  const hi = a.translations?.hi ?? {};
  const hasTitle = typeof hi.title === "string" && hi.title.length > 0;
  const hasBody  = typeof hi.body  === "string" && hi.body.length > 100;
  if (hasTitle && hasBody) articleClass.complete.push(a);
  else if (!hasTitle) articleClass.missing_title.push(a);
  else if (!hasBody) articleClass.missing_body.push(a);
}

// Report
console.log("═══════════════════════════════════════════════");
console.log("  DESTINATIONS");
console.log("═══════════════════════════════════════════════");
console.log(`  Complete (name + tagline in HI):        ${String(destClass.complete.length).padStart(4)} / ${dests.length}`);
console.log(`  Partial (only name OR only tagline):    ${String(destClass.partial.length).padStart(4)}`);
console.log(`  Missing both:                           ${String(destClass.missing_both.length).padStart(4)}`);
const completePct = Math.round((destClass.complete.length / Math.max(dests.length, 1)) * 100);
console.log(`  Parity rate:                            ${String(completePct).padStart(4)}%`);

if (destClass.missing_both.length > 0) {
  console.log("\n  First 20 destinations missing HI translation:");
  for (const d of destClass.missing_both.slice(0, 20)) {
    console.log(`    ${d.id.padEnd(28)} ${(d.name ?? "").padEnd(30)} [${d.state_id}]`);
  }
  if (destClass.missing_both.length > 20) {
    console.log(`    (+${destClass.missing_both.length - 20} more)`);
  }
}

// Gap by state
const stateGaps = new Map();
for (const d of destClass.missing_both) {
  const s = d.state_id ?? "unknown";
  stateGaps.set(s, (stateGaps.get(s) ?? 0) + 1);
}
const sortedStateGaps = Array.from(stateGaps.entries()).sort((a, b) => b[1] - a[1]);
if (sortedStateGaps.length > 0) {
  console.log("\n  Gap by state (missing HI, count):");
  for (const [state, count] of sortedStateGaps.slice(0, 15)) {
    console.log(`    ${state.padEnd(26)} ${String(count).padStart(3)}`);
  }
}

console.log("\n═══════════════════════════════════════════════");
console.log("  ARTICLES");
console.log("═══════════════════════════════════════════════");
if (articles.length > 0) {
  console.log(`  Total articles:                     ${String(articles.length).padStart(4)}`);
  console.log(`  Complete (HI title + HI body):      ${String(articleClass.complete.length).padStart(4)}`);
  console.log(`  Missing HI title:                   ${String(articleClass.missing_title.length).padStart(4)}`);
  console.log(`  Missing HI body (title ok):         ${String(articleClass.missing_body.length).padStart(4)}`);
  const artPct = Math.round((articleClass.complete.length / Math.max(articles.length, 1)) * 100);
  console.log(`  Article parity rate:                ${String(artPct).padStart(3)}%`);
} else {
  console.log(`  Articles table has no translations column (skipped)`);
}

console.log("\n═══════════════════════════════════════════════");
console.log("  SUMMARY");
console.log("═══════════════════════════════════════════════");
console.log(`  Destination HI parity:   ${completePct}%`);
console.log(`  Rows needing HI fill:    ${destClass.missing_both.length + destClass.partial.length}`);

if (EXPORT) {
  const path = "data/hindi-parity-queue.json";
  writeFileSync(path, JSON.stringify({
    generated_at: new Date().toISOString(),
    counts: {
      dest_total: dests.length,
      dest_complete: destClass.complete.length,
      dest_partial: destClass.partial.length,
      dest_missing: destClass.missing_both.length,
      dest_parity_pct: completePct,
      articles_total: articles.length,
      articles_complete: articleClass.complete.length,
    },
    queue: {
      destinations_missing_both: destClass.missing_both.map((d) => ({ id: d.id, name: d.name, state_id: d.state_id })),
      destinations_partial: destClass.partial.map((d) => ({ id: d.id, name: d.name, state_id: d.state_id })),
    },
  }, null, 2));
  console.log(`\n  → exported to ${path}`);
}

console.log(`\n  Next step: Sprint 11 HI fill (editorial session). Prioritize Tier-1 marquee destinations first.`);

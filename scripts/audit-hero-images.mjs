#!/usr/bin/env node
/**
 * audit-hero-images.mjs — HEAD-probe every R2 hero image and flag missing/broken.
 *
 * Pattern: `${NEXT_PUBLIC_IMAGE_BASE_URL}/destinations/${dest.id}.jpg`
 * (matches apps/web/src/lib/image-url.ts → destinationImage()).
 *
 * Output:
 *   qa/hero-images.json — { ok: [], missing: [], errors: [] }
 *   qa/hero-images.md   — markdown summary
 *
 * Concurrency = 8 (R2 handles HEAD just fine; throttling unnecessary).
 *
 * Usage:
 *   node scripts/audit-hero-images.mjs
 *   node scripts/audit-hero-images.mjs --state himachal-pradesh
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { mkdirSync, writeFileSync } from "fs";

config({ path: "apps/web/.env.local" });

const args = process.argv.slice(2);
const STATE_FILTER = (() => {
  const i = args.indexOf("--state");
  return i >= 0 ? args[i + 1] : null;
})();

const R2 = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "").replace(/\/+$/, "");
if (!R2) {
  console.error("NEXT_PUBLIC_IMAGE_BASE_URL is not set in apps/web/.env.local");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

async function selectAll(table, columns, filterFn) {
  const PAGE = 1000;
  let from = 0;
  const all = [];
  while (true) {
    let q = supabase.from(table).select(columns).range(from, from + PAGE - 1);
    if (filterFn) q = filterFn(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    all.push(...data);
    if (data.length < PAGE) break;
    from += PAGE;
  }
  return all;
}

console.log(`audit-hero-images · R2 = ${R2}\n`);

const dests = await selectAll(
  "destinations",
  "id, name, state_id",
  STATE_FILTER ? (q) => q.eq("state_id", STATE_FILTER) : null
);
console.log(`destinations: ${dests.length}`);

async function probe(dest) {
  const url = `${R2}/destinations/${dest.id}.jpg`;
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "manual" });
    return { ...dest, url, status: res.status, ok: res.status >= 200 && res.status < 400 };
  } catch (err) {
    return { ...dest, url, status: 0, ok: false, error: String(err.message || err) };
  }
}

const CONCURRENCY = 8;
const results = [];
let done = 0;
const queue = [...dests];

async function worker() {
  while (queue.length) {
    const d = queue.shift();
    if (!d) break;
    const r = await probe(d);
    results.push(r);
    done += 1;
    if (done % 50 === 0) console.log(`  probed ${done}/${dests.length}`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

const ok = results.filter((r) => r.ok);
const missing = results.filter((r) => !r.ok && r.status === 404);
const errors = results.filter((r) => !r.ok && r.status !== 404);

console.log(`\nok: ${ok.length}  missing: ${missing.length}  errors: ${errors.length}\n`);

const stamp = new Date().toISOString().slice(0, 10);
mkdirSync("qa", { recursive: true });

const json = {
  generated_at: new Date().toISOString(),
  base_url: R2,
  totals: { ok: ok.length, missing: missing.length, errors: errors.length, total: results.length },
  ok: ok.map((r) => ({ id: r.id, name: r.name, state: r.state_id, url: r.url, status: r.status })),
  missing: missing.map((r) => ({ id: r.id, name: r.name, state: r.state_id, url: r.url })),
  errors: errors.map((r) => ({
    id: r.id,
    name: r.name,
    state: r.state_id,
    url: r.url,
    status: r.status,
    error: r.error,
  })),
};
writeFileSync("qa/hero-images.json", JSON.stringify(json, null, 2));

const lines = [];
lines.push(`# Hero image audit — ${stamp}`);
lines.push("");
lines.push(`Base: \`${R2}\``);
lines.push("");
lines.push(`Totals: ok=**${ok.length}** · missing(404)=**${missing.length}** · errors(other)=**${errors.length}** · total=${results.length}`);
lines.push("");
if (missing.length) {
  lines.push("## Missing (404)");
  lines.push("");
  lines.push("| Dest | State |");
  lines.push("|---|---|");
  for (const r of missing.sort((a, b) => (a.state_id + a.id).localeCompare(b.state_id + b.id))) {
    lines.push(`| ${r.name} (${r.id}) | ${r.state_id} |`);
  }
  lines.push("");
}
if (errors.length) {
  lines.push("## Other errors");
  lines.push("");
  lines.push("| Dest | State | Status | Error |");
  lines.push("|---|---|---:|---|");
  for (const r of errors) lines.push(`| ${r.name} (${r.id}) | ${r.state_id} | ${r.status} | ${r.error || ""} |`);
  lines.push("");
}
writeFileSync("qa/hero-images.md", lines.join("\n") + "\n");

console.log("wrote: qa/hero-images.json");
console.log("wrote: qa/hero-images.md");

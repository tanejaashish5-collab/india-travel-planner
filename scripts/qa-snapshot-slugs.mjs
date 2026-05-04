#!/usr/bin/env node
// Snapshot all destination slugs to apps/web/data/known-destination-slugs.json.
// Used by middleware to short-circuit unknown-slug requests with HTTP 404
// instead of letting them flow into the dynamic route's soft-404 path.
//
// Closes NEW-2026-05-04-004 + NEW-2026-05-04-006 (sticky soft-404s).
//
// Run manually after destination seeds change:
//   node scripts/qa-snapshot-slugs.mjs
// Or wire into a cron alongside existing freshness-drift / data-baseline jobs.

import fs from "node:fs/promises";
import path from "node:path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let slugs = [];
let source = "sitemap/1.xml";

if (SUPABASE_URL && SUPABASE_KEY) {
  source = "supabase rest/destinations";
  const url = `${SUPABASE_URL}/rest/v1/destinations?select=id&order=id`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) {
    console.error(`Supabase fetch failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const rows = await res.json();
  slugs = rows.map((r) => r.id).filter((s) => typeof s === "string" && /^[a-z0-9-]+$/.test(s));
} else {
  console.log("No Supabase env vars — falling back to live sitemap parse.");
  const res = await fetch("https://www.nakshiq.com/sitemap/1.xml");
  const xml = await res.text();
  const set = new Set();
  for (const m of xml.matchAll(/destination\/([a-z0-9-]+)<\/loc>/g)) set.add(m[1]);
  slugs = [...set];
}

const out = path.resolve("apps/web/data/known-destination-slugs.json");
await fs.mkdir(path.dirname(out), { recursive: true });
await fs.writeFile(
  out,
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      source,
      count: slugs.length,
      slugs: slugs.sort(),
    },
    null,
    2,
  ),
);
console.log(`Wrote ${out} with ${slugs.length} slugs (source: ${source}).`);

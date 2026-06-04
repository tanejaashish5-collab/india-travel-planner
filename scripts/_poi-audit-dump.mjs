#!/usr/bin/env node
/* eslint-disable no-console */
// One-off: dump the 2026-06-03 POI backfill cohort (768 rows) and split into N
// whole-destination batch files for refute-mode agent verification.
// Read-only single pass (~0.5MB) — negligible vs egress cap.
//
//   node scripts/_poi-audit-dump.mjs

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const OUT = path.join(ROOT, "data", "research", "backfill", "poi-audit", "chunks");
mkdirSync(OUT, { recursive: true });

const N_CHUNKS = 16;

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data, error } = await s
  .from("points_of_interest")
  .select("id, destination_id, name, type, entry_fee, description")
  .gte("created_at", "2026-06-03")
  .order("destination_id", { ascending: true })
  .order("name", { ascending: true });

if (error) { console.error(`✗ ${error.message}`); process.exit(1); }
console.log(`Fetched ${data.length} POIs`);

// group by destination so a destination is never split across chunks
const byDest = {};
for (const r of data) (byDest[r.destination_id] ??= []).push(r);
const dests = Object.keys(byDest).sort();
console.log(`Across ${dests.length} destinations`);

// greedy balance dests into N chunks by POI count
const chunks = Array.from({ length: N_CHUNKS }, () => ({ dests: [], pois: [], count: 0 }));
const sortedDests = dests.sort((a, b) => byDest[b].length - byDest[a].length);
for (const d of sortedDests) {
  const target = chunks.reduce((m, c) => (c.count < m.count ? c : m), chunks[0]);
  target.dests.push(d);
  target.pois.push(...byDest[d]);
  target.count += byDest[d].length;
}

let total = 0;
chunks.forEach((c, i) => {
  const fn = path.join(OUT, `chunk-${String(i).padStart(2, "0")}.json`);
  writeFileSync(fn, JSON.stringify(c.pois, null, 2));
  total += c.pois.length;
  console.log(`chunk-${String(i).padStart(2, "0")}: ${c.dests.length} dests · ${c.pois.length} POIs`);
});
console.log(`✅ Wrote ${total} POIs into ${N_CHUNKS} chunks at ${OUT}`);

#!/usr/bin/env node
/* eslint-disable no-console */
// Dump the OLDER POI cohorts (created before 2026-06-03 — the pre-backfill set,
// ~831 rows) and split into N whole-destination batches for refute-mode audit.
//   node scripts/_poi-older-dump.mjs
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });
const OUT = path.join(ROOT, "data", "research", "backfill", "poi-audit-older", "chunks");
mkdirSync(OUT, { recursive: true });
const N_CHUNKS = 18;

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
// page through to be safe (>1000 default limit not hit, but explicit range)
const { data, error } = await s
  .from("points_of_interest")
  .select("id, destination_id, name, type, entry_fee, description")
  .lt("created_at", "2026-06-03")
  .order("destination_id", { ascending: true })
  .order("name", { ascending: true })
  .range(0, 1999);
if (error) { console.error(`✗ ${error.message}`); process.exit(1); }
console.log(`Fetched ${data.length} POIs`);

const byDest = {};
for (const r of data) (byDest[r.destination_id] ??= []).push(r);
const dests = Object.keys(byDest);
console.log(`Across ${dests.length} destinations`);

const chunks = Array.from({ length: N_CHUNKS }, () => ({ dests: [], pois: [] }));
const sorted = dests.sort((a, b) => byDest[b].length - byDest[a].length);
for (const d of sorted) {
  const t = chunks.reduce((m, c) => (c.pois.length < m.pois.length ? c : m), chunks[0]);
  t.dests.push(d); t.pois.push(...byDest[d]);
}
let total = 0;
chunks.forEach((c, i) => {
  const fn = path.join(OUT, `chunk-${String(i).padStart(2, "0")}.json`);
  writeFileSync(fn, JSON.stringify(c.pois, null, 2));
  total += c.pois.length;
  console.log(`chunk-${String(i).padStart(2, "0")}: ${c.dests.length} dests · ${c.pois.length} POIs`);
});
console.log(`✅ Wrote ${total} POIs into ${N_CHUNKS} chunks at ${OUT}`);

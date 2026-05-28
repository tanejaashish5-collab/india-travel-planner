#!/usr/bin/env node
/**
 * Dump the destinations that still lack crowd_calendar.peak_months into
 * per-batch input files for the crowd-fill Haiku agents.
 *
 * Output: scripts/_crowd-fill/input-NN.json (BATCH_SIZE dests each) + manifest.json.
 * Each row carries the priors an agent needs to determine tourist-crowd
 * seasonality from knowledge (best/avoid months, region, type, vibe).
 *
 * Run: node scripts/_crowd-fill/dump-input.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

config({ path: "apps/web/.env.local" });
const __dirname = dirname(fileURLToPath(import.meta.url));

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BATCH_SIZE = 16;

const { data, error } = await supabase
  .from("destinations")
  .select("id, name, state_id, region, subregion, type, place_type, best_months, avoid_months, crowd_level, vibe, tags")
  .order("id");
if (error) {
  console.error("query failed:", error.message);
  process.exit(1);
}

const missing = data.filter((d) => {
  const cc = d.crowd_calendar;
  return !cc || typeof cc !== "object" || !Array.isArray(cc.peak_months);
});
// crowd_calendar isn't in the select above (we only need to know it's absent),
// so re-query the ids that already HAVE peak_months and exclude them.
const { data: have } = await supabase
  .from("destinations")
  .select("id, crowd_calendar")
  .not("crowd_calendar", "is", null);
const havePeak = new Set(
  (have ?? [])
    .filter((d) => d.crowd_calendar && Array.isArray(d.crowd_calendar.peak_months))
    .map((d) => d.id),
);
const targets = data.filter((d) => !havePeak.has(d.id));

const batches = [];
for (let i = 0; i < targets.length; i += BATCH_SIZE) {
  batches.push(targets.slice(i, i + BATCH_SIZE));
}

batches.forEach((batch, i) => {
  const n = String(i + 1).padStart(2, "0");
  writeFileSync(
    resolve(__dirname, `input-${n}.json`),
    JSON.stringify(batch, null, 2),
  );
});
writeFileSync(
  resolve(__dirname, "manifest.json"),
  JSON.stringify({ total: targets.length, batches: batches.length, batch_size: BATCH_SIZE }, null, 2),
);

console.log(`Wrote ${batches.length} batch files, ${targets.length} destinations total.`);

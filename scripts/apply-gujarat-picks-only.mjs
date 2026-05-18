#!/usr/bin/env node
/* eslint-disable no-console */
// Picks-only resume — eateries + stays already inserted; picks INSERT failed mid-flight.
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

const ROOT = path.resolve(import.meta.dirname, "..");
config({ path: path.join(ROOT, "apps", "web", ".env.local") });

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data: dests } = await s.from("destinations").select("id").eq("state_id", "gujarat");
const destIds = dests.map((d) => d.id);

const audit = JSON.parse(readFileSync(path.join(ROOT, "data/research/stays-audit/gujarat-replacements-2026-05-18.json"), "utf-8"));

const picks = [];
for (const t of audit.task_a_results ?? []) {
  if (t.verdict === "honest_scarcity" || !t.replacement) continue;
  if (!destIds.includes(t.destination_id)) continue;
  const rep = t.replacement;
  picks.push({
    destination_id: t.destination_id,
    slot: t.slot,
    name: rep.name,
    property_type: rep.tier ?? null,
    price_band: rep.price_band ?? null,
    why_nakshiq: rep.tagline ?? "",
    source: "web_search",
    source_ref: rep.book_url ?? (rep.sources?.[0] ?? null),
    sources: rep.sources ?? null,
    confidence: 0.9,
    refreshed_at: "2026-05-18",
    published: true,
  });
}

console.log(`Picks to insert: ${picks.length}`);
const { count: existCount } = await s.from("destination_stay_picks").select("*", { count: "exact", head: true }).in("destination_id", destIds);
console.log(`Existing picks for Gujarat dests: ${existCount}`);

if (existCount > 0) {
  console.log("Clearing residual picks…");
  const { error } = await s.from("destination_stay_picks").delete().in("destination_id", destIds);
  if (error) { console.error(error); process.exit(1); }
}

for (let i = 0; i < picks.length; i += 50) {
  const chunk = picks.slice(i, i + 50);
  const { error } = await s.from("destination_stay_picks").insert(chunk);
  if (error) { console.error(`INSERT chunk ${i}:`, error); process.exit(1); }
}
console.log(`✓ Inserted ${picks.length} picks`);

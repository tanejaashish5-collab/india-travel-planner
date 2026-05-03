#!/usr/bin/env node
/**
 * Apply confidence-grade route enrichment from the 3 agent-output files.
 * Upserts each route into the routes table — overwrites day_by_day,
 * description, highlights, logistics, budget_range. Idempotent.
 *
 * Run: node --env-file=apps/web/.env.local scripts/apply-route-enrichment.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const FILES = [
  "../data/route-enrichment-2026-05-03-ladakh.json",
  "../data/route-enrichment-2026-05-03-hp.json",
  "../data/route-enrichment-2026-05-03-jk-rj.json",
];

const allRoutes = [];
for (const f of FILES) {
  const content = JSON.parse(readFileSync(resolve(__dirname, f), "utf-8"));
  for (const r of content) allRoutes.push(r);
}

console.log(`Applying ${allRoutes.length} confidence-grade routes…\n`);

let ok = 0, fail = 0;
for (const route of allRoutes) {
  const row = {
    id: route.id,
    name: route.name,
    days: route.days,
    difficulty: route.difficulty,
    best_months: route.best_months ?? [],
    stops: route.stops ?? [],
    description: route.description ?? null,
    kids_suitable: route.kids_suitable ?? false,
    bike_route: route.bike_route ?? false,
    budget_range: route.budget_range ?? null,
    highlights: route.highlights ?? [],
    logistics: route.logistics ?? null,
    day_by_day: route.day_by_day ?? [],
  };

  const { error } = await supabase.from("routes").upsert(row, { onConflict: "id" });
  if (error) {
    fail++;
    console.error(`  ✗ ${route.id}: ${error.message}`);
  } else {
    ok++;
    const totalChars = (route.day_by_day ?? []).reduce((s, d) => s + (d.plan?.length ?? 0), 0);
    console.log(`  ✓ ${route.id} (${route.days} days, ${totalChars.toLocaleString()} chars of plan text)`);
  }
}

console.log(`\nDone. ${ok} ok, ${fail} failed.`);
process.exit(fail > 0 ? 1 : 0);

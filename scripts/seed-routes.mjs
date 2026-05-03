#!/usr/bin/env node
/**
 * Seed the `routes` table from supabase/seed/routes.json.
 *
 * Why: routes.json has rich day_by_day plans, but supabase/seed/seed.ts only
 * seeds destinations.json. Result: every /routes/[id] page renders blank day
 * cards because day_by_day = [] in the DB.
 *
 * Run:
 *   node --env-file=apps/web/.env.local scripts/seed-routes.mjs
 *
 * Idempotent — uses upsert on `id`.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY env vars.");
  console.error('Tip: node --env-file=apps/web/.env.local scripts/seed-routes.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const jsonPath = resolve(__dirname, "../supabase/seed/routes.json");
const routes = JSON.parse(readFileSync(jsonPath, "utf-8"));

console.log(`Seeding ${routes.length} routes…\n`);

let okCount = 0;
let failCount = 0;

for (const route of routes) {
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
    failCount += 1;
    console.error(`  ✗ ${route.id} — ${error.message}`);
  } else {
    okCount += 1;
    const dayCount = (route.day_by_day ?? []).length;
    console.log(`  ✓ ${route.id} (${dayCount} days)`);
  }
}

console.log(`\nDone. ${okCount} ok, ${failCount} failed.`);
process.exit(failCount > 0 ? 1 : 0);

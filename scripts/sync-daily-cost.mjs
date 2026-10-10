#!/usr/bin/env node
/**
 * Regenerate every derived cost field from destination_costs (one cost source): destinations.daily_cost
 * (migrations 091/096) and confidence_cards.sleep.price_range_inr (migration 093).
 *
 *   node --env-file=apps/web/.env.local scripts/sync-daily-cost.mjs          # apply + bust reference caches
 *   DRY=1 node --env-file=apps/web/.env.local scripts/sync-daily-cost.mjs    # roll back, print a sample
 *
 * Run after ANY write to destination_costs. The tier maths lives only in the SQL function cost_day_tiers()
 * (mirrors apps/web/src/lib/trip-cost.ts); the UPDATE statement is read from migration 096 so there is one copy.
 * Afterwards revalidate the destination pages whose costs changed (scripts/verify-touched-pages.mjs --dest ... --revalidate).
 */
import fs from "node:fs";
import { bustReferenceCache } from "./_lib/pg-bulk.mjs";

// The daily_cost UPDATE lives between SYNC-START and SYNC-END in migration 096 (it superseded 091's copy).
const mig = fs.readFileSync("supabase/migrations/096_cost_tiers_pooled_budget_cab_typical_luxury_room.sql", "utf8");
const update = mig.slice(mig.indexOf("-- SYNC-START"), mig.indexOf("-- SYNC-END"))
  .replace("regenerated 2026-10-10", `regenerated ${new Date().toISOString().slice(0, 10)}`);
if (!update.includes("UPDATE destinations d SET")) { console.error("Could not find the daily_cost UPDATE in migration 096."); process.exit(1); }
const m93 = fs.readFileSync("supabase/migrations/093_confidence_sleep_range_from_ledger.sql", "utf8");
const sleepSync = m93.slice(m93.indexOf("-- SYNC-START"), m93.indexOf("-- SYNC-END"));
if (!sleepSync.includes("UPDATE confidence_cards")) { console.error("Could not find the confidence-card UPDATE in migration 093."); process.exit(1); }
const dry = process.env.DRY === "1";
const sample = "SELECT id, daily_cost->'midrange'->>'total' AS mid_total FROM destinations WHERE daily_cost ? 'source' ORDER BY id LIMIT 5";
const sql = `BEGIN;\n${update}\n${sleepSync}\n${sample};\n${dry ? "ROLLBACK" : "COMMIT"};`;

const token = process.env.SUPABASE_ACCESS_TOKEN, url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!token || !url) { console.error("Run with node --env-file=apps/web/.env.local"); process.exit(1); }
const ref = new URL(url).hostname.split(".")[0];
const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ query: sql }),
});
if (!res.ok) { console.error(await res.text()); process.exit(1); }
console.log(dry ? "DRY (rolled back)" : "applied", JSON.stringify(await res.json()));
if (!dry) { await bustReferenceCache(); console.log("reference caches busted"); }

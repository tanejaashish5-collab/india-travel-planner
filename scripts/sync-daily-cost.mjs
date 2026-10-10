#!/usr/bin/env node
/**
 * Regenerate every derived cost field from destination_costs (one cost source): destinations.daily_cost
 * (migration 091) and confidence_cards.sleep.price_range_inr (migration 093).
 *
 *   node --env-file=apps/web/.env.local scripts/sync-daily-cost.mjs          # apply + bust reference caches
 *   DRY=1 node --env-file=apps/web/.env.local scripts/sync-daily-cost.mjs    # roll back, print a sample
 *
 * Run after ANY write to destination_costs. The tier maths lives only in the SQL function cost_day_tiers()
 * (mirrors apps/web/src/lib/trip-cost.ts); the UPDATE statement is read from migration 091 so there is one copy.
 * Afterwards revalidate the destination pages whose costs changed (scripts/verify-touched-pages.mjs --dest ... --revalidate).
 */
import fs from "node:fs";
import { bustReferenceCache } from "./_lib/pg-bulk.mjs";

const mig = fs.readFileSync("supabase/migrations/091_one_cost_source_daily_tiers.sql", "utf8");
const start = mig.indexOf("WITH t AS (\n  SELECT * FROM cost_day_tiers(");
const endMarker = "FROM tier WHERE tier.destination_id = d.id;";
const end = mig.indexOf(endMarker);
if (start < 0 || end < 0) { console.error("Could not find the daily_cost UPDATE in migration 091."); process.exit(1); }
const update = mig.slice(start, end + endMarker.length).replace("regenerated 2026-10-10", `regenerated ${new Date().toISOString().slice(0, 10)}`);
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

#!/usr/bin/env node
/**
 * export-reel-data.mjs — the facts the daily reel formats are allowed to use,
 * written to ONE JSON file the Veo job reads. Read-only.
 *
 *   node --env-file=apps/web/.env.local scripts/export-reel-data.mjs [out.json]
 *
 * WHY DIRECT POSTGRES. destination_costs is 12,693 rows, and the standing rule
 * is that anything over 500 rows goes over port 5432, never the REST API (REST
 * egress caused the 2026-05-23 freeze). The cost summary is also AGGREGATED IN
 * SQL, so what crosses the wire is one row per destination per season rather
 * than the table. The transaction is READ ONLY: this script cannot write.
 *
 * WHAT EACH FORMAT GETS, and the honest limit of each:
 *   treks  -> how_hard. distance_km / max_altitude_m / duration_days /
 *             difficulty / fitness_level. No step counts: the table has none, so
 *             a reel may not claim any.
 *   crowd  -> quiet_month. peak_months / quiet_months are SEASONAL, not hourly.
 *             A quiet month is often quiet because the place is shut, so the
 *             format must intersect it with a good month verdict.
 *   costs  -> real_cost. A mid-range day = hotel-mid (per night) + food per day
 *             + a day's taxi, only where all three exist for that season.
 *   vs     -> which_two. Only pairs that already have a live /vs/ page.
 */
import pg from "pg";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import os from "os";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = process.argv[2] || join(os.homedir(), "Automation", "nakshiq-veo", "data", "reel-data.json");
const url = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;
if (!url) { console.error("[reel-data] no SUPABASE_DB_URL in env"); process.exit(1); }

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
try {
  await client.query("BEGIN READ ONLY");

  const treks = (await client.query(`
    select destination_id, id, name, difficulty, fitness_level,
           distance_km, max_altitude_m, duration_days, kids_suitable, min_age
    from treks
    where distance_km is not null and max_altitude_m is not null
      and duration_days is not null and difficulty is not null
    order by destination_id, distance_km`)).rows;

  const crowd = (await client.query(`
    select id, crowd_calendar
    from destinations
    where crowd_calendar is not null and crowd_calendar::text not in ('{}','null')`)).rows;

  const costs = (await client.query(`
    select destination_id, season, (array_agg(months))[1] as months,
      max(typical_inr) filter (where category = 'hotel-mid')          as hotel_mid,
      max(typical_inr) filter (where category = 'food-per-day')       as food_day,
      max(typical_inr) filter (where category = 'transport-taxi-day') as taxi_day
    from destination_costs
    where category in ('hotel-mid','food-per-day','transport-taxi-day')
      and typical_inr is not null
    group by destination_id, season
    having count(distinct category) = 3`)).rows;

  // Full-year verdicts. The IG verdict pack only spans its Sep-Nov look-ahead,
  // which starved quiet_month and which_two; they need every month. This was
  // first added to the snapshot by hand -- it MUST be here too, or the first
  // successful refresh would silently drop it and both formats would stop.
  const monthRows = (await client.query(`
    select destination_id, month, score, verdict
    from destination_months where score is not null`)).rows;

  await client.query("COMMIT");

  // /vs/ pairs: both files, both orders deduped, exactly as the site builds them.
  const pairs = [];
  const seen = new Set();
  for (const f of ["vs-pairs.ts", "vs-pairs.generated.ts"]) {
    const src = readFileSync(join(REPO, "apps/web/src/lib", f), "utf-8");
    for (const m of src.matchAll(/id1:\s*"([^"]+)",\s*id2:\s*"([^"]+)"/g)) {
      const k = [m[1], m[2]].sort().join("|");
      if (seen.has(k)) continue;
      seen.add(k); pairs.push([m[1], m[2]]);
    }
  }

  const byDest = (rows, key = "destination_id") => rows.reduce((a, r) => {
    (a[r[key]] ||= []).push(r); return a; }, {});

  const doc = {
    generated_at: new Date().toISOString(),
    treks: byDest(treks),
    crowd: Object.fromEntries(crowd.map((r) => [r.id, r.crowd_calendar])),
    costs: byDest(costs),
    vs_pairs: pairs,
    months: monthRows.reduce((a, r) => {
      (a[r.destination_id] ||= {})[String(r.month)] = { score: r.score, label: r.verdict || null };
      return a; }, {}),
  };
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(doc));
  console.log(`[reel-data] treks ${treks.length} (${Object.keys(doc.treks).length} dests) · ` +
              `crowd ${crowd.length} · cost-days ${costs.length} (${Object.keys(doc.costs).length} dests) · ` +
              `vs pairs ${pairs.length} · months ${Object.keys(doc.months).length} dests`);
  console.log(`[reel-data] ${OUT}`);
} catch (e) {
  await client.query("ROLLBACK").catch(() => {});
  console.error("[reel-data] failed:", e.message); process.exitCode = 1;
} finally {
  await client.end();
}

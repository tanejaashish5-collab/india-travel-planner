#!/usr/bin/env node
/**
 * road-coverage.mjs — per-region freshness of the road_updates feed.
 *
 * WHY (2026-10-04): the daily job searched regions in 3 groups and J&K drowned
 * out Ladakh in the same group: in the 14 days to 10-04 J&K had 44 rows,
 * Ladakh 0 and Arunachal 0, in the month the high passes close. Nothing noticed.
 *
 *   stale   → prints the region ids with no row in the last QUIET_DAYS (comma
 *             list, possibly empty). road-updates-daily.sh puts them at the top
 *             of the session prompt so they get a dedicated search first.
 *   report  → writes ops_reports job "road-coverage". alerts_count = Himalayan
 *             regions with nothing for ALARM_DAYS during ALARM_MONTHS, i.e. after
 *             days of priority searching. The watchdog escalates it after 1 day.
 *
 * Usage: node --env-file=apps/web/.env.local scripts/road-coverage.mjs stale|report
 */
import { createClient } from "@supabase/supabase-js";

const REGIONS = ["himachal-pradesh", "ladakh", "jammu-kashmir", "uttarakhand", "sikkim", "arunachal-pradesh", "meghalaya", "rajasthan"];
const HIMALAYAN = new Set(["himachal-pradesh", "ladakh", "jammu-kashmir", "uttarakhand", "sikkim", "arunachal-pradesh"]);
const QUIET_DAYS = 3;
const ALARM_DAYS = 7;
const ALARM_MONTHS = new Set([4, 5, 6, 7, 8, 9, 10, 11]); // passes open/close; Dec–Mar closures are settled news

const mode = process.argv[2];
if (mode !== "stale" && mode !== "report") { console.error("usage: road-coverage.mjs stale|report"); process.exit(2); }
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("FATAL: run with --env-file=apps/web/.env.local"); process.exit(1); }
const s = createClient(url, key, { auth: { persistSession: false } });

const istToday = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
const isoDaysAgo = (n) => new Date(Date.parse(istToday) - n * 86400_000).toISOString().slice(0, 10);

const last = {};
for (const r of REGIONS) {
  const { data, error } = await s.from("road_updates").select("update_date").eq("region_id", r).order("update_date", { ascending: false }).limit(1);
  if (error) { console.error(`FATAL: ${error.message}`); process.exit(1); }
  last[r] = data?.[0]?.update_date ?? null;
}
const quiet = REGIONS.filter((r) => !last[r] || last[r] < isoDaysAgo(QUIET_DAYS));

if (mode === "stale") {
  console.log(quiet.join(","));
  process.exit(0);
}

const inSeason = ALARM_MONTHS.has(Number(istToday.slice(5, 7)));
const alarm = inSeason ? REGIONS.filter((r) => HIMALAYAN.has(r) && (!last[r] || last[r] < isoDaysAgo(ALARM_DAYS))) : [];
const detail = alarm.length
  ? `No dated road update for ${ALARM_DAYS}+ days, after priority searching: ${alarm.map((r) => `${r} (last ${last[r] ?? "never"})`).join(", ")}. Check ~/.claude/road-updates/run-<date>.log for what was searched.`
  : null;
const { error } = await s.from("ops_reports").insert({
  job: "road-coverage",
  summary: { last_update: last, quiet, alarm, in_season: inSeason, detail },
  alerts_count: alarm.length,
  ok: true,
});
if (error) { console.error(`FATAL: ops_reports insert failed: ${error.message}`); process.exit(1); }
console.log(`coverage: quiet=${quiet.join(",") || "none"} alarm=${alarm.join(",") || "none"}`);

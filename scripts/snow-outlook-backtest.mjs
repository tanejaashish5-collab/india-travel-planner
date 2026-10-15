#!/usr/bin/env node
/**
 * snow-outlook-backtest.mjs — would the snow outlook have called the real
 * snow events, and how often does it flag snow nobody reported?
 *
 *   node --env-file=apps/web/.env.local scripts/snow-outlook-backtest.mjs [--start 2026-09-10] [--end 2026-10-16] [--sweep]
 *
 * Replays Open-Meteo's archived runs (previous-runs API: the forecast issued
 * 1, 2 and 3 days before each hour) through the SAME engine the live job uses
 * (scripts/_lib/snow-engine.mjs), then scores against EVENTS: dated, sourced
 * snow reports from road_updates and IMD bulletins.
 *
 * Read the "flags with no report" number for what it is: an upper bound on
 * false alarms. Remote valleys get snow that no paper reports.
 */
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { fetchHourly, dailyByModel, dayVotes, levelFor, SNOW_TEMP_C, VOTE_MM, LIKELY_RATIO, POSSIBLE_RATIO, addDays } from "./_lib/snow-engine.mjs";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
const START = arg("--start", "2026-09-10");
const END = arg("--end", "2026-10-16");
const SWEEP = process.argv.includes("--sweep");
const CACHE = `${process.env.TMPDIR ?? "/tmp"}/snow-backtest-cache`;
mkdirSync(CACHE, { recursive: true });

// Ground truth. Every row is a dated report in road_updates (source in that row)
// or an IMD Shimla bulletin; `dests` = watch points in the affected area.
const EVENTS = [
  // 2026-09-17 Manimahesh route snow dropped: the summit is no longer a watch point (see 114).
  { date: "2026-09-27", what: "North Sikkim roads blocked by snow", dests: ["lachen", "lachung", "yumthang-valley", "gurudongmar-lake"] },
  { date: "2026-10-05", what: "Mana Pass / Deotal closed by heavy snow", dests: ["badrinath", "hemkund-sahib", "valley-of-flowers"] },
  { date: "2026-10-07", what: "Fresh snow at Zojila and Gulmarg belt", dests: ["zoji-la", "gulmarg", "sonamarg", "drass"] },
  { date: "2026-10-07", what: "Sach Pass closed, 5-6 in of snow", dests: ["sach-pass"] },
  { date: "2026-10-09", what: "Sach Pass 8-10 in of snow, Pangi cut off", dests: ["sach-pass"] },
  { date: "2026-10-11", what: "Kunzum, Baralacha La, Shinku La, Rohtang snow", dests: ["kunzum-pass", "baralacha-la", "shinku-la", "rohtang-pass", "chandratal", "keylong", "sissu"] },
  { date: "2026-10-13", what: "Razdan Top 5 in (Gurez road shut)", dests: ["razdan-pass", "gurez-valley"] },
  { date: "2026-10-14", what: "Fresh snow Gulmarg, Zoji La, Peer Ki Gali", dests: ["zoji-la", "peer-ki-gali", "gulmarg", "sonamarg", "drass"] },
  { date: "2026-10-15", what: "First snow Sissu/Keylong (IMD: Gondhla 5 cm, Keylong 3 cm); Batal, Shinkula, Baralacha shut", dests: ["sissu", "keylong", "lahaul-valley", "rohtang-pass", "shinku-la", "baralacha-la", "kunzum-pass"] },
];

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const { data: points, error } = await s.from("snow_watch_points").select("*");
if (error) { console.error(error.message); process.exit(1); }
console.log(`${points.length} watch points, ${START} → ${END}`);

const LEADS = [1, 2, 3];
const hourly = {};
for (const lead of LEADS) {
  const f = `${CACHE}/lead${lead}-${START}-${END}-${points.length}.json`;
  if (existsSync(f)) { hourly[lead] = new Map(Object.entries(JSON.parse(readFileSync(f, "utf8")))); continue; }
  console.log(`fetching lead ${lead}…`);
  hourly[lead] = await fetchHourly(points, { lead, start: START, end: END });
  writeFileSync(f, JSON.stringify(Object.fromEntries(hourly[lead])));
}

// Which models actually have archived runs (the live answer can differ).
const sample = hourly[2].get("sissu") ?? [...hourly[2].values()][0];
console.log("models with archived runs:", Object.keys(sample.models).filter((m) => sample.models[m].p.some((v) => v != null)).join(", "));

const eventDays = new Set();
for (const e of EVENTS) for (const d of e.dests) for (const o of [-1, 0, 1]) eventDays.add(`${d}|${addDays(e.date, o)}`);
const regionEventDays = new Set(); // any event in the same state ±1 day
const stateOf = Object.fromEntries(points.map((p) => [p.id, p.region_id]));
for (const e of EVENTS) for (const d of e.dests) for (const o of [-1, 0, 1]) regionEventDays.add(`${stateOf[d]}|${addDays(e.date, o)}`);

function score(params) {
  const res = {};
  for (const lead of LEADS) {
    const votesBy = {};
    for (const p of points) {
      const series = hourly[lead].get(p.id);
      if (!series) continue;
      votesBy[p.id] = dayVotes(dailyByModel(series, params.snowTemp), params.voteMm);
    }
    // Event detection: any cluster point flagged on event day ±1.
    const ev = EVENTS.map((e) => {
      let best = null;
      for (const d of e.dests) for (const o of [-1, 0, 1]) {
        const day = addDays(e.date, o);
        const lv = levelFor(votesBy[d]?.[day], params.likely, params.possible);
        if (lv === "likely") best = "likely"; else if (lv === "possible" && !best) best = "possible";
      }
      return { ...e, level: best };
    });
    // Flags (likely) on point-days with no report in that STATE within ±1 day.
    let flags = 0, flagsNoReport = 0, flagPoints = new Set();
    for (const [pid, days] of Object.entries(votesBy)) for (const [day, v] of Object.entries(days)) {
      if (day < START || day > END) continue;
      if (levelFor(v, params.likely, params.possible) !== "likely") continue;
      flags++;
      if (!regionEventDays.has(`${stateOf[pid]}|${day}`)) { flagsNoReport++; flagPoints.add(pid); }
    }
    res[lead] = { ev, flags, flagsNoReport, flagPoints: [...flagPoints] };
  }
  return res;
}

const base = { snowTemp: SNOW_TEMP_C, voteMm: VOTE_MM, likely: LIKELY_RATIO, possible: POSSIBLE_RATIO };
const r = score(base);
for (const lead of LEADS) {
  const { ev, flags, flagsNoReport, flagPoints } = r[lead];
  const caught = ev.filter((e) => e.level).length, caughtLikely = ev.filter((e) => e.level === "likely").length;
  console.log(`\n=== forecast issued ${lead} day(s) ahead ===`);
  for (const e of ev) console.log(`  ${e.date}  ${(e.level ?? "MISSED").padEnd(8)}  ${e.what}`);
  console.log(`  events caught: ${caught}/${ev.length} (${caughtLikely} as "likely")`);
  console.log(`  "likely" point-days: ${flags}; with no snow report in that state ±1d: ${flagsNoReport} (${flagPoints.length} points: ${flagPoints.slice(0, 12).join(", ")}${flagPoints.length > 12 ? "…" : ""})`);
}

if (SWEEP) {
  console.log("\n=== sweep (lead 2) : snowTemp voteMm likely -> caught/likely | flags | noReport ===");
  const rows = [];
  for (const snowTemp of [0, 1, 2]) for (const voteMm of [1, 2, 3, 5]) for (const likely of [0.5, 0.66, 0.83]) {
    const x = score({ snowTemp, voteMm, likely, possible: Math.min(0.5, likely) })[2];
    rows.push({ snowTemp, voteMm, likely, caught: x.ev.filter((e) => e.level).length, caughtLikely: x.ev.filter((e) => e.level === "likely").length, flags: x.flags, noReport: x.flagsNoReport });
  }
  for (const x of rows) console.log(`  ${x.snowTemp}°C ${x.voteMm}mm ${x.likely} -> ${x.caught}/${EVENTS.length} | ${x.caughtLikely} likely | ${x.flags} | ${x.noReport}`);
}

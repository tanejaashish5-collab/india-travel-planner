#!/usr/bin/env node
/**
 * snow-outlook.mjs — forward snow forecast for mountain destinations and road
 * passes, cross-checked against IMD, scored afterwards against what happened.
 *
 *   node --env-file=apps/web/.env.local scripts/snow-outlook.mjs run [--dry]
 *   node --env-file=apps/web/.env.local scripts/snow-outlook.mjs verify [--dry]
 *   node --env-file=apps/web/.env.local scripts/snow-outlook.mjs status
 *
 * Runner: LaunchAgent com.nakshiq.snow-outlook -> scripts/snow-outlook-daily.sh
 * (local Mac: IMD's portals answer here; the job needs pdftotext).
 *
 * run
 *   1. six global models (Open-Meteo) per watch point at its TRUE elevation,
 *      precipitation at <= 1 C counted as snow (scripts/_lib/snow-engine.mjs)
 *   2. IMD regional bulletins quoted verbatim (scripts/_lib/imd-bulletins.mjs)
 *   3. one snow_outlooks row per point per IST day; today's rows are replaced
 *      by the later run, earlier days are never touched (the track record)
 *   4. NEW "likely" outlooks -> reel fact pack in nakshiq-autoposter/data/snow_alerts/
 *   5. ops_reports row 'snow-outlook' (+ IMD Shimla's measured snowfall, which
 *      IMD overwrites daily, kept here so verify can use it later)
 *   6. revalidate /road-conditions and the destination pages that changed
 *
 * verify
 *   Windows that ended >= 1 day ago: 'confirmed' only with evidence (a dated
 *   road_updates row naming the place + snow, or IMD measured snowfall at a
 *   station in the same valley). Nothing found 3 days after the window ->
 *   'unconfirmed', never 'miss': a remote pass can snow without a newspaper.
 *
 * Backtest (same engine, archived runs 10 Sep-16 Oct 2026): 6 of 9 dated snow
 * events caught 2 days ahead, 6 of 9 as "likely" 3 days ahead; about half of
 * "likely" flags had no snow report, all at 4,000-5,400 m. See
 * data/audits/snow-outlook-backtest-2026-10-16.md.
 */
import { createClient } from "@supabase/supabase-js";
import { mkdirSync, writeFileSync } from "node:fs";
import { fetchHourly, dailyByModel, dayVotes, outlookFor, istDate, istNowHour, addDays, MODELS, MIN_MODELS } from "./_lib/snow-engine.mjs";
import { readBulletins, imdForPoint } from "./_lib/imd-bulletins.mjs";
import { namesPlace } from "./_lib/snow-districts.mjs";

const [cmd = "run", ...flags] = process.argv.slice(2);
const DRY = flags.includes("--dry");
const SITE = "https://www.nakshiq.com";
const JOB = "snow-outlook";
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const log = (...a) => console.log(`[snow-outlook]`, ...a);

// Words a road-feed row or IMD bulletin uses for each point, beyond its name.
const KEYWORDS = {
  "rohtang-pass": ["Rohtang"], "kunzum-pass": ["Kunzum"], "baralacha-la": ["Baralacha", "Bara-lacha", "Baraglacha"],
  "shinku-la": ["Shinku", "Shinkula"], "sach-pass": ["Sach Pass", "Sachche", "Saach"], "zoji-la": ["Zoji", "Zojila"],
  "razdan-pass": ["Razdan"], "peer-ki-gali": ["Peer Ki Gali", "Pir Ki Gali", "Mughal Road"], "chang-la": ["Chang La", "Changla"],
  "taglang-la": ["Taglang", "Tanglang"], "fotu-la": ["Fotu La", "Fotula"], "sela-pass": ["Sela"],
  "sissu": ["Sissu", "Atal Tunnel North"], "lahaul-valley": ["Lahaul"], "keylong": ["Keylong"], "chandratal": ["Chandratal", "Batal"],
  "spiti-valley": ["Spiti"], "gulmarg": ["Gulmarg", "Affarwat", "Apharwat"], "badrinath": ["Badrinath"],
  "khardung-la": ["Khardung"], "nathu-la": ["Nathu La", "Nathula"], "tsomgo-lake": ["Tsomgo", "Changu"],
  "gurudongmar-lake": ["Gurudongmar"], "yumthang-valley": ["Yumthang"], "gurez-valley": ["Gurez"], "tawang": ["Tawang"],
};
// IMD Shimla stations -> watch points in the same valley (within ~15 km). Only
// these count as IMD-measured confirmation; a district-level match does not.
const IMD_STATIONS = {
  keylong: ["keylong", "lahaul-valley"], gondhla: ["sissu", "keylong", "lahaul-valley"], sissu: ["sissu"],
  udaipur: ["lahaul-valley"], kukumseri: ["lahaul-valley"], kalpa: ["kalpa", "kinnaur"], kaza: ["kaza", "spiti-valley"],
  manali: ["manali"], shimla: ["shimla"], kufri: ["kufri"], dalhousie: ["dalhousie"], sangla: ["sangla"], chitkul: ["chitkul"],
};
const keywordsFor = (p) => [p.name, ...(KEYWORDS[p.id] ?? [])];


async function points() {
  const { data, error } = await s.from("snow_watch_points").select("*");
  if (error) throw new Error(`watch points: ${error.message}`);
  return data;
}

async function lastRunDate(before) {
  const { data } = await s.from("snow_outlooks").select("run_date").lt("run_date", before).order("run_date", { ascending: false }).limit(1);
  return data?.[0]?.run_date ?? null;
}

async function revalidate(paths) {
  if (!process.env.NEWSLETTER_SEND_SECRET || DRY) return;
  for (const path of paths) {
    try {
      const r = await fetch(`${SITE}/api/admin/revalidate?path=${encodeURIComponent(path)}`, { method: "POST", headers: { Authorization: `Bearer ${process.env.NEWSLETTER_SEND_SECRET}` } });
      log("revalidate", path, r.status);
    } catch (e) { log("revalidate failed", path, e.message); }
  }
}

function fmtDay(iso) {
  return new Date(iso + "T00:00:00+05:30").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
}
function windowText(o) {
  return o.window_start === o.window_end ? fmtDay(o.window_start) : `${fmtDay(o.window_start)} to ${fmtDay(o.window_end)}`;
}

// ───────────────────────────── run ─────────────────────────────
async function run() {
  const today = istDate();
  const pts = await points();
  log(`${pts.length} watch points, IST ${today}${DRY ? " (dry)" : ""}`);

  const hourly = await fetchHourly(pts);
  const answered = Object.fromEntries(MODELS.map((m) => [m.id, 0]));
  for (const v of hourly.values()) for (const id of Object.keys(v.models)) if (v.models[id].p.some((x) => x != null)) answered[id]++;
  const usable = Object.values(answered).filter((n) => n >= pts.length * 0.8).length;
  log("models answering:", JSON.stringify(answered));

  const bulletins = await readBulletins(today);
  for (const [r, b] of Object.entries(bulletins)) log(`IMD ${r}: ${b.centre} issued ${b.issued ?? "?"} ${b.error ? "UNAVAILABLE " + b.error : b.fresh ? `fresh, ${b.sentences.length} snow sentence(s)` : "STALE"}`);
  // Hours already gone today are not forecast (review 2026-10-16).
  const fromTs = istNowHour();

  const rows = [];
  for (const p of pts) {
    const series = hourly.get(p.id);
    if (!series) continue;
    const o = outlookFor(dayVotes(dailyByModel(series, undefined, fromTs)), today);
    if (!o) continue;
    const imd = imdForPoint(p, o, bulletins);
    rows.push({
      run_date: today, run_at: new Date().toISOString(),
      point_id: p.id, point_kind: p.kind,
      destination_id: p.kind === "destination" ? p.id : null,
      pass_id: p.kind === "pass" ? p.id : null,
      region_id: p.region_id,
      ...o,
      // Per point: "agrees" only when IMD names this district AND a date in the window.
      // Srinagar's impact bulletin lists only HEAVY warnings (scope), so its silence is weaker evidence.
      imd,
    });
  }
  const likely = rows.filter((r) => r.confidence === "likely");
  log(`${rows.length} outlooks (${likely.length} likely, ${rows.length - likely.length} possible)`);
  for (const r of rows) log(`  ${r.confidence.padEnd(8)} ${r.point_id.padEnd(20)} ${windowText(r).padEnd(26)} ${r.models_agree}/${r.models_total} ${r.snow_cm_low ?? "?"}-${r.snow_cm_high ?? "?"} cm  IMD ${r.imd.status}`);

  // Compare with the previous run day: what is NEW, and which pages changed.
  const prevDate = await lastRunDate(today);
  const { data: prevRows } = prevDate
    ? await s.from("snow_outlooks").select("point_id, confidence, window_start, window_end").eq("run_date", prevDate)
    : { data: [] };
  // window_end MUST be selected: without it the filter below was always false and a place
  // called "likely" at 11:00 IST counted as new again at 15:00 and 17:00 (review 2026-10-16).
  const { data: todaysEarlier } = await s.from("snow_outlooks").select("point_id, confidence, window_end").eq("run_date", today);
  const seenLikely = new Set([...(prevRows ?? []), ...(todaysEarlier ?? [])].filter((r) => r.confidence === "likely" && r.window_end >= today).map((r) => r.point_id));
  const newLikely = likely.filter((r) => !seenLikely.has(r.point_id));
  const before = new Set([...(prevRows ?? []), ...(todaysEarlier ?? [])].filter((r) => r.window_end >= today).map((r) => r.point_id));
  const after = new Set(rows.map((r) => r.point_id));
  // Any destination that shows (or just stopped showing) an outlook needs its cached page refreshed.
  const changedDests = pts.filter((p) => p.kind === "destination" && (before.has(p.id) || after.has(p.id))).map((p) => p.id);

  const ok = usable >= MIN_MODELS;
  const summary = {
    run_date: today, points: pts.length, models_answered: answered, usable_models: usable,
    outlooks: { likely: likely.length, possible: rows.length - likely.length },
    new_likely: newLikely.map((r) => r.point_id),
    imd: Object.fromEntries(Object.entries(bulletins).map(([k, v]) => [k, { centre: v.centre, issued: v.issued, fresh: v.fresh, sentences: v.sentences.length, error: v.error ?? null }])),
    imd_observed: bulletins["himachal-pradesh"]?.observed ?? [],
    imd_observed_issued: bulletins["himachal-pradesh"]?.issued ?? null,
  };

  if (DRY) { log("DRY: no writes"); return { rows, newLikely, ok }; }
  if (!ok) {
    // Fewer than MIN_MODELS models answered for most points: publish nothing rather than a thin forecast.
    await s.from("ops_reports").insert({ job: JOB, summary: { ...summary, note: "too few models answered; no outlooks written" }, alerts_count: 1, ok: false });
    log(`❌ only ${usable} models usable; wrote nothing`);
    process.exitCode = 1;
    return { rows: [], newLikely: [], ok };
  }

  // Replace TODAY's rows (a later run knows more); earlier days are history and stay.
  const { error: delErr } = await s.from("snow_outlooks").delete().eq("run_date", today).eq("outcome", "pending");
  if (delErr) throw new Error(`clear today: ${delErr.message}`);
  if (rows.length) {
    const { error } = await s.from("snow_outlooks").insert(rows);
    if (error) throw new Error(`insert: ${error.message}`);
  }
  await s.from("ops_reports").insert({ job: JOB, summary, alerts_count: newLikely.length, ok: true });

  if (newLikely.length) writeFactPack(today, newLikely, pts);

  const paths = [];
  for (const l of ["en", "hi"]) {
    paths.push(`/${l}/road-conditions`);
    for (const r of new Set(pts.filter((p) => before.has(p.id) || after.has(p.id)).map((p) => p.region_id))) paths.push(`/${l}/road-conditions/${r}`);
    for (const id of changedDests) paths.push(`/${l}/destination/${id}`);
  }
  await revalidate(paths);
  log(`done: ${rows.length} rows, ${newLikely.length} new likely${newLikely.length ? " -> fact pack written" : ""}`);
  // Machine-read by snow-outlook-daily.sh: the LAST line of every successful run.
  console.log(`NEW_LIKELY=${newLikely.length}${newLikely.length ? ` PACK=nakshiq-autoposter/data/snow_alerts/${today}.json` : ""}`);
  return { rows, newLikely, ok };
}

/** Reel-ready, claim-checked facts for each NEW likely outlook. Every sentence is derived from stored numbers. */
function writeFactPack(today, alerts, pts) {
  const byId = Object.fromEntries(pts.map((p) => [p.id, p]));
  // IMD agreement first, then stronger model agreement.
  const ranked = [...alerts].sort((a, b) => (b.imd.status === "agrees") - (a.imd.status === "agrees") || b.models_agree / b.models_total - a.models_agree / a.models_total);
  const items = ranked.map((r) => {
    const p = byId[r.point_id];
    const agreeing = r.model_detail.filter((m) => m.vote).map((m) => m.label);
    const page = r.point_kind === "destination" ? `${SITE}/en/destination/${r.point_id}` : `${SITE}/en/road-conditions/${r.region_id}`;
    const amount = r.snow_cm_low != null ? (r.snow_cm_low === r.snow_cm_high ? `about ${r.snow_cm_low} cm` : `roughly ${r.snow_cm_low}-${r.snow_cm_high} cm`) : null;
    const claims = [
      `${r.models_agree} of ${r.models_total} global forecast models show snow at ${p.name} (${p.elevation_m.toLocaleString("en-IN")} m) on ${windowText(r)}.`,
      amount ? `Their estimates range ${amount} of fresh snow; treat amounts as rough.` : null,
      // Only "agrees" (district named + date in window) may be cited as IMD support.
      r.imd.status === "agrees" && r.imd.quote
        ? `${r.imd.centre} (bulletin of ${r.imd.issued}): "${r.imd.quote}"`
        : null,
      p.road ? `This pass is on the ${p.road} road.` : null,
    ].filter(Boolean);
    return {
      point_id: r.point_id, name: p.name, kind: r.point_kind, region_id: r.region_id, road: p.road ?? null, elevation_m: p.elevation_m,
      window_start: r.window_start, window_end: r.window_end, peak_date: r.peak_date, window_text: windowText(r),
      confidence: r.confidence, models_agree: r.models_agree, models_total: r.models_total, agreeing_models: agreeing,
      snow_cm_low: r.snow_cm_low, snow_cm_high: r.snow_cm_high, imd: r.imd,
      imd_citable: r.imd.status === "agrees", // false -> IMD names neither this district nor these dates: never cite it
      page_url: page, claims,
    };
  });
  const pack = {
    generated_at: new Date().toISOString(), run_date: today, kind: "snow_outlook",
    rules: [
      "Say 'likely', never 'will'. A forecast is not a fact until verify confirms it.",
      "Quote IMD only when imd_citable is true, only from imd.quote, word for word, with its bulletin date.",
      "Amounts are rough model estimates; never state them as measured.",
      "Footage must show the named place; a pass with no footage of its own gets a data card.",
    ],
    method: "Six global models (ECMWF, NOAA GFS, DWD ICON, Canada GEM, UK Met Office, Météo-France) at each place's true elevation; precipitation at or below 1°C counted as snow; 'likely' = at least two-thirds agree. Data: Open-Meteo (CC BY 4.0) and IMD bulletins.",
    alerts: items,
  };
  const dir = new URL("../nakshiq-autoposter/data/snow_alerts/", import.meta.url);
  mkdirSync(dir, { recursive: true });
  const file = new URL(`${today}.json`, dir);
  writeFileSync(file, JSON.stringify(pack, null, 2));
  log(`fact pack: ${file.pathname}`);
}

// ───────────────────────────── verify ─────────────────────────────
async function verify() {
  const today = istDate();
  const { data: pending, error } = await s.from("snow_outlooks").select("*").eq("outcome", "pending").lt("window_end", addDays(today, -1));
  if (error) throw new Error(error.message);
  if (!pending.length) { log("verify: nothing to score"); return; }
  const pts = Object.fromEntries((await points()).map((p) => [p.id, p]));
  const minDay = pending.reduce((m, r) => (r.window_start < m ? r.window_start : m), today);
  const { data: feed } = await s.from("road_updates").select("update_date, region_id, segment, headline, body, source_url, source_label")
    .gte("update_date", addDays(minDay, -1)).or("headline.ilike.%snow%,body.ilike.%snow%");
  const { data: runs } = await s.from("ops_reports").select("run_at, summary").eq("job", JOB).gte("run_at", addDays(minDay, -1));

  let confirmed = 0, unconfirmed = 0, still = 0;
  for (const r of pending) {
    const p = pts[r.point_id] ?? { id: r.point_id, name: r.point_id };
    // Evidence must be ABOUT the window: a row dated before window_start reports earlier snow.
    // hi = window_end + 1 because a report is often filed the morning after.
    const lo = r.window_start, hi = addDays(r.window_end, 1);
    const kws = keywordsFor(p);
    // The Manali-Leh passes get filed under either HP or Ladakh in the feed, so those two regions match each other.
    const sameArea = (f) => f.region_id === r.region_id || ["himachal-pradesh", "ladakh"].every((x) => [f.region_id, r.region_id].includes(x));
    const names = (f) => kws.some((k) => namesPlace(`${f.segment} ${f.headline} ${f.body ?? ""}`, k));
    const hit = (feed ?? []).find((f) => sameArea(f) && f.update_date >= lo && f.update_date <= hi && names(f));
    let evidence = hit ? { note: `${hit.headline} (${hit.source_label}, ${hit.update_date})`, url: hit.source_url } : null;
    if (!evidence) {
      for (const run of runs ?? []) {
        const iss = run.summary?.imd_observed_issued;
        // A bulletin issued on day D measures the 24 h ending 08:30 IST on D, i.e. mostly day D-1:
        // so only bulletins issued window_start+1 .. window_end+1 measure the window.
        if (!iss || iss <= r.window_start || iss > hi) continue;
        const obs = (run.summary?.imd_observed ?? []).find((o) => o.cm > 0 && (IMD_STATIONS[o.station.toLowerCase()] ?? []).includes(r.point_id));
        if (obs) { evidence = { note: `IMD Shimla measured ${obs.cm} cm at ${obs.station} (24 h to 08:30 IST, ${iss})`, url: "https://mausam.imd.gov.in/shimla/mcdata/Weather_Forecast_Bulletin.pdf" }; break; }
      }
    }
    let patch = null;
    if (evidence) { patch = { outcome: "confirmed", outcome_note: evidence.note.slice(0, 300), outcome_source_url: evidence.url }; confirmed++; }
    else if (r.window_end < addDays(today, -3)) { patch = { outcome: "unconfirmed", outcome_note: "No dated report of snow here found in the road feed or IMD measurements. Not proof it stayed dry." }; unconfirmed++; }
    else still++;
    if (patch && !DRY) {
      const { error: e } = await s.from("snow_outlooks").update({ ...patch, outcome_at: new Date().toISOString() }).eq("id", r.id);
      if (e) throw new Error(e.message);
    }
  }
  log(`verify: ${confirmed} confirmed, ${unconfirmed} unconfirmed, ${still} still waiting${DRY ? " (dry)" : ""}`);
  if (!DRY && (confirmed || unconfirmed)) await revalidate(["/en/road-conditions", "/hi/road-conditions"]);
}

async function status() {
  const { data } = await s.from("snow_outlooks").select("run_date, point_id, confidence, window_start, window_end, models_agree, models_total, outcome").order("run_date", { ascending: false }).limit(40);
  console.table(data);
  const { data: rep } = await s.from("ops_reports").select("run_at, ok, alerts_count, summary").eq("job", JOB).order("run_at", { ascending: false }).limit(3);
  for (const r of rep ?? []) console.log(r.run_at, r.ok, JSON.stringify(r.summary).slice(0, 300));
}

const fn = { run, verify, status }[cmd];
if (!fn) { console.error("usage: snow-outlook.mjs run|verify|status [--dry]"); process.exit(2); }
await fn();

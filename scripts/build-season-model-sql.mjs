#!/usr/bin/env node
/**
 * Tariff-based season model for destination_costs (founder go 2026-10-10). Writes one reviewable migration.
 *
 *   node --env-file=apps/web/.env.local scripts/build-season-model-sql.mjs 103
 *   -> supabase/migrations/103_season_model_from_tariffs.sql  + data/cost-research/season-model.json (per place)
 *
 * Why: low = shoulder x 0.65 and peak = shoulder x 1.35 (low/peak 0.48) were never measured, and season months came
 * from a weather template (Manali's June was "low"). Official tariff cards (data/cost-research/queue-2026-10-10/
 * T1-T3.json, 117 properties) print season and off-season rates and their dates:
 *   off-season / season  = 0.61 private / 0.72 govt in the northern hills, 0.72-0.80 Rajasthan/West/Andaman,
 *                          0.85-0.91 Kerala/Tamil Nadu, ~0.95 Goa (GTDC). Manali's own same-hotel probe: 0.67.
 * Model: level peak = 1, low = r, shoulder = (1 + r) / 2, with r by place type below.
 * Months are re-drawn ONLY where a tariff card prints the season dates for that kind of place; everywhere else the
 * existing months stay and only r changes.
 *
 * Re-anchoring keeps every measurement: for each place + seasonal category, the anchor is the month the price was
 * measured in (parsed from the row note: "stay 18 Nov", "viewed Oct 2026"), and its value is the current row for the
 * season that contained that month. Unmeasured (model) rows anchor on their old shoulder row (the model's centre).
 * New season value = anchor value x level(season) / level(season the anchor month falls in under the NEW months).
 * Ranges keep their ratio to typical. Food, taxi and permit rows are not seasonal and only get the new months.
 * hotel-budget is derived from hotel-mid, so rerun build-budget-tier-sql.mjs (101) after this migration.
 */
import fs from "node:fs";

const num = process.argv[2];
if (!num) { console.error("usage: build-season-model-sql.mjs <migration-number>"); process.exit(1); }
const token = process.env.SUPABASE_ACCESS_TOKEN, url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!token || !url) { console.error("Run with node --env-file=apps/web/.env.local"); process.exit(1); }
const ref = new URL(url.trim()).hostname.split(".")[0];
const q = async (query) => {
  const r = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
  if (!r.ok) throw new Error(await r.text()); return r.json();
};

const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const rest = (...used) => ALL.filter((m) => !used.flat().includes(m));
const NORTH = new Set(["himachal-pradesh", "uttarakhand", "jammu-kashmir"]);
const SOUTH = new Set(["tamil-nadu", "karnataka", "andhra-pradesh", "telangana", "puducherry"]);
// T4 (2026-10-10) found no dated season/off-season pairs for the North-East, Odisha, Maharashtra or Karnataka,
// and one stale card for Gujarat (Sasan Gir), so those keep their months.
// Places whose demand is not the hill-town summer: ski resorts and the Char Dham / Hemkund (open May-Nov by temple calendar).
const KEEP_MONTHS = new Set(["gulmarg", "auli", "kedarnath", "badrinath", "gangotri", "yamunotri", "hemkund-sahib", "varkala"]);

// Garhwal Char Dham route towns (T4, 2026-10-10): every dated card peaks May-Jun and is cheapest Jul-Aug
// (Blackberry Auli, Hotel Saidham; Saidham off/peak 0.65). GMVN's own tariff site blocks automated access.
const GARHWAL_YATRA = new Set(["uttarkashi", "guptkashi", "rudraprayag", "joshimath", "devprayag", "karnaprayag", "gopeshwar"]);
function model(d) {
  const st = d.state_id, el = d.elevation_m ?? 0;
  const keep = KEEP_MONTHS.has(d.id);
  if (GARHWAL_YATRA.has(d.id))
    return { type: "garhwal yatra town", r: 0.65, why: "T4 Garhwal cards: peak May-Jun, cheapest Jul-Aug; off/peak 0.65",
      months: { peak: [5, 6], shoulder: [4, 10, 12], low: rest([5, 6], [4, 10, 12]) } };
  if (st === "ladakh" || (NORTH.has(st) && el >= 2600))
    return { type: "high-altitude", r: 0.62, months: null, why: "northern private hill tariffs 0.61; months kept (Jun-Sep peak already)" };
  if (NORTH.has(st) && el >= 1000)
    return keep ? { type: "north hills (kept months)", r: 0.62, months: null, why: "ski / temple-calendar place" }
      : { type: "north hills", r: 0.62, why: "15 private hill-town cards (Manali, Shimla, Mussoorie, Nainital) 0.61, KMVN/HPTDC 0.72; season mid-Apr to Jun/mid-Jul + 20 Dec-5 Jan",
          months: { peak: [5, 6], shoulder: [4, 7, 10, 12], low: rest([5, 6], [4, 7, 10, 12]) } };
  if (st === "rajasthan" && el < 800)
    return { type: "rajasthan", r: 0.75, why: "RTDC + Rajasthan private cards 0.64-0.80; higher rate Oct-Mar",
      months: { peak: [11, 12, 1, 2], shoulder: [10, 3], low: rest([11, 12, 1, 2], [10, 3]) } };
  if (st === "kerala")
    return keep ? { type: "kerala (kept months)", r: 0.85, months: null, why: "Varkala's card prints a Jan-Apr season" }
      : { type: "kerala", r: 0.85, why: "KTDC + Munnar/Kumarakom/Poovar cards 0.67-0.93; season Oct-Mar, off Apr-Sep",
          months: { peak: [11, 12, 1, 2], shoulder: [10, 3], low: rest([11, 12, 1, 2], [10, 3]) } };
  if (st === "tamil-nadu" && el >= 1400)
    return { type: "tamil nadu hills", r: 0.85, why: "Kodaikanal cards 0.60-0.92; season 10 Apr-15 Jun + 20 Dec-15 Jan",
      months: { peak: [4, 5], shoulder: [6, 12], low: rest([4, 5], [6, 12]) } };
  if (st === "andaman-nicobar")
    return { type: "andaman", r: 0.75, why: "ANIIDCO card: season Oct-Apr, off May-Sep",
      months: { peak: [11, 12, 1, 2], shoulder: [10, 3, 4], low: rest([11, 12, 1, 2], [10, 3, 4]) } };
  if (st === "goa") return { type: "goa", r: 0.95, months: null, why: "GTDC: no off-season discount, peak +4-8%" };
  if (SOUTH.has(st)) return { type: "south (kept months)", r: 0.85, months: null, why: "South tariff median 0.85; no card dates for this kind of place" };
  return { type: "other (kept months)", r: 0.75, months: null, why: "all-India tariff median (117 cards); no regional card with both rates" };
}

const MON = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
// Returns { m, fromShoulder } : the month the price was measured in, and whether the loader stored it in the
// shoulder row regardless of month (the West pass 082 and undated listings, before season anchoring existed).
function anchorOf(note) {
  const n = note ?? "";
  // A row this script already re-anchored says where the measured value now sits: use the LAST such note,
  // so re-running the model is idempotent (the value is no longer in the shoulder row it was loaded into).
  const done = [...n.matchAll(/Season model \d+ \([^)]*\): anchored on the measured (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) price, a (peak|shoulder|low) month/g)].pop();
  if (done) return { m: MON[done[1].toLowerCase()], baseSeason: done[2] };
  let m = n.match(/stay (?:\d{1,2} )?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/) || n.match(/viewed (Oct|Nov|Sep) 2026/)
    || n.match(/\d{1,2}-\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) 20\d\d stay/);
  if (m) return { m: MON[m[1].toLowerCase()], fromShoulder: false };
  if (/Shoulder = median of (listed prices|few listings)|stay date not stated, treated as shoulder|peak x1\.35 \(measured\), low x0\.65 \(model\)/.test(n)) return { m: 10, fromShoulder: true };
  return null;
}
const SEASONAL = new Set(["hotel-mid", "homestay", "hostel-dorm", "hotel-splurge", "activity-sample", "transport-intercity"]);
const STEP = (cat) => (cat === "hostel-dorm" ? 10 : 50);
const round = (v, s) => Math.max(s, Math.round(v / s) * s);

const dests = await q("select id, state_id, elevation_m from destinations where id in (select distinct destination_id from destination_costs)");
const rows = await q("select id, destination_id d, category c, season s, months, typical_inr t, range_low_inr lo, range_high_inr hi, source_ref src, notes from destination_costs where category <> 'hotel-budget'");
const by = {};
for (const r of rows) ((by[r.d] ??= {})[r.c] ??= {})[r.s] = r;

const out = [], plan = {}, stats = { places: 0, monthsChanged: 0, rows: 0, anchored: { observed: 0, model: 0 }, types: {} };
for (const d of dests) {
  const M = model(d);
  stats.places++; stats.types[M.type] = (stats.types[M.type] ?? 0) + 1;
  const cats = by[d.id] ?? {};
  const oldMonths = cats["hotel-mid"] ?? cats["food-per-day"] ?? Object.values(cats)[0];
  const newMonths = M.months ?? Object.fromEntries(["peak", "shoulder", "low"].map((s) => [s, oldMonths?.[s]?.months ?? []]));
  if (M.months) stats.monthsChanged++;
  plan[d.id] = { type: M.type, r: M.r, months: newMonths, why: M.why };
  const lvl = { peak: 1, shoulder: (1 + M.r) / 2, low: M.r };
  const seasonIn = (months, m) => Object.entries(months).find(([, ms]) => (ms ?? []).includes(m))?.[0];
  for (const [cat, seas] of Object.entries(cats)) {
    if (!seas.peak || !seas.shoulder || !seas.low) continue;
    const setMonths = (s) => (M.months ? `months = ARRAY[${newMonths[s].join(",")}]::int[], ` : "");
    if (!SEASONAL.has(cat)) {
      if (M.months) for (const s of ["peak", "shoulder", "low"]) { out.push(`UPDATE destination_costs SET ${setMonths(s).replace(/, $/, "")} WHERE id = '${seas[s].id}';`); stats.rows++; }
      continue;
    }
    const obs = Object.values(seas).some((r) => /^observed/.test(r.src));
    const an = obs ? anchorOf(seas.peak.notes ?? seas.shoulder.notes) : null;
    const am = an?.m ?? null;
    const oldS = an ? (an.baseSeason ?? (an.fromShoulder ? "shoulder" : Object.entries(seas).find(([, r]) => (r.months ?? []).includes(am))?.[0])) : null;
    let A, V, base;
    if (am && oldS) { A = seasonIn(newMonths, am) ?? "shoulder"; base = seas[oldS]; V = base.t; stats.anchored.observed++; }
    else { A = "shoulder"; base = seas.shoulder; V = base.t; stats.anchored.model++; }
    const loR = base.lo != null ? base.lo / base.t : null, hiR = base.hi != null ? base.hi / base.t : null;
    for (const s of ["peak", "shoulder", "low"]) {
      const t = round(V * lvl[s] / lvl[A], STEP(cat));
      const lo = loR != null ? round(t * loR, STEP(cat)) : null;
      const hi = hiR != null ? Math.max(t, round(t * hiR, STEP(cat))) : null;
      const why = `Season model 103 (${M.type}, low/peak ${M.r}): ${am && oldS ? `anchored on the measured ${["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][am]} price, a ${A} month under the tariff calendar` : "model row, centred on its old shoulder value"}.`;
      out.push(`UPDATE destination_costs SET ${setMonths(s)}typical_inr = ${t}, range_low_inr = ${lo ?? "NULL"}, range_high_inr = ${hi ?? "NULL"}, notes = left(COALESCE(notes, ''), 600) || ' | ' || ${`'${why.replace(/'/g, "''")}'`}, recorded_at = now() WHERE id = '${seas[s].id}';`);
      stats.rows++;
    }
  }
}
fs.writeFileSync("data/cost-research/season-model.json", JSON.stringify(plan, null, 1));
const sql = `-- ${num}: tariff-based season model (generated by scripts/build-season-model-sql.mjs, 2026-10-10; see its header).
-- Stats: ${JSON.stringify(stats)}
-- Backup: backups.destination_costs_20261010_pre_season_model. After applying: rerun 101 (hotel-budget), then
-- scripts/sync-daily-cost.mjs, scripts/export-reel-data.mjs, scripts/reel-fact-pack.mjs, revalidate cost pages.
BEGIN;
CREATE SCHEMA IF NOT EXISTS backups;
CREATE TABLE IF NOT EXISTS backups.destination_costs_20261010_pre_season_model AS SELECT * FROM destination_costs;
${out.join("\n")}
COMMIT;
`;
const file = `supabase/migrations/${num}_season_model_from_tariffs.sql`;
fs.writeFileSync(file, sql);
console.log(file, JSON.stringify(stats));

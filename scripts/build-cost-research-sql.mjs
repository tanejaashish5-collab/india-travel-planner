#!/usr/bin/env node
/**
 * Turn validated cost research (data/cost-research/<region>/B*.json) into one reviewable SQL migration.
 *
 *   node scripts/build-cost-research-sql.mjs north 081   # writes supabase/migrations/081_cost_research_north.sql
 *
 * Load rules (anything that fails a rule keeps its current modelled row):
 *   stay      hotel-mid needs n>=3, homestay/dorm n>=2, plus a source URL. Shoulder = median (x1.12 GST est. for
 *             rooms unless the basis says the price is tax-inclusive); peak = shoulder x1.35 (measured);
 *             low = shoulder x0.65 (model ratio, unmeasured). hotel-splurge is not researched and is untouched.
 *   no_lodging with a nearest_base -> stay rows (mid/splurge/homestay/dorm) are deleted.
 *   taxi      local day rate with a source URL and a basis that is not a proxy/default/template. Union and operator
 *             day rates do not vary by season, so all three seasons get the same value.
 *   food      budget + standard with a source URL and a non-proxy basis: typical = standard, range_low = budget,
 *             range_high keeps its old ratio to typical. Same value in all seasons.
 * Ranges for stay and taxi keep their old ratio to typical. Every written row is tagged
 * source_ref='observed_research_2026_10' with a note naming the batch, n and confidence.
 */
import fs from "node:fs";
import path from "node:path";

const [region, num] = process.argv.slice(2);
if (!region || !num) { console.error("usage: build-cost-research-sql.mjs <region> <migration-number>"); process.exit(1); }
const dir = path.join("data/cost-research", region);
const files = fs.readdirSync(dir).filter((f) => /^B\d+\.json$/.test(f)).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
const auditPath = path.join(dir, "_audit.json");
const audit = fs.existsSync(auditPath) ? JSON.parse(fs.readFileSync(auditPath, "utf8")) : { taxi: {}, food: {}, food_unaudited: "load" };
const scope = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(dir, "_scope.json"), "utf8")).map((d) => [d.id, d]));

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const hasUrl = (a) => Array.isArray(a) && a.some((u) => typeof u === "string" && /^https?:\/\//.test(u));
// A basis that borrows another place's or a region's figure is a proxy, not an observation of this place.
const PROXY = /proxy|regional default|template|estimate|assumed|stand-in|same basis as|specific rate|-region|regional|no city-specific|national operator/i;
// Stay borrowed from a nearby base town ("AGRA city medians", "VARANASI city figures used") is not this place's market.
// (A per-tier "proxy" note, e.g. on the budget-hotel figure we don't load, must NOT disqualify the whole stay.)
// Case-sensitive on purpose: the agents write the borrowed town in capitals ("Figures are KALPA").
const STAY_PROXY = /[Cc]ity figures used|[Cc]ity medians|[Ff]igures are (the )?[A-Z]{4,}\b|used as the base|nearest town with data|stand-in for/;
const round = (v, step) => Math.max(step, Math.round(v / step) * step);
const SEASONS = ["shoulder", "peak", "low"];

const out = [];
const stats = { stay: 0, nolodging: 0, taxi: 0, food: 0, skipped: [] };

function setRow(dest, cat, season, typical, step, note, rangeLowAbs = null) {
  const lowExpr = rangeLowAbs != null
    ? `${round(rangeLowAbs, step)}`
    : `GREATEST(round(range_low_inr::numeric*${typical}/NULLIF(typical_inr,0)/${step})*${step}, ${step})::int`;
  out.push(
    `UPDATE destination_costs SET range_low_inr = ${lowExpr}, ` +
    `range_high_inr = GREATEST(round(range_high_inr::numeric*${typical}/NULLIF(typical_inr,0)/${step})*${step}, ${typical})::int, ` +
    `typical_inr = ${typical}, source_ref = 'observed_research_2026_10', notes = ${q(note)}, recorded_at = now() ` +
    `WHERE destination_id = ${q(dest)} AND category = ${q(cat)} AND season = ${q(season)};`,
  );
}

for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  out.push(`\n-- ${j.batch} (${f})`);
  for (const [id, d] of Object.entries(j.destinations ?? {})) {
    const conf = d.confidence ?? "low";
    const cd = d.confidence_detail ?? {};
    const tag = `Research ${j.batch} ${j.researched_on ?? "2026-10"}; confidence ${conf}`;
    const s = d.stay;
    if (s && !scope[id]?.stay_observed) {
      if (s.no_lodging && s.nearest_base) {
        out.push(`DELETE FROM destination_costs WHERE destination_id = ${q(id)} AND category IN ('hotel-mid','hotel-splurge','homestay','hostel-dorm'); -- no lodging, base: ${String(s.nearest_base).replace(/\n/g, " ")}`);
        stats.nolodging++;
      } else if (!s.no_lodging && STAY_PROXY.test(`${s.price_basis ?? ""} ${s.notes ?? ""}`)) {
        stats.skipped.push(`${id} stay (borrowed from a base town)`);
      } else if (!s.no_lodging) {
        // Only treat the stay as tax-inclusive when the basis says so and never mentions pre-tax prices
        // (mixed bases like "MID: Cleartrip pre-tax ... BUDGET: Kayak tax-incl" get the GST estimate).
        const basis = s.price_basis ?? "";
        const taxIncl = /tax[- ]?incl|incl\.? tax|inclusive/i.test(basis) && !/pre-tax|before tax/i.test(basis);
        const gst = taxIncl ? 1 : 1.12;
        for (const [cat, v, n, src, minN, mult] of [
          ["hotel-mid", s.mid_median_inr, s.mid_n, s.mid_sources, 3, gst],
          ["homestay", s.homestay_median_inr, s.homestay_n, s.homestay_sources, 2, gst],
          ["hostel-dorm", s.dorm_median_inr, s.dorm_n, s.dorm_sources, 2, 1],
        ]) {
          if (v == null) continue;
          if ((n ?? 0) < minN || !hasUrl(src)) { stats.skipped.push(`${id} ${cat} (n=${n ?? 0})`); continue; }
          const step = cat === "hostel-dorm" ? 10 : 50;
          const sh = round(v * mult, step);
          const note = `${tag}. Median of ${n} listings${mult > 1 ? " x1.12 GST est." : ""}; peak x1.35 (measured), low x0.65 (model).`;
          setRow(id, cat, "shoulder", sh, step, note);
          setRow(id, cat, "peak", round(sh * 1.35, step), step, note);
          setRow(id, cat, "low", round(sh * 0.65, step), step, note);
          stats.stay++;
        }
      }
    }
    const t = d.taxi_day;
    if (t?.local_sightseeing_8h_inr != null) {
      // The estimator charges this per day of the trip. A figure above ₹7,000 is a long-distance return
      // fare (e.g. Leh-Pangong union fare), not a local day; keep the modelled row instead.
      if (t.local_sightseeing_8h_inr > 7000) stats.skipped.push(`${id} taxi (${t.local_sightseeing_8h_inr} is a long-distance fare, not a local day)`);
      else if (!["KEEP", "CORRECT"].includes(audit.taxi?.[id]?.verdict)) stats.skipped.push(`${id} taxi (audit: ${audit.taxi?.[id]?.verdict ?? "not audited"})`);
      else if (hasUrl(t.sources) && t.basis && !PROXY.test(t.basis) && cd.taxi !== "proxy" || audit.taxi[id].verdict === "CORRECT") {
        const v = round(audit.taxi[id].value ?? t.local_sightseeing_8h_inr, 50);
        const note = `${tag}. Local day: ${audit.taxi[id].note ?? String(t.basis).slice(0, 160)}. Audit ${audit.taxi[id].verdict}. Not season-adjusted.`;
        for (const se of SEASONS) setRow(id, "transport-taxi-day", se, v, 50, note);
        stats.taxi++;
      } else stats.skipped.push(`${id} taxi (${PROXY.test(t.basis ?? "") ? "proxy" : "no source/basis"})`);
    }
    const fd = d.food_per_person_day;
    const fa = audit.food?.[id];
    if (fa && !["KEEP", "CORRECT"].includes(fa.verdict)) stats.skipped.push(`${id} food (audit: ${fa.verdict})`);
    else if (!fa && audit.food_unaudited === "skip" && fd?.standard_inr != null) stats.skipped.push(`${id} food (not audited)`);
    // Audit sample: every food failure rested on price-band sites ($ glyphs, no rupees) or a borrowed range.
    else if (!fa && audit.food_unaudited === "load_unless_weak" && /restaurant guru|restaurant-guru|price band|\$\$|tripadvisor shows|numbeo .*proxy/i.test(`${fd?.basis ?? ""} ${(fd?.sources ?? []).join(" ")}`)) stats.skipped.push(`${id} food (price-band source)`);
    else if (fd?.standard_inr != null && fd?.budget_inr != null) {
      if (fa?.verdict === "CORRECT") { fd.budget_inr = fa.budget ?? fd.budget_inr; fd.standard_inr = fa.standard ?? fd.standard_inr; }
      if (hasUrl(fd.sources) && fd.basis && !PROXY.test(fd.basis) && cd.food !== "proxy") {
        const note = `${tag}. Per person, 3 meals: budget ${fd.budget_inr}, standard ${fd.standard_inr}. ${String(fd.basis).slice(0, 140)}`;
        for (const se of SEASONS) setRow(id, "food-per-day", se, round(fd.standard_inr, 10), 10, note, fd.budget_inr);
        stats.food++;
      } else stats.skipped.push(`${id} food (${PROXY.test(fd.basis ?? "") ? "proxy" : "no source/basis"})`);
    } else if (fd) stats.skipped.push(`${id} food (incomplete)`);
  }
}

const header = `-- ${num}: load observed cost research for ${region} (${files.join(", ")}).
-- Generated by scripts/build-cost-research-sql.mjs on ${new Date().toISOString().slice(0, 10)}. Apply AFTER 080.
-- Stay categories written: ${stats.stay}; no-lodging deletes: ${stats.nolodging}; taxi destinations: ${stats.taxi}; food destinations: ${stats.food}.
-- Skipped (kept modelled): ${stats.skipped.length}.
-- Backup: backups.destination_costs_20261009.
BEGIN;`;
const file = `supabase/migrations/${num}_cost_research_${region}.sql`;
fs.writeFileSync(file, `${header}\n${out.join("\n")}\n\nCOMMIT;\n`);
console.log(file, JSON.stringify({ ...stats, skipped: stats.skipped.length }));
console.log("skipped:", stats.skipped.join("; "));

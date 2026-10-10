#!/usr/bin/env node
/**
 * Turn validated cost research (data/cost-research/<region>/B*.json) into one reviewable SQL migration.
 *
 *   node scripts/build-cost-research-sql.mjs north 081   # writes supabase/migrations/081_cost_research_north.sql
 *
 * Load rules (anything that fails a rule keeps its current modelled row):
 *   stay      hotel-mid needs n>=3, homestay/dorm n>=2, plus a source URL. Value = median (x1.12 GST est. for
 *             rooms unless the basis says the price is tax-inclusive), ANCHORED TO THE SEASON OF ITS STAY DATE:
 *             the tier's first dated month in price_basis ("13 Nov", "Oct 11") is looked up in that destination's
 *             season months (read live from destination_costs). That season gets the observed value; the others
 *             follow the model ratios peak = shoulder x1.35 (measured, Dec vs Oct-Nov), low = shoulder x0.65
 *             (unmeasured). Undated -> anchored to October 2026, when the listing was viewed. A low-season
 *             observation is HELD (not loaded):
 *             scaling it up by 1/0.65 would publish an unmeasured peak; measure peak directly instead.
 *             (Why: until 2026-10-09 every observation was loaded as shoulder, but Oct-Nov is PEAK for the plains,
 *             coast and Goa, which overstated those places by 35% in every season.)
 *             hotel-splurge is not researched and is untouched.
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
import { loadDiwaliPremium } from "./_lib/diwali-premium.mjs";

const [region, num, label] = process.argv.slice(2);
if (!region || !num) { console.error("usage: build-cost-research-sql.mjs <region> <migration-number> [label]"); process.exit(1); }
const dir = path.join("data/cost-research", region);
const files = fs.readdirSync(dir).filter((f) => /^B\d+\.json$/.test(f)).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
const auditPath = path.join(dir, "_audit.json");
const audit = fs.existsSync(auditPath) ? JSON.parse(fs.readFileSync(auditPath, "utf8")) : { taxi: {}, food: {}, food_unaudited: "load" };
const excludePath = path.join(dir, "_exclude.json");
const exclude = fs.existsSync(excludePath) ? JSON.parse(fs.readFileSync(excludePath, "utf8")) : { stay: {} };
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
const RATIO = { peak: 1.35, shoulder: 1, low: 0.65 };
const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Season months per destination+category, read live (the months arrays are the site's own season definition).
async function loadSeasonMonths() {
  const token = process.env.SUPABASE_ACCESS_TOKEN, url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!token || !url) { console.error("Need SUPABASE_ACCESS_TOKEN + NEXT_PUBLIC_SUPABASE_URL (run with node --env-file=apps/web/.env.local) to read season months."); process.exit(1); }
  const ref = new URL(url).hostname.split(".")[0];
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: "select destination_id d, category c, season s, months m from destination_costs where category in ('hotel-mid','homestay','hostel-dorm')" }),
  });
  if (!res.ok) { console.error(await res.text()); process.exit(1); }
  const map = {};
  for (const r of await res.json()) ((map[r.d] ??= {})[r.c] ??= {})[r.s] = r.m;
  return map;
}
const seasonMonths = await loadSeasonMonths();
const seasonOf = (dest, cat, mon) => Object.entries(seasonMonths[dest]?.[cat] ?? {}).find(([, ms]) => (ms ?? []).includes(mon))?.[0] ?? null;

// First DATED month in a tier's own segment of price_basis ("Mid: Cleartrip ... 13 Nov 2026 ..."), else in the whole basis.
// Needs a day number or year next to the month, so "Junagadh", "Marine" or the verb "may" never read as months.
const MON = "(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
const DATE = new RegExp(`\\b\\d{1,2}(?:\\s*[-–]\\s*\\d{1,2})?\\s+${MON}\\b|\\b${MON}\\s+\\d{1,2}\\b|\\b${MON}\\s+20\\d\\d\\b`, "i");
const MN = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const SEG = {
  "hotel-mid": /\b(?:mid|3-star|three-star)[^:]{0,20}:([\s\S]*?)(?=\b(?:budget|homestay|dorm|hostel)[^:]{0,20}:|$)/i,
  homestay: /\bhomestay[^:]{0,20}:([\s\S]*?)(?=\b(?:budget|mid|dorm|hostel)[^:]{0,20}:|$)/i,
  "hostel-dorm": /\b(?:dorm|hostel)[^:]{0,20}:([\s\S]*?)(?=\b(?:budget|mid|homestay)[^:]{0,20}:|$)/i,
};
// Returns { mon, day } for the tier's first dated stay ("13 Nov", "13-14 Nov", "Nov 13"); day may be null ("Nov 2026").
function obsDate(basis, cat) {
  const b = basis ?? "";
  const pick = (t) => {
    const x = t.match(DATE); if (!x) return null;
    const tok = x[1] || x[2] || x[3]; const day = x[0].match(/\d{1,2}/)?.[0];
    return { mon: MN[tok.slice(0, 3).toLowerCase()], day: x[3] ? null : (day ? Number(day) : null) };
  };
  const seg = b.match(SEG[cat]);
  return (seg && pick(seg[1])) || pick(b);
}

// Diwali 2026: Lakshmi Puja Sun 8 Nov, Gujarati New Year Tue 10 Nov (Drik Panchang). Stays priced for 7-15 Nov 2026
// are holiday-week prices; deflate them by the measured same-hotel premium (rules in scripts/_lib/diwali-premium.mjs).
// With no measurement file present, such stays are held instead of loaded.
const diwali = loadDiwaliPremium();
const diwaliRatio = (dest) => diwali.ratioFor(dest, scope[dest]?.state);

const out = [];
const stats = { stay: 0, nolodging: 0, taxi: 0, food: 0, anchors: {}, held: [], skipped: [] };

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
          if (exclude.stay?.[id]?.[cat]) { stats.skipped.push(`${id} ${cat} (excluded: ${exclude.stay[id][cat]})`); continue; }
          if ((n ?? 0) < minN || !hasUrl(src)) { stats.skipped.push(`${id} ${cat} (n=${n ?? 0})`); continue; }
          const step = cat === "hostel-dorm" ? 10 : 50;
          // No stay date on the listing: it was viewed in October 2026 and such pages default to near-term dates.
          const od = obsDate(basis, cat) ?? { mon: 10, day: null, undated: true };
          const mon = od?.mon ?? null;
          const anchor = mon ? seasonOf(id, cat, mon) : null;
          // Region _exclude.json may widen the window (East: Chhath runs to 16 Nov) and hold, rather than deflate by the
          // all-India median, a holiday-week price where no town in the state was measured.
          const hw = exclude.holiday ?? { from: 7, to: 15 };
          const inDiwali = od?.mon === 11 && od.day != null && od.day >= hw.from && od.day <= hw.to;
          if (inDiwali && !diwali) { stats.skipped.push(`${id} ${cat} (Diwali-week stay date; premium not measured yet)`); continue; }
          // The premium was measured on 3-star hotels: dorm beds are never deflated by it (095, 2026-10-10).
          const dInfo = inDiwali && cat !== "hostel-dorm" ? diwaliRatio(id) : null; const dRatio = dInfo?.ratio ?? 1;
          if (dInfo && hw.unmeasured === "hold" && /^overall/.test(dInfo.basis)) { stats.skipped.push(`${id} ${cat} (held: holiday-week stay date, no measured premium in this state)`); stats.held.push(`${id}/${cat}`); continue; }
          if (anchor === "low") { stats.skipped.push(`${id} ${cat} (held: ${MONTH_NAMES[mon]} is low season here; peak unmeasured)`); stats.held.push(`${id}/${cat}`); continue; }
          const forced = exclude.anchor?.[id]?.[cat];
          const A = forced ?? anchor ?? "shoulder";
          let observed = v * mult / dRatio;
          // A measured ordinary-night median for the same tier and season is a second observation: combine (geometric mean).
          const decIsPeak = (seasonMonths[id]?.[cat]?.peak ?? []).includes(12);
          const nn = cat === "hotel-mid" && diwali ? diwali.normalNight(id, decIsPeak) : null;
          const nnSeason = nn ? (decIsPeak ? "peak" : seasonOf(id, cat, 11)) : null;
          // Different seasons are put on a shoulder-equivalent basis with the same model ratios before combining.
          const pooled = !!(nn && nnSeason && RATIO[nnSeason]);
          if (pooled) observed = Math.sqrt((observed / RATIO[A]) * (nn.inr * 1.12 / RATIO[nnSeason])) * RATIO[A];
          const vals = Object.fromEntries(SEASONS.map((se) => [se, se === A ? round(observed, step) : round(observed / RATIO[A] * RATIO[se], step)]));
          const dated = (od.undated ? `listing undated, viewed Oct 2026, a ${A} month here` : `stay ${od.day ? od.day + " " : ""}${MONTH_NAMES[mon]}, a ${A} month here`) + (dInfo ? `; Diwali-week price / ${dRatio.toFixed(2)} (same-hotel premium: ${dInfo.basis})` : inDiwali ? "; dorm bed, not deflated (premium measured on 3-star hotels)" : "");
          const derived = SEASONS.filter((se) => se !== A).join(" and ");
          const pooledNote = pooled ? ` Combined (geometric mean, shoulder-equivalent) with the ${nn.town} ordinary-night median of ${nn.n} hotels on ${nn.date} (a ${nnSeason} night), ${Math.round(nn.inr)} pre-tax.` : "";
          const forcedNote = forced ? ` Anchored to ${forced}: ${exclude.anchorWhy?.[id] ?? "see _exclude.json"}.` : "";
          const note = `${tag}. Median of ${n} listings${mult > 1 ? " x1.12 GST est." : ""} (${dated}).${pooledNote}${forcedNote} ${derived} by model ratio (peak = shoulder x1.35 measured, low = shoulder x0.65 unmeasured).`;
          if (pooled) stats.pooled = (stats.pooled ?? 0) + 1;
          for (const se of SEASONS) setRow(id, cat, se, vals[se], step, note);
          stats.anchors[A] = (stats.anchors[A] ?? 0) + 1;
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
    // The typical value is the standard tier: if the audit could not verify it, nothing loads.
    else if (fa?.verdict === "CORRECT" && "standard" in fa && fa.standard == null) stats.skipped.push(`${id} food (audit kept budget only)`);
    else if (!fa && audit.food_unaudited === "skip" && fd?.standard_inr != null) stats.skipped.push(`${id} food (not audited)`);
    // Audit sample: every food failure rested on price-band sites ($ glyphs, no rupees) or a borrowed range.
    else if (!fa && audit.food_unaudited === "load_unless_weak" && /restaurant guru|restaurant-guru|price band|\$\$|tripadvisor shows|numbeo .*proxy/i.test(`${fd?.basis ?? ""} ${(fd?.sources ?? []).join(" ")}`)) stats.skipped.push(`${id} food (price-band source)`);
    else if (fd?.standard_inr != null && (fd?.budget_inr != null || fa)) {
      // An audit CORRECT may drop the budget tier (budget: null): keep the verified standard, range_low keeps its ratio.
      if (fa?.verdict === "CORRECT") { if ("budget" in fa) fd.budget_inr = fa.budget; if (fa.standard != null) fd.standard_inr = fa.standard; }
      if (hasUrl(fd.sources) && fd.basis && !PROXY.test(fd.basis) && cd.food !== "proxy") {
        const note = `${tag}. Per person, 3 meals: budget ${fd.budget_inr}, standard ${fd.standard_inr}. ${String(fd.basis).slice(0, 140)}`;
        for (const se of SEASONS) setRow(id, "food-per-day", se, round(fd.standard_inr, 10), 10, note, fd.budget_inr ?? null);
        stats.food++;
      } else stats.skipped.push(`${id} food (${PROXY.test(fd.basis ?? "") ? "proxy" : "no source/basis"})`);
    } else if (fd) stats.skipped.push(`${id} food (incomplete)`);
  }
}

const header = `-- ${num}: load observed cost research for ${region} (${files.join(", ")}).
-- Generated by scripts/build-cost-research-sql.mjs on ${new Date().toISOString().slice(0, 10)}. Apply AFTER 080.
-- Stay categories written: ${stats.stay} (anchored to the season of the stay date: ${JSON.stringify(stats.anchors)}); held as low-season: ${stats.held.length}; no-lodging deletes: ${stats.nolodging}; taxi destinations: ${stats.taxi}; food destinations: ${stats.food}.
-- Skipped (kept modelled): ${stats.skipped.length}.
-- Backup: backups.destination_costs_20261009.
BEGIN;`;
const file = `supabase/migrations/${num}_cost_research_${region}${label ? `_${label}` : ""}.sql`;
fs.writeFileSync(file, `${header}\n${out.join("\n")}\n\nCOMMIT;\n`);
console.log(file, JSON.stringify({ ...stats, held: stats.held.length, skipped: stats.skipped.length }));
console.log("held (low-season observations):", stats.held.join(" "));
console.log("skipped:", stats.skipped.join("; "));

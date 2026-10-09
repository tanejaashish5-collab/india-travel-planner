/**
 * Diwali-week hotel premium, measured 2026-10-09 (data/cost-research/2026-10-09-diwali-week-premium-*.json).
 *
 * Lakshmi Puja is Sun 8 Nov 2026 and Gujarati New Year Tue 10 Nov (Drik Panchang), so 3-star listings priced for
 * 7-15 Nov 2026 are holiday-week prices. The measurement priced the same hotels, same weekday, on Thu 12 Nov,
 * Thu 26 Nov and Thu 3 Dec 2026.
 *
 * Ratio used for a destination (always >= 1, so nothing is ever deflated below what was measured on a normal night):
 *   1. the destination's own city, if measured with >= 3 pairs;
 *   2. else its state, if the state's measured cities agree (city ratios within 0.30 of each other) and have >= 5 pairs;
 *   3. else the median of the measured towns in the same region file (west / north), when the state belongs to one;
 *   4. else the overall median.
 * Each city's ratio is the SMALLER of its median vs 26 Nov and vs 3 Dec: both are ordinary peak-season nights, and
 * the smaller one avoids over-deflating where one comparison night was itself unusual (Udaipur's late-November
 * weddings, Mount Abu's early-December dip).
 *
 * normalNight(): the measured towns' ordinary-night 3-star median (pre-tax) is a second, direct observation of the
 * same tier. Loaders combine it with the deflated research median (geometric mean) for hotel-mid. Why: the research
 * lists were priced on Diwali-week dates, when cheaper hotels sell out first, so the hotels still listed skew dear;
 * a same-hotel ratio cannot remove that (cross-check 2026-10-09: research above ordinary-night median in 17 of 25
 * towns, median 1.24x). Comparison night: 3 Dec where December is peak, else 26 Nov.
 */
// Town names in the measurement files that differ from destination ids.
const ALIAS = { "sasan-gir": ["sasangir", "gir-national-park"], bhuj: ["kutch"], "statue-of-unity-kevadia-ekta-nagar": ["statue-of-unity"], "ranthambore-sawai-madhopur": ["ranthambore"], "dwarka-or-somnath": ["dwarka"] };
// Both comparison nights fell in an unusual week (agent notes), so the ordinary-night level is not used.
const NORMAL_NIGHT_UNRELIABLE = { lucknow: "26 Nov and 3 Dec are both wedding season (measurement note)" };
import fs from "node:fs";
import path from "node:path";

const DIR = "data/cost-research";
const slug = (s) => String(s ?? "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const normState = (x) => slug(x).replace(/-pradesh$/, "");
const median = (a) => { const s = a.filter((x) => Number.isFinite(x)).sort((x, y) => x - y); const n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : null; };

export function loadDiwaliPremium() {
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => /^2026-10-09-diwali-week-premium-.*\.json$/.test(f)) : [];
  if (!files.length) return null;
  const cities = [];
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
    const group = f.match(/premium-([a-z]+)/)?.[1] ?? "other";
    for (const [name, c] of Object.entries(j.cities ?? {})) {
      const pairs = (c.pairs ?? []).filter((p) => p.diwali_inr > 0);
      const rN = median(pairs.map((p) => (p.nov26_inr ? p.diwali_inr / p.nov26_inr : NaN)));
      const rD = median(pairs.map((p) => (p.dec3_inr ? p.diwali_inr / p.dec3_inr : NaN)));
      const ratio = Math.max(1, Math.min(rN ?? Infinity, rD ?? Infinity));
      if (!Number.isFinite(ratio) || pairs.length < 3) continue;
      const priced = (k) => median(pairs.map((p) => (p[k] > 0 ? p[k] : NaN)));
      cities.push({ name, slug: slug(name), state: normState(c.state), group, n: pairs.length, ratio, rN, rD, dec3: priced("dec3_inr"), nov26: priced("nov26_inr"), nDec3: pairs.filter((p) => p.dec3_inr > 0).length, nNov26: pairs.filter((p) => p.nov26_inr > 0).length });
    }
  }
  const overall = median(cities.map((c) => c.ratio));
  const groupOfState = {}; const groupRatio = {};
  for (const c of cities) groupOfState[c.state] = c.group;
  for (const g of new Set(cities.map((c) => c.group))) groupRatio[g] = median(cities.filter((c) => c.group === g).map((c) => c.ratio));
  const byState = {};
  for (const c of cities) (byState[c.state] ??= []).push(c);
  const stateRatio = {};
  for (const [st, cs] of Object.entries(byState)) {
    const rs = cs.map((c) => c.ratio); const n = cs.reduce((s, c) => s + c.n, 0);
    if (n >= 5 && Math.max(...rs) - Math.min(...rs) <= 0.3) stateRatio[st] = median(rs);
  }
  const cityOf = (destId) => cities.find((c) => destId === c.slug || destId.startsWith(c.slug + "-") || (ALIAS[c.slug] ?? []).includes(destId));
  return {
    files, cities, overall, stateRatio, groupRatio, cityOf,
    /** Ordinary-night 3-star median (pre-tax) for a measured town, or null. decIsPeak picks 3 Dec vs 26 Nov. */
    normalNight(destId, decIsPeak) {
      const c = cityOf(destId); if (!c || NORMAL_NIGHT_UNRELIABLE[c.slug]) return null;
      const [inr, n, date] = decIsPeak ? [c.dec3, c.nDec3, "3 Dec 2026"] : [c.nov26, c.nNov26, "26 Nov 2026"];
      return inr && n >= 3 ? { inr, n, date, town: c.name } : null;
    },
    /** @returns {{ratio:number, basis:string}} */
    ratioFor(destId, state) {
      const city = cityOf(destId);
      if (city) return { ratio: city.ratio, basis: `${city.name} measured (${city.n} hotels)` };
      const st = normState(state);
      if (stateRatio[st] != null) return { ratio: stateRatio[st], basis: `${st} measured towns agree` };
      const g = groupOfState[st];
      if (g && groupRatio[g] != null) return { ratio: Math.max(1, groupRatio[g]), basis: `median of measured ${g} towns` };
      return { ratio: Math.max(1, overall ?? 1), basis: "overall median of measured towns" };
    },
  };
}

#!/usr/bin/env node
/**
 * Generate the stay-row correction for rows still tagged by 080 (observed_listings_2026_10 and
 * calibrated_model_2026_10): season anchoring + Diwali-week deflation + season-for-season model factors.
 *
 *   node --env-file=apps/web/.env.local scripts/build-stay-anchor-correction.mjs 086
 *
 * Inputs: the 33 observed medians in supabase/migrations/080_calibrate_stay_costs_2026_10.sql (Cleartrip/Kayak/
 * Booking for a 12-13 Nov 2026 stay; dorms are undated Hostelworld "from" prices), the pre-080 backup
 * (backups.destination_costs_20261009), live season months, and the measured Diwali-week premium
 * (scripts/_lib/diwali-premium.mjs). Supersedes 084: everything is computed from the backup, so it is idempotent.
 *
 * Rules
 *   observed value = median x1.12 GST est. (dorm as listed); 3-star and homestay are divided by the Diwali premium.
 *   It anchors the season that contains November for that destination. Peak anchor: peak = observed, shoulder =
 *   peak / the row's model peak shape, low by the model low shape. Shoulder anchor: as 080 (shoulder = observed).
 *   Low anchor: unchanged (held until a peak price is measured).
 *   Model factor (calibrated rows, peak-November places only) = 1 / median over the peak-November observed places of
 *   (model value for November's season / observed), per category; splurge uses the 3-star factor.
 */
import fs from "node:fs";
import { loadDiwaliPremium } from "./_lib/diwali-premium.mjs";

const num = process.argv[2];
if (!num) { console.error("usage: build-stay-anchor-correction.mjs <migration-number>"); process.exit(1); }
const token = process.env.SUPABASE_ACCESS_TOKEN, url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ref = new URL(url).hostname.split(".")[0];
async function q(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ query }),
  });
  if (!res.ok) { console.error(await res.text()); process.exit(1); }
  return res.json();
}
const median = (a) => { const s = a.filter((x) => Number.isFinite(x)).sort((x, y) => x - y); const n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : null; };

const src = fs.readFileSync("supabase/migrations/080_calibrate_stay_costs_2026_10.sql", "utf8");
const line = src.split("\n").find((l) => l.startsWith("('jaipur',"));
const obs = [...line.matchAll(/\('([a-z0-9-]+)',(\d+|NULL),(\d+|NULL),(\d+|NULL)\)/g)].map((m) => ({ d: m[1], mid: +m[2] || null, home: +m[3] || null, dorm: +m[4] || null }));
if (obs.length !== 33) { console.error(`expected 33 observed places, parsed ${obs.length}`); process.exit(1); }

const diwali = loadDiwaliPremium();
if (!diwali) { console.error("No Diwali premium file in data/cost-research; measure it first."); process.exit(1); }
const meta = Object.fromEntries((await q("select id, state_id from destinations")).map((r) => [r.id, r.state_id]));
const months = {};
for (const r of await q("select destination_id d, category c, season s, months m from destination_costs where category in ('hotel-mid','homestay','hostel-dorm')")) ((months[r.d] ??= {})[r.c] ??= {})[r.s] = r.m;
const backup = {};
for (const r of await q("select destination_id d, category c, season s, typical_inr t from backups.destination_costs_20261009 where category in ('hotel-mid','homestay','hostel-dorm')")) ((backup[r.d] ??= {})[r.c] ??= {})[r.s] = r.t;
const seasonOfNov = (d, c) => Object.entries(months[d]?.[c] ?? {}).find(([, ms]) => (ms ?? []).includes(11))?.[0];

// Model shape relative to shoulder, as 080 used it (peak shape scaled 1.45 -> 1.35; Goa keeps its own).
const shape = (d, c, season) => {
  const b = backup[d]?.[c]; if (!b?.shoulder) return null;
  if (season === "shoulder") return 1;
  if (season === "peak") return meta[d] === "goa" ? b.peak / b.shoulder : (b.peak / b.shoulder) * (1.35 / 1.45);
  return b.low / b.shoulder;
};

const rows = []; const ratios = { "hotel-mid": [], homestay: [], "hostel-dorm": [] }; const report = [];
for (const o of obs) {
  const dr = diwali.ratioFor(o.d, meta[o.d]);
  for (const [c, v, gst, deflate] of [["hotel-mid", o.mid, 1.12, true], ["homestay", o.home, 1.12, true], ["hostel-dorm", o.dorm, 1, false]]) {
    if (v == null) continue;
    const se = seasonOfNov(o.d, c); let val = (v * gst) / (deflate ? dr.ratio : 1);
    // Measured ordinary-night 3-star median in the same season: second observation, combined by geometric mean.
    const decIsPeak = (months[o.d]?.[c]?.peak ?? []).includes(12);
    const nn = c === "hotel-mid" ? diwali.normalNight(o.d, decIsPeak) : null;
    const R = { peak: 1.35, shoulder: 1, low: 0.65 }; const nnSe = decIsPeak ? "peak" : se;
    if (nn && R[se] && R[nnSe]) val = Math.sqrt((val / R[se]) * (nn.inr * 1.12 / R[nnSe])) * R[se];
    report.push({ d: o.d, c, season: se, raw: v, observed: Math.round(val), ratio: deflate ? +dr.ratio.toFixed(3) : 1 });
    if (se === "peak") {
      const sh = val / shape(o.d, c, "peak");
      rows.push({ d: o.d, c, obs_v: Math.round(val), shoulder: sh, dr: deflate ? dr : null });
      const modelNov = backup[o.d]?.[c]?.peak; if (modelNov && meta[o.d] !== "goa") ratios[c].push(modelNov * (1.35 / 1.45) / val);
    } else if (se === "shoulder") {
      rows.push({ d: o.d, c, obs_v: Math.round(val), shoulder: val, dr: deflate ? dr : null });
    }
  }
}
// Season-for-season factor: model shoulder should equal observed shoulder-equivalent. For a peak-November place the
// observed price is a peak price, so compare it with the model's peak (in 080's 1.35 shape).
const factor = Object.fromEntries(Object.entries(ratios).map(([c, a]) => [c, +(1 / median(a)).toFixed(3)]));
factor["hotel-splurge"] = factor["hotel-mid"];

const values = rows.map((r) => `('${r.d}','${r.c}',${r.shoulder.toFixed(2)},${r.obs_v},${r.dr ? r.dr.ratio.toFixed(3) : 1})`).join(",\n");
const sql = `-- ${num}: stay rows still tagged by 080, corrected for season anchoring AND Diwali-week prices (2026-10-09).
-- Generated by scripts/build-stay-anchor-correction.mjs on ${new Date().toISOString().slice(0, 10)}. Supersedes 084; idempotent (from backup).
--
-- Why: 080's 33 observed medians were priced for a 12-13 Nov 2026 stay. November is PEAK for most plains, coast and
-- Goa places (080 treated it as shoulder: ~35% high), and 12-13 Nov is Diwali holiday week (Lakshmi Puja 8 Nov 2026),
-- so 3-star and homestay prices are divided by the measured same-hotel Diwali premium (${diwali.files.join(", ")}).
-- Observed rows: the season containing November gets the observed value; the others follow the model shape.
-- Low-November places (Ladakh, Kaza, Gulmarg...) are left as they are until a peak price is measured.
-- Calibrated rows where November is peak: shoulder = model shoulder x factor, peak/low keep 080's shape.
-- Factors (season for season, Diwali-deflated, ${ratios["hotel-mid"].length} peak-November places): ${JSON.stringify(factor)}.
-- Rollback: UPDATE ... FROM backups.destination_costs_20261009 b WHERE id = b.id (restores pre-080).

BEGIN;

WITH obs(d, cat, shoulder, obs_v, diwali_ratio) AS (VALUES
${values}
),
base AS (
  SELECT c.id, c.destination_id d, c.category cat, c.season, c.source_ref,
    b.typical_inr t, b.range_low_inr lo, b.range_high_inr hi,
    max(b.typical_inr) FILTER (WHERE b.season = 'shoulder') OVER w AS sh,
    bool_or(c.season = 'peak' AND 11 = ANY(c.months)) OVER w AS nov_peak,
    (dest.state_id = 'goa') goa
  FROM destination_costs c
  JOIN backups.destination_costs_20261009 b ON b.id = c.id
  JOIN destinations dest ON dest.id = c.destination_id
  WHERE c.category IN ('hotel-mid','hotel-splurge','homestay','hostel-dorm')
    AND c.source_ref IN ('observed_listings_2026_10','calibrated_model_2026_10')
  WINDOW w AS (PARTITION BY c.destination_id, c.category)
),
j AS (
  SELECT base.*, o.shoulder obs_sh, o.obs_v, o.diwali_ratio,
    CASE base.season WHEN 'shoulder' THEN 1
      WHEN 'peak' THEN CASE WHEN goa THEN t::numeric / NULLIF(sh, 0) ELSE t::numeric / NULLIF(sh, 0) * (1.35 / 1.45) END
      ELSE t::numeric / NULLIF(sh, 0) END shape,
    CASE base.cat WHEN 'hotel-mid' THEN ${factor["hotel-mid"]} WHEN 'hotel-splurge' THEN ${factor["hotel-splurge"]} WHEN 'homestay' THEN ${factor.homestay} ELSE ${factor["hostel-dorm"]} END f,
    CASE WHEN base.cat = 'hostel-dorm' THEN 10 ELSE 50 END q
  FROM base LEFT JOIN obs o ON o.d = base.d AND o.cat = base.cat
  WHERE sh IS NOT NULL
),
n AS (
  SELECT j.*,
    CASE WHEN source_ref = 'observed_listings_2026_10' THEN obs_sh * shape
         WHEN nov_peak THEN sh * f * shape END nt
  FROM j
  WHERE (source_ref = 'observed_listings_2026_10' AND obs_sh IS NOT NULL) OR (source_ref = 'calibrated_model_2026_10' AND nov_peak)
),
n2 AS (SELECT n.*, GREATEST(round(nt / q) * q, q)::int new_t, nt / NULLIF(t, 0) ratio FROM n WHERE nt IS NOT NULL)
UPDATE destination_costs c SET
  typical_inr = n2.new_t,
  range_low_inr = GREATEST(round(n2.lo * n2.ratio / n2.q) * n2.q, n2.q)::int,
  range_high_inr = GREATEST(round(n2.hi * n2.ratio / n2.q) * n2.q, n2.new_t)::int,
  notes = CASE WHEN n2.source_ref = 'observed_listings_2026_10'
    THEN 'Median of listed prices for a 12-13 Nov 2026 stay (Cleartrip/Kayak/Booking/Hostelworld, fetched 2026-10-08) x1.12 GST est. (dorm: as listed), divided by ' || n2.diwali_ratio || ' for Diwali holiday week (measured same-hotel premium). Anchored to the season that contains November here; other seasons by the model shape (2026-10-09).'
    ELSE 'Modelled, not observed. Base rates scaled to observed listing prices season for season, Diwali-week prices deflated (2026-10-09: November is peak here, factor ' || n2.f || '); peak = shoulder x1.35. Place-by-place research pending.' END,
  recorded_at = now()
FROM n2 WHERE c.id = n2.id;

COMMIT;
`;
const file = `supabase/migrations/${num}_stay_anchor_diwali_correction.sql`;
fs.writeFileSync(file, sql);
console.log(file, "factors", JSON.stringify(factor), "observed rows", rows.length, "n per factor", Object.fromEntries(Object.entries(ratios).map(([c, a]) => [c, a.length])));
console.table(report.filter((r) => r.c === "hotel-mid"));

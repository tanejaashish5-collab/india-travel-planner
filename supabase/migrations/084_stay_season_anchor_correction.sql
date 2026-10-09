-- APPLIED 2026-10-09 (~19:30 AEDT), then SUPERSEDED the same evening by 086 (adds Diwali-week deflation; recomputed factors). Kept as the record of what ran. Do not re-apply.
-- 084: correct the season anchoring of stay rows written by 080 (2026-10-09).
--
-- Why: 080 treated every Oct-Nov 2026 listing price as a SHOULDER price, then set peak = shoulder x1.35.
-- But each destination's own season months (destination_costs.months) put November in PEAK for most of
-- the plains, coast and Goa. For those places every season was ~35% too high, and the 0.92 / 0.88 / 0.93
-- model scaling factor was understated because it compared observed peak-month prices with model
-- shoulder values. Compared season for season (observed price vs the model value for the season that
-- contains November), the 19 peak-November places in the 33-destination sample give factors
-- mid 0.735 / homestay 0.744 / dorm 0.616 (medians). Shoulder- and low-November places are unchanged:
-- their 080 anchoring was already right, and their small samples (n 5-7) are too noisy to rescale on.
--
-- What (only rows still tagged by 080, only where November is in that row's peak months):
--   (a) observed_listings_2026_10: peak = observed median x1.12 GST est. (dorm as listed);
--       shoulder = peak / (the row's own peak shape: model peak/shoulder x1.35/1.45, Goa keeps its own);
--       low = shoulder x the row's model low/shoulder ratio.
--   (b) calibrated_model_2026_10: shoulder = model shoulder (backup) x factor above; peak and low keep the
--       080 shape. hotel-splurge uses the mid factor (as 080 did).
-- Computed from backups.destination_costs_20261009 (pre-080 values), so it is idempotent.
-- Rows written by research loads (observed_research_2026_10) are not touched.
-- Rollback: UPDATE ... FROM backups.destination_costs_20261009 b WHERE id = b.id (restores pre-080).

BEGIN;

WITH obs(d, mid, home, dorm) AS (VALUES
('jaipur',3602,2640,502),('udaipur',5158,1318,450),('manali',1755,2640,410),('rishikesh',3509,2209,403),('darjeeling',3542,2480,600),('munnar',4058,2936,550),('varanasi',3228,2392,400),('ooty',4432,3548,664),('hampi',3930,2175,742),('pushkar',2793,1357,319),('shimla',2879,2008,499),('amritsar',2365,1411,381),('ajmer',2234,1256,NULL),('mandu',3263,1805,NULL),('khajuraho',3268,1015,357),('gokarna',2979,1978,511),('kasol',3851,1204,575),('chopta',4700,1475,NULL),('kalpa',3529,1787,757),('chitkul',3063,1387,604),('puri',1958,878,542),('bodh-gaya',3094,1086,511),('kaziranga',2883,1759,NULL),('calangute-baga',4509,3150,918),('palolem',4050,2782,635),('leh',2730,1680,552),('hanle',4349,3000,NULL),('pangong-lake',6000,2924,NULL),('kaza',4326,2310,1076),('tawang',3093,3229,945),('gulmarg',3990,2625,NULL),('pahalgam',2640,2341,1172),('srinagar',3280,1575,986)
),
base AS (
  SELECT c.id, c.destination_id d, c.category cat, c.season, c.source_ref,
    b.typical_inr t, b.range_low_inr lo, b.range_high_inr hi,
    max(b.typical_inr) FILTER (WHERE b.season = 'shoulder') OVER w AS sh,
    max(b.typical_inr) FILTER (WHERE b.season = 'peak') OVER w AS pk,
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
  SELECT base.*,
    CASE WHEN base.source_ref = 'observed_listings_2026_10' THEN
      CASE base.cat WHEN 'hotel-mid' THEN o.mid * 1.12 WHEN 'homestay' THEN o.home * 1.12 WHEN 'hostel-dorm' THEN o.dorm END
    END obs_v,
    CASE base.cat WHEN 'hotel-mid' THEN 0.735 WHEN 'hotel-splurge' THEN 0.735 WHEN 'homestay' THEN 0.744 ELSE 0.616 END f,
    CASE WHEN goa THEN pk::numeric / NULLIF(sh, 0) ELSE pk::numeric / NULLIF(sh, 0) * (1.35 / 1.45) END peak_shape,
    CASE base.season
      WHEN 'shoulder' THEN 1
      WHEN 'peak' THEN CASE WHEN goa THEN pk::numeric / NULLIF(sh, 0) ELSE pk::numeric / NULLIF(sh, 0) * (1.35 / 1.45) END
      ELSE t::numeric / NULLIF(sh, 0) END shape,
    CASE WHEN base.cat = 'hostel-dorm' THEN 10 ELSE 50 END q
  FROM base LEFT JOIN obs o ON o.d = base.d
  WHERE base.nov_peak AND sh IS NOT NULL AND pk IS NOT NULL
),
n AS (
  SELECT j.*,
    CASE WHEN source_ref = 'observed_listings_2026_10' THEN obs_v / peak_shape * shape ELSE sh * f * shape END nt
  FROM j
  WHERE source_ref = 'calibrated_model_2026_10' OR obs_v IS NOT NULL
),
n2 AS (SELECT n.*, GREATEST(round(nt / q) * q, q)::int new_t, nt / NULLIF(t, 0) ratio FROM n WHERE nt IS NOT NULL)
UPDATE destination_costs c SET
  typical_inr = n2.new_t,
  range_low_inr = GREATEST(round(n2.lo * n2.ratio / n2.q) * n2.q, n2.q)::int,
  range_high_inr = GREATEST(round(n2.hi * n2.ratio / n2.q) * n2.q, n2.new_t)::int,
  notes = CASE WHEN n2.source_ref = 'observed_listings_2026_10'
    THEN 'Peak = median of listed prices for a November 2026 stay (Cleartrip/Kayak/Booking/Hostelworld, fetched 2026-10-08) x1.12 GST est. (dorm: as listed); November is a peak month here. Shoulder = peak / 1.35, low by the model ratio (season-anchored 2026-10-09).'
    ELSE 'Modelled, not observed. Base rates scaled to 33 destinations with real listing prices, compared season for season (2026-10-09: November is peak here, factor ' || n2.f || '); peak = shoulder x1.35. Place-by-place research pending.' END,
  recorded_at = now()
FROM n2 WHERE c.id = n2.id;

COMMIT;

SELECT source_ref, category, count(*) rows_now FROM destination_costs
WHERE category IN ('hotel-mid','hotel-splurge','homestay','hostel-dorm') GROUP BY 1, 2 ORDER BY 1, 2;

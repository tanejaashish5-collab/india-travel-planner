-- 080: calibrate destination_costs STAY rows against real listing prices (2026-10-08).
--
-- Why: destination_costs was a pure formula (flat base x state x altitude x season),
-- never searched. 33 destinations were checked against Cleartrip/Kayak/Booking/Hostelworld
-- listings (every price has a URL in data/cost-research/2026-10-08-calibration-sample.md).
-- Findings: shoulder 3-star ~22% high pre-tax (~9% after GST), homestay ~27% high (~13%
-- after GST), dorm ~8% high; Dec peak uplift measured 1.35x (not 1.45x) over 102 matched
-- hotel pairs in 5 cities.
--
-- What: (a) the 33 checked destinations get observed medians x1.12 GST est. (dorm as listed);
--       (b) every other non-Goa destination's stay rows are scaled by f (mid/splurge 0.92,
--           homestay 0.88, dorm 0.93) and peak = shoulder x1.35 (existing shape preserved);
--       (c) non-observed Goa rows are untouched (model was within ~20%);
--       (d) hotel rows are removed for places with no lodging (Khardung La, Barren Island).
-- Backup: backups.destination_costs_20261009 (12,693 rows) already exists in the database.
-- Rollback: UPDATE ... FROM backups.destination_costs_20261009 b WHERE id = b.id, and
--           re-insert the deleted rows from the backup table.

BEGIN;

WITH base AS (
  SELECT c.id, c.destination_id d, c.category cat, c.season, c.typical_inr t, c.range_low_inr lo, c.range_high_inr hi,
    max(c.typical_inr) FILTER (WHERE c.season='shoulder') OVER w AS sh
  FROM destination_costs c
  WHERE c.category IN ('hotel-mid','hotel-splurge','homestay','hostel-dorm')
  WINDOW w AS (PARTITION BY c.destination_id, c.category)
),
obs(d, mid, home, dorm) AS (VALUES
('jaipur',3602,2640,502),('udaipur',5158,1318,450),('manali',1755,2640,410),('rishikesh',3509,2209,403),('darjeeling',3542,2480,600),('munnar',4058,2936,550),('varanasi',3228,2392,400),('ooty',4432,3548,664),('hampi',3930,2175,742),('pushkar',2793,1357,319),('shimla',2879,2008,499),('amritsar',2365,1411,381),('ajmer',2234,1256,NULL),('mandu',3263,1805,NULL),('khajuraho',3268,1015,357),('gokarna',2979,1978,511),('kasol',3851,1204,575),('chopta',4700,1475,NULL),('kalpa',3529,1787,757),('chitkul',3063,1387,604),('puri',1958,878,542),('bodh-gaya',3094,1086,511),('kaziranga',2883,1759,NULL),('calangute-baga',4509,3150,918),('palolem',4050,2782,635),('leh',2730,1680,552),('hanle',4349,3000,NULL),('pangong-lake',6000,2924,NULL),('kaza',4326,2310,1076),('tawang',3093,3229,945),('gulmarg',3990,2625,NULL),('pahalgam',2640,2341,1172),('srinagar',3280,1575,986)),
j AS (
  SELECT b.*, (dest.state_id='goa') goa,
    CASE b.cat WHEN 'hotel-mid' THEN 0.92 WHEN 'hotel-splurge' THEN 0.92 WHEN 'homestay' THEN 0.88 ELSE 0.93 END f,
    CASE WHEN o.d IS NULL THEN NULL
      WHEN b.cat='hotel-mid' THEN o.mid*1.12
      WHEN b.cat='homestay' THEN o.home*1.12
      WHEN b.cat='hostel-dorm' THEN o.dorm END ns_obs
  FROM base b JOIN destinations dest ON dest.id=b.d LEFT JOIN obs o ON o.d=b.d
),
k AS (SELECT j.*, COALESCE(ns_obs, sh*f) ns FROM j WHERE NOT (goa AND ns_obs IS NULL)),
n AS (
  SELECT k.*, CASE
    WHEN season='shoulder' AND ns IS NOT NULL THEN ns
    WHEN season='peak' AND ns IS NOT NULL THEN ns * CASE WHEN goa THEN COALESCE(t::numeric/sh,1.8) ELSE COALESCE(t::numeric/sh*(1.35/1.45),1.35) END
    WHEN season='low' AND ns IS NOT NULL THEN ns * COALESCE(t::numeric/sh,0.65)
    ELSE t*f END nt,
    CASE WHEN cat='hostel-dorm' THEN 10 ELSE 50 END q
  FROM k),
n2 AS (SELECT n.*, GREATEST(round(nt/q)*q, q)::int new_t, (nt/NULLIF(t,0)) ratio FROM n)
UPDATE destination_costs c SET
  typical_inr = n2.new_t,
  range_low_inr = GREATEST(round(n2.lo*n2.ratio/n2.q)*n2.q, n2.q)::int,
  range_high_inr = GREATEST(round(n2.hi*n2.ratio/n2.q)*n2.q, n2.new_t)::int,
  source_ref = CASE WHEN n2.ns_obs IS NOT NULL THEN 'observed_listings_2026_10' ELSE 'calibrated_model_2026_10' END,
  notes = CASE
    WHEN n2.ns_obs IS NOT NULL AND n2.d IN ('hanle','pangong-lake','chopta','mandu','chitkul') THEN 'LOW CONFIDENCE. Shoulder = median of few listings (Cleartrip/Kayak/Booking/operator sites, fetched 2026-10-08) x1.12 GST est. Peak = shoulder x1.35 (measured on 5 cities, Dec vs Oct-Nov). Place-by-place re-check pending.'
    WHEN n2.ns_obs IS NOT NULL THEN 'Shoulder = median of listed prices (Cleartrip/Kayak/Booking/Hostelworld, fetched 2026-10-08) x1.12 GST est. (dorm: as listed). Peak = shoulder x1.35 (measured: same hotels Dec vs Oct-Nov, 5 cities); Goa keeps its own peak ratio.'
    ELSE 'Modelled, not observed. Base rates scaled to 33 destinations with real listing prices (2026-10-08); peak = shoulder x1.35. Place-by-place research pending.' END,
  recorded_at = now()
FROM n2 WHERE c.id = n2.id;

-- No lodging exists: Khardung La is a pass (nearest stays in Leh/Nubra), Barren Island is an
-- uninhabited volcanic sanctuary (stay in Port Blair/Havelock). Keep taxi/food/activity rows.
DELETE FROM destination_costs
WHERE destination_id IN ('khardung-la','barren-island')
  AND category IN ('hotel-mid','hotel-splurge','homestay','hostel-dorm');

COMMIT;

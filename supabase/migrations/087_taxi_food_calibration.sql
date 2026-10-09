-- APPLIED 2026-10-09 (~21:00 AEDT) via scripts/run-sql-file.mjs. Not in schema_migrations. Re-running is a no-op (rows are re-tagged).
-- 087: calibrate the still-modelled taxi and food rows against audited observations (2026-10-09).
--
-- Why: the formula priced a local taxi day and a day's food with season multipliers (peak x1.45, low x0.65)
-- on a base that was itself high. Audited research (North 2026-10-09 + West 2026-10-09, every figure checked
-- against its source page in a fresh context) shows:
--   * taxi union / operator day rates and restaurant prices do not move with the season;
--   * formula shoulder vs observed, median: taxi 1.27x high in the hills (>=1500 m, n=31), 1.56x high on the
--     plains and coast (n=35); food 1.25x high in the hills (n=49), 1.00x on the plains (n=74).
-- What: every transport-taxi-day and food-per-day row still tagged editorial_model_2026_Q2 gets ONE value for all
-- three seasons = formula shoulder (from backups.destination_costs_20261009) x factor:
--   taxi 0.79 hills / 0.64 plains; food 0.80 hills / 1.00 plains. Ranges = the shoulder range x the same factor.
--   Tag becomes calibrated_model_2026_10. Observed rows (observed_research_2026_10) are not touched.
-- Idempotent: computed from the backup, and re-running finds no editorial rows left in these categories.
-- Rollback: UPDATE destination_costs c SET ... FROM backups.destination_costs_20261009 b WHERE c.id = b.id
--           AND c.source_ref = 'calibrated_model_2026_10' AND c.category IN ('transport-taxi-day','food-per-day').

BEGIN;

WITH b AS (
  SELECT c.id, c.destination_id d, c.category cat, c.season,
    max(bk.typical_inr)    FILTER (WHERE bk.season = 'shoulder') OVER w AS sh,
    max(bk.range_low_inr)  FILTER (WHERE bk.season = 'shoulder') OVER w AS sh_lo,
    max(bk.range_high_inr) FILTER (WHERE bk.season = 'shoulder') OVER w AS sh_hi,
    COALESCE(dest.elevation_m, 0) >= 1500 AS hill
  FROM destination_costs c
  JOIN backups.destination_costs_20261009 bk ON bk.id = c.id
  JOIN destinations dest ON dest.id = c.destination_id
  WHERE c.category IN ('transport-taxi-day','food-per-day') AND c.source_ref = 'editorial_model_2026_Q2'
  WINDOW w AS (PARTITION BY c.destination_id, c.category)
),
f AS (
  SELECT b.*,
    CASE WHEN cat = 'transport-taxi-day' THEN CASE WHEN hill THEN 0.79 ELSE 0.64 END
         ELSE CASE WHEN hill THEN 0.80 ELSE 1.00 END END AS fac,
    CASE WHEN cat = 'food-per-day' THEN 10 ELSE 50 END AS q
  FROM b WHERE sh IS NOT NULL
),
v AS (SELECT f.*, GREATEST(round(sh * fac / q) * q, q)::int AS new_t FROM f)
UPDATE destination_costs c SET
  typical_inr = v.new_t,
  range_low_inr = LEAST(GREATEST(round(v.sh_lo * v.fac / v.q) * v.q, v.q)::int, v.new_t),
  range_high_inr = GREATEST(round(v.sh_hi * v.fac / v.q) * v.q, v.new_t)::int,
  source_ref = 'calibrated_model_2026_10',
  notes = 'Modelled, not observed. Formula shoulder x' || v.fac || ' (' || CASE WHEN v.hill THEN 'hills' ELSE 'plains/coast' END ||
          '), calibrated 2026-10-09 against audited observations in North and West India; same in every season, because observed taxi and food prices do not move with the season. Place-by-place research pending.',
  recorded_at = now()
FROM v WHERE c.id = v.id;

COMMIT;

SELECT category, source_ref, count(*) FROM destination_costs WHERE category IN ('transport-taxi-day','food-per-day') GROUP BY 1, 2 ORDER BY 1, 2;

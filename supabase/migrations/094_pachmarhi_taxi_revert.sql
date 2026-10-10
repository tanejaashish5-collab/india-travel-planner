-- APPLIED 2026-10-10 via scripts/run-sql-file.mjs. Not in schema_migrations.
-- 094: Pachmarhi day cab back to the calibrated value (2026-10-10).
-- 090 loaded Rs 5,750, which the audit kept but is a six-seat gypsy covering all three sightseeing routes, not a
-- day cab for the trip estimator (the town's own logistics note gives a local full day near Rs 2,000). This puts
-- the row back to the 087 rule: pre-080 shoulder x0.64 (plains, elevation under 1,500 m), same value all seasons.
BEGIN;
WITH b AS (
  SELECT max(typical_inr) t, max(range_low_inr) lo, max(range_high_inr) hi FROM backups.destination_costs_20261009
  WHERE destination_id = 'pachmarhi' AND category = 'transport-taxi-day' AND season = 'shoulder'
)
UPDATE destination_costs c SET
  typical_inr = round(b.t * 0.64 / 50) * 50, range_low_inr = round(b.lo * 0.64 / 50) * 50, range_high_inr = round(b.hi * 0.64 / 50) * 50,
  source_ref = 'calibrated_model_2026_10',
  notes = 'Modelled, not observed: shoulder x0.64 plains taxi calibration (087). The researched Rs 5,750 is a gypsy for six on all three Pachmarhi routes (planextrip.com 2025), not a day cab.',
  recorded_at = now()
FROM b WHERE c.destination_id = 'pachmarhi' AND c.category = 'transport-taxi-day';
SELECT season, typical_inr, range_low_inr, range_high_inr FROM destination_costs WHERE destination_id = 'pachmarhi' AND category = 'transport-taxi-day';
COMMIT;

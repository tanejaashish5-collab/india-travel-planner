-- APPLIED 2026-10-10 via scripts/run-sql-file.mjs. Not in schema_migrations.
-- 095: undo the Diwali-week deflation on hostel-dorm rows (2026-10-10).
-- The same-hotel Diwali premium was measured on 3-star hotels; the loader also divided dorm beds by it, so
-- Jaisalmer's beds fell to Rs 30-70 (premium 3.16). Multiply each dorm row back by the ratio its note states.
-- Loader fixed in the same commit (scripts/build-cost-research-sql.mjs: dorms are never deflated).
BEGIN;
WITH r AS (
  SELECT id, substring(notes FROM 'Diwali-week price / ([0-9.]+)')::numeric AS ratio
  FROM destination_costs
  WHERE category = 'hostel-dorm' AND notes ~ 'Diwali-week price / [0-9.]+'
)
UPDATE destination_costs c SET
  typical_inr    = GREATEST(round(c.typical_inr * r.ratio / 10) * 10, 10)::int,
  range_low_inr  = GREATEST(round(c.range_low_inr * r.ratio / 10) * 10, 10)::int,
  range_high_inr = GREATEST(round(c.range_high_inr * r.ratio / 10) * 10, 10)::int,
  notes = regexp_replace(c.notes, '; Diwali-week price / [0-9.]+ \([^)]*\)', '; dorm bed, not deflated (Diwali premium was measured on 3-star hotels; fixed 2026-10-10)'),
  recorded_at = now()
FROM r WHERE c.id = r.id AND r.ratio > 1.0;
SELECT destination_id, season, typical_inr FROM destination_costs WHERE category = 'hostel-dorm' AND destination_id IN ('jaisalmer','dwarka','somnath','mount-abu') ORDER BY 1, 2;
COMMIT;

-- 018_destination_months_evergreen.sql
-- Structural claim: monthly data is cycle-based.
--
-- destination_months stores (destination_id, month, score, why_go, why_not,
-- verdict, things_to_do, festivals). Weather and season cycles repeat yearly,
-- so "June in Leh" doesn't need yearly re-verification. This flag lets the UI
-- render "cycle-based" instead of amber "review pending" where appropriate.
--
-- Prose on individual rows (why_go / why_not / verdict) still has content_reviewed_at
-- for fine-grained stamps; evergreen_marker is the structural claim that
-- the underlying data TYPE (weather/season) is evergreen.
--
-- Apply via Supabase dashboard SQL Editor.

ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS evergreen_marker BOOLEAN NOT NULL DEFAULT true;

COMMENT ON COLUMN destination_months.evergreen_marker IS
  'Structural claim: monthly data is cycle-based and does not need yearly regeneration. '
  'Default TRUE. Set FALSE only for rows with event-bound content (e.g. "2026 monsoon was unusual").';

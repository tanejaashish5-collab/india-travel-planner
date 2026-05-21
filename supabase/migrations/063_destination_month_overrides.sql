-- 063_destination_month_overrides.sql
-- Per-page SERP title / meta-description overrides for high-impression,
-- low-CTR destination×month pages.
--
-- The templated title/description in generateMetadata()
-- (apps/web/src/app/[locale]/destination/[id]/[month]/page.tsx) cannot
-- out-compete TripAdvisor / MakeMyTrip at SERP positions 7-12. These columns
-- let a hand-written override win for flagged pages. NULL → template, no
-- change. Additive + idempotent — safe to re-run.
--
-- Originally scoped as "032" in data/research/ga4-and-ctr-action-plan-2026-05-17.md;
-- renumbered to 063 (next free slot — 032 was taken in the interim).

ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS title_override text,
  ADD COLUMN IF NOT EXISTS title_override_hi text,
  ADD COLUMN IF NOT EXISTS meta_description_override text,
  ADD COLUMN IF NOT EXISTS meta_description_override_hi text;

COMMENT ON COLUMN destination_months.title_override IS
  'Per-page SERP title (en). Bypasses the generateMetadata template. Soft 50-char limit (pre " | NakshIQ" suffix). For top-impression pages flagged for CRO.';
COMMENT ON COLUMN destination_months.title_override_hi IS
  'Per-page SERP title (hi). Bypasses the template. Soft 50-char limit (pre suffix).';
COMMENT ON COLUMN destination_months.meta_description_override IS
  'Per-page SERP meta description (en). Bypasses the template. Soft 155-char limit.';
COMMENT ON COLUMN destination_months.meta_description_override_hi IS
  'Per-page SERP meta description (hi). Bypasses the template. Soft 155-char limit.';

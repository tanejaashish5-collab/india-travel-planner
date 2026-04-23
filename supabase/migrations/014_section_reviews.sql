-- 014_section_reviews.sql
-- Per-section freshness granularity (Sprint 1.6 of NakshIQ v2 Gap-Fill plan).
--
-- `content_reviewed_at` (migration 010) is a single page-level timestamp.
-- That's honest but too coarse: a destination where ONLY the road info was
-- re-checked still shows everything else as "reviewed today", which is a
-- subtle lie.
--
-- `section_reviews` is a small JSONB map keyed by section slug, each value
-- an ISO date. The UI reads `section_reviews[key]` first and falls back to
-- `content_reviewed_at` when absent, so zero-value rows still render.
--
-- Expected keys (not enforced at DB level — UI-owned vocabulary):
--   infrastructure, safety, crowd, stays, reach, food, places
--
-- Shape:
--   {
--     "infrastructure": "2026-04-01",
--     "safety": "2026-03-15",
--     "crowd": "2026-02-20"
--   }
--
-- Rollback: `ALTER TABLE destinations DROP COLUMN section_reviews;` — safe,
-- the UI degrades to page-level fallback.

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS section_reviews JSONB;

COMMENT ON COLUMN destinations.section_reviews IS
  'Per-section freshness map. Keys: infrastructure, safety, crowd, stays, reach, food, places. Values: ISO date strings. UI falls back to content_reviewed_at when key missing.';

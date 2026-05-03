-- 039_skip_list_depth.sql
-- Adds Lonavala-style depth to tourist_trap_alternatives so the skip page
-- can answer "what specifically goes wrong" + "what's the better-fit pairing"
-- instead of one block of comparison prose.
--
-- All columns nullable so existing 200+ rows render unchanged. Backfill via
-- scripts/seed-skip-depth.mjs in the same session.

ALTER TABLE tourist_trap_alternatives
  ADD COLUMN IF NOT EXISTS pain_points         TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS common_complaints   TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS alt_better_for      TEXT,
  ADD COLUMN IF NOT EXISTS source_url          TEXT,
  ADD COLUMN IF NOT EXISTS last_reviewed_at    TIMESTAMPTZ;

COMMENT ON COLUMN tourist_trap_alternatives.pain_points IS
  '3-6 short bullets — what specifically disappoints (e.g. "Tiger Point: 2km traffic jam", "₹500 entry to a viewpoint visible from the road")';

COMMENT ON COLUMN tourist_trap_alternatives.common_complaints IS
  '3-5 verbatim-style complaint sentences sourced from real reviews/forums';

COMMENT ON COLUMN tourist_trap_alternatives.alt_better_for IS
  'One-sentence "go to <alt> if you want…" framing for this trap→alt pairing';

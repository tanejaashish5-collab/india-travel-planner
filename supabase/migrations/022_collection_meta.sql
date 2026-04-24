-- Sprint 3 — collection meta-guide extensions.
-- Adds the editorial framing fields the research playbook flagged:
--   strategy_intro  — 1-paragraph intro to the collection's reason-to-exist
--   risk_level      — one of 'easy' | 'moderate' | 'serious' | 'expert'
--   connector_notes — how the stops in the collection relate to each other

ALTER TABLE collections
  ADD COLUMN IF NOT EXISTS strategy_intro text,
  ADD COLUMN IF NOT EXISTS risk_level text,
  ADD COLUMN IF NOT EXISTS connector_notes text;

-- Optional CHECK: risk_level values (soft enforcement, easy to relax)
ALTER TABLE collections
  DROP CONSTRAINT IF EXISTS collections_risk_level_check;

ALTER TABLE collections
  ADD CONSTRAINT collections_risk_level_check
  CHECK (risk_level IS NULL OR risk_level IN ('easy', 'moderate', 'serious', 'expert'));

COMMENT ON COLUMN collections.strategy_intro IS
  'Editorial intro — why this collection exists and what binds these places together.';
COMMENT ON COLUMN collections.risk_level IS
  'Overall commitment level for this themed circuit: easy | moderate | serious | expert.';
COMMENT ON COLUMN collections.connector_notes IS
  'How the stops connect — travel logistics, narrative arc, or skip-suitable substitutions.';

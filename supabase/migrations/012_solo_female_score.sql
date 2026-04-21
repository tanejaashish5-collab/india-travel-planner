-- 012_solo_female_score.sql
-- Adds solo-female safety score dimension. Annual on destinations; sparse monthly overrides.
-- Apply via Supabase dashboard SQL Editor (CLI migrations do not work in this repo).

-- Annual score at the destination level (primary signal)
ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS solo_female_score INT CHECK (solo_female_score >= 1 AND solo_female_score <= 5),
  ADD COLUMN IF NOT EXISTS solo_female_note TEXT;

-- Sparse monthly override for destinations where month matters a lot (e.g. Goa-Dec, Pushkar-Nov)
ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS solo_female_override INT CHECK (solo_female_override >= 1 AND solo_female_override <= 5),
  ADD COLUMN IF NOT EXISTS solo_female_override_note TEXT;

CREATE INDEX IF NOT EXISTS idx_destinations_solo_female_score
  ON destinations (solo_female_score) WHERE solo_female_score IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_destination_months_solo_female_override
  ON destination_months (solo_female_override) WHERE solo_female_override IS NOT NULL;

-- Post-apply verification:
--   SELECT column_name FROM information_schema.columns
--   WHERE (table_name='destinations' AND column_name IN ('solo_female_score','solo_female_note'))
--      OR (table_name='destination_months' AND column_name IN ('solo_female_override','solo_female_override_note'));
--   -- should return 4 rows.

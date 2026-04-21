-- 009_destination_months_verdict.sql
-- Adds the Verdict enum + skip_reason to destination_months.
-- Complementary to 007's go_or_skip_verdict (prose one-liner).
-- Apply via Supabase dashboard SQL Editor (CLI migrations do not work in this repo).

ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS verdict TEXT CHECK (verdict IN ('go', 'wait', 'skip')),
  ADD COLUMN IF NOT EXISTS skip_reason TEXT;

CREATE INDEX IF NOT EXISTS idx_destination_months_verdict
  ON destination_months (verdict) WHERE verdict IS NOT NULL;

-- Post-apply verification:
--   SELECT column_name FROM information_schema.columns
--   WHERE table_name='destination_months' AND column_name IN ('verdict','skip_reason');
--   -- should return 2 rows.

-- 045_tourist_trap_editorial.sql
-- Editorial-issue redesign of /tourist-traps. Adds the fields the new
-- magazine-style page needs that don't fit the existing comparison/why_better
-- structure (which is neutral, third-person, designed for a directory grid).
--
-- All columns nullable except editorial_format (defaults to 'standard'). The
-- new index page falls back to comparison/why_better when editorial fields
-- are null, so existing 109 rows render unchanged until enriched.

ALTER TABLE tourist_trap_alternatives
  ADD COLUMN IF NOT EXISTS brochure_line       TEXT,
  ADD COLUMN IF NOT EXISTS editorial_verdict   TEXT,
  ADD COLUMN IF NOT EXISTS editorial_format    TEXT NOT NULL DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS pullquote           TEXT,
  ADD COLUMN IF NOT EXISTS ledger              JSONB,
  ADD COLUMN IF NOT EXISTS tags                TEXT[] DEFAULT '{}';

-- Format whitelist. Use a CHECK rather than enum so adding a new variant
-- ('map', 'photo-strip', etc.) is a single ALTER instead of a type migration.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'tourist_trap_alternatives_editorial_format_chk'
  ) THEN
    ALTER TABLE tourist_trap_alternatives
      ADD CONSTRAINT tourist_trap_alternatives_editorial_format_chk
      CHECK (editorial_format IN ('standard', 'pullquote', 'ledger'));
  END IF;
END $$;

COMMENT ON COLUMN tourist_trap_alternatives.brochure_line IS
  'One-line brochure-voice marketing tagline, rendered struck-through. Italic. Example: "The bohemian flea market paradise of Goa."';

COMMENT ON COLUMN tourist_trap_alternatives.editorial_verdict IS
  '1-3 sharp editorial sentences. Brand voice (no hedging, no influencer cliche). Replaces using comparison field for the page hero copy.';

COMMENT ON COLUMN tourist_trap_alternatives.editorial_format IS
  'Layout variant: standard (full-width verdict + stamp), pullquote (centered blockquote), ledger (2-col what-they-say-vs-what-you-get table).';

COMMENT ON COLUMN tourist_trap_alternatives.pullquote IS
  'Short blockquote (1-2 sentences) for editorial_format=pullquote. If null, the verdict is used.';

COMMENT ON COLUMN tourist_trap_alternatives.ledger IS
  'JSONB array of {brochure: string, real: string} pairs for editorial_format=ledger. 3-5 pairs typical.';

COMMENT ON COLUMN tourist_trap_alternatives.tags IS
  '1-2 short editorial tags shown in the entry header (e.g. ["beach","flea market"]).';

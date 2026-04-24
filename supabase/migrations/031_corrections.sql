-- Sprint 14: Corrections log — public, on-the-record record of what we
-- got wrong and when we fixed it. E-E-A-T signal that independent journalism
-- standards (CNT, Outlook Traveller, ET Travel) use. Acquirers grade for
-- presence of this during due diligence.

CREATE TABLE IF NOT EXISTS corrections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Published timestamp = when the public-facing entry went live.
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- When the original error was published and when it was fixed.
  -- Both stored so the "how long did this live?" gap is visible.
  error_published_at TIMESTAMPTZ NOT NULL,
  fixed_at TIMESTAMPTZ NOT NULL,

  -- Where the error was — page_url + element (e.g., "Pangong October score").
  page_url TEXT NOT NULL,
  element TEXT,

  -- What was wrong (what the site said) + what it should have said.
  what_we_said TEXT NOT NULL CHECK (char_length(what_we_said) BETWEEN 10 AND 500),
  what_is_correct TEXT NOT NULL CHECK (char_length(what_is_correct) BETWEEN 10 AND 500),

  -- Source — the external evidence that confirmed the correction.
  source_url TEXT,
  source_description TEXT,

  -- Severity: typo | factual | score-impact | safety
  severity TEXT NOT NULL DEFAULT 'factual'
    CHECK (severity IN ('typo','factual','score-impact','safety')),

  -- Attribution — editor who signed off on the correction.
  editor_slug TEXT REFERENCES authors(slug) ON DELETE SET NULL,

  -- Reporter — person who flagged (may be anonymous).
  reporter_note TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS corrections_published_idx ON corrections (published_at DESC);
CREATE INDEX IF NOT EXISTS corrections_severity_idx ON corrections (severity);

ALTER TABLE corrections ENABLE ROW LEVEL SECURITY;

-- Public can read all corrections (they are, by definition, on the record).
CREATE POLICY IF NOT EXISTS "corrections are public" ON corrections
  FOR SELECT USING (true);

-- Only service role can insert/update (admin endpoint uses SUPABASE_SERVICE_ROLE_KEY).
-- No anonymous writes.

COMMENT ON TABLE corrections IS
  'Public corrections log. Every entry is published on /corrections with attribution + fix timestamp. See editorial-policy for our correction process.';

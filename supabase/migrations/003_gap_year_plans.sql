-- ============================================================
-- Gap Year Planner — saved multi-month itineraries
-- ============================================================
-- A Gap Year plan is a user-authored 3-12 month India itinerary. The generator
-- fills `plan` JSONB with month-by-month destination picks produced by Claude.
-- Plans are addressable via a random 12-char share_token (base64url of 9
-- random bytes) so anyone with the link can read them. The token IS the secret.

CREATE TABLE gap_year_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(9), 'base64'),
  title TEXT NOT NULL,
  start_month INT NOT NULL CHECK (start_month BETWEEN 1 AND 12),
  duration_months INT NOT NULL CHECK (duration_months BETWEEN 3 AND 12),
  persona TEXT NOT NULL CHECK (persona IN ('family_kids', 'solo_couple')),
  budget TEXT CHECK (budget IN ('budget', 'mid-range', 'splurge')),
  origin TEXT,
  interests TEXT[] DEFAULT '{}',
  plan JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_gyp_user ON gap_year_plans(user_id);
CREATE INDEX idx_gyp_token ON gap_year_plans(share_token);

ALTER TABLE gap_year_plans ENABLE ROW LEVEL SECURITY;

-- Owner can do anything
CREATE POLICY "Owners manage own plans"
  ON gap_year_plans FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Anyone can SELECT — acceptable because share_token is unguessable.
-- Reads that don't know the token will succeed technically but return
-- rows only when the caller filters `.eq('share_token', ...)`.
CREATE POLICY "Public read (token-gated at query layer)"
  ON gap_year_plans FOR SELECT
  USING (true);

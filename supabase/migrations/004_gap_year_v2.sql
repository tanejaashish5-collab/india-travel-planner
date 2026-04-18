-- ============================================================
-- Gap Year Planner v2 — persona-aware + curated stay picks
-- ============================================================
-- Extends the v1 schema additively so any plans already in
-- gap_year_plans continue to render. New columns are nullable.
-- ============================================================

-- Additive columns on gap_year_plans
ALTER TABLE gap_year_plans
  ADD COLUMN IF NOT EXISTS familiarity TEXT CHECK (familiarity IN ('first_timer', 'seasoned')),
  ADD COLUMN IF NOT EXISTS experience_tier TEXT CHECK (experience_tier IN ('thrifty', 'comfortable', 'splurge')),
  ADD COLUMN IF NOT EXISTS themes TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS origin_json JSONB;

-- New table: curated stay picks per destination, up to 4 slots
-- slot values: experience | value | location | xfactor
-- source values: local_stays (from existing 589-row table) | web_search (Claude-curated) | manual (admin edit)
-- published = false → pending admin review (low-confidence web_search rows)
CREATE TABLE IF NOT EXISTS destination_stay_picks (
  destination_id TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  slot TEXT NOT NULL CHECK (slot IN ('experience', 'value', 'location', 'xfactor')),
  name TEXT NOT NULL,
  property_type TEXT,
  price_band TEXT,
  why_nakshiq TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('local_stays', 'web_search', 'manual')),
  source_ref TEXT,
  confidence NUMERIC(3, 2) DEFAULT 1.00,
  refreshed_at TIMESTAMPTZ DEFAULT now(),
  published BOOLEAN DEFAULT true,
  PRIMARY KEY (destination_id, slot)
);

CREATE INDEX IF NOT EXISTS idx_stay_picks_dest ON destination_stay_picks(destination_id);
CREATE INDEX IF NOT EXISTS idx_stay_picks_refresh ON destination_stay_picks(refreshed_at);
CREATE INDEX IF NOT EXISTS idx_stay_picks_published ON destination_stay_picks(published) WHERE published = false;

ALTER TABLE destination_stay_picks ENABLE ROW LEVEL SECURITY;

-- Public read, but only published rows
CREATE POLICY "Public read published stay picks"
  ON destination_stay_picks FOR SELECT
  USING (published = true);

-- Service role can do anything (background refresh job + admin review).
-- No explicit write policy needed — service role bypasses RLS.

-- ============================================================
-- Stay Curation — One-Time State-by-State, Editorial Enrichment
-- ============================================================
-- Additive only. Does NOT wipe the existing 400 Haiku-era rows —
-- they're broadly on-voice and will be enriched (sources +
-- upgrade_reasoning + voice_flags) rather than regenerated.
--
-- Keeps the existing slot labels (experience / value / location /
-- xfactor) — better than the "flagship/value/character/local"
-- tier labels originally proposed.
-- ============================================================

-- 1) Additive columns on destination_stay_picks
ALTER TABLE destination_stay_picks
  ADD COLUMN IF NOT EXISTS signature_experience TEXT,
  ADD COLUMN IF NOT EXISTS sources JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS contact_only BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS contact_info TEXT,
  ADD COLUMN IF NOT EXISTS voice_flags JSONB DEFAULT '[]'::jsonb;

-- 2) Destination-level stay intelligence (one blob per destination)
-- Shape: { upgrade_reasoning: text, as_of_date: date, verified_by: text, notes: text }
ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS stay_intelligence JSONB;

-- 3) Indexes for admin review + public rendering
CREATE INDEX IF NOT EXISTS idx_stay_picks_slot ON destination_stay_picks(slot);
CREATE INDEX IF NOT EXISTS idx_stay_picks_dest_slot ON destination_stay_picks(destination_id, slot);

-- 4) RLS policy unchanged from migration 004 (public read where published=true).
-- Service role bypasses RLS for admin + curation script.

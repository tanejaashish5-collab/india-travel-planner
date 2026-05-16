-- Migration 056 — Trust-layer columns for the @MastersUnion-mined ships.
--
-- Adds four new fields backing four shipped UIs. All columns are nullable
-- so existing rows continue to read clean; the UI renders nothing for null,
-- per the honest-scarcity rule.
--
-- Linked ships (all from data/research/youtube-mastersunion-nakshiq-2026-05-11.md):
--   Ship 3  — local_eateries.hygiene_confidence (jsonb)
--   Ship 6  — destinations.institutional_anchors (jsonb)
--   Ship 9  — destination_months.off_season_drivers (jsonb)
--   Ship 10 — local_eateries.parking_type (text), destination_stay_picks.parking_type (text)
--
-- Apply with:
--   npm run db:migrate          # supabase db push
--
-- Per feedback_supabase_guard_blocks_unauthorized_writes.md — this file is
-- generated; Ashish runs the apply manually.

-- ─── Ship 3: hygiene_confidence on local_eateries ─────────────────────
--
-- Shape: jsonb { fssai: bool|null, water: 'clean'|'bottled-only'|'unsure',
--                reviews_count: int|null, established_year_min_5: bool }
-- Used as a soft-badge on eatery cards. Null = "no audit yet"; UI hides.

ALTER TABLE local_eateries
  ADD COLUMN IF NOT EXISTS hygiene_confidence jsonb;

COMMENT ON COLUMN local_eateries.hygiene_confidence IS
  'Hygiene audit signals — fssai/water/reviews/age. Null when not audited. UI hides the badge for null rows (honest scarcity).';

-- ─── Ship 6: institutional_anchors on destinations ────────────────────
--
-- Shape: jsonb [{ kind: 'asi'|'unesco'|'state-tourism'|'district-admin',
--                 reference: string, year?: int, url: string }, ...]
-- Used as a "Verified by" strip on destination pages. Null/empty array = hide.

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS institutional_anchors jsonb;

COMMENT ON COLUMN destinations.institutional_anchors IS
  'Government / institutional references for the destination. Each entry has kind, reference id (e.g. ASI inscription #), optional year, source URL. Used by the "Verified by" strip — null hides.';

-- ─── Ship 9: off_season_drivers on destination_months ─────────────────
--
-- Shape: jsonb [{ driver: 'wedding'|'festival'|'corporate'|'pilgrimage'|'study',
--                 audience: string, note: string, source_url?: string }, ...]
-- Surfaces reasons a "skip" month still works for specific use-cases.
-- Example: Jhalawar May → [{driver:'wedding', audience:'Sindhi community', note:'…'}].
-- Null/empty = no driver known (default — most rows).

ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS off_season_drivers jsonb;

COMMENT ON COLUMN destination_months.off_season_drivers IS
  'Per-month off-season demand drivers (wedding/festival/corporate/etc). Used to surface why a skip month still works for someone. Null/empty array hides the section.';

-- ─── Ship 10: parking_type on local_eateries + destination_stay_picks ─
--
-- Shape: enum-like text — 'on-site'|'paid-nearby'|'valet'|'street'|'walk-200m'|'walk-500m+'|'no-vehicle-access'
-- Indian family drivers rank parking above star rating per the mining doc.
-- Null = "not audited" — UI hides the row.

ALTER TABLE local_eateries
  ADD COLUMN IF NOT EXISTS parking_type text
  CHECK (parking_type IS NULL OR parking_type IN (
    'on-site', 'paid-nearby', 'valet', 'street', 'walk-200m', 'walk-500m+', 'no-vehicle-access'
  ));

COMMENT ON COLUMN local_eateries.parking_type IS
  'Parking situation at the eatery. Enum-constrained text. Null = not audited yet, UI hides.';

ALTER TABLE destination_stay_picks
  ADD COLUMN IF NOT EXISTS parking_type text
  CHECK (parking_type IS NULL OR parking_type IN (
    'on-site', 'paid-nearby', 'valet', 'street', 'walk-200m', 'walk-500m+', 'no-vehicle-access'
  ));

COMMENT ON COLUMN destination_stay_picks.parking_type IS
  'Parking situation at the stay. Same enum as eateries. Null = not audited.';

-- ─── Helper indexes ───────────────────────────────────────────────────

-- institutional_anchors is small per row but used in card-strip render —
-- a partial index on "has anchors" is the cheapest gain.
CREATE INDEX IF NOT EXISTS destinations_institutional_anchors_present_idx
  ON destinations ((institutional_anchors IS NOT NULL))
  WHERE institutional_anchors IS NOT NULL;

-- off_season_drivers — same logic for the destination-month verdict page.
CREATE INDEX IF NOT EXISTS destination_months_off_season_drivers_present_idx
  ON destination_months ((off_season_drivers IS NOT NULL))
  WHERE off_season_drivers IS NOT NULL;

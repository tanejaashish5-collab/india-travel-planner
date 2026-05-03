-- 040_treks_rich_columns.sql
-- The trek-detail.tsx component already references these columns, but they
-- were never added to the schema after migration 001. Currently they exist
-- ad-hoc on the live DB (added via seed scripts) but no migration enforces
-- their type or presence. This file makes the schema match the rendering
-- contract.

ALTER TABLE treks
  ADD COLUMN IF NOT EXISTS trail_points        JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS gear_essentials     TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS day_by_day          JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS hero_image_url      TEXT,
  ADD COLUMN IF NOT EXISTS campsites           JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS cost_estimate       JSONB,
  ADD COLUMN IF NOT EXISTS how_to_reach        TEXT,
  ADD COLUMN IF NOT EXISTS permit_details      TEXT,
  ADD COLUMN IF NOT EXISTS water_sources       TEXT,
  ADD COLUMN IF NOT EXISTS network_coverage    TEXT,
  ADD COLUMN IF NOT EXISTS nearest_hospital    TEXT,
  ADD COLUMN IF NOT EXISTS emergency_contacts  TEXT,
  ADD COLUMN IF NOT EXISTS source_url          TEXT,
  ADD COLUMN IF NOT EXISTS last_reviewed_at    TIMESTAMPTZ;

COMMENT ON COLUMN treks.trail_points IS
  'Array of {name, lat, lng, altitude_m?, day?, type?} — feeds TrekTrailMap. 4-8 points enough for the existing map renderer.';

COMMENT ON COLUMN treks.day_by_day IS
  'Array of {day, title, distance_km, altitude_m, hours, terrain, description, campsite, meals, water}';

COMMENT ON COLUMN treks.hero_image_url IS
  'Optional override for /images/destinations/{destination_id}.jpg fallback. R2 URL preferred.';

CREATE INDEX IF NOT EXISTS idx_treks_thin
  ON treks ((day_by_day = '[]'::jsonb), (trail_points = '[]'::jsonb))
  WHERE day_by_day = '[]'::jsonb OR trail_points = '[]'::jsonb;

-- 065_luxury_experiences.sql
--
-- New /luxury content surface. Mirrors the /festivals ship pattern: one table
-- backing a hub + per-entity detail pages, RLS-gated to published rows only.
--
-- Three categories: train | stay | itinerary
-- Three tiers: luxury | ultra_luxury | iconic
--
-- Every row carries an operator official_url + ≥2 independent sources
-- (anti-fabrication per CLAUDE.md). price_band_inr is text — never a
-- fabricated exact rate. translations JSONB carries Hindi parity (hi.{name,
-- tagline, editorial, signature_experience}).
--
-- RLS: anon/authenticated may SELECT only where published = true. Service
-- role bypasses RLS and handles all writes (same posture as festivals +
-- destination_alerts mig 060).
--
-- Apply with: npm run db:migrate

CREATE TABLE IF NOT EXISTS public.luxury_experiences (
  id                          TEXT PRIMARY KEY,
  name                        TEXT NOT NULL,
  category                    TEXT NOT NULL CHECK (category IN ('train', 'stay', 'itinerary')),
  tier                        TEXT NOT NULL CHECK (tier IN ('luxury', 'ultra_luxury', 'iconic')),
  state_id                    TEXT,
  primary_destination_id      TEXT REFERENCES public.destinations(id) ON DELETE SET NULL,
  secondary_destination_ids   TEXT[] DEFAULT '{}',
  operator                    TEXT,
  official_url                TEXT,
  hero_image_url              TEXT,
  tagline                     TEXT,
  editorial                   TEXT,
  signature_experience        TEXT,
  price_band_inr              TEXT,
  duration                    TEXT,
  best_months                 INTEGER[] DEFAULT '{}',
  route_legs                  JSONB DEFAULT '[]'::jsonb,
  included                    TEXT[] DEFAULT '{}',
  booking_links               JSONB DEFAULT '{}'::jsonb,
  sources                     JSONB DEFAULT '[]'::jsonb,
  voice_flags                 JSONB DEFAULT '{}'::jsonb,
  translations                JSONB DEFAULT '{}'::jsonb,
  published                   BOOLEAN NOT NULL DEFAULT false,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_luxury_category ON public.luxury_experiences(category);
CREATE INDEX IF NOT EXISTS idx_luxury_tier ON public.luxury_experiences(tier);
CREATE INDEX IF NOT EXISTS idx_luxury_state ON public.luxury_experiences(state_id);
CREATE INDEX IF NOT EXISTS idx_luxury_primary_dest ON public.luxury_experiences(primary_destination_id);
CREATE INDEX IF NOT EXISTS idx_luxury_published ON public.luxury_experiences(published);

ALTER TABLE public.luxury_experiences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_published_luxury" ON public.luxury_experiences;
CREATE POLICY "anon_read_published_luxury"
  ON public.luxury_experiences
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

COMMENT ON TABLE public.luxury_experiences IS
  'Ultra-luxury India trips — royal trains, iconic palace/heritage stays, curated multi-property itineraries. Backs /luxury hub + /luxury/[slug] detail pages.';

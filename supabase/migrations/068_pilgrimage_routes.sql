-- 068_pilgrimage_routes.sql
--
-- New /pilgrimage/[slug] content surface — structured, VERIFIED yatra/parikrama
-- routing for India's major pilgrimage circuits & shrines. Sidecar table (same
-- posture as park_safaris 067 backs /safari, destination_costs backs /cost).
--
-- WHY THIS EXISTS (validated 2026-06-07, data/research/how-to-reach-surface-
-- validation-2026-06-07.md): the opportunity scout found a 1,382-impression
-- "how-to-reach/distance" demand cluster. The generic distance SERP is a red
-- ocean (Maps + AI Overview, 64-83% zero-click). The ONE winnable slice for a
-- low-authority site is verified pilgrimage routing: incumbents (Sacred Yatra,
-- Yatra.com, tirthayatra.org) carry shrine-to-shrine distances / parikrama
-- lengths / step counts as UNVERIFIED operator-copy with no source attribution,
-- and AI Overviews are stitching those unverified snippets. NakshIQ's wedge =
-- the same anti-fabrication discipline as the POI / SOS / festival backfills:
-- every leg distance + step count carries an official govt/temple-trust source.
-- Bundles the existing moat (destination_months crowd scores + /cost) into a
-- pilgrim-planning answer no competitor offers.
--
-- Keyed by its OWN slug (not destination_id): a circuit (Char Dham, Ashtavinayak)
-- spans many shrines and may have no single dest row. destination_id is an
-- OPTIONAL link when the route maps cleanly to one dest (e.g. vaishno-devi→katra,
-- ashtavinayak→astavinayak-circuit). /pilgrimage/[slug] is a NEW route family, so
-- it passes through middleware untouched — the known-destination-slugs allowlist
-- only gates /destination/<slug> (Move-C lesson). Needs a sitemap entry, not an
-- allowlist refresh.
--
-- Anti-fabrication per CLAUDE.md: every row carries >=2 independent sources and a
-- last_verified stamp; honest scarcity ([] / null) preferred over a guessed km.
-- translations JSONB carries Hindi parity.
--
-- RLS: anon/authenticated may SELECT only where published = true. Service role
-- bypasses RLS and handles all writes (same posture as park_safaris 067).
--
-- Apply with: npm run db:migrate

CREATE TABLE IF NOT EXISTS public.pilgrimage_routes (
  slug                 TEXT PRIMARY KEY,
  name                 TEXT NOT NULL,
  destination_id       TEXT REFERENCES public.destinations(id) ON DELETE SET NULL, -- optional link
  kind                 TEXT NOT NULL DEFAULT 'circuit',  -- 'circuit' | 'shrine' | 'parikrama'
  region               TEXT,                              -- e.g. "Uttarakhand Himalaya"
  summary              TEXT,                              -- one-line what-it-is
  base_town            TEXT,                              -- start / staging town
  total_distance_km    NUMERIC,                           -- full circuit length (nullable)
  parikrama_km         NUMERIC,                           -- circumambulation length (parikramas)
  step_count           INTEGER,                           -- temple steps where relevant (Palitana, etc.)
  duration_days_min    INTEGER,
  duration_days_max    INTEGER,
  open_months          INTEGER[] NOT NULL DEFAULT '{}',   -- 1-12 the route/shrine is accessible
  best_months          INTEGER[] NOT NULL DEFAULT '{}',   -- 1-12 best window
  legs                 JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{seq,from,to,distance_km,mode,elevation_m,notes}] mode: road|rail|trek|pony|palki|heli|foot|ropeway|boat
  access_modes         JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{mode,detail}] foot/pony/palki/heli alternatives
  stages               JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{name,detail}] phased itinerary (optional)
  crowd_note           TEXT,
  cost_note            TEXT,
  pitfalls             JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{title,detail}] verified gotchas + workarounds
  sources              JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{label,url}] >=2 independent (govt/temple-trust)
  translations         JSONB NOT NULL DEFAULT '{}'::jsonb, -- {hi:{name,summary,base_town,legs[],access_modes[],stages[],crowd_note,cost_note,pitfalls[]}}
  last_verified        DATE,
  published            BOOLEAN NOT NULL DEFAULT false,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pilgrimage_routes_published ON public.pilgrimage_routes(published);
CREATE INDEX IF NOT EXISTS idx_pilgrimage_routes_destination ON public.pilgrimage_routes(destination_id);

ALTER TABLE public.pilgrimage_routes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_published_pilgrimage_routes" ON public.pilgrimage_routes;
CREATE POLICY "anon_read_published_pilgrimage_routes"
  ON public.pilgrimage_routes
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

COMMENT ON TABLE public.pilgrimage_routes IS
  'Structured VERIFIED yatra/parikrama routing for India pilgrimage circuits & shrines. Backs /pilgrimage/[slug]. Keyed by own slug; destination_id optional link. Every row: >=2 govt/temple-trust sources + last_verified (no fabricated distances/steps). RLS: anon reads published only.';

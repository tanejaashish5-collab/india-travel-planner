-- 067_park_safaris.sql
--
-- New /safari/[slug] content surface — a structured, verified safari-booking
-- guide for India's major tiger reserves & national parks. Sidecar table keyed
-- by destinations.id (same shape as destination_costs backs /cost/[slug]): the
-- page reads destinations + park_safaris and renders booking window, safari
-- types + fees, zones, how-to-book steps, and the documented booking pitfalls.
--
-- WHY THIS EXISTS (validated 2026-06-03): India's safari booking is fragmented
-- across 6+ separate government forest-dept portals (no APIs, OTP/login walls,
-- 45-90 day advance windows). The official portals are notoriously broken
-- ("worst website ever" — Ranthambore on Tripadvisor); core zones sell out
-- 60-90 days out. No all-India aggregator exists. This is the structured
-- *answer layer* (NakshIQ moat) — not a live-quota scraper.
--
-- Anti-fabrication per CLAUDE.md: every row carries the official_booking_url +
-- ≥2 independent sources. Fees are real and last_verified-stamped (they change
-- yearly — never a guessed number). Honest [] preferred over fabrication.
-- translations JSONB carries Hindi parity.
--
-- RLS: anon/authenticated may SELECT only where published = true. Service role
-- bypasses RLS and handles all writes (same posture as luxury_experiences 065
-- + festivals + destination_alerts 060).
--
-- Apply with: npm run db:migrate

CREATE TABLE IF NOT EXISTS public.park_safaris (
  destination_id          TEXT PRIMARY KEY REFERENCES public.destinations(id) ON DELETE CASCADE,
  park_full_name          TEXT NOT NULL,
  booking_authority       TEXT,                        -- e.g. "Rajasthan Forest Dept (FMDSS)"
  official_booking_url    TEXT,                         -- the .gov/.nic.in booking portal
  advance_booking_days    INTEGER,                      -- how far ahead online quota opens
  has_tatkal              BOOLEAN NOT NULL DEFAULT false, -- current-day / premium quota release exists
  booking_opens_note      TEXT,                         -- short note on slot-release cadence
  open_months             INTEGER[] NOT NULL DEFAULT '{}',  -- 1-12 the park gates are open
  closed_months           INTEGER[] NOT NULL DEFAULT '{}',  -- 1-12 closed (usually monsoon)
  best_months             INTEGER[] NOT NULL DEFAULT '{}',  -- 1-12 best wildlife sighting window
  id_required             TEXT[]  NOT NULL DEFAULT '{}',    -- accepted IDs (Indian vs foreigner)
  safari_types            JSONB   NOT NULL DEFAULT '[]'::jsonb, -- [{type,capacity,shifts[],price_inr_indian,price_inr_foreigner,notes}]
  zones                   JSONB   NOT NULL DEFAULT '[]'::jsonb, -- [{name,gate,vehicles,best_for,premium,notes}]
  booking_steps           JSONB   NOT NULL DEFAULT '[]'::jsonb, -- ["step 1", "step 2", ...]
  pitfalls                JSONB   NOT NULL DEFAULT '[]'::jsonb, -- [{title,detail}] — the verified gotchas + workarounds
  fees_note               TEXT,                         -- caveat on what fees do / don't include
  core_buffer_note        TEXT,                         -- core vs buffer zone explainer
  sources                 JSONB   NOT NULL DEFAULT '[]'::jsonb, -- [{label,url}] ≥2 independent
  translations            JSONB   NOT NULL DEFAULT '{}'::jsonb, -- {hi:{park_full_name,booking_authority,booking_opens_note,id_required[],safari_types[],zones[],booking_steps[],pitfalls[],fees_note,core_buffer_note}}
  last_verified           DATE,
  published               BOOLEAN NOT NULL DEFAULT false,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_park_safaris_published ON public.park_safaris(published);

ALTER TABLE public.park_safaris ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_published_park_safaris" ON public.park_safaris;
CREATE POLICY "anon_read_published_park_safaris"
  ON public.park_safaris
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

COMMENT ON TABLE public.park_safaris IS
  'Structured verified safari-booking guides for India tiger reserves & national parks. Backs /safari/[slug]. Keyed by destinations.id. Every row: official_booking_url + >=2 sources, fees last_verified-stamped (no fabrication). RLS: anon reads published only.';

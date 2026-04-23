-- 016_scenarios.sql
-- Edge-case scenario playbooks (Sprint 2 of NakshIQ v2 Gap-Fill plan).
--
-- Gap: destination pages surface warnings ("pass shuts Nov–Apr", "no
-- network", "AMS risk above 3500m") but never the follow-up — WHAT DO I DO
-- if the pass shuts mid-trip, if I get mild AMS, if network drops?
-- Serious planners want If-Then playbooks they can mentally pre-run before
-- leaving home.
--
-- Design choice: scenarios are MANY-TO-MANY with destinations. A single
-- "what-to-do-if-razdan-pass-shuts" scenario applies to 6 Kashmir dests;
-- a single "mild-AMS-first-response" scenario applies to every dest above
-- 3500m. This is the MOAT: one well-written scenario = depth for 30 dests.
--
-- Matching strategy:
--   * applies_to_destinations[] — explicit dest IDs (tight-match)
--   * applies_to_regions[]      — region IDs (broad-match)
--   * applies_to_altitude_min   — AMS, passes, weather scenarios
--   * applies_to_border         — LoC / LAC / sensitive-zone scenarios
-- The UI runs all 4 match tests and unions the results.
--
-- Rollback: DROP TABLE public.scenarios CASCADE.

CREATE TABLE IF NOT EXISTS public.scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'pass_closure',    -- road/pass mid-trip shutdowns
    'health',          -- AMS, stomach, injury
    'network',         -- phone/data/offline
    'logistics',       -- cash/UPI/ATM, checkout/checkin
    'safety',          -- protests, weather alerts, border incidents
    'money',           -- currency, cards, scams
    'weather'          -- sudden rain, cloudbursts, heat
  )),
  -- The If-Then payload. Prose-first so it renders as compelling editorial
  -- content, not a cold JSON dump.
  if_clause TEXT NOT NULL,
  then_clause TEXT NOT NULL,
  -- Optional steps array for ordered protocol ("1. Descend 500m. 2. Oxygen.
  -- 3. If no improve in 2hr, evacuate."). UI renders if present.
  steps JSONB,
  -- Companion links: related guides, nearby hospitals, official advisories.
  companion_links JSONB,
  -- Matching rules (see header comment).
  applies_to_destinations TEXT[] DEFAULT ARRAY[]::TEXT[],
  applies_to_regions TEXT[] DEFAULT ARRAY[]::TEXT[],
  applies_to_altitude_min INT,
  applies_to_altitude_max INT,
  applies_to_border TEXT CHECK (applies_to_border IN ('loc', 'lac', 'any', NULL)),
  severity TEXT DEFAULT 'warning' CHECK (severity IN ('info', 'warning', 'critical')),
  authored_by TEXT DEFAULT 'nakshiq-editorial',
  reviewed_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scenarios_category ON public.scenarios(category);
CREATE INDEX IF NOT EXISTS idx_scenarios_severity ON public.scenarios(severity);
CREATE INDEX IF NOT EXISTS idx_scenarios_dest_ids
  ON public.scenarios USING gin (applies_to_destinations);
CREATE INDEX IF NOT EXISTS idx_scenarios_region_ids
  ON public.scenarios USING gin (applies_to_regions);
CREATE INDEX IF NOT EXISTS idx_scenarios_altitude
  ON public.scenarios(applies_to_altitude_min, applies_to_altitude_max);

-- RLS: public-readable, service-role writes. Mirrors articles pattern.
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_scenarios" ON public.scenarios;
CREATE POLICY "public_read_scenarios" ON public.scenarios
  FOR SELECT TO anon, authenticated USING (true);

-- Keep updated_at honest.
CREATE OR REPLACE FUNCTION public.set_scenarios_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public, pg_catalog;

DROP TRIGGER IF EXISTS scenarios_updated_at ON public.scenarios;
CREATE TRIGGER scenarios_updated_at
  BEFORE UPDATE ON public.scenarios
  FOR EACH ROW
  EXECUTE FUNCTION public.set_scenarios_updated_at();

-- 015_depth_content.sql
-- Depth content schema (Sprint 2 of NakshIQ v2 Gap-Fill plan).
--
-- External teardown identified 4 missing layers on destination pages that
-- today scatter across confidence_cards text or exist nowhere:
--
-- 1. MICRO-ITINERARIES — "if you have 1/3/5 days here, do this" day-by-day.
--    Today the user must mentally stitch sub_destinations + POIs + infra
--    warnings into a plan. The schema lets editorial pre-bake that plan per
--    time budget.
--
-- 2. LOCAL LOGISTICS — taxi norms, check-in patterns, cash-vs-UPI reality,
--    shop hours, ATM reliability. Scattered today across confidence_cards
--    prose; consolidated here as a reusable checklist shape.
--
-- 3. PERSONA BLOCKS — per-destination prose explicitly addressed to
--    "if you're a family / biker / photographer / nomad / solo-f / elderly".
--    Today the kids-rating + solo-female-score are the only persona signals;
--    this adds prose treatment.
--
-- 4. BEST-FOR SEGMENTS — "best for photographers because ...",
--    "best for biker gangs because ..." — prose keyed by segment. Different
--    from persona_blocks: best_for is destination-pitching, persona_blocks
--    is destination-operating-for-a-persona.
--
-- Each is nullable so today's rows keep rendering. A pilot of 3 destinations
-- (Bomdila, Gurez, Spiti) ships with fully-populated values as the Sprint 2
-- proof point; backfill plan is Tier-1 (~40 hand) / Tier-2 (~200 Haiku) /
-- Tier-3 (~245 templated scenarios cover these without per-dest prose).
--
-- Expected shapes documented in COMMENT ON COLUMN below.
--
-- Rollback: DROP COLUMN each field — UI gates on presence so it's safe.

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS micro_itineraries JSONB;

COMMENT ON COLUMN destinations.micro_itineraries IS
$$Shape:
{
  "one_day": {
    "title": "One perfect day",
    "blocks": [
      {"time": "morning", "text": "…"},
      {"time": "midday", "text": "…"},
      {"time": "afternoon", "text": "…"},
      {"time": "evening", "text": "…"}
    ],
    "bad_weather_plan": "…"
  },
  "three_days": [
    {"day": 1, "headline": "…", "blocks": [...]},
    {"day": 2, "headline": "…", "blocks": [...]},
    {"day": 3, "headline": "…", "blocks": [...]}
  ],
  "five_days": [ {"day":1...}, ..., {"day":5...} ]
}$$;

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS local_logistics JSONB;

COMMENT ON COLUMN destinations.local_logistics IS
$$Shape:
{
  "taxi": "…",
  "checkin_norms": "…",
  "cash_vs_upi": "…",
  "atm_reliability": "…",
  "shop_hours": "…",
  "language_realities": "…",
  "internet_backup": "…"
}$$;

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS persona_blocks JSONB;

COMMENT ON COLUMN destinations.persona_blocks IS
$$Shape:
{
  "family": "…",       -- How this place works with kids
  "biker": "…",        -- Roads, fuel strategy, hazards
  "photographer": "…", -- Golden hours, spots, seasons
  "nomad": "…",        -- Wi-Fi, power, workspaces, stay length
  "solo_female": "…",  -- Specific extensions beyond solo_female_score
  "elderly": "…"       -- Low-altitude access, medical, pacing
}
Each value is a 2-4 sentence prose block. Keys omitted when not applicable.$$;

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS best_for_segments JSONB;

COMMENT ON COLUMN destinations.best_for_segments IS
$$Shape:
[
  {"segment": "photographers", "reason": "…"},
  {"segment": "biker gangs", "reason": "…"},
  {"segment": "honeymoons", "reason": "…"}
]
Array of {segment, reason} pairs. Kept open-vocab, UI renders whatever lands.$$;

-- Lightweight indexes for the EXISTS-style filters the UI will run
-- ("destinations with micro_itineraries populated" for curation dashboards).
CREATE INDEX IF NOT EXISTS idx_destinations_has_micro
  ON destinations ((micro_itineraries IS NOT NULL));
CREATE INDEX IF NOT EXISTS idx_destinations_has_logistics
  ON destinations ((local_logistics IS NOT NULL));
CREATE INDEX IF NOT EXISTS idx_destinations_has_personas
  ON destinations ((persona_blocks IS NOT NULL));

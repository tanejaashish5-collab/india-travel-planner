-- 044_get_trip_logistics_rpc.sql
-- One-shot logistics aggregator for the Trip Board.
--
-- Why an RPC: the Library + Cost Panel + Conflicts Panel each need a join
-- across 5+ tables (destinations + destination_costs + festivals +
-- kids_friendly + solo_female_score columns + destination_months +
-- confidence_cards). Doing it client-side requires 5 round-trips AND hits
-- the Supabase 1000-row cap on destination_months (5,892 rows). Server-side
-- aggregation pre-narrows by destination_id list, so the cap is irrelevant.
--
-- Caller batches by month: typical trips are within one month. For
-- cross-month trips (Aug 28 → Sep 5), call twice and merge.
--
-- Caller passes destination_id list as TEXT[] (destinations.id is TEXT, not
-- UUID — common gotcha caught in 2026-04-29 migration drift).

CREATE OR REPLACE FUNCTION get_trip_logistics(
  p_destination_ids TEXT[],
  p_travel_month INT
)
RETURNS TABLE (
  destination_id TEXT,
  name TEXT,
  state_id TEXT,
  elevation_m INT,
  difficulty TEXT,
  permit_type TEXT,
  permit_lead_days INT,
  permit_required TEXT,
  monthly_score INT,
  monthly_note TEXT,
  monthly_solo_female_score INT,
  annual_solo_female_score INT,
  kids_rating INT,
  kids_min_age INT,
  cost_budget_inr INT,
  cost_mid_inr INT,
  cost_lux_inr INT,
  festivals JSONB,
  road_condition TEXT,
  cell_network TEXT,
  medical_facility TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH
  base AS (
    SELECT
      d.id,
      d.name,
      d.state_id,
      d.elevation_m,
      d.difficulty,
      d.permit_type::TEXT AS permit_type,
      d.permit_lead_days,
      d.permit_required,
      d.cell_network,
      d.medical_facility,
      d.solo_female_score AS annual_sf
    FROM destinations d
    WHERE d.id = ANY(p_destination_ids)
  ),
  monthly AS (
    SELECT
      destination_id,
      score,
      note,
      solo_female_override
    FROM destination_months
    WHERE destination_id = ANY(p_destination_ids)
      AND month = p_travel_month
  ),
  costs AS (
    -- destination_costs has rows keyed by (category, season). There is no
    -- explicit `tier` column. We synthesize three tiers per destination:
    --   budget  = hostel-dorm     + food-per-day + transport-intercity
    --             (range_low_inr fallback to typical_inr)
    --   mid     = hotel-mid       + food-per-day + transport-taxi-day
    --             (typical_inr — the canonical mid)
    --   splurge = hotel-splurge   + food-per-day + transport-taxi-day
    --             (range_high_inr fallback to typical_inr)
    -- Per-day only — permit-fees + activity-sample are excluded as trip-once
    -- line items the Trip Board surfaces separately. Empty `months` array on
    -- a row means "applies year-round" — the cardinality fallback covers it.
    SELECT
      dc.destination_id,
      SUM(COALESCE(dc.range_low_inr, dc.typical_inr))
        FILTER (WHERE dc.category IN ('hostel-dorm', 'food-per-day', 'transport-intercity')) AS budget,
      SUM(dc.typical_inr)
        FILTER (WHERE dc.category IN ('hotel-mid', 'food-per-day', 'transport-taxi-day')) AS mid,
      SUM(COALESCE(dc.range_high_inr, dc.typical_inr))
        FILTER (WHERE dc.category IN ('hotel-splurge', 'food-per-day', 'transport-taxi-day')) AS lux
    FROM destination_costs dc
    WHERE dc.destination_id = ANY(p_destination_ids)
      AND (
        p_travel_month = ANY(dc.months)
        OR cardinality(dc.months) = 0
      )
    GROUP BY dc.destination_id
  ),
  fests AS (
    SELECT
      destination_id,
      jsonb_agg(jsonb_build_object(
        'name', name,
        'approximate_date', approximate_date,
        'description', description
      ) ORDER BY approximate_date NULLS LAST) AS festivals_json
    FROM festivals
    WHERE destination_id = ANY(p_destination_ids)
      AND month = p_travel_month
    GROUP BY destination_id
  ),
  kids AS (
    SELECT
      destination_id,
      rating,
      min_recommended_age
    FROM kids_friendly
    WHERE destination_id = ANY(p_destination_ids)
  ),
  reach AS (
    SELECT
      destination_id,
      COALESCE(reach->>'road_condition', reach->>'access') AS road_condition
    FROM confidence_cards
    WHERE destination_id = ANY(p_destination_ids)
  )
  SELECT
    b.id,
    b.name,
    b.state_id,
    b.elevation_m,
    b.difficulty,
    b.permit_type,
    b.permit_lead_days,
    b.permit_required,
    m.score,
    m.note,
    m.solo_female_override,
    b.annual_sf,
    k.rating,
    k.min_recommended_age,
    c.budget::INT,
    c.mid::INT,
    c.lux::INT,
    COALESCE(f.festivals_json, '[]'::JSONB),
    r.road_condition,
    b.cell_network,
    b.medical_facility
  FROM base b
  LEFT JOIN monthly m ON m.destination_id = b.id
  LEFT JOIN costs c   ON c.destination_id = b.id
  LEFT JOIN fests f   ON f.destination_id = b.id
  LEFT JOIN kids k    ON k.destination_id = b.id
  LEFT JOIN reach r   ON r.destination_id = b.id;
$$;

GRANT EXECUTE ON FUNCTION get_trip_logistics(TEXT[], INT) TO anon, authenticated;

COMMENT ON FUNCTION get_trip_logistics(TEXT[], INT) IS
  'Trip Board logistics aggregator. Joins destinations + destination_months + destination_costs + festivals + kids_friendly + confidence_cards.reach for a list of stops in a given month. Server-side join avoids the Supabase 1000-row cap on destination_months. Returns one row per requested destination_id (LEFT JOINs preserve dests with thin data).';

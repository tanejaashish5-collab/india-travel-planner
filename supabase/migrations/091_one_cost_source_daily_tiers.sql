-- APPLIED 2026-10-10 via scripts/run-sql-file.mjs. Not in schema_migrations.
-- 091: one cost source. Every per-day cost figure the site shows is derived from destination_costs (2026-10-10).
--
-- Why: destinations.daily_cost (the "What a day actually costs" box, /vs, /compare, the trip board library filter)
-- was hand-written and never updated when destination_costs was researched and calibrated (080-090), so a
-- destination page could say a mid-range day costs Rs 4,000 while its own cost page said Rs 2,700. The trip board
-- RPC (044) labelled a whole room plus a whole day cab "per person", roughly doubling the mid-range figure.
--
-- Fix: one SQL function, cost_day_tiers(), is the only place the per-day tier maths lives. It mirrors the cost
-- page calculator (apps/web/src/lib/trip-cost.ts) for two travellers:
--   budget  : dorm bed (else homestay) at range_low + food range_low + half a day cab range_low + half an activity
--   midrange: half a 3-star room (else homestay) at typical + food typical + half a day cab + half an activity
--   luxury  : half a splurge room (else 3-star, else homestay) at range_high + food range_high + half a cab + half an activity
-- Per person per day; intercity travel and permits are trip-once items and are excluded. Season = the season that
-- contains p_month for that destination (by its hotel-mid months), or shoulder when no month is given.
-- No-lodging places (stay rows deleted in 081-090) get no stay line: a visit there is a day trip.
--
-- Uses: get_trip_logistics (trip board) now reads cost_day_tiers for the travel month; destinations.daily_cost is
-- regenerated from cost_day_tiers (shoulder) and must be regenerated after any destination_costs change
-- (scripts/sync-daily-cost.mjs). Backup: backups.destinations_daily_cost_20261010.

BEGIN;

CREATE SCHEMA IF NOT EXISTS backups;
CREATE TABLE IF NOT EXISTS backups.destinations_daily_cost_20261010 AS
  SELECT id, daily_cost, content_reviewed_at FROM destinations;

CREATE OR REPLACE FUNCTION public.cost_day_tiers(p_destination_ids TEXT[], p_month INT DEFAULT NULL)
RETURNS TABLE (
  destination_id TEXT, season TEXT, has_stay BOOLEAN,
  b_stay INT, b_food INT, b_transport INT, b_activities INT, b_total INT,
  m_stay INT, m_food INT, m_transport INT, m_activities INT, m_total INT,
  l_stay INT, l_food INT, l_transport INT, l_activities INT, l_total INT
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH s AS (
    SELECT d.id,
      COALESCE((
        SELECT dc.season FROM destination_costs dc
        WHERE dc.destination_id = d.id AND p_month IS NOT NULL AND p_month = ANY(dc.months)
        ORDER BY (dc.category = 'hotel-mid') DESC, (dc.category = 'food-per-day') DESC
        LIMIT 1), 'shoulder') AS season
    FROM destinations d WHERE d.id = ANY(p_destination_ids)
  ),
  r AS (
    SELECT s.id, s.season, dc.category,
      COALESCE(NULLIF(dc.range_low_inr, 0), dc.typical_inr) AS lo,
      dc.typical_inr AS typ,
      COALESCE(NULLIF(dc.range_high_inr, 0), dc.typical_inr) AS hi
    FROM s JOIN destination_costs dc ON dc.destination_id = s.id AND dc.season = s.season
  ),
  p AS (
    SELECT id, season,
      max(lo)  FILTER (WHERE category = 'hostel-dorm')        AS dorm_lo,
      max(lo)  FILTER (WHERE category = 'homestay')           AS home_lo,
      max(typ) FILTER (WHERE category = 'homestay')           AS home_typ,
      max(hi)  FILTER (WHERE category = 'homestay')           AS home_hi,
      max(typ) FILTER (WHERE category = 'hotel-mid')          AS mid_typ,
      max(hi)  FILTER (WHERE category = 'hotel-mid')          AS mid_hi,
      max(hi)  FILTER (WHERE category = 'hotel-splurge')      AS spl_hi,
      max(lo)  FILTER (WHERE category = 'food-per-day')       AS food_lo,
      max(typ) FILTER (WHERE category = 'food-per-day')       AS food_typ,
      max(hi)  FILTER (WHERE category = 'food-per-day')       AS food_hi,
      max(lo)  FILTER (WHERE category = 'transport-taxi-day') AS taxi_lo,
      max(typ) FILTER (WHERE category = 'transport-taxi-day') AS taxi_typ,
      max(hi)  FILTER (WHERE category = 'transport-taxi-day') AS taxi_hi,
      max(lo)  FILTER (WHERE category = 'activity-sample')    AS act_lo,
      max(typ) FILTER (WHERE category = 'activity-sample')    AS act_typ,
      max(hi)  FILTER (WHERE category = 'activity-sample')    AS act_hi
    FROM r GROUP BY id, season
  ),
  t AS (
    SELECT id, season,
      round(COALESCE(dorm_lo, home_lo) / 10.0) * 10                          AS b_stay,
      round(food_lo / 10.0) * 10                                              AS b_food,
      round(taxi_lo / 2 / 10.0) * 10                                          AS b_transport,
      round(act_lo / 2 / 10.0) * 10                                           AS b_activities,
      round(COALESCE(mid_typ, home_typ) / 2 / 10.0) * 10                      AS m_stay,
      round(food_typ / 10.0) * 10                                             AS m_food,
      round(taxi_typ / 2 / 10.0) * 10                                         AS m_transport,
      round(act_typ / 2 / 10.0) * 10                                          AS m_activities,
      round(COALESCE(spl_hi, mid_hi, home_hi) / 2 / 10.0) * 10                AS l_stay,
      round(food_hi / 10.0) * 10                                              AS l_food,
      round(taxi_hi / 2 / 10.0) * 10                                          AS l_transport,
      round(act_hi / 2 / 10.0) * 10                                           AS l_activities
    FROM p
  )
  SELECT id, season, (b_stay IS NOT NULL OR m_stay IS NOT NULL),
    b_stay::INT, b_food::INT, b_transport::INT, b_activities::INT,
    (COALESCE(b_stay,0) + COALESCE(b_food,0) + COALESCE(b_transport,0) + COALESCE(b_activities,0))::INT,
    m_stay::INT, m_food::INT, m_transport::INT, m_activities::INT,
    (COALESCE(m_stay,0) + COALESCE(m_food,0) + COALESCE(m_transport,0) + COALESCE(m_activities,0))::INT,
    l_stay::INT, l_food::INT, l_transport::INT, l_activities::INT,
    (COALESCE(l_stay,0) + COALESCE(l_food,0) + COALESCE(l_transport,0) + COALESCE(l_activities,0))::INT
  FROM t;
$$;
GRANT EXECUTE ON FUNCTION public.cost_day_tiers(TEXT[], INT) TO anon, authenticated;
COMMENT ON FUNCTION public.cost_day_tiers(TEXT[], INT) IS
  'THE per-day cost tier maths (per person, two travellers sharing a room and a day cab). Mirrors apps/web/src/lib/trip-cost.ts. Used by get_trip_logistics and to regenerate destinations.daily_cost (091).';

-- Trip board: same tiers, for the travel month.
CREATE OR REPLACE FUNCTION get_trip_logistics(p_destination_ids TEXT[], p_travel_month INT)
RETURNS TABLE (
  destination_id TEXT, name TEXT, state_id TEXT, elevation_m INT, difficulty TEXT, permit_type TEXT,
  permit_lead_days INT, permit_required TEXT, monthly_score INT, monthly_note TEXT,
  monthly_solo_female_score INT, annual_solo_female_score INT, kids_rating INT, kids_min_age INT,
  cost_budget_inr INT, cost_mid_inr INT, cost_lux_inr INT, festivals JSONB,
  road_condition TEXT, cell_network TEXT, medical_facility TEXT
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $fn$
  WITH
  base AS (
    SELECT d.id, d.name, d.state_id, d.elevation_m, d.difficulty, d.permit_type::TEXT AS permit_type,
      d.permit_lead_days, d.permit_required, d.cell_network, d.medical_facility, d.solo_female_score AS annual_sf
    FROM destinations d WHERE d.id = ANY(p_destination_ids)
  ),
  monthly AS (
    SELECT destination_id, score, note, solo_female_override FROM destination_months
    WHERE destination_id = ANY(p_destination_ids) AND month = p_travel_month
  ),
  costs AS (
    SELECT destination_id, b_total AS budget, m_total AS mid, l_total AS lux
    FROM cost_day_tiers(p_destination_ids, p_travel_month)
  ),
  fests AS (
    SELECT destination_id, jsonb_agg(jsonb_build_object('name', name, 'approximate_date', approximate_date,
      'description', description) ORDER BY approximate_date NULLS LAST) AS festivals_json
    FROM festivals WHERE destination_id = ANY(p_destination_ids) AND month = p_travel_month
    GROUP BY destination_id
  ),
  kids AS (
    SELECT destination_id, rating, min_recommended_age FROM kids_friendly
    WHERE destination_id = ANY(p_destination_ids)
  ),
  reach AS (
    SELECT destination_id, COALESCE(reach->>'road_condition', reach->>'access') AS road_condition
    FROM confidence_cards WHERE destination_id = ANY(p_destination_ids)
  )
  SELECT b.id, b.name, b.state_id, b.elevation_m, b.difficulty, b.permit_type, b.permit_lead_days,
    b.permit_required, m.score, m.note, m.solo_female_override, b.annual_sf, k.rating, k.min_recommended_age,
    NULLIF(c.budget, 0), NULLIF(c.mid, 0), NULLIF(c.lux, 0),
    COALESCE(f.festivals_json, '[]'::JSONB), r.road_condition, b.cell_network, b.medical_facility
  FROM base b
  LEFT JOIN monthly m ON m.destination_id = b.id
  LEFT JOIN costs c   ON c.destination_id = b.id
  LEFT JOIN fests f   ON f.destination_id = b.id
  LEFT JOIN kids k    ON k.destination_id = b.id
  LEFT JOIN reach r   ON r.destination_id = b.id;
$fn$;
GRANT EXECUTE ON FUNCTION get_trip_logistics(TEXT[], INT) TO anon, authenticated;

-- destinations.daily_cost regenerated from the same function (shoulder season). Editorial notes without numbers
-- are kept after the basis line; notes that quote prices or ratios are dropped (they contradicted the ledger).
WITH t AS (
  SELECT * FROM cost_day_tiers((SELECT array_agg(DISTINCT destination_id) FROM destination_costs), NULL)
),
tier AS (
  SELECT t.destination_id,
    jsonb_strip_nulls(jsonb_build_object('stay', b_stay, 'food', b_food, 'transport', b_transport, 'activities', b_activities, 'total', b_total)) AS budget,
    jsonb_strip_nulls(jsonb_build_object('stay', m_stay, 'food', m_food, 'transport', m_transport, 'activities', m_activities, 'total', m_total)) AS midrange,
    jsonb_strip_nulls(jsonb_build_object('stay', l_stay, 'food', l_food, 'transport', l_transport, 'activities', l_activities, 'total', l_total)) AS luxury,
    has_stay
  FROM t WHERE m_total > 0
)
UPDATE destinations d SET
  daily_cost = jsonb_build_object(
    'note',
      CASE WHEN tier.has_stay
        THEN 'Per person per day for two travellers sharing a room and a day cab, in a shoulder-season month. Peak months cost more; the cost page has every month.'
        ELSE 'No lodging here: this is a day visit, so there is no stay line. Per person, for two travellers sharing a day cab, in a shoulder-season month.'
      END
      || CASE WHEN d.daily_cost->>'note' IS NOT NULL AND d.daily_cost->>'note' !~ '[0-9]' THEN ' ' || (d.daily_cost->>'note') ELSE '' END,
    'budget', tier.budget, 'midrange', tier.midrange, 'luxury', tier.luxury,
    'source', 'destination_costs via cost_day_tiers(), shoulder season, regenerated 2026-10-10'
  )
FROM tier WHERE tier.destination_id = d.id;

COMMIT;

-- APPLIED 2026-10-10 via scripts/run-sql-file.mjs. Not in schema_migrations.
-- 096: budget and luxury tier maths corrected (founder go, 2026-10-10). Mid-range unchanged.
--
-- Why: 091 copied the cost calculator's tiers, which had two errors the one-source pass exposed.
--   budget : a backpacker was charged half a hired day cab every day. Backpackers pool a cab or take a shared
--            jeep, so Spiti's backpacker day came out at Rs 1,950 against the Rs 800 every source quotes.
--            Now the cab is pooled four ways (taxi range_low / 4 per person).
--   luxury : the room was the splurge row's range_high, which is the most expensive suite in town and mostly
--            modelled, so a luxury day in Udaipur came out at Rs 26,200 a head. Now the splurge room's typical rate.
-- Mirrors apps/web/src/lib/trip-cost.ts (same commit). destinations.daily_cost is regenerated below; the block
-- between SYNC-START and SYNC-END is what scripts/sync-daily-cost.mjs reruns after every destination_costs write.
-- Backup of daily_cost before this change: backups.destinations_daily_cost_20261010b.

BEGIN;

CREATE TABLE IF NOT EXISTS backups.destinations_daily_cost_20261010b AS
  SELECT id, daily_cost FROM destinations;

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
      max(typ) FILTER (WHERE category = 'hotel-mid')          AS mid_typ,
      max(typ) FILTER (WHERE category = 'hotel-splurge')      AS spl_typ,
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
      round(taxi_lo / 4 / 10.0) * 10                                          AS b_transport,
      round(act_lo / 2 / 10.0) * 10                                           AS b_activities,
      round(COALESCE(mid_typ, home_typ) / 2 / 10.0) * 10                      AS m_stay,
      round(food_typ / 10.0) * 10                                             AS m_food,
      round(taxi_typ / 2 / 10.0) * 10                                         AS m_transport,
      round(act_typ / 2 / 10.0) * 10                                          AS m_activities,
      round(COALESCE(spl_typ, mid_typ, home_typ) / 2 / 10.0) * 10             AS l_stay,
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
  'THE per-day cost tier maths (per person, two travellers sharing a room; mid/luxury hire a day cab between them, backpackers pool one four ways). Mirrors apps/web/src/lib/trip-cost.ts. Used by get_trip_logistics and to regenerate destinations.daily_cost (091, 096).';

-- SYNC-START
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
),
kept AS (
  -- An editorial note that quotes no prices survives after the basis line. 091 already appended it once, so
  -- strip any earlier basis line before re-appending (this block reruns after every cost write).
  SELECT d.id,
    NULLIF(btrim(regexp_replace(COALESCE(b.daily_cost->>'note', d.daily_cost->>'note', ''),
      '^(Per person per day for two travellers.*?the cost page has every month\.|No lodging here: this is a day visit.*?(four ways|shoulder-season month)\.)', '')), '') AS note
  FROM destinations d LEFT JOIN backups.destinations_daily_cost_20261010 b ON b.id = d.id
)
UPDATE destinations d SET
  daily_cost = jsonb_build_object(
    'note',
      CASE WHEN tier.has_stay
        THEN 'Per person per day for two travellers sharing a room, in a shoulder-season month. Mid-range and luxury hire a day cab between the two; a backpacker pools a cab or shared jeep four ways. Peak months cost more; the cost page has every month.'
        ELSE 'No lodging here: this is a day visit, so there is no stay line. Per person, in a shoulder-season month; a backpacker pools a cab or shared jeep four ways.'
      END
      || CASE WHEN kept.note IS NOT NULL AND kept.note !~ '[0-9]' THEN ' ' || kept.note ELSE '' END,
    'budget', tier.budget, 'midrange', tier.midrange, 'luxury', tier.luxury,
    'source', 'destination_costs via cost_day_tiers(), shoulder season, regenerated 2026-10-10'
  )
FROM tier JOIN kept ON kept.id = tier.destination_id
WHERE tier.destination_id = d.id;
-- SYNC-END

COMMIT;

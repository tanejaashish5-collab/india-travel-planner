-- Per-destination content counts for scripts/cinematic-readiness.mjs, computed in
-- Postgres so the weekly check reads a handful of rows instead of paging ~13K rows
-- (destinations + destination_months + hidden_gems + local_eateries + stay picks)
-- over the metered REST API. only_gaps = true returns just the destinations that
-- miss the tier-A bar (tagline, why_special, 12 scored months, 12 month intros,
-- >=3 gems, >=5 eateries, >=3 stay picks), which is what the weekly job needs.
-- Added 2026-10-04 after 28 destinations sat below the bar unnoticed since May.
CREATE OR REPLACE FUNCTION public.cinematic_readiness_counts(only_gaps boolean DEFAULT false)
RETURNS TABLE (
  id text,
  name text,
  state_id text,
  has_tagline boolean,
  has_why_special boolean,
  months_scored integer,
  months_prose integer,
  gems integer,
  eats integer,
  stays integer,
  honest_scarcity jsonb
)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  WITH m AS (
    SELECT destination_id,
           count(*) FILTER (WHERE score IS NOT NULL)::int AS scored,
           count(*) FILTER (WHERE coalesce(trim(prose_lead), '') <> '')::int AS prose
    FROM destination_months GROUP BY destination_id
  ),
  g AS (SELECT near_destination_id AS did, count(*)::int AS n FROM hidden_gems WHERE near_destination_id IS NOT NULL GROUP BY 1),
  e AS (SELECT destination_id AS did, count(*)::int AS n FROM local_eateries GROUP BY 1),
  s AS (SELECT destination_id AS did, count(*)::int AS n FROM destination_stay_picks GROUP BY 1),
  r AS (
    SELECT d.id, d.name, d.state_id,
           coalesce(trim(d.tagline), '') <> '' AS has_tagline,
           coalesce(trim(d.why_special), '') <> '' AS has_why_special,
           coalesce(m.scored, 0) AS months_scored,
           coalesce(m.prose, 0) AS months_prose,
           coalesce(g.n, 0) AS gems,
           coalesce(e.n, 0) AS eats,
           coalesce(s.n, 0) AS stays,
           d.honest_scarcity
    FROM destinations d
    LEFT JOIN m ON m.destination_id = d.id
    LEFT JOIN g ON g.did = d.id
    LEFT JOIN e ON e.did = d.id
    LEFT JOIN s ON s.did = d.id
  )
  SELECT * FROM r
  WHERE NOT only_gaps
     OR NOT (has_tagline AND has_why_special AND months_scored = 12 AND months_prose = 12
             AND gems >= 3 AND eats >= 5 AND stays >= 3)
  ORDER BY id;
$$;

REVOKE ALL ON FUNCTION public.cinematic_readiness_counts(boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cinematic_readiness_counts(boolean) TO service_role;

-- 064_directors_cut_verdicts_view.sql
-- Backs the Act V "Director's Cut" mad-libs intake on the landing page.
--
-- For every (vibe, month) pair this returns the single top-scored
-- destination, so the month token in the intake sentence drives a real
-- verdict card for any of the 12 months. Previously the landing page
-- fetched only the current month per vibe, leaving the month token wired
-- to nothing — picking June still showed May's verdict.
--
-- Read-only view. security_invoker = true so it respects the caller's RLS
-- on the underlying tables (destinations / destination_months / states are
-- all already anon-readable).

CREATE OR REPLACE VIEW public.directors_cut_verdicts
  WITH (security_invoker = true) AS
WITH vibe_map(vibe, tag) AS (
  VALUES
    ('mountains', 'hill-station'),
    ('beaches',   'beach'),
    ('cities',    'city'),
    ('wildlife',  'wildlife'),
    ('heritage',  'heritage')
)
SELECT DISTINCT ON (vm.vibe, dm.month)
  vm.vibe          AS vibe,
  dm.month         AS month,
  dm.score         AS score,
  dm.why_go        AS why_go,
  d.id             AS destination_id,
  d.name           AS destination_name,
  d.tagline        AS tagline,
  s.name           AS state_name
FROM vibe_map vm
JOIN destinations       d  ON d.type @> ARRAY[vm.tag]
JOIN destination_months dm ON dm.destination_id = d.id
LEFT JOIN states        s  ON s.id = d.state_id
ORDER BY vm.vibe, dm.month, dm.score DESC, d.id;

GRANT SELECT ON public.directors_cut_verdicts TO anon, authenticated;

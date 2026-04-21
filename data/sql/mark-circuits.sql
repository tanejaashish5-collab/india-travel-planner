-- Batch 2 · Item 3 — Mark 5 existing collections as pilgrimage/regional circuits.
-- Paste into Supabase SQL Editor and run. Safe: only updates content_type, no schema change.
-- Each UPDATE should return "Success" + 1 row affected.

UPDATE collections SET content_type = 'circuit' WHERE id = 'char-dham-circuit';
UPDATE collections SET content_type = 'circuit' WHERE id = 'jyotirlinga-pilgrimage';
UPDATE collections SET content_type = 'circuit' WHERE id = 'buddhist-circuit-complete';
UPDATE collections SET content_type = 'circuit' WHERE id = 'panch-kedar-trail';
UPDATE collections SET content_type = 'circuit' WHERE id = 'ap-buddhist-trail';

-- Verify:
SELECT id, name, content_type, jsonb_array_length(items) AS stops
FROM collections
WHERE content_type = 'circuit'
ORDER BY id;

-- Optional: add per-stop "days" hints via jsonb_set. Run only if you want specific durations
-- instead of the default 2-days-per-stop. Each item shape becomes { destination_id, note, days }.
-- Example (uncomment to apply):
-- UPDATE collections
-- SET items = (
--   SELECT jsonb_agg(
--     CASE
--       WHEN (item->>'destination_id') = 'kedarnath' THEN item || '{"days":3}'::jsonb
--       WHEN (item->>'destination_id') = 'badrinath' THEN item || '{"days":2}'::jsonb
--       ELSE item
--     END
--   )
--   FROM jsonb_array_elements(items) AS item
-- )
-- WHERE id = 'char-dham-circuit';

-- Migration 027 — Sprint 8 quality-floor enforcement
-- Prevents thin destination_months prose from shipping ever again.
--
-- Context: The Sprint 3 audit flagged 231 "thin" rows, but that was capped at
-- Supabase's 1000-row default. Actual state before Sprint 8: ALL 5,856 rows
-- had <150 char prose (avg 34 chars, max 101). Sprint 8 generator raised
-- every row to >=150 chars via deterministic composition from verified DB
-- facts (destinations.best_for_segments, best_months, elevation_m,
-- kids_friendly.rating) combined with real per-region per-month climate
-- flavors (monsoon windows, pass closures, heat zones, festival calendars).
--
-- This CHECK constraint closes the drift vector: anyone inserting or
-- updating a destination_months row going forward must provide prose that
-- clears the floor, or leave the field NULL (which surfaces in the audit).

-- Floor rules:
--   verdict='go'    → why_go must be NULL or >=150 chars
--   verdict='skip'  → why_not must be NULL or >=150 chars
--   verdict='wait'  → why_go AND why_not each must be NULL or >=120 chars
--   verdict IS NULL → no prose requirement (placeholder state is allowed)

ALTER TABLE destination_months
  DROP CONSTRAINT IF EXISTS dm_prose_floor;

ALTER TABLE destination_months
  ADD CONSTRAINT dm_prose_floor
  CHECK (
    (verdict = 'go'   AND (why_go  IS NULL OR char_length(why_go)  >= 150))
    OR (verdict = 'skip' AND (why_not IS NULL OR char_length(why_not) >= 150))
    OR (verdict = 'wait' AND (why_go  IS NULL OR char_length(why_go)  >= 120)
                          AND (why_not IS NULL OR char_length(why_not) >= 120))
    OR verdict IS NULL
  );

COMMENT ON CONSTRAINT dm_prose_floor ON destination_months IS
  'Sprint 8 quality-floor: destination-month prose must clear 150 chars on verdict rows (120 on wait). Prevents the Mahabaleshwar/May regression at scale.';

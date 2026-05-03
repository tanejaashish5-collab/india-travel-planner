-- 043_destination_permit_structured.sql
-- Add structured permit fields to destinations alongside the legacy free-form
-- destinations.permit_required text. The Trip Board's in-board permit dialog
-- needs O(1) classification ("does this stop trigger an ILP/RAP popup?") that
-- a TEXT field can't deliver reliably. The rich detail (documents, cost,
-- processing time) stays in the existing `permits` table — we don't move it.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'permit_type'
  ) THEN
    CREATE TYPE permit_type AS ENUM ('none', 'ilp', 'rap', 'ilp_rap', 'pap');
  END IF;
END$$;

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS permit_type permit_type NOT NULL DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS permit_lead_days INT;

CREATE INDEX IF NOT EXISTS destinations_permit_type_idx
  ON destinations(permit_type) WHERE permit_type <> 'none';

-- Conservative backfill: anything with a non-null permit_required text is
-- flagged ILP by default; manual editorial review can refine to rap/ilp_rap/pap
-- via the admin surface (or direct SQL). Defaults stay 'none' for everything
-- that has no permit_required text. We never overwrite a non-default value if
-- the migration is re-run.

UPDATE destinations
SET permit_type = 'ilp_rap'
WHERE permit_type = 'none'
  AND permit_required IS NOT NULL
  AND (
       lower(permit_required) LIKE '%ilp%rap%'
    OR lower(permit_required) LIKE '%rap%ilp%'
    OR lower(permit_required) LIKE '%inner line%restricted area%'
    OR lower(permit_required) LIKE '%restricted area%inner line%'
  );

UPDATE destinations
SET permit_type = 'rap'
WHERE permit_type = 'none'
  AND permit_required IS NOT NULL
  AND (
       lower(permit_required) LIKE '%rap%'
    OR lower(permit_required) LIKE '%restricted area%'
  );

UPDATE destinations
SET permit_type = 'pap'
WHERE permit_type = 'none'
  AND permit_required IS NOT NULL
  AND (
       lower(permit_required) LIKE '%pap%'
    OR lower(permit_required) LIKE '%protected area%'
  );

UPDATE destinations
SET permit_type = 'ilp'
WHERE permit_type = 'none'
  AND permit_required IS NOT NULL
  AND (
       lower(permit_required) LIKE '%ilp%'
    OR lower(permit_required) LIKE '%inner line%'
  );

-- Lead-day default for restricted zones (most ILP/RAP issuances need 7-15 days
-- when applied online — Mechuka, Lunglei, Gurez, Tawang circuits). Editorial
-- can override per-dest. Don't override a non-null value if re-run.
UPDATE destinations
SET permit_lead_days = 7
WHERE permit_lead_days IS NULL
  AND permit_type IN ('ilp', 'rap', 'ilp_rap');

UPDATE destinations
SET permit_lead_days = 30
WHERE permit_lead_days IS NULL
  AND permit_type = 'pap';

COMMENT ON COLUMN destinations.permit_type IS
  'Structured permit classification for in-board Trip Board dialog. Rich detail (documents, cost, government link, pro tips) lives in permits table. Backfilled conservatively from permit_required text; refine via editorial review.';
COMMENT ON COLUMN destinations.permit_lead_days IS
  'Recommended days ahead of travel to start permit application. Defaults: 7 for ILP/RAP/ILP+RAP, 30 for PAP, NULL for none.';

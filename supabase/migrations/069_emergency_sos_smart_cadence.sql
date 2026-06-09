-- Migration 069: smart SOS re-verification cadence + security_invoker view.
--
-- Why: the emergency_sos staleness reminder (sos-verify-reminder cron +
-- audit-emergency-numbers.mjs + this view) used a single 30-day window for
-- EVERY row. But ~90% of rows carry only national-constant emergency numbers
-- (police 100/112, fire 101, ambulance 108, women 1091/181, road 1073,
-- tourist 1363) — MHA/Ministry-of-Tourism constants that do not change. The
-- uniform 30-day window meant the whole ~500-row table crossed "stale" the
-- same day every month and the weekly email re-listed almost everything —
-- crying wolf on constants that never decay, drowning the ~44 rows that hold
-- a genuinely volatile district desk / hospital line.
--
-- Fix: classify each row.
--   * "district-line" rows  — local_police_station or nearest_hospital holds
--     an actual phone (STD-hyphen, 10-digit mobile, or "Tel:") → re-check
--     window 45 days (these CAN change: POC desks move, hospitals relocate).
--   * "constants-only" rows — national constants + facility NAME only →
--     re-check window 180 days (the numbers are pan-India MHA constants;
--     re-confirmed against incredibleindia.gov.in/en/emergency + 112.gov.in).
-- A row is ALSO flagged if never verified, no verified_date, or no source_url.
--
-- The phone classifier deliberately excludes bare 6-digit PINCODES (e.g.
-- "...Dhoos, 274304") which an earlier "[0-9]{6,}" heuristic mis-read as a
-- desk line — it requires an STD-hyphen group, a 10-digit mobile, or "Tel:".
--
-- Also recreates the view with security_invoker=true to clear the Supabase
-- advisor ERROR `security_definer_view_public_emergency_sos_stale` (the view
-- needs no elevated privileges — it only reads emergency_sos, which the
-- caller can already read). No app code consumes the view; the cron + audit
-- script replicate this same classifier in JS.

DROP VIEW IF EXISTS emergency_sos_stale;

CREATE VIEW emergency_sos_stale
WITH (security_invoker = true) AS
SELECT
  destination_id,
  verified,
  verified_date,
  last_verified_attempt_at,
  source_url,
  (
    COALESCE(local_police_station, '') ~ '(Tel:|[0-9]{3,5}-[0-9]{5,8}|[6-9][0-9]{9})'
    OR COALESCE(nearest_hospital, '') ~ '(Tel:|[0-9]{3,5}-[0-9]{5,8}|[6-9][0-9]{9})'
  ) AS has_district_line,
  GREATEST(
    EXTRACT(EPOCH FROM (NOW() - COALESCE(verified_date::TIMESTAMPTZ, '1970-01-01'::TIMESTAMPTZ))) / 86400,
    EXTRACT(EPOCH FROM (NOW() - COALESCE(last_verified_attempt_at, '1970-01-01'::TIMESTAMPTZ))) / 86400
  )::INT AS days_since_check
FROM emergency_sos
WHERE
  verified IS NOT TRUE
  OR verified_date IS NULL
  OR source_url IS NULL
  OR source_url = ''
  OR (
    CASE
      WHEN (
        COALESCE(local_police_station, '') ~ '(Tel:|[0-9]{3,5}-[0-9]{5,8}|[6-9][0-9]{9})'
        OR COALESCE(nearest_hospital, '') ~ '(Tel:|[0-9]{3,5}-[0-9]{5,8}|[6-9][0-9]{9})'
      )
      THEN verified_date::DATE < (CURRENT_DATE - INTERVAL '45 days')
      ELSE verified_date::DATE < (CURRENT_DATE - INTERVAL '180 days')
    END
  );

COMMENT ON VIEW emergency_sos_stale IS
  'SOS rows needing re-verification: never verified / no date / no source, OR past the class-specific re-check window (district-line rows 45d, national-constants-only rows 180d). security_invoker so it runs with caller privileges. Cron + audit-script replicate this classifier in JS.';

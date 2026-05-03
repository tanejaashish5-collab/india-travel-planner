-- Migration 038: emergency_sos verifiable source links + staleness tracking.
--
-- Why: the existing emergency_sos rows carry phone numbers + a `verified`
-- boolean and `verified_date`, but no canonical SOURCE for the data. Users
-- (and search engines) get a green "Verified" stamp with no way to retrace
-- where the number came from. When numbers go stale (which they do — POC
-- desk numbers change every few months in some districts), we have no
-- automated signal to re-check.
--
-- Adds:
--  * source_url        — canonical public source (state govt website, IRDA,
--                        tourist board, hospital site). Rendered as a link
--                        beside "Verified on {date}" in the SOS section.
--  * source_label      — short human label for the source ("Tamil Nadu
--                        Police", "MoT Tourist Helpline"). Optional.
--  * last_verified_attempt_at  — last time the verification cron *tried*,
--                                regardless of outcome. Different from
--                                `verified_date` which is the last time a
--                                human (or auto-check) confirmed correct.
--                                If attempt > date by >30 days → stale.
--
-- These columns are nullable so existing rows continue to work; the SOS
-- component renders the source link only when present.

ALTER TABLE emergency_sos
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS source_label TEXT,
  ADD COLUMN IF NOT EXISTS last_verified_attempt_at TIMESTAMPTZ;

COMMENT ON COLUMN emergency_sos.source_url IS
  'Canonical public source URL the row was sourced/verified from. Rendered as a link beside Verified badge.';
COMMENT ON COLUMN emergency_sos.source_label IS
  'Short human label for source_url, e.g. "Tamil Nadu Police" or "MoT Helpline".';
COMMENT ON COLUMN emergency_sos.last_verified_attempt_at IS
  'Timestamp of the most recent verification ATTEMPT (cron or manual). Used to detect staleness independently of verified_date.';

-- Helper view: rows whose verification is stale (verified > 30 days ago OR
-- never verified). Used by /api/cron/sos-verify-reminder + the audit script.
CREATE OR REPLACE VIEW emergency_sos_stale AS
SELECT
  destination_id,
  verified,
  verified_date,
  last_verified_attempt_at,
  source_url,
  GREATEST(
    EXTRACT(EPOCH FROM (NOW() - COALESCE(verified_date::TIMESTAMPTZ, '1970-01-01'::TIMESTAMPTZ))) / 86400,
    EXTRACT(EPOCH FROM (NOW() - COALESCE(last_verified_attempt_at, '1970-01-01'::TIMESTAMPTZ))) / 86400
  )::INT AS days_since_check
FROM emergency_sos
WHERE
  verified IS NOT TRUE
  OR verified_date IS NULL
  OR verified_date::DATE < (CURRENT_DATE - INTERVAL '30 days');

COMMENT ON VIEW emergency_sos_stale IS
  'SOS rows that need re-verification: never verified, or last verified >30 days ago. Cron + audit script consumers.';

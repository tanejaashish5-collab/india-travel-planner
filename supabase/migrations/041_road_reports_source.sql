-- 041_road_reports_source.sql
-- Adds source attribution + last-reviewed stamp to road_reports so the
-- "verified {date} via {source}" pip can render beside every road claim.
-- Required by the weekly road-conditions-sweep cron (042+).

ALTER TABLE road_reports
  ADD COLUMN IF NOT EXISTS source_url       TEXT,
  ADD COLUMN IF NOT EXISTS source_label     TEXT,
  ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMPTZ;

COMMENT ON COLUMN road_reports.source_url IS
  'Public URL the editor used to verify this row. Examples: BRO Twitter, hp.gov.in PWD, jkhighways.com, kashmirobserver.net';

COMMENT ON COLUMN road_reports.source_label IS
  'Short display label shown to users (e.g. "BRO HQ Twitter", "HP PWD circular")';

CREATE INDEX IF NOT EXISTS idx_road_reports_stale
  ON road_reports (reported_at)
  WHERE status IN ('blocked', 'risky', 'closed');

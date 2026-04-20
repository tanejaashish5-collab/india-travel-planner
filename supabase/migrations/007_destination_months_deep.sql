-- 007_destination_months_deep.sql
--
-- Adds the editorial columns that the app already reads but that were
-- never committed in the migration history (prose_lead, prose_payoff,
-- who_should_go, who_should_avoid), plus four new depth columns that
-- power the SEO buildout for destination-month pages:
--
--   things_to_do[]         3–5 month-specific verbs, e.g. "ski the
--                          north bowl" / "walk the apple orchards"
--   festivals_this_month[] 0–3 verified festivals overlapping the
--                          month; empty array where nothing verified
--   pack_list[]            5–7 items tuned to altitude + month weather
--   go_or_skip_verdict     one sentence, 25–40 words, leads with
--                          "Go", "Skip", or "Mixed"
--
-- Also adds kids_friendly.family_verdict — a 2–3 sentence verdict
-- for top-100 family destinations (P2 of the SEO plan).
--
-- All columns nullable / defaulted so existing rows continue to
-- render untouched. Content backfill happens per tier via
-- scripts/enrich-destination-months-deep.mjs.

ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS prose_lead            TEXT,
  ADD COLUMN IF NOT EXISTS prose_payoff          TEXT,
  ADD COLUMN IF NOT EXISTS who_should_go         TEXT[],
  ADD COLUMN IF NOT EXISTS who_should_avoid      TEXT[],
  ADD COLUMN IF NOT EXISTS things_to_do          TEXT[],
  ADD COLUMN IF NOT EXISTS festivals_this_month  TEXT[],
  ADD COLUMN IF NOT EXISTS pack_list             TEXT[],
  ADD COLUMN IF NOT EXISTS go_or_skip_verdict    TEXT;

ALTER TABLE kids_friendly
  ADD COLUMN IF NOT EXISTS family_verdict        TEXT;

-- Partial index speeds up enrichment scripts that page through
-- "rows still missing a verdict at score N".
CREATE INDEX IF NOT EXISTS idx_destination_months_verdict_pending
  ON destination_months (score, month)
  WHERE go_or_skip_verdict IS NULL;

CREATE INDEX IF NOT EXISTS idx_kids_friendly_verdict_pending
  ON kids_friendly (rating)
  WHERE family_verdict IS NULL;

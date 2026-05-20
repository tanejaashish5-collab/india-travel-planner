-- Migration 062 — Hindi parity: translations JSONB on local_eateries,
-- local_stays, destination_stay_picks.
--
-- The north-to-south backfill shipped ~2,629 eateries, ~480 stays and
-- ~1,500 Editor's Picks — all English-only. On /hi/ destination pages the
-- eateries, stays and picks sections render English verbatim.
--
-- This adds a per-row `translations` JSONB column to each of the three
-- tables, mirroring the established `destinations.translations` convention:
--   - English stays in the main columns.
--   - Hindi (and any future locale) lives under translations.<locale>.<field>.
--   - The UI falls back to the English column when a translated field is
--     absent (see packages/shared/src/i18n.ts — t() and localizeRow()).
--
-- Shape per table (prose fields only — proper nouns / names / addresses
-- stay in Latin script and are NOT translated):
--   local_eateries:          { hi: { signature_dish, why_it_matters, insider_tip } }
--   local_stays:             { hi: { why_special, best_for } }
--   destination_stay_picks:  { hi: { why_nakshiq, signature_experience } }
--
-- Populated by scripts/apply-translations.mjs from agent-produced JSON
-- (no metered translation API — translations are generated in-session).
--
-- Apply with: npm run db:migrate  (or Supabase MCP apply_migration)

ALTER TABLE local_eateries
  ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE local_stays
  ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE destination_stay_picks
  ADD COLUMN IF NOT EXISTS translations jsonb NOT NULL DEFAULT '{}'::jsonb;

CREATE INDEX IF NOT EXISTS local_eateries_translations_gin
  ON local_eateries USING gin (translations jsonb_path_ops);

CREATE INDEX IF NOT EXISTS local_stays_translations_gin
  ON local_stays USING gin (translations jsonb_path_ops);

CREATE INDEX IF NOT EXISTS destination_stay_picks_translations_gin
  ON destination_stay_picks USING gin (translations jsonb_path_ops);

COMMENT ON COLUMN local_eateries.translations IS
  'Per-row i18n JSONB: { hi: { signature_dish, why_it_matters, insider_tip } }. '
  'Prose only — names/areas/dishes/addresses stay English. Falls back to English columns.';

COMMENT ON COLUMN local_stays.translations IS
  'Per-row i18n JSONB: { hi: { why_special, best_for } }. Falls back to English columns.';

COMMENT ON COLUMN destination_stay_picks.translations IS
  'Per-row i18n JSONB: { hi: { why_nakshiq, signature_experience } }. Falls back to English columns.';

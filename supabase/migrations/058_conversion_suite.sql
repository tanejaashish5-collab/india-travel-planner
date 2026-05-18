-- Migration 058 — Conversion suite (destination peak alerts + savelist tags).
--
-- Two changes ship together because they share the same conversion-funnel
-- ship (plan: ~/.claude/plans/ok-so-lets-get-bright-rainbow.md):
--
-- 1) destination_alerts: new table for per-destination peak-month alerts.
--    Separate from newsletter_subscribers because the consent semantic is
--    different — transactional, per-destination, lower-frequency — and the
--    unsubscribe is scoped (one destination, not the Window list). Cross-
--    referenced by lowercase email as soft key.
--
-- 2) newsletter_subscribers gains saved_destination_ids text[] (for the
--    save-list email-gate flow to remember which destinations the sub
--    saved at signup time) and tags text[] (cross-source analytics:
--    'window', 'savelist', 'peak_alerts' — answer "which lever brought
--    this sub?" without a join).
--
-- Apply with:
--   npm run db:migrate

-- ────────────────────────────────────────────────────────────────────
-- 1. destination_alerts
-- ────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS destination_alerts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email               text NOT NULL,
  destination_id      text NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  target_month_num    smallint NOT NULL CHECK (target_month_num BETWEEN 1 AND 12),
  source              text NOT NULL DEFAULT 'website',
  created_at          timestamptz NOT NULL DEFAULT now(),
  confirmed_at        timestamptz,
  unsubscribed_at     timestamptz,
  last_sent_at        timestamptz,
  confirmation_token  uuid NOT NULL DEFAULT gen_random_uuid(),
  unsubscribe_token   uuid NOT NULL DEFAULT gen_random_uuid(),
  CONSTRAINT destination_alerts_email_dest_uniq UNIQUE (email, destination_id)
);

COMMENT ON TABLE destination_alerts IS
  'Per-destination peak-month email alerts. Cron sends 3 weeks before each destination''s top-scored month. Cross-referenced to newsletter_subscribers by lowercase email; consent is separate.';

COMMENT ON COLUMN destination_alerts.target_month_num IS
  'Cached peak month at subscribe time (from destination_months MAX score). Cron filters on this for daily scan.';

COMMENT ON COLUMN destination_alerts.last_sent_at IS
  'Set when alert email sent. Cron re-eligibility check: last_sent_at IS NULL OR < NOW() - 300 days (annual repeat).';

-- Cron scan: WHERE target_month_num = X AND confirmed_at IS NOT NULL
--   AND unsubscribed_at IS NULL AND (last_sent_at IS NULL OR last_sent_at < NOW() - INTERVAL '300 days')
CREATE INDEX IF NOT EXISTS destination_alerts_cron_scan_idx
  ON destination_alerts (target_month_num, confirmed_at, unsubscribed_at, last_sent_at);

-- Email-based lookups (unsubscribe-all, rate-limit count)
CREATE INDEX IF NOT EXISTS destination_alerts_email_idx
  ON destination_alerts (email);

-- Token lookups (confirmation, unsubscribe)
CREATE INDEX IF NOT EXISTS destination_alerts_confirmation_token_idx
  ON destination_alerts (confirmation_token);
CREATE INDEX IF NOT EXISTS destination_alerts_unsubscribe_token_idx
  ON destination_alerts (unsubscribe_token);

-- ────────────────────────────────────────────────────────────────────
-- 2. newsletter_subscribers: saved_destination_ids + tags
-- ────────────────────────────────────────────────────────────────────

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS saved_destination_ids text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS tags                  text[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN newsletter_subscribers.saved_destination_ids IS
  'Destination IDs the subscriber had saved at signup time (save-list email-gate flow). Used to personalise the welcome email. Not synced after signup.';

COMMENT ON COLUMN newsletter_subscribers.tags IS
  'Source tags for cross-funnel analytics. Examples: window (organic newsletter form), savelist (save-3-destinations gate), peak_alerts (subscribed to one or more destination alerts).';

-- Tag analytics queries scan WHERE 'savelist' = ANY(tags)
CREATE INDEX IF NOT EXISTS newsletter_subscribers_tags_gin_idx
  ON newsletter_subscribers USING gin (tags);

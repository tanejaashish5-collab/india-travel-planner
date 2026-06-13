-- 071_social_dm_leads.sql
-- Inbound social-DM funnel: captures everyone who comments a keyword or DMs the
-- @nakshiq Instagram account in response to the autoposter's "Comment X — I'll DM
-- you the plan" CTAs, plus the email they hand over. Service-role writes only
-- (the /api/instagram/webhook route); no anon access.
--
-- Born 2026-06-13: the autoposter captions already promise an auto-DM
-- (comment_cta in nakshiq-autoposter/autoposter.py); this table is the
-- fulfilment + lead-capture layer behind that promise.

CREATE TABLE IF NOT EXISTS social_dm_leads (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform           TEXT NOT NULL DEFAULT 'instagram',
  ig_user_id         TEXT,                       -- sender's Instagram-scoped ID (IGSID)
  ig_username        TEXT,
  email              TEXT,                        -- captured on follow-up reply, nullable
  destination_id     TEXT REFERENCES destinations(id),
  theme              TEXT CHECK (theme IN ('score','stays','eateries','emergency','festival','weekend','infra','anti_trap')),
  raw_message        TEXT,                        -- the comment/DM text that triggered us (trimmed)
  source             TEXT NOT NULL DEFAULT 'dm_webhook',   -- dm_webhook | comment_webhook | manychat
  event_id           TEXT,                        -- comment id or message mid, for idempotency
  replied_at         TIMESTAMPTZ,                 -- when we sent the auto-DM
  confirmation_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(24), 'hex'),
  confirmed_at       TIMESTAMPTZ,                 -- email double-opt-in confirmation
  email_sent_at      TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Idempotency: never act on the same comment/message twice (webhooks retry).
CREATE UNIQUE INDEX IF NOT EXISTS uq_social_dm_leads_event
  ON social_dm_leads(platform, event_id) WHERE event_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_social_dm_leads_email   ON social_dm_leads(email)        WHERE email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_social_dm_leads_ig_user ON social_dm_leads(ig_user_id);
CREATE INDEX IF NOT EXISTS idx_social_dm_leads_dest    ON social_dm_leads(destination_id);

-- Service-role only. RLS on with no policy = anon/authenticated get nothing,
-- service-role bypasses RLS (matches destination_alerts pattern, migration 060).
ALTER TABLE social_dm_leads ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE social_dm_leads IS
  'Inbound Instagram comment/DM funnel leads. Written only by /api/instagram/webhook (service role). See nakshiq-autoposter/DM_RESPONDER_SETUP.md.';

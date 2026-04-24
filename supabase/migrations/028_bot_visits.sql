-- Sprint 7b — AI / search bot traffic logging.
-- Populated by middleware-detected bot hits via /api/log-bot-visit.
-- Surfaces on /methodology/freshness as proof of AI crawl activity.

CREATE TABLE IF NOT EXISTS bot_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bot_name text NOT NULL,
  path text NOT NULL,
  locale text,
  hit_at timestamptz NOT NULL DEFAULT now(),
  user_agent text
);

CREATE INDEX IF NOT EXISTS bot_visits_bot_hit_at_idx
  ON bot_visits (bot_name, hit_at DESC);

CREATE INDEX IF NOT EXISTS bot_visits_hit_at_idx
  ON bot_visits (hit_at DESC);

-- RLS — service role writes, anon/auth read-only (dashboard consumes it)
ALTER TABLE bot_visits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS bot_visits_read_all ON bot_visits;
CREATE POLICY bot_visits_read_all ON bot_visits
  FOR SELECT USING (true);

COMMENT ON TABLE bot_visits IS
  'Sprint 7b: AI/search bot hit log. Populated by middleware → /api/log-bot-visit. Retention: 90 days recommended.';

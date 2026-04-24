-- Sprint 7b — AI citation tracker.
-- Records whether NakshIQ is cited by AI answer engines for our 100 target
-- travel queries. Logged manually (weekly cadence) via scripts/track-ai-citations.mjs.

CREATE TABLE IF NOT EXISTS ai_citations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id text NOT NULL,
  engine text NOT NULL,  -- perplexity | chatgpt | aio | gemini | claude | copilot
  cited boolean NOT NULL,
  citation_url text,
  ran_at timestamptz NOT NULL DEFAULT now(),
  note text
);

CREATE INDEX IF NOT EXISTS ai_citations_query_engine_idx
  ON ai_citations (query_id, engine, ran_at DESC);

CREATE INDEX IF NOT EXISTS ai_citations_ran_at_idx
  ON ai_citations (ran_at DESC);

ALTER TABLE ai_citations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS ai_citations_read_all ON ai_citations;
CREATE POLICY ai_citations_read_all ON ai_citations
  FOR SELECT USING (true);

COMMENT ON TABLE ai_citations IS
  'Sprint 7b: weekly AI-citation tracker log. 100 prompts × 6 engines = ~600 checks/week, written via scripts/track-ai-citations.mjs.';

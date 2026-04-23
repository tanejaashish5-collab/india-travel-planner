-- 017_ops_reports.sql
-- Cron-job run log for the data-currency discipline layer.
--
-- Three scheduled jobs write here (nightly refresh-stay-picks, weekly
-- freshness-drift check, monthly news-sweep). The /methodology/freshness
-- page reads the latest row per job to render "last run" + summary.
--
-- Apply via Supabase dashboard SQL Editor.

CREATE TABLE IF NOT EXISTS ops_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job TEXT NOT NULL,
  run_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  alerts_count INT NOT NULL DEFAULT 0,
  ok BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_ops_reports_job_run_at
  ON ops_reports(job, run_at DESC);

ALTER TABLE ops_reports ENABLE ROW LEVEL SECURITY;

-- Public SELECT: the freshness page is public and reads the latest run
-- per job. Write is service-role only.
DROP POLICY IF EXISTS "Anon can read ops reports" ON ops_reports;
CREATE POLICY "Anon can read ops reports" ON ops_reports
  FOR SELECT TO anon USING (true);

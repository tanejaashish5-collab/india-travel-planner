-- 010_content_freshness.sql
-- Data-freshness mini-sprint.
--
-- Adds a separate `content_reviewed_at` timestamp distinct from `updated_at`.
-- `updated_at` is bumped on any row edit (tag change, image swap). It lies
-- about editorial freshness. `content_reviewed_at` is only bumped when a
-- human or AI pipeline explicitly reviews the row's accuracy.
--
-- Also adds the `user_suggestions` table that backs the "Suggest an edit" CTA
-- shipped in this sprint. Anon INSERT only (RLS); service-role reads.
--
-- Apply via Supabase dashboard SQL Editor (CLI migrations do not work in
-- this repo per migrations 007-009).

-- ============================================================
-- 1. Review timestamps
-- ============================================================

ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS content_reviewed_at TIMESTAMPTZ;

ALTER TABLE destination_months
  ADD COLUMN IF NOT EXISTS content_reviewed_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_destinations_content_reviewed_at
  ON destinations(content_reviewed_at NULLS FIRST);
CREATE INDEX IF NOT EXISTS idx_destination_months_content_reviewed_at
  ON destination_months(content_reviewed_at NULLS FIRST);

-- Seed: stamp today for rows touched in recent content-integrity work
-- (Batch 3 destinations + their months). Leaves the other ~480 destinations
-- NULL so the UI honestly shows "Review pending" until we review them.

UPDATE destinations
  SET content_reviewed_at = now()
  WHERE id IN (
    'kaza','chandratal','har-ki-doon','hemkund-sahib',
    'khardung-la','turtuk','dambuk','aalo'
  );

UPDATE destination_months
  SET content_reviewed_at = now()
  WHERE destination_id IN (
    'kaza','chandratal','har-ki-doon','hemkund-sahib',
    'khardung-la','turtuk','dambuk','aalo'
  );

-- ============================================================
-- 2. User-submitted suggestions
-- ============================================================

CREATE TABLE IF NOT EXISTS user_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_table TEXT NOT NULL,
  target_id TEXT,
  field_path TEXT,
  current_value TEXT,
  suggested_value TEXT,
  message TEXT,
  submitter_email TEXT,
  submitter_ip_hash TEXT,
  status TEXT DEFAULT 'new'
    CHECK (status IN ('new', 'triaged', 'applied', 'rejected', 'spam')),
  created_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_user_suggestions_status
  ON user_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_user_suggestions_target
  ON user_suggestions(target_table, target_id);
CREATE INDEX IF NOT EXISTS idx_user_suggestions_ip_recent
  ON user_suggestions(submitter_ip_hash, created_at DESC);

ALTER TABLE user_suggestions ENABLE ROW LEVEL SECURITY;

-- Anon can submit; no SELECT policy means only service-role reads.
DROP POLICY IF EXISTS "Anon can submit" ON user_suggestions;
CREATE POLICY "Anon can submit" ON user_suggestions
  FOR INSERT TO anon WITH CHECK (true);

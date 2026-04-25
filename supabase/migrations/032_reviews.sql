-- Sprint 20 — reviews table.
-- Used by destination/[id] page query + ReviewForm component since Sprint 11
-- but never migrated; the table may already exist (created ad-hoc via the
-- Supabase Studio UI when the form first tried to insert) without all the
-- moderation columns this sprint requires. So every column gets an idempotent
-- ALTER TABLE ADD COLUMN IF NOT EXISTS — works whether the table is
-- brand-new or pre-existing.

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

-- Columns (ADD COLUMN IF NOT EXISTS for every one, in case the table
-- pre-exists with a smaller column set).
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS destination_id text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS rating int;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS text text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS traveler_type text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS visit_month int;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS visit_year int;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reporter_name text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reporter_email text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS moderator_note text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS submitted_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS rejected_at timestamptz;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS submitter_ip_hash text;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- Foreign keys (drop+recreate to keep idempotent).
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_destination_id_fkey;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_destination_id_fkey
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE;

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_fkey;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Check constraints (drop+recreate so updates flow cleanly).
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_rating_check;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 1 AND 5);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_text_check;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_text_check CHECK (char_length(text) BETWEEN 50 AND 2000);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_traveler_type_check;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_traveler_type_check
  CHECK (traveler_type IN ('solo', 'couple', 'family', 'biker', 'backpacker', 'photographer', 'first-timer', 'senior'));

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_visit_month_check;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_visit_month_check
  CHECK (visit_month IS NULL OR visit_month BETWEEN 1 AND 12);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_visit_year_check;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_visit_year_check
  CHECK (visit_year IS NULL OR visit_year BETWEEN 2020 AND 2030);

ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_status_check;
ALTER TABLE reviews
  ADD CONSTRAINT reviews_status_check
  CHECK (status IN ('pending', 'approved', 'rejected'));

CREATE INDEX IF NOT EXISTS reviews_dest_status_idx ON reviews (destination_id, status);
CREATE INDEX IF NOT EXISTS reviews_status_submitted_idx ON reviews (status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS reviews_approved_at_idx ON reviews (approved_at DESC) WHERE status = 'approved';
CREATE INDEX IF NOT EXISTS reviews_user_idx ON reviews (user_id) WHERE user_id IS NOT NULL;

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS reviews_read_approved ON reviews;
CREATE POLICY reviews_read_approved ON reviews
  FOR SELECT USING (status = 'approved');

COMMENT ON TABLE reviews IS
  'Sprint 20: moderated UGC star reviews. Mirrors trip_reports moderation flow. Anon submission via /api/reviews with IP-hash rate-limiting; user_id optional (filled when submitter is authenticated).';

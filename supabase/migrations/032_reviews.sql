-- Sprint 20 — reviews table.
-- Used by destination/[id] page query + ReviewForm component since Sprint 11
-- but never migrated; would have failed in production once any visitor tried
-- to submit. Now formalised.

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id text NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  rating int NOT NULL,
  text text NOT NULL,
  traveler_type text NOT NULL,
  visit_month int,
  visit_year int,
  reporter_name text,
  reporter_email text,
  status text NOT NULL DEFAULT 'pending',
  moderator_note text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  rejected_at timestamptz,
  submitter_ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT reviews_rating_check CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT reviews_text_check CHECK (char_length(text) BETWEEN 50 AND 2000),
  CONSTRAINT reviews_traveler_type_check CHECK (
    traveler_type IN ('solo', 'couple', 'family', 'biker', 'backpacker', 'photographer', 'first-timer', 'senior')
  ),
  CONSTRAINT reviews_visit_month_check CHECK (visit_month IS NULL OR visit_month BETWEEN 1 AND 12),
  CONSTRAINT reviews_visit_year_check CHECK (visit_year IS NULL OR visit_year BETWEEN 2020 AND 2030),
  CONSTRAINT reviews_status_check CHECK (status IN ('pending', 'approved', 'rejected'))
);

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

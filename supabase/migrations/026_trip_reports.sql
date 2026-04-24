-- Sprint 6 — trip_reports table (UGC pre-work for Sprint 12).
-- Moderated: submissions land as 'new', approved → 'approved', bad → 'rejected'.

CREATE TABLE IF NOT EXISTS trip_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id text NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  visited_month int NOT NULL,
  visited_year int NOT NULL,
  reporter_name text,
  reporter_email text,
  reporter_location text,
  rating int NOT NULL,
  summary text NOT NULL,
  body text NOT NULL,
  highlights text[] DEFAULT ARRAY[]::text[],
  warnings text[] DEFAULT ARRAY[]::text[],
  image_urls text[] DEFAULT ARRAY[]::text[],
  status text NOT NULL DEFAULT 'new',
  moderator_note text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  rejected_at timestamptz,
  submitter_ip_hash text,

  CONSTRAINT trip_reports_month_check CHECK (visited_month BETWEEN 1 AND 12),
  CONSTRAINT trip_reports_year_check CHECK (visited_year BETWEEN 2024 AND 2030),
  CONSTRAINT trip_reports_rating_check CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT trip_reports_status_check CHECK (status IN ('new', 'approved', 'rejected')),
  CONSTRAINT trip_reports_summary_check CHECK (char_length(summary) BETWEEN 10 AND 200),
  CONSTRAINT trip_reports_body_check CHECK (char_length(body) BETWEEN 100 AND 5000)
);

CREATE INDEX IF NOT EXISTS trip_reports_dest_idx ON trip_reports (destination_id, status);
CREATE INDEX IF NOT EXISTS trip_reports_status_submitted_idx ON trip_reports (status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS trip_reports_approved_at_idx ON trip_reports (approved_at DESC) WHERE status = 'approved';

ALTER TABLE trip_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS trip_reports_read_approved ON trip_reports;
CREATE POLICY trip_reports_read_approved ON trip_reports
  FOR SELECT USING (status = 'approved');

COMMENT ON TABLE trip_reports IS
  'Sprint 6: moderated UGC trip reports. Only status=approved rows publicly readable.';

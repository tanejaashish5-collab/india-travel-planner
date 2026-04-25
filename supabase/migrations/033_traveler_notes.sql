-- Sprint 20 — traveler_notes table.
-- Used by destination/[id] page query since Sprint 11 + TravelerNotes component
-- but never migrated. Lighter than reviews (no star rating-as-summary; just
-- type-segmented one-liner experience notes + optional tip).

CREATE TABLE IF NOT EXISTS traveler_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id text NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  traveler_type text NOT NULL,
  note text NOT NULL,
  tip text,
  rating int,
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

  CONSTRAINT traveler_notes_traveler_type_check CHECK (
    traveler_type IN ('parent', 'biker', 'solo_female', 'backpacker', 'couple', 'senior', 'first_timer', 'photographer')
  ),
  CONSTRAINT traveler_notes_note_check CHECK (char_length(note) BETWEEN 30 AND 800),
  CONSTRAINT traveler_notes_tip_check CHECK (tip IS NULL OR char_length(tip) BETWEEN 10 AND 400),
  CONSTRAINT traveler_notes_rating_check CHECK (rating IS NULL OR rating BETWEEN 1 AND 5),
  CONSTRAINT traveler_notes_visit_month_check CHECK (visit_month IS NULL OR visit_month BETWEEN 1 AND 12),
  CONSTRAINT traveler_notes_visit_year_check CHECK (visit_year IS NULL OR visit_year BETWEEN 2020 AND 2030),
  CONSTRAINT traveler_notes_status_check CHECK (status IN ('pending', 'approved', 'rejected'))
);

CREATE INDEX IF NOT EXISTS traveler_notes_dest_status_idx ON traveler_notes (destination_id, status);
CREATE INDEX IF NOT EXISTS traveler_notes_status_submitted_idx ON traveler_notes (status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS traveler_notes_approved_at_idx ON traveler_notes (approved_at DESC) WHERE status = 'approved';

ALTER TABLE traveler_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS traveler_notes_read_approved ON traveler_notes;
CREATE POLICY traveler_notes_read_approved ON traveler_notes
  FOR SELECT USING (status = 'approved');

COMMENT ON TABLE traveler_notes IS
  'Sprint 20: type-segmented traveler experience notes. Used by destination page "What Travelers Say" widget. Public submission flow added Sprint 21.';

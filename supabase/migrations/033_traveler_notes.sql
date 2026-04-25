-- Sprint 20 — traveler_notes table.
-- Same defensive pattern as 032_reviews: table may pre-exist via Studio UI
-- without all the moderation columns. Every column gets ADD COLUMN IF NOT
-- EXISTS so the migration is idempotent across blank + partial-existing DBs.

CREATE TABLE IF NOT EXISTS traveler_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS destination_id text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS traveler_type text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS note text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS tip text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS rating int;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS visit_month int;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS visit_year int;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS reporter_name text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS reporter_email text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS moderator_note text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS submitted_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS rejected_at timestamptz;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS submitter_ip_hash text;
ALTER TABLE traveler_notes ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- Drop NOT NULL on columns that should be nullable per the new schema.
-- Same defensive pattern as 032_reviews.
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN tip DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN rating DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN visit_month DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN visit_year DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN reporter_name DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN reporter_email DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN moderator_note DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN approved_at DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN rejected_at DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE traveler_notes ALTER COLUMN submitter_ip_hash DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_destination_id_fkey;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_destination_id_fkey
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE;

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_traveler_type_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_traveler_type_check
  CHECK (traveler_type IN ('parent', 'biker', 'solo_female', 'backpacker', 'couple', 'senior', 'first_timer', 'photographer'));

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_note_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_note_check
  CHECK (char_length(note) BETWEEN 30 AND 800);

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_tip_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_tip_check
  CHECK (tip IS NULL OR char_length(tip) BETWEEN 10 AND 400);

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_rating_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_rating_check
  CHECK (rating IS NULL OR rating BETWEEN 1 AND 5);

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_visit_month_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_visit_month_check
  CHECK (visit_month IS NULL OR visit_month BETWEEN 1 AND 12);

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_visit_year_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_visit_year_check
  CHECK (visit_year IS NULL OR visit_year BETWEEN 2020 AND 2030);

ALTER TABLE traveler_notes DROP CONSTRAINT IF EXISTS traveler_notes_status_check;
ALTER TABLE traveler_notes
  ADD CONSTRAINT traveler_notes_status_check
  CHECK (status IN ('pending', 'approved', 'rejected'));

CREATE INDEX IF NOT EXISTS traveler_notes_dest_status_idx ON traveler_notes (destination_id, status);
CREATE INDEX IF NOT EXISTS traveler_notes_status_submitted_idx ON traveler_notes (status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS traveler_notes_approved_at_idx ON traveler_notes (approved_at DESC) WHERE status = 'approved';

ALTER TABLE traveler_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS traveler_notes_read_approved ON traveler_notes;
CREATE POLICY traveler_notes_read_approved ON traveler_notes
  FOR SELECT USING (status = 'approved');

COMMENT ON TABLE traveler_notes IS
  'Sprint 20: type-segmented traveler experience notes. Used by destination page "What Travelers Say" widget. Public submission flow added Sprint 21.';

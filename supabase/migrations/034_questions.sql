-- Sprint 21 — questions table for the public Q&A board.
-- Same defensive pattern as 032_reviews / 033_traveler_notes:
-- table may pre-exist via Studio UI without all the columns we now require,
-- so every column gets ADD COLUMN IF NOT EXISTS, every constraint is
-- drop+recreate, every NOT NULL relax is wrapped in a DO block with
-- EXCEPTION handlers. Idempotent across blank + partial-existing DBs.

CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

ALTER TABLE questions ADD COLUMN IF NOT EXISTS destination_id text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS answer text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS traveler_type text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS submitter_name text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS submitter_email text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS submitter_ip_hash text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS editor_handle text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS moderator_note text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS submitted_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE questions ADD COLUMN IF NOT EXISTS answered_at timestamptz;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS rejected_at timestamptz;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

-- Drop NOT NULL on columns that should be nullable per the new schema.
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN answer DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN traveler_type DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN submitter_name DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN submitter_email DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN submitter_ip_hash DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN editor_handle DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN moderator_note DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN answered_at DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE questions ALTER COLUMN rejected_at DROP NOT NULL;
EXCEPTION WHEN undefined_column OR invalid_table_definition THEN NULL;
END $$;

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_destination_id_fkey;
ALTER TABLE questions
  ADD CONSTRAINT questions_destination_id_fkey
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE;

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_slug_unique;
ALTER TABLE questions
  ADD CONSTRAINT questions_slug_unique UNIQUE (slug);

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_question_check;
ALTER TABLE questions
  ADD CONSTRAINT questions_question_check
  CHECK (char_length(question) BETWEEN 30 AND 300);

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_answer_check;
ALTER TABLE questions
  ADD CONSTRAINT questions_answer_check
  CHECK (answer IS NULL OR char_length(answer) BETWEEN 100 AND 3000);

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_category_check;
ALTER TABLE questions
  ADD CONSTRAINT questions_category_check
  CHECK (category IN ('safety', 'cost', 'permits', 'family', 'transport', 'timing', 'practical', 'weather'));

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_traveler_type_check;
ALTER TABLE questions
  ADD CONSTRAINT questions_traveler_type_check
  CHECK (traveler_type IS NULL OR traveler_type IN ('solo', 'couple', 'family', 'biker', 'backpacker', 'photographer', 'first-timer', 'senior'));

ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_status_check;
ALTER TABLE questions
  ADD CONSTRAINT questions_status_check
  CHECK (status IN ('pending', 'answered', 'rejected'));

CREATE INDEX IF NOT EXISTS questions_dest_status_idx ON questions (destination_id, status);
CREATE INDEX IF NOT EXISTS questions_status_submitted_idx ON questions (status, submitted_at DESC);
CREATE INDEX IF NOT EXISTS questions_answered_at_idx ON questions (answered_at DESC) WHERE status = 'answered';

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS questions_read_answered ON questions;
CREATE POLICY questions_read_answered ON questions
  FOR SELECT USING (status = 'answered');

COMMENT ON TABLE questions IS
  'Sprint 21: moderated public Q&A. Travelers submit questions per destination; editor curates a single authoritative answer. Rendered at /destination/[id]/q/[slug] with FAQPage + Article JSON-LD for AI citation surface (Perplexity, ChatGPT Search, Google AIO).';

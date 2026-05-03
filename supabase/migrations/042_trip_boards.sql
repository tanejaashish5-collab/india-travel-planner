-- 042_trip_boards.sql
-- Hybrid persistence for the redesigned Trip Board.
-- Anonymous users keep localStorage["tripBoard"]; signed-in users sync to this table.
-- Last-write-wins on updated_at. Public read-only view via share_token.

CREATE TABLE IF NOT EXISTS trip_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payload JSONB NOT NULL DEFAULT '{}',
  share_token TEXT UNIQUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS trip_boards_user_idx ON trip_boards(user_id);
CREATE INDEX IF NOT EXISTS trip_boards_share_token_idx ON trip_boards(share_token) WHERE share_token IS NOT NULL;

-- One active board per user. Sync upserts on user_id; new boards via UI duplication
-- can later add a `name` column + drop this constraint, but v1 keeps it simple.
CREATE UNIQUE INDEX IF NOT EXISTS trip_boards_user_unique ON trip_boards(user_id);

ALTER TABLE trip_boards ENABLE ROW LEVEL SECURITY;

-- Owner: full access
DROP POLICY IF EXISTS trip_boards_owner_all ON trip_boards;
CREATE POLICY trip_boards_owner_all ON trip_boards
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Anyone with the share_token can read (used by /trip/share/[token] page).
-- We expose this via a SECURITY DEFINER function rather than a public SELECT
-- policy so that listing the table without a token is impossible.
CREATE OR REPLACE FUNCTION get_shared_trip_board(token TEXT)
RETURNS TABLE (
  id UUID,
  payload JSONB,
  updated_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, payload, updated_at
  FROM trip_boards
  WHERE share_token = token
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION get_shared_trip_board(TEXT) TO anon, authenticated;

COMMENT ON TABLE trip_boards IS
  'Per-user persisted Trip Board. payload jsonb shape: {name,month,travelers,budget,items[],stops[],createdAt,version}. items[] is the legacy v1 shape; stops[] is the v2 shape with startDay (year-band drag). Migration logic in apps/web/src/lib/trip-storage.ts.';

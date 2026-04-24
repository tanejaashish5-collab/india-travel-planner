-- Sprint 6 — authors table + Person schema fields.
-- Closes the E-E-A-T gap all 4 research reports flagged: "no named author
-- bylines anywhere" (R1 §2.1/§4.2, R2 §2, R4 §7.3). Each author row maps
-- 1:1 to a Person JSON-LD entity with sameAs array for external authority
-- signals (LinkedIn, Wikidata, Muck Rack, Twitter).

CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  short_bio text,
  photo_url text,
  email text,
  linkedin_url text,
  twitter_url text,
  muck_rack_url text,
  wikidata_qid text,
  same_as text[] DEFAULT ARRAY[]::text[],
  knows_about text[] DEFAULT ARRAY[]::text[],
  home_location text,
  created_at timestamptz NOT NULL DEFAULT now(),
  content_reviewed_at timestamptz,

  CONSTRAINT authors_role_check CHECK (role IN ('editor', 'contributor', 'expert', 'family'))
);

CREATE INDEX IF NOT EXISTS authors_slug_idx ON authors (slug);
CREATE INDEX IF NOT EXISTS authors_role_idx ON authors (role);

ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS authors_read_all ON authors;
CREATE POLICY authors_read_all ON authors
  FOR SELECT USING (true);

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES authors(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS articles_author_idx ON articles (author_id);

COMMENT ON TABLE authors IS
  'Sprint 6: named author registry. Feeds Person JSON-LD on articles + /about/team masthead.';

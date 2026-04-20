-- 008_articles.sql
--
-- Creates the `articles` table that the existing blog scaffold
-- already reads from. Prior to this migration the blog index and
-- [slug] route queried a non-existent table; zero rows had ever
-- been inserted. This migration is a prerequisite for P4 of the
-- SEO plan (3 strategic verdict/comparison blog posts).
--
-- Schema matches what apps/web/src/app/[locale]/blog/[slug]/page.tsx
-- and components/blog-article.tsx already expect, plus a 'verdict'
-- category for "Is X worth visiting?" style posts.

CREATE TABLE IF NOT EXISTS articles (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  subtitle          TEXT,
  category          TEXT NOT NULL CHECK (category IN
                      ('best-time','comparison','guide','data-story','viral','verdict')),
  excerpt           TEXT,
  content           TEXT,              -- markdown body
  reading_time      INT,
  cover_image_url   TEXT,
  tags              TEXT[],
  featured          BOOLEAN NOT NULL DEFAULT FALSE,
  depth             TEXT CHECK (depth IN ('deep-dive','brief')),
  seo_title         TEXT,
  seo_description   TEXT,
  destinations      JSONB,             -- array of destination IDs to cross-link
  callouts          JSONB,             -- [{type:'stat'|'pull_quote'|'verdict', text, label}]
  published_at      TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_published
  ON articles (published_at DESC)
  WHERE published_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_articles_category
  ON articles (category);

CREATE INDEX IF NOT EXISTS idx_articles_featured
  ON articles (featured)
  WHERE featured = TRUE;

-- RLS: public can read published articles only.
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "articles_public_read" ON articles;
CREATE POLICY "articles_public_read" ON articles
  FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL AND published_at <= NOW());

-- Trigger to keep updated_at fresh on any change.
CREATE OR REPLACE FUNCTION set_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_articles_updated_at ON articles;
CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION set_articles_updated_at();

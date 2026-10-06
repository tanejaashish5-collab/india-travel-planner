-- 079: dedicated village pages (/destination/<parent>/<slug>), 2026-10-06.
-- A sub_destination row stays a card on its parent page; when `page` is filled and
-- `page_published_at` is set it ALSO gets its own URL. Additive only: no existing
-- column or row changes, so this is safe to apply before any page is published.
--   slug               URL segment, unique per parent (ids like "shimla-mashobra"
--                      or "tosh-kheerganga" are not clean URLs)
--   page               verified research payload (data/research/villages/*.json shape)
--   page_published_at  null = card only; set = page live + in sitemap
--   page_reviewed_at   last time every fact was re-verified (the "VERIFIED <month>" stamp)
ALTER TABLE sub_destinations
  ADD COLUMN IF NOT EXISTS slug TEXT,
  ADD COLUMN IF NOT EXISTS page JSONB,
  ADD COLUMN IF NOT EXISTS page_published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS page_reviewed_at TIMESTAMPTZ;

CREATE UNIQUE INDEX IF NOT EXISTS sub_destinations_parent_slug_uq
  ON sub_destinations (parent_id, slug) WHERE slug IS NOT NULL;

-- A village slug must never shadow a month page or the share form under the same parent.
ALTER TABLE sub_destinations DROP CONSTRAINT IF EXISTS sub_destinations_slug_not_reserved;
ALTER TABLE sub_destinations ADD CONSTRAINT sub_destinations_slug_not_reserved CHECK (
  slug IS NULL OR (
    slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    AND slug NOT IN ('january','february','march','april','may','june','july','august',
                     'september','october','november','december','share','q')
  )
);

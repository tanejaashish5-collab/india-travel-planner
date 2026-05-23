-- 066_luxury_hero_video_slug.sql
--
-- Adds hero_video_slug to luxury_experiences. The slug matches a file in
-- the nakshiq-videos R2 bucket (e.g. 'palace-on-wheels-exterior' →
-- pub-bcda9bac…r2.dev/palace-on-wheels-exterior.mp4). Renders via
-- videoSrc(slug) from lib/video-url.ts so cache-busting via
-- VIDEO_CACHE_VERSION works automatically.
--
-- Why a slug and not the full URL: the URL pattern is centralised in
-- lib/video-url.ts. Storing slugs keeps the DB free of base-URL coupling
-- so the bucket can move without a data migration.

ALTER TABLE public.luxury_experiences
  ADD COLUMN IF NOT EXISTS hero_video_slug TEXT;

COMMENT ON COLUMN public.luxury_experiences.hero_video_slug IS
  'Slug matching a file in the nakshiq-videos R2 bucket (no extension). Rendered via videoSrc() in lib/video-url.ts. NULL = render text-only hero.';

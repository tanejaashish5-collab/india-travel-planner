-- 053_treks_video_id.sql
-- Add cover video reference for trek records.
--
-- Visual production strategy Phase 2 (plan: visual-production-strategy 2026-05-11):
-- the /treks landing + Atlas mentions inside cinematic destinations currently
-- have a `hero_image_url` column but no video. Adding `video_id TEXT` so the
-- existing `videoSrc(id)` helper can resolve trek hero videos exactly like
-- destinations and collections. Naming convention: `trek-<slug>.mp4`.
--
-- Nullable + no default — backfilled per-trek as Cowork renders each one.

ALTER TABLE treks
  ADD COLUMN IF NOT EXISTS video_id TEXT;

COMMENT ON COLUMN treks.video_id IS
  'Cloudflare R2 video stem (without .mp4 / convention: trek-<slug>). Resolved by videoSrc(id) in apps/web/src/lib/video-src.ts.';

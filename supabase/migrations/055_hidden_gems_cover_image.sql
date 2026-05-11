-- 055_hidden_gems_cover_image.sql
-- Add cover image reference for hidden gem records.
--
-- Visual production strategy Phase 4 (plan: visual-production-strategy 2026-05-11):
-- Hidden gems surface inside cinematic Act VI as italic bone-color text cards.
-- A small editorial image (200×200 square or 16:9 landscape) per gem replaces
-- the largest text block with photography — and image render is cheaper than
-- video, so the same Cowork capacity covers ~5x more rows.
--
-- Image, not video (videos are reserved for hero moments). Naming convention:
--   gem-<slug>.jpg  (uploaded to /images/destinations/ or its own bucket)
--
-- Nullable + no default — backfilled per gem, prioritising cinematic-opted-in
-- destinations.

ALTER TABLE hidden_gems
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT;

COMMENT ON COLUMN hidden_gems.cover_image_url IS
  'Editorial cover image for hidden gem (R2 / public path). Convention: gem-<slug>.jpg. Rendered inside cinematic Act VI atlas.';

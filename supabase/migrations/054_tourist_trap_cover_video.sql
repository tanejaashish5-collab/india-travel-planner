-- 054_tourist_trap_cover_video.sql
-- Add side-by-side editorial media (trap chaos + alternative quiet) to
-- tourist_trap_alternatives.
--
-- Visual production strategy Phase 3 (plan: visual-production-strategy 2026-05-11):
-- /tourist-traps is the strongest editorial brand moment but is currently
-- text-only. Two new columns let us render a paired video card —
-- `cover_video_trap` = the chaos at the headliner, `cover_video_alt` = the
-- quieter alternative just down the road. Naming convention:
--   trap-<slug>.mp4  ·  alt-<slug>.mp4
--
-- Both nullable + no default — pair backfilled per trap as Cowork renders.

ALTER TABLE tourist_trap_alternatives
  ADD COLUMN IF NOT EXISTS cover_video_trap TEXT,
  ADD COLUMN IF NOT EXISTS cover_video_alt  TEXT;

COMMENT ON COLUMN tourist_trap_alternatives.cover_video_trap IS
  'R2 video stem for the headliner trap (e.g., Mall Road chaos). Convention: trap-<slug>.';
COMMENT ON COLUMN tourist_trap_alternatives.cover_video_alt IS
  'R2 video stem for the quieter alternative (e.g., Old Manali). Convention: alt-<slug>.';

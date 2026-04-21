-- 011_content_reviewed_bootstrap.sql
--
-- One-time backfill. Every destination + destination_month row currently
-- NULL on content_reviewed_at is back-filled with updated_at (destinations)
-- or the parent destination's updated_at (destination_months — that table
-- has no per-row updated_at column).
--
-- Rationale: edits in our workflow ARE research passes. updated_at is a
-- faithful proxy for "last verified". Without this backfill the UI reads
-- "Review pending" on 480+ legitimate destinations even though every row
-- carries research-backed prose from earlier sprints.
--
-- Going forward, research-backed seeders set content_reviewed_at at insert
-- time (see scripts/seed-batch3-*). The enrich and mark-reviewed scripts
-- bump it on explicit review passes. This invariant means NULL is a
-- genuine miss after this bootstrap runs.
--
-- Apply via Supabase Studio SQL Editor (same convention as 007-010).

UPDATE destinations
   SET content_reviewed_at = updated_at
 WHERE content_reviewed_at IS NULL;

UPDATE destination_months dm
   SET content_reviewed_at = d.updated_at
  FROM destinations d
 WHERE dm.destination_id = d.id
   AND dm.content_reviewed_at IS NULL;

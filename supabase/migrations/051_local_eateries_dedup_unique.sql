-- Sprint 22 follow-up — tighten local_eateries dedup key.
-- The previous unique key (destination_id, name, area) allowed duplicates
-- when the seed pipeline found the same restaurant under two area strings
-- ("Old Manali" vs "Manu Temple Road, Old Manali") or two categories
-- (mid_range vs cafe). New key is case-insensitive on name, ignores area
-- entirely, and is scoped to active rows so soft-deletes don't block
-- legitimate re-inserts.
--
-- Cleanup of the 4 existing duplicate rows on Manali (Drifters' Inn & Cafe,
-- Il Forno, Mayur Restaurant, The Lazy Dog) and disambiguation rename of
-- 5 multi-branch clusters (Glen's Bakehouse, Hotel Janatha, Truffles,
-- Tunday Kababi, Cafe 1947) was applied to data outside this migration
-- since they are one-shot data fixes, not schema changes.

ALTER TABLE local_eateries
  DROP CONSTRAINT IF EXISTS local_eateries_dest_name_area_unique;

CREATE UNIQUE INDEX IF NOT EXISTS local_eateries_dest_lname_active_uidx
  ON local_eateries (destination_id, LOWER(TRIM(name)))
  WHERE is_active = true;

-- sweep-blog-years.sql
-- One-shot sweep to strip "(2026)" suffix from article titles + descriptions
-- in the live articles table.
--
-- Context: the 2026-04-21 blog batch (8 "Things to Know Before X in Y" posts
-- + 1 data-story) baked the year into titles. These are evergreen-by-intent
-- posts ("weather in December is what weather in December is") and the year
-- suffix will age them poorly by April 2027.
--
-- Apply via Supabase dashboard SQL Editor. Safe to re-run (idempotent TRIM).
-- Verify first with the SELECT at the bottom; the UPDATE is commented out by
-- default.

-- Preview: what will change
SELECT slug, title, description
FROM articles
WHERE title LIKE '%(2026)%' OR description LIKE '%(2026)%' OR description LIKE '%Updated 2026%'
ORDER BY slug;

-- UPDATE: strip " (2026)" suffix from titles + descriptions, drop "Updated 2026" trailer.
-- Uncomment the lines below after reviewing the SELECT above.
--
-- UPDATE articles
--   SET title = regexp_replace(title, ' \(2026\)$', ''),
--       description = regexp_replace(
--         regexp_replace(description, ' \(2026\)$', ''),
--         '\s*Updated 2026\.?\s*$', ''
--       )
--   WHERE title LIKE '%(2026)%' OR description LIKE '%(2026)%' OR description LIKE '%Updated 2026%';

-- Also strip mid-body "May 2026", "June 2026" etc. where they are evergreen
-- claims (NOT the neelakurinji 2030 reference, which is genuinely year-bound).
-- Manual review recommended — this is why we don't auto-run it.
--
-- To find candidates:
-- SELECT slug, substring(body_markdown from position('2026' in body_markdown) - 40 for 100) AS ctx
--   FROM articles
--   WHERE body_markdown LIKE '%2026%'
--   ORDER BY slug;

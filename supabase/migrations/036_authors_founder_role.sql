-- Migration 036: expand authors.role check constraint for founder + co-founder
--
-- Pre-2026-04-29 the team page split bylines into "Editorial" (role=editor)
-- and "Family perspective" (role=family) subsections. Founder/Co-Founder is
-- the more credible framing for press/SEO/JSON-LD jobTitle. Editorial work
-- still gets explained in each author's short_bio.

ALTER TABLE authors DROP CONSTRAINT authors_role_check;

ALTER TABLE authors ADD CONSTRAINT authors_role_check
  CHECK (role = ANY (ARRAY[
    'founder'::text,
    'co-founder'::text,
    'editor'::text,
    'contributor'::text,
    'expert'::text,
    'family'::text
  ]));

-- Data updates run separately (already applied via execute_sql 2026-04-29):
--   UPDATE authors SET role='founder', photo_url='/team/ashish.jpg',
--     short_bio='Founder of NakshIQ — writes the destination pages that score every place honestly.'
--     WHERE slug='ashish-taneja';
--   UPDATE authors SET role='co-founder', photo_url='/team/aurore.jpg'
--     WHERE slug='aurore-taneja';

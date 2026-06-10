-- 070_fix_find_nearby_search_path.sql
--
-- FIX: find_nearby_destinations / find_nearby_helpers were broken in prod by a
-- search_path pin applied directly to the live DB (advisor-clearing pass) that
-- set `search_path = public, pg_catalog` — omitting `extensions`, the schema
-- where PostGIS lives on Supabase. Every call failed with
-- `type "geography" does not exist`, which 404'd all 18 /weekend-from-{city}
-- pages (36 sitemap URLs across locales) and degraded "nearby" lookups on
-- destination hubs.
--
-- RULE (also recorded in repo docs): any function search_path pin on this
-- database MUST include `extensions` if the function body touches PostGIS
-- types/functions (geography, ST_*). Pin-to-empty is only safe for functions
-- that fully schema-qualify or touch no extension objects.

ALTER FUNCTION public.find_nearby_destinations(double precision, double precision, integer)
  SET search_path = public, extensions, pg_catalog;

ALTER FUNCTION public.find_nearby_helpers(double precision, double precision, integer)
  SET search_path = public, extensions, pg_catalog;

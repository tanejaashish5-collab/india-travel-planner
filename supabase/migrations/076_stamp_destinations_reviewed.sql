-- 076: stamp_destinations_reviewed — the one write path of the weekly
-- freshness review (scripts/freshness-review.mjs).
--
-- Why an RPC instead of a REST .update(): the destinations_updated_at trigger
-- sets updated_at = now(). Stamping content_reviewed_at from a client clock
-- leaves updated_at a few ms LATER than the review, which the Monday
-- freshness-drift cron reads as "edited after review" once the 21-day grace
-- expires. Inside one statement both sides use the same transaction now(), so
-- the two columns land identical.
--
-- Deliberately narrow: it can only move content_reviewed_at forward on the
-- ids it is given. It cannot touch any content column.
create or replace function public.stamp_destinations_reviewed(p_ids text[])
returns integer
language sql
set search_path = public, pg_catalog
as $$
  with u as (
    update public.destinations
       set content_reviewed_at = now()
     where id = any(p_ids)
    returning 1
  )
  select count(*)::int from u;
$$;

revoke all on function public.stamp_destinations_reviewed(text[]) from public, anon, authenticated;
grant execute on function public.stamp_destinations_reviewed(text[]) to service_role;

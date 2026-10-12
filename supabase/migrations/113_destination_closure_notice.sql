-- APPLIED 2026-10-12 via scripts/run-sql-file.mjs. Not in schema_migrations.
-- 113: a dated, sourced, self-expiring notice on a destination page.
--
-- Why: when the main attraction is temporarily shut (Courtallam's Main Falls,
-- closed for repairs from about 6 Oct 2026 while our October page said "at full
-- bath-flow"), there was nowhere to say so. The weekly freshness review invented
-- a field for it (`access_advisory`), which could not be queued for one-click
-- approval, so it reached the founder as a daily "cron health DEGRADED" email and
-- the fix was a hand-edit of evergreen October prose that somebody then had to
-- remember to undo. See data/audits/ops-emails-2026-10-12.md.
--
-- Life-cycle, so nothing depends on memory:
--   post     apply_destination_corrections() with field `notice_text` (the
--            approval queue's Approve button); expiry is set here, 21 days out
--   render   apps/web/src/components/closure-notice.tsx, destination + month pages
--   re-check scripts/freshness-review.mjs `pick` pulls a destination whose notice
--            lapses within 5 days to the front of the batch
--   expire   /api/cron/watchdog clears a lapsed notice daily and revalidates
alter table public.destinations
  add column if not exists notice_text text,
  add column if not exists notice_source_url text,
  add column if not exists notice_posted_at timestamptz,
  add column if not exists notice_expires_at timestamptz;

alter table public.destinations drop constraint if exists destinations_notice_shape;
alter table public.destinations add constraint destinations_notice_shape check (
  notice_text is null
  or (char_length(notice_text) between 20 and 320 and notice_text !~ E'\n' and notice_expires_at is not null)
);

comment on column public.destinations.notice_text is
  'Temporary closure or restriction, stated only as far as the source states it. Shown at the top of the page until notice_expires_at. Written through apply_destination_corrections().';

-- Same function as 077 with the notice fields added. Everything else is unchanged:
-- compare-and-set on every field, one transaction, stamps content_reviewed_at.
create or replace function public.apply_destination_corrections(p_id text, p_changes jsonb)
returns integer
language plpgsql
set search_path = public, pg_catalog
as $$
declare
  c jsonb;
  f text;
  cur jsonb;
  n int := 0;
begin
  if jsonb_typeof(p_changes) <> 'array' or jsonb_array_length(p_changes) = 0 then
    raise exception 'p_changes must be a non-empty array';
  end if;

  perform 1 from public.destinations where id = p_id for update;
  if not found then raise exception 'no destination %', p_id; end if;

  for c in select * from jsonb_array_elements(p_changes) loop
    f := c->>'field';
    if f not in ('permit_required', 'permit_type', 'permit_lead_days', 'nearest_airport', 'nearest_railhead',
                 'notice_text', 'notice_source_url') then
      raise exception 'field % is not auto-correctable', f;
    end if;
    execute format('select to_jsonb(%I) from public.destinations where id = $1', f) into cur using p_id;
    if coalesce(cur, 'null'::jsonb) is distinct from coalesce(c->'expected', 'null'::jsonb) then
      raise exception '% on % changed since review (now %, reviewer saw %)', f, p_id, cur, c->'expected';
    end if;
    if f = 'permit_type' then
      update public.destinations set permit_type = (c->>'value')::permit_type where id = p_id;
    elsif f = 'permit_lead_days' then
      update public.destinations set permit_lead_days = (c->>'value')::int where id = p_id;
    elsif f = 'notice_text' then
      -- A null value takes the notice down (the place reopened before it lapsed).
      if nullif(btrim(c->>'value'), '') is null then
        update public.destinations
           set notice_text = null, notice_source_url = null, notice_posted_at = null, notice_expires_at = null
         where id = p_id;
      else
        update public.destinations
           set notice_text = btrim(c->>'value'), notice_posted_at = now(), notice_expires_at = now() + interval '21 days'
         where id = p_id;
      end if;
    elsif f = 'notice_source_url' then
      if c->>'value' is not null and c->>'value' !~ '^https?://' then
        raise exception 'notice_source_url must be a web address';
      end if;
      -- Skipped when the same call just took the notice down.
      update public.destinations set notice_source_url = c->>'value' where id = p_id and notice_text is not null;
    else
      execute format('update public.destinations set %I = $1 where id = $2', f) using c->>'value', p_id;
    end if;
    n := n + 1;
  end loop;

  update public.destinations set content_reviewed_at = now() where id = p_id;
  return n;
end;
$$;

revoke all on function public.apply_destination_corrections(text, jsonb) from public, anon, authenticated;
grant execute on function public.apply_destination_corrections(text, jsonb) to service_role;

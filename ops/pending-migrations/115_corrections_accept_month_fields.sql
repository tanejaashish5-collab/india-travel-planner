-- 115: apply_destination_corrections also accepts best_months and avoid_months.
--
-- Why: 4 of the 7 items the freshness review ever escalated were month fields,
-- which the queue refused, so they sat as "research by hand" with no job to do it
-- (Eravikulam listed its Feb-Mar closure as best months for 17 days until 2026-11-02).
-- Same compare-and-set as every other field. Values must be a non-empty (best) list
-- of distinct months 1-12; order is kept because the site displays it.
--
-- NOT APPLIED. Waiting on the founder (2026-11-02). Once applied: move this file to
-- supabase/migrations/ on the parked branch, add best_months and avoid_months back to
-- QUEUE_FIELDS in scripts/freshness-review.mjs, and list them as fixable in
-- .claude/commands/freshness-review.md and freshness-settle.md.
--
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
                 'notice_text', 'notice_source_url', 'best_months', 'avoid_months') then
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
    elsif f in ('best_months', 'avoid_months') then
      if jsonb_typeof(c->'value') <> 'array'
         or (f = 'best_months' and jsonb_array_length(c->'value') = 0)
         or exists (select 1 from jsonb_array_elements(c->'value') m
                    where jsonb_typeof(m) <> 'number' or m::text !~ '^([1-9]|1[0-2])$')
         or (select count(*) <> count(distinct m) from jsonb_array_elements(c->'value') m) then
        raise exception '% must be a list of distinct months 1-12', f;
      end if;
      execute format(
        'update public.destinations set %I = (select coalesce(array_agg(m::int order by o), ''{}''::int[]) from jsonb_array_elements_text($1) with ordinality as t(m, o)) where id = $2', f
      ) using c->'value', p_id;
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

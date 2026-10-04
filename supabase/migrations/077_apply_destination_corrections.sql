-- 077: apply_destination_corrections — the auto-apply half of the weekly
-- freshness review (scripts/freshness-review.mjs).
--
-- Why: until 2026-10-04 the review could only REPORT a wrong fact. Nothing
-- applied it, so the same 6 wrong facts (Valley of Flowers "no permit",
-- Ratnagiri "limited flights", …) were found on 09-26, found again on 10-03,
-- and stayed live. Unstamped rows also stayed "stalest", so they were re-picked
-- every week and clogged the batch: 409 of 533 pages sat at 90-180 days.
--
-- Deliberately narrow, same spirit as 076:
--   - only the plain-text / enum / integer fields listed below; JSONB content
--     (best_months, daily_cost, local_logistics) still goes to a human
--   - compare-and-set: every change carries the value the reviewer SAW; if the
--     row has moved since, the whole call raises and nothing is written
--   - all changes for one destination land in one transaction together with the
--     content_reviewed_at stamp (same now() as updated_at, see 076), or none do
--
-- p_changes: [{"field": "nearest_airport", "expected": <json>, "value": <json>}, …]
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
    if f not in ('permit_required', 'permit_type', 'permit_lead_days', 'nearest_airport', 'nearest_railhead') then
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

-- Approval queue. The weekly review does NOT apply corrections on its own
-- (founder decision 2026-10-04: its replacement wording was fully right in 1 of
-- 5 real errors on 10-03, so a human approves each one). Each proposed fix lands
-- here as 'pending'; the founder's email carries a signed link to
-- /api/admin/corrections/<id>, which shows the change and applies it through
-- apply_destination_corrections() on an explicit POST.
create table if not exists public.destination_corrections (
  id uuid primary key default gen_random_uuid(),
  destination_id text not null references public.destinations(id),
  changes jsonb not null,            -- [{field, expected, value, source}]
  notes text,
  status text not null default 'pending' check (status in ('pending', 'applied', 'rejected', 'failed')),
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  result text
);
create index if not exists destination_corrections_pending on public.destination_corrections (destination_id) where status = 'pending';
alter table public.destination_corrections enable row level security;
-- no policies: service role only

-- 072_emergency_sos_auto_reverify.sql
--
-- Makes the weekly SOS re-verification self-clearing instead of a human treadmill.
--
-- The problem this closes: `emergency_sos` carries ONE `source_url` per row, but a
-- row holds numbers from SEVERAL pages — the district control-room line comes from
-- the district disaster-management page, the hospital line from somewhere else that
-- was never recorded. So a re-check against `source_url` could only ever confirm
-- part of the row, the 45-day cadence timer kept expiring, and the Monday digest
-- re-listed the same rows every week with nothing actually wrong (42 rows on
-- 2026-07-27, every one of them `stale_XXd` with verified=true and a live source).
--
-- Fix: record provenance PER NUMBER, so an unattended job can fetch each number's
-- own source page, confirm the digits are still printed there, and stamp the row.
--
-- source_map shape — key is the number normalised to digits only:
--   {
--     "01372251437": { "url": "https://chamoli.gov.in/disaster-management/",
--                      "field": "rescue_contact",
--                      "last_seen": "2026-07-27" }
--   }
-- "last_seen" is the last date the digits were literally found on that page. A
-- number that HAS an entry and then goes missing is a real change signal; a number
-- with NO entry was simply never sourced and is a provenance gap, not an alarm.

alter table emergency_sos
  add column if not exists source_map jsonb not null default '{}'::jsonb,
  -- confirmed | needs_source | number_changed | source_unreachable | never_run
  add column if not exists auto_verify_status text not null default 'never_run',
  add column if not exists auto_verify_note text,
  -- consecutive non-confirming runs; escalates to the human digest at >= 3
  add column if not exists auto_verify_fail_streak integer not null default 0,
  add column if not exists auto_verified_at timestamptz;

comment on column emergency_sos.source_map is
  'Per-number provenance: {"<digits>": {"url","field","last_seen"}}. Written only when the digits were literally found on that page — never inferred.';
comment on column emergency_sos.auto_verify_status is
  'Last verdict from the sos-auto-reverify cron. Only number_changed / source_unreachable(streak>=3) reach the human digest.';
comment on column emergency_sos.auto_verify_fail_streak is
  'Consecutive runs that did not fully confirm. Reset to 0 on a confirming run.';

create index if not exists emergency_sos_auto_verify_status_idx
  on emergency_sos (auto_verify_status);

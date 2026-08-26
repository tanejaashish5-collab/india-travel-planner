-- 073 — Newsletter delivery observability.
--
-- Why this exists: on 2026-08-27 a confirmed subscriber reported never receiving
-- an issue, and the question was UNANSWERABLE. `newsletter_issues.recipient_count`
-- recorded a whole batch as sent whenever the Resend batch call returned without a
-- batch-level error, the RESEND_API_KEY in the app is send-only (401 on every read
-- endpoint), and no webhook existed — so no per-recipient delivery record lived
-- anywhere in the system. `opens`/`clicks` had never been wired to anything and had
-- read 0 for all 19 issues.
--
-- Same failure class as the ok:true-while-items-failed rule: a success counter that
-- counts the CALL, not the ITEMS.

-- 1. Per-recipient send ledger: which Resend message id went to which address for
--    which issue. Written at send time, so a later webhook event can be resolved
--    back to a subscriber and an issue.
create table if not exists public.newsletter_sends (
  resend_email_id text primary key,
  email           text not null,
  issue_slug      text not null,
  created_at      timestamptz not null default now()
);

create index if not exists newsletter_sends_email_idx      on public.newsletter_sends (email);
create index if not exists newsletter_sends_issue_slug_idx on public.newsletter_sends (issue_slug);

-- 2. Delivery events from Resend's webhook (email.sent / delivered / bounced /
--    complained / opened / clicked / delivery_delayed).
--    svix_id is the idempotency key — Svix retries redeliver the same id.
create table if not exists public.newsletter_events (
  id              uuid primary key default gen_random_uuid(),
  svix_id         text unique,
  resend_email_id text,
  email           text,
  event_type      text not null,
  occurred_at     timestamptz,
  payload         jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists newsletter_events_email_idx    on public.newsletter_events (email);
create index if not exists newsletter_events_type_idx     on public.newsletter_events (event_type);
create index if not exists newsletter_events_resend_idx   on public.newsletter_events (resend_email_id);

-- 3. Record accepted-vs-rejected per issue. recipient_count keeps its meaning
--    (addresses Resend ACCEPTED); failed_count is the ones it did not.
alter table public.newsletter_issues
  add column if not exists failed_count integer not null default 0;

comment on column public.newsletter_issues.recipient_count is
  'Addresses Resend ACCEPTED at send time (per-email, not per-batch). Acceptance is not delivery — see newsletter_events for delivered/bounced.';
comment on column public.newsletter_issues.failed_count is
  'Addresses Resend did NOT accept at send time.';
comment on column public.newsletter_issues.opens is
  'Populated by the Resend webhook (email.opened). Was an unwired dead column reading 0 for issues 0-18.';
comment on column public.newsletter_issues.clicks is
  'Populated by the Resend webhook (email.clicked). Was an unwired dead column reading 0 for issues 0-18.';

-- RLS: these are ops tables. Service role only; no anon access.
alter table public.newsletter_sends  enable row level security;
alter table public.newsletter_events enable row level security;

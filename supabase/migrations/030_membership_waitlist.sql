-- Sprint 12 — membership waitlist.
-- Collects emails for the ₹999/year Membership tier (Sprint 16 launches real
-- charging; this is pure list-building).

CREATE TABLE IF NOT EXISTS membership_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  interest text,
  referral_source text,
  submitter_ip_hash text,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz,
  status text NOT NULL DEFAULT 'new',
  notes text,

  CONSTRAINT mw_email_unique UNIQUE (email),
  CONSTRAINT mw_status_check CHECK (status IN ('new','confirmed','converted','unsubscribed'))
);

CREATE INDEX IF NOT EXISTS mw_submitted_idx ON membership_waitlist (submitted_at DESC);
CREATE INDEX IF NOT EXISTS mw_status_idx ON membership_waitlist (status);

ALTER TABLE membership_waitlist ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE membership_waitlist IS
  'Sprint 12: membership waitlist collector.';

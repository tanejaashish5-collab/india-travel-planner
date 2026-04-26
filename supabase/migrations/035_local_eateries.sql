-- Sprint 22 — local_eateries table.
-- Real restaurant-level data per destination. Mirrors the local_stays pattern
-- so the destination page renders a "Where to eat" section the same way it
-- already renders "Where to stay", and so the chatbot has a structured query
-- target when users ask food questions ("best place for kebabs in Delhi" →
-- direct DB hit instead of fuzzy area-level retrieval).
--
-- Schema sized for verifiable seed data: ≥2 source URLs per row, signature
-- dish + must-try list, founding year where available, area_slug for filtering
-- on the UI, is_legendary flag for spotlight tier (Karim's, Bukhara,
-- Indian Accent class).

CREATE TABLE IF NOT EXISTS local_eateries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid()
);

-- Columns (ADD COLUMN IF NOT EXISTS for safety on rerun)
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS destination_id text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS area text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS area_slug text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS cuisine text[];
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS signature_dish text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS must_try text[];
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS price_range text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS price_per_head_inr int4range;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS vegetarian text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS kid_friendly boolean;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS reservation text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS dress_code text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS established_year int;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS why_it_matters text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS insider_tip text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS signature_address text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS google_maps_url text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS zomato_url text;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS source_urls text[];
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS last_verified date;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS is_legendary boolean NOT NULL DEFAULT false;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE local_eateries ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- NOT NULL constraints on the fields that must always be present
DO $$
BEGIN
  ALTER TABLE local_eateries ALTER COLUMN destination_id SET NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE local_eateries ALTER COLUMN name SET NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- FK to destinations (drop + recreate for idempotency)
DO $$
BEGIN
  ALTER TABLE local_eateries DROP CONSTRAINT IF EXISTS local_eateries_destination_id_fkey;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
DO $$
BEGIN
  ALTER TABLE local_eateries
    ADD CONSTRAINT local_eateries_destination_id_fkey
    FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- CHECK constraints — drop + recreate to stay idempotent
DO $$
BEGIN
  ALTER TABLE local_eateries DROP CONSTRAINT IF EXISTS local_eateries_category_check;
  ALTER TABLE local_eateries
    ADD CONSTRAINT local_eateries_category_check
    CHECK (category IN ('fine_dining','mid_range','casual','street_food','cafe','bar','sweet_shop'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE local_eateries DROP CONSTRAINT IF EXISTS local_eateries_price_range_check;
  ALTER TABLE local_eateries
    ADD CONSTRAINT local_eateries_price_range_check
    CHECK (price_range IN ('₹','₹₹','₹₹₹','₹₹₹₹'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE local_eateries DROP CONSTRAINT IF EXISTS local_eateries_vegetarian_check;
  ALTER TABLE local_eateries
    ADD CONSTRAINT local_eateries_vegetarian_check
    CHECK (vegetarian IN ('pure-veg','veg-friendly','meat-heavy','mixed'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
  ALTER TABLE local_eateries DROP CONSTRAINT IF EXISTS local_eateries_reservation_check;
  ALTER TABLE local_eateries
    ADD CONSTRAINT local_eateries_reservation_check
    CHECK (reservation IN ('walk-in','recommended','required'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Unique on (destination_id, name, area) for idempotent INSERT-on-conflict
DO $$
BEGIN
  ALTER TABLE local_eateries DROP CONSTRAINT IF EXISTS local_eateries_dest_name_area_unique;
  ALTER TABLE local_eateries
    ADD CONSTRAINT local_eateries_dest_name_area_unique
    UNIQUE (destination_id, name, area);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS local_eateries_destination_active_idx
  ON local_eateries (destination_id, is_active);
CREATE INDEX IF NOT EXISTS local_eateries_destination_category_idx
  ON local_eateries (destination_id, category);
CREATE INDEX IF NOT EXISTS local_eateries_area_slug_idx
  ON local_eateries (area_slug);
CREATE INDEX IF NOT EXISTS local_eateries_legendary_idx
  ON local_eateries (destination_id, is_legendary)
  WHERE is_legendary = true;

-- updated_at trigger
CREATE OR REPLACE FUNCTION local_eateries_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS local_eateries_updated_at_trigger ON local_eateries;
CREATE TRIGGER local_eateries_updated_at_trigger
  BEFORE UPDATE ON local_eateries
  FOR EACH ROW
  EXECUTE FUNCTION local_eateries_set_updated_at();

-- RLS — anon SELECT on is_active=true only; service-role full
ALTER TABLE local_eateries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon read active eateries" ON local_eateries;
CREATE POLICY "anon read active eateries"
  ON local_eateries FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "service role full access" ON local_eateries;
CREATE POLICY "service role full access"
  ON local_eateries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Sprint 9 — NakshIQ Cost Index 2026.
-- Structured travel-cost dataset (INR per day or per unit) per destination,
-- category, and season. Feeds /cost-index page + Dataset JSON-LD for AI
-- citation. Per R2 §9 #11: "This is your single highest-ROI citation lever."

CREATE TABLE IF NOT EXISTS destination_costs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id text NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  category text NOT NULL,
  season text NOT NULL,                      -- 'peak' | 'shoulder' | 'low'
  months int[] NOT NULL,                     -- months this row applies to (1-12)
  typical_inr int NOT NULL,                  -- representative mid-range INR
  range_low_inr int,                         -- budget end
  range_high_inr int,                        -- splurge end
  unit text NOT NULL DEFAULT 'per_day',      -- 'per_day' | 'per_night' | 'per_unit' | 'one_time'
  source_ref text NOT NULL,                  -- citation tag
  notes text,                                -- specifics
  recorded_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,

  CONSTRAINT dc_category_check CHECK (category IN (
    'homestay',
    'hostel-dorm',
    'hotel-mid',
    'hotel-splurge',
    'food-per-day',
    'transport-taxi-day',
    'transport-intercity',
    'permit-fees',
    'activity-sample'
  )),
  CONSTRAINT dc_season_check CHECK (season IN ('peak', 'shoulder', 'low')),
  CONSTRAINT dc_unit_check CHECK (unit IN ('per_day', 'per_night', 'per_unit', 'one_time')),
  CONSTRAINT dc_values_check CHECK (
    typical_inr > 0
    AND (range_low_inr IS NULL OR range_low_inr >= 0)
    AND (range_high_inr IS NULL OR range_high_inr >= typical_inr)
  )
);

CREATE INDEX IF NOT EXISTS dest_costs_dest_idx ON destination_costs (destination_id);
CREATE INDEX IF NOT EXISTS dest_costs_category_idx ON destination_costs (category);
CREATE INDEX IF NOT EXISTS dest_costs_season_idx ON destination_costs (season);

ALTER TABLE destination_costs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS destination_costs_read_all ON destination_costs;
CREATE POLICY destination_costs_read_all ON destination_costs
  FOR SELECT USING (true);

COMMENT ON TABLE destination_costs IS
  'Sprint 9 NakshIQ Cost Index: per-destination per-category per-season INR cost rows. Publishable as Dataset for AI citation.';

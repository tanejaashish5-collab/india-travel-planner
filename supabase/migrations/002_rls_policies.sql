-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE destination_months ENABLE ROW LEVEL SECURITY;
ALTER TABLE kids_friendly ENABLE ROW LEVEL SECURITY;
ALTER TABLE confidence_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hidden_gems ENABLE ROW LEVEL SECURITY;
ALTER TABLE local_legends ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_eats ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE treks ENABLE ROW LEVEL SECURITY;
ALTER TABLE camping_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE superlatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE permits ENABLE ROW LEVEL SECURITY;
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE gear_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_helpers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sos_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE timed_checkins ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- ENCYCLOPEDIA DATA: Public read, admin-only write
-- (anon + authenticated can read, service_role can write)
-- ============================================================

-- Macro: public read policy for encyclopedia tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'states', 'destinations', 'destination_months', 'kids_friendly',
    'confidence_cards', 'sub_destinations', 'hidden_gems', 'local_legends',
    'viral_eats', 'routes', 'treks', 'camping_spots', 'collections',
    'superlatives', 'permits', 'festivals', 'gear_checklists'
  ] LOOP
    EXECUTE format(
      'CREATE POLICY "Public read %s" ON %I FOR SELECT USING (true)',
      tbl, tbl
    );
  END LOOP;
END $$;

-- ============================================================
-- USER PROFILES: Users can read all, update own
-- ============================================================

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- SOS ALERTS: Users see own, helpers see active in radius (via function)
-- ============================================================

CREATE POLICY "Users can create SOS alerts"
  ON sos_alerts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own SOS alerts"
  ON sos_alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own SOS alerts"
  ON sos_alerts FOR UPDATE
  USING (auth.uid() = user_id);

-- Note: helpers access SOS data via server-side edge functions (service_role),
-- NOT via direct client queries. This prevents location data leakage.

-- ============================================================
-- SOS HELPERS: Public read (for displaying nearby helpers), own write
-- ============================================================

CREATE POLICY "Anyone can view available helpers"
  ON sos_helpers FOR SELECT
  USING (available = true);

CREATE POLICY "Users can register as helper"
  ON sos_helpers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Helpers can update own record"
  ON sos_helpers FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- SOS RESPONSES: Participants only
-- ============================================================

CREATE POLICY "Alert owner and responder can view responses"
  ON sos_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sos_alerts WHERE id = alert_id AND user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM sos_helpers WHERE id = helper_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Helpers can create responses"
  ON sos_responses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sos_helpers WHERE id = helper_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can update responses"
  ON sos_responses FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM sos_helpers WHERE id = helper_id AND user_id = auth.uid()
    )
  );

-- ============================================================
-- ROAD REPORTS: Public read, authenticated write
-- ============================================================

CREATE POLICY "Anyone can view road reports"
  ON road_reports FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create road reports"
  ON road_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own road reports"
  ON road_reports FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- TIMED CHECK-INS: Own only
-- ============================================================

CREATE POLICY "Users can manage own check-ins"
  ON timed_checkins FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

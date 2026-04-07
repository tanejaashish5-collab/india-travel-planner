-- ============================================================
-- India Travel Planner — Initial Database Schema
-- Supabase Postgres + PostGIS + pgcrypto
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- STATIC DATA TABLES (destination encyclopedia)
-- ============================================================

CREATE TABLE states (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state_id TEXT NOT NULL REFERENCES states(id),
  region TEXT,
  coords GEOGRAPHY(Point, 4326),
  elevation_m INT,
  type TEXT[] DEFAULT '{}',
  vibe TEXT[] DEFAULT '{}',
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'hard', 'extreme')),
  nearest_airport TEXT,
  nearest_railhead TEXT,
  tagline TEXT NOT NULL,
  why_special TEXT NOT NULL,
  budget_tier TEXT CHECK (budget_tier IN ('budget', 'mid-range', 'splurge', 'mixed')),
  ideal_duration_min INT,
  ideal_duration_max INT,
  cell_network TEXT,
  atm_available BOOLEAN DEFAULT true,
  medical_facility TEXT,
  permit_required TEXT,
  languages_spoken TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  best_months INT[] DEFAULT '{}',
  avoid_months INT[] DEFAULT '{}',
  deep_dive JSONB DEFAULT '{}',
  -- Translations: {"hi": {"name": "...", "tagline": "...", "why_special": "..."}}
  -- Fallback: if a field is missing in translations, UI shows English original
  -- Scales to any language: {"hi": {...}, "ta": {...}, "bn": {...}}
  translations JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE destination_months (
  destination_id TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  month INT NOT NULL CHECK (month BETWEEN 1 AND 12),
  score INT NOT NULL CHECK (score BETWEEN 0 AND 5),
  note TEXT,
  why_go TEXT,
  why_not TEXT,
  PRIMARY KEY (destination_id, month)
);

CREATE TABLE kids_friendly (
  destination_id TEXT PRIMARY KEY REFERENCES destinations(id) ON DELETE CASCADE,
  suitable BOOLEAN NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  min_recommended_age INT,
  best_age_group TEXT,
  stroller_accessible BOOLEAN DEFAULT false,
  reasons TEXT[] DEFAULT '{}',
  concerns TEXT[] DEFAULT '{}',
  kid_highlights TEXT[] DEFAULT '{}',
  not_suitable_reason TEXT
);

CREATE TABLE confidence_cards (
  destination_id TEXT PRIMARY KEY REFERENCES destinations(id) ON DELETE CASCADE,
  safety_rating INT CHECK (safety_rating BETWEEN 1 AND 5),
  safety_notes TEXT,
  reach JSONB DEFAULT '{}',
  sleep JSONB DEFAULT '{}',
  fuel JSONB DEFAULT '{}',
  weather_night JSONB DEFAULT '{}',
  emergency JSONB DEFAULT '{}',
  network JSONB DEFAULT '{}',
  people_who_help JSONB DEFAULT '[]'
);

CREATE TABLE sub_destinations (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  coords GEOGRAPHY(Point, 4326),
  elevation_m INT,
  type TEXT,
  tagline TEXT,
  why_visit TEXT,
  highlights TEXT[] DEFAULT '{}',
  kids_ok BOOLEAN DEFAULT true,
  kids_note TEXT,
  time_needed TEXT,
  distance_from_parent_km FLOAT,
  best_months INT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  translations JSONB DEFAULT '{}'
);

CREATE TABLE hidden_gems (
  id TEXT PRIMARY KEY,
  near_destination_id TEXT REFERENCES destinations(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  coords GEOGRAPHY(Point, 4326),
  distance_km FLOAT,
  drive_time TEXT,
  why_unknown TEXT,
  why_go TEXT,
  difficulty TEXT,
  social_proof TEXT,
  confidence_score INT CHECK (confidence_score BETWEEN 1 AND 5),
  tags TEXT[] DEFAULT '{}',
  translations JSONB DEFAULT '{}'
);

CREATE TABLE local_legends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  known_as TEXT,
  role TEXT,
  story TEXT,
  contact TEXT,
  social TEXT
);

CREATE TABLE viral_eats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id TEXT NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location TEXT,
  type TEXT,
  famous_for TEXT,
  viral_on TEXT,
  price_range TEXT,
  honest_review TEXT
);

CREATE TABLE routes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  days INT,
  difficulty TEXT,
  best_months INT[] DEFAULT '{}',
  stops TEXT[] DEFAULT '{}',
  description TEXT,
  kids_suitable BOOLEAN DEFAULT false,
  bike_route BOOLEAN DEFAULT false,
  budget_range TEXT,
  highlights TEXT[] DEFAULT '{}',
  logistics TEXT,
  day_by_day JSONB DEFAULT '[]'
);

CREATE TABLE treks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  destination_id TEXT REFERENCES destinations(id) ON DELETE SET NULL,
  difficulty TEXT,
  duration_days INT,
  max_altitude_m INT,
  distance_km FLOAT,
  best_months INT[] DEFAULT '{}',
  permits_required BOOLEAN DEFAULT false,
  kids_suitable BOOLEAN DEFAULT false,
  min_age INT,
  fitness_level TEXT,
  description TEXT,
  highlights TEXT[] DEFAULT '{}',
  warnings TEXT[] DEFAULT '{}'
);

CREATE TABLE camping_spots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  destination_id TEXT REFERENCES destinations(id) ON DELETE SET NULL,
  coords GEOGRAPHY(Point, 4326),
  elevation_m INT,
  open_months INT[] DEFAULT '{}',
  permit_required BOOLEAN DEFAULT false,
  water_source BOOLEAN DEFAULT false,
  facilities TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}'
);

CREATE TABLE collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  items JSONB DEFAULT '[]',
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}'
);

CREATE TABLE superlatives (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  destination_id TEXT REFERENCES destinations(id) ON DELETE SET NULL,
  name TEXT,
  detail TEXT,
  coords GEOGRAPHY(Point, 4326),
  tags TEXT[] DEFAULT '{}'
);

CREATE TABLE permits (
  id TEXT PRIMARY KEY,
  destination_id TEXT REFERENCES destinations(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  who_needs TEXT,
  foreigners TEXT,
  how_to_get TEXT,
  documents_needed TEXT[] DEFAULT '{}',
  cost_inr INT DEFAULT 0,
  processing_time TEXT,
  validity TEXT,
  government_link TEXT,
  pro_tip TEXT
);

CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id TEXT REFERENCES destinations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  month INT,
  approximate_date TEXT,
  description TEXT,
  significance TEXT
);

CREATE TABLE gear_checklists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  route_type TEXT,
  items JSONB DEFAULT '[]'
);

-- ============================================================
-- DYNAMIC DATA TABLES (user-generated)
-- ============================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  persona TEXT DEFAULT 'explorer',
  explorer_score INT DEFAULT 0,
  trips_completed INT DEFAULT 0,
  is_helper BOOLEAN DEFAULT false,
  helper_tier TEXT CHECK (helper_tier IN ('basic', 'verified', 'official')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sos_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  encrypted_location BYTEA,
  situation_type TEXT NOT NULL,
  party_size INT DEFAULT 1,
  vehicle_type TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'accepted', 'in_progress', 'resolved', 'cancelled', 'expired')),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  ttl_delete_at TIMESTAMPTZ
);

CREATE TABLE sos_helpers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  location GEOGRAPHY(Point, 4326),
  skills TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  gender TEXT,
  organization TEXT,
  avg_rating FLOAT DEFAULT 0,
  total_assists INT DEFAULT 0,
  last_seen_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sos_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_id UUID NOT NULL REFERENCES sos_alerts(id) ON DELETE CASCADE,
  helper_id UUID NOT NULL REFERENCES sos_helpers(id),
  status TEXT DEFAULT 'accepted' CHECK (status IN ('accepted', 'en_route', 'arrived', 'resolved', 'cancelled')),
  accepted_at TIMESTAMPTZ DEFAULT now(),
  location_verified_at TIMESTAMPTZ,
  fee_agreed_inr INT
);

CREATE TABLE road_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  destination_id TEXT REFERENCES destinations(id) ON DELETE SET NULL,
  segment TEXT,
  status TEXT CHECK (status IN ('open', 'blocked', 'risky', 'slow')),
  report TEXT,
  location GEOGRAPHY(Point, 4326),
  reported_at TIMESTAMPTZ DEFAULT now(),
  verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '24 hours')
);

CREATE TABLE timed_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  expected_checkin_at TIMESTAMPTZ NOT NULL,
  grace_period_hours INT DEFAULT 2,
  last_known_location GEOGRAPHY(Point, 4326),
  emergency_contacts TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'checked_in', 'overdue', 'sos_triggered')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

-- Destination search & filter
CREATE INDEX idx_destinations_state ON destinations(state_id);
CREATE INDEX idx_destinations_coords ON destinations USING GIST(coords);
CREATE INDEX idx_destinations_tags ON destinations USING GIN(tags);
CREATE INDEX idx_destinations_difficulty ON destinations(difficulty);

-- Monthly suitability (core query: "where to go in month X")
CREATE INDEX idx_dest_months_score ON destination_months(month, score);

-- Sub-destinations & gems
CREATE INDEX idx_sub_destinations_parent ON sub_destinations(parent_id);
CREATE INDEX idx_sub_destinations_coords ON sub_destinations USING GIST(coords);
CREATE INDEX idx_hidden_gems_near ON hidden_gems(near_destination_id);
CREATE INDEX idx_hidden_gems_coords ON hidden_gems USING GIST(coords);

-- SOS (safety-critical, must be fast)
CREATE INDEX idx_sos_helpers_location ON sos_helpers USING GIST(location);
CREATE INDEX idx_sos_helpers_available ON sos_helpers(available) WHERE available = true;
CREATE INDEX idx_sos_alerts_status ON sos_alerts(status) WHERE status = 'active';
CREATE INDEX idx_sos_alerts_user ON sos_alerts(user_id);

-- Road reports
CREATE INDEX idx_road_reports_dest ON road_reports(destination_id);
CREATE INDEX idx_road_reports_active ON road_reports(expires_at) WHERE expires_at > now();

-- Timed check-ins (server monitors these)
CREATE INDEX idx_timed_checkins_overdue ON timed_checkins(expected_checkin_at) WHERE status = 'active';

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER destinations_updated_at
  BEFORE UPDATE ON destinations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Find destinations within radius (km)
CREATE OR REPLACE FUNCTION find_nearby_destinations(
  lat FLOAT,
  lng FLOAT,
  radius_km INT DEFAULT 50
)
RETURNS TABLE (
  destination_id TEXT,
  destination_name TEXT,
  distance_km FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.name,
    ST_Distance(d.coords::geography, ST_MakePoint(lng, lat)::geography) / 1000.0 AS distance_km
  FROM destinations d
  WHERE ST_DWithin(d.coords::geography, ST_MakePoint(lng, lat)::geography, radius_km * 1000)
  ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql;

-- Find available helpers within radius (for SOS)
CREATE OR REPLACE FUNCTION find_nearby_helpers(
  lat FLOAT,
  lng FLOAT,
  radius_m INT DEFAULT 5000
)
RETURNS TABLE (
  helper_id UUID,
  user_id UUID,
  skills TEXT[],
  distance_m FLOAT,
  gender TEXT,
  organization TEXT,
  avg_rating FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    h.id,
    h.user_id,
    h.skills,
    ST_Distance(h.location::geography, ST_MakePoint(lng, lat)::geography) AS distance_m,
    h.gender,
    h.organization,
    h.avg_rating
  FROM sos_helpers h
  WHERE h.available = true
    AND ST_DWithin(h.location::geography, ST_MakePoint(lng, lat)::geography, radius_m)
  ORDER BY distance_m;
END;
$$ LANGUAGE plpgsql;

-- Seed initial states for North India
INSERT INTO states (id, name, region) VALUES
  ('himachal-pradesh', 'Himachal Pradesh', 'North India'),
  ('uttarakhand', 'Uttarakhand', 'North India'),
  ('jammu-kashmir', 'Jammu & Kashmir', 'North India'),
  ('ladakh', 'Ladakh', 'North India'),
  ('rajasthan', 'Rajasthan', 'North India'),
  ('uttar-pradesh', 'Uttar Pradesh', 'North India'),
  ('punjab', 'Punjab', 'North India'),
  ('delhi', 'Delhi', 'North India'),
  ('haryana', 'Haryana', 'North India'),
  ('chandigarh', 'Chandigarh', 'North India');

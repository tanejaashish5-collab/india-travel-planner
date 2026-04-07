// ============================================================
// India Travel Planner — Core Destination Types
// All types match the Supabase Postgres schema exactly
// ============================================================

// --- i18n ---

/** Supported locale codes. Add new languages here — no migration needed. */
export type Locale = "en" | "hi";

/**
 * Per-entity translations stored as JSONB.
 * Only user-facing prose fields are translated (name, tagline, why_special, etc.).
 * If a field is missing for a locale, the UI falls back to the English original.
 * No runtime API calls — translations are pre-baked at seed/author time.
 */
export type Translations<T> = Partial<Record<Locale, Partial<T>>>;

/** Fields that get translated on a main destination */
export interface DestinationTranslatable {
  name: string;
  tagline: string;
  why_special: string;
}

/** Fields that get translated on a sub-destination */
export interface SubDestinationTranslatable {
  name: string;
  tagline: string;
  why_visit: string;
}

/** Fields that get translated on a hidden gem */
export interface HiddenGemTranslatable {
  name: string;
  why_go: string;
}

// --- Enums ---

export type Difficulty = "easy" | "moderate" | "hard" | "extreme";
export type BudgetTier = "budget" | "mid-range" | "splurge" | "mixed";
export type PublicTransport = "none" | "limited" | "good" | "excellent";
export type ApproachDifficulty = "easy" | "moderate" | "hard" | "extreme";
export type EatType = "cafe" | "restaurant" | "dhaba" | "street" | "homestay-kitchen";
export type EatPrice = "budget" | "moderate" | "splurge";
export type AltitudeRisk = "none" | "mild" | "moderate" | "severe";
export type Region = "North India" | "East India" | "West India" | "Central India" | "South India" | "Islands";

export type DestinationTag =
  | "snow" | "monastery" | "river" | "desert" | "fort" | "wildlife"
  | "pilgrimage" | "offbeat" | "family" | "honeymoon" | "solo" | "biker"
  | "camping" | "trek" | "photography" | "spiritual" | "adventure"
  | "luxury" | "budget" | "lake" | "beach" | "heritage" | "food"
  | "meadow" | "village" | "border" | "national-park" | "hill-station";

export type Persona =
  | "biker" | "backpacker" | "family" | "luxury" | "spiritual"
  | "photography" | "adventure" | "digital-nomad" | "solo-female" | "senior";

export type SituationType =
  | "stuck" | "medical" | "fuel" | "breakdown" | "lost" | "safety-threat";

// --- State ---

export interface State {
  id: string;
  name: string;
  region: Region;
}

// --- Main Destination ---

export interface Destination {
  id: string;
  name: string;
  state_id: string;
  region: string;
  coords: { lat: number; lng: number };
  elevation_m: number | null;
  type: string[];
  vibe: string[];
  difficulty: Difficulty;
  nearest_airport: string;
  nearest_railhead: string;
  tagline: string;
  why_special: string;
  budget_tier: BudgetTier;
  ideal_duration_min: number;
  ideal_duration_max: number;
  cell_network: string | null;
  atm_available: boolean;
  medical_facility: string | null;
  permit_required: string | null;
  languages_spoken: string[];
  tags: DestinationTag[];
  best_months: number[];
  avoid_months: number[];
  deep_dive: DeepDive;
  translations: Translations<DestinationTranslatable>;
  created_at: string;
  updated_at: string;

  // Joined relations (populated by queries)
  monthly_suitability?: MonthlySuitability[];
  kids_friendly?: KidsFriendly;
  confidence_card?: ConfidenceCard;
  sub_destinations?: SubDestination[];
  hidden_gems?: HiddenGem[];
  local_legends?: LocalLegend[];
  viral_eats?: ViralEat[];
  permits?: Permit[];
  festivals?: Festival[];
}

// --- Deep Dive (JSONB — editorial prose, not queried) ---

export interface DeepDive {
  detailed_description: string;
  things_to_do: string[];
  access_notes: string;
  stays: string;
  food: string;
  festivals: string;
  photography: string;
  hidden_gems: string;
  history: string;
  warnings: string;

  // New fields
  local_transport?: string;
  budget_guide?: BudgetGuide;
  sample_itinerary?: ItineraryDay[];
  day_trips?: DayTrip[];
  where_to_eat?: EatSpot[];
  packing_essentials?: string[];
  common_mistakes?: string[];
  sustainability_notes?: string;
  altitude_profile?: AltitudeProfile;
  road_conditions?: RoadConditions;
}

export interface BudgetGuide {
  backpacker_per_day_inr: string;
  mid_range_per_day_inr: string;
  splurge_per_day_inr: string;
  note?: string;
}

export interface ItineraryDay {
  day: number;
  plan: string;
}

export interface DayTrip {
  destination: string;
  distance_km: number;
  time: string;
  note: string;
}

export interface EatSpot {
  name: string;
  type: EatType;
  known_for: string;
  price: EatPrice;
}

export interface AltitudeProfile {
  risk_level: AltitudeRisk;
  acclimatization_days: number;
  ams_note: string;
}

export interface RoadConditions {
  approach_difficulty: ApproachDifficulty;
  seasonal_closures: string;
  fuel_stops: string;
  key_passes?: PassInfo[];
}

export interface PassInfo {
  name: string;
  elevation_m: number;
  open_months: number[];
}

// --- Monthly Suitability ---

export interface MonthlySuitability {
  destination_id: string;
  month: number; // 1-12
  score: number; // 0-5
  note: string;
  why_go?: string;
  why_not?: string;
}

// --- Kids Friendly ---

export interface KidsFriendly {
  destination_id: string;
  suitable: boolean;
  rating: number; // 1-5
  min_recommended_age: number;
  best_age_group: string;
  stroller_accessible: boolean;
  reasons: string[];
  concerns: string[];
  kid_highlights: string[];
  not_suitable_reason: string | null;
}

// --- Confidence Card ---

export interface ConfidenceCard {
  destination_id: string;
  safety_rating: number; // 1-5
  safety_notes: string;
  reach: ReachInfo;
  sleep: SleepInfo;
  fuel: FuelInfo;
  weather_night: WeatherNightInfo;
  emergency: EmergencyInfo;
  network: NetworkInfo;
  people_who_help: HelperContact[];
}

export interface ReachInfo {
  from_nearest_city: string;
  road_condition: string;
  public_transport: string;
  self_drive: string;
  last_km_difficulty: ApproachDifficulty;
}

export interface SleepInfo {
  options_count: number;
  types: string[];
  price_range_inr: string;
  booking_method: string;
  emergency_stay: string;
}

export interface FuelInfo {
  nearest_petrol_pump: string;
  next_after_that: string;
  ev_charging: boolean;
  carry_extra: boolean;
  jerry_can_size_liters?: number;
}

export interface WeatherNightInfo {
  summer_low_c: number;
  winter_low_c: number;
  note: string;
}

export interface EmergencyInfo {
  nearest_hospital: string;
  police_station: string;
  rescue: string;
  ambulance: string;
  helpline: string;
}

export interface NetworkInfo {
  jio: boolean;
  airtel: boolean;
  bsnl: boolean;
  vi: boolean;
  wifi_available: string;
  note: string;
}

export interface HelperContact {
  name: string;
  role: string;
  contact: string;
  note: string;
}

// --- Sub-Destination ---

export interface SubDestination {
  id: string;
  parent_id: string;
  name: string;
  coords: { lat: number; lng: number } | null;
  elevation_m: number | null;
  type: string | null;
  tagline: string | null;
  why_visit: string;
  highlights: string[];
  kids_ok: boolean;
  kids_note: string | null;
  time_needed: string;
  distance_from_parent_km: number;
  best_months: number[];
  tags: string[];
  translations: Translations<SubDestinationTranslatable>;
}

// --- Hidden Gem ---

export interface HiddenGem {
  id: string;
  near_destination_id: string;
  name: string;
  coords: { lat: number; lng: number } | null;
  distance_km: number;
  drive_time: string;
  why_unknown: string;
  why_go: string;
  difficulty: string;
  social_proof: string | null;
  confidence_score: number; // 1-5
  tags: string[];
  translations: Translations<HiddenGemTranslatable>;
}

// --- Local Legend ---

export interface LocalLegend {
  id: string;
  destination_id: string;
  name: string;
  known_as: string | null;
  role: string;
  story: string;
  contact: string | null;
  social: string | null;
}

// --- Viral Eat ---

export interface ViralEat {
  id: string;
  destination_id: string;
  name: string;
  location: string;
  type: string;
  famous_for: string;
  viral_on: string;
  price_range: string;
  honest_review: string;
}

// --- Route ---

export interface Route {
  id: string;
  name: string;
  days: number;
  difficulty: Difficulty;
  best_months: number[];
  stops: string[]; // destination IDs in order
  description: string;
  kids_suitable: boolean;
  bike_route: boolean;
  budget_range: string;
  highlights: string[];
  logistics: string;
  day_by_day: RouteDayPlan[];
}

export interface RouteDayPlan {
  day: number;
  from: string;
  to: string;
  km: number;
  plan: string;
}

// --- Trek ---

export interface Trek {
  id: string;
  name: string;
  destination_id: string;
  difficulty: Difficulty;
  duration_days: number;
  max_altitude_m: number;
  distance_km: number;
  best_months: number[];
  permits_required: boolean;
  kids_suitable: boolean;
  min_age: number | null;
  fitness_level: string;
  description: string;
  highlights: string[];
  warnings: string[];
}

// --- Camping Spot ---

export interface CampingSpot {
  id: string;
  name: string;
  destination_id: string;
  coords: { lat: number; lng: number } | null;
  elevation_m: number;
  open_months: number[];
  permit_required: boolean;
  water_source: boolean;
  facilities: string;
  description: string;
  tags: string[];
}

// --- Collection ---

export interface Collection {
  id: string;
  name: string;
  description: string;
  items: CollectionItem[];
  cover_image: string | null;
  tags: string[];
}

export interface CollectionItem {
  destination_id: string;
  note: string;
  rank: number;
}

// --- Superlative ---

export interface Superlative {
  id: string;
  title: string;
  destination_id: string;
  name: string;
  detail: string;
  coords: { lat: number; lng: number } | null;
  tags: string[];
}

// --- Permit ---

export interface Permit {
  id: string;
  destination_id: string;
  type: string;
  who_needs: string;
  foreigners: string;
  how_to_get: string;
  documents_needed: string[];
  cost_inr: number;
  processing_time: string;
  validity: string;
  government_link: string;
  pro_tip: string;
}

// --- Festival ---

export interface Festival {
  id: string;
  destination_id: string;
  name: string;
  month: number;
  approximate_date: string;
  description: string;
  significance: string;
}

// --- Gear Checklist ---

export interface GearChecklist {
  id: string;
  name: string;
  route_type: string;
  items: GearItem[];
}

export interface GearItem {
  item: string;
  why: string;
  purchase_link: string | null;
  priority: "essential" | "recommended" | "nice-to-have";
}

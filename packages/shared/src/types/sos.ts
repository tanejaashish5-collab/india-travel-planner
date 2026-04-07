// ============================================================
// India Travel Planner — SOS & Community Types
// ============================================================

import type { SituationType, Persona } from "./destination";

// --- User Profile ---

export interface Profile {
  id: string; // matches auth.users.id
  display_name: string | null;
  persona: Persona;
  explorer_score: number;
  trips_completed: number;
  is_helper: boolean;
  helper_tier: HelperTier | null;
  created_at: string;
}

export type HelperTier = "basic" | "verified" | "official";

// --- SOS Alert ---

export interface SOSAlert {
  id: string;
  user_id: string;
  encrypted_location: string; // base64-encoded encrypted GPS
  situation_type: SituationType;
  party_size: number;
  vehicle_type: string | null;
  status: SOSStatus;
  created_at: string;
  resolved_at: string | null;
  ttl_delete_at: string | null;
}

export type SOSStatus = "active" | "accepted" | "in_progress" | "resolved" | "cancelled" | "expired";

// --- SOS Helper ---

export interface SOSHelper {
  id: string;
  user_id: string;
  location: { lat: number; lng: number };
  skills: string[];
  available: boolean;
  gender: string | null;
  organization: string | null;
  avg_rating: number;
  total_assists: number;
  last_seen_at: string;
}

// --- SOS Response ---

export interface SOSResponse {
  id: string;
  alert_id: string;
  helper_id: string;
  status: "accepted" | "en_route" | "arrived" | "resolved" | "cancelled";
  accepted_at: string;
  location_verified_at: string | null;
  fee_agreed_inr: number | null;
}

// --- Road Report ---

export interface RoadReport {
  id: string;
  user_id: string;
  destination_id: string;
  segment: string;
  status: "open" | "blocked" | "risky" | "slow";
  report: string;
  location: { lat: number; lng: number } | null;
  reported_at: string;
  verified: boolean;
  expires_at: string;
}

// --- Travel Buddy ---

export interface BuddyRequest {
  id: string;
  user_id: string;
  route_id: string | null;
  destination_ids: string[];
  start_date: string;
  end_date: string;
  budget_tier: string;
  persona: Persona;
  party_size: number;
  note: string;
  status: "open" | "matched" | "closed";
  created_at: string;
}

// --- Convoy ---

export interface Convoy {
  id: string;
  leader_id: string;
  route_id: string | null;
  name: string;
  start_date: string;
  vehicle_type: string;
  max_vehicles: number;
  current_vehicles: number;
  status: "forming" | "active" | "completed";
  created_at: string;
}

// --- Trip Journal ---

export interface TripJournal {
  id: string;
  user_id: string;
  title: string;
  route_id: string | null;
  status: "draft" | "active" | "completed" | "published";
  created_at: string;
}

export interface JournalEntry {
  id: string;
  journal_id: string;
  destination_id: string | null;
  day: number;
  text: string;
  photos: string[]; // URLs
  location: { lat: number; lng: number } | null;
  created_at: string;
}

// --- Gamification ---

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string; // e.g., "visit_5_border_villages"
  points: number;
}

export interface UserBadge {
  user_id: string;
  badge_id: string;
  earned_at: string;
  destination_id: string | null; // where it was earned
}

// --- Timed Check-in (zero-signal safety) ---

export interface TimedCheckin {
  id: string;
  user_id: string;
  expected_checkin_at: string;
  grace_period_hours: number;
  last_known_location: { lat: number; lng: number };
  emergency_contacts: string[]; // phone numbers
  status: "active" | "checked_in" | "overdue" | "sos_triggered";
  created_at: string;
}

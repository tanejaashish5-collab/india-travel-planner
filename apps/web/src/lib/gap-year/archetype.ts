import type { Archetype, Familiarity, Party } from "./types";

export function resolveArchetype(input: { familiarity: Familiarity; party: Party }): Archetype {
  const { familiarity, party } = input;
  if (familiarity === "first_timer" && party === "family_kids") return "marquee_family";
  if (familiarity === "seasoned" && party === "family_kids") return "confident_family";
  if (familiarity === "first_timer" && party === "solo_couple") return "first_timer_couple";
  return "offbeat_seeker";
}

export interface ArchetypeRules {
  iconicBias: "iconic_first" | "mixed" | "offbeat_first";
  trapSurfacing: "alongside" | "alongside_with_comparison" | "soft_suggest" | "replace";
  minScore: number;
  defaultStopsPerMonth: number;
  description: string;
}

export function archetypeRules(a: Archetype): ArchetypeRules {
  switch (a) {
    case "marquee_family":
      return {
        iconicBias: "iconic_first",
        trapSurfacing: "alongside",
        minScore: 4,
        defaultStopsPerMonth: 2,
        description:
          "First major India trip, with kids. Lead with recognisable names (Jaipur, Udaipur, Munnar). Offer offbeat as 'also try', never replace the iconic.",
      };
    case "confident_family":
      return {
        iconicBias: "mixed",
        trapSurfacing: "alongside_with_comparison",
        minScore: 4,
        defaultStopsPerMonth: 3,
        description:
          "Returning family — knows the big names, wants options. Mix iconic anchors with offbeat discoveries. Compare both when possible.",
      };
    case "first_timer_couple":
      return {
        iconicBias: "iconic_first",
        trapSurfacing: "soft_suggest",
        minScore: 4,
        defaultStopsPerMonth: 2,
        description:
          "First India trip, solo or couple. Lead with iconic so they feel confident; leave one 'try this too' slot per month for an offbeat gem.",
      };
    case "offbeat_seeker":
      return {
        iconicBias: "offbeat_first",
        trapSurfacing: "replace",
        minScore: 3,
        defaultStopsPerMonth: 3,
        description:
          "Seasoned traveller, no kids. Offbeat-first. If a trap has a known alternative, substitute the alternative silently.",
      };
  }
}

// List of destination IDs considered "iconic" — used to flag shortlist rows.
// These are the recognisable marquee destinations. Kept in code (not DB) so
// we can tune without migrations.
export const ICONIC_DESTINATION_IDS = new Set<string>([
  // Rajasthan
  "jaipur", "udaipur", "jodhpur", "jaisalmer", "pushkar", "ranthambore",
  // Kerala
  "munnar", "alleppey", "kumarakom", "thekkady", "fort-kochi", "varkala", "kovalam",
  // Goa
  "calangute-baga", "old-goa", "panaji", "anjuna",
  // Himachal / Uttarakhand
  "shimla", "manali", "dharamshala", "mcleodganj", "nainital", "mussoorie", "rishikesh", "haridwar",
  // Kashmir / Ladakh
  "srinagar", "gulmarg", "pahalgam", "leh", "pangong-tso", "nubra-valley",
  // North-plains / heritage
  "agra", "varanasi", "khajuraho", "amritsar", "delhi", "vrindavan", "mathura",
  // South
  "hampi", "mysuru", "coorg", "ooty", "kodaikanal", "pondicherry", "mahabalipuram",
  "madurai", "kanyakumari", "bengaluru",
  // Wildlife icons
  "bandhavgarh", "kanha", "jim-corbett", "gir-national-park", "kaziranga",
  // Beaches / islands
  "havelock-island", "neil-island", "port-blair",
  // Other recognizable
  "darjeeling", "gangtok", "tawang", "mumbai", "kolkata", "mahabaleshwar",
]);

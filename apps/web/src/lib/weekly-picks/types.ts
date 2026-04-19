/**
 * Weekly Picks — shared types for the rotating-top-5 editorial system.
 * Consumed by:
 *   - apps/web/src/app/api/weekly-picks/route.ts (producer)
 *   - apps/web/src/components/top-five-hero.tsx (UI consumer)
 *   - apps/web/src/app/[locale]/where-to-go/[month]/page.tsx (page consumer)
 *   - nakshiq-autoposter/yt_shorts_gen.py (social consumer — dupes shape)
 *
 * Contract: identical 5 destinations in the same order across all consumers,
 * for a given (month, week, year). See Weekly_Picks_PRD_v1.docx §8.1.
 */

export interface WeeklyPick {
  id: string;
  name: string;
  state: string | null;
  tagline: string | null;
  score: number;
  elevation_m: number | null;
  difficulty: string | null;
  position: 1 | 2 | 3 | 4 | 5;
  /** Week-level editorial hook — derived from note or prose_lead in v1. */
  why_this_week: string;
  image: string;
  /** 12 values, one per month, for the sparkline. Index 0 = January. */
  monthly_scores: number[];
  /** Internal data-completeness weight. Not shown to users. */
  quality_weight: number;
}

export interface WeeklyPicksResponse {
  month: number;
  month_name: string;
  week: number;
  year: number;
  /** e.g. "April 15–21, 2026" */
  date_range: string;
  /** Total 5/5 destinations this month — the "X of Y" context on the hero. */
  total_five_star: number;
  destinations: WeeklyPick[];
  previous_week: { month: number; week: number; year: number } | null;
  next_week: { month: number; week: number; year: number } | null;
  /** Ready-to-drop JSON-LD ItemList for the page head. */
  seo: Record<string, unknown>;
  /**
   * True when the algorithm dropped to score=4 because the 5/5 pool was
   * exhausted for this week. UI should label the hero "Good Time To Visit"
   * instead of "This Week's Picks" when true.
   */
  fallback_from_four: boolean;
}

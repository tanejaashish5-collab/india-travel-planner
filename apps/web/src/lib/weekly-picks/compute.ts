/**
 * Shared server-only computation — builds a WeeklyPicksResponse given
 * (month, week, year). Called by:
 *   - /api/weekly-picks/route.ts (external consumers like the autoposter)
 *   - /where-to-go/[month]/page.tsx server component (direct, no self-fetch)
 *
 * Avoiding the self-fetch at build time was the fix for a Vercel deploy
 * error: static generation would try to hit its own API route before the
 * deployment was live, which timed out. Calling this function directly
 * keeps it all inside the same server process.
 */

import { createClient } from "@supabase/supabase-js";
import {
  MONTH_NAMES,
  nextWeek,
  previousWeek,
  weekDateRange,
} from "./weight";
import {
  selectPicks,
  type Festival,
  type SelectionCandidate,
} from "./select";
import type { WeeklyPick, WeeklyPicksResponse } from "./types";

export async function computeWeeklyPicks(
  month: number,
  week: number,
  year: number,
): Promise<WeeklyPicksResponse | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  async function fetchScoreRows(minScore: number, maxScore: number) {
    const out: any[] = [];
    for (let off = 0; ; off += 1000) {
      const { data, error } = await supabase
        .from("destination_months")
        .select("destination_id, month, score, note, prose_lead, who_should_go, who_should_avoid")
        .eq("month", month)
        .gte("score", minScore)
        .lte("score", maxScore)
        .order("destination_id")
        .range(off, off + 999);
      if (error) return out;
      if (!data || data.length === 0) break;
      out.push(...data);
      if (data.length < 1000) break;
    }
    return out;
  }

  const [score5Rows, score4Rows] = await Promise.all([
    fetchScoreRows(5, 5),
    fetchScoreRows(4, 4),
  ]);

  if (score5Rows.length === 0 && score4Rows.length === 0) {
    return emptyResponse(year, month, week);
  }

  const ids = [...new Set([...score5Rows, ...score4Rows].map((r) => r.destination_id))];

  const [destRes, allMonthsRes, kfRes, festRes] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, state_id, tagline, difficulty, elevation_m, budget_tier, tags, state:states(name)")
      .in("id", ids),
    supabase
      .from("destination_months")
      .select("destination_id, month, score")
      .in("destination_id", ids),
    supabase
      .from("kids_friendly")
      .select("destination_id")
      .in("destination_id", ids),
    supabase
      .from("festivals")
      .select("destination_id, month, name")
      .eq("month", month)
      .in("destination_id", ids),
  ]);

  const destMap = new Map<string, any>();
  for (const d of destRes.data ?? []) destMap.set(d.id, d);

  const kidsPresent = new Set<string>();
  for (const k of kfRes.data ?? []) kidsPresent.add(k.destination_id);

  const monthlyById = new Map<string, number[]>();
  for (const id of ids) monthlyById.set(id, new Array(12).fill(0));
  for (const row of allMonthsRes.data ?? []) {
    const arr = monthlyById.get(row.destination_id);
    if (arr && row.month >= 1 && row.month <= 12) arr[row.month - 1] = row.score ?? 0;
  }

  const festivals: Festival[] = (festRes.data ?? []).map((f) => ({
    destination_id: f.destination_id,
    month: f.month,
    name: f.name,
  }));

  function toCandidate(r: any): SelectionCandidate | null {
    const d = destMap.get(r.destination_id);
    if (!d) return null;
    const stateInfo = d.state;
    const stateName = Array.isArray(stateInfo) ? stateInfo[0]?.name : stateInfo?.name;
    return {
      destination_id: r.destination_id,
      month: r.month,
      score: r.score,
      note: r.note ?? null,
      prose_lead: r.prose_lead ?? null,
      who_should_go: r.who_should_go ?? null,
      who_should_avoid: r.who_should_avoid ?? null,
      name: d.name,
      state_id: d.state_id ?? null,
      state_name: stateName ?? null,
      tagline: d.tagline ?? null,
      difficulty: d.difficulty ?? null,
      elevation_m: d.elevation_m ?? null,
      budget_tier: d.budget_tier ?? null,
      tags: d.tags ?? null,
      has_kids_friendly: kidsPresent.has(r.destination_id),
      monthly_scores: monthlyById.get(r.destination_id) ?? new Array(12).fill(0),
    };
  }

  // Stage 1: compute prior-week picks deterministically so this week
  // excludes them. No persistence — the same algorithm reproduces them.
  const priorPickIds = new Set<string>();
  for (let prevWk = 1; prevWk < week; prevWk++) {
    const eligible5 = score5Rows
      .map(toCandidate)
      .filter((c): c is SelectionCandidate => c !== null && !priorPickIds.has(c.destination_id));
    const eligible4 = score4Rows
      .map(toCandidate)
      .filter((c): c is SelectionCandidate => c !== null && !priorPickIds.has(c.destination_id));
    const prior = selectPicks(eligible5, prevWk, festivals, eligible4);
    for (const p of prior.picks) priorPickIds.add(p.destination_id);
  }

  const candidates5 = score5Rows
    .map(toCandidate)
    .filter((c): c is SelectionCandidate => c !== null && !priorPickIds.has(c.destination_id));
  const candidates4 = score4Rows
    .map(toCandidate)
    .filter((c): c is SelectionCandidate => c !== null && !priorPickIds.has(c.destination_id));

  const result = selectPicks(candidates5, week, festivals, candidates4);

  const destinations: WeeklyPick[] = result.picks.map((p) => ({
    id: p.destination_id,
    name: p.name,
    state: p.state_name,
    tagline: p.tagline,
    score: p.score,
    elevation_m: p.elevation_m,
    difficulty: p.difficulty,
    position: p.position,
    why_this_week: p.why_this_week,
    image: `/images/destinations/${p.destination_id}.jpg`,
    monthly_scores: p.monthly_scores,
    quality_weight: p.quality_weight,
  }));

  const monthName = MONTH_NAMES[month];
  const siteOrigin = "https://www.nakshiq.com";

  const seo = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    name: `Top 5 destinations in India in ${monthName} — Week ${week}`,
    description: `${monthName} week ${week} picks from NakshIQ: 5 destinations ranked by monthly score, data completeness, and geographic diversity.`,
    numberOfItems: destinations.length,
    itemListElement: destinations.map((d) => ({
      "@type": "ListItem",
      position: d.position,
      url: `${siteOrigin}/en/destination/${d.id}`,
      name: d.name,
      image: `${siteOrigin}${d.image}`,
    })),
  };

  return {
    month,
    month_name: monthName,
    week,
    year,
    date_range: weekDateRange(year, month, week),
    total_five_star: score5Rows.length,
    destinations,
    previous_week: previousWeek(year, month, week),
    next_week: nextWeek(year, month, week),
    seo,
    fallback_from_four: result.fallback_from_four,
  };
}

function emptyResponse(year: number, month: number, week: number): WeeklyPicksResponse {
  return {
    month,
    month_name: MONTH_NAMES[month] ?? "",
    week,
    year,
    date_range: weekDateRange(year, month, week),
    total_five_star: 0,
    destinations: [],
    previous_week: previousWeek(year, month, week),
    next_week: nextWeek(year, month, week),
    seo: {},
    fallback_from_four: false,
  };
}

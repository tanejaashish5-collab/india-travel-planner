import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { LandingCinema } from "@/components/landing-cinema";
import type { DispatchHero } from "@/components/landing-cinema/act-1-dispatch";
import type { SkipEntry } from "@/components/landing-cinema/act-2-skip";
import type { SceneEntry } from "@/components/landing-cinema/act-3-scenes";
import type { AtlasPin } from "@/components/landing-cinema/act-4-atlas";
import type { VerdictMap, VerdictCard, VibeKey } from "@/components/landing-cinema/act-5-directors-cut";
import type { FieldNote } from "@/components/landing-cinema/act-5h-field-note";
import type { DailyEntry, DailiesStats } from "@/components/landing-cinema/act-6-dailies";
// GuidedTour temporarily removed from landing per Ashish 2026-05-05; the
// 6-step onboarding spotlight conflicts visually with the cinematic ACT I
// hero and may be redesigned or retired entirely. The component still
// exists for other pages — just not mounted here.
import { createClient } from "@supabase/supabase-js";
import { getAppStats } from "@/lib/stats";
import { currentMonthIST, verdictFor, dailyRotation } from "@itp/shared";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `https://www.nakshiq.com/${locale}`,
      languages: {
        en: "https://www.nakshiq.com/en",
        hi: "https://www.nakshiq.com/hi",
        "x-default": "https://www.nakshiq.com/en",
      },
    },
  };
}

async function getFeaturedData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { destinations: [], collections: [], routes: [], festivals: [], mapPins: [] as any[], dispatchHeroes: [] as DispatchHero[], skipList: [] as SkipEntry[], scenes: [] as SceneEntry[], atlasPins: [] as AtlasPin[], verdictMap: {} as VerdictMap, fieldNote: null as FieldNote | null, dailies: [] as DailyEntry[], dailiesStats: { totalVerified: 0, totalSkipListed: 0, freshDestinationsThisMonth: 0 } as DailiesStats, stats: { places: 0, destinations: 0, states: 0, routes: 0, festivals: 0, collections: 0, treks: 0, traps: 0, permits: 0, campingSpots: 0 } };

  const supabase = createClient(url, key);
  const currentMonth = currentMonthIST();

  const [destResult, collResult, routeResult, destCount, subCount, gemCount, stateCount, routeCount, festResult, coordsResult, allMonthScores, allDestsResult, skipResult] = await Promise.all([
    // Now also pulls content_reviewed_at + why_go so the cinematic ACT I
    // Dispatch hero can render real "VERIFIED MAY 04" labels and editorial
    // why_go copy without a second query. Column is `content_reviewed_at`
    // on destinations (not `verified_at` — that doesn't exist; nor
    // `last_verified` which is all-NULL today).
    // Pool of top-20 (was top-6). Combined with dailyRotation() below, the
    // dispatch + scenes sets shift each IST day instead of showing the
    // same 5 destinations for the whole month. See 2026-05-17 user note.
    // Secondary sort on destination_id keeps ties deterministic so the
    // rotation seed produces stable picks across renders.
    supabase
      .from("destination_months")
      .select("destination_id, score, why_go, destinations(id, name, tagline, difficulty, elevation_m, content_reviewed_at, state:states(name))")
      .eq("month", currentMonth)
      .gte("score", 4)
      .order("score", { ascending: false })
      .order("destination_id", { ascending: true })
      .limit(20),
    supabase.from("collections").select("id, name, description, tags").limit(6),
    supabase.from("routes").select("id, name, days, difficulty, kids_suitable, highlights").order("days").limit(6),
    // Real counts
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("sub_destinations").select("*", { count: "exact", head: true }),
    supabase.from("hidden_gems").select("*", { count: "exact", head: true }),
    supabase.from("states").select("*", { count: "exact", head: true }),
    supabase.from("routes").select("*", { count: "exact", head: true }),
    // Upcoming festivals (current month + next 3 months)
    supabase
      .from("festivals")
      .select("*, destinations(name)")
      .or(`month.eq.${currentMonth},month.eq.${(currentMonth % 12) + 1},month.eq.${((currentMonth + 1) % 12) + 1}`)
      .order("month")
      .limit(8),
    // Destination coordinates + month scores for homepage map
    supabase.from("destinations_with_coords").select("id, lat, lng"),
    supabase
      .from("destination_months")
      .select("destination_id, score")
      .eq("month", currentMonth),
    // Now also pulls state name so the ACT IV Atlas field-log sidebar can
    // show "BHADERWAH · J&K" without a second join.
    supabase.from("destinations").select("id, name, state:states(name)").order("name"),
    // Skip list — current-month AVOID destinations (DB score 0-1 = 0.0-2.0
    // on the displayed 0-10 scale). Uses `why_not` (editorial reason this
    // month is wrong) and falls back to `skip_reason` for the punchier
    // subhead. Ordered by score ASC then name so the strongest "AVOID"
    // candidates surface first. Limit 5 to keep ACT II tight.
    supabase
      .from("destination_months")
      .select("destination_id, score, why_not, skip_reason, destinations(id, name, compare_against, state:states(name))")
      .eq("month", currentMonth)
      .lte("score", 1)
      .not("why_not", "is", null)
      .order("score", { ascending: true })
      .order("destination_id", { ascending: true })
      .limit(5),
  ]);

  const totalPlaces = (destCount.count ?? 0) + (subCount.count ?? 0) + (gemCount.count ?? 0);

  // Build map pins: merge coords + names + month scores
  const coordsMap = Object.fromEntries(
    (coordsResult.data ?? []).map((c: any) => [c.id, { lat: c.lat, lng: c.lng }])
  );
  const scoresMap = Object.fromEntries(
    (allMonthScores.data ?? []).map((s: any) => [s.destination_id, s.score])
  );
  const mapPins = (allDestsResult.data ?? [])
    .filter((d: any) => coordsMap[d.id])
    .map((d: any) => {
      const stateName = Array.isArray(d?.state) ? d.state[0]?.name : d?.state?.name;
      return {
        id: d.id,
        name: d.name,
        state: stateName ?? "",
        lat: coordsMap[d.id].lat,
        lng: coordsMap[d.id].lng,
        score: scoresMap[d.id] ?? null,
      };
    });

  // Daily rotation: pool stays at top-20 by score, but we pick a different
  // window each IST day so the landing doesn't feel static for 31 days.
  // pin=true means the #1-scored dest is always in the result ("today's
  // must-go" stays put), the rest slide. Same pool/rotation feeds both
  // dispatch heroes (top 3 of rotation) and Act III scenes (top 5) so they
  // stay coherent — same rotation seed = same daily picks for both.
  // See packages/shared/src/utils/daily-rotation.ts for the algorithm.
  const rotatedDests = dailyRotation(destResult.data ?? [], 8, { pinTop: true });

  // Top 3 PEAK destinations shaped for the ACT I Dispatch slideshow.
  // Reuses rotatedDests so we don't fire a second round-trip — the slice
  // pulls today's rotated top-3 from the larger pool.
  const dispatchHeroes: DispatchHero[] = rotatedDests
    .slice(0, 3)
    .map((row: any) => {
      const d = row.destinations;
      const stateName = Array.isArray(d?.state) ? d.state[0]?.name : d?.state?.name;
      return {
        id: d?.id ?? "",
        name: d?.name ?? "",
        state: stateName ?? "",
        score: row.score ?? 0,
        tagline: d?.tagline ?? null,
        why_go: row.why_go ?? null,
        verified_at: d?.content_reviewed_at ?? null,
        elevation_m: d?.elevation_m ?? null,
      };
    })
    .filter((h) => h.id);

  // ACT III Scenes — same rotated pool, top-5. The v8 design uses 5 sticky
  // scenes (02-06 since the hero is "scene 01"). Reuses why_go for the
  // editorial dossier in the lower-left of each scene.
  // Same rotatedDests as dispatchHeroes → scenes will overlap with the
  // top-3 dispatch (intentional — dispatch is "today's headliners",
  // scenes are "scroll-deep on the same dispatch").
  const scenes: SceneEntry[] = rotatedDests
    .slice(0, 5)
    .map((row: any) => {
      const d = row.destinations;
      const stateName = Array.isArray(d?.state) ? d.state[0]?.name : d?.state?.name;
      return {
        id: d?.id ?? "",
        name: d?.name ?? "",
        state: stateName ?? "",
        score: row.score ?? 0,
        tagline: d?.tagline ?? null,
        why: row.why_go ?? null,
        elevation_m: d?.elevation_m ?? null,
        difficulty: d?.difficulty ?? null,
        verified_at: d?.content_reviewed_at ?? null,
      };
    })
    .filter((s) => s.id);

  // Skip list — shape rows for ACT II. Pull the "try instead" hint from
  // the why_not text (most rows include "should plan for {months}" — we
  // surface that as a suggested-window line) plus first compare_against
  // entry where it exists.
  const skipList: SkipEntry[] = (skipResult.data ?? [])
    .map((row: any) => {
      const d = row.destinations;
      const stateName = Array.isArray(d?.state) ? d.state[0]?.name : d?.state?.name;
      return {
        id: d?.id ?? "",
        name: d?.name ?? "",
        state: stateName ?? "",
        score: row.score ?? 0,
        why_not: row.why_not ?? null,
        skip_reason: row.skip_reason ?? null,
        compare_against: Array.isArray(d?.compare_against) ? d.compare_against : null,
      };
    })
    .filter((s) => s.id && s.why_not);

  // ACT IV Atlas pins — pick 4 PEAK + 1 AVOID for visual contrast.
  // Top pins from mapPins where score >= 4, plus the lowest-scoring entry.
  // Filters to those with valid coords + non-null score so pins always
  // project to a real lat/lng spot on the India outline.
  const peakPins: AtlasPin[] = (mapPins as any[])
    .filter((p) => p.lat != null && p.lng != null && (p.score ?? 0) >= 4)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      state: p.state ?? "",
      lat: Number(p.lat),
      lng: Number(p.lng),
      score: Math.min(10, (p.score ?? 0) * 2),
      avoid: false,
    }));
  const avoidPin: AtlasPin | null = (() => {
    const candidate = (mapPins as any[])
      .filter((p) => p.lat != null && p.lng != null && (p.score ?? 5) <= 1)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0];
    if (!candidate) return null;
    return {
      id: candidate.id,
      name: candidate.name,
      state: candidate.state ?? "",
      lat: Number(candidate.lat),
      lng: Number(candidate.lng),
      score: Math.min(10, (candidate.score ?? 0) * 2),
      avoid: true,
    };
  })();
  const atlasPins: AtlasPin[] = avoidPin ? [...peakPins, avoidPin] : peakPins;

  // ACT V Director's Cut — top-scored destination for every (vibe, month)
  // pair, from the directors_cut_verdicts view (migration 064). This backs
  // the month token in the intake sentence: it drives a real verdict card
  // for any of the 12 months, not just the current one.
  const verdictRowsR = await supabase
    .from("directors_cut_verdicts")
    .select(
      "vibe, month, score, why_go, destination_id, destination_name, tagline, state_name",
    );
  const verdictMap: VerdictMap = {};
  for (const row of (verdictRowsR.data ?? []) as Array<{
    vibe: VibeKey;
    month: number;
    score: number | null;
    why_go: string | null;
    destination_id: string | null;
    destination_name: string | null;
    tagline: string | null;
    state_name: string | null;
  }>) {
    const displayScore = Math.min(10, (row.score ?? 0) * 2);
    if (displayScore < 6) continue; // honour the "scoring above 6.0" promise
    (verdictMap[row.vibe] ??= {})[row.month] = {
      id: row.destination_id ?? "",
      name: row.destination_name ?? "",
      state: row.state_name ?? "",
      score: displayScore,
      tagline: row.tagline ?? null,
      why: row.why_go ?? null,
      verdictLabel: verdictFor(displayScore),
    };
  }

  // ACT VI Dailies — six most-recently-verified destinations + their score
  // for the current month. Mixes PEAK (action=VERIFIED) with the lowest
  // scorers (action=SKIP-LISTED) for editorial balance. Uses real
  // destinations.content_reviewed_at for the timestamp on each card.
  const [dailiesVerifiedR, dailiesSkippedR, dailiesStatsR] = await Promise.all([
    supabase
      .from("destination_months")
      .select("score, destinations!inner(id, name, content_reviewed_at, state:states(name))")
      .eq("month", currentMonth)
      .gte("score", 4)
      .order("destinations(content_reviewed_at)", { ascending: false })
      .limit(4),
    supabase
      .from("destination_months")
      .select("score, destinations!inner(id, name, content_reviewed_at, state:states(name))")
      .eq("month", currentMonth)
      .lte("score", 1)
      .order("destinations(content_reviewed_at)", { ascending: false })
      .limit(2),
    supabase
      .from("destination_months")
      .select("score, destinations!inner(content_reviewed_at)", { count: "exact", head: false })
      .eq("month", currentMonth),
  ]);
  const shapeDaily = (rows: unknown[], action: DailyEntry["action"]): DailyEntry[] =>
    (rows as Array<{
      score: number;
      destinations: {
        id: string;
        name: string;
        content_reviewed_at: string | null;
        state?: { name: string } | { name: string }[];
      };
    }>).map((row) => {
      const d = row.destinations;
      const stateName = Array.isArray(d?.state) ? d.state[0]?.name : d?.state?.name;
      return {
        id: d?.id ?? "",
        name: d?.name ?? "",
        state: stateName ?? "",
        score: Math.min(10, (row.score ?? 0) * 2),
        verifiedAt: d?.content_reviewed_at ?? null,
        action,
      };
    });
  const dailies: DailyEntry[] = [
    ...shapeDaily(dailiesVerifiedR.data ?? [], "VERIFIED"),
    ...shapeDaily(dailiesSkippedR.data ?? [], "SKIP-LISTED"),
  ].slice(0, 6);

  // Trust-bar stats. Fresh = verified within the last 60 days.
  const allMonthRowsForStats = (dailiesStatsR.data ?? []) as unknown as Array<{
    score: number;
    destinations: { content_reviewed_at: string | null };
  }>;
  const freshCutoff = Date.now() - 60 * 24 * 60 * 60 * 1000;
  const freshDestinationsThisMonth = allMonthRowsForStats.filter((r) => {
    const dRef = Array.isArray(r.destinations) ? r.destinations[0] : r.destinations;
    const ts = dRef?.content_reviewed_at;
    if (!ts) return false;
    return new Date(ts).getTime() >= freshCutoff;
  }).length;
  const totalSkipListed = allMonthRowsForStats.filter((r) => (r.score ?? 5) <= 1).length;
  const dailiesStats: DailiesStats = {
    totalVerified: allMonthRowsForStats.length,
    totalSkipListed,
    freshDestinationsThisMonth,
  };

  // ACT V½ Field Note — derives a transcribed quote from the top dispatch
  // hero's tagline (already editorial, already real). When a curated
  // field-notes/{YYYY-MM}.json data file lands, swap this in for a daily
  // rotation. No fabricated authors per locked plan.
  const topHero = dispatchHeroes[0];
  const fieldNote: FieldNote | null = topHero
    ? {
        destinationId: topHero.id,
        destinationName: topHero.name,
        state: topHero.state,
        quote: topHero.tagline ?? topHero.why_go ?? "",
        verifiedAt: topHero.verified_at,
      }
    : null;

  return {
    destinations: destResult.data ?? [],
    collections: collResult.data ?? [],
    routes: routeResult.data ?? [],
    festivals: festResult.data ?? [],
    mapPins,
    dispatchHeroes,
    skipList,
    scenes,
    atlasPins,
    verdictMap,
    fieldNote,
    dailies,
    dailiesStats,
    stats: await getAppStats(),
  };
}

export default async function Home() {
  const { collections, dispatchHeroes, skipList, scenes, atlasPins, verdictMap, fieldNote, dailies, dailiesStats } =
    await getFeaturedData();

  return (
    <>
      <Nav />
      {/* <main> landmark added for accessibility — axe flagged 17 "region"
          violations on the homepage because primary content sat outside any
          landmark (BUG-107). Also acts as a belt-and-suspenders skip-link
          target on /hi/ (BUG-108); the id mirrors the one in PageTransition
          so the existing <a href="#main-content"> always has somewhere
          valid to land on both locales. */}
      <main id="main-content-home">
        <LandingCinema
          dispatchHeroes={dispatchHeroes}
          skipList={skipList}
          scenes={scenes}
          atlasPins={atlasPins}
          verdictMap={verdictMap}
          fieldNote={fieldNote}
          dailies={dailies}
          dailiesStats={dailiesStats}
          collections={collections}
        />
      </main>
      {/* Footer omitted on landing — ACT IX Coda absorbs the footer line. */}
    </>
  );
}

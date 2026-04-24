import { createClient } from "@supabase/supabase-js";
import type { WindowIssueProps } from "@/emails/the-window";
import { pickOpening, pickClosing } from "./voice-pool";
import { computeWeeklyPicks } from "@/lib/weekly-picks/compute";
import { weekOfMonth } from "@/lib/weekly-picks/weight";

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function isoWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export type IssueBuildResult = {
  props: Omit<WindowIssueProps, "unsubscribeUrl" | "webViewUrl">;
  slug: string;
  subject: string;
  previewText: string;
} | { error: string };

/**
 * Optional overrides for special-edition ships (Issue #1 launch, year-end,
 * 100th issue, crisis response, etc). Weekly auto-cron passes nothing;
 * regular sends behave identically to before.
 */
export type IssueOverrides = Partial<{
  issueNumber: number;
  subject: string;
  previewText: string;
  opening: string;
  closing: string;
  slug: string;
}>;

/**
 * Builds "The Window" issue content from live Supabase data.
 * Returns the template props ready for React Email, OR an error if required data is missing.
 */
export async function buildWindowIssue(overrides?: IssueOverrides): Promise<IssueBuildResult> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Supabase not configured" };

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const issueNumber = overrides?.issueNumber ?? isoWeekNumber(now);
  const monthName = MONTH_NAMES[currentMonth];
  const year = now.getFullYear();
  // Alignment contract: newsletter slug matches the Weekly Picks week the
  // landing page will show on the day the email lands. Sunday 07:00 IST
  // sends are inside that week (Mon 00:00 IST → Sun 23:59 IST), so using
  // weekOfMonth(now) keeps newsletter + hero + autoposter on one story.
  const weeklyWeek = weekOfMonth(now);
  const slug = overrides?.slug ?? `${year}-${String(currentMonth).padStart(2, "0")}-w${weeklyWeek}`;

  // 1. Best score — the #1 Weekly Picks pick for this month + week. Same
  //    selectPicks() call the landing page and autoposter make, so the
  //    featured destination the reader sees in the email matches the hero
  //    they'll see tomorrow on /where-to-go/{month}.
  const weeklyPicks = await computeWeeklyPicks(currentMonth, weeklyWeek, year);
  if (!weeklyPicks || weeklyPicks.destinations.length === 0) {
    return { error: "Weekly Picks returned no destinations" };
  }
  const featured = weeklyPicks.destinations[0];
  const bestScore = {
    destinationId: featured.id,
    name: featured.name,
    state: featured.state ?? "India",
    score: featured.score,
    note: featured.why_this_week ?? "",
    whyGo: featured.tagline ?? undefined,
  };

  // Full ranked set for Format 5 template — numbered spine № 02-05
  const picks = weeklyPicks.destinations.slice(0, 5).map((d) => ({
    id: d.id,
    name: d.name,
    state: d.state,
    score: d.score,
    elevation_m: d.elevation_m,
    difficulty: d.difficulty,
    why_this_week: d.why_this_week,
    image: d.image,
    primary_tag: null,
  }));

  // 2. Honest skip — one tourist trap + alternative, rotate by week
  const { data: traps } = await supabase
    .from("tourist_trap_alternatives")
    .select(`
      why_better, comparison, vibe_difference, crowd_difference,
      trap_destination:destinations!tourist_trap_alternatives_trap_destination_id_fkey(id, name),
      alt_destination:destinations!tourist_trap_alternatives_alternative_destination_id_fkey(id, name)
    `)
    .order("rank")
    .limit(20);

  let skip: WindowIssueProps["skip"] = null;
  if (traps && traps.length > 0) {
    const trapPick = traps[issueNumber % traps.length] as any;
    const trapDest = Array.isArray(trapPick.trap_destination) ? trapPick.trap_destination[0] : trapPick.trap_destination;
    const altDest = Array.isArray(trapPick.alt_destination) ? trapPick.alt_destination[0] : trapPick.alt_destination;
    if (trapDest?.name && altDest?.name) {
      skip = {
        trapName: trapDest.name,
        trapReason: trapPick.comparison ?? trapPick.crowd_difference ?? trapPick.vibe_difference ?? "",
        alternativeId: altDest.id,
        alternativeName: altDest.name,
        alternativeReason: trapPick.why_better ?? "",
      };
    }
  }

  // 3. Road intel — one verified, non-expired road_reports entry
  const nowIso = new Date().toISOString();
  const { data: reports } = await supabase
    .from("road_reports")
    .select("segment, status, report, destination_id, destinations(name)")
    .eq("verified", true)
    .or(`expires_at.is.null,expires_at.gt.${nowIso}`)
    .order("reported_at", { ascending: false })
    .limit(10);

  let road: WindowIssueProps["road"] = null;
  if (reports && reports.length > 0) {
    const pick = reports[issueNumber % reports.length] as any;
    if (pick.segment || pick.report) {
      const destName = Array.isArray(pick.destinations) ? pick.destinations[0]?.name : pick.destinations?.name;
      const title = pick.segment
        ? `${pick.segment}${pick.status ? ` \u2014 ${pick.status}` : ""}`
        : `Road update near ${destName ?? "the route"}`;
      road = {
        title,
        body: pick.report ?? `${pick.status ?? "Status unknown"}.`,
        destinationId: pick.destination_id ?? undefined,
      };
    }
  }

  // 4. What changed — counts in last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const [scoresRes, destsRes] = await Promise.all([
    supabase
      .from("destination_months")
      .select("*", { count: "exact", head: true })
      .gte("updated_at", sevenDaysAgo),
    supabase
      .from("destinations")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo),
  ]);

  const changes = {
    scoresUpdated: scoresRes.count ?? 0,
    notesEdited: 0, // Same table; we don't separately track note edits
    destinationsAdded: destsRes.count ?? 0,
  };

  const opening = overrides?.opening ?? pickOpening(issueNumber);
  const closing = overrides?.closing ?? pickClosing(issueNumber);

  const subject = overrides?.subject ?? `${bestScore.name} scores ${bestScore.score}/5 this week`;
  const previewText = overrides?.previewText ?? `${bestScore.name}, ${bestScore.state} — and the place you should skip instead.`;

  return {
    props: {
      issueNumber,
      monthName,
      year,
      opening,
      picks,
      bestScore,
      skip,
      road,
      changes,
      closing,
    },
    slug,
    subject,
    previewText,
  };
}

import { createClient } from "@supabase/supabase-js";
import type { WindowIssueProps } from "@/emails/the-window";
import { pickOpening, pickClosing } from "./voice-pool";

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
 * Builds "The Window" issue content from live Supabase data.
 * Returns the template props ready for React Email, OR an error if required data is missing.
 */
export async function buildWindowIssue(): Promise<IssueBuildResult> {
  const supabase = getSupabase();
  if (!supabase) return { error: "Supabase not configured" };

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const issueNumber = isoWeekNumber(now);
  const monthName = MONTH_NAMES[currentMonth];
  const year = now.getFullYear();
  const slug = `${year}-w${String(issueNumber).padStart(2, "0")}`;

  // 1. Best score — highest-scoring destination this month, avoid recent features
  const { data: topScores } = await supabase
    .from("destination_months")
    .select("score, note, why_go, destination_id, destinations(id, name, state:states(name))")
    .eq("month", currentMonth)
    .gte("score", 4)
    .order("score", { ascending: false })
    .limit(20);

  if (!topScores || topScores.length === 0) {
    return { error: "No top-scored destinations available for this month" };
  }

  // Pick by week rotation to avoid repeating within a month
  const picked = topScores[issueNumber % topScores.length] as any;
  const destRow = picked.destinations;
  if (!destRow) return { error: "Top destination row missing join" };

  const stateRow = Array.isArray(destRow.state) ? destRow.state[0] : destRow.state;
  const bestScore = {
    destinationId: destRow.id,
    name: destRow.name,
    state: stateRow?.name ?? "India",
    score: picked.score,
    note: picked.note ?? "",
    whyGo: picked.why_go ?? undefined,
  };

  // 2. Honest skip — one tourist trap + alternative, rotate by week
  const { data: traps } = await supabase
    .from("tourist_trap_alternatives")
    .select(`
      reason, alternative_reason,
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
        trapReason: trapPick.reason ?? "",
        alternativeId: altDest.id,
        alternativeName: altDest.name,
        alternativeReason: trapPick.alternative_reason ?? "",
      };
    }
  }

  // 3. Road intel — one recent alert, optional
  const { data: alerts } = await supabase
    .from("destination_alerts")
    .select("title, description, destination_id")
    .order("updated_at", { ascending: false })
    .limit(5);

  let road: WindowIssueProps["road"] = null;
  if (alerts && alerts.length > 0) {
    const pick = alerts[issueNumber % alerts.length] as any;
    if (pick.title) {
      road = {
        title: pick.title,
        body: pick.description ?? "",
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

  const opening = pickOpening(issueNumber);
  const closing = pickClosing(issueNumber);

  const subject = `${bestScore.name} scores ${bestScore.score}/5 this week`;
  const previewText = `${bestScore.name}, ${bestScore.state} — and the place you should skip instead.`;

  return {
    props: {
      issueNumber,
      monthName,
      year,
      opening,
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

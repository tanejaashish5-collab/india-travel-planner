/**
 * /api/quiz-match — Sprint 6 risk-quiz matcher.
 *
 * Accepts the 5-question quiz state and returns 5 destination matches
 * ranked against the destination_months scoring table + persona fit.
 *
 * No paid API calls, no LLM. Pure SQL + deterministic ranking.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type Group = "solo" | "couple" | "family-kids" | "friends" | "parents";
type Duration = "weekend" | "week" | "two-weeks" | "long";
type Priority = "heritage" | "nature" | "food" | "adventure" | "rest";
type Comfort = "budget" | "mid" | "premium";

type QuizInput = {
  group?: Group | null;
  duration?: Duration | null;
  priority?: Priority | null;
  comfort?: Comfort | null;
  month?: number | null;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Priority → kids/solo-female/segment keyword matches
const PRIORITY_KEYWORDS: Record<Priority, string[]> = {
  heritage: ["heritage", "UNESCO", "temple", "monastery", "fort", "haveli", "ruins", "architecture"],
  nature: ["wildlife", "mountain", "forest", "valley", "trek", "lake", "landscape", "coast"],
  food: ["cuisine", "culinary", "food", "street", "biryani", "regional"],
  adventure: ["trek", "motorcycle", "biker", "adventure", "high-altitude", "diving", "rafting", "pass"],
  rest: ["ayurveda", "wellness", "yoga", "beach", "retreat", "slow", "spa"],
};

// Comfort → budget_tier mapping
const COMFORT_TIER: Record<Comfort, number[]> = {
  budget: [1, 2],
  mid: [2, 3],
  premium: [3, 4],
};

export async function POST(req: NextRequest) {
  let body: QuizInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { group, duration, priority, comfort, month } = body;
  if (!group || !duration || !priority || !comfort || !month || month < 1 || month > 12) {
    return NextResponse.json({ ok: false, error: "missing_answers" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "db_misconfigured" }, { status: 500 });
  }

  // Step 1: pull all destination_months for the chosen month with go verdict
  const { data: monthRows, error: monthErr } = await supabase
    .from("destination_months")
    .select("destination_id, month, score, verdict, why_go")
    .eq("month", month)
    .in("verdict", ["go", "wait"])
    .gte("score", 6)
    .order("score", { ascending: false });

  if (monthErr) {
    return NextResponse.json({ ok: false, error: monthErr.message }, { status: 500 });
  }

  const candidateIds = Array.from(new Set((monthRows ?? []).map((r) => r.destination_id)));
  if (candidateIds.length === 0) {
    return NextResponse.json({ ok: true, results: [] });
  }

  // Step 2: fetch candidate destinations with persona_blocks, best_for_segments,
  // kids_friendly, budget_tier for scoring
  const { data: dests, error: destErr } = await supabase
    .from("destinations")
    .select(`
      id, name, state_id, budget_tier, difficulty, elevation_m,
      persona_blocks, best_for_segments,
      state:states(name),
      kids_friendly(rating, suitable),
      solo_female_score
    `)
    .in("id", candidateIds);

  if (destErr) {
    return NextResponse.json({ ok: false, error: destErr.message }, { status: 500 });
  }

  const byId = new Map<string, Record<string, unknown>>((dests ?? []).map((d) => [d.id, d as Record<string, unknown>]));

  // Step 3: score each candidate
  const kws = PRIORITY_KEYWORDS[priority];
  const tiers = COMFORT_TIER[comfort];

  type Candidate = {
    destination_id: string;
    name: string;
    state_name: string;
    score: number;         // combined ranking score
    base_score: number;    // original destination_month score
    why_go: string;
  };

  const scored: Candidate[] = [];
  for (const mr of monthRows ?? []) {
    const d = byId.get(mr.destination_id);
    if (!d) continue;

    let rank = Number(mr.score) * 10; // base score weight

    // Group-specific fit
    if (group === "family-kids") {
      const kf = Array.isArray(d.kids_friendly) ? (d.kids_friendly as unknown[])[0] as { rating?: number; suitable?: boolean } : d.kids_friendly as { rating?: number; suitable?: boolean } | null;
      if (!kf || kf.suitable !== true || (kf.rating ?? 0) < 4) continue; // hard filter
      rank += (kf.rating ?? 0) * 3;
    } else if (group === "parents") {
      if (d.difficulty === "extreme" || d.difficulty === "hard") continue;
      if ((d.elevation_m as number | null) && (d.elevation_m as number) > 2500) continue;
      const pb = d.persona_blocks as Record<string, string> | null;
      if (pb?.elderly?.toUpperCase().startsWith("GO")) rank += 12;
    } else if (group === "solo") {
      const solo = d.solo_female_score as { annual_score?: number } | null;
      if (solo?.annual_score != null && solo.annual_score >= 4) rank += 8;
    } else if (group === "couple") {
      const segs = Array.isArray(d.best_for_segments) ? d.best_for_segments as Array<{ segment?: string }> : [];
      const hasRomantic = segs.some((s) => /romantic|couple|honeymoon/i.test(s.segment ?? ""));
      if (hasRomantic) rank += 10;
    }

    // Priority keyword match against best_for_segments
    const segs = Array.isArray(d.best_for_segments) ? d.best_for_segments as Array<{ segment?: string; reason?: string }> : [];
    const haystack = segs.map((s) => `${s.segment ?? ""} ${s.reason ?? ""}`).join(" ").toLowerCase();
    const kwHits = kws.filter((kw) => haystack.includes(kw.toLowerCase())).length;
    rank += kwHits * 5;

    // Adventure = require difficulty moderate+ to prove it's not a plains city
    if (priority === "adventure" && d.difficulty === "easy") rank -= 15;

    // Comfort = budget_tier fit (soft, reduce rank for hard miss)
    const destTier = (d.budget_tier as number | null) ?? 2;
    if (!tiers.includes(destTier)) rank -= 5;

    // Weekend duration — soft prefer low-altitude, easy-access
    if (duration === "weekend" && d.difficulty !== "easy") rank -= 8;

    const stateName = Array.isArray(d.state) ? (d.state as Array<{ name?: string }>)[0]?.name ?? "" : (d.state as { name?: string } | null)?.name ?? "";

    scored.push({
      destination_id: mr.destination_id,
      name: d.name as string,
      state_name: stateName,
      score: mr.score as number,  // surface raw DB score for UI
      base_score: mr.score as number,
      why_go: (mr.why_go as string) ?? "",
    });

    // Store rank in a separate field for sorting
    (scored[scored.length - 1] as Record<string, unknown>)._rank = rank;
  }

  // Step 4: sort by _rank desc, dedupe by destination, take top 5
  scored.sort((a, b) => {
    const ra = (a as Record<string, unknown>)._rank as number;
    const rb = (b as Record<string, unknown>)._rank as number;
    return rb - ra;
  });

  const seen = new Set<string>();
  const results: Array<{ destination_id: string; name: string; state_name: string; score: number; why_go: string }> = [];
  for (const c of scored) {
    if (seen.has(c.destination_id)) continue;
    seen.add(c.destination_id);
    results.push({
      destination_id: c.destination_id,
      name: c.name,
      state_name: c.state_name,
      score: c.score,
      why_go: c.why_go,
    });
    if (results.length >= 5) break;
  }

  return NextResponse.json({ ok: true, results });
}

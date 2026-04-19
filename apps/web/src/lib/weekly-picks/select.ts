/**
 * Weekly Picks — selection algorithm (PRD §4.1 Stages 1–4).
 *
 * Deterministic given (candidates, weekNum, festivals). Same inputs → same
 * 5 picks. This is the alignment contract's backbone: the landing page, the
 * autoposter, and the JSON-LD schema all call this and trust it to agree.
 *
 * Stage 5 (engagement feedback) is deferred — shipped as a hook point, not
 * yet implemented.
 */

import {
  editorialWeight,
  noteLength,
  type WeightableDestination,
  type WeightableMonthRow,
} from "./weight";

export interface SelectionCandidate extends WeightableMonthRow {
  destination_id: string;
  month: number;
  score: number;
  name: string;
  state_id: string | null;
  state_name: string | null;
  tagline: string | null;
  difficulty: string | null;
  elevation_m: number | null;
  budget_tier: string | null;
  tags: string[] | null;
  has_kids_friendly: boolean;
  monthly_scores: number[];
}

export interface Festival {
  destination_id: string;
  month: number;
  name: string;
}

export interface SelectedPick extends SelectionCandidate {
  position: 1 | 2 | 3 | 4 | 5;
  quality_weight: number;
  why_this_week: string;
}

export interface SelectionResult {
  picks: SelectedPick[];
  /** True if we had to drop from score=5 to score=4 to fill 5 slots. */
  fallback_from_four: boolean;
  /** True if diversity constraints were relaxed to fill slots. */
  relaxed_diversity: boolean;
}

const MAX_SAME_STATE = 2;
const MIN_DISTINCT_STATES = 3;
const MAX_HARD_DIFFICULTY = 1;

const PEAK_KEYWORDS = /\b(best month|peak|ideal|perfect|prime)\b/i;

/**
 * @param candidates All destination-month rows already matching score ≥ 5.
 *                   Should include prior weeks' exclusion applied upstream
 *                   (see Stage 1 in the PRD).
 * @param weekNum Used only for deterministic previously-featured computation
 *                if the caller wants to support multi-week dedup (currently
 *                handled by `excludeIds`).
 * @param festivals Month-scoped festival rows to boost picks where a relevant
 *                  festival exists.
 * @param fallbackCandidates Score=4 pool — used only if the 5/5 pool can't
 *                           produce 5 after diversity relaxation.
 */
export function selectPicks(
  candidates: SelectionCandidate[],
  weekNum: number,
  festivals: Festival[],
  fallbackCandidates: SelectionCandidate[] = [],
): SelectionResult {
  const festivalByDest = new Map<string, string>();
  for (const f of festivals) festivalByDest.set(f.destination_id, f.name);

  const enrich = (c: SelectionCandidate) => ({
    ...c,
    _weight: editorialWeight(c, {
      tagline: c.tagline,
      tags: c.tags,
      elevation_m: c.elevation_m,
      budget_tier: c.budget_tier,
      has_kids_friendly: c.has_kids_friendly,
    }),
    _noteLen: noteLength(c),
  });

  const weighted = candidates
    .map(enrich)
    .sort((a, b) => {
      if (b._weight !== a._weight) return b._weight - a._weight;
      if (b._noteLen !== a._noteLen) return b._noteLen - a._noteLen;
      return a.name.localeCompare(b.name);
    });

  // Try selection against the weighted 5/5 pool with strict diversity first.
  let { picks, relaxed } = pickWithDiversity(weighted, /* relaxation */ 0);

  // If still short, try progressive relaxation of diversity constraints.
  if (picks.length < 5) {
    const r1 = pickWithDiversity(weighted, 1);
    if (r1.picks.length > picks.length) { picks = r1.picks; relaxed = true; }
  }
  if (picks.length < 5) {
    const r2 = pickWithDiversity(weighted, 2);
    if (r2.picks.length > picks.length) { picks = r2.picks; relaxed = true; }
  }

  let fallback_from_four = false;
  if (picks.length < 5 && fallbackCandidates.length > 0) {
    const fb = fallbackCandidates.map(enrich).sort((a, b) => {
      if (b._weight !== a._weight) return b._weight - a._weight;
      if (b._noteLen !== a._noteLen) return b._noteLen - a._noteLen;
      return a.name.localeCompare(b.name);
    });
    const merged = [...picks, ...fb];
    const r3 = pickWithDiversity(merged, 2, picks);
    if (r3.picks.length > picks.length) {
      picks = r3.picks;
      fallback_from_four = true;
      relaxed = true;
    }
  }

  // Cap at 5, assign positions + why-this-week.
  const final: SelectedPick[] = picks.slice(0, 5).map((p, i) => ({
    ...p,
    position: (i + 1) as 1 | 2 | 3 | 4 | 5,
    quality_weight: p._weight,
    why_this_week: deriveWhyThisWeek(p, festivalByDest.get(p.destination_id)),
  }));

  return { picks: final, fallback_from_four, relaxed_diversity: relaxed };
}

type WeightedCandidate = SelectionCandidate & { _weight: number; _noteLen: number };

/** Greedy selector honoring diversity rules. `relaxation`:
 *  0 = strict (max 2 per state, ≥3 distinct states, ≤1 hard)
 *  1 = allow 3 per state, keep ≥2 distinct states, ≤1 hard
 *  2 = allow 3 per state, no distinct-states minimum, ≤2 hard
 */
function pickWithDiversity(
  pool: WeightedCandidate[],
  relaxation: 0 | 1 | 2,
  seeded: WeightedCandidate[] = [],
): { picks: WeightedCandidate[]; relaxed: boolean } {
  const maxSameState = relaxation >= 1 ? 3 : MAX_SAME_STATE;
  const minDistinctStates = relaxation >= 2 ? 1 : (relaxation === 1 ? 2 : MIN_DISTINCT_STATES);
  const maxHard = relaxation >= 2 ? 2 : MAX_HARD_DIFFICULTY;

  const picks: WeightedCandidate[] = [...seeded];
  const stateCount: Record<string, number> = {};
  let hardCount = 0;
  for (const s of seeded) {
    if (s.state_id) stateCount[s.state_id] = (stateCount[s.state_id] ?? 0) + 1;
    if (s.difficulty === "hard" || s.difficulty === "extreme") hardCount++;
  }

  for (const c of pool) {
    if (picks.length >= 5) break;
    if (picks.some((p) => p.destination_id === c.destination_id)) continue;

    const sid = c.state_id ?? "_unknown";
    if ((stateCount[sid] ?? 0) >= maxSameState) continue;

    const isHard = c.difficulty === "hard" || c.difficulty === "extreme";
    if (isHard && hardCount >= maxHard) continue;

    // Look-ahead: after picking this, can we still reach minDistinctStates with remaining slots?
    const prospectiveStates = new Set([...picks.map((p) => p.state_id ?? "_u"), sid]);
    const slotsLeft = 5 - picks.length - 1;
    const availableOtherStates = new Set(
      pool
        .filter((cand) => !picks.some((p) => p.destination_id === cand.destination_id) && cand.destination_id !== c.destination_id)
        .map((cand) => cand.state_id ?? "_u"),
    );
    const maxReachable = prospectiveStates.size + Math.min(slotsLeft, availableOtherStates.size);
    if (maxReachable < minDistinctStates && prospectiveStates.size < minDistinctStates) continue;

    picks.push(c);
    stateCount[sid] = (stateCount[sid] ?? 0) + 1;
    if (isHard) hardCount++;
  }

  return { picks, relaxed: relaxation > 0 };
}

/** Stage 4: derive the "why this week" hook. Priority:
 *  1. Festival name if this destination has one this month.
 *  2. First sentence of note matching PEAK_KEYWORDS.
 *  3. First sentence of note.
 *  4. First sentence of prose_lead.
 *  5. Fallback to tagline truncated to 100 chars.
 */
function deriveWhyThisWeek(row: WeightedCandidate, festivalName?: string): string {
  if (festivalName) return `${festivalName} this month.`;

  const note = (row.note ?? "").trim();
  if (note.length > 0) {
    const sentences = splitSentences(note);
    const peak = sentences.find((s) => PEAK_KEYWORDS.test(s));
    return peak ?? sentences[0] ?? note.slice(0, 100);
  }

  const prose = (row.prose_lead ?? "").trim();
  if (prose.length > 0) {
    const sentences = splitSentences(prose);
    return sentences[0] ?? prose.slice(0, 100);
  }

  return (row.tagline ?? "").slice(0, 100);
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

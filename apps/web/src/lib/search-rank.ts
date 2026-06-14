/**
 * Relevance-ranked substring search for the global search surfaces.
 *
 * WHY THIS EXISTS
 * ---------------
 * The search index is filtered client-side. The previous behaviour was a plain
 * `name.toLowerCase().includes(query)` with results kept in raw array order and
 * capped by an early break — i.e. no notion of relevance. A mid-word substring
 * hit in an unrelated record could therefore be the ONLY / TOP result:
 * searching the North-Sikkim town "Mangan" surfaced Barmer's "Manganiyar"
 * musician-villages gem (Rajasthan) and nothing else, so a user looking for
 * Sikkim landed in Rajasthan ("a different location altogether" — contact-form
 * report 2026-06-14).
 *
 * `rankFilter` scores every candidate and sorts best-first so exact and
 * prefix/word-start matches lead, and pure mid-word substring matches sink to
 * the bottom. Callers also render each result's region (state) so a cross-state
 * match can never masquerade as the place the user typed.
 */

/**
 * Lower rank = better match. -1 = no match.
 *   0  exact          ("mangan" === "mangan")
 *   1  name prefix    ("man"    -> "Manali")
 *   2  word-start     ("la"     -> "Nathu La"; matches the start of any word)
 *   3  mid-word substr("mangan" -> "Manganiyar")  ← weakest, sinks to the bottom
 */
export function matchRank(text: string, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return -1;
  const t = text.toLowerCase();
  if (t === q) return 0;
  if (t.startsWith(q)) return 1;
  // Split on any non-alphanumeric so "nathu la", "lachen-monastery",
  // "ravangla (ravongla)" all expose their individual words.
  for (const word of t.split(/[^a-z0-9]+/)) {
    if (word && word.startsWith(q)) return 2;
  }
  if (t.includes(q)) return 3;
  // Space/punctuation-insensitive fallback (weakest): "nathula" -> "Nathu La",
  // "lehladakh" -> "Leh-Ladakh". Collapse both sides and retest. Guarded at >=3
  // chars so tiny queries don't over-match.
  const nq = q.replace(/[^a-z0-9]/g, "");
  if (nq.length >= 3 && t.replace(/[^a-z0-9]/g, "").includes(nq)) return 4;
  return -1;
}

/**
 * Filter `items` to those matching `query`, sorted best-match-first, capped.
 * Scores ALL items then sorts (the previous code broke at the first `max`
 * matches in array order, which is what let a weak substring outrank an exact
 * hit that appeared later in the array). Stable on original index, so equally
 * ranked matches keep the index's own ordering (alphabetical for most tiers).
 */
export function rankFilter<T>(
  items: readonly T[] | null | undefined,
  query: string,
  getText: (item: T) => string,
  max = 5,
): T[] {
  if (!items || !query.trim()) return [];
  const scored: { item: T; rank: number; idx: number }[] = [];
  for (let i = 0; i < items.length; i++) {
    const rank = matchRank(getText(items[i]), query);
    if (rank >= 0) scored.push({ item: items[i], rank, idx: i });
  }
  scored.sort((a, b) => a.rank - b.rank || a.idx - b.idx);
  return scored.slice(0, max).map((s) => s.item);
}

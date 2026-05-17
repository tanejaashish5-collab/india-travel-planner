/**
 * Deterministic daily rotation over a pool of items.
 *
 * Used to keep landing-page card sets (dispatch heroes, Act III scenes)
 * feeling alive across a month even though the underlying "top destinations
 * for {month}" query returns the same ordered list for 31 days.
 *
 * Design choices:
 *   - **Pin top**: pool[0] is always in the result. The highest-scoring dest
 *     for the month is "today's must-go" every day.
 *   - **Sliding window**: the remaining (count-1) slots cycle through
 *     pool[1..] indexed by IST day-of-year. Same day = same picks
 *     (cache-friendly with revalidate=86400). Different day = window slides.
 *   - **Deterministic**: no randomness, no seeded RNG — pure arithmetic.
 *     Two simultaneous renders on the same IST date always agree, which
 *     matters for ISR + edge consistency.
 *
 * Example:
 *   pool = [A, B, C, D, E, F, G, H, I, J] (10 dests, sorted by score desc)
 *   count = 5, pinTop = true
 *
 *   Day 0: [A, B, C, D, E]   ← window 1..4
 *   Day 1: [A, F, G, H, I]   ← window 5..8
 *   Day 2: [A, J, B, C, D]   ← window 9, then wraps 1..3
 *   ...
 *
 * Over `(pool.length - 1) / (count - 1)` days the window completes one
 * full cycle. For a 20-dest pool picking 5, that's ~5 days/cycle = each
 * non-pinned dest appears ~6 times per month.
 */

/** Day-of-year (1-366) in Asia/Kolkata, used as the rotation seed. */
function dayOfYearIST(now: Date = new Date()): number {
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const jan1 = new Date(ist.getFullYear(), 0, 1);
  const diffMs = ist.getTime() - jan1.getTime();
  return Math.floor(diffMs / 86400000) + 1;
}

export interface DailyRotationOpts {
  /** When true, the first item in the pool is always in the output. Default true. */
  pinTop?: boolean;
  /**
   * Override the rotation seed. Default: IST day-of-year.
   * Useful for tests or for sharing one seed across multiple rotations
   * that should agree (e.g., dispatch + scenes from the same pool).
   */
  seed?: number;
}

/**
 * Pick `count` items from `pool` using a deterministic daily window.
 *
 * Returns at most `count` items. If pool has fewer than `count`, returns
 * the whole pool unchanged. If pool is empty, returns [].
 */
export function dailyRotation<T>(
  pool: readonly T[],
  count: number,
  opts: DailyRotationOpts = {},
): T[] {
  if (!pool || pool.length === 0 || count <= 0) return [];
  if (pool.length <= count) return [...pool];

  const { pinTop = true, seed = dayOfYearIST() } = opts;

  // Edge case: pinTop with count=1 → always return [pool[0]].
  if (pinTop && count === 1) return [pool[0]];

  if (!pinTop) {
    // Simple sliding window over the whole pool.
    const start = (seed * count) % pool.length;
    return Array.from({ length: count }, (_, i) => pool[(start + i) % pool.length]);
  }

  // Pinned: result starts with pool[0], remaining (count-1) slide through pool[1..].
  const tail = pool.slice(1);
  const tailCount = count - 1;
  const start = (seed * tailCount) % tail.length;
  const slidingTail = Array.from(
    { length: tailCount },
    (_, i) => tail[(start + i) % tail.length],
  );
  return [pool[0], ...slidingTail];
}

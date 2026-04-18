import type { MonthPick } from "./types";
import type { ShortlistItem } from "./shortlist";

export interface DaySplitResult {
  ok: boolean;
  reason?: string;
}

/**
 * Enforce the day-cap contract after Claude returns a month.
 * Fails when:
 *   - any single pick > 10 days, OR
 *   - month ended up with a single pick when the shortlist had ≥3 cluster
 *     neighbours (i.e., Claude should have multi-stopped).
 */
export function validateDaySplit(
  picks: MonthPick[],
  shortlist: ShortlistItem[]
): DaySplitResult {
  if (picks.length === 0) return { ok: true };

  const over10 = picks.find((p) => p.days > 10);
  if (over10) {
    return {
      ok: false,
      reason: `${over10.name} got ${over10.days} days (cap is 10).`,
    };
  }

  // Largest cluster size in the shortlist
  const clusterCounts: Record<string, number> = {};
  for (const s of shortlist) {
    if (s.clusterId) clusterCounts[s.clusterId] = (clusterCounts[s.clusterId] ?? 0) + 1;
  }
  const largestCluster = Math.max(0, ...Object.values(clusterCounts));

  if (picks.length === 1 && largestCluster >= 3) {
    return {
      ok: false,
      reason: `Only 1 pick chosen but shortlist had a cluster of ${largestCluster} nearby destinations.`,
    };
  }

  return { ok: true };
}

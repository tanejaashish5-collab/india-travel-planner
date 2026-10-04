/**
 * A destination whose last review is older than this shows "RE-CHECKING" next
 * to its VERIFIED date, so an old date is never presented as a fresh one.
 * The weekly review (scripts/freshness-review-weekly.sh) aims to keep every page
 * under 90 days; this is the honest fallback when it falls behind (409 of 533
 * pages were 90-180 days old on 2026-10-04). Date.now lives here, not in the
 * components, for the react-hooks/purity rule.
 */
export const STALE_REVIEW_DAYS = 180;

export function isReviewStale(iso: string | null | undefined): boolean {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  return Number.isFinite(t) && Date.now() - t > STALE_REVIEW_DAYS * 86400_000;
}

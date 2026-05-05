/**
 * NakshIQ score display helper.
 *
 * The DB stores integer scores 0–5 (column `destination_months.score`,
 * `destinations.score`, etc.). We display ×2 with one decimal so a raw 4
 * renders as "8.0" and 5 renders as "10.0" — the editorial, critic-style
 * 0–10 scale (think Pitchfork's 8.4) without changing the DB.
 *
 * Always render through this helper so destination pages, autoposter
 * captions, Pomelli image overlays, and the cinematic landing all stay
 * in sync. (See feedback_consistency_no_drift memory.)
 *
 * If the underlying column ever migrates to NUMERIC(3,1) and stores 0–10
 * directly, change the multiplier here in one place — every call site
 * picks it up automatically.
 */

export const SCORE_MAX = 10;

export function formatScore(raw: number | null | undefined): string {
  if (raw == null || Number.isNaN(raw)) return "—";
  const display = Math.min(SCORE_MAX, Math.max(0, raw * 2));
  return display.toFixed(1);
}

export function formatScoreInline(raw: number | null | undefined): string {
  return `${formatScore(raw)}/${SCORE_MAX}`;
}

/**
 * Numeric form for callers that need the displayed value (e.g. setting CSS
 * widths, comparison thresholds against the displayed scale).
 * Returns null when raw is null/NaN so callers can branch on missing data.
 */
export function displayScore(raw: number | null | undefined): number | null {
  if (raw == null || Number.isNaN(raw)) return null;
  return Math.min(SCORE_MAX, Math.max(0, raw * 2));
}

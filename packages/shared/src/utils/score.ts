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

/* ============================================================
   Verdict bands — the SINGLE source of truth for score → tier.
   Imported by Act 1 Dispatch, Act 3 Scenes, Act 5 Director's Cut,
   Act 6 Dailies, /methodology, the homepage server preload, and
   the autoposter caption builder.

   Ranges are inclusive on the lower bound. Adjusted here =
   adjusted everywhere; do NOT inline these thresholds elsewhere.
   ============================================================ */

export type VerdictTier = "peak" | "excellent" | "doable" | "marginal" | "avoid";
export type VerdictLabel = "PEAK" | "EXCELLENT" | "DOABLE" | "MARGINAL" | "AVOID";

export const SCORE_BANDS: ReadonlyArray<{
  tier: VerdictTier;
  label: VerdictLabel;
  min: number;          // displayed-scale lower bound (inclusive)
  max: number;          // displayed-scale upper bound (inclusive)
  range: string;        // "8.0–10.0" — pre-formatted for UI
  tagline: string;      // editorial line for /methodology
}> = [
  { tier: "peak",      label: "PEAK",      min: 8.0,  max: 10.0, range: "8.0–10.0", tagline: "Go. Now. Editors say this is the window." },
  { tier: "excellent", label: "EXCELLENT", min: 6.5,  max: 7.9,  range: "6.5–7.9",  tagline: "Worth the trip. Minor caveats. Plan around them." },
  { tier: "doable",    label: "DOABLE",    min: 5.0,  max: 6.4,  range: "5.0–6.4",  tagline: "Fine, with a workaround. Cruises pre-9am, hotels off-strip." },
  { tier: "marginal",  label: "MARGINAL",  min: 3.5,  max: 4.9,  range: "3.5–4.9",  tagline: "You can go. But you have a better option this month." },
  { tier: "avoid",     label: "AVOID",     min: 0.0,  max: 3.4,  range: "0.0–3.4",  tagline: "The Skip List. Editorially against. We say so out loud." },
];

/**
 * Map a 0–10 displayed score to its verdict tier (lowercase token form,
 * useful for keying objects).
 */
export function verdictTier(displayScore: number): VerdictTier {
  if (displayScore >= 8.0) return "peak";
  if (displayScore >= 6.5) return "excellent";
  if (displayScore >= 5.0) return "doable";
  if (displayScore >= 3.5) return "marginal";
  return "avoid";
}

/**
 * Map a 0–10 displayed score to its verdict label (uppercase, for UI).
 * The displayed score is the value already multiplied (e.g. 8.4), NOT the
 * raw 0–5 DB column. If you have a raw value, pipe through displayScore().
 */
export function verdictFor(displayScore: number): VerdictLabel {
  return ({
    peak: "PEAK",
    excellent: "EXCELLENT",
    doable: "DOABLE",
    marginal: "MARGINAL",
    avoid: "AVOID",
  } as const)[verdictTier(displayScore)];
}

/**
 * Cinematic palette token per tier. Values match `cinema.css` custom
 * properties — kept here as raw hex so the shared package has zero
 * runtime dependency on CSS variables (server caption strings can
 * inline these for terminal output, etc.).
 *
 * PEAK and EXCELLENT are intentionally HUE-DIFFERENT (not just two
 * shades of green): bright spring green vs muted sage. Otherwise the
 * eye reads them as the same band.
 */
export const VERDICT_COLOR: Record<VerdictTier, string> = {
  peak:      "#4ADE9F",  // spring green (bright, saturated)
  excellent: "#A8D896",  // sage / yellow-green (lower saturation, warmer)
  doable:    "#E8B547",  // amber
  marginal:  "#E9876B",  // coral
  avoid:     "#E55642",  // vermillion
};

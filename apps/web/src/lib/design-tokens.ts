// ============================================================
// Design Tokens — Single source of truth
// Import this instead of duplicating constants in components
// ============================================================

/** Score color classes (0-5 suitability scale) */
export const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  3: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  2: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  1: "bg-red-500/20 text-red-400 border-red-500/30",
  0: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

/** Score solid colors (for filled badges) */
export const SCORE_SOLID: Record<number, string> = {
  5: "bg-emerald-500 text-white",
  4: "bg-blue-500 text-white",
  3: "bg-yellow-500 text-black",
  2: "bg-orange-500 text-white",
  1: "bg-red-500 text-white",
  0: "bg-zinc-700 text-zinc-400",
};

/** Score labels */
export const SCORE_LABELS: Record<number, string> = {
  5: "Peak — go now",
  4: "Excellent",
  3: "Doable",
  2: "Marginal",
  1: "Avoid unless specific reason",
  0: "Closed / inaccessible",
};

/** Difficulty color classes */
export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

/** Difficulty with background */
export const DIFFICULTY_BG: Record<string, string> = {
  easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  moderate: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  hard: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  extreme: "text-red-400 bg-red-500/10 border-red-500/20",
};

/** Animation tokens — consistent across all components */
export const MOTION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    default: [0.25, 0.46, 0.45, 0.94] as const,
    spring: { type: "spring" as const, stiffness: 400, damping: 25 },
  },
  stagger: {
    fast: 0.04,
    normal: 0.08,
    slow: 0.12,
  },
};

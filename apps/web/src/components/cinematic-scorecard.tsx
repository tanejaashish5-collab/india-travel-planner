"use client";

// 5-cell scorecard sitting under the verdict rail. Each cell is a quiet
// data point — KIDS · SOLO F · CROWD · COST · EFFORT — pulled from existing
// dest fields. Production has the same five things scattered across
// confidence-card, kids-badge, solo-female-safety, etc.; this is the
// editorial roll-up at the moment the reader is making the verdict.
//
// All inputs nullable — if a destination doesn't have data for a slot, the
// cell renders an em-dash rather than collapsing the grid.

type CellTone = "ok" | "amber" | "warn" | "muted";

const TONE_COLOR: Record<CellTone, string> = {
  ok: "var(--green)",
  amber: "var(--amber)",
  warn: "var(--vermillion)",
  muted: "var(--bone-faint)",
};

function rateToTone(rating: number | null | undefined): CellTone {
  if (rating == null) return "muted";
  if (rating >= 4) return "ok";
  if (rating >= 3) return "amber";
  return "warn";
}

function difficultyTone(d: string | null | undefined): CellTone {
  const v = (d ?? "").toLowerCase();
  if (v === "easy") return "ok";
  if (v === "moderate") return "amber";
  if (v === "hard" || v === "extreme" || v === "expert") return "warn";
  return "muted";
}

function crowdTone(level: string | null | undefined): CellTone {
  if (level === "quiet") return "ok";
  if (level === "moderate") return "amber";
  if (level === "peak") return "warn";
  return "muted";
}

function budgetTone(t: string | null | undefined): CellTone {
  const v = (t ?? "").toLowerCase();
  if (v.includes("budget")) return "ok";
  if (v.includes("mid")) return "amber";
  if (v.includes("splurge") || v.includes("luxury")) return "warn";
  return "muted";
}

function shortBudget(t: string | null | undefined): string {
  const v = (t ?? "").toLowerCase();
  if (v === "budget") return "₹";
  if (v === "mid-range" || v === "mid") return "₹₹";
  if (v === "splurge" || v === "luxury") return "₹₹₹";
  if (v === "budget-to-mid") return "₹–₹₹";
  if (v === "mid-to-luxury") return "₹₹–₹₹₹";
  if (v === "mixed") return "Mixed";
  return "—";
}

export function CinematicScorecard({
  kidsRating,
  soloFemaleScore,
  crowdLevel,
  budgetTier,
  difficulty,
}: {
  kidsRating?: number | null;
  soloFemaleScore?: number | null;
  crowdLevel?: "quiet" | "moderate" | "peak" | null;
  budgetTier?: string | null;
  difficulty?: string | null;
}) {
  const cells: Array<{
    label: string;
    value: string;
    tone: CellTone;
  }> = [
    {
      label: "Kids",
      value:
        kidsRating != null ? `${(kidsRating * 2).toFixed(1)}/10` : "—",
      tone: rateToTone(kidsRating),
    },
    {
      label: "Solo F",
      value:
        soloFemaleScore != null
          ? `${(soloFemaleScore * 2).toFixed(1)}/10`
          : "—",
      tone: rateToTone(soloFemaleScore),
    },
    {
      label: "Crowd",
      value: crowdLevel ? crowdLevel.toUpperCase() : "—",
      tone: crowdTone(crowdLevel),
    },
    {
      label: "Cost",
      value: shortBudget(budgetTier),
      tone: budgetTone(budgetTier),
    },
    {
      label: "Effort",
      value: difficulty ? difficulty.toUpperCase() : "—",
      tone: difficultyTone(difficulty),
    },
  ];

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "32px auto 0",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        border: "1px solid var(--hair)",
        borderTop: "0",
      }}
      aria-label="At-a-glance scorecard"
    >
      {cells.map((c, i) => (
        <div
          key={c.label}
          style={{
            padding: "20px 12px",
            textAlign: "center",
            borderLeft: i > 0 ? "1px solid var(--hair)" : "0",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minHeight: 92,
            justifyContent: "center",
          }}
        >
          <div
            className="nq-mono"
            style={{
              fontSize: 9,
              color: "var(--bone-faint)",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
            }}
          >
            {c.label}
          </div>
          <div
            className="nq-mono"
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: TONE_COLOR[c.tone],
              letterSpacing: "0.06em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
}

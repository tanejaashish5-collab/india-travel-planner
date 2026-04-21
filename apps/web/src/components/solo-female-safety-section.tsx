import { cn } from "@/lib/utils";

type Score = 1 | 2 | 3 | 4 | 5;

type MonthRow = {
  month: number;
  solo_female_override: number | null;
  solo_female_override_note: string | null;
};

type Props = {
  score: Score | number | null | undefined;
  note: string | null | undefined;
  monthRows?: MonthRow[] | null;
  hubHref?: string;
  className?: string;
};

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const SCORE_TONE: Record<number, { cell: string; text: string; label: string }> = {
  5: { cell: "bg-emerald-500/30 border-emerald-400/60", text: "text-emerald-100", label: "Proactively female-friendly" },
  4: { cell: "bg-emerald-500/15 border-emerald-400/40", text: "text-emerald-200", label: "Safe with standard precautions" },
  3: { cell: "bg-amber-500/20 border-amber-400/50", text: "text-amber-100", label: "Manageable, stay vigilant" },
  2: { cell: "bg-orange-500/25 border-orange-400/50", text: "text-orange-100", label: "Go with a companion" },
  1: { cell: "bg-red-500/30 border-red-400/60", text: "text-red-100", label: "Skip for solo female" },
};

const NULL_CELL = "bg-zinc-800/40 border-zinc-700/40 text-zinc-500";

export default function SoloFemaleSafetySection({ score, note, monthRows, hubHref, className }: Props) {
  // Invisible when there's no data — enrichment hasn't reached this destination yet.
  if (!score && !note && !(monthRows?.some((r) => r.solo_female_override != null))) return null;

  const currentMonth = new Date().getMonth() + 1;
  const rowByMonth = new Map<number, MonthRow>();
  for (const r of monthRows ?? []) rowByMonth.set(r.month, r);

  function effectiveScore(m: number): number | null {
    const o = rowByMonth.get(m)?.solo_female_override;
    if (o !== null && o !== undefined) return o;
    if (typeof score === "number") return score;
    return null;
  }

  const topTone = typeof score === "number" ? SCORE_TONE[score] : null;

  return (
    <div className={cn("rounded-2xl border border-rose-500/25 bg-gradient-to-br from-rose-950/20 to-transparent p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
        <div className="flex items-baseline gap-3">
          <span
            aria-hidden
            className="font-serif italic font-medium text-3xl sm:text-4xl leading-none tracking-tight text-rose-300"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            ♀
          </span>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-rose-300/70">
              Solo-female safety
            </div>
            {typeof score === "number" && topTone ? (
              <div className="mt-0.5">
                <span className={cn("font-serif italic text-2xl sm:text-3xl font-medium tracking-tight", topTone.text)} style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                  {score}/5
                </span>
                <span className="ml-2 text-sm text-rose-200/70">— {topTone.label}</span>
              </div>
            ) : (
              <div className="mt-0.5 text-sm text-rose-200/60">Not scored yet</div>
            )}
          </div>
        </div>
        {hubHref && (
          <a
            href={hubHref}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-rose-300/70 hover:text-rose-200 transition-colors"
          >
            Method →
          </a>
        )}
      </div>

      {note && (
        <p className="text-[15px] sm:text-base leading-snug text-rose-50/90 mb-4">
          {note}
        </p>
      )}

      {/* 12-month strip — shows month-effective score; override-carrying months get a dot */}
      <div className="mt-4">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-rose-300/60 mb-2">
          Month-by-month
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const eff = effectiveScore(m);
            const row = rowByMonth.get(m);
            const hasOverride = row?.solo_female_override != null;
            const hasNullOverride = row && row.solo_female_override === null && row.solo_female_override_note;
            const tone = eff != null ? SCORE_TONE[eff] : null;
            const isCurrent = m === currentMonth;
            const tooltip = hasOverride
              ? row?.solo_female_override_note ?? ""
              : hasNullOverride
                ? row?.solo_female_override_note ?? ""
                : note ?? "";
            return (
              <div
                key={m}
                className={cn(
                  "relative rounded-md border-2 px-1.5 py-2.5 text-center transition-all",
                  tone ? tone.cell : NULL_CELL,
                  isCurrent && "ring-2 ring-offset-2 ring-offset-zinc-950 ring-rose-400",
                )}
                title={tooltip}
              >
                <div className="font-mono text-[9px] tracking-[0.12em] uppercase opacity-80">
                  {MONTH_SHORT[m]}
                </div>
                <div
                  className={cn("mt-1 font-semibold text-base leading-none", tone?.text)}
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {eff != null ? `${eff}` : "—"}
                </div>
                {hasOverride && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-rose-300" aria-hidden title="Month-specific note" />
                )}
                {hasNullOverride && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-zinc-500" aria-hidden title="Closed/inaccessible this month" />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] tracking-[0.15em] uppercase text-zinc-400">
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500/50 border border-emerald-400/60" /> 4-5 safe</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500/40 border border-amber-400/50" /> 3 vigilant</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-orange-500/40 border border-orange-400/50" /> 2 with guide</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-red-500/50 border border-red-400/60" /> 1 skip</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-300" /> month-specific note</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-500" /> closed</span>
        </div>
      </div>
    </div>
  );
}

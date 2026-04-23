import { cn } from "@/lib/utils";

type Verdict = "go" | "wait" | "skip";

type Props = {
  verdict: Verdict | null | undefined;
  score: number | null;
  monthLabel: string;
  prose?: string | null;
  skipReason?: string | null;
  kidsRating?: number | null;
  kidsSuitable?: boolean | null;
  soloFemaleScore?: number | null;
  crowdLevel?: "quiet" | "moderate" | "peak" | null;
  costTier?: string | null;
  difficulty?: string | null;
  scoreNote?: string | null;
  className?: string;
};

const TONE: Record<Verdict, { border: string; bg: string; text: string; accent: string }> = {
  go: {
    border: "border-emerald-500/40",
    bg: "from-emerald-950/40 to-emerald-900/10",
    text: "text-emerald-100",
    accent: "#34D399",
  },
  wait: {
    border: "border-amber-500/40",
    bg: "from-amber-950/40 to-amber-900/10",
    text: "text-amber-100",
    accent: "#F59E0B",
  },
  skip: {
    border: "border-[#E55642]/40",
    bg: "from-[#4a1f18]/40 to-[#4a1f18]/10",
    text: "text-[#f8c8bf]",
    accent: "#E55642",
  },
};

const LABEL: Record<Verdict, string> = { go: "GO", wait: "WAIT", skip: "SKIP" };

function toneForScore(n: number | null | undefined) {
  if (n == null) return { ring: "border-zinc-500/30", text: "text-zinc-400" };
  if (n >= 4) return { ring: "border-emerald-500/40", text: "text-emerald-300" };
  if (n >= 3) return { ring: "border-yellow-500/40", text: "text-yellow-300" };
  if (n >= 2) return { ring: "border-orange-500/40", text: "text-orange-300" };
  return { ring: "border-red-500/40", text: "text-red-300" };
}

const CROWD_TONE: Record<"quiet" | "moderate" | "peak", { ring: string; text: string; label: string }> = {
  quiet:    { ring: "border-emerald-500/40", text: "text-emerald-300", label: "Quiet" },
  moderate: { ring: "border-yellow-500/40",  text: "text-yellow-300",  label: "Moderate" },
  peak:     { ring: "border-red-500/40",     text: "text-red-300",     label: "Peak" },
};

function Chip({
  icon,
  label,
  value,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  tone: { ring: string; text: string };
}) {
  return (
    <div className={cn("rounded-xl border bg-background/40 px-3 py-2.5 backdrop-blur-sm", tone.ring)}>
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-white/55">
        <span aria-hidden>{icon}</span>
        <span>{label}</span>
      </div>
      <div className={cn("mt-0.5 text-sm font-semibold", tone.text)}>{value}</div>
    </div>
  );
}

export default function DestinationTldrCard({
  verdict,
  score,
  monthLabel,
  prose,
  skipReason,
  kidsRating,
  kidsSuitable,
  soloFemaleScore,
  crowdLevel,
  costTier,
  difficulty,
  scoreNote,
  className,
}: Props) {
  if (!verdict && score == null) return null;

  const tone = verdict ? TONE[verdict] : TONE.go;
  const label = verdict ? LABEL[verdict] : "—";
  const body = prose ?? (verdict !== "go" ? skipReason : null) ?? scoreNote ?? null;

  const kidsTone = toneForScore(kidsRating);
  const soloTone = toneForScore(soloFemaleScore);
  const crowdTone = crowdLevel ? CROWD_TONE[crowdLevel] : null;

  const kidsValue =
    kidsRating != null
      ? `${kidsRating}/5${kidsSuitable === false ? " · skip" : ""}`
      : "n/a";
  const soloValue = soloFemaleScore != null ? `${soloFemaleScore}/5` : "n/a";
  const crowdValue = crowdTone?.label ?? "—";
  const costValue = costTier ? costTier.charAt(0).toUpperCase() + costTier.slice(1) : "—";
  const diffValue = difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : "—";

  return (
    <div
      className={cn(
        "rounded-2xl border bg-gradient-to-br p-5 sm:p-6",
        tone.border,
        tone.bg,
        tone.text,
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-3">
          <span
            className="font-serif italic font-medium text-4xl sm:text-5xl leading-none tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: tone.accent }}
          >
            {label}
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-70">
            in {monthLabel}
          </span>
        </div>
        {score != null && (
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl sm:text-4xl font-bold tabular-nums" style={{ color: tone.accent }}>
              {score}
            </span>
            <span className="font-mono text-xs tracking-[0.2em] uppercase opacity-60">/5</span>
          </div>
        )}
      </div>

      {body && <p className="mt-3 text-base leading-relaxed opacity-95">{body}</p>}

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <Chip icon="👶" label="Kids" value={kidsValue} tone={kidsTone} />
        <Chip icon="♀" label="Solo F" value={soloValue} tone={soloTone} />
        {crowdTone ? (
          <Chip icon="👥" label="Crowd" value={crowdValue} tone={crowdTone} />
        ) : (
          <Chip icon="👥" label="Crowd" value="—" tone={{ ring: "border-white/10", text: "text-white/50" }} />
        )}
        <Chip icon="₹" label="Cost" value={costValue} tone={{ ring: "border-white/10", text: "text-white/80" }} />
        <Chip icon="🥾" label="Effort" value={diffValue} tone={{ ring: "border-white/10", text: "text-white/80" }} />
      </div>
    </div>
  );
}

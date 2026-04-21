import { cn } from "@/lib/utils";

type Verdict = "go" | "wait" | "skip";

type Props = {
  verdict: Verdict | null | undefined;
  skipReason?: string | null;
  month?: string;
  variant?: "full" | "compact";
  className?: string;
};

const TONE: Record<Verdict, { border: string; bg: string; text: string; accent: string }> = {
  go: {
    border: "border-emerald-500/40",
    bg: "from-emerald-950/40 to-emerald-900/10",
    text: "text-emerald-200",
    accent: "#34D399",
  },
  wait: {
    border: "border-amber-500/40",
    bg: "from-amber-950/40 to-amber-900/10",
    text: "text-amber-200",
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

export default function VerdictCard({ verdict, skipReason, month, variant = "full", className }: Props) {
  if (!verdict) return null;
  const tone = TONE[verdict];
  const label = LABEL[verdict];

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm",
          tone.border,
          "bg-gradient-to-r",
          tone.bg,
          tone.text,
          className,
        )}
      >
        <span
          className="font-serif italic font-medium text-sm tracking-tight"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: tone.accent }}
        >
          {label}
        </span>
        {month && (
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">
            in {month}
          </span>
        )}
        {verdict !== "go" && skipReason && (
          <span className="text-xs opacity-85 max-w-[28ch] truncate">— {skipReason}</span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border bg-gradient-to-br p-5 sm:p-6", tone.border, tone.bg, tone.text, className)}>
      <div className="flex items-baseline gap-4 mb-2">
        <span
          className="font-serif italic font-medium text-4xl sm:text-5xl leading-none tracking-tight"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: tone.accent }}
        >
          {label}
        </span>
        {month && (
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-70">
            in {month}
          </span>
        )}
      </div>
      {verdict !== "go" && skipReason && (
        <p className="text-base sm:text-lg leading-snug opacity-95">{skipReason}</p>
      )}
      {verdict === "go" && (
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">
          Data-scored. No caveats this month.
        </p>
      )}
    </div>
  );
}

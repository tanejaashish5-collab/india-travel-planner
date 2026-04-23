import { cn } from "@/lib/utils";

type Kind = "live" | "scored" | "curated";

const VARIANTS: Record<Kind, { label: string; dot: string; ring: string; text: string }> = {
  live: {
    label: "LIVE",
    dot: "bg-emerald-400 animate-pulse",
    ring: "border-emerald-500/30 bg-emerald-500/5",
    text: "text-emerald-300",
  },
  scored: {
    label: "DATA-SCORED",
    dot: "bg-sky-400",
    ring: "border-sky-500/30 bg-sky-500/5",
    text: "text-sky-300",
  },
  curated: {
    label: "EDITORIAL",
    dot: "bg-white/50",
    ring: "border-white/15 bg-white/5",
    text: "text-white/55",
  },
};

export function DataSignalBadge({
  kind,
  tooltip,
  className,
}: {
  kind: Kind;
  tooltip?: string;
  className?: string;
}) {
  const v = VARIANTS[kind];
  return (
    <span
      title={tooltip}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] uppercase",
        v.ring,
        v.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", v.dot)} />
      {v.label}
    </span>
  );
}

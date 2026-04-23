"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./ui/section-label";

type Verdict = "go" | "wait" | "skip";

type Props = {
  destinationId: string;
  name: string;
  score: number | null;
  monthLabel: string;
  monthSlug: string;
  verdict: Verdict | null | undefined;
  kidsRating?: number | null;
  soloFemaleScore?: number | null;
  crowdLevel?: "quiet" | "moderate" | "peak" | null;
  compareWithId?: string | null;
  compareWithName?: string | null;
};

const VERDICT_TONE: Record<Verdict, { accent: string; ring: string }> = {
  go:   { accent: "#34D399", ring: "border-emerald-500/40" },
  wait: { accent: "#F59E0B", ring: "border-amber-500/40" },
  skip: { accent: "#E55642", ring: "border-[#E55642]/40" },
};

const VERDICT_LABEL: Record<Verdict, string> = { go: "GO", wait: "WAIT", skip: "SKIP" };

function scoreTone(n: number | null | undefined) {
  if (n == null) return "text-zinc-400";
  if (n >= 4) return "text-emerald-300";
  if (n >= 3) return "text-yellow-300";
  if (n >= 2) return "text-orange-300";
  return "text-red-300";
}

const CROWD_LABEL: Record<"quiet" | "moderate" | "peak", { text: string; tone: string }> = {
  quiet:    { text: "Quiet",    tone: "text-emerald-300" },
  moderate: { text: "Moderate", tone: "text-yellow-300" },
  peak:     { text: "Peak",     tone: "text-red-300" },
};

export function DestinationDecisionRail({
  destinationId,
  name,
  score,
  monthLabel,
  monthSlug,
  verdict,
  kidsRating,
  soloFemaleScore,
  crowdLevel,
  compareWithId,
  compareWithName,
}: Props) {
  const locale = useLocale();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const tone = verdict ? VERDICT_TONE[verdict] : VERDICT_TONE.go;
  const verdictLabel = verdict ? VERDICT_LABEL[verdict] : null;
  const crowd = crowdLevel ? CROWD_LABEL[crowdLevel] : null;

  return (
    <>
      {/* Sentinel — placed right after the hero section. Rail shows when
          this element scrolls out of the viewport. */}
      <div ref={sentinelRef} className="h-0 w-0" aria-hidden="true" />

      <aside
        aria-label={`Decision panel for ${name}`}
        className={cn(
          "hidden lg:block fixed right-4 xl:right-6 top-28 z-30 w-64 xl:w-72 transition-all duration-300",
          visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 pointer-events-none",
        )}
      >
        <div className={cn("rounded-2xl border bg-background/85 backdrop-blur-xl p-4 shadow-xl shadow-black/30", tone.ring)}>
          {/* Header — name truncated */}
          <div className="mb-3">
            <SectionLabel as="div" className="text-white/50">Decision</SectionLabel>
            <div className="mt-0.5 text-sm font-semibold text-foreground truncate" title={name}>
              {name}
            </div>
          </div>

          {/* Verdict + score row */}
          <div className="flex items-baseline justify-between gap-2 mb-3">
            {verdictLabel && (
              <span
                className="font-serif italic text-2xl leading-none tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: tone.accent }}
              >
                {verdictLabel}
              </span>
            )}
            {score != null && (
              <div className="flex items-baseline gap-1">
                <span className={cn("font-mono text-2xl font-bold tabular-nums", scoreTone(score))}>{score}</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/50">/5</span>
              </div>
            )}
          </div>
          <SectionLabel as="div" className="text-white/40 -mt-2 mb-3">
            in {monthLabel}
          </SectionLabel>

          {/* Mini signal row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-lg border border-white/10 bg-background/40 px-2 py-1.5 text-center">
              <div className="text-[9px] font-mono uppercase tracking-[0.08em] text-white/45">Kids</div>
              <div className={cn("mt-0.5 text-xs font-semibold", scoreTone(kidsRating))}>
                {kidsRating != null ? `${kidsRating}/5` : "—"}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-background/40 px-2 py-1.5 text-center">
              <div className="text-[9px] font-mono uppercase tracking-[0.08em] text-white/45">Solo F</div>
              <div className={cn("mt-0.5 text-xs font-semibold", scoreTone(soloFemaleScore))}>
                {soloFemaleScore != null ? `${soloFemaleScore}/5` : "—"}
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-background/40 px-2 py-1.5 text-center">
              <div className="text-[9px] font-mono uppercase tracking-[0.08em] text-white/45">Crowd</div>
              <div className={cn("mt-0.5 text-xs font-semibold", crowd?.tone ?? "text-white/45")}>
                {crowd?.text ?? "—"}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-2">
            <a
              href={`/${locale}/plan?seed=${destinationId}`}
              className="block rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-center text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              Build route with this →
            </a>
            <a
              href={`/${locale}/plan?seed=${destinationId}&month=${monthSlug}#ai`}
              className="block rounded-lg border border-border bg-background/40 px-3 py-2 text-center text-xs font-semibold text-foreground hover:border-primary/40 transition-colors"
            >
              Ask AI about this →
            </a>
            {compareWithId && compareWithName && (
              <a
                href={`/${locale}/vs/${destinationId}-vs-${compareWithId}`}
                className="block rounded-lg border border-border bg-background/40 px-3 py-2 text-center text-xs font-semibold text-foreground hover:border-primary/40 transition-colors truncate"
                title={`Compare with ${compareWithName}`}
              >
                ⚔ vs {compareWithName}
              </a>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./ui/section-label";
import { SCORE_LABELS } from "@/lib/design-tokens";

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

// Prose labels for signal scores — calmer than "2/5" alone.
function kidsPhrase(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 5) return "Excellent for families";
  if (n >= 4) return "Family-friendly";
  if (n >= 3) return "With care";
  if (n >= 2) return "Not ideal";
  return "Avoid";
}
function soloFemalePhrase(n: number | null | undefined): string {
  if (n == null) return "—";
  if (n >= 5) return "Excellent solo";
  if (n >= 4) return "Solo-friendly";
  if (n >= 3) return "With care";
  if (n >= 2) return "With operator only";
  return "Avoid";
}

type RailState = "open" | "minimised" | "dismissed";

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

  // Per-destination + per-session user intent. "dismissed" lasts the tab
  // session; "minimised" persists so serious planners who collapsed it
  // once don't have to collapse it on every refresh.
  const storageKey = `nakshiq:decision-rail:${destinationId}`;
  const [railState, setRailState] = useState<RailState>("open");

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(storageKey + ":session");
      if (stored === "dismissed") { setRailState("dismissed"); return; }
      const persisted = window.localStorage.getItem(storageKey);
      if (persisted === "minimised") setRailState("minimised");
    } catch {
      // SSR / privacy mode — fall back to "open"
    }
  }, [storageKey]);

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

  function minimise() {
    setRailState("minimised");
    try { window.localStorage.setItem(storageKey, "minimised"); } catch {}
  }
  function dismiss() {
    setRailState("dismissed");
    try { window.sessionStorage.setItem(storageKey + ":session", "dismissed"); } catch {}
  }
  function restore() {
    setRailState("open");
    try {
      window.localStorage.removeItem(storageKey);
      window.sessionStorage.removeItem(storageKey + ":session");
    } catch {}
  }

  const tone = verdict ? VERDICT_TONE[verdict] : VERDICT_TONE.go;
  const verdictLabel = verdict ? VERDICT_LABEL[verdict] : null;
  const crowd = crowdLevel ? CROWD_LABEL[crowdLevel] : null;
  const scoreMeta = score != null ? SCORE_LABELS[score] : null;

  // Common wrapper visibility: only render on lg+, only after hero scrolls off,
  // only if user hasn't dismissed.
  const hidden = !visible || railState === "dismissed";

  return (
    <>
      {/* Sentinel — placed right after the hero section. Rail shows when
          this element scrolls out of the viewport. */}
      <div ref={sentinelRef} className="h-0 w-0" aria-hidden="true" />

      {/* Minimised pill — compact floating affordance when collapsed */}
      {railState === "minimised" && !hidden && (
        <button
          type="button"
          onClick={restore}
          aria-label="Expand decision panel"
          className={cn(
            "hidden lg:inline-flex fixed right-4 xl:right-6 top-28 z-30 items-center gap-2 rounded-full border bg-background/85 backdrop-blur-xl px-3.5 py-2 text-xs font-medium text-foreground shadow-xl shadow-black/30 transition-all hover:bg-background",
            tone.ring,
          )}
        >
          <span
            aria-hidden
            className="font-serif italic leading-none"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif", color: tone.accent }}
          >
            {verdictLabel ?? "—"}
          </span>
          <span className="text-muted-foreground">·</span>
          <span>{monthLabel} at a glance</span>
          <span aria-hidden className="ml-1 text-muted-foreground">&larr;</span>
        </button>
      )}

      <aside
        aria-label={`Decision panel for ${name}`}
        className={cn(
          "hidden lg:block fixed right-4 xl:right-6 top-28 z-30 w-64 xl:w-72 transition-all duration-300",
          !hidden && railState === "open" ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 pointer-events-none",
        )}
      >
        <div className={cn("relative rounded-2xl border bg-background/85 backdrop-blur-xl p-4 shadow-xl shadow-black/30", tone.ring)}>
          {/* Close / minimise controls — top-right */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
            <button
              type="button"
              onClick={minimise}
              aria-label="Minimise decision panel"
              title="Minimise"
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <span aria-hidden className="text-sm leading-none">&minus;</span>
            </button>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss decision panel"
              title="Dismiss"
              className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <span aria-hidden className="text-sm leading-none">&times;</span>
            </button>
          </div>

          {/* Header — editorial framing, not a dashboard tile */}
          <div className="mb-3 pr-14">
            <SectionLabel as="div" className="text-white/50">{monthLabel} at a glance</SectionLabel>
            <div className="mt-0.5 text-sm font-semibold text-foreground truncate" title={name}>
              {name}
            </div>
          </div>

          {/* Verdict stamp + score with prose label */}
          <div className="mb-4">
            <div className="flex items-baseline justify-between gap-2">
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
                  <span className={cn("font-mono text-2xl font-semibold tabular-nums", scoreTone(score))}>{score}</span>
                  <span className="text-[11px] font-medium tracking-[0.08em] text-white/50">/5</span>
                </div>
              )}
            </div>
            {scoreMeta && (
              <p className="mt-1.5 text-xs text-muted-foreground leading-snug">
                {scoreMeta}
              </p>
            )}
          </div>

          {/* Signal chips — prose rather than bare numbers */}
          <dl className="mb-4 space-y-1.5 text-xs">
            {kidsRating != null && (
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-muted-foreground">Kids</dt>
                <dd className={cn("font-medium text-right", scoreTone(kidsRating))}>
                  {kidsPhrase(kidsRating)}
                </dd>
              </div>
            )}
            {soloFemaleScore != null && (
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-muted-foreground">Solo female</dt>
                <dd className={cn("font-medium text-right", scoreTone(soloFemaleScore))}>
                  {soloFemalePhrase(soloFemaleScore)}
                </dd>
              </div>
            )}
            {crowd && (
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-muted-foreground">Crowd</dt>
                <dd className={cn("font-medium text-right", crowd.tone)}>{crowd.text}</dd>
              </div>
            )}
          </dl>

          {/* CTAs */}
          <div className="space-y-2">
            <a
              href={`/${locale}/plan?seed=${destinationId}`}
              className="block rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-center text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              Build route with this &rarr;
            </a>
            <a
              href={`/${locale}/plan?seed=${destinationId}&month=${monthSlug}#ai`}
              className="block rounded-lg border border-border bg-background/40 px-3 py-2 text-center text-xs font-semibold text-foreground hover:border-primary/40 transition-colors"
            >
              Ask AI about this &rarr;
            </a>
            {compareWithId && compareWithName && (
              <a
                href={`/${locale}/vs/${destinationId}-vs-${compareWithId}`}
                className="block rounded-lg border border-border bg-background/40 px-3 py-2 text-center text-xs font-semibold text-foreground hover:border-primary/40 transition-colors truncate"
                title={`Compare with ${compareWithName}`}
              >
                vs {compareWithName}
              </a>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Image from "next/image";
import {
  FadeIn,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  HoverCard,
} from "./animated-hero";
import { SCORE_COLORS, SCORE_SOLID, DIFFICULTY_COLORS } from "@/lib/design-tokens";

// ─── Constants ──────────────────────────────────────────────
const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_SLUGS = [
  "",
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// ─── Types ──────────────────────────────────────────────────
interface DestMonthRow {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  state: string;
  score: number;
  note: string | null;
  why_not: string | null;
  verdict?: string | null;
  skip_reason?: string | null;
}

interface WhereToGoContentProps {
  monthSlug: string;
  monthNum: number;
  monthName: string;
  regionSlug?: string;
  regionName?: string;
  data: DestMonthRow[];
  scoreCounts: Record<number, number>;
  /** IDs already rendered in the Weekly Picks hero above — filtered out of
   *  "Go Now" so the same 5 destinations don't appear twice on the page.
   *  Optional; defaults to empty for callers that don't use the hero. */
  excludeIds?: string[];
  /** Live destination count for the methodology strip. Parent fetches via getAppStats(). */
  destinationCount?: number;
}

// ─── Helpers ────────────────────────────────────────────────
function prevMonth(num: number) {
  return num === 1 ? 12 : num - 1;
}
function nextMonth(num: number) {
  return num === 12 ? 1 : num + 1;
}

// ─── Destination Card ───────────────────────────────────────
function DestinationCard({
  d,
  monthSlug,
  locale,
}: {
  d: DestMonthRow;
  monthSlug: string;
  locale: string;
}) {
  return (
    <StaggerItem>
      <HoverCard>
        <Link
          href={`/${locale}/destination/${d.id}/${monthSlug}`}
          className="group block overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-900/60 backdrop-blur-sm transition-colors hover:border-white/10"
        >
          {/* Image area */}
          <div className="relative h-32 overflow-hidden">
            <Image
              src={`/images/destinations/${d.id}.jpg`}
              alt={d.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

            {/* Score badge */}
            <span
              className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-bold ${SCORE_SOLID[d.score] ?? SCORE_SOLID[0]}`}
            >
              {d.score}/5
            </span>

            {/* Name overlay */}
            <h3 className="absolute bottom-2 left-3 right-3 font-fraunces text-lg font-bold leading-tight text-white drop-shadow-lg">
              {d.name}
            </h3>
          </div>

          {/* Details */}
          <div className="space-y-1.5 p-3">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span className={DIFFICULTY_COLORS[d.difficulty] ?? "text-zinc-400"}>
                {d.difficulty}
              </span>
              {d.elevation_m && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="font-mono text-zinc-500">
                    {d.elevation_m.toLocaleString()}m
                  </span>
                </>
              )}
              {d.state && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span>{d.state}</span>
                </>
              )}
            </div>

            {/* Tagline */}
            <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
              {d.tagline}
            </p>
          </div>
        </Link>
      </HoverCard>
    </StaggerItem>
  );
}

// ─── Avoid Card (compact) ───────────────────────────────────
function AvoidCard({ d }: { d: DestMonthRow }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-500/10 bg-red-500/[0.03] px-4 py-3">
      <span className="mt-0.5 shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400">
        {d.score}/5
      </span>
      <div className="min-w-0">
        <span className="font-medium text-zinc-200">{d.name}</span>
        {d.state && (
          <span className="ml-1.5 text-xs text-zinc-500">{d.state}</span>
        )}
        {d.why_not && (
          <p className="mt-0.5 text-sm text-red-400/80">{d.why_not}</p>
        )}
        {!d.why_not && d.note && (
          <p className="mt-0.5 text-sm text-red-400/80">{d.note}</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────
export function WhereToGoContent({
  monthSlug,
  monthNum,
  monthName,
  regionSlug,
  regionName,
  data,
  scoreCounts,
  excludeIds,
  destinationCount,
}: WhereToGoContentProps) {
  const locale = useLocale();
  const [fairExpanded, setFairExpanded] = useState(false);
  const [activeVerdicts, setActiveVerdicts] = useState<Set<"go" | "wait" | "skip">>(
    new Set(["go", "wait", "skip"]),
  );

  const toggleVerdict = (v: "go" | "wait" | "skip") => {
    setActiveVerdicts((prev) => {
      const next = new Set(prev);
      if (next.has(v)) {
        if (next.size === 1) return prev;
        next.delete(v);
      } else {
        next.add(v);
      }
      return next;
    });
  };

  const isRegional = !!regionSlug;
  // Remove Weekly Picks hero destinations from the bucket lists so the same
  // destination doesn't render twice on the page (hero above + Go Now below).
  const excluded = new Set(excludeIds ?? []);
  const filteredData = excluded.size > 0 ? data.filter((d) => !excluded.has(d.id)) : data;
  const score5All = filteredData.filter((d) => d.score === 5);
  const score4All = filteredData.filter((d) => d.score === 4);
  const score3All = filteredData.filter((d) => d.score === 3);
  const scoreAvoidAll = filteredData.filter((d) => d.score <= 2);
  const score5 = activeVerdicts.has("go") ? score5All : [];
  const score4 = activeVerdicts.has("go") ? score4All : [];
  const score3 = activeVerdicts.has("wait") ? score3All : [];
  const scoreAvoid = activeVerdicts.has("skip") ? scoreAvoidAll : [];
  const goCount = score5All.length + score4All.length;
  const waitCount = score3All.length;
  const skipCount = scoreAvoidAll.length;

  const prevSlug = MONTH_SLUGS[prevMonth(monthNum)];
  const nextSlug = MONTH_SLUGS[nextMonth(monthNum)];
  const prevName = MONTH_NAMES[prevMonth(monthNum)];
  const nextName = MONTH_NAMES[nextMonth(monthNum)];

  // Build month navigation slugs — keep region prefix when on a regional page
  const buildMonthHref = (slug: string) =>
    isRegional ? `/${locale}/where-to-go/${regionSlug}-in-${slug}` : `/${locale}/where-to-go/${slug}`;

  return (
    <div className="space-y-12">
      {/* ───── Methodology disclosure strip ───── */}
      <FadeIn>
        <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Method · {destinationCount ?? 480} destinations × 12 months × 6 dimensions = {((destinationCount ?? 480) * 12 * 6).toLocaleString()} data points · Reviewed {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </FadeIn>

      {/* ───── Hero ───── */}
      <FadeIn>
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary/70">
            Where to go in {regionName ?? "India"}
          </p>
          <h1 className="font-fraunces text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {regionName
              ? `${regionName} in ${monthName} — where the data says go, wait, and skip`
              : `${monthName} in India — where the data says go, wait, and skip`}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
            {regionName
              ? `Every destination in ${regionName} scored 1-5 for ${monthName} — weather, roads, crowds, festivals. Go first, then Wait, then Skip. No opinions, just the data.`
              : `Every destination scored 1-5 for ${monthName} — weather, roads, crowds, festivals. Go first, then Wait, then Skip. No opinions, just the data.`}
          </p>
          {regionName && (
            <Link
              href={`/${locale}/where-to-go/${monthSlug}`}
              className="mt-3 inline-block text-sm text-primary/70 hover:text-primary transition-colors"
            >
              ← View all India destinations in {monthName}
            </Link>
          )}
        </div>
      </FadeIn>

      {/* ───── Month Navigation Strip ───── */}
      <FadeIn delay={0.1}>
        <div className="relative">
          {/* Prev arrow */}
          <Link
            href={buildMonthHref(prevSlug)}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-zinc-800/80 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
            aria-label={`Go to ${prevName}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* Month pills */}
          <div className="scrollbar-hide mx-8 flex gap-1.5 overflow-x-auto py-1">
            {MONTH_SLUGS.slice(1).map((slug, i) => {
              const num = i + 1;
              const isCurrent = slug === monthSlug;
              return (
                <Link
                  key={slug}
                  href={buildMonthHref(slug)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    isCurrent
                      ? "bg-primary text-black shadow-lg shadow-primary/25"
                      : "bg-zinc-800/60 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {MONTH_NAMES[num].slice(0, 3)}
                </Link>
              );
            })}
          </div>

          {/* Next arrow */}
          <Link
            href={buildMonthHref(nextSlug)}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-zinc-800/80 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
            aria-label={`Go to ${nextName}`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </FadeIn>

      {/* ───── Verdict filter chips ───── */}
      <FadeIn delay={0.12}>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {([
            { key: "go", label: "GO", count: goCount, on: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200", off: "border-emerald-500/20 bg-transparent text-emerald-400/50" },
            { key: "wait", label: "WAIT", count: waitCount, on: "border-amber-500/50 bg-amber-500/10 text-amber-200", off: "border-amber-500/20 bg-transparent text-amber-400/50" },
            { key: "skip", label: "SKIP", count: skipCount, on: "border-[#E55642]/50 bg-[#E55642]/10 text-[#f8c8bf]", off: "border-[#E55642]/20 bg-transparent text-[#E55642]/50" },
          ] as const).map((chip) => {
            const active = activeVerdicts.has(chip.key);
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => toggleVerdict(chip.key)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.15em] transition-all ${active ? chip.on : chip.off} ${active ? "" : "opacity-70 hover:opacity-100"}`}
                aria-pressed={active}
              >
                <span className="font-serif italic font-medium text-base tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                  {chip.label}
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] opacity-80">({chip.count})</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* ───── Score Summary Bar ───── */}
      <FadeIn delay={0.15}>
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-zinc-900/40 px-4 py-3">
          <SummaryBadge count={scoreCounts[5] ?? 0} label="scoring 5/5" score={5} />
          <span className="text-zinc-600">·</span>
          <SummaryBadge count={scoreCounts[4] ?? 0} label="scoring 4/5" score={4} />
          <span className="text-zinc-600">·</span>
          <SummaryBadge count={scoreCounts[3] ?? 0} label="scoring 3/5" score={3} />
          <span className="text-zinc-600">·</span>
          <SummaryBadge
            count={(scoreCounts[2] ?? 0) + (scoreCounts[1] ?? 0) + (scoreCounts[0] ?? 0)}
            label="to avoid"
            score={1}
          />
        </div>
      </FadeIn>

      {/* ───── Score 5/5 — Go Now ───── */}
      {score5.length > 0 && (
        <section>
          <ScrollReveal>
            <SectionHeader
              title={excluded.size > 0 ? "The other scoring 5/5" : "Go Now"}
              subtitle="5/5"
              accent="emerald"
              count={score5.length}
            />
          </ScrollReveal>
          <StaggerContainer
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.06}
          >
            {score5.map((d) => (
              <DestinationCard
                key={d.id}
                d={d}
                monthSlug={monthSlug}
                locale={locale}
              />
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* ───── Score 4/5 — Good Time ───── */}
      {score4.length > 0 && (
        <section>
          <ScrollReveal>
            <SectionHeader
              title="Good Time"
              subtitle="4/5"
              accent="blue"
              count={score4.length}
            />
          </ScrollReveal>
          <StaggerContainer
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.06}
          >
            {score4.map((d) => (
              <DestinationCard
                key={d.id}
                d={d}
                monthSlug={monthSlug}
                locale={locale}
              />
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* ───── Score 3/5 — Fair (collapsed by default) ───── */}
      {score3.length > 0 && (
        <section>
          <ScrollReveal>
            <SectionHeader
              title="Fair"
              subtitle="3/5"
              accent="yellow"
              count={score3.length}
            />
          </ScrollReveal>

          {!fairExpanded ? (
            <button
              onClick={() => setFairExpanded(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-yellow-500/10 bg-yellow-500/[0.03] py-3 text-sm text-yellow-400 transition-colors hover:bg-yellow-500/[0.06]"
            >
              <span>Show {score3.length} destinations</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <StaggerContainer
              className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.06}
            >
              {score3.map((d) => (
                <DestinationCard
                  key={d.id}
                  d={d}
                  monthSlug={monthSlug}
                  locale={locale}
                />
              ))}
            </StaggerContainer>
          )}
        </section>
      )}

      {/* ───── Score 1-2 — Where NOT to Go ───── */}
      {scoreAvoid.length > 0 && (
        <section>
          <ScrollReveal>
            <SectionHeader
              title="Where NOT to Go"
              subtitle={`${scoreAvoid.length} destinations`}
              accent="red"
              count={scoreAvoid.length}
              hideCount
            />
          </ScrollReveal>
          <p className="mt-2 text-sm text-zinc-500">
            These destinations{regionName ? ` in ${regionName}` : ""} score poorly in {MONTH_NAMES[monthNum]} — bad
            weather, closed roads, or dangerous conditions. Save them for a
            better month.
          </p>
          <div className="mt-4 space-y-2">
            {scoreAvoid.map((d) => (
              <AvoidCard key={d.id} d={d} />
            ))}
          </div>
        </section>
      )}

      {/* ───── Footer — See Another Month ───── */}
      <ScrollReveal>
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-6">
          <h2 className="mb-4 text-center font-fraunces text-xl font-semibold text-white">
            {regionName ? `${regionName} — another month` : "See another month"}
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {MONTH_SLUGS.slice(1).map((slug, i) => {
              const num = i + 1;
              const isCurrent = slug === monthSlug;
              return (
                <Link
                  key={slug}
                  href={buildMonthHref(slug)}
                  className={`rounded-lg px-3 py-2 text-center text-sm font-medium transition-all ${
                    isCurrent
                      ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                      : "bg-zinc-800/40 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {MONTH_NAMES[num]}
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────

function SummaryBadge({
  count,
  label,
  score,
}: {
  count: number;
  label: string;
  score: number;
}) {
  return (
    <span className="flex items-center gap-1.5 text-sm">
      <span
        className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full px-1.5 text-xs font-bold ${SCORE_SOLID[score] ?? SCORE_SOLID[0]}`}
      >
        {count}
      </span>
      <span className="text-zinc-400">{label}</span>
    </span>
  );
}

const ACCENT_COLORS: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  emerald: {
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  blue: {
    border: "border-blue-500/20",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    dot: "bg-blue-400",
  },
  yellow: {
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    dot: "bg-yellow-400",
  },
  red: {
    border: "border-red-500/20",
    text: "text-red-400",
    bg: "bg-red-500/10",
    dot: "bg-red-400",
  },
};

function SectionHeader({
  title,
  subtitle,
  accent,
  count,
  hideCount = false,
}: {
  title: string;
  subtitle: string;
  accent: string;
  count: number;
  hideCount?: boolean;
}) {
  const colors = ACCENT_COLORS[accent] ?? ACCENT_COLORS.blue;
  return (
    <div className="flex items-center gap-3">
      <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
      <h2 className="font-fraunces text-2xl font-bold text-white">{title}</h2>
      <span
        className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${colors.border} ${colors.text} ${colors.bg}`}
      >
        {subtitle}
      </span>
      {!hideCount && (
        <span className="text-sm text-zinc-500">
          {count} destination{count !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

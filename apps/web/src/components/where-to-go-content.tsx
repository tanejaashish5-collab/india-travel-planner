"use client";

import { useEffect, useState } from "react";
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
import { destinationImage } from "@/lib/image-url";
import { videoSrc } from "@/lib/video-url";

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
  solo_female_score?: number | null;
  solo_female_override?: number | null;
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
  /** Oldest content_reviewed_at across the month's destinations. Parent aggregates from destination_months. */
  monthReviewedAt?: string | null;
}

// ─── Helpers ────────────────────────────────────────────────
function prevMonth(num: number) {
  return num === 1 ? 12 : num - 1;
}
function nextMonth(num: number) {
  return num === 12 ? 1 : num + 1;
}

// ─── Destination Card ───────────────────────────────────────
const SOLO_FEMALE_COLOR: Record<number, string> = {
  5: "border-emerald-400/50 bg-emerald-500/20 text-emerald-100",
  4: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  3: "border-amber-400/50 bg-amber-500/20 text-amber-100",
  2: "border-orange-400/50 bg-orange-500/20 text-orange-100",
  1: "border-red-400/50 bg-red-500/25 text-red-100",
};

function DestinationCard({
  d,
  monthSlug,
  locale,
}: {
  d: DestMonthRow;
  monthSlug: string;
  locale: string;
}) {
  const soloFemaleEff = d.solo_female_override ?? d.solo_female_score ?? null;
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

            {/* Solo-female safety badge */}
            {soloFemaleEff != null && (
              <span
                className={`absolute top-2 left-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium backdrop-blur-sm ${SOLO_FEMALE_COLOR[soloFemaleEff] ?? ""}`}
                title={`Solo-female safety: ${soloFemaleEff}/5${d.solo_female_override != null ? " (month-specific)" : ""}`}
                aria-label={`Solo-female score ${soloFemaleEff} of 5`}
              >
                <span className="font-serif italic" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>♀</span>
                <span>{soloFemaleEff}/5</span>
              </span>
            )}

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
  monthReviewedAt,
}: WhereToGoContentProps) {
  const locale = useLocale();
  const [fairExpanded, setFairExpanded] = useState(false);
  const [activeVerdicts, setActiveVerdicts] = useState<Set<"go" | "wait" | "skip">>(
    new Set(["go", "wait", "skip"]),
  );
  const [soloFemaleOnly, setSoloFemaleOnly] = useState(false);

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
  const afterExclude = excluded.size > 0 ? data.filter((d) => !excluded.has(d.id)) : data;
  // Solo-female filter uses coalesce(month override, annual). Threshold: >= 4.
  const filteredData = soloFemaleOnly
    ? afterExclude.filter((d) => {
        const eff = d.solo_female_override ?? d.solo_female_score ?? null;
        return typeof eff === "number" && eff >= 4;
      })
    : afterExclude;
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

  // Top-scoring destination drives the regional hero visual. Array is pre-sorted
  // score DESC so data[0] is the strongest representative of "go here this month".
  const heroDestId = isRegional ? data[0]?.id : null;
  const totalListed = data.length;
  // Sidebar ToC for regional variant — gated on section data presence so the
  // rail doesn't show dead anchors when a bucket is empty.
  const regionalSections = isRegional
    ? [
        score5All.length > 0 && { id: "go5", label: `Go now · ${score5All.length}` },
        score4All.length > 0 && { id: "good4", label: `Good · ${score4All.length}` },
        score3All.length > 0 && { id: "fair3", label: `Fair · ${score3All.length}` },
        scoreAvoidAll.length > 0 && { id: "avoid", label: `Skip · ${scoreAvoidAll.length}` },
        { id: "months", label: "Another month" },
      ].filter((s): s is { id: string; label: string } => Boolean(s))
    : [];

  return (
    <div className="space-y-12">
      {/* ───── Regional: sticky back + breadcrumb bar ───── */}
      {isRegional && regionName && (
        <div className="sticky top-20 z-30 -mt-2">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/85 backdrop-blur px-3 py-2 text-xs sm:text-sm shadow-sm">
            <Link
              href={`/${locale}/where-to-go/${monthSlug}`}
              className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              <span aria-hidden>&larr;</span> Back
            </Link>
            <span className="text-border" aria-hidden>•</span>
            <nav
              className="flex items-center gap-1.5 text-muted-foreground min-w-0 overflow-hidden"
              aria-label="Breadcrumb"
            >
              <Link
                href={`/${locale}/where-to-go`}
                className="hover:text-foreground transition-colors truncate hidden sm:inline"
              >
                Where to go
              </Link>
              <span className="opacity-50 hidden sm:inline" aria-hidden>/</span>
              <Link
                href={`/${locale}/where-to-go/${monthSlug}`}
                className="hover:text-foreground transition-colors truncate"
              >
                {monthName}
              </Link>
              <span className="opacity-50" aria-hidden>/</span>
              <span className="text-foreground truncate">{regionName}</span>
            </nav>
          </div>
        </div>
      )}

      {/* ───── Regional: full-bleed hero video of the top-scoring destination ───── */}
      {isRegional && heroDestId && (
        <FadeIn>
          <div
            className="relative h-56 sm:h-72 lg:h-[32rem] rounded-2xl lg:rounded-none overflow-hidden film-grain lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] lg:w-screen"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.25 0.02 260), oklch(0.18 0.01 280))",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster={destinationImage(heroDestId)}
            >
              <source
                src={videoSrc(heroDestId)}
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none" />
          </div>
        </FadeIn>
      )}

      {/* ───── Methodology disclosure strip ───── */}
      <FadeIn>
        <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            Method · {destinationCount ?? 480} destinations × 12 months × 6 dimensions = {((destinationCount ?? 480) * 12 * 6).toLocaleString()} data points · {monthReviewedAt ? `Oldest review ${new Date(monthReviewedAt).toISOString().slice(0, 7)}` : "Review pending on some destinations"}
          </div>
        </div>
      </FadeIn>

      {/* ───── Hero ─────
           Regional: one unified announcement card (title + GO/WAIT/SKIP counts + top-destination prose).
           Month-only: the original centered text block, unchanged (TopFiveHero lives above on the page). */}
      {isRegional && regionName ? (
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/40 to-zinc-900/0 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/5 blur-3xl" />

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-primary/70">
              Where to go · {monthName} · {regionName}
            </p>
            <h1 className="font-fraunces text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {regionName} in {monthName}
            </h1>
            <p className="mt-3 max-w-prose text-base sm:text-lg leading-relaxed text-white/80">
              {goCount > 0
                ? `${goCount} destination${goCount === 1 ? "" : "s"} score 4 or 5 out of 5 this month. ${skipCount > 0 ? `${skipCount} to skip.` : "None to skip."} ${data[0]?.name ? `Start with ${data[0].name}.` : ""}`
                : skipCount > 0
                  ? `No destinations score 4+ this month. ${skipCount} are best avoided; ${waitCount} are borderline.`
                  : `All ${totalListed} destinations are borderline this month — check the monthly detail before booking.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {goCount > 0 && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-200">
                  <span
                    className="font-serif italic font-medium"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    GO
                  </span>
                  <span className="font-mono text-xs">· {goCount}</span>
                </span>
              )}
              {waitCount > 0 && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-200">
                  <span
                    className="font-serif italic font-medium"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    WAIT
                  </span>
                  <span className="font-mono text-xs">· {waitCount}</span>
                </span>
              )}
              {skipCount > 0 && (
                <span className="inline-flex items-center gap-2 rounded-lg border border-[#E55642]/30 bg-[#E55642]/10 px-3 py-1.5 text-sm text-[#f8c8bf]">
                  <span
                    className="font-serif italic font-medium"
                    style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                  >
                    SKIP
                  </span>
                  <span className="font-mono text-xs">· {skipCount}</span>
                </span>
              )}
            </div>

            <Link
              href={`/${locale}/where-to-go/${monthSlug}`}
              className="mt-6 inline-block text-sm text-primary/70 hover:text-primary transition-colors"
            >
              ← View all India destinations in {monthName}
            </Link>
          </div>
        </FadeIn>
      ) : (
        <FadeIn>
          <div className="text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary/70">
              Where to go in {regionName ?? "India"}
            </p>
            <h1 className="font-fraunces text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              {regionName
                ? `${regionName} in ${monthName} — where the data says go, wait, and skip`
                : `${monthName} in India — where the data says go, wait, and skip`}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
              {regionName
                ? `Every destination in ${regionName} scored 1-5 for ${monthName} — weather, roads, crowds, festivals. Go first, then Wait, then Skip. No opinions, just the data.`
                : `Every destination scored 1-5 for ${monthName} — weather, roads, crowds, festivals. Go first, then Wait, then Skip. No opinions, just the data.`}
            </p>
          </div>
        </FadeIn>
      )}

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
          {/* Solo-female friendly toggle — filters to effective score >= 4 */}
          <button
            type="button"
            onClick={() => setSoloFemaleOnly((v) => !v)}
            aria-pressed={soloFemaleOnly}
            title="Show only destinations with solo-female score 4 or 5 for this month"
            className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.15em] transition-all ${
              soloFemaleOnly
                ? "border-rose-400/50 bg-rose-500/10 text-rose-200"
                : "border-rose-500/20 bg-transparent text-rose-300/60 opacity-70 hover:opacity-100"
            }`}
          >
            <span className="font-serif italic font-medium text-base tracking-tight" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
              ♀
            </span>
            Solo-female
          </button>
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

      {/* ───── Content buckets — 2-col grid with sidebar ToC for regional variant ─────
           Month-only: outer wrapper is a transparent div, inner wrapper provides
           section spacing exactly as before (space-y-12 moved from outer). */}
      <div className={isRegional ? "lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-10 lg:items-start" : ""}>
        <div className="space-y-12 min-w-0">

      {/* ───── Score 5/5 — Go Now ───── */}
      {score5.length > 0 && (
        <section id="section-go5" className="scroll-mt-28">
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
        <section id="section-good4" className="scroll-mt-28">
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
        <section id="section-fair3" className="scroll-mt-28">
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
        <section id="section-avoid" className="scroll-mt-28">
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
        <div id="section-months" className="scroll-mt-28 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-6">
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
        {isRegional && regionalSections.length > 0 && (
          <aside className="hidden lg:block">
            <WhereToGoSidebar sections={regionalSections} />
          </aside>
        )}
      </div>
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
      <h2 className="font-fraunces text-2xl font-semibold text-white">{title}</h2>
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

// ─── Sidebar ToC for the regional /where-to-go/{state}-in-{month} variant ───
// Sticky vertical pill rail, lg+ only. IntersectionObserver-based scroll-spy:
// the "active" bucket is whichever section straddles the vertical middle.
function WhereToGoSidebar({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = sections
      .map((s) => document.getElementById(`section-${s.id}`))
      .filter((el): el is HTMLElement => !!el);
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries.filter((e) => e.isIntersecting);
        if (hits.length === 0) return;
        hits.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const topId = hits[0].target.id.replace(/^section-/, "");
        setActive(topId);
      },
      { rootMargin: "-40% 0% -40% 0%", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  const onJump = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-28 self-start" aria-label="In this guide">
      <div className="rounded-xl border border-border bg-background/95 backdrop-blur p-2 shadow-sm">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          In this guide
        </div>
        <div className="flex flex-col gap-1">
          {sections.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => onJump(s.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-left transition-colors ${
                  isActive
                    ? "bg-primary/10 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-hidden="true"
                />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

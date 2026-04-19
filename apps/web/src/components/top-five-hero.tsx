"use client";

/**
 * Top 5 Hero — ranked-row module for /where-to-go/{month} pages.
 *
 * Preview only for now. Mounted at /en/preview/top-five-april so Ashish can
 * judge the aesthetic against the rest of the site before we wire it into the
 * real month landing pages. Delete both this file and the preview route if
 * rejected; no other files touched.
 *
 * Composition borrowed from Claude Design proposals/master-dark.html —
 * rail header, rotated stamp, ranked rows with sparkline + tag chip — but
 * typography is mapped to the site's existing Fraunces italic + Geist Mono
 * + Geist Sans so we don't load a new font just for this module.
 */

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "./animated-hero";

export interface TopFiveRow {
  id: string;
  name: string;
  tagline: string | null;
  state: string | null;
  elevation_m: number | null;
  score: number;
  /** 12-value array from destination_months, one per month, score 0–5. */
  monthlyScores: number[];
  /** Week-level editorial hook — shown below the tagline in vermillion.
   *  Empty string = hide the line entirely. Populated by /api/weekly-picks. */
  whyThisWeek?: string;
}

interface TopFiveHeroProps {
  topFive: TopFiveRow[];
  /** 1–12 — used to light the current-month bar in the sparkline. */
  monthNum: number;
  monthName: string;
  monthSlug: string;
  regionName?: string;
  /** Shown in the caption strip above the rows — e.g. "April 2026". */
  asOfDate: string;
  /** Current week within the month (1–5). When set, hero labels itself
   *  "This Week's Picks · {Month} · Week N" instead of the static
   *  "Top N · {Month} · India". */
  weekNum?: number;
  /** "April 15–21, 2026" style string. When set, rendered in the caption
   *  strip alongside the "As of …" freshness stamp. */
  dateRange?: string;
  /** True when /api/weekly-picks fell back from 5/5 to 4/5 because the
   *  peak pool was exhausted this week. Flips the hero label to
   *  "Good Time To Visit · …" per PRD §18 fallback framing. */
  fallbackFromFour?: boolean;
}

const VERMILLION = "#E55642";
const SAFFRON = "#C8932F"; // Brand Saffron Gold — editorial support (4/5 tier)
const EMERALD = "#34D399"; // Tailwind emerald-400 — "go, this is peak" (5/5 tier)

/* Chip tints follow the brand-green "Score badge" convention: 5/5 is emerald
 * so the eye instantly reads "go." 4/5 drops to Saffron (still positive, but
 * clearly a step below peak), 3 and below fade into muted neutrals. Vermillion
 * is never used for score metadata — reserved for why_this_week + #1 stamp. */
function chipClass(score: number): string {
  if (score >= 5) return "border-[#34D399]/55 text-[#34D399]";
  if (score >= 4) return "border-[#C8932F]/55 text-[#C8932F]";
  if (score >= 3) return "border-white/20 text-white/50";
  return "border-white/15 text-white/35";
}

/* Score number carries the same green/saffron/muted ladder as the chip,
 * so a row reads as a unit: chip + score + sparkline peak month all speak
 * the same color language for a 5/5. */
function scoreClass(score: number): string {
  if (score >= 5) return "text-[#34D399]";
  if (score >= 4) return "text-[#C8932F]";
  return "text-white";
}

function chipLabel(score: number): string {
  if (score >= 5) return "PEAK";
  if (score >= 4) return "GOOD";
  if (score >= 3) return "OK";
  return "—";
}

/* Per-bar color encodes the score value, so the 12-bar chart reads as a
 * shape-of-the-year instead of a red blob. Active month gets a thin outline
 * ring so "this is now" still lands even when its underlying score is low. */
function barColor(score: number): string {
  if (score >= 5) return EMERALD; // peak months speak the same green as the score + chip
  if (score === 4) return SAFFRON;
  if (score === 3) return "rgba(255,255,255,0.40)";
  return "rgba(255,255,255,0.15)";
}

function Sparkline({ scores, activeMonth }: { scores: number[]; activeMonth: number }) {
  const bars = Array.from({ length: 12 }, (_, i) => scores[i] ?? 0);
  return (
    <div
      className="grid h-[30px] items-end gap-[2px]"
      style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
      aria-hidden
    >
      {bars.map((s, i) => {
        const isActive = i + 1 === activeMonth;
        const h = Math.max(2, Math.round((s / 5) * 30));
        return (
          <div
            key={i}
            style={{
              height: `${h}px`,
              backgroundColor: barColor(s),
              outline: isActive ? "1px solid rgba(255,255,255,0.85)" : "none",
              outlineOffset: "-1px",
            }}
          />
        );
      })}
    </div>
  );
}

/* Circular rotated stamp for the #1 row. Hidden on mobile (md-down). */
function NumberOneStamp() {
  return (
    <div
      className="pointer-events-none absolute -top-3 right-4 hidden md:flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[#E55642] bg-[#0A0B0A]/95 text-[#E55642]"
      style={{ transform: "rotate(-7deg)" }}
      aria-hidden
    >
      <div className="text-center">
        <div className="font-mono text-[8px] font-bold uppercase tracking-[0.24em]">
          #1
        </div>
        <div className="font-fraunces italic text-[13px] leading-none mt-1">
          this month
        </div>
      </div>
    </div>
  );
}

export function TopFiveHero({
  topFive,
  monthNum,
  monthName,
  monthSlug,
  regionName,
  asOfDate,
  weekNum,
  dateRange,
  fallbackFromFour,
}: TopFiveHeroProps) {
  const locale = useLocale();
  const regionLabel = regionName ?? "India";

  // Eyebrow is rendered as per-token spans (see below) so the two reading
  // landmarks — the month name and "5/5" — can carry vermillion while the
  // structural labels recede to muted white. This keeps vermillion as the
  // spice rather than letting the label bar compete with the headline.
  const modeLabel = weekNum
    ? fallbackFromFour
      ? "Good Time to Visit"
      : "This Week's Picks"
    : topFive.length === 5
      ? "Top 5"
      : `The ${topFive.length}`;
  const contextLabel = weekNum ? `Week ${weekNum}` : regionLabel;
  const peakCount = topFive.filter((r) => r.score >= 5).length;

  return (
    <section className="my-12">
      {/* ── Rail header ─────────────────────────────────────── */}
      <FadeIn>
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-[#E55642]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em]">
            <span className="text-white/55">{modeLabel}</span>
            <span className="text-white/25"> · </span>
            <span style={{ color: VERMILLION }}>{monthName}</span>
            <span className="text-white/25"> · </span>
            <span className="text-white/55">{contextLabel}</span>
            {peakCount > 0 && (
              <>
                <span className="text-white/25"> · </span>
                <span className="text-white/55">{peakCount} scoring </span>
                <span style={{ color: VERMILLION }}>5/5</span>
              </>
            )}
          </span>
        </div>
        <h2 className="font-fraunces italic text-4xl sm:text-5xl md:text-[56px] font-medium leading-[0.98] tracking-tight text-white max-w-[800px] text-balance">
          Where to go in {regionLabel} this{" "}
          <em className="not-italic text-[#E55642] font-fraunces italic">
            {monthName}
          </em>
          .
        </h2>
      </FadeIn>

      {/* ── Caption strip ───────────────────────────────────── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
        <span>{dateRange ?? `As of ${asOfDate}`}</span>
        <span className="hidden sm:inline">Verified by editors</span>
        <span>Scores out of 5</span>
      </div>

      {/* ── Ranked rows ─────────────────────────────────────── */}
      <StaggerContainer
        className="relative border border-white/10 border-t-0 bg-[#111312]"
        staggerDelay={0.06}
      >
        {topFive.map((row, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          return (
            <StaggerItem key={row.id}>
              <Link
                href={`/${locale}/destination/${row.id}/${monthSlug}`}
                className={`group relative grid gap-4 border-t border-white/10 px-5 transition-colors hover:bg-[#171918] md:gap-5 md:px-6 ${
                  isFirst
                    ? "bg-white/[0.03] py-7 md:py-8"
                    : "py-5 md:py-6"
                }`}
                style={{
                  gridTemplateColumns:
                    "56px minmax(0, 1fr) auto",
                }}
              >
                {isFirst && <NumberOneStamp />}

                {/* Rank */}
                <div className="flex items-center">
                  <span className="font-mono text-[13px] md:text-[15px] font-medium tracking-wider text-white/45 group-hover:text-white/70 transition-colors">
                    #{rank}
                  </span>
                </div>

                {/* Thumb + name + tagline (collapses to full width below md) */}
                <div className="flex min-w-0 items-center gap-4 md:gap-5">
                  <div
                    className={`relative flex-shrink-0 overflow-hidden border border-white/10 bg-black/40 ${
                      isFirst
                        ? "h-20 w-20 md:h-24 md:w-24"
                        : "h-14 w-14 md:h-16 md:w-16"
                    }`}
                  >
                    <Image
                      src={`/images/destinations/${row.id}.jpg`}
                      alt={row.name}
                      fill
                      sizes={isFirst ? "96px" : "64px"}
                      className="object-cover"
                      style={{ filter: "grayscale(0.1) brightness(0.95)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={`font-fraunces italic leading-tight tracking-tight text-white truncate ${
                        isFirst
                          ? "text-[26px] md:text-[32px]"
                          : "text-[22px] md:text-[26px]"
                      }`}
                    >
                      {row.name}
                    </h3>
                    {row.tagline && (
                      <p className="mt-1 line-clamp-1 text-[12px] md:text-[13px] text-white/55 max-w-[500px]">
                        {row.tagline}
                      </p>
                    )}
                    {row.whyThisWeek && (
                      // Week-level editorial hook — vermillion, italic serif
                      // to echo the brand voice, line-clamped so overflow
                      // stays the responsibility of the selection algorithm.
                      <p className="mt-1 line-clamp-2 font-fraunces italic text-[13px] md:text-[14px] leading-snug text-[#E55642] max-w-[540px]">
                        {row.whyThisWeek}
                      </p>
                    )}
                    {/* Mobile-only meta row */}
                    <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 md:hidden">
                      {row.state && <span>{row.state}</span>}
                      {row.state && row.elevation_m && <span>·</span>}
                      {row.elevation_m && (
                        <span>{row.elevation_m.toLocaleString()}m</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Desktop-only right rail: score · chip · sparkline · GO → */}
                <div className="hidden md:grid items-center gap-5"
                  style={{
                    gridTemplateColumns: "80px 90px 170px 70px",
                  }}
                >
                  {/* Score — green for 5/5 (go), saffron for 4/5 (good). The
                   *  score number is the fastest read on the row, so it
                   *  carries the same semantic color as the chip beside it. */}
                  <div className="flex items-baseline gap-1">
                    <span className={`font-mono text-[32px] font-bold leading-none tracking-tight ${scoreClass(row.score)}`}>
                      {row.score}
                    </span>
                    <span className="font-mono text-[15px] leading-none text-white/35">
                      /5
                    </span>
                  </div>

                  {/* Chip */}
                  <span
                    className={`inline-flex w-fit items-center justify-center border px-2 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.22em] rounded-none ${chipClass(row.score)}`}
                  >
                    {chipLabel(row.score)}
                  </span>

                  {/* Sparkline */}
                  <div className="flex flex-col gap-1">
                    <Sparkline scores={row.monthlyScores} activeMonth={monthNum} />
                    <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">
                      <span>J</span>
                      <span>D</span>
                    </div>
                  </div>

                  {/* GO → bone-weighted, brightens on hover. */}
                  <span className="justify-self-end font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 underline decoration-transparent underline-offset-4 group-hover:text-white group-hover:decoration-white/70 transition-colors">
                    GO<span aria-hidden> →</span>
                  </span>
                </div>

                {/* Mobile-only right: score + GO */}
                <div className="flex flex-col items-end gap-2 md:hidden">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-mono text-[26px] font-bold leading-none tracking-tight ${scoreClass(row.score)}`}>
                      {row.score}
                    </span>
                    <span className="font-mono text-[13px] leading-none text-white/35">
                      /5
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center justify-center border px-1.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.18em] rounded-none ${chipClass(row.score)}`}
                  >
                    {chipLabel(row.score)}
                  </span>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* ── Footnote ────────────────────────────────────────── */}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
        Ranked by NakshIQ Score · Ties broken alphabetically · Data refreshed monthly
      </p>
    </section>
  );
}

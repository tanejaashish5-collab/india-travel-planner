"use client";

/**
 * Top 5 Hero — image-first bento grid for /where-to-go/{month} pages.
 *
 * Asymmetric layout signals rank without a stamp: #1 spans 8 cols × 2 rows,
 * #2–3 stack in the right 4-col column, #4–5 split the bottom half. Images
 * are grayscale on desktop at rest and bloom into full color plus a slight
 * ken-burns zoom on hover — calm catalog, engaged color. Mobile keeps color
 * always since there's no hover there.
 *
 * Stays on brand: Fraunces italic for names, Geist mono for labels,
 * vermillion reserved for the why_this_week editorial hook, emerald for
 * 5/5 score pill, saffron for 4/5.
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
  /** Week-level editorial hook — shown below the tagline in vermillion.
   *  Empty string = hide the line entirely. Populated by /api/weekly-picks. */
  whyThisWeek?: string;
}

interface TopFiveHeroProps {
  topFive: TopFiveRow[];
  monthName: string;
  monthSlug: string;
  regionName?: string;
  /** Shown in the caption strip above the grid — e.g. "April 2026". */
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

const VERMILLION = "#E55642"; // editorial hook color (why_this_week only)
const SAFFRON = "#C8932F"; // 4/5 "good" tier
const EMERALD = "#34D399"; // 5/5 "peak / go" tier

function chipLabel(score: number): string {
  if (score >= 5) return "PEAK";
  if (score >= 4) return "GOOD";
  if (score >= 3) return "OK";
  return "—";
}

/* Glass-morphism score pill — dot color + glow shadow. Emerald for 5 (go),
 * saffron for 4 (good), muted-white for 3 and below. */
function scoreDotColor(score: number): string {
  if (score >= 5) return EMERALD;
  if (score >= 4) return SAFFRON;
  return "rgba(255,255,255,0.55)";
}
function scoreDotGlow(score: number): string {
  if (score >= 5) return "0 0 8px rgba(52,211,153,0.55)";
  if (score >= 4) return "0 0 8px rgba(200,147,47,0.5)";
  return "none";
}

export function TopFiveHero({
  topFive,
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

      {/* ── Bento grid ──────────────────────────────────────
       *
       * Asymmetric 5-tile grid (desktop): #1 spans 8 cols × 2 rows —
       * its size alone signals rank, no stamp needed. #2 and #3 stack
       * in the right 4-col column. #4 and #5 split the bottom half 6+6.
       * On mobile, the grid collapses to a single column with #1 tall
       * and the rest at a compact tile height.
       *
       * Images are grayscale on desktop at rest and bloom into full
       * color + slight ken-burns zoom on hover. Restraint-by-default,
       * payoff on engagement — calm B&W catalog, engaged color.
       * Mobile keeps color always since there is no hover. */}
      <StaggerContainer
        className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4 md:auto-rows-[240px]"
        staggerDelay={0.08}
      >
        {topFive.map((row, index) => {
          const rank = index + 1;
          const isFirst = rank === 1;
          const spanClass = isFirst
            ? "md:col-span-8 md:row-span-2"
            : rank <= 3
              ? "md:col-span-4 md:row-span-1"
              : "md:col-span-6 md:row-span-1";
          const mobileHeight = isFirst ? "h-[360px]" : "h-[240px]";

          return (
            <StaggerItem
              key={row.id}
              className={`${spanClass} ${mobileHeight} md:h-auto`}
            >
              <Link
                href={`/${locale}/destination/${row.id}/${monthSlug}`}
                className="group relative block h-full w-full overflow-hidden border border-white/10 bg-black"
              >
                {/* Image — grayscale on desktop at rest, color + zoom on hover */}
                <Image
                  src={`/images/destinations/${row.id}.jpg`}
                  alt={row.name}
                  fill
                  sizes={
                    isFirst
                      ? "(max-width: 768px) 100vw, 66vw"
                      : rank <= 3
                        ? "(max-width: 768px) 100vw, 33vw"
                        : "(max-width: 768px) 100vw, 50vw"
                  }
                  priority={isFirst}
                  className="object-cover transition-all duration-700 ease-out md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-[1.04]"
                />

                {/* Legibility scrim — darkest at bottom for text, fades up */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                {/* Rank marker — small top-left */}
                <div className="absolute left-4 top-4 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-white/70">
                  #{rank}
                </div>

                {/* Score pill — glass morphism, top-right */}
                <div className="absolute right-3 top-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: scoreDotColor(row.score),
                        boxShadow: scoreDotGlow(row.score),
                      }}
                    />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                      {row.score}/5 · {chipLabel(row.score)}
                    </span>
                  </div>
                </div>

                {/* Bottom content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 ${
                    isFirst ? "p-6 md:p-10" : "p-4 md:p-5"
                  }`}
                >
                  {row.state && (
                    <div className="mb-2 flex items-center gap-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-white/65">
                      <span>{row.state}</span>
                      {row.elevation_m && (
                        <>
                          <span className="h-0.5 w-0.5 rounded-full bg-white/35" />
                          <span>{row.elevation_m.toLocaleString()}m</span>
                        </>
                      )}
                    </div>
                  )}
                  <h3
                    className={`font-fraunces italic leading-[1.05] tracking-tight text-white ${
                      isFirst
                        ? "text-[32px] md:text-[52px]"
                        : "text-[22px] md:text-[28px]"
                    }`}
                  >
                    {row.name}
                  </h3>
                  {isFirst && row.tagline && (
                    <p className="mt-3 max-w-xl text-[13px] md:text-[15px] leading-snug text-white/75">
                      {row.tagline}
                    </p>
                  )}
                  {row.whyThisWeek && (
                    <p
                      className={`${
                        isFirst ? "mt-2 max-w-xl" : "mt-1.5"
                      } line-clamp-2 font-fraunces italic leading-snug ${
                        isFirst
                          ? "text-[14px] md:text-[16px]"
                          : "text-[12px] md:text-[13px]"
                      }`}
                      style={{ color: VERMILLION }}
                    >
                      {row.whyThisWeek}
                    </p>
                  )}
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* ── Footnote ────────────────────────────────────────── */}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
        Ranked by NakshIQ Score · Ties broken by editorial richness · Hover for full color
      </p>
    </section>
  );
}

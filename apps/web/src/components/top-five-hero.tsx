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
}

const VERMILLION = "#E55642";

/* Three tag tints, mirroring master-dark.html `.tag.peak|.good|.ok`. */
function chipClass(score: number): string {
  if (score >= 5) return "border-[#E55642]/70 text-[#E55642]";
  if (score >= 4) return "border-emerald-400/60 text-emerald-400";
  if (score >= 3) return "border-amber-300/60 text-amber-300";
  return "border-white/20 text-white/40";
}

function chipLabel(score: number): string {
  if (score >= 5) return "PEAK";
  if (score >= 4) return "GOOD";
  if (score >= 3) return "OK";
  return "—";
}

/* 12-bar monthly sparkline. Current month lit vermillion, others dim. */
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
            className={isActive ? "bg-[#E55642]" : "bg-white/25"}
            style={{ height: `${h}px` }}
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
}: TopFiveHeroProps) {
  const locale = useLocale();
  const regionLabel = regionName ?? "India";

  // Only say "top 5" if we actually have 5. Graceful regional fallback.
  const headingCount = topFive.length === 5 ? "Top 5" : `The ${topFive.length}`;
  const peakCount = topFive.filter((r) => r.score >= 5).length;

  return (
    <section className="my-12">
      {/* ── Rail header ─────────────────────────────────────── */}
      <FadeIn>
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-[#E55642]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-white/60">
            {headingCount} · {monthName} · {regionLabel}
            {peakCount > 0 ? (
              <>
                {" · "}
                <span className="text-emerald-400">{peakCount} scoring 5/5</span>
              </>
            ) : null}
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
        <span>As of {asOfDate}</span>
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
                className="group relative grid gap-4 border-t border-white/10 px-5 py-5 transition-colors hover:bg-[#171918] md:gap-5 md:px-6 md:py-6"
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
                  <div className="relative h-14 w-14 md:h-16 md:w-16 flex-shrink-0 overflow-hidden border border-white/10 bg-black/40">
                    <Image
                      src={`/images/destinations/${row.id}.jpg`}
                      alt={row.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                      style={{ filter: "grayscale(0.1) brightness(0.95)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-fraunces italic text-[22px] md:text-[26px] leading-tight tracking-tight text-white truncate">
                      {row.name}
                    </h3>
                    {row.tagline && (
                      <p className="mt-1 line-clamp-1 text-[12px] md:text-[13px] text-white/55 max-w-[500px]">
                        {row.tagline}
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
                  {/* Score */}
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-mono text-[32px] font-bold leading-none tracking-tight"
                      style={{ color: VERMILLION }}
                    >
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

                  {/* GO → */}
                  <span className="justify-self-end font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#E55642] group-hover:text-white transition-colors">
                    GO<span aria-hidden> →</span>
                  </span>
                </div>

                {/* Mobile-only right: score + GO */}
                <div className="flex flex-col items-end gap-2 md:hidden">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-mono text-[26px] font-bold leading-none tracking-tight"
                      style={{ color: VERMILLION }}
                    >
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

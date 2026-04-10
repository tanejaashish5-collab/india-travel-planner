"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface TrapDest {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  state: string | null;
}

interface Alternative {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  why_better: string;
  distance_km: number | null;
  drive_time: string | null;
  crowd_difference: string | null;
  vibe_difference: string | null;
}

interface MonthScore {
  month: number;
  score: number;
}

interface Props {
  trapDest: TrapDest;
  alternatives: Alternative[];
  whyTrapText: string | null;
  goodMonths: string[];
  allMonths: MonthScore[];
  locale: string;
}

export function SkipListDetail({ trapDest, alternatives, whyTrapText, goodMonths, allMonths, locale }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
        <Image
          src={`/images/destinations/${trapDest.id}.jpg`}
          alt={trapDest.name}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <FadeIn className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded bg-red-950/60 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
              Skip List
            </span>
            {trapDest.state && (
              <span className="text-sm text-white/60">{trapDest.state}</span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Skip {trapDest.name} — Here&apos;s Why (and Where to Go Instead)
          </h1>
          <p className="mt-2 text-white/70 max-w-2xl text-sm sm:text-base">
            {trapDest.tagline}
          </p>
        </FadeIn>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/tourist-traps`} className="hover:text-foreground transition-colors">Tourist Traps</Link>
          <span>/</span>
          <span className="text-foreground">{trapDest.name}</span>
        </nav>

        {/* Why travelers are disappointed */}
        {whyTrapText && (
          <ScrollReveal>
            <section className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-red-400">!</span>
                Why Travelers Are Disappointed
              </h2>
              <p className="text-muted-foreground leading-relaxed">{whyTrapText}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <span className={`rounded-full border px-3 py-1 ${DIFFICULTY_COLORS[trapDest.difficulty] || "text-zinc-400"}`}>
                  {trapDest.difficulty}
                </span>
                {trapDest.elevation_m && (
                  <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
                    {trapDest.elevation_m.toLocaleString()}m elevation
                  </span>
                )}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* When it's still worth visiting */}
        <ScrollReveal delay={0.1}>
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">When It&apos;s Still Worth Visiting</h2>
            {goodMonths.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-4 text-sm">
                  {trapDest.name} scores 4+ out of 5 in these months — if you must go, this is when:
                </p>
                <div className="flex flex-wrap gap-2">
                  {goodMonths.map((m) => (
                    <span
                      key={m}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium ${SCORE_COLORS[4]}`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                No month scores 4 or above — there&apos;s always a better alternative.
              </p>
            )}

            {/* Month score bar */}
            {allMonths.length > 0 && (
              <div className="mt-6 grid grid-cols-12 gap-1">
                {allMonths.map((m) => (
                  <div key={m.month} className="text-center">
                    <div
                      className={`mx-auto h-8 w-full rounded ${
                        m.score >= 4
                          ? "bg-emerald-500/40"
                          : m.score >= 3
                          ? "bg-yellow-500/30"
                          : m.score >= 2
                          ? "bg-orange-500/30"
                          : "bg-red-500/30"
                      }`}
                    />
                    <span className="mt-1 block text-[10px] text-muted-foreground">
                      {MONTH_SHORT[m.month]}
                    </span>
                    <span className="block text-[10px] font-medium text-foreground">
                      {m.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </ScrollReveal>

        {/* Better alternatives */}
        <ScrollReveal delay={0.15}>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-6">
              Better Alternatives to {trapDest.name}
            </h2>
            <StaggerContainer className="grid gap-5 sm:grid-cols-2" staggerDelay={0.08}>
              {alternatives.map((alt) => (
                <StaggerItem key={alt.id}>
                  <HoverCard className="h-full">
                    <article className="h-full rounded-2xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-lg">
                      {/* Alt image */}
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={`/images/destinations/${alt.id}.jpg`}
                          alt={alt.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="rounded bg-emerald-950/60 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                            Go here instead
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{alt.name}</h3>
                          {alt.tagline && (
                            <p className="text-xs text-muted-foreground mt-0.5">{alt.tagline}</p>
                          )}
                        </div>

                        {alt.why_better && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {alt.why_better}
                          </p>
                        )}

                        {/* Meta badges */}
                        <div className="flex flex-wrap gap-2">
                          {alt.distance_km && (
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                              {alt.distance_km} km away
                            </span>
                          )}
                          {alt.drive_time && (
                            <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                              {alt.drive_time}
                            </span>
                          )}
                          {alt.crowd_difference && (
                            <span className="rounded-full bg-emerald-950/30 px-2.5 py-1 text-xs text-emerald-400">
                              {alt.crowd_difference}
                            </span>
                          )}
                          {alt.vibe_difference && (
                            <span className="rounded-full bg-blue-950/30 px-2.5 py-1 text-xs text-blue-400">
                              {alt.vibe_difference}
                            </span>
                          )}
                          {alt.difficulty && (
                            <span className={`rounded-full bg-muted px-2.5 py-1 text-xs ${DIFFICULTY_COLORS[alt.difficulty] || "text-zinc-400"}`}>
                              {alt.difficulty}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/${locale}/destination/${alt.id}`}
                          className="inline-block text-sm font-medium text-primary underline-offset-2 hover:underline"
                        >
                          Explore {alt.name} &rarr;
                        </Link>
                      </div>
                    </article>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </ScrollReveal>

        {/* Back link */}
        <div className="pt-4 border-t border-border">
          <Link
            href={`/${locale}/tourist-traps`}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to Tourist Traps
          </Link>
        </div>
      </main>
    </>
  );
}

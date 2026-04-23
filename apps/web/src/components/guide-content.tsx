"use client";

import Image from "next/image";
import Link from "next/link";
import {
  StaggerContainer,
  StaggerItem,
  HoverCard,
  ScrollReveal,
} from "./animated-hero";

interface KidsFriendly {
  suitable: boolean | null;
  rating: number | null;
  min_recommended_age: number | null;
  reasons: string[] | null;
}

interface Destination {
  id: string;
  name: string;
  difficulty: string | null;
  elevation_m: number | null;
  best_months: number[] | null;
  state: { name: string } | { name: string }[] | null;
  kids_friendly?: KidsFriendly | KidsFriendly[] | null;
}

interface Comparison {
  trap_destination_id: string;
  alternative_destination_id: string;
  destinations: { name: string } | { name: string }[];
  destination: { name: string } | { name: string }[];
}

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

const MONTH_COLORS: Record<string, string> = {
  January: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  February: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  March: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  April: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  May: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  June: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  July: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  August: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  September: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  October: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  November: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  December: "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

function DestinationImage({
  id,
  className,
  size = 64,
}: {
  id: string;
  className: string;
  size?: number;
}) {
  return (
    <Image
      src={`/images/destinations/${id}.jpg`}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}

export function GuideContent({
  destinations,
  comparisons,
  monthScores,
  currentMonth,
}: {
  destinations: Destination[];
  comparisons: Comparison[];
  monthScores: { destination_id: string; score: number | null; note: string | null }[];
  currentMonth: number;
}) {
  const currentMonthName = MONTH_NAMES[currentMonth] ?? "";
  const currentMonthSlug = currentMonthName.toLowerCase();

  // Best Time to Visit — sort by current-month score, pick where NOW is 4+/5.
  // Replaces the old alphabetical slice(0, 30) that surfaced A-named cards
  // regardless of seasonal fit. Self-refreshing via ISR (revalidate=86400):
  // as the month rolls over, the list rotates to that month's top picks.
  const scoreByDest = new Map(monthScores.map((s) => [s.destination_id, s]));
  const bestTimeGuides = destinations
    .filter((d) => (scoreByDest.get(d.id)?.score ?? 0) >= 4)
    .sort((a, b) => {
      const sa = scoreByDest.get(a.id)?.score ?? 0;
      const sb = scoreByDest.get(b.id)?.score ?? 0;
      if (sb !== sa) return sb - sa;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 30)
    .map((d) => {
      const entry = scoreByDest.get(d.id);
      return {
        id: d.id,
        title: `${d.name} in ${currentMonthName}`,
        href: `/en/destination/${d.id}/${currentMonthSlug}`,
        desc: entry?.note
          ? `${entry.score}/5 for ${currentMonthName} — ${entry.note}`
          : `${entry?.score ?? "—"}/5 for ${currentMonthName} — weather, crowds, costs${d.elevation_m ? ` (${d.elevation_m}m)` : ""}`,
        months: [currentMonthName],
      };
    });
  const bestTimeCount = destinations.filter((d) => (scoreByDest.get(d.id)?.score ?? 0) >= 4).length;

  // Generate "vs" comparison guides
  const vsGuides = comparisons
    .map((c) => {
      const trapName = Array.isArray(c.destinations)
        ? c.destinations[0]?.name
        : c.destinations?.name;
      const altName = Array.isArray(c.destination)
        ? c.destination[0]?.name
        : c.destination?.name;
      return {
        trapId: c.trap_destination_id,
        altId: c.alternative_destination_id,
        title: `${trapName} vs ${altName}`,
        href: `/en/compare?compare=${c.trap_destination_id},${c.alternative_destination_id}`,
        desc: `Side-by-side comparison: score, difficulty, kids rating, safety, network, cost`,
      };
    })
    .filter((g) => g.title && !g.title.includes("undefined"));

  // Family guides — top 30 by kids_friendly rating. Uses the curated
  // kids_friendly table (suitable + rating 1-5) instead of the old
  // difficulty="easy" alphabetical slice. Matches the sort/unwrap pattern
  // used by /en/family/[state] so the two callers stay in sync.
  const kf = (d: Destination) => (Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly) ?? null;
  const familyGuides = destinations
    .filter((d) => kf(d)?.suitable === true)
    .sort((a, b) => (kf(b)?.rating ?? 0) - (kf(a)?.rating ?? 0))
    .slice(0, 30)
    .map((d) => ({
      id: d.id,
      title: `${d.name} with Kids — Family Guide`,
      href: `/en/destination/${d.id}`,
      desc: `Kids rating, family stress level, infrastructure, medical access`,
    }));

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8">
      {/* Best Time to Visit */}
      <ScrollReveal className="mb-16">
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-emerald-500 mb-4" />
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-emerald-400 mb-1">
            In season
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">Best time to visit — {currentMonthName}</h2>
          <p className="text-muted-foreground mt-1">
            {bestTimeCount > 0
              ? `${bestTimeCount} destinations scoring 4-5/5 for ${currentMonthName} — sorted by monthly score`
              : `Monthly suitability scores, crowd levels, and weather reality`}
          </p>
        </div>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bestTimeGuides.map((g) => (
            <StaggerItem key={g.href}>
              <HoverCard>
                <Link
                  href={g.href}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group h-full"
                >
                  <div className="shrink-0">
                    <DestinationImage
                      id={g.id}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-emerald-400 transition-colors leading-tight">
                      {g.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {g.desc}
                    </p>
                    {g.months && g.months.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {g.months.map((month) => (
                          <span
                            key={month}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${MONTH_COLORS[month] || "bg-primary/10 text-primary border-primary/20"}`}
                          >
                            {month}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
        {bestTimeCount > 30 && (
          <div className="mt-6 text-right">
            <Link
              href={`/en/where-to-go/${currentMonthSlug}`}
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              All {bestTimeCount} destinations for {currentMonthName} →
            </Link>
          </div>
        )}
      </ScrollReveal>

      {/* Vs Comparisons */}
      <ScrollReveal className="mb-16" delay={0.1}>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-blue-500 mb-4" />
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-blue-400 mb-1">
            Worth comparing
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Side-by-side guides
          </h2>
          <p className="text-muted-foreground mt-1">
            Weather, safety, kids, cost, crowd, network — measured and compared
          </p>
        </div>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vsGuides.slice(0, 18).map((g) => (
            <StaggerItem key={g.title}>
              <HoverCard>
                <Link
                  href={g.href}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group h-full"
                >
                  <div className="shrink-0 flex gap-1">
                    <DestinationImage
                      id={g.trapId}
                      className="w-8 h-8 rounded-lg object-cover"
                      size={32}
                    />
                    <DestinationImage
                      id={g.altId}
                      className="w-8 h-8 rounded-lg object-cover"
                      size={32}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-blue-400 transition-colors leading-tight">
                      {g.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {g.desc}
                    </p>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollReveal>

      {/* Practical Playbooks — operational guides, arrival, permits, trains */}
      <ScrollReveal className="mb-16" delay={0.15}>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-primary mb-4" />
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-primary mb-1">
            On the ground
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">Field guides</h2>
          <p className="text-muted-foreground mt-1">
            How to arrive, which permits you need, how to book trains, which roads are open
          </p>
        </div>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Arrival Playbook", desc: "9 airports: prepaid taxis, SIM counters, scam warnings, after-midnight notes", href: "/en/arrival", tag: "9 airports" },
            { title: "Permits & Passes", desc: "Inner Line Permits, Protected Area Permits, national park entries, trek registrations", href: "/en/guide/permits", tag: "ILP · PAP" },
            { title: "Book Indian Trains", desc: "IRCTC sign-up, Tatkal timing, foreign-passport bookings, waitlist psychology", href: "/en/guide/book-indian-trains", tag: "IRCTC" },
            { title: "Road Conditions", desc: "Latest pass status, seasonal closures, road-trip readiness by route", href: "/en/road-conditions", tag: "live" },
            { title: "Tourist Traps", desc: "The overhyped places to skip — and the honest alternative for each", href: "/en/tourist-traps", tag: "skip list" },
            { title: "Scoring methodology", desc: "How the 5-point scores are built. 12 months × 6 dimensions per destination", href: "/en/methodology", tag: "how we score" },
          ].map((p) => (
            <StaggerItem key={p.href}>
              <HoverCard>
                <Link
                  href={p.href}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all group h-full"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight">
                        {p.title}
                      </h3>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/20">
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {p.desc}
                    </p>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollReveal>

      {/* Family Guides */}
      <ScrollReveal className="mb-16" delay={0.2}>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-amber-500 mb-4" />
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-amber-400 mb-1">
            Travelling with kids
          </p>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Guides for families
          </h2>
          <p className="text-muted-foreground mt-1">
            Infrastructure-aware kids ratings, medical access, family stress
            levels
          </p>
        </div>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {familyGuides.map((g) => (
            <StaggerItem key={g.href + "-family"}>
              <HoverCard>
                <Link
                  href={g.href}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all group h-full"
                >
                  <div className="shrink-0">
                    <DestinationImage
                      id={g.id}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm group-hover:text-amber-400 transition-colors leading-tight">
                      {g.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {g.desc}
                    </p>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-6 text-right">
          <Link
            href="/en/explore?kids=true"
            className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            All family-friendly destinations →
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}

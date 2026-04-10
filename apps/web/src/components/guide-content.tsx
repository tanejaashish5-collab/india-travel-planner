"use client";

import Image from "next/image";
import Link from "next/link";
import {
  StaggerContainer,
  StaggerItem,
  HoverCard,
  ScrollReveal,
} from "./animated-hero";

interface Destination {
  id: string;
  name: string;
  difficulty: string | null;
  elevation_m: number | null;
  best_months: number[] | null;
  state: { name: string } | { name: string }[] | null;
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
}: {
  destinations: Destination[];
  comparisons: Comparison[];
}) {
  // Generate "Best time to visit" guides
  const bestTimeGuides = destinations.slice(0, 30).map((d) => ({
    id: d.id,
    title: `Best Time to Visit ${d.name}`,
    href: `/en/destination/${d.id}`,
    desc: `Monthly scores, weather, crowds, and costs for ${d.name}${d.elevation_m ? ` (${d.elevation_m}m)` : ""}`,
    months: d.best_months
      ?.slice(0, 3)
      .map((m: number) => MONTH_NAMES[m])
      .filter(Boolean),
  }));

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

  // Family guides
  const familyGuides = destinations
    .filter((d) => d.difficulty === "easy")
    .slice(0, 15)
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
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400 mb-1">
            Seasonal Intelligence
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">Best Time to Visit</h2>
          <p className="text-muted-foreground mt-1">
            Monthly suitability scores, crowd levels, and weather reality
          </p>
        </div>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bestTimeGuides.map((g) => (
            <StaggerItem key={g.href}>
              <HoverCard>
                <Link
                  href={g.href}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group"
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
      </ScrollReveal>

      {/* Vs Comparisons */}
      <ScrollReveal className="mb-16" delay={0.1}>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-blue-500 mb-4" />
          <p className="text-xs font-medium uppercase tracking-widest text-blue-400 mb-1">
            Head-to-Head
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Destination Comparisons
          </h2>
          <p className="text-muted-foreground mt-1">
            Side-by-side on 11 dimensions — score, kids, safety, network, cost
          </p>
        </div>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vsGuides.slice(0, 18).map((g) => (
            <StaggerItem key={g.title}>
              <HoverCard>
                <Link
                  href={g.href}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
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

      {/* Family Guides */}
      <ScrollReveal className="mb-16" delay={0.2}>
        <div className="mb-6">
          <div className="h-1 w-12 rounded-full bg-amber-500 mb-4" />
          <p className="text-xs font-medium uppercase tracking-widest text-amber-400 mb-1">
            Kid-Friendly
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Family Travel Guides
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
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 transition-all group"
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
      </ScrollReveal>
    </div>
  );
}

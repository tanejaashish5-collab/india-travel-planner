"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ExploreFilters, type FilterState } from "./explore-filters";
import { CompareButton } from "./compare-tray";
import { StaggerContainer, StaggerItem, HoverCard } from "./animated-hero";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

interface DestinationData {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  tags: string[];
  best_months: number[];
  translations: Record<string, Record<string, string>> | null;
  state: { name: string } | Array<{ name: string }> | null;
  state_id: string;
  kids_friendly:
    | { suitable: boolean; rating: number }
    | Array<{ suitable: boolean; rating: number }>
    | null;
  destination_months:
    | Array<{ month: number; score: number; note: string }>
    | null;
}

export function ExploreGrid({
  destinations,
  states,
  sharedFilters,
  onFiltersChange,
}: {
  destinations: DestinationData[];
  states: Array<{ id: string; name: string }>;
  sharedFilters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
}) {
  const locale = useLocale();
  const ts = useTranslations("score");
  const tm = useTranslations("months");
  const te = useTranslations("explore");
  const tu = useTranslations("ui");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentMonth = new Date().getMonth() + 1;

  // Use shared filters from parent if provided, otherwise manage own state
  const [localFilters, setLocalFilters] = useState<FilterState>({
    stateId: searchParams.get("state") ?? "",
    month: Number(searchParams.get("month")) || currentMonth,
    kidsOnly: searchParams.get("kids") === "true",
    sort: searchParams.get("sort") ?? "",
    difficulty: searchParams.get("difficulty") ?? "",
    search: searchParams.get("q") ?? "",
  });

  const filters = sharedFilters ?? localFilters;
  const setFilters = onFiltersChange ?? setLocalFilters;

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.stateId) params.set("state", filters.stateId);
    if (filters.month !== currentMonth) params.set("month", String(filters.month));
    if (filters.kidsOnly) params.set("kids", "true");
    if (filters.difficulty) params.set("difficulty", filters.difficulty);
    if (filters.search) params.set("q", filters.search);
    if (filters.sort) params.set("sort", filters.sort);
    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [filters, pathname, router, currentMonth]);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      // State filter
      if (filters.stateId && d.state_id !== filters.stateId) return false;

      // Difficulty filter
      if (filters.difficulty && d.difficulty !== filters.difficulty) return false;

      // Kids filter
      if (filters.kidsOnly) {
        const kf = Array.isArray(d.kids_friendly)
          ? d.kids_friendly[0]
          : d.kids_friendly;
        if (!kf?.suitable) return false;
      }

      // Month score filter (only show score 3+ for selected month)
      if (filters.month > 0 && d.destination_months) {
        const monthData = d.destination_months.find(
          (m) => m.month === filters.month,
        );
        // Don't filter out — just used for display. Let all destinations show.
      }

      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const stateName = getStateName(d);
        if (
          !d.name.toLowerCase().includes(q) &&
          !d.tagline.toLowerCase().includes(q) &&
          !(stateName?.toLowerCase().includes(q)) &&
          !d.tags?.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }

      return true;
    });
  }, [destinations, filters]);

  // Sort
  const sorted = useMemo(() => {
    let result = [...filtered];

    // Apply explicit sort
    if (filters.sort) {
      const getMonthScore = (d: DestinationData) =>
        d.destination_months?.find((m) => m.month === (filters.month || currentMonth))?.score ?? -1;
      const getKidsRating = (d: DestinationData) => {
        const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly;
        return kf?.rating ?? -1;
      };

      switch (filters.sort) {
        case "score-desc": result.sort((a, b) => getMonthScore(b) - getMonthScore(a)); break;
        case "score-asc": result.sort((a, b) => getMonthScore(a) - getMonthScore(b)); break;
        case "elevation-desc": result.sort((a, b) => (b.elevation_m ?? 0) - (a.elevation_m ?? 0)); break;
        case "elevation-asc": result.sort((a, b) => (a.elevation_m ?? 0) - (b.elevation_m ?? 0)); break;
        case "kids-desc": result.sort((a, b) => getKidsRating(b) - getKidsRating(a)); break;
        case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
      }
    } else if (filters.month > 0) {
      // Default: sort by month score when month is selected
      result.sort((a, b) => {
        const aScore = a.destination_months?.find((m) => m.month === filters.month)?.score ?? -1;
        const bScore = b.destination_months?.find((m) => m.month === filters.month)?.score ?? -1;
        return bScore - aScore;
      });
    }

    return result;
  }, [filtered, filters.month, filters.sort, currentMonth]);

  // Show featured hero only when no filters/search active
  const isDefaultView = !filters.stateId && !filters.search && !filters.difficulty && !filters.kidsOnly && !filters.sort;

  return (
    <>
      <ExploreFilters
        states={states}
        filters={filters}
        onChange={setFilters}
        resultCount={sorted.length}
      />

      <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.04}>
        {sorted.map((dest, index) => (
          <StaggerItem key={dest.id} className={isDefaultView && index === 0 ? "sm:col-span-2" : ""}>
            <HoverCard>
              <DestinationCard
                cardIndex={index}
                dest={dest}
                locale={locale}
                selectedMonth={filters.month}
                ts={ts}
                tm={tm}
                te={te}
                tu={tu}
                featured={isDefaultView && index === 0}
              />
            </HoverCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {sorted.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">{te("noResults")}</p>
          <p className="mt-1 text-sm">{te("tryAdjusting")}</p>
        </div>
      )}
    </>
  );
}

function getStateName(d: DestinationData): string {
  if (!d.state) return "";
  if (Array.isArray(d.state)) return d.state[0]?.name ?? "";
  return d.state.name ?? "";
}

function DestinationCard({
  dest,
  locale,
  selectedMonth,
  ts,
  tm,
  te,
  tu,
  featured = false,
  cardIndex = 0,
}: {
  dest: DestinationData;
  locale: string;
  selectedMonth: number;
  ts: (key: string) => string;
  tm: (key: string) => string;
  te: (key: string) => string;
  tu: (key: string) => string;
  featured?: boolean;
  cardIndex?: number;
}) {
  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;
  const stateName = getStateName(dest);
  const monthData =
    selectedMonth > 0
      ? dest.destination_months?.find((m) => m.month === selectedMonth)
      : null;
  const score = monthData?.score ?? null;

  // Translation-aware display
  const displayName = (locale !== "en" && dest.translations?.[locale]?.name) || dest.name;
  const displayTagline = (locale !== "en" && dest.translations?.[locale]?.tagline) || dest.tagline;

  const imageUrl = `/images/destinations/${dest.id}.jpg`;

  return (
    <Link
      href={`/${locale}/destination/${dest.id}`}
      prefetch={false}
      className="group flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 h-full"
    >
      {/* Hero Image */}
      <div className={`relative ${featured ? "h-48" : "h-40"} bg-muted/30 overflow-hidden`}>
        {/* Featured badge */}
        {featured && (
          <span className="absolute top-2 left-12 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
            {tu("featured")}
          </span>
        )}
        {/* Save button overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const saved = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
            if (saved.includes(dest.id)) {
              localStorage.setItem("savedDestinations", JSON.stringify(saved.filter((s: string) => s !== dest.id)));
            } else {
              localStorage.setItem("savedDestinations", JSON.stringify([...saved, dest.id]));
            }
            // Force re-render — simple toggle
            (e.target as HTMLElement).textContent = saved.includes(dest.id) ? "♡" : "♥";
          }}
          className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-red-400 transition-all backdrop-blur-sm"
          aria-label="Save destination"
        >
          ♡
        </button>
        {!featured && (
          <div className="absolute top-2 left-2 z-10">
            <CompareButton destinationId={dest.id} />
          </div>
        )}
        <Image
          src={imageUrl}
          alt={dest.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover ken-burns"
          priority={cardIndex < 4}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${featured ? "bg-gradient-to-t from-card via-card/60 to-transparent" : "bg-gradient-to-t from-card/80 to-transparent"}`} />

        {/* Featured: title overlaid on image */}
        {featured && (
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <h3 className="text-xl font-bold text-foreground drop-shadow-md group-hover:text-primary transition-colors leading-snug">
              {displayName}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {displayTagline}
            </p>
          </div>
        )}
      </div>

      <div className="p-5 pt-3 flex flex-col flex-1">
      {/* Score + Kids */}
      <div className="mb-3 flex items-center justify-between">
        {score !== null ? (
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${SCORE_COLORS[score] ?? SCORE_COLORS[0]}`}
          >
            {score}/5 — {ts(String(score))}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {selectedMonth > 0
              ? `${te("noData")} — ${tm(String(selectedMonth))}`
              : te("selectMonth")}
          </span>
        )}
        {kf && (
          <span className="text-xs font-medium text-muted-foreground">
            {kf.suitable ? `👶 ${kf.rating}/5` : te("adultsOnly")}
          </span>
        )}
      </div>

      {/* Name & tagline (non-featured only — featured shows overlaid on image) */}
      {!featured && (
        <>
          <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug">
            {displayName}
          </h3>
          <p className="mt-1.5 text-[15px] text-muted-foreground line-clamp-2 leading-relaxed">
            {displayTagline}
          </p>
        </>
      )}

      {/* Meta */}
      <div className={`${featured ? "" : "mt-3"} flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground`}>
        {stateName && <span>{stateName}</span>}
        <span>·</span>
        <span className={DIFFICULTY_COLORS[dest.difficulty] ?? ""}>
          {dest.difficulty}
        </span>
        {dest.elevation_m && (
          <>
            <span>·</span>
            <span className="font-mono">
              {dest.elevation_m.toLocaleString()}m
            </span>
          </>
        )}
      </div>

      {/* 12-month score strip */}
      {dest.destination_months && dest.destination_months.length > 0 && (
        <div className="mt-3">
          <div className="flex gap-0.5" title="Monthly scores: green=great, red=avoid">
            {Array.from({ length: 12 }, (_, i) => {
              const m = i + 1;
              const md = dest.destination_months?.find((dm: any) => dm.month === m);
              const s = md?.score ?? 0;
              const dotColor = s >= 4 ? "bg-emerald-400" : s === 3 ? "bg-yellow-400" : s >= 1 ? "bg-red-400" : "bg-muted-foreground/20";
              const isSelected = m === selectedMonth;
              return (
                <div
                  key={m}
                  className={`h-1.5 flex-1 rounded-full ${dotColor} ${isSelected ? "ring-1 ring-primary ring-offset-1 ring-offset-card" : ""}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground/60">
            <span>J</span><span>D</span>
          </div>
        </div>
      )}

      {/* Spacer to push bottom content down */}
      <div className="flex-1" />

      {/* Tags — always show area */}
      <div className="mt-2.5 flex flex-wrap gap-1.5 min-h-[28px]">
        {dest.tags?.slice(0, 3).map((tag: string) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Month note — always reserve space */}
      <p className="mt-2 text-xs text-muted-foreground/70 line-clamp-1 italic min-h-[18px]">
        {monthData?.note || ""}
      )}
      </div>
    </Link>
  );
}

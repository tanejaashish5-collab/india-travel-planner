"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { StaggerContainer, StaggerItem, HoverCard, ScrollReveal, PulseGlow } from "./animated-hero";

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getSeasonBorder(month: number): string {
  if (month >= 11 || month <= 2) return "border-l-blue-400";
  if (month >= 3 && month <= 5) return "border-l-emerald-400";
  if (month >= 6 && month <= 7) return "border-l-orange-400";
  if (month >= 8 && month <= 9) return "border-l-sky-400";
  return "border-l-amber-400"; // October
}

function getSeasonLabel(month: number): string {
  if (month >= 11 || month <= 2) return "Winter";
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 7) return "Summer";
  if (month >= 8 && month <= 9) return "Monsoon";
  return "Autumn";
}

export function FestivalsContent({ festivals }: { festivals: any[] }) {
  const locale = useLocale();
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = all
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return festivals.filter((f) => {
      if (selectedMonth > 0 && f.month !== selectedMonth) return false;
      if (search) {
        const q = search.toLowerCase();
        const destName = Array.isArray(f.destinations) ? f.destinations[0]?.name : f.destinations?.name;
        if (
          !f.name.toLowerCase().includes(q) &&
          !(destName?.toLowerCase().includes(q)) &&
          !f.description?.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [festivals, selectedMonth, search]);

  // Group by month
  const grouped = useMemo(() => {
    const groups: Record<number, typeof festivals> = {};
    filtered.forEach((f) => {
      if (!groups[f.month]) groups[f.month] = [];
      groups[f.month].push(f);
    });
    return groups;
  }, [filtered]);

  // Sort months starting from current
  const sortedMonths = useMemo(() => {
    const months = Object.keys(grouped).map(Number).sort((a, b) => a - b);
    // Rotate so current month is first
    const idx = months.findIndex((m) => m >= currentMonth);
    if (idx > 0) return [...months.slice(idx), ...months.slice(0, idx)];
    return months;
  }, [grouped, currentMonth]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search festivals or destinations..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <div className="flex gap-1 overflow-x-auto">
          <button
            onClick={() => setSelectedMonth(0)}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              selectedMonth === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
            const count = festivals.filter((f) => f.month === m).length;
            const isCurrentMonth = m === currentMonth;
            return (
              <span key={m} className="relative shrink-0">
                {isCurrentMonth && selectedMonth !== m && (
                  <PulseGlow className="!rounded-lg !blur-md" />
                )}
                <button
                  onClick={() => setSelectedMonth(m === selectedMonth ? 0 : m)}
                  className={`relative z-10 shrink-0 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                    m === selectedMonth ? "bg-primary text-primary-foreground" :
                    isCurrentMonth ? "text-primary border border-primary/30" :
                    "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {MONTH_SHORT[m]} <span className="text-xs opacity-60">{count}</span>
                </button>
              </span>
            );
          })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} festivals</p>

      {/* Grouped by month */}
      {sortedMonths.map((month) => (
        <div key={month} className="space-y-3">
          <ScrollReveal>
            <h2 className="text-xl font-bold sticky top-[64px] bg-background/95 backdrop-blur-md py-2 z-20 border-b border-border/30">
              {MONTH_NAMES[month]}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {grouped[month].length} festival{grouped[month].length !== 1 ? "s" : ""}
              </span>
              <span className="ml-2 text-xs font-normal text-muted-foreground/60">{getSeasonLabel(month)}</span>
              {month === currentMonth && (
                <span className="ml-2 rounded-full bg-primary/10 text-primary px-2 py-1 text-xs font-medium">This month</span>
              )}
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid gap-3 sm:grid-cols-2" staggerDelay={0.06}>
            {grouped[month].map((festival: any) => {
              const destName = Array.isArray(festival.destinations) ? festival.destinations[0]?.name : festival.destinations?.name;

              return (
                <StaggerItem key={festival.id}>
                  <HoverCard>
                    <Link
                      href={`/${locale}/destination/${festival.destination_id}`}
                      className={`group block rounded-xl border border-l-4 ${getSeasonBorder(festival.month)} border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-200`}
                    >
                      {/* Destination hero image */}
                      <div className="relative h-28 bg-muted/30 overflow-hidden">
                        <Image
                          src={`/images/destinations/${festival.destination_id}.jpg`}
                          alt={`${festival.name} festival at ${destName || festival.destination_id}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-[15px] group-hover:text-primary transition-colors">{festival.name}</h3>
                          <span className="shrink-0 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium">
                            {MONTH_SHORT[festival.month]}
                          </span>
                        </div>
                        {festival.approximate_date && (
                          <p className="text-xs text-muted-foreground/70 mb-2">{festival.approximate_date}</p>
                        )}
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{festival.description}</p>
                        {festival.significance && (
                          <p className="mt-2 text-xs italic text-primary/60 line-clamp-1">{festival.significance}</p>
                        )}
                        {destName && (
                          <p className="mt-2 text-xs text-muted-foreground">📍 {destName}</p>
                        )}
                      </div>
                    </Link>
                  </HoverCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-lg">No festivals match your search</p>
        </div>
      )}
    </div>
  );
}

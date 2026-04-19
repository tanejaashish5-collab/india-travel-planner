"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { m as motion } from "framer-motion";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

interface Destination {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  tags: string[];
  translations: any;
  kids_friendly: any;
  destination_months: Array<{ month: number; score: number; note: string }> | null;
}

export function StateDestinationGrid({
  destinations,
  locale,
}: {
  destinations: Destination[];
  locale: string;
}) {
  const currentMonth = new Date().getMonth() + 1;
  const [sortBy, setSortBy] = useState<"score" | "name" | "elevation" | "difficulty">("score");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const sorted = useMemo(() => {
    let result = [...destinations];

    if (filterDifficulty) {
      result = result.filter((d) => d.difficulty === filterDifficulty);
    }

    switch (sortBy) {
      case "score":
        result.sort((a, b) => {
          const aScore = a.destination_months?.find((m) => m.month === currentMonth)?.score ?? -1;
          const bScore = b.destination_months?.find((m) => m.month === currentMonth)?.score ?? -1;
          return bScore - aScore;
        });
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "elevation":
        result.sort((a, b) => (b.elevation_m ?? 0) - (a.elevation_m ?? 0));
        break;
      case "difficulty": {
        const order: Record<string, number> = { easy: 0, moderate: 1, hard: 2, extreme: 3 };
        result.sort((a, b) => (order[a.difficulty] ?? 99) - (order[b.difficulty] ?? 99));
        break;
      }
    }

    return result;
  }, [destinations, sortBy, filterDifficulty, currentMonth]);

  return (
    <>
      {/* Compact sort/filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex gap-1 rounded-lg border border-border p-0.5 text-xs">
          {(["score", "name", "elevation", "difficulty"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`rounded-md px-3 py-1.5 font-medium capitalize transition-colors ${
                sortBy === s ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "score" ? "Best Now" : s}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-lg border border-border p-0.5 text-xs">
          <button
            onClick={() => setFilterDifficulty("")}
            className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
              !filterDifficulty ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {["easy", "moderate", "hard", "extreme"].map((d) => (
            <button
              key={d}
              onClick={() => setFilterDifficulty(filterDifficulty === d ? "" : d)}
              className={`rounded-md px-3 py-1.5 font-medium capitalize transition-colors ${
                filterDifficulty === d ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <span className="self-center text-xs text-muted-foreground/50 ml-2">
          {sorted.length} destination{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((dest, i) => {
          const monthData = dest.destination_months?.find((m) => m.month === currentMonth);
          const score = monthData?.score ?? null;
          const kf = Array.isArray(dest.kids_friendly) ? dest.kids_friendly[0] : dest.kids_friendly;
          const displayName = (locale !== "en" && dest.translations?.[locale]?.name) || dest.name;
          const displayTagline = (locale !== "en" && dest.translations?.[locale]?.tagline) || dest.tagline;

          return (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5), duration: 0.3 }}
            >
              <Link
                href={`/${locale}/destination/${dest.id}`}
                className="group flex gap-4 rounded-xl border border-border/50 bg-card p-3 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-muted/30">
                  <Image
                    src={`/images/destinations/${dest.id}.jpg`}
                    alt={dest.name}
                    fill
                    sizes="80px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                      {displayName}
                    </h3>
                    {score !== null && (
                      <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${SCORE_COLORS[score] ?? SCORE_COLORS[0]}`}>
                        {score}/5
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{displayTagline}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground/70">
                    <span className={`capitalize ${DIFFICULTY_COLORS[dest.difficulty] ?? ""}`}>
                      {dest.difficulty}
                    </span>
                    {dest.elevation_m && (
                      <>
                        <span>·</span>
                        <span className="font-mono">{dest.elevation_m.toLocaleString()}m</span>
                      </>
                    )}
                    {kf?.suitable && (
                      <>
                        <span>·</span>
                        <span>👶 {kf.rating}/5</span>
                      </>
                    )}
                  </div>
                  {/* Mini month strip */}
                  <div className="mt-1.5 flex gap-[2px]">
                    {Array.from({ length: 12 }, (_, mi) => {
                      const md = dest.destination_months?.find((dm) => dm.month === mi + 1);
                      const s = md?.score ?? 0;
                      const color = s >= 4 ? "bg-emerald-400" : s === 3 ? "bg-yellow-400" : s >= 1 ? "bg-red-400" : "bg-muted-foreground/20";
                      const isCurrent = mi + 1 === currentMonth;
                      return (
                        <div
                          key={mi}
                          className={`h-1 flex-1 rounded-full ${color} ${isCurrent ? "ring-1 ring-primary ring-offset-1 ring-offset-card" : ""}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No destinations match this filter.</p>
        </div>
      )}
    </>
  );
}

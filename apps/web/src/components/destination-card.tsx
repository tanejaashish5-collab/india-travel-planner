"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface DestinationCardProps {
  id: string;
  name: string;
  tagline: string;
  state: string;
  difficulty: string;
  elevation_m: number | null;
  tags: string[];
  best_months: number[];
  kids_rating: number | null;
  kids_suitable: boolean | null;
  current_month_score: number | null;
  translations?: Record<string, Record<string, string>>;
}

const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  3: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  2: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  1: "bg-red-500/20 text-red-400 border-red-500/30",
  0: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "text-emerald-400",
  moderate: "text-yellow-400",
  hard: "text-orange-400",
  extreme: "text-red-400",
};

export function DestinationCard({
  id,
  name,
  tagline,
  state,
  difficulty,
  elevation_m,
  tags,
  best_months,
  kids_rating,
  kids_suitable,
  current_month_score,
  translations,
}: DestinationCardProps) {
  const locale = useLocale();
  const t = useTranslations("months");
  const td = useTranslations("destination");
  const ts = useTranslations("score");

  // Resolve translated name/tagline with English fallback
  const displayName =
    locale !== "en" && translations?.[locale]?.name
      ? translations[locale].name
      : name;
  const displayTagline =
    locale !== "en" && translations?.[locale]?.tagline
      ? translations[locale].tagline
      : tagline;

  const currentMonth = new Date().getMonth() + 1;
  const scoreToShow = current_month_score ?? null;

  return (
    <Link
      href={`/${locale}/destination/${id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Score badge */}
      {scoreToShow !== null && (
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${SCORE_COLORS[scoreToShow] ?? SCORE_COLORS[0]}`}
          >
            {scoreToShow}/5 — {ts(String(scoreToShow))}
          </span>
          {kids_suitable !== null && (
            <span className="text-xs text-muted-foreground">
              {kids_suitable ? `👶 ${kids_rating}/5` : "Adults only"}
            </span>
          )}
        </div>
      )}

      {/* Name & tagline */}
      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
        {displayName}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
        {displayTagline}
      </p>

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{state}</span>
        <span>·</span>
        <span className={DIFFICULTY_COLORS[difficulty] ?? ""}>
          {difficulty}
        </span>
        {elevation_m && (
          <>
            <span>·</span>
            <span className="font-mono">{elevation_m.toLocaleString()}m</span>
          </>
        )}
      </div>

      {/* Best months */}
      <div className="mt-3 flex flex-wrap gap-1">
        {best_months.slice(0, 4).map((m) => (
          <span
            key={m}
            className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
          >
            {t(String(m)).slice(0, 3)}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

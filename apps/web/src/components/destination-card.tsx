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
  budget_tier?: string | null;
  price_range?: string | null;
  translations?: Record<string, Record<string, string>>;
  solo_female_score?: number | null;
}

const BUDGET_LABEL: Record<string, string> = {
  budget: "Budget",
  mixed: "Mixed",
  luxury: "Luxury",
};

const SCORE_COLORS: Record<number, string> = {
  5: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  4: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  3: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  2: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  1: "bg-red-500/20 text-red-400 border-red-500/30",
  0: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const SOLO_FEMALE_COLOR: Record<number, string> = {
  5: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  4: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  3: "border-amber-400/40 bg-amber-500/15 text-amber-200",
  2: "border-orange-400/40 bg-orange-500/15 text-orange-200",
  1: "border-red-400/40 bg-red-500/15 text-red-200",
  0: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
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
  budget_tier,
  price_range,
  translations,
  solo_female_score,
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
  const monthShort = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][currentMonth];
  const priceLabel = price_range ? `₹${price_range}` : (budget_tier && BUDGET_LABEL[budget_tier]) || null;

  return (
    <Link
      href={`/${locale}/destination/${id}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Score badge */}
      {scoreToShow !== null && (
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${SCORE_COLORS[scoreToShow] ?? SCORE_COLORS[0]}`}
          >
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-80 mr-1.5">{monthShort}</span>
            {scoreToShow}/5 — {ts(String(scoreToShow))}
          </span>
          <span className="flex items-center gap-2">
            {typeof solo_female_score === "number" && (
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${SOLO_FEMALE_COLOR[solo_female_score] ?? SOLO_FEMALE_COLOR[0]}`}
                title="Solo-female safety — see Safety tab"
                aria-label={`Solo-female score ${solo_female_score} of 5`}
              >
                <span className="font-serif italic" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>♀</span>
                <span className="font-medium">{solo_female_score}/5</span>
              </span>
            )}
            {kids_suitable !== null && (
              <span className="text-xs text-muted-foreground">
                {kids_suitable ? `👶 ${kids_rating}/5` : "Adults only"}
              </span>
            )}
          </span>
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
        {priceLabel && (
          <>
            <span>·</span>
            <span className="font-medium text-foreground/80">{priceLabel}</span>
          </>
        )}
        {elevation_m && (
          <>
            <span>·</span>
            <span className="font-mono">{elevation_m.toLocaleString()}m</span>
          </>
        )}
      </div>

      {/* Best months — sorted chronologically (not by ranking) so gaps read naturally;
          consistent pill styling with blog/guide surfaces; current month highlighted. */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[...best_months]
          .sort((a, b) => a - b)
          .slice(0, 6)
          .map((m) => {
            const isNow = m === currentMonth;
            return (
              <span
                key={m}
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm ${
                  isNow
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-muted/50 text-muted-foreground"
                }`}
              >
                {t(String(m)).slice(0, 3)}
              </span>
            );
          })}
      </div>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

"use client";

import { useTranslations } from "next-intl";

interface KidsBadgeProps {
  suitable: boolean;
  rating: number;
  min_recommended_age: number;
  best_age_group: string;
  stroller_accessible: boolean;
  reasons: string[];
  concerns: string[];
  kid_highlights: string[];
  not_suitable_reason: string | null;
}

export function KidsBadge({
  suitable,
  rating,
  min_recommended_age,
  best_age_group,
  stroller_accessible,
  reasons,
  concerns,
  kid_highlights,
  not_suitable_reason,
}: KidsBadgeProps) {
  const t = useTranslations("destination");

  if (!suitable) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-lg">
            ⚠️
          </div>
          <div>
            <h3 className="font-semibold text-red-400">
              {t("notSuitableForKids")}
            </h3>
            <p className="text-xs text-muted-foreground">
              Rating: {rating}/5
            </p>
          </div>
        </div>
        {not_suitable_reason && (
          <p className="mt-3 text-sm text-red-300/80 leading-relaxed">
            {not_suitable_reason}
          </p>
        )}
        {concerns.length > 0 && (
          <ul className="mt-3 space-y-1">
            {concerns.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 text-red-400">•</span>
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg">
            👶
          </div>
          <div>
            <h3 className="font-semibold text-emerald-400">
              {t("suitableForKids")}
            </h3>
            <p className="text-xs text-muted-foreground">
              Rating: {rating}/5 · {t("minAge")}: {min_recommended_age}+ · Best
              for: {best_age_group}
            </p>
          </div>
        </div>
        <div className="text-2xl font-mono font-bold text-emerald-400">
          {rating}/5
        </div>
      </div>

      {/* Why it works */}
      {reasons.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">
            Why it works for families
          </h4>
          <ul className="space-y-1">
            {reasons.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 text-emerald-400">✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kid highlights */}
      {kid_highlights.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">
            What kids will love
          </h4>
          <ul className="space-y-1">
            {kid_highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5">⭐</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concerns */}
      {concerns.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground mb-2">
            Heads up
          </h4>
          <ul className="space-y-1">
            {concerns.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-0.5 text-yellow-400">⚠</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stroller */}
      <div className="mt-3 text-xs text-muted-foreground">
        Stroller accessible: {stroller_accessible ? "Yes" : "No"}
      </div>
    </div>
  );
}

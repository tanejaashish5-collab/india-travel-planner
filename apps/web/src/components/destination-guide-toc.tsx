"use client";

import { useTranslations } from "next-intl";

type HasMap = {
  monthly: boolean;
  kids: boolean;
  safety: boolean;
  places: boolean;
  food: boolean;
  reviews: boolean;
};

type Props = {
  dest: any;
  months: any[];
  kf: any;
  cc: any;
  subs: any[];
  gems: any[];
  pois: any[];
  eats: any[];
  legends: any[];
  has: HasMap;
};

const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Visual "In this guide" card — the top-of-page ToC that replaces the old tab row.
 * Each tile advertises a section's content (count + key fact) and scroll-anchors
 * to its section when clicked. Tiles auto-hide when section data is absent.
 */
export function DestinationGuideToC({
  dest,
  months,
  kf,
  cc,
  subs,
  gems,
  pois,
  eats,
  legends,
  has,
}: Props) {
  const t = useTranslations("destination");

  // Best month by score (highest score wins; first month wins ties).
  const bestMonth = months.length > 0
    ? months.reduce((best: any, m: any) => (m.score > (best?.score ?? -1) ? m : best), null)
    : null;

  const placesCount = subs.length + gems.length + pois.length;
  const foodCount = eats.length + legends.length + (dest.local_stays?.length ?? 0);
  const reviewsCount = (dest.traveler_notes?.length ?? 0) + (dest.reviews?.length ?? 0);

  const tiles = [
    has.monthly && {
      id: "monthly",
      icon: "🗓",
      label: t("monthly"),
      count: t("toc.monthlyCount"),
      teaser: bestMonth
        ? t("toc.monthlyPeak", { month: MONTH_SHORT[bestMonth.month], score: bestMonth.score })
        : t("toc.monthlyFallback"),
      accent: "text-blue-400 border-blue-500/30 hover:bg-blue-500/10",
    },
    has.kids && kf && {
      id: "kids",
      icon: "👨‍👩‍👧",
      label: t("kids"),
      count: `${kf.rating}/5`,
      teaser: kf.suitable ? t("toc.kidsWelcome") : t("toc.kidsNotSuitable"),
      accent: kf.suitable
        ? "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
        : "text-red-400 border-red-500/30 hover:bg-red-500/10",
    },
    has.safety && {
      id: "safety",
      icon: "🛡",
      label: t("safety"),
      count: cc?.safety_rating ? `${cc.safety_rating}/5` : t("toc.safetyRead"),
      teaser: dest.solo_female_score != null
        ? t("toc.safetySolo", { score: dest.solo_female_score })
        : t("toc.safetyInfra"),
      accent: "text-amber-400 border-amber-500/30 hover:bg-amber-500/10",
    },
    has.places && {
      id: "places",
      icon: "📍",
      label: t("places"),
      count: `${placesCount}`,
      teaser: subs.length > 0
        ? t("toc.placesWithin", {
            name: dest.name,
            list: subs.slice(0, 3).map((s: any) => s.name).join(", ") + (subs.length > 3 ? "…" : ""),
          })
        : gems.length > 0
          ? t("toc.placesGems")
          : t("toc.placesPois"),
      accent: "text-violet-400 border-violet-500/30 hover:bg-violet-500/10",
    },
    has.food && {
      id: "food",
      icon: "🍽",
      label: t("foodAndPeople"),
      count: `${foodCount}`,
      teaser: eats.length > 0
        ? t("toc.foodCounts", { eats: eats.length, legends: legends.length })
        : legends.length > 0
          ? t("toc.foodLegends", { count: legends.length })
          : t("toc.foodStays"),
      accent: "text-orange-400 border-orange-500/30 hover:bg-orange-500/10",
    },
    has.reviews && {
      id: "reviews",
      icon: "⭐",
      label: t("reviews"),
      count: `${reviewsCount}`,
      teaser: t("toc.reviewsTeaser"),
      accent: "text-pink-400 border-pink-500/30 hover:bg-pink-500/10",
    },
  ].filter(Boolean) as Array<{ id: string; icon: string; label: string; count: string; teaser: string; accent: string }>;

  if (tiles.length === 0) return null;

  const onJump = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section aria-label={t("inThisGuide")} className="mb-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {t("inThisGuide")}
        </h2>
        <span className="text-xs text-muted-foreground/60">{t("tapToJump")}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => onJump(tile.id)}
            className={`group text-left rounded-xl border bg-card p-4 transition-all hover:scale-[1.02] ${tile.accent}`}
            aria-label={`Jump to ${tile.label} section — ${tile.count} ${tile.teaser}`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl leading-none" aria-hidden="true">{tile.icon}</span>
              <span className="text-xs font-mono font-semibold text-muted-foreground/70 group-hover:text-foreground transition-colors">
                {tile.count}
              </span>
            </div>
            <div className="font-semibold text-sm text-foreground mb-1">{tile.label}</div>
            <div className="text-xs text-muted-foreground leading-snug line-clamp-2">
              {tile.teaser}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

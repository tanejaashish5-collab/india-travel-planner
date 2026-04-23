import { cn } from "@/lib/utils";

/**
 * Per-section freshness stamp. Reads from the optional
 * `destinations.section_reviews` JSONB map (e.g. `{infrastructure: "2026-04-01"}`)
 * and falls back to the destination-wide `content_reviewed_at` so the UI
 * works today even before the per-section column is populated.
 */
export function SectionFreshness({
  sectionKey,
  sectionReviews,
  fallback,
  className,
}: {
  sectionKey: string;
  sectionReviews?: Record<string, string> | null;
  fallback?: string | null;
  className?: string;
}) {
  const iso = sectionReviews?.[sectionKey] ?? fallback ?? null;
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;

  const now = new Date();
  const diffMonths =
    (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  const tone =
    diffMonths <= 3
      ? "text-emerald-400/70 border-emerald-500/20"
      : diffMonths <= 9
        ? "text-yellow-400/70 border-yellow-500/20"
        : "text-orange-400/70 border-orange-500/25";
  const label = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  const perSection = !!sectionReviews?.[sectionKey];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border bg-background/40 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.12em]",
        tone,
        className,
      )}
      title={perSection ? `Section reviewed ${label}` : `Page reviewed ${label}`}
    >
      <span aria-hidden>◷</span>
      {perSection ? "" : "~"}
      {label}
    </span>
  );
}

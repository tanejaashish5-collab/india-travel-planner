import Link from "next/link";
import { currentMonthSlugIST, currentMonthLongIST } from "@itp/shared";
import { pagesForMonth, type HighImpressionPage } from "@/lib/high-impression-pages";

type Props = {
  locale: string;
  /** Override current-month detection — useful on month-specific hubs. */
  monthSlug?: HighImpressionPage["monthSlug"];
  /** Override default heading to fit the host page. */
  heading?: string;
};

/**
 * Internal-link rail to the dest×month pages with the highest GSC impressions
 * but page-2 rankings. Mounted on /explore + /where-to-go to funnel link
 * equity into the cohort that's one position bump away from page 1.
 *
 * Anchor text mirrors the GSC search query verbatim — that's the keyword the
 * page needs to rank for. Don't reword.
 */
export function TrendingMonthPages({ locale, monthSlug, heading }: Props) {
  const slug = monthSlug ?? currentMonthSlugIST();
  const pages = pagesForMonth(slug);
  if (pages.length === 0) return null;

  const monthName = monthSlug
    ? slug.charAt(0).toUpperCase() + slug.slice(1)
    : currentMonthLongIST();

  // Locale-aware copy. Hindi anchors are the English query verbatim
  // (GSC queries arrive in English regardless of locale; matching them is
  // what funnels link equity), but the framing copy is translated.
  const isHi = locale === "hi";
  const headingText = heading ?? (isHi
    ? `${monthName} में सबसे ज़्यादा खोजे जा रहे सवाल`
    : `What India is searching this ${monthName}`);
  const subheadingText = isHi
    ? "ये पन्ने Google पर पहले से दिख रहे हैं — हम इन्हें यहाँ ला रहे हैं ताकि आप भी देख सकें।"
    : "These dest×month pages get the most Google impressions right now. We're surfacing them here so you find what others are searching for.";

  return (
    <section
      aria-labelledby="trending-month-heading"
      className="my-12 rounded-2xl border border-border/50 bg-card/40 p-6 sm:p-8"
    >
      <h2
        id="trending-month-heading"
        className="text-xl sm:text-2xl font-semibold text-foreground"
      >
        {headingText}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {subheadingText}
      </p>
      <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((p) => (
          <li key={`${p.destId}-${p.monthSlug}`}>
            <Link
              href={p.hubOnly ? `/${locale}/destination/${p.destId}` : `/${locale}/destination/${p.destId}/${p.monthSlug}`}
              prefetch={false}
              title={p.query}
              className="group flex items-baseline justify-between gap-3 rounded-lg border border-transparent px-3 py-2 text-sm hover:border-border/60 hover:bg-card"
            >
              <span className="text-foreground group-hover:underline underline-offset-2">
                {p.anchor}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {p.impressions.toLocaleString()}
                <span className="ml-1 hidden sm:inline">impr/28d</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

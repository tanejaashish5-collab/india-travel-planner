import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { getTranslations } from "next-intl/server";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  localeAlternates,
  breadcrumbSchema,
  faqPageSchema,
  ORG_ID,
  WEBSITE_ID,
} from "@/lib/seo-utils";
import {
  type MicroItineraries,
  type ItineraryBlock,
  type ItineraryDayPlan,
  hasItineraryPage,
  availableDurations,
  durationPhrase,
} from "@/lib/itinerary-page";
import { getCachedItinerarySlugs } from "@/lib/cached-data";
import { isCinematicDestination } from "@/lib/cinematic-destinations";
import { destinationImage } from "@/lib/image-url";
import { MONTH_NAMES_EN, MONTH_NAMES_HI } from "@/lib/trip-cost";
import { ALL_MONTH_SLUGS } from "@/lib/seo-maps";
import { localizeRow, currentMonthIST, type Locale, type Translations } from "@itp/shared";

export const revalidate = 604800; // 7d — plans shift on backfill, not daily; /api/admin/revalidate covers edits.
export const dynamicParams = true;

const BASE = "https://www.nakshiq.com";
const LOCALES = ["en", "hi"] as const;

// Pre-render every page that passes the min-content gate (both locales).
// The slug list is the same 24h-cached allowlist the sitemap emits — one
// paged id+micro_itineraries read, NOT a per-destination query — so the
// sitemap, the build and the page's own notFound() can never disagree.
export async function generateStaticParams() {
  const slugs = await getCachedItinerarySlugs();
  return slugs.flatMap((slug) => LOCALES.map((locale) => ({ locale, slug })));
}

function getSupabase() {
  // Whitespace-strip mirrors lib/cached-data.ts — local .env.local values can
  // carry a literal "\n" (build-time "Invalid API key"); no-op on Vercel.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\s/g, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s/g, "");
  if (!url || !key) return null;
  return createClient(url, key);
}

type PoiRow = {
  id: string;
  name: string;
  type: string | null;
  time_needed: string | null;
  translations?: Translations<{ name?: string }> | null;
};
type EateryRow = {
  id: string;
  name: string;
  area: string | null;
  signature_dish: string | null;
  translations?: Translations<{ signature_dish?: string }> | null;
};
type StayRow = {
  slot: number | null;
  name: string;
  property_type: string | null;
  price_band: string | null;
};

type DestRow = {
  id: string;
  name: string;
  tagline: string | null;
  best_months: unknown;
  micro_itineraries: MicroItineraries | null;
  state: { name?: string }[] | { name?: string } | null;
  translations?: { hi?: { name?: string } } | null;
  points_of_interest: PoiRow[] | null;
  local_eateries: EateryRow[] | null;
  destination_stay_picks: StayRow[] | null;
  destination_costs: { destination_id: string }[] | null;
};

// React-cache()d so generateMetadata + the page share one query per render.
// Single embedded select — sidecars ride along instead of 4 extra round trips
// (this route pre-renders ~792 pages at build, so per-page query count matters).
const getItineraryData = cache(async (slug: string): Promise<DestRow | null> => {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("destinations")
    .select(
      `
      id, name, tagline, translations, micro_itineraries, best_months,
      state:states(name),
      points_of_interest(id, name, type, time_needed, translations),
      local_eateries(id, name, area, signature_dish, translations),
      destination_stay_picks(slot, name, property_type, price_band, translations),
      destination_costs(destination_id)
    `,
    )
    .eq("id", slug)
    .eq("local_eateries.is_legendary", true)
    .eq("local_eateries.is_active", true)
    .eq("destination_stay_picks.published", true)
    .order("type", { referencedTable: "points_of_interest" })
    .limit(5, { referencedTable: "points_of_interest" })
    .limit(3, { referencedTable: "local_eateries" })
    .limit(3, { referencedTable: "destination_stay_picks" })
    .limit(1, { referencedTable: "destination_costs" })
    .maybeSingle();

  return (data as unknown as DestRow) ?? null;
});

function stateNameOf(dest: DestRow): string {
  return (Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name) ?? "";
}

function localizedName(dest: DestRow, locale: string): string {
  if (locale === "hi") return dest.translations?.hi?.name || dest.name;
  return dest.name;
}

/** best_months int[] (1-12) → up to `take` month numbers; defensive on shape. */
function bestMonthNumbers(raw: unknown, take: number): number[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((m): m is number => typeof m === "number" && m >= 1 && m <= 12)
    .slice(0, take);
}

function dayLabel(day: ItineraryDayPlan, locale: string): string {
  const base = locale === "hi" ? `दिन ${day.day}` : `Day ${day.day}`;
  return day.headline ? `${base} — ${day.headline}` : base;
}

function blocksProse(blocks: ItineraryBlock[]): string {
  return blocks.map((b) => `${b.time}: ${b.text}`).join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const dest = await getItineraryData(slug);
  if (!dest || !hasItineraryPage(dest.micro_itineraries)) return {};

  const isHindi = locale === "hi";
  const name = localizedName(dest, locale);
  const mi = dest.micro_itineraries as MicroItineraries;
  const days = durationPhrase(availableDurations(mi), locale);

  // The <title> carries NO " | NakshIQ" — the locale layout's title.template
  // ("%s | NakshIQ") appends the brand. Hardcoding it here too double-stamped
  // it ("... | NakshIQ | NakshIQ"). OG/twitter titles aren't run through the
  // template, so ogTitle carries the brand inline (mirrors destination/[id]).
  const title = isHindi
    ? `${name} यात्रा योजना — ${days} (सत्यापित)`
    : `${name} itinerary — ${days} (verified)`;
  const ogTitle = `${title} | NakshIQ`;

  const description = isHindi
    ? `${name} में ${days} में क्या करें — सुबह से शाम तक की समय-बँधी योजनाएँ, NakshIQ की सत्यापित गाइड से। साथ में कहाँ खाएँ, कहाँ ठहरें${mi.one_day?.bad_weather_plan ? " और मौसम बिगड़ने का प्लान" : ""}।`
    : `What to do in ${name} with ${days} — time-blocked plans from NakshIQ's verified guide, with where to eat and stay${mi.one_day?.bad_weather_plan ? " and a bad-weather fallback" : ""}. No filler.`;

  // Destination-level OG image — same resolution as the destination hub:
  // cinematic dests get the composed card route, the rest the raw R2 hero.
  const imageUrl = isCinematicDestination(slug)
    ? `${BASE}/api/og/destination/${slug}?locale=${locale}`
    : destinationImage(slug);
  const imageAlt = isHindi ? `${name} यात्रा योजना` : `${name} itinerary`;

  return {
    title,
    description: description.slice(0, 200),
    ...localeAlternates(locale, `/itinerary/${slug}`),
    openGraph: {
      title: ogTitle,
      description,
      type: "article",
      url: `${BASE}/${locale}/itinerary/${slug}`,
      siteName: "NakshIQ",
      locale: isHindi ? "hi_IN" : "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const dest = await getItineraryData(slug);
  // Min-content gate — terse plans stay inside the destination hub only.
  if (!dest || !hasItineraryPage(dest.micro_itineraries)) notFound();

  const t = await getTranslations({ locale, namespace: "itinerary" });
  const isHindi = locale === "hi";
  const name = localizedName(dest, locale);
  const stateName = stateNameOf(dest);
  const mi = dest.micro_itineraries as MicroItineraries;
  const oneDay = mi.one_day!;
  const threeDays = mi.three_days ?? [];
  const fiveDays = mi.five_days ?? [];
  const durations = availableDurations(mi);
  const days = durationPhrase(durations, locale);
  const monthNames = isHindi ? MONTH_NAMES_HI : MONTH_NAMES_EN;

  // Localize sidecar rows (Hindi overlay where present, English fallback).
  const pois = (dest.points_of_interest ?? []).map((p) =>
    localizeRow(p as PoiRow & { translations?: never }, locale as Locale, ["name"]),
  );
  const eateries = (dest.local_eateries ?? []).map((e) =>
    localizeRow(e as EateryRow & { translations?: never }, locale as Locale, ["signature_dish"]),
  );
  const stays = (dest.destination_stay_picks ?? [])
    .slice()
    .sort((a, b) => (a.slot ?? 9) - (b.slot ?? 9));
  const hasCostPage = (dest.destination_costs ?? []).length > 0;

  // Month links — the destination's best months (verified column), capped at 3,
  // falling back to the current month so the row never goes empty.
  const monthNums = bestMonthNumbers(dest.best_months, 3);
  const linkMonths = monthNums.length > 0 ? monthNums : [currentMonthIST()];

  const pageUrl = `${BASE}/${locale}/itinerary/${slug}`;
  const oneDayTimes = oneDay.blocks.map((b) => b.time).join(", ");

  // FAQ — every answer is assembled from the plan JSON itself (headlines,
  // block counts, the bad-weather text verbatim). Zero new facts.
  const faq: { question: string; answer: string }[] = [];
  const planSummary =
    fiveDays.length > 0
      ? fiveDays.map((d) => dayLabel(d, locale)).join(" · ")
      : threeDays.length > 0
        ? threeDays.map((d) => dayLabel(d, locale)).join(" · ")
        : oneDayTimes;
  faq.push(
    isHindi
      ? {
          question: `${name} के लिए कितने दिन चाहिए?`,
          answer: `NakshIQ के पास ${name} की ${days} की दिन-प्रतिदिन योजनाएँ हैं। सबसे लंबी योजना इस तरह चलती है — ${planSummary}।`,
        }
      : {
          question: `How many days do you need in ${name}?`,
          answer: `NakshIQ keeps day-by-day plans for ${days} in ${name}. The longest plan runs: ${planSummary}.`,
        },
  );
  faq.push(
    isHindi
      ? {
          question: `क्या ${name} एक दिन में देखा जा सकता है?`,
          answer: `एक दिन की योजना है${oneDay.title ? ` — "${oneDay.title}"` : ""}, ${oneDay.blocks.length} समय-खंडों में (${oneDayTimes})। शुरुआत: ${oneDay.blocks[0].text}`,
        }
      : {
          question: `Can you see ${name} in one day?`,
          answer: `There is a one-day plan${oneDay.title ? ` — "${oneDay.title}"` : ""}, in ${oneDay.blocks.length} time blocks (${oneDayTimes}). It opens with: ${oneDay.blocks[0].text}`,
        },
  );
  if (threeDays.length > 0) {
    const cover = threeDays
      .map((d) => `${isHindi ? "दिन" : "Day"} ${d.day} — ${d.headline || d.blocks[0]?.text || ""}`)
      .join("; ");
    faq.push(
      isHindi
        ? { question: `3 दिन की ${name} योजना में क्या-क्या है?`, answer: `${cover}।` }
        : { question: `What does a 3-day ${name} itinerary cover?`, answer: `${cover}.` },
    );
  }
  if (oneDay.bad_weather_plan) {
    faq.push(
      isHindi
        ? { question: `${name} में मौसम बिगड़ जाए तो?`, answer: oneDay.bad_weather_plan }
        : { question: `What if the weather turns in ${name}?`, answer: oneDay.bad_weather_plan },
    );
  }

  // JSON-LD — BreadcrumbList + FAQPage + TouristTrip. The TouristTrip
  // itinerary is the longest plan's day list, verbatim from the row.
  const breadcrumbLd = breadcrumbSchema(locale, [
    { name, path: `/destination/${slug}` },
    { name: isHindi ? "यात्रा योजना" : "Itinerary", path: `/itinerary/${slug}` },
  ]);
  const faqLd = faqPageSchema({ locale, path: `/itinerary/${slug}`, qa: faq });
  const ldDays = fiveDays.length > 0 ? fiveDays : threeDays;
  const touristTripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${pageUrl}#trip`,
    name: isHindi ? `${name} यात्रा योजना` : `${name} itinerary`,
    description: isHindi
      ? `${name} की ${days} की दिन-प्रतिदिन योजनाएँ।`
      : `Day-by-day plans for ${days} in ${name}.`,
    url: pageUrl,
    inLanguage: isHindi ? "hi-IN" : "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    provider: { "@id": ORG_ID },
    about: {
      "@type": "TouristDestination",
      name,
      url: `${BASE}/${locale}/destination/${slug}`,
    },
    itinerary:
      ldDays.length > 0
        ? {
            "@type": "ItemList",
            numberOfItems: ldDays.length,
            itemListElement: ldDays.map((d, i) => ({
              "@type": "ListItem",
              position: d.day ?? i + 1,
              name: dayLabel(d, locale),
              description: blocksProse(d.blocks ?? []),
            })),
          }
        : {
            "@type": "TouristDestination",
            name,
            url: `${BASE}/${locale}/destination/${slug}`,
          },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripLd) }} />
      <Nav />

      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">{t("kicker")}</p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          {t("title", { name, days })}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isHindi
            ? `${stateName ? stateName + " का " : ""}${name} — सुबह से शाम तक की समय-बँधी योजनाएँ, उसी सत्यापित डेटा से जो पूरी गाइड में है। जो खंड यहाँ नहीं है, वह डेटा में नहीं है — अंदाज़े से कुछ नहीं जोड़ा गया।`
            : `${name}${stateName ? ", " + stateName : ""} — time-blocked plans from the same verified data as the full guide. If a section isn't here, it isn't in the data — nothing is padded in.`}
        </p>

        {/* One day */}
        <section className="mt-10">
          <h2 className="font-serif text-2xl font-bold">{t("oneDayHeading")}</h2>
          {oneDay.title && <p className="mt-1 text-sm font-semibold text-muted-foreground">{oneDay.title}</p>}
          <div className="mt-4 divide-y divide-border rounded-xl border border-border px-4">
            {oneDay.blocks.map((b, i) => (
              <TimeRow key={i} block={b} />
            ))}
          </div>
          {oneDay.bad_weather_plan && (
            <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-yellow-600 dark:text-yellow-400">
                {t("badWeather")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{oneDay.bad_weather_plan}</p>
            </div>
          )}
        </section>

        {/* Three days */}
        {threeDays.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{t("threeDayHeading")}</h2>
            <div className="mt-4 grid gap-3">
              {threeDays.map((d) => (
                <DayCard key={d.day} day={d} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* Five days */}
        {fiveDays.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{t("fiveDayHeading")}</h2>
            <div className="mt-4 grid gap-3">
              {fiveDays.map((d) => (
                <DayCard key={d.day} day={d} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* Top POIs — honest scarcity: section disappears when none exist. */}
        {pois.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{t("poisHeading")}</h2>
            <ul className="mt-4 divide-y divide-border">
              {pois.map((p) => (
                <li key={p.id} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-medium">{p.name}</span>
                  {p.time_needed && (
                    <span className="shrink-0 text-sm text-muted-foreground">{p.time_needed}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Legendary eateries */}
        {eateries.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{t("eatHeading")}</h2>
            <ul className="mt-4 divide-y divide-border">
              {eateries.map((e) => (
                <li key={e.id} className="py-3">
                  <span className="font-medium">{e.name}</span>
                  {e.area && <span className="text-sm text-muted-foreground"> · {e.area}</span>}
                  {e.signature_dish && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{e.signature_dish}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Stay picks */}
        {stays.length > 0 && (
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-bold">{t("stayHeading")}</h2>
            <ul className="mt-4 divide-y divide-border">
              {stays.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="font-medium">{s.name}</span>
                    {s.property_type && (
                      <span className="text-sm text-muted-foreground"> · {s.property_type}</span>
                    )}
                  </span>
                  {s.price_band && (
                    <span className="shrink-0 text-sm text-muted-foreground">{s.price_band}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ — visible copy mirrors the FAQ JSON-LD. */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold">{t("faqHeading")}</h2>
          <dl className="mt-4 divide-y divide-border">
            {faq.map((q) => (
              <div key={q.question} className="py-4">
                <dt className="font-semibold">{q.question}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{q.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Internal links — full guide, cost (only when the cost page exists),
            best-month pages. */}
        <nav className="mt-12 flex flex-wrap gap-2.5 border-t border-border pt-6 text-sm">
          <RelatedLink href={`/${locale}/destination/${slug}`}>{t("fullGuide", { name })}</RelatedLink>
          {hasCostPage && (
            <RelatedLink href={`/${locale}/cost/${slug}`}>{t("budgetTrip")}</RelatedLink>
          )}
          {linkMonths.map((m) => (
            <RelatedLink key={m} href={`/${locale}/destination/${slug}/${ALL_MONTH_SLUGS[m - 1]}`}>
              {t("monthPage", { name, month: monthNames[m - 1] })}
            </RelatedLink>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}

function TimeRow({ block }: { block: ItineraryBlock }) {
  return (
    <div className="flex gap-4 py-3">
      <span className="w-24 shrink-0 pt-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {block.time}
      </span>
      <p className="flex-1 text-sm leading-relaxed">{block.text}</p>
    </div>
  );
}

function DayCard({ day, locale }: { day: ItineraryDayPlan; locale: string }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-semibold">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">
          {locale === "hi" ? `दिन ${day.day}` : `Day ${day.day}`}
        </span>
        {day.headline && <span className="ml-2">{day.headline}</span>}
      </p>
      <div className="mt-1 divide-y divide-border/60">
        {(day.blocks ?? []).map((b, i) => (
          <TimeRow key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function RelatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-border px-4 py-2 font-medium transition-colors hover:border-foreground/40 hover:bg-muted/40"
    >
      {children} →
    </Link>
  );
}

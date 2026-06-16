import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CostCalculator } from "@/components/cost-calculator";
import { BookingHandoff } from "@/components/booking-handoff";
import { localeAlternates, breadcrumbSchema, faqPageSchema, articleSchema } from "@/lib/seo-utils";
import { isCinematicDestination } from "@/lib/cinematic-destinations";
import { destinationImage } from "@/lib/image-url";
import {
  type CostRow,
  estimateAllTiers,
  inr,
  MONTH_NAMES_EN,
  MONTH_NAMES_HI,
} from "@/lib/trip-cost";
import { currentMonthIST, currentMonthSlugIST } from "@itp/shared";

export const revalidate = 604800; // 7d — cost bands shift slowly; the default-month SSR refreshes within the window. /api/admin/revalidate covers edits.
export const dynamicParams = true;

const BASE = "https://www.nakshiq.com";

export async function generateStaticParams() {
  return [];
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

type DestRow = {
  id: string;
  name: string;
  tagline: string | null;
  state: { name?: string }[] | { name?: string } | null;
  translations?: { hi?: { name?: string } } | null;
};

async function getDestCost(slug: string): Promise<{ dest: DestRow; rows: CostRow[] } | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const [{ data: dest }, { data: costRows }] = await Promise.all([
    supabase
      .from("destinations")
      .select("id, name, tagline, translations, state:states(name)")
      .eq("id", slug)
      .maybeSingle(),
    supabase
      .from("destination_costs")
      .select("category, season, months, typical_inr, range_low_inr, range_high_inr, unit")
      .eq("destination_id", slug),
  ]);

  if (!dest || !costRows || costRows.length === 0) return null;
  return { dest: dest as DestRow, rows: costRows as CostRow[] };
}

function stateNameOf(dest: DestRow): string {
  return (Array.isArray(dest.state) ? dest.state[0]?.name : dest.state?.name) ?? "";
}

function localizedName(dest: DestRow, locale: string): string {
  if (locale === "hi") return dest.translations?.hi?.name || dest.name;
  return dest.name;
}

function seasonMonthLabel(rows: CostRow[], season: string, names: readonly string[]): string {
  const r = rows.find((x) => x.season === season);
  if (!r || !Array.isArray(r.months)) return "";
  return [...r.months]
    .sort((a, b) => a - b)
    .map((m) => names[m - 1])
    .join(", ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = await getDestCost(slug);
  if (!data) return {};

  const isHindi = locale === "hi";
  const name = localizedName(data.dest, locale);
  const month = currentMonthIST();
  const t = estimateAllTiers(data.rows, { days: 4, people: 2, month });

  // <title> omits " | NakshIQ" — the locale layout's title.template appends
  // it. ogTitle carries the brand inline (the template skips OG/twitter).
  const title = isHindi
    ? `${name} यात्रा खर्च (2026): 2–10 दिन का बजट`
    : `${name} trip cost (2026): budget for 2–10 days`;
  const ogTitle = `${title} | NakshIQ`;
  // Destination-level OG image (slug = destination id) — same resolver as the
  // destination hub: composed card for cinematic dests, R2 hero otherwise.
  const ogImage = isCinematicDestination(slug)
    ? `${BASE}/api/og/destination/${slug}?locale=${locale}`
    : destinationImage(slug);
  const ogAlt = isHindi ? `${name} यात्रा खर्च` : `${name} trip cost`;

  const description = isHindi
    ? `${name} की यात्रा का असली खर्च — दो लोगों के 4 दिन के लिए मध्यम बजट लगभग ${inr(t.mid.total)} (≈ ${inr(t.mid.perDay)}/दिन)। बैकपैकर ${inr(t.budget.total)} से लग्ज़री ${inr(t.luxury.total)} तक। मौसम के अनुसार, स्रोत-सहित।`
    : `What a trip to ${name} actually costs — a mid-range 4 days for two runs about ${inr(t.mid.total)} (≈ ${inr(t.mid.perDay)}/day). Backpacker ${inr(t.budget.total)} to luxury ${inr(t.luxury.total)}. Season-adjusted, source-cited.`;

  return {
    title,
    description: description.slice(0, 200),
    ...localeAlternates(locale, `/cost/${slug}`),
    openGraph: {
      title: ogTitle,
      description,
      type: "article",
      url: `${BASE}/${locale}/cost/${slug}`,
      siteName: "NakshIQ",
      locale: isHindi ? "hi_IN" : "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImage] },
  };
}

export default async function CostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const data = await getDestCost(slug);
  if (!data) notFound();

  const isHindi = locale === "hi";
  const name = localizedName(data.dest, locale);
  const stateName = stateNameOf(data.dest);
  const names = isHindi ? MONTH_NAMES_HI : MONTH_NAMES_EN;

  const month = currentMonthIST();
  const monthSlug = currentMonthSlugIST();
  const monthLong = names[month - 1]; // locale-correct (names = en or hi array)

  const est = estimateAllTiers(data.rows, { days: 4, people: 2, month });
  const est5 = estimateAllTiers(data.rows, { days: 5, people: 2, month });

  const lowMonths = seasonMonthLabel(data.rows, "low", names);
  const peakMonths = seasonMonthLabel(data.rows, "peak", names);

  const pageUrl = `${BASE}/${locale}/cost/${slug}`;

  // FAQ — built from the live numbers so the rich-snippet answer matches the page.
  const faq = isHindi
    ? [
        {
          question: `${name} की यात्रा में कितना खर्च आता है?`,
          answer: `${monthLong} में दो लोगों के 4 दिन के लिए मध्यम-बजट यात्रा लगभग ${inr(est.mid.total)} (करीब ${inr(est.mid.perDay)}/दिन) पड़ती है। बैकपैकर ${inr(est.budget.total)} में और लग्ज़री ${inr(est.luxury.total)} तक। ये NakshIQ के मौसम-अनुसार, स्रोत-सहित खर्च-बैंड हैं।`,
        },
        {
          question: `${name} में 5 दिन का बजट क्या है?`,
          answer: `दो लोगों के लिए 5 दिन: बैकपैकर ${inr(est5.budget.total)}, मध्यम ${inr(est5.mid.total)}, लग्ज़री ${inr(est5.luxury.total)}। ऊपर कैलकुलेटर में दिन, यात्री और महीना बदलकर अपना अनुमान देखें।`,
        },
        lowMonths && {
          question: `${name} घूमने का सबसे सस्ता समय कौन सा है?`,
          answer: `सबसे कम दाम लो-सीज़न में — ${lowMonths}। इन महीनों में ठहरने और टैक्सी के दाम सबसे नीचे रहते हैं।`,
        },
        peakMonths && {
          question: `क्या पीक सीज़न में ${name} महंगा होता है?`,
          answer: `हाँ — ${peakMonths} पीक सीज़न है और दाम सबसे ऊपर रहते हैं। उसी ट्रिप का लो-सीज़न खर्च पीक से काफ़ी कम पड़ता है — कैलकुलेटर में महीना बदलकर अंतर देखें।`,
        },
      ].filter(Boolean) as { question: string; answer: string }[]
    : [
        {
          question: `How much does a trip to ${name} cost?`,
          answer: `A mid-range trip for two over 4 days in ${monthLong} works out to about ${inr(est.mid.total)} (roughly ${inr(est.mid.perDay)} a day). Backpackers can do it for ${inr(est.budget.total)}; a luxury stay runs to ${inr(est.luxury.total)}. These are NakshIQ's season-adjusted, source-cited cost bands.`,
        },
        {
          question: `What's the budget for 5 days in ${name}?`,
          answer: `For two people over 5 days: backpacker ${inr(est5.budget.total)}, mid-range ${inr(est5.mid.total)}, luxury ${inr(est5.luxury.total)}. Adjust days, travellers and month in the calculator above for your own estimate.`,
        },
        lowMonths && {
          question: `When is the cheapest time to visit ${name}?`,
          answer: `Prices are lowest in the low season — ${lowMonths}. Stays and taxis bottom out in these months.`,
        },
        peakMonths && {
          question: `Is ${name} expensive in peak season?`,
          answer: `Yes — ${peakMonths} is peak season and rates run highest. The same trip in the low season costs noticeably less; switch the month in the calculator to see the gap.`,
        },
      ].filter(Boolean) as { question: string; answer: string }[];

  const breadcrumbLd = breadcrumbSchema(locale, [
    { name: isHindi ? "यात्रा खर्च सूचकांक" : "Cost Index", path: "/cost-index" },
    { name, path: `/cost/${slug}` },
  ]);
  const faqLd = faqPageSchema({ locale, path: `/cost/${slug}`, qa: faq });
  const articleLd = articleSchema({
    locale,
    path: `/cost/${slug}`,
    headline: isHindi ? `${name} यात्रा खर्च 2026` : `${name} trip cost 2026`,
    description: isHindi
      ? `${name} की मौसम-अनुसार यात्रा-खर्च गणना — ठहरना, भोजन, परिवहन, परमिट।`
      : `Season-adjusted trip cost for ${name} — stay, food, transport, activities and permits.`,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Nav />

      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {isHindi ? "यात्रा खर्च · 2026" : "Trip cost · 2026"}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          {isHindi ? `${name} यात्रा का खर्च` : `What a trip to ${name} costs`}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isHindi
            ? `${stateName ? stateName + " का " : ""}${name} — ${monthLong} में दो लोगों के 4 दिन के लिए मध्यम-बजट लगभग ${inr(est.mid.total)} (करीब ${inr(est.mid.perDay)}/दिन)। बैकपैकर ${inr(est.budget.total)} से लग्ज़री ${inr(est.luxury.total)} तक। नीचे दिन, यात्री, महीना और शैली बदलकर अपना अनुमान निकालें — हर आँकड़ा मौसम के हिसाब से और स्रोत-सहित।`
            : `${name}${stateName ? ", " + stateName : ""} — a mid-range 4 days for two in ${monthLong} comes to about ${inr(est.mid.total)} (roughly ${inr(est.mid.perDay)} a day). Backpacker ${inr(est.budget.total)}, luxury ${inr(est.luxury.total)}. Set your days, travellers, month and style below — every figure is season-adjusted and source-cited, not a guess off a blog.`}
        </p>

        <div className="mt-8">
          <CostCalculator
            rows={data.rows}
            name={name}
            locale={locale}
            initialDays={4}
            initialPeople={2}
            initialTier="mid"
            initialMonth={month}
          />
        </div>

        {/* Affiliate handoff — same not-sponsored booking + experiences block as destination pages. */}
        <div className="mt-10">
          <BookingHandoff destinationName={name} stateName={stateName} destinationId={slug} />
        </div>

        {/* FAQ — visible copy mirrors the FAQ JSON-LD. */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold">
            {isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Common questions"}
          </h2>
          <dl className="mt-4 divide-y divide-border">
            {faq.map((q) => (
              <div key={q.question} className="py-4">
                <dt className="font-semibold">{q.question}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{q.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Internal links */}
        <nav className="mt-12 flex flex-wrap gap-2.5 border-t border-border pt-6 text-sm">
          <RelatedLink href={`/${locale}/destination/${slug}`}>
            {isHindi ? `${name} पूरी गाइड` : `${name} full guide`}
          </RelatedLink>
          <RelatedLink href={`/${locale}/destination/${slug}/${monthSlug}`}>
            {isHindi ? `${monthLong} में ${name}` : `${name} in ${monthLong}`}
          </RelatedLink>
          <RelatedLink href={`/${locale}/where-to-go/${monthSlug}`}>
            {isHindi ? `${monthLong} में कहाँ जाएँ` : `Where to go in ${monthLong}`}
          </RelatedLink>
          <RelatedLink href={`/${locale}/cost-index`}>
            {isHindi ? "पूरा यात्रा खर्च सूचकांक" : "Full India cost index"}
          </RelatedLink>
        </nav>
      </main>

      <Footer />
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

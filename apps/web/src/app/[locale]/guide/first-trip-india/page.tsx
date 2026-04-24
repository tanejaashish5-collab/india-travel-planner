import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  return {
    title: isHindi
      ? "भारत की पहली यात्रा — कहाँ जाएँ, कब, कैसे"
      : "First trip to India — where to go, when, and how",
    description: isHindi
      ? "भारत में पहली यात्रा की सरल योजना: ठंडे मौसम में उत्तर, गर्मी में पहाड़, मानसून में केरल। तीन 10–14 दिन के मार्ग, बजट, वीज़ा, और गलतियाँ।"
      : "A plain-English first-trip plan for India: winter months in the north, summer in the hills, monsoon in Kerala. Three 10-14 day routes, budget expectations, visa, and common first-timer mistakes.",
    ...localeAlternates(locale, "/guide/first-trip-india"),
  };
}

const BASE_URL = "https://www.nakshiq.com";

export default async function FirstTripIndiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const pageUrl = `${BASE_URL}/${locale}/guide/first-trip-india`;

  // Three canonical first-trip routes. Links map to existing /routes/[id] pages.
  const routes = [
    {
      id: "rajasthan-highlights-7d",
      name: "Rajasthan Highlights",
      days: 7,
      who: "first-timers who want the India most guidebooks describe — forts, palaces, heritage",
      why: "All four major cities (Jaipur, Jodhpur, Udaipur, Jaisalmer) are on one loop, heritage hotels are unique to here, and October-March weather is comfortable.",
      season: "October – March",
      skip: "April – September (daytime heat crosses 40°C routinely)",
    },
    {
      id: "kerala-classic-7d",
      name: "Kerala Backwaters + Hills",
      days: 7,
      who: "first-timers who want quiet, green, slow-paced India",
      why: "English is widely spoken, tourism infrastructure is the best in the country, and the combination of backwaters (Alleppey) + hills (Munnar) + beach (Varkala) in 7 days is unmatched.",
      season: "October – March",
      skip: "June – August (monsoon closes beaches and many trek routes)",
    },
    {
      id: "golden-triangle-classic",
      name: "Delhi – Agra – Jaipur (Golden Triangle)",
      days: 6,
      who: "first-timers focused on the Mughal + Rajput heritage spine — Taj Mahal, Red Fort, Amber Fort",
      why: "All three cities are connected by short train/road legs (under 4 hours each). Flight connectivity into Delhi is the densest in India. The three UNESCO sites in this circuit alone justify the trip.",
      season: "November – March",
      skip: "May – June (Delhi heat peaks, sightseeing collapses after 10am)",
    },
  ];

  // FAQPage schema — the 10 questions first-timers actually ask, machine-readable
  // so Perplexity / ChatGPT / AIO can extract answer fragments.
  const faqs = [
    {
      q: "When is the best time for a first trip to India?",
      a: "October to March is the safe default. Weather is comfortable across most of the country, monsoon is finished, and tourist infrastructure is running at full capacity. April and May are hot on the plains but fine in the Himalayan and Western Ghats hill stations. June-September is monsoon — beautiful in Kerala and the Western Ghats but challenging for long overland trips.",
    },
    {
      q: "How long should a first trip to India be?",
      a: "Seven to fourteen days is the honest answer. Anything under seven is too compressed — you lose a day at each end to flights and jet lag. Anything over fourteen on a first trip often tips into exhaustion. If you have three weeks, plan two separate regional trips with a rest gap rather than a single marathon.",
    },
    {
      q: "Do I need a visa for India?",
      a: "Yes. Most passport holders need an e-Tourist Visa (eTV) applied online at indianvisaonline.gov.in. It's valid for 30 days, 1 year, or 5 years depending on the fee paid. Processing is typically 3-4 business days. A few nationalities require a regular visa through the Indian consulate.",
    },
    {
      q: "Is India safe for first-time travelers?",
      a: "Generally yes, with the usual big-city precautions. Solo female travelers should read NakshIQ's month-by-month solo-female guide for state-level safety scoring. Avoid Kashmir and Manipur political flashpoints, check the Ladakh border permit requirements if heading there, and stay away from the Pakistan border around Jammu.",
    },
    {
      q: "What's a realistic budget for a first trip to India?",
      a: "Mid-range budget is roughly ₹4,000-8,000 per person per day (≈$50-100 USD) covering 3-star hotels, local transport, meals, and one paid activity. Budget travel runs ₹2,000-3,500/day. Luxury starts at ₹15,000/day. Flights and international transport are separate. The biggest variable cost is internal flights vs trains.",
    },
    {
      q: "Should I book domestic flights or take trains on a first trip?",
      a: "For first trips under two weeks, book flights for any leg over 6 hours of train travel. Indian trains are an experience worth doing once (Jaipur to Delhi, or a short Kerala coastal stretch) but 12-16 hour overnight trains on a first trip are usually a net negative. Book domestic flights 2-4 weeks ahead on IndiGo, Vistara, or Air India.",
    },
    {
      q: "Do I need a tour group or can I travel independently?",
      a: "Independent travel is entirely possible on a first trip if you're comfortable with moderate chaos. Hotels and car rentals with drivers are easy to arrange online. For specific regions (Ladakh, Northeast, Kashmir) a local operator makes sense because of permits and logistics. The NakshIQ route pages include operator recommendations where they matter.",
    },
    {
      q: "Can I drink the tap water in India?",
      a: "No. Use bottled water (check the seal) or a quality travel filter (SteriPen, LifeStraw, Grayl). Hotels above the 2-star tier usually provide sealed bottled water. Ice in restaurants is usually safe in mid-range and above; street-vendor ice is not. The single biggest first-trip preventable illness is from water, not food.",
    },
    {
      q: "Which region is best for a family first trip with kids?",
      a: "Kerala is the best first-trip family destination — smooth infrastructure, English widely spoken, short travel legs, and kid-friendly experiences (backwater cruises, spice plantations, elephant sanctuaries). Rajasthan works for families with kids 8+. Avoid Ladakh, Spiti, and high-altitude destinations for kids under 10 on a first trip.",
    },
    {
      q: "What's the single biggest first-trip mistake to avoid?",
      a: "Packing too many destinations into too few days. India rewards depth over breadth. Seven days in Kerala beats a seven-day 'Golden Triangle + Kerala + Goa' sprint every time. The second-biggest mistake is not adjusting the itinerary for season — Taj Mahal in May is a 45°C ordeal, Ladakh in January is closed roads and frozen water.",
    },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/${locale}/guide` },
      { "@type": "ListItem", position: 3, name: "First trip to India", item: pageUrl },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: "First trip to India — where to go, when, and how",
    description:
      "A plain-English first-trip plan for India: three 10-14 day routes, realistic budget, visa, and the ten questions first-timers actually ask.",
    inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
    isPartOf: { "@id": `${BASE_URL}#website` },
    publisher: { "@id": `${BASE_URL}#organization` },
    author: { "@id": `${BASE_URL}#organization` },
    mainEntityOfPage: pageUrl,
    url: pageUrl,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    isPartOf: { "@id": `${BASE_URL}#website` },
    about: { "@id": `${pageUrl}#article` },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#routes`,
    name: "Three first-trip India routes",
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: routes.map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "TouristTrip",
        name: r.name,
        description: `${r.days}-day route for ${r.who}. Best season: ${r.season}.`,
        url: `${BASE_URL}/${locale}/routes/${r.id}`,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-foreground">NakshIQ</Link>
          {" → "}
          <Link href={`/${locale}/guide`} className="hover:text-foreground">Guides</Link>
          {" → "}
          <span className="text-foreground">First trip to India</span>
        </div>

        <h1 className="text-4xl font-semibold mb-3">First trip to India — where to go, when, and how</h1>

        {/* BLUF answer capsule — 40-60 words, extractable by AI answer engines */}
        <div className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <p className="text-sm font-medium text-foreground/90 leading-relaxed">
            For a first trip to India, plan seven to fourteen days between October and March. Pick one region —
            Rajasthan (heritage), Kerala (quiet and green), or the Golden Triangle (Delhi–Agra–Jaipur). Skip the
            multi-region marathons; they're the single biggest first-trip regret. Apply for the e-Tourist Visa online
            3-4 weeks before travel. Budget ₹4,000-8,000 per person per day for mid-range.
          </p>
        </div>

        {/* Three suggested routes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Three first-trip routes we'd actually send you on</h2>
          <div className="space-y-4">
            {routes.map((r) => (
              <Link
                key={r.id}
                href={`/${locale}/routes/${r.id}`}
                className="block rounded-2xl border border-border bg-card/40 p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{r.name}</h3>
                  <span className="text-xs font-mono tracking-[0.08em] uppercase text-muted-foreground shrink-0">
                    {r.days} days
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  <strong className="text-foreground">For:</strong> {r.who}.
                </p>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  <strong className="text-foreground">Why this route works:</strong> {r.why}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground/80">
                  <span>
                    <strong className="text-foreground/90">Best:</strong> {r.season}
                  </span>
                  <span>
                    <strong className="text-foreground/90">Skip:</strong> {r.skip}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ — rendered visibly + FAQPage JSON-LD above for AI extraction */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Ten questions first-timers actually ask</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-border/50 pb-6 last:border-0">
                <h3 className="text-lg font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Next-step CTAs */}
        <section className="mb-4 rounded-2xl border border-border bg-card/40 p-6">
          <h2 className="text-xl font-semibold mb-4">Next steps</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/explore`}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Browse all 488 destinations
            </Link>
            <Link
              href={`/${locale}/plan`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              AI trip planner
            </Link>
            <Link
              href={`/${locale}/guide/permits`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Permits &amp; paperwork
            </Link>
            <Link
              href={`/${locale}/for-solo-female`}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Solo female safety index
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

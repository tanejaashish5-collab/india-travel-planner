import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-utils";
import { CinematicGuide } from "@/components/cinematic-guide";
import { CinematicCard } from "@/components/cinematic-card";
import { CinematicButton } from "@/components/cinematic-button";
import {
  guideProse,
  GuideFaqList,
} from "@/components/cinematic-guide-helpers";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
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

const faqs = [
  {
    question: "When is the best time for a first trip to India?",
    answer:
      "October to March is the safe default. Weather is comfortable across most of the country, monsoon is finished, and tourist infrastructure is running at full capacity. April and May are hot on the plains but fine in the Himalayan and Western Ghats hill stations. June-September is monsoon — beautiful in Kerala and the Western Ghats but challenging for long overland trips.",
  },
  {
    question: "How long should a first trip to India be?",
    answer:
      "Seven to fourteen days is the honest answer. Anything under seven is too compressed — you lose a day at each end to flights and jet lag. Anything over fourteen on a first trip often tips into exhaustion. If you have three weeks, plan two separate regional trips with a rest gap rather than a single marathon.",
  },
  {
    question: "Do I need a visa for India?",
    answer:
      "Yes. Most passport holders need an e-Tourist Visa (eTV) applied online at indianvisaonline.gov.in. It's valid for 30 days, 1 year, or 5 years depending on the fee paid. Processing is typically 3-4 business days. A few nationalities require a regular visa through the Indian consulate.",
  },
  {
    question: "Is India safe for first-time travelers?",
    answer:
      "Generally yes, with the usual big-city precautions. Solo female travelers should read NakshIQ's month-by-month solo-female guide for state-level safety scoring. Avoid Kashmir and Manipur political flashpoints, check the Ladakh border permit requirements if heading there, and stay away from the Pakistan border around Jammu.",
  },
  {
    question: "What's a realistic budget for a first trip to India?",
    answer:
      "Mid-range budget is roughly ₹4,000-8,000 per person per day (≈$50-100 USD) covering 3-star hotels, local transport, meals, and one paid activity. Budget travel runs ₹2,000-3,500/day. Luxury starts at ₹15,000/day. Flights and international transport are separate. The biggest variable cost is internal flights vs trains.",
  },
  {
    question: "Should I book domestic flights or take trains on a first trip?",
    answer:
      "For first trips under two weeks, book flights for any leg over 6 hours of train travel. Indian trains are an experience worth doing once (Jaipur to Delhi, or a short Kerala coastal stretch) but 12-16 hour overnight trains on a first trip are usually a net negative. Book domestic flights 2-4 weeks ahead on IndiGo, Vistara, or Air India.",
  },
  {
    question: "Do I need a tour group or can I travel independently?",
    answer:
      "Independent travel is entirely possible on a first trip if you're comfortable with moderate chaos. Hotels and car rentals with drivers are easy to arrange online. For specific regions (Ladakh, Northeast, Kashmir) a local operator makes sense because of permits and logistics. The NakshIQ route pages include operator recommendations where they matter.",
  },
  {
    question: "Can I drink the tap water in India?",
    answer:
      "No. Use bottled water (check the seal) or a quality travel filter (SteriPen, LifeStraw, Grayl). Hotels above the 2-star tier usually provide sealed bottled water. Ice in restaurants is usually safe in mid-range and above; street-vendor ice is not. The single biggest first-trip preventable illness is from water, not food.",
  },
  {
    question: "Which region is best for a family first trip with kids?",
    answer:
      "Kerala is the best first-trip family destination — smooth infrastructure, English widely spoken, short travel legs, and kid-friendly experiences (backwater cruises, spice plantations, elephant sanctuaries). Rajasthan works for families with kids 8+. Avoid Ladakh, Spiti, and high-altitude destinations for kids under 10 on a first trip.",
  },
  {
    question: "What's the single biggest first-trip mistake to avoid?",
    answer:
      "Packing too many destinations into too few days. India rewards depth over breadth. Seven days in Kerala beats a seven-day 'Golden Triangle + Kerala + Goa' sprint every time. The second-biggest mistake is not adjusting the itinerary for season — Taj Mahal in May is a 45°C ordeal, Ladakh in January is closed roads and frozen water.",
  },
];

export default async function FirstTripIndiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const pageUrl = `${BASE_URL}/${locale}/guide/first-trip-india`;

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
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
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

  const sections = [
    {
      id: "bluf",
      title: "If you only read one paragraph",
      body: (
        <p style={{ ...guideProse, color: "var(--bone)", fontSize: 18, lineHeight: 1.7 }}>
          Plan seven to fourteen days between October and March. Pick one region
          — Rajasthan (heritage), Kerala (quiet and green), or the Golden
          Triangle (Delhi–Agra–Jaipur). Skip the multi-region marathons; they
          are the single biggest first-trip regret. Apply for the e-Tourist
          Visa online 3–4 weeks before travel. Budget ₹4,000–8,000 per person
          per day for mid-range.
        </p>
      ),
    },
    {
      id: "routes",
      title: "Three first-trip routes we'd actually send you on",
      body: (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
        >
          {routes.map((r) => (
            <CinematicCard
              key={r.id}
              variant="text-only"
              href={`/${locale}/routes/${r.id}`}
              kicker={`${r.days}-day route · ${r.season}`}
              title={`${r.name}.`}
              dek={
                <>
                  <strong style={{ color: "var(--bone)" }}>For:</strong> {r.who}.{" "}
                  <strong style={{ color: "var(--bone)" }}>Why this works:</strong>{" "}
                  {r.why}
                </>
              }
              meta={`Skip ${r.skip}`}
            />
          ))}
        </div>
      ),
    },
    {
      id: "faqs",
      title: "Ten questions first-timers actually ask",
      body: <GuideFaqList faqs={faqs} />,
    },
    {
      id: "next-steps",
      title: "Next steps",
      body: (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <CinematicButton variant="primary" href={`/${locale}/explore`}>
            Browse all 505 destinations
          </CinematicButton>
          <CinematicButton variant="secondary" href={`/${locale}/plan`}>
            AI trip planner
          </CinematicButton>
          <CinematicButton variant="secondary" href={`/${locale}/guide/permits`}>
            Permits & paperwork
          </CinematicButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CinematicGuide
        kicker="GUIDES · FIRST TRIP"
        title="First trip to India — where to go, when, and how."
        dek="A plain-English first-trip plan: which region to pick, when to go, how long, what to budget, and the ten questions every first-timer asks."
        sections={sections}
        nextGuide={{
          href: `/${locale}/guide/visa`,
          title: "India tourist visa — what you actually need.",
        }}
      />
    </>
  );
}

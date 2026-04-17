import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WithKidsContent } from "@/components/with-kids-content";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;

  const supabase = getSupabase();
  if (!supabase) return {};

  const { data: dest } = await supabase
    .from("destinations")
    .select("name, tagline, state:states(name), kids_friendly(*)")
    .eq("id", id)
    .single();

  if (!dest) return {};

  const name = dest.name;
  const stateData = dest.state as any;
  const stateName = Array.isArray(stateData)
    ? stateData[0]?.name
    : stateData?.name;
  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;

  const ratingText = kf?.rating ? `${kf.rating}/5` : "";
  const title = ratingText
    ? `Is ${name} Safe for Kids? Family Travel Guide (${ratingText} Kid-Friendly)`
    : `${name} with Kids: Family Travel Guide & Safety Tips`;
  const description = `Planning ${name} with children? Kid safety rating${ratingText ? ` ${ratingText}` : ""}, hospital distance, altitude concerns, road conditions & family activities in ${stateName || "India"}.`.slice(0, 160);
  const canonicalUrl = `https://www.nakshiq.com/${locale}/with-kids/${id}`;
  const imageUrl = `https://www.nakshiq.com/images/destinations/${id}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://www.nakshiq.com/en/with-kids/${id}`,
        hi: `https://www.nakshiq.com/hi/with-kids/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${name} with Kids — Family Travel Guide`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

async function getDestinationForKids(id: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: dest, error } = await supabase
    .from("destinations")
    .select(
      `
      id, name, tagline, difficulty, elevation_m, budget_tier, best_months, region, why_special,
      state:states(name),
      kids_friendly(*),
      confidence_cards(*),
      destination_months(*)
    `
    )
    .eq("id", id)
    .single();

  if (error || !dest) return null;
  return dest;
}

export default async function WithKidsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const dest = await getDestinationForKids(id);
  if (!dest) notFound();

  const kf = Array.isArray(dest.kids_friendly)
    ? dest.kids_friendly[0]
    : dest.kids_friendly;
  const cc = Array.isArray(dest.confidence_cards)
    ? dest.confidence_cards[0]
    : dest.confidence_cards;
  const stateData = dest.state as any;
  const stateName = Array.isArray(stateData)
    ? stateData[0]?.name
    : stateData?.name;
  const months = ((dest.destination_months as any[]) ?? []).sort(
    (a: any, b: any) => a.month - b.month
  );

  // FAQPage schema with family-specific questions
  const faqItems = [
    {
      "@type": "Question" as const,
      name: `Is ${dest.name} safe for kids?`,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: kf?.suitable
          ? `Yes, ${dest.name} is rated ${kf.rating}/5 for families with children. ${(kf.reasons || []).slice(0, 2).join(". ")}.`
          : `${dest.name} is generally not recommended for families with young children. ${(kf?.reasons || []).slice(0, 2).join(". ")}.`,
      },
    },
    {
      "@type": "Question" as const,
      name: `What is the best month to visit ${dest.name} with kids?`,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: (() => {
          const bestKidsMonths = months
            .filter((m: any) => m.score >= 4)
            .map((m: any) => MONTH_NAMES[m.month]);
          return bestKidsMonths.length > 0
            ? `The best months to visit ${dest.name} with kids are ${bestKidsMonths.join(", ")}. These months have the highest travel suitability scores.`
            : `Check NakshIQ for month-by-month family suitability scores for ${dest.name}.`;
        })(),
      },
    },
    {
      "@type": "Question" as const,
      name: `Is there a hospital near ${dest.name}?`,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: cc?.emergency
          ? `Emergency access at ${dest.name}: ${typeof cc.emergency === "object" ? JSON.stringify(cc.emergency) : cc.emergency}`
          : `Visit the full ${dest.name} guide on NakshIQ for emergency and hospital information.`,
      },
    },
    {
      "@type": "Question" as const,
      name: `What difficulty level is ${dest.name} for families?`,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: `${dest.name} is rated "${dest.difficulty}" difficulty. ${
          dest.difficulty === "easy"
            ? "Suitable for most families including those with young children."
            : dest.difficulty === "moderate"
              ? "Manageable for families with older children who are reasonably fit."
              : "May be challenging for families — consider children's fitness and experience level."
        }${dest.elevation_m && dest.elevation_m > 2500 ? ` At ${dest.elevation_m.toLocaleString()}m elevation, altitude awareness is needed for children.` : ""}`,
      },
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://www.nakshiq.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinations",
        item: `https://www.nakshiq.com/${locale}/explore`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dest.name,
        item: `https://www.nakshiq.com/${locale}/destination/${id}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "With Kids",
        item: `https://www.nakshiq.com/${locale}/with-kids/${id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <WithKidsContent
          dest={dest}
          locale={locale}
          kidsData={kf}
          confidenceData={cc}
          months={months}
          stateName={stateName}
        />
      </main>
      <Footer />
    </div>
  );
}

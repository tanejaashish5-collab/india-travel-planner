import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { VsComparison } from "@/components/vs-comparison";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

const SITE = "https://www.nakshiq.com";

function resolveState(state: any): string | null {
  if (!state) return null;
  if (Array.isArray(state)) return state[0]?.name ?? null;
  return state.name;
}

async function getVsData(id1: string, id2: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  const [res1, res2] = await Promise.all([
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, budget_tier, best_months, daily_cost, family_stress,
        state:states(name),
        destination_months(month, score),
        kids_friendly(suitable, rating),
        confidence_cards(safety_rating, network, medical_access)
      `)
      .eq("id", id1)
      .single(),
    supabase
      .from("destinations")
      .select(`
        id, name, tagline, difficulty, elevation_m, budget_tier, best_months, daily_cost, family_stress,
        state:states(name),
        destination_months(month, score),
        kids_friendly(suitable, rating),
        confidence_cards(safety_rating, network, medical_access)
      `)
      .eq("id", id2)
      .single(),
  ]);

  if (!res1.data || !res2.data) return null;

  return { dest1: res1.data, dest2: res2.data };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pair: string; locale: string }>;
}): Promise<Metadata> {
  const { pair, locale } = await params;
  const parts = pair.split("-vs-");
  if (parts.length !== 2) return {};

  const data = await getVsData(parts[0], parts[1]);
  if (!data) return {};

  const name1 = data.dest1.name;
  const name2 = data.dest2.name;
  const title = `${name1} vs ${name2} — Which Is Better? Side-by-Side | NakshIQ`;
  const description = `${name1} vs ${name2}: honest side-by-side comparison of monthly scores, difficulty, budget, kids-friendliness, safety & more. Data-driven, zero fluff.`;
  const canonicalUrl = `${SITE}/${locale}/vs/${pair}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE}/en/vs/${pair}`,
        hi: `${SITE}/hi/vs/${pair}`,
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
        { url: `${SITE}/images/destinations/${parts[0]}.jpg`, width: 600, height: 400, alt: name1 },
        { url: `${SITE}/images/destinations/${parts[1]}.jpg`, width: 600, height: 400, alt: name2 },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function VsPairPage({
  params,
}: {
  params: Promise<{ pair: string; locale: string }>;
}) {
  const { pair, locale } = await params;
  const parts = pair.split("-vs-");
  if (parts.length !== 2) notFound();

  const data = await getVsData(parts[0], parts[1]);
  if (!data) notFound();

  const { dest1, dest2 } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
      { "@type": "ListItem", position: 2, name: dest1.name, item: `${SITE}/${locale}/destination/${dest1.id}` },
      { "@type": "ListItem", position: 3, name: `${dest1.name} vs ${dest2.name}`, item: `${SITE}/${locale}/vs/${pair}` },
    ],
  };

  // Prepare serializable data
  const serialize = (d: any) => ({
    id: d.id,
    name: d.name,
    tagline: d.tagline,
    difficulty: d.difficulty,
    elevation_m: d.elevation_m,
    budget_tier: d.budget_tier,
    best_months: d.best_months,
    daily_cost: d.daily_cost,
    family_stress: d.family_stress,
    state: resolveState(d.state),
    months: (d.destination_months ?? []).sort((a: any, b: any) => a.month - b.month),
    kids: Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly,
    confidence: Array.isArray(d.confidence_cards) ? d.confidence_cards[0] : d.confidence_cards,
  });

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VsComparison
        dest1={serialize(dest1)}
        dest2={serialize(dest2)}
        locale={locale}
      />
      <Footer />
    </div>
  );
}

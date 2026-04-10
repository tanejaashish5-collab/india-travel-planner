import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SkipListDetail } from "@/components/skip-list-detail";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const SITE = "https://nakshiq.com";

interface TrapAlternative {
  trap_destination_id: string;
  alternative_destination_id: string;
  why_better: string;
  comparison: string;
  why_trap: string | null;
  rank: number;
  distance_km: number | null;
  drive_time: string | null;
  crowd_difference: string | null;
  vibe_difference: string | null;
  alt_dest: { name: string; tagline: string; difficulty: string; elevation_m: number | null } | { name: string; tagline: string; difficulty: string; elevation_m: number | null }[] | null;
}

interface TrapDestination {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  state: { name: string } | { name: string }[] | null;
}

interface MonthScore {
  month: number;
  score: number;
}

function resolveName(dest: any): string | null {
  if (!dest) return null;
  if (Array.isArray(dest)) return dest[0]?.name ?? null;
  return dest.name;
}

function resolveState(state: any): string | null {
  if (!state) return null;
  if (Array.isArray(state)) return state[0]?.name ?? null;
  return state.name;
}

async function getSkipListData(slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);

  // Fetch trap destination details
  const { data: trapDest } = await supabase
    .from("destinations")
    .select("id, name, tagline, difficulty, elevation_m, state:states(name)")
    .eq("id", slug)
    .single();

  if (!trapDest) return null;

  // Fetch alternatives for this trap
  const { data: alternatives } = await supabase
    .from("tourist_trap_alternatives")
    .select(
      `trap_destination_id, alternative_destination_id, why_better, comparison, why_trap, rank, distance_km, drive_time, crowd_difference, vibe_difference,
       alt_dest:destinations!alternative_destination_id(name, tagline, difficulty, elevation_m)`
    )
    .eq("trap_destination_id", slug)
    .order("rank", { ascending: true });

  if (!alternatives || alternatives.length === 0) return null;

  // Fetch month scores for the trap destination
  const { data: months } = await supabase
    .from("destination_months")
    .select("month, score")
    .eq("destination_id", slug)
    .order("month");

  return {
    trapDest: trapDest as TrapDestination,
    alternatives: alternatives as TrapAlternative[],
    months: (months as MonthScore[] | null) ?? [],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = await getSkipListData(slug);
  if (!data) return {};

  const { trapDest } = data;
  const stateName = resolveState(trapDest.state);
  const title = `${trapDest.name} — Is It Worth Visiting? Honest Review | NakshIQ`;
  const description = `Should you skip ${trapDest.name}${stateName ? `, ${stateName}` : ""}? Honest assessment with ${data.alternatives.length} better alternative${data.alternatives.length > 1 ? "s" : ""} nearby. Data-driven, no sponsored picks.`;
  const canonicalUrl = `${SITE}/${locale}/skip-list/${slug}`;
  const imageUrl = `${SITE}/images/destinations/${slug}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE}/en/skip-list/${slug}`,
        hi: `${SITE}/hi/skip-list/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `Skip ${trapDest.name}?` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SkipListSlugPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const data = await getSkipListData(slug);

  if (!data) notFound();

  const { trapDest, alternatives, months } = data;
  const stateName = resolveState(trapDest.state);

  const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Months where score is 4-5 (when it's still worth visiting)
  const goodMonths = months
    .filter((m) => m.score >= 4)
    .map((m) => MONTH_NAMES[m.month])
    .filter(Boolean);

  // Get the why_trap/comparison text from first alternative
  const whyTrapText = alternatives[0]?.why_trap || alternatives[0]?.comparison || null;

  // Build JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Skip ${trapDest.name} — Here's Why (and Where to Go Instead)`,
    description: `Honest review of ${trapDest.name} with ${alternatives.length} better alternatives.`,
    image: `/images/destinations/${slug}.jpg`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/${locale}` },
        { "@type": "ListItem", position: 2, name: "Tourist Traps", item: `${SITE}/${locale}/tourist-traps` },
        { "@type": "ListItem", position: 3, name: trapDest.name, item: `${SITE}/${locale}/skip-list/${slug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SkipListDetail
        trapDest={{
          id: trapDest.id,
          name: trapDest.name,
          tagline: trapDest.tagline,
          difficulty: trapDest.difficulty,
          elevation_m: trapDest.elevation_m,
          state: stateName,
        }}
        alternatives={alternatives.map((alt) => {
          const altData = Array.isArray(alt.alt_dest) ? alt.alt_dest[0] : alt.alt_dest;
          return {
            id: alt.alternative_destination_id,
            name: altData?.name ?? alt.alternative_destination_id,
            tagline: altData?.tagline ?? "",
            difficulty: altData?.difficulty ?? "",
            elevation_m: altData?.elevation_m ?? null,
            why_better: alt.why_better,
            distance_km: alt.distance_km,
            drive_time: alt.drive_time,
            crowd_difference: alt.crowd_difference,
            vibe_difference: alt.vibe_difference,
          };
        })}
        whyTrapText={whyTrapText}
        goodMonths={goodMonths}
        allMonths={months}
        locale={locale}
      />
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createClient } from "@supabase/supabase-js";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { LuxuryDetail } from "@/components/luxury-detail";
import { localeAlternates, breadcrumbSchema } from "@/lib/seo-utils";
import { singleLuxuryJsonLd, type LuxuryRow } from "@/lib/luxury-schema";

// Per-luxury-experience detail page. One indexed URL per row × 2 locales.
// Mirrors /festivals/[festivalSlug] — generateStaticParams + dynamicParams=true,
// 24h revalidate, schema.org per category (TouristTrip | LodgingBusiness).

export const revalidate = 86400;
export const dynamicParams = true;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function loadAllSlugs(): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("luxury_experiences")
    .select("id")
    .eq("published", true);
  return (data ?? []).map((r: { id: string }) => r.id);
}

async function loadBySlug(slug: string): Promise<LuxuryRow | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("luxury_experiences")
    .select("*")
    .eq("id", slug)
    .eq("published", true)
    .maybeSingle();
  return (data ?? null) as LuxuryRow | null;
}

async function loadDestinationName(id: string | null | undefined): Promise<string | null> {
  if (!id) return null;
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from("destinations")
    .select("name")
    .eq("id", id)
    .maybeSingle();
  return (data as { name?: string } | null)?.name ?? null;
}

export async function generateStaticParams() {
  const slugs = await loadAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const row = await loadBySlug(slug);
  if (!row) return {};
  const tagline = locale === "hi" ? row.translations?.hi?.tagline ?? row.tagline : row.tagline;
  const name = locale === "hi" ? row.translations?.hi?.name ?? row.name : row.name;
  const categoryWord = row.category === "train" ? "luxury train" : row.category === "itinerary" ? "luxury itinerary" : "iconic stay";
  return {
    title: `${name} — ${categoryWord}`,
    description: tagline ?? (row.editorial ? row.editorial.slice(0, 157) + "…" : `${name}: rates, route, sources, verified by NakshIQ.`),
    ...localeAlternates(locale, `/luxury/${slug}`),
  };
}

export default async function LuxuryDetailPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const row = await loadBySlug(slug);
  if (!row) notFound();

  const t = await getTranslations({ locale, namespace: "luxury" });
  const pageUrl = `https://www.nakshiq.com/${locale}/luxury/${slug}`;
  const ld = singleLuxuryJsonLd(row, pageUrl);
  const breadcrumbLd = breadcrumbSchema(locale, [
    { name: "Luxury", path: "/luxury" },
    { name: row.name, path: `/luxury/${slug}` },
  ]);

  const primaryDestName = await loadDestinationName(row.primary_destination_id);

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav />
      <main id="main-content" className="nq-grain" style={{ position: "relative", padding: "140px 24px 64px" }}>
        <LuxuryDetail
          row={row}
          locale={locale}
          primaryDestName={primaryDestName}
          labels={{
            kicker: t("kicker"),
            category_train: t("category_train"),
            category_stay: t("category_stay"),
            category_itinerary: t("category_itinerary"),
            tier_luxury: t("tier_luxury"),
            tier_ultra_luxury: t("tier_ultra_luxury"),
            tier_iconic: t("tier_iconic"),
            whyIconic: t("whyIconic"),
            signatureExperience: t("signatureExperience"),
            routeLegs: t("routeLegs"),
            included: t("included"),
            priceBand: t("priceBand"),
            duration: t("duration"),
            bestMonths: t("bestMonths"),
            bookViaOperator: t("bookViaOperator"),
            verifiedSources: t("verifiedSources"),
            viewHostDestination: t("viewHostDestination"),
            disclaimer: t("disclaimer"),
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

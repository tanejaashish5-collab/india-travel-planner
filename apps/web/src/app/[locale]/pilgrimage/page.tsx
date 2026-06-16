import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localeAlternates, breadcrumbSchema, itemListSchema } from "@/lib/seo-utils";
import { type PilgrimageRow, localizePilgrimage, formatKm } from "@/lib/pilgrimage-guide";

export const revalidate = 604800; // 7d
export const dynamicParams = true;

const BASE = "https://www.nakshiq.com";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function getRoutes(): Promise<PilgrimageRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("pilgrimage_routes")
    .select("*")
    .eq("published", true)
    .order("total_distance_km", { ascending: false, nullsFirst: false });
  return (data as PilgrimageRow[]) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === "hi";
  // <title> omits " | NakshIQ" — the locale layout's title.template appends
  // it. ogTitle carries the brand inline (the template skips OG/twitter).
  const title = isHindi
    ? "भारत की तीर्थयात्राएँ — दूरी, मार्ग और योजना"
    : "India pilgrimage routes — distances, route & planning";
  const ogTitle = `${title} | NakshIQ`;
  const description = isHindi
    ? "चार धाम, वैष्णो देवी, अष्टविनायक और अन्य प्रमुख यात्राओं की चरण-दर-चरण दूरियाँ, पहुँचने के तरीके और सबसे अच्छा समय — हर दूरी आधिकारिक स्रोत से सत्यापित।"
    : "Leg-by-leg distances, access modes and the best window for Char Dham, Vaishno Devi, Ashtavinayak and India's major yatras — every distance source-verified.";
  return {
    title,
    description,
    ...localeAlternates(locale, `/pilgrimage`),
    openGraph: { title: ogTitle, description, type: "website", url: `${BASE}/${locale}/pilgrimage`, siteName: "NakshIQ", locale: isHindi ? "hi_IN" : "en_IN" },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}

export default async function PilgrimageIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHindi = locale === "hi";
  const rows = (await getRoutes()).map((r) => localizePilgrimage(r, locale));

  const breadcrumbLd = breadcrumbSchema(locale, [{ name: isHindi ? "तीर्थयात्रा" : "Pilgrimage", path: `/pilgrimage` }]);
  const listLd = itemListSchema(
    locale,
    `/pilgrimage`,
    isHindi ? "भारत की तीर्थयात्राएँ" : "India pilgrimage routes",
    rows.map((r) => ({ name: r.name, path: `/pilgrimage/${r.slug}` })),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listLd) }} />
      <Nav />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{isHindi ? "तीर्थयात्रा" : "Pilgrimage"}</p>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          {isHindi ? "भारत की तीर्थयात्राएँ" : "India pilgrimage routes"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isHindi
            ? "प्रमुख यात्राओं की चरण-दर-चरण दूरियाँ, पहुँचने के तरीके और सबसे अच्छा समय — हर दूरी आधिकारिक स्रोत से सत्यापित, किसी ब्लॉग का अंदाज़ा नहीं।"
            : "Leg-by-leg distances, how pilgrims cover each stage, and the best window — every distance source-verified, not a guess off a blog."}
        </p>

        {rows.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">{isHindi ? "जल्द ही और मार्ग जोड़े जाएँगे।" : "More routes coming soon."}</p>
        ) : (
          <ul className="mt-8 space-y-3">
            {rows.map((r) => {
              const metric =
                r.kind === "parikrama" && r.parikrama_km
                  ? `${formatKm(r.parikrama_km, locale)} ${isHindi ? "परिक्रमा" : "parikrama"}`
                  : r.step_count
                    ? `${r.step_count.toLocaleString("en-IN")} ${isHindi ? "सीढ़ियाँ" : "steps"}`
                    : r.total_distance_km
                      ? formatKm(r.total_distance_km, locale)
                      : null;
              return (
                <li key={r.slug}>
                  <Link
                    href={`/${locale}/pilgrimage/${r.slug}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 p-5 transition-colors hover:border-foreground/40 hover:bg-muted/40"
                  >
                    <span className="min-w-0">
                      <span className="block font-serif text-lg font-bold">{r.name}</span>
                      {r.summary && <span className="mt-1 block truncate text-sm text-muted-foreground">{r.summary}</span>}
                      <span className="mt-1.5 flex flex-wrap gap-x-3 text-xs text-muted-foreground">
                        {r.region && <span>{r.region}</span>}
                        {metric && <span className="font-medium text-foreground/70">{metric}</span>}
                      </span>
                    </span>
                    <span aria-hidden className="shrink-0 text-muted-foreground">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

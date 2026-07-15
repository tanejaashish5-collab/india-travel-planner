import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { CinematicListPage } from "@/components/cinematic-list-page";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Locale-split metadata (2026-07-15 audit: /en + /hi served identical
  // English title+description = duplicate-content flag; og:image was missing).
  const isHi = locale === "hi";
  const title = isHi
    ? "भारत की पहली यात्रा — सुरक्षा, ठगी, खाना, ट्रांसपोर्ट"
    : "First trip to India — safety, scams, food, transport";
  const description = isHi
    ? "अंतरराष्ट्रीय यात्रियों के लिए ईमानदार भारत गाइड — सुरक्षा, आम ठगी, क्या पहनें, खाना, सोलो फ़ीमेल ट्रैवल। वो सब जो गाइडबुक नहीं बताती।"
    : "Honest India travel for international visitors, by an Indian family: safety, scams, what to wear, food survival, solo female travel.";
  const ogImage = "https://www.nakshiq.com/og-image.jpg";
  return {
    title,
    description,
    openGraph: {
      title: `${title} | NakshIQ`,
      description,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `${title} | NakshIQ`, description, images: [ogImage] },
    ...localeAlternates(locale, "/india-travel"),
  };
}

type Article = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  excerpt: string | null;
  published_at: string;
  reading_time: number | null;
  cover_image_url: string | null;
  tags: string[] | null;
  featured: boolean | null;
};

async function getInternationalArticles(): Promise<Article[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("articles")
    .select(
      "id, slug, title, subtitle, category, excerpt, published_at, reading_time, cover_image_url, tags, featured",
    )
    .eq("category", "international")
    .order("published_at", { ascending: false });
  return (data as Article[]) ?? [];
}

function articleImageSrc(a: Article): string | null {
  if (a.cover_image_url && a.cover_image_url.startsWith("/images/")) {
    return a.cover_image_url;
  }
  if (a.tags && a.tags.length > 0) {
    const slug = a.tags[0].toLowerCase().replace(/\s+/g, "-");
    return `/images/destinations/${slug}.jpg`;
  }
  return null;
}

function formatDateMeta(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

export default async function IndiaTravel({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await getInternationalArticles();
  const issueNum = getIssueNumber();

  const cards = articles.map((a) => {
    const img = articleImageSrc(a);
    const meta = [
      formatDateMeta(a.published_at),
      a.reading_time ? `${a.reading_time} min read` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    return {
      href: `/${locale}/blog/${a.slug}`,
      kicker: a.featured ? "Featured" : a.category,
      title: a.title,
      dek: a.subtitle ?? a.excerpt ?? undefined,
      meta,
      ...(img ? { image: { src: img, alt: a.title } } : {}),
    };
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nakshiq.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "First trip to India",
        item: `https://www.nakshiq.com/${locale}/india-travel`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CinematicListPage
        kicker={`FIRST TRIP · ISSUE Nº ${issueNum}`}
        title="An honest field guide to your first time in India."
        dek="Written by an Indian family living abroad — for travellers who want safety, scams, food, transport, and tone-of-place advice that survives contact with a real city."
        cards={cards}
        empty="Field-guide essays publishing weekly. Subscribe to The Window to get them as they land."
      />
    </>
  );
}

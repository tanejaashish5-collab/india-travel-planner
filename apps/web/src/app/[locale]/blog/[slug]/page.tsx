import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BlogArticle } from "@/components/blog-article";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 86400;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const supabase = getSupabase();
  if (!supabase) return {};

  const { data } = await supabase
    .from("articles")
    .select("title, seo_title, seo_description, excerpt, cover_image_url, reading_time, published_at")
    .eq("slug", slug)
    .single();

  if (!data) return {};

  const title = data.seo_title || data.title;
  const description = data.seo_description || data.excerpt;
  const canonicalUrl = `https://nakshiq.com/${locale || "en"}/blog/${slug}`;
  const imageUrl = data.cover_image_url || "https://nakshiq.com/og-image.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `https://nakshiq.com/en/blog/${slug}`,
        hi: `https://nakshiq.com/hi/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "NakshIQ",
      publishedTime: data.published_at,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

async function getArticle(slug: string) {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  return data;
}

async function getAdjacentArticles(currentPublishedAt: string) {
  const supabase = getSupabase();
  if (!supabase) return { prev: null, next: null };

  const [prevRes, nextRes] = await Promise.all([
    supabase.from("articles").select("slug, title").lt("published_at", currentPublishedAt).order("published_at", { ascending: false }).limit(1),
    supabase.from("articles").select("slug, title").gt("published_at", currentPublishedAt).order("published_at", { ascending: true }).limit(1),
  ]);

  return {
    prev: prevRes.data?.[0] ?? null,
    next: nextRes.data?.[0] ?? null,
  };
}

async function getRelatedArticles(category: string, currentSlug: string) {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("articles")
    .select("slug, title, category, excerpt, reading_time, cover_image_url")
    .eq("category", category)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(3);

  return data ?? [];
}

async function getDestinationData(destinationIds: string[]) {
  if (!destinationIds?.length) return [];
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase
    .from("destinations")
    .select(`
      id, name, tagline, difficulty, elevation_m, budget_tier,
      state:states(name),
      destination_months(month, score, note, why_go, why_not),
      kids_friendly(suitable, rating, reasons),
      confidence_cards(safety_rating, network, emergency, reach)
    `)
    .in("id", destinationIds);

  return data ?? [];
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const [related, destinations, adjacent] = await Promise.all([
    getRelatedArticles(article.category, slug),
    getDestinationData(article.destinations ?? []),
    getAdjacentArticles(article.published_at),
  ]);

  // Schema.org Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || article.subtitle,
    url: `https://nakshiq.com/en/blog/${slug}`,
    datePublished: article.published_at,
    ...(article.cover_image_url && { image: article.cover_image_url }),
    author: { "@type": "Organization", name: "NakshIQ", url: "https://nakshiq.com" },
    publisher: {
      "@type": "Organization",
      name: "NakshIQ",
      url: "https://nakshiq.com",
      logo: { "@type": "ImageObject", url: "https://nakshiq.com/icon-192.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://nakshiq.com/en/blog/${slug}` },
    ...(article.reading_time && { timeRequired: `PT${article.reading_time}M` }),
  };

  // BreadcrumbList schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://nakshiq.com/en" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://nakshiq.com/en/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://nakshiq.com/en/blog/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <BlogArticle article={article} destinations={destinations} relatedArticles={related} adjacentArticles={adjacent} />
      </main>
      <Footer />
    </div>
  );
}

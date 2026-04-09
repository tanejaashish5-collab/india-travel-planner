import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BlogArticle } from "@/components/blog-article";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getSupabase();
  if (!supabase) return {};

  const { data } = await supabase
    .from("articles")
    .select("title, seo_title, seo_description, excerpt, cover_image_url")
    .eq("slug", slug)
    .single();

  if (!data) return {};

  return {
    title: data.seo_title || data.title,
    description: data.seo_description || data.excerpt,
    openGraph: {
      title: data.seo_title || data.title,
      description: data.seo_description || data.excerpt,
      ...(data.cover_image_url ? { images: [{ url: data.cover_image_url }] } : {}),
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

  const [related, destinations] = await Promise.all([
    getRelatedArticles(article.category, slug),
    getDestinationData(article.destinations ?? []),
  ]);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <BlogArticle article={article} destinations={destinations} relatedArticles={related} />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BlogGrid } from "@/components/blog-grid";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "Blog — Travel Intelligence Articles",
  description: "Data-driven travel guides, destination comparisons, and seasonal intelligence for India. Every article backed by real scores, infrastructure data, and honest analysis.",
};

async function getArticles() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("articles")
    .select("id, slug, title, subtitle, category, excerpt, published_at, reading_time, cover_image_url, tags, featured")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Travel Intelligence</h1>
          <p className="mt-2 text-muted-foreground">
            Data-driven guides backed by real scores, infrastructure data, and honest analysis. Not brochure talk.
          </p>
        </div>
        <BlogGrid articles={articles} />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BlogGrid } from "@/components/blog-grid";
import { NewsletterSignup } from "@/components/newsletter-signup";
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
    .select("id, slug, title, subtitle, category, excerpt, published_at, reading_time, cover_image_url, tags, featured, depth")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen">
      <Nav />
      {/* Visual page hero */}
      <section className="relative h-48 sm:h-64 overflow-hidden">
        <img src="/images/destinations/valley-of-flowers.jpg" alt="Travel Intelligence" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">NakshIQ Intelligence</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-white drop-shadow-lg">Travel Intelligence</h1>
          <p className="mt-2 text-white/80 max-w-xl">Data-driven guides backed by real scores, infrastructure data, and honest analysis. Not brochure talk.</p>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <BlogGrid articles={articles} />
        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
}

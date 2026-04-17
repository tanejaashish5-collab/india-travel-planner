import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BlogGrid } from "@/components/blog-grid";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "Blog — Travel Intelligence Articles",
  description: "Data-driven travel guides, destination comparisons, and seasonal intelligence for India. Every article backed by real scores, infrastructure data, and honest analysis.",

    ...localeAlternates(locale, "/blog"),
  };
}async function getArticles() {
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
      {/* Visual page hero — brand gradient, no destination photo */}
      <section className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-[#161614] via-[#1e1e1c] to-[#2F4F3F]/30">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F1E8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <p className="text-sm font-medium text-[#E55642] uppercase tracking-widest mb-2">NakshIQ Intelligence</p>
          <h1 className="text-3xl font-bold sm:text-4xl text-[#F5F1E8]">Travel Intelligence</h1>
          <p className="mt-2 text-[#F5F1E8]/70 max-w-xl">Data-driven guides backed by real scores, infrastructure data, and honest analysis. Not brochure talk.</p>
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

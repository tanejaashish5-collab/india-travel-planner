import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { IndiaArticleGrid } from "./india-article-grid";
import { createClient } from "@supabase/supabase-js";
import { localeAlternates } from "@/lib/seo-utils";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
  title: "India Travel Guide for International Visitors — NakshIQ",
  description:
    "Honest India travel tips 2026 from an Indian family. Safety, scams, food, transport, and what your guidebook won't tell you. 340+ destinations scored.",
  openGraph: {
    title: "India Travel Guide for International Visitors — NakshIQ",
    description:
      "Honest India travel tips 2026 from an Indian family. Safety, scams, food, transport, and what your guidebook won't tell you.",
    type: "website",
  },

    ...localeAlternates(locale, "/india-travel"),
  };
}async function getInternationalArticles() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("articles")
    .select(
      "id, slug, title, subtitle, category, excerpt, published_at, reading_time, cover_image_url, tags, featured, depth"
    )
    .eq("category", "international")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export default async function IndiaTravel() {
  const articles = await getInternationalArticles();

  const jsonLd = {
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
        name: "India Travel Guide",
        item: "https://www.nakshiq.com/en/india-travel",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Nav />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#161614] via-[#1e1e1c] to-[#2F4F3F]/30">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F1E8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 sm:py-24 text-center">
          <p className="text-sm font-medium text-[#E55642] uppercase tracking-widest mb-4">
            For International Visitors
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1E8]">
            India, Without the Filter
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#F5F1E8]/70 max-w-2xl mx-auto">
            The honest answers your guidebook won't give you. Written by an
            NRI family for every traveler — first-timer or returning — who
            deserves to know what they're walking into.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="mx-auto max-w-4xl px-4 py-5 flex flex-wrap justify-center gap-8 sm:gap-12">
          {[
            { num: "340+", label: "Destinations Scored" },
            { num: "4,116", label: "Monthly Ratings" },
            { num: "0", label: "Paid Placements" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-2xl font-mono font-bold text-foreground">
                {stat.num}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles */}
      <main className="mx-auto max-w-7xl px-4 py-10">
        <IndiaArticleGrid articles={articles} />

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="/en/explore"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Explore 340+ destinations
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

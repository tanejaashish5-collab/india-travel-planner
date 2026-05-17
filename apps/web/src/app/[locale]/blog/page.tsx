import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { CinematicListPage } from "@/components/cinematic-list-page";
import { getIssueNumber } from "@/components/landing-cinema/issue-number";
import {
  breadcrumbSchema,
  collectionPageSchema,
  itemListSchema,
  localeAlternates,
} from "@/lib/seo-utils";

export const revalidate = 21600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Field notes — long-form travel writing for India",
    description:
      "Data-driven essays on India travel — seasonal intelligence, destination comparisons, and the offbeat circuit. Backed by real scores, not influencer talk.",
    ...localeAlternates(locale, "/blog"),
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

async function getArticles(): Promise<Article[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("articles")
    .select(
      "id, slug, title, subtitle, category, excerpt, published_at, reading_time, cover_image_url, tags, featured",
    )
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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await getArticles();
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
      kicker: a.featured ? "Featured" : undefined,
      title: a.title,
      dek: a.subtitle ?? a.excerpt ?? undefined,
      meta,
      ...(img ? { image: { src: img, alt: a.title } } : {}),
    };
  });

  const schemas = [
    collectionPageSchema({
      locale,
      path: "/blog",
      name: "Field notes — long-form travel writing for India",
      description:
        "Data-driven essays on India travel — seasonal intelligence, destination comparisons, and the offbeat circuit.",
    }),
    itemListSchema(
      locale,
      "/blog",
      "Field notes",
      articles.map((a) => ({ name: a.title, path: `/blog/${a.slug}` })),
      "descending",
    ),
    breadcrumbSchema(locale, [{ name: "Field notes", path: "/blog" }]),
  ];

  return (
    <CinematicListPage
      kicker={`FIELD NOTES · ISSUE Nº ${issueNum}`}
      title="The honest answers your guidebook won't give you."
      dek={`${articles.length} long-form essays on India travel — seasonal intelligence, destination comparisons, and the offbeat circuit. Every article backed by real scores, not influencer talk.`}
      cards={cards}
      empty="No essays published yet. The first one is on its way."
      schemas={schemas}
    />
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useCallback } from "react";

interface Article {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  excerpt?: string;
  published_at: string;
  reading_time: number;
  cover_image_url?: string;
  tags?: string[];
  featured?: boolean;
  depth?: string;
}

function getImageUrl(article: Article): string | null {
  if (article.cover_image_url && article.cover_image_url.startsWith("/images/")) {
    return article.cover_image_url;
  }
  if (article.tags && article.tags.length > 0) {
    const slug = article.tags[0].toLowerCase().replace(/\s+/g, "-");
    return `/images/destinations/${slug}.jpg`;
  }
  return null;
}

function CardImage({ src, alt }: { src: string | null; alt: string }) {
  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.style.display = "none";
    const fallback = img.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = "flex";
  }, []);

  if (!src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#161614] via-[#2F4F3F]/20 to-[#E55642]/10 flex items-center justify-center">
        <div className="text-5xl font-bold text-[#F5F1E8]/[0.07]">
          N<span className="text-[#E55642]/[0.12]">.</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={handleError}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#161614] via-[#1e1e1c] to-[#2F4F3F]/40 flex items-center justify-center"
        style={{ display: "none" }}
      >
        <svg
          className="w-10 h-10 text-muted-foreground/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      </div>
    </>
  );
}

export function IndiaArticleGrid({ articles }: { articles: Article[] }) {
  const locale = useLocale();

  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">
          International travel articles coming soon.
        </p>
      </div>
    );
  }

  // First article is the featured/safety one (largest card)
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a !== featured);

  return (
    <div>
      {/* Featured article — full width hero card */}
      <Link
        href={`/${locale}/blog/${featured.slug}`}
        className="group block rounded-2xl border border-border/50 bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 mb-8"
      >
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <CardImage src={getImageUrl(featured)} alt={featured.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-400 backdrop-blur-sm">
              Featured
            </span>
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-400 backdrop-blur-sm">
              International
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/90">
              {featured.reading_time} min read
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg group-hover:text-primary transition-colors">
              {featured.title}
            </h2>
            {featured.subtitle && (
              <p className="mt-1 text-base sm:text-lg text-white/80 drop-shadow-md">
                {featured.subtitle}
              </p>
            )}
            {featured.excerpt && (
              <p className="mt-2 text-sm text-white/70 line-clamp-2 drop-shadow-sm max-w-2xl">
                {featured.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Grid of remaining articles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <Link
            key={article.slug}
            href={`/${locale}/blog/${article.slug}`}
            className="group block rounded-2xl border border-border/50 bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 h-full"
          >
            <div className="relative h-40 bg-muted/30 overflow-hidden">
              <CardImage src={getImageUrl(article)} alt={article.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-semibold text-white drop-shadow-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
            <div className="p-5 pt-3">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-0.5 text-[10px] font-medium text-sky-400">
                  International
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {article.reading_time} min
                </span>
              </div>
              {article.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

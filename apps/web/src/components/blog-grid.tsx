"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  StaggerContainer,
  StaggerItem,
  HoverCard,
  FadeIn,
  ScrollReveal,
} from "./animated-hero";

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  "best-time": { label: "Best Time to Visit", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  comparison: { label: "Comparison", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  guide: { label: "Intelligence Guide", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
  "data-story": { label: "Data Story", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  viral: { label: "Viral", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

const DEPTH_BADGES: Record<string, { label: string; color: string }> = {
  "deep-dive": { label: "Deep Dive", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  brief: { label: "Brief", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
};

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
  // Only use destination/content images, skip brand assets like og-image.jpg
  if (article.cover_image_url && article.cover_image_url.startsWith("/images/")) {
    return article.cover_image_url;
  }
  // Try to find a destination name in tags and use its image
  if (article.tags && article.tags.length > 0) {
    for (const tag of article.tags) {
      const slug = tag.toLowerCase().replace(/\s+/g, "-");
      return `/images/destinations/${slug}.jpg`;
    }
  }
  return null;
}

function ImageWithFallback({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.style.display = "none";
    // Show the gradient fallback behind
    const fallback = img.nextElementSibling as HTMLElement | null;
    if (fallback) fallback.style.display = "flex";
  }, []);

  if (!src) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#161614] via-[#2F4F3F]/20 to-[#E55642]/10 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F1E8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="text-6xl sm:text-8xl font-bold text-[#F5F1E8]/[0.07]">N<span className="text-[#E55642]/[0.12]">.</span></div>
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
        className={`${className} object-cover`}
        onError={handleError}
      />
      <div
        className={`${className} bg-gradient-to-br from-[#161614] via-[#1e1e1c] to-[#2F4F3F]/40 flex items-center justify-center absolute inset-0`}
        style={{ display: "none" }}
      >
        <svg className="w-10 h-10 text-muted-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
    </>
  );
}

export function BlogGrid({ articles }: { articles: Article[] }) {
  const locale = useLocale();
  const [filter, setFilter] = useState("all");

  const categories = ["all", "viral", "best-time", "comparison", "guide", "data-story"];

  const filtered = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.category === filter);
  }, [articles, filter]);

  const firstFeatured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => a !== firstFeatured);

  return (
    <div>
      {/* Category filters */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => {
            const meta = CATEGORY_LABELS[c];
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  filter === c
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                {c === "all"
                  ? `All (${articles.length})`
                  : `${meta?.label} (${articles.filter((a) => a.category === c).length})`}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Featured article (full-width hero card) */}
      {firstFeatured && (
        <FadeIn className="mb-8">
          <HoverCard>
            <Link
              href={`/${locale}/blog/${firstFeatured.slug}`}
              className="group block rounded-2xl border border-border/50 bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden">
                {/* Image or gradient placeholder */}
                {getImageUrl(firstFeatured) ? (
                  <ImageWithFallback
                    src={getImageUrl(firstFeatured)}
                    alt={firstFeatured.title}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-amber-500/5" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/40 to-transparent" />

                {/* Top-left badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                      CATEGORY_LABELS[firstFeatured.category]?.color || ""
                    }`}
                  >
                    {CATEGORY_LABELS[firstFeatured.category]?.label}
                  </span>
                  {firstFeatured.depth && DEPTH_BADGES[firstFeatured.depth] && (
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm ${
                        DEPTH_BADGES[firstFeatured.depth].color
                      }`}
                    >
                      {DEPTH_BADGES[firstFeatured.depth].label}
                    </span>
                  )}
                </div>

                {/* Top-right reading time */}
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/90">
                    {firstFeatured.reading_time} min read
                  </span>
                </div>

                {/* Bottom overlaid content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-xs text-amber-400 font-medium backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg group-hover:text-primary transition-colors">
                    {firstFeatured.title}
                  </h2>
                  {firstFeatured.subtitle && (
                    <p className="mt-1 text-base sm:text-lg text-white/80 drop-shadow-md">
                      {firstFeatured.subtitle}
                    </p>
                  )}
                  {firstFeatured.excerpt && (
                    <p className="mt-2 text-sm text-white/70 line-clamp-2 drop-shadow-sm max-w-2xl">
                      {firstFeatured.excerpt}
                    </p>
                  )}
                  {firstFeatured.tags && firstFeatured.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {firstFeatured.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/10 backdrop-blur-sm px-2 py-0.5 text-xs text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </HoverCard>
        </FadeIn>
      )}

      {/* Article grid */}
      {rest.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No articles in this category yet.</p>
        </div>
      ) : (
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
          {rest.map((article) => {
            const imageUrl = getImageUrl(article);
            const depthInfo = article.depth ? DEPTH_BADGES[article.depth] : null;

            return (
              <StaggerItem key={article.slug}>
                <HoverCard>
                  <Link
                    href={`/${locale}/blog/${article.slug}`}
                    className={`group block rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-lg h-full ${
                      article.category === "viral"
                        ? "border-red-500/40 hover:border-red-500/60 hover:shadow-red-500/10"
                        : "border-border/50 hover:border-primary/30 hover:shadow-primary/5"
                    }`}
                  >
                    {/* Cover image area */}
                    <div className="relative h-40 bg-muted/30 overflow-hidden">
                      {imageUrl ? (
                        <ImageWithFallback
                          src={imageUrl}
                          alt={article.title}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-amber-500/5" />
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

                      {/* Title overlaid at bottom of image */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white drop-shadow-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 pt-3">
                      {/* Badges row */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                            CATEGORY_LABELS[article.category]?.color || ""
                          }`}
                        >
                          {CATEGORY_LABELS[article.category]?.label}
                        </span>
                        {depthInfo && (
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${depthInfo.color}`}
                          >
                            {depthInfo.label}
                          </span>
                        )}
                        <span className="ml-auto text-xs text-muted-foreground">
                          {article.reading_time} min
                        </span>
                      </div>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Tags */}
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
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}
    </div>
  );
}

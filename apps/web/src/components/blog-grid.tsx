"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  "best-time": { label: "Best Time to Visit", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  comparison: { label: "Comparison", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  guide: { label: "Intelligence Guide", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
  "data-story": { label: "Data Story", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
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
}

export function BlogGrid({ articles }: { articles: Article[] }) {
  const locale = useLocale();
  const [filter, setFilter] = useState("all");

  const categories = ["all", "best-time", "comparison", "guide", "data-story"];

  const filtered = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((a) => a.category === filter);
  }, [articles, filter]);

  const featured = articles.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured || filter !== "all");

  return (
    <div>
      {/* Category filters */}
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
              {c === "all" ? `All (${articles.length})` : `${meta?.label} (${articles.filter((a) => a.category === c).length})`}
            </button>
          );
        })}
      </div>

      {/* Featured article (first one, full-width) */}
      {filter === "all" && featured.length > 0 && (
        <Link
          href={`/${locale}/blog/${featured[0].slug}`}
          className="group mb-8 block rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className={`rounded-full border px-3 py-1 text-xs font-medium ${CATEGORY_LABELS[featured[0].category]?.color || ""}`}>
                {CATEGORY_LABELS[featured[0].category]?.label}
              </span>
              <span className="text-xs text-muted-foreground">{featured[0].reading_time} min read</span>
              {featured[0].featured && (
                <span className="rounded-full bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 text-xs text-amber-400 font-medium">Featured</span>
              )}
            </div>
            <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
              {featured[0].title}
            </h2>
            {featured[0].subtitle && (
              <p className="mt-1 text-lg text-muted-foreground">{featured[0].subtitle}</p>
            )}
            {featured[0].excerpt && (
              <p className="mt-3 text-muted-foreground line-clamp-3">{featured[0].excerpt}</p>
            )}
            {featured[0].tags && featured[0].tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {featured[0].tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Article grid */}
      {rest.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No articles in this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/${locale}/blog/${article.slug}`}
              className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${CATEGORY_LABELS[article.category]?.color || ""}`}>
                    {CATEGORY_LABELS[article.category]?.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{article.reading_time} min</span>
                </div>
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                )}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

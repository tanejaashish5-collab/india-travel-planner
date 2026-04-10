"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";
import { FadeIn, ScrollReveal } from "./animated-hero";

const CATEGORY_LABELS: Record<string, string> = {
  "best-time": "Best Time to Visit",
  comparison: "Comparison",
  guide: "Intelligence Guide",
  "data-story": "Data Story",
};

const CATEGORY_COLORS: Record<string, string> = {
  "best-time": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  comparison: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  guide: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  "data-story": "bg-amber-500/10 text-amber-400 border-amber-500/30",
};

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface Destination {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  elevation_m: number | null;
  budget_tier: string | null;
  state: { name: string } | Array<{ name: string }> | null;
  destination_months: Array<{ month: number; score: number; note: string; why_go?: string; why_not?: string }> | null;
  kids_friendly: { suitable: boolean; rating: number; reasons?: string[] } | Array<{ suitable: boolean; rating: number; reasons?: string[] }> | null;
  confidence_cards: any;
}

export function BlogArticle({
  article,
  destinations,
  relatedArticles,
  adjacentArticles,
}: {
  article: any;
  destinations: Destination[];
  relatedArticles: any[];
  adjacentArticles?: { prev: any; next: any };
}) {
  const locale = useLocale();
  const currentMonth = new Date().getMonth() + 1;

  // Parse content sections — split by ## headers
  const sections = parseContent(article.content);
  const isDeepDive = article.depth === "deep-dive";

  return (
    <article>
      {/* Cinematic Cover Image Hero */}
      {article.cover_image_url ? (
        <div className="relative -mx-4 sm:-mx-0 h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl mb-0">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          {/* Category + Depth badges floating on hero */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <span className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${CATEGORY_COLORS[article.category] || "bg-primary/10 text-primary border-primary/30"}`}>
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
            {isDeepDive ? (
              <span className="rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-xs font-medium text-amber-400 backdrop-blur-sm">Deep Dive</span>
            ) : (
              <span className="rounded-full bg-muted/80 border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">Brief</span>
            )}
          </div>
        </div>
      ) : (
        <div className="relative -mx-4 sm:-mx-0 h-64 sm:h-80 lg:h-96 overflow-hidden rounded-2xl mb-0 bg-gradient-to-br from-primary/20 via-violet-500/10 to-amber-500/10">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          {/* Decorative pattern for no-image hero */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          {/* Category + Depth badges floating on hero */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <span className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${CATEGORY_COLORS[article.category] || "bg-primary/10 text-primary border-primary/30"}`}>
              {CATEGORY_LABELS[article.category] || article.category}
            </span>
            {isDeepDive ? (
              <span className="rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-xs font-medium text-amber-400 backdrop-blur-sm">Deep Dive</span>
            ) : (
              <span className="rounded-full bg-muted/80 border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">Brief</span>
            )}
          </div>
        </div>
      )}

      {/* Floating Header Card — pulls up into the hero */}
      <FadeIn>
        <div className="-mt-20 relative z-10 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/20 mb-8">
          {/* Back to blog */}
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
            ← All articles
          </Link>

          {/* Header */}
          <header>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm text-muted-foreground">{article.reading_time} min read</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="text-sm text-muted-foreground">
                {new Date(article.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{article.title}</h1>
            {article.subtitle && (
              <p className="mt-3 text-lg sm:text-xl text-muted-foreground leading-relaxed">{article.subtitle}</p>
            )}
          </header>
        </div>
      </FadeIn>

      {/* Destination score cards (if article has linked destinations) */}
      {destinations.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="mb-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Destinations in this article
            </h2>
            <div className="flex flex-wrap gap-2">
              {destinations.map((d) => {
                const monthScore = d.destination_months?.find((m) => m.month === currentMonth)?.score;
                const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
                return (
                  <Link
                    key={d.id}
                    href={`/${locale}/destination/${d.id}`}
                    className="group flex items-center gap-2.5 rounded-lg border border-border bg-background/80 px-3 py-2.5 text-sm hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  >
                    <DestinationThumb id={d.id} name={d.name} />
                    {monthScore !== undefined && (
                      <span className={`font-mono font-bold text-xs px-1.5 py-0.5 rounded ${SCORE_COLORS[monthScore] ?? ""}`}>
                        {monthScore}/5
                      </span>
                    )}
                    <span className="font-medium group-hover:text-primary transition-colors">{d.name}</span>
                    {stateName && <span className="text-xs text-muted-foreground">{stateName}</span>}
                    {d.difficulty && (
                      <span className={`text-[10px] font-medium capitalize ${DIFFICULTY_COLORS[d.difficulty] ?? "text-muted-foreground"}`}>
                        {d.difficulty}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Article content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {sections.map((section, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div>
              {section.heading && (
                <h2 className="text-2xl font-bold mt-10 mb-4">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Monthly score table for linked destinations */}
      {destinations.length > 0 && destinations[0].destination_months && (
        <ScrollReveal delay={0.1}>
          <div className="mt-10 rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 overflow-x-auto">
            <h3 className="text-sm font-bold mb-4">Monthly Scores</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Destination</th>
                  {MONTH_SHORT.slice(1).map((m, i) => (
                    <th key={m} className={`px-1.5 py-2 text-center text-xs ${i + 1 === currentMonth ? "text-primary font-bold" : "text-muted-foreground"}`}>{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {destinations.map((d) => (
                  <tr key={d.id} className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <Link href={`/${locale}/destination/${d.id}`} className="font-medium hover:text-primary transition-colors">{d.name}</Link>
                    </td>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                      const score = d.destination_months?.find((dm) => dm.month === m)?.score ?? 0;
                      return (
                        <td key={m} className={`px-1.5 py-2 text-center font-mono text-xs font-bold ${SCORE_COLORS[score] ?? "text-muted-foreground/30"}`}>
                          {score || "\u2014"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      )}

      {/* Comparison table for comparison articles */}
      {article.category === "comparison" && destinations.length >= 2 && (
        <ScrollReveal delay={0.15}>
          <div className="mt-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm p-4 overflow-x-auto">
            <h3 className="text-sm font-bold mb-4">Head-to-Head Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium w-32">Metric</th>
                  {destinations.slice(0, 2).map((d) => (
                    <th key={d.id} className="text-left py-2 px-3 font-semibold">{d.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: `Score (${MONTH_SHORT[currentMonth]})`, fn: (d: Destination) => { const s = d.destination_months?.find((m) => m.month === currentMonth)?.score; return s !== undefined ? `${s}/5` : "N/A"; } },
                  { label: "Difficulty", fn: (d: Destination) => d.difficulty },
                  { label: "Elevation", fn: (d: Destination) => d.elevation_m ? `${d.elevation_m.toLocaleString()}m` : "N/A" },
                  { label: "Budget", fn: (d: Destination) => d.budget_tier || "N/A" },
                  { label: "Kids Friendly", fn: (d: Destination) => { const kf = Array.isArray(d.kids_friendly) ? d.kids_friendly[0] : d.kids_friendly; return kf ? (kf.suitable ? `Yes (${kf.rating}/5)` : "No") : "N/A"; } },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground">{row.label}</td>
                    {destinations.slice(0, 2).map((d) => (
                      <td key={d.id} className="py-2 px-3 capitalize">{row.fn(d)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      )}

      {/* Tags */}
      {article.tags?.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default">{tag}</span>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* Related articles with cover images */}
      {relatedArticles.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-lg font-bold mb-5">More in {CATEGORY_LABELS[article.category]}</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedArticles.map((ra) => (
                <Link
                  key={ra.slug}
                  href={`/${locale}/blog/${ra.slug}`}
                  className="group rounded-xl border border-border bg-card/60 overflow-hidden transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  {ra.cover_image_url ? (
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={ra.cover_image_url}
                        alt={ra.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="h-28 bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent" />
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">{ra.title}</h4>
                    {ra.excerpt && <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{ra.excerpt}</p>}
                    <span className="mt-2 inline-block text-xs text-muted-foreground">{ra.reading_time} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Prev/Next Navigation */}
      {adjacentArticles && (adjacentArticles.prev || adjacentArticles.next) && (
        <ScrollReveal delay={0.05}>
          <div className="mt-12 border-t border-border pt-6 grid grid-cols-2 gap-4">
            {adjacentArticles.prev ? (
              <Link href={`/${locale}/blog/${adjacentArticles.prev.slug}`} className="group text-left rounded-xl border border-border bg-card/40 p-4 hover:border-primary/30 transition-all">
                <span className="text-xs text-muted-foreground">&larr; Previous</span>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 mt-1">{adjacentArticles.prev.title}</p>
              </Link>
            ) : <div />}
            {adjacentArticles.next ? (
              <Link href={`/${locale}/blog/${adjacentArticles.next.slug}`} className="group text-right rounded-xl border border-border bg-card/40 p-4 hover:border-primary/30 transition-all">
                <span className="text-xs text-muted-foreground">Next &rarr;</span>
                <p className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 mt-1">{adjacentArticles.next.title}</p>
              </Link>
            ) : <div />}
          </div>
        </ScrollReveal>
      )}

      {/* Back to all articles */}
      <div className="mt-6 text-center">
        <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          &larr; Back to all articles
        </Link>
      </div>

      {/* Closing */}
      <div className="mt-8 text-center">
        <p className="italic text-muted-foreground font-serif text-lg">Go with confidence.</p>
      </div>
    </article>
  );
}

/** Small destination thumbnail with graceful fallback */
function DestinationThumb({ id, name }: { id: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <Image
      src={`/images/destinations/${id}.jpg`}
      alt={name}
      width={40}
      height={40}
      className="rounded-lg object-cover shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

function parseContent(content: string): Array<{ heading?: string; paragraphs: string[] }> {
  if (!content) return [];
  const lines = content.split("\n");
  const sections: Array<{ heading?: string; paragraphs: string[] }> = [];
  let current: { heading?: string; paragraphs: string[] } = { paragraphs: [] };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      if (current.paragraphs.length > 0 || current.heading) {
        sections.push(current);
      }
      current = { heading: trimmed.replace(/^##\s+/, ""), paragraphs: [] };
    } else if (trimmed) {
      current.paragraphs.push(trimmed);
    }
  }
  if (current.paragraphs.length > 0 || current.heading) {
    sections.push(current);
  }
  return sections;
}

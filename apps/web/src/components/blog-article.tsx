"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";

const CATEGORY_LABELS: Record<string, string> = {
  "best-time": "Best Time to Visit",
  comparison: "Comparison",
  guide: "Intelligence Guide",
  "data-story": "Data Story",
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
      {/* Back to blog */}
      <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        ← All articles
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {CATEGORY_LABELS[article.category] || article.category}
          </span>
          {isDeepDive ? (
            <span className="rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-xs font-medium text-amber-400">Deep Dive</span>
          ) : (
            <span className="rounded-full bg-muted border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">Brief</span>
          )}
          <span className="text-sm text-muted-foreground">{article.reading_time} min read</span>
          <span className="text-sm text-muted-foreground">
            {new Date(article.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
        <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>
        {article.subtitle && (
          <p className="mt-2 text-xl text-muted-foreground">{article.subtitle}</p>
        )}
      </header>

      {/* Destination score cards (if article has linked destinations) */}
      {destinations.length > 0 && (
        <div className="mb-8 rounded-xl border border-border bg-card p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Destinations in this article
          </h3>
          <div className="flex flex-wrap gap-2">
            {destinations.map((d) => {
              const monthScore = d.destination_months?.find((m) => m.month === currentMonth)?.score;
              const stateName = Array.isArray(d.state) ? d.state[0]?.name : d.state?.name;
              return (
                <Link
                  key={d.id}
                  href={`/${locale}/destination/${d.id}`}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-primary/30 transition-colors"
                >
                  {monthScore !== undefined && (
                    <span className={`font-mono font-bold text-xs ${SCORE_COLORS[monthScore] ?? ""}`}>
                      {monthScore}/5
                    </span>
                  )}
                  <span className="font-medium">{d.name}</span>
                  {stateName && <span className="text-xs text-muted-foreground">{stateName}</span>}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Article content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="text-2xl font-bold mt-10 mb-4">{section.heading}</h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Monthly score table for linked destinations */}
      {destinations.length > 0 && destinations[0].destination_months && (
        <div className="mt-10 rounded-xl border border-border bg-card p-4 overflow-x-auto">
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
                        {score || "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Comparison table for comparison articles */}
      {article.category === "comparison" && destinations.length >= 2 && (
        <div className="mt-8 rounded-xl border border-border bg-card p-4 overflow-x-auto">
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
      )}

      {/* Tags */}
      {article.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag: string) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
      )}

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="text-lg font-bold mb-4">More in {CATEGORY_LABELS[article.category]}</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.slug}
                href={`/${locale}/blog/${ra.slug}`}
                className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30"
              >
                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">{ra.title}</h4>
                {ra.excerpt && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{ra.excerpt}</p>}
                <span className="mt-2 inline-block text-xs text-muted-foreground">{ra.reading_time} min read</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Prev/Next Navigation */}
      {adjacentArticles && (adjacentArticles.prev || adjacentArticles.next) && (
        <div className="mt-12 border-t border-border pt-6 grid grid-cols-2 gap-4">
          {adjacentArticles.prev ? (
            <Link href={`/${locale}/blog/${adjacentArticles.prev.slug}`} className="group text-left">
              <span className="text-xs text-muted-foreground">← Previous</span>
              <p className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 mt-1">{adjacentArticles.prev.title}</p>
            </Link>
          ) : <div />}
          {adjacentArticles.next ? (
            <Link href={`/${locale}/blog/${adjacentArticles.next.slug}`} className="group text-right">
              <span className="text-xs text-muted-foreground">Next →</span>
              <p className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-2 mt-1">{adjacentArticles.next.title}</p>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Back to all articles */}
      <div className="mt-6 text-center">
        <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to all articles
        </Link>
      </div>

      {/* Closing */}
      <div className="mt-8 text-center">
        <p className="italic text-muted-foreground font-serif text-lg">Go with confidence.</p>
      </div>
    </article>
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

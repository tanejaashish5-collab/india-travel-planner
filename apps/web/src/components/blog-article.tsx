"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { SCORE_COLORS, DIFFICULTY_COLORS } from "@/lib/design-tokens";
import { FadeIn, ScrollReveal } from "./animated-hero";
import { ArticleCallout } from "./article-callout";

const CATEGORY_LABELS: Record<string, string> = {
  "best-time": "Best Time to Visit",
  comparison: "Comparison",
  guide: "Intelligence Guide",
  "data-story": "Data Story",
  viral: "Viral",
};

const CATEGORY_COLORS: Record<string, string> = {
  "best-time": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  comparison: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  guide: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  "data-story": "bg-amber-500/10 text-amber-400 border-amber-500/30",
  viral: "bg-red-500/10 text-red-400 border-red-500/30",
};

const MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_SHORT = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Inline markdown renderer — supports **bold** only. Keep it tight; we
// don't need a full markdown stack for our editorial content.
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} className="text-foreground font-semibold">{p.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

// Parse the body of the "The List" section (data-story / ranked posts)
// into per-destination blocks. Each block begins `### N. Destination Name`
// and ends at the next `### ` or end-of-body. Extracts metadata, prose,
// bullets, and verdict so we can render each as a newsletter-style card
// with its own destination image.
function parseRankedItems(paragraphs: string[], destinations: Destination[]) {
  const body = paragraphs.join("\n\n");
  const regex = /###\s+\d+\.\s+([^\n]+)\n+([\s\S]*?)(?=\n###\s+\d+\.\s+|$)/g;
  const items: Array<{
    destination: Destination | null;
    name: string;
    elevation?: string;
    difficulty?: string;
    prose: string[];
    bullets: string[];
    verdict?: string;
  }> = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body))) {
    const name = match[1].trim();
    const raw = match[2].trim();
    const lines = raw.split("\n").map((l) => l.trim()).filter((l) => l && l !== "---");
    const prose: string[] = [];
    const bullets: string[] = [];
    let elevation: string | undefined;
    let difficulty: string | undefined;
    let verdict: string | undefined;
    for (const line of lines) {
      if (line.startsWith("- ")) {
        bullets.push(line.replace(/^-\s*/, ""));
      } else if (/\*\*Elevation:\*\*/i.test(line)) {
        const m = line.match(/\*\*Elevation:\*\*\s*([^·\n]+?)(?:\s*·\s*\*\*Difficulty:\*\*\s*(.+))?$/i);
        if (m) {
          elevation = m[1]?.trim();
          difficulty = m[2]?.trim();
        }
      } else if (/\*\*Verdict:\*\*/i.test(line)) {
        verdict = line.replace(/\*\*Verdict:\*\*\s*/i, "").trim();
      } else {
        prose.push(line);
      }
    }
    const destination =
      destinations.find((d) => d.name.toLowerCase() === name.toLowerCase()) ??
      destinations.find((d) => name.toLowerCase().includes(d.name.toLowerCase())) ??
      null;
    items.push({ destination, name, elevation, difficulty, prose, bullets, verdict });
  }
  return items;
}

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
  const isViral = article.category === "viral";
  const isDataStory = article.category === "data-story";
  // Number the body sections newsletter-style on ranked/data-story posts.
  // Newsletter Format 5 uses a big italic № 02, 03, 04 numeral next to each
  // section header; we mirror that here to invite the same eye-track.
  const numberSections = isDataStory && sections.length >= 3;
  const heroHeight = isViral ? "h-[32rem] sm:h-[36rem]" : isDataStory ? "h-[30rem] sm:h-[34rem] lg:h-[38rem]" : "h-80 sm:h-96 lg:h-[28rem]";
  const stateHeroLabel = (() => {
    const d = destinations[0];
    if (!d) return null;
    const s = Array.isArray(d.state) ? d.state[0] : d.state;
    return s?.name ?? null;
  })();
  const callouts: Array<{ type: "stat" | "pull_quote" | "verdict"; text: string; label?: string }> = article.callouts || [];

  return (
    <article>
      {/* Cinematic Cover Image Hero — title OVER image, newsletter Format 5 style.
          Darkened filter + bottom scrim so Fraunces-italic headline reads cleanly
          on any photograph. */}
      {article.cover_image_url ? (
        <div className={`relative -mx-4 sm:-mx-0 ${heroHeight} overflow-hidden rounded-2xl mb-8`}>
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ filter: "brightness(0.78) saturate(0.92)" }}
            priority
          />
          {/* Bottom scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />

          {/* Back to blog chip — top left */}
          <div className="absolute top-4 left-4 z-10">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/85 hover:bg-black/60 hover:text-white transition-all"
            >
              ← All articles
            </Link>
          </div>

          {/* Category + Depth badges — top right */}
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

          {/* Title overlay — bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-14 z-10">
            <div className="mx-auto max-w-4xl">
              {/* Vermillion stamp: № 01 · State */}
              {stateHeroLabel && (
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E55642] mb-4">
                  {isDataStory ? "№ 01 · " : ""}{stateHeroLabel}
                </div>
              )}
              <h1
                className="font-serif italic font-medium text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                {article.title}
              </h1>
              {article.subtitle && (
                <p
                  className="mt-4 font-serif italic text-lg sm:text-xl text-[#E55642]/90 leading-relaxed max-w-2xl"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {article.subtitle}
                </p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/70">
                <span>{article.reading_time} min read</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span>
                  {new Date(article.published_at).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* No-image fallback hero — keeps old floating-card pattern */
        <>
          <div className={`relative -mx-4 sm:-mx-0 ${heroHeight} overflow-hidden rounded-2xl mb-0 bg-gradient-to-br from-primary/20 via-violet-500/10 to-amber-500/10`}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
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
          <FadeIn>
            <div className="-mt-20 relative z-10 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/20 mb-8">
              <Link href={`/${locale}/blog`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
                ← All articles
              </Link>
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
        </>
      )}

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
        {sections.map((section, i) => {
          const sectionNum = numberSections ? String(i + 1).padStart(2, "0") : null;
          const isFirstProseBlock = i === 0 && section.paragraphs.length > 0;
          // Does this section's body contain a ranked list (### N. Name blocks)?
          const isRankedBody =
            numberSections &&
            destinations.length >= 3 &&
            section.paragraphs.some((p) => /^###\s+\d+\.\s+/.test(p));
          const rankedItems = isRankedBody ? parseRankedItems(section.paragraphs, destinations) : [];

          return (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div>
                {section.heading && numberSections ? (
                  <div className="flex items-start gap-5 mt-14 mb-5">
                    <span
                      className="font-serif italic font-medium text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-[-0.02em] text-foreground/90 flex-shrink-0"
                      style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                      aria-hidden="true"
                    >
                      {sectionNum}
                    </span>
                    <h2
                      className="font-serif italic font-medium text-2xl sm:text-3xl lg:text-4xl leading-[1.1] text-foreground mt-2"
                      style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                    >
                      {section.heading}
                    </h2>
                  </div>
                ) : section.heading ? (
                  <h2 className="text-2xl font-bold mt-10 mb-4">{section.heading}</h2>
                ) : null}

                {/* Pull-quote treatment for the very first paragraph of deep-dive
                    posts — mirrors the newsletter's 4px vermillion-border italic lede. */}
                {isFirstProseBlock && isDeepDive && section.paragraphs[0] && !isRankedBody && (
                  <div className="flex gap-5 mb-6">
                    <div className="w-1 bg-[#E55642] rounded-full flex-shrink-0" />
                    <p
                      className="font-serif italic font-medium text-xl sm:text-2xl leading-[1.35] text-foreground py-1"
                      style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                    >
                      {renderInline(section.paragraphs[0])}
                    </p>
                  </div>
                )}

                {/* RANKED ITEMS — newsletter-style per-destination cards
                    with image + metadata + prose + bullets + verdict + CTA */}
                {isRankedBody ? (
                  <div className="space-y-14 mt-8">
                    {rankedItems.map((item, idx) => {
                      const num = String(idx + 1).padStart(2, "0");
                      const d = item.destination;
                      const stateName = d ? (Array.isArray(d.state) ? d.state[0]?.name : d.state?.name) ?? null : null;
                      return (
                        <div key={idx} className="border-t border-border/40 pt-10">
                          {/* Giant numeral + metadata row */}
                          <div className="flex items-start gap-5 mb-5">
                            <span
                              className="font-serif italic font-medium text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-[-0.02em] text-foreground flex-shrink-0"
                              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                              aria-hidden="true"
                            >
                              {num}
                            </span>
                            <div className="flex-1 pt-2">
                              {stateName && (
                                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E55642] mb-2">
                                  {stateName}
                                </div>
                              )}
                              <h3
                                className="font-serif italic font-medium text-3xl sm:text-4xl lg:text-5xl leading-[1.05] tracking-[-0.01em] text-foreground"
                                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                              >
                                {item.name}
                              </h3>
                              {(item.elevation || item.difficulty) && (
                                <div className="mt-3 font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-muted-foreground">
                                  {[item.elevation, item.difficulty].filter(Boolean).join(" · ")}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Full-width editorial image */}
                          {d && (
                            <Link
                              href={`/${locale}/destination/${d.id}`}
                              className="block relative aspect-[16/9] overflow-hidden rounded-xl mb-6 group"
                            >
                              <Image
                                src={`/images/destinations/${d.id}.jpg`}
                                alt={d.name}
                                fill
                                sizes="(min-width: 1024px) 800px, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ filter: "brightness(0.88) saturate(0.92)" }}
                              />
                            </Link>
                          )}

                          {/* Prose */}
                          {item.prose.map((p, k) => (
                            <p key={k} className="text-muted-foreground leading-relaxed mb-4">
                              {renderInline(p)}
                            </p>
                          ))}

                          {/* Bullets — things to do */}
                          {item.bullets.length > 0 && (
                            <ul className="space-y-2 my-5 pl-0 list-none">
                              {item.bullets.map((b, k) => (
                                <li key={k} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                                  <span className="text-[#E55642] flex-shrink-0 mt-1.5 text-[10px]">●</span>
                                  <span>{renderInline(b)}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Vermillion verdict callout */}
                          {item.verdict && (
                            <div className="mt-5 flex gap-4 rounded-lg border border-[#E55642]/30 bg-[#E55642]/5 p-4">
                              <div className="w-1 bg-[#E55642] rounded-full flex-shrink-0" />
                              <div>
                                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E55642] mb-1.5">
                                  Verdict
                                </div>
                                <p className="font-serif italic text-base sm:text-lg leading-snug text-foreground" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>
                                  {renderInline(item.verdict)}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* CTA — read full guide */}
                          {d && (
                            <div className="mt-6">
                              <Link
                                href={`/${locale}/destination/${d.id}`}
                                className="inline-block font-medium text-sm tracking-[0.14em] uppercase text-foreground border-b border-muted-foreground/50 pb-1 hover:text-[#E55642] hover:border-[#E55642]/60 transition-colors"
                              >
                                Read the {d.name} guide →
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    {section.paragraphs.slice(isFirstProseBlock && isDeepDive ? 1 : 0).map((p, j) => {
                      // Basic markdown: ### h3, - bullet list, **bold**
                      if (/^###\s+/.test(p)) {
                        return (
                          <h3 key={j} className="font-semibold text-xl sm:text-2xl text-foreground mt-8 mb-3">
                            {renderInline(p.replace(/^###\s+/, ""))}
                          </h3>
                        );
                      }
                      if (/^-\s+/.test(p)) {
                        const items = p.split(/\n+/).filter((l) => /^-\s+/.test(l)).map((l) => l.replace(/^-\s*/, ""));
                        return (
                          <ul key={j} className="space-y-2 my-4 pl-0 list-none">
                            {items.map((li, k) => (
                              <li key={k} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                                <span className="text-[#E55642] flex-shrink-0 mt-1.5 text-[10px]">●</span>
                                <span>{renderInline(li)}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (/^---+$/.test(p.trim())) return null;
                      return (
                        <p key={j} className="text-muted-foreground leading-relaxed mb-4">
                          {renderInline(p)}
                        </p>
                      );
                    })}
                  </>
                )}

                {isViral && callouts[i] && (
                  <ArticleCallout
                    type={callouts[i].type}
                    text={callouts[i].text}
                    label={callouts[i].label}
                  />
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* WhatsApp share button for viral articles */}
      {isViral && (
        <ScrollReveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " — " + (typeof window !== "undefined" ? window.location.href : ""))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-6 py-3 text-sm font-medium text-[#25D366] hover:bg-[#25D366]/20 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share on WhatsApp
            </a>
          </div>
        </ScrollReveal>
      )}

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

      {/* Newsletter hook — high-intent moment after article body */}
      <ScrollReveal delay={0.1}>
        <div className="mt-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-amber-500/5 p-6 sm:p-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            The Window · Every Sunday
          </p>
          <h3 className="text-xl sm:text-2xl font-bold">Liked this? Get one every Sunday.</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Best score of the week, one honest skip, road updates. Four minutes. No spam.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/${locale}/newsletter`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Subscribe free
            </Link>
            <Link
              href={`/${locale}/the-window`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              See past issues
            </Link>
          </div>
        </div>
      </ScrollReveal>

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

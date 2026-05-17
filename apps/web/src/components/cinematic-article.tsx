"use client";

/* ============================================================
   <CinematicArticle> — page template for long-form editorial:
   blog posts, india-travel, nakshiq-100, press releases.

   Composes:
     <Nav />
     <Hero (optional image + masthead overlay) />
     <Article body (Prose / PullQuote / Ledger / images inline) />
     <Byline + dateline footer />
     <CinematicRelatedRail />
     <Footer />

   The `children` prop is the article body — pass the structured
   editorial helpers (`<Prose>`, `<PullQuote>`, `<CinematicLedger>`,
   `<CinematicCard>` for inline rails) and they inherit the
   cinematic typography automatically.

   Usage:
     <CinematicArticle
       kicker="Field notes · May 2026"
       title="Why monsoon is the best time for half of India."
       dek="The cliché that monsoon is low season is wrong..."
       hero={{ src: "/img.jpg", alt: "Rain on a banana leaf" }}
       byline={{ author: "NakshIQ editorial", role: "Editor" }}
       publishedAt="2026-05-12"
     >
       <Prose>...</Prose>
       <PullQuote>...</PullQuote>
     </CinematicArticle>
   ============================================================ */

import type { ReactNode } from "react";
import Image from "next/image";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "./cinematic-related-rail";

export type CinematicArticleProps = {
  kicker: string;
  title: string;
  dek?: string;
  /** Optional hero image — full-bleed banner above the masthead. */
  hero?: { src: string; alt: string };
  /** Author + role footer. */
  byline?: { author: string; role?: string };
  /** ISO 8601 publish date — rendered as a mono caption. */
  publishedAt?: string;
  /** Reading time estimate ("6 min read"). */
  readingTime?: string;
  /** The article body — Prose / PullQuote / Ledger / inline cards. */
  children: ReactNode;
  /** When true, hides the cross-category related rail above the footer.
      Use for press releases or pages where the rail would be off-tone. */
  hideRelatedRail?: boolean;
};

export function CinematicArticle({
  kicker,
  title,
  dek,
  hero,
  byline,
  publishedAt,
  readingTime,
  children,
  hideRelatedRail = false,
}: CinematicArticleProps) {
  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      {/* Hero — optional full-bleed image with paper-tinted veil */}
      {hero && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "min(60vh, 600px)",
            overflow: "hidden",
            background: "var(--paper-2)",
          }}
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,10,8,0.35) 0%, rgba(10,10,8,0.65) 100%)",
            }}
          />
        </div>
      )}

      <main
        id="main-content"
        className="nq-grain"
        style={{
          position: "relative",
          padding: hero ? "72px 24px 96px" : "140px 24px 96px",
        }}
      >
        {/* Masthead — narrower than list page since article body is centered too */}
        <header
          style={{
            maxWidth: 820,
            margin: "0 auto 48px",
          }}
        >
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 20,
              letterSpacing: "0.22em",
            }}
          >
            {kicker}
          </p>
          <Title
            as="h1"
            className="nq-display"
            style={{
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 1.0,
              letterSpacing: "-0.022em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {title}
          </Title>
          {dek && (
            <p
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
                color: "var(--bone-dim)",
                marginTop: 24,
                maxWidth: 720,
              }}
            >
              {dek}
            </p>
          )}
        </header>

        {/* Article body */}
        <article
          style={{
            maxWidth: 820,
            margin: "0 auto",
          }}
        >
          {children}
        </article>

        {/* Byline + dateline */}
        {(byline || dateLabel || readingTime) && (
          <footer
            style={{
              maxWidth: 820,
              margin: "64px auto 0",
              paddingTop: 28,
              borderTop: "1px solid var(--hair)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            {byline && (
              <div>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 6,
                    letterSpacing: "0.18em",
                  }}
                >
                  {byline.role ?? "By"}
                </p>
                <p
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--bone)",
                    margin: 0,
                    letterSpacing: "-0.012em",
                  }}
                >
                  {byline.author}
                </p>
              </div>
            )}
            <p
              className="nq-mono"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
                margin: 0,
              }}
            >
              {[dateLabel, readingTime].filter(Boolean).join(" · ")}
            </p>
          </footer>
        )}
      </main>

      {!hideRelatedRail && <CinematicRelatedRail />}
      <Footer />
    </div>
  );
}

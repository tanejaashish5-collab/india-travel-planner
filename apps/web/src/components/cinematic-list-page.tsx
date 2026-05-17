"use client";

/* ============================================================
   <CinematicListPage> — page template for any "list of things"
   hub: blog, routes, treks, festivals, camping, stays,
   weekend-from, collections.

   Composes the cinematic page skeleton:
     <div nakshiq-cinema>
       <CinemaStyles />
       <Nav />
       <main nq-grain>
         <Masthead kicker + display title + dek />
         <FilterRail (optional) />
         <CinematicCard grid />
         <CinematicPagination />
       </main>
       <Footer />

   Server components calling this should pre-fetch their items
   and pass them as `cards`. Filters are optional — if you don't
   pass any, the rail is hidden. Pagination same.

   Usage:
     <CinematicListPage
       kicker="Field notes · Issue Nº 47"
       title="Reading from the road."
       dek="Long-form on regions, festivals, and the offbeat circuit."
       cards={posts.map(p => ({ ... }))}
       pagination={{ current: 1, total: 8, basePath: "/en/blog" }}
     />
   ============================================================ */

import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicCard, type CinematicCardProps } from "./cinematic-card";
import { CinematicPagination } from "./cinematic-pagination";

export type CinematicListPageProps = {
  /** Small all-caps line above the title. "Issue Nº 47 · Field notes" etc. */
  kicker: string;
  /** The display headline (Fraunces italic, auto-vermillion trailing dot). */
  title: string;
  /** Optional sub-headline below the title. Prose meta. */
  dek?: string;
  /** Cards to render in the grid. Each is a CinematicCardProps payload. */
  cards: CinematicCardProps[];
  /** Optional filter rail rendered above the grid. */
  filters?: ReactNode;
  /** Optional pagination footer. Hidden when total ≤ 1. */
  pagination?: { current: number; total: number; basePath: string };
  /** Optional empty-state node when `cards` is []. */
  empty?: ReactNode;
};

export function CinematicListPage({
  kicker,
  title,
  dek,
  cards,
  filters,
  pagination,
  empty,
}: CinematicListPageProps) {
  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      <main
        id="main-content"
        className="nq-grain nq-glow-bookend"
        style={{
          position: "relative",
          padding: "140px 24px 96px",
        }}
      >
        {/* Masthead */}
        <header
          style={{
            maxWidth: 1100,
            margin: "0 auto 64px",
          }}
        >
          <p
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 24,
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
              fontSize: "clamp(40px, 7vw, 92px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            {title}
          </Title>
          {dek && (
            <p
              className="nq-meta"
              style={{
                color: "var(--bone-dim)",
                marginTop: 28,
                maxWidth: 720,
                fontSize: 15,
                lineHeight: 1.6,
                letterSpacing: "0.04em",
              }}
            >
              {dek}
            </p>
          )}
        </header>

        {/* Optional filter rail */}
        {filters && (
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto 48px",
              paddingBottom: 24,
              borderBottom: "1px solid var(--hair)",
            }}
          >
            {filters}
          </div>
        )}

        {/* Cards grid or empty state */}
        {cards.length === 0 ? (
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              textAlign: "center",
              padding: "80px 0",
              color: "var(--bone-dim)",
              fontFamily: "var(--cinema-display)",
              fontStyle: "italic",
              fontSize: 22,
            }}
          >
            {empty ?? "Nothing here yet."}
          </div>
        ) : (
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 48,
            }}
          >
            {cards.map((card, i) => (
              <CinematicCard key={card.href ?? i} {...card} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.total > 1 && (
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <CinematicPagination {...pagination} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

"use client";

/* ============================================================
   <CinematicGuide> — page template for the /guide/[sub] family
   (visa, scams, food-safety, etiquette, packing, sim-card,
   transport-overview, first-trip-india, currency, train booking,
   permits, scenarios/[slug]). Reference-doc tone — utilitarian
   but still magazine.

   Composes:
     <Nav />
     <Masthead (kicker + title + dek) />
     2-col layout:
       Sidebar — sticky TOC (desktop only)
       Main    — Prose / PullQuote / Ledger sections + "Next" footer
     <CinematicRelatedRail />
     <Footer />

   Sections drive the TOC — each gets an auto-generated anchor.
   On mobile the TOC collapses into an accordion above the body.

   Usage:
     <CinematicGuide
       kicker="Guides · Travel basics"
       title="A visa to India, plain English."
       dek="What you need, what it costs, what tripped 12 people up."
       sections={[
         { id: "what-you-need", title: "What you need", body: <Prose>...</Prose> },
         { id: "what-it-costs", title: "What it costs", body: <CinematicLedger {...} /> },
       ]}
       nextGuide={{ href: "/en/guide/permits", title: "Permits & protected areas" }}
     />
   ============================================================ */

import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { CinemaStyles } from "@/components/landing-cinema/cinema-styles";
import { Title } from "@/components/landing-cinema/editorial";
import { CinematicRelatedRail } from "./cinematic-related-rail";

export type CinematicGuideSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export type CinematicGuideProps = {
  kicker: string;
  title: string;
  dek?: string;
  sections: CinematicGuideSection[];
  /** Optional "Next guide" footer pointer for sequential reading. */
  nextGuide?: { href: string; title: string };
  /** Hide the cross-category rail above the footer. Default false. */
  hideRelatedRail?: boolean;
};

export function CinematicGuide({
  kicker,
  title,
  dek,
  sections,
  nextGuide,
  hideRelatedRail = false,
}: CinematicGuideProps) {
  return (
    <div className="nakshiq-cinema" style={{ minHeight: "100vh" }}>
      <CinemaStyles />
      <Nav />

      <main
        id="main-content"
        className="nq-grain"
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
              fontSize: "clamp(40px, 7vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.024em",
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

        {/* 2-col layout: TOC sidebar + main body */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 48,
          }}
          className="cinematic-guide-layout"
        >
          {/* Mobile TOC — accordion-ish; sticky positioning kicks in via media query below */}
          <aside
            aria-label="Contents"
            style={{
              alignSelf: "start",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                marginBottom: 14,
                letterSpacing: "0.22em",
              }}
            >
              Contents
            </p>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                borderLeft: "1px solid var(--hair)",
                paddingLeft: 18,
              }}
            >
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    style={{
                      fontFamily: "var(--cinema-ui)",
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: "var(--bone-dim)",
                      textDecoration: "none",
                      transition: "color 200ms ease",
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <span
                      className="nq-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--vermillion)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Body */}
          <div>
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                style={{
                  marginBottom: 80,
                  scrollMarginTop: 100,
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "clamp(28px, 4vw, 42px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.018em",
                    color: "var(--bone)",
                    margin: "0 0 28px",
                  }}
                >
                  {s.title}
                </h2>
                <div>{s.body}</div>
              </section>
            ))}

            {/* Next-guide pointer */}
            {nextGuide && (
              <a
                href={nextGuide.href}
                className="nq-entry-link"
                style={{
                  display: "block",
                  padding: "28px 0",
                  marginTop: 64,
                  borderTop: "1px solid var(--hair)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background 220ms ease",
                }}
              >
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 8,
                    letterSpacing: "0.22em",
                  }}
                >
                  Next guide
                </p>
                <h3
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: 28,
                    lineHeight: 1.2,
                    color: "var(--bone)",
                    margin: 0,
                    transition: "color 220ms ease",
                  }}
                >
                  {nextGuide.title}
                  <span
                    aria-hidden
                    className="nq-entry-arrow"
                    style={{
                      marginLeft: 12,
                      color: "var(--vermillion)",
                    }}
                  >
                    →
                  </span>
                </h3>
              </a>
            )}
          </div>
        </div>

        {/* Desktop sticky-sidebar override — opt in via media query.
           Uses a className-scoped media block so we don't pollute global CSS.
           Tailwind's @apply doesn't help here because the layout uses
           inline grid-template-columns. */}
        <style>{`
          @media (min-width: 900px) {
            .cinematic-guide-layout {
              grid-template-columns: 220px minmax(0, 720px) !important;
            }
            .cinematic-guide-layout > aside {
              position: sticky;
              top: 120px;
            }
          }
        `}</style>
      </main>

      {!hideRelatedRail && <CinematicRelatedRail />}
      <Footer />
    </div>
  );
}

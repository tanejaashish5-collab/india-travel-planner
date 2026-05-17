"use client";

/* ============================================================
   Cinematic related rail — cross-category outbound links from a
   destination page. Before this shipped, every cinematic
   destination page had only 2 outbound links (/explore +
   /methodology), orphaning /blog, /guide, /routes, etc. from the
   internal-link graph. This rail puts 8 cross-category links on
   every destination, restoring crawl-depth + ranking-juice flow.

   Phase 1 (now): static curated links to each category HUB. Every
   destination gets the same 8 links — fast to ship, single source
   of truth, no DB query risk.

   Phase 4 (later): swap to per-destination dynamic queries —
   "Guides for this region", "Routes through here", "Reading
   tagged with this state" — pulling 3 of each from the DB. The
   layout (3 columns × 3 cards) is ready for that upgrade.
   ============================================================ */

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Card = {
  href: (l: string) => string;
  kicker: string;
  title: string;
  dek: string;
};

const CARDS: Card[] = [
  {
    href: (l) => `/${l}/guide`,
    kicker: "Guides",
    title: "Visa, scams, food, packing.",
    dek: "Everything the guidebook won't tell you — written for India in 2026.",
  },
  {
    href: (l) => `/${l}/blog`,
    kicker: "Blog",
    title: "Field notes from the road.",
    dek: "Long-form reads on regions, festivals, and the offbeat circuit.",
  },
  {
    href: (l) => `/${l}/routes`,
    kicker: "Road trips",
    title: "Curated multi-day routes.",
    dek: "Driving itineraries with day-by-day stops, distance, and difficulty.",
  },
  {
    href: (l) => `/${l}/collections`,
    kicker: "Collections",
    title: "Themed reading lists.",
    dek: "Wettest places. Sacred lakes. Solo-female-safe. Curated cuts.",
  },
  {
    href: (l) => `/${l}/nakshiq-100`,
    kicker: "NakshIQ 100",
    title: "The 100 best destination-months.",
    dek: "India's highest-scoring places, ranked across all 12 months.",
  },
  {
    href: (l) => `/${l}/the-window`,
    kicker: "The Window",
    title: "Our weekly newsletter, archived.",
    dek: "One honest spread, every Sunday. The full back catalogue.",
  },
  {
    href: (l) => `/${l}/tourist-traps`,
    kicker: "Skip list",
    title: "What we'd skip — and what we'd do instead.",
    dek: "Overhyped places with honest alternatives.",
  },
  {
    href: (l) => `/${l}/india-travel`,
    kicker: "First trip",
    title: "Planning your first time in India.",
    dek: "Safety, scams, what to wear, food survival, solo female travel.",
  },
];

export function CinematicRelatedRail() {
  const locale = useLocale();
  const t = useTranslations("footer");

  return (
    <section
      aria-label={t("moreTitle")}
      style={{
        maxWidth: 1200,
        margin: "120px auto 80px",
        padding: "0 24px",
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
        ALSO ON NAKSHIQ
      </p>
      <h2
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(28px, 4vw, 44px)",
          lineHeight: 1.05,
          letterSpacing: "-0.018em",
          color: "var(--bone)",
          margin: "0 0 48px",
          maxWidth: 720,
        }}
      >
        Eight more rooms in the magazine.
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 1,
          background: "var(--hair)",
          borderTop: "1px solid var(--hair)",
          borderBottom: "1px solid var(--hair)",
        }}
      >
        {CARDS.map((card) => (
          <Link
            key={card.kicker}
            href={card.href(locale)}
            className="nq-entry-link"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "28px 24px",
              background: "var(--paper)",
              textDecoration: "none",
              color: "inherit",
              minHeight: 200,
              transition: "background 220ms ease",
            }}
          >
            <p
              className="nq-kicker"
              style={{
                color: "var(--vermillion)",
                letterSpacing: "0.18em",
                margin: 0,
              }}
            >
              {card.kicker}
            </p>
            <h3
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.2,
                letterSpacing: "-0.012em",
                color: "var(--bone)",
                margin: 0,
                transition: "color 220ms ease",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--cinema-ui)",
                fontSize: 13,
                lineHeight: 1.55,
                color: "var(--bone-dim)",
                margin: 0,
              }}
            >
              {card.dek}
            </p>
            <span
              aria-hidden
              className="nq-entry-arrow"
              style={{
                marginTop: "auto",
                fontFamily: "var(--cinema-mono)",
                fontSize: 14,
                color: "var(--vermillion)",
                transition: "transform 220ms ease, color 220ms ease",
              }}
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

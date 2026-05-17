"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { CINEMATIC_DESTINATIONS } from "@/lib/cinematic-destinations";
import {
  FOOTER_GROUPS,
  FOOTER_LEGAL_LINKS,
} from "@/lib/site-directory";

/* ============================================================
   Footer — TWO variants by design.

   1) CINEMATIC variant (cinematic pages): 4-column magazine
      sitemap in cream-on-paper palette. Replaces the previous
      6-link strip on every cinematic page so /blog, /guide,
      /routes, /treks, etc. are reachable from the bottom of the
      page (the cinematic header only surfaces 6 magazine links).

   2) LEGACY variant (non-cinematic pages): slim single-row strip
      kept as-is. Old design pages still render the legacy variant.

   Detection mirrors the cinematic allowlist in nav.tsx — change
   one, change both.

   Source of truth for cinematic link groups:
   apps/web/src/lib/site-directory.ts
   ============================================================ */

// Same launch-date derivation as helpers.ts and nav.tsx.
function getIssueNumber(now: Date = new Date()): number {
  const launch = new Date("2022-07-01T00:00:00Z");
  const months =
    (now.getUTCFullYear() - launch.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - launch.getUTCMonth());
  return Math.max(1, months + 1);
}

export function Footer({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stats: _stats,
}: {
  stats?: {
    destinations: number;
    places: number;
    festivals: number;
    traps: number;
    collections: number;
  };
} = {}) {
  const locale = useLocale();
  const t = useTranslations("footer");
  const pathname = usePathname();
  const issueNum = getIssueNumber();
  const year = new Date().getFullYear();

  /* Cinematic detection — must stay in sync with the same lists in
     nav.tsx so chrome (nav style) and body (footer style) flip
     together. */
  const CINEMATIC_PAGE_PATHS = [
    `/${locale}/about`,
    `/${locale}/methodology`,
    `/${locale}/privacy`,
    `/${locale}/terms`,
    `/${locale}/cookies`,
    `/${locale}/contact`,
    `/${locale}/tourist-traps`,
    `/${locale}/explore`,
    `/${locale}/collections`,
    `/${locale}/plan`,
    `/${locale}/the-window`,
    // Phase 3 Tier 1 (S54) — content hub pages
    `/${locale}/blog`,
    `/${locale}/india-travel`,
    `/${locale}/nakshiq-100`,
    `/${locale}/guide/visa`,
    `/${locale}/guide/permits`,
    `/${locale}/guide/scams`,
    `/${locale}/guide/etiquette`,
    `/${locale}/guide/food-safety`,
    `/${locale}/guide/packing`,
    `/${locale}/guide/sim-card`,
    `/${locale}/guide/transport-overview`,
    `/${locale}/guide/currency`,
    `/${locale}/guide/book-indian-trains`,
    `/${locale}/guide/first-trip-india`,
    // Phase 3 Tier 2 (S54) — discovery hubs
    `/${locale}/routes`,
    `/${locale}/treks`,
    `/${locale}/camping`,
    `/${locale}/festivals`,
    `/${locale}/stays`,
    // Phase 3 Tier 3 (S54) — geography
    `/${locale}/states`,
    `/${locale}/superlatives`,
    // Phase 3 Tier 4 (S54) — weekend-from cluster
    `/${locale}/weekend-from`,
    // Phase 3 Tier 5 (S54) — planning tools
    `/${locale}/build-route`,
    `/${locale}/compare`,
    `/${locale}/cost-index`,
    `/${locale}/explore-by-persona`,
    `/${locale}/gap-year`,
    `/${locale}/permits`,
    `/${locale}/risk-quiz`,
    `/${locale}/road-conditions`,
    `/${locale}/where-to-go`,
    `/${locale}/arrival`,
    // Phase 3 Tier 6 (S54) — comparison hubs
    `/${locale}/vs`,
    `/${locale}/india-vs`,
    // Phase 3 Tier 7 (S54) — editorial + brand surfaces
    `/${locale}/newsletter`,
    `/${locale}/press`,
    `/${locale}/editorial-policy`,
    `/${locale}/corrections`,
    `/${locale}/transparency`,
    `/${locale}/sos`,
    `/${locale}/social`,
    `/${locale}/more`,
    // Phase 3 Tier 8 (S54) — account surfaces (app shell)
    `/${locale}/ask`,
    `/${locale}/saved`,
    `/${locale}/trip`,
    `/${locale}/membership`,
  ];
  const CINEMATIC_PAGE_PREFIXES = [
    `/${locale}/skip-list/`,
    `/${locale}/blog/`,
    `/${locale}/guide/scenarios/`,
    `/${locale}/routes/`,
    // Tier 2 children (S54) — filter pages now cinematic
    `/${locale}/treks/`,
    `/${locale}/festivals/`,
    `/${locale}/stays/`,
    `/${locale}/camping/`,
    // Tier 3 children (S54) — geography
    `/${locale}/state/`,
    `/${locale}/region/`,
    `/${locale}/india/`,
    `/${locale}/family/`,
    `/${locale}/with-kids/`,
    // Tier 4 (S54) — weekend-from-<city> (19 metros)
    `/${locale}/weekend-from-`,
    // Tier 5 (S54) — planning tools children
    `/${locale}/cost-index/`,
    `/${locale}/gap-year/`,
    `/${locale}/arrival/`,
    `/${locale}/where-to-go/`,
    `/${locale}/for/`,
    // Tier 6 (S54) — comparison detail pages
    `/${locale}/vs/`,
    `/${locale}/india-vs/`,
    // Tier 8 (S54) — shared trip board
    `/${locale}/trip/`,
    // Post-S54 (2026-05-17) — /collections/[id] migrated to cinematic shell.
    `/${locale}/collections/`,
  ];
  const isCinematicPage =
    CINEMATIC_PAGE_PATHS.includes(pathname) ||
    CINEMATIC_PAGE_PREFIXES.some((p) => pathname.startsWith(p));
  const isCinematicDestination = Array.from(CINEMATIC_DESTINATIONS).some(
    (slug) =>
      pathname === `/${locale}/destination/${slug}` ||
      pathname.startsWith(`/${locale}/destination/${slug}/`),
  );
  const isCinematic = isCinematicPage || isCinematicDestination;

  if (isCinematic) {
    return (
      <footer
        className="nakshiq-cinema"
        style={{
          position: "relative",
          background: "var(--paper)",
          color: "var(--bone)",
          borderTop: "1px solid var(--hair)",
          marginTop: 80,
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: 1500,
            padding: "72px 24px 40px",
          }}
        >
          {/* Top — Naksh.iq mark + tagline */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 24,
              marginBottom: 56,
              paddingBottom: 24,
              borderBottom: "1px solid var(--hair)",
            }}
          >
            <Link
              href={`/${locale}`}
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: 28,
                letterSpacing: "-0.015em",
                color: "var(--bone)",
                textDecoration: "none",
                lineHeight: 1,
              }}
            >
              Naksh<span style={{ color: "var(--vermillion)" }}>.</span>iq
            </Link>
            <span
              className="nq-mono"
              style={{
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
              }}
            >
              ISSUE Nº {issueNum} · {year}
            </span>
          </div>

          {/* 4-column sitemap — responsive grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 48,
              marginBottom: 56,
            }}
          >
            {FOOTER_GROUPS.map((group) => (
              <div key={group.titleKey}>
                <p
                  className="nq-kicker"
                  style={{
                    color: "var(--vermillion)",
                    marginBottom: 18,
                    letterSpacing: "0.18em",
                  }}
                >
                  {t(`section.${group.titleKey}`)}
                </p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {group.links.map((link) => (
                    <li key={link.labelKey} style={{ marginBottom: 12 }}>
                      <Link
                        href={link.href(locale)}
                        style={{
                          fontFamily: "var(--cinema-ui)",
                          fontSize: 14,
                          lineHeight: 1.4,
                          color: "var(--bone-dim)",
                          textDecoration: "none",
                          transition: "color 200ms ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "var(--bone)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--bone-dim)";
                        }}
                      >
                        {t(`link.${link.labelKey}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom — legal + tagline */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              paddingTop: 32,
              borderTop: "1px solid var(--hair)",
            }}
          >
            <div
              className="nq-mono"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 20,
                fontFamily: "var(--cinema-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--bone-faint)",
              }}
            >
              <span>© {year} NakshIQ</span>
              {FOOTER_LEGAL_LINKS.map((link) => (
                <Link
                  key={link.labelKey}
                  href={link.href(locale)}
                  style={{
                    color: "var(--bone-faint)",
                    textDecoration: "none",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--bone)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--bone-faint)";
                  }}
                >
                  {t(`link.${link.labelKey}`)}
                </Link>
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--cinema-display)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--bone)",
              }}
            >
              {t("goWithConfidence")}
            </span>
          </div>
        </div>
      </footer>
    );
  }

  /* ─── Legacy variant (unchanged behaviour from prior implementation) ─── */
  return (
    <footer className="relative mt-16 border-t border-border/40 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left — logo + 3 links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/${locale}`} className="font-fraunces italic text-xl text-foreground">
              Naksh<span className="text-[#E55642]">.</span>iq
            </Link>
            <Link
              href={`/${locale}/methodology`}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Editorial
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-sm uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right — © · Issue Nº · italic sign-off */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-muted-foreground/70 tracking-[0.06em]">
            <span>
              © {year} NakshIQ · Issue Nº {issueNum}
            </span>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-foreground transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href={`/${locale}/cookies`}
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
            <span className="font-fraunces italic text-base text-foreground">
              Go with confidence.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

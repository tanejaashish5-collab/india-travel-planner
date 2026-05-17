"use client";

/* ============================================================
   <CinematicCard> — magazine-style preview card. The atom that
   powers every grid in cinematic list pages (blog, routes, treks,
   festivals, stays, weekend-from, collections, etc.).

   Variants:
     image     — image-led: cover photo top, kicker + title + dek
                 below (default — used by blog, routes, treks).
     text-only — no image; just kicker + Fraunces italic title +
                 dek + footer meta. Magazine "essay" feel. Used by
                 guides + editorial list pages.
     numeric   — numbered ledger row (Nº 01 — Title · meta). Used
                 by NakshIQ 100 + ranked lists.

   The card is a single clickable surface — the whole tile links.
   Hover lifts the image (Ken-Burns scale), tints title to
   vermillion, and slides the trailing arrow. Matches the
   nq-entry-link pattern in cinema.css.

   Usage:
     <CinematicCard
       href="/en/blog/best-time-to-visit-india"
       kicker="May 2026"
       title="The honest case for monsoon travel."
       dek="Why the cliché of monsoon-as-low-season is wrong for half the country."
       image={{ src: "/img.jpg", alt: "Rain on a banana leaf" }}
       meta="6 min read"
     />
   ============================================================ */

import type { ReactNode } from "react";
import Image from "next/image";

type Variant = "image" | "text-only" | "numeric";

export type CinematicCardProps = {
  href: string;
  kicker?: string;
  title: string;
  dek?: ReactNode;
  meta?: string;
  /** Required when variant="image" or unset; ignored otherwise. */
  image?: { src: string; alt: string };
  /** Required when variant="numeric". */
  number?: number | string;
  variant?: Variant;
};

export function CinematicCard({
  href,
  kicker,
  title,
  dek,
  meta,
  image,
  number,
  variant = image ? "image" : "text-only",
}: CinematicCardProps) {
  const isImage = variant === "image" && image;
  const isNumeric = variant === "numeric";

  return (
    <a
      href={href}
      className="nq-entry-link"
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        background: "transparent",
        gap: 14,
        padding: isNumeric ? "20px 0" : 0,
        borderTop: isNumeric ? "1px solid var(--hair)" : undefined,
        transition: "background 220ms ease",
      }}
    >
      {/* Image variant — cover photo on top */}
      {isImage && image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            overflow: "hidden",
            background: "var(--paper-2)",
            marginBottom: 4,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              transition: "transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            className="nq-card-image"
          />
        </div>
      )}

      {/* Numeric variant — Nº prefix on the line above the title */}
      {isNumeric && number !== undefined && (
        <p
          className="nq-mono"
          style={{
            fontFamily: "var(--cinema-mono)",
            fontSize: 13,
            letterSpacing: "0.18em",
            color: "var(--vermillion)",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Nº {String(number).padStart(2, "0")}
        </p>
      )}

      {/* Kicker — always above the title when present */}
      {kicker && !isNumeric && (
        <p
          className="nq-kicker"
          style={{
            color: "var(--vermillion)",
            margin: 0,
            letterSpacing: "0.18em",
          }}
        >
          {kicker}
        </p>
      )}

      {/* Title — Fraunces italic, the visual anchor */}
      <h3
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: variant === "text-only" ? 28 : 22,
          lineHeight: 1.2,
          letterSpacing: "-0.014em",
          color: "var(--bone)",
          margin: 0,
          transition: "color 220ms ease",
        }}
      >
        {title}
      </h3>

      {/* Dek — body copy under the title */}
      {dek && (
        <p
          style={{
            fontFamily: "var(--cinema-ui)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--bone-dim)",
            margin: 0,
            maxWidth: "60ch",
          }}
        >
          {dek}
        </p>
      )}

      {/* Footer meta row — mono caps */}
      {meta && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginTop: dek ? "auto" : 0,
            paddingTop: dek ? 14 : 0,
            borderTop: dek ? "1px solid var(--hair)" : undefined,
          }}
        >
          <span
            className="nq-mono"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 11,
              color: "var(--bone-faint)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {meta}
          </span>
          <span
            aria-hidden
            className="nq-entry-arrow"
            style={{
              fontFamily: "var(--cinema-mono)",
              fontSize: 14,
              color: "var(--vermillion)",
              transition: "transform 220ms ease",
            }}
          >
            →
          </span>
        </div>
      )}
    </a>
  );
}

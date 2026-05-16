"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export function CinematicBreadcrumb({
  stateName,
  stateId,
  destinationName,
}: {
  stateName: string;
  stateId: string;
  destinationName: string;
}) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const exploreLabel = (() => {
    try {
      return t("explore");
    } catch {
      return "Explore";
    }
  })();

  const sep = (
    <span
      aria-hidden="true"
      style={{
        color: "var(--bone-faint)",
        margin: "0 10px",
        fontSize: 11,
      }}
    >
      /
    </span>
  );

  const linkStyle: React.CSSProperties = {
    color: "var(--bone-dim)",
    textDecoration: "none",
    transition: "color 160ms ease",
  };

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        position: "relative",
        zIndex: 4,
        fontFamily: "var(--cinema-mono, ui-monospace)",
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      <Link
        href={`/${locale}/explore`}
        style={linkStyle}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "var(--bone-dim)")
        }
      >
        {exploreLabel}
      </Link>
      {sep}
      <Link
        href={`/${locale}/state/${stateId}`}
        style={linkStyle}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color =
            "var(--vermillion)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = "var(--bone-dim)")
        }
      >
        {stateName}
      </Link>
      {sep}
      <span style={{ color: "var(--bone)" }}>{destinationName}</span>
    </nav>
  );
}

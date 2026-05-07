"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { destinationImage } from "@/lib/image-url";

type Neighbour = {
  id: string;
  name: string;
  distance_km?: number;
  difficulty?: string | null;
  elevation_m?: number | null;
  state?: { name?: string } | { name?: string }[] | null;
};

// Compact "vs neighbour" cards — three small comparison entries lifted from
// dest.nearbyDestinations (PostGIS-sorted by distance). Each card links into
// the existing /compare?compare=A,B page where production already renders
// the full split-view comparison. Pure presentation; no new data.
export function CinematicVsCards({
  destinationId,
  destinationName,
  neighbours,
  limit = 3,
}: {
  destinationId: string;
  destinationName: string;
  neighbours: Neighbour[];
  limit?: number;
}) {
  const locale = useLocale();
  if (!neighbours || neighbours.length === 0) return null;

  const picks = neighbours.slice(0, limit);

  return (
    <div style={{ maxWidth: 1100, margin: "80px auto 0" }}>
      <p
        className="nq-kicker"
        style={{ color: "var(--vermillion)", marginBottom: 12 }}
      >
        OR INSTEAD · NEIGHBOURING READS
      </p>
      <p
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontSize: 18,
          lineHeight: 1.5,
          color: "var(--bone-dim)",
          maxWidth: 720,
          marginBottom: 32,
        }}
      >
        How {destinationName} stacks against the closest alternatives.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
          gap: 0,
          borderTop: "1px solid var(--hair)",
          borderLeft: "1px solid var(--hair)",
        }}
      >
        {picks.map((n) => {
          const stateName = Array.isArray(n.state)
            ? n.state[0]?.name
            : n.state?.name;
          const photo = destinationImage(n.id, 800);
          return (
            <Link
              key={n.id}
              href={`/${locale}/compare?compare=${destinationId},${n.id}`}
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                color: "var(--bone)",
                background: "var(--paper)",
                borderRight: "1px solid var(--hair)",
                borderBottom: "1px solid var(--hair)",
                transition: "background 200ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(229,86,66,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "var(--paper)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16 / 9",
                  overflow: "hidden",
                }}
              >
                <img
                  src={photo}
                  alt=""
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.85) brightness(0.92)",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(10,10,8,0.65) 100%)",
                  }}
                />
                <span
                  className="nq-mono"
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    padding: "4px 8px",
                    background: "rgba(10,10,8,0.7)",
                    border: "1px solid rgba(245,241,232,0.18)",
                    color: "var(--bone)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  VS
                </span>
              </div>
              <div style={{ padding: "20px 22px 22px" }}>
                <div
                  style={{
                    fontFamily: "var(--cinema-display)",
                    fontStyle: "italic",
                    fontSize: 26,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--bone)",
                    marginBottom: 8,
                  }}
                >
                  {n.name}
                </div>
                <div
                  className="nq-mono"
                  style={{
                    fontSize: 10,
                    color: "var(--bone-faint)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 14,
                  }}
                >
                  {[
                    typeof n.distance_km === "number"
                      ? `${n.distance_km} km`
                      : null,
                    n.elevation_m
                      ? `${n.elevation_m.toLocaleString()} m`
                      : null,
                    stateName,
                    n.difficulty?.toUpperCase(),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
                <span
                  className="nq-mono"
                  style={{
                    color: "var(--vermillion)",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid var(--vermillion)",
                    paddingBottom: 2,
                  }}
                >
                  Compare side-by-side →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { resolveCover } from "@/lib/collection-covers";

interface Collection {
  id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  destination_count?: number | null;
}

const REGION_FILTERS: { key: string; label: string; match: string[] }[] = [
  { key: "all", label: "All", match: [] },
  { key: "north", label: "North", match: ["North-India", "north-india", "himachal", "uttarakhand", "uttar-pradesh", "rajasthan", "punjab", "delhi", "ladakh", "kashmir", "jammu-kashmir"] },
  { key: "south", label: "South", match: ["south-india", "kerala", "tamil-nadu", "andhra", "andhra-pradesh", "telangana", "karnataka", "puducherry"] },
  { key: "east", label: "East", match: ["east-india", "west-bengal", "bihar", "odisha", "jharkhand"] },
  { key: "west", label: "West", match: ["west-india", "maharashtra", "goa", "gujarat", "konkan"] },
  { key: "central", label: "Central", match: ["central-india", "madhya-pradesh", "chhattisgarh"] },
  { key: "northeast", label: "Northeast", match: ["northeast", "Northeast", "meghalaya", "sikkim", "assam", "arunachal-pradesh", "nagaland", "manipur", "mizoram", "tripura"] },
  { key: "islands", label: "Islands", match: ["andaman", "nicobar", "lakshadweep", "island"] },
];

function regionMatches(tags: string[] | null, key: string): boolean {
  if (key === "all") return true;
  const region = REGION_FILTERS.find((r) => r.key === key);
  if (!region) return true;
  if (!tags || tags.length === 0) return false;
  return tags.some((t) => region.match.includes(t));
}

export function CollectionsCinema({
  collections,
  locale,
}: {
  collections: Collection[];
  locale: string;
}) {
  const [region, setRegion] = useState("all");

  const filtered = useMemo(
    () => collections.filter((c) => regionMatches(c.tags, region)),
    [collections, region],
  );

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      {/* Region filter — editorial chip row, no rounded pills */}
      <nav
        aria-label="Filter collections by region"
        style={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          borderTop: "1px solid var(--hair)",
          borderBottom: "1px solid var(--hair)",
          padding: "20px 0",
          marginBottom: 56,
        }}
      >
        {REGION_FILTERS.map((r) => {
          const isActive = region === r.key;
          return (
            <button
              key={r.key}
              onClick={() => setRegion(r.key)}
              style={{
                background: isActive ? "var(--vermillion)" : "transparent",
                color: isActive ? "var(--paper)" : "var(--bone-dim)",
                border: "1px solid",
                borderColor: isActive ? "var(--vermillion)" : "var(--hair)",
                padding: "10px 18px",
                fontFamily: "var(--cinema-ui)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 220ms ease",
              }}
            >
              {r.label}
            </button>
          );
        })}
      </nav>

      {filtered.length === 0 ? (
        <div
          style={{
            maxWidth: 720,
            margin: "64px auto",
            padding: "64px 32px",
            border: "1px dashed var(--hair)",
            textAlign: "center",
            fontFamily: "var(--cinema-display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--bone-dim)",
          }}
        >
          No collections in this region yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {filtered.map((c, i) => {
            const cover = resolveCover({ id: c.id, cover_image_url: c.cover_image_url });
            const num = String(i + 1).padStart(2, "0");
            return (
              <Link
                key={c.id}
                href={`/${locale}/collections/${c.id}`}
                className="nq-collection-card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  background: "var(--film-2)",
                  border: "1px solid var(--hair)",
                  overflow: "hidden",
                  transition: "border-color 280ms ease, transform 280ms ease",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    background: "var(--paper-2)",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={cover}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      filter: "saturate(0.85) brightness(0.78)",
                      transition: "transform 600ms ease, filter 600ms ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(10,10,8,0.6) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    className="nq-mono"
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      fontSize: 11,
                      color: "var(--vermillion)",
                      letterSpacing: "0.22em",
                      background: "rgba(10, 10, 8, 0.6)",
                      padding: "4px 8px",
                    }}
                  >
                    Nº {num}
                  </span>
                </div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--cinema-display)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: 26,
                      lineHeight: 1.15,
                      color: "var(--bone)",
                      margin: "0 0 12px",
                      letterSpacing: "-0.012em",
                      transition: "color 220ms ease",
                    }}
                  >
                    {c.name}
                  </h3>
                  {c.description && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "var(--bone-dim)",
                        margin: "0 0 16px",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {c.description}
                    </p>
                  )}
                  <span
                    className="nq-meta"
                    style={{
                      color: "var(--vermillion)",
                      letterSpacing: "0.18em",
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 11,
                    }}
                  >
                    READ COLLECTION →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <style jsx>{`
        :global(.nq-collection-card:hover) {
          border-color: var(--vermillion) !important;
        }
        :global(.nq-collection-card:hover img) {
          transform: scale(1.04);
          filter: saturate(1) brightness(0.92);
        }
        :global(.nq-collection-card:hover h3) {
          color: var(--vermillion);
        }
      `}</style>
    </div>
  );
}

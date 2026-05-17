"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { currentMonthIST, formatScoreInline } from "@itp/shared";

const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface DestRow {
  id: string;
  name: string;
  tagline?: string | null;
  difficulty?: string | null;
  elevation_m?: number | null;
  budget_tier?: string | null;
  best_months?: number[] | null;
  solo_female_score?: number | null;
  state?: { name?: string } | { name?: string }[] | null;
  kids_friendly?: { suitable: boolean; rating: number } | { suitable: boolean; rating: number }[] | null;
  destination_months?: { month: number; score: number }[] | null;
  confidence_cards?: { safety_rating?: number | string | null; network?: Record<string, unknown> | null } | { safety_rating?: number | string | null; network?: Record<string, unknown> | null }[] | null;
}

function resolveOne<T>(v: T | T[] | null | undefined): T | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

const VERMILLION_LINK: React.CSSProperties = {
  color: "var(--vermillion)",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

const KICKER: React.CSSProperties = {
  fontFamily: "var(--cinema-mono)",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--vermillion)",
};

const META: React.CSSProperties = {
  fontFamily: "var(--cinema-mono)",
  fontSize: 11,
  letterSpacing: "0.1em",
  color: "var(--bone-faint)",
  fontVariantNumeric: "tabular-nums",
};

const FRAUNCES_TITLE: React.CSSProperties = {
  fontFamily: "var(--cinema-display)",
  fontStyle: "italic",
  fontWeight: 500,
  color: "var(--bone)",
};

export function SavedContent({ destinations }: { destinations: DestRow[] }) {
  const locale = useLocale();
  const td = useTranslations("destination");
  const searchParams = useSearchParams();
  const urlCompare = searchParams.get("compare")?.split(",").filter(Boolean) ?? [];

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(urlCompare.length > 0);
  const [compareIds, setCompareIds] = useState<string[]>(urlCompare);
  const currentMonth = currentMonthIST();

  useEffect(() => {
    const saved: string[] = JSON.parse(localStorage.getItem("savedDestinations") || "[]");
    setSavedIds(saved);
    if (urlCompare.length >= 2) {
      setTimeout(() => {
        document.getElementById("compare-table")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savedDestinations = useMemo(
    () => destinations.filter((d) => savedIds.includes(d.id)),
    [destinations, savedIds],
  );

  function removeSaved(id: string) {
    const updated = savedIds.filter((s) => s !== id);
    localStorage.setItem("savedDestinations", JSON.stringify(updated));
    setSavedIds(updated);
  }

  function toggleCompare(id: string) {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((c) => c !== id));
    } else if (compareIds.length < 3) {
      setCompareIds([...compareIds, id]);
    }
  }

  const comparedDestinations = useMemo(
    () => destinations.filter((d) => compareIds.includes(d.id)),
    [destinations, compareIds],
  );

  return (
    <>
      <div style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
        <p style={META}>
          {String(savedDestinations.length).padStart(2, "0")} SAVED ·{" "}
          {compareMode ? `${compareIds.length}/3 SELECTED FOR COMPARISON` : td("yourTravelShortlist").toUpperCase()}
        </p>
        <button
          onClick={() => { setCompareMode(!compareMode); setCompareIds([]); }}
          style={{
            fontFamily: "var(--cinema-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "8px 14px",
            background: compareMode ? "var(--vermillion)" : "transparent",
            color: compareMode ? "var(--paper)" : "var(--vermillion)",
            border: "1px solid var(--vermillion)",
            cursor: "pointer",
          }}
        >
          {compareMode ? "Exit compare" : td("compareDestinations")}
        </button>
      </div>

      {compareMode && compareIds.length >= 2 && (
        <p style={{ ...META, color: "var(--vermillion)", marginBottom: 16 }}>
          {compareIds.length} SELECTED — TABLE BELOW ↓
        </p>
      )}

      {/* Saved grid */}
      {savedDestinations.length === 0 ? (
        <div
          style={{
            padding: 48,
            border: "1px dashed var(--hair)",
            textAlign: "center",
            background: "rgba(245, 241, 232, 0.02)",
          }}
        >
          <p style={{ ...FRAUNCES_TITLE, fontSize: 28, lineHeight: 1.2, margin: "0 0 12px" }}>
            No saved destinations yet.
          </p>
          <p
            style={{
              fontFamily: "var(--cinema-ui)",
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--bone-dim)",
              margin: "0 auto 20px",
              maxWidth: 480,
            }}
          >
            Browse destinations and tap the heart on any destination page to build your shortlist.
            Saved list is local to this browser.
          </p>
          <Link href={`/${locale}/explore`} style={{ ...VERMILLION_LINK, ...KICKER, padding: "8px 14px", border: "1px solid var(--vermillion)", textDecoration: "none" }}>
            Explore destinations →
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 1,
            background: "var(--hair)",
            border: "1px solid var(--hair)",
          }}
        >
          {savedDestinations.map((dest) => {
            const kf = resolveOne(dest.kids_friendly);
            const stateName = resolveOne(dest.state)?.name;
            const monthScore = dest.destination_months?.find((m) => m.month === currentMonth)?.score;
            const isComparing = compareIds.includes(dest.id);

            return (
              <div
                key={dest.id}
                style={{
                  position: "relative",
                  background: "var(--paper)",
                  borderLeft: isComparing ? "2px solid var(--vermillion)" : "2px solid transparent",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 140, background: "rgba(245, 241, 232, 0.04)", overflow: "hidden" }}>
                  <Image
                    src={`/images/destinations/${dest.id}.jpg`}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(22, 22, 20, 0.6), transparent)",
                    }}
                  />
                  {compareMode && (
                    <button
                      onClick={() => toggleCompare(dest.id)}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 28,
                        height: 28,
                        background: isComparing ? "var(--vermillion)" : "rgba(22,22,20,0.7)",
                        border: `1px solid ${isComparing ? "var(--vermillion)" : "var(--bone-faint)"}`,
                        color: "var(--paper)",
                        fontFamily: "var(--cinema-mono)",
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label={isComparing ? "Remove from comparison" : "Add to comparison"}
                    >
                      {isComparing ? "✓" : ""}
                    </button>
                  )}
                </div>

                <div style={{ padding: 16 }}>
                  {/* Score + meta chips */}
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
                    {monthScore !== undefined && (
                      <span style={{ ...META, color: monthScore >= 4 ? "var(--vermillion)" : "var(--bone)" }}>
                        {formatScoreInline(monthScore)} {MONTH_NAMES[currentMonth].toUpperCase()}
                      </span>
                    )}
                    <span style={{ display: "flex", gap: 8 }}>
                      {typeof dest.solo_female_score === "number" && (
                        <span style={{ ...META, color: "var(--bone-dim)" }} title={`Solo-female safety: ${formatScoreInline(dest.solo_female_score)}`}>
                          ♀ {formatScoreInline(dest.solo_female_score)}
                        </span>
                      )}
                      {kf && (
                        <span style={{ ...META, color: kf.suitable ? "var(--bone-dim)" : "var(--bone-faint)" }}>
                          {kf.suitable ? `KIDS ${formatScoreInline(kf.rating)}` : "ADULTS"}
                        </span>
                      )}
                    </span>
                  </div>

                  <Link href={`/${locale}/destination/${dest.id}`} style={{ textDecoration: "none" }}>
                    <p style={{ ...FRAUNCES_TITLE, fontSize: 20, lineHeight: 1.2, margin: "0 0 4px" }}>{dest.name}</p>
                  </Link>
                  {dest.tagline && (
                    <p
                      style={{
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "var(--bone-dim)",
                        margin: "0 0 8px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {dest.tagline}
                    </p>
                  )}

                  <p style={{ ...META, margin: "0 0 12px" }}>
                    {[stateName, dest.difficulty, dest.elevation_m ? `${dest.elevation_m.toLocaleString()}m` : null]
                      .filter(Boolean)
                      .map((v) => String(v).toUpperCase())
                      .join(" · ")}
                  </p>

                  <button
                    onClick={() => removeSaved(dest.id)}
                    style={{
                      fontFamily: "var(--cinema-mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--bone-faint)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Remove from saved
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare table */}
      {compareMode && comparedDestinations.length >= 2 && (
        <section style={{ marginTop: 56 }}>
          <p
            id="compare-table"
            className="nq-kicker"
            style={{
              color: "var(--vermillion)",
              marginBottom: 16,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Side-by-side · {comparedDestinations.length}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `160px repeat(${comparedDestinations.length}, 1fr)`,
              gap: 1,
              background: "var(--hair)",
              border: "1px solid var(--hair)",
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div
              style={{
                padding: "12px 16px",
                background: "var(--paper)",
                fontFamily: "var(--cinema-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--bone-faint)",
              }}
            >
              Attribute
            </div>
            {comparedDestinations.map((d) => (
              <div
                key={d.id}
                style={{
                  padding: "12px 16px",
                  background: "var(--paper)",
                  textAlign: "center" as const,
                }}
              >
                <Link
                  href={`/${locale}/destination/${d.id}`}
                  style={{ ...FRAUNCES_TITLE, fontSize: 16, textDecoration: "none" }}
                >
                  {d.name}
                </Link>
              </div>
            ))}

            {/* Data rows */}
            {[
              { label: `Score (${MONTH_NAMES[currentMonth]})`, key: "score" },
              { label: "Difficulty", key: "difficulty" },
              { label: "Elevation", key: "elevation" },
              { label: "Budget", key: "budget" },
              { label: "Kids rating", key: "kids" },
              { label: "Safety", key: "safety" },
              { label: "Network", key: "network" },
              { label: "Best months", key: "best_months" },
              { label: "State", key: "state" },
            ].map((row) => (
              <div key={row.key} style={{ display: "contents" }}>
                <div
                  style={{
                    padding: "10px 16px",
                    background: "var(--paper)",
                    fontFamily: "var(--cinema-ui)",
                    fontSize: 12,
                    color: "var(--bone-dim)",
                  }}
                >
                  {row.label}
                </div>
                {comparedDestinations.map((d) => {
                  const kf = resolveOne(d.kids_friendly);
                  const stateName = resolveOne(d.state)?.name;
                  const monthScore = d.destination_months?.find((m) => m.month === currentMonth)?.score;
                  let value = "—";
                  let highlight = false;

                  switch (row.key) {
                    case "score":
                      if (monthScore !== undefined) {
                        value = formatScoreInline(monthScore);
                        highlight = monthScore >= 4;
                      }
                      break;
                    case "difficulty":
                      value = d.difficulty ?? "—";
                      break;
                    case "elevation":
                      value = d.elevation_m ? `${d.elevation_m.toLocaleString()} m` : "—";
                      break;
                    case "budget":
                      value = d.budget_tier ?? "mixed";
                      break;
                    case "kids":
                      if (kf) value = kf.suitable ? `${formatScoreInline(kf.rating)} ✓` : "Not suitable";
                      highlight = !!kf?.suitable;
                      break;
                    case "safety": {
                      const cc = resolveOne(d.confidence_cards);
                      const raw = cc?.safety_rating;
                      if (typeof raw === "number") {
                        value = formatScoreInline(raw);
                        highlight = raw >= 4;
                      } else if (raw != null) value = String(raw);
                      break;
                    }
                    case "network": {
                      const cc2 = resolveOne(d.confidence_cards);
                      const net = cc2?.network as Record<string, unknown> | null | undefined;
                      if (net) {
                        const ops = [net.jio && "Jio", net.airtel && "Airtel", net.bsnl && "BSNL"].filter(Boolean) as string[];
                        if (ops.length > 0) {
                          value = ops.join(", ");
                          highlight = ops.length >= 2;
                        } else {
                          value = "No signal";
                        }
                      }
                      break;
                    }
                    case "best_months":
                      value = d.best_months?.map((m) => MONTH_NAMES[m]).join(", ") ?? "—";
                      break;
                    case "state":
                      value = stateName ?? "—";
                      break;
                  }

                  return (
                    <div
                      key={d.id}
                      style={{
                        padding: "10px 16px",
                        background: highlight ? "rgba(229, 86, 66, 0.04)" : "var(--paper)",
                        fontFamily: "var(--cinema-ui)",
                        fontSize: 13,
                        color: highlight ? "var(--vermillion)" : "var(--bone)",
                        textAlign: "center" as const,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

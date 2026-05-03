"use client";

import "./trip-board.css";

// TripBoardReadOnly — Phase 5. Renders a shared trip board in view-only
// mode. No LibraryPanel, no AI modal, no rename input, no ↑↓✕ controls,
// no drag on the year band. Reuses the same atoms (ScoreChip, MonthStrip)
// and the design tokens via the .nakshiq-trip-board scope.

import Link from "next/link";
import { useMemo, useState } from "react";
import { ScoreChip, MonthStrip, GlyphRail, doyLabel, monthlyScoreArray } from "./atoms";
import { MapView } from "./map-view";
import type { TripStateV2 } from "@/lib/trip-storage";

export type ReadOnlyDest = {
  id: string;
  name: string;
  difficulty: string | null;
  elevation_m: number | null;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  festivals?: { name: string; month: number | null }[] | null;
  lat: number | null;
  lng: number | null;
};

type Stop = {
  destinationId: string;
  days: number;
  notes: string;
  order: number;
  startDay: number;
};

export function TripBoardReadOnly({
  name,
  month,
  stops,
  destinations,
  updatedAt,
}: {
  name: string;
  month: number;
  stops: Stop[];
  destinations: ReadOnlyDest[];
  updatedAt: string;
}) {
  const destMap = useMemo(() => new Map(destinations.map((d) => [d.id, d])), [destinations]);
  const [view, setView] = useState<"list" | "map">("list");

  const totalDays = stops.reduce((s, x) => s + Math.max(1, x.days || 1), 0);
  const dateRange =
    stops.length > 0
      ? `${doyLabel(Math.min(...stops.map((s) => s.startDay)))} – ${doyLabel(
          Math.max(...stops.map((s) => s.startDay + Math.max(1, s.days) - 1)),
        )}`
      : "—";

  // MapView wants a TripStateV2 — synthesise the minimum shape it needs.
  const mapState: TripStateV2 = {
    version: 2,
    name,
    month,
    travelers: 1,
    budget: "mid-range",
    stops,
    items: stops.map((s) => ({
      destinationId: s.destinationId,
      days: s.days,
      notes: s.notes,
      order: s.order,
    })),
    createdAt: updatedAt,
    updatedAt,
  };

  return (
    <div className="nakshiq-trip-board" data-trip-shell-readonly>
      <div
        style={{
          minHeight: "calc(100vh - 4rem)",
          background: "var(--paper)",
          color: "var(--ink)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Read-only banner */}
        <div
          style={{
            background: "rgba(211, 104, 67, .10)",
            borderBottom: "1px solid rgba(211, 104, 67, .3)",
            padding: "10px 26px",
            fontSize: 11.5,
            color: "#d36843",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
          }}
        >
          <span>Read-only · this is a shared trip board</span>
          <Link
            href="/trip"
            style={{
              color: "var(--ink)",
              textDecoration: "underline",
              textDecorationColor: "#d36843",
              fontFamily: "var(--sans)",
              fontStyle: "normal",
              fontSize: 11,
            }}
          >
            Plan your own at nakshiq.com/trip →
          </Link>
        </div>

        {/* Trip header */}
        <header style={{ padding: "22px 26px 14px", borderBottom: "1px solid var(--rule-2)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 4,
            }}
          >
            <div className="nq-eyebrow">
              {stops.length} stops · {totalDays} {totalDays === 1 ? "night" : "nights"} · {dateRange}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button
                type="button"
                className="nq-btn nq-btn-ghost"
                style={view === "list" ? { background: "var(--paper-3)", borderColor: "var(--ink-3)" } : {}}
                onClick={() => setView("list")}
              >
                List
              </button>
              <button
                type="button"
                className="nq-btn nq-btn-ghost"
                style={view === "map" ? { background: "var(--paper-3)", borderColor: "var(--ink-3)" } : {}}
                onClick={() => setView("map")}
              >
                Map
              </button>
            </div>
          </div>
          <h1
            style={{
              margin: "0 0 12px 0",
              fontFamily: "var(--serif)",
              fontWeight: 500,
              fontSize: 32,
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
            }}
          >
            {name}
          </h1>
        </header>

        {/* Body */}
        {view === "list" ? (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {stops.length === 0 ? (
              <div
                style={{
                  padding: 60,
                  textAlign: "center",
                  color: "var(--ink-3)",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                This shared board has no stops.
              </div>
            ) : (
              stops.map((stop, idx) => {
                const dest = destMap.get(stop.destinationId);
                const monthScore = dest?.destination_months?.find((m) => m.month === month)?.score ?? null;
                const monthScores = monthlyScoreArray(dest?.destination_months ?? null);
                return (
                  <article
                    key={`${stop.destinationId}-${idx}`}
                    style={{
                      padding: "18px 26px",
                      borderBottom: "1px solid var(--rule)",
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: 8,
                    }}
                  >
                    <div className="nq-eyebrow">
                      Stop {String(idx + 1).padStart(2, "0")}/{String(stops.length).padStart(2, "0")} ·{" "}
                      {doyLabel(stop.startDay)} – {doyLabel(stop.startDay + Math.max(1, stop.days) - 1)}
                    </div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "var(--serif)",
                        fontSize: 22,
                        fontWeight: 500,
                      }}
                    >
                      {dest?.name ?? stop.destinationId}
                    </h2>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11.5, color: "var(--ink-3)" }}>
                        {dest?.state?.name ?? "—"}
                        {dest?.elevation_m ? ` · ${dest.elevation_m.toLocaleString()} m` : ""}
                      </span>
                      {monthScore != null && <ScoreChip s={monthScore} />}
                    </div>
                    <MonthStrip months={monthScores} activeIdx={month - 1} />
                    <GlyphRail
                      d={{
                        network: dest?.difficulty ?? null,
                        hospital: dest?.elevation_m ? `${dest.elevation_m} m` : null,
                        access: null,
                        soloF: null,
                        kids: null,
                      }}
                    />
                    {stop.notes && (
                      <p
                        style={{
                          margin: "6px 0 0 0",
                          fontFamily: "var(--serif)",
                          fontStyle: "italic",
                          fontSize: 13,
                          color: "var(--ink-2)",
                        }}
                      >
                        “{stop.notes}”
                      </p>
                    )}
                  </article>
                );
              })
            )}
          </div>
        ) : (
          <MapView state={mapState} destinations={destinations} />
        )}

        {/* Footer caption */}
        <div
          style={{
            padding: "14px 26px",
            borderTop: "1px solid var(--rule-2)",
            background: "rgba(0, 0, 0, .85)",
            fontSize: 11,
            color: "var(--ink-3)",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Last updated {new Date(updatedAt).toLocaleDateString("en-IN", { dateStyle: "medium" })} ·
          shared via NakshIQ
        </div>
      </div>
    </div>
  );
}

"use client";

// ItineraryView — Phase 4. Renders the AI/fallback itinerary returned by
// AiModal as a print-friendly day-by-day modal. Shape-agnostic: accepts
// either a full /api/itinerary response (title/summary/days[].activities/etc)
// or a local Scaffold from itinerary-generator.ts.
//
// Print: window.print() with a stylesheet that hides chrome and lets the
// day blocks reflow. Same pattern as Tour v2.1 — no library.

import { useEffect, useRef } from "react";
import type { Scaffold, ItineraryDay } from "@/lib/itinerary-generator";

type AiDay = {
  day: number;
  title?: string;
  destinationName?: string;
  destination?: string;
  nakshiqScore?: number;
  activities?: string[];
  stayAt?: string;
  travelTime?: string;
  tips?: string;
  meals?: string;
  rationale?: string;
};

type AiItinerary = {
  title?: string;
  summary?: string;
  totalDistance?: string;
  bestFor?: string[];
  days?: AiDay[];
  packingTips?: string[];
  warnings?: string[];
  estimatedBudget?: { budget?: string; midRange?: string; luxury?: string };
  riskMode?: string;
  variant?: string;
  _fallback?: boolean;
};

type AnyItinerary = AiItinerary | Scaffold;

function isScaffold(it: AnyItinerary): it is Scaffold {
  return "source" in it && "generatedAt" in it;
}

export function ItineraryView({
  itinerary,
  scaffold,
  fallbackUsed,
  onClose,
}: {
  itinerary: AnyItinerary;
  /** Always-available local scaffold — surfaced in the header as a "verifiable skeleton" line. */
  scaffold: Scaffold;
  fallbackUsed: boolean;
  onClose: () => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isAi = !isScaffold(itinerary);
  const ai = isAi ? (itinerary as AiItinerary) : null;
  const localDays: ItineraryDay[] = scaffold.days;

  return (
    <div
      className="nq-modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Generated itinerary"
      data-itinerary-view
    >
      <style>{`
        @media print {
          body * { visibility: hidden; }
          [data-itinerary-view], [data-itinerary-view] * { visibility: visible; }
          [data-itinerary-view] {
            position: absolute !important;
            inset: 0 !important;
            background: white !important;
            color: black !important;
          }
          [data-itinerary-view] .nq-modal {
            box-shadow: none !important;
            max-width: none !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
          }
          [data-itinerary-view] [data-no-print] { display: none !important; }
        }
      `}</style>

      <div className="nq-modal" style={{ maxWidth: 880 }}>
        <div className="nq-modal-head" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              {isAi ? "AI itinerary" : "Local scaffold"}{fallbackUsed ? " · fallback (AI unreachable)" : ""}
            </div>
            <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 26, fontWeight: 500 }}>
              {ai?.title ?? "Your day-by-day"}
            </h2>
            {ai?.summary && (
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 13,
                  color: "var(--ink-2)",
                  maxWidth: 580,
                }}
              >
                {ai.summary}
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: 6 }} data-no-print>
            <button
              type="button"
              className="nq-btn nq-btn-ghost"
              onClick={() => window.print()}
            >
              Print
            </button>
            <button
              ref={closeBtnRef}
              type="button"
              className="nq-btn nq-btn-ghost"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="nq-modal-body">
          {/* AI shape rendering */}
          {isAi && ai?.days && ai.days.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {ai.days.map((d) => (
                <div key={d.day} data-itinerary-day={d.day}>
                  <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
                    Day {d.day}
                    {typeof d.nakshiqScore === "number" ? ` · ${d.nakshiqScore}/5` : ""}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 6px 0",
                      fontFamily: "var(--serif)",
                      fontSize: 19,
                      fontWeight: 500,
                    }}
                  >
                    {d.title ?? d.destinationName ?? `Day ${d.day}`}
                  </h3>
                  {d.travelTime && (
                    <p
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: 11.5,
                        color: "var(--ink-3)",
                        fontFamily: "var(--mono)",
                      }}
                    >
                      {d.travelTime}
                    </p>
                  )}
                  {d.activities && d.activities.length > 0 && (
                    <ul style={{ margin: "8px 0", paddingLeft: 18, fontSize: 13, color: "var(--ink-2)" }}>
                      {d.activities.map((a, i) => (
                        <li key={i} style={{ marginBottom: 3 }}>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                  <dl
                    className="nq-kv"
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      gridTemplateColumns: "80px 1fr 80px 1fr",
                    }}
                  >
                    {d.stayAt && (
                      <>
                        <dt>Stay</dt>
                        <dd>{d.stayAt}</dd>
                      </>
                    )}
                    {d.meals && (
                      <>
                        <dt>Eat</dt>
                        <dd>{d.meals}</dd>
                      </>
                    )}
                    {d.tips && (
                      <>
                        <dt>Tip</dt>
                        <dd>{d.tips}</dd>
                      </>
                    )}
                    {d.rationale && (
                      <>
                        <dt>Why</dt>
                        <dd
                          style={{
                            fontFamily: "var(--serif)",
                            fontStyle: "italic",
                            color: "var(--ink-3)",
                          }}
                        >
                          {d.rationale}
                        </dd>
                      </>
                    )}
                  </dl>
                  <hr className="nq-rule" style={{ marginTop: 14 }} />
                </div>
              ))}
            </div>
          )}

          {/* Local scaffold rendering — used when isAi=false OR ai shape is missing */}
          {(!isAi || !ai?.days || ai.days.length === 0) && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {localDays.map((d) => (
                <div key={d.day} data-itinerary-day={d.day}>
                  <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
                    Day {d.day} · {d.date}
                    {d.kind === "permit-prep" && " · permit prep"}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 6px 0",
                      fontFamily: "var(--serif)",
                      fontSize: 19,
                      fontWeight: 500,
                    }}
                  >
                    {d.destinationName}
                  </h3>
                  <dl
                    className="nq-kv"
                    style={{ fontSize: 13, gridTemplateColumns: "100px 1fr" }}
                  >
                    <dt>Morning</dt>
                    <dd>{d.morning}</dd>
                    <dt>Afternoon</dt>
                    <dd>{d.afternoon}</dd>
                    <dt>Evening</dt>
                    <dd>{d.evening}</dd>
                    {d.rationale && (
                      <>
                        <dt>Why</dt>
                        <dd
                          style={{
                            fontFamily: "var(--serif)",
                            fontStyle: "italic",
                            color: "var(--ink-3)",
                          }}
                        >
                          {d.rationale}
                        </dd>
                      </>
                    )}
                  </dl>
                  <hr className="nq-rule" style={{ marginTop: 14 }} />
                </div>
              ))}
            </div>
          )}

          {/* AI extras — packing / warnings / budget */}
          {isAi && ai && (
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
              {ai.packingTips && ai.packingTips.length > 0 && (
                <SubBlock label="Packing">
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5 }}>
                    {ai.packingTips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </SubBlock>
              )}
              {ai.warnings && ai.warnings.length > 0 && (
                <SubBlock label="Warnings">
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "var(--score-1)" }}>
                    {ai.warnings.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </SubBlock>
              )}
              {ai.estimatedBudget && (
                <SubBlock label="Estimated budget">
                  <dl className="nq-kv" style={{ fontSize: 12, gridTemplateColumns: "90px 1fr 90px 1fr 90px 1fr" }}>
                    <dt>Budget</dt>
                    <dd>{ai.estimatedBudget.budget ?? "—"}</dd>
                    <dt>Mid</dt>
                    <dd>{ai.estimatedBudget.midRange ?? "—"}</dd>
                    <dt>Luxury</dt>
                    <dd>{ai.estimatedBudget.luxury ?? "—"}</dd>
                  </dl>
                </SubBlock>
              )}
            </div>
          )}
        </div>

        <div className="nq-modal-foot" data-no-print>
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontStyle: "italic", fontFamily: "var(--serif)" }}>
            {fallbackUsed
              ? "AI was unreachable — local scaffold from your stops + dates is shown."
              : "AI used your ages, mobility, vehicle and budget. Edit stops to regenerate."}
          </span>
          <button type="button" className="nq-btn nq-btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function SubBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

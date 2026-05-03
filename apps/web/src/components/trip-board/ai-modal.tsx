"use client";

// AiModal — Phase 4. Three-step modal that gathers ages / mobility / vehicle
// (the three new POST /api/itinerary fields), then hands the resolved
// itinerary to ItineraryView via onGenerated.
//
// Closes PDF Failure #4 (AI overpromise) by ASKING for the constraints the
// generator now uses, instead of generating a generic article.
//
// Steps:
//   1. WHO        — pax, ages chips, female-adult flag (drives solo-female
//                   surfacing), mobility radio
//   2. HOW        — vehicle radio, risk mode (existing), variant (existing)
//   3. EXTRAS     — budget tier, must-includes free text, preview
//
// Modal scope: lives inside ShellWithLogistics so it shares the
// .nakshiq-trip-board CSS scope and the same backdrop pattern as PermitDialog.

import { useEffect, useMemo, useRef, useState } from "react";
import type { TripStateV2 } from "@/lib/trip-storage";
import type { LogisticsRow } from "@/lib/cost-aggregator";
import { buildScaffold, type Scaffold } from "@/lib/itinerary-generator";

type Mobility = "fit" | "normal" | "limited" | "wheelchair";
type Vehicle = "rental" | "self-drive" | "driver" | "bus" | "motorcycle";
type RiskMode = "budget" | "comfort" | "safety";
type Variant = "primary" | "wet-proof" | "altitude-light";
type BudgetTier = "budget" | "mid-range" | "luxury";

export type AiModalSubmit = {
  scaffold: Scaffold;
  /** Resolved itinerary — either the AI response or the local fallback. */
  itinerary: unknown;
  /** True when /api/itinerary returned a fallback or errored. */
  fallbackUsed: boolean;
  inputs: {
    ages: number[];
    pax: number;
    hasFemaleAdult: boolean;
    mobility: Mobility;
    vehicle: Vehicle;
    risk: RiskMode;
    variant: Variant;
    budget: BudgetTier;
    mustIncludes: string;
  };
};

export function AiModal({
  state,
  rowsByDest,
  onClose,
  onGenerated,
}: {
  state: TripStateV2;
  rowsByDest: Record<string, LogisticsRow>;
  onClose: () => void;
  onGenerated: (result: AiModalSubmit) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // WHO
  const [pax, setPax] = useState<number>(Math.max(1, state.travelers || 2));
  const [ageInput, setAgeInput] = useState("");
  const [ages, setAges] = useState<number[]>([]);
  const [hasFemaleAdult, setHasFemaleAdult] = useState(false);
  const [mobility, setMobility] = useState<Mobility>("normal");

  // HOW
  const [vehicle, setVehicle] = useState<Vehicle>("driver");
  const [risk, setRisk] = useState<RiskMode>("comfort");
  const [variant, setVariant] = useState<Variant>("primary");

  // EXTRAS
  const initialBudget: BudgetTier = state.budget === "budget" || state.budget === "luxury" ? state.budget : "mid-range";
  const [budget, setBudget] = useState<BudgetTier>(initialBudget);
  const [mustIncludes, setMustIncludes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Esc-to-close + initial focus.
  useEffect(() => {
    closeBtnRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function addAge() {
    const n = parseInt(ageInput.trim(), 10);
    if (!Number.isFinite(n) || n < 0 || n > 110) return;
    setAges((prev) => [...prev, n].slice(0, 12));
    setAgeInput("");
  }

  function removeAge(idx: number) {
    setAges((prev) => prev.filter((_, i) => i !== idx));
  }

  const canAdvance1 = pax >= 1; // ages optional
  const totalDays = state.stops.reduce((s, x) => s + Math.max(1, x.days || 1), 0);

  const summaryLine = useMemo(() => {
    const aPart = ages.length > 0 ? `ages ${ages.join("/")}` : `${pax} ${pax === 1 ? "person" : "people"}`;
    return `${state.stops.length} stops · ${totalDays} ${totalDays === 1 ? "night" : "nights"} · ${aPart} · ${vehicle} · ${budget}`;
  }, [ages, pax, state.stops.length, totalDays, vehicle, budget]);

  async function submit() {
    setSubmitting(true);
    setError(null);

    const scaffold = buildScaffold(state.stops, rowsByDest, {
      ages,
      pax,
      hasFemaleAdult,
      mobility,
      vehicle,
    });

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          month: state.month,
          days: Math.max(1, totalDays),
          travelerType: pax === 1 ? "solo" : ages.some((a) => a < 12) ? "family" : "couple",
          budget,
          origin: "Delhi",
          destinationIds: state.stops.map((s) => s.destinationId),
          riskMode: risk,
          variant,
          ages,
          mobility,
          vehicle,
        }),
      });

      let itinerary: unknown = null;
      let fallbackUsed = false;
      if (res.ok) {
        const json = await res.json();
        itinerary = json.itinerary ?? null;
        fallbackUsed = !!(json.itinerary as { _fallback?: boolean } | null)?._fallback;
      } else {
        fallbackUsed = true;
      }

      onGenerated({
        scaffold,
        itinerary: itinerary ?? scaffold,
        fallbackUsed,
        inputs: { ages, pax, hasFemaleAdult, mobility, vehicle, risk, variant, budget, mustIncludes },
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setError(`Couldn't reach the planner — ${msg}. Showing local scaffold instead.`);
      onGenerated({
        scaffold,
        itinerary: scaffold,
        fallbackUsed: true,
        inputs: { ages, pax, hasFemaleAdult, mobility, vehicle, risk, variant, budget, mustIncludes },
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="nq-modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="AI itinerary generator"
      data-ai-modal
    >
      <div className="nq-modal" style={{ maxWidth: 720 }}>
        <div className="nq-modal-head" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              AI itinerary · step {step} of 3
            </div>
            <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 24, fontWeight: 500 }}>
              {step === 1 ? "Who is going?" : step === 2 ? "How are you getting around?" : "Anything else?"}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="nq-modal-body" style={{ minHeight: 280 }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Field label="Travellers (pax)">
                <input
                  type="number"
                  min={1}
                  max={12}
                  className="nq-input"
                  value={pax}
                  onChange={(e) => setPax(Math.max(1, Math.min(12, parseInt(e.target.value || "1", 10))))}
                  style={{ width: 120 }}
                />
              </Field>
              <Field label="Ages (chips)" hint="Add each traveller's age — drives kids_min_age + solo-female checks.">
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                  {ages.map((a, i) => (
                    <button
                      key={`${a}-${i}`}
                      type="button"
                      onClick={() => removeAge(i)}
                      className="nq-btn nq-btn-ghost"
                      style={{ padding: "3px 9px", fontSize: 11 }}
                      title="Remove"
                    >
                      {a} ✕
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <input
                    type="number"
                    min={0}
                    max={110}
                    className="nq-input"
                    placeholder="e.g. 4"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAge();
                      }
                    }}
                    style={{ width: 100 }}
                  />
                  <button type="button" onClick={addAge} className="nq-btn">
                    Add age
                  </button>
                </div>
              </Field>
              <Field label="Female adult travelling?" hint="Surfaces solo_female_score for each stop.">
                <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                  <input
                    type="checkbox"
                    checked={hasFemaleAdult}
                    onChange={(e) => setHasFemaleAdult(e.target.checked)}
                  />
                  Yes
                </label>
              </Field>
              <Radio
                label="Mobility"
                value={mobility}
                onChange={(v) => setMobility(v as Mobility)}
                options={[
                  { v: "fit", l: "Fit", sub: "Multi-hour treks ok" },
                  { v: "normal", l: "Normal", sub: "Default" },
                  { v: "limited", l: "Limited", sub: "Paved roads, short walks" },
                  { v: "wheelchair", l: "Wheelchair", sub: "Accessible-only stops" },
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Radio
                label="Vehicle"
                value={vehicle}
                onChange={(v) => setVehicle(v as Vehicle)}
                options={[
                  { v: "rental", l: "Rental car", sub: "We name fuel + ATM stops" },
                  { v: "self-drive", l: "Self-drive", sub: "Hill-driving caveats" },
                  { v: "driver", l: "With driver", sub: "8h/day cap + driver stay" },
                  { v: "bus", l: "Bus", sub: "Booking platforms named" },
                  { v: "motorcycle", l: "Motorcycle", sub: "Pass closures + tyre prep" },
                ]}
              />
              <Radio
                label="Risk mode"
                value={risk}
                onChange={(v) => setRisk(v as RiskMode)}
                options={[
                  { v: "comfort", l: "Comfort", sub: "Mid-range, hot water" },
                  { v: "budget", l: "Budget", sub: "Hostels, dhabas, shared" },
                  { v: "safety", l: "Safety-first", sub: "Easy terrain, hospitals near" },
                ]}
              />
              <Radio
                label="Variant"
                value={variant}
                onChange={(v) => setVariant(v as Variant)}
                options={[
                  { v: "primary", l: "Primary", sub: "Optimal route" },
                  { v: "wet-proof", l: "Wet-proof", sub: "Rain-shadow only" },
                  { v: "altitude-light", l: "Altitude-light", sub: "≤ 3000m" },
                ]}
              />
            </div>
          )}

          {step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <Radio
                label="Budget tier"
                value={budget}
                onChange={(v) => setBudget(v as BudgetTier)}
                options={[
                  { v: "budget", l: "Budget", sub: "Hostels, street food" },
                  { v: "mid-range", l: "Mid-range", sub: "Default" },
                  { v: "luxury", l: "Luxury", sub: "Heritage / boutique" },
                ]}
              />
              <Field label="Must include (optional)" hint="Free text — passes to the prompt verbatim.">
                <textarea
                  className="nq-input"
                  rows={3}
                  value={mustIncludes}
                  onChange={(e) => setMustIncludes(e.target.value.slice(0, 400))}
                  placeholder="e.g. Day trip to Kalga, lunch at Lhasa Cafe in Manali, no overnight bus"
                  style={{ resize: "vertical" }}
                />
              </Field>
              <div
                className="nq-alert"
                style={{ marginTop: 4, fontSize: 12 }}
                data-ai-modal-summary
              >
                <div className="nq-alert-eyebrow">Preview</div>
                <p style={{ margin: 0, fontFamily: "var(--serif)", fontStyle: "italic" }}>{summaryLine}</p>
              </div>
              {error && (
                <div
                  style={{
                    background: "rgba(217,96,80,.10)",
                    border: "1px solid rgba(217,96,80,.3)",
                    padding: 10,
                    color: "var(--score-1)",
                    fontSize: 12,
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="nq-modal-foot">
          <span style={{ fontSize: 11, color: "var(--ink-3)", fontStyle: "italic", fontFamily: "var(--serif)" }}>
            {step < 3
              ? `Step ${step} of 3 — your stops & dates carry over.`
              : "Generating uses Anthropic. Local scaffold shows instantly."}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {step > 1 && (
              <button
                type="button"
                className="nq-btn nq-btn-ghost"
                onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
                disabled={submitting}
              >
                ← Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                className="nq-btn nq-btn-primary"
                onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
                disabled={step === 1 && !canAdvance1}
              >
                Next →
              </button>
            )}
            {step === 3 && (
              <button
                type="button"
                className="nq-btn nq-btn-primary"
                onClick={submit}
                disabled={submitting || state.stops.length === 0}
              >
                {submitting ? "Generating…" : "Generate itinerary →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
        {label}
      </div>
      {hint && (
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: 11.5,
            color: "var(--ink-3)",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
          }}
        >
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function Radio<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { v: T; l: string; sub?: string }[];
}) {
  return (
    <div>
      <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 6 }}>
        {options.map((o) => {
          const active = o.v === value;
          return (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "8px 10px",
                fontSize: 12,
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--paper)" : "var(--ink-2)",
                border: `1px solid ${active ? "var(--ink)" : "var(--rule-2)"}`,
                lineHeight: 1.3,
              }}
            >
              <div style={{ fontWeight: 600 }}>{o.l}</div>
              {o.sub && (
                <div
                  style={{
                    fontSize: 10.5,
                    marginTop: 2,
                    color: active ? "var(--paper-2)" : "var(--ink-3)",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                  }}
                >
                  {o.sub}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

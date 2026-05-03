"use client";

// PermitDialog — design-matched in-board modal.
// Uses the nq-modal-bg + nq-modal classes from the dark editorial design.
// Reads from the existing `permits` table — no external new-tab navigation
// (closes PDF Failure #3). government_link is shown as a plain-text citation
// footnote, deliberately NOT a clickable target=_blank.
//
// Modal lives at the shell root (ShellWithLogistics) so both StopCard alerts
// and ConflictsPanel can launch the same instance.

import { useEffect, useRef, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase-browser";

type PermitRow = {
  id: string;
  destination_id: string;
  type: string;
  who_needs: string | null;
  foreigners: string | null;
  how_to_get: string | null;
  documents_needed: string[] | null;
  cost_inr: number | null;
  processing_time: string | null;
  validity: string | null;
  government_link: string | null;
  pro_tip: string | null;
};

export function PermitDialog({
  destinationId,
  destinationName,
  onClose,
}: {
  destinationId: string;
  destinationName: string;
  onClose: () => void;
}) {
  const [permits, setPermits] = useState<PermitRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot init flag, no cascade risk.
      setError("Supabase unavailable");
      return;
    }
    let alive = true;
    (async () => {
      const { data, error } = await supabase
        .from("permits")
        .select("*")
        .eq("destination_id", destinationId);
      if (!alive) return;
      if (error) {
        setError(error.message);
        return;
      }
      setPermits((data ?? []) as PermitRow[]);
    })();
    return () => {
      alive = false;
    };
  }, [destinationId]);

  useEffect(() => {
    closeBtnRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="nq-modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Permit details for ${destinationName}`}
      data-permit-dialog
    >
      <div className="nq-modal" style={{ maxWidth: 720 }}>
        <div className="nq-modal-head" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div className="nq-eyebrow" style={{ marginBottom: 4 }}>
              Permits — {destinationName}
            </div>
            <h2 style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 24, fontWeight: 500 }}>
              What you&rsquo;ll need
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="nq-btn nq-btn-ghost"
            onClick={onClose}
            aria-label="Close permit details"
          >
            ✕
          </button>
        </div>

        <div className="nq-modal-body">
          {permits === null && !error && (
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
              Loading permit details…
            </p>
          )}
          {error && (
            <div
              style={{
                background: "rgba(217,96,80,.10)",
                border: "1px solid rgba(217,96,80,.3)",
                padding: 14,
                color: "var(--score-1)",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              Couldn&rsquo;t load permits — {error}.
            </div>
          )}
          {permits !== null && permits.length === 0 && (
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
              No permit on file for {destinationName}. The trip board flagged a permit type, but
              the detailed entry hasn&rsquo;t been published yet.
            </p>
          )}
          {permits !== null && permits.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {permits.map((p, idx) => (
                <div key={p.id} data-permit-row data-permit-type={p.type}>
                  {idx > 0 && <hr className="nq-rule" style={{ marginBottom: 22 }} />}
                  <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
                    Permit {idx + 1} · {p.type}
                  </div>
                  {p.who_needs && (
                    <Section label="Who needs it">
                      <p>{p.who_needs}</p>
                    </Section>
                  )}
                  {p.foreigners && (
                    <Section label="For foreign passport holders">
                      <p>{p.foreigners}</p>
                    </Section>
                  )}
                  {p.how_to_get && (
                    <Section label="How to get one">
                      <p style={{ whiteSpace: "pre-line" }}>{p.how_to_get}</p>
                    </Section>
                  )}
                  {p.documents_needed && p.documents_needed.length > 0 && (
                    <Section label="Documents needed">
                      <ul style={{ paddingLeft: 18, margin: 0 }}>
                        {p.documents_needed.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </Section>
                  )}

                  <dl
                    className="nq-kv"
                    style={{
                      marginTop: 16,
                      paddingTop: 14,
                      borderTop: "1px solid var(--rule)",
                      gridTemplateColumns: "90px 1fr 100px 1fr 90px 1fr",
                    }}
                  >
                    <dt>Cost</dt>
                    <dd>{p.cost_inr != null ? `₹${p.cost_inr}` : "—"}</dd>
                    <dt>Processing</dt>
                    <dd>{p.processing_time ?? "—"}</dd>
                    <dt>Valid for</dt>
                    <dd>{p.validity ?? "—"}</dd>
                  </dl>

                  {p.pro_tip && (
                    <div className="nq-alert" style={{ marginTop: 14 }}>
                      <div className="nq-alert-eyebrow">Pro tip</div>
                      <p>{p.pro_tip}</p>
                    </div>
                  )}
                  {p.government_link && (
                    <p
                      data-permit-citation
                      style={{
                        marginTop: 14,
                        fontSize: 13,
                        color: "var(--ink-2)",
                        wordBreak: "break-all",
                      }}
                    >
                      Source: {p.government_link}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="nq-modal-foot">
          <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>
            Permit details from the {destinationName} entry — kept in-board so you don&rsquo;t lose your trip.
          </span>
          <button type="button" className="nq-btn nq-btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 14 }}>
      <div className="nq-eyebrow" style={{ marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

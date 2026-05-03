"use client";

import "./trip-board.css";

// Trip Board shell — Phase 3 + design match.
//
// Decides between two layouts based on stop count:
//   - 0 stops → ColdStart (4-path wizard, kills PDF Failure #1)
//   - ≥1 stop → ThreePane (Library + Board + Cost/Conflicts) — body fills in
//     Phase 2 (year band) + Phase 3 (cost/conflicts) + Phase 4 (AI modal)
//
// State + persistence flow lives entirely in `useTripBoard()` from
// lib/trip-storage.ts. Children read `state` and call `setState`.
//
// `?coldstart=1` URL param + `nakshiq:coldstart-replay` window event force the
// ColdStart back even after stops exist — mirrors the tour-replay-link
// pattern. Useful from a future "Start over" CTA in the board chrome.

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTripBoard, type TripStateV2 } from "@/lib/trip-storage";
import { useTripLogistics } from "@/lib/cost-aggregator";
import { currentMonthIST } from "@itp/shared";
import { ColdStart, type ColdStartSeed } from "./cold-start";
import { LibraryPanel } from "./library-panel";
import { BoardCanvas } from "./board-canvas";
import { CostPanel } from "./cost-panel";
import { PermitDialog } from "./permit-dialog";
import { AiModal, type AiModalSubmit } from "./ai-modal";
import { ItineraryView } from "./itinerary-view";
import { ShareMenu } from "./share-menu";
import { SimpleView } from "./simple-view";

const VIEW_MODE_KEY = "nq-trip-mode";
type ViewMode = "simple" | "advanced";

type DestinationLite = {
  id: string;
  name: string;
  difficulty: string | null;
  elevation_m: number | null;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  festivals?: { name: string; month: number | null }[] | null;
  daily_cost?: Record<string, unknown> | null;
  /** Phase 5 — lat/lng from destinations_with_coords view. */
  lat?: number | null;
  lng?: number | null;
};

const COLDSTART_REPLAY_EVENT = "nakshiq:coldstart-replay";

export function TripBoard({ destinations }: { destinations: DestinationLite[] }) {
  const { state, setState, hydrated, signedIn, cloudConflict, acceptCloudConflict, dismissCloudConflict } = useTripBoard();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Force ColdStart even when stops exist — used by "Start over" + replay link.
  // Derived from searchParams synchronously on first render so we don't
  // setState in an effect; window event subscription handles same-path replay.
  const initialReplay = searchParams?.get("coldstart") === "1";
  const [forceColdStart, setForceColdStart] = useState(initialReplay);

  // Strip the ?coldstart=1 param after mount so reloads don't re-trigger.
  // Uses router.replace which doesn't remount the tree.
  useEffect(() => {
    if (initialReplay) {
      const url = new URL(window.location.href);
      url.searchParams.delete("coldstart");
      router.replace(url.pathname + (url.search ? url.search : ""));
    }
  }, [initialReplay, router]);

  // Window event for same-path replay (mirrors tour-replay-link pattern).
  useEffect(() => {
    const handler = () => setForceColdStart(true);
    window.addEventListener(COLDSTART_REPLAY_EVENT, handler);
    return () => window.removeEventListener(COLDSTART_REPLAY_EVENT, handler);
  }, []);

  // SSR-safe: render nothing until localStorage has been read. Avoids a
  // brief flash of ColdStart for users whose stops are already in storage.
  if (!hydrated) {
    return <div aria-busy="true" className="min-h-[60vh]" />;
  }

  const showColdStart = forceColdStart || state.stops.length === 0;

  function applySeed(seed: ColdStartSeed) {
    setForceColdStart(false);
    if (seed.stops.length === 0) {
      // Skip → open empty three-pane. Set month if provided so the year band
      // anchors somewhere reasonable.
      setState((prev) => ({
        ...prev,
        month: seed.month ?? prev.month ?? currentMonthIST(),
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      month: seed.month ?? prev.month ?? currentMonthIST(),
      stops: seed.stops.map((s, idx) => ({
        destinationId: s.slug,
        startDay: s.startDay,
        days: s.days ?? 3,
        notes: "",
        order: idx,
      })),
    }));
  }

  if (showColdStart) {
    return <ColdStart destinations={destinations} onSeed={applySeed} />;
  }

  // Wrapped in .nakshiq-trip-board so the dark editorial design tokens apply
  // only to the /trip subtree (rest of the site is light-themed).
  // BoardWithModals hoists modal + RPC state so SimpleView and ShellWithLogistics
  // share one set of modals + one logistics fetch.
  return (
    <div className="nakshiq-trip-board" data-trip-shell>
      <BoardWithModals
        state={state}
        setState={setState}
        destinations={destinations}
        forceColdStart={() => setForceColdStart(true)}
        signedIn={signedIn}
      />

      {cloudConflict && (
        <div
          className="nakshiq-trip-board"
          style={{
            position: "fixed", bottom: 16, right: 16, zIndex: 50,
            maxWidth: 360, padding: 16, background: "var(--paper-2)",
            border: "1px solid var(--rule-2)", color: "var(--ink)",
          }}
        >
          <p className="nq-italic" style={{ fontSize: 13 }}>
            A newer trip board is saved on another device. Replace what&rsquo;s open here?
          </p>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button type="button" onClick={acceptCloudConflict} className="nq-btn">
              Yes, load it
            </button>
            <button type="button" onClick={dismissCloudConflict} className="nq-btn nq-btn-ghost">
              Keep this one
            </button>
          </div>
        </div>
      )}

      {!signedIn && (
        <div
          className="nakshiq-trip-board"
          style={{
            position: "fixed", bottom: 16, left: 16, zIndex: 40, maxWidth: 280,
            padding: 12, background: "rgba(10, 10, 10, 0.9)", border: "1px solid var(--rule-2)",
            fontSize: 11, color: "var(--ink-3)", backdropFilter: "blur(6px)",
          }}
          data-anon-hint
        >
          Sign in to sync this trip across devices. Your work stays local until then.
        </div>
      )}
    </div>
  );
}

// BoardWithModals — owns the shared logistics RPC + modal state and
// switches between SimpleView (default) and ThreePane (advanced) based on
// localStorage["nq-trip-mode"]. Hoisting state up here means SimpleView can
// open the same AiModal / ShareMenu / PermitDialog that the dense board uses.
function BoardWithModals({
  state,
  setState,
  destinations,
  forceColdStart,
  signedIn,
}: {
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
  destinations: DestinationLite[];
  forceColdStart: () => void;
  signedIn: boolean;
}) {
  const { rowsByDest } = useTripLogistics(state.stops, state.month);
  const [permitDialogFor, setPermitDialogFor] = useState<{ id: string; name: string } | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiResult, setAiResult] = useState<AiModalSubmit | null>(null);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  // viewMode default = "simple" for new visitors. Power users who explicitly
  // open the trip board get "advanced" persisted, so revisits skip Simple.
  // Reverting to Simple = ColdStart "Start over" flow (clears the prefs).
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "simple";
    const stored = localStorage.getItem(VIEW_MODE_KEY);
    return stored === "advanced" ? "advanced" : "simple";
  });
  function switchToAdvanced() {
    setViewMode("advanced");
    if (typeof window !== "undefined") localStorage.setItem(VIEW_MODE_KEY, "advanced");
  }

  return (
    <>
      {viewMode === "simple" ? (
        <SimpleView
          state={state}
          setState={setState}
          destinations={destinations}
          rowsByDest={rowsByDest}
          onGenerateItinerary={() => setAiModalOpen(true)}
          onShareClick={() => setShareMenuOpen(true)}
          onSwitchToAdvanced={switchToAdvanced}
          onStartOver={() => {
            // Wipe the advanced preference too, so re-entering after a fresh
            // cold-start lands in Simple by default.
            if (typeof window !== "undefined") localStorage.removeItem(VIEW_MODE_KEY);
            setViewMode("simple");
            forceColdStart();
          }}
        />
      ) : (
        <ThreePane
          state={state}
          setState={setState}
          destinations={destinations}
          rowsByDest={rowsByDest}
          onPermitClick={(id, name) => setPermitDialogFor({ id, name })}
          onGenerateItinerary={() => setAiModalOpen(true)}
          onShareClick={() => setShareMenuOpen(true)}
          onStartOver={() => {
            if (typeof window !== "undefined") localStorage.removeItem(VIEW_MODE_KEY);
            setViewMode("simple");
            forceColdStart();
          }}
        />
      )}

      {permitDialogFor && (
        <PermitDialog
          destinationId={permitDialogFor.id}
          destinationName={permitDialogFor.name}
          onClose={() => setPermitDialogFor(null)}
        />
      )}

      {aiModalOpen && (
        <AiModal
          state={state}
          rowsByDest={rowsByDest}
          onClose={() => setAiModalOpen(false)}
          onGenerated={(result) => {
            setAiResult(result);
            setAiModalOpen(false);
          }}
        />
      )}

      {aiResult && (
        <ItineraryView
          itinerary={aiResult.itinerary as never}
          scaffold={aiResult.scaffold}
          fallbackUsed={aiResult.fallbackUsed}
          onClose={() => setAiResult(null)}
        />
      )}

      {shareMenuOpen && (
        <ShareMenu
          state={state}
          signedIn={signedIn}
          onClose={() => setShareMenuOpen(false)}
          onImported={(next) => setState(() => next)}
        />
      )}
    </>
  );
}

// ThreePane — the dense editorial 3-pane shell. Used in viewMode="advanced".
// All modal state is owned by the BoardWithModals parent — this component
// just calls the open-callbacks via props.
//
// Sidebar collapse persists per-side via localStorage["nq-left-coll"] /
// "nq-right-coll".
function ThreePane({
  state,
  setState,
  destinations,
  rowsByDest,
  onPermitClick,
  onGenerateItinerary,
  onShareClick,
  onStartOver,
}: {
  state: TripStateV2;
  setState: (updater: (prev: TripStateV2) => TripStateV2) => void;
  destinations: DestinationLite[];
  rowsByDest: ReturnType<typeof useTripLogistics>["rowsByDest"];
  onPermitClick: (id: string, name: string) => void;
  onGenerateItinerary: () => void;
  onShareClick: () => void;
  onStartOver: () => void;
}) {
  const [view, setView] = useState<"list" | "map">("list");
  // SSR-safe lazy init from localStorage. Default = expanded (false).
  const [leftCollapsed, setLeftCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("nq-left-coll") === "1";
  });
  const [rightCollapsed, setRightCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("nq-right-coll") === "1";
  });
  useEffect(() => {
    localStorage.setItem("nq-left-coll", leftCollapsed ? "1" : "0");
  }, [leftCollapsed]);
  useEffect(() => {
    localStorage.setItem("nq-right-coll", rightCollapsed ? "1" : "0");
  }, [rightCollapsed]);

  const cols = `${leftCollapsed ? "0px" : "300px"} 1fr ${rightCollapsed ? "0px" : "320px"}`;

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: cols,
        background: "var(--paper)",
        color: "var(--ink)",
        transition: "grid-template-columns .22s ease",
      }}
    >
      <div style={{ gridColumn: "1", overflow: "hidden" }}>
        {!leftCollapsed && (
          <LibraryPanel destinations={destinations} state={state} setState={setState} />
        )}
      </div>

      <div style={{ gridColumn: "2", overflow: "auto", minHeight: 0, display: "flex", flexDirection: "column" }}>
        <BoardCanvas
          state={state}
          setState={setState}
          destinations={destinations}
          rowsByDest={rowsByDest}
          onPermitClick={onPermitClick}
          onGenerateItinerary={onGenerateItinerary}
          onShareClick={onShareClick}
          view={view}
          onToggleView={setView}
          leftCollapsed={leftCollapsed}
          rightCollapsed={rightCollapsed}
          onToggleLeft={() => setLeftCollapsed((v) => !v)}
          onToggleRight={() => setRightCollapsed((v) => !v)}
          onStartOver={onStartOver}
        />
      </div>

      <div
        style={{
          gridColumn: "3",
          overflow: "hidden",
          borderLeft: rightCollapsed ? "none" : "1px solid var(--rule-2)",
        }}
      >
        {!rightCollapsed && (
          <CostPanel
            state={state}
            destinations={destinations}
            rowsByDest={rowsByDest}
            onPermitClick={onPermitClick}
            onShareClick={onShareClick}
          />
        )}
      </div>

      {/* Floating reopen pills when a side is collapsed */}
      {leftCollapsed && (
        <div style={{ position: "fixed", left: 12, top: "50%", transform: "translateY(-50%)", zIndex: 5 }}>
          <button
            type="button"
            onClick={() => setLeftCollapsed(false)}
            title="Open library"
            style={{
              all: "unset", cursor: "pointer", width: 28, height: 56,
              background: "var(--paper-2)", border: "1px solid var(--rule-2)", borderLeft: "none",
              borderRadius: "0 4px 4px 0", display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink-3)",
            }}
          >
            ›
          </button>
        </div>
      )}
      {rightCollapsed && (
        <div style={{ position: "fixed", right: 12, top: "50%", transform: "translateY(-50%)", zIndex: 5 }}>
          <button
            type="button"
            onClick={() => setRightCollapsed(false)}
            title="Open aggregator"
            style={{
              all: "unset", cursor: "pointer", width: 28, height: 56,
              background: "var(--paper-2)", border: "1px solid var(--rule-2)", borderRight: "none",
              borderRadius: "4px 0 0 4px", display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--ink-3)",
            }}
          >
            ‹
          </button>
        </div>
      )}

    </div>
  );
}

export type { TripStateV2 };

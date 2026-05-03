"use client";

// Trip Board shell — Phase 1.
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
import { currentMonthIST } from "@itp/shared";
import { ColdStart, type ColdStartSeed } from "./cold-start";
import { LibraryPanel } from "./library-panel";
import { BoardCanvas } from "./board-canvas";
import { CostPanel } from "./cost-panel";

type DestinationLite = {
  id: string;
  name: string;
  difficulty: string | null;
  elevation_m: number | null;
  state: { name: string } | null;
  destination_months: { month: number; score: number }[] | null;
  festivals?: { name: string; month: number | null }[] | null;
  daily_cost?: Record<string, unknown> | null;
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

  return (
    <div
      className="grid min-h-[calc(100vh-4rem)] gap-0"
      style={{ gridTemplateColumns: "minmax(280px, 300px) 1fr minmax(280px, 320px)" }}
      data-trip-shell
    >
      <LibraryPanel destinations={destinations} state={state} setState={setState} />
      <BoardCanvas state={state} setState={setState} destinations={destinations} />
      <CostPanel state={state} destinations={destinations} />

      {cloudConflict && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-md border border-border bg-background p-4 shadow-lg">
          <p className="font-serif text-sm">
            A newer trip board is saved on another device. Replace what&apos;s open here?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={acceptCloudConflict}
              className="rounded-md border border-border px-3 py-1 text-xs hover:bg-muted"
            >
              Yes, load it
            </button>
            <button
              type="button"
              onClick={dismissCloudConflict}
              className="rounded-md px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Keep this one
            </button>
          </div>
        </div>
      )}

      {!signedIn && (
        <div
          className="fixed bottom-4 left-4 z-40 hidden max-w-xs rounded-md border border-border bg-background/90 p-3 text-xs text-muted-foreground backdrop-blur md:block"
          data-anon-hint
        >
          Sign in to sync this trip across devices. Your work stays local until then.
        </div>
      )}
    </div>
  );
}

export type { TripStateV2 };

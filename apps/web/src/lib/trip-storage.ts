"use client";

// Hybrid Trip Board persistence.
//
// Anonymous users keep using localStorage["tripBoard"] (no auth wall on a
// feature that's currently anonymous — top-of-funnel must stay frictionless).
// Signed-in users get optional cloud sync to the trip_boards table (one row
// per user; last-write-wins on updated_at; public read by share_token).
//
// Two storage shapes coexist:
//   v1 (legacy, current trip-board.tsx) — items[] with {destinationId, days,
//     notes, order}. month is single-int. No date resolution.
//   v2 (new, year-band drag) — adds stops[] with {destinationId, days, notes,
//     order, startDay} where startDay is day-of-year 1-365. month derived
//     from earliest startDay. Backwards-compatible: when reading v1, we
//     convert items → stops with default startDay = first-of-month + idx*5.
//
// Writes are always v2. The legacy items[] field is kept in the persisted
// payload as a mirror of stops[] (without startDay) so old code paths
// reading the legacy shape still work during the transition window.
//
// IMPORTANT: localStorage stays the source of truth even when signed in.
// Cloud sync is a backup + cross-device fetch. On conflict (cloud newer than
// local), we surface a toast asking the user to merge — we never silently
// overwrite local work.

import { useEffect, useRef, useState } from "react";
import { getBrowserSupabase } from "./supabase-browser";
import { currentMonthIST } from "@itp/shared";

const STORAGE_KEY = "tripBoard";
const SYNC_DEBOUNCE_MS = 1500;

export type TripStop = {
  destinationId: string;
  days: number;
  notes: string;
  order: number;
  /** Day-of-year (1-365) where this stop starts on the year band. */
  startDay: number;
};

/** Legacy v1 item shape — kept for backwards-compat with the current
 * trip-board.tsx code path. New code reads `stops` instead. */
export type TripItemLegacy = {
  destinationId: string;
  days: number;
  notes: string;
  order: number;
};

export type TripStateV2 = {
  version: 2;
  name: string;
  /** Derived from earliest stop.startDay; kept for legacy filters. */
  month: number;
  travelers: number;
  budget: string;
  stops: TripStop[];
  /** Mirror of stops[] without startDay — preserved so legacy code paths still work. */
  items: TripItemLegacy[];
  createdAt: string;
  updatedAt: string;
};

const DEFAULT_TRIP: TripStateV2 = {
  version: 2,
  name: "My India Trip",
  month: currentMonthIST(),
  travelers: 2,
  budget: "midrange",
  stops: [],
  items: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// ---- Shape migration helpers --------------------------------------------------

function firstOfMonthDoy(month: number): number {
  // 1-based day-of-year for the first of the given month in the current year.
  // Year-band uses non-leap math; close enough for stop placement.
  const offsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  return (offsets[month - 1] ?? 0) + 1;
}

function migrateV1toV2(raw: unknown): TripStateV2 {
  // raw may be a partial v1 payload — defensive defaults throughout.
  const r = (raw ?? {}) as Record<string, unknown>;
  const month: number = typeof r.month === "number" ? r.month : currentMonthIST();
  const rawItems = Array.isArray(r.items) ? (r.items as unknown[]) : [];
  const items: TripItemLegacy[] = rawItems.map((rawIt, idx) => {
    const it = (rawIt ?? {}) as Record<string, unknown>;
    return {
      destinationId: String(it.destinationId ?? ""),
      days: Number.isFinite(it.days) ? (it.days as number) : 2,
      notes: typeof it.notes === "string" ? it.notes : "",
      order: Number.isFinite(it.order) ? (it.order as number) : idx,
    };
  });

  // Convert items → stops by sequencing them along the chosen month at 5-day
  // gaps. Editor can drag to refine in the year band.
  let cursor = firstOfMonthDoy(month);
  const stops: TripStop[] = items
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((it) => {
      const stop: TripStop = { ...it, startDay: cursor };
      cursor = Math.min(365, cursor + Math.max(1, it.days || 2));
      return stop;
    });

  return {
    version: 2,
    name: typeof r.name === "string" ? r.name : DEFAULT_TRIP.name,
    month,
    travelers: Number.isFinite(r.travelers) ? (r.travelers as number) : 2,
    budget: typeof r.budget === "string" ? r.budget : "midrange",
    stops,
    items,
    createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function isV2(raw: unknown): raw is TripStateV2 {
  if (!raw || typeof raw !== "object") return false;
  const r = raw as Record<string, unknown>;
  return r.version === 2 && Array.isArray(r.stops);
}

/** Read from localStorage, migrating shape on the fly. SSR-safe (returns DEFAULT). */
export function readLocal(): TripStateV2 {
  if (typeof window === "undefined") return DEFAULT_TRIP;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TRIP;
    const parsed = JSON.parse(raw);
    if (isV2(parsed)) return parsed;
    return migrateV1toV2(parsed);
  } catch {
    return DEFAULT_TRIP;
  }
}

/** Write to localStorage. Always persists v2 shape. */
export function writeLocal(state: TripStateV2): void {
  if (typeof window === "undefined") return;
  const next: TripStateV2 = {
    ...state,
    version: 2,
    // Mirror stops → items so legacy code paths still see something useful.
    items: state.stops.map(
      (s): TripItemLegacy => ({
        destinationId: s.destinationId,
        days: s.days,
        notes: s.notes,
        order: s.order,
      })
    ),
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

// ---- Cloud sync (signed-in users only) ---------------------------------------
//
// Direct browser-client to Supabase. RLS on trip_boards enforces own-row only,
// so passing user_id explicitly is safe (server validates against auth.uid()).
// No API route needed — saves a round-trip and matches the codebase's pattern
// for user-scoped data (gap_year_plans, profiles, etc.).

async function getCurrentUserId(): Promise<string | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

/** Push local state to trip_boards (one row per user). Last-write-wins on updated_at. */
export async function pushToCloud(state: TripStateV2): Promise<{ ok: boolean; error?: string }> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { ok: false, error: "supabase_unavailable" };
  const uid = await getCurrentUserId();
  if (!uid) return { ok: false, error: "not_signed_in" };

  const { error } = await supabase
    .from("trip_boards")
    .upsert(
      {
        user_id: uid,
        payload: state,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

/** Pull from trip_boards. Returns null if no row or not signed in. */
export async function pullFromCloud(): Promise<TripStateV2 | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("trip_boards")
    .select("payload, updated_at")
    .eq("user_id", uid)
    .maybeSingle();

  if (error || !data?.payload) return null;
  return isV2(data.payload) ? data.payload : migrateV1toV2(data.payload);
}

// ---- Hook --------------------------------------------------------------------

/**
 * useTripBoard — single source of truth for the Trip Board state.
 *
 * - Initial state: read from localStorage (with v1→v2 migration).
 * - Every mutation: writes to localStorage immediately + debounced cloud sync
 *   if user is signed in.
 * - Mount: opportunistically pulls from cloud; if cloud.updatedAt > local,
 *   surfaces `cloudConflict` so caller can prompt-and-merge.
 *
 * Returns (state, setState, meta) where meta carries sync status flags.
 */
export function useTripBoard() {
  // Lazy initial state: read localStorage synchronously on first render so we
  // don't paint the default state and then hydrate (avoids a ColdStart flash
  // for users with stops already saved). readLocal is SSR-safe.
  const [state, _setState] = useState<TripStateV2>(() => readLocal());
  const [hydrated, setHydrated] = useState(false);
  const [cloudConflict, setCloudConflict] = useState<TripStateV2 | null>(null);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial cloud check after mount. Hydration is already complete at this
  // point (lazy useState above seeded `state` from localStorage on mount) —
  // this effect just flips a "client-mounted" flag and kicks off the cloud
  // check. The setHydrated call is the canonical mount-only marker pattern;
  // ESLint's set-state-in-effect rule is overcautious here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);

    (async () => {
      const uid = await getCurrentUserId();
      setSignedIn(!!uid);
      if (!uid) return;
      const cloud = await pullFromCloud();
      const local = readLocal();
      if (!cloud) {
        // No cloud row yet — push the local state up so the user has a backup.
        await pushToCloud(local);
        return;
      }
      // Cloud row exists. If it's newer than local, surface for merge.
      const cloudT = Date.parse(cloud.updatedAt);
      const localT = Date.parse(local.updatedAt);
      if (Number.isFinite(cloudT) && Number.isFinite(localT) && cloudT > localT + 2000) {
        setCloudConflict(cloud);
      } else if (cloudT < localT - 2000) {
        // Local is newer — push up.
        await pushToCloud(local);
      }
    })();
  }, []);

  // Wrapped setter: write local + schedule cloud sync.
  function setState(updater: TripStateV2 | ((prev: TripStateV2) => TripStateV2)) {
    _setState((prev) => {
      const next =
        typeof updater === "function" ? (updater as (p: TripStateV2) => TripStateV2)(prev) : updater;
      writeLocal(next);
      if (signedIn) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          pushToCloud(next);
        }, SYNC_DEBOUNCE_MS);
      }
      return next;
    });
  }

  function acceptCloudConflict() {
    if (!cloudConflict) return;
    _setState(cloudConflict);
    writeLocal(cloudConflict);
    setCloudConflict(null);
  }

  function dismissCloudConflict() {
    if (cloudConflict) {
      // User chose local; push local up to overwrite cloud.
      pushToCloud(state);
    }
    setCloudConflict(null);
  }

  return {
    state,
    setState,
    hydrated,
    signedIn,
    cloudConflict,
    acceptCloudConflict,
    dismissCloudConflict,
  };
}

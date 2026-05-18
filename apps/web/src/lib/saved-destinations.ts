"use client";

import { useEffect, useState } from "react";

// Canonical localStorage key. Pre-migration there were TWO keys storing
// the same concept:
//   - "nakshiq_saved"     (used by mobile-destination-enhancements.tsx)
//   - "savedDestinations" (used by saved-content.tsx + explore-grid.tsx)
// First call to this util reads BOTH, unions by id, writes to
// savedDestinations, and sets a sentinel. nakshiq_saved is left intact
// for rollback safety. Subsequent reads use the canonical key only.
const KEY = "savedDestinations";
const LEGACY_KEY = "nakshiq_saved";
const MIGRATED_SENTINEL = "savedDestinations_v2_migrated";
const CHANGE_EVENT = "nakshiq:saved-changed";

function safeParse(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function migrateOnce(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(MIGRATED_SENTINEL) === "1") return;
  const canonical = safeParse(localStorage.getItem(KEY));
  const legacy = safeParse(localStorage.getItem(LEGACY_KEY));
  if (legacy.length === 0 && canonical.length === 0) {
    // Nothing to merge but mark migrated so we don't re-check.
    localStorage.setItem(MIGRATED_SENTINEL, "1");
    return;
  }
  const merged = Array.from(new Set([...canonical, ...legacy]));
  localStorage.setItem(KEY, JSON.stringify(merged));
  localStorage.setItem(MIGRATED_SENTINEL, "1");
}

export function getSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  migrateOnce();
  return safeParse(localStorage.getItem(KEY));
}

export function isSaved(id: string): boolean {
  return getSavedIds().includes(id);
}

export function addSaved(id: string): string[] {
  if (typeof window === "undefined") return [];
  migrateOnce();
  const current = safeParse(localStorage.getItem(KEY));
  if (current.includes(id)) return current;
  const next = [...current, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  // Also write to legacy key so older code paths (until they're migrated)
  // stay in sync. Safe to remove once mobile-destination-enhancements +
  // explore-grid are fully on the util.
  localStorage.setItem(LEGACY_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { ids: next } }));
  return next;
}

export function removeSaved(id: string): string[] {
  if (typeof window === "undefined") return [];
  migrateOnce();
  const current = safeParse(localStorage.getItem(KEY));
  const next = current.filter((x) => x !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  localStorage.setItem(LEGACY_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { ids: next } }));
  return next;
}

export function toggleSaved(id: string): { ids: string[]; isSaved: boolean } {
  const wasSaved = isSaved(id);
  const ids = wasSaved ? removeSaved(id) : addSaved(id);
  return { ids, isSaved: !wasSaved };
}

/** React hook — returns live saved-ids that re-render on add/remove. */
export function useSavedIds(): string[] {
  const [ids, setIds] = useState<string[]>(() => getSavedIds());

  useEffect(() => {
    function handleChange(e: Event) {
      const ce = e as CustomEvent<{ ids: string[] }>;
      if (ce.detail?.ids) setIds(ce.detail.ids);
      else setIds(getSavedIds());
    }
    function handleStorage(e: StorageEvent) {
      // Cross-tab sync
      if (e.key === KEY || e.key === LEGACY_KEY) setIds(getSavedIds());
    }
    window.addEventListener(CHANGE_EVENT, handleChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return ids;
}

export function useSavedCount(): number {
  return useSavedIds().length;
}

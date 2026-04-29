"use client";

import { useEffect } from "react";

/**
 * Auto-reload when a Next.js chunk fails to load — almost always caused by
 * a deploy that happened mid-session, where the open tab still references
 * old chunk hashes that no longer exist on the CDN. A hard reload fetches
 * the new HTML referencing the new chunks.
 *
 * Guarded by sessionStorage so a genuinely-broken state (offline, missing
 * file on origin) doesn't loop forever — we only auto-reload ONCE per tab
 * session. After that the user sees the normal error UI.
 *
 * The Next.js error.tsx boundary is the right place for this: it receives
 * the thrown error and gets re-rendered when reset() is called.
 */
export function useChunkErrorRecovery(error: Error & { message?: string; name?: string }) {
  useEffect(() => {
    const message = `${error?.message ?? ""} ${error?.name ?? ""}`;
    const isChunkError = /Loading (CSS )?chunk|Failed to load chunk|ChunkLoadError/i.test(message);
    if (!isChunkError) return;

    const RELOAD_KEY = "nakshiq:chunk-reload-attempted";
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(RELOAD_KEY)) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    window.location.reload();
  }, [error]);
}

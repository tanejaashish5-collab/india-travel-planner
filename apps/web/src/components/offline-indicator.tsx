"use client";

import { useEffect, useState } from "react";

// Fixed-position offline badge — only renders when navigator.onLine === false.
// Shows at the bottom on mobile, top-right on larger screens, so it never
// occludes Nav or the SOS floating button.
export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof navigator !== "undefined" && "onLine" in navigator) {
      setOffline(!navigator.onLine);
    }
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!mounted || !offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] sm:bottom-auto sm:top-20 sm:right-4 sm:left-auto sm:translate-x-0"
    >
      <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 backdrop-blur-sm px-4 py-2 text-xs font-medium text-amber-200 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
        </span>
        <span>You're offline — saved pages still work</span>
      </div>
    </div>
  );
}

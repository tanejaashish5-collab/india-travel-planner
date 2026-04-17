"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS (no beforeinstallprompt support)
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    // Track visits
    const visits = parseInt(localStorage.getItem("nakshiq_visits") || "0") + 1;
    localStorage.setItem("nakshiq_visits", String(visits));

    // Don't show if already dismissed or installed
    const dismissed = localStorage.getItem("nakshiq_pwa_dismissed");
    if (dismissed && Date.now() - parseInt(dismissed) < 14 * 24 * 60 * 60 * 1000) return;
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Android: capture browser install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Show after engagement threshold: 3+ visits AND 20+ seconds
    const timer = setTimeout(() => {
      const currentVisits = parseInt(localStorage.getItem("nakshiq_visits") || "0");
      if (currentVisits >= 3) {
        if (ios || deferredPrompt) setShowBanner(true);
        // For iOS, show even without deferredPrompt (we'll show manual instructions)
        if (ios) setShowBanner(true);
      }
    }, 20000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    }
    dismiss();
  }

  function dismiss() {
    setShowBanner(false);
    localStorage.setItem("nakshiq_pwa_dismissed", String(Date.now()));
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 left-4 right-4 z-[60] md:hidden"
        >
          <div className="bg-card border border-border rounded-2xl shadow-2xl p-4">
            <div className="flex items-start gap-3">
              <img src="/icon-192.png" alt="NakshIQ" className="w-12 h-12 rounded-xl" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">Access trips offline</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isIOS
                    ? "Tap Share ↗ then \"Add to Home Screen\""
                    : "Add NakshIQ to your home screen — works without internet in remote areas"
                  }
                </p>
              </div>
              <button onClick={dismiss} className="text-muted-foreground p-1 -mr-1 -mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>
            {!isIOS && (
              <button
                onClick={handleInstall}
                className="mt-3 w-full bg-[#E55642] text-white rounded-xl py-2.5 text-sm font-semibold active:scale-[0.98] transition-transform"
              >
                Add to Home Screen
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

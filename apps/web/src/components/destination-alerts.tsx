"use client";

import { useState, useEffect } from "react";
import { m as motion, AnimatePresence } from "framer-motion";

interface Alert {
  type: "danger" | "warning" | "info";
  title: string;
  message: string;
  source: string;
}

const ALERT_STYLES: Record<string, string> = {
  danger: "border-red-500/30 bg-red-500/10 text-red-300",
  warning: "border-orange-500/30 bg-orange-500/10 text-orange-300",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-300",
};

const ALERT_ICONS: Record<string, string> = {
  danger: "🚫",
  warning: "⚠️",
  info: "ℹ️",
};

export function DestinationAlerts({ destinationId }: { destinationId: string }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`/api/alerts?id=${destinationId}`)
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch(() => {});
  }, [destinationId]);

  const visibleAlerts = alerts.filter((a) => !dismissed.has(a.title));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence>
        {visibleAlerts.map((alert) => (
          <motion.div
            key={alert.title}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`rounded-xl border p-3 ${ALERT_STYLES[alert.type]}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5">{ALERT_ICONS[alert.type]}</span>
                <div>
                  <h4 className="text-sm font-semibold">{alert.title}</h4>
                  <p className="text-xs mt-0.5 opacity-80">{alert.message}</p>
                </div>
              </div>
              <button
                onClick={() => setDismissed((prev) => new Set([...prev, alert.title]))}
                className="text-xs opacity-50 hover:opacity-100 shrink-0"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

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

type Variant = "default" | "cinematic";

export function DestinationAlerts({
  destinationId,
  variant = "default",
  maxVisible = 2,
}: {
  destinationId: string;
  variant?: Variant;
  maxVisible?: number;
}) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`/api/alerts?id=${destinationId}`)
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch(() => {});
  }, [destinationId]);

  const visibleAlerts = alerts
    .filter((a) => !dismissed.has(a.title))
    .slice(0, maxVisible);

  if (visibleAlerts.length === 0) return null;

  if (variant === "cinematic") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          fontFamily: "var(--cinema-mono, ui-monospace)",
        }}
      >
        <AnimatePresence>
          {visibleAlerts.map((alert) => {
            const isOpen = expanded.has(alert.title);
            const tint =
              alert.type === "danger"
                ? "var(--vermillion)"
                : alert.type === "warning"
                  ? "#E8A332"
                  : "var(--bone-dim)";
            return (
              <motion.div
                key={alert.title}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  borderTop: "1px solid var(--hair)",
                  borderBottom: "1px solid var(--hair)",
                  background: "rgba(229,86,66,0.04)",
                  padding: "10px 24px",
                  color: "var(--bone)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((prev) => {
                        const next = new Set(prev);
                        if (next.has(alert.title)) next.delete(alert.title);
                        else next.add(alert.title);
                        return next;
                      })
                    }
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      background: "transparent",
                      border: "none",
                      color: "inherit",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      textTransform: "inherit",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                      flex: 1,
                      minWidth: 0,
                    }}
                    aria-expanded={isOpen}
                  >
                    <span
                      aria-hidden="true"
                      style={{ color: tint, fontWeight: 700 }}
                    >
                      ●
                    </span>
                    <span style={{ color: tint, fontWeight: 700 }}>ALERT</span>
                    <span aria-hidden="true" style={{ opacity: 0.4 }}>
                      ·
                    </span>
                    <span
                      style={{
                        color: "var(--bone)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
                      }}
                    >
                      {alert.title}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: "var(--bone-faint)",
                        marginLeft: "auto",
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDismissed(
                        (prev) => new Set([...prev, alert.title]),
                      )
                    }
                    aria-label="Dismiss alert"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--bone-faint)",
                      cursor: "pointer",
                      padding: "0 4px",
                      fontSize: 14,
                    }}
                  >
                    ×
                  </button>
                </div>
                {isOpen && (
                  <p
                    style={{
                      margin: "10px 0 0 26px",
                      color: "var(--bone-dim)",
                      letterSpacing: "0.04em",
                      textTransform: "none",
                      fontSize: 13,
                      lineHeight: 1.55,
                      fontFamily:
                        "var(--cinema-display), Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    {alert.message}
                    {alert.source && (
                      <span
                        style={{
                          color: "var(--bone-faint)",
                          marginLeft: 8,
                          fontStyle: "normal",
                          fontSize: 11,
                        }}
                      >
                        — {alert.source}
                      </span>
                    )}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }

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

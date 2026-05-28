"use client";

import { useEffect, useRef, useState } from "react";
import { KEY_EVENTS, track } from "@/lib/analytics";
import { addSaved, isSaved } from "@/lib/saved-destinations";

// Mid-page conversion hook for /destination/[id]/[month] and /destination/[id].
// Renders nothing if no peak month is supplied (parent decides — peak month
// resolution happens server-side via getPeakMonth() to avoid client lying).
//
// 2026-05-28 rewrite: was an email-capture form that drew 0 conversions on
// 190+/day views for a week. Root cause was structural, not copy — the page
// already answers "when do I go", so an email ask for a redundant future
// reminder had no value. AND the high-traffic month pages had no save button
// at all, starving the existing save→email funnel (SaveListEmailPrompt fires
// at 2 saves but nobody could save from these pages). This now offers the
// natural one-tap action — SAVE the destination — which feeds that funnel.
//
// Fires:
//   - destination_alert_view  (once per session, on IntersectionObserver hit)
//   - save_destination        (on save tap; surface="peak-alert-hook")

export type PeakAlertHookLocale = "en" | "hi";

interface Props {
  destinationId: string;
  destinationName: string;
  peakMonthName: string;          // "May"
  peakMonthNum: number;           // 1-12
  locale: PeakAlertHookLocale;
  source?: string;                // analytics source tag, e.g. "dest-month-tungnath-may"
  /** The month the reader is currently on (dest×month page). Omitted on the
   *  dest top-level page. Drives the contextual month-gap headline. */
  currentMonthName?: string;
  /** Score of the current month (1-5). Used to detect an off-month page. */
  currentScore?: number;
}

const COPY = {
  en: {
    kicker: (m: string) => `PEAK ALERT · ${m.toUpperCase()}`,
    save: (d: string) => `Save ${d}`,
    saved: "✓ Saved to your shortlist",
    savedHint:
      "Save a couple and we'll offer to email you the list — with a heads-up before each place peaks.",
  },
  hi: {
    kicker: (m: string) => `पीक अलर्ट · ${m.toUpperCase()}`,
    save: (d: string) => `${d} सहेजें`,
    saved: "✓ आपकी सूची में सहेजा गया",
    savedHint:
      "कुछ जगहें सहेजें और हम आपकी सूची ईमेल करने की पेशकश करेंगे — हर जगह के पीक से पहले हेड्स-अप के साथ।",
  },
} as const;

// Contextual headline + subhead. When the reader is on an off-month page
// (score ≤ 3), lead with the month-gap — the exact moment the offer answers
// the question the page just raised ("ok, so WHEN should I go?"). Both
// variants now point at the SAVE action, not an email.
function buildPitch(
  locale: PeakAlertHookLocale,
  dest: string,
  peakMonth: string,
  currentMonthName?: string,
  currentScore?: number,
): { headline: string; subhead: string } {
  const isOffMonth =
    currentMonthName != null &&
    currentScore != null &&
    currentScore > 0 &&
    currentScore <= 3 &&
    currentMonthName !== peakMonth;

  if (locale === "hi") {
    if (isOffMonth) {
      return {
        headline: `${currentMonthName} ${dest} का सही महीना नहीं है। ${peakMonth} है।`,
        subhead: `इसे अपनी सूची में सहेजें ताकि आप सही समय पर जाएँ — ${peakMonth} में, इस महीने नहीं।`,
      };
    }
    return {
      headline: `${dest} ${peakMonth} में सबसे अच्छा होता है।`,
      subhead: `इसे अपनी सूची में सहेजें — हम ${peakMonth} के पीक से पहले आपकी मदद करेंगे।`,
    };
  }
  if (isOffMonth) {
    return {
      headline: `${currentMonthName} isn't the month for ${dest}. ${peakMonth} is.`,
      subhead: `Save it to your shortlist so you plan the right window — ${peakMonth}, not ${currentMonthName}.`,
    };
  }
  return {
    headline: `${dest} is at its best in ${peakMonth}.`,
    subhead: `Save it to your shortlist and we'll help you catch ${peakMonth} before it fills up.`,
  };
}

export function PeakAlertHook({
  destinationId,
  destinationName,
  peakMonthName,
  peakMonthNum,
  locale,
  source,
  currentMonthName,
  currentScore,
}: Props) {
  const [saved, setSaved] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const t = COPY[locale];
  const pitch = buildPitch(locale, destinationName, peakMonthName, currentMonthName, currentScore);
  const analyticsSource = source ?? `dest-alert-${destinationId}-${peakMonthNum}`;

  // Reflect existing saved state after mount (avoids SSR hydration mismatch —
  // server + first client render both show the idle button).
  useEffect(() => {
    if (isSaved(destinationId)) setSaved(true);
  }, [destinationId]);

  // Fire impression once per session when scrolled into view
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || viewedRef.current) return;
    const sessionKey = `nq_alert_seen_${destinationId}`;
    if (typeof window !== "undefined" && window.sessionStorage?.getItem(sessionKey)) {
      viewedRef.current = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !viewedRef.current) {
            viewedRef.current = true;
            track(KEY_EVENTS.DESTINATION_ALERT_VIEW, {
              source: analyticsSource,
              destination: destinationId,
              peak_month: peakMonthNum,
            });
            try { window.sessionStorage?.setItem(sessionKey, "1"); } catch { /* ignore quota */ }
            io.disconnect();
            return;
          }
        }
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [destinationId, peakMonthNum, analyticsSource]);

  function handleSave() {
    if (saved) return;
    addSaved(destinationId);
    setSaved(true);
    track(KEY_EVENTS.SAVE_DESTINATION, {
      destination: destinationId,
      action: "add",
      surface: "peak-alert-hook",
      peak_month: peakMonthNum,
    });
    // Note: deliberately NOT setting nq_alert_submitted — once the saved count
    // crosses the threshold, SaveListEmailPrompt SHOULD fire to capture email.
  }

  return (
    <div
      ref={wrapRef}
      style={{
        margin: "32px auto",
        maxWidth: 640,
        padding: "24px 24px 22px",
        border: "1px solid var(--vermillion, #E55642)",
        borderRadius: 2,
        background: "var(--paper-faint, rgba(229, 86, 66, 0.04))",
      }}
    >
      <p
        className="nq-mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "var(--vermillion, #E55642)",
          margin: "0 0 12px",
          fontWeight: 600,
        }}
      >
        {t.kicker(peakMonthName)}
      </p>
      <h3
        style={{
          fontFamily: "var(--cinema-display, Fraunces, Georgia, serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(20px, 3.4vw, 26px)",
          lineHeight: 1.18,
          color: "var(--ink, #0e0e0e)",
          margin: "0 0 8px",
        }}
      >
        {pitch.headline}
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.55,
          color: "var(--ink-soft, #444)",
          margin: "0 0 18px",
        }}
      >
        {pitch.subhead}
      </p>

      {saved ? (
        <p
          className="nq-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--vermillion, #E55642)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {t.saved}
          <span
            style={{
              display: "block",
              marginTop: 6,
              letterSpacing: "0.02em",
              textTransform: "none",
              color: "var(--ink-soft, #555)",
              fontSize: 12,
            }}
          >
            {t.savedHint}
          </span>
        </p>
      ) : (
        <button
          type="button"
          onClick={handleSave}
          className="nq-mono"
          style={{
            background: "var(--vermillion, #E55642)",
            border: "1px solid var(--vermillion, #E55642)",
            color: "#fff",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 600,
            padding: "12px 22px",
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          {t.save(destinationName)}
        </button>
      )}
    </div>
  );
}

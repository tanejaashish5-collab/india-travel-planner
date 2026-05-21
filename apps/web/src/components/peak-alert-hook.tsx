"use client";

import { useEffect, useRef, useState } from "react";
import { KEY_EVENTS, track } from "@/lib/analytics";

// Mid-page conversion hook for /destination/[id]/[month] and /destination/[id].
// Renders nothing if no peak month is supplied (parent decides — peak month
// resolution happens server-side via getPeakMonth() to avoid client lying).
// Pattern mirrors CinematicNewsletter — single-line editorial form, vermillion
// kicker, Fraunces italic headline, monospace caption — but adds a vermillion
// outline card so it reads as a distinct interactive moment, not a coda.
//
// Fires:
//   - destination_alert_view  (once per session, on IntersectionObserver hit)
//   - destination_alert_attempt (on submit)
//   - destination_alert_success (on 200 response)
// All gated by isLikelyBot() inside track() — no contribution to bot inflation.

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
    placeholder: "your.email@example.com",
    submit: "Remind me →",
    submitting: "Sending…",
    success: (d: string) => `✓ Done. We'll email you before ${d} peaks.`,
    errorInvalid: "Enter a valid email.",
    errorLimit: "You're at the 10-alert limit. Manage your alerts.",
    errorGeneric: "Something went wrong. Try again.",
    errorNetwork: "Network error. Try again.",
  },
  hi: {
    kicker: (m: string) => `पीक अलर्ट · ${m.toUpperCase()}`,
    placeholder: "your.email@example.com",
    submit: "याद दिलाएँ →",
    submitting: "भेजा जा रहा है…",
    success: (d: string) => `✓ हो गया। ${d} पीक से पहले हम आपको ईमेल करेंगे।`,
    errorInvalid: "वैध ईमेल दर्ज करें।",
    errorLimit: "आप 10-अलर्ट सीमा पर हैं। अपने अलर्ट प्रबंधित करें।",
    errorGeneric: "कुछ गलत हुआ। फिर कोशिश करें।",
    errorNetwork: "नेटवर्क त्रुटि। फिर कोशिश करें।",
  },
} as const;

// Contextual headline + subhead. 2026-05-22 rewrite — the prior generic
// copy ("We'll tell you when X is actually worth it") drew 0 conversions
// on 94 views. New logic: when the reader is on an off-month page (score
// ≤ 3), lead with the month-gap — that's the exact moment the offer answers
// a question the page just raised ("ok, so WHEN should I go?").
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
        subhead: `${dest} के पीक से क़रीब तीन हफ़्ते पहले एक ईमेल — ताकि आप सही समय पर जाएँ, इस महीने नहीं।`,
      };
    }
    return {
      headline: `${dest} किस महीने जाने लायक है, हम बताएंगे।`,
      subhead: `${peakMonth} में ${dest} के पीक से क़रीब तीन हफ़्ते पहले एक ईमेल। बिना स्पैम, आसान अनसब्सक्राइब।`,
    };
  }
  if (isOffMonth) {
    return {
      headline: `${currentMonthName} isn't the month for ${dest}. ${peakMonth} is.`,
      subhead: `We'll send one email about three weeks before ${dest} peaks — so you book the right window, not this one.`,
    };
  }
  return {
    headline: `We'll tell you the month ${dest} is worth the trip.`,
    subhead: `One email, about three weeks before ${dest} peaks in ${peakMonth}. No spam, easy unsubscribe.`,
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);
  const t = COPY[locale];
  const pitch = buildPitch(locale, destinationName, peakMonthName, currentMonthName, currentScore);
  const analyticsSource = source ?? `dest-alert-${destinationId}-${peakMonthNum}`;

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg(t.errorInvalid);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    track(KEY_EVENTS.DESTINATION_ALERT_ATTEMPT, {
      source: analyticsSource,
      destination: destinationId,
    });
    try {
      const res = await fetch("/api/destination-alerts/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          destination_id: destinationId,
          source: analyticsSource,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.error === "alert_limit_reached") setErrorMsg(t.errorLimit);
        else setErrorMsg(data?.error || t.errorGeneric);
        setStatus("error");
        return;
      }
      track(KEY_EVENTS.DESTINATION_ALERT_SUCCESS, {
        source: analyticsSource,
        destination: destinationId,
        already_subscribed: Boolean(data?.alreadySubscribed),
      });
      // Session flag suppresses the NewsletterStickyTray on same page-view
      // (avoid double-asking back-to-back CTAs).
      try { window.sessionStorage?.setItem("nq_alert_submitted", "1"); } catch { /* ignore */ }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg(t.errorNetwork);
      setStatus("error");
    }
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

      {status === "success" ? (
        <p
          className="nq-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--vermillion, #E55642)",
            margin: 0,
          }}
        >
          {t.success(destinationName)}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            borderBottom: "1px solid var(--hair, rgba(14, 14, 14, 0.2))",
            transition: "border-color 200ms ease",
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
              if (status === "error") {
                setStatus("idle");
                setErrorMsg("");
              }
            }}
            placeholder={t.placeholder}
            aria-label="Email address"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--ink, #0e0e0e)",
              fontFamily: "var(--cinema-mono, ui-monospace, monospace)",
              fontSize: 13,
              letterSpacing: "0.04em",
              padding: "12px 0",
              minWidth: 0,
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="nq-mono"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--vermillion, #E55642)",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "12px 4px 12px 14px",
              cursor: status === "loading" ? "wait" : "pointer",
              opacity: status === "loading" ? 0.6 : 1,
              fontWeight: 600,
            }}
          >
            {status === "loading" ? t.submitting : t.submit}
          </button>
        </form>
      )}
      {status === "error" && errorMsg && (
        <p
          className="nq-mono"
          style={{
            marginTop: 8,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--vermillion, #E55642)",
          }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}

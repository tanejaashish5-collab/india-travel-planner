"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { KEY_EVENTS, track } from "@/lib/analytics";
import { getSavedIds } from "@/lib/saved-destinations";

// Primary email capture, mounted on the /saved page — the single highest-intent
// surface in the funnel (a visitor who navigates to their shortlist). Until now
// this page had NO email ask at all.
//
// Value exchange is the timing intelligence, not "email yourself a list you can
// already see": confirm and we fan your saved destinations into real peak-month
// alerts (see lib/newsletter/sync-saved-alerts.ts — wired so the existing
// send-destination-alerts cron delivers them). Honest because delivery is built.
//
// Shares the success cookie with <SaveListEmailPrompt> so a subscriber never
// sees an ask on both surfaces. Uses its own 30-day dismiss cookie.

const SUCCESS_KEY = "nakshiq_savelist_subscribed"; // shared with the toast
const DISMISS_KEY = "nakshiq_savedpage_capture";
const DISMISS_TTL_DAYS = 30;

export type SavedListCaptureLocale = "en" | "hi";

const COPY = {
  en: {
    kicker: (n: number) => `${String(n).padStart(2, "0")} SAVED · GET THE TIMING`,
    headline: "Know before they peak.",
    subhead:
      "We'll email your shortlist now — then a heads-up about three weeks before each place hits its best month, when crowds and prices climb. No spam, unsubscribe anytime.",
    placeholder: "your.email@example.com",
    submit: "Email me my list →",
    submitting: "Sending…",
    dismiss: "Maybe later",
    success: "✓ On its way. Check your inbox to confirm.",
    errorInvalid: "Enter a valid email.",
    errorGeneric: "Something went wrong. Try again.",
    errorNetwork: "Network error. Try again.",
  },
  hi: {
    kicker: (n: number) => `${String(n).padStart(2, "0")} सहेजे · सही समय जानें`,
    headline: "पीक से पहले जान लें।",
    subhead:
      "हम आपकी सूची अभी ईमेल करेंगे — फिर हर जगह के सबसे अच्छे महीने से करीब तीन हफ़्ते पहले हेड्स-अप, जब भीड़ और दाम बढ़ते हैं। बिना स्पैम, कभी भी अनसब्सक्राइब।",
    placeholder: "your.email@example.com",
    submit: "मेरी सूची ईमेल करें →",
    submitting: "भेजा जा रहा है…",
    dismiss: "बाद में",
    success: "✓ भेज दिया। पुष्टि के लिए अपना इनबॉक्स देखें।",
    errorInvalid: "वैध ईमेल दर्ज करें।",
    errorGeneric: "कुछ गलत हुआ। फिर कोशिश करें।",
    errorNetwork: "नेटवर्क त्रुटि। फिर कोशिश करें।",
  },
} as const;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function SavedListCapture({
  locale,
  savedIds,
}: {
  locale: SavedListCaptureLocale;
  savedIds: string[];
}) {
  const t = COPY[locale];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [dismissed, setDismissed] = useState<boolean>(() => getCookie(DISMISS_KEY) === "1");
  const [alreadySubscribed] = useState<boolean>(() => getCookie(SUCCESS_KEY) === "1");
  const viewedFiredRef = useRef(false);

  const visible = useMemo(() => {
    // Second instance of the same bug fixed in save-list-email-prompt.tsx:
    // hiding on `status === "success"` made the success branch below
    // unreachable, so submitting an email made this capture vanish without
    // ever showing "✓ On its way. Check your inbox to confirm." The newsletter
    // is double opt-in, so a user who is never told to check their inbox never
    // confirms and never becomes a subscriber. This is the PRIMARY capture on
    // /saved, so it mattered more here than on the global prompt.
    // SUCCESS_KEY (365d) still suppresses it on subsequent loads via
    // `alreadySubscribed`.
    if (alreadySubscribed) return false;
    if (dismissed) return false;
    return savedIds.length >= 1;
  }, [alreadySubscribed, dismissed, savedIds.length]);

  // Fire impression once when first visible.
  useEffect(() => {
    if (!visible || viewedFiredRef.current) return;
    viewedFiredRef.current = true;
    track(KEY_EVENTS.SAVE_PROMPT_VIEW, { saved_count: savedIds.length, surface: "saved-page" });
  }, [visible, savedIds.length]);

  function handleDismiss() {
    setCookie(DISMISS_KEY, "1", DISMISS_TTL_DAYS);
    setDismissed(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg(t.errorInvalid);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    const ids = savedIds.length > 0 ? savedIds : getSavedIds();
    track(KEY_EVENTS.SAVE_PROMPT_ATTEMPT, { saved_count: ids.length, surface: "saved-page" });
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: `saved-page-${ids.length}`,
          tags: ["savelist"],
          saved_destination_ids: ids,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data?.error || t.errorGeneric);
        setStatus("error");
        return;
      }
      track(KEY_EVENTS.SAVE_PROMPT_SUCCESS, {
        saved_count: ids.length,
        surface: "saved-page",
        already_subscribed: Boolean(data?.alreadySubscribed),
      });
      setStatus("success");
      setEmail("");
      setCookie(SUCCESS_KEY, "1", 365);
    } catch {
      setErrorMsg(t.errorNetwork);
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <section
      aria-label="Email my saved list"
      style={{
        marginBottom: 32,
        padding: "24px 24px 22px",
        border: "1px solid var(--vermillion)",
        background: "rgba(229, 86, 66, 0.05)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--cinema-mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--vermillion)",
          margin: "0 0 12px",
        }}
      >
        {t.kicker(savedIds.length)}
      </p>
      <h2
        style={{
          fontFamily: "var(--cinema-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(22px, 3.6vw, 30px)",
          lineHeight: 1.15,
          color: "var(--bone)",
          margin: "0 0 8px",
        }}
      >
        {t.headline}
      </h2>
      <p
        style={{
          fontFamily: "var(--cinema-ui)",
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--bone-dim)",
          margin: "0 0 18px",
          maxWidth: 560,
        }}
      >
        {t.subhead}
      </p>

      {status === "success" ? (
        <p
          style={{
            fontFamily: "var(--cinema-mono)",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--vermillion)",
            margin: 0,
          }}
        >
          {t.success}
        </p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10, maxWidth: 520 }}
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
                flex: "1 1 220px",
                minWidth: 0,
                background: "var(--paper)",
                border: "1px solid var(--hair)",
                color: "var(--bone)",
                padding: "11px 13px",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--cinema-mono)",
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: "var(--vermillion)",
                border: "1px solid var(--vermillion)",
                color: "#fff",
                padding: "11px 20px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "var(--cinema-mono)",
                cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.6 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {status === "loading" ? t.submitting : t.submit}
            </button>
          </form>
          {status === "error" && errorMsg && (
            <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--vermillion)" }}>{errorMsg}</p>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--bone-faint)",
              padding: 0,
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              fontFamily: "var(--cinema-ui)",
            }}
          >
            {t.dismiss}
          </button>
        </>
      )}
    </section>
  );
}

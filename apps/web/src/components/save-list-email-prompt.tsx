"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { KEY_EVENTS, track } from "@/lib/analytics";
import { useSavedIds, getSavedIds } from "@/lib/saved-destinations";

// Non-blocking bottom-right toast that appears once after the user has
// saved THRESHOLD destinations. Dismiss sets a 7-day cookie. Submit posts
// to /api/newsletter/subscribe with source="save-prompt-N", tags=["savelist"],
// saved_destination_ids=[...]. Resends a personalised welcome email
// (handled server-side in the subscribe route).
//
// Mount once in apps/web/src/app/[locale]/layout.tsx so it's available on
// every page where the user might cross the threshold. SSR-safe — renders
// nothing on server, no-op until count >= THRESHOLD.

// 2026-05-22: lowered 3 → 2 — the prompt drew 0 views at threshold 3
// (nobody was saving 3 destinations in a session). 2 saves is still a
// genuine intent signal and a far larger eligible pool.
// 2026-06-02: lowered 2 → 1 — same reasoning extends. On a melting,
// mostly single-page-visit funnel, even one save is real intent, and the
// value exchange is now the (delivered) peak-month alert, not "email a
// list you can already see". /saved page carries the primary capture.
const THRESHOLD = 1;
const COOKIE_KEY = "nakshiq_savelist_prompted";
const COOKIE_TTL_DAYS = 7;
const SUCCESS_KEY = "nakshiq_savelist_subscribed";   // persists forever
const SESSION_VIEWED_KEY = "nakshiq_savelist_seen";  // session-scoped

export type SaveListEmailPromptLocale = "en" | "hi";

interface Props {
  locale: SaveListEmailPromptLocale;
}

const COPY = {
  en: {
    kicker: (n: number) => `WISHLIST · ${n} SAVED`,
    headline: "Know before they peak.",
    subhead: "We'll email your saved list, then nudge you about 3 weeks before each place hits its best month — before crowds and prices climb. No spam, unsubscribe anytime.",
    placeholder: "your.email@example.com",
    submit: "Send →",
    submitting: "Sending…",
    dismiss: "Not now",
    success: "✓ Saved. Check your inbox.",
    errorInvalid: "Enter a valid email.",
    errorGeneric: "Something went wrong. Try again.",
    errorNetwork: "Network error. Try again.",
  },
  hi: {
    kicker: (n: number) => `विशलिस्ट · ${n} सहेजे`,
    headline: "पीक से पहले जान लें।",
    subhead: "हम आपकी सहेजी सूची ईमेल करेंगे, फिर हर जगह के सबसे अच्छे महीने से करीब 3 हफ़्ते पहले याद दिलाएँगे — भीड़ और दाम बढ़ने से पहले। बिना स्पैम, कभी भी अनसब्सक्राइब।",
    placeholder: "your.email@example.com",
    submit: "भेजें →",
    submitting: "भेजा जा रहा है…",
    dismiss: "अभी नहीं",
    success: "✓ सहेज लिया। अपना इनबॉक्स देखें।",
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

export function SaveListEmailPrompt({ locale }: Props) {
  const savedIds = useSavedIds();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Cookie state seeded via lazy initializer (SSR-safe via typeof window
  // check inside getCookie). Cookies don't change reactively during a
  // single page-load so initial-only read is sufficient.
  const [cookieDismissed, setCookieDismissed] = useState<boolean>(
    () => getCookie(COOKIE_KEY) === "1"
  );
  const [cookieSubscribed] = useState<boolean>(
    () => getCookie(SUCCESS_KEY) === "1"
  );
  const viewedFiredRef = useRef(false);
  const t = COPY[locale];
  // The /saved page carries its own inline primary capture (SavedListCapture);
  // suppress this global toast there so the two identical asks don't stack.
  const pathname = usePathname();
  const onSavedPage = pathname?.endsWith("/saved") ?? false;

  // Derive visibility from inputs — no setState-in-effect needed
  const visible = useMemo(() => {
    if (onSavedPage) return false;
    // NOTE: deliberately NOT hidden on `status === "success"`. That condition
    // used to live here and made the success branch below (line ~224)
    // unreachable dead code: the moment the subscribe call resolved, `visible`
    // flipped false, `if (!visible) return null` fired, and the whole dialog
    // VANISHED without ever showing "✓ Saved. Check your inbox." — a fully
    // built, styled, en+hi confirmation that had never once rendered.
    //
    // That silence is costly, not cosmetic: the newsletter is double opt-in, so
    // a subscriber only counts after clicking the link in their email. A user
    // who submits and sees the box disappear is never told to check their
    // inbox, so they never confirm. Caught by the conversion.spec.ts assertion
    // on /check your inbox/i, which was correct all along.
    //
    // The prompt stays put for the rest of this page-load showing the
    // confirmation; SUCCESS_KEY (set on success, 365d) keeps it from returning
    // on the next load via `cookieSubscribed` below.
    if (cookieSubscribed) return false;
    if (cookieDismissed) return false;
    return savedIds.length >= THRESHOLD;
  }, [onSavedPage, cookieSubscribed, cookieDismissed, savedIds.length]);

  // Fire impression once per session when first becoming visible
  useEffect(() => {
    if (!visible || viewedFiredRef.current) return;
    if (typeof window === "undefined") return;
    const seen = window.sessionStorage?.getItem(SESSION_VIEWED_KEY);
    if (seen) {
      viewedFiredRef.current = true;
      return;
    }
    viewedFiredRef.current = true;
    track(KEY_EVENTS.SAVE_PROMPT_VIEW, { saved_count: savedIds.length });
    try { window.sessionStorage?.setItem(SESSION_VIEWED_KEY, "1"); } catch { /* ignore */ }
  }, [visible, savedIds.length]);

  function handleDismiss() {
    setCookie(COOKIE_KEY, "1", COOKIE_TTL_DAYS);
    setCookieDismissed(true);
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
    track(KEY_EVENTS.SAVE_PROMPT_ATTEMPT, { saved_count: savedIds.length });
    try {
      const ids = savedIds.length > 0 ? savedIds : getSavedIds();
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          source: `save-prompt-${ids.length}`,
          tags: ["savelist", "window"],
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
    <div
      role="dialog"
      aria-label="Save your wishlist"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 60,
        maxWidth: 360,
        padding: "18px 18px 16px",
        background: "#1a1a18",
        color: "#e5e5e5",
        border: "1px solid #E55642",
        borderRadius: 8,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#E55642",
          margin: "0 0 8px",
          fontWeight: 600,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {t.kicker(savedIds.length)}
      </p>
      <h4
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: "#fff",
          margin: "0 0 6px",
          lineHeight: 1.3,
        }}
      >
        {t.headline}
      </h4>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.5,
          color: "#aaa",
          margin: "0 0 12px",
        }}
      >
        {t.subhead}
      </p>

      {status === "success" ? (
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#E55642",
            margin: 0,
            fontFamily: "ui-monospace, monospace",
            fontWeight: 600,
          }}
        >
          {t.success}
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
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
                background: "#0e0e0e",
                border: "1px solid #333",
                borderRadius: 4,
                color: "#fff",
                padding: "8px 10px",
                fontSize: 13,
                outline: "none",
                fontFamily: "ui-monospace, monospace",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                background: "#E55642",
                border: "none",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.6 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {status === "loading" ? t.submitting : t.submit}
            </button>
          </form>
          {status === "error" && errorMsg && (
            <p
              style={{
                margin: "6px 0 8px",
                fontSize: 11,
                color: "#E55642",
              }}
            >
              {errorMsg}
            </p>
          )}
          <button
            type="button"
            onClick={handleDismiss}
            style={{
              background: "transparent",
              border: "none",
              color: "#666",
              padding: 0,
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            {t.dismiss}
          </button>
        </>
      )}
    </div>
  );
}

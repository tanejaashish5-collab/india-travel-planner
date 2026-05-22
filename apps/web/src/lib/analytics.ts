/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const KEY_EVENTS = {
  EMAIL_SIGNUP: "email_signup",
  SAVE_DESTINATION: "save_destination",
  SHARE_CLICK: "share_click",
  OUTBOUND_BOOKING_CLICK: "outbound_booking_click",
  OUTBOUND_EXPERIENCE_CLICK: "outbound_experience_click",
  SCROLL_75_DESTINATION: "scroll_75_destination",
  DESTINATION_ALERT_VIEW: "destination_alert_view",
  DESTINATION_ALERT_ATTEMPT: "destination_alert_attempt",
  DESTINATION_ALERT_SUCCESS: "destination_alert_success",
  SAVE_PROMPT_VIEW: "save_prompt_view",
  SAVE_PROMPT_ATTEMPT: "save_prompt_attempt",
  SAVE_PROMPT_SUCCESS: "save_prompt_success",
} as const;

export type KeyEventName = (typeof KEY_EVENTS)[keyof typeof KEY_EVENTS];

// Catches headless browsers, common scraper user-agents, and stripped
// runtimes that fire events on every render. Sophisticated residential-proxy
// fleets still get through — this is a ~95% sieve, not a wall.
// Memoised because called on every track() call. Added 2026-05-17 after
// audit found 49K email_signups from 22.5K users in 28d (real human pool
// is ~300/28d — pure bot inflation, every page-load firing every event).
let _botCheck: boolean | undefined;
function isLikelyBot(): boolean {
  if (_botCheck !== undefined) return _botCheck;
  if (typeof window === "undefined" || typeof navigator === "undefined") return (_botCheck = true);
  const nav = navigator as Navigator & { webdriver?: boolean };
  if (nav.webdriver) return (_botCheck = true);
  const ua = (nav.userAgent || "").toLowerCase();
  if (/bot|crawler|spider|headless|phantom|puppeteer|playwright|selenium|wget|curl|http-client|chatgpt|claudebot|gptbot|ccbot|perplexity/.test(ua)) return (_botCheck = true);
  if (!nav.languages || nav.languages.length === 0) return (_botCheck = true);
  try {
    window.localStorage.setItem("_b", "1");
    window.localStorage.removeItem("_b");
  } catch {
    return (_botCheck = true);
  }
  return (_botCheck = false);
}

// Single dataLayer is shared by both configured GA4 properties (primary +
// optional secondary), so a single gtag('event') call reaches both. Mark each
// of these names as a Key event in GA4 → Admin → Events.
export function track(
  event: KeyEventName | (string & {}),
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;
  if (isLikelyBot()) return;
  const fn = window.gtag;
  if (typeof fn !== "function") return;
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) clean[k] = v;
  }
  fn("event", event, clean);
}

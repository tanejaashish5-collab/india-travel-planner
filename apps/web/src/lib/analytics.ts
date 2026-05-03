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
  SCROLL_75_DESTINATION: "scroll_75_destination",
} as const;

export type KeyEventName = (typeof KEY_EVENTS)[keyof typeof KEY_EVENTS];

// Single dataLayer is shared by both configured GA4 properties (primary +
// optional secondary), so a single gtag('event') call reaches both. Mark each
// of these names as a Key event in GA4 → Admin → Events.
export function track(
  event: KeyEventName | (string & {}),
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (typeof window === "undefined") return;
  const fn = window.gtag;
  if (typeof fn !== "function") return;
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) clean[k] = v;
  }
  fn("event", event, clean);
}

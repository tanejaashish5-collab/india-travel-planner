// The Hindi page families we ask Google NOT to index, in one place. Middleware
// serves X-Robots-Tag: noindex,follow on them, the sitemap leaves them out, and
// the English twin stops declaring them as its hreflang alternate. They stay
// open to visitors. When a family gets a real Hindi body, take it off this list
// and all three follow.
//
// Why these: their /hi body is mostly English, so Google already has the page
// on /en. Sampled 2026-11-05 (n=160): median Hindi share of body text was
// month 16%, best 13%, festivals 8%, treks 6%, routes 1%, collections 0%, and
// no sampled page was majority Hindi. Together 169 of 7,178 clicks over 90 days.
// Kept on purpose: cost (95% Hindi, best /hi earner), vs, explore, itinerary,
// and the destination hub, which links to /hi/cost.
// Measurement and reversal rule: scripts/hi-noindex-check.mjs.
const HI_NOINDEX_FAMILIES =
  /^(?:where-to-go|state|with-kids|india-vs|the-window|guide|arrival|skip-list|blog|festivals|treks|best|routes|collections)(?:\/|$)/;
const HI_NOINDEX_DESTINATION_MONTH =
  /^destination\/[^/]+\/(?:january|february|march|april|may|june|july|august|september|october|november|december)$/;

/** `path` has no locale prefix, with or without slashes: "treks/kheerganga". */
export function isHiNoindexedPath(path: string): boolean {
  const p = path.replace(/^\/+|\/+$/g, "");
  return HI_NOINDEX_FAMILIES.test(p) || HI_NOINDEX_DESTINATION_MONTH.test(p);
}

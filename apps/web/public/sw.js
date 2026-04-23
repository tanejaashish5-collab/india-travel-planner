/* ── NakshIQ Service Worker — Offline-First for SOS & Saved ── */

// Bump when UX/content pages change materially — activate() drops older caches.
// v3: 2026-04-22 ToC + long-scroll redesign on destination/state/blog pages.
// v4: 2026-04-22 full-bleed hero video + mini-map at lg+ (luxury pattern).
// v5: 2026-04-22 destination-month editorial pass — full-bleed hero, sticky back+breadcrumb, merged verdict, sidebar ToC.
// v6: 2026-04-22 destination-month hero merges verdict stamp + prose into one announcement card (no separate verdict box).
// v7: 2026-04-22 where-to-go state-in-month: sticky back+breadcrumb, full-bleed hero, announcement card with GO/WAIT/SKIP counts, sidebar ToC.
// v8: 2026-04-23 state page — sticky back+breadcrumb pill, hero bumped to lg:h-[32rem], breadcrumb lifted out of hero overlay.
// v9: 2026-04-23 video cache-busting (?v=<YYYYMMDD>) + mobile overflow fix on destination page (share/compare row wraps below sm).
// v10: 2026-04-23 destination map enriched — nearby pins + auto-fit bounds, dark_all labelled basemap across all 3 maps, "Where am I?" context overlay.
// v11: 2026-04-23 destination map context card moved top-left → bottom-left so zoom controls aren't occluded.
// v12: 2026-04-23 Sprint-1.1 — unified TL;DR decision card on /destination/[id] (absorbs score badge + verdict + quick-stats into one panel).
// v13: 2026-04-23 Sprint-1 complete — decision rail (lg+), Simple/Pro toggle, LIVE/SCORED badges, per-section freshness stamps.
// v14: 2026-04-23 Sprint-2 complete — depth schema (014+015+016), ScenarioStrip, MicroItinerary, LogisticsChecklist, PersonaBlocks, BestFor, ElevationChart; 3 pilot destinations populated + 5 foundational scenarios seeded.
// v15: 2026-04-23 Sprint-2 tuning — Logistics moved to Simple+Pro, single-scenario full-width card, ToC reasoning documented.
// v16: 2026-04-23 Simple/Pro toggle removed. Dense blocks now inline-collapsed via CollapsibleDetails. Tourist Trap / Crowd Intelligence / International Info always shown.
// v17: 2026-04-23 CollapsibleDetails trigger gets a slow breathing ring + brighter tint so cold visitors don't scroll past it. Pulse stops once opened; respects prefers-reduced-motion.
// v18: 2026-04-23 Scenario cards stack full-width instead of 2-col grid — scenario text is too dense for cramped columns.
// v19: 2026-04-23 fix: scenario cards missing block display → border tangled around text lines. Added `block` class + bumped border opacity so cards read as proper containers.
// v20: 2026-04-23 readability: scenario IF/THEN labels + prose restructured for contrast; all 6 Sprint-2 section subtitles bumped text-xs/70 → text-sm (clearer tagline).
// v21: 2026-04-23 destination/month restructure: trim Why-scores to weather+festivals, remove PracticalDetails + HowToDoIt footer (were dup of hero chips + destination page), add FullGuideLink CTA instead.
const CACHE_VERSION = "nakshiq-v21";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const DATA_CACHE = `${CACHE_VERSION}-data`;

// Pre-cache essential files
const PRECACHE_URLS = [
  "/icon-192.png",
  "/icon-512.png",
  "/og-image.jpg",
  "/apple-touch-icon.png",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/manifest.json",
];

// Install — pre-cache essentials
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("nakshiq-") && key !== STATIC_CACHE && key !== IMAGE_CACHE && key !== DATA_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch — strategy per resource type
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and API mutations
  if (event.request.method !== "GET") return;
  if (url.pathname.startsWith("/api/")) return;
  if (url.pathname.startsWith("/_next/")) return;

  // Images — Cache First (aggressive caching for destination photos)
  if (url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg)$/i) || url.pathname.includes("/images/")) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => new Response("", { status: 404 }));
        })
      )
    );
    return;
  }

  // Destination pages — Stale While Revalidate
  if (url.pathname.match(/\/destination\//)) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          const fetchPromise = fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached || new Response("Offline", { status: 503 }));

          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Everything else — Network first, cache fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(DATA_CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || new Response("Offline", { status: 503 })))
  );
});

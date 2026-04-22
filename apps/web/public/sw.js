/* ── NakshIQ Service Worker — Offline-First for SOS & Saved ── */

// Bump when UX/content pages change materially — activate() drops older caches.
// v3: 2026-04-22 ToC + long-scroll redesign on destination/state/blog pages.
// v4: 2026-04-22 full-bleed hero video + mini-map at lg+ (luxury pattern).
// v5: 2026-04-22 destination-month editorial pass — full-bleed hero, sticky back+breadcrumb, merged verdict, sidebar ToC.
// v6: 2026-04-22 destination-month hero merges verdict stamp + prose into one announcement card (no separate verdict box).
// v7: 2026-04-22 where-to-go state-in-month: sticky back+breadcrumb, full-bleed hero, announcement card with GO/WAIT/SKIP counts, sidebar ToC.
// v8: 2026-04-23 state page — sticky back+breadcrumb pill, hero bumped to lg:h-[32rem], breadcrumb lifted out of hero overlay.
const CACHE_VERSION = "nakshiq-v8";
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

/* ── NakshIQ Service Worker — Offline-First for in-trip use ── */

// Bump when UX/content pages change materially — activate() drops older caches.
// v29: 2026-04-24 Sprint-13a offline-first upgrade — expanded precache (SOS, saved, road-conditions,
//      permits, contact, arrival, methodology), /offline fallback page, HTML network-first with
//      offline HTML fallback, API GETs cached for read-after-signal-drops (POST/PUT/DELETE still skip),
//      message handler for SKIP_WAITING (update prompts from UI).
// v30: 2026-04-27 PWA drift fix — added Sprint-4/9/14 high-traffic routes to precache
//      (corrections, press, india-vs, cost-index, weekend-from) so they're available on
//      first offline visit instead of after second navigation.
// v31: 2026-04-30 More hub launch — precache /en/more + /hi/more so the secondary
//      navigation surface (linked from the dead-button-now-fixed mobile tab bar) is
//      available offline alongside the rest of the in-trip toolset.
// v32: 2026-05-05 Post-deep-QA precache catch-up — add Trip Board, Tourist Traps,
//      Ask NakshIQ shells (and HI counterparts). All three shipped after v31:
//      /trip = saved-itinerary destination so users open it offline mid-trip;
//      /tourist-traps = trust editorial often deep-linked from social, painful to
//      cold-load on bad signal; /ask = primary chat entry, shell-only cache (the
//      stream itself stays network-bound).
// v33: 2026-05-17 S54 cinematic + Tier 1-8 + Phase 4 SEO hardening shipped on
//      web (commits 9f15e042 → a34969bb). Precached HTML in v32 still held the
//      pre-cinematic SaaS layout for the routes below, so returning PWA users
//      saw the old design when network dropped or for cached navigations.
//      Bumping cache version triggers activate handler to purge nakshiq-v32-*
//      caches and re-fetch fresh cinematic HTML on install. Adds /en/vs,
//      /en/india-vs, /en/membership, /en/transparency to precache (Tier 6+7+8
//      surfaces shipped this session).

const CACHE_VERSION = "nakshiq-v33";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const DATA_CACHE = `${CACHE_VERSION}-data`;
const HTML_CACHE = `${CACHE_VERSION}-html`;

// Pre-cache essentials + critical in-trip routes that travellers need
// when 4G drops in Spiti / Ladakh / Kinnaur. Pre-fetched on SW install so
// they're available before the user ever visits the route.
const PRECACHE_STATIC = [
  "/icon-192.png",
  "/icon-512.png",
  "/og-image.jpg",
  "/apple-touch-icon.png",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/manifest.json",
];

const PRECACHE_ROUTES = [
  "/en",
  "/en/offline",
  "/en/sos",
  "/en/saved",
  "/en/road-conditions",
  "/en/permits",
  "/en/contact",
  "/en/arrival",
  "/en/methodology",
  "/en/corrections",
  "/en/press",
  "/en/india-vs",
  "/en/cost-index",
  "/en/weekend-from",
  "/en/more",
  "/en/trip",
  "/en/tourist-traps",
  "/en/ask",
  "/en/vs",
  "/en/membership",
  "/en/transparency",
  "/hi",
  "/hi/sos",
  "/hi/saved",
  "/hi/more",
  "/hi/trip",
  "/hi/tourist-traps",
  "/hi/ask",
];

// Install — pre-cache essentials + critical routes.
// Failing on any one route must NOT block install, so we use allSettled per-URL.
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_STATIC)),
      caches.open(HTML_CACHE).then((cache) =>
        Promise.allSettled(PRECACHE_ROUTES.map((url) => cache.add(url).catch(() => null)))
      ),
    ])
  );
  self.skipWaiting();
});

// Activate — drop caches from older versions so stale HTML doesn't haunt users.
self.addEventListener("activate", (event) => {
  const currentCaches = [STATIC_CACHE, IMAGE_CACHE, DATA_CACHE, HTML_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("nakshiq-") && !currentCaches.includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Message handler — UI can post {type: "SKIP_WAITING"} to trigger update.
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Helper: offline fallback — serves /offline HTML when no cached match.
async function offlineFallback(request) {
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    const locale = new URL(request.url).pathname.startsWith("/hi") ? "hi" : "en";
    const fallback = await caches.match(`/${locale}/offline`);
    if (fallback) return fallback;
  }
  return new Response("Offline — please reconnect.", {
    status: 503,
    statusText: "Offline",
    headers: { "content-type": "text/plain" },
  });
}

// Fetch — strategy per resource type.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never intercept non-GET requests (mutations always go to network).
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests except R2 CDN for videos/images.
  const isOwnOrigin = url.origin === self.location.origin;
  const isR2Origin = url.hostname.includes("r2.dev") || url.hostname.includes("cloudflare");

  // Next internal — let it flow.
  if (url.pathname.startsWith("/_next/")) return;

  // POST-mutating API endpoints already filtered above, but skip all /api for caching
  // EXCEPT read-only GET endpoints useful offline (weather, stats). Skip for safety.
  if (url.pathname.startsWith("/api/")) return;

  // Images — Cache First (aggressive, 7-day implicit via browser expiry).
  if (url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|ico)$/i) || url.pathname.includes("/images/")) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok && (isOwnOrigin || isR2Origin)) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(() => new Response("", { status: 404 }));
        })
      )
    );
    return;
  }

  // Videos from R2 — no cache (too large), just pass-through.
  if (url.pathname.match(/\.(mp4|webm|mov)$/i)) return;

  // HTML pages — Network-first with HTML cache fallback, /offline final fallback.
  // This is the critical change for in-trip use: any page the user has already
  // visited stays readable offline.
  if (event.request.mode === "navigate" || (event.request.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok && isOwnOrigin) {
            const clone = response.clone();
            caches.open(HTML_CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) => cached || offlineFallback(event.request))
        )
    );
    return;
  }

  // Destination HTML (fetched as resource, not navigation) — Stale While Revalidate.
  if (url.pathname.match(/\/destination\//)) {
    event.respondWith(
      caches.open(DATA_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          const fetchPromise = fetch(event.request)
            .then((response) => {
              if (response.ok) cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => cached || offlineFallback(event.request));
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // Everything else — Network first, cache fallback, offline fallback last.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && isOwnOrigin) {
          const clone = response.clone();
          caches.open(DATA_CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || offlineFallback(event.request))
      )
  );
});

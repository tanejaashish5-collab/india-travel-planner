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
// v34: 2026-05-21 Booking-handoff revenue work shipped (commit 7a868a21) —
//      the booking card was added to month pages and restyled on destination
//      roots. Destination pages are served Stale-While-Revalidate from
//      nakshiq-v33-data, so returning PWA users saw the pre-booking-card
//      version on the first navigation after the deploy. Bumping to v34 makes
//      activate() purge the v33 caches so every user gets the fresh markup.
// v35: 2026-05-21 Coda newsletter form given a dark backing panel so it is
//      legible over bright full-bleed photos (was faint editorial styling
//      invisible on sunlit frames). Changes destination-page markup, so the
//      bump purges nakshiq-v34-data and serves the fixed Coda to PWA users.
// v36: 2026-05-21 PeakAlertHook removed from the cinematic destination root —
//      it rendered below the absorbed footer and stacked a second email form
//      under the Coda newsletter. Removes a section from destination-page
//      markup, so the bump purges nakshiq-v35-data for returning PWA users.
// v37: 2026-05-21 Kinetic hero title now wraps by word, not by character —
//      the per-character inline-block spans let the browser break mid-word
//      ("Bandipur Nationa / l Park"). Changes landing-page hero markup.
// v38: 2026-05-22 BookingHandoff gained a "Tours and experiences" block and an
//      affiliate disclosure line. Changes destination-page + month-page markup,
//      so the bump purges nakshiq-v37-data for returning PWA users.
// v39: 2026-05-22 Newsletter conversion pass — fixed the false "you're on the
//      list" success message (subscribers must still confirm via email),
//      reworked the sticky tray (mobile parity, slide-in, suppression), and
//      sharpened the offer copy. Changes landing-coda + destination-page +
//      /newsletter markup, so the bump purges nakshiq-v38-data.
// v40: 2026-05-22 Hindi parity for POI + sub-destinations — POISection and the
//      sub-destination cards now render translations.hi on /hi/ pages. Changes
//      /hi/ destination-page text content, so the bump purges nakshiq-v39-data
//      for returning PWA users.
// v41: 2026-05-22 Hindi UI copy rewrite — messages/hi.json reworked into natural,
//      idiomatic Hindi (brand name, de-Hinglished, calques + formality fixed).
//      Changes /hi/ text site-wide, so the bump purges nakshiq-v40-data.
// v42: 2026-05-22 Director's Cut month token now drives a real verdict — the
//      verdict card, score, editor's note and attribution all react to the
//      selected month (was wired to the current month only). Changes
//      landing-page Act V markup, so the bump purges nakshiq-v41-data.
// v43: 2026-05-23 Act 8 collection covers fix — post-mig-047 collections
//      (sapta-puris etc.) 404'd because the raw <img> bypassed Next/Image's
//      r2Loader. Now uses imageUrl() to resolve R2 WebP directly. Landing-
//      page markup change → bump purges nakshiq-v42-data.
// v44: 2026-05-23 Per-festival detail pages — /festivals/[slug] new route
//      (331 rows × 2 locales ≈ 662 indexed URLs). Festival cards on the
//      index, month, state, and state+month list views now link to the
//      detail page instead of the host destination. Fixed a pre-existing
//      bug where list views read f.dates (DB column is approximate_date).
// v45: 2026-05-23 Festival detail Path A enrichment — each /festivals/[slug]
//      page now pulls month-score, stays, eateries, POIs, travel facts,
//      live weather, and related festivals from the host destination.
//      Festival page becomes a planning lens on the destination instead
//      of a 320-char prose stub.
// v46: 2026-05-23 /luxury surface launched — new hub + per-experience detail
//      pages for India's royal trains, iconic palace stays, and curated
//      multi-property itineraries. ~30 rows × 2 locales ≈ 60 indexed URLs.
//      Destination pages gain an "iconic luxury here" rail when a property
//      is anchored to the dest. Bump purges nakshiq-v45-data so the rail
//      ships to returning PWA users.
// v47: 2026-05-23 /luxury detail-page hero videos wired — every
//      published luxury_experiences row now ships with an autoplaying
//      muted-loop <video> hero (R2-hosted, 33 properties live). Detail-
//      page markup changes (new <video> block above the title), so the
//      bump purges nakshiq-v46-html for returning PWA users.
// v49: 2026-05-26 Closes NEW-2026-05-24-001 title-stutter on /luxury +
//      /festivals/[slug] + 15 other surfaces (one main metadata.title
//      string was including " | NakshIQ" on top of the layout template's
//      "%s | NakshIQ" suffix — fixed by stripping the duplicated suffix
//      from each page's own title). Also closes E2E-2026-05-04-B1: the
//      /hi destination/[month] H1 now renders Hindi name + month +
//      "में" (Devanagari) instead of "Old Goa in May." in English. Bump
//      purges nakshiq-v48-html so returning PWA users get the fixed H1
//      + clean titles.

// v50 (2026-05-27): trek-content fill — 25 new destinations (5 Kailashes,
//      5 Prayags, Sabarimala, Tirumala, Palani + Arupadai Veedu temples,
//      Shikharji, Ziro, Kiphire, Betla, Chitrakote, Bhoramdeo, Jampui Hills),
//      31 new treks, 3 new collections (Panch Kailash, Panch Prayag,
//      Arupadai Veedu). Also fixes /treks region filter (state_id was
//      missing from the query → every region returned 0 treks).
// v51 (2026-05-28): scale + crowd + CRO parity bump. Today's web ships changed
//      page markup, so v50-cached HTML (and the SWR destination cache) held the
//      old versions for returning/offline PWA users. Bumping purges nakshiq-v50-*.
//      (1) Score display standardized to the 0–10 scale across ~14 surfaces
//          (where-to-go, region/month, explore, best/[slug], festivals, nav,
//          skip-list, guide) + fixed festivals/[slug] printing raw 0–5 as /10.
//      (2) New PEAK CROWDS caveat on the destination hub + month verdict
//          (crowd_calendar.peak_months backfilled for all 525 destinations).
//      (3) peak-alert-hook converted from a 0%-converting email form to a
//          one-tap Save CTA that feeds the save→email funnel.
//      (4) ziro → ziro-valley duplicate merge (301).
//      Also adds the where-to-go / explore / treks / festivals / states /
//      collections / luxury / guide hubs to precache (drift catch-up — these
//      shipped after the list was last curated at v33).
const CACHE_VERSION = "nakshiq-v51";
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
  "/en/where-to-go",
  "/en/explore",
  "/en/treks",
  "/en/festivals",
  "/en/states",
  "/en/collections",
  "/en/luxury",
  "/en/guide",
  "/hi",
  "/hi/sos",
  "/hi/saved",
  "/hi/more",
  "/hi/trip",
  "/hi/tourist-traps",
  "/hi/ask",
  "/hi/where-to-go",
  "/hi/explore",
  "/hi/treks",
  "/hi/festivals",
  "/hi/states",
  "/hi/collections",
  "/hi/luxury",
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

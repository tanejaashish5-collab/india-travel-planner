"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type NearbyPin = {
  id: string;
  name: string;
  lat: number | null;
  lng: number | null;
  distance_km?: number | null;
};

export function DestinationMap({
  lat,
  lng,
  name,
  elevation,
  nearby,
  stateName,
  region,
  nearestCity,
  nearestAirport,
}: {
  lat: number;
  lng: number;
  name: string;
  elevation?: number;
  /** Up to ~8 nearby destinations pre-fetched server-side via the
   *  find_nearby_destinations PostGIS RPC. Only those with valid coords
   *  are rendered as secondary pins. */
  nearby?: NearbyPin[];
  /** State + region text powering the "Where am I?" overlay card. */
  stateName?: string;
  region?: string;
  /** Free-text transport hints from confidence_cards.reach. Either can be
   *  undefined — the card collapses missing lines. */
  nearestCity?: string;
  nearestAirport?: string;
}) {
  const locale = useLocale();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let mapInstance: any = null;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Start at a wider zoom so state context is visible before the user
      // interacts. fitBounds (below) will override this when nearby pins
      // exist — but initial zoom still affects the pre-tiles paint.
      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 7,
        minZoom: 5,
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: true,
      });

      // BUG-113: hide the whole tile pane from the a11y tree (decorative basemap).
      const tilePane = map.getPane("tilePane");
      if (tilePane) {
        tilePane.setAttribute("aria-hidden", "true");
        tilePane.setAttribute("role", "presentation");
      }

      // dark_all (labelled) replaces dark_nolabels — traveler needs to
      // answer "what state, what nearby towns?" without zooming around.
      // Chinese-script labels near the AP/Ladakh border are a known
      // CartoDB quirk; accepted for orientation value.
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OSM &copy; CARTO',
        maxZoom: 16,
      }).addTo(map);

      // Main destination marker — emerald, prominent.
      const mainMarker = L.circleMarker([lat, lng], {
        radius: 12,
        fillColor: "#10b981",
        color: "#fff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9,
      }).addTo(map);

      mainMarker.bindPopup(`
        <div style="font-family:system-ui;color:#e5e5e5;min-width:150px;">
          <h3 style="margin:0;font-size:14px;font-weight:700;color:#fff;">${name}</h3>
          ${elevation ? `<p style="margin:4px 0 0;font-size:11px;color:#888;">${elevation.toLocaleString()}m elevation</p>` : ""}
          <p style="margin:4px 0 0;font-size:11px;color:#888;">${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E</p>
        </div>
      `, { className: "dark-popup" });

      // Nearby destinations — secondary gray pins with tooltip + click nav.
      // Filtered to rows that actually have coords (some fallback paths
      // upstream return nearby by same-state without geo data).
      const validNearby = (nearby ?? []).filter(
        (n) => typeof n.lat === "number" && typeof n.lng === "number"
      );
      const bounds = L.latLngBounds([[lat, lng]]);
      for (const n of validNearby) {
        const pin = L.circleMarker([n.lat!, n.lng!], {
          radius: 6,
          fillColor: "#9ca3af",
          color: "#fff",
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.75,
        }).addTo(map);
        const label = n.distance_km != null ? `${n.name} · ${n.distance_km} km` : n.name;
        pin.bindTooltip(label, { permanent: false, direction: "top", offset: [0, -4] });
        pin.on("click", () => {
          window.location.href = `/${locale}/destination/${n.id}`;
        });
        bounds.extend([n.lat!, n.lng!]);
      }

      // Auto-fit bounds when we have at least one nearby pin. Padding
      // keeps pins off the chrome edges; maxZoom prevents overshoot when
      // all nearby are within a km or two.
      if (validNearby.length > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 9 });
      }

      mapInstance = map;
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [lat, lng, name, elevation, nearby, locale]);

  // "Where am I?" context card — pure HTML overlay pointer-events-none so
  // it never blocks map interaction. Data-gated: only renders when we
  // have at least a state or region label to show.
  const contextLine1 = [stateName, region].filter(Boolean).join(" · ");
  const contextLine2Parts: string[] = [];
  if (elevation) contextLine2Parts.push(`${elevation.toLocaleString()}m`);
  if (nearestCity) contextLine2Parts.push(nearestCity);
  if (nearestAirport) contextLine2Parts.push(nearestAirport);
  const contextLine2 = contextLine2Parts.join(" · ");
  const showContext = !!contextLine1 || !!contextLine2;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <style>{`
        .dark-popup .leaflet-popup-content-wrapper {
          background: #1a1a2e;
          border: 1px solid #333;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .dark-popup .leaflet-popup-tip {
          background: #1a1a2e;
          border: 1px solid #333;
        }
        .leaflet-tooltip {
          background: rgba(20, 20, 30, 0.9) !important;
          color: #e5e5e5 !important;
          border: 1px solid #333 !important;
          font-family: system-ui;
          font-size: 11px !important;
          padding: 3px 8px !important;
          border-radius: 6px !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(20, 20, 30, 0.9) !important;
        }
        .leaflet-control-attribution,
        .leaflet-control-attribution.leaflet-control {
          background: rgba(20,20,30,0.85) !important;
          color: #ccc !important;
          font-size: 10px !important;
          padding: 2px 8px !important;
        }
        .leaflet-control-attribution a {
          color: #7ab8ff !important;
        }
      `}</style>
      <div className="relative w-full h-full">
        <div
          ref={mapRef}
          className="w-full h-full rounded-xl overflow-hidden"
          style={{ background: "#1a1a2e", minHeight: "200px" }}
        />
        {showContext && (
          <div
            className="pointer-events-none absolute top-3 left-3 z-[400] max-w-[70%] rounded-lg border border-white/15 bg-black/70 px-3 py-2 backdrop-blur-sm"
            aria-hidden="true"
          >
            {contextLine1 && (
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">
                {contextLine1}
              </div>
            )}
            {contextLine2 && (
              <div className="mt-0.5 text-[11px] leading-snug text-white/65">
                {contextLine2}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

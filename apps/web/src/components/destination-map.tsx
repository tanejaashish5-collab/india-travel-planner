"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

export function DestinationMap({
  lat,
  lng,
  name,
  elevation,
}: {
  lat: number;
  lng: number;
  name: string;
  elevation?: number;
}) {
  const locale = useLocale();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let mapInstance: any = null;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 10,
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: true,
      });

      // dark_nolabels avoids Chinese/local-script labels near borders
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OSM &copy; CARTO',
        maxZoom: 16,
      }).addTo(map);

      // Main destination marker
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

      mapInstance = map;
    });

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [lat, lng, name, elevation]);

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
      `}</style>
      <div
        ref={mapRef}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{ background: "#1a1a2e", minHeight: "200px" }}
      />
    </>
  );
}

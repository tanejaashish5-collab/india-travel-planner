"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

interface MapDestination {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  coords: { lat: number; lng: number } | null;
  monthScore: number | null;
  kidsRating: number | null;
  kidsSuitable: boolean | null;
  stateName: string;
}

const SCORE_MARKER_COLORS: Record<number, string> = {
  5: "#10b981",
  4: "#3b82f6",
  3: "#eab308",
  2: "#f97316",
  1: "#ef4444",
  0: "#71717a",
};

export function ExploreMap({ destinations }: { destinations: MapDestination[] }) {
  const locale = useLocale();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, {
        center: [28.5, 78.0],
        zoom: 5,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      const validDests = destinations.filter((d) => d.coords && d.coords.lat && d.coords.lng);

      validDests.forEach((dest) => {
        const lat = dest.coords!.lat;
        const lng = dest.coords!.lng;
        const color = SCORE_MARKER_COLORS[dest.monthScore ?? 0] ?? SCORE_MARKER_COLORS[0];

        const marker = L.circleMarker([lat, lng], {
          radius: 8,
          fillColor: color,
          color: "#000",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.9,
        }).addTo(map);

        const scoreText = dest.monthScore !== null ? `${dest.monthScore}/5` : "No score";
        const kidsText = dest.kidsSuitable
          ? `👶 ${dest.kidsRating}/5`
          : dest.kidsSuitable === false ? "Adults only" : "";

        marker.bindPopup(`
          <div style="min-width:200px;font-family:system-ui;color:#e5e5e5;">
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;color:#fff;">${dest.name}</h3>
            <div style="font-size:11px;color:#888;margin-bottom:6px;">${dest.stateName} · ${dest.difficulty}</div>
            <div style="display:flex;gap:8px;margin-bottom:6px;">
              <span style="background:${color}22;color:${color};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">${scoreText}</span>
              ${kidsText ? `<span style="font-size:11px;">${kidsText}</span>` : ""}
            </div>
            <p style="font-size:12px;color:#aaa;margin:0 0 8px;line-height:1.4;">${dest.tagline.substring(0, 120)}${dest.tagline.length > 120 ? "..." : ""}</p>
            <a href="/${locale}/destination/${dest.id}" style="color:#3b82f6;font-size:12px;text-decoration:none;font-weight:500;">View details →</a>
          </div>
        `, { className: "dark-popup" });
      });

      if (validDests.length > 0) {
        const bounds = L.latLngBounds(
          validDests.map((d) => [d.coords!.lat, d.coords!.lng] as [number, number])
        );
        map.fitBounds(bounds, { padding: [40, 40] });
      }

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [destinations, locale]);

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
        .leaflet-popup-close-button {
          color: #888 !important;
        }
      `}</style>
      <div
        ref={mapRef}
        className="w-full h-[500px] sm:h-[600px] rounded-xl border border-border overflow-hidden"
        style={{ background: "#1a1a2e" }}
      />
    </>
  );
}

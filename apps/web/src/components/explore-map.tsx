"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { SCORE_COLORS } from "@/lib/design-tokens";

interface MapDestination {
  id: string;
  name: string;
  tagline: string;
  difficulty: string;
  coords: any; // PostGIS geography type from Supabase
  monthScore: number | null;
  kidsRating: number | null;
  kidsSuitable: boolean | null;
  stateName: string;
}

const SCORE_MARKER_COLORS: Record<number, string> = {
  5: "#10b981", // emerald
  4: "#3b82f6", // blue
  3: "#eab308", // yellow
  2: "#f97316", // orange
  1: "#ef4444", // red
  0: "#71717a", // zinc
};

export function ExploreMap({ destinations }: { destinations: MapDestination[] }) {
  const locale = useLocale();
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Create map centered on India
      const map = L.map(mapRef.current!, {
        center: [28.5, 78.0],
        zoom: 5,
        zoomControl: true,
        attributionControl: true,
      });

      // Dark tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      // Add markers for each destination
      destinations.forEach((dest) => {
        if (!dest.coords) return;

        // Extract lat/lng from PostGIS geography
        let lat: number, lng: number;
        if (typeof dest.coords === "string") {
          // Parse "POINT(lng lat)" format
          const match = dest.coords.match(/POINT\(([^ ]+) ([^)]+)\)/);
          if (match) {
            lng = parseFloat(match[1]);
            lat = parseFloat(match[2]);
          } else return;
        } else if (dest.coords.coordinates) {
          [lng, lat] = dest.coords.coordinates;
        } else if (dest.coords.lat && dest.coords.lng) {
          lat = dest.coords.lat;
          lng = dest.coords.lng;
        } else return;

        const color = SCORE_MARKER_COLORS[dest.monthScore ?? 0] ?? SCORE_MARKER_COLORS[0];

        // Custom circle marker
        const marker = L.circleMarker([lat, lng], {
          radius: 8,
          fillColor: color,
          color: "#000",
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.9,
        }).addTo(map);

        // Popup
        const scoreText = dest.monthScore !== null ? `${dest.monthScore}/5` : "No score";
        const kidsText = dest.kidsSuitable
          ? `👶 ${dest.kidsRating}/5`
          : dest.kidsSuitable === false
            ? "Adults only"
            : "";

        marker.bindPopup(`
          <div style="min-width:200px;font-family:system-ui;">
            <h3 style="margin:0 0 4px;font-size:14px;font-weight:600;">${dest.name}</h3>
            <div style="font-size:11px;color:#888;margin-bottom:6px;">${dest.stateName} · ${dest.difficulty}</div>
            <div style="display:flex;gap:8px;margin-bottom:6px;">
              <span style="background:${color}22;color:${color};padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;">${scoreText}</span>
              ${kidsText ? `<span style="font-size:11px;">${kidsText}</span>` : ""}
            </div>
            <p style="font-size:12px;color:#aaa;margin:0 0 8px;line-height:1.4;">${dest.tagline.substring(0, 100)}${dest.tagline.length > 100 ? "..." : ""}</p>
            <a href="/${locale}/destination/${dest.id}" style="color:#3b82f6;font-size:12px;text-decoration:none;font-weight:500;">View details →</a>
          </div>
        `);
      });

      // Fit bounds to show all markers
      if (destinations.length > 0) {
        const validCoords = destinations
          .map((d) => {
            if (!d.coords) return null;
            if (typeof d.coords === "string") {
              const match = d.coords.match(/POINT\(([^ ]+) ([^)]+)\)/);
              return match ? [parseFloat(match[2]), parseFloat(match[1])] as [number, number] : null;
            }
            if (d.coords.coordinates) return [d.coords.coordinates[1], d.coords.coordinates[0]] as [number, number];
            if (d.coords.lat) return [d.coords.lat, d.coords.lng] as [number, number];
            return null;
          })
          .filter(Boolean) as [number, number][];

        if (validCoords.length > 0) {
          map.fitBounds(L.latLngBounds(validCoords), { padding: [40, 40] });
        }
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
      <div
        ref={mapRef}
        className="w-full h-[500px] sm:h-[600px] rounded-xl border border-border overflow-hidden"
        style={{ background: "#1a1a2e" }}
      />
    </>
  );
}

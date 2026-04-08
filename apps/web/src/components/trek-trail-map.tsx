"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  day: number;
  lat: number;
  lng: number;
  name: string;
  type: "start" | "camp" | "pass" | "summit" | "end" | "water" | "viewpoint" | "waypoint";
  altitude_m?: number;
}

const POINT_STYLES: Record<string, { color: string; radius: number; emoji: string }> = {
  start: { color: "#10b981", radius: 12, emoji: "🏁" },
  camp: { color: "#f59e0b", radius: 10, emoji: "⛺" },
  pass: { color: "#8b5cf6", radius: 10, emoji: "🏔️" },
  summit: { color: "#ef4444", radius: 14, emoji: "🔺" },
  end: { color: "#10b981", radius: 12, emoji: "🏴" },
  water: { color: "#3b82f6", radius: 7, emoji: "💧" },
  viewpoint: { color: "#06b6d4", radius: 8, emoji: "📷" },
  waypoint: { color: "#71717a", radius: 6, emoji: "•" },
};

export function TrekTrailMap({ points, trekName }: { points: TrailPoint[]; trekName: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || points.length === 0) return;

    import("leaflet").then((L) => {
      if (!mapRef.current) return;

      // Calculate center from points
      const avgLat = points.reduce((s, p) => s + p.lat, 0) / points.length;
      const avgLng = points.reduce((s, p) => s + p.lng, 0) / points.length;

      const map = L.map(mapRef.current, {
        center: [avgLat, avgLng],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; OSM &copy; CARTO',
        maxZoom: 16,
      }).addTo(map);

      // Draw trail line
      const trailCoords = points
        .filter((p) => p.type !== "water" && p.type !== "viewpoint")
        .map((p) => [p.lat, p.lng] as [number, number]);

      if (trailCoords.length > 1) {
        // Animated dashed trail line
        L.polyline(trailCoords, {
          color: "#e5e5e5",
          weight: 3,
          opacity: 0.6,
          dashArray: "8, 12",
          lineCap: "round",
        }).addTo(map);

        // Solid trail line underneath
        L.polyline(trailCoords, {
          color: "#e5e5e5",
          weight: 1.5,
          opacity: 0.2,
        }).addTo(map);
      }

      // Add markers for each point
      points.forEach((point) => {
        const style = POINT_STYLES[point.type] || POINT_STYLES.waypoint;

        // Main marker
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: style.radius,
          fillColor: style.color,
          color: "#000",
          weight: 2,
          opacity: 0.9,
          fillOpacity: 0.9,
        }).addTo(map);

        // Pulsating ring for start, summit, and camps
        if (["start", "summit", "camp", "end"].includes(point.type)) {
          const pulseMarker = L.circleMarker([point.lat, point.lng], {
            radius: style.radius + 6,
            fillColor: style.color,
            color: style.color,
            weight: 2,
            opacity: 0.3,
            fillOpacity: 0.1,
            className: "pulse-marker",
          }).addTo(map);
        }

        // Popup
        const altText = point.altitude_m ? `${point.altitude_m.toLocaleString()}m` : "";
        marker.bindPopup(`
          <div style="min-width:150px;font-family:system-ui;color:#e5e5e5;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:16px;">${style.emoji}</span>
              <h3 style="margin:0;font-size:13px;font-weight:700;color:#fff;">${point.name}</h3>
            </div>
            <div style="font-size:11px;color:#888;">
              Day ${point.day} · ${point.type.charAt(0).toUpperCase() + point.type.slice(1)}
              ${altText ? ` · ${altText}` : ""}
            </div>
          </div>
        `, { className: "dark-popup" });

        // Day label for camps and key points
        if (["camp", "start", "summit", "end", "pass"].includes(point.type)) {
          const label = L.divIcon({
            className: "trek-label",
            html: `<span style="background:${style.color}22;color:${style.color};padding:2px 6px;border-radius:6px;font-size:10px;font-weight:600;white-space:nowrap;border:1px solid ${style.color}44;">${style.emoji} ${point.name}</span>`,
            iconSize: [0, 0],
            iconAnchor: [0, -style.radius - 8],
          });
          L.marker([point.lat, point.lng], { icon: label, interactive: false }).addTo(map);
        }
      });

      // Fit bounds
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [50, 50] });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [points, trekName]);

  if (points.length === 0) return null;

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
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
        .trek-label {
          background: none !important;
          border: none !important;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        .pulse-marker {
          animation: pulse-ring 2s ease-in-out infinite;
        }
      `}</style>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Trail Map</h2>
        <div
          ref={mapRef}
          className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-border"
          style={{ background: "#1a1a2e" }}
        />
        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-emerald-500" /> Start/End</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-500" /> Campsite</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-purple-500" /> Pass</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-red-500" /> Summit</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-blue-500" /> Water</span>
          <span className="flex items-center gap-1 ml-auto text-muted-foreground/50">Dashed line = trail path</span>
        </div>
      </section>
    </>
  );
}

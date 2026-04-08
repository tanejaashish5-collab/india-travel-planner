"use client";

import { useState, useEffect } from "react";

// Approximate coordinates for major Indian cities
const CITY_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  delhi: { lat: 28.6139, lng: 77.2090, name: "Delhi" },
  mumbai: { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  bangalore: { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  kolkata: { lat: 22.5726, lng: 88.3639, name: "Kolkata" },
  chandigarh: { lat: 30.7333, lng: 76.7794, name: "Chandigarh" },
  hyderabad: { lat: 17.3850, lng: 78.4867, name: "Hyderabad" },
  pune: { lat: 18.5204, lng: 73.8567, name: "Pune" },
  ahmedabad: { lat: 23.0225, lng: 72.5714, name: "Ahmedabad" },
};

// Haversine distance in km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Rough driving time estimate (1.5x straight-line distance for mountain roads)
function estimateDriveTime(distKm: number, isHilly: boolean): string {
  const factor = isHilly ? 1.8 : 1.3;
  const roadKm = distKm * factor;
  const hours = roadKm / 50; // avg 50 km/h for India
  if (hours < 1) return "< 1 hour";
  if (hours < 2) return "~1.5 hours";
  return `~${Math.round(hours)} hours`;
}

export function DistanceBadge({
  destLat,
  destLng,
  elevation,
}: {
  destLat?: number;
  destLng?: number;
  elevation?: number;
}) {
  const [distance, setDistance] = useState<{ km: number; time: string; from: string } | null>(null);

  useEffect(() => {
    if (!destLat || !destLng) return;

    // Try to find nearest major city
    const isHilly = (elevation ?? 0) > 500;
    let nearest = { km: Infinity, time: "", from: "" };

    // Use Delhi as default origin — most travelers to North India start from Delhi
    const defaultCity = CITY_COORDS.delhi;
    const km = Math.round(haversine(defaultCity.lat, defaultCity.lng, destLat, destLng));
    nearest = { km, time: estimateDriveTime(km, isHilly), from: defaultCity.name };

    // Also check Chandigarh as it's closer for HP/UK destinations
    const chdKm = Math.round(haversine(CITY_COORDS.chandigarh.lat, CITY_COORDS.chandigarh.lng, destLat, destLng));
    if (chdKm < km * 0.7) {
      nearest = { km: chdKm, time: estimateDriveTime(chdKm, isHilly), from: "Chandigarh" };
    }

    setDistance(nearest);
  }, [destLat, destLng, elevation]);

  if (!distance || distance.km < 10) return null;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      📍 {distance.time} from {distance.from} ({distance.km} km)
    </span>
  );
}

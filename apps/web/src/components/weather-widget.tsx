"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  description: string;
  icon: string;
  wind_speed: number;
  visibility: number | null;
  clouds: number;
}

export function WeatherWidget({ destinationId }: { destinationId: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/weather?id=${destinationId}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data.temp !== undefined) setWeather(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [destinationId]);

  if (loading) {
    return (
      <div className="rounded-xl border border-border p-3 animate-pulse">
        <div className="h-4 w-20 bg-muted rounded mb-2" />
        <div className="h-6 w-16 bg-muted rounded" />
      </div>
    );
  }

  if (error || !weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-3">
      <div className="flex items-center gap-3">
        <img src={iconUrl} alt={weather.description} className="w-10 h-10 -ml-1" />
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-mono font-bold">{weather.temp}°</span>
            <span className="text-xs text-muted-foreground capitalize">{weather.description}</span>
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
            <span>Feels {weather.feels_like}°</span>
            <span>💨 {weather.wind_speed}km/h</span>
            <span>💧 {weather.humidity}%</span>
          </div>
        </div>
      </div>
      <div className="mt-1 text-xs text-muted-foreground/50">Live weather</div>
    </div>
  );
}

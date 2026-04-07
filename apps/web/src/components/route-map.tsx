"use client";

interface RouteMapProps {
  stops: string[];
}

export function RouteMap({ stops }: RouteMapProps) {
  if (stops.length < 2) return null;

  // Build Google Maps directions link (no API key needed)
  const formattedStops = stops.map((s) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) + ", India"
  );
  const mapsUrl = `https://www.google.com/maps/dir/${formattedStops.map(encodeURIComponent).join("/")}`;

  return (
    <div className="space-y-3">
      {/* Google Maps link */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors group"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-lg">
          🗺️
        </div>
        <div className="flex-1">
          <div className="font-semibold group-hover:text-primary transition-colors">
            View Route on Google Maps
          </div>
          <div className="text-xs text-muted-foreground">
            {stops.length} stops · Opens in new tab with driving directions
          </div>
        </div>
        <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
      </a>

      {/* Visual route path */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="text-xs text-muted-foreground mb-3">Route path</div>
        <div className="flex flex-wrap items-center gap-1.5">
          {stops.map((stop, i) => (
            <div key={stop} className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="font-medium">
                  {stop.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </div>
              {i < stops.length - 1 && (
                <span className="text-muted-foreground text-xs">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

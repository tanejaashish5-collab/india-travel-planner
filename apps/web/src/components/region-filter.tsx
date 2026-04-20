"use client";

import { REGIONS, type RegionKey, getStateId, stateInRegion } from "@itp/shared";

export { REGIONS, getStateId, stateInRegion };
export type { RegionKey };

export function RegionFilterBar({
  active,
  onChange,
  className,
}: {
  active: RegionKey;
  onChange: (region: RegionKey) => void;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          active === null
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        All India
      </button>
      {REGIONS.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(active === r.key ? null : r.key)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            active === r.key
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

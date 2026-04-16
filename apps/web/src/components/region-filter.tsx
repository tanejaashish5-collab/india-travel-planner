"use client";

/* ── Shared region filter bar for experience pages ── */

const REGIONS = [
  { key: "north", label: "North", states: ["himachal-pradesh","uttarakhand","jammu-kashmir","ladakh","rajasthan","punjab","delhi","uttar-pradesh","chandigarh","haryana"] },
  { key: "south", label: "South", states: ["karnataka","kerala","tamil-nadu","andhra-pradesh","telangana","goa"] },
  { key: "east", label: "East", states: ["west-bengal","bihar","jharkhand"] },
  { key: "west", label: "West", states: ["gujarat","maharashtra"] },
  { key: "central", label: "Central", states: ["madhya-pradesh","chhattisgarh"] },
  { key: "northeast", label: "Northeast", states: ["sikkim","arunachal-pradesh","assam","meghalaya","nagaland","manipur","mizoram","tripura"] },
] as const;

export type RegionKey = typeof REGIONS[number]["key"] | null;

/** Get state_id from a nested Supabase join row */
export function getStateId(row: any): string | null {
  // destinations join: row.destinations.state_id or row.destinations[0].state_id
  const dest = Array.isArray(row.destinations) ? row.destinations[0] : row.destinations;
  if (dest?.state_id) return dest.state_id;
  // direct state_id on the row
  if (row.state_id) return row.state_id;
  // state join: row.state or row.destinations.state
  const state = dest?.state;
  if (state) {
    const s = Array.isArray(state) ? state[0] : state;
    return s?.id ?? null;
  }
  return null;
}

/** Check if a state_id belongs to a region */
export function stateInRegion(stateId: string | null, regionKey: string): boolean {
  if (!stateId) return false;
  const region = REGIONS.find((r) => r.key === regionKey);
  return region?.states.includes(stateId as any) ?? false;
}

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

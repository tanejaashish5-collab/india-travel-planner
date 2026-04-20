export const REGIONS = [
  { key: "north", label: "North", states: ["himachal-pradesh","uttarakhand","jammu-kashmir","ladakh","rajasthan","punjab","delhi","uttar-pradesh","chandigarh","haryana"] },
  { key: "south", label: "South", states: ["karnataka","kerala","tamil-nadu","andhra-pradesh","telangana","goa","puducherry"] },
  { key: "east", label: "East", states: ["west-bengal","bihar","jharkhand","odisha"] },
  { key: "west", label: "West", states: ["gujarat","maharashtra","daman-diu"] },
  { key: "central", label: "Central", states: ["madhya-pradesh","chhattisgarh"] },
  { key: "northeast", label: "Northeast", states: ["sikkim","arunachal-pradesh","assam","meghalaya","nagaland","manipur","mizoram","tripura"] },
  { key: "islands", label: "Islands", states: ["andaman-nicobar","lakshadweep"] },
] as const;

export type RegionKey = typeof REGIONS[number]["key"] | null;

export function getStateId(row: any): string | null {
  const dest = Array.isArray(row.destinations) ? row.destinations[0] : row.destinations;
  if (dest?.state_id) return dest.state_id;
  if (row.state_id) return row.state_id;
  const state = dest?.state;
  if (state) {
    const s = Array.isArray(state) ? state[0] : state;
    return s?.id ?? null;
  }
  return null;
}

export function stateInRegion(stateId: string | null, regionKey: string): boolean {
  if (!stateId) return false;
  const region = REGIONS.find((r) => r.key === regionKey);
  return region ? (region.states as readonly string[]).includes(stateId) : false;
}

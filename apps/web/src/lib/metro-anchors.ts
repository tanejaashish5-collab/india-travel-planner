export type MetroAnchor = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  state: string;
};

export const METRO_ANCHORS: Record<string, MetroAnchor> = {
  delhi: { slug: "delhi", name: "Delhi", lat: 28.6139, lng: 77.209, state: "Delhi" },
  mumbai: { slug: "mumbai", name: "Mumbai", lat: 19.076, lng: 72.8777, state: "Maharashtra" },
  bangalore: { slug: "bangalore", name: "Bangalore", lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  chennai: { slug: "chennai", name: "Chennai", lat: 13.0827, lng: 80.2707, state: "Tamil Nadu" },
  kolkata: { slug: "kolkata", name: "Kolkata", lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  hyderabad: { slug: "hyderabad", name: "Hyderabad", lat: 17.385, lng: 78.4867, state: "Telangana" },
};

export const METRO_SLUGS = Object.keys(METRO_ANCHORS);

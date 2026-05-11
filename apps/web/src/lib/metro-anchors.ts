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
  pune: { slug: "pune", name: "Pune", lat: 18.5204, lng: 73.8567, state: "Maharashtra" },
  ahmedabad: { slug: "ahmedabad", name: "Ahmedabad", lat: 23.0225, lng: 72.5714, state: "Gujarat" },
  jaipur: { slug: "jaipur", name: "Jaipur", lat: 26.9124, lng: 75.7873, state: "Rajasthan" },
  lucknow: { slug: "lucknow", name: "Lucknow", lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" },
  indore: { slug: "indore", name: "Indore", lat: 22.7196, lng: 75.8577, state: "Madhya Pradesh" },
  bhopal: { slug: "bhopal", name: "Bhopal", lat: 23.2599, lng: 77.4126, state: "Madhya Pradesh" },
  kochi: { slug: "kochi", name: "Kochi", lat: 9.9312, lng: 76.2673, state: "Kerala" },
  agra: { slug: "agra", name: "Agra", lat: 27.1767, lng: 78.0081, state: "Uttar Pradesh" },
  dehradun: { slug: "dehradun", name: "Dehradun", lat: 30.3165, lng: 78.0322, state: "Uttarakhand" },
  chandigarh: { slug: "chandigarh", name: "Chandigarh", lat: 30.7333, lng: 76.7794, state: "Chandigarh" },
  coimbatore: { slug: "coimbatore", name: "Coimbatore", lat: 11.0168, lng: 76.9558, state: "Tamil Nadu" },
  varanasi: { slug: "varanasi", name: "Varanasi", lat: 25.3176, lng: 82.9739, state: "Uttar Pradesh" },
};

export const METRO_SLUGS = Object.keys(METRO_ANCHORS);

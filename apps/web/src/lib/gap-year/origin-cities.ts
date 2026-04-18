export interface OriginCity {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  tier: 1 | 2 | 3 | "international";
}

// Hand-curated list of common origin cities for Gap Year Planner users.
// Tier 1: major Indian metros + key international hubs.
// Tier 2: state capitals + top domestic cities.
// Tier 3: tier-2 Indian cities where travellers commonly originate.
// international: likely origin points for inbound long-haul travellers.
//
// Not exhaustive — users whose city is missing can pick the nearest one.
// If we see consistent misses in support tickets, extend the list.
export const ORIGIN_CITIES: OriginCity[] = [
  // India tier 1 metros
  { id: "delhi", name: "Delhi (NCR)", state: "Delhi", lat: 28.6139, lng: 77.209, tier: 1 },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, tier: 1 },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, tier: 1 },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, tier: 1 },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, tier: 1 },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, tier: 1 },
  { id: "pune", name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, tier: 1 },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, tier: 1 },

  // State capitals / tier-2 cities
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, tier: 2 },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, tier: 2 },
  { id: "chandigarh", name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, tier: 2 },
  { id: "bhopal", name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, tier: 2 },
  { id: "indore", name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, tier: 2 },
  { id: "surat", name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, tier: 2 },
  { id: "vadodara", name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, tier: 2 },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, tier: 2 },
  { id: "nashik", name: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, tier: 2 },
  { id: "kochi", name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, tier: 2 },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, tier: 2 },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, tier: 2 },
  { id: "madurai", name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, tier: 2 },
  { id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, tier: 2 },
  { id: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.648, tier: 2 },
  { id: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, tier: 2 },
  { id: "patna", name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, tier: 2 },
  { id: "ranchi", name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, tier: 2 },
  { id: "raipur", name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, tier: 2 },
  { id: "guwahati", name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, tier: 2 },
  { id: "shillong", name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, tier: 2 },
  { id: "imphal", name: "Imphal", state: "Manipur", lat: 24.817, lng: 93.9368, tier: 2 },
  { id: "kohima", name: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086, tier: 2 },
  { id: "aizawl", name: "Aizawl", state: "Mizoram", lat: 23.7271, lng: 92.7176, tier: 2 },
  { id: "agartala", name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, tier: 2 },
  { id: "itanagar", name: "Itanagar", state: "Arunachal Pradesh", lat: 27.084, lng: 93.605, tier: 2 },
  { id: "gangtok", name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065, tier: 2 },
  { id: "shimla", name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, tier: 2 },
  { id: "dehradun", name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, tier: 2 },
  { id: "srinagar", name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, tier: 2 },
  { id: "jammu", name: "Jammu", state: "Jammu & Kashmir", lat: 32.7266, lng: 74.857, tier: 2 },
  { id: "leh", name: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771, tier: 2 },
  { id: "panaji", name: "Panaji (Goa)", state: "Goa", lat: 15.4909, lng: 73.8278, tier: 2 },
  { id: "amritsar", name: "Amritsar", state: "Punjab", lat: 31.634, lng: 74.8723, tier: 2 },
  { id: "ludhiana", name: "Ludhiana", state: "Punjab", lat: 30.901, lng: 75.8573, tier: 2 },
  { id: "gurugram", name: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266, tier: 2 },
  { id: "noida", name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.391, tier: 2 },
  { id: "faridabad", name: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178, tier: 2 },
  { id: "port-blair", name: "Port Blair", state: "Andaman & Nicobar", lat: 11.6234, lng: 92.7265, tier: 2 },
  { id: "kavaratti", name: "Kavaratti", state: "Lakshadweep", lat: 10.5593, lng: 72.6358, tier: 2 },
  { id: "puducherry", name: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, tier: 2 },

  // Tier 3 — common domestic travellers
  { id: "kanpur", name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, tier: 3 },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, tier: 3 },
  { id: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, tier: 3 },
  { id: "meerut", name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064, tier: 3 },
  { id: "rajkot", name: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022, tier: 3 },
  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, tier: 3 },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, tier: 3 },
  { id: "mangalore", name: "Mangalore", state: "Karnataka", lat: 12.9141, lng: 74.856, tier: 3 },
  { id: "mysuru", name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, tier: 3 },
  { id: "trichy", name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, tier: 3 },
  { id: "salem", name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.146, tier: 3 },
  { id: "thrissur", name: "Thrissur", state: "Kerala", lat: 10.5276, lng: 76.2144, tier: 3 },
  { id: "kozhikode", name: "Kozhikode (Calicut)", state: "Kerala", lat: 11.2588, lng: 75.7804, tier: 3 },
  { id: "dharamshala", name: "Dharamshala", state: "Himachal Pradesh", lat: 32.219, lng: 76.3234, tier: 3 },

  // International origins — likely inbound
  { id: "intl-london", name: "London", state: "United Kingdom", lat: 51.5074, lng: -0.1278, tier: "international" },
  { id: "intl-new-york", name: "New York", state: "United States", lat: 40.7128, lng: -74.006, tier: "international" },
  { id: "intl-san-francisco", name: "San Francisco", state: "United States", lat: 37.7749, lng: -122.4194, tier: "international" },
  { id: "intl-sydney", name: "Sydney", state: "Australia", lat: -33.8688, lng: 151.2093, tier: "international" },
  { id: "intl-melbourne", name: "Melbourne", state: "Australia", lat: -37.8136, lng: 144.9631, tier: "international" },
  { id: "intl-toronto", name: "Toronto", state: "Canada", lat: 43.6532, lng: -79.3832, tier: "international" },
  { id: "intl-dubai", name: "Dubai", state: "UAE", lat: 25.2048, lng: 55.2708, tier: "international" },
  { id: "intl-singapore", name: "Singapore", state: "Singapore", lat: 1.3521, lng: 103.8198, tier: "international" },
  { id: "intl-hong-kong", name: "Hong Kong", state: "Hong Kong", lat: 22.3193, lng: 114.1694, tier: "international" },
  { id: "intl-tokyo", name: "Tokyo", state: "Japan", lat: 35.6762, lng: 139.6503, tier: "international" },
  { id: "intl-paris", name: "Paris", state: "France", lat: 48.8566, lng: 2.3522, tier: "international" },
  { id: "intl-berlin", name: "Berlin", state: "Germany", lat: 52.52, lng: 13.405, tier: "international" },
  { id: "intl-amsterdam", name: "Amsterdam", state: "Netherlands", lat: 52.3676, lng: 4.9041, tier: "international" },
  { id: "intl-los-angeles", name: "Los Angeles", state: "United States", lat: 34.0522, lng: -118.2437, tier: "international" },
  { id: "intl-chicago", name: "Chicago", state: "United States", lat: 41.8781, lng: -87.6298, tier: "international" },
  { id: "intl-vancouver", name: "Vancouver", state: "Canada", lat: 49.2827, lng: -123.1207, tier: "international" },
  { id: "intl-auckland", name: "Auckland", state: "New Zealand", lat: -36.8485, lng: 174.7633, tier: "international" },
  { id: "intl-zurich", name: "Zurich", state: "Switzerland", lat: 47.3769, lng: 8.5417, tier: "international" },
];

export function findCity(query: string, limit = 8): OriginCity[] {
  const q = query.trim().toLowerCase();
  if (!q) return ORIGIN_CITIES.slice(0, limit);
  const scored = ORIGIN_CITIES.map((c) => {
    const name = c.name.toLowerCase();
    const state = c.state.toLowerCase();
    let score = 0;
    if (name.startsWith(q)) score += 10;
    else if (name.includes(q)) score += 5;
    if (state.startsWith(q)) score += 3;
    else if (state.includes(q)) score += 1;
    return { c, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.c);
}

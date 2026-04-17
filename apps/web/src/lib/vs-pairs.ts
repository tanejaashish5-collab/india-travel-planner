// Curated destination comparison pairs for /vs/[pair] pages.
// Each pair gets its own page. Pairs are chosen based on:
// - Real search intent (people actually compare these)
// - Similar category (hill stations, beaches, heritage, etc.)
// - Same region or common "which should I visit" scenarios

export const VS_PAIRS: { id1: string; id2: string; theme: string }[] = [
  // ─── Hill Stations: North ──────────────────────────────────────
  { id1: "manali", id2: "shimla", theme: "hill-stations" },
  { id1: "manali", id2: "dharamshala", theme: "hill-stations" },
  { id1: "manali", id2: "rishikesh", theme: "hill-stations" },
  { id1: "manali", id2: "kasol", theme: "hill-stations" },
  { id1: "shimla", id2: "nainital", theme: "hill-stations" },
  { id1: "shimla", id2: "mussoorie", theme: "hill-stations" },
  { id1: "shimla", id2: "kasauli", theme: "hill-stations" },
  { id1: "mussoorie", id2: "nainital", theme: "hill-stations" },
  { id1: "dharamshala", id2: "mcleodganj", theme: "hill-stations" },
  { id1: "kasauli", id2: "dalhousie", theme: "hill-stations" },
  { id1: "dalhousie", id2: "dharamshala", theme: "hill-stations" },
  { id1: "chail", id2: "kasauli", theme: "hill-stations" },
  { id1: "palampur", id2: "dharamshala", theme: "hill-stations" },

  // ─── Offbeat Valleys ───────────────────────────────────────────
  { id1: "jibhi", id2: "tirthan-valley", theme: "offbeat-valleys" },
  { id1: "jibhi", id2: "manali", theme: "offbeat-valleys" },
  { id1: "tirthan-valley", id2: "barot-valley", theme: "offbeat-valleys" },
  { id1: "parvati-valley", id2: "spiti-valley", theme: "offbeat-valleys" },
  { id1: "kasol-parvati-valley", id2: "manikaran", theme: "offbeat-valleys" },
  { id1: "kasol", id2: "manikaran", theme: "offbeat-valleys" },
  { id1: "chitkul", id2: "sangla", theme: "offbeat-valleys" },
  { id1: "kalpa", id2: "kinnaur", theme: "offbeat-valleys" },
  { id1: "sangla", id2: "chitkul", theme: "offbeat-valleys" },

  // ─── High-Altitude Adventure ───────────────────────────────────
  { id1: "spiti-valley", id2: "leh", theme: "high-altitude" },
  { id1: "leh", id2: "manali", theme: "high-altitude" },
  { id1: "spiti-valley", id2: "kinnaur", theme: "high-altitude" },
  { id1: "leh", id2: "nubra-valley", theme: "high-altitude" },
  { id1: "pangong-lake", id2: "nubra-valley", theme: "high-altitude" },

  // ─── Kashmir ───────────────────────────────────────────────────
  { id1: "srinagar", id2: "gulmarg", theme: "kashmir" },
  { id1: "gulmarg", id2: "pahalgam", theme: "kashmir" },
  { id1: "pahalgam", id2: "sonamarg", theme: "kashmir" },
  { id1: "srinagar", id2: "pahalgam", theme: "kashmir" },
  { id1: "gurez-valley", id2: "sonamarg", theme: "kashmir" },
  { id1: "doodhpathri", id2: "pahalgam", theme: "kashmir" },
  { id1: "kokernag", id2: "verinag", theme: "kashmir" },

  // ─── Uttarakhand ───────────────────────────────────────────────
  { id1: "auli", id2: "chopta", theme: "uttarakhand" },
  { id1: "nainital", id2: "mukteshwar", theme: "uttarakhand" },
  { id1: "mussoorie", id2: "dhanaulti", theme: "uttarakhand" },
  { id1: "dhanaulti", id2: "kanatal", theme: "uttarakhand" },
  { id1: "kedarnath", id2: "badrinath", theme: "uttarakhand" },
  { id1: "rishikesh", id2: "haridwar", theme: "uttarakhand" },

  // ─── Rajasthan Heritage ────────────────────────────────────────
  { id1: "jaipur", id2: "udaipur", theme: "rajasthan" },
  { id1: "jaipur", id2: "jodhpur", theme: "rajasthan" },
  { id1: "udaipur", id2: "jodhpur", theme: "rajasthan" },
  { id1: "jaisalmer", id2: "jodhpur", theme: "rajasthan" },
  { id1: "jaisalmer", id2: "bikaner", theme: "rajasthan" },
  { id1: "bundi", id2: "pushkar", theme: "rajasthan" },
  { id1: "kumbhalgarh", id2: "chittorgarh", theme: "rajasthan" },
  { id1: "ranthambore", id2: "bharatpur", theme: "rajasthan" },

  // ─── Pilgrimage ────────────────────────────────────────────────
  { id1: "varanasi", id2: "haridwar", theme: "pilgrimage" },
  { id1: "ayodhya", id2: "mathura", theme: "pilgrimage" },
  { id1: "mathura", id2: "vrindavan", theme: "pilgrimage" },
  { id1: "varanasi", id2: "ayodhya", theme: "pilgrimage" },
  { id1: "amritsar", id2: "anandpur-sahib", theme: "pilgrimage" },

  // ─── Wildlife ──────────────────────────────────────────────────
  { id1: "ranthambore", id2: "corbett-national-park", theme: "wildlife" },
  { id1: "kanha", id2: "bandhavgarh", theme: "wildlife" },
  { id1: "kaziranga", id2: "corbett-national-park", theme: "wildlife" },
  { id1: "bandhavgarh", id2: "ranthambore", theme: "wildlife" },

  // ─── Northeast ─────────────────────────────────────────────────
  { id1: "darjeeling", id2: "gangtok", theme: "northeast" },
  { id1: "gangtok", id2: "pelling", theme: "northeast" },
  { id1: "shillong", id2: "cherrapunji", theme: "northeast" },
  { id1: "darjeeling", id2: "kalimpong", theme: "northeast" },
  { id1: "tawang", id2: "ziro-valley", theme: "northeast" },
  { id1: "kohima", id2: "shillong", theme: "northeast" },

  // ─── South Hill Stations ───────────────────────────────────────
  { id1: "ooty", id2: "kodaikanal", theme: "south-hills" },
  { id1: "ooty", id2: "coonoor", theme: "south-hills" },
  { id1: "munnar", id2: "ooty", theme: "south-hills" },
  { id1: "munnar", id2: "wayanad", theme: "south-hills" },
  { id1: "munnar", id2: "coorg", theme: "south-hills" },
  { id1: "coorg", id2: "ooty", theme: "south-hills" },
  { id1: "wayanad", id2: "coorg", theme: "south-hills" },
  { id1: "kodaikanal", id2: "munnar", theme: "south-hills" },

  // ─── Kerala ────────────────────────────────────────────────────
  { id1: "alleppey", id2: "kovalam", theme: "kerala" },
  { id1: "varkala", id2: "kovalam", theme: "kerala" },
  { id1: "thekkady", id2: "munnar", theme: "kerala" },

  // ─── Beaches / Islands ─────────────────────────────────────────
  { id1: "pondicherry", id2: "auroville", theme: "beaches" },
  { id1: "havelock-island", id2: "neil-island", theme: "beaches" },
  { id1: "havelock-island", id2: "port-blair", theme: "beaches" },
  { id1: "daman", id2: "diu", theme: "beaches" },
  { id1: "havelock-island", id2: "kavaratti", theme: "beaches" },

  // ─── Heritage / Historical ─────────────────────────────────────
  { id1: "hampi", id2: "badami", theme: "heritage" },
  { id1: "khajuraho", id2: "orchha", theme: "heritage" },
  { id1: "agra", id2: "fatehpur-sikri", theme: "heritage" },

  // ─── West India Hill Stations ──────────────────────────────────
  { id1: "mahabaleshwar", id2: "lonavala", theme: "west-hills" },
  { id1: "lonavala", id2: "matheran", theme: "west-hills" },
  { id1: "mahabaleshwar", id2: "matheran", theme: "west-hills" },

  // ─── Metros ────────────────────────────────────────────────────
  { id1: "mumbai", id2: "delhi", theme: "metros" },
  { id1: "mumbai", id2: "bengaluru", theme: "metros" },
  { id1: "bengaluru", id2: "hyderabad", theme: "metros" },
  { id1: "chennai", id2: "bengaluru", theme: "metros" },
  { id1: "kolkata", id2: "delhi", theme: "metros" },

  // ─── Cross-region popular ──────────────────────────────────────
  { id1: "varanasi", id2: "rishikesh", theme: "cross-region" },
  { id1: "pondicherry", id2: "kovalam", theme: "cross-region" },
  { id1: "munnar", id2: "manali", theme: "cross-region" },
  { id1: "havelock-island", id2: "alleppey", theme: "cross-region" },
];

// Human-readable theme labels for the /vs index page
export const VS_THEME_LABELS: Record<string, string> = {
  "hill-stations": "Hill Stations",
  "offbeat-valleys": "Offbeat Valleys",
  "high-altitude": "High-Altitude Adventure",
  kashmir: "Kashmir",
  uttarakhand: "Uttarakhand",
  rajasthan: "Rajasthan Heritage",
  pilgrimage: "Pilgrimage Sites",
  wildlife: "Wildlife & National Parks",
  northeast: "Northeast India",
  "south-hills": "South India Hill Stations",
  kerala: "Kerala",
  beaches: "Beaches & Islands",
  heritage: "Heritage & Historical",
  "west-hills": "Western Ghats",
  metros: "Indian Metros",
  "cross-region": "Cross-Region",
};

// All unique destination IDs referenced in pairs — used for sitemap validation
export const VS_DESTINATION_IDS = Array.from(
  new Set(VS_PAIRS.flatMap((p) => [p.id1, p.id2]))
);

// Canonical pair slug (always smaller ID first to dedupe reversed pairs)
export function pairSlug(id1: string, id2: string): string {
  return `${id1}-vs-${id2}`;
}

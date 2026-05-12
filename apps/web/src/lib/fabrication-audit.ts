// Fabrication-audit log — the catches surfaced during state-by-state
// stays + eateries verification sweeps (Mar–May 2026). Source of truth is
// the per-state quality table in CLAUDE.md (lines 78–97) plus session
// memory files. Hardcoded rather than live-computed because the audit
// trail lives in editorial memory, not the DB schema.
//
// Update cadence: append a new row each time a state audit closes.
// Never delete a row — past catches are the moat.

export interface AuditEntry {
  state: string;
  completionDate: string; // YYYY-MM-DD
  destinations: number;
  eateriesAudited: number;
  staysAudited: number;
  fabricationsCaught: number;
  /** % of stay candidates that turned out to be fabrications. Null when not
   *  directly computed from the audit notes. */
  fabricationRate: number | null;
  honestScarcityNulls: number;
  examples: string[];
}

/** Each example is one short line — what was claimed → what was actually true. */
export const FABRICATION_AUDIT: AuditEntry[] = [
  {
    state: "Tripura",
    completionDate: "2026-05-03",
    destinations: 3,
    eateriesAudited: 9,
    staysAudited: 7,
    fabricationsCaught: 8,
    fabricationRate: 89,
    honestScarcityNulls: 5,
    examples: [
      "Welcomhotel ITC Pinewood Agartala — ITC Pinewood is in Pahalgam, Kashmir.",
      "Taj Pushpabanta Palace — signed May 2025, doesn't open until 2028.",
      "Ujjayanta Palace Heritage Hotel — Ujjayanta is the State Museum, not a hotel.",
      "Neermahal Palace Resort — Neermahal is a museum, not a resort.",
      "Agartala Fort View Guest House — listed under Neermahal, 53 km cross-destination.",
      "Unakoti Palace Heritage Resort — no such property exists.",
      "Melaghar Tourist Lodge — real name is Sagar Mahal Tourist Lodge.",
      "Kanyasree Guest House — no operational footprint.",
    ],
  },
  {
    state: "Nagaland",
    completionDate: "2026-05-03",
    destinations: 6,
    eateriesAudited: 31,
    staysAudited: 23,
    fabricationsCaught: 6,
    fabricationRate: 78,
    honestScarcityNulls: 1,
    examples: [
      "Dzukou Valley Resort / Tent Camp / Camps — fabricated, no listed operator.",
      "Hotel Japfu Mon — actually a Kohima property, wrong-district listing.",
      "Mon Travellers Lodge — no district-government accommodation match.",
      "Pfutsero Highland Resort — no operational footprint.",
      "Angh Valley Homestay — fabricated.",
      "Tripadvisor Pfutsero page was contaminated with Kohima cafés.",
    ],
  },
  {
    state: "Jharkhand",
    completionDate: "2026-04-28",
    destinations: 4,
    eateriesAudited: 15,
    staysAudited: 13,
    fabricationsCaught: 10,
    fabricationRate: 78,
    honestScarcityNulls: 0,
    examples: [
      "Most candidate stays in the original list could not be confirmed against any government accommodation registry. Survivors were the minority.",
    ],
  },
  {
    state: "Meghalaya",
    completionDate: "2026-05-03",
    destinations: 9,
    eateriesAudited: 15,
    staysAudited: 18,
    fabricationsCaught: 11,
    fabricationRate: 67,
    honestScarcityNulls: 18,
    examples: [
      "MTDC Tourist Lodge Mawphlang — MTDC is Maharashtra Tourism, not Meghalaya.",
      "Mawphlang Sacred Grove Resort / Forest Eco-Camp — fabricated.",
      "Cherrapunji loc had a Shnongpdeng homestay listed — 80 km wrong town.",
      "Cherrapunji xfactor had Mawlynnong Treehouse — 75 km wrong town.",
      "Mawlynnong loc had Kynrem Falls Resort — actually in Cherrapunji.",
      "Mawsynram had Shnongpdeng Resort + Cliff Cherrapunji + a Mawlynnong homestay listed — three different wrong towns.",
      "Shillong xfactor had Shnongpdeng Cave Lodge — 80 km away.",
      "Shnongpdeng xfactor had Nongkhnum Falls Camp — 100 km away.",
      "Cafe Cinnamon — listings exist only in Tokyo and Amritsar.",
      "Kebab Box — no listing.",
      "Maa-wah Restaurant — template ghost.",
    ],
  },
  {
    state: "Arunachal Pradesh",
    completionDate: "2026-04-28",
    destinations: 11,
    eateriesAudited: 22,
    staysAudited: 25,
    fabricationsCaught: 7,
    fabricationRate: 61,
    honestScarcityNulls: 6,
    examples: [
      "Seven cross-state contaminations caught — properties listed under Arunachal that resolved to neighbouring states' districts.",
    ],
  },
  {
    state: "Manipur",
    completionDate: "2026-05-03",
    destinations: 5,
    eateriesAudited: 14,
    staysAudited: 12,
    fabricationsCaught: 7,
    fabricationRate: 58,
    honestScarcityNulls: 8,
    examples: [
      "Hotel Imperial Moreh — listicle ghost, not on district government accommodation pages.",
      "Le Tropicana / Magnolia / Phangrei Crest — no operational footprint.",
      "Mount Everest Ukhrul / Shirui Inn — fabricated.",
      "The Imoinu — actually an Imphal restaurant misclassified as a stay.",
      "Karang island address corrected to Thanga island.",
    ],
  },
  {
    state: "Assam",
    completionDate: "2026-05-03",
    destinations: 8,
    eateriesAudited: 18,
    staysAudited: 22,
    fabricationsCaught: 8,
    fabricationRate: 36,
    honestScarcityNulls: 10,
    examples: [
      "Bonhomie Farm Guwahati — real place, but in Davao, Philippines. Nearly entered the corpus.",
      "Sivasagar Tank Resort / Assam Eco Lodge / Charaideo Heritage Farmstay — all fabricated (the last 30 km cross-destination).",
      "Majuli Island Inn / Heritage Homestay / River Camps — all fabricated.",
      "Tai Singpho — closed business, listicle still surfacing it.",
      "Cafe Hendrix — no 2024+ activity.",
    ],
  },
  {
    state: "Mizoram",
    completionDate: "2026-05-03",
    destinations: 4,
    eateriesAudited: 11,
    staysAudited: 12,
    fabricationsCaught: 10,
    fabricationRate: 17,
    honestScarcityNulls: 4,
    examples: [
      "Hotel Lengchhawn — full ghost, zero operational footprint, somehow already in the DB before audit.",
      "Aizawl Youth Hostel & Homestays (Zona House) — merged hallucination of two unrelated concepts.",
      "Hotel Sangchia / Zote Bakery 'in Champhai' — both actually in Aizawl.",
      "Blue Mountain Restaurant, L T Mizo Belly, Hmar Run, David's Kitchen Lunglei, Cafe Cira, Aizawl Coffee House — listicle ghosts ruled out.",
    ],
  },
  {
    state: "Uttarakhand",
    completionDate: "2026-05-03",
    destinations: 38,
    eateriesAudited: 316,
    staysAudited: 116,
    fabricationsCaught: 11,
    fabricationRate: 9.5,
    honestScarcityNulls: 1,
    examples: [
      "Hosteller Haridwar — fabricated.",
      "Fern Hillside Lansdowne — actually a Bhimtal property.",
      "Sattal Eco Huts — no operational footprint.",
      "Kafal Woodhouse Tungnath — actually in Pantwari.",
      "Swayambhu Tungnath — actually in Karnaprayag.",
      "Kumaon Almora / Binsar dup — same property under two destinations.",
    ],
  },
  {
    state: "Himachal Pradesh",
    completionDate: "2026-05-03",
    destinations: 32,
    eateriesAudited: 286,
    staysAudited: 116,
    fabricationsCaught: 10,
    fabricationRate: 9,
    honestScarcityNulls: 2,
    examples: [
      "Taragarh — actually a Palampur property.",
      "Tirthan Grand — actually in Banjar.",
      "Kailasha Kasol → Parvati dup.",
      "River-View-Mandi → actually in Barot.",
      "Apple Country — typo for Apple Valley.",
      "Maitreya Key — actually in Tabo.",
    ],
  },
  {
    state: "Uttar Pradesh",
    completionDate: "2026-04-29",
    destinations: 13,
    eateriesAudited: 98,
    staysAudited: 44,
    fabricationsCaught: 4,
    fabricationRate: 9,
    honestScarcityNulls: 0,
    examples: [
      "Hosteller Sarnath — fabricated.",
      "Dudhwa Sarai Homestay — no operational footprint.",
      "Teli Jungle Camp — fabricated.",
      "Brijwas Dham — address rewrite required, original was wrong.",
    ],
  },
  // States below: no specific fabrications surfaced this round.
  // Listed for completeness — the audit ran, the candidates were clean
  // (or honest-scarcity blanks were the right answer).
  {
    state: "Ladakh",
    completionDate: "2026-04-29",
    destinations: 14,
    eateriesAudited: 93,
    staysAudited: 42,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 5,
    examples: [
      "4 Umlinga Pass nulls + 1 Tso Moriri duplicate left blank as honest scarcity.",
    ],
  },
  {
    state: "Jammu & Kashmir",
    completionDate: "2026-04-28",
    destinations: 17,
    eateriesAudited: 98,
    staysAudited: 34,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 4,
    examples: [
      "3 Sinthan Top entries left blank (no operational infrastructure to verify), 1 Yusmarg deduplication.",
    ],
  },
  {
    state: "Rajasthan",
    completionDate: "2026-04-29",
    destinations: 23,
    eateriesAudited: 105,
    staysAudited: 70,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 4,
    examples: ["All 4 honest-scarcity blanks in Deeg — newer destination, thin verified footprint."],
  },
  {
    state: "Sikkim",
    completionDate: "2026-04-28",
    destinations: 11,
    eateriesAudited: 19,
    staysAudited: 21,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 4,
    examples: ["4 restricted high-altitude lakes / national-park dests left blank — entry is itself restricted."],
  },
  {
    state: "Bihar",
    completionDate: "2026-04-28",
    destinations: 6,
    eateriesAudited: 36,
    staysAudited: 13,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 11,
    examples: ["Heavy honest-scarcity state — 11 fields left blank rather than filled from thin listicles."],
  },
  {
    state: "Punjab + Haryana + Chandigarh",
    completionDate: "2026-04-28",
    destinations: 8,
    eateriesAudited: 69,
    staysAudited: 24,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 2,
    examples: ["2 honest-scarcity blanks in Anandpur Sahib."],
  },
  {
    state: "West Bengal",
    completionDate: "2026-04-28",
    destinations: 6,
    eateriesAudited: 38,
    staysAudited: 20,
    fabricationsCaught: 0,
    fabricationRate: 0,
    honestScarcityNulls: 4,
    examples: ["4 honest-scarcity blanks rather than fill from unverified listings."],
  },
];

/** Cross-state contaminations — the most readable proof of what happens when
 *  listicles are trusted without cross-referencing. */
export const CROSS_STATE_CATCHES = [
  {
    claimed: "Bonhomie Farm Guwahati",
    reality: "Real place — but in Davao, Philippines.",
    state: "Assam audit",
  },
  {
    claimed: "Welcomhotel ITC Pinewood Agartala",
    reality: "ITC Pinewood is in Pahalgam, Kashmir.",
    state: "Tripura audit",
  },
  {
    claimed: "MTDC Tourist Lodge Mawphlang",
    reality: "MTDC stands for Maharashtra Tourism — Meghalaya uses a different brand.",
    state: "Meghalaya audit",
  },
  {
    claimed: "Hotel Sangchia Champhai (Mizoram)",
    reality: "Actually in Aizawl, the state capital — wrong town in the same state.",
    state: "Mizoram audit",
  },
  {
    claimed: "Hotel Japfu Mon (Nagaland)",
    reality: "Actually in Kohima — wrong-district contamination.",
    state: "Nagaland audit",
  },
];

/** Code-side guardrails that hard-block specific failure modes from
 *  re-entering the corpus. Each row maps to a migration or feedback rule
 *  that's been codified into the data layer itself. */
export const CODE_GUARDRAILS = [
  {
    name: "Placeholder phone rejection",
    reference: "Migration 052",
    summary:
      "A database trigger rejects any phone number containing XXXXX, runs of six or more zeros or nines, or strings like TBD/TODO/PLACEHOLDER. Applied to emergency_sos contacts so a stranded family can't be sent the wrong number at 2 a.m.",
  },
  {
    name: "Institutional anchor sources must be reachable",
    reference: "Universal-reachability rule, 2026-05-11",
    summary:
      "Every cited source URL on the trust layer is curl-checked from a non-Indian environment before publishing. We dropped seven anchor rows that turned out to be India-IP-only — Wikipedia is never an acceptable primary source.",
  },
  {
    name: "Eateries price tiers are an enum",
    reference: "CHECK constraint on local_eateries.price_range",
    summary:
      "Eateries are tagged on a four-step rupee scale (₹ / ₹₹ / ₹₹₹ / ₹₹₹₹). Fabricated precision like 'between ₹150 and ₹350 per head' fails the constraint at write time.",
  },
  {
    name: "Stays must declare their sourcing",
    reference: "destination_stay_picks.source enum",
    summary:
      "Every stay pick records whether it came from the verified local-stays index, an open web search, or a manual editor entry. The audit trail survives review.",
  },
  {
    name: "Editorial prose has a floor",
    reference: "dm_prose_floor CHECK constraint",
    summary:
      "A destination flagged as worth visiting in a given month must justify it in at least 150 characters of why-to-go prose. Stub copy can't masquerade as a verdict.",
  },
];

/** Aggregate totals — derived from FABRICATION_AUDIT for the page header.
 *  Excludes Ladakh/J&K/Rajasthan/Sikkim/Bihar/Punjab+H+C/West Bengal entries
 *  for the rate calculation since those returned 0 fabrications — but they
 *  still count toward staysAudited and statesCovered. */
export function getAuditTotals() {
  const statesCovered = FABRICATION_AUDIT.length;
  const staysAudited = FABRICATION_AUDIT.reduce((sum, e) => sum + e.staysAudited, 0);
  const eateriesAudited = FABRICATION_AUDIT.reduce((sum, e) => sum + e.eateriesAudited, 0);
  const fabricationsCaught = FABRICATION_AUDIT.reduce(
    (sum, e) => sum + e.fabricationsCaught,
    0,
  );
  const honestScarcityNulls = FABRICATION_AUDIT.reduce(
    (sum, e) => sum + e.honestScarcityNulls,
    0,
  );
  return {
    statesCovered,
    staysAudited,
    eateriesAudited,
    fabricationsCaught,
    honestScarcityNulls,
  };
}

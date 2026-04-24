/**
 * Persona definitions for /for/[persona] hub pages.
 *
 * Matching logic tries three sources in order:
 *   1. persona_blocks JSONB — direct "GO" verdict (shipped Sprint 2/Tier backfill)
 *   2. best_for_segments[].segment — keyword match
 *   3. Base attributes (kids_friendly, difficulty, elevation) — fallback
 *
 * Every destination that surfaces on a persona hub has a defensible DB-sourced
 * reason. No editorial curation lists, no fabricated "best for X" badges.
 */

export type PersonaSlug =
  | "families"
  | "bikers"
  | "nomads"
  | "elderly"
  | "photographers"
  | "solo-female"
  | "honeymooners"
  | "pilgrims"
  | "wellness"
  | "culinary";

export type PersonaConfig = {
  slug: PersonaSlug;
  label: string;
  labelHindi: string;
  title: string;
  titleHindi: string;
  tagline: string;
  taglineHindi: string;
  description: string;
  icon: string;              // emoji-free — just a kept label for aria
  faq: Array<{ q: string; a: string }>;
  /** Direct persona_blocks field key if it exists in the schema */
  personaBlockKey?: "biker" | "nomad" | "family" | "elderly" | "solo_female" | "photographer";
  /** Keywords to match in best_for_segments[].segment — case-insensitive */
  segmentKeywords?: string[];
  /** Base-attribute filter fallback */
  baseFilter?: (dest: DestRecord) => boolean;
};

export type DestRecord = {
  id: string;
  name: string;
  state_id: string | null;
  tagline: string | null;
  difficulty: string | null;
  elevation_m: number | null;
  persona_blocks: Record<string, string> | null;
  best_for_segments: Array<{ segment: string; reason: string }> | null;
  kids_friendly?: { rating: number | null; suitable: boolean | null } | null;
  solo_female_score?: { annual_score?: number } | null;
};

export const PERSONAS: Record<PersonaSlug, PersonaConfig> = {
  families: {
    slug: "families",
    label: "Families with kids",
    labelHindi: "बच्चों वाले परिवार",
    title: "India for families — destinations built for travel with kids",
    titleHindi: "बच्चों के साथ भारत यात्रा — परिवार के लिए सर्वोत्तम स्थल",
    tagline: "Low-altitude, medical-access-covered, and the places we'd actually send our own daughters.",
    taglineHindi: "कम ऊँचाई, चिकित्सा सुविधा, और वे जगहें जहाँ हम अपने बच्चों को भेजेंगे।",
    description: "India destinations scored 4/5 or higher for families with kids — filtered for altitude, road safety, medical access, and the practical reality of travelling with children. Every destination here carries a family verdict written for real parents.",
    icon: "family",
    personaBlockKey: "family",
    baseFilter: (d) => (d.kids_friendly?.suitable === true) && (d.kids_friendly?.rating ?? 0) >= 4,
    faq: [
      { q: "What altitude is safe for kids under 10?", a: "NakshIQ recommends staying under 2,500m for children under 10 unless specifically acclimatised. That keeps the Himalayan foothills (Dharamshala, Nainital, Mussoorie) in range but excludes Leh, Spiti, Tawang for first-time family travel." },
      { q: "Which Indian regions are easiest with toddlers?", a: "Kerala ranks first for toddler-friendliness — English widely spoken, medical access dense, air travel connectivity. Goa in Oct-Mar and Rajasthan's Jaipur-Udaipur stretch in winter follow. Hill stations under 2,000m work in summer." },
      { q: "Are national parks safe for kids?", a: "Yes, with age guidance. Kanha, Bandhavgarh, Ranthambore, Bandipur all run family safaris with minimum-age rules (typically 3+). Kaziranga has elephant-back safaris. Parks close for the monsoon months — check the destination page for reopening dates." },
    ],
  },

  bikers: {
    slug: "bikers",
    label: "Motorcyclists",
    labelHindi: "बाइकर्स",
    title: "India for motorcyclists — the roads, the circuits, the real tests",
    titleHindi: "बाइकर्स के लिए भारत — असली सड़कें, असली सर्किट",
    tagline: "Spiti, Ladakh, the Northeast, Konkan. The circuits motorcyclists come back for.",
    taglineHindi: "स्पिति, लद्दाख, नॉर्थ-ईस्ट, कोंकण। बाइकर्स के लिए असली परीक्षा।",
    description: "Destinations where motorcycling is the reason to go — either because the route itself is the experience (Manali-Leh, Spiti, Arunachal passes) or because the destination rewards two-wheeled exploration (Konkan coast, Western Ghats).",
    icon: "bike",
    personaBlockKey: "biker",
    segmentKeywords: ["motorcycle", "motorcyclist", "biker", "bike route", "high pass"],
    faq: [
      { q: "When do the Manali-Leh and Spiti passes open?", a: "Manali-Leh highway typically opens mid-May to late October. Kunzum La (Spiti) opens June to mid-October. Rohtang is now bypassed by Atal Tunnel (year-round). The NakshIQ scenario pages cover pass-closure protocols." },
      { q: "Is the Northeast safe for solo motorcycle travel?", a: "Arunachal, Nagaland, Manipur are safe with Inner Line Permits (ILPs). Manipur's Imphal valley has occasional political flashpoints — check advisories. Assam-Meghalaya-Arunachal corridor is the standard NE circuit." },
      { q: "Best time for Konkan coast bike trips?", a: "November to February — the monsoon (Jun-Sep) makes the Konkan-Goa coastal road dangerous. Post-monsoon October is lushly green but some roads still wash-damaged." },
    ],
  },

  nomads: {
    slug: "nomads",
    label: "Digital nomads",
    labelHindi: "डिजिटल नोमैड",
    title: "India for digital nomads — long-stay bases with reliable internet",
    titleHindi: "डिजिटल नोमैड के लिए भारत — लंबे प्रवास, विश्वसनीय इंटरनेट",
    tagline: "Goa, Dharamshala, Bir, Pondicherry, Kasol, Gokarna — the slow-stay belt.",
    taglineHindi: "गोवा, धर्मशाला, बीर, पुदुच्चेरी, कसौल, गोकर्ण — धीमी यात्रा बेल्ट।",
    description: "Destinations with the infrastructure digital nomads need: reliable internet, long-stay homestays, coworking cafés, English-speaking service layer, and the practical reality of running a laptop job from India.",
    icon: "laptop",
    personaBlockKey: "nomad",
    segmentKeywords: ["digital nomad", "remote work", "long stay", "laptop"],
    faq: [
      { q: "Which Indian city has the best internet for remote work?", a: "Bengaluru, Hyderabad, Pune, Mumbai, Gurgaon lead with fibre broadband (JioFiber, ACT) at 300-1000 Mbps in service apartments. Of the nomad-popular destinations, Goa, Dharamshala, Pondicherry, and Kasol have reliable 4G + hotel wifi; Spiti, Ladakh, and the Northeast are genuinely bad for video calls." },
      { q: "How do foreign nomads handle long stays in India?", a: "e-Tourist Visa caps at 180 days continuous. For longer stays you'd need an Employment Visa (tied to an Indian employer) or Business Visa. FRRO registration is required after 180 days. Most nomads do 60-90 day stays and re-enter after the gap." },
      { q: "Are there coworking spaces in smaller destinations?", a: "Yes — Dharamshala has several (Tushita, Bhagsu), Goa has many (Surf Office, Bombay Hub), Bir has Hugging Clouds. Smaller towns typically rely on café laptop culture (Dhauladhar Café in Dharamshala, Wild Orchid in Goa)." },
    ],
  },

  elderly: {
    slug: "elderly",
    label: "Elderly travelers",
    labelHindi: "वरिष्ठ यात्री",
    title: "India for older travelers and retirees — easy-access destinations",
    titleHindi: "वरिष्ठ यात्रियों के लिए भारत — आसान पहुँच के स्थल",
    tagline: "Low altitude, manageable walking, medical access within range. The honest pick.",
    taglineHindi: "कम ऊँचाई, सरल चलना, चिकित्सा पहुँच। ईमानदार विकल्प।",
    description: "Destinations rated manageable for older travelers (60+) and those with mobility concerns. Filtered for altitude, walking terrain, medical access, and heritage-to-trekking ratio. Honest 'hard no' verdicts where altitude or difficulty makes the destination unsuitable.",
    icon: "senior",
    personaBlockKey: "elderly",
    baseFilter: (d) => (d.difficulty === "easy") && (d.elevation_m == null || d.elevation_m < 2000),
    faq: [
      { q: "Is India safe for senior travelers over 70?", a: "Yes, with appropriate destination selection. Low-altitude heritage destinations (Rajasthan, Kerala backwaters, Goa in cool months, South Indian temple circuits) work well. Avoid high-altitude destinations (Leh, Spiti, Tawang) and strenuous treks. Medical tourism infrastructure is excellent in major cities." },
      { q: "Which altitude is the cutoff for elderly travel?", a: "NakshIQ recommends under 2,500m for travelers 65+ without specific acclimatisation experience. That excludes Leh (3,500m), Spiti (3,000-4,000m), Tawang (3,000m), but keeps Darjeeling (2,042m borderline), Munnar (1,600m), Shimla (2,200m borderline), and most of south India in range." },
      { q: "Best destinations for a multi-generational family trip?", a: "Rajasthan (Jaipur-Udaipur stretch), Kerala (backwaters + hills + beach), Goa (Nov-Feb), and the Golden Triangle all accommodate mixed ages — flat walking, heritage-level interest, good medical access, hotels with lifts, reliable AC." },
    ],
  },

  photographers: {
    slug: "photographers",
    label: "Photographers",
    labelHindi: "फ़ोटोग्राफ़र",
    title: "India for photographers — destinations built for the lens",
    titleHindi: "फ़ोटोग्राफ़रों के लिए भारत — लेंस के लिए बनी जगहें",
    tagline: "Spiti dark skies, Rajasthan yellow-sandstone, Kerala monsoon green, Ladakh high passes.",
    taglineHindi: "स्पिति का अंधेरा आकाश, राजस्थान का बलुआ पत्थर, केरल का मानसून हरा।",
    description: "Destinations where photography is the primary draw — astrophotography at altitude, heritage architecture, festivals, wildlife, or landscape scale. Each destination carries a photographer-specific verdict.",
    icon: "camera",
    personaBlockKey: "photographer",
    segmentKeywords: ["photographer", "photography", "astrophoto", "architecture"],
    faq: [
      { q: "Where in India can I shoot the Milky Way?", a: "Spiti (especially Komic at 4,587m and Langza), Ladakh (Hanle at 4,500m and Pangong Lake), Rann of Kutch during new-moon phases. India's best dark-sky sites are above 3,500m in rain-shadow zones — 300+ clear nights a year. Hanle has an astronomical observatory; Komic has been certified by the government as an astro-tourism site." },
      { q: "When is India's best festival photography season?", a: "October to February covers the biggest festival calendar — Durga Puja (Oct), Diwali (Oct/Nov), Pushkar Mela (Nov), Hornbill Festival (Dec 1-10), Losar (Feb in Tibetan areas). Holi (March), Rann Utsav (Nov-Feb) add to the spread." },
      { q: "Are drones legal for photography in India?", a: "Regulated under DGCA rules. Micro drones (<250g) need no permit for personal use in uncontrolled airspace. Above that requires UIN registration + pilot certification. Most tourist sites, protected areas, border zones, and airports ban drones outright. Check the destination page for dest-specific drone policy." },
    ],
  },

  "solo-female": {
    slug: "solo-female",
    label: "Solo female travelers",
    labelHindi: "एकल महिला यात्री",
    title: "India for solo female travelers — month-by-month safety index",
    titleHindi: "एकल महिला यात्रियों के लिए भारत — मासिक सुरक्षा सूचकांक",
    tagline: "State-by-state 1-5 safety scores with monthly overrides. No generalisations.",
    taglineHindi: "राज्य-दर-राज्य सुरक्षा स्कोर, मासिक अपडेट के साथ। कोई सामान्यीकरण नहीं।",
    description: "The honest solo-female safety index for India — 1-5 annual score per destination with monthly overrides for festivals, political flashpoints, and weather-driven safety shifts. Deep-dive blog post with month-by-month state guidance.",
    icon: "female",
    segmentKeywords: ["solo female", "solo-female", "woman traveler"],
    baseFilter: (d) => (d.solo_female_score?.annual_score ?? 0) >= 4,
    faq: [
      { q: "Which Indian states rank highest for solo female safety?", a: "NakshIQ's annual index ranks Sikkim, Kerala, Himachal (Dharamshala/McLeod specifically), Meghalaya, and Puducherry at 4.5-5/5. Delhi, Jaipur (after dark), and specific Bihar/UP districts rank lower. See the month-by-month guide for specific seasonal overrides." },
      { q: "What are the safest Indian festivals for solo female travelers?", a: "Pushkar Mela (Rajasthan), Hornbill Festival (Nagaland), Onam (Kerala), Durga Puja (Kolkata), Ziro Music Festival (Arunachal) all rank safe. Avoid Holi in Mathura/Vrindavan as a solo female — public-groping incidents are recurring." },
      { q: "Should solo female travelers avoid any specific routes?", a: "Overnight buses in Bihar/Jharkhand/eastern UP rural routes carry documented incident rates. Prefer train (2AC with ladies compartment) or air for those stretches. Night arrivals at Delhi/Mumbai/Bengaluru airports are fine; small-town night arrivals less so." },
    ],
  },

  honeymooners: {
    slug: "honeymooners",
    label: "Honeymooners",
    labelHindi: "हनीमून यात्री",
    title: "India for honeymoons — romantic destinations with real privacy",
    titleHindi: "हनीमून के लिए भारत — वास्तविक गोपनीयता वाले स्थल",
    tagline: "Andaman, Udaipur, Kerala backwaters, Munnar, Pondicherry. Couples-first picks.",
    taglineHindi: "अंडमान, उदयपुर, केरल, मुन्नार, पुदुच्चेरी। जोड़ों के लिए पहली पसंद।",
    description: "India destinations optimised for couples — private villa stays, sunset locations, the romance that brochures promise without the wedding-procession noise. Curated from best_for_segments where honeymoon or couples explicitly feature.",
    icon: "couples",
    segmentKeywords: ["honeymoon", "couple", "romantic", "couples"],
    baseFilter: (d) => ["udaipur", "havelock-island", "neil-island", "munnar", "alleppey", "puducherry", "varkala", "agonda", "palolem", "coorg"].includes(d.id),
    faq: [
      { q: "Which India destination is best for a honeymoon in November?", a: "Andaman islands (Havelock, Neil) at their seasonal peak — dry, dive visibility 30m+, private villa beach properties. Udaipur's heritage hotels also shine. Goa is building up to peak, November 15+ is when shacks are fully operational." },
      { q: "How much should we budget for a 7-day India honeymoon?", a: "Mid-range: ₹1.5-2.5 lakh per couple including domestic flights, 4★ hotels, meals, activities. Luxury: ₹4-8 lakh (heritage suites, private villas, charter flights). See NakshIQ Cost Index for category-wise benchmarks." },
      { q: "Are Kerala backwaters worth it for a honeymoon?", a: "Yes, specifically the private-deck houseboat experience out of Alleppey or Kumarakom. Book 4-6 weeks ahead for Oct-Feb peak. The 1-night cruise is the classic; 2-nights only works if you can handle the same scenery." },
    ],
  },

  pilgrims: {
    slug: "pilgrims",
    label: "Pilgrims",
    labelHindi: "तीर्थ यात्री",
    title: "India for pilgrims — the spiritual circuits",
    titleHindi: "तीर्थ यात्रियों के लिए भारत — आध्यात्मिक परिपथ",
    tagline: "Char Dham, Buddhist Circuit, Divya Desam, Jain Tirthas, Sufi Darghas.",
    taglineHindi: "चार धाम, बौद्ध परिपथ, दिव्य देशम, जैन तीर्थ, सूफ़ी दरगाह।",
    description: "India's major pilgrimage circuits — Char Dham (Uttarakhand), the Buddhist circuit (Bodh Gaya, Sarnath, Nalanda, Rajgir), Divya Desam (108 Vishnu temples), Jain tirthas, Sufi shrines. Each destination carries pilgrim-specific practical detail.",
    icon: "temple",
    segmentKeywords: ["pilgrim", "pilgrimage", "temple", "monastery", "buddhist", "jain", "sufi", "dargah", "tirtha", "dham", "divya desam"],
    faq: [
      { q: "When does the Char Dham yatra open?", a: "Late April/early May to November. The four dhams (Yamunotri, Gangotri, Kedarnath, Badrinath) open sequentially as passes clear. Kedarnath and Badrinath are the most climate-sensitive — late May or June is the safest window." },
      { q: "What's the best Buddhist circuit itinerary?", a: "Bodh Gaya (enlightenment) → Sarnath (first sermon) → Kushinagar (parinirvana) → Lumbini (birth, in Nepal) → Rajgir → Nalanda. Typically 10-14 days. October to March is the window — summers are brutal in the Bihar/UP plains." },
      { q: "Can I visit all four Dhams in one trip?", a: "Yes — the classic yatra takes 10-12 days by helicopter or 14-16 days by road. Helicopter packages run ₹1.2-2 lakh per person. Road journey is taxing — a lot of the Rudraprayag-Kedarnath route is hairpins, and Yamunotri requires a 6km trek from Janki Chatti." },
    ],
  },

  wellness: {
    slug: "wellness",
    label: "Wellness & retreats",
    labelHindi: "स्वास्थ्य रिट्रीट",
    title: "India for wellness — Ayurveda, yoga, and retreat destinations",
    titleHindi: "भारत में स्वास्थ्य — आयुर्वेद, योग, और रिट्रीट स्थल",
    tagline: "Kerala Ayurveda, Rishikesh yoga, Dharamshala meditation, Auroville retreats.",
    taglineHindi: "केरल आयुर्वेद, ऋषिकेश योग, धर्मशाला ध्यान, ऑरोविल रिट्रीट।",
    description: "Destinations where wellness is the reason to travel — certified Ayurveda centres (Kerala), yoga in the birthplace (Rishikesh), Tibetan Buddhist meditation (Dharamshala), and intentional-community retreats (Auroville, Isha Foundation).",
    icon: "wellness",
    segmentKeywords: ["ayurveda", "wellness", "yoga", "retreat", "meditation", "spa", "spiritual"],
    faq: [
      { q: "When is the best time for a Kerala Ayurveda retreat?", a: "June to September — the monsoon is considered ideal for Panchakarma treatments (the humidity helps the herbs absorb). Kerala centres discount 20-40% during this window. October-February is peak tourist season — higher rates, less focus on the therapy itself." },
      { q: "Is Rishikesh yoga teacher training certified?", a: "Many centres are Yoga Alliance (USA) certified — Parmarth Niketan, Sivananda Ashram, Anand Prakash. A 200-hour TTC runs 3-4 weeks, ₹80k-1.8 lakh depending on centre. Check Yoga Alliance directly before booking." },
      { q: "What's the difference between Auroville and Isha Foundation?", a: "Auroville (Puducherry) is an experimental township founded 1968 by The Mother — universal living, no money internally, open visits. Isha (near Coimbatore) is a structured ashram with Adiyogi installation, inner engineering programs, stricter retreat formats." },
    ],
  },

  culinary: {
    slug: "culinary",
    label: "Culinary travelers",
    labelHindi: "पाक-यात्री",
    title: "India for food travelers — the regional cuisines worth travelling for",
    titleHindi: "भोजन के लिए भारत यात्रा — क्षेत्रीय व्यंजन",
    tagline: "Hyderabad biryani, Chettinad spice, Kolkata street, Lucknow Awadhi, Goa seafood.",
    taglineHindi: "हैदराबाद बिरयानी, चेट्टीनाड मसाला, कोलकाता स्ट्रीट, लखनऊ, गोवा सीफ़ूड।",
    description: "Destinations where the cuisine is the reason to go — regional capitals of India's food cultures. Each destination carries a named dish, a named restaurant (citation-first), and seasonal context (monsoon mushroom season in Northeast, winter gur jaggery in Bengal).",
    icon: "plate",
    segmentKeywords: ["cuisine", "culinary", "food", "street food", "regional cuisine"],
    baseFilter: (d) => ["hyderabad","lucknow","kolkata","varanasi","chettinad","madurai","kochi","panaji","mangalore","delhi","old-delhi","amritsar"].includes(d.id),
    faq: [
      { q: "What's the difference between Hyderabadi and Lucknowi biryani?", a: "Hyderabadi biryani uses the 'dum' method — meat and rice cooked together from raw. Lucknowi (Awadhi) uses pukki technique — meat cooked separately, then layered with rice. Hyderabadi uses more spice heat; Awadhi is aromatic and subtle. Both are legally Geographical Indication (GI) tagged." },
      { q: "Is Indian street food safe for foreign travelers?", a: "Yes, with a rule: eat where it's cooking-fresh and busy. High-turnover stalls in Old Delhi (Chandni Chowk), Lucknow (Tunday Kebabi stretch), Kolkata (Decker's Lane), Hyderabad (Charminar) are heavily vetted by local foodies — avoid stalls without turnover. Skip salads and cut fruit; stick to hot-off-the-pan." },
      { q: "Which Indian city has the best vegetarian food?", a: "Ahmedabad and Jaipur lead vegetarian depth — Gujarati and Marwari cuisines. South Indian vegetarian (Tamil, Kerala Brahmin, Karnataka Udupi) is globally underrated — try Chennai's messes (Ratna Cafe, Saravana Bhavan), Bengaluru's MTR, Udupi's Mitra Samaj." },
    ],
  },
};

export const PERSONA_ORDER: PersonaSlug[] = [
  "families", "bikers", "nomads", "elderly", "photographers",
  "solo-female", "honeymooners", "pilgrims", "wellness", "culinary",
];

function verdictIsGo(value: string | undefined | null): boolean {
  if (!value) return false;
  const v = value.trim().toUpperCase();
  return v.startsWith("GO") || v.startsWith("OK —") || v.startsWith("OK,") || v.startsWith("OK ") || v === "OK";
}

/**
 * Filter destinations matching a persona. Order of precedence:
 *   1. persona_blocks direct field → "GO" verdict
 *   2. best_for_segments keyword match
 *   3. baseFilter fallback
 */
export function matchDestinationsForPersona(
  config: PersonaConfig,
  dests: DestRecord[],
): DestRecord[] {
  const matches: Array<{ dest: DestRecord; rank: number }> = [];

  for (const d of dests) {
    let rank = 0;

    // Tier 1: direct persona_blocks match
    if (config.personaBlockKey && d.persona_blocks) {
      const pb = d.persona_blocks[config.personaBlockKey];
      if (verdictIsGo(pb)) rank = 3;
    }

    // Tier 2: best_for_segments keyword match
    if (rank === 0 && config.segmentKeywords && Array.isArray(d.best_for_segments)) {
      const haystack = d.best_for_segments
        .map((s) => `${s.segment ?? ""} ${s.reason ?? ""}`.toLowerCase())
        .join(" ");
      const hit = config.segmentKeywords.some((kw) => haystack.includes(kw.toLowerCase()));
      if (hit) rank = 2;
    }

    // Tier 3: baseFilter fallback
    if (rank === 0 && config.baseFilter && config.baseFilter(d)) {
      rank = 1;
    }

    if (rank > 0) matches.push({ dest: d, rank });
  }

  return matches
    .sort((a, b) => b.rank - a.rank || a.dest.name.localeCompare(b.dest.name))
    .map((m) => m.dest);
}

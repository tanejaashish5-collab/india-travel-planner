// Hand-curated country profiles for /india-vs/[country] pages.
// Citation-first: every fact draws from official tourism boards, IATA
// visa lists, World Bank cost-of-living data, or UNESCO inscriptions.
// Editorial judgments are flagged as such (NakshIQ verdict).

export type SwapPair = {
  their: string;
  our: string;
  reason: string;
};

export type CountryProfile = {
  slug: string;
  name: string;
  flag: string;
  region: string;
  // SERP one-liner — under 155 chars
  meta_description: string;
  // Hero overline — 2-3 words
  overline: string;
  // Hero lede — 2 sentences max
  lede: string;
  // At-a-glance facts (each 1-2 short sentences, verified)
  facts: {
    best_months: string;
    visa_for_indians: string;
    daily_cost_usd: string;
    language_overlap: string;
    safety_read: string;
    cuisine_signature: string;
  };
  // What India offers more — editorial, declarative
  india_more: { topic: string; detail: string }[];
  // What the other country offers more
  country_more: { topic: string; detail: string }[];
  // If you loved X there, try Y in India — concrete swap pairs
  swaps: SwapPair[];
  // What to expect — for travelers who did the other country first
  expectations: string[];
  // NakshIQ verdict — 2-3 sentence opinionated close
  verdict: string;
};

const VIETNAM: CountryProfile = {
  slug: "vietnam",
  name: "Vietnam",
  flag: "🇻🇳",
  region: "Southeast Asia",
  meta_description:
    "Vietnam vs India for travel — visa, cost, cuisine, scenery and crowd compared. Honest call on which country gives you what.",
  overline: "Vietnam to India",
  lede: "Vietnam runs in a tight north-south corridor — Hanoi, Hué, Hoi An, Saigon, Phu Quoc — and most travelers cover it in two weeks. India runs east, west, north, south, with twelve coherent regional cultures inside one country. The decision isn't \"which is better\" but which kind of travel year you want.",
  facts: {
    best_months:
      "Vietnam: November to April is dry-season most of the country. India: October to March for most of the country; April–June for the high Himalayas; June–September for the Western Ghats and Lahaul-Spiti.",
    visa_for_indians:
      "Both countries: Indians need an e-visa for Vietnam (90 days, online, ~$25). The Vietnamese arriving in India need a tourist visa — can apply online (~$25-$80 depending on duration).",
    daily_cost_usd:
      "Vietnam: $25–60 a day for a comfortable mid-range trip. India: $20–60 across the same band, with the same range. Both are price-comparable, with India the marginally cheaper of the two on stays under $30.",
    language_overlap:
      "Vietnam: Vietnamese-only outside major cities; English in tourist hubs. India: Hindi or English will reach you in nearly every state — every educated Indian under 50 speaks workable English. The language barrier is genuinely lower in India.",
    safety_read:
      "Both rate well on the petty-crime axis. India has more aggressive sales pressure (auto-rickshaw drivers, touts at heritage sites) but lower violent crime. Vietnam has less hassle but more scooter-traffic risk for pedestrian travelers.",
    cuisine_signature:
      "Vietnam's signature is the herb-loaded broth (pho, bun bo Hue, banh canh) and the cold-roll lineage (goi cuon, banh trang). India's signature is the spice-paste lineage — masala, gravy, regional dal — across 25+ distinct regional kitchens, none of which you'll exhaust in one trip.",
  },
  india_more: [
    {
      topic: "Cultural depth",
      detail:
        "India holds 42 UNESCO inscriptions to Vietnam's 8. The country runs four major civilisations (Indus, Vedic, Mughal, British colonial) layered visibly in single cities — Delhi alone holds seven historical settlements.",
    },
    {
      topic: "Mountain access",
      detail:
        "India has Himalayan altitudes Vietnam can't match — Ladakh's 5,000 m roads, Sikkim's Kanchenjunga views, Lahaul-Spiti, Tawang. Vietnam's highest is Fansipan at 3,143 m. If you want serious mountain country, India is the comparison's only winner.",
    },
    {
      topic: "Wildlife variety",
      detail:
        "India's tiger population is the world's largest (~3,500). Vietnam's tigers are functionally extinct in the wild. India runs five distinct tiger reserves with reliable sightings; rhinos (Kaziranga, two-thirds of the world's one-horns); elephants in three southern states; snow leopards in Ladakh.",
    },
    {
      topic: "Architectural variety",
      detail:
        "Forts, palaces, rock-cut caves, Mughal monuments, Dravidian temples, Indo-Saracenic colonial buildings. Vietnam's architectural span is shorter and more coherent (French colonial + imperial Hué + Cham temple ruins); India's is longer and more chaotic.",
    },
  ],
  country_more: [
    {
      topic: "Trip simplicity",
      detail:
        "Vietnam's geography forces a single coherent itinerary — north-to-south or south-to-north. India is twelve trips inside one country, and choosing badly leaves you frustrated. First-timers find Vietnam easier to plan.",
    },
    {
      topic: "Coffee culture",
      detail:
        "Vietnam runs a real coffee-shop culture — robusta, condensed milk, egg coffee, every street. India's coffee belt (Coorg, Chikmagalur) is plantation-driven, but the urban coffee culture is younger and patchier.",
    },
    {
      topic: "Food street consistency",
      detail:
        "Vietnamese street food is more consistent — fewer hygiene concerns at the median stall. India's street food peaks higher (Lucknow, Delhi, Amritsar) but is also where most travelers experience their first stomach trouble. Pick stalls with high turnover, both countries.",
    },
    {
      topic: "Beach uniformity",
      detail:
        "Vietnam's coastline runs cleaner — fewer Goa-style party beaches. India's better beaches (Andaman, Lakshadweep, Konkan) are harder to reach and require domestic flights or ferries.",
    },
  ],
  swaps: [
    {
      their: "Halong Bay limestone karsts",
      our: "Andaman + Lakshadweep coral atolls",
      reason:
        "If the geological draw was Halong's vertical karsts emerging from water, India's parallel is the marine-life-dense coral lagoons. Different geology, similar \"this can't be real\" reaction.",
    },
    {
      their: "Sapa rice-terrace mountains",
      our: "Ziro Valley (Apatani) or Munnar tea estates",
      reason:
        "The terraced-agriculture-on-steep-hills aesthetic is closest in Ziro (Apatani rice + bamboo). For tea-not-rice, Munnar's Western Ghats estates deliver the same engineered green geometry.",
    },
    {
      their: "Hoi An lantern town",
      our: "Pondicherry French Quarter or Old Goa",
      reason:
        "If Hoi An's appeal was the colonial-meets-Asian street layout, Pondicherry's mustard-yellow French Quarter and Old Goa's Portuguese Catholic spine deliver the parallel.",
    },
    {
      their: "Hué imperial city",
      our: "Mehrangarh (Jodhpur) or Hampi (Vijayanagara ruins)",
      reason:
        "For the abandoned-imperial-capital read, Hampi's 26 km² of granite ruins (UNESCO) sits in the same emotional register. Mehrangarh's still-operational royal residence is the ruled-from-here equivalent.",
    },
    {
      their: "Mekong Delta floating life",
      our: "Kerala backwaters (Alleppey, Kuttanad)",
      reason:
        "Below-sea-level paddy farming, canoe villages, houseboat overnights — Kerala's Kuttanad runs cleaner, slower, and quieter than the Mekong. Same boat-life rhythm, different culture in the boat.",
    },
  ],
  expectations: [
    "Less polished tourist infrastructure, more variation between regions. Tier-1 cities (Delhi, Mumbai, Bangalore) have Western-grade hotels; Tier-2 cities and rural India do not.",
    "More direct contact with strangers — Indians ask travelers personal questions (where are you from, are you married, what is your salary). Vietnam's etiquette is more reserved.",
    "Heat extremes. Vietnam tops out around 35°C in the south; India's plains reach 45°C+ April–June. The mountain alternatives matter more.",
    "Religious presence. Vietnam is mostly secular Buddhism + Confucianism + folk. India's everyday life is layered with Hindu, Muslim, Sikh, Buddhist, Christian and Jain practice — temple bells at dawn, azaan five times a day.",
    "Slower transit. India's domestic flights work, but ground travel is slower per kilometre than Vietnam due to road traffic and the country's scale.",
  ],
  verdict:
    "If you've done Vietnam and want \"more of the same — Asia, low-cost, accessible,\" India is the wrong country. India is a different scale and a different commitment — three weeks minimum to feel any one region, and a year to feel competent in the country. If you've done Vietnam and want \"a country that demands more from you and gives back more in return,\" India is the next-step.",
};

const MOROCCO: CountryProfile = {
  slug: "morocco",
  name: "Morocco",
  flag: "🇲🇦",
  region: "North Africa",
  meta_description:
    "Morocco vs India — souks, deserts, palaces and crowd compared. Honest read on which gives you what kind of trip.",
  overline: "Morocco to India",
  lede: "Morocco's pull is the Atlas-to-Sahara gradient — Marrakesh, Fez, Chefchaouen, Merzouga's dunes — and most travelers do it in two weeks. India runs longer and louder: bigger desert (Thar), older medinas (Old Delhi, Lucknow, Hyderabad), denser palace architecture, and a sub-tropical south the Sahara doesn't have.",
  facts: {
    best_months:
      "Morocco: March to May, September to November (avoiding Sahara heat and high-Atlas snow). India: October to March across most of the country; the Rann of Kutch (the Indian Sahara analogue) is November to February only.",
    visa_for_indians:
      "Indians need a visa for Morocco (apply at the embassy; 30-day single entry). Moroccans visiting India need a tourist visa (e-visa available, 30-90 days).",
    daily_cost_usd:
      "Morocco: $30–80 a day for mid-range. India: $20–60 a day for the same band. India's lower budget tier holds more comfortably; the upper tier in both countries is similar.",
    language_overlap:
      "Morocco: Arabic and French; English in tourist hubs only. India: Hindi or English will reach you in every state — English is the lingua franca for travel logistics. India is markedly easier on the language axis.",
    safety_read:
      "Morocco's medinas have a reputation for aggressive sales pressure and the occasional scam (false guides, carpet-shop pressure). India's tourist-trap pressure is real but less intense — most touts back off when refused. Solo female safety reads roughly comparable in well-trafficked zones; remote-area risk is higher in India.",
    cuisine_signature:
      "Morocco's signature is the tagine — slow-cooked stew over couscous — plus the mint-tea ritual. India's signature is the regional masala kitchen — every state with its own tradition (Awadhi, Mughlai, Hyderabadi, Goan Catholic, Kerala Malayali, Bengali). India's culinary range is much broader; Morocco's is more concentrated.",
  },
  india_more: [
    {
      topic: "Architectural depth",
      detail:
        "Morocco's medinas (Marrakesh, Fez, Meknes) carry 4-5 centuries of Islamic-North-African architecture. India's Mughal architecture (Taj, Red Fort, Humayun's Tomb, Fatehpur Sikri) plus Hindu temple architecture (Khajuraho, Hampi, Brihadeeswarar) plus Indo-Saracenic colonial — the architectural depth is roughly 4x.",
    },
    {
      topic: "Mountain country",
      detail:
        "Morocco's High Atlas tops out at Toubkal (4,167 m). India's Himalayan motorable roads exceed 5,000 m (Khardung La, Umlingla). The mountain experience is in a different category.",
    },
    {
      topic: "Wildlife",
      detail:
        "Morocco has limited charismatic wildlife — the Barbary macaque in the Atlas, some birding. India runs five tiger reserves, two-thirds of the world's one-horned rhinos at Kaziranga, snow leopards in Ladakh, Asiatic lions at Gir.",
    },
    {
      topic: "Diversity of climate zones",
      detail:
        "India spans the Himalayas (cold-desert), the Indo-Gangetic plain (hot-summer continental), the Western Ghats (tropical), the Deccan plateau (semi-arid), Kerala (equatorial), and the Andaman tropical archipelago in a single country. Morocco runs from Mediterranean coast to Sahara — a narrower band.",
    },
  ],
  country_more: [
    {
      topic: "Trip compactness",
      detail:
        "Morocco's classic loop (Marrakesh → Atlas → Sahara → Fez → Chefchaouen) covers in 12 days. India's classic Golden Triangle is 7 days, but it's a fraction of the country. Morocco rewards a single trip; India rewards repeat visits.",
    },
    {
      topic: "Sahara experience",
      detail:
        "Morocco's Erg Chebbi (Merzouga) and Erg Chigaga deliver the cinematic dune experience. India's Thar Desert (Jaisalmer) is more vegetated and the dunes are smaller. For a true \"sea of sand\" reading, Morocco wins.",
    },
    {
      topic: "Riad architecture",
      detail:
        "Morocco's riad — courtyard houses with central fountains — is a specific architectural form India doesn't reproduce at scale. India's haveli (Rajasthan) is the closest cousin, but the spatial logic is different.",
    },
    {
      topic: "Coastal European feel",
      detail:
        "Casablanca, Essaouira and Tangier have a Mediterranean-Atlantic feel India doesn't have on its coastline. India's coast is sub-tropical — different vibe entirely.",
    },
  ],
  swaps: [
    {
      their: "Sahara Desert (Merzouga, camel night)",
      our: "Thar Desert (Jaisalmer) + Rann of Kutch",
      reason:
        "If the desert + camel + dunes was the Morocco draw, the Thar (Jaisalmer) gives the camel-and-desert overnight experience. The Rann of Kutch (white salt flat, November-February) is geologically singular — Morocco doesn't replicate it.",
    },
    {
      their: "Marrakesh medina + Jemaa el-Fnaa",
      our: "Old Delhi (Chandni Chowk) or Hyderabad's Charminar",
      reason:
        "For the maze-of-lanes, food-stalls-after-sunset, tribal-musicians-at-the-square experience, Old Delhi's Chandni Chowk is the comparison's parallel. Hyderabad's Charminar bazaar belt is the cleaner version.",
    },
    {
      their: "Chefchaouen blue city",
      our: "Jodhpur (the Blue City of Rajasthan)",
      reason:
        "Same colour palette, different culture. Jodhpur's Brahmin-painted blue houses below Mehrangarh fort sit in a literally identical aesthetic register. India also has Pushkar's white-and-pink walls and Bundi's blue if you want variations.",
    },
    {
      their: "Atlas Mountains trekking",
      our: "Himalayan trekking (Kashmir Great Lakes, Sandakphu)",
      reason:
        "If High-Atlas trekking was the Morocco appeal, India's Himalayan treks operate at higher altitudes and longer durations. Kashmir Great Lakes (5 days, ~3,500-4,200 m) and Sandakphu (5 days, Singalila ridge) are the well-supported equivalents.",
    },
    {
      their: "Fez tannery + medina crafts",
      our: "Bhuj (Kutch craft villages) or Pochampally (Telangana ikat)",
      reason:
        "If watching live craftspeople at work was Morocco's pull, India's Kutch (block-printing, embroidery, lacquer-work) and Pochampally (ikat weaving) deliver the same artisan-at-work experience without the tourist tannery markup.",
    },
  ],
  expectations: [
    "Bigger scale. Morocco runs about 446,000 km²; India is 3.3 million. Trip planning needs to absorb the scale — domestic flights are often non-negotiable for an India trip that covers more than one region.",
    "More diversity, less unifying culture. Morocco's national identity is Arab-Berber Muslim across the country; India holds 22 official languages and four major religions in active practice. The cultural register changes every 200 km.",
    "Spice in food, not heat in food. \"Spicy\" in Morocco means herbal, not chilli-heavy. India's southern food (Andhra, Tamil Nadu, Kerala) and Punjabi food can run genuinely hot — clarify spice level when ordering.",
    "Different photo etiquette. In Morocco, asking before photographing locals is standard. In India, urban people often agree freely; tribal communities often don't. Pay attention to local cues.",
    "Religious sites have stricter dress codes. Morocco's mosques are mostly closed to non-Muslims (Hassan II in Casablanca is the exception). India's temples and gurdwaras welcome all visitors but expect modest dress, head-cover at gurdwaras, and removal of shoes at most religious sites.",
  ],
  verdict:
    "Morocco is the right entry-level North African trip — compact, photogenic, manageable in two weeks. India is the deeper-water trip — more rewarding for travelers who liked Morocco enough to want a country that runs at 7x the scale and won't fully fit in any single visit. If Morocco felt like a complete country, India will feel like a continent.",
};

const PERU: CountryProfile = {
  slug: "peru",
  name: "Peru",
  flag: "🇵🇪",
  region: "South America",
  meta_description:
    "Peru vs India — Andes vs Himalayas, Inca vs Mughal, Lima food vs Indian regional kitchens. The honest comparison.",
  overline: "Peru to India",
  lede: "Peru runs three distinct ecosystems in one country — coastal desert, Andean highlands, Amazon basin — and is most often compressed into the Cusco-Machu Picchu spine. India holds the comparison: cold-desert (Ladakh), Himalayan ridges (Sikkim, Uttarakhand, Himachal), tropical south (Kerala), and the world's largest mangrove (Sundarbans), all in one country.",
  facts: {
    best_months:
      "Peru: May to October is the dry-season high-Andes window. India: October to March across most of the country; April-June for Ladakh and the trans-Himalaya (Peru's high-altitude analogue).",
    visa_for_indians:
      "Indians need a visa for Peru (currently $30 for tourist visa, 30-90 days). Peruvians arriving in India need a tourist visa (e-visa available).",
    daily_cost_usd:
      "Peru: $40–80 a day for mid-range. India: $20–60 for the same band. India is consistently the cheaper of the two; Peru's tourist economy around Cusco-Machu Picchu pulls the average up sharply.",
    language_overlap:
      "Peru: Spanish (and Quechua in the Andes). English limited outside major hotels. India: Hindi or English will reach you nearly everywhere — English is significantly easier than Spanish for non-Spanish-speakers.",
    safety_read:
      "Both rate well on the violent-crime axis but have specific watch-zones. Peru: petty theft on Lima public transport, altitude-related health risk in Cusco. India: petty theft and scams in tourist-heavy Old Delhi/Agra; female-safety reads on a wider variance — some destinations are 5/5, others 2/5. Both demand street smarts.",
    cuisine_signature:
      "Peru's signature is ceviche, lomo saltado, and the high-altitude-grain kitchen (quinoa, kiwicha, potato variety). Pisco is the national drink. India's signature is the regional masala kitchen — 25+ distinct regional traditions, none of which Peru's smaller geography can match for variety.",
  },
  india_more: [
    {
      topic: "Mountain altitude",
      detail:
        "Peru's Andes peak in the country at Huascarán (6,768 m); the highest motorable point at Pastoruri Glacier (~5,000 m). India's Khardung La and Umlingla exceed 5,000 m by motorable road; trekking peaks include Stok Kangri (6,153 m), Friendship Peak, and many 7,000 m+ expedition peaks in Ladakh and Sikkim.",
    },
    {
      topic: "Religious diversity",
      detail:
        "Peru is predominantly Catholic. India runs Hindu, Muslim, Sikh, Buddhist, Christian, Jain and Parsi practice in active layered presence. The religious-culture variety is genuinely unmatched.",
    },
    {
      topic: "Architectural variety",
      detail:
        "Peru's architecture spans Inca stone-work and Spanish colonial. India spans Indus Valley, Vedic, Mughal Islamic, Dravidian Hindu, Indo-Saracenic colonial, modernist (Le Corbusier's Chandigarh) — six layered traditions, all visitable in one country.",
    },
    {
      topic: "Wildlife at scale",
      detail:
        "India runs the world's largest tiger population (~3,500), two-thirds of the world's one-horned rhinos at Kaziranga, Asiatic lions at Gir, snow leopards in Ladakh. Peru's Amazon is rich but the safari-grade large-mammal sightings are denser in India's tiger reserves.",
    },
  ],
  country_more: [
    {
      topic: "Single-icon focus",
      detail:
        "Machu Picchu is a singular global icon Peru leverages for the entire trip. India has no single equivalent — the Taj Mahal comes closest, but it's part of a broader heritage portfolio rather than the sole anchor of an Indian trip.",
    },
    {
      topic: "Coca leaf and altitude protocols",
      detail:
        "Peru's altitude-adjustment culture (coca leaf tea, gradual ascent) is more accessible to first-time high-altitude travelers. India's altitude protocols exist (Diamox, slow ascent in Leh) but the cultural integration is lighter.",
    },
    {
      topic: "Amazon access",
      detail:
        "Peru's Amazon is significantly more accessible than India's nearest tropical rainforest equivalent (the Western Ghats or the Northeast). For dense-jungle-with-remote-tribal-context travel, Peru is the comparison's clear winner.",
    },
    {
      topic: "Lima as a culinary hub",
      detail:
        "Lima holds 3 of the World's 50 Best Restaurants. India's culinary scene is broader but younger; the Lima-equivalent fine-dining scene is concentrated in Mumbai, Delhi, Bangalore and is still establishing itself globally.",
    },
  ],
  swaps: [
    {
      their: "Inca Trail to Machu Picchu",
      our: "Markha Valley trek (Ladakh) or Hampta Pass",
      reason:
        "If the multi-day high-altitude historical trek was Peru's draw, India's Markha Valley (4-7 days, 4,500 m) covers Buddhist monasteries en route — the parallel mountain-culture experience. Hampta Pass (4 days, 4,300 m) is the gentler alternative.",
    },
    {
      their: "Sacred Valley + Cusco",
      our: "Spiti Valley + Tabo, Kaza",
      reason:
        "Cold-desert valleys with monasteries above 3,000 m, Buddhist culture, and time-lapse millennial-old human settlement — Spiti's Tabo (1,000+ years) and Kaza sit in the same register as Cusco's Sacred Valley monasteries.",
    },
    {
      their: "Lima coastal plate (ceviche, pisco)",
      our: "Mangalore + Goa fish-and-rice belt",
      reason:
        "If Peru's coastal seafood culture was the appeal, the Konkan-Karnataka coast (Mangalorean Catholic kitchen, Goan fish curry, Tarkarli's seafood) delivers the closest parallel. Different fish, similar coastal-fishing-village rhythm.",
    },
    {
      their: "Lake Titicaca floating islands (Uros)",
      our: "Loktak Lake floating phumdis (Manipur)",
      reason:
        "Loktak Lake (Manipur) holds the world's only floating national park (Keibul Lamjao) on phumdis — floating biomass islands that the Meitei community has used for fishing-village life for centuries. The Uros parallel is real, with completely different culture.",
    },
    {
      their: "Amazon basin lodges",
      our: "Kaziranga + Northeast Ghats",
      reason:
        "For the dense-jungle-with-wildlife-and-tribal-context experience, Kaziranga (Assam) holds rhinos, tigers and Asian elephants in the same 800 km² park; the Northeast tribal heartland (Mon, Khonoma, Ziro) carries the cultural depth Peru's Amazon Indigenous communities offer.",
    },
  ],
  expectations: [
    "Greater density. Peru has 32 million people in 1.28 million km²; India has 1.4 billion in 3.3 million km². The crowd reading is fundamentally different — even India's quieter destinations carry more people than Peru's busy zones.",
    "Religious presence in everyday space. Peru's Catholic culture is mostly visible in churches and festivals; India's religious practice is in the street — temple bells at dawn, daily aartis, prayer calls five times a day.",
    "Faster food prep, slower trip pace. Indian street food turns over within minutes; long-distance travel is slower per kilometre due to road traffic and the country's scale.",
    "Tipping is structurally different. Peru's restaurant tipping is 5-10%. India's is 5-10% in metros, optional outside. Bargaining is expected in markets, fixed-price in stores — same pattern, but Indian sellers expect harder bargaining than Peruvian ones.",
    "Less English at high altitude. Cusco has solid tourist English; Ladakh has tourist English in Leh and almost none in the villages. Plan for Hindi or guide-supported travel above 3,500 m in India.",
  ],
  verdict:
    "Peru is the entry-level Andean trip — compact, single-icon-anchored, manageable. India is what you do when Peru taught you that you like high-altitude history more than you expected. The Indian Himalayas hold what the Peruvian Andes don't — older monasteries, deeper religious-cultural overlay, and a longer trekking calendar across two seasons. Peru first, India second is a defensible order; doing them in the reverse order can make Peru feel small.",
};

const EGYPT: CountryProfile = {
  slug: "egypt",
  name: "Egypt",
  flag: "🇪🇬",
  region: "North Africa",
  meta_description:
    "Egypt vs India — pyramids vs Mughal monuments, Nile cruise vs Kerala backwaters. The honest decision-grade comparison.",
  overline: "Egypt to India",
  lede: "Egypt runs along the Nile — Cairo, Luxor, Aswan — and the entire trip can be done as a 10-day cruise. India runs across twelve regional cultures and rewards a year of return trips. The decision is between a single concentrated archaeological trip and a country that won't fully fit in any one visit.",
  facts: {
    best_months:
      "Egypt: October to April (mild Nile-valley temperatures). India: October to March across most of the country; the same window. Both countries lose most outdoor visiting hours to summer heat.",
    visa_for_indians:
      "Indians need a visa for Egypt (e-visa available, 30-day tourist). Egyptians visiting India need a tourist visa (e-visa available, 30-90 days).",
    daily_cost_usd:
      "Egypt: $40-80 a day for mid-range (cruise pricing skews higher). India: $20-60 for the same band. India holds the lower budget tier more comfortably; Egypt's archaeological-zone pricing has a tourist premium.",
    language_overlap:
      "Egypt: Arabic, with English in Cairo and tourist hubs. India: Hindi or English will reach you in every state. India is structurally easier on the language axis.",
    safety_read:
      "Both rate well on the violent-crime axis. Egypt has aggressive sales pressure at archaeological sites and the occasional scam (false guides, baksheesh demands). India's tourist-trap pressure is real but less constant. Solo female safety reads roughly comparable in tourist zones.",
    cuisine_signature:
      "Egypt's signature is foul (fava-bean breakfast), koshary (the lentil-rice-pasta street dish), and grilled-meat kebabs. India's signature is regional masala traditions across 25+ distinct kitchens. India's culinary range is significantly broader.",
  },
  india_more: [
    {
      topic: "Architectural variety",
      detail:
        "Egypt's architectural depth runs Pharaonic + Coptic + Islamic + Ottoman across one country. India's runs Indus Valley + Vedic + Mughal + Dravidian + Indo-Saracenic across multiple regions — six distinct schools. The depth is unmatched.",
    },
    {
      topic: "Mountain country",
      detail:
        "Egypt's highest peak is Mount Catherine (2,629 m) in the Sinai. India's Himalayan motorable roads exceed 5,000 m. The mountain experience is in a different category entirely.",
    },
    {
      topic: "Wildlife and natural variety",
      detail:
        "Egypt's wildlife is concentrated in the Red Sea coral and the small Sinai protected areas. India runs five tiger reserves, Asiatic lions at Gir, snow leopards in Ladakh, Asian elephants and one-horned rhinos. Wildlife is not a comparable axis.",
    },
    {
      topic: "Living cultural traditions",
      detail:
        "Egypt's Pharaonic culture is archaeological — admired but not living. India's temple architecture, Mughal courts, classical music, Sanskrit texts and kathak dance forms are still in active practice. India offers \"living antiquity\" Egypt has lost.",
    },
  ],
  country_more: [
    {
      topic: "Singular monument density",
      detail:
        "Egypt's Giza Plateau, Karnak, Luxor Temple, Valley of the Kings, Abu Simbel — five world-class archaeological sites within driving distance of each other. India's UNESCO inscriptions are spread across the country; you can't visit them as densely.",
    },
    {
      topic: "Nile cruise as an institution",
      detail:
        "Egypt's Luxor-to-Aswan Nile cruise is a coherent 4-7 day experience. India has no single river-cruise equivalent of comparable scale; the Brahmaputra cruise (Assam) and Kerala backwaters are smaller and less archaeologically anchored.",
    },
    {
      topic: "Red Sea reefs",
      detail:
        "Egypt's Red Sea coast (Sharm el-Sheikh, Hurghada, Dahab) holds among the world's best snorkeling and diving infrastructure. India's reef diving (Andaman, Lakshadweep) is comparable in marine-life density but harder to reach.",
    },
    {
      topic: "Fewer tourist regions",
      detail:
        "Egypt's tourist core is Cairo + Luxor + Aswan + Red Sea — four well-defined zones. India has 30+ tourist regions, each with its own logistics. The decision-load is much lower in Egypt.",
    },
  ],
  swaps: [
    {
      their: "Pyramids of Giza + Sphinx",
      our: "Brihadeeswarar (Thanjavur) + Khajuraho temple complex",
      reason:
        "If monumental ancient stonework was Egypt's draw, India's Great Living Chola Temples (UNESCO) deliver the same scale — the Brihadeeswarar's vimana is 66 m, comparable to the Pyramids' verticality. Khajuraho's Chandela temples are equally singular in sculptural depth.",
    },
    {
      their: "Karnak + Luxor temples",
      our: "Hampi (Vijayanagara ruins) + Madurai Meenakshi",
      reason:
        "For the abandoned-imperial-city read, Hampi's 26 km² of granite ruins (UNESCO) match Karnak's scale. For the still-active sacred complex with fourteen gopurams, Madurai's Meenakshi temple is the parallel — Karnak active, with priests still making offerings.",
    },
    {
      their: "Valley of the Kings",
      our: "Ajanta + Ellora rock-cut caves (UNESCO)",
      reason:
        "If carved-into-the-rock-face religious art was Egypt's pull, Ajanta's 30 Buddhist rock-cut caves and Ellora's 34 mixed-faith caves (Buddhist + Hindu + Jain) deliver the same chiseled-mountain experience with painted frescoes and free-standing temple-sized sculpture.",
    },
    {
      their: "Nile cruise (Luxor-Aswan)",
      our: "Kerala backwater houseboat + Brahmaputra cruise",
      reason:
        "For the slow-river-with-cabin experience, Kerala's Alleppey-to-Kollam houseboat run delivers the smaller-scale parallel; Assam's Brahmaputra cruise (4-7 days) covers the longer-river-with-archaeology read (Sivasagar's Ahom-dynasty palaces, Majuli's Vaishnavite monasteries).",
    },
    {
      their: "Khan el-Khalili (Cairo bazaar)",
      our: "Old Delhi (Chandni Chowk) + Hyderabad's Charminar bazaar",
      reason:
        "Same bazaar logic, different scale. Chandni Chowk's silver-and-spice lanes around Jama Masjid sit in the same register; Hyderabad's Laad Bazaar (around Charminar) is the closer pearl-and-bangle parallel.",
    },
  ],
  expectations: [
    "Higher density of people. Egypt is 110 million in a country mostly inhabitable along the Nile. India is 1.4 billion across 3.3 million km². Even India's quieter destinations carry more crowd than Egypt's quieter sites.",
    "More visible religious practice. Egypt's Islamic culture is part of public life but compartmentalised. India's religious practice spills into the street — daily aartis, temple bells at dawn, the call to prayer in Muslim neighbourhoods, Sikh gurdwara langar.",
    "Less archaeological coherence, more cultural depth. Egypt rewards you for the Pharaonic story you came for. India rewards you for the cultural variety you didn't expect.",
    "Cooler-tolerant transit. Egypt's domestic flights and rail are reasonably efficient. India's rail network is the world's fourth-largest; flying is the better choice for most regional connections, but the experience of a long-distance Indian train (Mumbai-Goa, Delhi-Varanasi) is part of the country.",
    "Looser haggling expectations. Egypt's tourist-zone bargaining is harder; sellers often start at 5-10x the right price. India's market bargaining starts closer to 1.5-3x; the right price emerges faster.",
  ],
  verdict:
    "Egypt is the world's deepest concentrated archaeological trip — and you can complete the headline circuit in 10-14 days. India is the wider trip — same archaeological depth, but spread across regions, and complemented by 25+ regional kitchens, ten major religions in active practice, and the world's longest unbroken cultural lineage. If you came to Egypt for the Pharaonic story and want \"that depth across more domains,\" India is the next-step country.",
};

const THAILAND: CountryProfile = {
  slug: "thailand",
  name: "Thailand",
  flag: "🇹🇭",
  region: "Southeast Asia",
  meta_description:
    "Thailand vs India for travel — beaches, food, temples and cost compared. The honest read on which gives you what kind of trip.",
  overline: "Thailand to India",
  lede: "Thailand runs a tight tourist economy — Bangkok, Chiang Mai, Krabi, Phuket, Koh Samui — and even first-timers manage the country in 10-12 days. India runs at 7x the scale and twelve regional cultures, none of which fully fit in any single visit.",
  facts: {
    best_months:
      "Thailand: November to February (cool dry season). India: October to March across most of the country. Same primary window for both.",
    visa_for_indians:
      "Indians enjoy visa-free entry to Thailand for 60 days (extended in November 2024). Thais need an e-tourist visa for India (~$25, 30-90 days).",
    daily_cost_usd:
      "Thailand: $30–70 a day for mid-range. India: $20–60 for the same band. India is cheaper on stays under $30; Thailand pulls ahead on the upper-mid tier with more polished resorts.",
    language_overlap:
      "Thailand: Thai-only outside major tourist hubs; English in Bangkok and the islands. India: Hindi or English will reach you in every state. India is markedly easier on the language axis outside the tourist core.",
    safety_read:
      "Both rate well on petty-crime axis. Thailand has more aggressive scams in tourist zones (jet-ski deposit, gem shops); India has more sales pressure (auto-rickshaw, touts) but lower violent crime. Solo female safety reads roughly comparable in well-trafficked areas.",
    cuisine_signature:
      "Thailand's signature is the four-balance plate — sweet, sour, salty, spicy — across one cohesive national tradition. India's signature is the regional masala kitchen with 25+ distinct regional traditions Thailand's smaller geography can't match.",
  },
  india_more: [
    {
      topic: "Cultural depth",
      detail:
        "India holds 42 UNESCO inscriptions to Thailand's 8. The country runs four major civilisations (Indus, Vedic, Mughal, British colonial) layered visibly in single cities — Delhi alone holds seven historical settlements.",
    },
    {
      topic: "Mountain access",
      detail:
        "India's Himalayas reach motorable altitudes above 5,000 m (Khardung La, Umlingla); trekking peaks above 6,000 m. Thailand's highest is Doi Inthanon at 2,565 m. The mountain experience sits in a different category entirely.",
    },
    {
      topic: "Religious diversity",
      detail:
        "Thailand is predominantly Theravada Buddhist. India is the homeland of Hinduism, Sikhism, Jainism and Buddhism, with 200+ million Muslims and significant Christian and Parsi communities — all in active layered practice.",
    },
    {
      topic: "Wildlife scale",
      detail:
        "India runs the world's largest tiger population (~3,500), two-thirds of the world's one-horned rhinos at Kaziranga, snow leopards in Ladakh, Asiatic lions at Gir. Thailand's charismatic-mammal portfolio is meaningfully smaller.",
    },
  ],
  country_more: [
    {
      topic: "Trip simplicity",
      detail:
        "Thailand's geography compresses cleanly into a 10-14 day itinerary covering culture, beaches, food. India is twelve trips inside one country, and choosing badly leaves you frustrated. First-timers find Thailand vastly easier to plan.",
    },
    {
      topic: "Beach polish",
      detail:
        "Thailand's beach infrastructure (Krabi, Phuket, Koh Phi Phi, Koh Samui) is more developed and consistent than India's. India's better beaches (Andaman, Lakshadweep, Konkan) are harder to reach and require domestic flights or ferries.",
    },
    {
      topic: "Massage and wellness",
      detail:
        "Thai massage culture is universal and cheap (~$10/hour, every street). India's Kerala Ayurveda is a different category — longer protocols, more traditional, vaidya-led — but the daily-massage convenience is uniquely Thai.",
    },
    {
      topic: "Spice-level signposting",
      detail:
        "Thai food's heat is ordered on a 0-10 scale and respected. Indian food's regional spice variation is harder to predict — Andhra and Punjabi can run genuinely hot without warning. Clarify spice level when ordering, both countries.",
    },
  ],
  swaps: [
    {
      their: "Bangkok temples (Wat Pho, Wat Arun)",
      our: "Old Delhi (Jama Masjid, Red Fort) + Madurai's Meenakshi temple",
      reason:
        "Same temple-grandeur draw, different lineage. Old Delhi's Mughal Islamic architecture and Madurai's Dravidian gopurams (14 of them) sit in the same emotional register as Thailand's grand stupas.",
    },
    {
      their: "Chiang Mai (laidback north + temples)",
      our: "Pondicherry French Quarter or McLeod Ganj",
      reason:
        "If Chiang Mai's slow-pace + temple-density read was the draw, Pondicherry delivers the small-town colonial-laidback parallel. McLeod Ganj's Tibetan Buddhist monasteries hit the temple-dense northern-town note.",
    },
    {
      their: "Krabi + Phi Phi limestone karsts",
      our: "Andaman + Lakshadweep coral atolls",
      reason:
        "If Krabi's vertical karsts emerging from blue water was the geological appeal, India's parallel is the marine-life-dense coral lagoons. Different geology, similar 'this can't be real' reaction at the shoreline.",
    },
    {
      their: "Pai mountain town",
      our: "Tirthan Valley (Himachal) or Munsiyari (Uttarakhand)",
      reason:
        "If Pai's mountain-village + cafe-culture-meets-river was the appeal, Tirthan and Munsiyari deliver the parallel — quiet Himalayan villages with home-cooked food, river walks, no Mall Road traffic.",
    },
    {
      their: "Bangkok street food (Yaowarat Chinatown)",
      our: "Old Delhi (Chandni Chowk) or Mumbai's Mohammed Ali Road",
      reason:
        "Same chaotic street-food density, different cuisine. Old Delhi's lanes around Jama Masjid and Mumbai's Mohammed Ali Road during Ramzan deliver the equivalent eat-standing-up street experience.",
    },
  ],
  expectations: [
    "Less polished tourist infrastructure outside Tier-1 cities. Thai mid-range hotels run more consistent than India's Tier-2 city options. Plan accordingly when booking outside the major tourist circuits.",
    "More direct contact with strangers. Indians ask travelers personal questions (where are you from, are you married, salary, family); Thai etiquette is more reserved.",
    "Heat extremes. Thailand tops at ~35°C; India's plains reach 45°C+ April-June. The mountain alternatives (Spiti, Ladakh, Kashmir) become non-negotiable in the hot months.",
    "Religious presence in everyday life is louder in India than Thailand — temple bells at dawn, the call to prayer five times daily, daily aartis in residential neighbourhoods.",
    "Slower transit per kilometre. India's domestic flights work, but ground travel is slower than Thailand's due to traffic and the country's scale. Plan the trip around fewer destinations.",
  ],
  verdict:
    "Thailand is the polished entry-level Asian trip — cheap, tourist-friendly, beach-heavy, two weeks fits comfortably. India is what you do when Thailand taught you that you like Asia but want the country at 7x the scale and 4x the cultural depth. If Thailand was a coherent two-week itinerary, India is six different countries inside one — pick a region first, not the whole map.",
};

const SRI_LANKA: CountryProfile = {
  slug: "sri-lanka",
  name: "Sri Lanka",
  flag: "🇱🇰",
  region: "South Asia",
  meta_description:
    "Sri Lanka vs India — cultural triangle, tea estates, leopards and beaches compared. Honest read for travelers choosing between.",
  overline: "Sri Lanka to India",
  lede: "Sri Lanka runs a 65,000 km² loop — Colombo, the cultural triangle, the hill country, the southern beaches — and most travelers do it in 10-14 days. India runs at 50x the area with twelve regional cultures, but the Sri Lankan trip slot maps neatly onto Tamil Nadu plus Kerala or onto a Hampi-Mysore-Kerala arc.",
  facts: {
    best_months:
      "Sri Lanka: December to March for the southwest coast and hill country; May to September for the east coast (split-monsoon island). India: October to March across most of the country; April-September for the Western-Ghats monsoon zone.",
    visa_for_indians:
      "Indians enjoy visa-free entry to Sri Lanka for 30 days (since 2024). Sri Lankans need an e-tourist visa for India (~$25, 30-90 days).",
    daily_cost_usd:
      "Sri Lanka: $25–55 a day for mid-range. India: $20–60 for the same band. Sri Lanka often runs cheaper on stays + food; India has a wider price range from very-low to luxury.",
    language_overlap:
      "Sri Lanka: Sinhala + Tamil + English (English widely spoken in tourist areas). India: Hindi + 22 other official languages + English. Both countries are language-friendly for English-speaking travelers; northern Sri Lanka is Tamil-speaking with direct overlap to Tamil Nadu.",
    safety_read:
      "Both rate well on the violent-crime axis. Sri Lanka has lower tourist hassle than India — fewer touts, less sales pressure. Solo female safety reads marginally easier in Sri Lanka. Both demand standard travel awareness.",
    cuisine_signature:
      "Sri Lanka's signature is rice-and-curry (multiple curries on one plate, kottu roti, hoppers, string hoppers) with strong Tamil influence in the north and Sinhalese spice in the south. India's southern states (Tamil Nadu, Kerala) overlap directly; the rest of India runs 25+ distinct regional kitchens Sri Lanka doesn't.",
  },
  india_more: [
    {
      topic: "Geographical scale and variety",
      detail:
        "Sri Lanka is similar in area to a single Indian state (Karnataka). India offers Himalaya, Thar, Konkan, Sundarbans, Andaman, the Deccan plateau and Kerala backwaters in one country — six distinct ecological zones.",
    },
    {
      topic: "Architectural diversity",
      detail:
        "Sri Lanka has Buddhist + Tamil Hindu + Dutch and Portuguese colonial architecture. India runs six layered traditions — Indus, Vedic, Mughal Islamic, Dravidian Hindu, Indo-Saracenic colonial, and modernist (Le Corbusier's Chandigarh).",
    },
    {
      topic: "Mountain altitudes",
      detail:
        "Sri Lanka's highest peak (Pidurutalagala) is 2,524 m — accessible but not high-altitude. India runs to motorable roads above 5,000 m (Khardung La, Umlingla) and trekking peaks above 6,000 m.",
    },
    {
      topic: "Religious and cultural depth",
      detail:
        "Sri Lanka is mostly Buddhist + Hindu with Christian and Muslim minorities. India is the homeland of Hinduism, Sikhism, Jainism, Buddhism with 200+ million Muslims and significant Christian and Parsi communities — all in active layered practice.",
    },
  ],
  country_more: [
    {
      topic: "Compactness",
      detail:
        "Sri Lanka's classic 12-14 day loop covers culture, beaches, hills and wildlife. India's equivalent loop covers one region. The full Indian trip slot equivalent runs 5-6 weeks; Sri Lanka delivers the 'I saw the country' satisfaction in two.",
    },
    {
      topic: "Tourist polish",
      detail:
        "Sri Lankan tourism is more curated. Trains run on schedule with character (the Kandy-Ella scenic line), tuk-tuks have meters in tourist hubs, and English-fluent guides are widely available. India's experience is more variable.",
    },
    {
      topic: "Tea hill country",
      detail:
        "Sri Lanka's Nuwara Eliya, Ella and Haputale tea estates rival Munnar in beauty with better mid-range stay infrastructure. The colonial-bungalow-as-hotel pattern runs deeper in Sri Lanka.",
    },
    {
      topic: "Wildlife density per km²",
      detail:
        "Yala holds among the world's highest leopard densities — concentrated sightings within a small area. India's tigers are denser in absolute number but lower in per-km² encounter probability; trips need more park-time for reliable sightings.",
    },
  ],
  swaps: [
    {
      their: "Anuradhapura + Polonnaruwa cultural triangle",
      our: "Hampi (Vijayanagara, UNESCO) + Madurai temple belt",
      reason:
        "If the abandoned-imperial-city plus living-temple combination was Sri Lanka's draw, Hampi delivers the granite-ruin parallel and Madurai's Meenakshi delivers the still-active temple complex with 14 gopurams.",
    },
    {
      their: "Sigiriya rock fortress",
      our: "Mehrangarh (Jodhpur) + Ranthambore fort",
      reason:
        "Sigiriya's vertical fortress on a granite plug has no exact Indian parallel, but Mehrangarh's cliff-top palace and Ranthambore's hilltop fort sit in the same monumental-stone-on-rock register.",
    },
    {
      their: "Yala leopard safari",
      our: "Bandhavgarh tiger safari + Periyar's elephant herds",
      reason:
        "Yala's leopards are denser per km² than anywhere; the comparison's parallel is India's tigers at Bandhavgarh (highest tiger density in India) plus Periyar's wild Asian elephants — different big cats, similar safari rhythm.",
    },
    {
      their: "Nuwara Eliya tea estates",
      our: "Munnar + Wayanad tea belt (Kerala) or Darjeeling-Kalimpong",
      reason:
        "Same colonial-tea-estate aesthetic. Munnar (1,600 m) and Wayanad sit in the same Western Ghats register as Nuwara Eliya. Darjeeling adds the Himalayan view that Sri Lanka can't match.",
    },
    {
      their: "Galle Dutch fort",
      our: "Pondicherry French Quarter + Old Goa Portuguese spine",
      reason:
        "European colonial coastal old-towns are India's specialty too. Pondicherry's mustard-yellow streets and Old Goa's basilica-and-church belt deliver the parallel — different colonial powers, same atmosphere.",
    },
  ],
  expectations: [
    "India's traffic and density runs higher than Sri Lanka's. Even Colombo feels manageable next to Mumbai or Bangalore; the per-day pace of Indian travel is meaningfully slower per kilometre.",
    "Indian street food has a higher hot-spice baseline. Sri Lankan curries are spicy in different ways (cinnamon, curry leaves, coconut); Indian Andhra and Punjabi food can run genuinely hot. Clarify spice level when ordering.",
    "India offers wider language span. Every state can feel different culturally — the Hindi-Tamil-Bengali-Marathi cultural distance is real, not symbolic.",
    "Indian inter-city travel is slower per km due to the country's scale. Sri Lanka's compactness allows day-trips between cultural anchors that India doesn't replicate.",
    "Trains in India run on a vastly larger network but less reliably than Sri Lanka's tourist-train lines. Long-distance rail in India is a 12-30 hour experience; plan around overnight sleeper travel.",
  ],
  verdict:
    "Sri Lanka is the right entry to South Asia for first-timers — easier, smaller, more polished. India is the deeper trip for travelers who liked Sri Lanka and want the same flavours at 50x the scale and 4x the cultural variety. The southern Indian state of Tamil Nadu carries the closest cultural overlap with northern Sri Lanka — many travelers stitch both into one trip.",
};

const NEPAL: CountryProfile = {
  slug: "nepal",
  name: "Nepal",
  flag: "🇳🇵",
  region: "South Asia (Himalayas)",
  meta_description:
    "Nepal vs India — Himalayas, Buddhist heritage, mountain trekking and culture compared. Honest decision-grade read.",
  overline: "Nepal to India",
  lede: "Nepal runs a 147,000 km² country between Tibet and India — Kathmandu Valley, Pokhara, Chitwan, the Everest and Annapurna trekking belts. India shares the Himalayan range from a longer arc — Ladakh to Arunachal — but Nepal is dedicated mountain country in a way only Indian Ladakh and Sikkim approach.",
  facts: {
    best_months:
      "Nepal: October-November is peak (post-monsoon clarity for the high Himalaya); March-May is the second window before pre-monsoon haze. India: same windows for the Himalayan belt; April-June for higher Ladakh; October-March for the rest of the country.",
    visa_for_indians:
      "Indians enjoy visa-free entry to Nepal under the 1950 Treaty of Peace and Friendship — passport not strictly required; voter ID or Aadhaar suffices. Nepalis enjoy the same visa-free entry to India.",
    daily_cost_usd:
      "Nepal: $20–50 a day for mid-range. India: $20–60 for the same band. Nepal is generally cheaper, especially on trekking-related expenses (teahouse meals, porter wages).",
    language_overlap:
      "Nepal: Nepali + English (English common in tourist hubs). India: Hindi + English + 22 official languages. Hindi and Nepali share strong vocabulary overlap; Indian travelers find Nepal extremely easy to navigate linguistically.",
    safety_read:
      "Both rate well on violent-crime axis. Nepal has less aggressive sales pressure than India; petty theft exists in tourist hubs (Thamel) and on the trekking circuits. Solo female safety reads roughly comparable; remote-area risk runs higher in both countries' high-altitude zones.",
    cuisine_signature:
      "Nepal's signature is dal-bhat (lentils + rice + vegetable, twice daily for trekkers), momos (Tibetan dumplings), and thukpa noodle soup. North Indian dal-chawal lineage runs almost identical; momos are now ubiquitous in Indian hill stations. Nepali food is essentially a subset of north-Indian + Tibetan kitchens.",
  },
  india_more: [
    {
      topic: "Architectural variety",
      detail:
        "Nepal has Hindu + Buddhist temples + Newari woodcraft (Patan and Bhaktapur Durbar Squares). India runs broader Hindu temple architecture (Dravidian, Nagara), Mughal Islamic, Indo-Saracenic colonial, and modernist (Le Corbusier's Chandigarh).",
    },
    {
      topic: "Beach and coastal access",
      detail:
        "Nepal is landlocked. India offers 7,500 km of coastline — Konkan, Goa, Karnataka, Kerala, Tamil Nadu, the Andaman archipelago. Coastal travel is not an axis Nepal can match.",
    },
    {
      topic: "Wildlife at scale",
      detail:
        "Chitwan National Park holds ~600 one-horned rhinos. India's Kaziranga holds ~2,400 — two-thirds of the world's total. Tigers: India holds 75% of the world's wild tiger population.",
    },
    {
      topic: "Religious and cultural variety",
      detail:
        "Nepal is mostly Hindu + Tibetan Buddhist. India is the homeland of Hinduism, Sikhism, Jainism, Buddhism with 200+ million Muslims, significant Christian and Parsi communities, and the world's longest unbroken cultural lineage.",
    },
  ],
  country_more: [
    {
      topic: "Trekking infrastructure",
      detail:
        "The Everest (Khumbu) and Annapurna circuits are the world's most-developed high-altitude trekking routes. The teahouse network runs end-to-end — you trek with a daypack and find bed-and-meals every 4-6 hours. India's Himalayan trekking infrastructure is patchier and requires more camping-supported travel.",
    },
    {
      topic: "Mountain views from cities",
      detail:
        "Pokhara wakes up to the Annapurna massif a few kilometres away; Kathmandu's Patan square is steps from temple architecture. India's Himalayan cities (Manali, Shimla, Darjeeling) don't deliver this view density at this proximity.",
    },
    {
      topic: "Buddhist heritage origin",
      detail:
        "Lumbini (Buddha's birthplace, UNESCO) is in Nepal — though India holds the bulk of the Buddhist circuit (Bodh Gaya, Sarnath, Kushinagar, Rajgir, Sanchi). For pilgrims completing all four life-events of the Buddha, both countries are non-negotiable.",
    },
    {
      topic: "Adventure-tourism polish",
      detail:
        "Bungee jumping, paragliding (Pokhara), rafting and zip-lining in Nepal run with established operator networks and consistent safety protocols. India's adventure scene is younger and more variable in operator quality.",
    },
  ],
  swaps: [
    {
      their: "Everest Base Camp trek",
      our: "Kashmir Great Lakes (5 days) or Markha Valley (Ladakh, 6-7 days)",
      reason:
        "If multi-day high-altitude trekking with monasteries en route was Nepal's draw, the Markha Valley (4,500 m peak, Buddhist gompas) sits in the same register. Kashmir Great Lakes (3,500-4,200 m) is the gentler equivalent.",
    },
    {
      their: "Annapurna Circuit",
      our: "Spiti loop (Himachal) + Lahaul-Zanskar",
      reason:
        "The Annapurna Circuit's varied biome (sub-tropical to high desert) is matched closest by the Spiti loop — Manali to Kaza to Tabo, climbing from forest to cold-desert. Lahaul-Zanskar adds the high-altitude monastery experience.",
    },
    {
      their: "Pokhara lakes (Phewa)",
      our: "Tso Moriri + Pangong (Ladakh) for high-altitude lakes; Naukuchiatal/Bhimtal (Uttarakhand) for the lake-town vibe",
      reason:
        "If the lake-with-mountain-backdrop was the appeal, Tso Moriri (4,500 m) and Pangong (4,250 m) deliver at higher altitude and saline color. For the Pokhara lake-town feel at lower altitude, Bhimtal and Naukuchiatal in Kumaon work.",
    },
    {
      their: "Kathmandu Durbar Square (Newari woodcraft)",
      our: "Banaras (Varanasi) old city or Khajuraho temple complex",
      reason:
        "If dense old-city religious-architecture-with-living-ritual was the appeal, Varanasi's ghat-and-lane network and Khajuraho's Chandela temple cluster (UNESCO) deliver the parallel.",
    },
    {
      their: "Chitwan rhinos and jungle safari",
      our: "Kaziranga (Assam) for rhinos at 4x density; Kanha or Bandhavgarh for tigers",
      reason:
        "Chitwan's one-horned rhinos number ~600; Kaziranga's number ~2,400. For tigers, Bandhavgarh holds the world's highest tiger density, a tier of wildlife sighting Nepal can't match.",
    },
  ],
  expectations: [
    "India's scale dwarfs Nepal. A complete Nepal trip fits in two weeks; a meaningful India trip needs 3-4 weeks per region. Plan one Indian region at a time.",
    "Indian Himalayan trekking has smaller teahouse networks than Nepal. Multi-day routes often need camping-supported logistics; expect more porter+cook crew rather than walk-in lodges.",
    "Indian cities run louder, more crowded, and more chaotic than Kathmandu's busiest streets. Mumbai, Delhi, Kolkata and Chennai are unlike anything in Nepal.",
    "India's railway network is the world's fourth-largest; Nepal's rail is functionally absent. Long-distance overnight train travel is a uniquely Indian experience.",
    "Inner Line Permits required for some Indian border zones (parts of Ladakh, Sikkim's Nathu La, Arunachal Pradesh). Nepal has no equivalent permit gate.",
  ],
  verdict:
    "Nepal is the world's mountain-trekking capital — Everest, Annapurna, dedicated infrastructure, two-week trips that satisfy. India is the broader country — same Himalayan range plus seven other regional traditions, plus 7,500 km of coastline, plus the Mughal heritage of the Indo-Gangetic plain. If Nepal taught you that you like mountains, the Indian Himalayas continue the experience; if you want everything else India has, Nepal is too narrow.",
};

const INDONESIA: CountryProfile = {
  slug: "indonesia",
  name: "Indonesia",
  flag: "🇮🇩",
  region: "Southeast Asia",
  meta_description:
    "Indonesia vs India — Bali, Java, surf coasts and 17,000 islands compared with India's range. Decision-grade read for travelers.",
  overline: "Indonesia to India",
  lede: "Indonesia is 17,000+ islands across 5,000 km of equator — Bali alone draws more international tourists than all of India combined. India is denser, older, more religiously layered, with the Himalayas the Indonesian archipelago doesn't have. The decision is between archipelago travel and continental travel.",
  facts: {
    best_months:
      "Indonesia: April to October (dry season for Bali, Java, most popular zones). India: October to March across most of the country. Different windows — both work well in their primary seasons; the seasonality lets you do one country in summer and the other in winter.",
    visa_for_indians:
      "Indians need a visa-on-arrival for Indonesia (~$35, 30 days, extendable once). Indonesians need a tourist visa for India (e-visa available, 30-90 days).",
    daily_cost_usd:
      "Indonesia: $30–70 a day for mid-range. India: $20–60 for the same band. India is consistently cheaper on stays under $30; Bali specifically pulls Indonesia's average up.",
    language_overlap:
      "Indonesia: Bahasa Indonesia + English in tourist hubs (concentrated in Bali). India: Hindi + 22 other official languages + English. India's English coverage is broader; Indonesia's English is largely confined to Bali and the major hotels in Java.",
    safety_read:
      "Both rate well on violent-crime axis. Indonesia has aggressive scooter-theft pressure in Bali; India has tout and scam pressure in major tourist cities. Both demand standard awareness. Solo female safety reads roughly comparable in well-trafficked zones.",
    cuisine_signature:
      "Indonesia's signature is nasi goreng (fried rice), satay, rendang (the Padang slow-cooked beef, often listed among the world's best dishes), and the chilli-paste sambal lineage. India's regional masala kitchen carries 25+ distinct traditions — Indonesia's archipelago variety is meaningful but narrower than India's regional spread.",
  },
  india_more: [
    {
      topic: "Architectural diversity",
      detail:
        "Indonesia has Borobudur (UNESCO Buddhist), Prambanan (UNESCO Hindu), Bali's family temple complexes and Dutch colonial. India runs 42 UNESCO inscriptions across six architectural traditions — Indus, Vedic, Mughal Islamic, Dravidian Hindu, Indo-Saracenic colonial and modernist.",
    },
    {
      topic: "Mountain altitude access",
      detail:
        "Indonesia's highest peak (Puncak Jaya, Papua) is 4,884 m but extremely remote and expedition-only. India's Himalayan motorable peaks exceed 5,000 m and are accessible by paved road. Trekking and motoring above 4,500 m is mainstream in India and rare in Indonesia.",
    },
    {
      topic: "Religious depth",
      detail:
        "Indonesia is mostly Muslim (Java, Sumatra) with Hindu Bali (4 million people). India is the homeland of Hinduism, Sikhism, Jainism, Buddhism — with 200+ million Muslims, significant Christian and Parsi communities, all in active layered practice.",
    },
    {
      topic: "Cultural longevity",
      detail:
        "India runs the world's longest unbroken cultural lineage — 5,000+ years of continuous tradition. Indonesia's archipelago cultures are diverse but mostly post-1500, with the Islamic conversion of most of the archipelago dating to the 13th-16th centuries.",
    },
  ],
  country_more: [
    {
      topic: "Beaches and surf",
      detail:
        "Indonesia (Bali, Lombok, the Mentawais, Sumbawa) holds among the world's best surf coast. India's surf scene is small (Karnataka, Tamil Nadu coasts) and the wave quality doesn't compare. For surfing, Indonesia is the unambiguous winner.",
    },
    {
      topic: "Bali specifically",
      detail:
        "Bali's Hindu-island culture is unique globally — daily temple offerings, 20,000+ temples on a 5,800 km² island, the only Hindu-majority province in Muslim-majority Indonesia. The closest Indian parallel is small-state intensity (Goa, Kerala) but Bali's specific culture is its own.",
    },
    {
      topic: "Diving and marine biodiversity",
      detail:
        "Komodo, Raja Ampat (West Papua), and the Bunaken-Lembeh straits in Sulawesi are world-class dive zones. Marine biodiversity in Raja Ampat alone exceeds the entire Caribbean. India's Andaman is comparable in places but smaller in scope.",
    },
    {
      topic: "Unique wildlife",
      detail:
        "Sumatra orangutans, Komodo dragons, Javan rhinos and the Sulawesi macaques run unique ecosystems. India's wildlife is denser overall but doesn't offer these specific species. For megafauna variety beyond the big cat / rhino axis, Indonesia opens different ground.",
    },
  ],
  swaps: [
    {
      their: "Ubud (Bali culture, terraces)",
      our: "Hampi (Karnataka, granite + temples) or Munnar tea estates",
      reason:
        "If Ubud's blend of paddy terraces, dance performances and temple density was the draw, Hampi's UNESCO ruins set in granite landscape deliver the heritage parallel; Munnar's tea-terrace geometry covers the green-engineered-landscape angle.",
    },
    {
      their: "Borobudur (Buddhist stupa)",
      our: "Sanchi Stupa (UNESCO) + Ajanta Buddhist caves",
      reason:
        "Borobudur is the world's largest Buddhist monument; its closest Indian parallel is Sanchi (UNESCO), the oldest continuously-standing stupa from the 3rd century BCE. Ajanta's painted Buddhist caves add the figurative-art counterpart Borobudur's relief panels echo.",
    },
    {
      their: "Mount Bromo sunrise",
      our: "Sandakphu sunrise (Singalila ridge) + Tawang's first-light",
      reason:
        "If predawn-summit-with-clouds-below was the appeal, Sandakphu's view of Kanchenjunga and Everest lined up at sunrise sits in the same emotional register. Tawang and Kupup ridges in Sikkim deliver similar high-Himalayan first-light.",
    },
    {
      their: "Komodo dragons",
      our: "Gir (Asiatic lions) + Kaziranga (one-horned rhinos)",
      reason:
        "For unique-megafauna-only-here-on-earth experiences, India's Gir holds the only wild Asiatic lions (~700 individuals); Kaziranga holds two-thirds of the world's one-horned rhinos. Different species, similar 'this only exists here' rarity.",
    },
    {
      their: "Bali surf coast (Uluwatu, Canggu)",
      our: "Mulki, Kovalam or Manapad (Karnataka, Kerala, Tamil Nadu)",
      reason:
        "India's surf is real but small. Mulki on the Karnataka coast hosts the country's main surf school and a few clean reef breaks; Kovalam (Tamil Nadu, not the Kerala one) and Manapad work for the Indian coast equivalent. Smaller waves, real surf.",
    },
  ],
  expectations: [
    "India's continental scale dwarfs Indonesia's archipelago. A Bali-and-one-other-island trip fits in two weeks; an India trip needs 3-4 weeks per region.",
    "Indian transit is slower per kilometre due to road traffic. Domestic flights work well between metros, but ground travel between regions is meaningfully slower than Indonesia's inter-island flights.",
    "Religious presence runs louder in everyday Indian life than in mainland Indonesia (Java); India's intensity matches Bali's specifically, but at country scale.",
    "Indonesia's beach culture is Western-tourist-friendly (Bali especially). India's beaches outside Goa run more local — fewer beach clubs, more religious and family use of the same coastline.",
    "Bali's specific Hindu culture overlaps directly with India. Visiting Bali after India deepens both — the two-island Bali-Lombok loop pairs neatly as an extension to a south-Indian trip.",
  ],
  verdict:
    "Indonesia is the right archipelago trip — Bali for one rhythm, Java for another, the eastern islands for adventure and reefs. India is the continental trip — 7x the area, 4x the population, with a different cultural register every 200 km. If Bali's Hindu culture moved you, India is its source — Bali's temples descend from south-Indian Hindu architecture. If you want islands and surf above all, Indonesia is the better fit.",
};

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  vietnam: VIETNAM,
  morocco: MOROCCO,
  peru: PERU,
  egypt: EGYPT,
  thailand: THAILAND,
  "sri-lanka": SRI_LANKA,
  nepal: NEPAL,
  indonesia: INDONESIA,
};

export const COUNTRY_LIST = Object.values(COUNTRY_PROFILES);

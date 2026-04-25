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

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  vietnam: VIETNAM,
  morocco: MOROCCO,
  peru: PERU,
  egypt: EGYPT,
};

export const COUNTRY_LIST = Object.values(COUNTRY_PROFILES);

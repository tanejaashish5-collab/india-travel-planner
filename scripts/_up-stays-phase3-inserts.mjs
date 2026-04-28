import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), "apps", "web", ".env.local") });
const s = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const now = new Date().toISOString();

// Phase 3: insert manually-researched replacements with 2+ sources per row.
// All properties verified via WebSearch + WebFetch on 2026-04-28. source="manual".
const inserts = [
  // ================== AGRA (3 picks: location/value/xfactor) ==================
  {
    destination_id: "agra",
    slot: "location",
    name: "Tajview, Agra — IHCL SeleQtions",
    property_type: "luxury_chain",
    price_band: "₹8–15k",
    why_nakshiq:
      "IHCL's 92-room property on Fatehabad Road, 7 minutes from the Taj East Gate — the closest 5-star walk-in to the monument. Six acres of lawns, organic vegetable gardens, and the Jhankar restaurant for Awadhi-leaning Indian classics. Picked over Trident at this slot because the proximity to the gate cuts the early-morning auto-rickshaw scramble that defines an Agra trip.",
    signature_experience:
      "SkyDeck dinner with the Taj outline visible after dusk during clear-air winters (Nov–Feb).",
    source: "manual",
    sources: [
      { url: "https://www.seleqtionshotels.com/en-in/hotels/taj-view-agra", title: "Tajview, Agra — IHCL SeleQtions (official)", source_type: "official" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g297683-d304702-Reviews-Tajview_Agra_IHCL_SeleQtions-Agra_Agra_District_Uttar_Pradesh.html", title: "Tajview Agra — Tripadvisor (2026)", source_type: "tripadvisor" },
    ],
    confidence: 0.9,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "agra",
    slot: "value",
    name: "Crystal Sarovar Premiere, Agra",
    property_type: "mid_range_hotel",
    price_band: "₹4–7k",
    why_nakshiq:
      "Sarovar-chain mid-tier on Fatehabad Road with Taj-view rooms on the upper floors — the most predictable mid-range pick in a market crowded with one-off operators. Pool, multi-cuisine restaurant, and a 1.5km drive to the Taj East Gate. Pick this when you want a 4-star service floor without the IHCL/Oberoi premium.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.hotelsinagra.org/crystal-sarovar-premiere-hotel-agra.html", title: "Crystal Sarovar Premiere — Hotels in Agra", source_type: "directory" },
      { url: "https://www.makemytrip.com/hotels/crystal_sarovar_premiere-details-agra.html", title: "Crystal Sarovar Premiere — MakeMyTrip", source_type: "ota" },
    ],
    confidence: 0.78,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "agra",
    slot: "xfactor",
    name: "The Coral Court Homestay, Agra",
    property_type: "homestay",
    price_band: "₹3–5k",
    why_nakshiq:
      "Family-run boutique homestay in Tajganj on Fatehabad Road, ~700m from the Taj South Gate. About 10 rooms, two-year curated artwork-and-Mughal-detail interior the owners assembled themselves, and home-cooked breakfast/dinner served on a rooftop. Booked solid in winter peak — block 8+ weeks ahead. Picked over the chain options when you want a small-property feel inside walking distance of the Taj.",
    signature_experience:
      "Rooftop dinner with a Taj minaret-line silhouette on clear winter nights — the property's defining ritual.",
    source: "manual",
    sources: [
      { url: "https://coralcourthomestay.com/", title: "Coral Court Home Stay — official", source_type: "official" },
      { url: "https://www.tripadvisor.in/Hotel_Review-g297683-d11642002-Reviews-The_Coral_Court_Homestay-Agra_Agra_District_Uttar_Pradesh.html", title: "Coral Court Homestay — Tripadvisor (800+ reviews)", source_type: "tripadvisor" },
    ],
    confidence: 0.85,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== AYODHYA (2 picks: experience, value) ==================
  {
    destination_id: "ayodhya",
    slot: "experience",
    name: "Park Inn by Radisson Ayodhya",
    property_type: "midscale_chain",
    price_band: "₹6–11k",
    why_nakshiq:
      "Currently Ayodhya's most consistent 4-star — 80 rooms, 11-min walk from Ayodhya Dham Junction (formerly Faizabad station), and the chain-quality service floor that's hard to find in this market post the 2024 Ram Mandir surge. Most legacy Ayodhya hotels were built for pilgrim dharamshala economics; this is the first property running on a global-chain SOP. Use it as a base when you want walking-distance station access and a reliable AC, not luxe.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.radissonhotels.com/en-us/hotels/park-inn-ayodhya", title: "Park Inn by Radisson Ayodhya — official", source_type: "official" },
      { url: "https://www.booking.com/hotel/in/park-inn-by-radisson-ayodhya.html", title: "Park Inn by Radisson Ayodhya — Booking.com", source_type: "ota" },
    ],
    confidence: 0.85,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "ayodhya",
    slot: "value",
    name: "Hotel Krinoscco, Ayodhya",
    property_type: "mid_range_hotel",
    price_band: "₹5–9k",
    why_nakshiq:
      "59-room 4-star on Amaniganj on the Faizabad–Ayodhya road, ~3km from the Ram Janmabhoomi complex. Garden, sun-terrace, multi-cuisine restaurant doing brunch through high-tea. Pick this over the Park Inn when you want a slightly cheaper night and don't need the station-walk proximity — the Krinoscco shuttle handles the temple drop in 10 minutes.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://krinoscco.com/", title: "Hotel Krinoscco — official", source_type: "official" },
      { url: "https://www.tripadvisor.in/Hotel_Review-g1453998-d23785826-Reviews-Hotel_Krinoscco-Faizabad_Ayodhya_District_Uttar_Pradesh.html", title: "Hotel Krinoscco — Tripadvisor", source_type: "tripadvisor" },
    ],
    confidence: 0.8,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== CHITRAKOOT (1 pick: experience; xfactor honest scarcity) ==================
  {
    destination_id: "chitrakoot",
    slot: "experience",
    name: "Tulsi Resort, Chitrakoot",
    property_type: "resort",
    price_band: "₹3–5k",
    why_nakshiq:
      "Family-run resort on the bypass road near Tulsi Chowk in Rajapur — 4.9/5 across 266 reviews, the highest-rated stay in this small pilgrim town. Spacious AC family rooms with balconies, and a breakfast buffet that holds quality even in pilgrim-peak weeks. Picked as the experience tier because Chitrakoot's market caps out here — there is no 5-star for the Ramayan-circuit pilgrim, and this is the most consistent operator above the MPT government floor.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.booking.com/hotel/in/tulsi-resort-rajapur.html", title: "Tulsi Resort Chitrakoot — Booking.com", source_type: "ota" },
      { url: "https://www.justdial.com/Chitrakoot-Up/Tulsi-Resort-Near-Tulsi-Chowk-Rajapur/9999P5198-5198-250111062810-W6B7_BZDET", title: "Tulsi Resort — Justdial (266 reviews, 4.9★)", source_type: "directory" },
    ],
    confidence: 0.82,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== DUDHWA NATIONAL PARK (1 pick: experience) ==================
  {
    destination_id: "dudhwa-national-park",
    slot: "experience",
    name: "Jaagir Manor, Dudhwa — IHCL SeleQtions",
    property_type: "heritage_chain",
    price_band: "₹14–22k",
    why_nakshiq:
      "An 80-year-old hunting lodge at Bikram Ban Farms in Palia Kalan (the standard pre-safari base for Dudhwa), brought into the IHCL SeleQtions portfolio. Six room categories including Brick Villas and SeleQtions Villas, two F&B venues (Jaagir Pavilion + Safari Club), and naturalist-led safaris into the 496-sq-mile Dudhwa wildlife corridor. The only chain-grade safari property at the gate — the rest of the area is forest rest houses and homestays.",
    signature_experience:
      "Dawn safari into the Dudhwa core zone with the lodge's resident naturalist — sloth-bear and one-horned-rhino sightings tracked through the lodge's own log book.",
    source: "manual",
    sources: [
      { url: "https://www.seleqtionshotels.com/en-in/hotels/jaagir-manor-dudhwa/", title: "Jaagir Manor Dudhwa — IHCL SeleQtions (official)", source_type: "official" },
      { url: "https://www.tripadvisor.in/Hotel_Review-g1023325-d4063488-Reviews-Jaagir_Lodge_Dudhwa-Palia_Kalan_Lakhimpur_Kheri_District_Uttar_Pradesh.html", title: "Jaagir Lodge Dudhwa — Tripadvisor", source_type: "tripadvisor" },
    ],
    confidence: 0.92,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== FATEHPUR SIKRI (2 picks: location, value; experience+xfactor honest scarcity) ==================
  {
    destination_id: "fatehpur-sikri",
    slot: "location",
    name: "Hotel Goverdhan, Fatehpur Sikri",
    property_type: "guesthouse",
    price_band: "₹2–4k",
    why_nakshiq:
      "Small private guesthouse near the Buland Darwaza approach — the closest stay to the UNESCO complex gates. 4.0/5 from 65 MakeMyTrip guests, basic-but-clean rooms, in-house restaurant. The defensible reason to overnight here at all (most travellers daytrip from Agra, 40km east) is to walk into the Diwan-i-Khas at sunrise before the Agra coach groups arrive at 9am.",
    signature_experience:
      "5:30am walk to the complex gate so you're inside the Jodha Bai palace courtyards by 6am, before the Agra day-trip buses pull in.",
    source: "manual",
    sources: [
      { url: "https://hotelfatehpursikriviews.com/", title: "Hotel Goverdhan — official site", source_type: "official" },
      { url: "https://www.makemytrip.com/hotels/hotel_goverdhan-details-fatehpur_sikri.html", title: "Hotel Goverdhan — MakeMyTrip (4.0★)", source_type: "ota" },
    ],
    confidence: 0.7,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "fatehpur-sikri",
    slot: "value",
    name: "Rahi Gulistan Tourist Complex, Fatehpur Sikri",
    property_type: "government_guesthouse",
    price_band: "₹1.5–3k",
    why_nakshiq:
      "UP Tourism's government-run pilgrim base, close walk to the World Heritage complex. 3.4/5 across 34 MakeMyTrip reviews — basic AC rooms, a restaurant with limited menu, and the government-property advantage of clean booking and predictable rates. Pick this when you want UP-Tourism backing over a private operator, not for comfort.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.makemytrip.com/hotels/rahi_gulistan_tourist_complex_fatehpur_sikri_agra-details-fatehpur_sikri.html", title: "Rahi Gulistan Tourist Complex — MakeMyTrip", source_type: "ota" },
      { url: "https://www.goibibo.com/hotels/rahi-gulistan-tourist-complex-fatehpur-sikri-agra-hotel-in-fatehpur-sikri-4299221070797105511/", title: "Rahi Gulistan Tourist Complex — Goibibo", source_type: "ota" },
    ],
    confidence: 0.7,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== KUSHINAGAR (2 picks: location, xfactor; experience honest scarcity) ==================
  {
    destination_id: "kushinagar",
    slot: "location",
    name: "The Royal Residency, Kushinagar",
    property_type: "mid_range_hotel",
    price_band: "₹4.5–8k",
    why_nakshiq:
      "INPAC Group's Kushinagar property on Buddha Marg, 300 yards from the Mahaparinirvana Temple — the closest sit-down hotel to the Buddhist circuit's main shrine. 4.1/5 across 493 Tripadvisor reviews. Spacious rooms, large bathrooms, and the most reliable F&B in town for pilgrim-circuit groups from Sri Lanka, Thailand, and Japan. Service consistency dips when occupancy spikes during Vesak — book early.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.theroyalresidencyhotels.com/kushinagar.php", title: "The Royal Residency Kushinagar — INPAC Group official", source_type: "official" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g776433-d1149741-Reviews-The_Royal_Residency-Kushinagar_Kushi_Nagar_District_Uttar_Pradesh.html", title: "The Royal Residency Kushinagar — Tripadvisor (493 reviews, 4.1★)", source_type: "tripadvisor" },
    ],
    confidence: 0.85,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "kushinagar",
    slot: "xfactor",
    name: "Shri Birla Hindu Buddha Dharamshala, Kushinagar",
    property_type: "dharamshala",
    price_band: "₹500–1k",
    why_nakshiq:
      "Birla Trust dharamshala 2.9km from the Kasiya bus stand — two-bed AC and four-bed cooler rooms at sub-₹1000 rates. Distinctive because it serves the rare Hindu-Buddhist combined pilgrim circuit (most Kushinagar dharamshalas serve one tradition only). CCTV, hot water, drinking-water access, on-site staff. Pick this when you want a budget bed inside the dharamshala economy that runs the town, not a hotel transaction.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://yatradham.org/kushinagar-shri-birla-hindu-buddha-dharamshala.html", title: "Shri Birla Hindu Buddha Dharamshala — YatraDham", source_type: "directory" },
      { url: "https://yatradham.org/yatradham-destinations/uttarpradesh/kushinagar.html", title: "Kushinagar dharamshala directory — YatraDham", source_type: "directory" },
    ],
    confidence: 0.7,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== LUCKNOW (1 pick: location) ==================
  {
    destination_id: "lucknow",
    slot: "location",
    name: "Hyatt Regency Lucknow",
    property_type: "luxury_chain",
    price_band: "₹9–15k",
    why_nakshiq:
      "Hyatt's 206-room flagship on Vibhuti Khand, Gomti Nagar — behind Chandra Eye Hospital, near the High Court. The all-day Rocca does Indian + Italian, China House opens for dinner, and The Penthouse rooftop bar at the building's tallest point gives you the marine-drive horizon view that no other Lucknow 5-star delivers. Pick this for the contemporary commercial-district base when your itinerary is Hazratganj-and-out, not Bara Imambara walking distance.",
    signature_experience:
      "Sundowner at The Penthouse rooftop with the Lucknow marine-drive line below — the only city-overlook bar in the chain-hotel set.",
    source: "manual",
    sources: [
      { url: "https://www.hyatt.com/hyatt-regency/en-US/lkorl-hyatt-regency-lucknow", title: "Hyatt Regency Lucknow — official", source_type: "official" },
      { url: "https://www.tripadvisor.in/Hotel_Review-g297684-d12596000-Reviews-Hyatt_Regency_Lucknow-Lucknow_Lucknow_District_Uttar_Pradesh.html", title: "Hyatt Regency Lucknow — Tripadvisor", source_type: "tripadvisor" },
    ],
    confidence: 0.92,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== PRAYAGRAJ (1 pick: location) ==================
  {
    destination_id: "prayagraj",
    slot: "location",
    name: "Hotel Kanha Shyam, Prayagraj",
    property_type: "mid_range_hotel",
    price_band: "₹5–8k",
    why_nakshiq:
      "Established Civil Lines property at 22/1 Strachey Road near Subash Chowraha and Palace Cinema — the colonial-grid heart of Allahabad/Prayagraj. 4.1/5 Goibibo across multiple booking cycles, deluxe + suite mix, on-site spa and multi-cuisine restaurant with a buffet breakfast that travellers consistently call out as the property's strongest beat. Pick this for Civil Lines walking distance to the Indian Coffee House + El Chico belt without the rooftop-pool premium.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.makemytrip.global/hotels/hotel_kanha_shyam-details-prayagraj.html", title: "Hotel Kanha Shyam — MakeMyTrip", source_type: "ota" },
      { url: "https://www.goibibo.com/hotels/kanha-shyam-hotel-in-prayagraj-india-6282522069447743389/", title: "Hotel Kanha Shyam — Goibibo (4.1★)", source_type: "ota" },
    ],
    confidence: 0.82,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== SARNATH (2 picks: location, value; xfactor honest scarcity) ==================
  {
    destination_id: "sarnath",
    slot: "location",
    name: "Vatika Homestay, Sarnath",
    property_type: "homestay",
    price_band: "₹2–4k",
    why_nakshiq:
      "8-room homestay 1.3km from the main Sarnath archaeological compound and 1.5km from Chaukhandi Stupa — a 16-minute walk to Dhamek Stupa. Sound-proofed AC rooms, a sun deck, and the family-run service floor that suits the slow-pace Buddhist-circuit visitor. Picked because most Sarnath visitors daytrip from Varanasi; if you actually want to overnight here, this is the closest credible stay to the stupa cluster.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://vatika-homestay.hotels-varanasi.com/en/", title: "Vatika Homestay — booking page", source_type: "ota" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g19825233-d25799872-Reviews-Vatika_Homestay-Sarnath_Varanasi_District_Uttar_Pradesh.html", title: "Vatika Homestay — Tripadvisor", source_type: "tripadvisor" },
    ],
    confidence: 0.78,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "sarnath",
    slot: "value",
    name: "Sarnath Guest House",
    property_type: "guesthouse",
    price_band: "₹500–1k",
    why_nakshiq:
      "Long-running guesthouse near the Japanese Temple, used by the budget Buddhist-pilgrim circuit for years. 3.9/5 across 163 Justdial reviews. Bare-bones rooms — fan, attached bath, basic vegetarian breakfast — at sub-₹1000 rates. Pick this when the whole point is a pillow within walking distance of the morning chants at Mahabodhi Society, not a hotel.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "https://www.justdial.com/Sarnath/Sarnath-Guest-House-Near-Japanees-Temple-Sarnath/0542PX542-X542-140607112625-B4N2_BZDET", title: "Sarnath Guest House — Justdial (163 reviews, 3.9★)", source_type: "directory" },
      { url: "http://sarnathguesthouse.com/", title: "Sarnath Guest House — official", source_type: "official" },
    ],
    confidence: 0.7,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== SRAVASTI (1 pick: experience; location/value/xfactor honest scarcity) ==================
  {
    destination_id: "sravasti",
    slot: "experience",
    name: "Lotus Nikko Hotel, Sravasti",
    property_type: "mid_range_hotel",
    price_band: "₹4–7k",
    why_nakshiq:
      "Japanese-funded property opened 1998 on a 6.8-acre plot, 60 deluxe rooms + 2 suites at 10-min walk from Sahet-Maheth and ~2km from Jetavana Monastery — where Buddha spent 24 monsoons. The 24-hour multi-cuisine restaurant runs Indian, Continental, Chinese, Japanese, Korean, and Thai for the international Buddhist-circuit flow, and the property's defining feature is a Japanese community bath with separate ladies and gents. There is no other comparable stay in Sravasti — this is the town's anchor.",
    signature_experience:
      "Japanese community bath after a Jetavana morning circuit — a soak ritual that Tokyo and Osaka pilgrim groups specifically book here for.",
    source: "manual",
    sources: [
      { url: "https://www.lotusnikkohotels.com/", title: "Lotus Nikko Hotels — official", source_type: "official" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g9456020-d3570483-Reviews-Lotus_Nikko_Hotel-Shravasti_Shravasti_District_Uttar_Pradesh.html", title: "Lotus Nikko Hotel Sravasti — Tripadvisor", source_type: "tripadvisor" },
    ],
    confidence: 0.85,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },

  // ================== VRINDAVAN (3 picks: experience, location, xfactor) ==================
  {
    destination_id: "vrindavan",
    slot: "experience",
    name: "Nidhivan Sarovar Portico Vrindavan",
    property_type: "midscale_chain",
    price_band: "₹5–9k",
    why_nakshiq:
      "Sarovar's Vrindavan property at Khasra 797 on Gopalgarh Tehra Road — 4-star, the most reliable chain-grade stay in a market dominated by ashram and dharamshala accommodation. 4km from Banke Bihari and 2.5km from ISKCON, so it's not walking distance — it's a hotel for travellers who want a proper bed and a pool after the temple-circuit day. Pure-veg by Vrindavan religious bylaw; no alcohol on premises.",
    signature_experience: null,
    source: "manual",
    sources: [
      { url: "http://www.nidhivansarovar.com/", title: "Nidhivan Sarovar Portico — official", source_type: "official" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g951350-d4260168-Reviews-Nidhivan_Sarovar_Portico-Vrindavan_Mathura_District_Uttar_Pradesh.html", title: "Nidhivan Sarovar Portico — Tripadvisor (2026)", source_type: "tripadvisor" },
    ],
    confidence: 0.85,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "vrindavan",
    slot: "location",
    name: "Hotel Shri Radha Nikunj, Vrindavan",
    property_type: "mid_range_hotel",
    price_band: "₹3.5–6k",
    why_nakshiq:
      "85-room mid-tier directly opposite Prem Mandir, 10-minute walk to ISKCON Vrindavan — the best location-tier pick if your trip is anchored on Prem Mandir's evening light show and you want zero rickshaw dependency. Three room categories (Deluxe King Studio, Executive Suite, Family Suites), garden, free parking. Ranked #8 of 84 Vrindavan hotels on Tripadvisor at 4/5. Pure-veg, no alcohol (religious bylaw).",
    signature_experience:
      "7:30pm walk-out to the Prem Mandir lights from the lobby — the property's defining proximity advantage.",
    source: "manual",
    sources: [
      { url: "https://hotelshriradhanikunj.com/", title: "Hotel Shri Radha Nikunj — official", source_type: "official" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g951350-d17410330-Reviews-Hotel_Shri_Radha_Nikunj-Vrindavan_Mathura_District_Uttar_Pradesh.html", title: "Hotel Shri Radha Nikunj — Tripadvisor (#8/84)", source_type: "tripadvisor" },
    ],
    confidence: 0.82,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
  {
    destination_id: "vrindavan",
    slot: "xfactor",
    name: "MVT Guesthouse & Restaurant, Vrindavan",
    property_type: "ashram_guesthouse",
    price_band: "₹3.5–5k",
    why_nakshiq:
      "ISKCON-owned 39-room guesthouse on Bhaktivedanta Swami Marg in Raman Reti, directly behind the ISKCON Krishna-Balaram temple. Rooms with balconies, mini-kitchens, and select apartment-style units with two bedrooms for extended-stay devotees. On-site pure-veg restaurant also serves Jain food, plus a yoga centre and temple-program access from inside the compound — the only stay in Vrindavan that integrates the temple's daily rhythm into the property itself.",
    signature_experience:
      "4:30am Mangal Aarti at ISKCON Krishna-Balaram, walked from your door — the ritual the property is engineered to serve.",
    source: "manual",
    sources: [
      { url: "https://iskconvrindavan.com/visit-vrindavan/accomodation", title: "MVT Guesthouse — ISKCON Vrindavan official", source_type: "official" },
      { url: "https://www.tripadvisor.com/Hotel_Review-g951350-d1754338-Reviews-MVT_Guesthouse_Restaurant_Vrindavan-Vrindavan_Mathura_District_Uttar_Pradesh.html", title: "MVT Guesthouse — Tripadvisor", source_type: "tripadvisor" },
    ],
    confidence: 0.88,
    voice_flags: [],
    published: true,
    refreshed_at: now,
  },
];

console.log(`Inserting ${inserts.length} verified picks…`);
const { data, error } = await s
  .from("destination_stay_picks")
  .upsert(inserts, { onConflict: "destination_id,slot" })
  .select("destination_id, slot, name");
if (error) {
  console.error("Upsert failed:", error);
  process.exit(1);
}
console.log(`✓ Inserted/upserted ${data?.length ?? inserts.length} rows`);
for (const r of data ?? []) console.log(`  + ${r.destination_id.padEnd(25)} ${r.slot.padEnd(11)} ${r.name}`);

// Bonus voice fix: Sarnath experience "The Hosteller Sarnath" had banned word "curated"
const { error: e2, count: c2 } = await s
  .from("destination_stay_picks")
  .update(
    {
      why_nakshiq:
        "Modern hostel chain stop with private and dorm rooms — the closest thing to a designed mid-range stay in Sarnath, where the rest of the market is family guesthouses and pilgrim dharamshalas. Communal areas designed for backpacker socialising, breakfast included, and a 1.5km walk to Dhamek Stupa. Use this when you want a chain-quality bed at sub-₹3k without the homestay personal-introduction overhead.",
      voice_flags: [],
      refreshed_at: now,
    },
    { count: "exact" }
  )
  .eq("destination_id", "sarnath")
  .eq("slot", "experience")
  .eq("name", "The Hosteller Sarnath");
if (e2) console.error("Hosteller voice fix failed:", e2);
else console.log(`\n✓ Sarnath/experience voice fix applied (${c2} row)`);

// Final per-dest summary
const upDests = ["agra","ayodhya","chitrakoot","dudhwa-national-park","fatehpur-sikri","kushinagar","lucknow","mathura","prayagraj","sarnath","sravasti","varanasi","vrindavan"];
console.log("\n=== Final UP picks per dest ===");
let total = 0;
for (const d of upDests) {
  const { count } = await s.from("destination_stay_picks").select("*", { count: "exact", head: true }).eq("destination_id", d);
  console.log(`  ${d.padEnd(28)} ${count ?? 0}`);
  total += count ?? 0;
}
console.log(`---\nTotal: ${total}`);

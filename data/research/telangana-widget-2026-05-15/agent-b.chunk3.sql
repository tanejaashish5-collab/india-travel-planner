
-- HS-comment: pillalamarri eats 3/5 filled, 2 HS-skipped — Pillalamarri itself is 4 km outside Mahbubnagar
-- town with only chai/snack stalls; Mahbubnagar town has limited verifiable mid-tier options beyond above.

-- BASARA (needs +5 eats — temple-town with Devasthanam annaprasadam + Lords Hrim + Indraprastha as anchors,
-- 2 HS-skip)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'basara',
  'Sri Gnana Saraswathi Devasthanam Annaprasadam',
  'Inside Basara Temple complex, Nirmal District',
  ARRAY['south-indian','sattvic','telugu']::text[],
  'casual',
  'Free Annaprasadam thali',
  ARRAY['Sambar rice','Curd rice','Pulihora','Vada','Pongal (Aksharabhyasam days)']::text[],
  '₹',
  '[0,100)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The temple Devasthanam serves a free sattvic annaprasadam lunch to all pilgrims daily — onion/garlic-free, served on banana leaf in the temple''s dining hall. Aksharabhyasam-ceremony families queue from 11am for the pongal-and-pulihora special. One of two Saraswati-dedicated temples in India (the other is in J&K).',
  'Free meal but a ₹10-20 donation expected; arrive 11:30am-1pm. Aksharabhyasam mass-batches the dining hall — patient queueing.',
  'Sri Gnana Saraswathi Devasthanam, Basar, Nirmal District 504101',
  'https://maps.google.com/?q=Sri+Gnana+Saraswathi+Devasthanam+Basara',
  ARRAY['https://endowments.ts.nic.in/Temple-content/Basara/content.pdf','https://www.basaratemple.org/','https://nirmal.telangana.gov.in/tourist-place/sri-gnana-saraswathi-devasthanam-basara/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'basara',
  'Manorath Restaurant (Lords Hrim Akshara Resort)',
  '2 km from Basara Temple, Basar, Nirmal District',
  ARRAY['indian','vegetarian','south-indian']::text[],
  'mid_range',
  'Pure-veg buffet',
  ARRAY['Pure-veg buffet','Andhra meals','Hyderabadi veg biryani','South-Indian breakfast']::text[],
  '₹₹₹',
  '[450,800)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'In-house pure-vegetarian restaurant at the Lords Hrim Akshara Resort — the closest mid-tier dining to Basara temple (2 km), beside the Godavari river. The sister "Blue Coriander" outlet runs global cuisine. Catering to Aksharabhyasam families with multi-day stay programmes.',
  'Sunday lunch buffet is busiest; weekday breakfast is fastest. Children dining included in Aksharabhyasam package rates.',
  'Lords Hrim Akshara Resort, near Godavari River, Basar 504101',
  'https://maps.google.com/?q=Lords+Hrim+Akshara+Resort+Basara',
  ARRAY['https://www.lordshotels.com/resort-hrim-akshara-basar/','https://www.tripadvisor.in/HotelsNear-g2282894-d2693732-Basar_Saraswati_Temple-Adilabad_Adilabad_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'basara',
  'Indraprastha Basara Resort Restaurant',
  'Basara-Nizamabad State Highway, Basar',
  ARRAY['indian','south-indian','chinese']::text[],
  'mid_range',
  'Andhra meals + chicken biryani',
  ARRAY['Andhra meals','Chicken biryani','Gongura chicken','Veg manchurian']::text[],
  '₹₹',
  '[300,550)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Tripadvisor-listed resort restaurant on the Basara-Nizamabad State Highway — the non-veg alternative for pilgrim families coming off the Aksharabhyasam ceremony who want the post-temple meal off-premises. Multi-cuisine menu, decent biryani, fast turnaround.',
  'Lunch crowded on Aksharabhyasam-peak days (Vasant Panchami in Jan/Feb); weekdays calmer.',
  'Basara-Nizamabad State Highway, Basar 504101',
  'https://maps.google.com/?q=Indraprastha+Basara+Resort',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g2282894-d5031064-Reviews-Indraprastha_Basara_Resort_Hotel-Adilabad_Adilabad_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

-- HS-comment: basara eats 3/5 filled, 2 HS-skipped — Basara is a temple-village with ~20 private lodges
-- mostly serving in-house meals; no further independently-named restaurants verifiable on Tripadvisor 2024-26.

----------------------------------------------------------------------
-- (4) STAYS — replacements via ON CONFLICT upsert
----------------------------------------------------------------------

-- WARANGAL — replace xfactor (Kaziranga ghost) + audit experience (Warangal Fort Resort)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'warangal', 'xfactor', 'Pakhal Haritha Hotel (TGTDC)',
  'Government tourism lake resort',
  '₹1,800–₹3,500 per night',
  'TGTDC lake resort on the bund of Pakhal Lake — the 1213 AD Kakatiya-built reservoir at the heart of the 839 sq km Pakhal Wildlife Sanctuary. Spot leopard, sloth bear, nilgai, chital, marsh croc from the cottages; lake fishes for tilapia at dawn.',
  'Replaces fabricated "Kaziranga Jungle Homestay (Pakhal satellite property)" — Kaziranga is in Assam, 1500 km from Warangal; the real Pakhal property is this TGTDC Haritha 50 km east of Warangal city.',
  to_jsonb(ARRAY['https://tourism.telangana.gov.in/hotels/PakhalHotel','https://telanganatourismhotels.in/pakhala-haritha-hotel/','https://warangaltourism.in/pakhal-lake-and-wildlife-sanctuary-warangal']),
  to_jsonb(ARRAY['lake-resort','wildlife','tgtdc']),
  'web_search', 0.88
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'warangal', 'experience', 'Haritha Kakatiya Hotel (TGTDC)',
  'Government tourism heritage hotel',
  '₹1,850–₹2,750 per night',
  '21-room TGTDC flagship at Nakkala Gutta, Hanamkonda — purpose-built for the Kakatiya heritage circuit. AC Suite (₹2,750) and AC Deluxe (₹1,850) rooms. 4.2/5 guest rating, in-house Haritha restaurant, walking distance to the Thousand Pillar Temple and 5 km from Warangal Fort.',
  'Replaces fabricated "The Warangal Fort Resort" (no Booking/Tripadvisor footprint 2024-26). Haritha Kakatiya is the real TGTDC heritage-circuit anchor with verified bookings via tourism.telangana.gov.in.',
  to_jsonb(ARRAY['https://tourism.telangana.gov.in/hotels/49/kakatiya','https://telanganatourism.gov.in/partials/stay/warangal-urban/haritha-kakatiya-hotel.html','https://www.bestbus.in/hotels/category-details/telangana-tourism-haritha-hotels-and-resorts/haritha-kakatiya-hotel']),
  to_jsonb(ARRAY['heritage-circuit','tgtdc','hanamkonda']),
  'web_search', 0.90
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- RAMAPPA (clean slate, +3 stays)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ramappa-temple', 'location', 'Haritha Lake View Resort Ramappa (TGTDC)',
  'Government tourism lake resort',
  '₹2,000–₹3,500 per night',
  'TGTDC lake-bund resort 1.3 km from Ramappa Temple — sole accommodation in walking distance to the UNESCO 2021 Kakatiya Rudreshwara Temple. AC and non-AC rooms with Ramappa Lake views; in-house Haritha restaurant. Ideal sunrise viewing of the temple vimana across the bund.',
  'The only on-site option for the UNESCO Kakatiya temple — no chain hotel exists within 30 km. TGTDC-run, verifiable bookings.',
  to_jsonb(ARRAY['https://www.bestbus.in/hotel-booking/details/telangana-tourism-haritha-hotels-and-resorts/haritha-lake-view-resort-ramappa','https://www.telanganatourism.gov.in/partials/stay/jayashankar-bhoopalpally/haritha-lake-view-resort-ramappa.html','https://www.tripadvisor.in/Hotel_Review-g735768-d11547869-Reviews-Haritha_Hotel_Ramappa-Warangal_Warangal_Urban_District_Telangana.html']),
  to_jsonb(ARRAY['unesco-adjacent','lake-view','tgtdc']),
  'web_search', 0.92
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ramappa-temple', 'experience', 'Feriado Resorts Tadvai',
  'Forest-edge boutique resort',
  '₹4,500–₹8,500 per night',
  '30-room franchise-revamped Tadvai forest resort on the Mulugu-Eturnagaram road, 22 km north of Ramappa. Views of ancient teak, kids'' play area, indoor cricket, volleyball, kayaking in Tadvai Lake, easy access to Eturnagaram WLS and Pandavula Gutta. Telangana home-style menu.',
  'The only non-government boutique stay within the Ramappa-Eturnagaram heritage-wildlife corridor — most upscale option for the Mulugu region.',
  to_jsonb(ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html','https://www.easemytrip.com/hotels/feriado-resort-tadvai-1872516/']),
  to_jsonb(ARRAY['boutique','forest-edge','kakatiya-circuit']),
  'web_search', 0.88
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'ramappa-temple', 'value', 'Haritha Kakatiya Hotel Warangal (TGTDC)',
  'Government tourism heritage hotel',
  '₹1,850–₹2,750 per night',
  '21-room TGTDC heritage-circuit hotel in Hanamkonda, 65 km from Ramappa — pair a Warangal-Fort-and-Thousand-Pillar day with Ramappa the next morning. Cheapest verifiable mid-tier accommodation in the wider Kakatiya cluster.',
  'The cost-efficient base for Kakatiya circuit travellers covering Warangal Fort + Thousand Pillar + Ramappa over 2 days.',
  to_jsonb(ARRAY['https://tourism.telangana.gov.in/hotels/49/kakatiya','https://telanganatourism.gov.in/partials/stay/warangal-urban/haritha-kakatiya-hotel.html']),
  to_jsonb(ARRAY['value','tgtdc','heritage-circuit']),
  'web_search', 0.85
);

-- LAKNAVARAM — replace location (duplicate); experience + xfactor + value untouched (audit verified)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'laknavaram', 'location', 'Feriado Resorts Tadvai',
  'Forest-edge boutique resort',
  '₹4,500–₹8,500 per night',
  '30-room boutique resort at Tadvai (Mulugu-Eturnagaram corridor) — 18 km from Laknavaram Lake, set in the Eturnagaram WLS buffer. Tadvai Lake kayaking, mountain-bike trails, kids'' play area; restaurant serves Telangana home-style menu.',
  'Replaces duplicate "Laknavaram Lake Resort" (DB had same property in both experience AND location slots). Feriado Tadvai is the verified forest-edge alternative covering the same Laknavaram-Eturnagaram circuit.',
  to_jsonb(ARRAY['https://tadvai.feriadoresorts.com/','https://www.tripadvisor.in/Hotel_Review-g12476602-d23631256-Reviews-Feriado_Resorts_Tadvai-Mulugu_Jayashankar_Bhoopalpally_District_Telangana.html','https://www.easemytrip.com/hotels/feriado-resort-tadvai-1872516/']),
  to_jsonb(ARRAY['boutique','forest-edge','tadvai']),
  'web_search', 0.88
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- PILLALAMARRI — replace any template-ghost stays via upsert (using Tripadvisor Mahbubnagar 2025 anchors)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pillalamarri', 'experience', 'The Grand Sindhu',
  'Mid-tier hotel',
  '₹1,800–₹3,200 per night',
  'Mid-tier Mahbubnagar town hotel (Tripadvisor "best value #3" — 14 reviews, 2.7/5; the most-reviewed Mahbubnagar property on Tripadvisor 2024-26). 5 km from Pillalamarri Banyan and 30 km from Koilkonda Fort. Standard AC rooms, in-house multi-cuisine restaurant.',
  'Replaces likely-fabricated "Pillalamarri Lake Resort" or "Lakeside Homestay" (no Booking/Tripadvisor footprint). The Grand Sindhu is the only verifiable mid-tier Mahbubnagar hotel covering the Pillalamarri-Koilkonda-Gadwal circuit.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html','https://www.makemytrip.com/hotels/mahbubnagar-hotels.html']),
  to_jsonb(ARRAY['mid-tier','town-hotel','mahbubnagar']),
  'web_search', 0.75
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pillalamarri', 'value', 'Geetha Hotel',
  'Budget lodge with restaurant',
  '₹900–₹1,500 per night',
  'Tripadvisor "best value #1" Mahbubnagar lodge (4.0/5) — clean rooms, value pricing, in-house Andhra-meals restaurant. 4 km from Pillalamarri Banyan, walking distance from Mahbubnagar bus stand. The standard transit-stop accommodation on the Hyderabad-Srisailam highway corridor.',
  'Replaces likely-fabricated "TTDC Guest House" or "Banyan Tree Farm Stay" (no TTDC operates in Telangana — TTDC is Tamil Nadu Tourism). Geetha Hotel is the real Mahbubnagar town budget anchor.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']),
  to_jsonb(ARRAY['budget','town-lodge','mahbubnagar']),
  'web_search', 0.78
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pillalamarri', 'location', 'Avanthi Hotel',
  'Mid-tier hotel-restaurant',
  '₹1,400–₹2,400 per night',
  'Tripadvisor "best value #2" Mahbubnagar property (4.0/5) — known for the in-house Andhra-meals restaurant. 4 km from Pillalamarri, 30 km from Koilkonda Fort, 60 km from Gadwal Fort. Convenient for the Mahbubnagar-Wanaparthy-Gadwal samasthanam day-tour.',
  'Replaces likely-fabricated "Pillalamarri Lake Resort" or "Lakeside Homestay" (no online footprint). Avanthi is a verifiable Tripadvisor Mahbubnagar property.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotels-g2531468-Mahbubnagar_Mahbubnagar_District_Telangana-Hotels.html']),
  to_jsonb(ARRAY['mid-tier','town-hotel','andhra-meals']),
  'web_search', 0.75
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- BASARA — replace all 4 template ghosts via upsert
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'basara', 'experience', 'Lords Hrim Akshara Resort',
  'Boutique riverside resort',
  '₹4,500–₹8,500 per night',
  '2 km from Basara Temple beside the Godavari River — the only branded boutique resort serving Aksharabhyasam-ceremony families. Pure-veg Manorath restaurant + global Blue Coriander outlet, riverside lawns, multi-day pilgrimage packages.',
  'Replaces fabricated "Sri Veerabhadra Temple Heritage Stay" (Sri Veerabhadra is a Lepakshi temple in AP, not a Basara property). Lords Hrim Akshara is the verified Lords-chain boutique property at Basara.',
  to_jsonb(ARRAY['https://www.lordshotels.com/resort-hrim-akshara-basar/','https://www.tripadvisor.in/HotelsNear-g2282894-d2693732-Basar_Saraswati_Temple-Adilabad_Adilabad_District_Telangana.html','https://www.makemytrip.com/hotels/hotels-in-basar-bhainsa.html']),
  to_jsonb(ARRAY['boutique','riverside','aksharabhyasam']),
  'web_search', 0.88
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'basara', 'value', 'Sri Gnana Saraswathi Devasthanam Choultry',
  'Temple Devasthanam choultry',
  '₹200–₹1,500 per night',
  'Official temple-run accommodation inside Basara temple complex: 100-room Devasthanam Choultry (₹200/night), Brahmana Choultry, Vyshya Choultry, Sri Rajanna Nilayam (₹1,500 AC suite, 2 suites), Sri Soma Guest House (₹1,200 AC suite, 4 suites). Walking distance to morning Aksharabhyasam darshan.',
  'Replaces fabricated "Godavari Ghat Homestay" (no Booking/Tripadvisor footprint). Devasthanam choultry is the real Aksharabhyasam-ceremony lodging used by 90% of pilgrim families.',
  to_jsonb(ARRAY['https://www.basaratemple.org/accomodation.html','http://basaradevasthanam.com/accommodation','https://hindupad.com/accommodation-at-basara-temple/']),
  to_jsonb(ARRAY['devasthanam','aksharabhyasam','budget-pilgrim']),
  'web_search', 0.92
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'basara', 'location', 'Indraprastha Basara Resort',
  'Mid-tier resort',
  '₹1,800–₹3,500 per night',
  'Resort on the Basara-Nizamabad State Highway with Tripadvisor 2024-26 footprint — mid-tier alternative to the Devasthanam choultry, with multi-cuisine in-house restaurant (Andhra meals + biryani). Best for non-veg pilgrim families.',
  'Replaces fabricated "Basara River View Lodge" (no online footprint). Indraprastha is the verifiable independent mid-tier resort at Basara.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotel_Review-g2282894-d5031064-Reviews-Indraprastha_Basara_Resort_Hotel-Adilabad_Adilabad_District_Telangana.html']),
  to_jsonb(ARRAY['mid-tier','highway','non-veg-friendly']),
  'web_search', 0.78
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

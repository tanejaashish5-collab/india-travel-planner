
-- POCHAMPALLY (+ honest scarcity: temple-handloom village, 3 distinct anchors verified, 2 HS-skipped)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pochampally',
  'Pochampally Handloom Park Café (Telangana Tourism complex)',
  'Inside Bhoodan Pochampally Rural Tourism Complex',
  ARRAY['south-indian','snacks']::text[],
  'cafe',
  'Tea + South Indian Breakfast',
  ARRAY['Idli','Vada','Tea','Filter Coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A small refreshment counter inside the Ministry-of-Tourism / Telangana Tourism Rural Tourism complex — runs intermittently around weaver-demonstration schedules. Most Pochampally visitors are warned by Tripadvisor "carry food from Hyderabad", so this is the village''s most reliable in-village option.',
  'Operates Mon-Sat 9am-6pm (closed Sundays — same as the handloom-park demonstrations). Confirm operation status with the museum office before arriving; status flips with state-tourism funding cycles.',
  'Bhoodan Pochampally Rural Tourism Complex, Yadadri Bhuvanagiri District 508284',
  'https://maps.google.com/?q=Bhoodan+Pochampally+Handloom+Park',
  ARRAY['https://www.tripadvisor.in/Attraction_Review-g297586-d4242946-Reviews-Bhoodan_Pochampally-Hyderabad_Hyderabad_District_Telangana.html','https://telanganatourism.gov.in/partials/about/arts-crafts/pochampally-handlooms.html']::text[],
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
  'pochampally',
  'NH-65 Highway Dhabas (Choutuppal stretch)',
  'NH-65 Hyderabad-Vijayawada Highway, Choutuppal junction (15 km from Bhoodan Pochampally)',
  ARRAY['andhra','telangana','dhaba']::text[],
  'casual',
  'Andhra Meals + Chicken Curry',
  ARRAY['Andhra Veg Meals','Chicken Curry','Pulihora','Pesarattu']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Pochampally village itself has no decent sit-down restaurant — the closest cluster of working highway eateries is Choutuppal on NH-65, 15 km away. Long-haul Hyderabad-Vijayawada trucker traffic keeps the kitchens fresh.',
  'Stop on the return leg to Hyderabad, not on the way in (Pochampally weavers close 6pm, dhabas peak 7-10pm). Cash + UPI both widely accepted.',
  'NH-65, Choutuppal junction, Yadadri Bhuvanagiri District 508252',
  'https://maps.google.com/?q=Choutuppal+NH-65+Dhabas',
  ARRAY['https://www.tripadvisor.in/Attraction_Review-g297586-d4242946-Reviews-Bhoodan_Pochampally-Hyderabad_Hyderabad_District_Telangana.html']::text[],
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
  'pochampally',
  'Weaver-Family Tea Stops (informal, Master-Weaver lanes)',
  'Bhoodan Pochampally weaver-cluster lanes',
  ARRAY['tea','snacks','homestyle']::text[],
  'cafe',
  'Filter Coffee + Murukku',
  ARRAY['Filter Coffee','Tea','Murukku','Home-style snacks']::text[],
  '₹',
  '[20,81)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'During the demonstration walks (run from the Rural Tourism Complex), some master-weaver families open their inner courtyards for filter-coffee + sweet-savoury snacks — a paid, informal homestay-style stop the Telangana Tourism guides arrange.',
  'Ask the museum office to add a "weaver-house chai stop" to your demonstration walk — ~₹50-100 per head, paid directly to the family. Best for groups of 2-4.',
  'Master-weaver lanes, Bhoodan Pochampally village, Yadadri Bhuvanagiri District 508284',
  'https://maps.google.com/?q=Bhoodan+Pochampally',
  ARRAY['https://5sensestours.com/tour/pochampally-sarees-tour/','https://www.outlooktraveller.com/destinations/india/did-you-know-about-this-telangana-village-that-put-indian-handloom-on-the-world-map']::text[],
  '2026-05-15',
  NULL
);

-- KOLANUPAKA (+ honest scarcity: temple village 80km from Hyderabad on Warangal road)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'kolanupaka',
  'Kulpakji Jain Bhojanalaya',
  'Kolanupaka Jain Temple complex',
  ARRAY['jain','gujarati','vegetarian']::text[],
  'casual',
  'Satvik Jain Thali (no onion / no garlic)',
  ARRAY['Jain Thali','Khichdi','Roti-Sabzi','Curd Rice']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'The Shvetambara Jain temple complex (Kulpakji, 2,000+ years old per district records, with the 140cm green-jade Mahavira and the blue-stone Manikyaswami Adinatha as principal deities) operates a pilgrim bhojanalaya for visiting Jain devotees and donors — satvik food, no onion/garlic.',
  'Open during temple hours (5:30am-12pm + 4pm-8pm). Non-Jain visitors welcome but it''s polite to make a donation. Tokens distributed at the temple office, not the kitchen.',
  'Sri Kulpakji Shvetambara Jain Tirth, Kolanupaka village, Aler mandal, Yadadri Bhuvanagiri District 508101',
  'https://maps.google.com/?q=Kolanupaka+Jain+Temple',
  ARRAY['https://en.wikipedia.org/wiki/Kulpakji','https://yadadri.telangana.gov.in/tourist-place/kolanupaka-temple/','https://www.jainmandir.org/Temple/Shri-Shwetamber-Jain-Tirth-Kulpakji,-Village--Kolanupaka,-District-Nalgonda-(Telangana)']::text[],
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
  'kolanupaka',
  'Someswara Temple Annaprasadam Counter',
  'Sri Someswara Swamy Temple, Kolanupaka',
  ARRAY['temple-prasadam','andhra','satvik']::text[],
  'casual',
  'Pulihora prasadam + Curd Rice',
  ARRAY['Pulihora','Curd Rice','Sweet Pongal']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Chalukyan Someswara Shiva temple across from the Jain Mandir distributes daily prasadam (free) — pulihora, curd rice, sweet pongal in small leaf-cups. Useful pairing if you''re visiting both the Jain and Shaiva shrines.',
  'Prasadam window 11am-12:30pm and 7-8pm only. Token from the temple priest; small donation appreciated.',
  'Sri Someswara Swamy Temple, Kolanupaka village, Aler mandal, Yadadri Bhuvanagiri District 508101',
  'https://maps.google.com/?q=Kolanupaka+Someswara+Temple',
  ARRAY['https://www.telangana360.com/2023/09/kolanupaka-sri-someswara-temple.html','https://hindupost.in/dharma-religion/kolanupaka-someswara-temple-telangana/']::text[],
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
  'kolanupaka',
  'Aler Town Highway Hotels (NH-163 cluster)',
  'Aler town, NH-163 Hyderabad-Warangal Highway',
  ARRAY['andhra','telangana','south-indian']::text[],
  'casual',
  'Andhra Meals + Biryani',
  ARRAY['Andhra Veg Meals','Chicken Biryani','South Indian Tiffins']::text[],
  '₹',
  '[120,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Aler is Kolanupaka''s mandal HQ on NH-163, 8 km from the temple. The highway-stretch has a cluster of basic Andhra-meals + biryani joints serving Hyderabad-Warangal traffic — the closest sit-down lunch options outside the temple bhojanalayas.',
  'Best at lunch (11:30am-2:30pm) when the buses stop. Evening service is sparse. Carry your own bottled water.',
  'NH-163, Aler town, Yadadri Bhuvanagiri District 508101',
  'https://maps.google.com/?q=Aler+NH-163+Hotels',
  ARRAY['https://yadadri.telangana.gov.in/','https://www.trawell.in/telangana/warangal/jain-temple-kolanupaka']::text[],
  '2026-05-15',
  NULL
);

-- ========================================================
-- DESTINATION_STAY_PICKS — UPSERTS (replacements for fabrications)
-- ========================================================

-- HYDERABAD/location — Replace "Hyderabad House" (= Delhi PM enclave) with Marriott Hyderabad Convention Centre
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'hyderabad', 'location', 'Hyderabad Marriott Hotel & Convention Centre',
  'Luxury business hotel',
  '₹10,000–₹18,000 per night',
  'Set on a 12-acre lakefront campus opposite the Hyderabad International Convention Centre — wake-up views of Hussain Sagar, lakeside jogging trail, 10-min drive to HITEC City and Birla Mandir.',
  'Replaces fabricated "Hyderabad House" (= Delhi PM''s residence enclave, not a Hyderabad property). Marriott Hyderabad is the largest 5-star with the city''s only purpose-built convention centre attached.',
  to_jsonb(ARRAY['https://www.marriott.com/en-us/hotels/hydgw-hyderabad-marriott-hotel-and-convention-centre/overview/','https://www.tripadvisor.in/Hotel_Review-g297586-d626898-Reviews-Hyderabad_Marriott_Hotel_Convention_Centre-Hyderabad_Hyderabad_District_Telangana.html']),
  to_jsonb(ARRAY['lakefront','convention-centre','hitec-adjacent']),
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

-- POCHAMPALLY/experience — Replace "Oberoi Amarvilas Hyderabad" (= Agra, not Hyderabad) with Park Hyatt Hyderabad
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pochampally', 'experience', 'Park Hyatt Hyderabad',
  'Luxury hotel',
  '₹14,000–₹25,000 per night',
  'Nearest 5-star to Pochampally weavers village (50 km / 75 min via Outer Ring Road + NH-65). Banjara Hills Road No. 2 location puts the hotel adjacent to KBR National Park; opened 29 April 2012.',
  'Replaces fabricated "The Oberoi Amarvilas Hyderabad" — Amarvilas is The Oberoi''s Taj-view property in AGRA (Uttar Pradesh), not Hyderabad. Park Hyatt is the verified Hyderabad-side luxury anchor for Pochampally day-trippers.',
  to_jsonb(ARRAY['https://www.hyatt.com/park-hyatt/en-US/hydph-park-hyatt-hyderabad','https://en.wikipedia.org/wiki/Park_Hyatt_Hyderabad','https://www.tripadvisor.in/Hotel_Review-g297586-d3167921-Reviews-Park_Hyatt_Hyderabad-Hyderabad_Hyderabad_District_Telangana.html']),
  to_jsonb(ARRAY['banjara-hills','nearest-5star','outer-ring-road']),
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

-- POCHAMPALLY/xfactor — Replace "Weaver's Workshop Stay (informal)" (unverifiable on Booking/Tripadvisor) with Trident Hyderabad
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pochampally', 'xfactor', 'Trident Hyderabad',
  'Luxury business hotel',
  '₹11,000–₹17,000 per night',
  'HITEC City property at Survey No. 64, Hitech City Main Road (Madhapur, near Cyber Towers) — 45 km / 70 min from Bhoodan Pochampally via NH-65 + Outer Ring Road. Lap pool, Cilantro coffee shop, EHL-trained service.',
  'Replaces fabricated "Pochampally Weaver''s Workshop Stay (informal)" — no verified booking listing exists on Tripadvisor/Booking/Airbnb for that property. Trident HITEC City is the closest verifiable luxury base for Pochampally weaving-day-trips.',
  to_jsonb(ARRAY['https://www.tridenthotels.com/hotels-in-hyderabad/','https://www.booking.com/hotel/in/trident-hyderabad.html','https://www.justdial.com/Hyderabad/Trident-Hotel-Near-Cyber-Towers-Madhapur-Hitech-City/040PXX40-XX40-131125135608-J7V7_BZDET']),
  to_jsonb(ARRAY['hitec-city','madhapur','luxury-base']),
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

-- ========================================================
-- SUMMARY (HS = honest scarcity skip; A-flip = B→A transition)
-- ========================================================
-- hyderabad     : +0g +5e (Paradise 1953 / Niloufer 1978 / Shadab 1990 / Pista House 1997 GI-2010 / Karachi Bakery 1953 Moazzam Jahi)
--                 +0s NEW (upserted location: Hyderabad House → Marriott Convention Centre)
--                 → A-flip likely (gems 4, eats 5, stays 4 with all 4 valid; prose-status TBD by parent)
-- bhongir       : +3g (Surendrapuri / Yadagirigutta cave-shrine / Vasalamarri model village) +5e (Vivera / Yadadri Annadanam / Sannidhi Emerald / Haritha / Surendrapuri Kuntala) +0s (Agents B/C own bhongir stays per brief — Agent A covers gems + eats only)
-- medak         : +3g (Medak Fort / Pocharam WS / Edupayala temple) +5e (Sri Geethabhavan / Min Swagath / Hot Bucket Biryani / Haritha Edupayala / Cathedral Counter) +0s (Agents B/C own medak stays)
-- pochampally   : +3g (Ikat Weaving Museum / Vinoba Bhave memorial / TSIIC Handloom Park) +3e + 2 HS-skipped (Pochampally village confirmed-no-restaurants per Tripadvisor; 3 distinct anchors verified: Handloom-Park Cafe + NH-65 Choutuppal dhabas + Weaver-family chai stops; 2 additional unique anchors NOT verifiable, HS-confirmed)
--                 +0s NEW (upserted experience: Oberoi Amarvilas Hyderabad → Park Hyatt; upserted xfactor: informal Weaver's Workshop → Trident HITEC City)
-- kolanupaka    : +3g (Someswara Chalukyan temple / Jain Museum wing / Aler handloom cluster) +3e + 2 HS-skipped (temple village ~3km from Aler town, ~80km from Hyderabad; 3 distinct anchors verified: Kulpakji Jain Bhojanalaya + Someswara Annaprasadam + Aler highway hotels; 2 additional unique anchors NOT verifiable, HS-confirmed)
--                 -1s DELETE (kolanupaka/xfactor "Not applicable" placeholder removed)
--
-- HS-confirmed: pochampally eats 3/5 (village has no decent eatery per multiple Tripadvisor reviews; closest sit-down options are 15km away at Choutuppal or 50km in Hyderabad — anchored 3 distinct types verified, 4th+5th unique anchor would force fabrication)
-- HS-confirmed: kolanupaka eats 3/5 (Jain temple village ~3km from nearest market town Aler; 3 anchored verified types — temple bhojanalaya + Shaivite annaprasadam + Aler highway cluster — exhaust the verifiable supply)
-- HS-confirmed: kolanupaka stays 3/4 after xfactor DELETE (existing 3 stays — Jagannath Choultry + Sumatinatha Guest House + Kolanupaka Farmstay — retained; xfactor genuinely thin-tourism HS)
--
-- Risky picks / flags for parent review:
-- 1. Hot Bucket Biryani Medak — listed on Tripadvisor/OpenTable but no founder/year anchor available; held to verified-listicle evidence only.
-- 2. Yadadri Annadanam + Kolanupaka annaprasadam — entered as price_per_head_inr = '[0,1)' int4range to denote free temple meals (no rupee cost). If schema rejects 0-only range, recommend default '[0,50)' fallback.
-- 3. Pochampally GI tag year — Wikipedia says 2005, some sources say 2004. Used 2005 per Wikipedia primary.
-- 4. Existing hyderabad/value row "ITC Kohenur" — note: ITC Kohenur is a 5-star (NOT 4-star as currently flagged in DB property_type); did NOT upsert as it's a real property in the right slot, just a minor property_type flag for future cleanup.
-- 5. Existing hyderabad/xfactor "Flamingo Entertainers Resort" — flagged as suspect (no firm Tripadvisor presence verified); deferred to Agent B/C if they audit this row.

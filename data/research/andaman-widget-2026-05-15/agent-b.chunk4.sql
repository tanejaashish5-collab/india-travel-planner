
-- BARREN-ISLAND (+5 eats — anchored to PB-side dive-operator day-boat lunches)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Barefoot Scuba Dive-Boat Lunch (Havelock-side anchor)',
  'Departs Havelock Island for Barren Island dive trips',
  ARRAY['continental','indian','seafood']::text[],
  'casual',
  'Onboard lunch — wraps + fruit + coffee',
  ARRAY['Veg/chicken wrap','Pasta box','Fresh fruit','Filter coffee']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Barren Island has zero permanent eateries (uninhabited active volcano). All visitor food comes from chartered dive-boat operators. Barefoot Scuba (PADI 5-star, Havelock) is the most-established Barren operator — its onboard galley packs lunch + breakfast for the 4-hour outbound + 4-hour return passage. Cost included in dive-package (₹1.5-1.7 lakh per boat / 7-8 divers).',
  'Vegetarian + vegan + gluten-free options possible if flagged 48h before charter. The lunch is consumed AT Barren — onboard while circling the volcano.',
  'Barefoot Scuba Resort, Beach No. 3, Havelock Island',
  'https://maps.google.com/?q=Barefoot+Scuba+Havelock',
  ARRAY['https://www.barefootscuba.in/','https://www.barefootscuba.in/blog/diving-at-indias-only-active-volcano-a-life-changing-experience-at-barren-island.html']::text[],
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
  'barren-island',
  'Infiniti Liveaboard Galley',
  'Departs Phoenix Bay Jetty Port Blair for multi-day Barren trips',
  ARRAY['continental','indian','seafood']::text[],
  'fine_dining',
  'Multi-course onboard meals',
  ARRAY['Indian curry-rice','Continental pasta','Fresh-catch fish','Western breakfast spread']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Infiniti is the premier liveaboard dive yacht operating in A&N — 4 to 10-night trips that include Barren Island as a centrepiece. The galley is run by a dedicated chef serving 3 meals + snacks across the cruise. The discoverers of Barren''s "Manta Bay" dive site, regularly featured in Scuba Diving magazine.',
  'Multi-day liveaboard pricing (₹25,000+ per night) includes all meals + diving. The boat actually anchors near Barren overnight — you eat dinner watching the volcano. Vegetarian / dietary requirements must be flagged 7 days before departure.',
  'Phoenix Bay Jetty, Port Blair (boat departure point)',
  'https://maps.google.com/?q=Phoenix+Bay+Jetty+Port+Blair',
  ARRAY['https://www.infinitiliveaboard.com/dive-sites-of-barren-island.html','https://www.scubadiving.com/photos/manta-rays-found-volcanic-barren-island-infiniti-live-aboard']::text[],
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
  'barren-island',
  'Lacadives Dive-Boat Provisioning',
  'Departs Havelock Island for Barren dive expeditions',
  ARRAY['continental','indian','vegan-options']::text[],
  'casual',
  'Onboard expedition meals',
  ARRAY['Indian thali','Pasta','Soup + bread','Fresh fruit']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Lacadives (founded 1993, India''s oldest PADI dive-school, Havelock branch) is the second-major Barren-Island operator. Their boats provision a galley with vegetarian-friendly Indian thalis and Western options for the 8+ hour round-trip charter. Lunch consumed at the volcano viewpoint.',
  'Lacadives accepts mixed groups (divers + snorkel-only spectators) so non-divers can join the boat for the Barren visit at a lower cost. Vegan / Jain options available with notice.',
  'Lacadives, Havelock Island',
  'https://maps.google.com/?q=Lacadives+Havelock',
  ARRAY['https://www.padi.com/diving-in/andaman-islands/','https://www.thrillophilia.com/attractions/barren-island']::text[],
  '2026-05-15',
  1993
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'barren-island',
  'Charter-Boat BYO-Provisioning (Port Blair operators)',
  'Phoenix Bay / Junglighat Jetty, Port Blair',
  ARRAY['indian','snacks','bengali']::text[],
  'casual',
  'BYO packed lunch from Port Blair',
  ARRAY['Packed Bengali fish-thali','Egg-rice packet','Snacks (Bikaji-type)','Bottled water 2L']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Smaller fishing-style charter boats from Port Blair (Phoenix Bay + Junglighat jetties) operate budget Barren trips (~₹80-100k per boat) but DO NOT provision food — you bring your own. Most charter agencies arrange a packed lunch from Port Blair''s Bengali dhabas (Annapurna / New Lighthouse) for ~₹250/head — Bengali fish thali wrapped in foil.',
  'Carry 3L bottled water minimum — 8-hour passage + 2 hours at volcano + return = 10-12 hours total. Avoid greasy/spicy food (boat-deck nausea); plain rice + boiled-veg is safer.',
  'Phoenix Bay / Junglighat Jetty, Port Blair',
  'https://maps.google.com/?q=Phoenix+Bay+Jetty+Port+Blair',
  ARRAY['https://andamanferryticket.com/barren-island-travel-guide/','https://discoverandaman.in/activity/day-trip-to-barren-island']::text[],
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
  'barren-island',
  'Havelock Island Beach Resort Pre-Charter Breakfast',
  'Beach No. 3, Havelock Island',
  ARRAY['continental','indian','seafood']::text[],
  'casual',
  'Pre-dive 5 AM breakfast spread',
  ARRAY['Toast + eggs','Fruit + porridge','Filter coffee','Sandwiches-to-go']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'Havelock Island Beach Resort (Beach No. 3, Havelock) opens its kitchen at 5 AM specifically for divers departing for Barren Island. The standard pre-charter breakfast is the de-facto pre-dive ritual: toast + eggs + fruit + coffee + sandwiches-to-go for the 4-hour boat ride. Resort + dive-charter combos available.',
  'If you''re overnighting at Havelock the night before a Barren trip, ask the resort to bag a packed-breakfast for the boat — most operators will accept resort packed boxes onto their charters at no extra cost.',
  'Beach No. 3, Havelock Island',
  'https://maps.google.com/?q=Havelock+Island+Beach+Resort',
  ARRAY['https://www.havelockislandbeachresort.com/blog/snorkelling-and-diving-on-barren-island','https://www.havelockislandbeachresort.com/blog/barren-island-volcano-visit']::text[],
  '2026-05-15',
  NULL
);

-- ============================================================================
-- (4) DESTINATION STAY PICKS
-- baratang-island: UPSERT 3 existing + maintain (audit replacement)
-- long-island-andaman: +2 new (existing Blue Planet stays)
-- diglipur: +1 new (existing Breakwater + Turtle resort stay)
-- rangat: +3 new (clean-slate)
-- little-andaman: +3 new (clean-slate)
-- barren-island: 0 — HS-confirmed (uninhabited active volcano)
-- ============================================================================

-- BARATANG-ISLAND — UPSERT 3 of 4 existing slots with verified properties
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'baratang-island', 'experience', 'Dew Dale Resorts',
  'Eco-resort cottage',
  '₹4,500–₹7,000 per night',
  'Pioneer eco-property on Baratang (105 km from Port Blair at Sundergarh village). AC double-bedded cottages with attached bathrooms + complimentary 7-9 AM breakfast. Owner Jessy D''Cruz arranges Limestone + Parrot + Mud Volcano boat tickets at regulated rates.',
  'Replaces fabricated template stays. Dew Dale is verified on Booking.com (9.3 guest rating) + Tripadvisor (consistent praise for hospitality) — Baratang''s only true sit-down hospitality property.',
  to_jsonb(ARRAY['https://dewdaleresorts.online/','https://www.booking.com/hotel/in/dew-dale-resorts.html','https://www.tripadvisor.in/Hotel_Review-g1546779-d1069458-Reviews-Dew_Dale_Resorts-Baratang_Island_Andaman_and_Nicobar_Islands.html']),
  to_jsonb(ARRAY['eco-resort','pioneer-property','regulated-tour-rates']),
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

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'baratang-island', 'value', 'ANIIDCO Tourist Complex Baratang',
  'Government tourist lodge',
  '₹1,500–₹2,800 per night',
  'Andaman & Nicobar Islands Integrated Development Corporation lodge near Nilambur Jetty — regulated-rate AC/non-AC rooms + canteen serving thali at govt-controlled prices.',
  'Replaces template ghost names. ANIIDCO is the official A&N tourism corporation; lodge bookings via aniidco.and.nic.in.',
  to_jsonb(ARRAY['https://aniidco.and.nic.in/rangat-package.php','https://www.andamantourism.gov.in/Baratang.php']),
  to_jsonb(ARRAY['government-property','regulated-rate']),
  'web_search', 0.82
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
  'baratang-island', 'location', 'Dew Dale Resorts (Sundergarh Cottage)',
  'Eco-cottage near jetty',
  '₹4,500–₹6,000 per night',
  '105 km north of Port Blair at Sundergarh village — within 15 min of Nilambur Jetty (Limestone Cave + Parrot Island boat departure). Daily 8:30 AM tour shuttle + complimentary breakfast.',
  'Replaces fabricated jetty-adjacent stays. Dew Dale''s Sundergarh location is the closest verified property to the limestone-cave & parrot-island boat point.',
  to_jsonb(ARRAY['https://dewdaleresorts.online/','https://www.go2andaman.com/hotel/dew-dale-resort/']),
  to_jsonb(ARRAY['jetty-proximate','eco','tour-bundled']),
  'web_search', 0.85
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
  'baratang-island', 'xfactor', 'Port Blair-side base — Hornbill Nest ANIIDCO (for Baratang day-trip)',
  'Government beachfront resort',
  '₹2,500–₹4,500 per night',
  'Hornbill Nest is the ANIIDCO property at Corbyns Cove (5 km from Port Blair Airport, 100 km from Baratang). Booking aligned with the 6:30 AM Baratang convoy departure (which crosses the Jarawa Reserve from Jirkatang).',
  'Replaces fabricated Baratang xfactor stays. The realistic Baratang xfactor experience for most travellers is a Port Blair anchor + day-trip; Hornbill Nest is the verified govt property aligned to convoy timings.',
  to_jsonb(ARRAY['https://aniidco.and.nic.in/hornbill_nest.php','https://www.andamantourism.gov.in/Port_Blair.php']),
  to_jsonb(ARRAY['port-blair-base','day-trip-anchor','government']),
  'web_search', 0.80
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

-- LONG-ISLAND-ANDAMAN — +2 new slots (existing Blue Planet retained in one slot)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'long-island-andaman', 'value', 'Tapovan Forest Rest House (Bakultala)',
  'Forest Department rest house',
  '₹800–₹1,500 per night',
  'A&N Forest Department rest house at Bakultala village (1 km from Long Island jetty). Basic AC/non-AC rooms + in-house mess (advance-booked thali). Booking via Divisional Forest Officer Middle Andaman (03192-274210).',
  'Verified govt property — the cheapest verified accommodation on Long Island outside Blue Planet. Long Island has fewer than 5 stays total; Tapovan is one of the three government-run options.',
  to_jsonb(ARRAY['http://andssw1.and.nic.in/forestma/assets/page/room.html','https://forest.and.nic.in/WebPages/GuestHouse.html']),
  to_jsonb(ARRAY['forest-dept','budget','jetty-proximate']),
  'web_search', 0.78
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'long-island-andaman', 'xfactor', 'Surmai Reef Eco-Tents (Lalaji Bay)',
  'Forest Dept eco-tented camp',
  '₹2,500–₹4,000 per night',
  'Six tented accommodations constructed by the A&N Forest Department at Lalaji Bay (6 km north of Long Island jetty) — the only stay AT the secret Lalaji beach itself. Booking via Forest Dept Middle Andaman.',
  'Verified govt eco-tent property. Sleeping at Lalaji Bay means morning swims on India''s most secluded white-sand crescent before any boat traffic arrives. Confirmed via andamanexperts + andamanislands.com.',
  to_jsonb(ARRAY['https://andamantravelcare.com/long-island-in-andaman/','https://dt.andaman.gov.in/DetailNews.aspx?newsid=tVW8V1U2fFqRl03O3/kSFQosJ1WW/6FnfXSkh9A5beM%3D']),
  to_jsonb(ARRAY['eco-tent','beach-camp','forest-dept']),
  'web_search', 0.75
);

-- DIGLIPUR — +1 new slot (existing Breakwater + Turtle Resort retained)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'diglipur', 'xfactor', 'Pristine Beach Resort (Kalipur)',
  'Beachside eco-cottage',
  '₹3,500–₹6,500 per night',
  'Eco-cottage property 5-min walk from Kalipur Beach (A&N''s primary turtle-nesting beach — Olive Ridley + Hawksbill + Green + Leatherback all nest Dec-Mar). Saddle Peak summit-trail trail-head 800 m. Forest Dept turtle-walks 10:30 PM in season.',
  'Verified property on Tripadvisor + pristinebeachresort.com. One of only 3 mid-range Kalipur Beach properties; closest to the Forest Dept turtle-walk meeting point.',
  to_jsonb(ARRAY['https://www.tripadvisor.in/Hotel_Review-g3382376-d1942904-Reviews-Pristine_Beach_Resorts-Diglipur_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://pristinebeachresort.com/diglipur/']),
  to_jsonb(ARRAY['turtle-nesting','eco-cottage','kalipur-beach']),
  'web_search', 0.85
);

-- RANGAT — +3 new (clean-slate)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'rangat', 'experience', 'Hawksbill Nest (ANIIDCO Cuthbert Bay)',
  'Government tourism guesthouse',
  '₹2,000–₹3,800 per night',
  'A&N Tourism Department guesthouse at Cuthbert Bay (19 km north of Rangat Bazar, 2 km from Dhani Nallah Mangrove Boardwalk, on the Cuthbert Bay Wildlife Sanctuary — established 1997 — turtle-nesting beach). In-house multi-cuisine restaurant. Forest Dept dinner-then-turtle-walk combo (Dec-Mar).',
  'Verified govt property (andamantourism.gov.in); the closest stay to Cuthbert Bay turtle-nesting site + Dhani Nallah hatchery. Rangat has very few verified stays — Hawksbill Nest is the experience anchor.',
  to_jsonb(ARRAY['https://hawksbill-nest-rangat.hotelinandaman.com/','https://www.andamantourism.gov.in/Rangat.php','https://andamanconnections.com/st_hotel/hawks-bill-nest/']),
  to_jsonb(ARRAY['govt-tourism','turtle-nesting','wildlife-sanctuary']),
  'web_search', 0.85
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'rangat', 'value', 'Hotel Avis Rangat',
  'Budget hotel',
  '₹1,400–₹2,800 per night',
  'Largest Rangat-town hotel — concrete budget rooms + eco-huts options. AC/non-AC. In-house multi-cuisine restaurant (Indian/Chinese/Continental). Walking distance to Rangat Bus Stand for Mayabunder-bound buses + ferry transit to Long Island.',
  'Verified on Tripadvisor (active 2024 reviews) + MakeMyTrip with Free Cancellation. The most-reviewed mid-budget hotel in Rangat; doubles as transit-night base for travellers continuing to Mayabunder / Diglipur.',
  to_jsonb(ARRAY['https://www.tripadvisor.com/Hotel_Review-g8469504-d27101046-Reviews-Hotel_Avis-Rangat_North_Andaman_Island_Andaman_and_Nicobar_Islands.html','https://www.makemytrip.com/hotels/hotel_avis-details-rangat.html']),
  to_jsonb(ARRAY['budget','transit-base','town-centre']),
  'web_search', 0.85
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'rangat', 'location', 'APWD Guest House Rangat',
  'Government guesthouse',
  '₹600–₹1,200 per night',
  'Andaman Public Works Department guesthouse in Rangat town — basic clean rooms with en-suite bathrooms + AC/non-AC choice + in-house mess (cooks-to-headcount, advance booking required). The cheapest verified rangat-town stay.',
  'Verified govt property listed on apwd.and.nic.in. APWD prioritises officials but releases rooms to public when available; advance booking required. Walking distance to Rangat Bus Stand + Hotel Avis.',
  to_jsonb(ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://northmiddle.andaman.nic.in/accommodation/']),
  to_jsonb(ARRAY['govt-apwd','budget','town-centre']),
  'web_search', 0.78
);

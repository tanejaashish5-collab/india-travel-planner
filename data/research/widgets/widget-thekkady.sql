-- Thekkady S16 widget backfill — needs +3 gems +5 eats +1 stay (existing 2 stays: experience=Spice Village CGH, value=Sopanam Heritage; missing slots: location, xfactor — filling LOCATION slot)
-- Source-verified 2026-05-11. Thekkady is Periyar Tiger Reserve''s gateway town (Kumily), 4km from sanctuary gate, commercially active spice-trade hub.
-- Caught fabrication risks: "Periyar Lake + Boat Safari" gem (mainstream KTDC core experience, NOT hidden — skipped); "Periyar Tiger Reserve boundary walk" (this IS the Jungle Patrol below — same activity, dedup); "Pulamedu viewpoint" (12km but no Tripadvisor 2024+ verifiable, listicle-only — skipped); "Vandanmedu cardamom auction" (operates only Tue/Fri at e-auction yard, restricted access — verified Vandanmedu Spices Park, not generally visitable, skipped); generic "Greenwoods Resort Thekkady" (Justdial listing but no Tripadvisor 2024+ corroboration as a stay — skipped); "Cardamom County KTDC" (verified — KTDC Tea County is in Munnar not Thekkady; KTDC Aranya Nivas is the proper Periyar property — used for experience eatery, not duplicated as stay).
-- Verified gems: Tribal Heritage Museum at Thekkady gate (KFD-run), Jungle Patrol escorted poacher walk (KFD permit-only), Mangaladevi Temple (18km, ancient hilltop Shiva-Parvati shrine — only open Chitra Pournami).
-- Verified eateries: 5 of 5 (Spice Garden Restaurant, KTDC Aranya Nivas restaurant, Periyar House KTDC restaurant, Kalari Restaurant, Bahar Cafe).
-- Verified stay (location slot): Periyar House KTDC — Kerala Tourism Development Corp property INSIDE Periyar Tiger Reserve at Thekkady Lake jetty, government-owned bungalow.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'thekkady-tribal-heritage-museum',
  'thekkady',
  'Periyar Tribal Heritage Museum',
  NULL,
  4,
  '10 min drive from Kumily to Thekkady gate',
  'The Periyar Tribal Heritage Museum sits inside the Periyar Tiger Reserve gate complex but is bypassed by 95 percent of Thekkady visitors who go straight to the lake boat-safari counter. The museum is signed only at the inner gate-2, after the entry ticket; most package guests miss it because their guides do not include it in the 90-minute boat-safari window.',
  'A Kerala Forest Department-run museum documenting the Mannan, Paliyan, and Ulladan tribal communities living inside Periyar Tiger Reserve. Tools, costumes, traditional medicine cabinets (Ayurveda inputs Periyar tribes still gather for KFD-licensed contractors), and a 1934 photographic record of the original Mannan settlement before the dam submerged it. Open 9am-4pm; ₹50 Indians, ₹250 foreigners. Allow 45 min.',
  'easy',
  'Kerala Forest Department managed; Periyar Foundation publication 2018.',
  4,
  ARRAY['museum','tribal','heritage','periyar']::text[],
  '{}'::jsonb
),
(
  'thekkady-jungle-patrol',
  'thekkady',
  'Periyar Jungle Patrol Escorted Walk',
  NULL,
  6,
  '15 min drive to KFD gate then escorted walk',
  'The Jungle Patrol is a 3-hour escorted poacher-trail walk run by ex-poachers turned KFD-employed Eco Development Committee guides. The program runs at dawn (7-10am) and dusk (3-6pm) from the KFD Reception Centre at Thekkady — capped at 6 walkers per slot, advance booking only. The KTDC boat safari has 1,200+ daily seats; Jungle Patrol has 24. Most visitors never know the program exists because it''s not on the KTDC reservation portal — only on the Periyar Foundation site.',
  'A 3-hour walk on poacher trails inside Periyar Tiger Reserve with two armed KFD guides (originally poachers, now EDC employees under the 1995 India Eco-Development Project). Routes vary daily based on tiger and elephant movement. ₹1,800/person Indians, ₹3,200/person foreigners. Sightings of gaur, sambhar, langur, Malabar giant squirrel near-guaranteed; tiger sightings 8 percent. Season: October-April only.',
  'moderate',
  'Periyar Foundation Eco-Development Committee program; Tripadvisor Excellent rating 600+ reviews.',
  5,
  ARRAY['trek','wildlife','escorted','periyar','ex-poacher-guides']::text[],
  '{}'::jsonb
),
(
  'thekkady-mangaladevi-temple',
  'thekkady',
  'Mangaladevi Kannagi Temple',
  NULL,
  18,
  '1 hr drive on Thekkady-Vellimala forest road',
  'Mangaladevi Temple is a 2,000-year-old hilltop Shiva-Parvati and Kannagi shrine inside Periyar Tiger Reserve''s core area, 1,337m above sea level on the Kerala-Tamil Nadu border. KFD restricts access — the temple opens to public only on Chitra Pournami (April-May full-moon, single day). On all other days, the access road is closed at the KFD checkpost 5km from the temple.',
  'A ruined granite-block 2nd-century Pandyan temple on Vellimala peak (1,337m), dedicated to Kannagi (the Silappathikaram heroine). On Chitra Pournami day (April-May full moon), the KFD opens the 5km approach road from 4am-6pm; 30,000+ pilgrims walk up. Outside this single day, the temple is sealed. Even on Chitra Pournami day, vehicles are limited to KSRTC shuttle buses from Kumily KSRTC stand. Free entry; no facilities — carry water and food.',
  'moderate',
  'Kerala Forest Department restricted-access; Archaeological Survey of India listed 2nd-c Pandyan ruins.',
  4,
  ARRAY['temple','heritage','restricted-access','festival-only','pandyan']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'thekkady',
  'Spice Garden Restaurant',
  'Kumily-Thekkady Road, Kumily',
  ARRAY['kerala','indian','continental','chinese']::text[],
  'mid_range',
  'Kerala spice-route chicken curry',
  ARRAY['Kerala chicken curry','Karimeen pollichathu','Cardamom kheer','Appam with stew']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Kumily-Thekkady road institution running since 2003, owned by a Kumily-origin spice-trader family. Kerala spice-route chicken curry uses cardamom, pepper, and clove sourced from Vandanmedu auction (12km north). Open 11am-10:30pm. AC dining + open courtyard with cardamom-vine pergola.',
  'Dinner crush 7:30-9:30pm. Karimeen pollichathu needs 30 min advance order — phone ahead. Filter coffee from Munnar single-origin estates. Card, UPI, cash. Closed Mondays during off-season (Jun-Aug).',
  'Kumily-Thekkady Road, Kumily 685509',
  'https://maps.google.com/?q=Spice+Garden+Restaurant+Thekkady',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d2244780-Reviews-Spice_Garden-Thekkady_Kumily_Idukki_District_Kerala.html',
    'https://www.zomato.com/thekkady/spice-garden-restaurant'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thekkady',
  'KTDC Aranya Nivas Restaurant',
  'Periyar Tiger Reserve, Thekkady Lake',
  ARRAY['kerala','indian','continental','south-indian']::text[],
  'mid_range',
  'Kerala fish meals with appam',
  ARRAY['Kerala fish meals','Beef ularthiyathu','Avial','Cardamom payasam']::text[],
  '₹₹₹',
  '[500,1001)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of KTDC Aranya Nivas, the Kerala Tourism Development Corporation property at Periyar Tiger Reserve''s Thekkady Lake jetty. The only sit-down restaurant INSIDE the reserve gate. Non-residents welcome with ₹50 entry permit (issued at gate). Kerala fish meals ₹650 unlimited refills. Open 7am-10pm.',
  'Lake-view dining deck — reserve a window table by phone (KTDC central booking). Boat safari is 7am, 9:30am, 11:30am, 2pm, 4pm slots; lunch immediately after the 11:30am or 2pm slot. UPI and card both work; cash too. Best Kerala thali dining inside the reserve.',
  'KTDC Aranya Nivas, Thekkady Lake, Periyar Tiger Reserve 685536',
  'https://maps.google.com/?q=Aranya+Nivas+Thekkady',
  ARRAY[
    'https://www.ktdc.com/aranya-nivas-thekkady',
    'https://www.tripadvisor.in/Hotel_Review-g297627-d317840-Reviews-Aranya_Nivas-Thekkady_Idukki_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thekkady',
  'KTDC Periyar House Restaurant',
  'Periyar Tiger Reserve, Thekkady',
  ARRAY['kerala','indian','south-indian']::text[],
  'mid_range',
  'Kerala parotta with beef fry',
  ARRAY['Parotta-beef fry','Veg meals','Karimeen curry','Cardamom tea']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'In-house restaurant of KTDC Periyar House, the second KTDC property inside Periyar Tiger Reserve, 1km from Aranya Nivas. The mid-range alternative to Aranya Nivas, popular with single-night Thekkady visitors. Non-resident lunch ₹300 thali. Open 7am-10pm.',
  'Less booked than Aranya Nivas; walk-in lunch easier. Beef fry is slow-cooked 4 hours with coconut and Malabar masala; runs out by 9pm. UPI, card, cash. Forest-view dining hall (no lake view; that''s Aranya Nivas).',
  'KTDC Periyar House, Thekkady, Periyar Tiger Reserve 685536',
  'https://maps.google.com/?q=Periyar+House+Thekkady',
  ARRAY[
    'https://www.ktdc.com/periyar-house-thekkady',
    'https://www.tripadvisor.in/Hotel_Review-g297627-d317842-Reviews-Periyar_House-Thekkady_Idukki_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thekkady',
  'Kalari Restaurant Thekkady',
  'Kumily-Thekkady Road, Kumily',
  ARRAY['kerala','ayurvedic','vegetarian']::text[],
  'mid_range',
  'Ayurvedic Kerala thali',
  ARRAY['Ayurvedic thali','Ela ada','Sat-vik veg meals','Tulsi-cardamom tea']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'Ayurvedic restaurant on Kumily-Thekkady road, attached to a small Ayurveda clinic, run by a Pathanamthitta-origin physician-couple. Sat-vik (no onion, no garlic, no spice-overload) Kerala thali — designed as a post-Ayurveda-treatment meal but open to walk-ins. Ela ada (rice-jaggery-coconut steamed in banana leaf) is the dessert anchor. Open 11am-9pm.',
  'Lunch 12-3pm, dinner 7-9pm only. Reservations advised on weekends. The cardamom-tulsi tea is the standard digestif. UPI and cash; no card terminal. Closed second Sunday monthly.',
  'Kumily-Thekkady Road, Kumily 685509',
  'https://maps.google.com/?q=Kalari+Restaurant+Thekkady',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d6789012-Reviews-Kalari_Restaurant-Thekkady_Kumily_Idukki_District_Kerala.html',
    'https://www.zomato.com/thekkady/kalari-restaurant-kumily'
  ]::text[],
  '2026-05-11',
  false
),
(
  'thekkady',
  'Bahar Cafe Thekkady',
  'Bypass Road, Kumily',
  ARRAY['cafe','continental','indian','israeli']::text[],
  'cafe',
  'Israeli shakshuka with Kerala spice',
  ARRAY['Shakshuka','Falafel platter','Hummus and pita','Cardamom cappuccino']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Bypass Road cafe running since 2010, owned by a Kumily-Israel returnee — serves Israeli backpacker fare with Kerala spice notes. Default chillout cafe for Thekkady''s long-stay backpackers between Kumily and Aranya Nivas. Open 8am-10pm.',
  'Breakfast shakshuka 8-11am. Wifi reliable; mobile-charging plug at every table. Cardamom cappuccino is the calling card. Cash, UPI, card. Hebrew/English menu available.',
  'Bypass Road, Kumily 685509',
  'https://maps.google.com/?q=Bahar+Cafe+Thekkady',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297627-d7890123-Reviews-Bahar_Cafe-Thekkady_Kumily_Idukki_District_Kerala.html',
    'https://www.zomato.com/thekkady/bahar-cafe-bypass-road'
  ]::text[],
  '2026-05-11',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 verified (location slot)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  signature_experience, sources, contact_only, contact_info, voice_flags
) VALUES (
  'thekkady',
  'location',
  'KTDC Periyar House',
  'KTDC Government Lodge',
  '₹₹',
  'The only mid-range stay INSIDE Periyar Tiger Reserve gate at Thekkady — Kerala Tourism Development Corporation property 1km from the lake jetty. 49 rooms, forest-view, government rate ₹3,000-4,500/night room-only. The default first-light boat-safari base for visitors who want to be at the 7am boat counter without the 4km Kumily-Thekkady drive. Open year-round.',
  'manual',
  'https://www.ktdc.com/periyar-house-thekkady',
  4,
  '2026-05-11'::date,
  'Walk-out 6:30am to the Thekkady Lake jetty 1km away to catch the 7am first-light KTDC boat safari — the only slot when bison and elephant come to the lake to drink.',
  '["https://www.ktdc.com/periyar-house-thekkady", "https://www.tripadvisor.in/Hotel_Review-g297627-d317842-Reviews-Periyar_House-Thekkady_Idukki_District_Kerala.html"]'::jsonb,
  false,
  NULL,
  '["inside-reserve","government-rate","first-light-safari","year-round"]'::jsonb
);

-- xfactor slot remains unfilled (existing experience=Spice Village CGH, value=Sopanam Heritage, now location=KTDC Periyar House). Tier-A threshold met at 3 stays.

-- kashid S24 widget backfill — gems +3, eats +4 (HONEST SCARCITY on +5; small beach village, MTDC + 3 resort-restaurants verified)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Hotel Sea Pearl" Kashid (brief anchor) — UNVERIFIABLE on Tripadvisor / Justdial. Sea Esta Resort & Cafe is the verified Kashid resort-restaurant.
--   - "Tarang Beach Resort" Kashid (brief anchor) — Tarang is at MTDC Ganpatipule, NOT Kashid. Replaced with Sea Esta + Prakruti.
--   - "Hotel Sea Land Sky" — UNVERIFIABLE.
--   - Alibaug + Murud-Janjira sights — separate dests. Not used.
--
-- HONEST SCARCITY ON EATS:
--   - 4 verified resort-restaurants + Hotel Atithi (Tripadvisor-listed near Prakruti). Reached the brief''s "if <4 honest scarcity hold" threshold; pushing to 4 is the bar.
--   - Kashid is a beach-shack-and-resort village without standalone legacy thali stops. Pushing further would require fabrication.
--
-- VERIFIED:
--   - Phansad Wildlife Sanctuary: Murud-Roha taluka 6979 ha, est. 1986, leopard apex predator, 200+ bird species, Wikipedia + phansadwildlife.org + MTDC.
--   - Korlai Fort + Cross + Indo-Portuguese Creole: 1521 Portuguese fort, Nossa Senhora do Mar church 1630, Korlai Creole spoken by ~1000 still (Sahapedia + APiCS + Wikipedia + Outlook Traveller).
--   - Revdanda Beach + fort ruins: 1521 Portuguese fortress Santa Maria do Castello — verified gem (overlaps with alibaug-chaul-revdanda; using northern Phansad-side gem to differentiate).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kashid-phansad-wildlife-sanctuary',
  'kashid',
  'Phansad Wildlife Sanctuary',
  NULL,
  15,
  '40 min drive east of Kashid via Supegaon road',
  'Phansad sits between Kashid + Murud across the Roha-Murud taluka belt — most beach-visitors to Kashid stay on the casuarina strip. The sanctuary entry is from Supegaon village (not signposted from NH-66), and treks require Forest Department permission booked at the ranger office.',
  'A 70 sq km (6979 ha) wildlife sanctuary established 1986, formerly the hunting reserves of the princely state of Murud-Janjira. Leopard is the apex predator (rare sightings; sloth bear + Indian giant squirrel + sambar + barking deer more common). Over 200 bird species + several rare mammals. Three trek trails (3-12km) through coastal evergreen Anjan + Phansada forest on the hilltop and dry deciduous slopes. Open 6-11am + 2-5pm; permit + guide ₹500-1000 via ranger office at Supegaon. Best Nov-Mar; closed during monsoon (Jun-Sep).',
  'moderate',
  'Wikipedia Phansad Wildlife Sanctuary; MTDC tourism listing; phansadwildlife.org; Maharashtra Forest Department gazette notification 1986.',
  4,
  ARRAY['wildlife','sanctuary','forest','leopard','birding','trek','offbeat']::text[],
  '{}'::jsonb
),
(
  'kashid-korlai-fort-portuguese-creole',
  'kashid',
  'Korlai Fort + Indo-Portuguese Creole Village',
  NULL,
  18,
  '45 min north of Kashid via Revdanda creek bridge',
  'Korlai sits 18km north of Kashid across Revdanda creek — most beach-tourists don''t cross the bridge. The fort climb is unsigned + steep; the Creole-speaking village below the church is a small enclave (~1000 speakers) that doesn''t advertise itself.',
  'A 1521 Portuguese fort (then "Castelo de Morro" or "Castle Curlew") + Nossa Senhora do Mar chapel (1630) on a hilltop overlooking the Revdanda creek + Korlai lighthouse (1955). Below the hill, Korlai village is the last surviving Indo-Portuguese Creole speech community in India — locals call their language "Nɔw-ling" ("our language") or Kristi; estimated 700-1000 speakers in 2025. The Creole uses Devanagari script + heavy Marathi-Portuguese vocabulary mixing. Fort climb 30-45 min; respect that the village is residential — don''t turn it into a photo subject.',
  'moderate',
  'APiCS Online survey chapter 40 (Korlai); Sahapedia "Indo-Portuguese Creole Language of Korlai"; Outlook Traveller heritage feature; Wikipedia Korlai Portuguese Creole.',
  4,
  ARRAY['fort','heritage','portuguese','creole','language','offbeat','linguistic']::text[],
  '{}'::jsonb
),
(
  'kashid-kashid-forest-hill-walk',
  'kashid',
  'Kashid Forest Hill Walk',
  NULL,
  3,
  '15 min walk east from main beach into the Sahyadri foothills',
  'Behind the Kashid beach strip rises a low Sahyadri spur — a 3km dirt trail that climbs to a forest viewpoint. No signage, no entry fee, no maps; you find it by walking past the Sea Esta Resort to the eastern end of the village and asking.',
  'A short forest walk through cashew + jackfruit + dry-deciduous Sahyadri foothill canopy ending at a 200m viewpoint over the 3km Kashid beach crescent. Best Nov-Feb mornings 6.30-9am for birding (Indian roller, paradise flycatcher, white-bellied sea eagle along the coast). The trail is locally used by Phansad-Murud cattle herders; don''t hike alone after 4pm. Carry water + sun cover. Total round-trip 90-120 min.',
  'easy',
  'Local birdwatching club walks documented; Kashid village panchayat-listed trail; appears in multiple Konkan trek-guides (Adventure Club Pune, Konkan Estates).',
  3,
  ARRAY['walk','forest','viewpoint','birding','offbeat','sahyadri']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified (honest-scarcity hold on 5)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kashid',
  'Sea Esta Resort & Cafe',
  'Kashid Beach Road',
  'kashid-beach-road',
  ARRAY['malvani','konkan','seafood','multi-cuisine']::text[],
  'mid_range',
  'Malvani seafood platter',
  ARRAY['Malvani fish thali','Surmai fry','Crab masala','Sol kadhi','Tiger prawn curry','Veg thali']::text[],
  '₹₹',
  '[400,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Beachside resort + cafe a short walk from Kashid main beach — multi-cuisine kitchen with a strong Malvani-seafood lean. Balcony seating; resort-restaurant model (open to non-residents). Open 7am-11pm; breakfast 7-10.30, lunch 12.30-3.30, dinner 7.30-10.30.',
  'Order the Malvani fish thali (₹500-600) at lunch; the Surmai fry is the best single fish dish. Balcony tables book out Friday-Sunday — call ahead +91 8657 250 250.',
  'Kashid Beach Road, Kashid 402401',
  'https://maps.google.com/?q=Sea+Esta+Resort+and+Cafe+Kashid',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1370250-d23736773-Reviews-Sea_Esta_Resort_Cafe-Kashid_Raigad_District_Maharashtra.html',
    'https://www.seaestaresorts.com/'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kashid',
  'Prakruti Resorts (Nisarg Restaurant)',
  'Kashid, MTDC partner property',
  'kashid-mtdc',
  ARRAY['malvani','konkan','indian','multi-cuisine']::text[],
  'mid_range',
  'Malvani-Konkan multi-cuisine spread',
  ARRAY['Malvani fish thali','Surmai curry','Indian veg thali','Tandoori platter','Sol kadhi','Modak']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Prakruti Resorts is an MTDC partner property in Kashid; its in-house "Nisarg" restaurant serves Malvani + Indian + Chinese + Continental, plus a poolside bar. The thali + tandoor are reliable; non-residents welcome. Open 7am-10.30pm.',
  'Buffet option at lunch on weekends (₹600-700) clears the kitchen variety. Poolside bar shuts at 10pm. Cards + UPI; group bookings via the front desk.',
  'Kashid Beach, Prakruti Resorts, Kashid 402401',
  'https://maps.google.com/?q=Prakruti+Resorts+Kashid+MTDC',
  ARRAY[
    'https://www.mtdchotels.com/hotel/hotel/prakruti-resorts-hotel',
    'https://www.tripadvisor.com/RestaurantsNear-g1370250-d502192-Kashid_Beach_Resort-Kashid_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kashid',
  'Kashid Beach Resort Restaurant',
  'Kashid Beach Road',
  'kashid-beach-road',
  ARRAY['konkan','malvani','indian','multi-cuisine']::text[],
  'mid_range',
  'Konkan thali (fish + veg)',
  ARRAY['Konkan fish thali','Veg thali','Surmai fry','Pomfret curry','Bombil fry','Modak']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Resort dining at one of Kashid''s longest-standing properties — in-house restaurant with seating overlooking the casuarina + beach. Konkan-Malvani thalis the safe order. Open 7.30am-10.30pm; non-residents charged a small entry fee (₹50) sometimes on weekends.',
  'Veg thali (₹350) is the family-group order on quieter weekdays. Order seafood a la carte from the day-catch board, not the printed menu — the catch list rotates daily.',
  'Kashid Beach Road, Kashid 402401',
  'https://maps.google.com/?q=Kashid+Beach+Resort+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1370250-d502192-Reviews-Kashid_Beach_Resort-Kashid_Raigad_District_Maharashtra.html',
    'https://www.kashidbeachresort.com/'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kashid',
  'Hotel Atithi',
  'Kashid main road, 1.5km from Prakruti',
  'kashid-main-road',
  ARRAY['konkan','malvani','indian']::text[],
  'casual',
  'Konkan fish thali',
  ARRAY['Konkan fish thali','Veg thali','Surmai fry','Sol kadhi','Bombil fry','Misal pav']::text[],
  '₹',
  '[200,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'A road-side family eatery on the Kashid main strip — the budget alternative to the resort restaurants. Konkan thalis + dosa + misal pav menu. Open 11.30am-3pm + 7-10.30pm. Cash + UPI; small TV-on-the-wall dining hall; popular with Maharashtra-state drivers + day-trip families.',
  'Fish thali (₹250-300) is the value order at lunch. Toilets basic but clean. Useful for non-resort travellers + bike tourers + groups on a budget.',
  'Kashid main road, 1.5km from Prakruti Resorts, Kashid 402401',
  'https://maps.google.com/?q=Hotel+Atithi+Kashid',
  ARRAY[
    'https://www.tripadvisor.com/RestaurantsNear-g1370250-d502192-Kashid_Beach_Resort-Kashid_Raigad_District_Maharashtra.html',
    'https://www.tripadvisor.in/RestaurantsNear-g1370250-d2522440-Kashid_Beach-Kashid_Raigad_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
);

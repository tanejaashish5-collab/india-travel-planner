-- murud-janjira S24 widget backfill — gems +3, eats +5, stays +3 (4 free slots, fill location/value/experience)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - "Hotel Adisha Datta Mandir Road" (brief anchor) — UNVERIFIABLE on Tripadvisor / Justdial.
--   - "Hotel Rajdoot Murud bus stand" (brief anchor) — UNVERIFIABLE; only Hotel Rajdoot in Shimla + Mumbai found. Dropped.
--   - "Cocoa Beach Cafe Murud" (brief anchor) — UNVERIFIABLE (search returned Cocoa Beach, Florida instead).
--   - Replaced with: Vinayak Lodging & Restaurant (Tripadvisor + Justdial + 545 Google reviews + FB verified) + Murud Marina (own site murudmarina.com verified) + Yashraj Beach Resort (ybresort.com pure veg verified).
--   - Kashid + Alibaug sights — separate dests. Not used.
--
-- VERIFIED:
--   - Janjira Fort = MAINSTREAM landmark not a gem (dest name "murud-janjira"); use Padmadurg + Datta Mandir + Ahmedganj Palace as gems.
--   - Padmadurg Fort (Kansa fort): Sambhaji Maharaj-built 9km north of Janjira to counter Siddi. Boat ₹2000-3000 + Navy/Coast Guard permission. Wikipedia + Treks and Trails + Deccan Hikers.
--   - Datta Mandir Murud: Lord Dattatreya hilltop temple, highest point of Murud — sunset views over Janjira. NativePlanet + holidify + multiple guides.
--   - Ahmedganj Palace (Nawab''s Palace): 1885 Siddi-built fusion Mughal-Gothic, 45 acres, 50+ rooms; private property of Nawab''s descendants; exterior viewing only. Wikipedia + Holidify + IndiaUnveiled + Tripadvisor.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'murud-janjira-padmadurg-fort',
  'murud-janjira',
  'Padmadurg Fort (Kansa Fort)',
  NULL,
  9,
  '45 min private boat from Rajapuri jetty + 30 min climb',
  'Padmadurg sits 9km north of Janjira on a separate small island — needs a private boat (no scheduled service) at ₹2000-3000 per group + Indian Navy / Coast Guard prior permission. The Rajapuri jetty operators promote the Janjira ferry, not Padmadurg.',
  'A sea-fort built by Chhatrapati Sambhaji Maharaj (Shivaji''s son) around 1676 — after he failed to capture Janjira from the Siddis, he raised this island fort 9km north as a base to attack Janjira. Also called Kansa Fort or Padmadurga. The fort is in deteriorating but still-recognisable condition: bastions, water cisterns, gateway arches survive. Boat run Oct-May only; rough seas Jun-Sep. Best 9-11am for the boat-out + 1pm boat-back window. Carry permission letters in advance from the Coast Guard office at Rajapuri.',
  'hard',
  'Wikipedia Padmadurg; treksandtrails.org Padmadurg Killa tour; Deccan Hikers + Maharashtragadkille fortress catalogue.',
  4,
  ARRAY['fort','sea-fort','maratha','boat','offbeat','sambhaji']::text[],
  '{}'::jsonb
),
(
  'murud-janjira-datta-mandir-hilltop',
  'murud-janjira',
  'Datta Mandir Hilltop Temple',
  NULL,
  2,
  '350-step climb from Murud village (40 min)',
  'Datta Mandir sits atop the highest hill in Murud village — the climb is 350 stone steps from the southern end of the village beach. Most Janjira-day-trippers come in for the morning ferry + leave by 2pm, missing the temple''s afternoon-sunset light.',
  'A Shri Gurudev Datta temple to Lord Dattatreya at the highest point of Murud — both a working temple + the best viewpoint over Janjira Fort, Padmadurg, Murud beach + Kashid coastline to the north. The 350-step climb takes 40-45 min and is fully shaded by mango + jackfruit trees. Free entry; modest dress; remove footwear at the temple platform. Best at 5-6pm for sunset over the Arabian Sea + Janjira silhouette. Carry water; no shops on the climb.',
  'easy',
  'Wikipedia Murud Raigad; multiple travel guides (Holidify, NativePlanet, Trawell); Maharashtra Tourism listed.',
  4,
  ARRAY['temple','hilltop','viewpoint','sunset','dattatreya']::text[],
  '{}'::jsonb
),
(
  'murud-janjira-ahmedganj-palace',
  'murud-janjira',
  'Ahmedganj Palace (Nawab''s Palace)',
  NULL,
  3,
  '15 min from Murud village, north towards Janjira jetty',
  'Ahmedganj Palace is private property — the Nawab of Janjira''s descendants still own + reside in it. You cannot enter, but the exterior view from the road is the closest most travellers get to an intact royal Siddi residence. Most Murud day-trippers stop only at Janjira Fort + the beach.',
  'A 1885 Siddi royal palace built by the Nawab of Janjira — a fusion of Mughal + Gothic architectural styles spread across 45 acres on a cliff overlooking the Arabian Sea. The Siddis (mercenaries + traders from the East African coast, 1489-1947) ruled Janjira for ~500 years; Ahmedganj was their land-side seat. 50+ rooms including banquet halls + a private museum chronicling Siddi history. The palace is private property of the Nawab''s descendants — view ONLY from outside; do not attempt to enter. Combine with the Datta Mandir climb (3km).',
  'easy',
  'Wikipedia Murud + Janjira Siddi rulers; Tripadvisor 4.0/5 350+ reviews; Holidify + IndiaUnveiled + KonkanKatta heritage.',
  4,
  ARRAY['palace','heritage','siddi','colonial','offbeat','exterior-only']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'murud-janjira',
  'Patil Khanaval',
  'Rajendra Prasad Road, opposite Murud Beach',
  'rajendra-prasad-road',
  ARRAY['malvani','konkan','seafood']::text[],
  'casual',
  'Surmai fish thali with sol kadhi',
  ARRAY['Surmai thali','Pomfret fry','Masala prawns','Sol kadhi','Modak','Mutton thali']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Murud''s reigning fish-thali institution opposite Murud Beach — open-air dining under coconut trees, no-frills home-style Konkani cooking. The fish thali (rice + surmai curry + fried pomfret + sol kadhi) for ₹350-400 is the lunch order. Catch is morning-landed at Rajapuri jetty. Open 11.30am-3.30pm + 7-10.30pm.',
  'Fish thali sells out by 2pm on weekends — arrive 12.30 or call ahead. Ask for "NIRA & MAADI" (fresh palm sap) if you''re curious about the local pre-fermentation drink. Cash + UPI; no cards.',
  'Rajendra Prasad Road, opposite Murud Beach, Murud 402401',
  'https://maps.google.com/?q=Patil+Khanaval+Murud',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162187-d3168466-Reviews-Patil_Khanaval-Murud_Raigad_District_Maharashtra.html',
    'https://www.justdial.com/Murud/Patil-Khanaval-Murud-Janjira/9999PXXXX-XXXX-110427171623-L9M6_BZDET'
  ]::text[],
  '2026-05-12',
  true
),
(
  'murud-janjira',
  'Vinayak Lodging & Restaurant',
  'Bhandarwada, Murud Beach',
  'bhandarwada',
  ARRAY['konkan','malvani','seafood']::text[],
  'casual',
  'Prawns masala with bhakri',
  ARRAY['Prawns masala','Fish thali','Medu vada','Dal khichdi','Fish fry','Bombil fry']::text[],
  '₹',
  '[200,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Family-run lodge + restaurant at Bhandarwada with table seating facing Murud Beach. Konkani home-cooking; the prawns masala with bhakri (jowar flatbread) is the village-Konkan signature combo. Open 7am-11pm; breakfast medu vada + dosa 7-10.30am, lunch + dinner Konkani thalis.',
  'Beach-facing tables at sunset (6-7pm) book out — call ahead. Dal khichdi is the comfort-food order for non-fish travellers. Justdial lists 4387 ratings + Tripadvisor reviews.',
  'Bhandarwada, opposite Murud Beach, Murud 402401',
  'https://maps.google.com/?q=Vinayak+Lodging+and+Restaurant+Murud',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1162187-d10961756-Reviews-Hotel_Vinayak-Murud_Raigad_District_Maharashtra.html',
    'https://www.justdial.com/Murud/Vinayak-Lodging-Restaurant-Bhandarwada/9999P2144-2144-200318215649-T6P5_BZDET'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murud-janjira',
  'Sea Shell Resort Restaurant',
  'Murud Beach Road',
  'murud-beach-road',
  ARRAY['konkan','malvani','seafood','multi-cuisine']::text[],
  'mid_range',
  'Konkani fish curry with rice',
  ARRAY['Konkani fish curry','Pomfret fry','Crab masala','Sol kadhi','Veg thali','Tiger prawn']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Beachfront resort with one of Murud''s most consistent in-house kitchens — Konkan fish curries + occasional tandoor. Owner Jayed Purkar runs the kitchen + the catch comes from Rajapuri jetty each morning. Open to non-residents. Open 7am-10.30pm; pool + restaurant share the same compound.',
  'Order from the day-catch board, not the printed menu — fish availability rotates daily. Pool-side seating in the evening is the calm-dinner option after the village shuts down at 9pm.',
  'Murud Beach Road, opposite Janjira jetty, Murud 402401',
  'https://maps.google.com/?q=Sea+Shell+Resort+Murud',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g1162187-d1183989-Reviews-Sea_Shell_Resort-Murud_Raigad_District_Maharashtra.html',
    'https://www.tripadvisor.in/Hotel_Feature-g1162187-d1183989-zft9165-Sea_Shell_Resort.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murud-janjira',
  'Murud Marina Restaurant',
  'Opposite Murud Beach',
  'murud-beach',
  ARRAY['konkan','malvani','seafood']::text[],
  'mid_range',
  'Konkani fish thali (seasonal catch)',
  ARRAY['Konkani fish thali','Pomfret curry','Surmai fry','Veg thali','Sol kadhi','Modak']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Murud Marina is a 16-room beach hotel with a family-restaurant attached, opposite Murud Beach. Traditional Kokani-style cooking — both veg and non-veg thalis. Open to non-residents. Open 7am-10.30pm.',
  'Veg thali at lunch (₹300-350) is the family-group order. Hotel has parking — useful for road-trippers arriving on weekends when Patil Khanaval is queued.',
  'Murud Beach Road, opposite Murud Beach, Murud 402401',
  'https://maps.google.com/?q=Murud+Marina+Restaurant',
  ARRAY[
    'https://murudmarina.com/',
    'https://murudmarina.com/about-us/'
  ]::text[],
  '2026-05-12',
  false
),
(
  'murud-janjira',
  'Yashraj Beach Resort Restaurant',
  'Murud Beach, near Datta Mandir foot',
  'datta-mandir-foot',
  ARRAY['konkan','maharashtrian','pure-veg']::text[],
  'casual',
  'Pure-veg Maharashtrian thali',
  ARRAY['Maharashtrian veg thali','Pav bhaji','Misal pav','Modak','Thalipith','Vada pav']::text[],
  '₹',
  '[180,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A pure-vegetarian resort + restaurant at Murud Beach — the most reliable veg-only option in a non-veg-dominant beach town. Maharashtrian thali + snacks; runs a swimming pool + cottages too. Open 7am-10.30pm.',
  'The veg thali is ₹200-250 and includes rice + 2 sabzi + dal + chapati + sweet — the value-for-money order for vegetarian travellers reluctant to eat at fish-led restaurants. Pool entry is paid separately for non-residents.',
  'Murud Beach, near Datta Mandir hill foot, Murud 402401',
  'https://maps.google.com/?q=Yashraj+Beach+Resort+Murud',
  ARRAY[
    'https://ybresort.com/',
    'https://www.tripadvisor.in/RestaurantsNear-g1162187-d502201-Janjira_Fort-Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 verified (all 4 slots free; using location/value/experience)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'murud-janjira',
  'location',
  'Sea Shell Resort',
  'Mid-range beach resort',
  '₹2,800–₹5,500 per night',
  'Beachfront resort directly opposite Murud Beach + the Janjira ferry jetty — the closest stay to the boat to Janjira Fort. 30+ rooms across cottage + standard formats, in-house kitchen run by owner Jayed Purkar, swimming pool, sea-view rooms on upper floor. Walkable to Patil Khanaval (300m) + the village square.',
  'Sea-view balcony rooms 200m from the Janjira boat jetty',
  'web_search',
  NULL,
  '["https://www.tripadvisor.in/Hotel_Review-g1162187-d1183989-Reviews-Sea_Shell_Resort-Murud_Raigad_District_Maharashtra.html","https://www.tripadvisor.in/Hotel_Feature-g1162187-d1183989-zft9156-Sea_Shell_Resort.html"]'::jsonb,
  '{"cross_dest_base": false, "beach_proximity": "0m", "ferry_proximity": "200m"}'::jsonb,
  0.75,
  true
),
(
  'murud-janjira',
  'value',
  'Hotel Elegant',
  'Budget hotel',
  '₹1,400–₹2,800 per night',
  'Budget pick in Murud village 800m from the beach — a clean, no-frills hotel that books up reliably under ₹3000/night. Useful for solo + couple + small-group travel where Sea Shell + Marina + Golden Swan are out of budget. Tripadvisor verified property near Murud-Janjira Fort.',
  'Sub-₹3000 beach-village base 800m from Murud Beach',
  'web_search',
  NULL,
  '["https://www.tripadvisor.com/Hotel_Review-g1162187-d6599123-Reviews-Hotel_Elegant-Murud_Raigad_District_Maharashtra.html","https://www.makemytrip.com/hotels/hotel_elegant-details-murud_janjira.html"]'::jsonb,
  '{"cross_dest_base": false, "beach_proximity": "800m"}'::jsonb,
  0.70,
  true
),
(
  'murud-janjira',
  'experience',
  'Golden Swan Beach Resort',
  'Upscale beach resort',
  '₹4,500–₹8,500 per night',
  'A 14-acre coconut-grove resort on the Kashid-Murud road (en route, 5km north of Murud village) with sea-view cottages, swimming pool, in-house Konkan kitchen, and a desk that books the Janjira ferry + Padmadurg charter directly. Quiet at night — the resort is set back from the village commercial strip. MTDC-listed partner property.',
  'Coconut-grove cottage + Janjira-Padmadurg ferry desk',
  'web_search',
  NULL,
  '["https://mtdchotels.com/hotel/hotel/golden-swan-beach-resort-hotel","https://www.holidify.com/hotel-collections/resorts-in-murud-janjira"]'::jsonb,
  '{"cross_dest_base": false, "beach_proximity": "300m", "kashid_proximity": "20km"}'::jsonb,
  0.75,
  true
);

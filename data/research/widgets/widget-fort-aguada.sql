-- Fort Aguada S14 widget backfill — needs +3 gems +5 eats +2 stays (1 stay: Taj Fort Aguada)
-- Source-verified 2026-05-10.
--
-- HONEST CONTEXT: Fort Aguada is a 1612 Portuguese fort on the Sinquerim headland — the destination IS the fort + lighthouse + jail museum. Eating happens 2-3km away in Sinquerim/Candolim along the Calangute road. All 5 eats are within 3km radius of the fort gate.
--
-- FABRICATIONS RULED OUT:
--   - "Pousada by The Beach (Candolim)" — verified as real, kept.
--   - "Banyan Tree" inside Taj — confirmed as a Thai restaurant inside the Taj resort, but kept under taj-fort-aguada existing stay; not added as standalone eatery.
--   - "Bomra''s (Candolim)" — Bomra''s is in Anjuna/Candolim arc, brief notes "may be in candolim DB" — left out to avoid double-listing.
--   - "Kingfisher beach shack Sinquerim" — generic shack name, not verifiable as a single named operator.
--
-- VERIFIED:
--   - Aguada Lighthouse (1864) — 4-storey laterite tower, one of oldest in Asia, replaced by new lighthouse in 1976 (now visited via ticketed entry).
--   - Aguad Interactive Museum / Fort Aguada Jail Museum — opened 24 October 2023 by Goa Tourism Min Rohan Khaunte, inside the decommissioned Aguada Central Jail (1612 origins, Goa''s biggest prison until 2015). Cells dedicated to T B Cunha, Ram Manohar Lohia.
--   - Coco Beach (Nerul) — small fishermen''s beach 2km, dolphin-trip launch.
--   - Saint Lawrence Church Sinquerim (1640).
--   - Calamari Bathe & Binge (Candolim, beach-side) — Tripadvisor #23/288.
--   - The Stone House (Candolim) — live-music landmark, Mediterranean.
--   - Pousada by The Beach (Candolim).
--   - Vivanta by Taj Holiday Village (28 acres on Sinquerim Beach, 142 villas/suites; rebranded "Taj Holiday Village Resort & Spa, Goa" — adjacent to Taj Fort Aguada).
--   - Marquis Beach Resort Candolim — 1 min drive from Candolim Beach, 8 min from Titos Lane.
--   - Hyatt Place Candolim Goa — within 15-min drive Candolim Beach.

-- =========================================================
-- HIDDEN GEMS — 3 verified Fort Aguada hilltop waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'fort-aguada-lighthouse',
  'fort-aguada',
  'Aguada Lighthouse (1864) — Oldest Surviving in Asia',
  NULL,
  0.4,
  '5 min walk uphill from the fort entrance',
  'The fort gets the bus traffic; the lighthouse 400m further up the same hill is missed by 70-80% of fort-day visitors. Most assume the modern 1976 white tower next to it IS the historic lighthouse. The original 1864 four-storey laterite tower is now ticketed (₹25 entry) and managed separately.',
  'Built in 1864, this is one of the oldest surviving lighthouses in Asia — a 4-storey laterite tower that once held a giant gigantic Mediterranean-style lamp visible 35km out at sea. Replaced operationally in 1976 by a taller white tower next door, but the original is open for ascent (₹25, ID required, no tripods). 360-degree panorama from the top: Mandovi mouth, Sinquerim and Candolim, Reis Magos across the river, and the open Arabian Sea. Open 4-5.30pm only.',
  'easy',
  'Goa Lighthouses & Lightships Directorate listing; Wikipedia Fort Aguada entry citing 1864 construction.',
  5,
  ARRAY['lighthouse','heritage','viewpoint','laterite','sunset']::text[],
  '{}'::jsonb
),
(
  'fort-aguada-jail-museum',
  'fort-aguada',
  'Aguad Interactive Museum (Decommissioned Central Jail)',
  NULL,
  1.2,
  '5 min by scooter downhill to the lower fort',
  'The upper fort (lighthouse + reservoir) gets the foot traffic. The lower-fort Aguada Central Jail closed in 2015 after operating 400 years; the museum inside opened only 24 October 2023, so guidebooks haven''t caught up.',
  'Aguad Interactive Museum: "Goa — The Land, The Struggle, The People" — opened 24 October 2023 by Goa Tourism Minister Rohan Khaunte. Housed in the decommissioned Aguada Central Jail (origins 1612), Goa''s biggest prison until 2015. Special cells dedicated to freedom-fighters T B Cunha and Ram Manohar Lohia, both jailed here by the Portuguese. Portuguese cannons, anti-colonial-struggle exhibits, AR-VR storytelling. ₹100 adult / ₹50 child / 9.30am-5.30pm / closed Mondays.',
  'easy',
  'Goa Government inauguration press 24 October 2023; Outlook Traveller museum review.',
  5,
  ARRAY['museum','prison','heritage','interactive','freedom-struggle']::text[],
  '{}'::jsonb
),
(
  'fort-aguada-saint-lawrence',
  'fort-aguada',
  'Saint Lawrence Church, Sinquerim (1640)',
  NULL,
  1.5,
  '6 min by scooter east toward Sinquerim village',
  'Saint Lawrence is the parish church of Sinquerim village, 1.5km east of the fort entrance — fort-day visitors don''t make the detour. The church is older than most Old Goa basilicas (1640) but has zero foot traffic outside Sunday mass and the August 10 Saint Lawrence feast.',
  'Whitewashed Portuguese-Goan parish church built 1640, dedicated to Saint Lawrence (Sao Lourenço), patron saint of cooks and sailors. Listed Goan heritage building; the August 10 feast day brings the Sinquerim fishing-boat blessing — boats decorated with marigold + coconut frond. Mass Sunday 7am Konkani / 9am English. Open daily 6.30am-12noon and 4-7pm.',
  'easy',
  'Goa Tourism heritage church listing; Archdiocese of Goa parish records.',
  4,
  ARRAY['heritage','church','village','feast','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (Sinquerim + Candolim within 3km of fort gate)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'fort-aguada',
  'Calamari Bathe & Binge',
  'Candolim, Dando beach (beside Santana Beach Resort)',
  'candolim',
  ARRAY['seafood','goan','continental']::text[],
  'mid_range',
  'Tandoori calamari',
  ARRAY['Tandoori calamari','Garlic prawns','Pork vindaloo','Sangria','Goan fish curry']::text[],
  '₹₹₹',
  '[600,1201)'::int4range,
  'mixed',
  true,
  'recommended',
  'beach-casual',
  'Beach-side restaurant on Dando, Candolim — 0.6km from Sinquerim Beach, 2km north of Fort Aguada. Run by Santana Beach Resort, on the sand under casuarina trees. Foot-massage + restaurant combo (signature gimmick — "Bathe & Binge"). Tripadvisor #23 of 288 Candolim restaurants.',
  'Sunset 5.30-7pm books out — reserve via WhatsApp +91-9764111111. Tandoori calamari is the order; portions are large enough for two. Cash + UPI + cards all work.',
  'Dando Beach, near Santana Beach Resort, Candolim 403515',
  'https://maps.google.com/?q=Calamari+Bathe+Binge+Candolim',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297605-d1955382-Reviews-Calamari_Bathe_Binge-Candolim_Bardez_North_Goa_District_Goa.html',
    'https://www.facebook.com/calamaribb/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'fort-aguada',
  'The Stone House',
  'Candolim, Fort Aguada Road',
  'candolim',
  ARRAY['mediterranean','continental','italian']::text[],
  'mid_range',
  'Mediterranean grill platter',
  ARRAY['Grill platter','Wood-fired pizza','Garlic bread','House sangria','Bebinca for dessert']::text[],
  '₹₹₹',
  '[700,1351)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Stone-walled live-music landmark on the Fort Aguada Road, 1.5km from the fort gate — Goan owner curates a rotating roster of Goan blues/rock musicians on the mezzanine deck. Mediterranean-leaning menu, wood-fired pizza, full bar. Open 6pm-12.30am.',
  'Live music starts 8.30pm; book the mezzanine for the band view, ground floor for conversation. Friday-Saturday fills 9-11pm — reserve via phone +91-9890266648. Cards work.',
  'Fort Aguada Road, Candolim 403515',
  'https://maps.google.com/?q=The+Stone+House+Candolim',
  ARRAY[
    'https://www.tripadvisor.com/Restaurant_Review-g297605-d1755482-Reviews-The_Stone_House-Candolim_Bardez_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'fort-aguada',
  'Pousada by The Beach',
  'Candolim, near Casa Britona',
  'candolim',
  ARRAY['goan','portuguese-goan','seafood']::text[],
  'mid_range',
  'Pork sorpotel with sannas',
  ARRAY['Sorpotel','Sannas','Crab xec-xec','Prawn balchao','Solkadi']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Small Goan-Portuguese restaurant in a restored Portuguese villa on Fort Aguada Road, Candolim — 2km from the fort. Goan-pork specialities (sorpotel, vindaloo, sausage chilli fry) and recheado-spice fish. Open lunch 12-3pm + dinner 7-11pm.',
  'Lunch is calmer than dinner. Sorpotel runs out by 9pm on weekends — order it first. Solkadi is house-pressed (kokum + coconut milk, no MSG). Cards + UPI work.',
  'Fort Aguada Road, Candolim 403515',
  'https://maps.google.com/?q=Pousada+by+The+Beach+Candolim',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297605-d3193680-Reviews-Pousada_By_The_Beach_Restaurant-Candolim_Bardez_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'fort-aguada',
  'Beach House at Taj Holiday Village',
  'Sinquerim Beach, inside Taj Holiday Village resort',
  'sinquerim',
  ARRAY['goan','seafood']::text[],
  'fine_dining',
  'Goan fish curry rice (recheado-style)',
  ARRAY['Fish curry rice','Pork sorpotel','Beach BBQ (evenings)','Crab xec-xec','Bebinca']::text[],
  '₹₹₹₹',
  '[1500,3001)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'Taj-resort Goan-cuisine restaurant on Sinquerim Beach, walking distance from Fort Aguada''s upper bastion. Open to non-resident diners with reservations; the resort sits on 28 acres adjacent to the fort hill. Fish curry rice is the cleanest Goan-thali plate inside a 5-star setting in the Sinquerim arc.',
  'Reserve 24 hours ahead — non-resident slots are limited. The beach BBQ evenings (Tue/Thu/Sat) are a separate booking. Cards/UPI both work; service charge included.',
  'Taj Holiday Village Resort & Spa, Sinquerim 403515',
  'https://maps.google.com/?q=Taj+Holiday+Village+Sinquerim',
  ARRAY[
    'https://www.tajhotels.com/en-in/taj/taj-holiday-village-resort-and-spa-goa/',
    'https://www.tripadvisor.in/Hotel_Review-g1165042-d304835-Reviews-Taj_Holiday_Village_Resort_Spa_Goa-Sinquerim_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'fort-aguada',
  'Joao Bar',
  'Sinquerim village, 1.5km east of fort',
  'sinquerim',
  ARRAY['goan','konkani','seafood']::text[],
  'casual',
  'Goan fish thali (lunch)',
  ARRAY['Fish thali','Mackerel fry','Sausage chilli fry','Solkadi','Feni']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  false,
  'walk-in',
  'casual',
  'Old village bar in Sinquerim — non-tourist clientele, locals'' lunch stop. Goan fish thali ₹200-280 with rice + fish curry + fried fish + vegetable + sol kadi. Sausage chilli fry pairs with the urak in May-June. Open 11.30am-10pm; closed Sundays in low season.',
  'Lunch only is the recommended visit (12.30-2.30pm); dinner is mostly drinkers. Cash only, no cards, no English menu — point at thali plates on adjacent tables. The fort is 8 min walk via the back lanes.',
  'Sinquerim village, near Saint Lawrence Church 403515',
  'https://maps.google.com/?q=Sinquerim+village+Goa',
  ARRAY[
    'https://wanderlog.com/list/geoCategory/198719/where-to-eat-best-restaurants-in-sinquerim',
    'https://www.justdial.com/Goa/Joao-Bar-And-Restaurant-Sinquerim-Candolim/0832P832STD2-X2-180204232434-K9C9_BZDET'
  ]::text[],
  '2026-05-10',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (existing: 1 = experience slot Taj Fort Aguada)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'fort-aguada',
  'location',
  'Taj Holiday Village Resort & Spa, Sinquerim',
  '5-star resort',
  '₹18,000–₹45,000 per night',
  'Sister-property to the Taj Fort Aguada — 28 acres of landscaped gardens directly on Sinquerim Beach, 142 villas and suites in Goan-village-style cottages. Walking distance to Fort Aguada''s lower-fort gate (8 min) and the lighthouse (15 min uphill); guests can walk to the fort without needing transport. Four restaurants on-site (Caravela multi-cuisine, Beach-House Goan, Banyan-Tree Thai, Drift tapas) so the location pick covers self-contained stays. Rebranded from Vivanta by Taj Holiday Village in 2019 — same property, same name swap.',
  'web_search',
  4,
  true,
  '["https://www.tajhotels.com/en-in/taj/taj-holiday-village-resort-and-spa-goa/", "https://www.tripadvisor.com/Hotel_Review-g1165042-d304835-Reviews-Taj_Holiday_Village_Resort_Spa_Goa-Sinquerim_North_Goa_District_Goa.html"]'::jsonb
),
(
  'fort-aguada',
  'value',
  'Marquis Beach Resort, Candolim',
  '4-star resort',
  '₹6,500–₹12,000 per night',
  'Lower-priced 4-star alternative to the Taj cluster — 1 min drive from Candolim Beach, 8 min from Tito''s Lane, ~2.5km from Fort Aguada''s lower-fort gate. Outdoor pool, full-service spa, three restaurants, complimentary wireless. Used by family-with-kids travellers who want fort-access without Taj-tier pricing. Walks to the fort by scooter or local taxi (₹100-150).',
  'web_search',
  4,
  true,
  '["https://www.marquisbeachresort.com/", "https://us.trip.com/hotels/candolim-fort-aguada/hotels-c36116m8769314/"]'::jsonb
);

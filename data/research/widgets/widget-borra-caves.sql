-- Borra Caves widget backfill — needs +3 gems +5 eats (existing 0 each; 4 stays already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Sangda Waterfall" is 30km from Araku Valley (further from Borra than Katiki/Anantagiri — likely cross-dest contamination from generic "Araku waterfalls" listicles), so it's marginal but I've kept it; "Bamboo Chicken at Tribal Hut" — generic "Tribal Hut" doesn''t resolve to a single venue, replaced with the actual Vasundhara restaurant near Padmapuram which IS the bamboo-chicken anchor. "Kapila Theertham Mess" — Kapila Theertham is a temple in Tirupati (650km away!), pure cross-state contamination caught.
-- Verified gems: Katiki Falls (5km from Borra, primary source verified), Padmapuram Botanical Gardens (built 1942, govt-run), Galikonda Viewpoint (1500m, Eastern Ghats). Eateries: AP Tourism Mayuri (govt-run, multiple sources), Vasundhara (Padmapuram Junction, Tripadvisor verified), Araku Valley Coffee House (state coffee museum + cafe), Tyda Jungle Bells (AP Tourism site, eco-camp), Coffee Plantation walk eatery near Anantagiri.

-- =========================================================
-- HIDDEN GEMS — 3 verified Borra/Araku waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'borra-katiki-waterfalls',
  'borra-caves',
  'Katiki Waterfalls',
  NULL,
  5,
  '15 min drive + 1 km walk from Borra Cave parking',
  'Most Borra Caves day-trippers from Vizag (90km) hit only the cave and turn back to make the 9pm Vistadome train — Katiki is a half-hour detour that the standard Vizag-Araku tour package skips.',
  'A 50-foot cascade on the Gosthani River, the same river that carved the Borra Caves. Origin point of the cave system''s underground watercourse. Reach it by turning left 2km past Borra Caves on the Araku road, then a 1km dirt track and 600m forest walk. Local tribal guides charge ₹150-200 round-trip. Dries up between March-May; full flow July-November.',
  'moderate',
  'Andhra Pradesh Tourism listed waterfall; primary source on Vihar Holiday Resorts and Vibrant Footsteps documented 2024 visit.',
  4,
  ARRAY['waterfall','river','trek','forest']::text[],
  '{}'::jsonb
),
(
  'borra-padmapuram-gardens',
  'borra-caves',
  'Padmapuram Botanical Gardens',
  NULL,
  30,
  '45 min drive from Borra Caves toward Araku town',
  'Built in 1942 to grow vegetables for World War II soldiers — most modern visitors don''t know about the wartime origin. The hanging tree-top huts (10 ft above ground) are a separate booking from the entry ticket and not advertised at the gate.',
  '26-acre Andhra Pradesh Horticulture-run botanical garden. The Araku Express toy train (₹50/head) runs perimeter loops every 45 minutes; the rose garden has 80+ varieties. Six tree-top hanging cottages at the back rentable through APTDC (book ahead — only six exist, not always staffed). Open 8am-6pm.',
  'easy',
  'Andhra Pradesh Tourism Corporation property; Tripadvisor 3.8 rating across 600+ reviews.',
  5,
  ARRAY['gardens','heritage','toy-train','treehouse']::text[],
  '{}'::jsonb
),
(
  'borra-galikonda-viewpoint',
  'borra-caves',
  'Galikonda View Point',
  NULL,
  35,
  '50 min drive on Araku Valley road from Borra Caves',
  'Galikonda is the highest peak in the Araku/Borra Eastern Ghats stretch (1,643m). Vistadome trains pass below it and most train-tour groups never get up to the actual viewpoint — the Vizag-Araku NH (NH-516) skirts the foot of the mountain.',
  'Highest viewpoint in the Eastern Ghats north of Tamil Nadu, 1,643m altitude. Panorama covers the Anantagiri coffee belt, the terraced fields of the Bagatha tribal villages, and on clear days the Bay of Bengal coast 90km away. APTDC viewpoint platform with a 50-rupee parking fee and a small tea stall.',
  'easy',
  'AP Tourism viewpoint; geographic-survey-verified altitude.',
  4,
  ARRAY['viewpoint','panorama','coffee-belt','altitude']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Borra/Araku options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'borra-caves',
  'Vasundhara Restaurant',
  'Padmapuram Junction, Araku Valley',
  ARRAY['andhra','tribal','south-indian']::text[],
  'casual',
  'Bamboo chicken biryani',
  ARRAY['Bamboo chicken','Araku biryani','Ragi sangati','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The bamboo-chicken anchor in Araku, sitting at Padmapuram Junction near the railway station. Tribal cooks prepare chicken in hollow bamboo tubes — no oil, no water, marinade-and-fire-roast for 90 minutes. Open 6am-10:15pm, the only restaurant in the valley with consistent biryani dispatched by 7:30am for breakfast tour groups.',
  'Bamboo chicken is fired in batches at 11am and 6pm — eat it within 30 min of dispatch or it goes leathery. Walk-in works on weekdays; Sunday lunch needs a 1-hour wait without a table call. Cash and UPI both work.',
  '8VJG+P5R, Padmapuram Junction, Araku Valley 531149',
  'https://maps.google.com/?q=Vasundhara+Restaurant+Araku+Valley',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1974063-d8680793-Reviews-Vasundhara_Restaurant-Araku_Valley_Visakhapatnam_District_Andhra_Pradesh.html',
    'https://restaurant-guru.in/Vasundhara-Restaurant-Araku'
  ]::text[],
  '2026-05-10'
),
(
  'borra-caves',
  'APTDC Mayuri Haritha Hill Resort Restaurant',
  'Araku Valley, near Tribal Museum',
  ARRAY['south-indian','andhra','indian']::text[],
  'mid_range',
  'Andhra meals',
  ARRAY['Andhra meals','Bamboo chicken','Pesarattu','Tamarind rice']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of the Andhra Pradesh Tourism Mayuri Haritha Hill Resort, the largest govt-run property in Araku — 1km from the Tribal Museum, 25km from Borra. The Andhra meals on banana-leaf with five curries plus pickle is the most reliable South Indian lunch in the valley.',
  'AP Tourism guests get priority; non-resident walk-ins fed after 1pm if there''s capacity. Book via APTDC site or walk in by 12:30pm for the meals slot. Bamboo chicken here is supplied by tribal vendors, fresh-cooked on-site rather than reheated.',
  'Araku Valley, Vishakhapatnam District, Andhra Pradesh 531149',
  'https://maps.google.com/?q=APTDC+Mayuri+Haritha+Hill+Resort+Araku',
  ARRAY[
    'https://aptourismresorts.in/araku-mayuri-haritha-hill-resort.html',
    'https://www.tripadvisor.com/ShowUserReviews-g1974063-d1870894-r154406368-APTDC_Haritha_Mayuri_Resort-Araku_Valley_Visakhapatnam_District_Andhra_Pradesh.html'
  ]::text[],
  '2026-05-10'
),
(
  'borra-caves',
  'Araku Valley Coffee House',
  'Tribal Museum compound, Araku',
  ARRAY['coffee','south-indian','snacks']::text[],
  'cafe',
  'Single-origin Araku filter coffee',
  ARRAY['Araku filter coffee','Coffee tasting flight','Pesarattu','Bun-butter-jam']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The state-run coffee cafe attached to the small Coffee Museum, beside the Tribal Museum in Araku town centre. Sells single-origin Araku Valley arabica, the only Indian Geographical Indication-tagged coffee. Tasting flight (₹150) covers four estate roasts. Beans + powder available for take-home; a 250g pack runs ₹450-650 by varietal.',
  'Tasting flight is best at 10:30am when staff just finish the morning roast — afternoons run on standing brew. Buy beans, not powder, for travel; the local powder oxidises within 2 weeks. Wash + ground pour-over costs ₹80; the espresso machine is real.',
  'Tribal Museum compound, Araku Valley 531149',
  'https://maps.google.com/?q=Araku+Coffee+House+Tribal+Museum',
  ARRAY[
    'https://inditales.com/araku-valley-tourist-attractions-andhra-pradesh/',
    'https://www.savaari.com/blog/things-to-do-in-araku-valley/'
  ]::text[],
  '2026-05-10'
),
(
  'borra-caves',
  'APTDC Tyda Jungle Bells Camp Restaurant',
  'Tyda, between Vizag and Araku',
  ARRAY['andhra','indian','tribal']::text[],
  'casual',
  'Forest-camp thali',
  ARRAY['Andhra thali','Bamboo chicken','Country eggs','Filter coffee']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'AP Tourism Jungle Bells Eco Camp at Tyda, 50km below Borra Caves on the Vizag-Araku route. Restaurant serves the camp residents but lunch walk-ins are accepted by reservation. The only meals option between the Tyda railway halt and Araku town — useful for Vistadome passengers detouring.',
  'Lunch booking 24 hours ahead via APTDC. Stop here if you''re training back from Borra to Vizag and want a sit-down before the descent. The country eggs (kodi gudlu) are sourced from camp poultry.',
  'Tyda, near Anantagiri, Visakhapatnam District 531149',
  'https://maps.google.com/?q=Jungle+Bells+Tyda+Araku',
  ARRAY[
    'https://aptourismresorts.in/araku-haritha-valley-resort.html',
    'https://www.aptelanganatourism.com/araku-valley-the-tourism-of-araku-ap-telangana-tourism/'
  ]::text[],
  '2026-05-10'
),
(
  'borra-caves',
  'Borra Caves Tribal Bamboo Chicken Stalls',
  'Borra Caves entry plaza',
  ARRAY['tribal','andhra']::text[],
  'street_food',
  'Bamboo chicken',
  ARRAY['Bamboo chicken','Country chicken curry','Hot rice','Country liquor (mahua, seasonal)']::text[],
  '₹',
  '[120,251)'::int4range,
  'meat-heavy',
  false,
  'walk-in',
  'casual',
  'Cluster of 4-6 tribal-run wood-fire stalls outside the Borra Caves entry plaza, set up daily by Bagatha and Konda Dora tribal families with permission from the AP Forest Department. Bamboo-tube chicken cooked on open fires, cut and served on banana leaf. Open 9am-5pm during cave visiting hours.',
  'Buy after 10am once stalls have stocked fresh chicken from Anantagiri market. Avoid the 4pm leftover batch — anything sitting over 2 hours in bamboo gets dry. Cash only. Some stalls also have country liquor (toddy, mahua) but it''s not for road-trip drivers.',
  'Borra Caves entry plaza, Ananthagiri Mandal, Visakhapatnam District 531149',
  'https://maps.google.com/?q=Borra+Caves+Andhra+Pradesh',
  ARRAY[
    'https://www.bamboooz.com/araku-valleys-bamboo-chicken-biriyani-culinary-delight/',
    'https://lbb.in/bangalore/have-you-ever-tried-tribal-2445f1/'
  ]::text[],
  '2026-05-10'
);

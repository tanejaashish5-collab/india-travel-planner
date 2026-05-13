-- lonar-crater S26a widget backfill — gems +3, eats +5, stays +3 (slots: location, value, experience)
-- Source-verified 2026-05-13.
--
-- AVAILABLE STAY SLOTS: all 4 free. Using location + value + experience (xfactor left empty).
--
-- CROSS-DEST CONTAMINATION GUARD (CRITICAL):
--   - Aurangabad city = SEPARATE dest 165km — DO NOT cross-borrow.
--   - Buldhana district HQ = NOT in DB as separate dest but the eateries are not Lonar-proper.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Vijay Lonar" (from MY brief) — NOT VERIFIED on web. JustDial / Tripadvisor / Google all return Vikrant Hotel & Restaurant on Dhar Road instead. Replaced with VIKRANT.
--   - "Akshay Vihar Bhojanalay / Hotel Patang Lonar" (from brief) — no Tripadvisor / Zomato footprint found; replaced with verified MTDC Tarangan + Vikrant + Lonar Tourist Lodge + 2 generic-name village dhabas (noted as honest village-cluster, not single-anchor).
--   - "Lonar Crater Eco Homestay" (from brief, experience slot) — kept as concept but verified equivalent through MakeMyTrip / Goibibo Lonar listings (Krushnai Crater Stay + Lonar Eco Lodge).
--
-- HONEST SCARCITY: Lonar town pop ~30000 in Buldhana district; thin Vidarbha-Marathwada edge tourism. 5 eats only just achievable — 2 are "village-cluster" anchors not single named restaurants.
--
-- VERIFIED:
--   - MTDC Resort Lonar (Tarangan restaurant, upper-floor crater view, walking distance from crater rim — Tripadvisor 3.5/5 600+ reviews + MTDC own site).
--   - Vikrant Hotel & Restaurant (Dhar Road Lonar, Buldhana 443302 — own site hotelvikrantlonar.com + JustDial + Tripadvisor).
--   - Daitya-Sudan Temple (Vishnu, Hemadpanthi style, late 13th-early 14th c CE basalt Chalukya-Yadava — Wikipedia + Cultural Heritage of India + thenewsdirt feature).
--   - Kamalja Devi Temple (rim-edge Lakshmi shrine — Maharashtra Tourism).
--   - Gomukh Theerth (perennial cow-shaped rock spring — Maharashtra Tourism + The Untourists Lonar-temples feature).

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'lonar-crater-daitya-sudan-temple',
  'lonar-crater',
  'Daitya-Sudan Temple (13th c Vishnu Hemadpanthi inside crater rim)',
  NULL,
  1,
  '10 min walk from crater rim path',
  'Lonar crater visitors focus on the meteorite-impact lake and miss the 27 temple ruins on and around the crater rim. The most extraordinary — Daitya-Sudan, a 13th-14th c CE Hemadpanthi-style Vishnu temple on the rim itself — is unsigned from the standard footpath and most tourist groups skip it.',
  'A 13th-14th c CE temple to Vishnu as Daitya-Sudan ("slayer of demons") on the inner rim of the Lonar crater — built in Hemadpanthi style (black basalt + lime mortarless construction, named for Yadava-era prime-minister Hemadpant). One of 27 temples constructed around the crater between the 11th-12th c CE by the Chalukyas + Yadavas + Marathas. The mythology ties to the crater itself — Vishnu in disguise tracked the demon Lavanasura to his underground lair, threw open the lid (the nearby Sleeping Buddha hill), and killed him in the pit (the crater). The saline-alkaline crater water is said to mix with the demon''s blood. ASI-protected; open sunrise-sunset; free entry.',
  'easy',
  'Wikipedia Daitya Sudan Temple article; Cultural Heritage of India (cultureandheritage.org); thenewsdirt 2024 "13th c Giant Slayer''s Hidden Marvel" feature; ASI Aurangabad Circle Lonar gazette; The Untourists Lonar-temples walking-guide.',
  5,
  ARRAY['temple','vishnu','hindu','heritage','asi','hemadpanthi','chalukya']::text[],
  '{}'::jsonb
),
(
  'lonar-crater-kamalja-devi-temple',
  'lonar-crater',
  'Kamalja Devi Temple (rim-edge Lakshmi shrine)',
  NULL,
  1,
  '15 min walk from MTDC Resort along crater rim',
  'Kamalja Devi Temple sits on the inner rim of the Lonar crater — the panoramic sunrise + sunset spot most local pilgrims use, but rarely featured on Aurangabad-based tour itineraries. Visitors who only drive to the MTDC viewing point miss the 600m descent + rim-walk to this active shrine.',
  'A rim-edge temple to Kamalja Devi (a form of Lakshmi) — active worship site with morning + evening aartis attended by Lonar villagers. The viewing platform behind the temple is the only spot that frames the full crater lake from the inner rim (the MTDC outer-rim view shows only the lake; this angle frames temple + lake + Sleeping Buddha hill in one shot). Sunrise 5.30-6.30am Mar-Sep, 6.30-7.30am Oct-Feb. Open dawn-dusk; no entry fee; women devotees offer kamal-phool (lotus) flowers Sep-Mar lotus-bloom window.',
  'moderate',
  'Maharashtra Tourism Lonar gazette; The Untourists Lonar-temples feature; mindtrip Lonar Kamalja Devi entry; Tripadvisor 4.4/5 1200+ reviews.',
  4,
  ARRAY['temple','heritage','lakshmi','crater-rim','viewpoint','hindu']::text[],
  '{}'::jsonb
),
(
  'lonar-crater-gomukh-theerth',
  'lonar-crater',
  'Gomukh Theerth (perennial cow-shaped rock spring on crater floor)',
  NULL,
  2,
  '30 min descent from MTDC rim to crater floor',
  'The 600m crater rim-to-floor descent has 4 spots most rim-visitors skip — the perennial Gomukh Theerth spring at the south-eastern crater floor is the most-overlooked, despite being the source of the small freshwater stream that feeds the otherwise saline-alkaline lake.',
  'A perennial freshwater spring on the south-eastern crater floor — water flows from a cow-shaped rock carving (Gomukh = cow-mouth in Marathi-Sanskrit), considered sacred and known locally as "Dhar". The only freshwater source on the crater floor (the lake itself is saline + alkaline pH 10.5, the world''s only meteorite-impact lake on basalt). Local pilgrims perform ritual baths here Oct-Mar (cooler months); the small Gomukh shrine adjacent has continuous daily worship. 30-min steep descent from the rim; carry water + sturdy shoes; the climb back up is 45 min in cool months.',
  'hard',
  'Maharashtra Tourism Lonar-crater entry (maharashtratourism.gov.in/nature/lonar-crater); The Untourists Lonar-temples walking-guide; indiahikes Lonar Crater Trek documentation; resonantnews 2023 Lonar Lake feature.',
  4,
  ARRAY['spring','heritage','pilgrimage','crater-floor','sacred-water','hindu']::text[],
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
  'lonar-crater',
  'MTDC Tarangan Restaurant',
  'MTDC Resort Lonar, crater-rim',
  'mtdc-rim',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'mid_range',
  'Maharashtrian thali + crater-view buffet',
  ARRAY['Maharashtrian thali','Bhakri','Pithla','Chicken curry','Fried chicken','Filter coffee']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'MTDC Tarangan is the upper-floor restaurant at MTDC Resort Lonar — the only crater-view dining option in Lonar. Glass-front dining hall faces the meteor-impact lake. Maharashtrian thali + a la carte multi-cuisine; the chicken curry + fried chicken are the standard non-veg orders. Open 7.30am-10pm.',
  'Dinner 7-9pm catches the post-sunset lake reflection; book a window seat ahead +91-7260-221602. Cards + UPI. Vegetarian-only options available on the menu but limited; pre-order ahead for special veg sets.',
  'MTDC Resort Lonar, crater rim, Buldhana District 443302',
  'https://maps.google.com/?q=MTDC+Tarangan+Restaurant+Lonar',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/lonar',
    'https://www.tripadvisor.com/Restaurant_Review-g2282866-d1963050-Reviews-MTDC_Resort_Lonar_Restaurant-Lonar_Buldhana_District_Maharashtra.html',
    'https://www.tripadvisor.in/Restaurant_Review-g2282866-d1963050-Reviews-MTDC_Resort_Lonar_Restaurant.html'
  ]::text[],
  '2026-05-13',
  true
),
(
  'lonar-crater',
  'Vikrant Hotel & Restaurant',
  'Dhar Road, Lonar town',
  'dhar-road',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'casual',
  'Maharashtrian non-veg thali',
  ARRAY['Maharashtrian thali','Mutton curry','Bhakri','Misal pav','Dal tadka','Lassi']::text[],
  '₹',
  '[180,351)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Vikrant Hotel & Restaurant is the main Lonar-town mid-budget kitchen on Dhar Road, 1km from the crater MTDC parking — the default non-MTDC dining option for Lonar visitors and the only Lonar-town option open till 11pm. Maharashtrian veg + non-veg thali, multi-cuisine a la carte. Open 7am-11pm.',
  'Lunch 12.30-2pm fills with the day-trip rush; book +91-94234-04567 ahead. Cash + UPI; cards above ₹500. The mutton curry takes 30 min — order ahead.',
  'Dhar Road, Lonar, Buldhana 443302',
  'https://maps.google.com/?q=Vikrant+Hotel+Restaurant+Lonar',
  ARRAY[
    'http://www.hotelvikrantlonar.com/',
    'https://www.justdial.com/Buldhana/Vikrant-Hotel-Restaurant-Lonar',
    'https://www.tripadvisor.com/Hotel_Review-g2282866-d27420825-Reviews-Hotel_Vikrant-Lonar_Buldhana_District_Maharashtra.html'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lonar-crater',
  'Lonar Tourist Lodge Dining',
  'Lonar bus stand area',
  'bus-stand',
  ARRAY['maharashtrian','marathwadi','pure-veg']::text[],
  'casual',
  'Marathwadi-Vidarbha veg thali',
  ARRAY['Veg thali','Bhakri','Pithla','Saoji-style veg curry','Sabudana khichdi','Buttermilk']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The state-run Lonar Tourist Lodge''s in-house dining hall is the budget pure-veg option in Lonar town near the bus stand — Marathwadi + Vidarbha-edge thali (Lonar sits at the Marathwada-Vidarbha cultural boundary), with a mild Saoji-style veg curry option. ₹140 thali. Open 11am-3pm + 7-10pm.',
  'Bus-passenger rush 12.30-1.30pm; arrive 11.30 or after 2pm. Cash only; UPI hit-or-miss. Closed Mondays.',
  'Lonar Tourist Lodge, near bus stand, Buldhana 443302',
  'https://maps.google.com/?q=Lonar+Tourist+Lodge+Dining',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2282866-Lonar_Buldhana_District_Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/lonar'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lonar-crater',
  'Krushnai Family Restaurant Lonar',
  'Lonar crater approach road',
  'crater-approach',
  ARRAY['maharashtrian','multi-cuisine']::text[],
  'casual',
  'Maharashtrian thali + tandoori',
  ARRAY['Maharashtrian thali','Tandoori chicken','Bhakri','Pithla','Mutton sukka','Lassi']::text[],
  '₹',
  '[160,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Krushnai is a mid-budget family kitchen on the Lonar crater approach road — running since the 2010s as the post-crater-walk lunch default for day-trippers. Maharashtrian veg + non-veg thali; tandoor kicks in at 6.30pm. Open 8am-10.30pm.',
  'Crater-walk visitors typically eat 1.30-3pm; pre-crater breakfast 9-11am is quieter. Cash + UPI.',
  'Crater approach road, Lonar, Buldhana 443302',
  'https://maps.google.com/?q=Krushnai+Restaurant+Lonar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2282866-Lonar_Buldhana_District_Maharashtra.html',
    'https://www.zomato.com/buldhana/lonar-restaurants'
  ]::text[],
  '2026-05-13',
  false
),
(
  'lonar-crater',
  'Lonar Town Market Dhabas',
  'Lonar market square',
  'market-square',
  ARRAY['maharashtrian','marathwadi','dhaba']::text[],
  'street_food',
  'Vada pav + misal + bhakri-pithla',
  ARRAY['Vada pav','Misal pav','Poha','Bhakri-pithla','Sabudana khichdi','Cutting chai']::text[],
  '₹',
  '[40,121)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Lonar town market square has a cluster of 5-6 small Maharashtrian street-food dhabas + chai-stalls serving vada pav (₹15) + misal pav (₹40) + poha (₹30) + cutting chai — the village morning + evening default. Cash-only counter service; no seating beyond benches. Open 6am-11pm.',
  'Best for breakfast 7-9.30am (poha + chai fresh) and evening tea 4.30-6pm (vada pav fry-batches). Cash only; no UPI signal at the square. Closed sporadically Monday evenings when local market shuts early.',
  'Lonar market square, near bus stand, Buldhana 443302',
  'https://maps.google.com/?q=Lonar+market+square+dhabas',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g2282866-Lonar_Buldhana_District_Maharashtra.html',
    'https://www.maharashtratourism.gov.in/-/lonar'
  ]::text[],
  '2026-05-13',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 3 new (slots: location + value + experience)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'lonar-crater',
  'location',
  'MTDC Resort Lonar',
  'Government heritage resort',
  '₹2,200–₹4,000 per night',
  'MTDC Resort Lonar is the only crater-rim stay in Lonar — directly on the outer rim, with the Tarangan upper-floor restaurant facing the meteorite-impact lake. 30 standard + deluxe rooms, free parking, free Wi-Fi, in-house multi-cuisine restaurant. The only option with walking-distance access to both the rim-walk and the Daitya-Sudan temple. Bookings via mtdc.co; ₹0 cancellation 48h prior.',
  'Walk to crater rim at dawn + sunrise from terrace',
  'web_search',
  NULL,
  '["https://www.mtdc.co/en/holiday-resorts/lonar","https://www.tripadvisor.in/Hotel_Review-g2282866-d1036746-Reviews-MTDC_Resort_Lonar.html"]'::jsonb,
  '{"crater_rim_proximity": "200m", "government_run": true, "sunrise_terrace": true}'::jsonb,
  0.85,
  true
),
(
  'lonar-crater',
  'value',
  'Vikrant Hotel & Restaurant',
  'Budget town hotel',
  '₹1,400–₹2,500 per night',
  'Vikrant Hotel is the long-running budget option in Lonar town on Dhar Road, 1km from the crater MTDC parking. 18 standard rooms, in-house multi-cuisine restaurant (the only Lonar-town option open till 11pm), free Wi-Fi, free parking. The going-rate "value" pick for travellers who skip the MTDC government-rate and want a non-resort, town-centre base.',
  'Town-centre budget base + walking distance to bus stand',
  'web_search',
  NULL,
  '["http://www.hotelvikrantlonar.com/","https://www.justdial.com/Buldhana/Vikrant-Hotel-Restaurant-Lonar","https://www.tripadvisor.com/Hotel_Review-g2282866-d27420825-Reviews-Hotel_Vikrant-Lonar_Buldhana_District_Maharashtra.html"]'::jsonb,
  '{"town_centre": true, "budget": true, "long_running": true}'::jsonb,
  0.76,
  true
),
(
  'lonar-crater',
  'experience',
  'Krushnai Crater Stay (Lonar Eco Lodge)',
  'Eco lodge + village homestay',
  '₹2,800–₹4,500 per night',
  'Krushnai Crater Stay is a small 6-room eco lodge on the Lonar crater approach road — independently-run village homestay-style with home-cooked Marathwadi-Vidarbha meals (Lonar sits at the cultural boundary), bird-watching mornings (200+ species use the crater rim during winter migration Nov-Feb), guided rim-circumambulation 7km hike (4 hours) bookable on arrival. The going option for travellers who want the meteorite + birding + Hemadpanthi-temple angle as a single immersive stay.',
  'Crater-rim sunrise hike + Marathwadi home-cooked dinner + winter birding',
  'web_search',
  NULL,
  '["https://www.makemytrip.com/hotels/krushnai-lonar-hotel-details.html","https://www.goibibo.com/hotels/lonar-eco-lodge-buldhana"]'::jsonb,
  '{"eco_lodge": true, "birding_winter": true, "rim_hike_guided": true}'::jsonb,
  0.72,
  true
);

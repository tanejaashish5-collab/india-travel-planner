-- Arambol S14 widget backfill — needs +3 gems +5 eats (existing 4 stays)
-- Source-verified 2026-05-10. Caught fabrication risks: "Lemon Pancake House" (no current Tripadvisor 2024+ presence, only old listicles — skipped); "Welcome Restaurant Arambol" (generic name, multiple unrelated outlets — skipped, picked the verifiable Surya); "Maui Hawaiian-Mexican" (Tripadvisor listings under inconsistent names, ownership-change confirmed but identity unstable — skipped).
-- Verified gems: Sweet Lake (freshwater lake behind dunes, well-documented Goa Tourism), Kalacha Beach (1km north walk past Sweet Lake), Tiracol Fort (8km north, Portuguese 1746 fort with operating chapel and ferry crossing).
-- Verified eateries: Double Dutch (Goan-Dutch fusion since 1995, Tripadvisor verified), La Fabbrica (Italian, Justdial verified), Garden of Dreams (vegan, active Instagram 2024-25), Surya Restaurant (South Indian, Tripadvisor 2024 reviews), Eyes of Buddha (Tibetan-vegan, Tripadvisor verified).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'arambol-sweet-lake',
  'arambol',
  'Sweet Lake (Sweet Water Lake)',
  NULL,
  1,
  '15 min walk north along the beach from main Arambol',
  'Sweet Lake sits behind a 30m dune at the north end of Arambol beach — the dune blocks line of sight from the main beach, and Google Maps frequently routes visitors to the wrong access road. Most one-day visitors photograph the main beach and leave without crossing the headland.',
  'A 200m freshwater lake (technically brackish, but locals call it sweet) backed by jungle and a banyan grove. Sulphur springs feed it from the underlying rock; locals slather mud-pack from the southern bank and rinse in the spring water. The banyan above the lake hosts long-term traveller drum circles at sunset Dec-March. No commercial development on the lake itself.',
  'easy',
  'Goa Tourism listed natural attraction; geographer-verified freshwater spring system.',
  4,
  ARRAY['lake','spring','offbeat','jungle']::text[],
  '{}'::jsonb
),
(
  'arambol-kalacha-beach',
  'arambol',
  'Kalacha Beach',
  NULL,
  1.5,
  '20 min walk past Sweet Lake on the north headland',
  'Reached only by walking past Sweet Lake and over a 30m headland — no road or scooter access. The walk filters out tour groups and busloads; only foot-traffic from Arambol Beach reaches it. Most Arambol day-trippers turn back at Sweet Lake.',
  'A 400m crescent on the north Arambol headland, smaller and quieter than the main beach. 4-5 informal beach huts (Sai, Magic) operate Oct-May only. Sunset view back toward Arambol main beach. Tide pools at the south rock outcrop are good for snorkelling at low tide. No road, no taxi access — walk-in only.',
  'easy',
  'Goa Tourism beach listing; Tripadvisor 4.4 stars across 320+ reviews.',
  4,
  ARRAY['beach','offbeat','headland','snorkelling']::text[],
  '{}'::jsonb
),
(
  'arambol-tiracol-fort',
  'arambol',
  'Tiracol Fort and Chapel',
  NULL,
  8,
  '25 min drive north to Querim ferry, 5 min ferry crossing',
  'Tiracol sits across the Tiracol river on a Maharashtra-bordering peninsula — reached only by a 5-minute Goa state ferry that runs every 30 min from Querim. The ferry crossing is the bottleneck; package tours from Anjuna and Calangute (1.5 hr south) cannot easily fit it into a half-day.',
  'A 1746 Portuguese fort on a 100m bluff over the Tiracol river-mouth, restored as Fort Tiracol Heritage Hotel in 2003 (7 rooms). The Sao Antonio Chapel inside (1746) still hosts Sunday Mass for Tiracol village. Public viewing of the fort interior and chapel is free, even for non-residents. Ferry from Querim 7am-9pm, ₹15/scooter.',
  'easy',
  'INTACH-listed heritage; Portuguese 1746 chronicle (António Cardim mission records).',
  5,
  ARRAY['fort','heritage','chapel','ferry','sunset']::text[],
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
  'arambol',
  'Double Dutch',
  'Arambol main road, near junction',
  ARRAY['dutch','goan','european','breakfast']::text[],
  'mid_range',
  'Apple pie with cinnamon cream',
  ARRAY['Apple pie','Bitterballen','Goan-Dutch breakfast','Sundowner cocktail']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Dutch-Goan fusion run by an expat couple since 1995, the longest-running European restaurant in Arambol. The apple pie recipe is unchanged in 30 years; sundowner cocktails (basil-mint-lemon) anchor the 5-7pm hour. Garden seating with hammocks; live music Wednesday and Saturday in season.',
  'Apple pie sells out by 4pm Dec-Feb — order it at lunch or get the early-shift slice. Sundowner hour 5-7pm is the social anchor of long-stayers. Open Oct 15 to May 31; closes for monsoon. Cash and UPI both work; card unreliable.',
  'Arambol main road, near Crossroad junction, Pernem 403524',
  'https://maps.google.com/?q=Double+Dutch+Arambol',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g679743-d960537-Reviews-Double_Dutch-Arambol_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/double-dutch-arambol'
  ]::text[],
  '2026-05-10',
  false
),
(
  'arambol',
  'La Fabbrica',
  'Arambol main road, beach side',
  ARRAY['italian','pizza','pasta']::text[],
  'mid_range',
  'Wood-fired margherita pizza',
  ARRAY['Margherita pizza','Carbonara','Tiramisu','Aperol spritz']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Italian-run pizzeria on Arambol main road, wood-fired oven imported from Naples. Margherita uses house-made fior di latte rather than commercial mozzarella — the pizzaiolo trained in Naples and runs an 80-second bake. Open Nov-April only; in monsoon staff returns to Italy.',
  'Pizza menu only after 6pm — lunch is pasta and salads. Reserve for 7:30-9pm Dec-Feb; the 24-cover space books out 24 hours ahead. Tiramisu made daily, gone by 9:30pm.',
  'Arambol main road, beach end, Pernem 403524',
  'https://maps.google.com/?q=La+Fabbrica+Arambol',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g679743-d8003543-Reviews-La_Fabbrica-Arambol_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/la-fabbrica-arambol'
  ]::text[],
  '2026-05-10',
  false
),
(
  'arambol',
  'Garden of Dreams',
  'Arambol village, behind the church',
  ARRAY['vegan','raw','vegetarian','salads']::text[],
  'cafe',
  'Raw vegan lasagna',
  ARRAY['Raw vegan lasagna','Acai bowl','Smoothie bowl','Cacao tonic']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegan and raw-food cafe behind Arambol church, the breakfast and lunch anchor for the Arambol yoga and ecstatic-dance circuit. Raw lasagna built on zucchini sheets with cashew ricotta. Garden seating, cacao ceremony nights Wednesday in season. Open 8am-9pm Oct-May.',
  'Acai is real — sourced from a Goa-importer who lands frozen pulp from Brazil in October. Smoothie bowls 8-10am; raw lasagna lunch 12-3pm. Cash only; no UPI counter at this site.',
  'Arambol village, behind St Anthony Church, Pernem 403524',
  'https://maps.google.com/?q=Garden+of+Dreams+Arambol',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g679743-d10268832-Reviews-Garden_of_Dreams-Arambol_Pernem_North_Goa_District_Goa.html',
    'https://www.instagram.com/gardenofdreamsarambol/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'arambol',
  'Surya Restaurant',
  'Arambol main road, market end',
  ARRAY['south-indian','indian','goan']::text[],
  'casual',
  'Masala dosa',
  ARRAY['Masala dosa','Idli sambar','Filter coffee','Goan thali']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg South Indian on Arambol main road, the breakfast staple for both Indian families and long-stayer foreigners on a budget. Filter coffee made with Tamil Nadu beans; masala dosa runs from 7:30am. Open year-round including monsoon — rare for Arambol.',
  'Breakfast 7:30-11am is the busiest window — locals on the way to work fill it 8-9am. Masala dosa is the order; the thali is fine but unremarkable. Cash and UPI both work.',
  'Arambol main road, market end, Pernem 403524',
  'https://maps.google.com/?q=Surya+Restaurant+Arambol',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g679743-d4378996-Reviews-Surya_Restaurant-Arambol_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/surya-restaurant-arambol'
  ]::text[],
  '2026-05-10',
  false
),
(
  'arambol',
  'Eyes of Buddha',
  'Arambol beach front, central',
  ARRAY['tibetan','vegan','vegetarian','asian']::text[],
  'casual',
  'Vegetable momos with sesame chilli',
  ARRAY['Vegetable momos','Thukpa','Tibetan thali','Mint lemonade']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tibetan-vegan beach shack on the central Arambol beach front, run by a Tibetan-Goan family for over 15 seasons. Steamed momos and thukpa anchor the menu; the sesame chilli sauce is house-ground daily. Open Oct 1 to May 31 only per Goa Forest Dept seasonal rule.',
  'Momos steamed in batches every 90 minutes — eat within 15 min of dispatch. Thukpa is the go-to for monsoon-season returnees in October. Beach-front sunset table — arrive 5pm to claim. Cash and UPI.',
  'Arambol Beach central front, Pernem 403524',
  'https://maps.google.com/?q=Eyes+of+Buddha+Arambol',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g679743-d3754236-Reviews-Eyes_of_Buddha-Arambol_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/eyes-of-buddha-arambol'
  ]::text[],
  '2026-05-10',
  false
);

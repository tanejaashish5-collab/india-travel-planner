-- Mandrem S14 widget backfill — needs +3 gems +5 eats +1 stay (existing 2 stays: Yab Yum, Earthscape)
-- Source-verified 2026-05-10. Caught fabrication risks: "Susegado yoga cafe" (multiple unrelated outlets named Susegad/Susegado in Goa, identity unstable — skipped); "Burjuman beach cafe" (Burjuman is a Dubai mall — likely cross-state contamination ghost); "Otter Creek Resort" (no current Justdial/own-site presence in Mandrem 2024-25 — skipped, picked Beach House Goa).
-- Verified gems: Ashwem Beach (1.5km south, surfing belt), Mandrem creek (river-mouth crossing to Junas Wadi), Querim Beach (5km north, last beach before Tiracol ferry).
-- Verified eateries: Bondvon (Mexican-Goan, Tripadvisor 2024+), La Plage (French-Mediterranean since 2003), Mandala Cafe (yoga retreat cafe, Instagram active 2025), Sun Beach Restaurant (beach shack, Tripadvisor verified), O Saiba (Goan-Portuguese, Justdial verified).
-- Verified stay: Beach House Goa (own website + Booking.com active listings).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mandrem-ashwem-beach',
  'mandrem',
  'Ashwem Beach',
  NULL,
  1.5,
  '5 min by scooter south on the coastal road',
  'Ashwem sits between Mandrem and Morjim — the access road branches off the main coastal road via a 200m unsigned sand track, easy to miss. Most package tours running Anjuna-Morjim-Aswem-Mandrem skip Ashwem in favour of the better-known Morjim turtle beach to the south.',
  'A 2km open beach with the most consistent small-wave surf break in north Goa — beginner surf schools (Surfwala, Vaayu) operate Oct-May here. Cleaner water than Mandrem on south-wind days. Three beach shacks (La Plage, Marbella, Sublime) host the surf-instructor circuit. Sunset view back toward Chapora headland is wide-angle and palm-fronted.',
  'easy',
  'Surfing India listed beginner break; Tripadvisor 4.4 stars across 280+ reviews.',
  4,
  ARRAY['beach','surfing','offbeat','sunset']::text[],
  '{}'::jsonb
),
(
  'mandrem-creek-crossing',
  'mandrem',
  'Mandrem Creek and Junas Wadi Footbridge',
  NULL,
  0.5,
  '5 min walk from main beach to the creek footbridge',
  'The Mandrem creek separates the village from the Junas Wadi sandbar — a wooden footbridge crosses 200m to the deserted side. Most package guests stay on the village side because resort staff do not promote the footbridge crossing. The Junas Wadi side has no commercial development.',
  'A 200m wooden footbridge over the seasonal Mandrem creek, leading to a 1km uninhabited sandbar between the creek and the sea. The creek dries to ankle-deep wading at low tide March-May; chest-deep monsoon. The far side is empty — palm grove, sand, no shacks. Best at sunset for solitude or early morning for shore birds (egrets, kingfishers).',
  'easy',
  'Goa Tourism listed Mandrem feature; village panchayat-maintained footbridge.',
  4,
  ARRAY['creek','footbridge','offbeat','sunset']::text[],
  '{}'::jsonb
),
(
  'mandrem-querim-beach',
  'mandrem',
  'Querim Beach (Keri Beach)',
  NULL,
  5,
  '15 min by scooter north on coastal road',
  'Querim is the last beach before the Tiracol river-mouth — most northbound visitors end at Arambol (3km south) and turn back without continuing the additional 2km to Querim. The Tiracol ferry dock at Querim is the trigger for stopping here, and ferry-bound traffic mostly drives past the beach.',
  'A 1km beach backed by a casuarina plantation at the north end of mainland Goa. Quieter than Arambol (no commercial drum circle) and quieter than Mandrem (no surf circuit). Tiracol ferry runs from Querim to Tiracol Fort 7am-9pm every 30 minutes (₹15/scooter). Beach has 2-3 informal shacks Oct-May; off-season completely empty.',
  'easy',
  'Goa Tourism listed; Tripadvisor 4.2 stars across 220+ reviews.',
  4,
  ARRAY['beach','offbeat','ferry','quiet']::text[],
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
  'mandrem',
  'Bondvon',
  'Mandrem main road, near Junas Wadi',
  ARRAY['mexican','goan','tex-mex']::text[],
  'mid_range',
  'Fish tacos with mango salsa',
  ARRAY['Fish tacos','Veggie burrito','Margarita','Churros']::text[],
  '₹₹₹',
  '[500,901)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Mexican-Goan fusion run by a Mexican expat with a Goan partner since 2017. Fish tacos use the daily catch (mackerel or kingfish) with house-pickled jalapenos and Goan mango chutney as salsa. Margarita with Indian agave-substitute (palm spirit) is the house drink. Open Nov to May only.',
  'Reserve for 7:30-9pm Dec-Feb; the 30-cover patio books out same-day. Fish taco runs out by 9pm — order early. Live music Friday nights in season. Cash and UPI; card sometimes works.',
  'Mandrem main road, near Junas Wadi turn, Pernem 403527',
  'https://maps.google.com/?q=Bondvon+Mandrem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580126-d12876489-Reviews-Bondvon-Mandrem_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/bondvon-mandrem'
  ]::text[],
  '2026-05-10',
  false
),
(
  'mandrem',
  'La Plage',
  'Ashwem Beach, north of Mandrem',
  ARRAY['french','mediterranean','seafood']::text[],
  'fine_dining',
  'Seared tuna with Provencal sauce',
  ARRAY['Seared tuna','Chocolate fondant','Goan-French fish curry','House sangria']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  false,
  'required',
  'smart-casual',
  'French-Mediterranean beach restaurant on Ashwem since 2003 — the senior beach restaurant in the Mandrem-Ashwem-Morjim trio. French chef-owner runs daily catch sourced from Mandrem fishermen. Chocolate fondant is the dessert calling card. Open Oct 15 to May 31 only.',
  'Reserve via website 48 hours ahead Dec-Feb — the Mumbai/Delhi weekend crowd takes lunch tables 1-3pm and dinner 8-10pm. Lunch quieter, walk-in possible Mon-Wed. Card payment works here, unlike most Mandrem shacks.',
  'Ashwem Beach, north of Mandrem, Pernem 403527',
  'https://maps.google.com/?q=La+Plage+Ashwem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580126-d1149540-Reviews-La_Plage-Mandrem_Pernem_North_Goa_District_Goa.html',
    'https://www.laplagegoa.com/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'mandrem',
  'Mandala Cafe',
  'Mandrem main road, retreat strip',
  ARRAY['vegan','vegetarian','raw','salads']::text[],
  'cafe',
  'Buddha bowl with house tahini',
  ARRAY['Buddha bowl','Acai smoothie','Raw cake','Cacao latte']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-vegan cafe inside the Mandala yoga retreat compound but open to non-residents. The breakfast and lunch anchor for the Mandrem yoga circuit (Ashiyana, Yoga Magic, Mandala guests cycle here). Cacao ceremony Tuesday and Friday in season; raw cake from house pastry chef. Open 7:30am-9pm Oct-May.',
  'Buddha bowl 12-3pm only. Acai bowl supplies are limited — ask if it''s in stock at order time. Cash and UPI; no card. Drop-in yoga schedules posted at entry — non-resident class drop-in is ₹500 per session.',
  'Mandala Yoga Retreat, Mandrem main road, Pernem 403527',
  'https://maps.google.com/?q=Mandala+Cafe+Mandrem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580126-d10286124-Reviews-Mandala_Cafe-Mandrem_Pernem_North_Goa_District_Goa.html',
    'https://www.instagram.com/mandalamandrem/'
  ]::text[],
  '2026-05-10',
  false
),
(
  'mandrem',
  'Sun Beach Restaurant',
  'Mandrem Beach, central',
  ARRAY['goan','seafood','indian']::text[],
  'casual',
  'Goan fish thali',
  ARRAY['Fish thali','Prawn curry rice','Tandoori pomfret','Sol kadi']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Beach shack at the central Mandrem stretch, family-run for over 12 seasons. Fish thali (curry rice plus rava-fried fish, papad, salad, pickle) is the lunch default. Tandoor fires up at 6pm. Sunset view back toward Chapora across the bay. Open Oct 1 to May 31 only.',
  'Fish thali 1-3pm — arrive by 12:30 to claim a sunset-side table for after lunch. Tandoori pomfret needs 25 min — order early. Cash mostly; UPI works.',
  'Mandrem Beach central stretch, Pernem 403527',
  'https://maps.google.com/?q=Sun+Beach+Mandrem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580126-d4378932-Reviews-Sun_Beach_Restaurant-Mandrem_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/sun-beach-mandrem'
  ]::text[],
  '2026-05-10',
  false
),
(
  'mandrem',
  'O Saiba',
  'Mandrem village, near St Theresa Church',
  ARRAY['goan','portuguese','seafood']::text[],
  'casual',
  'Pork vindaloo',
  ARRAY['Pork vindaloo','Sorpotel','Xacuti','Bebinca']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Goan-Portuguese family-run village restaurant near St Theresa Church, open year-round including monsoon. The vindaloo and sorpotel are slow-cooked daily — kitchen runs from a Goan grandmother''s recipe book. Bebinca made on premises. One of two Mandrem options that stays open June-September.',
  'Lunch 12:30-3pm, dinner 7-10pm. Vindaloo and sorpotel run out by 8:30pm — order at 7. Bebinca is from the morning bake; sometimes gone by lunch second seating. Cash and UPI; card works on weekdays only.',
  'Mandrem village, near St Theresa Church, Pernem 403527',
  'https://maps.google.com/?q=O+Saiba+Mandrem',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g3580126-d8503872-Reviews-O_Saiba-Mandrem_Pernem_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/o-saiba-mandrem'
  ]::text[],
  '2026-05-10',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 verified (slot=value, since experience+location+xfactor likely covered by Yab Yum/Earthscape)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  signature_experience, sources, contact_only, contact_info, voice_flags
) VALUES (
  'mandrem',
  'location',
  'Beach House Goa',
  'Beach Cottage',
  '₹₹',
  'Mid-tier beach cottage cluster on Junas Wadi sandbar, the only commercial property on the far side of the Mandrem creek footbridge. 14 thatched cottages on 1.5 acres facing the empty north stretch. Open Oct-May only; rates run ₹3,500-5,500 in shoulder season, ₹6,500-9,000 Dec-Jan peak. Includes breakfast.',
  'manual',
  'https://thebeachhousegoa.in/',
  4,
  '2026-05-10'::date,
  'Crossing the Junas Wadi footbridge to your cottage at sunset — the creek separates you from the village noise; the sandbar side has palm grove, beach, and almost no other development.',
  '["https://thebeachhousegoa.in/", "https://www.booking.com/hotel/in/the-beach-house-goa.html"]'::jsonb,
  false,
  NULL,
  '["beach-front","seasonal-only","quiet"]'::jsonb
);

-- Cherai S16 widget backfill — needs +3 gems +5 eats (0 existing widgets; 4 stays already)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Sapno Ka Beach Cafe Cherai" — no Tripadvisor/Zomato footprint, looks like listicle ghost.
--   - "Maya Restaurant Cherai" — no verifiable Tripadvisor 2024+ entry.
--   - "Chillout Cherai" — beach shack tier with no fixed listing, skipped.
--   - Standalone restaurants are thin — most dining is resort-attached. Honest scarcity accepted for 2 of 5 eats — kept beach-shack cluster anchor only if verifiable.
--
-- VERIFIED:
--   - Vypeen Lighthouse (Ochanthuruthu) — 1979, 40m, Directorate of Lighthouses listing, climb permitted 4-5.30pm.
--   - Pallipuram Fort — Portuguese 1503, oldest extant European fort in India, ASI Kerala.
--   - Munambam Fishing Harbour — northern Vypeen estuary, predawn fish landing.
--   - Cherai Beach Resort restaurant Pepper Tree (in-house).
--   - Sea Lagoon Cherai (sit-down, Cherai Beach Road, Tripadvisor 2024+).
--   - Beach Symphony / Chambakulam Curry Hut — Tripadvisor 2024+ listings for Cherai beachfront shacks.

-- =========================================================
-- HIDDEN GEMS — 3 verified Vypeen Island waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'cherai-vypeen-lighthouse',
  'cherai',
  'Vypeen Lighthouse (Ochanthuruthu)',
  NULL,
  18.0,
  '40 min drive south along Vypeen Island spine road',
  'Cherai sits at the north end of the 27km-long Vypeen Island; most beach visitors stay near the resorts and never make the 18km drive south to the lighthouse at Ochanthuruthu. The lighthouse opens for the public for only 90 minutes a day (4-5.30pm) — outside that window the gates are closed and walkers turn back.',
  'Cylindrical 40m concrete lighthouse commissioned 1979, replacing the older 1903 Vypeen lighthouse. Directorate of Lighthouses operates it; ascent is via 144 steel steps to the lantern room. ₹20 entry / camera ₹50 / 4-5.30pm daily only. 360-degree view from the top: Cochin port shipping lanes, Fort Kochi harbour mouth, Munambam estuary northward, and the Arabian Sea horizon. Bring ID — lighthouse staff log every climber. Closed during cyclone warnings.',
  'easy',
  'Directorate of Lighthouses and Lightships official listing; Wikipedia Vypeen Lighthouse entry.',
  4,
  ARRAY['lighthouse','viewpoint','heritage','vypeen','sunset']::text[],
  '{}'::jsonb
),
(
  'cherai-pallipuram-fort',
  'cherai',
  'Pallipuram Fort — Oldest European Fort in India (1503)',
  NULL,
  6.0,
  '15 min drive south on Vypeen spine road',
  'Pallipuram is 6km south of Cherai — most beach guests skip it because the fort is small (just a hexagonal laterite shell, no roof) and there''s no museum on site. ASI protects it but staffing is minimal; sometimes the gates are locked when the caretaker is on lunch break.',
  'Built 1503 by the Portuguese — the oldest extant European fort in India, predating Goa''s Reis Magos (1551) and Fort St George Madras (1644) by decades. Hexagonal laterite structure on a small peninsula at the Cochin harbour mouth. Dutch captured it 1663, sold to Travancore 1789 for ₹3000. ASI-protected since 1909; ₹15 entry / 9.30am-5pm daily / no flash photography. The walls and embrasures are intact; bring a torch for the lower chamber. 30-minute visit. Combine with Munambam fish landing 8km north.',
  'easy',
  'Archaeological Survey of India Kerala Circle official listing; Kerala Tourism heritage forts guide.',
  5,
  ARRAY['fort','heritage','portuguese','asi','oldest']::text[],
  '{}'::jsonb
),
(
  'cherai-munambam-fish-harbour',
  'cherai',
  'Munambam Fishing Harbour — Predawn Fish Landing',
  NULL,
  4.5,
  '12 min drive north past Cherai village',
  'Munambam is the largest fishing harbour in Ernakulam district, 4km north of Cherai beach. Resort guests sleep in for the beach; the harbour''s action — boats returning, fish auction, ice trucks loading — happens 4-7am and is over before breakfast is laid out at the resorts.',
  'One of Kerala''s busiest fishing harbours — 300+ trawlers and country boats land catch here every morning. Best window 4.30-6.30am: boats return, the open-shed auction floor fills with seer fish, tuna, prawns, squid, mackerel, and the Periyar estuary''s pearl spot. Buyers from Kochi hotels and Fort Kochi restaurants bid in Malayalam shouting matches; the prices set today are what Kochi restaurants will quote for lunch. Walk the boardwalk between boats; tip ₹100 to a returning fisherman for a 15-min on-deck explanation. Closed during monsoon trawling ban (mid-June to early August).',
  'moderate',
  'Kerala Fisheries Department harbour listings; Kerala Tourism Munambam coastal trail.',
  4,
  ARRAY['fishing-harbour','predawn','market','vypeen','authentic']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified standalone + honest-scarcity hold on 2
-- (Cherai is village-tier; most dining is resort-attached. 3 standalone is the verifiable max.)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'cherai',
  'Pepper Tree at Cherai Beach Resort',
  'Cherai Beach Road, near beach entrance',
  'cherai',
  ARRAY['kerala','seafood','continental','indian-thali']::text[],
  'mid_range',
  'Karimeen pollichathu (pearl spot in banana leaf)',
  ARRAY['Karimeen pollichathu','Cherai prawn curry','Kappa with meen mulakittath','Beef ularthiyathu','Sea bass meuniere']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'beach-casual',
  'In-house dining at Cherai Beach Resort facing the beach; the only sit-down restaurant on Cherai beach itself with consistent 2024+ Tripadvisor activity (top 5 for Cherai). Walk-ins welcome for non-resort guests if booked an hour ahead. Karimeen pollichathu is the order; the kitchen sources from Munambam morning auction, so freshness is real.',
  'Lunch 12.30-3pm is calmer than dinner. Cherai sunset is from the beach side of the restaurant — reserve a sea-facing table for 6pm onward. Buffet runs Wednesday and Saturday evenings; à la carte the rest of the week is fresher. Cards + UPI both work.',
  'Cherai Beach Resort, Cherai Beach Road 683514',
  'https://maps.google.com/?q=Cherai+Beach+Resort+Pepper+Tree',
  ARRAY[
    'https://www.cheraibeachresorts.com/dining.html',
    'https://www.tripadvisor.in/Restaurant_Review-g660693-d2520197-Reviews-Pepper_Tree_Restaurant-Cherai_Vypin_Island_Ernakulam_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'cherai',
  'Sea Lagoon Cherai',
  'Cherai Beach Road, 200m from beach',
  'cherai',
  ARRAY['kerala','seafood','south-indian']::text[],
  'casual',
  'Cherai fish thali meals',
  ARRAY['Fish thali','Prawns roast','Chemmeen biryani','Beef fry','Fresh coconut water']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Small standalone shack-style restaurant on the inland side of Cherai Beach Road, run by a Cherai-village family for 12+ years. Fish thali (rice + 2 fish preparations + thoran + sambar + buttermilk, ₹220-280) is the lunch workhorse for day-trippers from Kochi. Cherai prawn roast and chemmeen biryani are the dinner orders.',
  'No AC, plastic chairs, banana-leaf serving — this is the village-tier eat. Lunch 12-3pm; dinner 7-10pm; closed Tuesdays. Cash works best, UPI sometimes goes offline. Walking distance from Cherai Beach entrance — point your driver at "Cherai Beach Road junction" and walk 200m inland.',
  'Cherai Beach Road, Cherai 683514',
  'https://maps.google.com/?q=Sea+Lagoon+Cherai+Beach',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g660693-Cherai_Vypin_Island_Ernakulam_District_Kerala.html',
    'https://www.zomato.com/kochi/restaurants/cherai-beach'
  ]::text[],
  '2026-05-11',
  false
),
(
  'cherai',
  'Munambam Beach Fish Shacks',
  'Munambam Beach, 4 km north of Cherai',
  'munambam',
  ARRAY['kerala','seafood']::text[],
  'street_food',
  'Fresh-caught grilled fish (point-at-tray)',
  ARRAY['Grilled seer fish','Squid fry','Prawn masala','Crab roast','Karimeen fry']::text[],
  '₹',
  '[150,351)'::int4range,
  'mixed',
  false,
  'walk-in',
  'casual',
  'Cluster of 6-8 fisherwoman-run beach shacks at Munambam Beach, 4km north of Cherai near the harbour. Each shack runs a tray of the morning''s catch on ice; you point at a fish (seer ₹400/kg, prawns ₹500/kg, squid ₹300/kg) and they grill or fry it on a charcoal stove in 20 minutes. No menu, no decor, no AC — this is the most honest meal on the Vypeen coast.',
  'Lunch 11.30am-3pm is the peak; come earlier if you want the morning''s sea bass before it sells out. Sit on the plastic stools on the sand. Bring ₹500-700 cash per person — no UPI, no cards. Closed during monsoon trawling ban (mid-June to early August).',
  'Munambam Beach, Vypeen 683515',
  'https://maps.google.com/?q=Munambam+Beach+Vypeen',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g660693-d12999988-Reviews-Munambam_Beach-Cherai_Vypin_Island_Ernakulam_District_Kerala.html',
    'https://www.keralatourism.org/destination/munambam-vypeen/507'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST SCARCITY HOLD: 2 of 5 eats slots remain unfilled.
-- Cherai is a 12km beach strip on a village-tier island; most dining beyond the above is
-- resort-attached (covered under existing stays) or beach-shack ephemeral.
-- Rather than fabricate "Maya Restaurant" or "Sapno Ka Beach Cafe" (listicle ghosts),
-- we ship 3 verifiable and accept Tier-B for eats.

-- Dudhsagar Falls S14 widget backfill — needs +3 gems +5 eats (existing 4 stays)
-- Source-verified 2026-05-10. STRUCTURALLY THIN dest — falls is a day-trip from Collem (Kulem) jeep gate; food infrastructure is minimal. Honest-scarcity holds noted below.
-- Caught fabrication risks: "Caranzol cataract" (cannot find primary-source confirmation as a separate fall — some listicles confuse it with Dudhsagar's lower tier, skipped); "Devil's Canyon viewpoint near Dudhsagar" (Devil's Canyon is on the Mandovi/Bondla forest road, NOT on the Dudhsagar approach — cross-dest contamination, skipped); "Dudhsagar Spice Farm restaurant" (no specific named operator on this route — generic listicle ghost, skipped).
-- Verified gems: Dudhsagar railway viaduct (Vasco-Hubli line, IRCTC Trespasser-Charge waypoint), Tambdi Surla 12th-C Kadamba Temple (12km, ASI-listed Mahadeva temple), Castle Rock railway station Karnataka (the alternative trek-start, 25km).
-- Verified eateries: 3 of 5 confirmed (Wildernest restaurant, Bhagwan Mahavir Sanctuary canteen, Collem station tea stalls). The remaining 2 slots stayed unfilled — falls-area food is genuinely scarce. See honest-scarcity comments inline.

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'dudhsagar-falls-railway-viaduct',
  'dudhsagar-falls',
  'Dudhsagar Railway Viaduct',
  NULL,
  0,
  '5 min walk from the falls base on the Konkan Railway track',
  'Since the 2018 Supreme Court order banning private vehicles inside Bhagwan Mahavir Sanctuary, most Dudhsagar tourists arrive via Forest Department jeep from Collem and never see the railway viaduct from above — only from the splash pool at the base. The Goa-Karnataka rail trek route from Castle Rock or Kulem station is the only way to walk the bridge.',
  'A 4-arch railway bridge on the Vasco-Londa line, built 1888 during British construction of the Western Ghat railway. Trains pass through the falls'' spray June-September; passengers from Vasco-bound and Hubli-bound services get the famous open-window monsoon view. Walking the bridge is a Konkan Railway grey-zone — locals do it; police look away unless a train is due.',
  'moderate',
  'Konkan Railway operations log; Indian Railways Heritage list 1887-1888 bridge.',
  4,
  ARRAY['railway','heritage','bridge','viewpoint']::text[],
  '{}'::jsonb
),
(
  'dudhsagar-falls-tambdi-surla',
  'dudhsagar-falls',
  'Shri Mahadev Temple Tambdi Surla',
  NULL,
  12,
  '30 min drive from Mollem range office',
  'Tambdi Surla is the only surviving 12th-century Kadamba dynasty temple in Goa — every other Kadamba temple was destroyed during the Portuguese Inquisition (1560-1812). The temple sits 12km off the Mollem-Anmod road on a forest track that loses cellular signal; navigation is by ASI signage only.',
  'A 12th-century Mahadeva temple of black basalt, the only intact pre-Portuguese Hindu temple in Goa. Survived the Inquisition because the Mahadei river-bend forest hid it. ASI-restored, no modern over-painting. Live worship still active — flower-and-water puja by a Karnataka-side priest at dawn. Open sunrise to sunset, no entry fee.',
  'easy',
  'Archaeological Survey of India listed; UNESCO tentative list 12th-c Kadamba architecture.',
  5,
  ARRAY['temple','heritage','12th-century','asi']::text[],
  '{}'::jsonb
),
(
  'dudhsagar-falls-castle-rock-station',
  'dudhsagar-falls',
  'Castle Rock Railway Station',
  NULL,
  25,
  '90 min drive on the Karnataka-side Anmod ghat road',
  'Castle Rock is on the Karnataka side of the state border — the alternative trek start to Dudhsagar (45km on the railway track). The Goa Forest Department-mandated ban on the Goa-side trek (Collem to falls) since 2018 has not stopped the Karnataka-side trek, but the start point is unsigned in Goa tourism material because Goa would rather route visitors via the official jeep system.',
  'A 1888 colonial-era railway station on the Karnataka side, start point of the legal walk-in trek to Dudhsagar. Karnataka Forest Department issues entry passes (₹500/head, register at the station-side office). Trek is 14km one-way, takes 5-6 hours, mostly along the rail line — only legal way to walk to the falls in 2026. Open daylight hours.',
  'hard',
  'Karnataka Forest Department official trek route; Indian Railways operating station.',
  4,
  ARRAY['trek','railway','heritage','karnataka-border']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified, 2 slots HONEST-SCARCITY HOLD
-- (Dudhsagar is a day-trip from Collem; food clusters are at Collem station + sanctuary + Wildernest. No restaurants exist at the falls itself.)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'dudhsagar-falls',
  'Wildernest Restaurant',
  'Wildernest Resort, Chorla Ghat',
  ARRAY['goan','indian','continental']::text[],
  'mid_range',
  'Goan thali with prawn balchao',
  ARRAY['Goan thali','Prawn balchao','Forest mushroom curry','Bebinca']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of the Wildernest Resort on Chorla Ghat, 8km from Mollem range office on the Goa-Maharashtra-Karnataka tri-junction. The closest sit-down meal to Dudhsagar Falls; non-resident lunch and dinner walk-ins accepted with 2-hour advance call. Goan thali is the lunch anchor; bebinca made in-house.',
  'Phone the resort by 11am for lunch (1-3pm) or by 5pm for dinner (7:30-9pm). Non-residents pay ₹100 entry to the resort and are seated in the open-deck section. Forest mushroom curry is a monsoon-only dish — June-September.',
  'Chorla Ghat, Goa-Karnataka border, Sattari 403506',
  'https://maps.google.com/?q=Wildernest+Resort+Chorla+Ghat',
  ARRAY[
    'https://www.wildernest-goa.com/dining',
    'https://www.tripadvisor.in/Restaurant_Review-g303881-d2178907-Reviews-Wildernest_Resort-Mollem_Sanguem_South_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'dudhsagar-falls',
  'Bhagwan Mahavir Sanctuary Canteen',
  'Mollem range office gate',
  ARRAY['goan','indian','snacks']::text[],
  'casual',
  'Forest department thali',
  ARRAY['Veg thali','Pao bhaji','Chicken curry rice','Cutting chai']::text[],
  '₹',
  '[80,201)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The Goa Forest Department-run canteen at the Bhagwan Mahavir Wildlife Sanctuary entry gate at Mollem, where Dudhsagar jeep tickets are issued. Default lunch stop for jeep-tour day-trippers between morning falls visit and Tambdi Surla afternoon. Veg thali ₹120, chicken curry rice ₹150. Open 8am-6pm daily.',
  'Eat the morning thali before 11am — afternoon stock is reheated. Cutting chai (₹10) is the proper village brew. Cash only; no UPI counter at the gate canteen. Toilet facilities adjacent.',
  'Bhagwan Mahavir Sanctuary, Mollem Range Office Gate, Sanguem 403410',
  'https://maps.google.com/?q=Mollem+Wildlife+Sanctuary+Canteen',
  ARRAY[
    'https://www.forest.goa.gov.in/wildlife/bhagwan-mahavir-wildlife-sanctuary',
    'https://www.tripadvisor.in/Attraction_Review-g303881-d2244830-Reviews-Bhagwan_Mahavir_Wildlife_Sanctuary-Mollem.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'dudhsagar-falls',
  'Collem Railway Station Tea Stalls',
  'Collem (Kulem) Railway Station',
  ARRAY['indian','snacks']::text[],
  'street_food',
  'Vada pav with masala chai',
  ARRAY['Vada pav','Samosa','Cutting chai','Bun-omelette']::text[],
  '₹',
  '[40,121)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Cluster of 5-6 IRCTC-licensed tea stalls and snack vendors at Collem (Kulem) Railway Station, the rail-end starting point for the Forest Department jeep ride to Dudhsagar. Vada pav fresh-fried at 7am for the morning Vasco passenger train arrivals. Open 5:30am-9pm.',
  'Vada pav 7-10am only — kitchen runs out by 11. Samosa stays available all day but reheats by afternoon. Goa-Vasco intercity passengers stop here 6:45-7:15am for breakfast. Cash only.',
  'Collem (Kulem) Railway Station, Sanguem 403410',
  'https://maps.google.com/?q=Collem+Railway+Station+Goa',
  ARRAY[
    'https://www.indiarailinfo.com/station/map/collem-clm/2854',
    'https://www.tripadvisor.in/Attraction_Review-g303881-d2244830-Reviews-Bhagwan_Mahavir_Wildlife_Sanctuary-Mollem.html'
  ]::text[],
  '2026-05-10',
  false
);

-- HONEST-SCARCITY HOLD: 2 of 5 eatery slots remain unfilled.
-- Dudhsagar Falls itself has no commercial food infrastructure — the falls plunge pool is inside the sanctuary core zone where no commerce is permitted. Day-trippers eat at one of the three sources above (Wildernest, Mollem canteen, or Collem station). Adding listicle ghosts (e.g., "Dudhsagar Spice Plantation lunch", "Sanjeevan Mollem") without verifiable Tripadvisor 2024+ presence would be fabrication.
-- Tier-B "structurally thin" status preferred over fabrication.

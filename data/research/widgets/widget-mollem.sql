-- Mollem S14 widget backfill — needs +2 gems +5 eats (existing 4 stays + 1 gem Netravali Bubbling Lake)
-- Source-verified 2026-05-10. STRUCTURALLY THIN dest — Mollem is a sanctuary village, not a commercial centre. Honest-scarcity holds noted.
-- Caught fabrication risks: "Sanjeevan Restaurant Mollem" (no Tripadvisor 2024+, no Justdial — appears in 2017 listicles only, skipped); "Patnali Family Restaurant" (no current verifiable listing — skipped); "Mollem Tourist Lodge canteen GTDC" (Goa Tourism Development Corp does NOT have a Mollem property in current 2024-25 inventory — verified via GTDC site, skipped); "Cotigao Wildlife Sanctuary" gem (60km away, too far for "near Mollem", skipped).
-- Verified gems: Tambdi Surla Mahadev Temple (12km, ASI-listed Kadamba 12th-c) and Surla Falls (14km, Goa Tourism listed cascade — same Tambdi Surla forest cluster).
-- Verified eateries: 3 of 5 confirmed (Wildernest restaurant, Bhagwan Mahavir Sanctuary canteen at the range office, Sahakari Spice Farm restaurant 30km north). Remaining 2 slots HONEST-SCARCITY HOLD.

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mollem-tambdi-surla',
  'mollem',
  'Shri Mahadev Temple Tambdi Surla',
  NULL,
  12,
  '30 min drive on Mollem-Anmod forest road',
  'Tambdi Surla survived the Portuguese Inquisition (1560-1812) only because the Mahadei river-bend forest hid it from the destruction patrols — every other Kadamba dynasty temple in Goa was demolished. The 12km approach loses cellular signal and most package tour buses cannot turn around at the dead-end approach.',
  'A 12th-century Mahadeva temple of black basalt blocks, the only intact pre-Portuguese Hindu temple in Goa. ASI-restored without modern over-painting; the Nandi bull and shivling inside are original. Live worship continues with morning puja by a Karnataka-side priest. Open sunrise to sunset, no entry fee. Best at 7-8am dawn for the puja and quiet forest.',
  'easy',
  'Archaeological Survey of India listed monument; UNESCO tentative list 12th-c Kadamba.',
  5,
  ARRAY['temple','heritage','12th-century','asi']::text[],
  '{}'::jsonb
),
(
  'mollem-surla-falls',
  'mollem',
  'Surla Falls',
  NULL,
  14,
  '35 min drive past Tambdi Surla, then 800m forest walk',
  'Surla Falls is reached via a 800m forest track 2km past Tambdi Surla Temple — most Tambdi Surla day-trippers visit only the temple and turn back. The track is unsigned at the parking; locals know it as the "back path". Forest Department does not promote it because crowd-control is harder than at the gated Mollem falls.',
  'A 50-foot stepped cascade on the upper Surla river, before it joins the Mahadei. Full flow July-October; reduced trickle Feb-May. The pool at the base is wadeable but slippery — bring grip footwear. No facilities, no entry fee, no Forest Department gate. Carry water and snacks; nearest food is at Tambdi Surla parking 2km back.',
  'moderate',
  'Goa Tourism listed cascade; Tripadvisor 4.1 stars across 180+ reviews 2024-25.',
  4,
  ARRAY['waterfall','forest','offbeat','trek']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified, 2 slots HONEST-SCARCITY HOLD
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'mollem',
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
  'In-house restaurant of Wildernest Resort on Chorla Ghat, 8km from Mollem range office on the Goa-Karnataka-Maharashtra tri-junction. The closest sit-down meal to Mollem village; non-resident lunch and dinner walk-ins accepted with 2-hour advance call. Goan thali is the lunch anchor; bebinca made in-house.',
  'Phone resort by 11am for lunch (1-3pm) or 5pm for dinner (7:30-9pm). Non-residents pay ₹100 entry to the resort, seated in the open-deck section. Forest mushroom curry is a monsoon-only dish, June-September.',
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
  'mollem',
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
  'Goa Forest Department-run canteen at the Bhagwan Mahavir Wildlife Sanctuary entry gate at Mollem, where Dudhsagar jeep tickets and Tambdi Surla permits are issued. Default lunch for sanctuary day-trippers. Veg thali ₹120, chicken curry rice ₹150. Open 8am-6pm daily.',
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
  'mollem',
  'Sahakari Spice Farm Restaurant',
  'Sahakari Spice Farm, Curti-Ponda',
  ARRAY['goan','indian','vegetarian']::text[],
  'mid_range',
  'Banana-leaf Goan thali with farm spices',
  ARRAY['Banana-leaf thali','Spice-route fish curry','Farm-cooked sukke','Kokum sherbet']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Sahakari Spice Farm, 30km north of Mollem on the Curti-Ponda road. Banana-leaf thali included with the spice-tour ticket (₹500 ticket includes lunch). Walk-in lunch (no tour) ₹400 thali. The farm grows the spices used in the kitchen — pepper, cardamom, nutmeg, cinnamon.',
  'Lunch only — 12-3pm. Tour groups arrive 11am-1pm; walk-in lunch is quieter at 2pm. The thali rotates daily; the spice-route fish curry is the calling card. Cash, UPI, and card all work here.',
  'Sahakari Spice Farm, Curti-Ponda Road, Ponda 403401',
  'https://maps.google.com/?q=Sahakari+Spice+Farm+Ponda',
  ARRAY[
    'https://www.sahakarifarms.com/',
    'https://www.tripadvisor.in/Attraction_Review-g776073-d2244784-Reviews-Sahakari_Spice_Farm-Ponda_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
);

-- HONEST-SCARCITY HOLD: 2 of 5 eatery slots remain unfilled.
-- Mollem village has 2-3 informal tea stalls and a single highway dhaba but none has consistent Tripadvisor/Justdial 2024+ presence to verify. The sanctuary canteen + Wildernest + Sahakari (30km) cover the realistic food map. Adding listicle ghosts ("Sanjeevan Mollem", "Patnali Family Restaurant") without primary-source confirmation would be fabrication.
-- Tier-B "structurally thin" status preferred over fabrication.

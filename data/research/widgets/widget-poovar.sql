-- Poovar S16 widget backfill — needs +3 gems +5 eats
-- HONEST SCARCITY: Poovar is an island-resort destination (Poovar Island Resort, Travancore Heritage, Poovar Beach
-- Resort) on a backwater-island accessed only by boat — there is effectively ZERO standalone street commerce.
-- Food = resort restaurants or village shacks at the Poovar boat-jetty (mainland) only. Shipping 3 verifiable eats,
-- holding 2 eats slots as honest-scarcity (commented below).
-- Source-verified 2026-05-11.
-- Caught fabrication risks:
--   - "Backwater Fish Eateries" — vague listicle pattern, no specific operator, skipped.
--   - "Mathur Aqueduct" — 50km in Kanyakumari district, TN — cross-state contamination, skipped.
--   - "Padmanabhapuram Palace" — 50km, in Tamil Nadu, would belong to a TN dest, skipped.
--   - "Houseboat operators" — Kerala has 1,800+ houseboats per KTDC; only KTDC-licensed Poovar operators verifiable.
-- Verified gems: Neyyar Dam + Wildlife Sanctuary (lion safari, 30km, KFD), Sivananda Yoga Ashram Neyyar (1978, international), Azhimala/Aazhimala Shiva (12km — same as kovalam belt).

-- =========================================================
-- HIDDEN GEMS — 3 verified Poovar-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'poovar-neyyar-dam-sanctuary',
  'poovar',
  'Neyyar Dam and Wildlife Sanctuary',
  NULL,
  30,
  '60 min by car east via Balaramapuram',
  'Poovar tourists come for the island boat-resort experience and rarely venture inland; Neyyar Dam Wildlife Sanctuary is 30km east on the Western Ghats edge. The lion safari + crocodile rehabilitation centre is operated by Kerala Forest Department and bookable on-site only — not through Poovar resort travel desks, which sell only the backwater package.',
  'Built 1958, the Neyyar reservoir (9.06 sq km) feeds 4 districts; the 128 sq km wildlife sanctuary around it contains the only enclosed lion safari in Kerala (10 Asiatic-Gir lions in a 6-hectare enclosure, ₹100/head bus ride, 15 min). Crocodile rehabilitation centre next door has 70+ mugger crocodiles. Boat ride on the reservoir ₹400/30 min. Trekking permits for Agasthyakoodam (1868m peak) issued from the sanctuary office Jan-March; lottery selection.',
  'easy',
  'Kerala Forest Department Neyyar sanctuary listing; KSWLS lion-safari official site.',
  4,
  ARRAY['wildlife','dam','safari','sanctuary','trek-base']::text[],
  '{}'::jsonb
),
(
  'poovar-sivananda-yoga-neyyar',
  'poovar',
  'Sivananda Yoga Vedanta Dhanwantari Ashram, Neyyar Dam',
  NULL,
  32,
  '65 min by car east via Balaramapuram',
  'The Sivananda Yoga international network is famous in Quebec (HQ), Madurai, Madhya Pradesh, Spain — its first Indian ashram, the Dhanwantari Ashram at Neyyar Dam, gets less press than the Madurai centre despite being the network''s original India base since 1978. International yoga retreat tourists fly into Trivandrum specifically for this; Kerala beach tourists don''t know it''s 30km from Poovar.',
  'Founded by Swami Vishnudevananda 1978, the 12-acre forest ashram runs 2-week yoga teacher training courses + 1-week beginner retreats year-round; daily satsang 6am + 8pm, two 2-hour asana classes, vegetarian meals, no phones in dorm areas. Day visits ₹200/head — silent walking trails around the reservoir, lecture hall, herbarium. Trekkers also use the ashram as Agasthyakoodam base. Booking via sivananda.org.in.',
  'easy',
  'Sivananda Yoga Vedanta Centres global network; ashram founded 1978 documented in operator site sivananda.org.in.',
  4,
  ARRAY['yoga','ashram','retreat','meditation','offbeat']::text[],
  '{}'::jsonb
),
(
  'poovar-azhimala-shiva',
  'poovar',
  'Aazhimala Shiva Statue (24m Gangadhareshwara)',
  NULL,
  12,
  '25 min by car north toward Kovalam',
  'The 24m granite-and-concrete seated Shiva sculpture on Aazhimala cliff was inaugurated April 2022 — newer than the standard South India sculpture circuit (Murudeshwar 1984, Mauli Beach figure 2021). Poovar resort guests who never leave the island miss it; the cliff sits 12km north on the way to Kovalam.',
  'Three years of work by sculptor Devraj Reghupathy. The seated Gangadhareshwara pose (Shiva holding the Ganga in his matted hair) faces west; sunset views drop into the Lakshadweep Sea. The cliff platform sits 30m above the shoreline; the small Aazhimala Beach below is a fishing cove with no shacks. Free entry, dawn-dusk. Combine with Vizhinjam Lighthouse 4km north.',
  'easy',
  'Kerala Tourism Aazhimala listing; sculptor''s own site devrajshilpi.com documented installation April 2022.',
  4,
  ARRAY['sculpture','shiva','viewpoint','sunset','cliff']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified Poovar restaurants (2 slots honest-scarcity unfilled)
-- =========================================================
-- Honest-scarcity holds (TWO eats slots unfilled):
--   Slot 4: Poovar island-village fishing-cove shack — no operator with verifiable Tripadvisor 2024+ or own website.
--   Slot 5: Mainland Poovar-jetty roadside dhaba — generic, no named operator passes verification.
-- These remain unfilled rather than fabricate. Dest holds at 3 eats — flip B → A blocked until backfill.

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code, established_year,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'poovar',
  'Octopus Restaurant (Poovar Island Resort)',
  'Poovar Island Resort, accessible only by resort boat',
  'poovar-island',
  ARRAY['kerala','seafood','continental','indian']::text[],
  'fine_dining',
  'Karimeen pollichathu with Kerala red rice',
  ARRAY['Karimeen pollichathu','Tiger prawn moilee','Kerala fish curry meal','Konju varuthathu','Banana fritters']::text[],
  '₹₹₹₹',
  '[1500,3001)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  NULL,
  'Resort restaurant on Poovar Island Resort — accessible only via the resort''s shuttle boat from Poovar jetty. The island sits where the Neyyar River meets the Arabian Sea; the open-air deck overlooks the river-mouth. Kerala-cuisine-led menu, with the karimeen and prawn dishes sourced from same-morning Neyyar river catch.',
  'Day-pass for non-residents: book at the resort gate 24h ahead (₹2,500/head includes boat + lunch + pool access). Sunset arrival 5pm beats the dinner rush. The deck tables on the river-side cost the same as inside — request specifically.',
  'Poovar Island Resort, Pozhiyoor PO, Poovar 695513',
  'https://maps.google.com/?q=Poovar+Island+Resort',
  ARRAY[
    'https://poovarislandresorts.com/dining/',
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d2335617-Reviews-Poovar_Island_Resort_Restaurant-Poovar_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'poovar',
  'Tides Restaurant (The Travancore Heritage)',
  'Chowara, 8km north of Poovar jetty',
  'chowara',
  ARRAY['kerala','ayurveda-cuisine','continental']::text[],
  'fine_dining',
  'Kerala ayurveda thali (sattvic)',
  ARRAY['Ayurveda thali','Karimeen moilee','Idiyappam with vegetable stew','Banana halwa','Tender coconut payasam']::text[],
  '₹₹₹₹',
  '[1500,2801)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'smart-casual',
  NULL,
  'The Travancore Heritage Resort restaurant — heritage Kerala-style resort 8km north of Poovar jetty (en route to Kovalam), built around a 200-year-old transplanted Padmanabhapuram-style nalukettu courtyard house. Pure-veg ayurveda-cuisine line is the speciality: dishes designed by in-house ayurveda doctors with no onion/garlic, low salt, season-aligned vegetables. Non-veg also available on the standard menu.',
  'Day-pass with lunch + pool: ₹2,200/head, book at gate 4h ahead. The ayurveda thali is the differentiated order; the standard Kerala meals are also good but less unique. The cliff-side dining deck (separate from the indoor restaurant) needs booking — free upgrade if you ask at check-in.',
  'Chowara PO, Thiruvananthapuram 695501',
  'https://maps.google.com/?q=Travancore+Heritage+Chowara',
  ARRAY[
    'https://www.thetravancoreheritage.com/dining.html',
    'https://www.tripadvisor.in/Hotel_Review-g304557-d1190060-Reviews-The_Travancore_Heritage-Chowara_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'poovar',
  'Sayuri Restaurant (Estuary Island)',
  'Estuary Island Hotel, Poovar boat-access',
  'poovar-estuary',
  ARRAY['kerala','seafood','multi-cuisine']::text[],
  'mid_range',
  'Estuary fish moilee',
  ARRAY['Fish moilee','Crab roast','Kerala beef ularthiyathu','Appam','Filter coffee']::text[],
  '₹₹₹',
  '[800,1601)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  NULL,
  'Sayuri restaurant inside Estuary Island Hotel — smaller alternative to Poovar Island Resort, also boat-accessed from the Poovar jetty. The restaurant sits over the estuary water; the same-day fish catch from the Neyyar mouth is the menu signature. Lower price than Poovar Island Resort but comparable seafood quality.',
  'Day-pass + lunch ₹1,800/head — cheaper Poovar-island-experience option vs Poovar Island Resort. Boat shuttles 8am-6pm. The fish moilee + appam combination is the order; skip the Continental section.',
  'Estuary Island Hotel, Poovar 695513',
  'https://maps.google.com/?q=Estuary+Island+Poovar',
  ARRAY[
    'https://www.estuaryisland.com/dining.html',
    'https://www.tripadvisor.in/Hotel_Review-g304557-d1190083-Reviews-Estuary_Island_Resort-Poovar_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
);

-- Agent A — chorao-divar / dudhsagar-falls / mollem (Goa widget topup S46)
-- Strategy: 5 verified eateries across 3 thin-commerce Goa dests. chorao-divar +1 (Rock Inn Divar Island,
-- the only Tripadvisor-confirmed standalone restaurant on the island chain not already in DB).
-- dudhsagar-falls +2 (Jungle Book Cafe at Collem jeep-takeoff + Wild Mushroom at Dudhsagar Spa Resort
-- near Mollem checkpost — both NH4A-side and serving the post-jeep-safari lunch crowd).
-- mollem +2 (Dudhsagar Plantation farm-kitchen at Karmane village inside Mollem NP + Backwoods Camp at
-- Tambdi Surla — both genuinely Mollem-zone, both verified on Tripadvisor with 2024-2025 reviews).
-- All 5 picks have multiple independent online sources; no fabrications, no cross-state ghosts.
-- BMS Canteen / Wildernest deliberately NOT re-added (already in both dudhsagar + mollem rows per spec).
-- Sahakari Spice Farm is in Ponda (already in mollem row); Tropical Spice Plantation Keri is 25km+ from
-- Mollem → would be cross-dest with ponda-spice, skipped.
-- Source verification: 2026-05-15

-- ============================================================================
-- chorao-divar — +1 eat → flips to A-tier
-- ============================================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'chorao-divar',
  'Rock Inn Restaurant & Bar',
  'Opp School Ground, Divar Island',
  ARRAY['goan','seafood','konkani']::text[],
  'casual',
  'Rock Inn Thali (fish curry-rice with fried fish)',
  ARRAY['Rock Inn Thali','Kalva (clam) Fry','Lepo (sole fish) Fry','Goan fish curry','House urrak cocktail']::text[],
  '₹',
  '[250,500)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Family-run village bar-and-restaurant built into a natural rock-recess opposite the Divar school ground — the only Tripadvisor-rated standalone restaurant on Divar Island (4.7/5, ranked #1 of 2 on the island). Distills its own urrak and feni in-house, a working-class drinking culture that pre-dates Divar''s recent heritage-tourism rebrand.',
  'Lunch 11am-3pm and dinner 6-11pm; closed afternoons. Ask for Kalva & Lepo Fry (not on the printed menu) when river clams are in season Oct-Feb. Walk-in only; cash and UPI accepted. Reach via the free Old Goa-Divar ferry (5-min crossing, runs 7am-11pm at 5-min intervals).',
  'Opp School Ground, Divar Island, Tiswadi 403403, Goa',
  'https://maps.google.com/?q=Rock+Inn+Restaurant+Divar+Island+Goa',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g1152676-d7813872-Reviews-Rock_Inn_Restaurant_Bar-Divar_Island_North_Goa_District_Goa.html','https://www.facebook.com/RockInnRestaurantNBar/','https://www.zomato.com/goa/rock-inn-bar-restaurant-old-goa']::text[],
  '2026-05-15',
  NULL
);

-- ============================================================================
-- dudhsagar-falls — +2 eats → flips to A-tier
-- ============================================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'dudhsagar-falls',
  'Jungle Book Cafe (Jungle Book Resort)',
  'Bazarwada, Kulem (Collem), Darbandora',
  ARRAY['goan','indian','buffet']::text[],
  'casual',
  'Goan buffet thali (veg + non-veg)',
  ARRAY['Goan fish curry','Chicken xacuti','Sol kadhi','Mushroom xacuti','Local rice-and-curry combo']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The de-facto lunch stop for Dudhsagar jeep-safari travellers — sits 200m from the Kulem jeep-takeoff stand on Dudhsagar Waterfall Road. Buffet operation runs every day during the Oct 1-May 31 jeep-open window at ₹250/head (₹200 for resort guests); spice-plantation-and-lunch combo at ₹400 includes a guided plantation walk on the same property.',
  'Time your visit for 1-2pm post-jeep return when the buffet is hottest and freshest. Vegetarian travellers get a separate spread; non-veg side stays Goan (xacuti, vindaloo, fish curry-rice). Cash and card both work. Closed for fresh seating after 3pm but à la carte continues till evening for in-house resort guests.',
  'Near Dudhsagar Waterfall Road, Bazarwada, Kulem, Darbandora 403410, Goa',
  'https://maps.google.com/?q=Jungle+Book+Cafe+Kulem+Goa',
  ARRAY['https://www.booking.com/hotel/in/jungle-book-goa.html','https://www.tripadvisor.in/Hotel_Review-g8572573-d8619437-Reviews-Jungle_Book-Kulem_South_Goa_District_Goa.html','https://www.justdial.com/Goa/Jungle-Book-Cafe-Collem/0832PX832-X832-221122213517-L8A3_BZDET']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'dudhsagar-falls',
  'Wild Mushroom (Dudhsagar Spa Resort)',
  'NH-748, near Mollem Check Post, Collem',
  ARRAY['goan','indian','continental','oriental']::text[],
  'mid_range',
  'Goan vindaloo (locally spelt "Vindalhoo")',
  ARRAY['Vindalhoo','Rogan ghosh','Goan fish curry','Multi-cuisine buffet on weekends','Wild Zone Bar cashew-feni cocktails']::text[],
  '₹₹',
  '[600,1201)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'The only sit-down multi-cuisine restaurant on NH-748 between Mollem checkpost and Karnataka border — sits inside the 49-room Dudhsagar Spa Resort, walk-in distance from the Bhagwan Mahaveer ticket counter. Indian-Goan-Oriental-Continental kitchen with a sister Wild Café and Wild Zone Bar on the same premises.',
  'Service runs slow on tour-bus days (45-min wait for mains is normal during Dec-Jan peak) — order ahead by phone if you''re on a jeep-safari schedule. The Wild Zone Bar is the only formal bar in the Mollem-Collem stretch, useful for post-falls evenings when nothing else is open past 9pm. Resort is 25 minutes drive from Collem jeep-stand.',
  'Dudhsagar Spa Resort, NH-748 near Mollem Check Post, Collem 403410, Goa',
  'https://maps.google.com/?q=Dudhsagar+Spa+Resort+Wild+Mushroom+Collem',
  ARRAY['https://www.tripadvisor.com/Hotel_Review-g1833171-d1828917-Reviews-Dudhsagar_Spa_Resort-Mollem_National_Park_South_Goa_District_Goa.html','https://dudhsagarsparesort-mollem.h-rez.com/','https://www.justdial.com/Goa/Dudhsagar-Spa-Resort-Near-Mollem-Check-Post-Mollem/0832P832STDS000229_BZDET']::text[],
  '2026-05-15',
  NULL
);

-- ============================================================================
-- mollem — +2 eats → flips to A-tier
-- ============================================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'mollem',
  'Dudhsagar Plantation Farm Kitchen',
  'Karmane Village, inside Mollem National Park',
  ARRAY['goan','farm-to-table','vegetarian']::text[],
  'casual',
  'Plantation-grown organic vegetarian thali (set-menu, pre-ordered)',
  ARRAY['Plantation-grown sambar','Locally-pressed cashew chutney','Goan-style ridge gourd curry','Fresh-cut pineapple from the farm','Lemongrass tea with plantation cardamom']::text[],
  '₹₹',
  '[500,1001)'::int4range,
  'pure-veg',
  true,
  'required',
  'casual',
  'On-site farm kitchen at the Dudhsagar Plantation eco-stay (Karmane village, end of the metalled road inside Bhagwan Mahaveer Sanctuary) — pre-ordered set-menu vegetarian meals cooked entirely from the plantation''s own organic produce (cashew, betel, cardamom, papaya, jackfruit, native vegetables). The plantation is the closest working farmstay-restaurant to the Mollem checkpost.',
  'Meals must be pre-booked 24 hours ahead (kitchen runs on plantation-foraged ingredients only — no chain supply). 2024 visitors flag the breakfast chutney as a standout. Day-visitors can request lunch with a plantation tour; otherwise restaurant access is guest-priority. No à la carte — set menu at scheduled times only.',
  'Dudhsagar Plantation, Karmane Village, Mollem National Park 403706, Goa',
  'https://maps.google.com/?q=Dudhsagar+Plantation+Karmane+Mollem',
  ARRAY['https://dudhsagarplantation.com/','https://www.tripadvisor.com/Hotel_Review-g12692507-d1489619-Reviews-Dudhsagar_Plantation-Karmane_South_Goa_District_Goa.html','https://www.booking.com/hotel/in/dudhsagar-farmstay.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'mollem',
  'Backwoods Camp Streamside Kitchen',
  'Tambdi Surla side, Bhagwan Mahaveer Sanctuary',
  ARRAY['indian','goan','farm-to-table']::text[],
  'casual',
  'Streamside buffet — local-recipe vegetable and fish curry-rice (varies daily)',
  ARRAY['Daily-changing Goan vegetable curry','Camp-style fish curry-rice','Fresh-baked rotis','Camp-brewed chai','Caju feni from neighbouring village distillery']::text[],
  '₹₹',
  '[600,1201)'::int4range,
  'mixed',
  false,
  'required',
  'casual',
  'Birder-run camp kitchen near Tambdi Surla (the 12th-c Mahadev temple side of the sanctuary), founded by Goan birding guide Loven Sardinha. Wholesome buffet meals are served at a streamside open-sitout — the camp runs as a fixed-package operation (2-3 night minimum), so meals come with the bird-walk itinerary rather than as standalone covers.',
  'Not a walk-in restaurant — meals are accessible only as part of the Backwoods birding package or by advance arrangement with camp owner. Two streams flank the dining area and Sri Lanka frogmouth, Malabar trogon, and white-bellied woodpecker are all on the property checklist. Caju feni from a village still operates a 50m stroll away. November-February is the operational season.',
  'Backwoods Camp, near Tambdi Surla, Sanguem 403410, Goa',
  'https://maps.google.com/?q=Backwoods+Camp+Tambdi+Surla+Goa',
  ARRAY['https://backwoodsgoa.org/','https://www.tripadvisor.in/Hotel_Review-g2037406-d2037409-Reviews-Backwoods_Camp-Sanguem_South_Goa_District_Goa.html','https://www.birdingplaces.eu/en/birdingplaces/india/backwoods-camp']::text[],
  '2026-05-15',
  NULL
);

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- chorao-divar:    +1 eat (Rock Inn Restaurant & Bar)                         → projected B → A
-- dudhsagar-falls: +2 eats (Jungle Book Cafe, Wild Mushroom @ Dudhsagar Spa) → projected B → A
-- mollem:          +2 eats (Dudhsagar Plantation farm-kitchen, Backwoods)    → projected B → A
--
-- Total: 5 eateries across 3 dests, 0 HS-confirmed slots, 3 projected A-flips.
--
-- Source quality: every row has 2-3 independent verifiable URLs (Tripadvisor + official site +
-- Booking.com/Justdial). No listicle ghosts, no cross-state contaminations.
--
-- Cross-dest discipline:
--   - Rock Inn = Divar Island only (correct chorao-divar cluster)
--   - Jungle Book Cafe = Kulem (Collem) → dudhsagar-falls trailhead, NOT mollem village
--   - Wild Mushroom (Dudhsagar Spa) = Collem-side NH-748 → dudhsagar-falls cluster
--   - Dudhsagar Plantation = Karmane village INSIDE Mollem NP boundary, postal address "Mollem National Park" → mollem
--   - Backwoods Camp = Tambdi Surla side of Mollem sanctuary → mollem
--   - Sahakari Spice Farm (Ponda) already in mollem row — NOT re-added
--   - Tropical Spice Plantation (Keri/Ponda, 25km away) deliberately NOT added — would cross-dest with ponda-spice
--   - BMS canteen / Wildernest deliberately NOT re-added (already in both rows per spec)

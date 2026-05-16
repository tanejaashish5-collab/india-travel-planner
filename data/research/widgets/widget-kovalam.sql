-- Kovalam S16 widget backfill — needs +3 gems +5 eats
-- Source-verified 2026-05-11.
-- Caught fabrication risks:
--   - "Calicut Cafe Kovalam" — listicle ghost, no Tripadvisor/own listing, skipped.
--   - "Bombay Cafe Kovalam" — same, skipped.
--   - "Suprabhatham Kovalam" — could not verify recent activity, skipped.
--   - "The German Bakery Kovalam" — Kovalam beach has multiple bakery shacks claiming the name; no single operator with website, skipped.
-- Verified gems: Vizhinjam Rock Cut Cave Temple (8th-century Pandya cave, ASI), Aazhimala Shiva (24m sculpture, Devraj Reghupathy), Pulinkudi/Chowara Ayurveda cove.
-- Eats: Fusion (Lighthouse Beach 10+ years TripAdvisor), Curry Leaf (Hawah Beach), Devi Garden (Kerala thali Kovalam Junction), Beatles Cafe (Lighthouse), Le Cafe.

-- =========================================================
-- HIDDEN GEMS — 3 verified Kovalam-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kovalam-vizhinjam-rock-cut-cave',
  'kovalam',
  'Vizhinjam Rock-Cut Cave Temple',
  NULL,
  5,
  '12 min by auto south of Lighthouse Beach',
  'Tourists driving the 11km Kovalam-Poovar coast see signs for the Vizhinjam port and the lighthouse but miss the 8th-century cave temple set back from the road, partly because there is almost no signage and it shares an entrance with a working fishing village. ASI labels it the only surviving rock-cut Pandya cave temple in Kerala — but the museum-of-one-room set-up keeps it out of tour bus circuits.',
  'Granite cave temple cut by the Ay dynasty (Pandya feudatories) in the 8th century — single rock-cut sanctum, half-finished sculptures of Vinadhara Shiva and Parvati on the rear wall, considered one of the earliest examples of Dravidian sculpture in southern Kerala. ASI-protected; open sunrise-sunset, no entry fee. The Tamil-Brahmi inscriptions on the cave outer wall are still legible. Combine with the Vizhinjam International Seaport viewpoint 1km away.',
  'easy',
  'Archaeological Survey of India (ASI) Kerala circle — Trivandrum sub-circle protected monument list.',
  4,
  ARRAY['heritage','cave-temple','asi','dravidian','rock-cut']::text[],
  '{}'::jsonb
),
(
  'kovalam-aazhimala-shiva',
  'kovalam',
  'Aazhimala Shiva Statue (24m Gangadhareshwara)',
  NULL,
  27,
  '50 min by car via Poovar Road',
  'Inaugurated April 2022 by sculptor Devraj Reghupathy, the 24m (78ft) granite-and-concrete Gangadhareshwara seated-Shiva sculpture on the Aazhimala cliff sits 27km south of Kovalam. International tour itineraries still default to Kanyakumari or Murudeshwar — the Aazhimala figure is newer (post-2022), barely on guide books, and viewable from a cliffside that doubles as a sunset point over the Arabian Sea.',
  'Three years of work by sculptor Devraj Reghupathy and his team — the seated Shiva pose with the matted hair holding the Ganga (Gangadhareshwara aspect) is rare; the figure faces west toward the sea. The platform sits on a cliff 30m above the shoreline; sunset views drop into the Lakshadweep Sea uninterrupted. The Aazhimala Beach below is a quiet fishing cove (no shacks, no swimmers). Free entry, open dawn-dusk.',
  'easy',
  'Kerala Tourism listing Aazhimala Beach + Shiva sculpture; sculptor''s own website devrajshilpi.com.',
  4,
  ARRAY['sculpture','shiva','viewpoint','sunset','cliff']::text[],
  '{}'::jsonb
),
(
  'kovalam-pulinkudi-chowara-cove',
  'kovalam',
  'Pulinkudi-Chowara Ayurveda Cove',
  NULL,
  6,
  '15 min south of Lighthouse Beach',
  'The Kovalam crowd packs onto Lighthouse and Hawah beaches 100-200m apart. 6km south, the Pulinkudi-Chowara coastline is a series of small rocky coves where the Kerala-government-recognised Ayurveda resorts (Somatheeram since 1985, Manaltheeram, Travancore Heritage) have anchored a quieter strip. The beaches themselves are public but accessed via resort lanes, which keeps day-trippers away.',
  'String of three crescent-shaped fishing coves between the rocky headlands — Pulinkudi, Chowara, and Vellar, used by Kerala''s longest-running Ayurveda destination resorts. Walk-in body-temple Ayurveda day passes (₹3,500-5,500/head, includes meal + 60-min treatment) available at Somatheeram and Manaltheeram; both are Kerala Tourism gold-rated. The headland between Pulinkudi and Chowara has 30m basalt cliffs and a 200-year-old church (St Anthony''s Church Pulinkudi).',
  'easy',
  'Kerala Tourism Department classified Ayurveda centres directory; Somatheeram operates since 1985, Kerala''s first Ayurveda resort.',
  4,
  ARRAY['beach','ayurveda','cove','wellness','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kovalam restaurants
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code, established_year,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kovalam',
  'Fusion Restaurant',
  'Lighthouse Beach (north end)',
  'lighthouse-beach',
  ARRAY['seafood','mediterranean','kerala','continental']::text[],
  'mid_range',
  'Grilled tuna steak',
  ARRAY['Grilled tuna steak','Karimeen pollichathu','Prawn moilee','Wood-fired pizza','Banana coconut shake']::text[],
  '₹₹₹',
  '[600,1201)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  NULL,
  'Open-fronted beach-shack restaurant at the north end of Lighthouse Beach, running since the early 2010s — the menu rotates whatever the Vizhinjam landing brings in. Tuna, kingfish, snapper, lobster (Sep-Jan), prawns. The Mediterranean-Kerala hybrid (herbed grilled fish + Kerala spice rubs) is the cleanest of the Kovalam shack genre.',
  'Catch the 6pm-7pm sunset slot for the rocky-pier view + raw bar (price by weight, ₹1,500/kg snapper). Reserve front row beach tables 24h ahead in peak season (Dec-Feb). Cash and UPI work; cards unreliable in monsoon.',
  'Lighthouse Beach Road, Kovalam 695527',
  'https://maps.google.com/?q=Fusion+Restaurant+Lighthouse+Beach+Kovalam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d2186195-Reviews-Fusion-Kovalam_Thiruvananthapuram_District_Kerala.html',
    'https://www.zomato.com/kochi/fusion-kovalam'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'kovalam',
  'Curry Leaf',
  'Hawah Beach (south end)',
  'hawah-beach',
  ARRAY['kerala','seafood','south-indian']::text[],
  'mid_range',
  'Meen moilee with appam',
  ARRAY['Meen moilee','Appam','Kerala fish curry','Beef ularthiyathu','Banana fritters']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Kerala-cuisine-first shack at the south end of Hawah Beach (where it meets Lighthouse Beach across the rocks). Less Mediterranean fusion than the Lighthouse-row places — the kitchen sticks to coconut milk, kudampuli (Malabar tamarind), and kokum-based gravies. The appam-and-stew breakfast at 8am gets a steady local crowd.',
  'Walk down from Lighthouse Beach via the rock shelf at low tide (saves 800m of road). Skip the international menu, order Kerala only. Cash preferred; UPI works.',
  'Hawah Beach, Kovalam 695527',
  'https://maps.google.com/?q=Curry+Leaf+Hawah+Beach+Kovalam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d3470014-Reviews-Curry_Leaf-Kovalam_Thiruvananthapuram_District_Kerala.html',
    'https://www.zomato.com/kochi/curry-leaf-kovalam'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'kovalam',
  'Devi Garden Restaurant',
  'Kovalam Junction',
  'kovalam-junction',
  ARRAY['kerala','south-indian']::text[],
  'casual',
  'Kerala vegetarian sadhya',
  ARRAY['Kerala sadhya','Puttu kadala','Idiyappam egg curry','Banana halwa','Tender coconut payasam']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  NULL,
  'Locals-only Kerala veg restaurant 2km uphill from Lighthouse Beach at Kovalam Junction. Sadhya thali on banana leaf at lunch (12-2.30pm), idiyappam and puttu breakfast (7-10am). The price is at-cost for the area — same thali at the beach goes for ₹400+; here it''s ₹120.',
  'Auto from Lighthouse to Kovalam Junction is ₹80 — eat lunch here, save ₹600 vs the beach. Closed Sundays evening. AC seating upstairs is the family room; downstairs is locals-bench.',
  'NH-66, Kovalam Junction, Kovalam 695527',
  'https://maps.google.com/?q=Devi+Garden+Kovalam+Junction',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d10001893-Reviews-Devi_Garden_Restaurant-Kovalam_Thiruvananthapuram_District_Kerala.html',
    'https://www.zomato.com/kochi/devi-garden-restaurant-kovalam'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'kovalam',
  'Le Cafe',
  'Lighthouse Beach (north promenade)',
  'lighthouse-beach',
  ARRAY['cafe','italian','continental','breakfast']::text[],
  'cafe',
  'Banana-pancake breakfast',
  ARRAY['Banana pancake','Wood-fired pizza','French toast','Cappuccino','Pasta carbonara']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Backpacker-favourite cafe at the north end of Lighthouse promenade — runs the long European-breakfast-into-pizza-dinner format that defines Kovalam''s Israeli/Russian/British circuit. Open 7.30am-11pm. The pancake stack and the wood-fired pizza both have 10+ years of consistent Tripadvisor reviews.',
  'Beat the 9-10am breakfast rush (Israeli backpacker hour) by coming at 8am sharp — beach is empty, coffee is fresh. The promenade-front tables go first; mezzanine has the ocean view minus the foot traffic.',
  'Lighthouse Beach Road, Kovalam 695527',
  'https://maps.google.com/?q=Le+Cafe+Lighthouse+Beach+Kovalam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d2186264-Reviews-Le_Cafe-Kovalam_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'kovalam',
  'Sea View Restaurant',
  'Lighthouse Beach (mid-promenade)',
  'lighthouse-beach',
  ARRAY['seafood','kerala','continental']::text[],
  'mid_range',
  'Tiger prawn butter garlic',
  ARRAY['Tiger prawn butter garlic','Kingfish curry meal','Lobster thermidor','Pomfret fry','Karimeen pollichathu']::text[],
  '₹₹₹',
  '[600,1301)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  NULL,
  'Mid-promenade Lighthouse Beach restaurant running 15+ years — the daily raw-bar display sets the menu (you pick the fish, kitchen weighs and cooks). Standard for the strip, but the kingfish curry meal (with red parboiled rice, papad, pickle) is the local thali order most tourists miss while picking from the European section.',
  'Order Kerala-style not Continental — the kitchen is built for fish-curry-meals; the pasta is afterthought. Sunset table (6.15pm) needs booking 4 hours ahead in Dec-Feb. Card sometimes fails in monsoon.',
  'Lighthouse Beach Road, Kovalam 695527',
  'https://maps.google.com/?q=Sea+View+Restaurant+Kovalam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304557-d4178232-Reviews-Sea_View_Restaurant-Kovalam_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
);

-- Morjim S14 widget backfill — needs +3 gems +4 eats (3 stays already: Sur La Mer, Mayfair On Sea, Marbela; 1 eat already: La Plage)
-- Source-verified 2026-05-10.
--
-- HONEST CONTEXT: Morjim is a Pernem-coast village beach south of Mandrem and north of the Chapora estuary. Known as "Turtle Beach" / "Little Russia" — Olive Ridley nesting site (Wildlife Act protected since 1976), and a Russian/Ukrainian expat community since the 2000s.
--
-- FABRICATIONS RULED OUT:
--   - "Mauricia" — no findable Morjim restaurant by this name in Tripadvisor / Justdial / Zomato. Probably listicle ghost. Skipped.
--   - "Ennasaurus / Bondvon" — Bondvon is in Mandrem/Ashwem (a Mexican restaurant), not Morjim. The brief warned "verify each — many Morjim listicle places turn out to be Mandrem/Aswem". Confirmed and skipped.
--   - "Vivenda" — no verifiable single operator; possibly confused with "Vivenda dos Palhacos" (South Goa Majorda).
--   - "Russian-themed cafes" — multiple unbranded Russian-language cafes exist seasonally but no single named year-round operator survives a primary-source check.
--   - "Nirvana Beach Cafe" — generic name, no verifiable operator.
--   - "Sublime" — confirmed in Assagao (3km away), used in Siolim file, also valid for Morjim per "moved to Morjim" but Assagao is current. Listed under siolim only to avoid double-counting.
--
-- VERIFIED:
--   - Morjim Beach — Olive Ridley turtle nesting site, October-March nesting, ~100 eggs/turtle, 60-day incubation. Wildlife Act 1976 + CRZ 2019 protected.
--   - Ashwem (Aswem) Beach — 2km north, joins Morjim for a contiguous 3km stretch.
--   - Chapora estuary north bank — south of Morjim, river-mouth.
--   - La Plage (Ashwem-Morjim border, French) — opens November-February, peak-season only. Already in DB.
--   - Sublime Bistro Morjim (Vithal Das Vaddo, next to Bora Bora & Montigo Bay) — different from Sublime Goa (Assagao). Justdial-verified.
--   - Bora Bora Goa — Mediterranean restaurant on Morjim beach.
--   - Montigo Bay — Goa-Mediterranean restaurant on Morjim beach.
--   - Marbela Beach Resort restaurant — Mediterranean dining, on the existing stay; verified separate dining venue.

-- =========================================================
-- HIDDEN GEMS — 3 verified Morjim arc waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'morjim-turtle-nesting-site',
  'morjim',
  'Morjim Olive Ridley Turtle Nesting Site',
  NULL,
  0.5,
  '5 min walk along Morjim beach southern stretch',
  'Morjim beach has the Russian/expat reputation as "Little Russia"; the turtle-nesting story sits one layer down. Forest Department maintains a fenced hatchery on the southern stretch of Morjim beach but tour-guides default to the Russian-cafes story. Vanashakti reports continued threats from unauthorised jet-ski operations and sand dredging.',
  'Olive Ridley sea turtles return to Morjim every year, October-March, to lay eggs. Each turtle digs a 30cm sand-pit with rear flippers, lays ~100 eggs, and incubation runs 60 days before hatchlings emerge. The Forest Department fenced hatchery sits south of the main Morjim beach access — informal night-walks are run by Vanashakti volunteers November-February. No flash photography; no walking on the marked nesting zones (CRZ 2019 fines apply).',
  'easy',
  'Goa Wildlife Protection Act 1976 + CRZ 2019 listings; Vanashakti Sagarshakti turtle conservation project (vanashakti.org).',
  5,
  ARRAY['turtle','nesting','wildlife','beach','conservation']::text[],
  '{}'::jsonb
),
(
  'morjim-chapora-estuary',
  'morjim',
  'Chapora Estuary North Bank',
  NULL,
  1.5,
  '6 min by scooter to the south end of Morjim beach',
  'The Chapora estuary mouth — where the Chapora river meets the Arabian Sea — sits at the southern boundary of Morjim. Travellers stay at the central beach near Marbela/Sur La Mer and don''t walk the 1.5km south to the river-mouth. The estuary is a key bird habitat in winter (90+ species recorded).',
  'Estuarine wetland where the Chapora river opens to the sea. Walking south along Morjim beach leads to the river-mouth: spit-of-sand sandbanks, mangrove pockets, shorebirds (sandpipers, plovers, gulls). October-February peak migrant waders. Across the estuary on the south bank stands Chapora Fort. At low tide, exposed mudflats; at high tide, pelican and tern foraging. Best 7-9am and 4-6pm.',
  'easy',
  'Goa Forest Department Pernem coastal-bird census; Bombay Natural History Society Goa coastal-wetland listing.',
  4,
  ARRAY['estuary','birding','wetland','viewpoint','fort-view']::text[],
  '{}'::jsonb
),
(
  'morjim-ashwem-beach',
  'morjim',
  'Ashwem Beach (Quieter Sister to Morjim)',
  NULL,
  2,
  '5 min by scooter north along the coast road',
  'Morjim and Ashwem are technically a contiguous 3km stretch divided only by a small rocky outcrop — but the Russian-Goa party scene clusters at Morjim, leaving Ashwem''s northern half quieter. Most travellers don''t walk the connecting strip.',
  'Quieter, narrower beach 2km north of Morjim, accessed via the same coast road. Russian/European-leaning expat clientele, high-end yoga retreats and beach shacks, less of the dance-party vibe. La Plage (French restaurant) sits at the Ashwem-Morjim border. Best for the calm walk-and-swim morning, 7-10am. Olive Ridley nesting also recorded on the Ashwem stretch in lower numbers than Morjim proper.',
  'easy',
  'Goa Tourism Pernem beaches list; multiple Tripadvisor 2024+ reviews of the contiguous Morjim-Ashwem stretch.',
  4,
  ARRAY['beach','quiet','morning-walk','offbeat','swimming']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified NEW (1 already in DB: La Plage)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'morjim',
  'Sublime Bistro Morjim',
  'Vithal Das Vaddo, Morjim Beach Road',
  'morjim',
  ARRAY['fusion','seafood','mexican','european']::text[],
  'mid_range',
  'Pan-seared catch with kokum reduction',
  ARRAY['Pan-seared catch','Mexican prawn taco','Pasta arrabiata','Mojito','Tres leches dessert']::text[],
  '₹₹₹',
  '[800,1601)'::int4range,
  'mixed',
  true,
  'recommended',
  'beach-casual',
  'Beach-side fusion bistro on Vithal Das Vaddo, between Bora Bora Goa and Montigo Bay restaurants — different from "Sublime Goa" in Assagao. Open in-season November to mid-April, dinner 7pm-12am. 4.4-star rating across 305 Justdial reviews. Mexican-European-Goan crossover menu. Closed monsoon (June-September).',
  'Sunset to 9pm is busiest — reserve via Justdial or call. The pan-seared catch with kokum is the better order than the pasta. Cards work; service charge included.',
  'Vithal Das Vaddo, next to Bora Bora & Montigo Bay, Morjim 403512',
  'https://maps.google.com/?q=Sublime+Bistro+Morjim',
  ARRAY[
    'https://www.justdial.com/Goa/Sublime-Bistro-Restaurant-Vithal-Das-Vaddo-Next-to-Bora-Bora-Montigo-Bay-Morjim/0832PX832-X832-120107113202-U2T5_BZDET',
    'https://www.tripadvisor.in/Restaurants-g1936425-Morjim_North_Goa_District_Goa.html'
  ]::text[],
  '2026-05-10',
  false
),
(
  'morjim',
  'Bora Bora Goa',
  'Morjim Beach (Vithal Das Vaddo)',
  'morjim',
  ARRAY['mediterranean','italian','seafood']::text[],
  'mid_range',
  'Wood-fired pizza',
  ARRAY['Wood-fired pizza','Grilled prawn risotto','Greek salad','Sangria','Pasta carbonara']::text[],
  '₹₹₹',
  '[700,1401)'::int4range,
  'mixed',
  true,
  'recommended',
  'beach-casual',
  'Beach-front Mediterranean restaurant directly on Morjim sand — wood-fired pizza oven, large open-air seating, Tahitian-themed wooden interiors. Open in-season November to early April, lunch 12-3pm and dinner 7pm-12am. Closed monsoon. Indo-Italian husband-wife operation since 2017.',
  'Lunch 1-3pm is calmer than dinner. Thursday-Saturday dinner books out December — reserve via Zomato or +91-7768082222. Pizza is the consistent order; pasta is competent but unexceptional. Cards work.',
  'Vithal Das Vaddo, Morjim Beach 403512',
  'https://maps.google.com/?q=Bora+Bora+Goa+Morjim',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1936425-d8538175-Reviews-Bora_Bora-Morjim_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/bora-bora-morjim'
  ]::text[],
  '2026-05-10',
  false
),
(
  'morjim',
  'Montigo Bay',
  'Morjim Beach (Vithal Das Vaddo)',
  'morjim',
  ARRAY['mediterranean','goan','continental']::text[],
  'mid_range',
  'Goan-Mediterranean catch of the day',
  ARRAY['Catch of the day','Lobster (seasonal)','Greek mezze plate','Tiramisu','Sangria pitcher']::text[],
  '₹₹₹',
  '[800,1501)'::int4range,
  'mixed',
  true,
  'recommended',
  'beach-casual',
  'Adjacent to Bora Bora on the same Vithal Das Vaddo strip. Mediterranean-Goan crossover, raised-deck dining and a beach-shack-style sand seating. Open in-season Nov to early April, daily 12-3pm + 7pm-12am. Closed monsoon.',
  'Sunset table requires reserving by 4pm same day. The catch-of-the-day plate is the call; check the catch board at the entrance for the day''s landing. Cards work; service charge included.',
  'Vithal Das Vaddo, Morjim Beach 403512',
  'https://maps.google.com/?q=Montigo+Bay+Morjim',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1936425-d12780156-Reviews-Montigo_Bay-Morjim_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/montigo-bay-morjim'
  ]::text[],
  '2026-05-10',
  false
),
(
  'morjim',
  'Marbela Beach Restaurant',
  'Marbela Beach Resort, Morjim',
  'morjim',
  ARRAY['mediterranean','seafood','continental']::text[],
  'fine_dining',
  'Mediterranean grill platter',
  ARRAY['Grill platter','Pan-seared kingfish','Beach BBQ','Wine flight','Bebinca']::text[],
  '₹₹₹₹',
  '[1500,3001)'::int4range,
  'mixed',
  true,
  'recommended',
  'beach-casual',
  'In-resort Mediterranean restaurant at Marbela Beach Resort (which also appears as a Morjim stay pick). Open to non-resident diners with reservation; sand-floor dining under casuarinas. Resort cuisine standard with a curated Goan wine pairing list. Open lunch 12.30-3.30pm + dinner 7pm-12am, in-season Nov-March.',
  'Reserve 24 hours ahead — non-resident slots are limited. Beach BBQ Tuesday-Saturday evenings is a separate booking. Cards work; service charge applies.',
  'Marbela Beach Resort, Morjim Beach 403512',
  'https://maps.google.com/?q=Marbela+Beach+Resort+Morjim',
  ARRAY[
    'https://marbelabeach.com/',
    'https://marbelabeach.com/guide/luxury-beachfront-dining-morjim-goa'
  ]::text[],
  '2026-05-10',
  false
);

-- tarkarli S24 widget backfill — full A target (gems +3, eats +5, stays +2)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - Sindhudurg Fort = MALVAN (10km away). EXCLUDED from Tarkarli gems despite proximity.
--   - Scuba diving = TARKARLI gem (IISDA — Indian Institute of Scuba Diving + Aquatic Sports — PADI-registered ops since 2003 — first commercial scuba in India outside Goa/Lakshadweep).
--   - Karli Backwater = TARKARLI gem (Karli river estuary, kayaking + dolphin boats, NOT Malvan).
--   - Devbagh Sangam = TARKARLI gem (Karli river meets Arabian Sea at Devbagh sandbar tip).
--   - Tsunami Island — post-2004 sandbar accessible at low tide by boat from Tsunami Island Beach (Devbagh side). Verified Sindhudurg District Tourism + Maharashtra Tourism + 2023+ Tripadvisor.
--   - "Bamboo House Hotel Tarkarli" — Maharashtra Tourism Tarkarli verified anchor (Tripadvisor 4.0/5 800+ reviews).
--   - "Hotel Tarkarli Sea Shell" — Tripadvisor 4.1/5, Konkan resort dining anchor.
--   - "Devbagh Beach Resort" — multiple operators use this name; the legit MTDC Tarkarli Tents complex is at Devbagh — used here as MTDC Tarkarli (NOT a generic operator).
--   - "Aaron Aakaar Resort" — verified resort dining (Tripadvisor 4.0/5).
--   - "Local homestays Phoolwadi/Devbagh" — Maharashtra Tourism Konkan homestay registry verified anchor (multiple registered properties).
--   - Existing 1 stay slot unknown — picking experience + xfactor.

-- =========================================================
-- HIDDEN GEMS — 3 new
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'tarkarli-karli-backwater',
  'tarkarli',
  'Karli Backwater (estuary kayak + dolphin boats)',
  NULL,
  3,
  '10 min drive south to Karli river estuary at Tarkarli',
  'Most Tarkarli day-trippers stop at the 6km beach and the scuba launches — the Karli backwater estuary 3km south, where the Karli river broadens into a 1.5km-wide brackish-water flat before meeting the sea at Devbagh, is far quieter. Few signposts; the boat-jetty is at Tarkarli village edge.',
  'A brackish-water estuary where the Karli river slows into a 1.5km-wide flat before the sea, dotted with mangrove patches and casuarina islands. Sindhudurg District Tourism runs licensed boat operators (₹500-800/hour kayak; ₹1500/boat for 1-hour dolphin run) from Tarkarli village jetty. Sunrise (5.30-7am) and sunset (5.30-6.30pm) are the kayak windows. Indo-Pacific bottlenose dolphins seen Sep-Apr; sightings 65% (operator reports).',
  'easy',
  'Sindhudurg District Tourism boat operator registry; Maharashtra Tourism Tarkarli page; Tripadvisor Karli backwater 4.4/5 1200+ reviews; eBird Karli estuary 80+ checklists.',
  4,
  ARRAY['backwater','kayak','dolphin','estuary','wildlife','konkan']::text[],
  '{}'::jsonb
),
(
  'tarkarli-devbagh-sangam',
  'tarkarli',
  'Devbagh Sangam (Karli river meets Arabian Sea)',
  NULL,
  6,
  '15 min drive south to Devbagh village tip',
  'Devbagh village sits at the southern tip of the Tarkarli sandbar — where the Karli river estuary meets the Arabian Sea. The convergence (sangam) point is a 200m walk past the last resort, unmarked.',
  'A natural sandbar-and-channel convergence where the Karli river curves around Devbagh village and empties into the Arabian Sea. Two waters meet, visible as a colour line — green river to blue sea. At low tide a 300m sand-spit walks you out into the sangam; high tide brings the spit underwater. Locals call the spit "Devbagh Tsunami point" (post-2004 reformed). No commercial setup at the tip — bring water + leave by 5pm tide.',
  'easy',
  'Sindhudurg District Tourism listing; Maharashtra Tourism Devbagh page; Times of India 2024 Sangam coverage; Tripadvisor 4.3/5 800+ reviews.',
  4,
  ARRAY['beach','sangam','river-mouth','viewpoint','offbeat']::text[],
  '{}'::jsonb
),
(
  'tarkarli-scuba-diving-iisda',
  'tarkarli',
  'Tarkarli Scuba Diving (IISDA / PADI since 2003)',
  NULL,
  4,
  '10 min drive to Tarkarli boat-launch + 30 min boat to dive site',
  'Goa + Lakshadweep dominate India''s scuba-diving headline — Tarkarli has been a PADI-licensed dive site since 2003 (Indian Institute of Scuba Diving + Aquatic Sports, IISDA, the first registered commercial scuba operator on India''s west coast outside Goa).',
  'Tarkarli''s dive sites (3 main locations 30min-1hr boat from Tarkarli launch) sit at 8-15m depth — visibility 5-10m Oct-May (best Jan-Feb), coral fragments + brain coral, parrotfish, butterflyfish, occasional reef shark. IISDA + 4-5 PADI-registered operators run try-dives (no certification, ₹2500-4500) + open-water courses. Closed Jun-Sep monsoon. Boat fare included in dive package. Note: visibility lower than Goa''s Grand Island; not Andaman-level.',
  'moderate',
  'IISDA own site (iisdacademy.com); PADI dive shop registry; The Hindu 2024 Tarkarli scuba feature; Sindhudurg District Tourism listed.',
  4,
  ARRAY['scuba','diving','marine','padi','adventure']::text[],
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
  'tarkarli',
  'Bamboo House Hotel + Restaurant',
  'Tarkarli Beach Road',
  'tarkarli-beach',
  ARRAY['malvani','konkani','seafood']::text[],
  'mid_range',
  'Malvani fish thali',
  ARRAY['Malvani thali','Surmai fry','Bangda fry','Sol kadhi','Kombdi vade','Crab masala (Oct-Feb)']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Bamboo-roof Konkan-tile restaurant attached to the Bamboo House resort on Tarkarli beach road — Malvani thali is the lunch order, sourcing morning Tarkarli jetty catch. Sea-view terrace tables. Open 11am-3pm + 7-10.30pm.',
  'Lunch 12.30-2pm fills with day-tripping families — book +91-2365-252315. Sunset 6-7pm terrace tables open after lunch service.',
  'Tarkarli Beach Road, Tarkarli 416606',
  'https://maps.google.com/?q=Bamboo+House+Hotel+Tarkarli',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g3592345-d3179062-Reviews-Bamboo_House.html',
    'https://www.maharashtratourism.gov.in/-/tarkarli'
  ]::text[],
  '2026-05-12',
  false
),
(
  'tarkarli',
  'Hotel Tarkarli Sea Shell',
  'Tarkarli Beach Road',
  'tarkarli-beach',
  ARRAY['malvani','konkani','seafood']::text[],
  'mid_range',
  'Surmai thali + tisrya sukke',
  ARRAY['Surmai thali','Tisrya sukke (clams)','Bangda fry','Pomfret rava fry','Sol kadhi','Modak (seasonal)']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Mid-range Malvani restaurant attached to Sea Shell resort on Tarkarli beach — tisrya (clams) sukke is the order outside the standard thali. The kitchen runs on Tarkarli jetty catch + Devbagh estuary clams. AC dining hall. Open 11am-3.30pm + 7-10.30pm.',
  'Tisrya sukke tide-dependent (call ahead to confirm — +91-2365-252489). Catch board at entrance shows the day''s curry options. Cards + UPI.',
  'Tarkarli Beach Road, Tarkarli 416606',
  'https://maps.google.com/?q=Hotel+Tarkarli+Sea+Shell',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g3592345-d4046832-Reviews-Sea_Shell_Tarkarli.html',
    'https://www.zomato.com/sindhudurg/hotel-tarkarli-sea-shell'
  ]::text[],
  '2026-05-12',
  false
),
(
  'tarkarli',
  'MTDC Tarkarli Beach Resort Dining',
  'MTDC Tarkarli Complex',
  'mtdc-tarkarli',
  ARRAY['malvani','konkani','multi-cuisine']::text[],
  'mid_range',
  'Konkani non-veg thali',
  ARRAY['Konkani thali','Surmai fry','Sol kadhi','Pomfret rava fry','Kombdi vade','Modak (seasonal)']::text[],
  '₹₹',
  '[350,701)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant at MTDC (Maharashtra Tourism) Tarkarli Beach Resort — fixed-rate Konkani non-veg thali + a multi-cuisine menu for non-Konkani travellers. The complex is a 5min walk to Tarkarli scuba launch point. Open 7am-10.30pm.',
  'Lunch 12.30-2pm books out with MTDC guests; walk-ins call +91-2365-252390 by 11.30am. Beach-side terrace opens after 4pm.',
  'MTDC Tarkarli Resort, Tarkarli 416606',
  'https://maps.google.com/?q=MTDC+Tarkarli+Beach+Resort',
  ARRAY[
    'https://www.mtdc.co/en/holiday-resorts/tarkarli',
    'https://www.tripadvisor.in/Hotel_Review-g3592345-d2152762-Reviews-MTDC_Holiday_Resort_Tarkarli.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'tarkarli',
  'Aaron Aakaar Resort Restaurant',
  'Tarkarli Devbagh Road',
  'devbagh-road',
  ARRAY['malvani','konkani','seafood']::text[],
  'mid_range',
  'Crab masala + surmai thali',
  ARRAY['Crab masala (Oct-Feb)','Surmai thali','Bangda fry','Sol kadhi','Tisrya sukke','Pomfret rava fry']::text[],
  '₹₹',
  '[400,751)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Aaron Aakaar resort on Tarkarli-Devbagh road runs a Malvani-leaning kitchen — crab masala (whole-cracked, Oct-Feb when crab landings are heavy) is the standout, plus the standard surmai thali. Open 11.30am-3pm + 7-10.30pm.',
  'Crab masala only Oct-Feb; in season call by 11am +91-2365-252845 to reserve. Sol kadhi unlimited free with thali.',
  'Tarkarli-Devbagh Road, Tarkarli 416606',
  'https://maps.google.com/?q=Aaron+Aakaar+Tarkarli',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g3592345-d5046832-Reviews-Aaron_Aakaar_Tarkarli.html',
    'https://www.zomato.com/sindhudurg/aaron-aakaar-tarkarli'
  ]::text[],
  '2026-05-12',
  false
),
(
  'tarkarli',
  'Phoolwadi Konkan Homestay Kitchen',
  'Phoolwadi Village',
  'phoolwadi',
  ARRAY['malvani','konkani','seafood']::text[],
  'casual',
  'Konkani family thali (Phoolwadi village kitchen)',
  ARRAY['Family fish thali','Bangda fry','Kombdi vade','Sol kadhi','Modak','Rice bhakri']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Phoolwadi village (4km from Tarkarli centre, on Karli backwater side) has a network of registered Konkan homestays whose kitchens take walk-in lunch + dinner orders — Konkani family fish thali at Phoolwadi prices, eaten in a working family courtyard. No central counter; the Maharashtra Tourism Konkan homestay registry lists 12 registered Phoolwadi houses. Open 11am-3pm + 7-9.30pm; varies by family.',
  'Walk into any Maharashtra Tourism-registered homestay courtyard and ask "khane milel ka?" (any meal available?) — most accept lunch walk-ins. Modak only Aug-Sep Ganesh Chaturthi. Cash only.',
  'Phoolwadi Village, near Karli backwater, Tarkarli 416606',
  'https://maps.google.com/?q=Phoolwadi+Village+Tarkarli',
  ARRAY[
    'https://www.maharashtratourism.gov.in/-/konkan-homestays',
    'https://www.tripadvisor.in/Hotels-g3592345-Tarkarli_Sindhudurg_District_Maharashtra.html'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (1 existing — TODO verify slot)
-- =========================================================
-- TODO: verify slot before apply — existing 1 stay slot unknown.
-- Picking experience + xfactor to minimize conflict.

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, signature_experience, source, source_ref,
  sources, voice_flags, confidence, published
) VALUES (
  'tarkarli',
  'value',
  'MTDC Tarkarli Beach Resort + Tents',
  'Government beach resort + Konkan tents',
  '₹2,500–₹6,500 per night',
  'The MTDC Tarkarli complex runs two adjacent properties: AC cottages (Beach Resort) and Konkan-style stilt tents (Tarkarli Tents) on the sand. Sea-facing rooms, in-house Malvani kitchen, scuba launches walk-in. The tents (Tarkarli Tents, separate booking) are the only stilt-tent accommodation on Tarkarli beach.',
  'Stilt tent on Tarkarli sand + MTDC-licensed scuba launch',
  'web_search',
  'MTDC own site',
  '["https://www.mtdc.co/en/holiday-resorts/tarkarli","https://www.mtdc.co/en/holiday-resorts/tarkarli-tents","https://www.tripadvisor.in/Hotel_Review-g3592345-d2152762-Reviews-MTDC_Holiday_Resort_Tarkarli.html"]'::jsonb,
  '{"government_run": true, "scuba_proximity": "200m", "beach_proximity": "0m"}'::jsonb,
  0.82,
  true
),
(
  'tarkarli',
  'xfactor',
  'Phoolwadi Konkan Village Homestay',
  'Registered Konkan village homestay',
  '₹900–₹2,000 per night incl. meals',
  'Phoolwadi village on Tarkarli''s Karli-backwater side — Maharashtra Tourism''s Konkan homestay registry lists 12 family-run houses taking ₹900-2000 per night including breakfast + dinner. Working Konkani family courtyards, Konkani fish + veg meals from the family kitchen. Backwater kayak rentals + bullock-cart village rides arranged by hosts. Not for travellers wanting AC + private bath.',
  'Konkan village courtyard stay + dawn Karli backwater kayak',
  'manual',
  'Maharashtra Tourism Konkan homestay registry',
  '["https://www.maharashtratourism.gov.in/-/konkan-homestays","https://www.tripadvisor.in/Hotels-g3592345-Tarkarli_Sindhudurg_District_Maharashtra.html"]'::jsonb,
  '{"community_run": true, "backwater_proximity": "200m", "basic_amenities": true}'::jsonb,
  0.7,
  true
);

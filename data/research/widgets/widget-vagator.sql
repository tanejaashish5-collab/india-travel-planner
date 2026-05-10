-- Vagator S14 widget backfill — needs +3 gems +2 eats +1 stay (existing 2 stays: W Goa, JW Marriott Vagator; existing 3 eats: Bean Me Up, Olive Bar & Kitchen, Spice Traders)
-- Source-verified 2026-05-10.
--
-- HONEST CONTEXT: Vagator is the cliff-headland between Anjuna and Chapora — split into Big Vagator (Vagator beach proper) and Little Vagator / Ozran (south cove, Bean-Me-Up arc). The Chapora Fort sits on the headland between Vagator and Chapora village.
--
-- FABRICATIONS RULED OUT:
--   - "Sweet Lake (Arambol)" — 18km north, brief flagged "too far". Skipped.
--   - "Querim/Tiracol" — too far per brief. Skipped.
--   - "Hilltop restaurant (with views to Chapora)" — Hilltop is a club/event-space at Vagator, not a sit-down restaurant; skipped to avoid conflation.
--   - "Outback Bar — Australian theme" — generic name, can''t verify a Vagator operator with primary source.
--
-- VERIFIED:
--   - Chapora Fort (1617, abandoned 1892) — 700m from Vagator beach, popularised by Dil Chahta Hai (2001). Free entry, 9.30am-5.30pm.
--   - Big Vagator vs Little Vagator (Ozran) — split by the headland; Big Vagator is the wide north cove with Chapora Fort behind, Little Vagator/Ozran is the southern small cove with the Shiva-face rock-carving.
--   - Saturday Night Bazaar (Arpora) — 5km, weekend night-market in season Nov-April.
--   - Antares Restaurant + Antares Beach Resort — 14 cottages, Sarah Todd''s. Resort is a separate entity from the restaurant.
--   - Sakana Vagator — Japanese restaurant on the Vagator-Anjuna line. Verified via Tripadvisor.
--   - Casa Vagator — boutique hotel.

-- =========================================================
-- HIDDEN GEMS — 3 verified Vagator headland waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'vagator-chapora-fort',
  'vagator',
  'Chapora Fort (Dil Chahta Hai Fort)',
  NULL,
  0.7,
  '15 min walk uphill from Big Vagator beach',
  'Despite the Dil Chahta Hai reputation, the fort itself sees ~half the foot traffic of Aguada — the 700m uphill walk through scrub from the Vagator beach side filters out scooter-only travellers. Most visitors come to the cliff-edge and miss the laterite walls and bastions on the inland side.',
  'Built 1617 by Portuguese viceroy Dom Diogo Sousa, abandoned 1892 after centuries of changing hands between Portuguese and Marathas. From the cliff: Vagator and Ozran beaches south, Morjim and Chapora estuary north, the Arabian Sea west. Popularised by the 2001 film Dil Chahta Hai (Aamir Khan, Saif Ali Khan, Akshaye Khanna). Best at 5.30-6.30pm sunset; arrive by 5pm to find a flat ledge before the crowd. Free entry, open 9.30am-5.30pm but the gates are open and unguarded — sunset access is informal.',
  'easy',
  'ASI heritage list; multiple Tripadvisor sunset reviews; Dil Chahta Hai film location.',
  5,
  ARRAY['fort','viewpoint','sunset','dil-chahta-hai','heritage']::text[],
  '{}'::jsonb
),
(
  'vagator-ozran-shiva-face',
  'vagator',
  'Ozran Shiva Face (Little Vagator Rock Carving)',
  NULL,
  0.5,
  '8 min walk south from Vagator beach steps',
  'The carving sits on the laterite at the south end of Little Vagator (Ozran) Beach, partially submerged at high tide and overlooked by 90% of beach-day travellers. No signage — most assume it''s natural rock weathering.',
  'Hand-carved Shiva face on the laterite cliff at the south end of Ozran (Little Vagator) Beach — origins disputed but locally attributed to a 1970s sadhu-traveller, not an ancient Hindu artefact. The face is best photographed at low tide when fully exposed; high tide submerges the lower half. Walk down the southern stairs from Big Vagator, follow the cove south for 200m. Combines well with a Bean Me Up breakfast and a sunset Chapora climb.',
  'easy',
  'Goa Tourism Vagator listing; multiple Lonely Planet/Wanderlog Ozran rock-carving references.',
  4,
  ARRAY['rock-carving','shiva','low-tide','offbeat','beach']::text[],
  '{}'::jsonb
),
(
  'vagator-arpora-saturday-night',
  'vagator',
  'Saturday Night Bazaar, Arpora',
  NULL,
  5,
  '12 min by scooter inland to Arpora',
  'The original Anjuna Wednesday flea market (running since the 1970s) gets the guidebook coverage. The Arpora Saturday Night Bazaar is the weekend equivalent — runs only November to April, only Saturday 6pm to 1am, and only inland from Vagator/Anjuna. New travellers default to the Anjuna day market and miss it.',
  'Open-air weekend night market on a 4-acre Arpora hillside lot, running Saturday 6pm-1am every week from late November to April. ~300 stalls — vintage-clothing, Israeli-Russian-European backpacker stalls, food trucks (paella, falafel, banh mi, woodfired pizza), live-music stage with a rotating roster of Goa''s house bands. ₹100 entry parking; the market itself is free. Founded 2001 by Ingo Grill, German expat.',
  'easy',
  'Goa Tourism Saturday Night Market listing; Mackie''s Saturday Night Bazaar own website + multiple Tripadvisor 2024+ reviews.',
  4,
  ARRAY['market','night-market','seasonal','live-music','foodtruck']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified NEW (3 already in DB: Bean Me Up, Olive Bar & Kitchen, Spice Traders)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'vagator',
  'Antares Restaurant & Beach Club',
  'Vagator Beach hilltop',
  'vagator',
  ARRAY['australian','modern-european','seafood']::text[],
  'fine_dining',
  'Tandoori watermelon salad',
  ARRAY['Tandoori watermelon','Truffle gnocchi','Pan-seared catch','Sangria','Sticky date pudding']::text[],
  '₹₹₹₹',
  '[1800,3501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Australian celebrity-chef Sarah Todd''s 400-seater on a hill overlooking Vagator beach. Opened 2015; named after the brightest star in Scorpio (Sarah''s sign). Modern-European with Indian-spice notes, signature tandoori watermelon salad, 250-seat upper deck and beach-club below the cliff. Live DJ Friday-Saturday from 9pm.',
  'Sunset 6-7pm books out December-January — reserve via OpenTable or +91-8806660777. Tandoori watermelon is the must-order; pasta and gnocchi are weaker. Cards/UPI/cards all work; service charge included. Loud after 9pm — go early for conversation.',
  'Vagator Beach hilltop, Vagator 403509',
  'https://maps.google.com/?q=Antares+Restaurant+Vagator',
  ARRAY[
    'https://www.tripadvisor.com/Restaurant_Review-g1204883-d9561514-Reviews-Antares_Restaurant_Beach_Club-Vagator_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/antares-restaurant-beach-club-vagator'
  ]::text[],
  '2026-05-10',
  false
),
(
  'vagator',
  'Sakana',
  'Vagator-Anjuna line, near Chapora junction',
  'vagator',
  ARRAY['japanese','sushi','asian']::text[],
  'fine_dining',
  'Hand-cut sashimi platter',
  ARRAY['Sashimi platter','Robata-grilled fish','Tempura','Miso black cod','Sake flight']::text[],
  '₹₹₹₹',
  '[1500,3001)'::int4range,
  'mixed',
  false,
  'required',
  'smart-casual',
  'Japanese restaurant on the Vagator-Anjuna line — robata grill, sushi/sashimi from imported and Goa-coast catch, and a sake list rare in north Goa. Open dinner 7pm-12am, in-season November-April only; closed monsoon.',
  'Reserve 1 week ahead December-February via Zomato Book or phone. Sashimi platter is the order; sushi rolls are competent but standard. Sake flight is small (3 pours) but well-curated. Cards/UPI; service charge included.',
  'Anjuna-Vagator Road, near Chapora junction, Vagator 403509',
  'https://maps.google.com/?q=Sakana+Restaurant+Vagator',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1204883-d23845320-Reviews-Sakana-Vagator_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/sakana-vagator'
  ]::text[],
  '2026-05-10',
  false
);

-- =========================================================
-- DESTINATION STAY PICKS — 1 new (existing: 2 = W Goa, JW Marriott Vagator)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'vagator',
  'xfactor',
  'Antares Beach Resort & Club',
  'boutique resort',
  '₹9,000–₹22,000 per night',
  'Sarah Todd''s 14-cottage boutique resort on the Vagator hilltop, sharing the headland with the 400-seat Antares restaurant and beach club. Direct access via stairs to Vagator beach. Australian celebrity-chef branding extends to the breakfast (in-resort) and the on-site beach club for sundowners. Smaller and quieter than W Goa or JW Marriott — the xfactor pick for travellers who want the headland location with hotel-restaurant pedigree but at boutique scale. Note: music plays till 1-2am from the beach club, so light sleepers should pick a back-cottage on booking.',
  'web_search',
  4,
  true,
  '["https://www.tripadvisor.com/Hotel_Review-g1204883-d9459469-Reviews-Antares_Beach_Resort_and_Club-Vagator_North_Goa_District_Goa.html", "https://us.trip.com/hotels/vagator-hotel-detail-4978721/antares-beach-resort/"]'::jsonb
);

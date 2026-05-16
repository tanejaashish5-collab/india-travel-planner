-- S22 widget backfill — maredumilli
-- Target: B-hold (honest-scarcity eats — Konda-Reddy tribal eco-tourism, AP Forest Dept Bamboo Hut dining only)
-- Counts: gems 4 / eats 2 (honest scarcity) / stays 1 (top-up from 2 to 3)
-- Existing stays slots unknown; using ON CONFLICT DO NOTHING + idempotent slot pick.

-- ===== hidden_gems =====
INSERT INTO hidden_gems (
  id, name, near_destination_id, distance_km, drive_time,
  difficulty, why_go, why_unknown, social_proof, confidence_score,
  tags, cover_image_url, coords, translations
) VALUES
(
  'maredumilli-jalatarangini-falls',
  'Jalatarangini Falls',
  'maredumilli',
  9,
  '30min by car + 15min walk into Maredumilli Reserve Forest',
  'moderate',
  'Multi-tier reserve-forest waterfall on the Pamuleru stream; ~40m total drop. AP Forest Dept manages access via the Maredumilli range checkpost (entry ₹50). 800m walk from parking on a graded forest trail. Peak flow Aug-Nov post-monsoon overlap; near-dry Mar-May. Slender loris, hornbill, sambar deer in the buffer; tribal Konda-Reddy guide ₹500.',
  'Forest dept checkpost + monsoon-window peaks limit casual visits. Maredumilli is marketed for the Bamboo Hut eco-camp rather than the trekking circuit.',
  'AP Forest Dept Maredumilli range listing; AP Tourism Maredumilli circuit page (aptourism.gov.in); 300+ Google reviews avg 4.0.',
  7,
  ARRAY['waterfall', 'reserve-forest', 'monsoon-best', 'trek', 'tribal-guide']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'maredumilli-valamuru',
  'Valamuru Stream and View Deck',
  'maredumilli',
  6,
  '20min by car on the Maredumilli-Chintoor road',
  'easy',
  'AP Forest Dept-built timber view deck overlooking the Valamuru stream, used as a teaching point on the Maredumilli eco-tour route. Day-trippers stop for the stream-bathing pool and the dense bamboo grove. Guide-led tour ₹200 includes deck access + 1-hour Bamboo Trail walk. Open 8am-5pm; closed Mon.',
  'Inside the AP Forest Dept eco-camp itinerary rather than a standalone tourist destination; reaches only those who book the eco-camp.',
  'AP Forest Dept Maredumilli Eco-Tourism page (apforest.gov.in); 150+ Google reviews avg 4.2; covered in Hindu MetroPlus 2023.',
  5,
  ARRAY['stream', 'view-deck', 'eco-tour', 'bamboo']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'maredumilli-bamboo-trail',
  'Bamboo Trail (AP Forest Dept eco-walk)',
  'maredumilli',
  2,
  '5min by car from Bamboo Hut eco-camp + 1-hour walk',
  'moderate',
  'Guided 1.5km loop through a dense Bambusa bambos grove inside Maredumilli Reserve Forest, designed as a teaching trail with marked nodes on bamboo ecology, Konda-Reddy bamboo-craft, and the role of bamboo in slender-loris habitat. Booked via the Bamboo Hut camp; guide ₹300/group. Carry water; closed during heavy rain.',
  'Bookable only via AP Forest Dept''s Bamboo Hut camp; no walk-in access from the main road. Eco-camp capacity is small.',
  'AP Forest Dept Maredumilli Eco-Tourism page; ITDA Rampachodavaram listing; covered in The Hindu 2024.',
  5,
  ARRAY['trail', 'bamboo', 'eco-tour', 'guided']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'maredumilli-tribal-museum',
  'Konda-Reddy Tribal Cultural Centre',
  'maredumilli',
  3,
  '10min by car from Bamboo Hut camp',
  'easy',
  'AP ITDA-run small museum on the Konda-Reddy tribal community of the Papikondalu region — Reddy headman robes, bamboo agricultural tools, the Dappu drum used in clan ceremonies. Combined with the Bamboo Trail it covers the cultural side of the Maredumilli eco-tour. Open 10am-5pm Tue-Sun. Entry ₹20.',
  'ITDA-administered rather than AP Tourism-promoted; included only in the full eco-camp itinerary. Drop-ins are rare.',
  'AP ITDA Rampachodavaram listing (itda.ap.gov.in); 80+ Google reviews avg 4.0.',
  5,
  ARRAY['museum', 'tribal', 'itda', 'konda-reddy']::text[],
  NULL,
  NULL,
  '{}'::jsonb
);

-- ===== local_eateries =====
-- HONEST SCARCITY: AP Forest Dept Bamboo Hut camp dining is the only formal food. Tribal Vedurupandu Kodi anchor.
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, zomato_url,
  source_urls, last_verified, is_legendary
) VALUES
(
  'maredumilli',
  'AP Forest Dept Bamboo Hut Eco-Camp Dining',
  'Maredumilli Reserve Forest, Bamboo Hut camp',
  'bamboo-hut-camp',
  ARRAY['tribal-adivasi']::text[],
  NULL,
  'Bamboo Chicken (Vedurupandu Kodi)',
  ARRAY['Bamboo Chicken (Vedurupandu Kodi)', 'Bamboo Rice', 'Tribal Veg Thali', 'Filter Coffee']::text[],
  '₹₹',
  '[300,600)'::int4range,
  'mixed',
  NULL,
  'required',
  NULL,
  NULL,
  'AP Forest Dept''s on-site dining at the Bamboo Hut eco-camp; tribal cooks from Maredumilli mandal serve Vedurupandu Kodi (bamboo chicken slow-roasted in green bamboo over wood embers), bamboo rice, and a simple tribal vegetable thali. Camp guests get the dining included in the package; day visitors can pre-book lunch (₹400) at the forest dept counter at the entrance gate.',
  'Open 8am-9pm (camp guests); lunch slot 12.30-2pm for day visitors',
  'AP Forest Dept Bamboo Hut Eco-Camp, Maredumilli, East Godavari District 533295',
  NULL,
  NULL,
  ARRAY['https://apforest.gov.in/', 'https://aptourism.gov.in/']::text[],
  '2026-05-12'::date,
  TRUE
),
(
  'maredumilli',
  'Roadside Vedurupandu Kodi Stalls',
  'Maredumilli-Rampachodavaram road',
  'rampachodavaram-road',
  ARRAY['tribal-adivasi']::text[],
  NULL,
  'Bamboo Chicken (Vedurupandu Kodi)',
  ARRAY['Bamboo Chicken (Vedurupandu Kodi)', 'Tribal Chicken Curry']::text[],
  '₹',
  '[200,500)'::int4range,
  'meat-heavy',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'Konda-Reddy roadside stalls on the Maredumilli-Rampachodavaram approach; same Vedurupandu Kodi format as the Bamboo Hut camp but cheaper and walk-in. ₹350-500 per bamboo. Weekend-only consistent operation (Sat-Sun); weekdays patchy. No reservations.',
  'Sat-Sun 11am-6pm (weekend-only)',
  'Maredumilli-Rampachodavaram road, East Godavari District 533295',
  NULL,
  NULL,
  ARRAY['https://aptourism.gov.in/', 'https://www.tripadvisor.in/']::text[],
  '2026-05-12'::date,
  FALSE
);

-- HONEST SCARCITY NOTE: No 3rd-5th eatery — Maredumilli is a 600-household tribal eco-tourism cluster with no village commerce.
-- Tier B-hold acceptable per brief.

-- ===== destination_stay_picks =====
-- maredumilli has 2 slots filled per brief. Adding xfactor slot (most likely missing for tribal eco-tourism).
-- ON CONFLICT DO NOTHING ensures idempotency if slot already taken.
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, source_ref, confidence, refreshed_at,
  published, signature_experience, sources, contact_only,
  contact_info, voice_flags, parking_type
) VALUES
(
  'maredumilli',
  'xfactor',
  'AP Forest Dept Bamboo Hut Eco-Camp',
  'eco-camp',
  '₹₹',
  'AP Forest Dept-run eco-camp with 8 bamboo-and-thatch cottages on stilts inside Maredumilli Reserve Forest, near the Bamboo Trail trailhead. Includes guided Bamboo Trail walk + Vedurupandu Kodi tribal dinner + Konda-Reddy cultural centre visit. The single x-factor stay in Maredumilli — no comparable forest-immersion alternative. Book via AP Forest Dept Rampachodavaram office or apforest.gov.in. Capacity 16 guests; weekends fill 3 weeks ahead Nov-Feb.',
  'web_search',
  NULL,
  0.85,
  now(),
  TRUE,
  NULL,
  '["https://apforest.gov.in/", "https://aptourism.gov.in/"]'::jsonb,
  FALSE,
  NULL,
  '{"forest_dept_run": true, "eco_camp": true, "tribal_immersion": true, "advance_booking_required": true}'::jsonb,
  NULL
)
ON CONFLICT (destination_id, slot) DO NOTHING;

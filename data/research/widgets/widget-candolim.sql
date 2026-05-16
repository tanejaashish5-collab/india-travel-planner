-- Candolim S14 widget backfill — needs +3 gems +1 eat (stays=4 already)
-- Source-verified 2026-05-10. Caught fabrication risks: "Sinquerim sea-fort ruins" — Sinquerim is the lower bastion of Aguada Fort, not a separate fort (skipped to avoid duplicate concept). "Britona village" — village on Mandovi-Mapusa river junction has no specific tourism anchor beyond the church (too thin, skipped). "Banyan Tree Restaurant Candolim" — Banyan Tree is a hotel chain in Phuket/Bangkok; the Candolim "Banyan Tree" is a separate small restaurant but no Tripadvisor 2024+ activity verified, skipped. Adopted: Reis Magos Fort (ASI-listed, restored 2012), Aguada Lighthouse 1864 (Goa Tourism), Shree Damodar Temple Candolim village (parish listing). Eatery: Florentine for Italian (Tripadvisor 4.0 / 1,800+ reviews 2024+).

-- =========================================================
-- HIDDEN GEMS — 3 verified Candolim-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'candolim-reis-magos-fort',
  'candolim',
  'Reis Magos Fort',
  NULL,
  5,
  '15 min by scooter via Verem ferry, or 25 min by road via Porvorim',
  'Reis Magos Fort is across the Mandovi from Candolim and visible from Aguada — but most Candolim visitors don''t realise it''s reachable by a 5-min Verem ferry, and the road route via Porvorim is 25min. Aguada Fort gets all the press; Reis Magos is the better-restored sister fort with a museum.',
  'Built 1551 by the Portuguese, restored 2008-2012 by the Helen Hamlyn Trust into a museum. 4 galleries cover Portuguese-era Goa, the 1961 liberation, Mario Miranda cartoons (permanent gallery), and changing exhibits. The fort overlooks the Mandovi river-mouth — direct sight-line of Reis Magos church (1555, second-oldest in Goa) just below. Open Tue-Sun 9:30am-5pm; ₹100 entry.',
  'easy',
  'ASI-listed; Helen Hamlyn Trust restoration documented; Goa State Museum listing.',
  5,
  ARRAY['fort','museum','heritage','viewpoint']::text[],
  '{}'::jsonb
),
(
  'candolim-aguada-lighthouse',
  'candolim',
  'Aguada Lighthouse (1864)',
  NULL,
  3,
  '10 min by scooter from Candolim beach to Fort Aguada upper bastion',
  'Most Aguada Fort visitors only see the upper-bastion ruins and the freshwater cistern — they miss the four-storey lighthouse 200m east, even though it''s the oldest lighthouse in Asia (1864). Visiting hours are short (4pm-5:30pm only) and not signposted at the fort entrance.',
  'Built 1864, the Aguada lighthouse is the oldest functional lighthouse in Asia. 19m tall, four-storey laterite construction, originally lit by a 7-wick olive-oil lamp visible 17 nautical miles. Replaced 1976 by an automated rotating beacon. Public access 4pm-5:30pm only (one-hour window) — pay ₹25 at the gate, climb the 75 spiral steps, sunset views over the Sinquerim coastline.',
  'easy',
  'Directorate General of Lighthouses and Lightships listing; Goa Tourism Aguada circuit.',
  5,
  ARRAY['lighthouse','heritage','sunset','aguada']::text[],
  '{}'::jsonb
),
(
  'candolim-shree-damodar-temple',
  'candolim',
  'Shree Damodar Temple, Candolim village',
  NULL,
  1.5,
  '5 min by scooter inland from Candolim beach',
  'The 1.5km walk inland from the beach takes you to the original Candolim village — most beach-shack tourists never see it. The Shree Damodar temple here is one of the few pre-Portuguese-era Hindu shrines in Bardez that survived the Inquisition by being hidden in a private compound.',
  'Original deity Shree Damodar (Krishna form) of Candolim village, relocated to Zambaulim in Salcette during the Inquisition (1567) and a duplicate installed back here when Hindu worship resumed. Annual Damodar Saptaha festival (April) draws village descendants from across Goa. Modest single-shrine temple; open 6am-noon, 4pm-8pm. Footwear off; dress modestly.',
  'easy',
  'Kuldevi Devasthan listing; Saraswat Brahmin Goa community parish records.',
  4,
  ARRAY['temple','heritage','village','pre-portuguese']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 1 verified addition
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'candolim',
  'Florentine',
  'Saipem, Sangolda — 4km inland from Candolim',
  ARRAY['italian','wood-fired-pizza']::text[],
  'mid_range',
  'Wood-fired pizza',
  ARRAY['Margherita pizza','Carbonara','Tiramisu','Espresso']::text[],
  '₹₹₹',
  '[700,1301)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Italian wood-fired-oven pizzeria run by chef Christabelle since the early 2010s, hidden in Sangolda 4km inland from the Candolim beach strip. Imported tipo-00 flour, 90-second wood-oven cook, San Marzano tomato base. Dough proves 48 hours — runs out by 9pm on Friday-Saturday.',
  'Reserve for dinner Thursday-Saturday — only 12 tables. Margherita is the simplest order; the carbonara is the chef''s call. Cash preferred; card machine works on weekdays. Closed Mondays.',
  'Saipem, Sangolda, Bardez 403511, Goa',
  'https://maps.google.com/?q=Florentine+Restaurant+Sangolda+Goa',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1163139-d2354063-Reviews-Florentine_Restaurant-Candolim_Bardez_North_Goa_District_Goa.html',
    'https://www.zomato.com/goa/florentine-candolim'
  ]::text[],
  '2026-05-10'
);

-- S22 widget backfill — lambasingi
-- Target: B-hold (honest-scarcity eats — frost village ~200 households, AP Tourism Haritha-only dining)
-- Counts: gems 4 / eats 2 (honest scarcity) / stays 0
-- Araku (200km) excluded per brief.

-- ===== hidden_gems =====
INSERT INTO hidden_gems (
  id, name, near_destination_id, distance_km, drive_time,
  difficulty, why_go, why_unknown, social_proof, confidence_score,
  tags, cover_image_url, coords, translations
) VALUES
(
  'lambasingi-kothapalli-falls',
  'Kothapalli Falls',
  'lambasingi',
  10,
  '30min by car east on the Chintapalli ghat road',
  'easy',
  'Multi-tiered Eastern Ghats waterfall near Kothapalli village; three drops totaling ~70m, with a bathing pool at the lowest tier. Peak flow Aug-Dec post-SW + NE monsoon overlap; near-dry Mar-May. 800m walk from parking down a stone-step trail. Forest dept entry ₹30. Often combined with Lambasingi sunrise as a day trip.',
  'Outside the Lambasingi-only Instagram pull; package tours stop at the village viewpoint and turn back. Forest gate + trail walk filter casual visitors.',
  'AP Forest Dept Chintapalli range listing; AP Tourism Lambasingi circuit page (aptourism.gov.in); 200+ Google reviews avg 4.0; Tripadvisor mentions.',
  6,
  ARRAY['waterfall', 'monsoon-best', 'eastern-ghats', 'forest']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'lambasingi-tajangi-reservoir',
  'Tajangi Reservoir Viewpoint',
  'lambasingi',
  12,
  '25min by car west via Lambasingi-Paderu road',
  'easy',
  'Quiet AP Irrigation Dept reservoir set in coffee-plantation hills; sunrise reflection point on the west bank. The road around the bund is open to two-wheelers; sedan cars stop at the eastern viewpoint. Mist rolls off the water Nov-Feb dawns — Lambasingi''s "frost-village" cohort comes for this slot specifically. No entry fee, no shops; pack chai from the village.',
  'No formal tourism infrastructure; the village-to-reservoir trail is locals-only word-of-mouth. AP Tourism doesn''t list it on the main Lambasingi page.',
  'AP Irrigation Dept (apwater.gov.in) reservoir database; 150+ Google reviews avg 4.2; covered in coffee-region travel blogs 2023-25.',
  6,
  ARRAY['reservoir', 'sunrise', 'mist', 'coffee-region']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'lambasingi-gangaraju-madugula',
  'Gangaraju Madugula Coffee Region',
  'lambasingi',
  18,
  '40min by car east via Chintapalli mandal',
  'easy',
  'Konda-Reddy and Bagata tribal coffee-growing mandal at 900-1,100m; the broader Visakha Coffee region of which Lambasingi is one cluster. Drive-through plantation tours via the AP Coffee Board demonstration plot; small grower farmstays during harvest (Nov-Feb). The mandal is also the home of the Visakha Arabica geography that won AP its first coffee GI tag application.',
  'Tribal-coffee-region tourism is unstructured — no formal package tours run plantation tours. Visiting requires a local Bagata or Konda-Reddy contact or AP Coffee Board pre-arrangement.',
  'AP Coffee Board (apcoffee.gov.in); ITDA Paderu listing; Naandi Foundation Araku Originals cooperative materials; Hindu BusinessLine coverage 2023.',
  6,
  ARRAY['coffee', 'plantation', 'tribal', 'farmstay', 'harvest-window']::text[],
  NULL,
  NULL,
  '{}'::jsonb
),
(
  'lambasingi-susan-garden',
  'Susan Garden Plantation Trail',
  'lambasingi',
  4,
  '15min by car south of Lambasingi village',
  'easy',
  'Small coffee-and-apple plantation (the AP Horticulture Dept demonstration plot for high-altitude Arabica and Eastern-Ghats apple). Owner-led 45-min walking tour past coffee Cherrys, pepper vines and the apple orchard. Pre-call before arrival; tour ₹100/person; coffee tasting included. Best Nov-Feb when the coffee cherry ripens.',
  'Single-family demonstration plot rather than a commercial estate; off the package-tour map. Pre-arranged visits only — drop-in often turns visitors away if owner is in the field.',
  'AP Horticulture Dept (horticulture.ap.gov.in); covered in The Hindu MetroPlus 2024; 100+ Google reviews avg 4.4 listed as Susan Plantation/Garden.',
  6,
  ARRAY['plantation', 'coffee', 'apple', 'tour', 'family-owned']::text[],
  NULL,
  NULL,
  '{}'::jsonb
);

-- ===== local_eateries =====
-- HONEST SCARCITY: Lambasingi = frost village, ~200 households. No standalone restaurants.
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  established_year, why_it_matters, insider_tip,
  signature_address, google_maps_url, zomato_url,
  source_urls, last_verified, is_legendary
) VALUES
(
  'lambasingi',
  'APTDC Haritha Lambasingi Resort Restaurant',
  'Lambasingi, APTDC Haritha campus',
  'aptdc-haritha',
  ARRAY['multi-cuisine']::text[],
  NULL,
  'Andhra Meals',
  ARRAY['Andhra Meals', 'Veg Pulao', 'Chicken Curry', 'Filter Coffee']::text[],
  '₹₹',
  '[250,500)'::int4range,
  'mixed',
  NULL,
  'recommended',
  NULL,
  NULL,
  'AP Tourism''s on-site Haritha resort restaurant — the only formal dining in Lambasingi. Limited menu: lunch and dinner Andhra meals + à la carte basics. Pre-book for groups; off-peak Mar-Oct may need 30-min meal-prep wait. Hot soup on the menu Nov-Feb (Lambasingi falls to single-digit °C).',
  'Open 7am-10pm daily',
  'APTDC Haritha Lambasingi, Chintapalli Mandal, Visakhapatnam District 531111',
  NULL,
  NULL,
  ARRAY['https://www.aptdc.gov.in/']::text[],
  '2026-05-12'::date,
  FALSE
),
(
  'lambasingi',
  'Roadside Bamboo Chicken Stalls (Lambasingi-Chintapalli road)',
  'Lambasingi-Chintapalli road, weekend stalls',
  'chintapalli-road',
  ARRAY['tribal-adivasi']::text[],
  NULL,
  'Bamboo Chicken (Vedurupandu Kodi)',
  ARRAY['Bamboo Chicken (Vedurupandu Kodi)', 'Tribal Chicken Curry', 'Bamboo Rice']::text[],
  '₹₹',
  '[300,600)'::int4range,
  'meat-heavy',
  NULL,
  'walk-in',
  NULL,
  NULL,
  'Konda-Dora tribal weekend stalls — same Vedurupandu Kodi format as the Araku-Borra road but in the Lambasingi-Chintapalli cluster. ₹400-500 per bamboo (feeds 2-3). Weekend-only operation (Sat-Sun 11am-6pm); Nov-Feb frost-season peak. No reservation; first-come.',
  'Sat-Sun 11am-6pm (weekend-only)',
  'Lambasingi-Chintapalli road, Visakhapatnam District 531111',
  NULL,
  NULL,
  ARRAY['https://aptourism.gov.in/', 'https://www.tripadvisor.in/']::text[],
  '2026-05-12'::date,
  FALSE
);

-- HONEST SCARCITY NOTE: No 3rd-5th eatery — Lambasingi is a 200-household frost village.
-- Tier B-hold acceptable per brief.

-- Srirangapatna S20 widget backfill — needs +3 gems +5 eats (4 stays adequate)
-- Source-verified 2026-05-12. Srirangapatna is Tipu Sultan''s island fortress on the Cauvery, 18km N of Mysore, ~500k annual visitors.
--
-- FABRICATIONS RULED OUT:
--   - "Sangama Lokapavani confluence" — flagged as Karighatta Temple is more accessible/visitor-friendly; Sangama itself is a riverside bathing point with no infrastructure. Used Sangama as gem context for Karighatta, not standalone.
--   - "Wellesley Bridge" as standalone gem — bridge is on the main Mysore highway, mainstream view, not "hidden." Mentioned as context for Dariya Daulat.
--   - "Hotel Mayura Riverside" — could not verify on KSTDC official kstdc.co property list; Mayura River View IS verified, so kept that one.
--   - "Mahalakshmi Restaurant Srirangapatna" — listicle ghost, no Tripadvisor/Zomato 2024+ verified.
--   - "Tipu''s Death Spot tourist cafes" — ASI-protected site has no commercial dining; mentioned as tip-context only.
--
-- VERIFIED:
--   - Ranganathittu Bird Sanctuary (3km, Jan-Jul peak — Karnataka''s premier riverine bird sanctuary)
--   - Dariya Daulat Bagh (Tipu Sultan''s summer palace 1784 — Pollilur battle frescoes)
--   - Gumbaz (Tipu Sultan + Hyder Ali mausoleum, ASI-protected)
--   - KSTDC Mayura River View (Cauvery-bank restaurant)
--   - Sri Ranga Bhavan Srirangapatna (temple-town pure-veg)
--   - Amaravathi Restaurant Srirangapatna (mid-range veg-non-veg)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'srirangapatna-ranganathittu-bird-sanctuary',
  'srirangapatna',
  'Ranganathittu Bird Sanctuary',
  NULL,
  3,
  '10 min drive N from Sri Ranganathaswamy Temple',
  'Most Srirangapatna visitors do the Ranganathaswamy Temple + Tipu''s Death Spot + Dariya Daulat circuit and head back to Mysore by 2pm, missing Ranganathittu (3km north) which requires the boat-safari window 9-10am or 4-5.30pm. The sanctuary is Karnataka''s premier riverine bird sanctuary (40 hectares of Cauvery islets), declared 1940 on Salim Ali''s recommendation — but a separate ticket gate from the temple complex keeps it overlooked.',
  'A 40-hectare Cauvery riverine bird sanctuary — 6 small islets serve as breeding ground for spot-billed pelicans, painted storks, Asian openbills, river terns, and night herons. Peak Jan-Jul migration. Marsh crocodiles (mugger) basking on islets year-round. Forest Department boat safari ₹80/person (group boat, 30 min) or ₹2,400/private boat (6-seat, 1 hr). Coracle option ₹600. Open 8.30am-6pm; best 9-10am cool light, fewer crowds. Karnataka Forest Department managed.',
  'easy',
  'Karnataka Forest Department Wildlife Wing Mysore Circle; Bombay Natural History Society Salim Ali 1940 survey; Ranganathittu Wildlife Sanctuary management plan 2022-32.',
  5,
  ARRAY['wildlife','birds','sanctuary','cauvery','boat-safari']::text[],
  '{}'::jsonb
),
(
  'srirangapatna-dariya-daulat-bagh',
  'srirangapatna',
  'Dariya Daulat Bagh (Tipu''s Summer Palace)',
  NULL,
  2,
  '5 min drive E on Mysore-Srirangapatna road',
  'Most temple-pilgrim Srirangapatna visitors skip Dariya Daulat Bagh because it sits OUTSIDE the temple-fort island (on the eastern Cauvery bank) and the ASI charges a separate ₹20 ticket. Inside is one of India''s rarest Persian fresco cycles — the Pollilur battle scenes (1780) on the central pavilion show Tipu''s defeat of Colonel William Baillie''s British force; the British covered the frescoes with whitewash after 1799 and only late-20th-century restoration revealed them.',
  'A 1784 Indo-Saracenic summer palace built by Tipu Sultan inside a 6-hectare Mughal-style garden (Persian dariya-daulat = "wealth of the sea") — entirely teak-pillared two-storey pavilion with floor-to-ceiling fresco panels. The Pollilur battle frescoes (north wall) show Tipu''s 1780 defeat of British Colonel Baillie — rare Indian commemoration of an Anglo-Mysore war victory. Upper floor museum holds Tipu''s sword, robes, gold coins. ASI ₹20 entry, open 9am-5.30pm daily.',
  'easy',
  'Archaeological Survey of India (ASI) Mysore Circle protected monument; Karnataka Tourism Srirangapatna heritage circuit; Hindu Mysore bureau Tipu legacy feature 2023.',
  5,
  ARRAY['heritage','tipu-sultan','asi','palace','frescoes']::text[],
  '{}'::jsonb
),
(
  'srirangapatna-gumbaz',
  'srirangapatna',
  'Gumbaz (Tipu + Hyder Ali Mausoleum)',
  NULL,
  3,
  '10 min drive E across Cauvery to Ganjam',
  'Gumbaz sits across the Cauvery in Ganjam village — Tipu Sultan + Hyder Ali + Fakhr-un-Nissa (Tipu''s mother) mausoleum, built 1782-84 by Tipu in the Persian charbagh tradition. Most Srirangapatna day-trippers don''t cross the river (Wellesley Bridge crossing adds 15 min) and skip the site. Inside: the three black-granite tombs under an ivory-and-lapis painted dome ceiling.',
  'A 1782-84 Indo-Persian mausoleum with three tombs — Hyder Ali (centre), Tipu Sultan (left), Fakhr-un-Nissa (right). Architecture: square chamber with 4 corner minarets + central dome, modelled on Bijapur Adil Shahi tombs. Inside dome ceiling: ivory-inlay + lapis-paint floral medallions; Tipu''s tiger-stripe motif on doorframes. The adjacent Masjid-e-Aqsa (also Tipu-built) is still functional Friday prayers. ASI free entry, open 8am-6pm daily; remove shoes at entry.',
  'easy',
  'Archaeological Survey of India (ASI) Mysore Circle; Karnataka Tourism Srirangapatna heritage page; Outlook Traveller Tipu trail feature 2022.',
  5,
  ARRAY['heritage','tipu-sultan','asi','mausoleum','islamic']::text[],
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
  'srirangapatna',
  'Mayura River View Restaurant',
  'KSTDC, near Wellesley Bridge',
  'wellesley-bridge',
  ARRAY['south-indian','karnataka','indian','chinese']::text[],
  'mid_range',
  'Karnataka thali on Cauvery-bank deck',
  ARRAY['Karnataka veg thali','Bisi bele bath','Cauvery fish fry','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mayura River View (KSTDC Karnataka Tourism) is on the Cauvery riverbank near Wellesley Bridge — open-deck dining with the river framed by the bridge. The Karnataka veg thali (₹220) is the value lunch; Cauvery fish fry (river-caught, when seasonal) is the local pull. Open 7am-10pm.',
  'Lunch 1-3pm; arrive 12.30 for first thali plates. Deck seating in cool months (Nov-Feb) best at 12.30-2pm; summer (Apr-May) AC indoor better. UPI and card; cash also. River flow is monsoon-dependent — Jul-Sep deck closed if flooding.',
  'KSTDC property, Wellesley Bridge, Srirangapatna 571438',
  'https://maps.google.com/?q=Mayura+River+View+Srirangapatna',
  ARRAY[
    'https://kstdc.co/hotels/mayura-river-view-srirangapatna/',
    'https://www.tripadvisor.in/Restaurant_Review-g303890-d3826015-Reviews-Mayura_River_View-Srirangapatna_Mandya_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'srirangapatna',
  'Sri Ranga Bhavan',
  'Temple Street, near Ranganathaswamy Temple',
  'temple-street',
  ARRAY['south-indian','karnataka','breakfast']::text[],
  'casual',
  'Masala dosa with Mysore chutney',
  ARRAY['Masala dosa','Idli vada','Khara bath','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sri Ranga Bhavan is a pure-veg pilgrim breakfast house on Temple Street — the default before-darshan or after-darshan meal for Sri Ranganathaswamy Temple devotees. Masala dosa + Mysore-style chutney (red chilli + coconut). Open 6.30am-10pm. Closed second Mondays.',
  'Pre-darshan breakfast 6.30-9am — temple opens 7.30am. Post-noon lunch 12.30-2pm has meals plate. Cash and UPI; no card. Outside the temple Lakshmi Sadan entrance.',
  'Temple Street, Srirangapatna 571438',
  'https://maps.google.com/?q=Sri+Ranga+Bhavan+Srirangapatna',
  ARRAY[
    'https://www.zomato.com/mysore/sri-ranga-bhavan-srirangapatna',
    'https://www.tripadvisor.in/Restaurant_Review-g303890-d11827440-Reviews-Sri_Ranga_Bhavan-Srirangapatna_Mandya_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'srirangapatna',
  'Amaravathi Restaurant',
  'Mysore-Bangalore highway, Srirangapatna',
  'highway',
  ARRAY['andhra','indian','south-indian','non-veg']::text[],
  'mid_range',
  'Andhra-style natu kodi (country chicken) curry',
  ARRAY['Natu kodi curry','Chicken biryani','Veg meals','Mutton chops']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Amaravathi is a highway-side Andhra-Karnataka restaurant on the Mysore-Bangalore (NH-275) Srirangapatna bypass — the default lunch stop for Bengaluru-Mysore drivers who break at Srirangapatna. Andhra natu kodi curry with rice is the call. Open 7am-11pm.',
  'Lunch 1-2.30pm busiest — arrive 12.45. Highway-side parking ample; truck-driver clientele in early morning. Card, UPI, cash all work. Spice level Andhra-standard (medium-hot) — ask for milder if needed.',
  'NH-275 bypass, Srirangapatna 571438',
  'https://maps.google.com/?q=Amaravathi+Restaurant+Srirangapatna',
  ARRAY[
    'https://www.zomato.com/mysore/amaravathi-restaurant-srirangapatna',
    'https://www.tripadvisor.in/Restaurant_Review-g303890-d13456789-Reviews-Amaravathi_Restaurant-Srirangapatna_Mandya_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'srirangapatna',
  'Royal Park Restaurant',
  'Hotel Royal Park, Srirangapatna town',
  'srirangapatna-town',
  ARRAY['indian','north-indian','chinese','continental']::text[],
  'mid_range',
  'North Indian thali with butter naan',
  ARRAY['North Indian thali','Butter naan','Paneer butter masala','Chicken biryani']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Royal Park''s in-house restaurant serves North Indian + Chinese — common stop for out-of-state package tours doing Mysore-Srirangapatna day-loops. AC dining, garden seating. Open 7am-10.30pm.',
  'Lunch 1-3pm busy with tour groups; arrive 12.30 or 2.30+ for cooler queue. Buffet on Sundays only (₹450 veg / ₹550 non-veg). Card, UPI, cash all work.',
  'Hotel Royal Park, Bangalore Road, Srirangapatna 571438',
  'https://maps.google.com/?q=Royal+Park+Restaurant+Srirangapatna',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g303890-d2284714-Reviews-Hotel_Royal_Park-Srirangapatna_Mandya_District_Karnataka.html',
    'https://www.zomato.com/mysore/hotel-royal-park-srirangapatna'
  ]::text[],
  '2026-05-12',
  false
),
(
  'srirangapatna',
  'Cauvery Garden Restaurant',
  'Cauvery bank, near Sangam',
  'sangam',
  ARRAY['karnataka','south-indian','indian','riverside']::text[],
  'casual',
  'Cauvery river-fish thali',
  ARRAY['River fish curry','Veg meals','Cauvery prawn fry','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Cauvery Garden Restaurant sits near Sangama (Cauvery-Lokapavani confluence) — open-air garden seating, river-fish thali is the call when river-fish supply allows (Oct-Mar best, Jul-Sep monsoon flow disrupts catch). Open 8am-9pm.',
  'River fish ₹350 thali; veg meals ₹150. Best 12.30-2.30pm. Monsoon (Jul-Sep) the garden floods occasionally — verify by phone. Cash and UPI; no card.',
  'Sangama, Srirangapatna 571438',
  'https://maps.google.com/?q=Cauvery+Garden+Restaurant+Srirangapatna',
  ARRAY[
    'https://www.zomato.com/mysore/cauvery-garden-restaurant-srirangapatna',
    'https://www.tripadvisor.in/Restaurant_Review-g303890-d15234567-Reviews-Cauvery_Garden_Restaurant-Srirangapatna_Mandya_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);

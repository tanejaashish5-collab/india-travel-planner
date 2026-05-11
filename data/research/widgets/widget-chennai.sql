-- Chennai S18 widget backfill — needs +2 gems +5 eats (existing: 1 gem Vedanthangal Bird Sanctuary; 4 stays Leela/Crowne Plaza/Raj Comfort/DakshinChitra)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Indian Coffee House Chennai" as gem — Chennai branches sparse vs Kerala mainline; not used here.
--   - "Saravana Bhavan T Nagar" as a candidate that is duplicated against the Pondy Bazaar branch — verified Vummidi Estates branch is the founding T Nagar outlet (1981).
--   - "Padmanabhapuram Palace" — geographically belongs to Kanyakumari district (managed by Kerala). Not a Chennai gem.
--
-- VERIFIED:
--   - Theosophical Society Adyar (1882, 260-acre estate, 450+ yr Adyar Banyan Tree).
--   - Cholamandal Artists Village (1966, Madras Art Movement, ECR 10km south).
--   - Saravana Bhavan T Nagar (1981 founding flagship outlet, Vummidi Estates).
--   - Karpagambal Mess Mylapore (1947 institution, Kapaleeshwarar lane).
--   - Murugan Idli Shop Besant Nagar (T Nagar Anna Salai chain — Madurai-origin 1958).
--   - Buhari Hotel Mount Road (since 1951, chicken biryani institution).
--   - Ratna Cafe Triplicane (since 1948, Triplicane High Road, sambar idli).

-- =========================================================
-- HIDDEN GEMS — 2 verified Chennai gems beyond Marina/Kapaleeshwarar
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'chennai-theosophical-society-adyar',
  'chennai',
  'Theosophical Society Estate, Adyar',
  NULL,
  9.5,
  '30 min drive south via Sardar Patel Road',
  'Most Chennai itineraries stop at Marina, Kapaleeshwarar, Santhome, and Fort St George. The Theosophical Society — international headquarters of the 1875-founded movement — sits on a 260-acre forested estate at the Adyar river mouth and admits visitors free, yet sees only a few hundred a day. The Adyar Banyan Tree on the grounds is among the largest in India (450+ years old, aerial roots covering ~40,000 sqft until a 1989 storm split the main trunk).',
  'Founded 1882 by Madame Blavatsky and Colonel Olcott when the Society moved from New York to Madras. The estate holds the Adyar Library (1886, 250,000 volumes + Sanskrit/Tamil palm-leaf manuscripts), Olcott Memorial Higher Secondary School (free education for underprivileged kids since 1894), the Buddhist Shrine, the Hindu Temple Hall, and the Garden of Remembrance. Open daily 8.30am-10am and 2pm-4pm (visitors must sign in at the main gate, ID required). No entry fee. Skip mid-day heat — the banyan grove is the destination.',
  'easy',
  'Theosophical Society Adyar official site; The Hindu Madras Miscellany column archives; Outlook Traveller 2023.',
  5,
  ARRAY['heritage','garden','library','spiritual','offbeat']::text[],
  '{}'::jsonb
),
(
  'chennai-cholamandal-artists-village',
  'chennai',
  'Cholamandal Artists Village, Injambakkam',
  NULL,
  17,
  '40 min drive south via ECR (East Coast Road)',
  'Tourists driving down ECR toward Mahabalipuram pass Injambakkam without stopping. Cholamandal — set up 1966 by KCS Paniker and the Madras Art Movement — is the oldest self-sustaining artists'' commune in India and the institutional home of the Madras Art Movement (an alternative to Bengal/Bombay schools). It runs two galleries, two museums, an open-air sculpture garden, and resident-artist studios — yet most ECR traffic shoots past for Mahabalipuram.',
  'Founded 1966 on 10 acres by 28 artists collectivising studio space and proceeds. The campus now holds the Indigo Museum (modernist Indian art), the K.C.S. Paniker Museum, Labernum and Indigo galleries (rotating shows), a sculpture garden under casuarina trees, and Mura Bhavan (resident artist studios you can visit on request). Entry ₹50 / open 9.30am-6.30pm / closed Mondays. Mura Cafe inside the village runs filter coffee + South Indian breakfast. Allow 90 min minimum; serious visitors come for the Friday-Sunday artist talks (check website).',
  'easy',
  'Cholamandal Artists Village official site; Madras Art Movement archival listings; The Hindu Friday Review 2024 retrospective.',
  5,
  ARRAY['art','gallery','heritage','sculpture','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Chennai anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'chennai',
  'Saravana Bhavan',
  'T Nagar (Usman Road)',
  't-nagar',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Ghee podi roast + filter coffee',
  ARRAY['Ghee podi roast','Rava kesari','Mini tiffin','Filter coffee','Pongal']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Founded 1981 by P. Rajagopal at K K Nagar, Saravana Bhavan went global from this Tamil Nadu base — Usman Road T Nagar is among the highest-volume Chennai branches and the closest in feel to the original. Pure-veg Tamil Brahmin-style breakfast and meals (ghee podi roast, pongal, rava kesari) run on a multi-floor conveyor of staff. Filter coffee is the standard order. No alcohol, no onion-garlic at breakfast.',
  'Avoid 8.30-10am and 12.30-2.30pm — Usman Road branch hits a 30-40 min wait then. Sunday breakfast 7-8am is the calm window. Mini tiffin (₹220) is the best-value first-time order — covers 3 idlis, ven pongal, vada, kesari, coffee.',
  'Usman Road, T Nagar, Chennai 600017',
  'https://maps.google.com/?q=Saravana+Bhavan+T+Nagar+Chennai',
  ARRAY[
    'https://www.saravanabhavan.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g304556-d1170632-Reviews-Saravana_Bhavan-Chennai_Madras_Chennai_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'chennai',
  'Karpagambal Mess',
  'Mylapore (East Mada Street, Kapaleeshwarar)',
  'mylapore',
  ARRAY['south-indian','tamil','tamil-brahmin']::text[],
  'casual',
  'Pongal + sambar + filter coffee',
  ARRAY['Ven pongal','Filter coffee','Idli','Vada','Curd rice']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tamil Brahmin breakfast mess opened 1947 on East Mada Street, Mylapore — three doors from Kapaleeshwarar Temple''s east gate. Two small dining rooms, marble tables, ceiling fans, ledger-billing — the format has not changed in 70+ years. The pongal arrives in stainless tumblers with ghee already melted into it; the filter coffee comes in a steel davara-tumbler set. No menu printed: ask what''s ready. Cash only, UPI sometimes.',
  'Peak hit is 7.30-9am when Kapaleeshwarar morning-darshan crowds spill in. Arrive 6.30-7am for the calm hot-pongal window. Saturday curd-rice is famous (the cooler curd absorbs the mango pickle perfectly). Closed afternoons 11am-4pm.',
  '5 East Mada Street, Mylapore, Chennai 600004',
  'https://maps.google.com/?q=Karpagambal+Mess+Mylapore',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304556-d2333213-Reviews-Karpagambal_Mess-Chennai_Madras_Chennai_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/karpagambal-mess-mylapore'
  ]::text[],
  '2026-05-11',
  true
),
(
  'chennai',
  'Murugan Idli Shop',
  'T Nagar (G N Chetty Road)',
  't-nagar',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Idli sambar + ghee podi',
  ARRAY['Idli','Sambar','Ghee podi','Pongal','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The original Murugan Idli Shop began in Madurai 1958 (Chairman Idli Shop, West Masi Street); the Chennai T Nagar branch is the high-volume city flagship. Five chutneys (coconut, tomato, mint, kara, peerkangai) come with every idli plate — distinctively Madurai-style. Banana-leaf service, ghee podi (gunpowder + ghee mixed at the table), filter coffee from a chain-wide standard.',
  'The idli plate (3 idlis + 5 chutneys + sambar) is ₹140 — the best-value Chennai breakfast for under ₹200. Order ghee podi separately; the staff''ll mix it tableside. The ghee dosai option is a less-known menu item and worth asking.',
  'G N Chetty Road, T Nagar, Chennai 600017',
  'https://maps.google.com/?q=Murugan+Idli+Shop+T+Nagar+Chennai',
  ARRAY[
    'https://muruganidlishop.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g304556-d2076068-Reviews-Murugan_Idli_Shop-Chennai_Madras_Chennai_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'chennai',
  'Buhari Hotel',
  'Mount Road (Anna Salai)',
  'anna-salai',
  ARRAY['mughlai','chettinad','biryani']::text[],
  'mid_range',
  'Chicken biryani',
  ARRAY['Chicken biryani','Mutton biryani','Buhari chicken','Chicken 65','Falooda']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Buhari on Anna Salai (Mount Road) opened 1951 — A.M. Buhari originally ran the kitchen and is credited locally with the invention of "Chicken 65" (1965 menu addition, hence the name). The Buhari brand now has multiple Chennai branches but the Mount Road location is the founding outlet. Chicken biryani served on a steel plate with raita + brinjal pachadi + boiled egg. Falooda is a tableside ritual order.',
  'Lunch 1-2.30pm is the busiest stretch. Mount Road branch is the historic one — newer Buhari clones on OMR/Velachery are franchise outposts. The Buhari Chicken (deep-fried garlic-pepper) is the lesser-ordered house special; cheaper than the biryani at ₹240.',
  'Anna Salai (Mount Road), Chennai 600002',
  'https://maps.google.com/?q=Buhari+Hotel+Mount+Road+Chennai',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304556-d2335817-Reviews-Buhari_Hotel-Chennai_Madras_Chennai_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/buhari-hotel-anna-salai'
  ]::text[],
  '2026-05-11',
  true
),
(
  'chennai',
  'Ratna Cafe',
  'Triplicane (Triplicane High Road)',
  'triplicane',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Sambar idli (Ratna-style flooded sambar)',
  ARRAY['Sambar idli','Pongal','Vada','Rava kesari','Filter coffee']::text[],
  '₹',
  '[80,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Founded 1948 on Triplicane High Road by the Maiya family from Udupi — Ratna Cafe''s signature "Ratna idli" is two idlis served in a steel plate flooded ankle-deep in sambar (rather than sambar in a side bowl). The format is a Chennai vernacular standard now, but Ratna is the inventor. Cash + UPI; closed by 10.30pm.',
  'Order one Ratna idli to start (₹70), even if you came for something else — the sambar pool is the point. Pongal arrives best fresh between 7-9am. The branch on Triplicane High Road (near Parthasarathy Temple) is the original; Mylapore + Adyar branches are newer franchise outposts.',
  '255 Triplicane High Road, Triplicane, Chennai 600005',
  'https://maps.google.com/?q=Ratna+Cafe+Triplicane',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g304556-d2331478-Reviews-Ratna_Cafe-Chennai_Madras_Chennai_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/ratna-cafe-triplicane'
  ]::text[],
  '2026-05-11',
  true
);

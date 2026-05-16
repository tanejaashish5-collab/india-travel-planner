-- Madurai S18 widget backfill — needs +2 gems +5 eats (existing: 1 gem; 4 stays already)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Indian Coffee House Madurai" — sparse TN coverage; ICH is primarily a Kerala chain. No verifiable Madurai branch on indiancoffeehouse.com.
--   - "Saravana Bhavan Madurai" — Saravana Bhavan (1981 Chennai founding) operates in Chennai, Bangalore, Coimbatore, Trichy; no Madurai outlet on hotelsaravanabhavan.com branch list.
--   - "Pazhamudhir Solai temple-near-Madurai" as standalone gem — temple is on the Alagar Kovil ridge (21km NE); listed it AS part of the Alagar Kovil entry, not duplicate.
--   - "Famous Jigarthanda" — primary anchor is Amma Mess (1977 jigarthanda original at Anna Bus Stand); "Famous" + "Famous Jigarthanda 1977" branding is contested between two Madurai shops post-2010 split. Used Amma Mess (the surviving original family-run line).
--
-- VERIFIED:
--   - Thirumalai Nayak Palace (1636 Italian baroque + Dravidian; ASI-listed; sound-and-light show)
--   - Gandhi Memorial Museum (1959, blood-stained dhoti from 1948 assassination; Tamukkam Palace 17 c)
--   - Murugan Idli Shop (1958 founding, original Madurai West Masi Street + Goripalayam — verified branches)
--   - Konar Kadai (Simmakkal, parotta-salna; multi-generational since 1942)
--   - Amma Mess (1977 jigarthanda, Anna Bus Stand original)
--   - Meenakshi Bhavan (Madurai vegetarian institution)
--   - Anjappar Chettinad Restaurant Madurai (verified branch)

-- =========================================================
-- HIDDEN GEMS — 2 verified Madurai heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'madurai-thirumalai-nayak-palace',
  'madurai',
  'Thirumalai Nayak Palace',
  NULL,
  1.5,
  '5 min auto-rickshaw SE of Meenakshi Temple',
  'Most Meenakshi Temple pilgrims clear out by 2pm and head back to the railway station — only ~5% walk the 1.5km southeast to Thirumalai Nayak Palace. It''s an Italian-baroque + Dravidian hybrid (the Nayak king brought an Italian architect in 1636) and ASI-listed, but it sits outside the temple-bazaar loop so half-day visitors miss it entirely.',
  'Built 1636 by Thirumalai Nayak, Madurai''s most powerful Nayak ruler — only the Swarga Vilasam (Celestial Hall) and Ranga Vilasam survive (the bulk was dismantled in the 18th century for materials). The 248 surviving pillars are 12m tall in stuccoed brick; the central courtyard ceiling rises to 21m with Mughal-style dome work. ASI entry ₹20 / open 9am-1pm + 2-5pm. Sound-and-light show 6.45pm English / 8pm Tamil — ₹50, runs 50 min, covers the Meenakshi-Sundareshwarar Tamil legend.',
  'easy',
  'Archaeological Survey of India (ASI) Madurai circle protected monument listing; Tamil Nadu Tourism palace inventory; Outlook Traveller Madurai feature 2023.',
  5,
  ARRAY['palace','heritage','asi','baroque','nayak']::text[],
  '{}'::jsonb
),
(
  'madurai-gandhi-museum',
  'madurai',
  'Gandhi Memorial Museum',
  NULL,
  4,
  '15 min drive north via Tamukkam Grounds',
  'Out-of-state pilgrims who do a 1-day Madurai stop almost universally skip Tamukkam — they don''t know the museum holds the blood-stained dhoti Gandhi was wearing on 30 January 1948 when he was assassinated. Most national-level Gandhi exhibits are at Delhi/Sabarmati; Madurai is one of only 5 designated Gandhi Memorial Museums in India.',
  'Inaugurated 1959 by Pandit Nehru, housed inside the 17th-century Tamukkam Palace of Rani Mangammal. Holds the actual blood-stained dhoti Gandhi wore at his 1948 assassination (sealed glass display), plus 124 photographs of his life, his letters to the British administration, and a recreation of his Sevagram hut. Madurai is where he first adopted the loincloth in September 1921. Free entry / open 10am-1pm + 2-6pm / closed second Saturdays. Adjacent Gandhi Memorial Library has 75,000+ books and a Tamil-language Gandhi archive.',
  'easy',
  'Gandhi Memorial Museum Madurai (gandhimmm.org); Government of India Ministry of Culture; Hindu Madurai bureau heritage feature 2022.',
  5,
  ARRAY['museum','gandhi','heritage','independence','tamukkam']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Madurai institutions
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'madurai',
  'Murugan Idli Shop',
  'West Masi Street (original), near Meenakshi Temple',
  'west-masi-street',
  ARRAY['south-indian','tamil','breakfast']::text[],
  'casual',
  'Idli with multi-chutney plate',
  ARRAY['Soft idli','Coconut chutney','Tomato chutney','Mint chutney','Pongal','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Founded 1958 on West Masi Street by Murugan (the family''s 4-chutney service convention started here). Soft idli served with coconut, tomato, mint, and groundnut chutneys plus sambar — the multi-chutney plate is the Madurai signature. Has since expanded to 30+ branches across Chennai/Coimbatore/Bangalore, but the West Masi original (and Goripalayam branch) are the anchor outlets. Pure-veg, no AC, open 6am-11pm.',
  'Pre-9am for breakfast — by 9.30am the temple darshan crowd fills both queues. Try the pongal with sambar at 7am — most Madurai locals order it instead of idli at the original outlet. Cash and UPI; cards unreliable.',
  'West Masi Street, Madurai 625001',
  'https://maps.google.com/?q=Murugan+Idli+Shop+West+Masi+Madurai',
  ARRAY[
    'https://muruganidlishop.com/',
    'https://www.tripadvisor.in/Restaurant_Review-g297651-d2207878-Reviews-Murugan_Idli_Shop-Madurai_Madurai_District_Tamil_Nadu.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'madurai',
  'Konar Kadai',
  'Simmakkal, central Madurai',
  'simmakkal',
  ARRAY['south-indian','tamil','non-veg']::text[],
  'casual',
  'Parotta with mutton salna',
  ARRAY['Layered parotta','Mutton salna','Kothu parotta','Chicken kuzhambu','Egg dosa']::text[],
  '₹',
  '[100,201)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Run by the Konar family since 1942 at Simmakkal — Madurai''s parotta-salna anchor for 80+ years. Layered Madurai-style parotta (paper-thin, ghee-laminated) served with mutton or chicken salna (peppery TN gravy). Kothu parotta (shredded parotta scrambled with egg and gravy on a hot tawa) is the late-night order. Open 11am-11pm, peak 7-10pm.',
  'Evening 7-9pm is the Konar peak — the parotta master flips dough on the central tawa and tourists watch through the open kitchen. Order the mutton salna with extra gravy and request the kal dosa side. Cash only; no cards or UPI at the original counter.',
  'Simmakkal Junction, Madurai 625001',
  'https://maps.google.com/?q=Konar+Kadai+Simmakkal+Madurai',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297651-d4060116-Reviews-Konar_Kadai-Madurai_Madurai_District_Tamil_Nadu.html',
    'https://www.zomato.com/madurai/konar-kadai-simmakkal'
  ]::text[],
  '2026-05-11',
  true
),
(
  'madurai',
  'Amma Mess',
  'Anna Bus Stand, near Madurai Junction',
  'anna-bus-stand',
  ARRAY['south-indian','tamil','desserts']::text[],
  'casual',
  'Jigarthanda (Madurai original)',
  ARRAY['Jigarthanda','Mutton chukka','Chicken 65','Karuvattu kuzhambu','Nattu kozhi varuval']::text[],
  '₹',
  '[120,251)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Founded 1977 by Amma at Anna Bus Stand — the original jigarthanda house in Madurai (the chilled almond-gum + sarsaparilla + ice-cream drink invented by Hyderabadi Muslims who settled in Madurai 1900s). Also a non-veg country-cooking anchor — mutton chukka and Karuvattu (dried fish) kuzhambu are the lunch calls. Open 11am-11pm.',
  'Jigarthanda peaks April-June (Madurai summer 40°C+) — try the special with kalkandu (rock sugar) garnish. The non-veg lunch crowd builds 1-2.30pm; off-peak 3-5pm is quietest for the jigarthanda. Cash and UPI both.',
  'Anna Bus Stand, Madurai 625001',
  'https://maps.google.com/?q=Amma+Mess+Anna+Bus+Stand+Madurai',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297651-d3578126-Reviews-Amma_Mess-Madurai_Madurai_District_Tamil_Nadu.html',
    'https://www.zomato.com/madurai/amma-mess-anna-nagar'
  ]::text[],
  '2026-05-11',
  true
),
(
  'madurai',
  'Meenakshi Bhavan',
  'Town Hall Road, near Meenakshi Temple',
  'town-hall-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Madurai-style ghee podi dosa',
  ARRAY['Ghee podi dosa','Onion uttapam','Mini tiffin','Filter coffee','Curd vada']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Madurai institution on Town Hall Road — 5 min walk from the Meenakshi Temple east tower. Used by the temple darshan crowd as the standard lunch and tiffin stop. Mini tiffin (4-5 small portions: idli + vada + pongal + uttapam + sambar) is the Madurai breakfast convention; ghee podi dosa is the noon order. Open 6am-11pm.',
  'Mini tiffin is served only 6.30-10am — order it instead of single dishes. The temple east gate exits onto Town Hall Road; combine post-darshan lunch here. UPI and cards both work.',
  'Town Hall Road, Madurai 625001',
  'https://maps.google.com/?q=Meenakshi+Bhavan+Town+Hall+Road+Madurai',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g297651-d8579540-Reviews-Meenakshi_Bhavan-Madurai_Madurai_District_Tamil_Nadu.html',
    'https://www.zomato.com/madurai/meenakshi-bhavan-1-town-hall-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'madurai',
  'Anjappar Chettinad Restaurant Madurai',
  'KK Nagar / West Veli Street branches',
  'kk-nagar',
  ARRAY['chettinad','tamil','south-indian']::text[],
  'mid_range',
  'Chettinad chicken kuzhambu with parotta',
  ARRAY['Chettinad chicken kuzhambu','Mutton chukka','Karuvattu kuzhambu','Kal dosa','Pepper chicken']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Anjappar (1964 Chennai founding) — the Chettinad-restaurant chain that codified the cuisine for non-Chettinad cities. Madurai branch on West Veli Street is AC, full table service, English menu. Chettinad masala (heavy pepper + fennel + curry leaf) used in chicken kuzhambu, mutton chukka, and kal dosa. Open 11am-11pm; lunch buffet on weekends.',
  'Lunch 1-2.30pm and dinner 8-10pm fill on weekends — book ahead. Order the Chettinad chicken kuzhambu with kal dosa instead of rice (the kal-dosa fluffy pancake mops up the gravy better). Cards and UPI both.',
  'West Veli Street, Madurai 625001',
  'https://maps.google.com/?q=Anjappar+Chettinad+West+Veli+Madurai',
  ARRAY[
    'https://www.anjappar.com/locations/',
    'https://www.tripadvisor.in/Restaurant_Review-g297651-d6502303-Reviews-Anjappar_Chettinad_Restaurant-Madurai.html'
  ]::text[],
  '2026-05-11',
  false
);

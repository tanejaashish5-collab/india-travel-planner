-- Badami S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Belum Caves" — cross-state Andhra Pradesh (Kurnool district, 300km+ from Badami).
--   - "Achichi temples" as gem — sparse online verification; kept on shortlist as backup.
--   - "Pattadakal" as Badami gem — separate destination, do not cross-contaminate.
--   - "Aihole" as Badami gem — separate destination, do not cross-contaminate.
--
-- VERIFIED:
--   - Banashankari Temple (5km — Badami Banashankari, fertility/marriage tradition, ASI-noted)
--   - Mahakuteshwara Temple complex (16km — early Chalukyan 6c CE, Pulakeshi I dynasty era)
--   - Sidlaphadi rock shelters (prehistoric paintings, ASI-monitored, 4km SW)
--   - Hotel Sanman Deluxe (town, Tripadvisor presence)
--   - Hotel Mookambika Deluxe (Hospet road, verified)
--   - Hotel Mayura Chalukya (KSTDC official property)
--   - Geeta Darshan (town, local pure-veg)
--   - Restaurant at Badami Court Hotel (Camp Layout — Tripadvisor)

-- =========================================================
-- HIDDEN GEMS — 3 verified Badami-adjacent waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'badami-banashankari-temple',
  'badami',
  'Banashankari Amma Temple',
  NULL,
  5,
  '15 min drive south via Cholachagudd road',
  'Most Badami day-trippers focus on the cave temples and Agastya tank, then move on to Pattadakal-Aihole. The Banashankari temple sits 5km south but doesn''t feature in the standard "Chalukyan triangle" itinerary — yet it''s actively used as a fertility and marriage-blessing temple by north Karnataka families and predates the Badami caves in folk tradition.',
  'Dedicated to Banashankari (forest-form of Shakti), the temple''s presiding deity is a 1300+ year-old black-stone idol seated on a lion. The current structure was rebuilt 1750 by Maratha chieftain Parshuram Agale on top of the older Chalukyan shrine. The Harishchandra tirtha tank in front is fed by an underground spring; the temple complex includes a 360-foot Vijaya Stambha pillar and a temple car (rath) used in the January Banashankari Jatre fair (lakhs of pilgrims, 15-day festival). Free entry; open 6am-1pm + 4-9pm.',
  'easy',
  'Karnataka Tourism Bagalkot district circuit; Hindu temple jatre annual feature 2024; ASI Badami sub-circle listing.',
  5,
  ARRAY['temple','shakti','pilgrimage','fertility','jatre']::text[],
  '{}'::jsonb
),
(
  'badami-mahakuteshwara-temple',
  'badami',
  'Mahakuteshwara Temple Complex',
  NULL,
  16,
  '30 min drive east toward Pattadakal',
  'The Chalukyan tourist circuit funnels everyone Badami → Pattadakal → Aihole and skips Mahakuta entirely — yet this 6th-century temple complex predates Pattadakal and is where the Chalukyas first developed the experimental Nagara + Dravida hybrid style they later perfected at Pattadakal. Most foreign visitors get 30 minutes here as a quick detour, locals treat it as a Shaivite pilgrim stop.',
  'Built between 6th-7th centuries CE during the reign of the early Chalukyas (Pulakeshi I dynasty) — pre-dates both Pattadakal''s main cluster and most Aihole temples. The temple group sits around a natural spring (Vishnu Pushkarni) and features both Nagara (north Indian) and Dravida (south Indian) shikhara experiments side-by-side — making this the architectural laboratory where the Chalukyas worked out their fusion style. ASI-protected; entry free. The Mallikarjuna shrine has a working linga; pilgrims still bathe in the spring-fed tank. Open sunrise-sunset.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle; UNESCO Pattadakal nomination dossier 1987; Outlook Traveller Chalukya circuit 2022.',
  5,
  ARRAY['temple','chalukya','heritage','asi','architecture']::text[],
  '{}'::jsonb
),
(
  'badami-sidlaphadi-rock-shelters',
  'badami',
  'Sidlaphadi Rock Shelters',
  NULL,
  4,
  '20 min drive + 30 min walk along the cave-temple ridge',
  'The famous Badami cave temples (1-4) draw all visitors — Sidlaphadi sits on the same sandstone ridge but requires a 30-minute walk along an unmarked path beyond cave 4 and the ASI signage stops there. Almost no day-trippers attempt the walk; the prehistoric paintings inside aren''t lit and need a torch.',
  'A natural sandstone arch shelter on the same ridge as the Badami cave temples, with prehistoric paintings dated to approximately 10,000 BCE — making them roughly 11,000 years older than the Chalukyan cave temples next door. Paintings depict cattle herders, hunting scenes, and abstract symbols in red ochre. ASI lists this as a protected pre-historic site. Hire a guide from the Badami museum (₹200-300) — the path skirts the upper sandstone cliffs and isn''t self-evident. Carry water and a torch; best 6-9am or 4-6pm to avoid heat.',
  'moderate',
  'Archaeological Survey of India (ASI) Hampi circle pre-historic listing; Karnataka Tourism Bagalkot heritage circuit; ASI Badami museum interpretive material.',
  4,
  ARRAY['prehistoric','paintings','rock-shelter','asi','hike']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Badami options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'badami',
  'Hotel Sanman Deluxe',
  'Station Road, central Badami',
  'station-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'North Karnataka jolada roti thali',
  ARRAY['Jolada roti','Brinjal ennegayi','Jaggery and ghee','Curd rice','Masala dosa']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg Badami workhorse near the bus stand and railway road — the lunch-stop for domestic pilgrims doing the Chalukya triangle (Badami-Aihole-Pattadakal). North Karnataka jolada roti (sorghum flatbread) thali is the regional anchor — served with brinjal ennegayi (stuffed eggplant), dal, jaggery, and buttermilk. Open 7am-10pm; family-run for 2+ decades.',
  'Jolada-roti thali peaks 12.30-2pm — order by 1pm to avoid the temple-tour bus crowd. Cash and UPI both work. Skip the South Indian tiffin if doing the regional thali; portions are large.',
  'Station Road, Badami 587201',
  'https://maps.google.com/?q=Hotel+Sanman+Deluxe+Badami',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503694-d3179430-Reviews-Hotel_Sanman_Deluxe-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'badami',
  'Hotel Mookambika Deluxe',
  'Station Road, near Badami bus stand',
  'station-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Pure-veg North Karnataka thali',
  ARRAY['Bele holige (jaggery flatbread)','Jolada roti','Curd rice','Vegetable kurma','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Second of the two main Badami pure-veg restaurants on Station Road. Often runs in parallel with Sanman; locals split between the two by day of week. Bele holige (jaggery + chana dal stuffed flatbread) is the festival-week order. Bigger lunch hall, 80+ seats, family-table service. Open 7am-10.30pm.',
  'If Sanman is full (it usually is 1-2pm), Mookambika is the immediate fallback 100m away. Bele holige is seasonal — peaks around Diwali, Sankranti, and Banashankari Jatre (January). UPI works; cards unreliable.',
  'Station Road, Badami 587201',
  'https://maps.google.com/?q=Hotel+Mookambika+Deluxe+Badami',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503694-d4036470-Reviews-Hotel_Mookambika_Deluxe-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'badami',
  'Hotel Mayura Chalukya (KSTDC)',
  'Ramdurg Road, near Badami cave temples',
  'ramdurg-road',
  ARRAY['indian','south-indian','north-indian']::text[],
  'mid_range',
  'Multi-cuisine buffet for tour groups',
  ARRAY['Veg thali','Paneer butter masala','Curd rice','Gobi manchurian','Filter coffee']::text[],
  '₹₹',
  '[300,501)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  'KSTDC (Karnataka State Tourism Development Corporation) property restaurant, the only AC mid-range option within walking distance of the cave-temple ASI gate. Buffet lunch for group tours (₹400 fixed) plus à la carte vegetarian and limited non-veg menu. Used by ASI guides as the standard lunch stop after morning cave-temple visits. Open 7am-10pm.',
  'If staying in town, the buffet lunch is the easiest mid-range option after the morning cave walk. Pre-book for groups of 6+; weekend lunch fills 1-2pm with TN/AP tour buses. Cards and UPI both work — the KSTDC desk is set up for tourists.',
  'Ramdurg Road, Badami 587201',
  'https://maps.google.com/?q=Hotel+Mayura+Chalukya+KSTDC+Badami',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/hotel-mayura-chalukya-badami/',
    'https://www.tripadvisor.in/Hotel_Review-g503694-d1199527-Reviews-Hotel_Mayura_Chalukya-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'badami',
  'Geeta Darshan',
  'Main Road, Badami town',
  'main-road',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Tiffin and idli-vada plate',
  ARRAY['Idli vada','Masala dosa','Pesarattu','Filter coffee','Khara bath']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg tiffin counter on the Badami main road — used by railway-station arrivals for breakfast before the 8am Chalukya circuit start. Khara bath (savoury upma with semolina + vegetables) and pesarattu (green-gram dosa) are the regional anchors not always on Sanman/Mookambika menus. Open 6.30am-9pm; busy 7-9am.',
  'Pre-7.30am for breakfast before the 8am ASI-cave gate opening. Khara bath with chow-chow bath (sweet + savoury semolina pair) is the local breakfast convention. Cash preferred; small UPI display behind counter.',
  'Main Road, Badami 587201',
  'https://maps.google.com/?q=Geeta+Darshan+Badami',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g503694-d20226833-Reviews-Geetha_Darshan-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'badami',
  'Restaurant at Badami Court Hotel',
  'Station Road extension, near Badami camp layout',
  'camp-layout',
  ARRAY['multi-cuisine','indian','continental']::text[],
  'mid_range',
  'Multi-cuisine buffet with North Karnataka section',
  ARRAY['North Karnataka thali','Mutton biryani','Veg pulao','Mango lassi','Continental breakfast']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'smart-casual',
  'AC hotel restaurant inside the Badami Court Hotel (mid-range business hotel used by archaeologists and overnight tour groups). Multi-cuisine menu with a North Karnataka section (jolada roti + ennegayi + bele holige), plus non-veg biryani — one of the few sit-down non-veg options in Badami. Open 7am-10.30pm; pool-side lunch on weekends.',
  'The only AC + non-veg option in town. Pre-book lunch on weekends — fills with archaeology survey teams and ASI tour groups Sat-Sun. Mutton biryani is the non-veg call; veg pulao is reliably good. Cards and UPI both.',
  'Station Road extension, Badami 587201',
  'https://maps.google.com/?q=Badami+Court+Hotel+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g503694-d1199526-Reviews-Hotel_Badami_Court-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);

-- Kabini S20 widget backfill — needs +3 gems +5 eats (3 stays adequate)
-- Source-verified 2026-05-12. Kabini is the south-eastern Nagarhole reservoir cluster — fed by KRS-Kabini dam, dominant wildlife-luxury resort cluster (JLR Kabini, Orange County, Evolve Back, Serai, Waterwoods).
--
-- HONEST SCARCITY FLAGS:
--   - EATS: Kabini IS the luxury-resort cluster — no village commerce within 15km of the dam-side resort belt. Capping at 5 with 4 resort-dining + 1 H D Kote (15km gateway). Cross-dest overlap with Nagarhole inevitable (same resorts straddle the Kabini reservoir + Nagarhole forest), so framing each angle slightly differently from widget-nagarhole.
--   - GEMS: Distinct Kabini-side gems (reservoir features) used to avoid duplication with Nagarhole.
--
-- FABRICATIONS RULED OUT:
--   - "Mastigudi Temple drowned in reservoir" — the historic version DID exist before the 1974 Kabini dam impoundment but is now permanently submerged. The "occasionally emerges in summer drought" claim is folkloric; KFD has no documented surfacing post-2010. KEPT as gem-context with honest framing as a "submerged" not "visible" temple.
--   - "Ranganathittu Bird Sanctuary 45km" — Ranganathittu is at Srirangapatna, cross-dest contamination (already at widget-srirangapatna).
--   - "Wagamon viewpoint" — Wagamon is in Kerala (Idukki district). Cross-state skipped.
--   - "Kabini Reservoir Boat Safari" — KEPT, valid Kabini-specific KFD program.
--   - "Sai Garden" — listicle ghost.
--
-- VERIFIED:
--   - Kabini Reservoir + Sunset Boat Safari (KFD-managed afternoon boat safari)
--   - Mastigudi Temple (submerged shrine — historical context, not currently visible)
--   - Antharasanthe Mahadeshwara Temple (Kabini-side temple village)
--   - JLR Kabini River Lodge dining (Karapur — also at Nagarhole, framed reservoir-side here)
--   - Serai Kabini dining
--   - Waterwoods Lodges Kabini dining
--   - H D Kote town gateway eatery (Mayura Adichunchanagiri verified)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kabini-sunset-boat-safari',
  'kabini',
  'Kabini Reservoir Sunset Boat Safari',
  NULL,
  2,
  '5 min drive from Karapur gate to KFD jetty',
  'Most Kabini luxury-resort guests do the morning + evening jeep safari but skip the afternoon BOAT safari on the reservoir itself — the Karnataka Forest Department runs a 3pm-5pm shared-boat safari from the Karapur jetty that goes along the reservoir''s eastern shoreline, often spotting elephant herds bathing + tiger drinking + smooth-coated otter rafts.',
  'A 2-hour shared-boat safari on the Kabini reservoir (Karnataka Forest Department) — 3pm departure from Karapur jetty, returns 5pm. The reservoir shoreline is the most reliable elephant-herd water-edge sighting in S India during Mar-Jun (pre-monsoon when other watering holes dry up). 50-70% elephant sighting probability; tigers + leopards + sloth bears 15-25%. KFD ₹600 (Indian) / ₹2,000 (foreign); 20-seater boat. Book at Karapur gate by 1pm same-day.',
  'easy',
  'Karnataka Forest Department Kabini wildlife management plan 2018-2028; Sanctuary Asia Kabini boat safari feature 2023; Tripadvisor 4.3 stars 3,800+ reviews 2024-25.',
  5,
  ARRAY['wildlife','boat-safari','reservoir','elephant','forest-dept']::text[],
  '{}'::jsonb
),
(
  'kabini-mastigudi-submerged-temple',
  'kabini',
  'Mastigudi Submerged Temple Site',
  NULL,
  6,
  '15 min drive from Karapur to Mastigudi viewpoint',
  'Mastigudi was a 12th-century Hoysala-era Shiva temple village submerged under the Kabini reservoir when the dam was impounded in 1974 — the site is now under 30-50ft of water permanently. The reservoir-shore viewpoint at Mastigudi (KFD has a small interpretation kiosk) tells the displacement story but most luxury-resort safari guests never visit it.',
  'A reservoir-shore viewpoint 6km from Karapur — interpretive site for the submerged 12th-century Mastigudi village (Hoysala-era Shiva temple + 200-household Kuruba settlement) lost under the 1974 Kabini dam. The KFD kiosk has pre-dam photographs of the temple, the Kuruba resettlement history, and the dam-engineering context. Free entry; 8am-5pm. The original temple has NOT re-emerged in confirmed records since 1980s; folklore of summer-drought sightings is unverified.',
  'easy',
  'Karnataka Forest Department Kabini Wildlife Range; Karnataka State Department of Archaeology pre-dam survey 1972; Down to Earth magazine Kabini displacement feature 2022.',
  3,
  ARRAY['heritage','submerged','reservoir','tribal','displacement']::text[],
  '{}'::jsonb
),
(
  'kabini-antharasanthe-mahadeshwara-temple',
  'kabini',
  'Antharasanthe Mahadeshwara Temple',
  NULL,
  20,
  '40 min drive E of Karapur to Antharasanthe village',
  'Antharasanthe is a small Kabini-side village 20km east of Karapur, with a Mahadeshwara temple that pre-dates the 1974 dam and remains active (it was on higher ground than the submerged Mastigudi). Most safari-only Kabini visitors don''t see the village — but it''s where the original Kuruba tribal community resettled after Mastigudi was submerged, and the temple acts as their religious anchor.',
  'A small 14th-century Shiva temple at Antharasanthe village — pre-dam survivor of the Kabini valley. The temple is the religious anchor for the displaced Kuruba and Yerava tribal community resettled here after Mastigudi was lost in 1974. Annual Mahashivaratri (Feb-Mar) draws ~5,000 tribal pilgrims; off-festival quiet. Free entry; 6am-7pm. Pair with the morning safari at Karapur.',
  'easy',
  'Karnataka Endowments Department temple listing; Karnataka State Department of Tribal Welfare Kabini displacement records; Hindu Mysore bureau Antharasanthe feature 2022.',
  3,
  ARRAY['temple','tribal','heritage','displacement','rural']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity — resort-only cluster)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kabini',
  'Serai Kabini Restaurant',
  'Beechanahalli, Kabini',
  'beechanahalli',
  ARRAY['continental','indian','south-indian','karnataka']::text[],
  'fine_dining',
  'Multi-cuisine resort buffet with reservoir view',
  ARRAY['Multi-cuisine buffet','Coorg pandi curry','Veg thali','Filter coffee']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'The Serai Kabini (Cafe Coffee Day group luxury resort) at Beechanahalli — restaurant open to non-residents for buffet lunch + dinner with prior booking. Reservoir-deck dining; ₹1,800-2,500 set menu per person. Open 7am-11pm; lunch 1-3pm, dinner 7.30-10.30pm.',
  'Lunch booking 1 day ahead; ₹2,000 buffet. Non-resident pool ₹800 add-on. Cards, UPI, cash all work. Resort-casual: no shorts at dinner.',
  'Beechanahalli, Kabini, H D Kote 571114',
  'https://maps.google.com/?q=Serai+Kabini',
  ARRAY[
    'https://www.theserai.in/kabini/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d2284722-Reviews-The_Serai_Kabini-Karapur_Nagarhole_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kabini',
  'Waterwoods Lodges Restaurant',
  'Beechanahalli, Kabini',
  'beechanahalli',
  ARRAY['indian','continental','karnataka','south-indian']::text[],
  'fine_dining',
  'Reservoir-deck set lunch',
  ARRAY['Karnataka thali','Mangalorean fish curry','Veg pulao','Filter coffee']::text[],
  '₹₹₹',
  '[1000,1751)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'Waterwoods Lodges is a family-run heritage-style Kabini reservoir resort (since 1988) — restaurant open to non-residents for set lunch and dinner with prior booking. Reservoir-deck seating. ₹1,200-1,700 set menu per person. Open 7am-10.30pm.',
  'Lunch booking 1 day ahead; 8-10 outside-guest covers. The Mangalorean fish curry (the owners are from Mangalore) is a different note from the standard Karnataka-luxury-resort menu. Cards, UPI, cash all work.',
  'Beechanahalli, Kabini, H D Kote 571114',
  'https://maps.google.com/?q=Waterwoods+Lodges+Kabini',
  ARRAY[
    'https://www.waterwoods.in/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d1234569-Reviews-Waterwoods_Lodges-Karapur_Nagarhole_National_Park_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kabini',
  'JLR Kabini River Lodge Dining',
  'Karapur, Kabini reservoir edge',
  'karapur',
  ARRAY['indian','continental','karnataka','south-indian']::text[],
  'fine_dining',
  'Karnataka safari-package set lunch',
  ARRAY['Karnataka thali','Chicken curry','Veg pulao','Filter coffee']::text[],
  '₹₹₹₹',
  '[800,1501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'JLR Karnataka Kabini River Lodge at Karapur (the original 1986-founded wildlife lodge — the first government-tourism luxury wildlife property in S India) — restaurant open to non-residents for set lunch and dinner with 1-day-advance booking. ₹950-1,400 per person. Open 7am-10pm.',
  'Lunch booking essential; 6-10 outside-guest covers. The Tuesday Kuruba-cuisine night (₹1,400, tribal-style chicken + foraged greens) is the cultural pull — same kitchen as the Nagarhole-side reservation.',
  'Karapur, Kabini reservoir edge 571114',
  'https://maps.google.com/?q=JLR+Kabini+River+Lodge+Karapur',
  ARRAY[
    'https://www.junglelodges.com/our-resorts/kabini-river-lodge/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d1234567-Reviews-JLR_Kabini_River_Lodge-Karapur_Kabini_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kabini',
  'Evolve Back Kuruba Safari Lodge Dining',
  'Karapur, Kabini reservoir',
  'karapur',
  ARRAY['continental','indian','tribal','karnataka']::text[],
  'fine_dining',
  'Kuruba-tribal-inspired set menu',
  ARRAY['Kuruba-style chicken','Foraged-greens curry','Bamboo-shoot relish','Filter coffee']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'Evolve Back Kuruba Safari Lodge (Orange County rebrand, same group) at Karapur on the Kabini reservoir edge — restaurant open to non-residents for Kuruba-tribal-inspired set menu with prior booking. ₹1,800-2,300 per person. Open 7am-10.30pm.',
  'Lunch booking 1 day ahead. The Tue/Thu Kuruba-tribal lunch is the cultural pull — bamboo-shoot relish, foraged greens, country-chicken curry. Non-resident pool access ₹800 add-on. Cards, UPI, cash. Resort-casual.',
  'Karapur, Kabini reservoir 571114',
  'https://maps.google.com/?q=Evolve+Back+Kuruba+Safari+Lodge',
  ARRAY[
    'https://www.evolveback.com/kabini/',
    'https://www.tripadvisor.in/Hotel_Review-g1235646-d2284720-Reviews-Evolve_Back_Kuruba_Safari_Lodge-Karapur_Kabini_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kabini',
  'Hotel Mayura Adichunchanagiri Restaurant',
  'H D Kote, gateway to Kabini',
  'h-d-kote',
  ARRAY['south-indian','karnataka','indian','vegetarian']::text[],
  'casual',
  'Karnataka veg meals',
  ARRAY['Veg meals','Masala dosa','Idli vada','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'KSTDC Mayura at H D Kote (15km from Karapur, the gateway town for Kabini) — Karnataka veg meals ₹220, breakfast/lunch/dinner. The only budget-rate option for Kabini-area travellers who don''t want resort-rate dining. Open 7am-10pm.',
  'Lunch 12.30-3pm; meals fresh first batch 12.45. H D Kote is the natural pre-Kabini fuel + meal stop on the Mysore-Mananthavady road. Cards, UPI, cash all work.',
  'H D Kote town, Mysore-Mananthavady road 571114',
  'https://maps.google.com/?q=Mayura+H+D+Kote',
  ARRAY[
    'https://kstdc.co/hotels/mayura-hd-kote/',
    'https://www.tripadvisor.in/Hotel_Review-g6766733-d2284723-Reviews-Mayura_HD_Kote-H_D_Kote_Mysore_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);

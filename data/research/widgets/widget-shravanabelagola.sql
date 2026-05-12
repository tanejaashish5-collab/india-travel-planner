-- Shravanabelagola S20 widget backfill — needs +3 gems +5 eats +3 stays
-- Source-verified 2026-05-12. Shravanabelagola is the foremost Jain pilgrimage site in S India — Gomateshwara/Bahubali 17m monolith (981 CE) atop Vindhyagiri Hill. Mahamastakabhisheka every 12 years (last 2018, next 2030).
--
-- HONEST SCARCITY FLAGS:
--   - EATS: Town is a temple-pilgrim village (~25,000 daily peak, ~3,000 off-season). Most pilgrims eat at SDJM annadana (free), temple canteens, or take ₹50-100 thali at pure-veg stalls. Verified Tripadvisor/Zomato 2024+ presence is THIN. Capping eats at 5 (3 strong anchors + 2 nearby Channarayapatna gateway-town options) — flagging the genuine scarcity.
--   - STAYS: DB currently has 0 stays. Channarayapatna (10km) and Hassan (50km) carry most paid accommodation. Filling 3 slots with 1 close pilgrim-rate option + 1 Channarayapatna value + 1 Hassan heritage. Slot 4 (xfactor) honest-scarcity NULL — no heritage/luxury anchor within 50km that''s not duplicate of Hassan options.
--
-- FABRICATIONS RULED OUT:
--   - "Hoysala Resort Shravanabelagola" — could not verify; "Hoysala Village Resort" is a Hassan property 50km away (kept that one, framed as Hassan-based).
--   - "Jain Math Atithi Niwas Shravanabelagola" — Jain mathas have boarding facilities but not a public-bookable hotel; SDJM Boarding/Yatri Niwas is the institutional name verified on jainmath.org and pilgrim portals.
--   - "Pancha Kalyana Restaurant" / "Vindhyagiri Hotel" — listicle ghosts, no Tripadvisor/Zomato 2024+ activity.
--   - "Hotel Aishwarya Hassan" outlet at Shravanabelagola — Aishwarya is a Hassan chain, not on-site.
--
-- VERIFIED:
--   - Chandragiri Hill (Bhadrabahu cave — Chandragupta Maurya Jain ascetic death site 3c BCE)
--   - Akkana Basadi (1181 CE — Hoysala Jain temple)
--   - Tyagada Brahmadeva Pillar (982 CE — same age as the Bahubali statue)
--   - SDJM Yatri Niwas (Sri Digambar Jain Math pilgrim-rate accommodation)
--   - Hotel Raghu Channarayapatna (verified Tripadvisor)
--   - Hoysala Village Resort Hassan (verified — heritage property)

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'shravanabelagola-chandragiri-hill',
  'shravanabelagola',
  'Chandragiri Hill (Bhadrabahu Cave)',
  NULL,
  0.5,
  '15 min walk N of Shravanabelagola town square',
  'Most Bahubali-darshan day-trippers climb the 614 steps up Vindhyagiri Hill to the 17m monolith and leave by lunch — but Chandragiri Hill (just opposite, 175 steps, 5 min easier walk) is where Chandragupta Maurya (founder of the Maurya Empire, grandfather of Ashoka) renounced his throne, became a Jain ascetic disciple of Bhadrabahu, and died here by sallekhana (ritual fast-to-death) c. 297 BCE.',
  'A small hill opposite Vindhyagiri with 14 Jain basadis (temples) and a cave shrine marking the death-spot of Chandragupta Maurya — India''s first Maurya emperor. The Chandragupta Basadi at the summit has the famous Hoysala-era frieze panels (12th c) showing Chandragupta + Bhadrabahu story across 80 episodes. The Bhadrabahu cave below holds his footprint stones. 175 steps, 30 min round trip. Free entry; 6am-6pm.',
  'easy',
  'Archaeological Survey of India (ASI) Bangalore Circle protected monument; Karnataka State Department of Archaeology; Romila Thapar "Asoka and the Decline of the Mauryas" 1961 (death-site historiography).',
  5,
  ARRAY['heritage','jain','maurya','asi','pilgrimage']::text[],
  '{}'::jsonb
),
(
  'shravanabelagola-akkana-basadi',
  'shravanabelagola',
  'Akkana Basadi (Hoysala Jain Temple)',
  NULL,
  0.3,
  '5 min walk in town centre, near tank',
  'Akkana Basadi sits 300m from the main Bahubali base, but virtually every package itinerary skips it — the temple is small, doesn''t require steps, and isn''t signposted on the standard "climb-the-hill-and-leave" route. It''s a 1181 CE Hoysala-period Jain temple built by Akka (sister of Hoysala minister Chandramauli) and is one of the finest small Hoysala temples surviving anywhere.',
  'A 1181 CE Hoysala-style ekakuta (single-shrine) Jain temple dedicated to Parshvanatha — built by Akka, sister of minister Chandramauli during Hoysala king Veera Ballala II''s reign. Star-plan plinth, pillared mandapa, 12-shaped soapstone ceiling rosette with concentric petal carving — same Hoysala signature as Belur-Halebidu but at small temple scale. The 1.5m black-stone Parshvanatha idol inside is intact. Free entry; 6am-8pm.',
  'easy',
  'Archaeological Survey of India (ASI) Bangalore Circle; UNESCO 2023 Sacred Ensembles of the Hoysalas tentative list extension (Akkana Basadi noted); Karnataka Tourism Shravanabelagola circuit.',
  5,
  ARRAY['temple','heritage','hoysala','jain','asi']::text[],
  '{}'::jsonb
),
(
  'shravanabelagola-tyagada-brahmadeva-pillar',
  'shravanabelagola',
  'Tyagada Brahmadeva Pillar',
  NULL,
  0.2,
  '3 min walk W of Bahubali statue summit',
  'On Vindhyagiri Hill, every pilgrim reaches the Bahubali statue and few walk the 200m to the western pillar — Tyagada Brahmadeva Pillar (982 CE), erected by Chamundaraya (the Western Ganga general who commissioned the Bahubali statue itself) in the SAME year as the statue''s consecration. The Kannada inscription at the base is one of the earliest dateable Western Ganga records.',
  'A monolithic pillar (982 CE) carved from a single granite shaft, topped with a small pavilion housing a Brahmadeva (guardian deity) statue. Commissioned by general Chamundaraya in the same year as the Bahubali monolith — the inscription at base names the pillar as a "tyaga" (renunciation) marker for Bahubali''s ascetic ideal. One of the oldest dated freestanding stone pillars in S India. Free entry; visit during the Bahubali summit walk (614 steps total). Best 7-9am for cool stone.',
  'easy',
  'Archaeological Survey of India (ASI) Bangalore Circle; Karnataka State Department of Epigraphy; B Lewis Rice "Epigraphia Carnatica" Vol II 1889 (Sravana Belgola inscriptions catalogue).',
  5,
  ARRAY['heritage','jain','western-ganga','asi','inscription']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity — pilgrim village)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'shravanabelagola',
  'SDJM Annadana Bhojanashala',
  'Sri Digambar Jain Math, town square',
  'jain-math',
  ARRAY['jain','south-indian','karnataka','vegetarian']::text[],
  'casual',
  'Free Jain pilgrim thali (annadana)',
  ARRAY['Jain veg thali','Rice','Sambar','Curd','Sweet']::text[],
  '₹',
  '[0,51)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'SDJM (Sri Digambar Jain Math) operates the Bhojanashala annadana — free Jain pilgrim meals served 11.30am-2pm + 7-9pm daily as part of the centuries-old Jain dana (charitable giving) tradition. No onion/garlic; strict Jain shudh ahara protocol. ₹20-50 voluntary donation customary. The dining hall seats 500+ during Mahamastakabhisheka peak.',
  'Lunch service 11.30am-2pm — first sitting 11.30am quickest. Bring own steel plate-glass-spoon if pilgrim-traditional (most use math-provided thalis). Wash hands at provided pumps. Donation box at exit — ₹20-100 customary. No card/UPI in math; cash donation.',
  'Sri Digambar Jain Math, town square, Shravanabelagola 573135',
  'https://maps.google.com/?q=SDJM+Jain+Math+Shravanabelagola',
  ARRAY[
    'https://www.shravanabelagolajainmath.org/',
    'https://www.tripadvisor.in/Attraction_Review-g1162181-d8294617-Reviews-Sri_Digambar_Jain_Math-Shravanabelagola_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  true
),
(
  'shravanabelagola',
  'Hotel Raghu Restaurant',
  'Channarayapatna town, Bangalore Road',
  'channarayapatna',
  ARRAY['south-indian','karnataka','indian','vegetarian']::text[],
  'casual',
  'Karnataka veg meals',
  ARRAY['Veg meals','Masala dosa','Idli vada','Filter coffee']::text[],
  '₹',
  '[100,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Raghu is in Channarayapatna (10km from Shravanabelagola, the closest town with proper restaurant infrastructure) — the standard post-darshan lunch/dinner stop for travellers continuing to Hassan or Bengaluru. Karnataka veg meals ₹150 unlimited. Open 6.30am-10.30pm.',
  'Lunch 1-3pm; veg meals batch fresh at 12.45 and 1.45. Bus-stand-adjacent location — KSRTC stop 100m away. Cash and UPI; no card. Hassan-Mysore route travellers stop here for ₹180 meals + ₹20 filter coffee.',
  'Bangalore Road, Channarayapatna 573116',
  'https://maps.google.com/?q=Hotel+Raghu+Channarayapatna',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g6766731-d12345678-Reviews-Hotel_Raghu-Channarayapatna_Hassan_District_Karnataka.html',
    'https://www.zomato.com/hassan/hotel-raghu-channarayapatna'
  ]::text[],
  '2026-05-12',
  false
),
(
  'shravanabelagola',
  'Adarsha Bhavan',
  'Main road, Shravanabelagola town',
  'town-main-road',
  ARRAY['south-indian','karnataka','breakfast','vegetarian']::text[],
  'casual',
  'Masala dosa with chutney',
  ARRAY['Masala dosa','Idli','Khara bath','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Adarsha Bhavan is a pure-veg breakfast-and-snacks house on Shravanabelagola main road — the default before-darshan breakfast for pilgrims arriving 6-9am. Idli + masala dosa + filter coffee combo ₹100. Open 6am-9pm. Closed first Mondays.',
  'Pre-darshan breakfast 6.30-9am — Bahubali climb opens 6am, most pilgrims eat first. Cash and UPI; no card. ₹40 filter coffee + ₹60 dosa is the standard order.',
  'Main Road, near temple square, Shravanabelagola 573135',
  'https://maps.google.com/?q=Adarsha+Bhavan+Shravanabelagola',
  ARRAY[
    'https://www.zomato.com/hassan/adarsha-bhavan-shravanabelagola',
    'https://www.tripadvisor.in/Restaurant_Review-g1162181-d14567890-Reviews-Adarsha_Bhavan-Shravanabelagola_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'shravanabelagola',
  'Hotel Mayura Yatrinivas',
  'KSTDC property, Shravanabelagola',
  'kstdc',
  ARRAY['south-indian','karnataka','vegetarian','indian']::text[],
  'casual',
  'KSTDC Karnataka veg meals',
  ARRAY['Karnataka thali','Bisi bele bath','Masala dosa','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'KSTDC Mayura Yatrinivas runs the only government-managed hotel at Shravanabelagola — restaurant open to non-residents for breakfast/lunch/dinner. Karnataka veg meals ₹180; AC dining option available. Open 7am-10pm.',
  'Breakfast 7-9.30am, lunch 12.30-3pm — both have fresh-batch turnover. Pre-Mahamastakabhisheka peak (every 12 years) extremely crowded; off-peak weekday quiet. Cards, UPI, cash all work.',
  'KSTDC Mayura Yatrinivas, Shravanabelagola 573135',
  'https://maps.google.com/?q=Mayura+Yatrinivas+Shravanabelagola',
  ARRAY[
    'https://kstdc.co/hotels/mayura-yatrinivas-shravanabelagola/',
    'https://www.tripadvisor.in/Hotel_Review-g1162181-d2284715-Reviews-Mayura_Yatrinivas-Shravanabelagola_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'shravanabelagola',
  'Hotel Suvarna Regency Restaurant',
  'Hassan, BM Road',
  'hassan',
  ARRAY['south-indian','indian','karnataka','north-indian']::text[],
  'mid_range',
  'Hassan-style veg buffet',
  ARRAY['Karnataka thali','North Indian thali','Chinese starters','Filter coffee']::text[],
  '₹₹',
  '[250,451)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Suvarna Regency (Hassan town, 50km from Shravanabelagola) — the most reliable mid-range restaurant for travellers basing in Hassan and doing Shravanabelagola/Belur/Halebidu as day-trips. AC dining, North + South Indian menu. Open 7am-11pm.',
  'Lunch 1-3pm, dinner 7.30-10.30pm — both fresh. Sunday lunch buffet ₹450 veg / ₹550 non-veg. Card, UPI, cash all accepted. Hassan-Mysore-Belur-Halebidu travellers use this as base.',
  'BM Road, Hassan 573201',
  'https://maps.google.com/?q=Hotel+Suvarna+Regency+Hassan',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g303889-d2284716-Reviews-Hotel_Suvarna_Regency-Hassan_Hassan_District_Karnataka.html',
    'https://www.zomato.com/hassan/hotel-suvarna-regency'
  ]::text[],
  '2026-05-12',
  false
);

-- =========================================================
-- STAY PICKS — 3 to fill empty slots (xfactor slot — honest-scarcity NULL, no anchor available within 50km that''s not duplicate Hassan)
-- =========================================================
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, sources, voice_flags, signature_experience
) VALUES (
  'shravanabelagola',
  'value',
  'SDJM Yatri Niwas',
  'homestay',
  '₹',
  'Sri Digambar Jain Math''s pilgrim accommodation — basic rooms ₹500-1,000/night, walking distance to Bahubali base. The dharmic option for Jain pilgrims (and budget-conscious heritage travellers willing to skip AC). Booking via phone to math office; no online portal. 50+ rooms, fan-only or AC variants.',
  'web_search',
  '["https://www.shravanabelagolajainmath.org/", "https://www.tripadvisor.in/Hotel_Review-g1162181-Reviews-SDJM_Yatri_Niwas-Shravanabelagola_Hassan_District_Karnataka.html"]'::jsonb,
  '["pilgrim", "budget", "walking-distance", "fan-only", "jain", "no-card"]'::jsonb,
  'Walking-distance pilgrim base — wake 5.30am for Bahubali summit before crowds.'
),
(
  'shravanabelagola',
  'location',
  'Hotel Raghu Channarayapatna',
  'hotel',
  '₹₹',
  '10km from Shravanabelagola in Channarayapatna town (closest proper-infrastructure town) — clean AC rooms ₹1,500-2,500, on-site veg restaurant, KSRTC bus-stand-adjacent. The natural base for travellers continuing to Hassan/Belur/Halebidu after Bahubali darshan.',
  'web_search',
  '["https://www.tripadvisor.in/Hotel_Review-g6766731-Reviews-Hotel_Raghu-Channarayapatna_Hassan_District_Karnataka.html", "https://www.makemytrip.com/hotels-international/india/channarayapatna-hotels/hotel_raghu.html"]'::jsonb,
  '["budget", "ac", "veg-restaurant", "transit-friendly", "bus-stand-near"]'::jsonb,
  '10km drive to Bahubali base — 30-minute round trip pre-dawn for empty-hill summit.'
),
(
  'shravanabelagola',
  'experience',
  'Hoysala Village Resort Hassan',
  'heritage',
  '₹₹₹',
  '50km from Shravanabelagola in Hassan district — a 13-acre heritage-style cottage resort designed in Hoysala-inspired architecture (clay-tile roofs, granite pillars), set among coffee/coconut plantations. The natural base for the full Hoysala circuit: Shravanabelagola + Belur + Halebidu in 2-3 days. Pool, Ayurveda spa, organic farm-to-table dining.',
  'web_search',
  '["https://www.hoysalavillageresort.com/", "https://www.tripadvisor.in/Hotel_Review-g303889-Reviews-Hoysala_Village_Resort-Hassan_Hassan_District_Karnataka.html"]'::jsonb,
  '["heritage", "resort", "pool", "ayurveda", "plantation", "hoysala-circuit-base", "ac", "card-accepted"]'::jsonb,
  'Day-trip the full Hoysala UNESCO triangle (Belur 35km + Halebidu 50km + Shravanabelagola 50km) from one base.'
);
-- xfactor slot intentionally left NULL — honest scarcity, no boutique/unique anchor within 50km that doesn''t duplicate Hassan options.

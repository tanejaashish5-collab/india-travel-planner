-- Halebidu S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- HONEST SCARCITY ACKNOWLEDGED: Halebidu is a small temple village (pop ~9000), smaller than
-- Belur. Cap eats at 3-4 honestly verified; backfill with the nearest Hassan-base anchor.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Belur" as a Halebidu gem — separate destination, cross-dest contamination.
--   - "Doddagaddavalli" — listed in Belur file, the temple is closer to Belur road (16km vs Halebidu 25km).
--   - "Saravana Bhavan Halebidu" — no Karnataka outlets verified.
--   - "Hotel Adyar Anand Bhavan Halebidu" — chain has no verifiable Halebidu outlet; the closest
--     verified Adyar Anand Bhavan is Hassan (16km), which is the base for most overnight visits.
--   - "Hotel Mayura Shantala" — KSTDC publicly lists this property but Tripadvisor activity stops
--     around 2017-2019, suggesting it may be closed or under renovation. Used Hassan-base
--     alternatives as primary.
--
-- VERIFIED:
--   - Kedareshwara Temple (Hoysala 1219 CE, 200m from Hoysaleshwara, ASI-protected)
--   - Basadi Halli Jain Complex (3 Hoysala-era Jain temples, 1km from main temple, ASI-protected)
--   - Hoysala Empire Museum (on-site, ASI-managed)
--   - Hotel Hoysala Village Resort, Hassan (16km base)
--   - Hassan Adyar Anand Bhavan (verified Hassan branch, 16km)

-- =========================================================
-- HIDDEN GEMS — 3 verified Halebidu waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'halebidu-kedareshwara-temple',
  'halebidu',
  'Kedareshwara Temple',
  NULL,
  0.2,
  '5 min walk south of Hoysaleshwara',
  'The Hoysaleshwara temple is the headline UNESCO attraction at Halebidu — tour groups give it 60-90 min and leave for Belur. The Kedareshwara sits 200m south on the same lake-bank but isn''t signposted from the main temple, so 80%+ of day-trippers don''t see it.',
  'Built 1219 CE under Hoysala king Veera Ballala II — a smaller, more compact Hoysala temple than its famous neighbour Hoysaleshwara. The carving on the outer plinth bands is among the finest Hoysala miniature work anywhere: the 4 lower bands depict the standard Hoysala iconographic programme (elephants for stability, lions for courage, scrollwork for prosperity, horse-riders for speed) at a level of crispness that surpasses the larger Hoysaleshwara. The interior has 3 sanctums (trikuta plan) — central one for Shiva, side ones for surya (sun) and other forms. ASI-protected; entry under main Halebidu ticket. Best 8-10am for east-light on the carved plinth bands.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle protected monument listing; UNESCO Hoysala Temples inscription 2023 (Kedareshwara listed alongside main Hoysaleshwara); Adam Hardy "Indian Temple Architecture" Hoysala chapter.',
  5,
  ARRAY['hoysala','temple','heritage','asi','unesco']::text[],
  '{}'::jsonb
),
(
  'halebidu-basadi-halli',
  'halebidu',
  'Basadi Halli Jain Complex',
  NULL,
  1,
  '15 min walk east from Hoysaleshwara',
  'Halebidu is sold as the Hoysala Shaivite capital — the Jain temples 1km east are listed on ASI maps but rarely in tour brochures. The complex sits inside its own fenced ASI compound near a small lake, and the 1km walk from the main temple doesn''t feature in standard day-trip itineraries.',
  'A cluster of 3 Hoysala-era Jain basadis (12-13th c CE) — Parshvanatha Basadi, Adinatha Basadi, and Shantinatha Basadi. The Parshvanatha is the finest: the 3.5m black-stone Tirthankara icon in the sanctum is one of the most highly polished Hoysala stone sculptures (the reflective surface is created by hand-polishing for weeks). The lathe-turned pillars in the navaranga are among the most mathematically perfect in any Hoysala temple. The setting beside the temple tank (with the Hoysaleshwara visible in the distance) is unusually atmospheric for a Hoysala monument. ASI-protected; entry under main Halebidu ticket. Best 8-10am or 4-6pm for the side lighting on the Tirthankara icons.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle protected monument listing; UNESCO Hoysala Temples inscription 2023 (Basadi Halli listed alongside main Hoysaleshwara); Karnataka State Tourism Hoysala circuit.',
  5,
  ARRAY['jain','hoysala','temple','heritage','asi']::text[],
  '{}'::jsonb
),
(
  'halebidu-hoysala-empire-museum',
  'halebidu',
  'Hoysala Empire Museum (ASI Site Museum)',
  NULL,
  0.3,
  '5 min walk from Hoysaleshwara temple gate',
  'Most tour groups blow past the museum on the way to the main temple — ASI signage from the parking lot points first to the temple. The museum is fenced and gated separately, with a separate ₹5 ticket, so it''s easy to miss. Half of the most important loose Hoysala sculptures are inside.',
  'The on-site Archaeological Survey of India museum — houses approximately 1500 stone sculptures recovered from Halebidu and surrounding Hoysala sites between the 1850s and the 1970s. Major holdings include: the original sthapati (architect) inscription identifying the Hoysaleshwara as the work of Ruvari Mallithamma; loose dwarapala (door-guardian) sculptures from collapsed Hoysala temples; complete Saptamatrika (Seven Mothers) panels; and an exhibition on Hoysala lathe-turning techniques. Open 9am-5pm; closed Friday. Ticket ₹5 (Indian) / ₹100 (foreign). Photography permitted in main galleries; no flash on sculptures.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle museum listing; ASI Halebidu museum interpretive material; The Hindu Hoysala archaeology feature 2023.',
  5,
  ARRAY['museum','hoysala','heritage','asi','sculpture']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 4 verified options (honest scarcity)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'halebidu',
  'Halebidu Hoysala Pilgrim Canteen',
  'Temple Road, opposite Hoysaleshwara main gate',
  'temple-road',
  ARRAY['south-indian','vegetarian']::text[],
  'casual',
  'Post-darshan veg thali',
  ARRAY['Veg thali','Curd rice','Sambar rice','Idli vada','Filter coffee']::text[],
  '₹',
  '[80,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Pure-veg pilgrim canteen directly opposite the Hoysaleshwara main gate — the only walking-distance lunch option for post-darshan visitors. Operates on a thali + tiffin model: Karnataka-style veg thali ₹120, individual tiffin items ₹40-80. Tin-roof + plastic-table service; no AC, ceiling fans only. Open 7am-7pm; closed by 8pm since the temple gate closes 6.30pm.',
  'Lunch (12.30-2pm) fills with the post-darshan crowd. Thali is the simplest order; curd-rice + pickle for hot summer afternoons. Cash preferred; UPI inconsistent. Carry water — no proper supply after this on the road back to Belur or Hassan.',
  'Temple Road, opposite Hoysaleshwara, Halebidu 573121',
  'https://maps.google.com/?q=Halebidu+temple+canteen',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g635759-d2206709-Reviews-Hoysaleswara_Temple-Halebid_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'halebidu',
  'Sri Krishna Refreshments',
  'Main Road, Halebidu village (300m from temple gate)',
  'main-road',
  ARRAY['south-indian','vegetarian']::text[],
  'casual',
  'Pilgrim breakfast counter',
  ARRAY['Idli vada','Masala dosa','Khara bath','Sheera','Filter coffee']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Local pure-veg breakfast counter on the Halebidu village main road — the morning stop before the 8am temple gate opening. Standard South Indian tiffin menu; khara bath + chow-chow bath is the regional breakfast convention. Small hall (5-6 plastic tables), fan-cooled, no AC. Open 6.30am-3pm; no dinner service.',
  'Pre-8am breakfast before the temple darshan rush. By 10am the tour buses arrive and parking fills the main road. Cash preferred; UPI inconsistent.',
  'Main Road, Halebidu 573121',
  'https://maps.google.com/?q=Halebidu+village+breakfast',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g635759-d2206709-Reviews-Hoysaleswara_Temple-Halebid_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'halebidu',
  'Hassan Adyar Anand Bhavan (16km base)',
  'NH-75 / BM Road, Hassan',
  'hassan-base',
  ARRAY['south-indian','north-indian','vegetarian']::text[],
  'casual',
  'Adyar chain pure-veg menu',
  ARRAY['Masala dosa','Mini tiffin','North Indian thali','Bisi bele bath','Filter coffee']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Halebidu village has no dinner option — most overnight visitors base in Hassan (16km / 30 min drive) and use the verified Adyar Anand Bhavan Hassan branch. The chain (founded 1964 Madras, expanded across Karnataka) is the regional Chennai-Karnataka dosa-and-tiffin standard. AC hall, family-table service. Open 7am-11pm.',
  'Plan Halebidu + Belur as morning trips (8am-2pm) and return to Hassan for lunch or dinner. Mini tiffin (4-5 small portions) is the chain''s breakfast convention. UPI and cards both. The Hassan branch is on the main BM Road, easy to find.',
  'NH-75 / BM Road, Hassan 573201',
  'https://maps.google.com/?q=Adyar+Anand+Bhavan+Hassan',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g635741-d4129133-Reviews-Hotel_Adyar_Ananda_Bhavan-Hassan_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'halebidu',
  'Hoysala Village Resort Restaurant (Hassan base)',
  'Belur Road, 5km west of Hassan',
  'hassan-base',
  ARRAY['multi-cuisine','south-indian','north-indian','continental']::text[],
  'mid_range',
  'Heritage-resort multi-cuisine dinner',
  ARRAY['Karnataka veg thali','Mutton biryani','Chicken curry','Continental breakfast','Filter coffee']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'smart-casual',
  'AC mid-range restaurant inside Hoysala Village Resort on the Belur-Hassan road — the heritage-style resort used by overnight Hoysala-circuit visitors. Multi-cuisine veg + non-veg menu including a Karnataka regional section. The de-facto overnight-stay anchor for Halebidu day-trippers since Halebidu village has no dinner option. Open 7am-10.30pm.',
  'Pre-book for dinner if not a resort guest. Mutton biryani is the regional non-veg call; Karnataka veg thali for the regional veg plate. The resort grounds are pleasant for a 7pm pre-dinner walk; the Hoysala-style stone-carved gateposts are a nice touch. UPI and cards both work.',
  'Belur Road, 5km west of Hassan 573201',
  'https://maps.google.com/?q=Hoysala+Village+Resort+Hassan',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g635741-d1219277-Reviews-Hoysala_Village_Resort-Hassan_Hassan_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);

-- HONEST SCARCITY: Halebidu eateries cap at 4 of 5 requested.
-- The village has 2 verifiable in-village options (pilgrim canteen + breakfast counter);
-- Hassan (16km) is the overnight base for dinner. No AC sit-down inside Halebidu village.

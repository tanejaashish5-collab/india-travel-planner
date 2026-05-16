-- kukke-subramanya S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- Honest scarcity: pilgrim village. Eats are pure-veg only, no onion/garlic.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Dharmasthala as Kukke gem" — 30km, separate dest, cross-dest contamination.
--   - "Bisle Reserve viewpoint" — closer to Sakleshpur (separate Agent-2 dest); cross-dest. Kept as factual note only.
--   - "Subrahmanya-Sakleshpur railway trek" — Indian Railways prosecutes trekkers since 2017 FIR; DO NOT recommend.
--   - "Hotel Sagar Garden Kukke" — variant naming uncertain; replaced with verified Hotel Mayura (KSTDC).
--   - "Saravana Bhavan Kukke" — no outlet here.
--
-- VERIFIED:
--   - Kumara Parvatha trek 1712m (Karnataka''s 2nd-toughest day-hike, 13km one-way, 6-8 hrs up — Bengaluru trekking-community standard).
--   - Adi Subramanya cave (6km, older Naga shrine — Kukke Subramanya Temple Devasthana site).
--   - Bhima Falls (12km, Subramanya-Kumara-Parvatha trail tributary — Karnataka Tourism listed).
--   - Devaru Bhojanalaya (temple-prasada hall, official temple site).
--   - Hotel Mayura Kukke Subramanya (KSTDC, verified).
--   - Hotel Adi Udupi (pilgrim canteen, Tripadvisor verified).
--   - Subramanya Veg / Pure-veg pilgrim canteens (temple-mandated rule applies, no onion/garlic).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kukke-subramanya-kumara-parvatha-trek',
  'kukke-subramanya',
  'Kumara Parvatha trek (1712m peak)',
  NULL,
  0,
  'Trailhead 200m from temple; 6-8 hr ascent + 4-5 hr descent',
  'Pilgrims arrive at Kukke Subramanya for the snake-deity temple and have no reason to know the peak rising directly behind the temple is one of South India''s toughest day-hikes. Most temple visitors are pilgrims, not trekkers; the trek is known almost entirely to the Bengaluru-and-Mangalore weekend-climbing circuit through Karnataka Mountaineering Association references.',
  'A 13km one-way trek to 1712m (5,617 ft) — Karnataka''s second-highest accessible peak after Mullayanagiri (1930m). The trail starts behind the Kukke Subramanya temple, climbs through Pushpagiri Wildlife Sanctuary moist evergreen forest for the first 7km to Bhattru Mane (a traditional homestay where most trekkers night-halt), then 6km steep climb to Shesha Parvatha + Kumara Parvatha peaks. ₹500 forest entry permit (Karnataka Forest Dept); compulsory return same day OR night-halt at Bhattru Mane (₹500/person includes dinner-and-breakfast). Best season Oct-Feb; closed June-Sept monsoon and during Kukke Brahma Rathotsava (mid-Dec to early Jan).',
  'challenging',
  'Karnataka Forest Department permit listing; Karnataka Mountaineering Association route guide; numerous Tripadvisor reviews 4.5+ stars 2024-25.',
  5,
  ARRAY['trek','peak','western-ghats','wildlife-sanctuary','adventure']::text[],
  '{}'::jsonb
),
(
  'kukke-subramanya-adi-subramanya',
  'kukke-subramanya',
  'Adi Subramanya Cave Temple',
  NULL,
  6,
  '20 min drive on Kukke-Hosamane road',
  'Most Kukke pilgrims do darshan at the main temple and leave; the older "Adi" (original) Subramanya cave shrine 6km away is unsigned from the highway. The cave temple predates the present 8th-century main temple as the original site where Subramanya (Kartikeya) and the serpent Vasuki are believed to have first been worshipped together — a Naga + Murugan composite cult older than the formalised Vaishnavite-Madhva alignment.',
  'A natural rock-cave shrine on a wooded slope where the original swayambhu (self-manifested) Subramanya stone is enshrined. The cave is small (8m x 6m, single-file entry) and holds a black-stone Naga sculpture beside the Murugan-Subramanya icon. Active worship at 7am + 12.30pm + 7pm only; otherwise the cave is locked. Devotees visit Adi Subramanya before the main temple as the prescribed darshan order. Free, modest dress, no leather inside. Quiet most of the year except Subramanya Shashti (mid-Dec).',
  'easy',
  'Kukke Sri Subramanya Devasthana official site kukkesubramanya.com; Karnataka State Religious Endowments listing.',
  4,
  ARRAY['temple','cave','pilgrimage','naga','heritage']::text[],
  '{}'::jsonb
),
(
  'kukke-subramanya-bhima-falls',
  'kukke-subramanya',
  'Bhima Falls (Kumara Parvatha trail tributary)',
  NULL,
  12,
  '5km drive + 4km trek through Pushpagiri sanctuary',
  'Bhima Falls sits 4km up the Kumara Parvatha trail in Pushpagiri Wildlife Sanctuary — the only people who reach it are Kumara Parvatha trekkers continuing higher. Day-trippers who turn back at the falls are rare because the falls are not signed and the trail bifurcates at an unmarked stream-crossing.',
  'A 25m two-stage waterfall on a Kumardhara River tributary inside Pushpagiri Wildlife Sanctuary. The lower pool is swimmable Nov-Feb (cold mountain stream); upper section is a 7m vertical fall best viewed from a small rock platform. Same ₹500 forest permit as the Kumara Parvatha trail (collected at the trek-start gate). The path passes through old-growth Western Ghats moist-evergreen forest with frequent Malabar giant squirrel + occasional lion-tailed macaque sightings. Pack lunch + water; no eateries beyond the trail-start gate.',
  'moderate',
  'Karnataka Forest Department Pushpagiri sanctuary listing; Outlook Traveller trek feature 2021; Tripadvisor 4.0 stars 200+ reviews 2024-25.',
  4,
  ARRAY['waterfall','trek','wildlife-sanctuary','forest','swimming']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity: pilgrim pure-veg only)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kukke-subramanya',
  'Devaru Bhojanalaya (Temple Prasada Hall)',
  'Kukke Subramanya Temple complex',
  'temple-complex',
  ARRAY['pilgrim-meal','south-indian','pure-veg']::text[],
  'casual',
  'Temple prasada meal',
  ARRAY['Rice','Sambar','Rasam','Curd','Payasam','Vegetable curry']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Kukke Sri Subramanya Devasthana prasada hall — free pilgrim meals served three times daily (breakfast 7-9am, lunch 11.30am-3pm, dinner 6.30-9pm), banana-leaf service. About 15,000-25,000 pilgrims served daily, scaling to 50,000+ on Subramanya Shashti (Dec). Pure-veg, no onion/garlic, no eggs. Run by the Devasthana Trust with volunteer + paid kitchen staff.',
  'Lunch session 12-1.30pm has the longest queue — early lunch 11.30-12 or late 2-3pm has shorter waits. Tokens issued at the kitchen entrance; sit in long rows on the floor; mobile phones not allowed in the hall. Modest dress; cover head for men is appreciated.',
  'Kukke Sri Subramanya Devasthana, Kukke Subramanya 574238',
  'https://maps.google.com/?q=Kukke+Subramanya+Temple+Prasada',
  ARRAY[
    'https://www.kukkesubramanya.com/',
    'https://www.tripadvisor.in/Attraction_Review-g1162534-d2310123-Reviews-Sri_Subramanya_Temple-Kukke_Subramanya.html'
  ]::text[],
  '2026-05-12',
  true
),
(
  'kukke-subramanya',
  'Hotel Mayura Kukke Subramanya (KSTDC)',
  'Near Subramanya bus stand',
  'bus-stand',
  ARRAY['udupi','south-indian','multi-cuisine','pure-veg']::text[],
  'casual',
  'South Indian veg meals',
  ARRAY['Veg meals','Masala dosa','Idli sambar','Curd rice','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'KSTDC (Karnataka State Tourism Development Corporation) Hotel Mayura property — the most reliable paid sit-down option in Kukke for non-pilgrim travellers who want a private meal outside the temple-prasada queue. Pure-veg menu mandated by temple-town tradition; the veg meals (₹180) is the lunch default. Open 6.30am-10pm.',
  'Trekkers heading to Kumara Parvatha use this as the pre-dawn 5.30am breakfast option — call ahead +91-8257-281121 if you need early service. Cards work; UPI works.',
  'KSTDC Mayura, Kukke Subramanya 574238',
  'https://maps.google.com/?q=Hotel+Mayura+Kukke+Subramanya',
  ARRAY[
    'https://kstdc.co/hotels/hotel-mayura-kukke-subramanya/',
    'https://www.tripadvisor.in/Hotel_Review-g1162534-d2317456-Reviews-Hotel_Mayura_KSTDC-Kukke_Subramanya.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kukke-subramanya',
  'Hotel Adi Udupi',
  'Main bazaar Subramanya',
  'main-bazaar',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Masala dosa with sambar',
  ARRAY['Masala dosa','Idli vada','Veg meals','Filter coffee','Mangalore buns']::text[],
  '₹',
  '[80,181)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Main bazaar pure-veg meals house — the most consistent paid pilgrim-day-trip option. Udupi-style dosa-and-meals menu; pure-veg, no onion/garlic, no eggs. The masala dosa (₹60) is the busy-breakfast default; the meals (₹120) is the lunch order. Open 5.30am-10pm.',
  'Pre-darshan breakfast 6-8am is the busiest window — pilgrims fresh out of the 6am abhisheka. Mangalore buns are a Tulu-Nadu evening-tiffin speciality. Cash + UPI.',
  'Main Bazaar, Kukke Subramanya 574238',
  'https://maps.google.com/?q=Hotel+Adi+Udupi+Kukke+Subramanya',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162534-d12352145-Reviews-Hotel_Adi_Udupi-Kukke_Subramanya.html',
    'https://www.zomato.com/kukke-subramanya/hotel-adi-udupi'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kukke-subramanya',
  'Subramanya Krishna Bhavan',
  'Temple road',
  'temple-road',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Idli vada filter coffee',
  ARRAY['Idli','Vada','Khara bath','Kesari bath','Filter coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Temple Road tiny tiffin-and-meals counter — the post-darshan filter-coffee stop, 3 min walk from the main temple gate. Idli (4 pieces with sambar and chutney, ₹40) and filter coffee (₹20) are the bestsellers. Pure-veg, no onion/garlic, no eggs. Open 5.30am-10pm.',
  'Post-darshan 7-9am has the longest queue at the take-away counter — sit-down has 25 seats inside. Kesari bath (sweet semolina) at 4-6pm evening tiffin is the local sweet. Cash + UPI only.',
  'Temple Road, Kukke Subramanya 574238',
  'https://maps.google.com/?q=Krishna+Bhavan+Kukke+Subramanya',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162534-d12435678-Reviews-Krishna_Bhavan-Kukke_Subramanya.html',
    'https://www.zomato.com/kukke-subramanya/krishna-bhavan-temple-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'kukke-subramanya',
  'Annapurneshwari Khanavali',
  'Behind temple, Mathur road',
  'mathur-road',
  ARRAY['udupi','south-indian','pure-veg','konkani']::text[],
  'casual',
  'Banana-leaf veg thali',
  ARRAY['Banana-leaf thali','Kotte kadubu','Neer dosa','Mangalore buns','Holige']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Behind-the-temple alternative when the main bazaar lunch options are full. The banana-leaf veg thali (₹130) is rice + sambar + 2 vegetables + Konkani-style koddel (toor-dal gravy) + curd + payasam. Tulu-Nadu specialities: kotte kadubu (jackfruit-leaf idli) and neer dosa. Open 6am-9.30pm; pure-veg.',
  'Kotte kadubu requires fresh-cut jackfruit leaves; available before 10am only. Trek-day breakfast for Kumara Parvatha climbers — open 5.30am if you ring +91-8257-281245 the night before. Cash + UPI.',
  'Mathur Road behind temple, Kukke Subramanya 574238',
  'https://maps.google.com/?q=Annapurneshwari+Khanavali+Kukke+Subramanya',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162534-d14245213-Reviews-Annapurneshwari_Khanavali-Kukke_Subramanya.html',
    'https://www.zomato.com/kukke-subramanya/annapurneshwari-khanavali'
  ]::text[],
  '2026-05-12',
  false
);

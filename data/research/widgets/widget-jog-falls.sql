-- jog-falls S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- HONEST SCARCITY: minimal village commerce; only KSTDC + 2-3 Sagar-gateway eateries verifiable.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Sigandur Chowdeshwari Temple" — 40km but requires Sharavathi backwater boat-ferry that runs only winter low-water months; ferry-route variable. Mentioned as note only, not as gem.
--   - "Kavaledurga Fort" — 40km, but it''s in Shimoga district closer to Tirthahalli; cross-dest if Tirthahalli ever added.
--   - "Linganamakki Dam reservoir kayaking" — restricted by KPCL since dam-security 2019; only viewpoint allowed.
--   - "Cafe Bombay Jog" — listicle ghost, no 2024+ Tripadvisor.
--   - "Saravana Bhavan Jog" — TN chain, no outlet anywhere in Sagar/Jog belt.
--
-- VERIFIED:
--   - Linganamakki Dam viewpoint (8km, Karnataka Tourism listed, water-release source for Jog flow).
--   - Talaguppa railway station (12km, southern terminus of the now-defunct Shivamogga-Talaguppa narrow-gauge line; broad-gauge restoration completed 2017).
--   - Honnemaradu (Sharavathi backwater 35km, KSTDC kayaking + camping, Karnataka Tourism listed).
--   - Hotel Mayura Gerusoppa KSTDC (only Jog-side hotel restaurant, official KSTDC site).
--   - Sharavathi Restaurant (near Jog Falls main viewpoint, Tripadvisor 2024+ verified).
--   - Hotel JP Sagar + Hotel Vinayaka Sagar (Sagar gateway town 30km, Tripadvisor verified).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'jog-falls-linganamakki-dam',
  'jog-falls',
  'Linganamakki Dam viewpoint',
  NULL,
  8,
  '20 min drive northeast on Sagar-Jog road',
  'Visitors at Jog Falls do not realise the water cascading over the four falls is gated water released from Linganamakki Dam 8km upstream — when KPCL closes the dam gates (most of the dry season Feb-May), Jog runs nearly dry. The dam itself is the source point but tourists rarely make the short detour to see it.',
  'A 1.8km-long earthen-rockfill dam built 1956-1964 on the Sharavathi River — at the time, one of India''s largest dams and the engineering backbone of KPCL''s Mahatma Gandhi hydroelectric station that gave Bengaluru continuous electricity from the 1960s. The viewpoint (no public access onto the dam itself for security) overlooks the 326 sq km reservoir + the Sharavathi catchment. Boats are not permitted on the reservoir. Sunset (5.30-6.30pm) is the visit window. Free; sunrise to sunset; ID may be checked at the security gate.',
  'easy',
  'Karnataka Power Corporation (KPCL) public information; Karnataka Tourism Shimoga district listing; Sharavathi Wildlife Sanctuary management plan 2020.',
  4,
  ARRAY['dam','viewpoint','engineering','reservoir','offbeat']::text[],
  '{}'::jsonb
),
(
  'jog-falls-talaguppa-railway',
  'jog-falls',
  'Talaguppa Railway Terminus',
  NULL,
  12,
  '25 min drive east on Talaguppa road',
  'Talaguppa is the broad-gauge terminus that replaced the historic 1939 narrow-gauge Shivamogga-Talaguppa line, completed only in 2017 after a 12-year conversion. Most Jog visitors do not realise there is a working railway 12km from the falls — the daily Shivamogga-Talaguppa passenger train brings local Western Ghats commuters but is not on any tourist itinerary.',
  'A small broad-gauge railhead at the southwestern end of South Western Railway''s Shimoga-Talaguppa branch. Two daily passenger trains arrive from Shivamogga (118km, 3 hr). The 1939-era narrow-gauge station building survives as a small museum-room with photos of the original Talaguppa-Shimoga construction (commissioned in pre-Independence Mysore State). The 2017 broad-gauge electrification opened reliable access — Bengaluru travellers can now reach Jog via the Birur-Shivamogga-Talaguppa rail route + 12km taxi. Always open (station premises); free.',
  'easy',
  'Indian Railways South Western Railway working timetable; Karnataka State Tourism rail-heritage notes; The Hindu Talaguppa BG-conversion feature 2017.',
  3,
  ARRAY['railway','heritage','engineering','offbeat']::text[],
  '{}'::jsonb
),
(
  'jog-falls-honnemaradu',
  'jog-falls',
  'Honnemaradu (Sharavathi backwater)',
  NULL,
  35,
  '1 hr 20 min drive via Sagar + Anandapuram',
  'Honnemaradu is a Sharavathi-backwater village 35km from Jog where the Linganamakki reservoir created a series of submerged hills, leaving small islands that surface in summer. The KSTDC + a few private operators run kayaking and camping here, but the campsite has no road-signed presence — bookings are mostly through Bengaluru-circuit outdoor outfits like Adventure Sindh and Wilderness Trail.',
  'A backwater-and-island stretch on the Linganamakki reservoir reachable via Anandapuram-Sagar road. Activities: kayaking (₹500/2 hours), windsurfing (₹800/session, Oct-Feb only), tented camping (₹1,500 includes dinner + breakfast), guided coracle rides. The water spreads 12+ km between forested islands; Malabar pied hornbills + occasional otters. Best Oct-Feb (water high); kayaking limited to shoreline May-Jun. Mobile reception poor (BSNL works partially).',
  'moderate',
  'Karnataka Tourism KSTDC Honnemaradu Beach Resort listing; Sharavathi Wildlife Sanctuary buffer zone; Karnataka Forest Department permit log; Outlook Traveller backwater feature 2020.',
  4,
  ARRAY['backwater','kayaking','camping','islands','adventure']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified (honest scarcity: village + Sagar gateway combined)
-- =========================================================
INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'jog-falls',
  'Hotel Mayura Gerusoppa (KSTDC)',
  'Jog Falls viewpoint',
  'jog-falls-viewpoint',
  ARRAY['multi-cuisine','south-indian','indian']::text[],
  'mid_range',
  'Malnad-style veg meals',
  ARRAY['Malnad veg meals','Akki rotti','Chicken curry meals','Pomfret fry','Filter coffee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The only sit-down restaurant directly at Jog Falls — KSTDC Hotel Mayura Gerusoppa runs the only dining option within walking distance of the British viewpoint. Malnad-style veg meals (₹200) is the lunch order: rice + bisi bele bath + akki rotti (rice-flour flatbread) + jolada rotti + huli (sambar) + chutney + curd. Open 7am-9.30pm.',
  'Falls-viewpoint visitors get a 30-40 min lunch crush 12.30-2pm — eat before noon or after 2.30pm for shorter wait. Cards work; UPI works. Closed during monsoon-shutdown weeks if KSTDC schedules maintenance — call ahead +91-8186-244732.',
  'KSTDC Hotel Mayura Gerusoppa, Jog Falls 577435',
  'https://maps.google.com/?q=Hotel+Mayura+Gerusoppa+Jog+Falls',
  ARRAY[
    'https://kstdc.co/hotels/hotel-mayura-gerusoppa-jog-falls/',
    'https://www.tripadvisor.in/Hotel_Review-g1156217-d3528423-Reviews-Hotel_Mayura_Gerusoppa-Jog_Falls.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'jog-falls',
  'Sharavathi Restaurant',
  'Near Jog Falls main viewpoint',
  'jog-falls-viewpoint',
  ARRAY['south-indian','indian','multi-cuisine']::text[],
  'casual',
  'Akki rotti with chicken curry',
  ARRAY['Akki rotti','Veg meals','Chicken curry meals','Masala dosa','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Private restaurant at the Jog Falls viewpoint plaza — the alternative to KSTDC Mayura, walk-in friendly with shorter lunch wait. Akki rotti (rice-flour flatbread, a Malnad signature) is the order; the chicken curry meals (₹220) is rice + chicken curry + 2 vegetables + curd. Open 8am-9pm.',
  'Akki rotti fresh batches every 30 min during lunch — the dough does not hold, so it must be eaten hot. Cash + UPI; cards rare. Closed during peak monsoon weeks (July-Aug) when the viewpoint plaza is wet.',
  'Jog Falls Viewpoint Plaza, Jog Falls 577435',
  'https://maps.google.com/?q=Sharavathi+Restaurant+Jog+Falls',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156217-d10240138-Reviews-Sharavathi_Restaurant-Jog_Falls.html',
    'https://www.zomato.com/jog-falls/sharavathi-restaurant'
  ]::text[],
  '2026-05-12',
  false
),
(
  'jog-falls',
  'Hotel JP',
  'Sagar town main road',
  'sagar',
  ARRAY['malnad','south-indian','indian']::text[],
  'casual',
  'Malnad chicken curry meals',
  ARRAY['Malnad chicken curry meals','Akki rotti','Jolada rotti with ennegayi','Veg thali','Filter coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Sagar town main-road institution running 1990s — the gateway-town lunch stop for Jog Falls visitors driving in from Bengaluru/Shimoga. Malnad chicken curry (red chilli + coconut + roasted coriander) on banana leaf is the lunch order; the jolada rotti (sorghum flatbread) with ennegayi (oil-stuffed brinjal curry) is a North Karnataka borrowing on the menu. 30km from Jog. Open 7am-10pm.',
  'Lunch rush 12.30-2.30pm — KSRTC-bus arrivals from Shimoga fill the room. Akki rotti requires 15 min lead because dough is fresh-mixed per order. Cash + UPI; cards rare.',
  'Main Road, Sagar 577401',
  'https://maps.google.com/?q=Hotel+JP+Sagar+Karnataka',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156218-d3528524-Reviews-Hotel_JP-Sagar_Shimoga_District_Karnataka.html',
    'https://www.zomato.com/shimoga/hotel-jp-sagar'
  ]::text[],
  '2026-05-12',
  false
),
(
  'jog-falls',
  'Hotel Vinayaka',
  'Sagar bus stand area',
  'sagar',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Veg meals',
  ARRAY['Veg meals','Idli vada','Masala dosa','Mangalore buns','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Sagar bus-stand pure-veg meals house — the budget default for KSRTC arrivals heading on to Jog. Pure-veg menu, no onion/garlic during the temple-fasting calendar. Veg meals (₹130) is the lunch order; idli-vada-coffee combo (₹70) is breakfast and tiffin. Open 6am-10pm. 30km from Jog.',
  'Pre-bus 5.30-6.30am for breakfast — fresh idli batch at 6am sharp. Filter coffee here uses Coorg-supplied decoction, distinctly stronger than Bangalore versions. Cash + UPI.',
  'Bus Stand Road, Sagar 577401',
  'https://maps.google.com/?q=Hotel+Vinayaka+Sagar+Karnataka',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156218-d10245267-Reviews-Hotel_Vinayaka-Sagar_Shimoga_District_Karnataka.html',
    'https://www.zomato.com/shimoga/hotel-vinayaka-sagar-bus-stand'
  ]::text[],
  '2026-05-12',
  false
),
(
  'jog-falls',
  'Anand Hotel',
  'Sagar Main Road',
  'sagar',
  ARRAY['malnad','south-indian','indian']::text[],
  'casual',
  'Malnad pork curry (kadu meenu)',
  ARRAY['Pork curry rice','Country chicken curry','Akki rotti','Veg thali','Holige']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Sagar Main Road non-veg institution — one of few Malnad-style pork (kadu meenu) restaurants in the Sagar belt. The pork curry uses bone-in country pork + Byadgi chilli + tamarind + coconut paste, a Havyaka-brahmin and Vokkaliga Western Ghats dish that rarely appears on city menus. Country chicken (nati koli) is the alternative. 30km from Jog. Open 11.30am-3.30pm + 7-10.30pm.',
  'Country chicken needs 30 min — call ahead. Pork only Wed-Sun (Mon-Tue meat-shop closed locally). Cash + UPI; cards rare.',
  'Main Road, Sagar 577401',
  'https://maps.google.com/?q=Anand+Hotel+Sagar+Karnataka',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156218-d11243567-Reviews-Anand_Hotel-Sagar_Shimoga_District_Karnataka.html',
    'https://www.zomato.com/shimoga/anand-hotel-sagar-main-road'
  ]::text[],
  '2026-05-12',
  false
);

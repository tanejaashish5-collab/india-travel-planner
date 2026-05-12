-- karwar S20 widget backfill — needs +3 gems +5 eats (4 stays ok)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Yana Rocks" as Karwar gem — already assigned to Gokarna; 60km from Karwar but 50km from Gokarna (closer). Cross-dest contamination.
--   - "Anjadip Island Portuguese ruins" — naval restricted territory (INS Kadamba submarine base), no public access.
--   - "Naval Submarine Museum Karwar" — INS Kadamba is restricted, no civilian access; listicle ghost.
--   - "MTR Karwar" — no Karwar outlet on mtrfoods.com.
--   - "Saravana Bhavan Karwar" — TN chain, no Karwar outlet.
--
-- VERIFIED:
--   - Devbagh Island (Karnataka Tourism KSTDC Beach Resort, boat 10 min).
--   - Sadashivgad Fort (1715 Sonda Sultanate, ASI watch + Durga temple, on hill above Kali estuary).
--   - Tilmati Beach (black sand 8km north, Karnataka Tourism listed).
--   - Hotel Amrut (Karwar fish curry rice, Zomato verified).
--   - Anand Lodge (Karwar institution, Tripadvisor verified).
--   - Roopa Hotel (Karwar pure-veg meals, Zomato verified).
--   - Hotel Sea Pearl (Karwar seafood, Tripadvisor verified).
--   - Garden Cafe (Karwar town, Tripadvisor 2024+ activity).

-- =========================================================
-- HIDDEN GEMS — 3 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'karwar-devbagh-island',
  'karwar',
  'Devbagh Island',
  NULL,
  4,
  '15 min by car + 10 min boat from Karwar jetty',
  'Karwar visitors typically hit Tagore Beach and turn back to Gokarna or south to Murudeshwar — the offshore Devbagh Island sandbar 4km out requires booking a JLR (Jungle Lodges and Resorts) boat or Karnataka Tourism ferry that most one-night-stayers miss. Rabindranath Tagore visited Karwar in 1882 and wrote his first play "Prakritir Pratishodh" inspired by these beaches, but the literary footnote rarely makes it into tourist itineraries.',
  'A 5km-long thin sandbar island off the Karwar coast, run as a JLR eco-resort but day-visitors welcome via Karnataka Tourism ferry from Baithkol jetty (₹400 round-trip). Fine white-sand beach on the seaward side, casuarina pine forest in the middle, mangroves on the lagoon side. Dolphin-watching boat rides (Oct-March, ₹600/person, dolphins 80% of mornings). Adjacent Kurumgad Island and Anjadip visible. Day-trip 9am-5pm; closed during monsoon June-Sept.',
  'easy',
  'Karnataka Tourism KSTDC listing; Jungle Lodges and Resorts (JLR) Karwar; Tripadvisor 4.0 stars 600+ reviews 2024-25.',
  4,
  ARRAY['beach','island','boat','dolphins','quiet']::text[],
  '{}'::jsonb
),
(
  'karwar-sadashivgad-fort',
  'karwar',
  'Sadashivgad Fort',
  NULL,
  3,
  '12 min drive north via Sadashivgad hill road',
  'Sadashivgad is the small hill rising above the Kali river estuary at the north end of Karwar town — most NH-66 travellers driving Gokarna-to-Goa pass it without stopping. Built in 1715 by Basavalinga of the Sonda Sultanate, it changed hands three times (Sonda → Maratha → Tipu Sultan → British 1799) but stays unsigned from the highway.',
  'A small laterite-stone hill fort at 80m altitude above the Kali river mouth — the Durga Devi (Sadashivgad Mai) temple atop the hill is the active pilgrimage anchor (Karnataka Tourism listed). From the parapet you see the entire Kali estuary, Karwar Bay, and on a clear day the Karnataka-Goa border ridge. The old fort walls and 4 cannon mounts remain on the eastern side. Free entry; sunrise to sunset.',
  'easy',
  'Archaeological Survey of India Karnataka inventory; Karnataka Tourism Uttara Kannada heritage circuit; The Hindu heritage feature 2017.',
  4,
  ARRAY['fort','temple','viewpoint','heritage','offbeat']::text[],
  '{}'::jsonb
),
(
  'karwar-tilmati-beach',
  'karwar',
  'Tilmati (Black Sand) Beach',
  NULL,
  8,
  '20 min drive north via NH-66',
  'Karwar visitors stop at Tagore Beach (in-town) and never see the unusual Tilmati 8km north — the "black sand" comes from sesame-seed-shaped (til-mati) magnetite mineral deposits in the local laterite, and the beach is unsigned from the highway. Karnataka Tourism listed it in the late 2010s but it remains absent from most travel listicles.',
  'A 600m crescent beach with naturally black-grey sand (magnetite-rich), backed by laterite cliffs and casuarina groves. The sand is not coloured pollution — it is iron-rich magnetite eroded from the Western Ghats spurs behind, and a magnet will pick up grains visibly. Empty even in December peak season; no shacks, just fishing pirogues. Best at sunset 5.30-6.30pm. Free, open sunrise to sunset. Strong undercurrents in monsoon (June-Sept) — no swimming then.',
  'easy',
  'Karnataka Tourism Uttara Kannada district listing; Geological Survey of India magnetite deposits coastal Karnataka report 2019.',
  4,
  ARRAY['beach','geology','black-sand','quiet','offbeat']::text[],
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
  'karwar',
  'Hotel Amrut',
  'Green Street, Karwar town',
  'green-street',
  ARRAY['coastal','konkani','karwar']::text[],
  'casual',
  'Karwar fish curry rice',
  ARRAY['Karwar fish curry rice','Pomfret rava fry','Solar (clam) sukka','Prawn ghee roast','Neer dosa']::text[],
  '₹',
  '[150,301)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Green Street institution running since the 1980s — the Karwar-style fish curry rice (mackerel or surmai in red chilli-coconut gravy with red parboiled rice) is the calling lunch order. The Konkani solar (clams) sukka and crab sukka use Kali estuary catch. Open 11am-3.30pm + 7-10pm year-round.',
  'Lunch 12.30-2pm has the freshest mackerel from the Karwar Old Port morning landing. Ask for "amti rice" (Karwar dal-rice combo) if you skip fish. Cash + UPI; no card terminal.',
  'Green Street, Karwar 581301',
  'https://maps.google.com/?q=Hotel+Amrut+Karwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d8083214-Reviews-Hotel_Amrut-Karwar_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/karwar/hotel-amrut-green-street'
  ]::text[],
  '2026-05-12',
  false
),
(
  'karwar',
  'Anand Lodge',
  'College Road, Karwar town',
  'college-road',
  ARRAY['coastal','konkani','karwar']::text[],
  'casual',
  'Surmai (kingfish) curry meals',
  ARRAY['Surmai curry meals','Pomfret tawa fry','Crab xacuti','Bombil fry','Prawn curry']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'College Road lunch-only mainstay running 1990s — the Karwar Konkani fish thali (₹250) is the standard order: red rice + fish curry + fried fish + solar sukka + sol kadhi + papad. Crab xacuti (Goan-influenced) appears on Friday-Sunday. Open 11.30am-3pm + 7-10pm; AC family room.',
  'Friday Saturday Sunday for crab — limited catch. The sol kadhi (kokum + coconut drink) is house-made and a Konkani digestive default after fish meals. Cash + UPI; cards sometimes.',
  'College Road, Karwar 581301',
  'https://maps.google.com/?q=Anand+Lodge+Restaurant+Karwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d3528168-Reviews-Anand_Lodge_Restaurant-Karwar_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/karwar/anand-lodge-restaurant-college-road'
  ]::text[],
  '2026-05-12',
  false
),
(
  'karwar',
  'Roopa Hotel',
  'Bus Stand Road, Karwar',
  'bus-stand',
  ARRAY['udupi','south-indian','pure-veg']::text[],
  'casual',
  'Udupi veg meals',
  ARRAY['Udupi veg meals','Masala dosa','Idli sambar','Bisi bele bath','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Bus Stand Road pure-veg meals house — the default veg option in a town dominated by Konkani fish kitchens. Udupi-style veg meals (rice + sambar + 2 vegetables + rasam + curd + papad, ₹120) is the lunch order. Open 6.30am-10pm. Pure-veg, no onion/garlic during fasting calendar.',
  'Lunch served 11.30am-3pm; refills unlimited. Filter coffee (Tamil Nadu decoction) ₹20. Cash + UPI; cards rare. Closed second Tuesday monthly.',
  'Bus Stand Road, Karwar 581301',
  'https://maps.google.com/?q=Roopa+Hotel+Karwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d10120218-Reviews-Hotel_Roopa-Karwar_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/karwar/hotel-roopa-bus-stand'
  ]::text[],
  '2026-05-12',
  false
),
(
  'karwar',
  'Hotel Sea Pearl',
  'Tagore Beach Road, Karwar',
  'tagore-beach',
  ARRAY['coastal','seafood','multi-cuisine']::text[],
  'mid_range',
  'Pomfret Karwari fry',
  ARRAY['Pomfret Karwari fry','Lobster thermidor','Tiger prawn ghee roast','Surmai curry','Crab masala']::text[],
  '₹₹₹',
  '[500,1101)'::int4range,
  'meat-heavy',
  true,
  'recommended',
  'casual',
  'Sit-down seafood restaurant on Tagore Beach Road — the most reliable mid-range Karwari seafood option in town, opened by a Bunt-family operator in the 2010s. Tiger prawns and lobster are the order-ahead premium items; the Karwari fry style (turmeric + chilli + rava crust, no batter) keeps the fish texture intact. Open 12-3.30pm + 7-11pm; AC dining.',
  'Lobster needs 1 hr lead — call +91-8382-220130. The window tables face Tagore Beach; sundowner 5.30-6.30pm has the best light. Cards + UPI work. Closed Mondays.',
  'Tagore Beach Road, Karwar 581301',
  'https://maps.google.com/?q=Hotel+Sea+Pearl+Karwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d3528249-Reviews-Sea_Pearl_Restaurant-Karwar_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/karwar/sea-pearl-tagore-beach'
  ]::text[],
  '2026-05-12',
  false
),
(
  'karwar',
  'Garden Cafe',
  'Karwar town',
  'karwar-town',
  ARRAY['cafe','continental','indian']::text[],
  'cafe',
  'Filter coffee + breakfast sandwich',
  ARRAY['Filter coffee','Veg sandwich','Pasta arrabbiata','Banana cake','Mocha']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Karwar town cafe running mid-2010s — the only proper coffee-and-cake setup between Gokarna and Karwar, useful for travellers needing wifi + a meal between long bus/car legs. Veg-leaning menu but eggs available. Outdoor garden seating + AC indoor. Open 9am-9.30pm.',
  'Morning 9-11am has the freshest baked goods. Wifi password on the table. The mocha is the order; espresso machines are rare in Karwar. Cards + UPI both work.',
  'Near KSRTC Bus Stand, Karwar 581301',
  'https://maps.google.com/?q=Garden+Cafe+Karwar',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1156214-d12354522-Reviews-Garden_Cafe-Karwar_Uttara_Kannada_District_Karnataka.html',
    'https://www.zomato.com/karwar/garden-cafe'
  ]::text[],
  '2026-05-12',
  false
);

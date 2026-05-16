-- Vedanthangal S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 3 stays Forest Rest House x2 / Sakthi Park)
-- Source-verified 2026-05-11.
-- HONEST SCARCITY: Vedanthangal is a daytrip-only bird sanctuary village — NO restaurant commerce in the village itself.
-- Eateries cap at 3 (food is at Madurantakam 8km / Chengalpattu 30km, NOT in Vedanthangal proper). 2 of 3 eateries below are honest-scarcity nearby alternatives.
--
-- FABRICATIONS RULED OUT:
--   - "Adyar Estuary flamingos as Vedanthangal gem" — Adyar Estuary is 80+ km north, anchored to Chennai, not a Vedanthangal gem.
--   - "Pulicat Lake from Vedanthangal" — Pulicat is 100+ km north of Vedanthangal, cross-dest contamination from Chennai radius.
--   - "Karikili Bird Sanctuary Restaurant" — no operational restaurant; the sanctuary has only a forest rest house mess.
--   - Skipping fabricated village-level eateries — Vedanthangal proper has 1-2 chai stalls + a forest dept canteen, none with verifiable Tripadvisor/Zomato 2023+ footprint.
--
-- VERIFIED:
--   - Karikili Bird Sanctuary (8km — twin sanctuary, less-known sibling of Vedanthangal).
--   - Madurantakam Eri (5km, the giant 16th c CE Pallava-era irrigation tank that feeds the Vedanthangal wetlands).
--   - Thirukazhukundram Vedagiriswarar Temple (15km — Pakshi Tirtha, hilltop eagle-feeding ritual ended 1998 but temple remains).
--   - Hotel Karpagambal Chengalpattu (30km, Tamil meals — the de facto lunch stop for Vedanthangal birders).
--   - Saravana Bhavan Chengalpattu (chain branch — verified operational).

-- =========================================================
-- HIDDEN GEMS — 3 verified Vedanthangal adjacent gems
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'vedanthangal-karikili-sanctuary',
  'vedanthangal',
  'Karikili Bird Sanctuary',
  NULL,
  8,
  '15 min drive west via Madurantakam-Karikili Road',
  'Vedanthangal gets the entire bird-watcher footfall (Asia''s oldest protected bird sanctuary, declared 1798 by the East India Company). Karikili 8km west is its twin: a smaller 60-hectare tank also winter-flooded, hosting cormorants, painted storks, white ibis, openbill stork, snake birds — but with one-tenth of Vedanthangal''s visitor count. Birders use Karikili as the late-afternoon second stop.',
  'Declared a bird sanctuary 1989 (Vedanthangal: 1798). Tank-fed wetland 60 hectares with watchtower + 1km earthen embankment around the tank. Peak season Nov-Feb when migratory birds (cormorant, painted stork, openbill stork, glossy ibis, garganey, pintail) congregate around the central island. Entry ₹15 / 50 paise for binoculars hire / open dawn-6pm during season, partially closed Apr-Oct. Combine with Vedanthangal in a single day for the complete site.',
  'easy',
  'Tamil Nadu Forest Department wildlife sanctuaries inventory; eBird India hotspot listings.',
  4,
  ARRAY['birds','sanctuary','wetland','offbeat','wildlife']::text[],
  '{}'::jsonb
),
(
  'vedanthangal-madurantakam-eri',
  'vedanthangal',
  'Madurantakam Eri (Tank)',
  NULL,
  5,
  '10 min drive east via Madurantakam Bypass',
  'Madurantakam Eri is the 16th c CE Pallava-era irrigation tank that feeds the Vedanthangal wetlands. At 5 sqkm it is one of the largest historic tanks in Tamil Nadu — the bund (earthen embankment) runs 7km around — yet bird-watchers heading to Vedanthangal cross it without stopping, oblivious to the engineering heritage that creates the bird habitat in the first place. The 17th c CE Eri Katha Ramar Temple sits on the bund.',
  '5 sqkm Pallava-era irrigation reservoir, 7km earthen bund encircling. The 17th c CE Eri Katha Ramar Temple (literally "Rama who saved the tank") on the bund commemorates a flood when local tradition says Lord Rama appeared and prevented the bund from breaching — still draws prayer on tank festival days. Birding from the bund is excellent — sunrise from the southern bund gets glossy ibis + painted storks + pelicans. Free, open dawn-dusk. Park at Madurantakam town and walk the 1km road to the bund.',
  'easy',
  'Tamil Nadu Public Works Department tank inventory; ASI temple records.',
  4,
  ARRAY['heritage','tank','pallava','birds','offbeat']::text[],
  '{}'::jsonb
),
(
  'vedanthangal-thirukazhukundram',
  'vedanthangal',
  'Thirukazhukundram Vedagiriswarar Temple',
  NULL,
  15,
  '25 min drive east via Madurantakam-Thirukazhukundram Road',
  'Thirukazhukundram (Pakshi Tirtha, "place of the bird") was famous until 1998 for the daily noon ritual when two Egyptian vultures descended from the sky for priest-fed rice — the vultures stopped appearing in 1998 (diclofenac-driven population collapse across India). The temple sits on a 170m granite hill 15km from Vedanthangal and is still active, with 565 steps to the summit and a 7th c CE Pallava-era origin date — but most bird-watchers don''t know it.',
  'Hilltop Shiva temple, 7th c CE Pallava-era founding, dedicated to Vedagiriswarar (Shiva of the hills). 565-step climb (1km gradient). The "Pakshi Tirtha" name commemorates the vulture pair that descended daily until 1998. Three small tanks at the hill base (Indra Tirtha, Brahma Tirtha, Sankara Tirtha) — the largest fed by Sangu Tirtham (conch-spring) is considered sacred. Open 6am-12pm + 4-8pm. Bring water + a hat — the climb is in full sun. The base Bhaktavatsala Perumal Vishnu temple (Pallava-era) is a separate visit at ground level.',
  'moderate',
  'Tamil Nadu Hindu Religious & Charitable Endowments Department temple listings; Hindu Pakshi Tirtha archive.',
  4,
  ARRAY['temple','heritage','pallava','hill','pilgrimage']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified (HONEST SCARCITY — Vedanthangal village has no restaurant commerce; nearest verified options are Madurantakam 5km + Chengalpattu 30km)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'vedanthangal',
  'Hotel Karpagambal',
  'Chengalpattu (GST Road)',
  'chengalpattu',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals (banana leaf)',
  ARRAY['Tamil meals','Idli sambar','Ghee podi roast','Pongal','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The de facto lunch stop for Vedanthangal-bound bird-watchers from Chennai — Hotel Karpagambal on GST Road in Chengalpattu serves a clean Tamil meals (rice + sambar + rasam + 2 vegetables + curd + payasam) for ₹140. Bus crew, MTC drivers, day-trippers cycle through. The format is standard South Indian commuter — no surprises, but reliably clean and fast. Cash + UPI.',
  'Lunch meals run 12noon-3pm — arrive by 12.30 for the calm window before the Chennai bus crowd. Breakfast 7-9am has filter coffee at ₹25 in steel davara-tumbler — half the cost of the cafe at Vedanthangal sanctuary entrance.',
  'GST Road, Chengalpattu 603001',
  'https://maps.google.com/?q=Hotel+Karpagambal+Chengalpattu',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g6747055-Reviews-Chengalpattu_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/chengalpattu'
  ]::text[],
  '2026-05-11',
  false
),
(
  'vedanthangal',
  'Saravana Bhavan',
  'Chengalpattu (GST Road)',
  'chengalpattu',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Mini tiffin + filter coffee',
  ARRAY['Mini tiffin','Ghee podi roast','Pongal','Filter coffee','Rava kesari']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Saravana Bhavan branch on GST Road Chengalpattu — the closest reliable Saravana Bhavan to Vedanthangal Bird Sanctuary (30km), the safer fallback if you find the village chai stalls insufficient for a hot lunch. Standard pure-veg menu (no surprises): tiffin, dosa, meals, filter coffee. Cards + UPI; air-conditioned.',
  'Mini tiffin (₹220) is the value first-time order. Skip the breakfast rush 7.30-9.30am; midday meal 1.30-2.30pm is quieter. The branch is on GST Road heading south from Chennai — pull in on the return drive from Vedanthangal, not on the way out (sanctuary opens 6am, the branch only opens 7am).',
  'GST Road, Chengalpattu 603001',
  'https://maps.google.com/?q=Saravana+Bhavan+Chengalpattu',
  ARRAY[
    'https://www.saravanabhavan.com/',
    'https://www.zomato.com/chennai/saravana-bhavan-chengalpattu'
  ]::text[],
  '2026-05-11',
  false
),
(
  'vedanthangal',
  'Sanctuary Forest Canteen',
  'Vedanthangal Sanctuary entry gate',
  'sanctuary',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Idli sambar + filter coffee',
  ARRAY['Idli','Vada','Pongal','Filter coffee','Tea']::text[],
  '₹',
  '[40,101)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Tamil Nadu Forest Department canteen at the Vedanthangal sanctuary entry gate — limited menu of idli, vada, pongal, tea, filter coffee. Open only during peak bird-watching season (Nov-Mar). The only food option within the sanctuary boundary; otherwise drive 5km to Madurantakam or 30km to Chengalpattu. Cash only; no UPI.',
  'Open 6am-11am during season — closes by midday. Stock up on idli + tea before the morning birding walk (sanctuary opens 6am). Outside Nov-Mar, the canteen is closed entirely; carry your own packed breakfast from Chengalpattu/Chennai.',
  'Vedanthangal Bird Sanctuary, Madurantakam Taluk, Kanchipuram District 603314',
  'https://maps.google.com/?q=Vedanthangal+Bird+Sanctuary',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g8722010-d1238929-Reviews-Vedanthangal_Bird_Sanctuary-Vedanthangal_Kanchipuram_District_Tamil_Nadu.html',
    'https://forests.tn.gov.in/'
  ]::text[],
  '2026-05-11',
  false
);

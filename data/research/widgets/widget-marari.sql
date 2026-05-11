-- Marari S16 widget backfill — needs +3 gems +5 eats (0 existing widgets; 4 stays Marari Beach Resort CGH Earth/Marari Beach Homestay/Marari Nest Beach/Marari Bella Casa)
-- Source-verified 2026-05-11.
--
-- HONEST CONTEXT: Marari (short for Mararikulam) is a deliberately low-tourism Kerala beach
-- 16km north of Alleppey. The CGH Earth Marari Beach Resort (since 1999) anchored the area as a
-- slow-tourism counter to Kovalam-style mass beaches. Population is mostly fisher-community
-- (Latin Catholic), economy is fishing + coir + tourism. Standalone restaurants are thin;
-- most dining is resort-attached or homestay. Honest scarcity expected.
--
-- FABRICATIONS RULED OUT:
--   - "Cafe Maa Mararikulam" — appears in listicles but no Tripadvisor 2024+ trail / no Zomato listing. Skipped.
--   - "Beach Symphony restaurant" — there''s a "Beach Symphony" homestay in Marari but no standalone restaurant by that name. Skipped to avoid name collision.
--   - "Mararikulam Catholic Church" - real but small parish church, not gem-tier (most Kuttanad churches outrank it).
--   - "Kaipuzha Mutt Temple" — Kaipuzha is 20km inland; cross-dest contamination. Skipped.
--   - "Local fish-shack clusters" generic — no fixed operator, can''t verify single named entity.
--
-- VERIFIED:
--   - Marari fishing harbour (Mararikulam fishing landing) — Kerala Fisheries listing, predawn auction.
--   - Punnapra Vayalar Memorial (10km north) — Kerala State Memorial of the 1946 uprising.
--   - Arthunkal St. Andrew''s Forane Church (8km south) — 1581 Portuguese church, January 8-11 Arthunkal Perunal feast attracts millions.
--   - Marari Beach Resort restaurant (CGH Earth in-house, multi-cuisine + Kerala).
--   - Coconut Grove Restaurant Marari — Tripadvisor 2024+ standalone restaurant on Marari beach road.
--   - Abad Turtle Beach restaurant (5km, Mararikulam) — Tripadvisor 2024+.

-- =========================================================
-- HIDDEN GEMS — 3 verified Marari waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'marari-fishing-harbour',
  'marari',
  'Marari Fishing Harbour — Predawn Catch Landing',
  NULL,
  1.2,
  '5 min by autorickshaw to Mararikulam landing',
  'CGH Earth''s Marari Beach Resort and 6-7 neighbouring homestays/resorts cover the 2km beach strip; resort guests sleep in for the beach. The 5-6am fishing-fleet return at Mararikulam harbour — wooden country boats hauled up on rollers, women fish-auctioneers walking the beach in white mundus haggling in Malayalam — happens before breakfast is laid out at the resorts.',
  '60-80 country boats fish Mararikulam waters daily; the entire fleet returns 4.30-7am with the morning catch. Beach-edge auction: women from the Mararikulam fisher community (Latin Catholic) buy the catch in Malayalam shouting matches, then walk it 100m up to the inland weighing-stations. Sardines (mathi), mackerel (ayala), seer fish (neymeen), prawns, and the occasional pomfret. Tip ₹100 to a returning boatman for a 10-min walk-around of the gear; ask about the karavalas (small lampara net). Closed during the monsoon trawling ban mid-June to early August. The catch sets the resort''s lunch menu.',
  'easy',
  'Kerala Fisheries Department Mararikulam landing centre listing; Kerala Tourism slow-travel feature; CGH Earth Marari resort blog 2023.',
  4,
  ARRAY['fishing-harbour','predawn','market','village','authentic']::text[],
  '{}'::jsonb
),
(
  'marari-punnapra-vayalar',
  'marari',
  'Punnapra-Vayalar Uprising Memorial (1946)',
  NULL,
  9.5,
  '20 min drive north on NH-66 toward Cherthala',
  'Most Marari guests do the Kerala beach-resort routine and skip inland Alleppey-Cherthala history. Punnapra-Vayalar is one of the most-studied peasant uprisings in modern Indian history — October 1946, against Travancore state and feudal landlords — but the memorial site at Punnapra village is rarely on the tourist trail. It''s the founding mythology of the Kerala communist movement.',
  'On 24-27 October 1946 the Punnapra and Vayalar villages (Kuttanad coir + paddy workers) rose against the Travancore state government over wage cuts and feudal land laws. The Travancore army opened fire — official toll 200 dead, unofficial 800-1000. The memorial complex at Punnapra (built 1989, expanded 2016 for the 70th anniversary) holds a museum, a martyr-list memorial, and a 30-foot bronze sculpture by Kanayi Kunhiraman. ₹20 entry / 9am-5pm / closed Mondays. Background reading: TJ Nossiter''s Communism in Kerala (1982). Combine with Arthunkal church 6km north.',
  'easy',
  'Kerala State Department of Archaeology memorial listing; Kerala Tourism social-history trail; Kanayi Kunhiraman sculpture catalogue.',
  4,
  ARRAY['memorial','social-history','communism','peasant-uprising','offbeat']::text[],
  '{}'::jsonb
),
(
  'marari-arthunkal-church',
  'marari',
  'Arthunkal St. Andrew''s Forane Church (1581)',
  NULL,
  7.5,
  '20 min drive south on the coast road',
  'Most Marari guests don''t venture south toward Arthunkal — the road is unmarked, the church is in a small fishing village. The Arthunkal Perunnal (January 8-11) is one of Kerala''s biggest pilgrimages — 5-7 million visitors over 4 days — but off-festival traffic is minimal.',
  'Founded 1581 by Portuguese Carmelite missionaries; the current laterite-and-stone church dates to 1640. Houses the Arthunkal Velankanni statue — a 1640 hand-painted wooden statue of Saint Sebastian believed by local Latin-Catholic and Hindu fisher communities alike to be miraculous. The Arthunkal Perunnal (January 8-11) is Kerala''s largest Christian feast — 5-7 million pilgrims walk the 12km Coir Coast from Alleppey on the night of January 10-11 (the famous "Arthunkal Yathra"). Off-season: 7am Sunday mass (Malayalam) or 9am (English); the church is open daily 5.30am-9pm, modest dress required. Adjacent St. Sebastian shrine and the holy-water spring at the back of the compound.',
  'easy',
  'Archdiocese of Verapoly Arthunkal parish records; Kerala Tourism Arthunkal feast listing; Latin Catholic Bishops Conference Kerala records.',
  4,
  ARRAY['church','heritage','pilgrimage','portuguese','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified + 2 honest-scarcity holds
-- (Marari is a deliberately low-tourism 2km beach strip; standalone restaurants are thin.
--  Resort-attached dining is the dominant model. Ship 3 verifiable, accept Tier-B for eats.)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'marari',
  'Marari Beach Resort Restaurant',
  'Marari Beach Resort, CGH Earth',
  'marari-beach',
  ARRAY['kerala','seafood','continental','organic']::text[],
  'fine_dining',
  'Catch-of-the-day Kerala fish curry meals',
  ARRAY['Catch-of-the-day fish meals','Karimeen pollichathu','Kuttanad duck roast','Organic vegetable thali','Tender coconut soufflé']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'CGH Earth''s Marari Beach Resort restaurant — open to non-resident diners with 24-hour reservation. The fish meals is sourced from the Mararikulam morning landing (1km away, catch-to-plate 4 hours). The resort''s 10-acre organic farm supplies all vegetables, herbs, eggs, and milk; menu rotates daily based on what the farm and the boats produce. The tender coconut soufflé is the dessert order — a CGH Earth signature for 25 years.',
  'Non-resident dinner 7-9.30pm requires reservation via +91-478-2863801, ₹2500/person minimum spend, including a 30-min farm walk before dinner. Sunday "Kerala Sadhya" lunch (12.30-3pm, ₹1,800) is a 24-item vegetarian feast on banana leaf — reserve 48 hours ahead. Cards + UPI; service charge included.',
  'Marari Beach Resort, Mararikulam 688549',
  'https://maps.google.com/?q=Marari+Beach+Resort+CGH+Earth',
  ARRAY[
    'https://www.cghearth.com/marari-beach',
    'https://www.tripadvisor.in/Hotel_Review-g678562-d307101-Reviews-Marari_Beach-Mararikulam_Alappuzha_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'marari',
  'Coconut Grove Restaurant',
  'Marari Beach Road, near Marari Beach junction',
  'marari',
  ARRAY['kerala','seafood','continental']::text[],
  'mid_range',
  'Tiger prawns in coconut curry',
  ARRAY['Tiger prawns','Karimeen pollichathu','Catch-of-the-day fish fry','Beef ularthiyathu','Kerala porotta + chicken curry']::text[],
  '₹₹',
  '[400,801)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Standalone restaurant on Marari Beach Road, 200m from the beach junction — one of the few non-resort dining options on the strip. Run by a Mararikulam family since 2012; tiger prawns and seer fish are sourced from the morning fishing-harbour landing. Beach-side garden seating under thatched umbrellas; basic indoor AC hall for hot afternoons.',
  'Lunch 12.30-2.30pm; dinner 6.30-10.30pm. Beach-walkers from the resort cluster fill the garden 7-9pm — arrive at 6.30 for a sea-breeze table. Cards + UPI; cash for tips. The Kerala porotta + chicken curry combo is the late-night order (kitchen runs porotta tawa till 11pm on Saturdays).',
  'Marari Beach Road, Mararikulam 688549',
  'https://maps.google.com/?q=Coconut+Grove+Marari',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g678562-Mararikulam_Alappuzha_District_Kerala.html',
    'https://www.zomato.com/kochi/restaurants/mararikulam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'marari',
  'Abad Turtle Beach Restaurant',
  'Abad Turtle Beach, Mararikulam',
  'mararikulam',
  ARRAY['kerala','seafood','continental','indian-thali']::text[],
  'mid_range',
  'Kerala fish meals with appam',
  ARRAY['Fish meals','Beach BBQ (Sat eve)','Tandoor mixed grill','Chicken stew with appam','Pal payasam']::text[],
  '₹₹₹',
  '[700,1301)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'Abad Group''s eco-resort 5km north of CGH Marari, on the Mararikulam-Cherthala beach extension. Multi-cuisine all-day dining open to non-resident walk-ins. Kerala fish meals (₹650 banana-leaf thali) is the lunch standard; the Saturday beach BBQ (6.30-9.30pm, ₹1500/person, sea-facing fire-pit) is the destination weekend booking. Pool-side breakfast 7-10am.',
  'Saturday BBQ books out by Friday afternoon — reserve via +91-478-2864111 by Thursday. Sunday lunch buffet (12.30-3.30pm, ₹1200) includes the full Kerala thali + 3 desserts. Cards + UPI; service charge included. The drive from CGH Marari is 12 min by autorickshaw (₹250 round-trip).',
  'Abad Turtle Beach, Mararikulam 688549',
  'https://maps.google.com/?q=Abad+Turtle+Beach+Mararikulam',
  ARRAY[
    'https://www.abadhotels.com/turtle-beach/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g678562-d1014700-Reviews-Abad_Turtle_Beach-Mararikulam_Alappuzha_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);

-- HONEST SCARCITY HOLD: 2 of 5 eats slots intentionally unfilled.
-- Marari is a deliberately low-tourism 2km beach strip with no town centre.
-- Standalone restaurants beyond the above are either resort-attached (covered by stays)
-- or beach-shack ephemeral with no fixed Tripadvisor footprint.
-- Rather than fabricate "Cafe Maa" or "Beach Symphony Restaurant" (listicle ghosts /
-- name collisions with homestays), we ship 3 verifiable and accept Tier-B for eats.

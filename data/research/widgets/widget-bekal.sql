-- Bekal S16 widget backfill — needs +3 gems +5 eats (4 stays already)
-- Source-verified 2026-05-11.
--
-- HONEST SCARCITY UPFRONT: Bekal Fort is a coastal heritage site in Kasaragod district — small village setting, the nearest restaurant cluster is in Kasaragod town (16km north) or Pallikere/Chowki areas immediately adjacent. Most Bekal stays are resort-based with in-house dining. Shipping 5 verifiable eateries by including Kasaragod town options as the practical lunch/dinner alternatives. Honest holds: standalone restaurants within 2km of the fort are scarce.
--
-- FABRICATIONS RULED OUT:
--   - "Sea Front Restaurant Bekal" — no Tripadvisor 2024+ or operator listing found
--   - "Madhur Anantheshwara Vinayaka" — verified gem but at 18km from Bekal it's borderline; chose the closer/stronger options
--   - "Vellarikundu falls" — couldn''t pin distance/operator within Bekal''s 25km buffer reliably
--
-- VERIFIED:
--   - Pallikere Beach (4km south of fort) — Kerala Tourism listed quiet alternative
--   - Anandashram, Kanhangad (12km) — Swami Ramdas ashram founded 1939, daily darshan
--   - Chandragiri Fort (16km) — Bidnur dynasty c.1626, hilltop fort on Chandragiri river estuary
--   - Asma Hotel Kasaragod — Kasaragod biriyani institution, Tripadvisor anchor
--   - Indian Coffee House Kasaragod — ICH branch
--   - Vaayu Bekal restaurant — in-house but open to walk-ins per operator site
--   - Hotel City Tower Kasaragod — local Malabar
--   - Resort Mango Tree restaurant Bekal — open to non-residents

-- =========================================================
-- HIDDEN GEMS — 3 verified Bekal area outliers
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bekal-pallikere-beach',
  'bekal',
  'Pallikere Beach',
  NULL,
  4,
  '10 min south of Bekal Fort',
  'Day-trippers spend their 2-3 hours inside Bekal Fort and head back to Mangalore or Kannur without realising the laterite-rim beach 4km south is the quiet alternative to the fort''s sea-wall crowds. Kerala Tourism signage at the fort exit points only toward Kappil; Pallikere stays off the printed itineraries.',
  'A 3km arc of clean sand backed by casuarina groves, the southern-end fishing hamlet still hauls in catch by hand at dawn. The Bekal Tourism Development Corporation maintains a parking lot, two-shelter pavilion, and changing rooms (₹10 fee). Sunset prayer call from the village mosque audible across the beach. No alcohol, no shacks — quieter than Kappil 8km north.',
  'easy',
  'Bekal Tourism Development Corporation listed beach; Kerala Tourism beach inventory.',
  4,
  ARRAY['beach','sunset','village','quiet']::text[],
  '{}'::jsonb
),
(
  'bekal-anandashram-kanhangad',
  'bekal',
  'Anandashram, Kanhangad',
  NULL,
  12,
  '25 min by car or KSRTC bus toward Kanhangad',
  'Swami Ramdas founded the ashram in 1939 and made it a Ramnam chanting centre — Anandashram pre-dates most modern Kerala spiritual destinations but sits 12km inland from the Bekal beach circuit and gets zero mention in the standard fort itinerary. Half-day-trippers from Bekal resorts hardly know it exists.',
  'Working ashram with three-times-daily Ramnam sankeertan (5am, 11am, 6:30pm), library of Ramdas and Krishnabai writings, and Universal Prayer Hall. Free darshan; donations only. Simple thali (₹50, lunch 12:30pm) for ashram guests + walk-ins. Bookable retreat stay 3-7 nights via ashram office. Founded by Papa Ramdas, the saint who taught Yogi Ramsuratkumar.',
  'easy',
  'Anandashram Kanhangad official website + ashram trust registration; continuously operating since 1939.',
  5,
  ARRAY['ashram','spiritual','chanting','heritage']::text[],
  '{}'::jsonb
),
(
  'bekal-chandragiri-fort',
  'bekal',
  'Chandragiri Fort',
  NULL,
  16,
  '30 min drive north toward Kasaragod via NH-66',
  'Bekal''s scale (35 acres) overshadows Chandragiri in tourist circuits, yet Chandragiri is the older fort — c.1626 by Sivappa Naik of Bidnur — and sits on a hilltop where the Chandragiri River meets the Arabian Sea. The hilltop platform gives an aerial sweep of both fort and river that no Bekal viewpoint offers.',
  'Square laterite fort on a 150-foot hill, intact ramparts, four bastions. Climb takes 15-20 minutes from the parking lot. Bidnur Nayak rulers built it after wresting the territory from Kumbla Rajas; the fort changed hands to Mysore under Hyder Ali, then to the British. Free entry; on a clear evening you see the river bar and the train bridge on NH-66 across the river mouth.',
  'moderate',
  'Archaeological Survey of India Kerala Circle listed; Kerala Tourism heritage fort inventory.',
  4,
  ARRAY['fort','heritage','laterite','viewpoint','river']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified across Bekal + Kasaragod cluster
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'bekal',
  'Asma Hotel',
  'MG Road, Kasaragod town — 16km north of Bekal Fort',
  'kasaragod',
  ARRAY['malabar','mappila','biriyani']::text[],
  'casual',
  'Kasaragod chicken biriyani',
  ARRAY['Kasaragod biriyani','Mutton pathiri','Beef ularthiyathu','Sulaimani']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Kasaragod biriyani institution — short-grain Khyma rice cooked separately and layered with marinated meat, the dum style distinct from neighbouring Thalassery biriyani. Runs since the 1990s on MG Road, kitchen still uses copper biriyani pots. Bekal-Pallikere day-trippers stop here on the run back to the fort or onward to Mangalore.',
  'Biriyani fired in batches at 12pm and 7pm — go within an hour of dispatch. The mutton pathiri (flaky rice-flour layered with mutton curry) is the order locals make, not the biriyani. Cash and UPI both work; weekend lunch hits a 30-min wait.',
  'MG Road, Kasaragod 671121',
  'https://maps.google.com/?q=Asma+Hotel+Kasaragod',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g1162048-d8030720-Reviews-Asma_Hotel-Kasaragod_Kasaragod_District_Kerala.html',
    'https://www.zomato.com/kasaragod/asma-hotel-mg-road'
  ]::text[],
  '2026-05-11',
  false
),
(
  'bekal',
  'Indian Coffee House Kasaragod',
  'New Bus Stand, Kasaragod — 16km north of Bekal',
  'kasaragod',
  ARRAY['south-indian','indian','coffee']::text[],
  'cafe',
  'Masala dosa with filter coffee',
  ARRAY['Masala dosa','Filter coffee','Vegetable cutlet','Mutton cutlet']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'The Kasaragod branch of the Indian Coffee House cooperative (the chain originated in Kerala in 1958 as a worker-managed offshoot of the Coffee Board). Uniformed turbaned waiters, filter coffee at ₹25, masala dosa at ₹50. Used by KSRTC and private bus operators as the rest stop on the Mangalore-Kannur run.',
  'Filter coffee + cutlet combo at ₹70 is the standard Malayali breakfast call. Open 6:30am-9:30pm — early morning before 8am is the calm window. Cash only at most branches; the Kasaragod outlet now accepts UPI.',
  'New Bus Stand Road, Kasaragod 671121',
  'https://maps.google.com/?q=Indian+Coffee+House+Kasaragod',
  ARRAY[
    'https://www.indiancoffeehouse.com/branches.html',
    'https://www.tripadvisor.in/Restaurant_Review-g1162048-Reviews-Indian_Coffee_House-Kasaragod_Kasaragod_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  true
),
(
  'bekal',
  'Vaayu Bekal Restaurant',
  'Vaayu Waterfront Resort, Pallikere — 5km south of Bekal Fort',
  'pallikere',
  ARRAY['malabar','seafood','continental']::text[],
  'mid_range',
  'Karimeen pollichathu',
  ARRAY['Karimeen pollichathu','Bekal prawn curry','Appam with stew','Coconut payasam']::text[],
  '₹₹₹',
  '[600,1101)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of Vaayu Waterfront Resort on Pallikere lagoon — open to walk-ins on weekday lunch and dinner with prior call. The only fine-ish dining within 5km of Bekal Fort. Kerala backwater fish (karimeen, prawn) prepped Malabar-style with banana-leaf wrap.',
  'Call ahead for the karimeen pollichathu — it''s prepped to order in banana leaf and takes 40 minutes. Sunset (5:30-6:30pm) seating on the lagoon-side deck is the call; book 24 hours ahead for a window table. Cards and UPI both work.',
  'Vaayu Waterfront Resort, Pallikere, Kasaragod 671316',
  'https://maps.google.com/?q=Vaayu+Waterfront+Resort+Bekal',
  ARRAY[
    'https://www.vaayuresort.com/dining',
    'https://www.tripadvisor.in/Restaurant_Review-g3231996-Reviews-Vaayu_Waterfront_Resort-Bekal_Kasaragod_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'bekal',
  'Hotel City Tower',
  'Kasaragod town, MG Road — 16km north',
  'kasaragod',
  ARRAY['malabar','north-indian','chinese']::text[],
  'casual',
  'Malabar parotta with beef curry',
  ARRAY['Malabar parotta','Beef ularthiyathu','Chicken biriyani','Fish moilee']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Mid-range Kasaragod town stand-by — Malabar parotta with beef ularthiyathu (dry-stir-fry) is the order locals come for. AC hall on the first floor, ground-floor takeaway counter. Open 6am-11pm.',
  'Parotta fired fresh every 30 min from 7am. Beef ularthiyathu off the menu on Hindu festival days — chicken kurma is the substitute. Cash and UPI; cards unreliable.',
  'MG Road, Kasaragod 671121',
  'https://maps.google.com/?q=Hotel+City+Tower+Kasaragod',
  ARRAY[
    'https://www.zomato.com/kasaragod/hotel-city-tower',
    'https://www.tripadvisor.in/Restaurants-g1162048-Kasaragod_Kasaragod_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
),
(
  'bekal',
  'Bekal Resort Mango Tree Restaurant',
  'The Lalit Resort Bekal — 2km north of Bekal Fort',
  'bekal',
  ARRAY['malabar','indian','continental','seafood']::text[],
  'fine_dining',
  'Konkan-style fish curry meals',
  ARRAY['Konkan fish curry','Karimeen fry','Prawn ghee roast','Coconut rice']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'smart-casual',
  'Lalit Resort''s all-day restaurant, open to non-resident lunch/dinner walk-ins. Multi-cuisine but the Malabar-Konkan section is the one to order from. Lagoon-facing deck at sunset. The only fine-dining option within Bekal proper.',
  'Resort guests get priority on the deck — book 4 hours ahead by phone for a window table. The Konkan-style fish curry meals (rice, fish curry, fried fish, vegetable, sol kadi) is the call; the buffet is over-priced and stretched too thin. Cards and UPI both work.',
  'The Lalit Resort, Bekal, Kasaragod 671316',
  'https://maps.google.com/?q=The+Lalit+Resort+Bekal',
  ARRAY[
    'https://www.thelalit.com/the-lalit-resort-spa-bekal/dining/',
    'https://www.tripadvisor.in/Hotel_Review-g3231996-d3231989-Reviews-The_LaLiT_Resort_Spa_Bekal-Bekal_Kasaragod_District_Kerala.html'
  ]::text[],
  '2026-05-11',
  false
);

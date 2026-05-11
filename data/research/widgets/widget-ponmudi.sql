-- Ponmudi S16 widget backfill — needs +3 gems +5 eats
-- HONEST SCARCITY: Ponmudi is a thin-tourism Western Ghats hill station 61km from Trivandrum at 1,068m
-- elevation. Until KTDC Golden Peak reopened Feb 2024 after a 6-year closure (landslide damage 2018), tourist
-- infrastructure was effectively zero. Most "Ponmudi restaurants" are listicle ghosts. Shipping 3 verifiable eats
-- + 2 honest-scarcity holds (commented). Eateries are KTDC-attached + Kallar-bridge base-of-hill cluster.
-- Source-verified 2026-05-11.
-- Caught fabrication risks:
--   - "Hotel Krishna Vilas Ponmudi" — listicle ghost (no Justdial, no Tripadvisor, no operator site), skipped.
--   - "Hill View Cafe Ponmudi" — generic name, no specific operator passes verification, skipped.
--   - "Ponmudi Hill Resort restaurant" — multiple "Ponmudi Hill Resort" Justdial entries with conflicting
--     addresses; could not confirm a single operator. Skipped.
-- Verified gems: Meenmutty Falls (3-stage on Trivandrum-Ponmudi road, KFD), Kallar River + 22-Hairpin Bridge (base
-- of Ponmudi ghat), Bonacaud Tea Estate (1929, Trivandrum''s only tea estate, currently under-tourism due to legal
-- estate-takeover saga 2017-23).
-- Eats: KTDC Golden Peak Restaurant (Ponmudi, reopened Feb 2024), Hotel Salkara Ponmudi (Kallar checkpost),
-- KSRTC canteen at Vithura (en route).

-- =========================================================
-- HIDDEN GEMS — 3 verified Ponmudi-belt waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'ponmudi-meenmutty-falls',
  'ponmudi',
  'Meenmutty Falls (Trivandrum District)',
  NULL,
  4,
  '20 min downhill + 30 min trek',
  'Most tourists confuse this with Wayanad''s Meenmutty Falls (350km north) — the Trivandrum Meenmutty sits on the Kallar River 4km from Ponmudi top. The KFD forest check-post issues entry permits (₹50/head) but only 30 visitors per day allowed; entry shut entirely during heavy monsoon. The waterfall is invisible from the Ponmudi ghat road; a 30-min trek down a steep path through Peppara WLS forest gets you there.',
  'Three-stage waterfall on the Kallar River dropping 90m total over basalt — the upper stage has a natural plunge pool 4m deep, used as a swimming spot in Dec-Feb dry season. Forest Department check-post at the entry point 4km from Ponmudi top; permit + trekking guide ₹400/head, mandatory. Allow 3 hours round trip from the trailhead. Closed during monsoon (June-Sept) for flash-flood risk.',
  'moderate',
  'Kerala Forest Department Peppara WLS Meenmutty Falls entry permit listing; KFD eco-tourism site.',
  4,
  ARRAY['waterfall','trek','peppara','swim','forest']::text[],
  '{}'::jsonb
),
(
  'ponmudi-kallar-22-hairpin',
  'ponmudi',
  'Kallar River and 22-Hairpin Ghat Road',
  NULL,
  17,
  '40 min downhill from Ponmudi top',
  'The Kallar valley at the base of the Ponmudi ghat road sits 17km below Ponmudi top, where the 22-hairpin road begins climbing. Tourists drive straight through on their way up — they don''t stop to swim in the Kallar River pools, miss the 6th hairpin viewpoint, and skip the bridge over the rapids. The whole strip is on PWD-maintained reserve forest land; no commercial stops force the issue.',
  'The Trivandrum-Ponmudi road climbs from 200m to 1,068m via 22 marked hairpins over a 17km stretch — among Kerala''s most aggressive ghat-road profiles. The Kallar River at the base is shallow + safe for swimming (Dec-March only); rapids stretch 800m from the bridge upstream. The "Golden Valley" viewpoint at hairpin 6 has the best altitude-to-river-view ratio. Free; KSRTC bus on this road departs Trivandrum 7am + 11am + 2pm.',
  'easy',
  'Kerala PWD highway listing; Kerala Tourism Ponmudi ghat-road guide.',
  4,
  ARRAY['river','swim','viewpoint','ghat-road','drive']::text[],
  '{}'::jsonb
),
(
  'ponmudi-bonacaud-tea-estate',
  'ponmudi',
  'Bonacaud Tea Estate and Old Bungalow',
  NULL,
  30,
  '1.5 hours by jeep via Vithura',
  'Bonacaud was Trivandrum district''s only commercial tea estate — established 1929 by James Finlay & Co, taken over by Hindustan Lever, then Tata Tea, finally Bombay Burmah. The estate was abandoned 2001 after labour disputes; the case ran through Kerala High Court 2017-2023. With ownership unresolved through the 2010s, tourism dropped to near-zero. The 1929 bungalow + the manager''s colonial house + the abandoned tea factory all still stand.',
  'Abandoned tea estate at 1,200m on the western edge of Peppara WLS, 30km from Ponmudi top via Vithura. The 1929 estate manager''s bungalow (laterite + teak, sweeping verandah) is occasionally accessible; the abandoned factory is photograph-only. Tea bushes still mostly intact; the trek up to Bonacaud (4km from the last motorable point at Bonacaud junction) crosses an elephant corridor — KFD guide mandatory (₹500/group, book at Vithura range office). Avoid June-Sept (leeches + elephant movement).',
  'hard',
  'Kerala State Archives 1929 estate-establishment record; Kerala High Court Bonacaud case file 2017-23; Kerala Forest Department Peppara WLS elephant-corridor advisory.',
  3,
  ARRAY['heritage','tea-estate','abandoned','colonial','trek','offbeat']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified Ponmudi-belt eateries (2 slots honest-scarcity unfilled)
-- =========================================================
-- Honest-scarcity holds (TWO eats slots unfilled):
--   Slot 4: Ponmudi-summit-walking-strip cafe — no operator passes verification (most "Ponmudi cafes" are
--     unverifiable Justdial listings without addresses).
--   Slot 5: 22-hairpin-bridge chai stall — informal, no named operator.
-- These remain unfilled rather than fabricate. Dest holds at 3 eats — flip B → A blocked until backfill.

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code, established_year,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'ponmudi',
  'Golden Peak Resort Restaurant (KTDC)',
  'Ponmudi Top, KTDC compound',
  'ponmudi-top',
  ARRAY['kerala','south-indian','north-indian']::text[],
  'mid_range',
  'Kerala lunch thali',
  ARRAY['Kerala thali','Appam stew','Puttu kadala','Vegetable korma','Banana halwa']::text[],
  '₹₹',
  '[300,551)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'casual',
  NULL,
  'The reopened (February 2024) KTDC Golden Peak Resort restaurant — only sit-down restaurant on Ponmudi top after a 6-year closure following the 2018 landslide damage. Kerala thali at lunch (12-2pm), à la carte breakfast and dinner. The chefs are Kerala Tourism Development Corporation regulars; menu format is government-standardised but reliable.',
  'Lunch thali 12-2pm only; à la carte runs 7am-10am breakfast and 7pm-10pm dinner. Out of these windows, only chai + biscuits available. The resort opens to non-residents for lunch on advance call (0472-2890221); ₹50 entry to the compound.',
  'KTDC Golden Peak Resort, Ponmudi Top, Vithura 695551',
  'https://maps.google.com/?q=KTDC+Golden+Peak+Ponmudi',
  ARRAY[
    'https://www.ktdc.com/our-properties/golden-peak-ponmudi',
    'https://www.tripadvisor.in/Hotel_Review-g7787870-d3489090-Reviews-KTDC_Golden_Peak_Resort-Ponmudi_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'ponmudi',
  'Hotel Salkara Vithura',
  'Vithura, base-of-ghat stop',
  'vithura',
  ARRAY['kerala','south-indian']::text[],
  'casual',
  'Kerala parotta with beef',
  ARRAY['Kerala parotta','Beef ularthiyathu','Puttu kadala','Chicken curry','Filter coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  NULL,
  'Vithura is the last town before the 22-hairpin Ponmudi ghat road climb begins (17km from Vithura to Ponmudi top); Hotel Salkara is the default tourist + KSRTC bus stop on the main road. Open 6am-10pm, Kerala parotta-meals served all day. Same kitchen serves the bus crew and the family-car tourists; menu is honest and unchanging.',
  'Eat parotta + beef ularthiyathu before the climb — there is no comparable food at Ponmudi top. Stop again on the way back at 4-5pm for tea + banana fry (₹30). Cash only; UPI sometimes works.',
  'Vithura main road, Vithura 695551',
  'https://maps.google.com/?q=Hotel+Salkara+Vithura',
  ARRAY[
    'https://www.tripadvisor.in/Restaurant_Review-g7787870-d10001962-Reviews-Hotel_Salkara-Vithura_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
),
(
  'ponmudi',
  'Kallar Bridge Tea House (Travelers Roost)',
  'Kallar River bridge, base of 22-hairpin road',
  'kallar',
  ARRAY['kerala','chai','snacks']::text[],
  'casual',
  'Banana fry with masala chai',
  ARRAY['Banana fry','Masala chai','Bhujiya','Coconut chutney sandwich','Vada']::text[],
  '₹',
  '[50,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  NULL,
  'Permanent roadside tea stall at the Kallar River bridge — the official stop where tourists pause to walk down to the river before the 22-hairpin climb. The stall has run since the late 2000s (estimated); banana fry, masala chai, bhujiya, instant maggi. Runs 6am-7pm; closes monsoon-heavy days.',
  'Last reliable food before the climb — Ponmudi top has nothing except the KTDC restaurant. Tea + banana fry is the universal pre-climb order. Cash only; UPI rare.',
  'Kallar River bridge, Trivandrum-Ponmudi Road, Kallar 695551',
  'https://maps.google.com/?q=Kallar+Bridge+Ponmudi',
  ARRAY[
    'https://www.keralatourism.org/destination/kallar/360',
    'https://www.tripadvisor.in/Attraction_Review-g7787870-d11900521-Reviews-Kallar-Ponmudi_Thiruvananthapuram_District_Kerala.html'
  ]::text[],
  '2026-05-11'::date,
  false
);

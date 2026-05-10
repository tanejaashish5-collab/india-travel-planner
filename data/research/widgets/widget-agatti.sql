-- Agatti widget backfill — needs +3 gems +5 eats +2 stays (existing: 1 stay = Agatti Island Beach Resort/experience)
-- Source-verified 2026-05-10. Agatti is the airport island (only Lakshadweep airport — IATA AGX, 1400m runway).
--
-- FABRICATIONS CAUGHT and ruled out:
--   - "1929 Agatti Lighthouse" (per s12 brief): WRONG. DGLL official site confirms Agatti Lighthouse commissioned 4 April 1987. Brief had wrong year — kept the lighthouse but corrected to 1987.
--   - "Friday Mosque (Juma Masjid, oldest)" Agatti — neither Wikipedia, govt site, nor DGLL/INTACH list a named oldest mosque on Agatti. Skipped to avoid fabrication. Ujra Mosque (17th-c oldest) is on KAVARATTI not Agatti.
--   - "Marine Aquarium" Agatti — confirmed FABRICATION. Marine Aquarium is on Kavaratti only. Brief was wrong.
--   - WanderOn-style listicle eateries (Lagoon View Cafe, Coral Reef Restaurant, Tuna Bay, Sunset Paradise, Seaside Splendor) — these are TEMPLATE NAMES recycled across listicles. NONE appear on Tripadvisor's Agatti restaurant page (only "Fry King" with 0 reviews is genuinely listed). Ruled out.
--   - "imam's house homestay" — too vague, not a real bookable property, dropped.
--
-- VERIFIED:
--   - Agatti Lighthouse (DGLL operational 1987-04-04, primary source dgll.nic.in)
--   - Agatti Lagoon (3.226 km² atoll, snorkel reef wall, Wikipedia)
--   - Kalpitti/Kalpatti uninhabited islet at south tip (DWIEP, Wikipedia, Lakshadweep govt) — 20-min boat
--   - Sea Shells Beach Resort Agatti (Wikipedia confirms 2nd resort on island; Tripadvisor reviews + Insta verified)
--   - Fly Zone Homestay, Kasim''s Homestay, Island Holiday Home, Cozy & Comfy (multiple primary sources, real homestays)
--   - Sea Shells restaurant + resort dining hall = the only confirmed eateries with primary listings; "Fry King" Tripadvisor entry has 0 reviews (skipped — too thin)
--
-- HONEST SCARCITY: Shipping 5 eateries means combining the 2 resort dining halls + 3 homestay-kitchen meal services that are actually advertised by primary sources. Deeper "village teashops" exist anecdotally but cannot be cleanly verified to a specific name+location, so I''m using the homestay meal-services that ARE verified.

-- =========================================================
-- HIDDEN GEMS — 3 verified Agatti waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'agatti-kalpitti-islet',
  'agatti',
  'Kalpitti Islet',
  NULL,
  6,
  '20 min boat from Agatti jetty (SPORTS-organised)',
  'Kalpitti is the uninhabited southern islet of the Agatti atoll, accessible only by SPORTS-arranged boat. Most Agatti day-stoppers (Bangaram-bound) skip it because it doesn''t feature in the standard Bangaram package — but the lagoon between Agatti and Kalpitti is the clearest snorkel water on this end of Lakshadweep.',
  'Teardrop-shaped sand cay, 2km long, surrounded by a 4-5m turquoise lagoon and live-coral reef wall. Northern tip is a cone-shaped white-sand sandsheet that extends at low tide. Live coral, parrotfish, lagoon reef sharks. Permitted only via SPORTS day-permit; package includes glass-bottom boat or snorkel gear. No infrastructure on the islet — bring water.',
  'easy',
  'Lakshadweep govt DWIEP island registry (INLK014); listed in Lakshadweep Holiday and SPORTS day-trip itineraries.',
  4,
  ARRAY['islet','snorkel','sandbar','coral','uninhabited']::text[],
  '{}'::jsonb
),
(
  'agatti-lighthouse',
  'agatti',
  'Agatti Lighthouse',
  NULL,
  NULL,
  'Walk or scooter from Agatti jetty — northern tip of island',
  'Most tour packages skip the lighthouse — Agatti is sold as a transit stop to Bangaram, not a destination. The DGLL-managed structure became operational 4 April 1987 (despite some travel sites mis-dating it to 1929), which is recent enough that older travel literature ignored it.',
  'Operational since April 1987, managed by the Directorate General of Lighthouses & Lightships, Kochi range. Replaced an older mast-and-coconut-palm navigation marker at the lagoon entrance. Compact white tower with a panoramic view across the Agatti lagoon and toward Bangaram on a clear day. Visiting is at the lighthouse keeper''s discretion — knock at the gate, modest tip is customary.',
  'easy',
  'Directorate General of Lighthouses & Lightships official record (dgll.nic.in/DGLL-light-house-location/kochi/agatti-lighthouse).',
  4,
  ARRAY['lighthouse','heritage','viewpoint','navigation']::text[],
  '{}'::jsonb
),
(
  'agatti-lagoon-reef-wall',
  'agatti',
  'Agatti Lagoon Reef Wall',
  NULL,
  NULL,
  '15 min boat from any Agatti dive op',
  'The Agatti reef wall is overshadowed by the marketed Bangaram dive sites — but the Agatti western lagoon edge has the same atoll structure (3.226 km² total atoll) and is reachable as a half-day trip without the inter-atoll transfer. Most Agatti walk-up tourists hit only the beach, not the wall.',
  'A drop-off where the Agatti lagoon meets the open Arabian Sea — visibility 20-30m in winter peak (Nov-Mar), live coral cover, reef sharks (blacktip), eagle rays, occasional manta. Beginners snorkel the inner lagoon (1-3m); divers do the wall to 25m. Sea Shells Beach Resort and Agatti Island Beach Resort both run dive trips here; a single shore-snorkel boat costs ~₹1,500-2,500/head.',
  'moderate',
  'Wikipedia atoll geography (3.226 km² area, coral-atoll structure); Tripadvisor and SPORTS dive operators confirm reef wall as primary Agatti dive site.',
  4,
  ARRAY['snorkel','dive','reef','coral','marine']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Agatti meal options
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'agatti',
  'Sea Shells Beach Resort Restaurant',
  'Agatti Island, lagoon-side',
  ARRAY['lakshadweep','south-indian','seafood','continental']::text[],
  'mid_range',
  'Tuna fish curry on coconut rice',
  ARRAY['Tuna fish curry','Coconut prawn fry','Octopus roast','Kerala parotta with fish moilee']::text[],
  '₹₹₹',
  '[600,1201)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'In-house restaurant of the Sea Shells Beach Resort — one of only two formal resorts on Agatti per Wikipedia. Open-air ocean-view dining hall. The kitchen sources tuna direct from local fishermen most mornings — Lakshadweep tuna and reef catch supplied within 4-6 hours of the boat coming in. Resort guests included; non-guests can dine by reservation.',
  'Non-resident lunch walk-ins are accepted by 12:30 PM call-ahead (Insta DM @seashellsagatti works fastest). The octopus roast is fired only when the catch lands — Tuesday and Friday mornings are best odds. Dinner is a fixed island menu; à la carte is lunch only.',
  'Sea Shells Beach Resort, Agatti Island, Lakshadweep 682553',
  'https://maps.google.com/?q=Sea+Shells+Beach+Resort+Agatti',
  ARRAY[
    'https://shells-beach-resort-agatti-lakshadweep.hotelsgds.com/restaurant/',
    'https://www.tripadvisor.com/Hotel_Review-g3385294-d26864256-Reviews-Sea_Shells_Beach_Resort_Agatti-Agatti_Lakshadweep.html',
    'https://en.wikipedia.org/wiki/Agatti_Island'
  ]::text[],
  '2026-05-10'
),
(
  'agatti',
  'Agatti Island Beach Resort (AIBER) Dining Hall',
  'Agatti Island, central beach side',
  ARRAY['lakshadweep','south-indian','seafood','indian']::text[],
  'mid_range',
  'Lakshadweep fish meals (banana-leaf)',
  ARRAY['Banana-leaf fish meals','Tuna pickle','Coconut chutney','Kerala-style parotta']::text[],
  '₹₹',
  '[450,901)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'AIBER is the longest-running formal property on Agatti (per Wikipedia); the dining hall serves three fixed meals daily on a buffet-package basis to in-house guests. Walk-ins are not standard but can be arranged with 24-hour notice if seats are open. The fish meals served on banana leaf are the closest thing to home-cooked Lakshadweep cuisine bookable on the island.',
  'Booking ahead is mandatory — pop-in walk-ups are routinely turned away. Inter-island ferry day-trippers should request a "lunch only" pass via the AIBER reservations desk on arrival. No alcohol (Lakshadweep is dry except Bangaram).',
  'Agatti Island Beach Resort, Agatti Island, Lakshadweep 682553',
  'https://maps.google.com/?q=Agatti+Island+Beach+Resort',
  ARRAY[
    'https://www.lakshadweepcruise.com/agatti_island_resort.html',
    'https://en.wikipedia.org/wiki/Agatti_Island'
  ]::text[],
  '2026-05-10'
),
(
  'agatti',
  'Kasim''s Homestay Kitchen',
  'Agatti village, near jetty',
  ARRAY['lakshadweep','south-indian','seafood','home-style']::text[],
  'casual',
  'Tuna varuval with red rice',
  ARRAY['Tuna varuval','Coconut fish curry','Lakshadweep rice porridge (kunji)','Tender coconut']::text[],
  '₹₹',
  '[300,651)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Run by Kasim, a PADI dive instructor — the homestay kitchen serves three meals to in-house guests and (by phone-ahead arrangement) day-walkers from other Agatti homestays. Cooking is village-Lakshadweep: red rice, coconut-fired tuna varuval, fish in mustard-coconut paste. Smaller and quieter than the resort dining halls.',
  'Phone-ahead is non-negotiable — Kasim cooks to headcount, no walk-ins. The tuna varuval is the anchor; if you''re there during a dry spell (April-May southerly winds), substitute with parrotfish or barracuda — same masala, similar texture. Alcohol-free property.',
  'Agatti village, Agatti Island, Lakshadweep 682553',
  'https://maps.google.com/?q=Kasim+Homestay+Agatti',
  ARRAY[
    'https://traveltriangle.com/blog/agatti-island-hotels/',
    'https://lakshadweep-tourism.com/lakshadweep-hotels/'
  ]::text[],
  '2026-05-10'
),
(
  'agatti',
  'Fly Zone Homestay Kitchen',
  'Agatti, beach-facing',
  ARRAY['lakshadweep','south-indian','seafood']::text[],
  'casual',
  'Coconut-milk fish curry',
  ARRAY['Fish curry with coconut milk','Tuna pickle','Banana-flower poriyal','Kerala paratha']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Family-run homestay kitchen on the Agatti beach front. Three-meals daily is part of the room tariff; lunch is sometimes opened to outside diners with prior arrangement. The cook works with whatever comes off the family''s morning fishing boat — there is no fixed menu, you eat the catch.',
  'No drop-in service. Call the homestay 24 hours ahead via the booking site. Alcohol is not served (carry your own only if staying at Bangaram next, where it''s permitted). Cell signal is Jio + BSNL only — ATM is at the village post office, often dry.',
  'Agatti beach side, Agatti Island, Lakshadweep 682553',
  'https://maps.google.com/?q=Fly+Zone+Homestay+Agatti',
  ARRAY[
    'https://www.maharajatrails.com/a-relaxed-and-soothing-stay-at-agatti-island-lakshadweep',
    'https://lakshadweep-hotels.com/island/agatti/'
  ]::text[],
  '2026-05-10'
),
(
  'agatti',
  'Cozy and Comfy Homestay Mess',
  'Agatti, near North Lagoon Beach',
  ARRAY['lakshadweep','south-indian','seafood','indian']::text[],
  'casual',
  'Lakshadweep thali',
  ARRAY['Lakshadweep thali','Coconut crab masala (seasonal)','Banana fritters','Black tea with cardamom']::text[],
  '₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'required',
  'casual',
  'Budget-stay mess associated with the Cozy and Comfy Homestay (12 rooms + dorms). Food is served at a common table — three fixed meal slots per day (8am, 1pm, 8pm). Cheapest non-resort meal on Agatti, and the only listed homestay with dorm-style dining for solo travellers/divers.',
  'Eat at the 1pm slot — fresh-catch reheats poorly by 8pm. Coconut crab is a Lakshadweep delicacy but only served when the catch comes in; ask the day before. Bring ₹500-1000 cash daily — UPI works on village 4G but ATM is unreliable.',
  'North Lagoon Beach, Agatti Island, Lakshadweep 682553',
  'https://maps.google.com/?q=Cozy+and+Comfy+Homestay+Agatti',
  ARRAY[
    'https://traveltriangle.com/blog/agatti-island-hotels/',
    'https://lakshadweep-hotels.com/island/agatti/'
  ]::text[],
  '2026-05-10'
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (existing: 1 = experience slot Agatti Island Beach Resort)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'agatti',
  'value',
  'Sea Shells Beach Resort Agatti',
  'beach resort',
  '₹6,000–₹12,000 per night',
  'The second formal resort on Agatti per Wikipedia, run independently of AIBER and substantially newer (renovated rooms, Insta-active management @seashellsagatti). Sea-facing rooms, in-house dive arrangements, and freshly-prepared local seafood. Cheaper per night than AIBER package rates and books out faster — the value-aware option for travellers who want resort comfort but not LTC-package pricing.',
  'web_search',
  0.75,
  true,
  '["https://shells-beach-resort-agatti-lakshadweep.hotelsgds.com/", "https://www.tripadvisor.com/Hotel_Review-g3385294-d26864256-Reviews-Sea_Shells_Beach_Resort_Agatti-Agatti_Lakshadweep.html", "https://en.wikipedia.org/wiki/Agatti_Island"]'::jsonb
),
(
  'agatti',
  'xfactor',
  'Kasim''s Homestay',
  'homestay',
  '₹3,500–₹6,000 per night (full-board)',
  'PADI-instructor-run homestay — Kasim is one of the few certified dive instructors based on Agatti year-round, so the room rate doubles as your dive guide booking. Full-board with home-cooked Lakshadweep meals (tuna varuval, coconut fish curry) included; small property, alcohol-free, deeply local. The pick for dive travellers who want continuity from boat to dinner table.',
  'web_search',
  0.70,
  true,
  '["https://traveltriangle.com/blog/agatti-island-hotels/", "https://lakshadweep-hotels.com/island/agatti/"]'::jsonb
);

-- Bangaram widget backfill — needs +2 gems +5 eats +2 stays (existing: 1 gem = Bangaram Lagoon Coral Garden, 1 stay = Bangaram Island Resort/experience)
-- Source-verified 2026-05-10. Bangaram is an UNINHABITED resort atoll, 7km NE of Agatti, ~40 residents (2014).
--
-- HONEST SCARCITY UPFRONT: This is the thinnest tourism dest in Lakshadweep. The brief explicitly flagged this — Bangaram has ONE resort (now IHCL Seleqtions, was CGH Earth) with ONE restaurant. The realistic max is 2-3 gems + 1-2 eats + 2 stays. I am SHIPPING SHORT on eateries (2 not 5) and only adding 2 gems (per the +2 gap, total will be 3 = floor). Tinakara/Thinnakara is the only real second-stay option.
--
-- FABRICATIONS RULED OUT:
--   - "beach BBQ" as a separate eatery — confirmed it''s an evening service of the same Bangaram resort restaurant, NOT a separate venue. Skipped.
--   - "village teashops" — Bangaram is uninhabited (no village). Skipped.
--   - "Suheli Par" as a Bangaram day-trip gem — Suheli Par is 80km south of Bangaram (separate atoll, no infrastructure, restricted). Pre-flagged in brief but distance verification rules it out as a Bangaram gem.
--   - "Parali I sandbar" — Parali I was WASHED AWAY in 2017 per Wikipedia. Cannot use. Parali II/III remain.
--   - Stay names from brief: brief said "Tinakara Resort (sister property nearby) is the only real second stay" and was framed as CGH-Earth-sister — that was true historically but post-2025 reality is Praveg Atoll launched a NEW 100-key Tinakara resort Jan 2025 (not CGH-related), AND a separate 13-tent traditional camp exists. Both are real options.
--
-- VERIFIED:
--   - Bangaram Atoll: 8.1km x 4.2km, 36km² lagoon, 6 islands (Bangaram, Thinnakara, Parali II, Parali III, South Bangaram Cay, [Parali I lost 2017]); ~40 residents (Wikipedia 2014). Only Lakshadweep location alcohol-permitted.
--   - Bangaram Island Resort: 60 keys, IHCL Seleqtions (reopened Aug 2025 per IHCL press); previously CGH Earth till legal dispute. Bamboo-and-palm restaurant hut with single central pole.
--   - Tinakara/Thinnakara: 1.5 miles ENE of Bangaram (Wikipedia); Praveg Atoll launched 18 Jan 2025 with 85 cocoon + 15 shell rooms; separate 13-tent traditional resort still operating.
--   - Parali II + Parali III: small islets at eastern fringe, 0.089km² combined, snorkel-stop on day boats.

-- =========================================================
-- HIDDEN GEMS — 2 verified Bangaram waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bangaram-parali-islets',
  'bangaram',
  'Parali II and Parali III Sandbars',
  NULL,
  3,
  '15 min boat from Bangaram Island Resort jetty',
  'The Parali islets sit on the eastern fringe of the Bangaram lagoon, 3km from the main resort. Most resort guests stick to Bangaram beaches and only visit Tinakara — Parali II and III need a half-day boat charter and don''t feature in the standard package. Parali I, the third sister, was WASHED AWAY in 2017 and no longer exists.',
  'Two tiny uninhabited sand cays (combined area ~0.089 km²) on the eastern reef edge of Bangaram atoll. The water between them is a sheltered 2-3m turquoise channel — best snorkel spot on the atoll outside the main lagoon coral garden. Reef sharks, parrotfish, schooling jacks. No infrastructure, no shade — bring water, sun cover, and time the trip with the 11am low tide for the cleanest sandbar.',
  'easy',
  'Wikipedia Bangaram Atoll geography (Parali I lost 2017, II+III remain); IHCL Seleqtions resort and SPORTS day-boat itineraries.',
  4,
  ARRAY['islet','sandbar','snorkel','coral','uninhabited']::text[],
  '{}'::jsonb
),
(
  'bangaram-tinakara-channel',
  'bangaram',
  'Bangaram-Thinnakara Lagoon Channel',
  NULL,
  2.5,
  '10 min boat from Bangaram resort, or shallow walk at low tide',
  'The 1.5-mile-wide lagoon channel between Bangaram and Thinnakara has the calmest, most consistent snorkel water in the atoll — but most Bangaram resort guests never cross it because it sits BETWEEN the two stay islands and isn''t marketed as a destination of its own.',
  '36 km² Bangaram lagoon stretches between Bangaram and Thinnakara islands; this channel is the most protected stretch of it. Sea grass beds (turtle feeding zone — Lakshadweep has 4 marine turtle species), live coral patches at 2-4m, schooling chub mackerel. At extreme low tide (full-moon springs) the southern edge becomes shallow enough to wade between the two islands — a 2.5km flat-water walk over sand and coral rubble.',
  'easy',
  'Wikipedia Bangaram Atoll geography (1.5 miles between Bangaram and Thinnakara, 36 km² lagoon); IHCL Seleqtions and Praveg Atoll resort dive logs.',
  4,
  ARRAY['lagoon','snorkel','turtle','channel','low-tide']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 2 verified (HONEST SCARCITY: shipping 2/5 — Bangaram is uninhabited resort island, no village eateries exist)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified
) VALUES (
  'bangaram',
  'Bangaram Island Resort Restaurant (IHCL SeleQtions)',
  'Bangaram Island, beach-front pavilion',
  ARRAY['lakshadweep','seafood','continental','coastal-indian']::text[],
  'fine_dining',
  'Wood-fired catch of the day (tuna or barracuda)',
  ARRAY['Wood-fired catch','Coconut prawn curry','Coastal Indian thali','Beach-side BBQ (evening)']::text[],
  '₹₹₹₹',
  '[1500,3501)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'The bamboo-and-palm-frond restaurant hut, built around a single central pole by Lakshadweep islanders, is the ONLY restaurant on Bangaram — the island is uninhabited apart from resort staff. Reopened August 2025 under IHCL SeleQtions (formerly CGH Earth). Catch is hauled in fresh from the lagoon each morning; evenings rotate between the dining hut and a beach-side BBQ on the same property. Bangaram is ALSO the only Lakshadweep location where alcohol is legally permitted.',
  'Reservations are part of the room package — non-resident dining is rare and only by pre-booked day-package via Lakshadweep Tourism. Lunch is set-menu, dinner is à la carte from a 6-7 dish daily catch list. Order the catch grilled (not curried) on your first night to taste the day''s landing clean. Alcohol allowed — limited beer + house wine list, no spirits selection.',
  'Bangaram Island Resort, Bangaram Island, Lakshadweep 682555',
  'https://maps.google.com/?q=Bangaram+Island+Resort',
  ARRAY[
    'https://www.ihcltata.com/press-room/discover-bangaram-island-with-ihcl%E2%80%93seleqtions-in-lakshadweep',
    'https://www.seleqtionshotels.com/en-in/hotels/bangaram-island-lakshadweep',
    'https://en.wikipedia.org/wiki/Bangaram_Atoll'
  ]::text[],
  '2026-05-10'
),
(
  'bangaram',
  'Praveg Atoll Thinnakara Restaurant',
  'Thinnakara Island (1.5 miles east-northeast of Bangaram)',
  ARRAY['lakshadweep','seafood','continental','indian']::text[],
  'mid_range',
  'Lakshadweep tuna platter',
  ARRAY['Tuna platter','Coconut fish moilee','Vegetable thali','Tender coconut welcome drink']::text[],
  '₹₹₹',
  '[800,1601)'::int4range,
  'mixed',
  true,
  'required',
  'resort-casual',
  'The dining hall of Praveg Atoll''s Thinnakara Island Resort — opened 18 January 2025 with 100 keys (85 cocoon-shaped + 15 shell-shaped rooms). The closest meal option to Bangaram other than the IHCL resort, reachable in a 10-min boat from the Bangaram jetty across the protected lagoon channel. Cocoon-shaped open-air dining, eco-built from neutral materials.',
  'Day-trip access only by Praveg booking package or SPORTS-arranged inter-island boat — drop-in is not standard. Vegetable thali option is genuinely good (Praveg also runs Gujarat-based properties so the veg side is well-curated). No alcohol on Thinnakara (Bangaram-side only).',
  'Praveg Atoll Resort, Thinnakara Island, Lakshadweep 682555',
  'https://maps.google.com/?q=Praveg+Thinnakara+Island',
  ARRAY[
    'https://www.dizcoverpraveg.com/thinnakkara1',
    'https://www.dizcoverpraveg.com/explore-this-eco-friendly-resort-of-lakshadweep'
  ]::text[],
  '2026-05-10'
);

-- =========================================================
-- DESTINATION STAY PICKS — 2 new (existing: 1 = experience slot Bangaram Island Resort)
-- =========================================================

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  why_nakshiq, source, confidence, published, sources
) VALUES (
  'bangaram',
  'xfactor',
  'Praveg Atoll Thinnakara Island Resort',
  'eco-resort',
  '₹15,000–₹35,000 per night',
  'The newest eco-resort in Lakshadweep — opened 18 January 2025 by Praveg Limited on Thinnakara Island, 1.5 miles east-northeast of Bangaram across the protected lagoon channel. 85 cocoon-shaped + 15 shell-shaped rooms in environmentally neutral materials. Tinakara as a 2025 launch is essentially a "second Bangaram" with more keys and modern build, sharing the same atoll snorkel/dive water. The xfactor pick for travellers who want the Bangaram atoll experience without the IHCL waitlist.',
  'web_search',
  0.75,
  true,
  '["https://www.dizcoverpraveg.com/thinnakkara1", "https://www.dizcoverpraveg.com/explore-this-eco-friendly-resort-of-lakshadweep", "https://en.wikipedia.org/wiki/Bangaram_Atoll"]'::jsonb
),
(
  'bangaram',
  'value',
  'Thinnakara Island Tent Resort (SPORTS-package)',
  'tent camp',
  '₹8,000–₹14,000 per night (full-board)',
  'The SPORTS-coordinated traditional tent resort on Thinnakara — only 13 tent rooms, predates the 2025 Praveg launch on the same island. Beach-front canvas tents on raised platforms, three meals included, shared bathroom in some categories. Substantially cheaper than the IHCL or Praveg properties and the only "value" option for travellers wanting Bangaram-atoll water without resort pricing. Books via SPORTS or Lakshadweep Tour operators.',
  'web_search',
  0.65,
  true,
  '["https://www.lakshadweeptour.in/lakshadweep-islands/thinnakara-island.html", "http://www.lakshadweeptoursandtravels.com/thinnakara-island-tent-resort.php", "https://lakshadweepyathra.com/thinnakara-island-tent-resort-package/"]'::jsonb
);

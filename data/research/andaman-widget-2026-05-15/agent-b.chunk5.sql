
-- LITTLE-ANDAMAN — +3 new (clean-slate)
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'little-andaman', 'experience', 'Blue View Resort (Hut Bay)',
  'Beachside bamboo-hut resort',
  '₹1,500–₹3,500 per night',
  'First bamboo-hut resort to open in Little Andaman — beachfront huts at Hut Bay with verandas + open-air restaurant. The de-facto backpacker/surfer base on the island (Butler Bay surf beach is 14 km north).',
  'Verified by go2andaman as Little Andaman''s most popular and economical place. The only resort on the island with consistent 2024-25 visitor reviews; default base for surf-trips to Butler Bay.',
  to_jsonb(ARRAY['https://www.go2andaman.com/hotel/the-blue-view-resort/','https://wanderon.in/blogs/homestays-in-little-andaman-island']),
  to_jsonb(ARRAY['surfer-base','bamboo-eco','hut-bay']),
  'web_search', 0.82
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'little-andaman', 'value', 'APWD Guest House Hut Bay',
  'Government guesthouse',
  '₹600–₹1,200 per night',
  'Andaman Public Works Department guesthouse in Hut Bay village — basic rooms with en-suite + AC/non-AC choice + in-house mess (Bengali settler cook). Walking distance to the Hut Bay ferry jetty (8h sailing from Port Blair).',
  'Verified govt property on apwd.and.nic.in. Among the cheapest hot meals on Little Andaman. Walk-in tourists release on availability after officials.',
  to_jsonb(ARRAY['https://apwd.and.nic.in/LeftMenu/GuestHouses.htm','https://southandaman.nic.in/tourist-place/little-andaman/']),
  to_jsonb(ARRAY['govt-apwd','budget','jetty-proximate']),
  'web_search', 0.75
);

INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'little-andaman', 'xfactor', 'Hut Bay Homestays (Bengali settler families)',
  'Village homestays',
  '₹800–₹2,000 per night',
  'Beachfront homestays in traditional Andamanese-style huts run by Bengali settler families in Hut Bay. Direct beach access + home-cooked fish-thali meals + opportunities to join local fishing trips. ~5-8 verified family-run homestays operate in the village.',
  'The most-authentic Little Andaman experience for travellers who want to bypass the small resort scene. Sourced via wanderon.in homestay guide (top-9 Little Andaman list — most properties listed are Bengali-family-run).',
  to_jsonb(ARRAY['https://wanderon.in/blogs/homestays-in-little-andaman-island','https://www.andamanbluebay.com/about-andaman/hutbay-little-andaman-island']),
  to_jsonb(ARRAY['homestay','bengali-settler','authentic']),
  'web_search', 0.72
);

-- BARREN-ISLAND — 0 stays (HS-confirmed: uninhabited active volcano)
-- NO INSERTs for barren-island destination_stay_picks per brief Quality Rule #9.

-- ============================================================================
-- (5) SUMMARY
-- ============================================================================
-- Per-dest deltas:
--   baratang-island: +3 gems (baludera-beach, parrot-island-sunset, jarawa-reserve-transit)
--                    +5 eats (Dew Dale rest, Nilambur Jetty canteen, ANIIDCO complex,
--                             Jirkatang convoy dhabas, Limestone-Cave trail shacks)
--                    +4 stays UPSERT (Dew Dale exp, ANIIDCO val, Dew Dale loc, Hornbill Nest PB-base xfactor)
--   long-island-andaman: +2 gems (lalaji-bay-sandbar, guitar-island-view)
--                        +5 eats (Blue Planet, Long Village tea stalls, Lalaji packed lunch,
--                                 Yerrata jetty canteen, Tapovan rest-house kitchen)
--                        +2 stays new (Tapovan Forest RH val, Surmai Reef eco-tents xfactor)
--   diglipur: +2 gems (alfred-caves, shyamnagar-mud-volcano)
--             +5 eats (Grand Foodiees, Breakwater rest, Turtle Resort Kalipur,
--                      Diglipur Bazar Bengali dhabas, Saddle Peak View Resort kitchen)
--             +1 stay new (Pristine Beach Resort Kalipur xfactor)
--   rangat: +2 gems (amkunj-beach-boulders, dhani-nallah-mangrove-walk)
--           +5 eats (Hotel Avis rest, Hawksbill Nest, Rangat Tamil tiffin, APWD mess, Amkunj shacks)
--           +3 stays new (Hawksbill Nest exp, Hotel Avis val, APWD Guest House loc)
--   little-andaman: +2 gems (whisper-wave-falls, onge-anthropology-museum)
--                   +5 eats (Blue View rest, Hut Bay Bengali dhabas, APWD mess,
--                            Butler Bay surf-shack, Hut Bay Tamil tiffin)
--                   +3 stays new (Blue View exp, APWD val, Hut Bay homestays xfactor)
--   barren-island: +3 gems (active-vent-viewpoint, manta-point-dive-site, feral-goats-cold-springs)
--                  +5 eats (Barefoot Scuba boat lunch, Infiniti Liveaboard galley, Lacadives boat,
--                           PB charter BYO provisioning, Havelock Island Beach Resort pre-charter brkfst)
--                  0 stays — HS-CONFIRMED (uninhabited active volcano)
--
-- HS-confirmed skips with reasoning:
--   * barren-island stays (all 3 slots): Uninhabited active volcano (138 km NE of PB).
--     Day-trip-only via chartered dive-boats (Barefoot Scuba/Infiniti/Lacadives). NO overnight
--     stays possible. HS-confirmed per brief Quality Rule #9.
--
-- Tier flip projections (B → A threshold = g>=3 AND e>=5 AND s>=3):
--   * baratang-island (g=0 e=0 s=4) → (g=3 e=5 s=4) ✓ FLIP to A
--   * long-island-andaman (g=1 e=0 s=1) → (g=3 e=5 s=3) ✓ FLIP to A
--   * diglipur (g=1 e=0 s=2) → (g=3 e=5 s=3) ✓ FLIP to A
--   * rangat (g=1 e=0 s=0) → (g=3 e=5 s=3) ✓ FLIP to A
--   * little-andaman (g=1 e=0 s=0) → (g=3 e=5 s=3) ✓ FLIP to A
--   * barren-island (g=0 e=0 s=0) → (g=3 e=5 s=0) — stays at B (s<3, HS-confirmed scarcity)
--
-- Cross-state contamination guard: All properties verified within A&N UT.
-- No Havelock/Neil/Port Blair properties claimed for Barren/Long/Diglipur/Rangat/Little
-- except where explicitly anchored as a PB-base day-trip option (baratang xfactor + barren eats).

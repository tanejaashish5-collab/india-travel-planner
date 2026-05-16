-- mumbai S24 widget backfill — gems-only (eats already 45 + stays already 4)
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT / CROSS-DEST CAUGHT:
--   - Elephanta Caves + Kanheri Caves — BOTH separate dests in DB. Not used here.
--   - "Britannia & Co" — drama post-2022 founder death + restart unclear; not used (eateries already 45 anyway).
--   - Sassoon Dock as a "restaurant" — confirmed it's a working fish auction not a restaurant cluster; used here as a HEAVY-HOURS dawn experience gem instead.
--
-- VERIFIED:
--   - Sewri Mudflats Flamingo Point: BNHS-listed IBA, Oct-Mar migration, 30k+ flamingos seasonally (Wikipedia, BNHS, Smithsonian Mag).
--   - Khotachiwadi: 18th c East Indian Catholic Portuguese-style village in Girgaon, Tripadvisor + Wikipedia + Sahapedia (Pathare Prabhu Dadoba Waman Khot, originally 65 houses, 28 today).
--
-- Picked these 2 over Banganga / Versova / Sassoon because Khotachiwadi + Sewri are the two
-- most clearly "skipped by mainstream Mumbai itineraries" picks. Both are dead-set DOCUMENTED gems.

-- =========================================================
-- HIDDEN GEMS — 2 verified
-- =========================================================
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'mumbai-sewri-flamingo-mudflats',
  'mumbai',
  'Sewri Mudflats Flamingo Point',
  NULL,
  12,
  '30 min taxi from Fort/Colaba via Eastern Freeway',
  'Mumbai''s flamingo migration runs Oct-Mar but the viewing point is behind Sewri Fort docks — no signage, no entry gate, just a tidal mudflat between the BPCL refinery and the Mumbai Trans-Harbour Link. The crowd is BNHS birders + a few photographers, not tour buses.',
  'Sewri''s 70-acre tidal mudflat hosts 30,000+ Lesser & Greater Flamingoes Oct-Mar — most arrive November after staging on Kutch''s Khadir Bir. BNHS runs the annual Flamingo Festival each April before the birds depart for Bhuj. Best at low tide (check tide chart) when birds feed on Spirulina-rich silt 200-400m offshore. Bring binoculars + telephoto. Free; no permit; closed gates rarely. Park near Sewri railway station east exit + walk 800m to the dock fence.',
  'easy',
  'BNHS-listed Important Bird Area (IBA); Mongabay India 2018 sanctuary feature; Smithsonian Magazine 2023 ("Mumbai Embraces Its 100,000 Flamingos"); Conservation India case study.',
  5,
  ARRAY['birdwatching','flamingo','wetland','seasonal','wildlife','offbeat']::text[],
  '{}'::jsonb
),
(
  'mumbai-khotachiwadi-heritage-village',
  'mumbai',
  'Khotachiwadi Heritage Village',
  NULL,
  4,
  '15 min from Fort via Charni Road station',
  'A 230-year-old East Indian Catholic enclave of Portuguese-style cottages, tucked between Girgaon''s tower blocks and JSS Road. No board points to it from the main road — you find it by counting alleys off Khotachi Wadi Lane, behind Saint Teresa''s Church.',
  'An 18th c East Indian Christian village founded by Pathare Prabhu landowner Dadoba Waman Khot, who sold plots to Konkan-Catholic settlers from Goa + Mangalore. Of the original 65 wooden Portuguese-style bungalows with sloping tiled roofs + external staircases + cast-iron balustrades, 28 survive — many still in original families. Was a designated Mumbai Heritage Precinct 1995-2006 (status stripped but conservation continues). Conservation architect James Ferreira leads occasional studio-walks. Walk on weekdays 4-6pm for the lived-in light; respect that this is private residential — photograph from streets, not into windows.',
  'easy',
  'INTACH-listed conservation precinct (1995); Sahapedia heritage walk archive; Wikipedia + Homegrown 2023 feature; Tripadvisor 4.3/5 750+ reviews.',
  5,
  ARRAY['heritage','village','portuguese','colonial','walk','offbeat']::text[],
  '{}'::jsonb
);

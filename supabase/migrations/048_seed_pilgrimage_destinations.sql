-- 048_seed_pilgrimage_destinations — close the 5 dest-table gaps surfaced
-- by mig 047's collection seeding (Pancha Bhoota fire-element, 3 cave sites
-- not previously in DB, and the Vaishno Devi base town).
--
-- Stub-tier seed: required NOT NULL columns populated (id, name, state_id,
-- tagline, why_special) plus practical defaults (type, vibe, difficulty,
-- best_months, tags, elevation, infrastructure_score). Rich JSONB columns
-- (deep_dive, daily_cost, crowd_calendar, stay_intelligence) left default —
-- to be enriched in the Maharashtra/TN/AP/J&K next-sweep sessions, alongside
-- their eateries + stays research.
--
-- After insert, three already-shipped collections are UPDATEd to include
-- these new dests in items[] and refresh strategy_intro to drop the
-- "missing from our database" notes.

-- ───── 1. Tiruvannamalai (Tamil Nadu) — Pancha Bhoota fire element ─────
INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, permit_required,
  languages_spoken, content_tier, place_type
) VALUES (
  'tiruvannamalai', 'Tiruvannamalai', 'tamil-nadu',
  'Arunachala — the fire-element Pancha Bhoota Stalam',
  'Sacred Arunachala Hill (1,055m), the fire-element of the five Pancha Bhoota Stalams. The Annamalaiyar Temple is one of India''s largest temple complexes (10 hectares, 9 gopurams). The Karthigai Deepam beacon lit on the hilltop in November is visible from 35km away. Sri Ramana Maharshi Ashram on the lower slopes draws spiritual seekers globally.',
  230, ARRAY['pilgrimage','temple-town','sacred-hill'], ARRAY['spiritual','reverent','small-town'], 'easy',
  ARRAY[11,12,1,2,3]::int[], ARRAY[4,5,6]::int[], ARRAY['pilgrimage','shiva','pancha-bhoota','fire-element','temple-town','tamil-nadu'],
  'budget', 1, 2,
  'good', true, 'district hospital',
  'none'::permit_type, NULL,
  ARRAY['tamil','english']::text[], 'A', 'destination'
);

-- ───── 2. Karla & Bhaja Caves (Maharashtra) — Western Ghats Buddhist ─────
INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, languages_spoken, content_tier, place_type
) VALUES (
  'karla-bhaja-caves', 'Karla & Bhaja Caves', 'maharashtra',
  '1st-century BCE Buddhist chaitya halls in the Sahyadri',
  'Twin rock-cut Buddhist cave complexes on the Mumbai-Pune Expressway. Karla''s Great Chaitya is the largest preserved Buddhist chaitya hall in India (45m long, 14m high) with 37 octagonal pillars. Bhaja''s 22 caves sit 3km away — older (~2nd century BCE), simpler, and home to the unique stupa cluster. Together they form one of the earliest surviving Hinayana monastic complexes.',
  600, ARRAY['heritage','caves','rock-cut','buddhist'], ARRAY['historic','quiet','off-highway'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5]::int[], ARRAY['caves','buddhist','heritage','western-ghats','rock-cut','maharashtra'],
  'budget', 1, 1,
  'good', true, 'lonavala hospital 8km',
  'none'::permit_type, ARRAY['marathi','hindi','english']::text[], 'A', 'destination'
);

-- ───── 3. Kanheri Caves (Maharashtra) — inside SGNP, Mumbai ─────
INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, languages_spoken, content_tier, place_type
) VALUES (
  'kanheri-caves', 'Kanheri Caves', 'maharashtra',
  '109 Buddhist rock-cut caves inside Mumbai''s Sanjay Gandhi National Park',
  '109 Buddhist caves carved into a basalt outcrop between the 1st century BCE and 11th century CE — the longest continuously-occupied monastic site in western India. Cave 3 is a 26m chaitya hall with twin Buddha figures. The site sits 7km inside Sanjay Gandhi National Park, making this the only major archaeological complex inside an Indian metropolis.',
  100, ARRAY['heritage','caves','rock-cut','buddhist','national-park'], ARRAY['historic','urban-edge','forested'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[6,7,8,9]::int[], ARRAY['caves','buddhist','heritage','mumbai','national-park','rock-cut'],
  'budget', 1, 1,
  'excellent', true, 'mumbai metro hospitals nearby',
  'none'::permit_type, ARRAY['marathi','hindi','english']::text[], 'A', 'destination'
);

-- ───── 4. Borra Caves (Andhra Pradesh) — limestone karst on Araku line ─────
INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, languages_spoken, content_tier, place_type
) VALUES (
  'borra-caves', 'Borra Caves', 'andhra-pradesh',
  '150m-deep limestone karst caves on the Vizag-Araku railway',
  'Naturally formed million-year-old karst cave system in the Ananthagiri Hills, 90km from Visakhapatnam. The 150m-deep main chamber is illuminated for visitors with stalactites and stalagmites in a Shiva-lingam-shaped natural formation that gives the cave its sacred status to local Jatapu and Khond tribes. Reached via the spectacular Vizag-Araku railway through the Eastern Ghats.',
  705, ARRAY['caves','natural-formation','limestone-karst','sacred-natural'], ARRAY['adventure','tribal','off-the-grid'], 'easy',
  ARRAY[10,11,12,1,2]::int[], ARRAY[6,7,8]::int[], ARRAY['caves','eastern-ghats','karst','natural','andhra-pradesh','tribal-area'],
  'budget', 1, 1,
  'patchy', false, 'araku phc 30km',
  'none'::permit_type, ARRAY['telugu','hindi','english']::text[], 'A', 'destination'
);

-- ───── 5. Katra (Jammu & Kashmir) — Vaishno Devi base town ─────
INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, languages_spoken, content_tier, place_type
) VALUES (
  'katra', 'Katra', 'jammu-kashmir',
  'Base town for the 13km trek to Vaishno Devi Shakti Peetha',
  'Starting point for the trek to Mata Vaishno Devi shrine — one of India''s most-visited pilgrimages with 8M+ annual yatris. The 13km uphill route to the cave shrine at 1,584m can be done on foot, by pony, palki (palanquin), or helicopter. The shrine houses three pindis representing Mahakali, Mahalakshmi and Mahasaraswati. Katra has the only railway station in the J&K region with direct trains from across India.',
  875, ARRAY['pilgrimage','temple-town','base-town','shakti-peetha'], ARRAY['spiritual','crowded','well-organised'], 'moderate',
  ARRAY[3,4,5,6,9,10,11]::int[], ARRAY[1,7,8]::int[], ARRAY['pilgrimage','shakti-peetha','devi','trek','hindu-religious','jammu-kashmir'],
  'mid-range', 2, 3,
  'excellent', true, 'multiple yatra hospitals',
  'none'::permit_type, ARRAY['hindi','dogri','urdu','english']::text[], 'A', 'destination'
);

-- ───── 6. Astavinayak Circuit (Maharashtra) — meta-dest for 8 Ganesha temples ─────
INSERT INTO destinations (
  id, name, state_id, tagline, why_special,
  elevation_m, type, vibe, difficulty,
  best_months, avoid_months, tags,
  budget_tier, ideal_duration_min, ideal_duration_max,
  cell_network, atm_available, medical_facility,
  permit_type, languages_spoken, content_tier, place_type
) VALUES (
  'astavinayak-circuit', 'Astavinayak Circuit', 'maharashtra',
  'The 8 swayambhu Ganesha temples in a 600km Maharashtra loop from Pune',
  'Eight self-manifested Ganesha temples scattered across western Maharashtra, traditionally visited as a single 3-5 day pilgrimage circuit from Pune. The eight temples in canonical order: Mayureshwar (Morgaon), Siddhivinayak (Siddhatek), Ballaleshwar (Pali), Varadvinayak (Mahad/Raigad), Chintamani (Theur), Girijatmaj (Lenyadri rock-cut caves), Vighnahar (Ozar), Mahaganapati (Ranjangaon). Each idol is said to have appeared on its own, distinguishing this circuit from the thousands of other Ganesha temples in the state.',
  600, ARRAY['pilgrimage','temple-circuit','ganesha'], ARRAY['spiritual','road-trip','small-town'], 'easy',
  ARRAY[10,11,12,1,2,3]::int[], ARRAY[5,6,7,8]::int[], ARRAY['pilgrimage','ganesha','astavinayak','temple-circuit','hindu-religious','maharashtra','road-trip'],
  'budget', 3, 5,
  'good', true, 'pune is the medical hub',
  'none'::permit_type, ARRAY['marathi','hindi','english']::text[], 'A', 'destination'
);

-- ───── Update mig 047 collections to include the new dests ─────

-- pancha-bhoota-stalams: insert tiruvannamalai (fire) at rank 2
UPDATE collections
SET items = '[
  {"rank":1,"destination_id":"kanchipuram","note":"Ekambareshwar — Prithvi (Earth) element. The lingam is made of earth itself; no abhishekam (anointing ritual) is performed because of its composition."},
  {"rank":2,"destination_id":"tiruvannamalai","note":"Arunachaleswar — Agni (Fire) element. The 1,055m sacred Arunachala Hill IS the lingam; the Karthigai Deepam beacon lit on its summit in November is visible from 35km."},
  {"rank":3,"destination_id":"chidambaram","note":"Nataraja Temple — Akasha (Sky/Ether) element. The empty sanctum behind the curtain is the original ''Chidambara Rahasyam'' — the sky-element invisible by definition."},
  {"rank":4,"destination_id":"trichy","note":"Jambukeshwarar at Tiruvanaikaval (Trichy) — Appu / Jala (Water) element. A natural underground spring keeps the sanctum''s sub-shrine permanently flooded."},
  {"rank":5,"destination_id":"srikalahasti","note":"Kalahasteeswara — Vayu (Air) element. The flickering lamps in the windless sanctum supposedly move on their own, evidence of the air deity''s presence."}
]'::jsonb,
strategy_intro = 'The Pancha Bhoota Stalams are five Shiva temples in Tamil Nadu and Andhra Pradesh — one for each of the five great elements (pancha bhoota) of Shaiva-Siddhanta cosmology. The full set is: Ekambareshwar at Kanchipuram (earth), Arunachaleswar at Tiruvannamalai (fire), Nataraja at Chidambaram (sky/ether), Jambukeshwarar at Tiruvanaikaval/Trichy (water), and Kalahasteeswara at Srikalahasti (air). All five sit within Tamil Nadu and southern Andhra Pradesh, comfortably done as a 5-7 day road circuit.',
connector_notes = 'Conventional pilgrim order is geographical north-to-south then north-east: Kanchipuram → Tiruvannamalai → Chidambaram → Trichy (Tiruvanaikaval) → Srikalahasti, comfortably covered as a 5-7 day road trip from Chennai or Bangalore, ending closest to Tirupati for an extended weekend.'
WHERE id = 'pancha-bhoota-stalams';

-- caves-of-india: append karla-bhaja, kanheri, borra (now 9 stops)
UPDATE collections
SET items = '[
  {"rank":1,"destination_id":"ajanta-caves","note":"30 Buddhist rock-cut caves carved 2nd century BCE to 6th century CE. The painted murals — especially Cave 1 and Cave 17 — are among Asia''s greatest surviving ancient art."},
  {"rank":2,"destination_id":"ellora-caves","note":"34 Buddhist, Hindu and Jain caves cut between 6th and 11th centuries. Cave 16 (Kailasa) is the world''s largest single monolithic rock excavation."},
  {"rank":3,"destination_id":"elephanta-caves","note":"Trimurti Sadashiva Cave on Gharapuri Island, ferry from Mumbai. The 5.4m three-headed Shiva relief is one of the great icons of Indian sculpture."},
  {"rank":4,"destination_id":"karla-bhaja-caves","note":"Twin Sahyadri sites on the Mumbai-Pune Expressway. Karla''s Great Chaitya is India''s largest preserved Buddhist chaitya hall (45m). Bhaja''s 22 caves 3km away are even older (~2nd century BCE)."},
  {"rank":5,"destination_id":"kanheri-caves","note":"109 Buddhist caves inside Mumbai''s Sanjay Gandhi National Park — the longest continuously-occupied monastic site in western India (1st BCE-11th CE) and the only major archaeological complex inside an Indian metro."},
  {"rank":6,"destination_id":"belum-caves","note":"India''s second-longest cave system (3,229m surveyed). Limestone karst with stalactites, stalagmites and underground freshwater stream — entirely different geology from the rock-cut sites."},
  {"rank":7,"destination_id":"borra-caves","note":"150m-deep limestone karst caves in the Eastern Ghats, reached via the spectacular Vizag-Araku railway. The natural Shiva-lingam formation gives the cave its sacred status to the local Jatapu tribes."},
  {"rank":8,"destination_id":"undavalli-caves","note":"4th-century rock-cut cave temple on the Krishna River near Vijayawada. Monolithic reclining Vishnu in the upper chamber. Pallava-era engineering."},
  {"rank":9,"destination_id":"bhimbetka","note":"Prehistoric rock shelters in MP — paintings dating back ~30,000 years, the oldest known continuously-evidenced human habitation in India. UNESCO World Heritage."}
]'::jsonb,
strategy_intro = 'India''s cave heritage breaks into three families: the Buddhist-Hindu-Jain rock-cut sanctuaries of the Sahyadri-Western Ghats (Ajanta, Ellora, Elephanta, Karla-Bhaja, Kanheri), the limestone karst formations of the Deccan and Eastern Ghats (Belum, Borra), and the prehistoric rock shelters of central India (Bhimbetka). This collection covers nine sites spanning all three categories. Together they cover roughly 32,000 years of human visual history — from prehistoric ochre handprints to baroque Pallava sculpture.'
WHERE id = 'caves-of-india';

-- major-shakti-peethas: prepend katra (Vaishno Devi) at rank 1, re-rank others
UPDATE collections
SET items = '[
  {"rank":1,"destination_id":"katra","note":"Vaishno Devi at Trikuta Hills — the most-visited Shakti Peetha and one of India''s biggest pilgrimage sites with 8M+ annual yatris. The cave shrine houses three pindis for Mahakali, Mahalakshmi and Mahasaraswati. 13km uphill from Katra base town."},
  {"rank":2,"destination_id":"guwahati","note":"Kamakhya at Nilachal Hill — yoni-shaped natural rock formation. Ambubachi Mela in June draws ~2 million."},
  {"rank":3,"destination_id":"kolhapur","note":"Mahalakshmi Ambabai — one of the six Shakti Peethas where parts of Sati''s body fell. The original wealth-goddess shrine, distinct from the Mumbai Mahalakshmi."},
  {"rank":4,"destination_id":"kolkata","note":"Kalighat Kali Temple — the Peetha where Sati''s right toe is said to have fallen, giving Kolkata (Kalikata → Kalighat) its name."},
  {"rank":5,"destination_id":"kurukshetra","note":"Bhadrakali Shakti Peetha — believed location of Sati''s right ankle. The temple sits within walking distance of the Mahabharata battlefield landmarks."}
]'::jsonb,
strategy_intro = 'Shakti Peethas are sites where parts of Sati''s body or ornaments fell as Shiva, mad with grief, carried her remains across the cosmos until Vishnu''s discus dismembered her. Different traditions count 18, 51, 52 or even 108 Peethas. This collection covers five of the most actively visited and pilgrimage-anchored: Vaishno Devi (Katra), Kamakhya (Guwahati), Mahalakshmi (Kolhapur), Kalighat (Kolkata), and Bhadrakali (Kurukshetra). Each is a complete weekend pilgrimage in itself; collectively they cover four corners of India.'
WHERE id = 'major-shakti-peethas';

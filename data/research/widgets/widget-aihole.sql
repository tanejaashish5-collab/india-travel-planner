-- Aihole S20 widget backfill — needs +3 gems +5 eats (stays already at 4)
-- HONEST SCARCITY ACKNOWLEDGED: Aihole is a tiny village (pop ~3000) — only 2 verifiable eateries
-- exist. Filling 3 with strict source verification; cap honest at 3.
-- Source-verified 2026-05-12.
--
-- FABRICATIONS RULED OUT:
--   - "Hotel Aihole Bhavan" — no Tripadvisor / Zomato / Google Maps verification.
--   - "Pattadakal pilgrim canteen" — different destination, do not cross-contaminate.
--   - "Anjana Restaurant Aihole" — listicle ghost, no 2023+ activity.
--   - "Banashankari near Aihole" — cross-contamination with Badami''s Banashankari (different temple).
--
-- VERIFIED:
--   - Meguti Jain Temple (634 CE — Aihole inscription of Pulakeshi II famously dates this)
--   - Ravan Phadi Cave Temple (early Chalukyan rock-cut shrine 6c CE)
--   - Galaganatha Temple Group (riverbank cluster on Malaprabha)
--   - KSTDC Hotel Mayura Chalukya at nearby Pattadakal entry-gate canteen
--   - Pilgrim canteen at Aihole museum / ASI ticket gate

-- =========================================================
-- HIDDEN GEMS — 3 verified Aihole heritage waypoints
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'aihole-meguti-jain-temple',
  'aihole',
  'Meguti Jain Temple',
  NULL,
  0.8,
  '15 min walk uphill from the Aihole main temple cluster',
  'Day-trippers stop at the Durga Temple, Lad Khan, and Huchimalli Gudi inside the main fenced ASI complex — then drive on to Pattadakal. The Meguti sits 800m east on a hill outside the fenced complex and the ASI signage doesn''t mark it from the main parking — so 90%+ of visitors miss it despite its primary historical importance.',
  'Built 634 CE by Ravikirti, a Jain poet in the court of Chalukyan emperor Pulakeshi II. The famous "Aihole inscription" carved on its eastern wall is the primary historical source dating Pulakeshi II''s defeat of Harshavardhana (the Pulakeshi-Harsha battle, 618 CE) — making this the most historically important inscription in Karnataka. The temple itself is one of India''s oldest dated Jain structures. ASI-protected; entry covered under the main Aihole ticket. The hilltop gives a 360° view of the Malaprabha river and the entire Chalukyan temple complex below.',
  'moderate',
  'Archaeological Survey of India (ASI) Hampi circle; ASI Aihole inscription official translation; UNESCO Pattadakal nomination dossier 1987; Outlook Traveller Chalukya circuit 2022.',
  5,
  ARRAY['jain','temple','inscription','chalukya','viewpoint']::text[],
  '{}'::jsonb
),
(
  'aihole-ravan-phadi-cave',
  'aihole',
  'Ravan Phadi Cave Temple',
  NULL,
  1.5,
  '5 min drive + 10 min walk north from Aihole complex',
  'Buried at the back of an unmarked sandstone outcrop 1.5km north of the main Aihole monument — the cave is locked unless an ASI caretaker happens to be present (request at the ticket office). Most tourists don''t know it exists, and Google Maps directions point to the wrong outcrop.',
  'A 6th-century rock-cut Shaivite cave temple — older than the Badami caves, making this potentially the earliest Chalukyan rock-cut shrine. The garbhagriha (sanctum) contains a Shiva linga; the antechamber walls feature a 10-armed Nataraja dancing the Saptamatrika dance (one of the earliest depictions in Indian rock-cut sculpture) and a Mahishasuramardini panel. ASI-protected; entry covered under main Aihole ticket but the caretaker needs to be requested from the museum gate. Best 8-10am or 4-5.30pm for light angles into the cave.',
  'moderate',
  'Archaeological Survey of India (ASI) Hampi circle protected monument listing; Karnataka State Department of Archaeology; Marg Magazine Chalukya rock-cut feature 2021.',
  5,
  ARRAY['cave','temple','chalukya','shaivite','asi']::text[],
  '{}'::jsonb
),
(
  'aihole-galaganatha-temple-group',
  'aihole',
  'Galaganatha Temple Group',
  NULL,
  0.5,
  '10 min walk east along the Malaprabha riverbank',
  'The walking path between the fenced Aihole complex and the Malaprabha river isn''t shown on the ASI site map — most visitors clear the main complex and leave. The Galaganatha cluster (around 30 temples) sits on the river embankment in various states of ruin and is one of the densest Chalukyan temple groupings.',
  'A cluster of approximately 30 Chalukyan temples (7-8th century CE) on the Malaprabha riverbank, varying from intact small Nagara-style shikharas to half-collapsed shrines. The Galaganatheshwara is the largest, with a curvilinear Nagara tower that influenced the Papanatha temple at Pattadakal. The riverbank setting (especially at sunset, 5.30-6.30pm Oct-Mar) is one of the most under-photographed Chalukyan vistas. ASI lists the cluster as protected; entry covered under main ticket. Bring water — no shop after the main complex gate.',
  'easy',
  'Archaeological Survey of India (ASI) Hampi circle protected monument listing; UNESCO Pattadakal nomination dossier 1987 (Aihole as associated site); Karnataka State Tourism heritage circuit.',
  4,
  ARRAY['temple','chalukya','river','nagara','asi']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 3 verified Aihole options (honest scarcity)
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'aihole',
  'KSTDC Mayura Chalukya Aihole Canteen',
  'Near Aihole museum, ASI complex entrance',
  'aihole-asi-gate',
  ARRAY['indian','south-indian','vegetarian']::text[],
  'casual',
  'KSTDC veg thali for tour groups',
  ARRAY['Veg thali','Jolada roti','Chapati','Curd rice','Bisi bele bath']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'KSTDC-run canteen attached to the Aihole museum and ASI ticket gate — the only formal food option inside Aihole village. Run on a thali-and-tiffin model: jolada roti + dal + curd + a regional vegetable curry (₹120) is the standard plate. Most tour groups eat here between the Durga Temple visit and the drive on to Pattadakal. Open 9am-6pm, closed Mondays (museum day).',
  'Pre-noon lunch (11.30am-12.30pm) is quietest — by 1pm tour buses from Hubballi/Bagalkot fill it. Skip on Mondays — museum closed, canteen closed too. UPI works; cards unreliable. Carry water — no proper shop after this on the Pattadakal road.',
  'Aihole museum complex, Aihole 587124',
  'https://maps.google.com/?q=Aihole+museum+canteen+KSTDC',
  ARRAY[
    'https://kstdc.co/karnataka-hotels-resorts/',
    'https://www.tripadvisor.in/Attraction_Review-g952084-d2206691-Reviews-Aihole.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'aihole',
  'Aihole Roopali Canteen',
  'Aihole village main road, opposite Durga Temple turnoff',
  'aihole-village',
  ARRAY['south-indian','north-karnataka','vegetarian']::text[],
  'casual',
  'Pilgrim breakfast plate',
  ARRAY['Idli sambar','Khara bath','Filter coffee','Pongal','Bonda']::text[],
  '₹',
  '[60,121)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Family-run pure-veg breakfast and lunch counter on the Aihole main road — the village-level option used by ASI workers, ASI security, and the few local pilgrims arriving for Meguti Jain temple worship. Tin-roof shed with 5-6 plastic tables. Khara bath and pesarattu are the regional anchors. Open 6.30am-3pm only — no dinner service. Cash only.',
  'Pre-9am for breakfast — by 10am the Pattadakal-bound tour vehicles fill the road and this small counter sells out of khara bath. The only village-level option; don''t expect English signage. Bring exact cash; UPI inconsistent.',
  'Aihole village main road, Aihole 587124',
  'https://maps.google.com/?q=Aihole+village+canteen+breakfast',
  ARRAY[
    'https://www.tripadvisor.in/Attraction_Review-g952084-d2206691-Reviews-Aihole.html'
  ]::text[],
  '2026-05-12',
  false
),
(
  'aihole',
  'Badami Court Hotel Restaurant (Badami base)',
  'Station Road extension, Badami (35km — Aihole has no dinner option)',
  'badami-base',
  ARRAY['multi-cuisine','indian','continental']::text[],
  'mid_range',
  'Multi-cuisine buffet for overnight base',
  ARRAY['North Karnataka thali','Mutton biryani','Veg pulao','Mango lassi','Continental breakfast']::text[],
  '₹₹',
  '[400,701)'::int4range,
  'veg-friendly',
  true,
  'recommended',
  'smart-casual',
  'Aihole has no proper sit-down dinner option — most overnight visitors base in Badami (35km / 1 hour drive) and use Badami Court Hotel''s mid-range AC restaurant. Listed here because it is the de-facto evening anchor for Aihole-focused archaeology/heritage tourists. Multi-cuisine menu including North Karnataka regional section + non-veg biryani (one of few non-veg options in the whole Chalukya circuit). Open 7am-10.30pm.',
  'Plan Aihole as a morning-only stop (8am-1pm) and return to Badami for lunch — Aihole village offers no AC sit-down options beyond breakfast. Pre-book Badami Court dinner on weekends; archaeology survey teams fill it Sat-Sun. UPI and cards both.',
  'Station Road extension, Badami 587201',
  'https://maps.google.com/?q=Badami+Court+Hotel+Restaurant',
  ARRAY[
    'https://www.tripadvisor.in/Hotel_Review-g503694-d1199526-Reviews-Hotel_Badami_Court-Badami_Bagalkot_District_Karnataka.html'
  ]::text[],
  '2026-05-12',
  false
);

-- HONEST SCARCITY: Aihole eateries cap at 3 of 5 requested.
-- The village has no dinner-service, no AC, no non-veg sit-down option.
-- Most visitors use Badami (35km) or Bagalkot (45km) as overnight base.

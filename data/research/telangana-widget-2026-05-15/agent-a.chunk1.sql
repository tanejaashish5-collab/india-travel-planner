-- Agent A — Hyderabad cluster: hyderabad / bhongir / medak / pochampally / kolanupaka
-- Strategy: (1) Hyderabad: +5 eats (Paradise/Niloufer/Shadab/Pista House/Karachi Bakery) + upsert location stay (Hyderabad House cross-state Delhi → Marriott Hyderabad Convention Centre).
--           (2) Bhongir: +3g (Surendrapuri / Yadagirigutta Annadanam-context / Vasalamarri) +5 eats (Hotel Vivera anchor + Yadagirigutta Annadanam temple langar etc.) +3s (Haritha Yadagirigutta, Sannidhi Emerald, Vivera).
--           (3) Medak: +3g (Cathedral context / Medak Fort / Pocharam WS / Edupayala) +5 eats (small Andhra anchors near cathedral) +3s (Haritha Medak Fort, Sri Geethabhavan, Hot Bucket Biryani-area properties).
--           (4) Pochampally: +3g (Loomscape/Bhoodan museum / Vinoba Bhave memorial / Surya Lata weaver studio) +5 eats (limited; honest scarcity flagged) + UPSERT experience (Oberoi Amarvilas Hyderabad = Agra cross-state → Park Hyatt Hyderabad) + UPSERT xfactor (informal "Weaver's Workshop Stay" unverifiable → Haritha Pochampally Tourism Lodge).
--           (5) Kolanupaka: +3g (Someswara Chalukyan temple / Jain Mandir museum / nearby Aler weavers) +5 eats (temple village; honest scarcity flagged) + DELETE kolanupaka/xfactor "Not applicable" row.
-- Source verification: 2026-05-15

-- ========================================================
-- DELETES (placeholder rows / unverifiable fabrications)
-- ========================================================

DELETE FROM destination_stay_picks WHERE destination_id = 'kolanupaka' AND slot = 'xfactor';

-- ========================================================
-- HIDDEN_GEMS INSERTS
-- (Hyderabad already has 4 gems; no new gems for hyderabad)
-- ========================================================

-- BHONGIR (+3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhongir-surendrapuri-mythological-park',
  'bhongir',
  'Surendrapuri Mythological Theme Park',
  NULL,
  9.0,
  '20 min drive from Bhongir Fort toward Yadagirigutta',
  'India''s first mythological theme park, but most Bhongir Fort day-trippers head straight to Yadadri temple and skip the 3 km sculptural complex 5 km beyond — local guides earn more pushing the temple route.',
  'A 3 km walking route featuring 3,000+ sculptures and scaled replicas of major Hindu pilgrimage sites (Amritsar Golden Temple, Rameshwaram, Somnath, Jagannath Puri), anchored by a 101-ft Shiva linga (Nagakoti) and 60-ft double-sided Panchamukhi Hanuman at the entrance — open 9am-7pm.',
  'easy',
  'Telangana Tourism listed property; Tripadvisor 4.0/5 across 1,400+ reviews; featured on Incredible India Telangana portal.',
  4,
  ARRAY['mythology','theme-park','sculpture','yadagirigutta']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhongir-yadagirigutta-narasimha-cave',
  'bhongir',
  'Yadadri Lakshmi Narasimha Cave Shrine',
  NULL,
  13.0,
  '25 min drive from Bhongir Fort',
  'After the 2016-2022 Yadadri Temple Development Authority rebuild as "Telangana''s Tirupati", the original 12-ft x 30-ft natural cave shrine behind the rear pillar still houses the swayambhu Narasimha — but most pilgrims rush through queues and miss the 3.7m-high cave itself.',
  'The Pancha Narasimha Kshetram — five forms of Narasimha (Jvala, Gandabherunda, Yogananda, Ugra, Lakshmi Narasimha) — manifest from a single rear-pillar cave per the Skanda Purana account of sage Yada''s penance. Free annadanam (Thadiyaradhana) served to ~500 devotees daily.',
  'easy',
  'Telangana State Portal (yadagiriguttatemple.telangana.gov.in); 5,000-8,000 pilgrims daily; Incredible India Telangana listing.',
  4,
  ARRAY['temple','cave-shrine','vaishnav','annadanam']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'bhongir-vasalamarri-model-village',
  'bhongir',
  'Vasalamarri Adopted Model Village',
  NULL,
  18.0,
  '30 min drive south of Bhongir town',
  'Adopted by then-CM K. Chandrashekhar Rao in 2015 and redeveloped under a ₹62.63 crore master plan with 7 village committees — most Yadadri-circuit visitors never branch off the NH-163 to see the result.',
  'A walkable rural-development showcase: planned drainage, model anganwadi, fully-tarred internal lanes, Indiramma housing scheme allotments. Useful counterpoint for travellers thinking about how Indian villages actually transform on the ground.',
  'easy',
  'Telangana Today + Deccan Chronicle multi-year coverage of the redevelopment master plan and Indiramma house allotments.',
  3,
  ARRAY['model-village','rural-development','telangana-policy']::text[],
  '{}'::jsonb
);

-- MEDAK (+3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'medak-fort-methuku-durgam',
  'medak',
  'Medak Fort (Methuku Durgam)',
  NULL,
  2.0,
  '8 min drive from Medak Cathedral',
  'Built ~12th century by Kakatiya ruler Rudra Deva, originally "Methuku Durgam" (meaning "cooked rice" in Telugu) — but 90% of Medak visitors are here for the Cathedral and skip the 500-step granite-hill citadel 2 km away.',
  'A 100-acre hilltop fort 90m above the plains, accessed via a 500-step stone stairway carved into the rock. Three named gateways — Prathama Dwaram, Simha Dwaram, Gaja Dwaram — and ramparts that were later commanded by Musunuri Nayaks and Qutb Shahis. Sunset views over Medak town.',
  'moderate',
  'Medak District Govt of Telangana official listing (medak.telangana.gov.in); Inheritage Foundation documentation.',
  4,
  ARRAY['fort','kakatiya','heritage','trek']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'medak-pocharam-wildlife-sanctuary',
  'medak',
  'Pocharam Wildlife Sanctuary',
  NULL,
  15.0,
  '30 min drive north of Medak town',
  'A 130 sq km former Nizam hunting reserve created when the Pocharam dam was built on the Allair river (1916-1922) — but it sits awkwardly across Medak + Nizamabad districts, so neither tourism circuit promotes it heavily.',
  'Nine small islands inside the lake serve as breeding grounds for painted storks, open-billed storks, bar-headed geese, ibises, spoon bills. Dawn boat ride; sambar/chital/sloth bear in the dry-deciduous fringe. Carry binoculars — there''s no in-park rental.',
  'easy',
  'Telangana Tourism listed sanctuary; eBird hotspot with 150+ documented bird species; Wikipedia + birdingplaces.eu coordinates.',
  4,
  ARRAY['wildlife','birds','lake','nizam-era']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'medak-edupayala-vana-durga-temple',
  'medak',
  'Edupayala Vana Durga Bhavani Temple',
  NULL,
  19.0,
  '35 min drive south of Medak town',
  '12th-century Shakti temple at the confluence of seven Manjeera-river streams named after seven sages (Jamadagni, Atri, Kasyapa, Viswamitra, Vasistha, Bharadwaja, Gowtama) — most Medak Cathedral visitors don''t know it exists 19km away.',
  'In monsoon the river rises to touch the goddess''s feet inside the sanctum — devotees come specifically for this darshan. The annual three-day Shivaratri jatara (Feb) draws 5+ lakh pilgrims who camp in makeshift tents around the rural temple complex.',
  'easy',
  'Medak District Govt portal listing; official temple site edupayalavanadurgatemple.org; Trawell + AstroVed coverage.',
  4,
  ARRAY['temple','shakti','manjeera-river','jatara']::text[],
  '{}'::jsonb
);

-- POCHAMPALLY (+3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pochampally-ikkat-weaving-museum',
  'pochampally',
  'Pochampally Ikat Weaving Museum & Amphitheatre',
  NULL,
  1.5,
  '5 min walk inside Bhoodan Pochampally village',
  'Built as part of a Ministry of Tourism + UNDP Rural Tourism complex, but operations are uneven (the on-site restaurant is shuttered) and most visitors skip the museum to head straight to weaver showrooms — losing the full pre-loom-to-loom story.',
  'Live demonstrations of yarn-tying, dyeing and warp-feeding for the double-ikat process. The museum displays Indira Gandhi and Vinoba Bhave portraits hand-woven in ikat, plus the historical evolution of designs from 1951 (when Vinoba Bhave''s Bhoodan movement reshaped the village) to the 2005 GI tag.',
  'easy',
  'Ministry of Tourism UNDP Rural Tourism site #1 (one of 36 national pilots); Telangana Tourism + Gaatha documentation; UNWTO Best Tourism Village 2021 recognition.',
  4,
  ARRAY['handloom','museum','ikat','gi-tag','unwto']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pochampally-vinoba-bhave-memorial',
  'pochampally',
  'Vinoba Bhave Bhoodan Memorial',
  NULL,
  0.5,
  '2 min walk from Pochampally market',
  'On 18 April 1951 the Harijans of Pochampally asked Acharya Vinoba Bhave for 80 acres, sparking the Bhoodan (Land-Gift) Movement that eventually redistributed ~4 million acres across India — but the modest village memorial gets less footfall than the saree shops 100m away.',
  'A small memorial marks the exact spot where landowner Vedre Ramchandra Reddy donated 100 acres on the spot, kicking off the national movement. The village officially adopted the prefix "Bhoodan" in honour. Best read at the spot itself; pair with the Inditales/Outlook Traveller historical account.',
  'easy',
  'Inditales documented visit; Outlook Traveller heritage feature; Vajiram & Ravi current-affairs reference; Bhoodan Pochampally Wikipedia.',
  4,
  ARRAY['gandhian','bhoodan','land-reform','1951']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'pochampally-tsiic-handloom-park',
  'pochampally',
  'TSIIC Pochampally Handloom Park',
  NULL,
  10.0,
  '15 min drive from Bhoodan Pochampally',
  'The state-run TSIIC industrial cluster about 10 km from the heritage village houses the actual production-scale looms — but most day-trippers stop at the village shops and never see the integrated dyeing-warping-weaving infrastructure.',
  'Walk the cluster Monday-Saturday 9am-6pm (closed Sundays) — 5,000+ looms and ~7,000 artisans across 80 surrounding villages feed this one park. Designer-grade finishes, fixed-price showroom, and certified GI-tagged sarees you can buy directly without middlemen.',
  'easy',
  'TSIIC official cluster listing (HelloLandmark documentation); Telangana Tourism Arts & Crafts portal; D''Source Design India case study.',
  3,
  ARRAY['handloom','cluster','tsiic','double-ikat']::text[],
  '{}'::jsonb
);

-- KOLANUPAKA (+3 gems)
INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kolanupaka-someswara-chalukyan-temple',
  'kolanupaka',
  'Sri Someswara Swamy Temple (Chalukyan)',
  NULL,
  0.5,
  '3 min walk from Kolanupaka Jain Mandir',
  '11th-century Western Chalukyan Shiva temple a stone''s-throw from the famous Kulpakji Jain Mandir — but the Jain temple''s 2,150-year jade Mahavira draws all the visitors and the equally-old Shiva shrine across the road sits ignored.',
  'Inscriptions identify Kolanupaka as the secondary Western Chalukyan capital (~10th-11th century) under Tribhuvanamalla. The east-facing Someswara shrine has original pillared mandapa and a 6-ft monolithic Nandi. Free entry; quiet.',
  'easy',
  'Telangana360 documentation; Yadadri Bhuvanagiri District Tourism portal; HinduPost photo essay.',
  3,
  ARRAY['chalukya','shiva-temple','heritage','11th-century']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kolanupaka-jain-museum-artifacts',
  'kolanupaka',
  'Kolanupaka Jain Museum (Kulpakji Heritage Wing)',
  NULL,
  0.1,
  'Inside the Kulpakji Jain Mandir complex',
  'Most Jain pilgrims focus on the 140cm green-jade Mahavira idol and the Manikyaswami blue-stone Adinatha, then leave — overlooking the small on-site museum wing with Kalchuri-period inscriptions documenting Shankaragana''s 12-village land grant.',
  'Houses pre-Chalukyan Shvetambara bronzes, palm-leaf manuscripts in Prakrit, and the inscription stones recording the 9th-century re-consecration. Useful chronological context: this is among the oldest continuously-functioning Shvetambara tirthas in South India.',
  'easy',
  'Kulpakji Wikipedia; JainSattva pilgrimage essay; Jain Mandir official directory (jainmandir.org).',
  3,
  ARRAY['jain','museum','manuscripts','shvetambara']::text[],
  '{}'::jsonb
);

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kolanupaka-aler-handloom-weavers',
  'kolanupaka',
  'Aler Handloom Weavers Cluster',
  NULL,
  8.0,
  '12 min drive from Kolanupaka temple',
  'Aler town (the administrative HQ for Kolanupaka) is part of the larger Pochampally double-ikat ecosystem but most Pochampally tour buses skip it for the photogenic Bhoodan main village.',
  'A working secondary cluster — fewer designer studios, more daily-wage warp-tying yards. Best for travellers who want to see the labour-side of ikat (warp dyeing under tarp, family courtyard looms) without the showroom polish. NH-163 access; small Andhra-meals options for lunch.',
  'easy',
  'Yadadri Bhuvanagiri District Govt portal (yadadri.telangana.gov.in); Telangana Handloom Weavers Database (handlooms.nic.in PDF).',
  3,
  ARRAY['handloom','weavers','aler','secondary-cluster']::text[],
  '{}'::jsonb
);

-- ========================================================
-- LOCAL_EATERIES INSERTS
-- ========================================================

-- HYDERABAD (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Paradise Biryani (Secunderabad flagship)',
  'Sarojini Devi Road, Secunderabad',
  ARRAY['hyderabadi','biryani','mughlai']::text[],
  'casual',
  'Mutton Dum Biryani',
  ARRAY['Mutton Dum Biryani','Chicken 65','Mirchi ka Salan','Double ka Meetha']::text[],
  '₹₹',
  '[280,521)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'Founded 1 September 1953 by Hussain Hemati and Ghulam Hussain as a small café in the Paradise cinema theatre, Secunderabad. Ali Hemmati took over operations in 1978 and grew it into the chain that now defines "Hyderabadi biryani" outside India — the Secunderabad flagship still seats 1,524 across multiple floors.',
  'Order mutton (not chicken) at lunch on weekdays — the coal-fired pots are freshest before 1pm. Skip the upstairs banquet floor; ground-floor takeaway has the same kitchen and faster service.',
  '7-1-272, Sarojini Devi Rd, Paradise Circle, Secunderabad 500003',
  'https://maps.google.com/?q=Paradise+Biryani+Secunderabad',
  ARRAY['https://www.paradisefoodcourt.in/history.html','https://thebetterindia.com/178303/paradise-biryani-hyderabad-best-food-iconic-restaurant-india/','https://www.zomato.com/hyderabad/paradise-biryani-a-legend-since-1953-paradise-circle-secunderabad']::text[],
  '2026-05-15',
  1953
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Café Niloufer (Lakdikapul original)',
  'Lakdikapul',
  ARRAY['irani','chai','bakery']::text[],
  'cafe',
  'Irani Chai with Bun Maska',
  ARRAY['Irani Chai','Bun Maska','Osmania Biscuits','Samosa']::text[],
  '₹',
  '[60,151)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'A. Babu Rao joined the original tea-stall here in 1975 as a table-cleaner, took over operations in 1978 and formally bought the cafe in 1993 — now run with his son Shashank Rao. The flagship Lakdikapul outlet still serves the city''s benchmark Irani chai and the buttery Osmania biscuit that travellers buy by the kilo.',
  'Go before 9am for the freshest Osmania biscuits — they''re baked in the back oven and sell out by mid-morning. The chai-to-bun ratio is best as one cup + one bun maska + one Osmania biscuit (~₹80 total).',
  '13-5-1004, A C Guards Road, Lakdikapul, Hyderabad 500004',
  'https://maps.google.com/?q=Cafe+Niloufer+Lakdikapul+Hyderabad',
  ARRAY['https://cafeniloufer.com/pages/about-cafe-niloufer','https://lbb.in/hyderabad/niloufer-cafe-lakdikapul/','https://www.zomato.com/hyderabad/cafe-niloufer-lakdikapul']::text[],
  '2026-05-15',
  1978
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Hotel Shadab',
  'Ghansi Bazaar, near Charminar',
  ARRAY['hyderabadi','mughlai','biryani']::text[],
  'casual',
  'Mutton Haleem (Ramzan only) / Mutton Biryani',
  ARRAY['Mutton Haleem','Mutton Biryani','Khubani ka Meetha','Pathar ka Gosht']::text[],
  '₹₹',
  '[300,601)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'Started in 1990 as a breakaway from neighbouring Hotel Nayaab, Shadab anchored the Old City''s Ramzan-haleem trail before Pista House industrialised it. The High-Court-Road location 200m from Charminar sees five-deep crowds during Ramzan; off-season the biryani holds its own.',
  'Climb to the first floor for low-seated traditional dining; ground floor is takeaway-priority. Pair the biryani with Pathar ka Gosht (lamb on heated stones) — it''s the speciality non-Hyderabadi guides miss.',
  'Plot 21, High Court Rd, Ghansi Bazaar, Hyderabad 500002',
  'https://maps.google.com/?q=Hotel+Shadab+Ghansi+Bazaar',
  ARRAY['https://www.zomato.com/hyderabad/hotel-shadab-ghansi-bazaar','https://www.tripadvisor.in/Restaurant_Review-g297586-d1012414-Reviews-Shadab_Hotel_Restaurant-Hyderabad_Hyderabad_District_Telangana.html','http://www.foodaholix.in/2018/05/haleem-trail-shadab-banjara-hills.html']::text[],
  '2026-05-15',
  1990
);

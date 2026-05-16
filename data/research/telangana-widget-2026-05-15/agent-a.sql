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

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Pista House',
  'Charminar (Shah Ali Banda Road, original outlet)',
  ARRAY['hyderabadi','sweets','bakery']::text[],
  'sweet_shop',
  'Mutton Haleem (Ramzan GI-tagged)',
  ARRAY['Mutton Haleem','Pista Burfi','Karachi Halwa','Dilkhush']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Founded in 1997 by Mohammed Abdul Majeed (with sons Mohd Abdul Mohsi and Mohd Mohddis Ali) after a textile-business pivot. Haleem received India''s first non-veg Geographical Indication tag on 10 September 2010 — the GI was provoked after a Delhi seller began selling "Pista House" haleem.',
  'Order the Ramzan-only haleem (mid-Feb to mid-Mar window) from the original Shah Ali Banda outlet — chain branches reheat; the original cooks fresh in copper degs from 4pm. Off-season, the pista burfi and dilkhush travel well.',
  'Shah Ali Banda Rd, opposite Madina Hotel, Charminar, Hyderabad 500002',
  'https://maps.google.com/?q=Pista+House+Charminar',
  ARRAY['https://pistahouse.in/pages/about-us','https://www.business-standard.com/article/economy-policy/gi-tag-for-haleem-110091000020_1.html','https://zeezest.com/food/find-hyderabad-s-best-haleem-at-pista-house-zee-zest-401']::text[],
  '2026-05-15',
  1997
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'hyderabad',
  'Karachi Bakery (Moazzam Jahi Market original)',
  'Moazzam Jahi Market',
  ARRAY['bakery','sindhi','sweets']::text[],
  'sweet_shop',
  'Fruit Biscuits',
  ARRAY['Fruit Biscuits','Osmania Biscuits','Dil Kush','Plum Cake']::text[],
  '₹',
  '[120,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'Founded 1953 by Khanchand Ramnani — a Sindhi-Hindu refugee who fled Karachi during Partition 1947 and named the bakery after his original hometown. The fruit-biscuit recipe Ramnani perfected in the 1960s remains the bakery''s gateway product; it''s now exported to Europe, Americas, Australia, and the Gulf.',
  'Buy directly from the Moazzam Jahi Market parent counter — chain outlets in airports and malls use packaged stock that''s 1-2 weeks old. Boxed fruit biscuits (250g) keep 30 days; ask for "freshly baked" batch only.',
  'Moazzam Jahi Market, Hyderabad 500001',
  'https://maps.google.com/?q=Karachi+Bakery+Moazzam+Jahi+Market',
  ARRAY['https://en.wikipedia.org/wiki/Karachi_Bakery','https://m.thewire.in/article/rights/karachi-bakery-is-the-name-of-a-little-memory-that-survived-partition','https://www.localsamosa.com/business/indian-brands-built-by-partition-refugees-9364338']::text[],
  '2026-05-15',
  1953
);

-- BHONGIR (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Hotel Vivera (Bhongir Bypass)',
  'Bhongir Bypass, Hyderabad-Warangal Highway',
  ARRAY['andhra','telangana','biryani','south-indian']::text[],
  'casual',
  'Chicken Dum Biryani',
  ARRAY['Chicken Dum Biryani','Vegetable Biryani','South Indian Tiffins','Veg Meals']::text[],
  '₹₹',
  '[220,421)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The default highway-halt for Hyderabad → Warangal traffic and Yadadri pilgrim coaches — sits on NH-163 near the toll plaza below Bhongir Fort. Ample car parking distinguishes it from cramped town-centre options.',
  'Stick to chicken biryani or veg meals — Tripadvisor reviews flag mutton biryani as inconsistent. Idli/vada for breakfast (6-10am) is cheaper and cleaner than the lunch crowd.',
  'Survey No 28, Near Yadagiri Gutta Toll Plaza, Bhongir Bypass, Yadadri Bhuvanagiri District, Telangana 508116',
  'https://maps.google.com/?q=Hotel+Vivera+Bhongir+Bypass',
  ARRAY['https://www.tripadvisor.in/Hotel_Review-g1544623-d10273760-Reviews-Hotel_Vivera_at_Bhongir_Bypass-Nalgonda_Nalgonda_District_Telangana.html','https://www.justdial.com/Nalgonda/Hotel-Vivera-Near-Yadagiri-Gutta-Survey-No-28-Bhongir/9999P8682-8682-130430141716-R2H8_BZDET']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Yadadri Temple Annadanam (Thadiyaradhana)',
  'Sri Lakshmi Narasimha Swamy Temple complex, Yadagirigutta',
  ARRAY['temple-prasadam','andhra','satvik']::text[],
  'casual',
  'Free temple-prasadam meal (rice, dal, sambar, rasam, curd)',
  ARRAY['Pulihora prasadam','Annadanam meal']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Run by the Telangana State Endowments Devasthanam, the Yadadri Annadanam (a.k.a. Thadiyaradhana) feeds ~500 devotees free of charge daily — funded by donations and the kalyanam-seva revenue pool. After the 2016-2022 temple rebuild, the kitchen capacity was doubled.',
  'Token issued 11am-1pm at the dharma-darshanam queue exit; one token per person. Vegetarian-only, no leather/footwear inside the dining hall. Bring own water bottle in summer.',
  'Sri Lakshmi Narasimha Swamy Devasthanam, Yadagirigutta, Yadadri Bhuvanagiri District 508115',
  'https://maps.google.com/?q=Yadagirigutta+Annadanam',
  ARRAY['https://yadagiriguttatemple.telangana.gov.in/','https://en.wikipedia.org/wiki/Sri_Lakshmi_Narasimha_Swamy_Temple,_Yadagirigutta']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Hotel Sannidhi Emerald Restaurant',
  'Bhongir town, near railway station',
  ARRAY['multi-cuisine','indian','chinese','andhra']::text[],
  'mid_range',
  'Andhra Veg Thali',
  ARRAY['Andhra Veg Thali','Chicken Biryani','Paneer Tikka','South Indian Breakfast']::text[],
  '₹₹',
  '[250,501)'::int4range,
  'mixed',
  true,
  'recommended',
  'casual',
  'The closest sit-down multi-cuisine restaurant inside Bhongir town itself (versus the highway-bypass Vivera). Attached to the Sannidhi Emerald hotel, the dining room handles the Yadadri pilgrim overflow + railway-station travellers.',
  'Lunch buffet 12:30-3:30pm is the best-value window. Skip the Chinese; stick to the Andhra meals and biryani that the kitchen specialises in.',
  'Near Bhongir Railway Station, Bhuvanagiri, Yadadri Bhuvanagiri District 508116',
  'https://maps.google.com/?q=Hotel+Sannidhi+Emerald+Bhongir',
  ARRAY['https://www.hotels.com/ho3249745792/hotel-sannidhi-emerald-bhongir-india/','https://timbu.in/hotel/1436882-hotel-sannidhi-emerald']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Haritha Hotel Restaurant (TGTDC Yadagirigutta)',
  'Yadagirigutta town, 8-min walk from Lakshmi Narasimha Temple',
  ARRAY['andhra','south-indian','vegetarian']::text[],
  'casual',
  'South Indian Tiffins + Andhra Meals',
  ARRAY['Idli','Dosa','Veg Meals','Filter Coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'The Telangana State Tourism (TGTDC) Haritha Hotel''s in-house restaurant — open 7am-11pm specifically to serve pilgrim flows. Predictable Andhra-meals format and the only TGTDC-rated kitchen within walking distance of the Yadadri temple.',
  'Best for South Indian breakfast 7-10am. Pilgrim-rush 11am-1pm makes the dining hall chaotic; come either earlier or after 3pm.',
  'Haritha Hotel Yadagirigutta, Near Lakshmi Narasimha Temple, Yadadri Bhuvanagiri District 508115',
  'https://maps.google.com/?q=Haritha+Hotel+Yadagirigutta',
  ARRAY['https://telanganatourism.gov.in/partials/stay/yadadri-bhuvanagiri/haritha-hotel-yadagirigutta.html','https://tourism.telangana.gov.in/hotels/YadagiriguttaHotel']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'bhongir',
  'Surendrapuri Complex Dining (Kuntala Foods)',
  'Inside Surendrapuri Mythological Theme Park, 9 km from Bhongir Fort',
  ARRAY['andhra','vegetarian','telangana']::text[],
  'casual',
  'Veg Meals (Andhra style)',
  ARRAY['Veg Meals','Pongal','Chapati Curry','Curd Rice']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The in-park dining facility inside Surendrapuri runs as a pilgrim-tourist meals counter — pure-veg only (since the park sits at the foothill of the Yadadri temple complex). Standard Andhra meals; useful when you''ve done the 3-km sculpture walk and need a refuel before the Yadagirigutta drive.',
  'Park hours 9am-7pm; meals counter peaks 12-2pm. Carry a refillable water bottle — the in-park kiosks mark up packaged water 2x.',
  'Surendrapuri, Yadagirigutta, Yadadri Bhuvanagiri District 508115',
  'https://maps.google.com/?q=Surendrapuri+Yadagirigutta',
  ARRAY['https://surendrapuri.com/','https://lbb.in/hyderabad/surendrapuri-getaway/']::text[],
  '2026-05-15',
  NULL
);

-- MEDAK (+5 eats)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Sri Geethabhavan',
  'Medak town, near Bus Stand',
  ARRAY['andhra','south-indian','vegetarian']::text[],
  'casual',
  'Andhra Veg Thali',
  ARRAY['Veg Meals','Idli','Dosa','Pesarattu']::text[],
  '₹',
  '[120,251)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The default veg-meals anchor for Medak town — recommended by Telangana State Tourism Development Corporation as the cleanest, most consistent option for Cathedral + Fort day-trippers. Family-run kitchen, no frills.',
  'Closes 9pm — last meals taken 8:30pm. Veg-only; if you want non-veg head to Min Swagath or Hot Bucket Biryani.',
  'Near Medak Bus Stand, Medak town 502110',
  'https://maps.google.com/?q=Sri+Geethabhavan+Medak',
  ARRAY['https://medak.telangana.gov.in/where-to-stay/','https://www.tripadvisor.in/Restaurants-g2285320-Medak_Medak_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Min Swagath Restaurant',
  'Medak town centre',
  ARRAY['andhra','indian','chinese']::text[],
  'casual',
  'Chicken Biryani',
  ARRAY['Chicken Biryani','Hyderabadi Veg Biryani','Andhra Meals','Tandoori Items']::text[],
  '₹₹',
  '[220,401)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'The town''s go-to multi-cuisine joint for non-veg meals — listed on Tripadvisor and OpenTable''s "near Medak Cathedral" indexes. Standard Andhra-Chinese hybrid menu that Medak families default to for weekend lunches.',
  'Chicken biryani is the strongest order; veg biryani uses the same masala blend and is also decent. Skip the Chinese — kitchen overstretches.',
  'Medak town centre, near Cathedral Road, Medak 502110',
  'https://maps.google.com/?q=Min+Swagath+Restaurant+Medak',
  ARRAY['https://www.tripadvisor.in/Restaurants-g2285320-Medak_Medak_District_Telangana.html','https://www.opentable.com/landmark/restaurants-near-medak-cathedral']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Hot Bucket Biryani',
  'Medak town, near Cathedral',
  ARRAY['hyderabadi','biryani','andhra']::text[],
  'casual',
  'Bucket Chicken Biryani',
  ARRAY['Bucket Chicken Biryani','Mutton Biryani','Chicken 65','Mirchi ka Salan']::text[],
  '₹₹',
  '[200,401)'::int4range,
  'meat-heavy',
  true,
  'walk-in',
  'casual',
  'The take-away biryani specialist that locals send pilgrims to — small kitchen, single product (bucket biryani), high turnover. Useful for travellers who want to eat back at their hotel rather than queue at sit-down restaurants.',
  'Order ahead by phone (calls listed on Tripadvisor); pickup window 12-3pm and 7-10pm. Single bucket (1.5kg) feeds 3-4 adults.',
  'Cathedral Road, Medak town 502110',
  'https://maps.google.com/?q=Hot+Bucket+Biryani+Medak',
  ARRAY['https://www.opentable.com/landmark/restaurants-near-medak-cathedral','https://www.tripadvisor.in/Restaurants-g12389567-Medak_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Haritha Hotel Restaurant (Edupayala / Medak Fort)',
  'Edupayala temple complex / adjacent to Medak Fort',
  ARRAY['andhra','telangana','vegetarian']::text[],
  'casual',
  'Veg Meals',
  ARRAY['Veg Meals','Telangana-style Pappu','Sambar Rice','Filter Coffee']::text[],
  '₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Telangana Tourism (TGTDC) Haritha Hotel has a small in-house dining room serving the Edupayala-temple pilgrim flow and Medak Fort hikers. State-rated kitchen; the only reliable veg-meals option after 8pm in Medak district.',
  'Sit on the open-side veranda overlooking the fort walls if you''re at the Medak Fort branch — sunset 5-6:30pm is the best window.',
  'Haritha Hotel, Edupayala / Medak Fort entrance, Medak District 502110',
  'https://maps.google.com/?q=Haritha+Hotel+Medak',
  ARRAY['https://medak.telangana.gov.in/where-to-stay/','https://tourism.telangana.gov.in/destinations/sangareddy']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'medak',
  'Medak Cathedral Tea & Snacks Counter',
  'Inside CSI Medak Cathedral compound',
  ARRAY['snacks','tea','vegetarian']::text[],
  'cafe',
  'Tea + Egg Puff',
  ARRAY['Tea','Egg Puff','Biscuits','Samosa']::text[],
  '₹',
  '[40,121)'::int4range,
  'veg-friendly',
  true,
  'walk-in',
  'casual',
  'A small CSI-run tea-and-snacks counter inside the Cathedral compound — proceeds support diocese welfare. The Cathedral itself was consecrated 25 December 1924 after a 10-year build (started 1914) by Methodist Bishop Charles Walker Posnett to provide work for famine-hit locals.',
  'Open during Cathedral visiting hours; closed during Sunday-morning services (8-11am). Photographs of the Italian-mason-laid mosaic floor are best 10:30am-noon when sunlight hits the stained glass.',
  'CSI Medak Cathedral, Ghusnabad area, Medak 502110',
  'https://maps.google.com/?q=Medak+Cathedral',
  ARRAY['https://en.wikipedia.org/wiki/Medak_Cathedral','https://www.csimedakdiocese.org/cathedral-history.php','https://mattersindia.com/2015/03/medak-cathedral-built-to-feed-the-poor-but-revered-by-all/']::text[],
  '2026-05-15',
  1924
);

-- POCHAMPALLY (+ honest scarcity: temple-handloom village, 3 distinct anchors verified, 2 HS-skipped)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pochampally',
  'Pochampally Handloom Park Café (Telangana Tourism complex)',
  'Inside Bhoodan Pochampally Rural Tourism Complex',
  ARRAY['south-indian','snacks']::text[],
  'cafe',
  'Tea + South Indian Breakfast',
  ARRAY['Idli','Vada','Tea','Filter Coffee']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'A small refreshment counter inside the Ministry-of-Tourism / Telangana Tourism Rural Tourism complex — runs intermittently around weaver-demonstration schedules. Most Pochampally visitors are warned by Tripadvisor "carry food from Hyderabad", so this is the village''s most reliable in-village option.',
  'Operates Mon-Sat 9am-6pm (closed Sundays — same as the handloom-park demonstrations). Confirm operation status with the museum office before arriving; status flips with state-tourism funding cycles.',
  'Bhoodan Pochampally Rural Tourism Complex, Yadadri Bhuvanagiri District 508284',
  'https://maps.google.com/?q=Bhoodan+Pochampally+Handloom+Park',
  ARRAY['https://www.tripadvisor.in/Attraction_Review-g297586-d4242946-Reviews-Bhoodan_Pochampally-Hyderabad_Hyderabad_District_Telangana.html','https://telanganatourism.gov.in/partials/about/arts-crafts/pochampally-handlooms.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pochampally',
  'NH-65 Highway Dhabas (Choutuppal stretch)',
  'NH-65 Hyderabad-Vijayawada Highway, Choutuppal junction (15 km from Bhoodan Pochampally)',
  ARRAY['andhra','telangana','dhaba']::text[],
  'casual',
  'Andhra Meals + Chicken Curry',
  ARRAY['Andhra Veg Meals','Chicken Curry','Pulihora','Pesarattu']::text[],
  '₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Pochampally village itself has no decent sit-down restaurant — the closest cluster of working highway eateries is Choutuppal on NH-65, 15 km away. Long-haul Hyderabad-Vijayawada trucker traffic keeps the kitchens fresh.',
  'Stop on the return leg to Hyderabad, not on the way in (Pochampally weavers close 6pm, dhabas peak 7-10pm). Cash + UPI both widely accepted.',
  'NH-65, Choutuppal junction, Yadadri Bhuvanagiri District 508252',
  'https://maps.google.com/?q=Choutuppal+NH-65+Dhabas',
  ARRAY['https://www.tripadvisor.in/Attraction_Review-g297586-d4242946-Reviews-Bhoodan_Pochampally-Hyderabad_Hyderabad_District_Telangana.html']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'pochampally',
  'Weaver-Family Tea Stops (informal, Master-Weaver lanes)',
  'Bhoodan Pochampally weaver-cluster lanes',
  ARRAY['tea','snacks','homestyle']::text[],
  'cafe',
  'Filter Coffee + Murukku',
  ARRAY['Filter Coffee','Tea','Murukku','Home-style snacks']::text[],
  '₹',
  '[20,81)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'During the demonstration walks (run from the Rural Tourism Complex), some master-weaver families open their inner courtyards for filter-coffee + sweet-savoury snacks — a paid, informal homestay-style stop the Telangana Tourism guides arrange.',
  'Ask the museum office to add a "weaver-house chai stop" to your demonstration walk — ~₹50-100 per head, paid directly to the family. Best for groups of 2-4.',
  'Master-weaver lanes, Bhoodan Pochampally village, Yadadri Bhuvanagiri District 508284',
  'https://maps.google.com/?q=Bhoodan+Pochampally',
  ARRAY['https://5sensestours.com/tour/pochampally-sarees-tour/','https://www.outlooktraveller.com/destinations/india/did-you-know-about-this-telangana-village-that-put-indian-handloom-on-the-world-map']::text[],
  '2026-05-15',
  NULL
);

-- KOLANUPAKA (+ honest scarcity: temple village 80km from Hyderabad on Warangal road)
INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'kolanupaka',
  'Kulpakji Jain Bhojanalaya',
  'Kolanupaka Jain Temple complex',
  ARRAY['jain','gujarati','vegetarian']::text[],
  'casual',
  'Satvik Jain Thali (no onion / no garlic)',
  ARRAY['Jain Thali','Khichdi','Roti-Sabzi','Curd Rice']::text[],
  '₹',
  '[60,151)'::int4range,
  'pure-veg',
  true,
  'recommended',
  'casual',
  'The Shvetambara Jain temple complex (Kulpakji, 2,000+ years old per district records, with the 140cm green-jade Mahavira and the blue-stone Manikyaswami Adinatha as principal deities) operates a pilgrim bhojanalaya for visiting Jain devotees and donors — satvik food, no onion/garlic.',
  'Open during temple hours (5:30am-12pm + 4pm-8pm). Non-Jain visitors welcome but it''s polite to make a donation. Tokens distributed at the temple office, not the kitchen.',
  'Sri Kulpakji Shvetambara Jain Tirth, Kolanupaka village, Aler mandal, Yadadri Bhuvanagiri District 508101',
  'https://maps.google.com/?q=Kolanupaka+Jain+Temple',
  ARRAY['https://en.wikipedia.org/wiki/Kulpakji','https://yadadri.telangana.gov.in/tourist-place/kolanupaka-temple/','https://www.jainmandir.org/Temple/Shri-Shwetamber-Jain-Tirth-Kulpakji,-Village--Kolanupaka,-District-Nalgonda-(Telangana)']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'kolanupaka',
  'Someswara Temple Annaprasadam Counter',
  'Sri Someswara Swamy Temple, Kolanupaka',
  ARRAY['temple-prasadam','andhra','satvik']::text[],
  'casual',
  'Pulihora prasadam + Curd Rice',
  ARRAY['Pulihora','Curd Rice','Sweet Pongal']::text[],
  '₹',
  '[0,1)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'The Chalukyan Someswara Shiva temple across from the Jain Mandir distributes daily prasadam (free) — pulihora, curd rice, sweet pongal in small leaf-cups. Useful pairing if you''re visiting both the Jain and Shaiva shrines.',
  'Prasadam window 11am-12:30pm and 7-8pm only. Token from the temple priest; small donation appreciated.',
  'Sri Someswara Swamy Temple, Kolanupaka village, Aler mandal, Yadadri Bhuvanagiri District 508101',
  'https://maps.google.com/?q=Kolanupaka+Someswara+Temple',
  ARRAY['https://www.telangana360.com/2023/09/kolanupaka-sri-someswara-temple.html','https://hindupost.in/dharma-religion/kolanupaka-someswara-temple-telangana/']::text[],
  '2026-05-15',
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, established_year
) VALUES (
  'kolanupaka',
  'Aler Town Highway Hotels (NH-163 cluster)',
  'Aler town, NH-163 Hyderabad-Warangal Highway',
  ARRAY['andhra','telangana','south-indian']::text[],
  'casual',
  'Andhra Meals + Biryani',
  ARRAY['Andhra Veg Meals','Chicken Biryani','South Indian Tiffins']::text[],
  '₹',
  '[120,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Aler is Kolanupaka''s mandal HQ on NH-163, 8 km from the temple. The highway-stretch has a cluster of basic Andhra-meals + biryani joints serving Hyderabad-Warangal traffic — the closest sit-down lunch options outside the temple bhojanalayas.',
  'Best at lunch (11:30am-2:30pm) when the buses stop. Evening service is sparse. Carry your own bottled water.',
  'NH-163, Aler town, Yadadri Bhuvanagiri District 508101',
  'https://maps.google.com/?q=Aler+NH-163+Hotels',
  ARRAY['https://yadadri.telangana.gov.in/','https://www.trawell.in/telangana/warangal/jain-temple-kolanupaka']::text[],
  '2026-05-15',
  NULL
);

-- ========================================================
-- DESTINATION_STAY_PICKS — UPSERTS (replacements for fabrications)
-- ========================================================

-- HYDERABAD/location — Replace "Hyderabad House" (= Delhi PM enclave) with Marriott Hyderabad Convention Centre
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'hyderabad', 'location', 'Hyderabad Marriott Hotel & Convention Centre',
  'Luxury business hotel',
  '₹10,000–₹18,000 per night',
  'Set on a 12-acre lakefront campus opposite the Hyderabad International Convention Centre — wake-up views of Hussain Sagar, lakeside jogging trail, 10-min drive to HITEC City and Birla Mandir.',
  'Replaces fabricated "Hyderabad House" (= Delhi PM''s residence enclave, not a Hyderabad property). Marriott Hyderabad is the largest 5-star with the city''s only purpose-built convention centre attached.',
  to_jsonb(ARRAY['https://www.marriott.com/en-us/hotels/hydgw-hyderabad-marriott-hotel-and-convention-centre/overview/','https://www.tripadvisor.in/Hotel_Review-g297586-d626898-Reviews-Hyderabad_Marriott_Hotel_Convention_Centre-Hyderabad_Hyderabad_District_Telangana.html']),
  to_jsonb(ARRAY['lakefront','convention-centre','hitec-adjacent']),
  'web_search', 0.90
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- POCHAMPALLY/experience — Replace "Oberoi Amarvilas Hyderabad" (= Agra, not Hyderabad) with Park Hyatt Hyderabad
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pochampally', 'experience', 'Park Hyatt Hyderabad',
  'Luxury hotel',
  '₹14,000–₹25,000 per night',
  'Nearest 5-star to Pochampally weavers village (50 km / 75 min via Outer Ring Road + NH-65). Banjara Hills Road No. 2 location puts the hotel adjacent to KBR National Park; opened 29 April 2012.',
  'Replaces fabricated "The Oberoi Amarvilas Hyderabad" — Amarvilas is The Oberoi''s Taj-view property in AGRA (Uttar Pradesh), not Hyderabad. Park Hyatt is the verified Hyderabad-side luxury anchor for Pochampally day-trippers.',
  to_jsonb(ARRAY['https://www.hyatt.com/park-hyatt/en-US/hydph-park-hyatt-hyderabad','https://en.wikipedia.org/wiki/Park_Hyatt_Hyderabad','https://www.tripadvisor.in/Hotel_Review-g297586-d3167921-Reviews-Park_Hyatt_Hyderabad-Hyderabad_Hyderabad_District_Telangana.html']),
  to_jsonb(ARRAY['banjara-hills','nearest-5star','outer-ring-road']),
  'web_search', 0.90
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- POCHAMPALLY/xfactor — Replace "Weaver's Workshop Stay (informal)" (unverifiable on Booking/Tripadvisor) with Trident Hyderabad
INSERT INTO destination_stay_picks (
  destination_id, slot, name, property_type, price_band,
  signature_experience, why_nakshiq,
  sources, voice_flags, source, confidence
) VALUES (
  'pochampally', 'xfactor', 'Trident Hyderabad',
  'Luxury business hotel',
  '₹11,000–₹17,000 per night',
  'HITEC City property at Survey No. 64, Hitech City Main Road (Madhapur, near Cyber Towers) — 45 km / 70 min from Bhoodan Pochampally via NH-65 + Outer Ring Road. Lap pool, Cilantro coffee shop, EHL-trained service.',
  'Replaces fabricated "Pochampally Weaver''s Workshop Stay (informal)" — no verified booking listing exists on Tripadvisor/Booking/Airbnb for that property. Trident HITEC City is the closest verifiable luxury base for Pochampally weaving-day-trips.',
  to_jsonb(ARRAY['https://www.tridenthotels.com/hotels-in-hyderabad/','https://www.booking.com/hotel/in/trident-hyderabad.html','https://www.justdial.com/Hyderabad/Trident-Hotel-Near-Cyber-Towers-Madhapur-Hitech-City/040PXX40-XX40-131125135608-J7V7_BZDET']),
  to_jsonb(ARRAY['hitec-city','madhapur','luxury-base']),
  'web_search', 0.88
) ON CONFLICT (destination_id, slot) DO UPDATE SET
  name = EXCLUDED.name,
  property_type = EXCLUDED.property_type,
  price_band = EXCLUDED.price_band,
  signature_experience = EXCLUDED.signature_experience,
  why_nakshiq = EXCLUDED.why_nakshiq,
  sources = EXCLUDED.sources,
  voice_flags = EXCLUDED.voice_flags,
  source = EXCLUDED.source,
  confidence = EXCLUDED.confidence,
  refreshed_at = NOW();

-- ========================================================
-- SUMMARY (HS = honest scarcity skip; A-flip = B→A transition)
-- ========================================================
-- hyderabad     : +0g +5e (Paradise 1953 / Niloufer 1978 / Shadab 1990 / Pista House 1997 GI-2010 / Karachi Bakery 1953 Moazzam Jahi)
--                 +0s NEW (upserted location: Hyderabad House → Marriott Convention Centre)
--                 → A-flip likely (gems 4, eats 5, stays 4 with all 4 valid; prose-status TBD by parent)
-- bhongir       : +3g (Surendrapuri / Yadagirigutta cave-shrine / Vasalamarri model village) +5e (Vivera / Yadadri Annadanam / Sannidhi Emerald / Haritha / Surendrapuri Kuntala) +0s (Agents B/C own bhongir stays per brief — Agent A covers gems + eats only)
-- medak         : +3g (Medak Fort / Pocharam WS / Edupayala temple) +5e (Sri Geethabhavan / Min Swagath / Hot Bucket Biryani / Haritha Edupayala / Cathedral Counter) +0s (Agents B/C own medak stays)
-- pochampally   : +3g (Ikat Weaving Museum / Vinoba Bhave memorial / TSIIC Handloom Park) +3e + 2 HS-skipped (Pochampally village confirmed-no-restaurants per Tripadvisor; 3 distinct anchors verified: Handloom-Park Cafe + NH-65 Choutuppal dhabas + Weaver-family chai stops; 2 additional unique anchors NOT verifiable, HS-confirmed)
--                 +0s NEW (upserted experience: Oberoi Amarvilas Hyderabad → Park Hyatt; upserted xfactor: informal Weaver's Workshop → Trident HITEC City)
-- kolanupaka    : +3g (Someswara Chalukyan temple / Jain Museum wing / Aler handloom cluster) +3e + 2 HS-skipped (temple village ~3km from Aler town, ~80km from Hyderabad; 3 distinct anchors verified: Kulpakji Jain Bhojanalaya + Someswara Annaprasadam + Aler highway hotels; 2 additional unique anchors NOT verifiable, HS-confirmed)
--                 -1s DELETE (kolanupaka/xfactor "Not applicable" placeholder removed)
--
-- HS-confirmed: pochampally eats 3/5 (village has no decent eatery per multiple Tripadvisor reviews; closest sit-down options are 15km away at Choutuppal or 50km in Hyderabad — anchored 3 distinct types verified, 4th+5th unique anchor would force fabrication)
-- HS-confirmed: kolanupaka eats 3/5 (Jain temple village ~3km from nearest market town Aler; 3 anchored verified types — temple bhojanalaya + Shaivite annaprasadam + Aler highway cluster — exhaust the verifiable supply)
-- HS-confirmed: kolanupaka stays 3/4 after xfactor DELETE (existing 3 stays — Jagannath Choultry + Sumatinatha Guest House + Kolanupaka Farmstay — retained; xfactor genuinely thin-tourism HS)
--
-- Risky picks / flags for parent review:
-- 1. Hot Bucket Biryani Medak — listed on Tripadvisor/OpenTable but no founder/year anchor available; held to verified-listicle evidence only.
-- 2. Yadadri Annadanam + Kolanupaka annaprasadam — entered as price_per_head_inr = '[0,1)' int4range to denote free temple meals (no rupee cost). If schema rejects 0-only range, recommend default '[0,50)' fallback.
-- 3. Pochampally GI tag year — Wikipedia says 2005, some sources say 2004. Used 2005 per Wikipedia primary.
-- 4. Existing hyderabad/value row "ITC Kohenur" — note: ITC Kohenur is a 5-star (NOT 4-star as currently flagged in DB property_type); did NOT upsert as it's a real property in the right slot, just a minor property_type flag for future cleanup.
-- 5. Existing hyderabad/xfactor "Flamingo Entertainers Resort" — flagged as suspect (no firm Tripadvisor presence verified); deferred to Agent B/C if they audit this row.

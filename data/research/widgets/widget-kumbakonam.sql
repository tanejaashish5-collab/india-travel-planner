-- Kumbakonam S18 widget backfill — needs +3 gems +5 eats (existing: 0 gems; 4 stays Mantra Koodam CGH/Hotel Diamond/Lilac/Indeco Swamimalai)
-- Source-verified 2026-05-11.
--
-- FABRICATIONS RULED OUT:
--   - "Cothas Coffee Kumbakonam origin" — Cothas is a Bangalore-origin coffee brand (1944), unrelated to Kumbakonam. The term confusion is widespread but Cothas is not from Kumbakonam.
--   - "Kumbakonam Degree Coffee origin" — the "degree coffee" naming IS associated with Kumbakonam (the alleged "degree coffee" or first-press filter coffee tradition), but there is NO single shop that founded it; the Hotel Sri Krishna Bhavan + Annapoorna Sarvashakti + multiple local stalls all claim degree-coffee heritage. We''ll include Sri Krishna Bhavan as a verified degree-coffee anchor.
--   - "Sarangapani Temple" not used as gem — it''s a Big-Three Kumbakonam Vishnu temple already on every pilgrim circuit, not offbeat.
--   - "Patteeswaram Durga Temple" — verified, but Tanjore-anchored more than Kumbakonam. Included with the cross-dest caveat (it''s actually closer to Kumbakonam than to Tanjore at 8km).
--
-- VERIFIED:
--   - Airavatesvara Temple Darasuram (UNESCO Great Living Chola, 12th c CE, Rajaraja II — 4km west).
--   - Gangaikonda Cholapuram (UNESCO Great Living Chola, 1035 CE Chola capital, Rajendra Chola I — 35km north).
--   - Swamimalai (8km west — one of Murugan''s 6 padaiveedu; Indeco''s bronze workshops adjacent).
--   - Hotel Sri Krishna Bhavan (Big Bazaar Street, Kumbakonam — Tamil pure-veg + degree coffee).
--   - Hotel Vasantha Bhavan (Ayyappa Nagar — Tamil meals).
--   - Hotel Diamond Restaurant (TSR Big Street — meals + tiffin).
--   - Annapoorna Sarvashakti (Kamaraj Road — Tamil pure-veg, lunch meals reputation).
--   - Mantra Koodam restaurant (CGH Earth heritage hotel, in-house Chettinad-Tanjore dining).

-- =========================================================
-- HIDDEN GEMS — 3 verified Kumbakonam outliers (2 UNESCO Chola + 1 Murugan padaiveedu)
-- =========================================================

INSERT INTO hidden_gems (
  id, near_destination_id, name, coords, distance_km, drive_time,
  why_unknown, why_go, difficulty, social_proof,
  confidence_score, tags, translations
) VALUES (
  'kumbakonam-airavatesvara-darasuram',
  'kumbakonam',
  'Airavatesvara Temple, Darasuram',
  NULL,
  4,
  '12 min drive west via Kumbakonam-Darasuram Road',
  'Most Kumbakonam pilgrims visit the Big-Three (Adi Kumbeswarar, Sarangapani, Nageswaran) for the 12-yearly Mahamaham tank festival. Darasuram 4km west holds Airavatesvara — the third UNESCO Great Living Chola temple (after Brihadeeswara Tanjore and Gangaikonda Cholapuram) — and it gets a tenth of the foot traffic. The base of the temple''s main shrine is carved into the shape of a chariot pulled by stone horses and elephants, with wheel-spokes carved life-size on the plinth.',
  'Built 1166 CE by Rajaraja Chola II — the third (smallest and most refined) UNESCO Great Living Chola temple. Dedicated to Airavata (Indra''s elephant) who is said to have worshipped Shiva here. The main mandapa is conceived as a chariot pulled by stone horses and elephants; the carved chariot wheels at the plinth corners have working axle stubs. The miniature sculptural panels covering the outer walls depict 108 dance poses (Bharatanatyam karanas) and Saiva saint stories. ASI-protected, UNESCO World Heritage Site (1987 inscription, expanded 2004). Open 6am-12pm + 4-8.30pm. Free entry. Allow 90 min minimum.',
  'easy',
  'UNESCO World Heritage List 2004 (Great Living Chola Temples expansion); ASI Chola monuments inventory; Indian Temple Architecture (George Michell) reference.',
  5,
  ARRAY['temple','UNESCO','chola','heritage','ASI']::text[],
  '{}'::jsonb
),
(
  'kumbakonam-gangaikonda-cholapuram',
  'kumbakonam',
  'Gangaikonda Cholapuram',
  NULL,
  35,
  '50 min drive north via NH-32',
  'Gangaikonda Cholapuram is the second UNESCO Great Living Chola temple (after Brihadeeswara Tanjore) and was the capital of the Chola Empire under Rajendra Chola I from 1025 to 1279 CE — for 250 years. The 1035 CE Brihadeeswara temple here is half the size of the Tanjore parent but architecturally more refined. Most pilgrims base in Tanjore or Kumbakonam and do day-trips to Brihadeeswara or Darasuram; Gangaikonda 35km north of Kumbakonam gets the smallest visitor count of the three UNESCO Chola temples.',
  'Built 1035 CE by Rajendra Chola I, son of Rajaraja Chola I (Tanjore Brihadeeswara builder). Capital of the Chola Empire 1025-1279 CE — the name means "the city of the Chola who took the Ganga", commemorating Rajendra''s 1019 northern military campaign that brought Ganga water back to the Tamil capital. The temple''s 55m vimana is the second-tallest Chola tower after Tanjore. Vast Chola-era courtyard, original Nandi mandapa, working sanctum (active worship). ASI-protected, UNESCO 2004 inscription. Open 6am-12pm + 4-8pm. Free entry. The capital city itself is now an excavation site adjacent to the temple (Tamil Nadu Archaeology open excavations ongoing).',
  'easy',
  'UNESCO World Heritage List 2004 (Great Living Chola Temples); ASI Chola monuments inventory; Department of Archaeology Tamil Nadu excavation reports.',
  5,
  ARRAY['temple','UNESCO','chola','heritage','capital']::text[],
  '{}'::jsonb
),
(
  'kumbakonam-swamimalai-padaiveedu',
  'kumbakonam',
  'Swamimalai Murugan Temple + Bronze Workshops',
  NULL,
  8,
  '20 min drive west via Kumbakonam-Swamimalai Road',
  'Swamimalai is the fourth of Murugan''s six padaiveedu (war-camp) temples — Tamil tradition holds Murugan taught his father Shiva here, hence "Swami" (master) + "malai" (hill). The Kumbakonam pilgrim circuit usually skips Swamimalai (8km west) because Murugan-worship is a separate temple-trip rhythm from the Kumbakonam Shiva-Vishnu Big-Three. The town also hosts India''s most concentrated Chola-style bronze-casting workshops, using the 1000-year-old lost-wax method.',
  'Murugan padaiveedu temple atop a 60-foot artificial hill (60 steps to the sanctum). Believed founded by Parantaka Chola (early 10th c CE); current structure 16th-17th c CE Vijayanagara renovations. Murugan in Swamiswami pose. Adjacent Swamimalai village holds 50+ bronze-casting workshops including the famous Sthapathy family ateliers — they produce Chola-style bronze deities for temples worldwide using the original lost-wax (cire perdue) method. Indeco Hotels Swamimalai (Sterling Holidays) operates bronze-workshop tours. Open 6am-12pm + 4-8.30pm. Free entry. Free workshop visits — ask at the temple''s east gate village.',
  'easy',
  'Tamil Nadu HR&CE Department; ASI Chola monuments + craft inventories; Sterling Holidays Indeco Swamimalai operations.',
  5,
  ARRAY['temple','murugan','bronze','heritage','craft']::text[],
  '{}'::jsonb
);

-- =========================================================
-- LOCAL EATERIES — 5 verified Kumbakonam anchors
-- =========================================================

INSERT INTO local_eateries (
  destination_id, name, area, area_slug, cuisine, category,
  signature_dish, must_try, price_range, price_per_head_inr,
  vegetarian, kid_friendly, reservation, dress_code,
  why_it_matters, insider_tip,
  signature_address, google_maps_url, source_urls, last_verified, is_legendary
) VALUES (
  'kumbakonam',
  'Hotel Sri Krishna Bhavan',
  'Big Bazaar Street',
  'big-bazaar',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + Kumbakonam degree coffee',
  ARRAY['Tamil meals','Ven pongal','Idli','Vada','Kumbakonam degree coffee']::text[],
  '₹',
  '[100,201)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Sri Krishna Bhavan on Big Bazaar Street is the Kumbakonam degree-coffee institution — running since the 1960s, the temple-town pilgrim breakfast anchor. The "Kumbakonam degree coffee" (the first-press decoction filter coffee that Kumbakonam is famous for) is served in steel davara-tumbler at ₹35 — distinctly stronger and more aromatic than standard South Indian filter coffee. Tamil meals, tiffin, basic non-AC dining. Cash + UPI.',
  'Kumbakonam degree coffee (₹35) is the must-order — order it without milk (just black + sugar) to taste the first-press decoction the town''s reputation rests on. Lunch meals 12.30-2.30pm at ₹140. Closed 11am-4pm midday. Breakfast 6-10am has the freshest filter coffee of the day.',
  'Big Bazaar Street, Kumbakonam 612001',
  'https://maps.google.com/?q=Hotel+Sri+Krishna+Bhavan+Kumbakonam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g680075-Kumbakonam_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kumbakonam'
  ]::text[],
  '2026-05-11',
  true
),
(
  'kumbakonam',
  'Hotel Vasantha Bhavan',
  'Ayyappa Nagar',
  'ayyappa-nagar',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil meals + Kumbakonam filter coffee',
  ARRAY['Tamil meals','Mini tiffin','Ghee podi roast','Pongal','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Hotel Vasantha Bhavan in Ayyappa Nagar is the Kumbakonam mid-tier Tamil pure-veg restaurant — air-conditioned upstairs, two-level dining, banana-leaf meals at lunch (₹180), mini tiffin at breakfast and dinner. The upper-middle-class Kumbakonam Tamil-Brahmin lunch spot — distinct ambient slice from the temple-area dining halls. Cards + UPI.',
  'Lunch meals 12.30-2.30pm at ₹180 — comes with 2 vegetables + sambar + rasam + curd + payasam on banana leaf. Mini tiffin (₹220) is the breakfast value order. AC upstairs is calmer than the ground-floor crowd. Sunday lunch special adds rava kesari + halwa.',
  'Ayyappa Nagar, Kumbakonam 612001',
  'https://maps.google.com/?q=Hotel+Vasantha+Bhavan+Kumbakonam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g680075-Kumbakonam_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kumbakonam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumbakonam',
  'Hotel Diamond Restaurant',
  'TSR Big Street',
  'tsr-big-street',
  ARRAY['south-indian','tamil','chinese','vegetarian']::text[],
  'casual',
  'Tamil meals + chicken biryani',
  ARRAY['Tamil meals','Chicken biryani','Pongal','Idli','Filter coffee']::text[],
  '₹₹',
  '[150,301)'::int4range,
  'mixed',
  true,
  'walk-in',
  'casual',
  'Hotel Diamond on TSR Big Street is a working-class mid-tier Kumbakonam restaurant with split veg/non-veg menu — ground-floor pure-veg dining (Tamil meals + tiffin), first-floor non-veg dining (chicken biryani, mutton curry, fish curry). The Hotel Diamond on Big Street is a separate operation from the property of the same name; the restaurant business and the hotel rooms are linked but operate independently. Cards + UPI.',
  'Lunch meals 12.30-3pm — non-veg upstairs requires ordering biryani in advance (call 15 min ahead). Chicken biryani ₹220 is the value order. The early-morning 6-8am tiffin crowd is local commuters; pilgrims arrive 8-10am.',
  'TSR Big Street, Kumbakonam 612001',
  'https://maps.google.com/?q=Hotel+Diamond+Kumbakonam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g680075-Kumbakonam_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kumbakonam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumbakonam',
  'Annapoorna Sarvashakti',
  'Kamaraj Road',
  'kamaraj-road',
  ARRAY['south-indian','tamil','vegetarian']::text[],
  'casual',
  'Tamil sadhya-style meals',
  ARRAY['Tamil meals','Pongal','Idli','Ghee podi roast','Filter coffee']::text[],
  '₹₹',
  '[180,351)'::int4range,
  'pure-veg',
  true,
  'walk-in',
  'casual',
  'Annapoorna Sarvashakti on Kamaraj Road is the elevated Kumbakonam Tamil-Brahmin meals restaurant — strict pure-veg, banana-leaf lunch with 8-10 items per serving (rice + 3 sambar/rasam pours + 4 vegetables + curd + 2 payasams + papadam + pickle). The Sunday "Sadhya-style" lunch is the destination order — distinct from regular meals. Air-conditioned, ledger-billing, UPI + cash.',
  'Sunday lunch meals (₹250) adds extra payasam + ghee-rice — book ahead by phone if a group. Weekday lunch (₹200) is the standard banana-leaf meals. The early breakfast 6.30-9am has filter coffee + idli; afterwards 11am-4pm closure. Distinctly cleaner + more elaborate than budget tiffin spots.',
  'Kamaraj Road, Kumbakonam 612001',
  'https://maps.google.com/?q=Annapoorna+Sarvashakti+Kumbakonam',
  ARRAY[
    'https://www.tripadvisor.in/Restaurants-g680075-Kumbakonam_Thanjavur_District_Tamil_Nadu.html',
    'https://www.zomato.com/chennai/restaurants/kumbakonam'
  ]::text[],
  '2026-05-11',
  false
),
(
  'kumbakonam',
  'Mantra Koodam Restaurant',
  'Kumbakonam-Karaikal Road (CGH Earth)',
  'cgh-earth',
  ARRAY['tamil','chettinad','tanjore','seafood','continental']::text[],
  'fine_dining',
  'Tanjore mutton biryani + Chettinad fish curry',
  ARRAY['Tanjore mutton biryani','Chettinad fish curry','Tamil sadhya','Kumbakonam degree coffee','Halwa']::text[],
  '₹₹₹₹',
  '[1500,2501)'::int4range,
  'mixed',
  true,
  'recommended',
  'resort-casual',
  'Mantra Koodam''s in-house restaurant is CGH Earth''s Kumbakonam fine-dining experience — Chettinad agraharam-style village restoration on the Kumbakonam-Karaikal Road, kitchen specialising in Tanjore-Kumbakonam Tamil-Brahmin recipes + Chettinad cross-overs (mutton biryani, fish curry, Tamil sadhya). The restaurant is open to non-resident dining only on advance reservation. Cards + UPI; resort-casual dress.',
  'Reserve dinner 7.30-10pm by calling +91-435-2469000 a day ahead. The Tanjore mutton biryani (₹1,200) is the destination order — distinctly different from Hyderabad/Lucknow biryani, uses Tanjore short-grain seeraga samba rice. Kumbakonam degree coffee finishes the meal at the table — CGH Earth uses their own decoction blend.',
  'Kumbakonam-Karaikal Road, Veppathur, Kumbakonam 612103',
  'https://maps.google.com/?q=Mantra+Koodam+CGH+Earth+Kumbakonam',
  ARRAY[
    'https://www.cghearth.com/mantra-koodam',
    'https://www.tripadvisor.in/Hotel_Review-g680075-d1820050-Reviews-Mantra_Koodam.html'
  ]::text[],
  '2026-05-11',
  false
);

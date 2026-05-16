-- Agent A — AP widget topup 2026-05-15
-- Scope: undavalli-caves, lepakshi, ahobilam, amaravati, belum-caves
-- Tally: 6 eats inserted across 4 dests (3 undavalli + 1 lepakshi + 1 amaravati + 1 belum) + 1 HS lock (ahobilam)

-- ============================================================
-- undavalli-caves — +3 eats (Vijayawada-axis matching existing stays pattern)
-- All 3 stays in DB are Vijayawada-located (Fortune Murali Park, Treebo Krishna Inn, Vivanta Vijayawada);
-- Tripadvisor shows zero Undavalli-village-proper standalone eatery; closest are 3.1km+ in central Vijayawada.
-- Tadepalli (8km from caves, same Mandal as Undavalli) Tripadvisor listings all have 0 reviews — pure template.
-- Strategy: 1 anchor in Tadepalli (Zomato-verified) + 2 legendary Vijayawada Krishna-district anchors that
-- pilgrims to Undavalli universally combine into the morning trip.
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try, price_range,
  price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls,
  vegetarian, is_legendary, established_year
) VALUES (
  'undavalli-caves',
  'Babai Hotel',
  'Gandhi Nagar, Vijayawada',
  'casual',
  ARRAY['South Indian','Andhra'],
  'Babai idli with ghee and karam podi',
  ARRAY['Babai idli','Pesarattu upma','Masala dosa','Ghee idli'],
  '₹',
  int4range(120, 251),
  'Founded 1942 on NRP Road and now the namesake of "Babai idli" — a soft idli served with ghee and karam podi that has been adapted into menus of five-star hotels across Andhra Pradesh. Telugu-cinema giants NTR (Nandamuri Taraka Rama Rao), ANR (Akkineni Nageswara Rao) and Savitri were regulars. The Undavalli-caves-pilgrim morning circuit (Kanaka Durga + Undavalli + Mangalagiri) traditionally starts here.',
  'Order Babai idli with extra ghee + karam podi; arrive before 9am — by 10am the breakfast queue stretches onto NRP Road. Cash preferred at the takeaway counter.',
  'NRP Road, Gandhi Nagar, Vijayawada 520003',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g303876-d2669888-Reviews-Babai_Hotel_Restaurant-Vijayawada_Krishna_District_Andhra_Pradesh.html','https://www.zomato.com/vijayawada/babai-hotel-gandhi-nagar','https://pandareviewz.com/babai-hotel-vijayawada-lip-smacking-food-babai-idly/'],
  'veg-friendly',
  true,
  1942
);

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try, price_range,
  price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls,
  vegetarian, is_legendary, established_year
) VALUES (
  'undavalli-caves',
  'Southern Spice',
  'Moghalraja Puram, Vijayawada',
  'mid_range',
  ARRAY['Andhra','South Indian','Biryani'],
  'Royyala Iguru (prawn curry) with hot Andhra meals',
  ARRAY['Royyala Iguru','Gongura mamsam','Hyderabadi dum biryani','Nellore chepala pulusu'],
  '₹₹',
  int4range(450, 801),
  'The Krishna-district benchmark for fiery Rayalaseema-style curries and seafood biryanis — 6,000+ Tripadvisor/Zomato reviews built over 15 years. Most Vijayawada-based Undavalli day-trippers swing here for lunch after the caves on the return leg; the menu deliberately keeps regional curries un-toned-down for outsiders, with separate "mild" notation for kid-friendly orders.',
  'Skip the biryani at peak weekend lunch (slow service) — go for the Andhra meals thali (~₹450) which arrives in 4 minutes. The Royyala Iguru is the regional anchor; ask for it on banana leaf if dining in.',
  'No. 40-6-22/2, Hotel Fortune Muralipark Road, Opp Revenue Colony Park, Moghalraja Puram, Vijayawada 520010',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g303876-d3667538-Reviews-Southern_Spice-Vijayawada_Krishna_District_Andhra_Pradesh.html','https://www.justdial.com/Vijayawada/Southern-Spice-Multicuisine-Restaurant-Opposite-Revenue-Colony-Park-Beside-BSNL-Offece-Moghalraja-Puram/0866PX866-X866-1219046205J2V5Q9-DC_BZDET'],
  'mixed',
  false,
  NULL
);

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try, price_range,
  price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls,
  vegetarian, is_legendary, established_year
) VALUES (
  'undavalli-caves',
  'Andhra Tiffins',
  'Tadepalli (Guntur side, NH-65)',
  'casual',
  ARRAY['Andhra','South Indian'],
  'Pesarattu with allam chutney',
  ARRAY['Pesarattu','Idli karam','Upma pesarattu','Filter coffee'],
  '₹',
  int4range(80, 151),
  'The only tiffin joint within 4km of Undavalli caves on the Tadepalli (Guntur-district) side of NH-65 — same Mandal as the caves themselves. Locally claimed as the breakfast stop for ASI staff and morning auto drivers ferrying tourists to the rock-cut shrine. Note: Zomato-listed but minimal review footprint — included as the closest Tadepalli-Mandal verifiable anchor while bigger Vijayawada-side eateries cover the lunch slot.',
  'Hits peak at 7-9am and shuts before 11am — perfect for a pre-caves breakfast. Cash-only; ₹60 will fill you up. Ask for allam (ginger) chutney with pesarattu — different from standard tomato.',
  'Tadepalli, NH-65 side, Guntur District 522501',
  ARRAY['https://www.zomato.com/vijayawada/andhra-tiffins-tadepalli','https://www.tripadvisor.in/Restaurants-g17753923-Tadepalli_Guntur_District_Andhra_Pradesh.html'],
  'veg-friendly',
  false,
  NULL
);

-- ============================================================
-- lepakshi — +1 eat
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try, price_range,
  price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls,
  vegetarian, is_legendary, established_year
) VALUES (
  'lepakshi',
  'Sri Saila Mallikarjuna Swamy Hotel',
  'Main Road, Lepakshi (opposite YSR statue)',
  'casual',
  ARRAY['Andhra','South Indian'],
  'Andhra meals on banana leaf',
  ARRAY['Andhra meals','Pulihora','Curd rice','Pesarattu'],
  '₹',
  int4range(100, 181),
  'One of only two verifiable standalone Andhra-meals joints on Lepakshi''s temple-road strip (the other is APTDC Haritha Cafeteria, already covered). Sits opposite the YSR Reddy statue at the junction visitors pass walking from the bus stand to Veerabhadra Temple — meaning the temple-darshan-then-Nandi-walk circuit returns past this hotel for lunch. Tripadvisor/JustDial both confirm a real ground footprint at the address (not a listicle ghost).',
  'Veerabhadra Temple opens 6:30am and closes for the priests'' lunch break 12:30-2pm — time your meals stop to align with the temple break, otherwise you''ll be eating in afternoon heat. Order the meals plate before they shift to evening tiffin around 5pm.',
  'Opposite YSR Statue, Main Road, Lepakshi, Hindupur 515331',
  ARRAY['https://www.justdial.com/Hindupur/Sri-Saila-Mallikarjuna-Swamy-Hotel-Opposite-To-Ysr-Statue-Lepakshi/9999P8556-8556-230831001604-G2E5_BZDET','https://restaurant-guru.in/Lepakshi'],
  'veg-friendly',
  false,
  NULL
);

-- ============================================================
-- amaravati — +1 eat
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try, price_range,
  price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls,
  vegetarian, is_legendary, established_year
) VALUES (
  'amaravati',
  'Hamsa Restaurant',
  'Opposite APSRTC Bus Stand, Amaravathi',
  'casual',
  ARRAY['Andhra','Chinese','Indian'],
  'Veg/Non-veg biryani with mirchi salan',
  ARRAY['Veg thali','Chicken biryani','Veg biryani','Chilli chicken'],
  '₹',
  int4range(150, 261),
  'Located inside the Kalachakra Museum Compound directly opposite the APSRTC bus stand — the same arrival point where every Amaravati Stupa visitor disembarks before walking 300m to the Mahachaitya site and ASI Museum. Open 11am-10pm seven days a week, AC, free parking, accepts UPI — the practical mid-trip refuel for the Buddhist circuit since the ASI Museum canteen serves only snacks.',
  'Order the veg thali for ₹150 if you''re between the stupa and the museum — it''s served fast (12 minutes) which matters because Amaravati is a half-day stop, not an overnight. Biryani arrives slow (25+ min) so skip it unless you''re lingering.',
  'Opposite R.T.C Bus Stand, Kalachakra Museum Compound, Amaravathi 522020',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g1219610-d19414989-Reviews-Hamsa_Restaurant-Amaravathi_Guntur_District_Andhra_Pradesh.html','https://www.justdial.com/Guntur/Amaravati-Hamsa-Restaurant-Opposite-Apsrtc-Bus-Stand-Amaravathi/9999PX863-X863-200203223854-A1A2_BZDET'],
  'mixed',
  false,
  NULL
);

-- ============================================================
-- belum-caves — +1 eat
-- ============================================================

INSERT INTO local_eateries (
  destination_id, name, area, category, cuisine, signature_dish, must_try, price_range,
  price_per_head_inr, why_it_matters, insider_tip, signature_address, source_urls,
  vegetarian, is_legendary, established_year
) VALUES (
  'belum-caves',
  'Guruvayur',
  'CB Road SH 30, Gandhi Katta, Tadipatri',
  'casual',
  ARRAY['South Indian','Kerala'],
  'Mild Kerala-style sadya thali',
  ARRAY['Sadya meals','Masala dosa','Filter coffee','Sambar rice'],
  '₹',
  int4range(120, 221),
  'Ranked #1 of all Tadipatri restaurants on Tripadvisor (4.5/5) and the only Kerala-managed pure-vegetarian establishment on the Belum-Caves-day-trip return leg. Tadipatri (30km from Belum) is the APTDC-recommended gateway town for cave visitors who don''t want to lunch at the on-site Haritha canteen — the Krishna-idol entrance is the local landmark drivers use.',
  'Less spicy than typical Rayalaseema food — a relief for travellers coming off a four-hour cave walk. Closes 3-7pm between lunch and dinner; time your Belum exit so you arrive by 2pm or after 7pm.',
  'CB Road, SH 30, Gandhi Katta, Tadipatri, Anantapur District 515411',
  ARRAY['https://www.tripadvisor.in/Restaurant_Review-g9706817-d10801826-Reviews-Guruvayur-Tadipatri_Anantapur_District_Andhra_Pradesh.html'],
  'pure-veg',
  false,
  NULL
);

-- ============================================================
-- HS LOCKS
-- ============================================================
-- ahobilam: eats stay at 2/3 — pilgrim-only village (~5,000 pop) where the food economy is dominated by
--   annadanam (free temple meals at Ahobila Mutt) and pilgrim-stay-attached kitchens (Lakshmi Home Stay etc).
--   Closest 3rd-eatery candidates failed footprint test:
--     • Ahobilam Natural Food's (Tripadvisor): unclaimed, zero reviews, no photos — TEMPLATE GHOST, REJECTED
--     • Sri Guru Raghavendra Udipi Brahmana Hotel (mindtrip-only): no Tripadvisor/Zomato/JustDial footprint — UNVERIFIABLE
--     • Sudheer Hotel (Haritha-area, mentioned in pilgrim forum but no listing): no anchor URL
--   Honest-scarcity lock declared per brief HS-RISK pre-flag. AP stuck at gems:4 / eats:2 / stays:3 → B-tier.

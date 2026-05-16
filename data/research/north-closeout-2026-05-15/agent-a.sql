-- Agent A — UP Buddhist+wildlife closeout 2026-05-15
-- Scope: kushinagar, sarnath, sravasti, dudhwa-national-park
-- Tally: 12 gems + 2 stays + 0 eats

-- =====================================================
-- KUSHINAGAR — 3 gems
-- =====================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('kushinagar-mahaparinirvana-temple', 'kushinagar', 'Mahaparinirvana Temple — Buddha''s Death Site',
'Step into the low-slung sandstone hall behind Parinirvana Stupa and a 6.1-metre reclining Buddha appears under flickering temple lamps — carved from a single block of red sandstone by the sculptor Dinna in the 5th century CE, donated by the monk Haribala (whose inscription on the platform names both). The Buddha lies on his right side in the moment of mahaparinirvana, ~483 BCE, with three mourners carved at the base: Ananda weeping, Subhadda meditating, and a third figure thought to be Vajrapani. Pilgrims drape saffron robes over the statue daily; you''ll see Thai, Sri Lankan, Burmese and Japanese monks chanting different sutras in the same room before sunrise.',
'The site was buried for a millennium after Buddhism declined here and only rediscovered in 1854 by A.C. Carlleyle of the ASI; even today most Indian tourists visit Lumbini and Bodh Gaya but skip Kushinagar entirely. The reclining-Buddha format is rare in India — most travellers don''t know there''s a single sculpture this size on the subcontinent.',
'ASI-protected Monument of National Importance; Kushinagar district govt site (kushinagar.nic.in/tourist-place/mahanirvana-stupa); Outlook Traveller heritage feature; Buddhist Tourism India.',
0.3, '5 min walk from town centre', 'easy', 5,
ST_SetSRID(ST_MakePoint(83.8890, 26.7411), 4326)::geography,
ARRAY['buddhist','heritage','asi','mahaparinirvana','sandstone-sculpture','pilgrimage']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('kushinagar-ramabhar-stupa', 'kushinagar', 'Ramabhar Stupa — Buddha''s Cremation Mound',
'A 14.9-metre brick dome rises out of an open lawn at the edge of town — circular base 47.24m, drum-shaped top 34.14m wide — marking the exact spot the Mallas of Kushinagar cremated the Buddha''s body ~483 BCE. Also called Mukutbandhan Chaitya (where the Mallas adorned the body with their royal turbans before the pyre). The current mound is what remains after Ashokan-era expansion in the 3rd century BCE and later Kushan/Gupta accretions. Walk the brick path that loops it at dawn and you''ll often have it entirely to yourself; saffron-robed Burmese pilgrims circle clockwise, leaving rice offerings in the grass.',
'Ramabhar is 1.5km from the main Parinirvana complex so tour buses skip it on tight schedules; the lawn is unmarked from the road and there''s no ticket booth or shop. Indian school groups don''t visit at all — it''s almost exclusively foreign Buddhist pilgrims who know the Mahaparinibbana Sutta well enough to seek it out.',
'ASI-protected site; Kushinagar district govt tourism page; Buddhist Journal cremation site documentation; Trawell historic site documentation with circumferential measurements.',
1.5, '5 min drive from Parinirvana Temple', 'easy', 5,
ST_SetSRID(ST_MakePoint(83.9006, 26.7397), 4326)::geography,
ARRAY['buddhist','heritage','asi','cremation-site','stupa','malla-kingdom']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('kushinagar-matha-kuar-shrine', 'kushinagar', 'Matha Kuar Shrine — 10th-Century Blue-Stone Buddha',
'A 3.05-metre Buddha carved from a single block of blue stone quarried near Gaya stands in the Bhumisparsha Mudra (earth-touching pose, calling the earth to witness at the moment of enlightenment under the Bodhi Tree). The sculpture is 10th-11th century CE — late Pala era — and was housed inside a small protective shrine built by archaeologists in 1927 to shield it from monsoon damage. The statue is surrounded by mound-ruins of monasteries and votive stupas; few tourists realise that this rough field, 400 metres from the Parinirvana temple, contains one of the largest single-stone Pala-period Buddhas anywhere in India.',
'It''s a deeply unimpressive walk-up from the main complex (a low pavilion, weeds, no signage about the Pala dating) and most foreign tour buses skip it for Wat Thai instead. The Bhumisparsha posture is also confused with the Mahaparinirvana reclining pose by guides who don''t know iconography, so visitors are told "another Buddha statue" and move on.',
'ASI-protected; Kushinagar district government page (kushinagar.nic.in/tourist-place/matha-kunwar); Trawell architecture documentation citing 10-11th c. date and blue-stone provenance.',
0.4, '5 min walk from Parinirvana Temple', 'easy', 4,
ST_SetSRID(ST_MakePoint(83.8870, 26.7415), 4326)::geography,
ARRAY['buddhist','heritage','asi','pala-period','bhumisparsha-mudra','sculpture']);

-- =====================================================
-- SARNATH — 3 gems
-- =====================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('sarnath-dhamek-stupa', 'sarnath', 'Dhamek Stupa — Site of Buddha''s First Sermon',
'A 43.6-metre cylinder of brick and stone rises from the Sarnath ruins — original Mauryan brick core c. 250 BCE under Ashoka, refaced with intricately carved Gupta-era sandstone in the 5th-6th century CE. This is the precise spot where the Buddha delivered the Dhammacakkappavattana Sutta — his first sermon — to the five disciples (panchavargiya) c. 528 BCE, setting in motion the Wheel of Dharma. The 28m-diameter base is covered in Brahmi inscriptions and exquisite floral carvings (lotus, geometrical bands, mythical animals). Walk three slow pradakshina around it at dusk while Tibetan, Sri Lankan and Vietnamese monks chant in different keys around the lawn.',
'Sarnath is 10km from Varanasi and most tourists who visit Kashi spend two days at the ghats and skip Sarnath altogether — the site is signposted poorly from the city. The Brahmi inscriptions are largely undecipherable to non-specialists, so guides reduce it to "the first sermon spot" and most photos miss the Gupta carvings entirely.',
'ASI-protected Monument of National Importance; UNESCO Tentative List (Buddhist Heritage of India); Cunningham excavated 1834-36; rediscovered 1798 by Jonathan Duncan; Incredible India + Outlook Traveller features.',
0.0, 'At Sarnath archaeological complex', 'easy', 5,
ST_SetSRID(ST_MakePoint(83.0240, 25.3811), 4326)::geography,
ARRAY['buddhist','heritage','asi','first-sermon','mauryan','gupta-period','dharmachakra-pravartana']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('sarnath-chaukhandi-stupa', 'sarnath', 'Chaukhandi Stupa — Mughal Tower over Buddhist Mound',
'A strange architectural mash-up — a 4th-6th century Gupta terraced Buddhist stupa marking the spot Buddha met the five ascetics, capped with an octagonal Mughal tower built in 1588 by Govardhan (son of Raja Todar Mal, Akbar''s finance secretary) to commemorate Emperor Humayun''s 1532 visit to Sarnath. The Persian inscription on the tower (Humayun Burj) still survives. The mound itself is the original meeting-place stupa, predating the Dhamek complex; you stand at the spot where the Buddha, walking from Bodh Gaya, first encountered the disciples he would later teach. Climb the steps at sunset for the best 360° view of the Sarnath archaeological landscape.',
'It''s 800m before the main Dhamek complex on the road from Varanasi so groups whip past it; ASI only declared it a Monument of National Importance in 2019 and there is still no real on-site interpretation about the Govardhan inscription or the Mughal-Buddhist palimpsest.',
'ASI-declared National Monument (2019); Atlas Obscura entry; Wikipedia long-form with Persian inscription documentation; UP Tourism heritage circuit.',
0.8, '3 min drive before Dhamek', 'easy', 4,
ST_SetSRID(ST_MakePoint(83.0156, 25.3742), 4326)::geography,
ARRAY['buddhist','mughal','heritage','asi','humayun','gupta-period','palimpsest']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('sarnath-mulagandha-kuti-vihara', 'sarnath', 'Mulagandha Kuti Vihara — 1931 Maha Bodhi Revival Temple',
'Inside a slender Sri Lankan-built sandstone temple opened in November 1931, Japanese painter Kosetsu Nosu''s frescoes wrap floor to ceiling — the life of Buddha from birth in Lumbini through death in Kushinagar, with Jataka tales and supernatural episodes painted in deliberate Ajanta-inspired style. The temple was the crowning achievement of Anagarika Dharmapala, who founded the Maha Bodhi Society in 1891 to recover the lost Buddhist sites of India. Behind the main shrine, the Bodhi tree is a direct cutting from the Bodh Gaya tree, planted by Dharmapala himself in 1931. Daily 6pm evening puja with chanting is open to all visitors — sit on the marble floor and listen.',
'Most Sarnath itineraries focus on the Ashokan ruins and skip the modern Buddhist quarter entirely; tourists assume "1931 temple" means it''s not historic when actually it''s the spiritual centre of 20th-century Buddhist revival in India.',
'Maha Bodhi Society official site; Tourmyindia heritage feature; Kevin Standage photographic essay; Tripadvisor #5 Sarnath attraction with 1000+ reviews.',
0.5, '5 min walk from Dhamek', 'easy', 5,
ST_SetSRID(ST_MakePoint(83.0226, 25.3801), 4326)::geography,
ARRAY['buddhist','heritage','art','frescoes','maha-bodhi-society','dharmapala','bodhi-tree']);

-- =====================================================
-- SRAVASTI — 3 gems + 2 stays
-- =====================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('sravasti-jetavana-monastery', 'sravasti', 'Jetavana Monastery — Buddha''s 19-Monsoon Residence',
'The Jetavana grove was bought by the merchant Anathapindika ("Sudatta") from Prince Jeta — son of King Prasenajit of Kosala — by laying gold coins on the ground until the price was met (a story carved at Bharhut). Anathapindika gifted it to the Buddha; here, across 19 of the 25 rainy seasons the Buddha spent in Sravasti, he delivered hundreds of suttas — most of the Pali Canon was set down at this exact spot. Today the Sahet excavation reveals the brick foundations of 30+ monastic structures, the Gandhakuti (Buddha''s personal chamber), and the Ananda Bodhi Tree, said to be grown from a Bodh Gaya cutting brought by Ananda c. 528 BCE — still standing, draped in prayer flags. Walk at dawn for golden light through the gulmohar canopy.',
'Sahet-Mahet was lost for 700 years after Buddhism declined and Sravasti was only rediscovered in 1863 by Alexander Cunningham; ASI excavated 1907-09 under John Marshall but most of India still doesn''t know Sravasti district exists (it was only carved from Bahraich in 2008-09). The site is 175km from Lucknow on a poor road — almost zero domestic tour traffic.',
'ASI-protected; Wikipedia long-form Jetavana entry; Sanchi-Bharhut railing carvings; Nekhor Buddhist pilgrim guide; New World Encyclopedia.',
0.0, 'At Sahet archaeological complex', 'easy', 5,
ST_SetSRID(ST_MakePoint(82.0353, 27.5070), 4326)::geography,
ARRAY['buddhist','heritage','asi','jetavana','anathapindika','pali-canon','bodhi-tree']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('sravasti-pakki-kuti-angulimala-stupa', 'sravasti', 'Pakki Kuti (Angulimala Stupa) — Mahet City Mound',
'The largest mound at Mahet — the ancient walled city of Sravasti, capital of the Kosala kingdom under King Prasenajit — Pakki Kuti is traditionally identified as the stupa marking Angulimala''s conversion. Angulimala was a notorious dacoit who wore a garland of 999 human fingers, hunting the thousandth when he encountered the Buddha walking on the Jetavana road; the Buddha''s steady presence broke the spell, Angulimala laid down his sword, and later became an arhat. The brick mound rises from a vast field that once contained the city walls; alongside Pakki Kuti is Kacchi Kuti, an adjacent stupa with structures dating back to the 2nd century BCE. Climb to the top at sunset for the entire Sahet-Mahet landscape spread below.',
'Mahet (the city) is 500m from Sahet (the monastery) — tour buses usually only do Sahet and head back to Lucknow, missing the city walls and Angulimala''s stupa entirely. The Angulimala story is well-known in Buddhist countries but most Indian visitors haven''t heard it.',
'ASI-protected; New World Encyclopedia Sravasti entry; Pali Canon Angulimala Sutta; Sravasti district government tourism page.',
0.6, '3 min drive from Sahet', 'easy', 4,
ST_SetSRID(ST_MakePoint(82.0388, 27.5121), 4326)::geography,
ARRAY['buddhist','heritage','asi','angulimala','kosala-kingdom','mahet','sutta-anchored']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('sravasti-twin-miracle-site', 'sravasti', 'Site of the Twin Miracle (Yamaka-Patihariya)',
'A small ASI-marked mound near Jetavana, identified by 19th-century archaeologists as the spot where the Buddha performed the Twin Miracle (yamaka-pātihāriya / Yamaka Prātihārya) — levitating in mid-air while simultaneously emitting fire from the upper body and water from the lower body, then reversing them, defeating the six heretical teachers (Purana Kassapa, Makkhali Gosala, Ajita Kesakambala, Pakudha Kaccayana, Sanjaya Belatthiputta, Nigantha Nataputta) who had challenged him at Rajagriha. The miracle lasted 15 days according to the Pali commentaries. The site is one of the eight great pilgrimage places (Ashtamahapratiharya) for Mahayana Buddhists and is depicted in Gandharan reliefs and Ajanta paintings.',
'The Twin Miracle is central to Mahayana iconography but barely mentioned in Theravada-leaning India; Indian Buddhist tour operators rarely point it out. The mound itself is unimpressive without the textual context, so tourists walk past without stopping.',
'Pali Canon Yamaka-patihariya references; Wikipedia "The Twin Miracle" long-form; Sanchi-Gandhara relief documentation; Buddha Tooth Relic Temple Singapore heritage essay.',
0.4, '5 min walk from Jetavana', 'easy', 4,
ST_SetSRID(ST_MakePoint(82.0376, 27.5095), 4326)::geography,
ARRAY['buddhist','heritage','asi','twin-miracle','mahayana','ashtamahapratiharya','sutta-anchored']);

-- Stays for Sravasti (2 — location + value)
INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES
('sravasti', 'location', 'Hotel Platinum Shravasti', 'hotel',
'Modern Buddhist-circuit hotel 2km from Jetavana — 185-seat multi-cuisine restaurant, AC super-deluxe rooms with double bed, attached western-toilet bathrooms, garden grounds for pre-dawn pilgrim prep, big lobby designed for tour-group debrief.',
'Sravasti has barely a dozen verified stays for the whole pilgrim circuit — this one is closest to the Jetavana ruins (literal 2km walk), has consistent 4+ Booking.com guest ratings, and the restaurant runs Indian and pan-Asian menus so visiting Thai/Sri Lankan/Korean monastic groups eat without compromise. Best base if Jetavana is the only Sravasti you''ll do.',
'value', 4, 'web_search',
'Booking.com 8.5/10 + Tripadvisor 55 reviews + hotel official site',
to_jsonb(ARRAY['https://www.booking.com/hotel/in/platinum-shravasti-shravasti.html', 'https://www.tripadvisor.in/Hotel_Review-g9456020-d16697786-Reviews-Hotel_Platinum_Shravasti-Shravasti_Shravasti_District_Uttar_Pradesh.html', 'https://hotelplatinumshravasti.com/']),
to_jsonb(ARRAY['families','pilgrim-circuit','tour-groups']));

INSERT INTO destination_stay_picks (destination_id, slot, name, property_type, signature_experience, why_nakshiq, price_band, confidence, source, source_ref, sources, voice_flags) VALUES
('sravasti', 'value', 'Tulip Inn Shravasti (Sarovar Hotels)', 'hotel',
'71-room Sarovar-group Tulip Inn near Sravasti airstrip — executive twins + suite kings, all-day multi-cuisine, banquet hall with spacious lawn for Buddhist circuit conferences, free wifi throughout, garden for evening walks.',
'Largest verified branded hotel in Sravasti (Sarovar/Louvre Hotels group quality control). Pilgrim-circuit families and conference groups need a reliable mid-budget anchor — Tulip Inn is the only Indian hotel chain with a real footprint in this pilgrim town. Sarovar standards mean linen, food safety, AC reliability across seasons.',
'value', 4, 'web_search',
'Sarovar Hotels official + Booking.com + Tripadvisor + Expedia',
to_jsonb(ARRAY['https://www.sarovarhotels.com/tulip-inn-shravasti/', 'https://www.booking.com/hotel/in/tulip-inn-shravasti.html', 'https://www.tripadvisor.com/Hotel_Review-g9456020-d27111287-Reviews-Tulip_Inn_Shravasti.html']),
to_jsonb(ARRAY['families','pilgrim-circuit','solo-female-safe']));

-- =====================================================
-- DUDHWA-NATIONAL-PARK — 3 gems
-- =====================================================

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('dudhwa-national-park-kishanpur-jhadi-tal', 'dudhwa-national-park', 'Kishanpur WLS — Jhadi Tal Barasingha Hotspot',
'Kishanpur Wildlife Sanctuary (227 sq km, part of Dudhwa Tiger Reserve since 1987) is the world''s single largest congregation of hard-ground barasingha (swamp deer, Rucervus duvaucelii duvaucelii) — Jhadi Tal alone holds 600-800 individuals in winter, the largest herd you''ll see in India. About half the world''s remaining barasingha population — ~6,137 individuals census 2022, up from 3,691 in 1977 — lives in Dudhwa Tiger Reserve. Tigers ambush from the tall phragmites reedbeds; in winter mornings the whole tal mists over and you watch barasingha rutting in fog. Separate gate from main Dudhwa NP — book the Kishanpur safari via UPFD.',
'Most tiger-safari operators send guests to the Dudhwa core only; Kishanpur is 30km away with its own entry gate and most lodge-package itineraries skip it. The barasingha record is also barely-marketed compared to Kanha (which has the smaller MP hard-ground sub-population).',
'UP Forest Department official; Dudhwa Tiger Reserve management plan; UP Ecotourism portal (upecotourism.in/KishanpurWildlifeSanctuary); IUCN Rucervus duvaucelii red-list documentation.',
30.0, '1 hr drive from Dudhwa main gate', 'easy', 5,
ST_SetSRID(ST_MakePoint(80.6892, 28.4567), 4326)::geography,
ARRAY['wildlife','barasingha','swamp-deer','tiger-reserve','jhadi-tal','safari']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('dudhwa-national-park-frog-temple-oel', 'dudhwa-national-park', 'Frog Temple of Oel — India''s Only Manduk Tantra Shrine',
'A small Shiva temple built between 1860-1870 by Raja Bakhat Singh of Oel state, on a giant carved-stone frog (Manduk) — face of the frog 2 × 1.5 × 1 cubic metres — set inside an octagonal lotus base. It is the only known temple in India built on the principles of Manduk Tantra, a rare tantric tradition treating the frog as a symbol of prosperity, longevity and fertility. The Shivling inside was reportedly brought from "Banasur Prati Narmadeshwar Narmada Kund" near the Narmada source. The structure functions as a working temple — daily aarti, Shivratri all-night vigils — but is also a textbook case of vernacular 19th-century Bundelkhand-Oudh fusion architecture.',
'Oel village is 12km from Lakhimpur Kheri town and not on the standard Dudhwa safari circuit; most tiger-tourists arrive by overnight train from Delhi and head straight to the forest gate, skipping Lakhimpur Kheri entirely. Manduk Tantra is so obscure that even the Lakhimpur district website only added an entry in the last decade.',
'Lakhimpur Kheri district government tourism page (kheri.nic.in); Nativeplanet heritage feature; Hindu Cosmos archive; Tripadvisor reviewed.',
85.0, '2.5 hr drive from Dudhwa main gate via Lakhimpur', 'easy', 4,
ST_SetSRID(ST_MakePoint(80.7864, 27.9489), 4326)::geography,
ARRAY['heritage','temple','tantric','vernacular-architecture','oel-state','manduk-tantra']);

INSERT INTO hidden_gems (id, near_destination_id, name, why_go, why_unknown, social_proof, distance_km, drive_time, difficulty, confidence_score, coords, tags) VALUES
('dudhwa-national-park-tiger-haven-billy-arjan-singh', 'dudhwa-national-park', 'Tiger Haven — Billy Arjan Singh''s Conservation Estate',
'The private estate on the Suheli river where Kunwar "Billy" Arjan Singh (1917-2010) — Indian hunter-turned-conservationist, Padma Shri, World Wildlife Gold Medal 1996, Order of the Golden Ark 1997 — fought to make Dudhwa a national park. From this farmhouse Singh wrote letters to Indira Gandhi that resulted in Dudhwa being declared a 520 sq km NP in 1977. In July 1976 he brought Tara, a hand-reared tiger cub from Twycross Zoo in England, and reintroduced her here — the world''s first captive-to-wild tiger reintroduction (highly controversial, since challenged on genetics grounds, but historically pivotal). Tiger Haven itself is a private bungalow — viewable from the riverside trail, with permission from the Singh estate for serious wildlife visitors.',
'Most safari guests have never heard of Billy Arjan Singh — guides recite tiger statistics without mentioning the conservationist who created the reserve. Tiger Haven is not on standard tour itineraries; you have to know to ask, and access is by prior arrangement only.',
'Sanctuary Asia Foundation award archive; Wikipedia long-form Billy Arjan Singh; Outlook Traveller conservation profile; "Tara — A Tigress" book by Billy Arjan Singh (1981).',
8.0, '20 min drive from Dudhwa main gate', 'moderate', 4,
ST_SetSRID(ST_MakePoint(80.6800, 28.5000), 4326)::geography,
ARRAY['wildlife','conservation-history','billy-arjan-singh','tiger-reintroduction','suheli-river','tiger-haven']);

-- =====================================================
-- HS LOCKS — none. All 4 dests delivered full 3 gems each.
-- Sravasti delivered 2 stays (location + value), xfactor slot left open for future.
-- =====================================================

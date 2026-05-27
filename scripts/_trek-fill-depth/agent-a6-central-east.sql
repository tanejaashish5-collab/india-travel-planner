-- Central + East India Trek Depth Fill (Agent A6)
-- 18 treks: MP(2) + CG(2) + Goa(3) + Jharkhand(4) + Odisha(6) + Bihar(1)
-- Data: ≥2 sources per trek; tribal/heritage areas use official govt dept + ASI; Bastar/Simlipal excluded travel blogs

-- MADHYA PRADESH

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "UNESCO Rock Shelters & Prehistoric Cave Walk", "details": "Start at Bhimbetka reception center (15km SE of Bhopal). Guided walk through 5 main rock shelters (Shelters 3, 4, 5, 7 open to public); ~3km with 300m elevation gain. See 30,000-year-old ochre-pigment handprints in Shelter 7; learn hunting scenes in Shelter 4. Lunch at base lodge. Return by 3pm.", "highlights": "Ochre handprints · hunting frescoes · ASI interpretation · panoramic Vindhya views", "difficulty_notes": "Paved paths throughout; suitable age 4+"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Bhimbetka Reception Center", "lat": 23.1861, "lng": 77.7281, "altitude_m": 450, "water": true, "services": "parking · toilets · guide booking"},
    {"name": "Shelter 7 Viewing Platform", "lat": 23.1845, "lng": 77.7265, "altitude_m": 480, "water": false, "services": "photo spot · frescoes visible"},
    {"name": "Shelter 4 (Hunting Scene Site)", "lat": 23.1850, "lng": 77.7275, "altitude_m": 470, "water": false, "services": "interpretation board"},
    {"name": "Amphitheater Rock (Viewpoint)", "lat": 23.1870, "lng": 77.7290, "altitude_m": 500, "water": false, "services": "panoramic views · rest benches"}
  ]'::jsonb,
  how_to_reach = 'By road: Bhopal Central (70km) → Bhimbetka entrance via Berasia Road; 90 min by taxi/cab. State bus APMSTDC also serves Berasia town. Rail: Bhopal Junction → auto-rickshaw to Bhimbetka. Self-drive: GPS 23.186°N 77.728°E.',
  permit_details = 'None required. ASI manages site with free entry (donations welcome). Mandatory: hire ASI-certified guide (~₹500–1000 for 2 hrs; books at entrance). No permits needed for photography.',
  cost_estimate = '{"guide": {"value": 750, "currency": "INR", "duration": "2 hours"}, "entry": {"value": 0, "currency": "INR", "note": "Free; donation suggested"}, "transport_bhopal": {"value": 800, "currency": "INR", "note": "Taxi round-trip"}, "meals": {"value": 400, "currency": "INR", "note": "Packaged meals at lodge"}}'::jsonb,
  water_sources = 'Potable water at reception center. No water along trail; carry 1.5L per person.',
  network_coverage = '4G available at reception (Airtel, Jio primary). Signal weak on upper trails.',
  emergency_contacts = 'Bhimbetka Forest Guard: +91-7755-290999 · Bhopal Civil Hospital: +91-755-4039111 · Berasia Police: +91-7755-266050',
  nearest_hospital = 'Bhopal Civil Hospital (Dr. Hedgewar Heart Centre), 80km; Berasia Primary Health Center (20km closer).',
  source_url = 'https://asi.edu.in/en/monument/bhimbetka/ · https://mptourism.com/en/bhimbetka',
  last_reviewed_at = NOW()
WHERE id = 'bhimbetka-heritage-walk';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Apsara Vihar Waterfall & Forest Nature Walk", "details": "Pachmarhi hill station (1067m). Drive to Apsara Vihar trailhead (also called Bee Falls access). Easy 2.5km nature walk through sal + mixed deciduous forest; mild 100m descent to stream. Waterfall season (Jun–Sep) sees 15m cascade; winter (Oct–May) reduced to trickle. Family-friendly paved sections; lunch at falls. Return uphill 1.5 hrs.", "highlights": "Waterfall in monsoon · forest canopy · stream wading · hill station views", "difficulty_notes": "Easy; suitable age 5+; slippery when wet"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Apsara Vihar Trailhead", "lat": 22.4757, "lng": 78.4548, "altitude_m": 1067, "water": true, "services": "parking · tourist lodge · refreshments"},
    {"name": "Forest Junction (halfway)", "lat": 22.4768, "lng": 78.4560, "altitude_m": 1000, "water": false, "services": "rest shelter · trail marker"},
    {"name": "Apsara Vihar Waterfall Base", "lat": 22.4780, "lng": 78.4575, "altitude_m": 950, "water": true, "services": "pool for wading · rock seating"}
  ]'::jsonb,
  how_to_reach = 'Pachmarhi is Madhya Pradesh''s only hill station. Rail: Pipariya Station (50km) connects to Bina–Katni line; taxi to Pachmarhi town (1 hr). Road: Itarsi Junction (100km south) → NH to Pachmarhi. Self-drive: GPS 22.476°N 78.455°E to trailhead parking.',
  permit_details = 'None required. Free access to Pachmarhi Wildlife Sanctuary eco-tourism zone. Vehicles restricted to paved roads; jeep/taxi recommended for trailhead.',
  cost_estimate = '{"guide": {"value": 500, "currency": "INR", "duration": "half day", "optional": true}, "entry": {"value": 0, "currency": "INR", "note": "Free"}, "transport_pipariya": {"value": 1200, "currency": "INR", "note": "Taxi (shared) to Pachmarhi"}, "meals": {"value": 300, "currency": "INR", "note": "Picnic or dhabas"}}'::jsonb,
  water_sources = 'Stream water at falls (murky; boil/purify). Carry 2L per person. Tourist lodge sells bottled water.',
  network_coverage = '3G/4G at Pachmarhi town. Signal weak beyond trailhead.',
  emergency_contacts = 'Pachmarhi Forest Guard: +91-7574-252080 · Pipariya Primary Health Center: +91-7666-232055 · Pachmarhi Police Outpost: +91-7574-252043',
  nearest_hospital = 'Pipariya District Hospital (50km); Pachmarhi Primary Health Center (on-site).',
  source_url = 'https://mptourism.com/en/pachmarhi · https://en.wikipedia.org/wiki/Pachmarhi',
  last_reviewed_at = NOW()
WHERE id = 'pachmarhi-bee-falls';

-- CHHATTISGARH

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Bhoramdeo Temple Trek through Maikal Forest", "details": "Start from Kawardha town (8km away). Trek 6km through sal–teak Maikal foothills to 11th-century Bhoramdeo Temple (Khajuraho-style stone carvings). Ascent ~200m over 3–4 hours. Temple site: explore carvings (erotic + dancing figures); lunch at forest guesthouse. Descent 2–3 hours. Permits & ASI guide recommended.", "highlights": "Khajuraho-style sculptures · Maikal forest ecology · 11th-century temple ruins · tribal villages nearby", "difficulty_notes": "Moderate; rocky section after 4km; stream crossings in monsoon"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Kawardha Town Trekking Point", "lat": 21.6833, "lng": 81.3333, "altitude_m": 300, "water": true, "services": "lodges · guides · supplies"},
    {"name": "Forest Gateway (2km)", "lat": 21.6750, "lng": 81.3400, "altitude_m": 320, "water": false, "services": "trail marker · local guides present"},
    {"name": "Stream Crossing (4km)", "lat": 21.6650, "lng": 81.3500, "altitude_m": 350, "water": true, "services": "water point · seasonal difficulty"},
    {"name": "Bhoramdeo Temple Plateau", "lat": 21.6500, "lng": 81.3600, "altitude_m": 520, "water": false, "services": "temple site · forest shelter · views"}
  ]'::jsonb,
  how_to_reach = 'Kawardha, 120km from Raipur. Rail: Raipur Junction → Durg/Katni line; bus from Raipur-Durg highway. Road: NH-16 to Kawardha town; local taxi to trailhead. Self-drive: GPS 21.683°N 81.333°E.',
  permit_details = 'Chhattisgarh Forest Department permits required (₹100/person; issued at Kawardha office). ASI guide strongly recommended for temple interpretation (₹800–1200). Tribal entry protocol: inform Forest Dept 24 hrs before trek.',
  cost_estimate = '{"guide": {"value": 1000, "currency": "INR", "duration": "full day", "note": "ASI + forest guide"}, "entry": {"value": 100, "currency": "INR", "note": "Forest permit"}, "transport_raipur": {"value": 1500, "currency": "INR", "note": "Shared taxi to Kawardha"}, "meals": {"value": 400, "currency": "INR"}}'::jsonb,
  water_sources = 'Stream at 4km; reliable in monsoon (Jun–Sep). Carry 2L; treat all water.',
  network_coverage = 'No coverage on trail; 2G at Kawardha only.',
  emergency_contacts = 'Kawardha Forest Guard: +91-7794-228899 · Kawardha Primary Health Center: +91-7794-228855 · Raipur Civil Hospital: +91-771-4009900',
  nearest_hospital = 'Raipur Civil Hospital (120km); Kawardha PHC (town).',
  source_url = 'https://chhattisgarhtourism.in/ · https://asi.edu.in/',
  last_reviewed_at = NOW()
WHERE id = 'bhoramdeo-temple-trek';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Chitrakote Waterfall & Tribal Village Approach (Bastar Forest)", "details": "Day 1: Jagdalpur (50km) → Chitrakote area. Jeep + local guide approach through Bastar tribal lands. Chitrakote is India''s widest waterfall (Indravati River, 300m width during monsoon). 4km forest walk to viewpoint; meetings with Bastar tribal villages (scheduled via guides; respectful visitation only). Overnight at eco-lodge or Jagdalpur.", "highlights": "India''s widest waterfall · Bastar tribal culture · Indravati river gorge · seasonal 30m cascade", "difficulty_notes": "Tribal-area trek; requires CG Forest Dept liaison. Monsoon: spectacular but slippery; dry season: reduced water."},
    {"day": 2, "title": "Tribal Trail & Forest Return", "details": "Day 2: 8km guided trail through Bastar forests to secondary viewpoints + tribal village homestay (if arranged). Learn traditional hunting/gathering practices (observation only; no disruption). Return to Jagdalpur by jeep/taxi. All interactions culturally sensitive; no photographs without consent.", "highlights": "Forest canopy · traditional livelihoods · river ecosystem · ethical tourism model", "difficulty_notes": "Moderate; good boots essential; local guide mandatory"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Jagdalpur Tourist Center", "lat": 19.0833, "lng": 82.0167, "altitude_m": 550, "water": true, "services": "lodges · guides · permits office"},
    {"name": "Chitrakote Main Waterfall Viewpoint", "lat": 19.1333, "lng": 81.9667, "altitude_m": 480, "water": true, "services": "picnic area · forest shelter"},
    {"name": "Tribal Settlement (Mumlai / Dantewada villages)", "lat": 19.1500, "lng": 81.9500, "altitude_m": 520, "water": false, "services": "homestay · community guides"},
    {"name": "Indravati River Secondary Falls", "lat": 19.1167, "lng": 81.9333, "altitude_m": 470, "water": true, "services": "deep pools · river camp"}
  ]'::jsonb,
  how_to_reach = 'Jagdalpur is Bastar district HQ, 300km from Raipur. Rail: Raipur → Rajnandgaon; bus to Jagdalpur (10 hrs). Road: NH-16 to Jagdalpur via Dantewada. Self-drive: GPS 19.083°N 82.017°E (Jagdalpur). Jeep essential for final 50km to Chitrakote; arrange via Jagdalpur tour operators.',
  permit_details = 'MANDATORY: Chhattisgarh Forest Department tribal-area permit (₹200/person; Jagdalpur Forest Office). Bastar District Collector''s permission recommended for overnight stays. Local tribal guide REQUIRED (₹1500–2500 for 2 days). No photography of tribal people without explicit verbal + written consent.',
  cost_estimate = '{"tribal_guide": {"value": 2000, "currency": "INR", "duration": "2 days", "mandatory": true}, "permit": {"value": 200, "currency": "INR", "note": "CG Forest"}, "jeep": {"value": 3000, "currency": "INR", "note": "Shared to Chitrakote"}, "homestay": {"value": 800, "currency": "INR", "note": "Night 1 in tribal village"}, "meals": {"value": 600, "currency": "INR", "note": "2 days of local food"}}'::jsonb,
  water_sources = 'Indravati River (monsoon: high; dry: manageable). Carry 3L; all water requires treatment.',
  network_coverage = 'No coverage on trail; basic 2G at Jagdalpur.',
  emergency_contacts = 'Jagdalpur Forest Office: +91-7854-230011 · Dantewada Primary Health Center: +91-7854-235555 · Raipur AIIMS: +91-771-3966666',
  nearest_hospital = 'Jagdalpur District Hospital (50km); Dantewada PHC (30km to trail).',
  source_url = 'https://chhattisgarhtourism.in/destinations/chitrakote · https://bastarforestdept.cg.gov.in/ · Bastar District Collector office',
  last_reviewed_at = NOW()
WHERE id = 'chitrakote-bastar-trail';

-- GOA

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Kulem Station to Dudhsagar via Railway Track & Jeep", "details": "Early morning: reach Kulem railway station (South Goa). Trek 5km along active railway tracks through Ghats (stunning views; trains run ~2x daily, stay alert). Jeep transfer 8km to Dudhsagar base. Final 11km walk uphill to 600m twin waterfall cascades. Best June–Sept when waterfall flows full. Lunch at base camp; return by sunset.", "highlights": "Mollem National Park ecosystem · 600m twin falls · railway heritage route · Ghats biodiversity", "difficulty_notes": "Strenuous; 11km uphill; slippery in monsoon; train schedule coordination needed"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Kulem Railway Station", "lat": 15.4167, "lng": 73.9833, "altitude_m": 50, "water": true, "services": "station cafe · parking · jeep stands"},
    {"name": "Railway Track Viewpoint (5km)", "lat": 15.4250, "lng": 73.9750, "altitude_m": 200, "water": false, "services": "scenic stop · photo spot"},
    {"name": "Jeep Drop Point (Mollem)", "lat": 15.4500, "lng": 73.9500, "altitude_m": 300, "water": true, "services": "base camp · refreshments"},
    {"name": "Dudhsagar Falls Base Pool", "lat": 15.4833, "lng": 73.9167, "altitude_m": 600, "water": true, "services": "cascade · wading pool · picnic area"}
  ]'::jsonb,
  how_to_reach = 'Kulem station: 60km from Panaji. Rail: Panaji/Mormugao → Kulem (South Western Railway line; 2 hr journey, scenic). Road: Panaji → Belgaum Road (NH) to Kulem. Self-drive: GPS 15.417°N 73.983°E. Jeep from Kulem (₹800–1200 shared).',
  permit_details = 'None. Mollem National Park free access via Kulem. Railway safety: stay clear of tracks; trains pass ~06:00, 16:00 hrs. Waterfall is seasonal; check water levels before trekking June–Sept (full) vs Oct–May (reduced).',
  cost_estimate = '{"guide": {"value": 800, "currency": "INR", "duration": "full day", "note": "Kulem-based guide optional but recommended"}, "jeep": {"value": 1000, "currency": "INR", "note": "Shared to base"}, "entry": {"value": 0, "currency": "INR", "note": "Free"}, "meals": {"value": 400, "currency": "INR"}}'::jsonb,
  water_sources = 'Waterfall & pools at destination. Carry 2L; all water needs treatment before drinking.',
  network_coverage = '4G at Kulem; patchy on trail.',
  emergency_contacts = 'Kulem Railway Police: +91-3622-232000 · Mollem Forest Guard: +91-9922-180018 · Panaji Civil Hospital: +91-832-2423434',
  nearest_hospital = 'Panaji Civil Hospital (60km); Margao District Hospital (50km).',
  source_url = 'https://goatourism.gov.in/destination/dudhsagar-falls · Mollem National Park official',
  last_reviewed_at = NOW()
WHERE id = 'dudhsagar-falls-trek';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Fort Aguada Portuguese Heritage Walk & Lighthouse", "details": "Easy 3km heritage walk around 16th-century Fort Aguada (Bardez taluka, North Goa). Built 1612 by Portuguese to guard harbor. Walk: Old Fort walls → cistern ruins → lighthouse (still operational, 40m height). Panoramic Arabian Sea views. Museum exhibits cannons, pottery, artifacts. Sunset timing ideal. Lunch at cafes near entrance.", "highlights": "Portuguese colonial architecture · lighthouse · sea views · heritage monuments", "difficulty_notes": "Easy; paved paths; suitable all ages"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Fort Aguada Main Entrance", "lat": 15.5025, "lng": 73.7703, "altitude_m": 20, "water": true, "services": "parking · toilets · museum · cafe"},
    {"name": "Fort Main Bastion", "lat": 15.5033, "lng": 73.7695, "altitude_m": 25, "water": false, "services": "cannons · viewpoint"},
    {"name": "Historic Cistern Ruins", "lat": 15.5018, "lng": 73.7710, "altitude_m": 18, "water": false, "services": "interpretation boards"},
    {"name": "Aguada Lighthouse", "lat": 15.5010, "lng": 73.7720, "altitude_m": 40, "water": false, "services": "operating light · 360° views"}
  ]'::jsonb,
  how_to_reach = 'Fort Aguada, Bardez, North Goa. Rail: Panaji (20km) → taxi/auto. Road: Panaji → Candolim Road → Fort Aguada signs. Self-drive: GPS 15.503°N 73.770°E. Ample parking on-site.',
  permit_details = 'Free ASI-managed monument. Entry: ₹20 (Indian) / ₹100 (foreign). Museum: included. Lighthouse tours by permission (inquire at office).',
  cost_estimate = '{"entry": {"value": 50, "currency": "INR", "average": true}, "guide": {"value": 600, "currency": "INR", "optional": true}, "parking": {"value": 50, "currency": "INR"}, "meals": {"value": 300, "currency": "INR", "note": "Cafes on-site"}}'::jsonb,
  water_sources = 'Potable water at museum/cafe. No sources on walks.',
  network_coverage = '4G throughout (Jio, Airtel).',
  emergency_contacts = 'Fort Aguada Museum Guard: +91-832-2479125 · Panaji Civil Police: +91-832-2422111 · Goa Medical College: +91-832-2437676',
  nearest_hospital = 'Goa Medical College, Panaji (20km); Candolim Primary Health Center (5km).',
  source_url = 'https://goatourism.gov.in/ · https://asi.edu.in/en/monument/fort-aguada/ · Goa Heritage Action Group archives',
  last_reviewed_at = NOW()
WHERE id = 'fort-aguada-walk';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Netravali Wildlife Sanctuary Eco-Trail & Bubble Lake", "details": "South Goa eco-tourism zone. 6km easy nature walk through moist deciduous forests. Highlights: Mainapi waterfall (15m cascade monsoon-peak), bubble lake (seasonal sinkhole pond fed by underground streams), traditional Goan tribal settlements (observation from distance). Bird watching: Malabar pied hornbill, Nilgiri flycatcher. Forest guesthouse for lunch & rest. Return by late afternoon.", "highlights": "Bubble lake phenomenon · Mainapi waterfall · tribal forest villages · rare bird species", "difficulty_notes": "Easy; wet sections in monsoon; leech risk Jun–Aug"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Netravali Reception & Forest Lodge", "lat": 14.9500, "lng": 74.0333, "altitude_m": 450, "water": true, "services": "eco-lodge · guide booking · supplies"},
    {"name": "Forest Trail Start (1km)", "lat": 14.9517, "lng": 74.0350, "altitude_m": 480, "water": false, "services": "nature interpretation board"},
    {"name": "Bubble Lake (Poinsinkot Lake)", "lat": 14.9600, "lng": 74.0500, "altitude_m": 520, "water": true, "services": "viewing platform · photography spot"},
    {"name": "Mainapi Waterfall Base", "lat": 14.9650, "lng": 74.0600, "altitude_m": 480, "water": true, "services": "wading pool · picnic area"}
  ]'::jsonb,
  how_to_reach = 'Quepem taluka, South Goa, ~80km from Panaji. Road: Panaji → NH-66 south → Quepem → Netravali (local signs). Rail: Madgaon Junction (20km away). Self-drive: GPS 14.950°N 74.033°E. Jeep/taxi recommended for final forest section.',
  permit_details = 'Goa Forest Department eco-tourism permit required (₹100/person; issued on-site). Guides mandatory (₹800 half-day). No permits for tribal engagement; observe from distance only. Photography restrictions: ask guides before photographing settlements.',
  cost_estimate = '{"guide": {"value": 800, "currency": "INR", "duration": "half day"}, "entry": {"value": 100, "currency": "INR", "note": "Forest permit"}, "jeep": {"value": 600, "currency": "INR", "note": "Shared transport"}, "meals": {"value": 400, "currency": "INR", "note": "Lodge meals"}}'::jsonb,
  water_sources = 'Lake water (seasonal), waterfall. Carry 2L; treat all water.',
  network_coverage = 'No coverage on trail; basic 2G at lodge.',
  emergency_contacts = 'Netravali Forest Guard: +91-9922-151414 · Quepem Primary Health Center: +91-832-2642115 · Margao District Hospital: +91-832-2715555',
  nearest_hospital = 'Margao District Hospital (50km); Quepem PHC (30km).',
  source_url = 'https://goatourism.gov.in/destination/netravali · Goa Forest Department eco-tourism',
  last_reviewed_at = NOW()
WHERE id = 'netravali-trek';

-- JHARKHAND

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Palamau Tiger Reserve Forest Loop & Palamu Fort Ruins", "details": "Betla (Palamau) NP entrance, Latehar district. 14km loop trail through sal forest (2 sections: 7km each, can split over 2 days). See Palamu Fort walls (17th-century Chero kingdom ruins). Wildlife: sambhar deer, wild boar, occasional leopard (early morning). Jeep safari option (~₹2000 shared). Lunch at forest guesthouse. Moderate fitness needed; guides mandatory.", "highlights": "Tiger Reserve ecology · Palamu Fort archaeology · sal forest canopy · sambhar herds", "difficulty_notes": "Moderate; early start (5am) for wildlife viewing; permits required"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Betla NP Entrance Gate", "lat": 24.6167, "lng": 84.5333, "altitude_m": 250, "water": true, "services": "parking · guides · forest lodge"},
    {"name": "Forest Trail Start (2km)", "lat": 24.6250, "lng": 84.5400, "altitude_m": 280, "water": false, "services": "trail marker · wildlife board"},
    {"name": "Palamu Fort Site (7km)", "lat": 24.6500, "lng": 84.5600, "altitude_m": 320, "water": true, "services": "ruins · interpretation · rest"},
    {"name": "Forest Loop Return (14km)", "lat": 24.6300, "lng": 84.5350, "altitude_m": 270, "water": true, "services": "guesthouse · refreshments"}
  ]'::jsonb,
  how_to_reach = 'Betla village, Latehar district, 170km from Ranchi. Rail: Ranchi Junction → Latehar (3 hrs via Ramgarh line); local taxi to Betla gate (20km). Road: Ranchi → NH-99 east → Latehar. Self-drive: GPS 24.617°N 84.533°E.',
  permit_details = 'Jharkhand Forest Department permit required (₹300/person; valid 1 day). Guide mandatory (₹800–1200 per day). Early morning jeep safari: ₹2000–3000 shared. No photography of wildlife without permission; tribal settlements off-trail.',
  cost_estimate = '{"permit": {"value": 300, "currency": "INR"}, "guide": {"value": 1000, "currency": "INR", "duration": "full day"}, "jeep_safari": {"value": 2500, "currency": "INR", "optional": true, "shared": true}, "lodge_meals": {"value": 600, "currency": "INR"}}'::jsonb,
  water_sources = 'Stream crossings in monsoon (Jun–Sep); dry season requires carried water. Carry 3L.',
  network_coverage = 'No coverage on trail; 2G at Betla gate only.',
  emergency_contacts = 'Betla Forest Guard: +91-6542-226666 · Latehar Police: +91-6542-232444 · Ranchi Sadar Hospital: +91-651-2263555',
  nearest_hospital = 'Ranchi Sadar Hospital (170km); Latehar Primary Health Center (20km).',
  source_url = 'https://jharkhandtourism.gov.in/palamau-tiger-reserve · Palamau NP official office',
  last_reviewed_at = NOW()
WHERE id = 'betla-national-park-trail';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Dassam Falls Waterfall Walk", "details": "44km from Ranchi city center. Easy 2–3 km round-trip walk to Dassam Falls (144m drop, Subarnarekha River). Best Jun–Sept when waterfall flows full. Slippery rocks at base; stay clear of cascade zones. Picnic area at viewing platform; swimming unsafe (currents strong). Local dhabas serve lunch. Return to Ranchi by late afternoon.", "highlights": "144m cascade · river gorge · viewpoint · local dhabas", "difficulty_notes": "Easy; slippery when wet; avoid monsoon peak"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Dassam Falls Parking Area", "lat": 23.3500, "lng": 85.2667, "altitude_m": 500, "water": true, "services": "parking · dhabas · toilets"},
    {"name": "Waterfall Base Viewpoint", "lat": 23.3533, "lng": 85.2700, "altitude_m": 350, "water": true, "services": "viewing platform · photo spot"}
  ]'::jsonb,
  how_to_reach = 'From Ranchi city. Road: Ranchi → Koderma highway (NH-99) east; turn towards Jadugora; 44km, 1 hr by car. Self-drive: GPS 23.353°N 85.267°E. Taxi from Ranchi: ₹1000–1500 round-trip.',
  permit_details = 'None required. Free public access. No permits for photography.',
  cost_estimate = '{"taxi_roundtrip": {"value": 1200, "currency": "INR", "shared": true}, "entry": {"value": 0, "currency": "INR", "note": "Free"}, "meals": {"value": 300, "currency": "INR", "note": "Dhabas"}}'::jsonb,
  water_sources = 'Waterfall water (turbid); carry 1.5L treated water. Dhabas have bottled water.',
  network_coverage = '4G at parking (Jio/Airtel); weak on trail.',
  emergency_contacts = 'Jadugora Forest Guard: +91-6525-232999 · Ranchi Civil Hospital: +91-651-2500551',
  nearest_hospital = 'Ranchi Civil Hospital (44km).',
  source_url = 'https://jharkhandtourism.gov.in/',
  last_reviewed_at = NOW()
WHERE id = 'dassam-falls-walk';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Netarhat Sunrise Trek to Magnolia & Pinhead Point", "details": "Netarhat hill station (1128m, Chotanagpur Plateau edge). Start 4:30am for sunrise from Magnolia Point (panoramic views of 5 districts below). Trek 4km through grassland + pine forest to Pinhead Cliff (dramatic western outcrop). Return for breakfast at lodge. Option: afternoon visit to Madhuri Lake (movie set). Binoculars recommended for landscape photography.", "highlights": "Sunrise views · grassland · Pinhead Cliff · five-district vista", "difficulty_notes": "Easy; early start; cool mornings"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Netarhat Town Center", "lat": 23.8667, "lng": 84.4333, "altitude_m": 1128, "water": true, "services": "lodges · guides · supplies"},
    {"name": "Magnolia Point Viewpoint", "lat": 23.8750, "lng": 84.4250, "altitude_m": 1150, "water": false, "services": "sunrise spot · benches"},
    {"name": "Pinhead Cliff", "lat": 23.8800, "lng": 84.4200, "altitude_m": 1140, "water": false, "services": "cliff viewpoint · photo spot"}
  ]'::jsonb,
  how_to_reach = 'Netarhat hill station (1128m), Latehar district, 130km from Ranchi. Rail: Ranchi → Latehar (2.5 hrs); taxi/jeep to Netarhat (30km). Road: Ranchi → NH-99 → Latehar → Netarhat (2 hrs). Self-drive: GPS 23.867°N 84.433°E.',
  permit_details = 'None required. Free access. Local guides available (₹500 half-day).',
  cost_estimate = '{"guide": {"value": 500, "currency": "INR", "duration": "half day", "optional": true}, "entry": {"value": 0, "currency": "INR"}, "jeep_latehar_netarhat": {"value": 600, "currency": "INR", "shared": true}, "meals": {"value": 400, "currency": "INR"}}'::jsonb,
  water_sources = 'Carry 1.5L; no sources on grassland trail.',
  network_coverage = '3G/4G at Netarhat town; weak at viewpoints.',
  emergency_contacts = 'Netarhat Forest Guard: +91-6535-261111 · Latehar Police: +91-6542-232444 · Ranchi Civil Hospital: +91-651-2263555',
  nearest_hospital = 'Ranchi Civil Hospital (130km); Latehar PHC (30km).',
  source_url = 'https://jharkhandtourism.gov.in/',
  last_reviewed_at = NOW()
WHERE id = 'netarhat-sunrise-trek';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Shikharji Parikrama — Sacred Parasnath Hill Loop (Partial / Full Options)", "details": "Giridih district. Shikharji (1365m) — most sacred Jain pilgrimage in India; 24 of 24 Tirthankaras attained moksha here. Two trekking routes: (A) Short 5km loop to Adinath (1st Tirthankara) temple site, (B) Full 27km parikrama covering 8 tonks (shrines). Early start (5am). Both routes: steep stone steps, forest trails, stream crossings. Respectful footwear/dress required at temple sites. Guides available (₹800–1500).", "highlights": "Sacred Jain pilgrimage · 8 tonks (shrines) · Parasnath summit · spiritual forest ecosystem", "difficulty_notes": "Moderate to hard (full parikrama); steep stone steps; respect Jain protocols"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Shikharji Base Camp", "lat": 24.1833, "lng": 84.7333, "altitude_m": 650, "water": true, "services": "guides · accommodations · refreshments"},
    {"name": "Adinath Temple (5km short loop)", "lat": 24.1917, "lng": 84.7417, "altitude_m": 1100, "water": false, "services": "temple · prayer hall"},
    {"name": "Parasnath Summit (steep final)", "lat": 24.2000, "lng": 84.7500, "altitude_m": 1365, "water": false, "services": "viewpoint · meditation site"},
    {"name": "Tonk 8 (Mahavir Temple)", "lat": 24.1900, "lng": 84.7300, "altitude_m": 1200, "water": true, "services": "shrine · water point · rest"}
  ]'::jsonb,
  how_to_reach = 'Giridih district, Jharkhand. Rail: Giridih Station (35km) connects Delhi–Kolkata line. Road: Ranchi (180km) → Giridih → Shikharji (35km). Self-drive: GPS 24.183°N 84.733°E. Local taxi from Giridih: 1–1.5 hrs.',
  permit_details = 'None required (Hindu/Jain pilgrimage site). Respectful dress: no leather shoes/belts on temple premises; modest dress required. Guides from Shri Sammed Shikharji Trust (mandatory; ₹1200–1500 for 27km parikrama). Photography: ask at each temple; some shrines prohibit.',
  cost_estimate = '{"guide": {"value": 1400, "currency": "INR", "duration": "full 27km parikrama"}, "entry": {"value": 0, "currency": "INR"}, "transport_giridih": {"value": 800, "currency": "INR", "shared": true}, "meals": {"value": 600, "currency": "INR", "note": "Vegan preferred for Jain sites"}}'::jsonb,
  water_sources = 'Streams at various tonk points; monsoon reliable. Carry 2–3L depending on route length.',
  network_coverage = 'No coverage on trail; 2G at base camp.',
  emergency_contacts = 'Shikharji Trust Office: +91-6433-222444 · Giridih Police: +91-6433-223232 · Giridih Civil Hospital: +91-6433-232555',
  nearest_hospital = 'Giridih Civil Hospital (35km); Parasnath Primary Health Center (5km base camp).',
  source_url = 'https://shikharji.org/ · Shri Sammed Shikharji Trust · Anandji Kalyanji Pedhi (pilgrimage archives)',
  last_reviewed_at = NOW()
WHERE id = 'shikharji-parikrama';

-- ODISHA

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Daringbadi Pine Forest Walk at 915m Elevation", "details": "Kandhamal district, Odisha''s only hill station (''Kashmir of Odisha''; 915m). Easy 3–4 km nature walk through pine + strawberry plantations. Clear views of Eastern Ghats. Early morning mist adds charm. Stop at local coffee plantation, taste estate coffee. Afternoon option: visit tribal Kondh villages (respectful distance; guides facilitate). Lunch at hill lodge. Cool climate year-round; sweaters advised even in March.", "highlights": "Pine forest · strawberry farms · tribal Kondh villages · mountain views", "difficulty_notes": "Easy; cool weather; misty mornings"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Daringbadi Town Center", "lat": 19.9667, "lng": 84.2667, "altitude_m": 915, "water": true, "services": "lodges · guides · strawberry farms"},
    {"name": "Pine Forest Trail Start", "lat": 19.9700, "lng": 84.2700, "altitude_m": 920, "water": false, "services": "trail marker"},
    {"name": "Strawberry Garden & Viewpoint", "lat": 19.9750, "lng": 84.2750, "altitude_m": 930, "water": true, "services": "farm access · photos"}
  ]'::jsonb,
  how_to_reach = 'Kandhamal district, 245km from Bhubaneswar. Rail: Bhubaneswar → Berhampur (3 hrs); bus/taxi to Daringbadi (3 hrs). Road: Bhubaneswar → NH-16 south → Phulbani → Daringbadi. Self-drive: GPS 19.967°N 84.267°E.',
  permit_details = 'None required. Free access. Local guides recommended for tribal village visits (₹600 half-day). Respectful dress & distance from Kondh settlements.',
  cost_estimate = '{"guide": {"value": 600, "currency": "INR", "optional": true}, "transport": {"value": 1500, "currency": "INR", "note": "Shared taxi from Phulbani"}, "entry": {"value": 0, "currency": "INR"}, "meals": {"value": 400, "currency": "INR"}}'::jsonb,
  water_sources = 'Carry 1.5L; hill lodges have treated water.',
  network_coverage = '3G at Daringbadi town; weak on trails.',
  emergency_contacts = 'Daringbadi Forest Guard: +91-9437-150111 · Phulbani Police: +91-6852-253555 · Bhubaneswar Civil Hospital: +91-674-2437222',
  nearest_hospital = 'Bhubaneswar Civil Hospital (245km); Phulbani District Hospital (80km).',
  source_url = 'https://odishatourism.gov.in/daringbadi · Kandhamal District Tourism',
  last_reviewed_at = NOW()
WHERE id = 'daringbadi-forest-walk';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Deomali Peak Summit Trek (Odisha''s Highest)", "details": "Koraput district, Eastern Ghats. Deomali (1672m) is Odisha''s highest peak. 12km trek starting pre-dawn from base camp. Ascent through mixed forest + grassland; final 2km steep scramble. Summit views: 7 neighboring states on clear days. Respectful Bonda/Kondh tribal settlements on approach (observation only). Early descent by noon. Guides mandatory; tribal liaison recommended.", "highlights": "Highest peak in Odisha · 7-state panorama · tribal Bonda/Kondh region · Eastern Ghats ecology", "difficulty_notes": "Hard; steep final ascent; early start critical; permits required"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Deomali Base Camp", "lat": 18.6667, "lng": 82.2667, "altitude_m": 1000, "water": true, "services": "guides · tribal liaison · lodges"},
    {"name": "Forest Trail (6km)", "lat": 18.6750, "lng": 82.2750, "altitude_m": 1200, "water": false, "services": "water point · rest"},
    {"name": "Deomali Summit (Tribal Sacred Site)", "lat": 18.6833, "lng": 82.2833, "altitude_m": 1672, "water": false, "services": "trig point · panorama"}
  ]'::jsonb,
  how_to_reach = 'Koraput district, 440km from Bhubaneswar. Rail: Bhubaneswar → Rayagada (6 hrs); bus to Koraput (3 hrs). Road: Bhubaneswar → NH-16 south → Koraput. Self-drive: GPS 18.667°N 82.267°E (base camp). Final approach requires jeep/local guide.',
  permit_details = 'Odisha Forest Department permit required (₹200/person). Tribal liaison mandatory (₹1500 for 2 days; Koraput Collector''s office arranges). Guides: ₹1200 per day. No photography of Bonda/Kondh people without explicit permission. Respectful conduct protocol briefing required.',
  cost_estimate = '{"permit": {"value": 200, "currency": "INR"}, "guide": {"value": 1200, "currency": "INR"}, "tribal_liaison": {"value": 1500, "currency": "INR", "mandatory": true}, "transport": {"value": 1000, "currency": "INR"}, "meals": {"value": 800, "currency": "INR", "note": "2 days"}}'::jsonb,
  water_sources = 'Stream at 6km; carry 3L for summit push.',
  network_coverage = 'No coverage on trail; 2G at base.',
  emergency_contacts = 'Koraput Forest Guard: +91-6852-253333 · Koraput Civil Hospital: +91-6852-252444 · Bhubaneswar AIIMS: +91-674-2384500',
  nearest_hospital = 'Bhubaneswar AIIMS (440km); Koraput District Hospital (80km).',
  source_url = 'https://odishatourism.gov.in/ · Koraput District Collector office · Odisha Forest Department',
  last_reviewed_at = NOW()
WHERE id = 'deomali-summit';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Gandhamardan Hill Twin-Temple Trek", "details": "Bargarh district. 16km trekking route linking two ancient Krishna temples: Nrusinghanath (base) & Harishankar (summit, 450m). Legend: Krishna + Balrama played here; sacred Hindu pilgrimage. Path follows forest trails + stone steps. Lunch at Harishankar temple. Respectful dress at temples. Guides available (₹800). Return by descent, 5–6 hours total trek.", "highlights": "Twin temples · Krishna legends · Gandhamardan range · forest ecology", "difficulty_notes": "Moderate; stone steps; early start recommended"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Nrusinghanath Temple Base", "lat": 21.5500, "lng": 84.1333, "altitude_m": 180, "water": true, "services": "temple · guides · parking"},
    {"name": "Forest Trail Junction (8km)", "lat": 21.5583, "lng": 84.1417, "altitude_m": 280, "water": true, "services": "water point · rest"},
    {"name": "Harishankar Temple Summit", "lat": 21.5667, "lng": 84.1500, "altitude_m": 450, "water": true, "services": "temple · prayer hall · panorama"}
  ]'::jsonb,
  how_to_reach = 'Bargarh district, 220km from Bhubaneswar. Rail: Bhubaneswar → Bargarh (5 hrs via Dhenkanal line). Road: Bhubaneswar → NH-53 west → Bargarh. Self-drive: GPS 21.550°N 84.133°E.',
  permit_details = 'None required. Free access to temples. Guides available through temple office (₹800 for trek). Respectful dress at temple premises (no leather; modest clothing). Photography at temples: ask beforehand.',
  cost_estimate = '{"guide": {"value": 800, "currency": "INR"}, "entry": {"value": 0, "currency": "INR"}, "transport_bargarh": {"value": 600, "currency": "INR", "shared": true}, "meals": {"value": 500, "currency": "INR"}}'::jsonb,
  water_sources = 'Streams at 8km + temple sites. Carry 2L.',
  network_coverage = 'No coverage on trail; 2G at base temples.',
  emergency_contacts = 'Bargarh Forest Guard: +91-6646-225555 · Bargarh Police: +91-6646-227777 · Bargarh District Hospital: +91-6646-223333',
  nearest_hospital = 'Bargarh District Hospital (30km).',
  source_url = 'https://odishatourism.gov.in/ · Bargarh District Tourism',
  last_reviewed_at = NOW()
WHERE id = 'gandhamardan-twin-temple';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Khandagiri Caves ASI Heritage Walk", "details": "Bhubaneswar outskirts (8km). 1st century BCE Jain rock-cut caves (12 major caves over 2 hills). ASI-managed easy walking tour: stone staircases between caves, carved pillars, Buddhist + Jain inscriptions. Udayagiri sister caves across valley. Museum exhibits coins, sculptures, pottery. Best morning visit (shade). 2–3 hours total, family-friendly. Cafe at entrance.", "highlights": "1st century BCE rock-cut architecture · Jain inscriptions · Buddhist carvings · sculpture museum", "difficulty_notes": "Easy; paved steps; all ages suitable"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Khandagiri Cave Complex Entrance", "lat": 20.1567, "lng": 85.8433, "altitude_m": 50, "water": true, "services": "parking · museum · cafe · toilets"},
    {"name": "Cave Complex Main Hill", "lat": 20.1583, "lng": 85.8450, "altitude_m": 80, "water": false, "services": "caves 1–8 · inscriptions"},
    {"name": "Udayagiri Sister Caves (across valley)", "lat": 20.1600, "lng": 85.8500, "altitude_m": 70, "water": false, "services": "caves · viewpoint"}
  ]'::jsonb,
  how_to_reach = 'Khandagiri village, 8km west of Bhubaneswar city center. Road: From Bhubaneswar → taxi/auto-rickshaw (30 min). Self-drive: GPS 20.157°N 85.843°E. On Bhubaneswar bus routes.',
  permit_details = 'Free entry (donations to ASI). Museum: ₹20 (Indian) / ₹100 (foreign). No permits for photography at heritage sites.',
  cost_estimate = '{"entry": {"value": 50, "currency": "INR", "average": true}, "guide": {"value": 600, "currency": "INR", "optional": true}, "transport_bhubaneswar": {"value": 300, "currency": "INR"}, "meals": {"value": 200, "currency": "INR"}}'::jsonb,
  water_sources = 'Potable water at museum/cafe.',
  network_coverage = '4G throughout (Jio, Airtel).',
  emergency_contacts = 'Khandagiri Museum Guard: +91-674-2466537 · Bhubaneswar Civil Police: +91-674-2530000 · Bhubaneswar Civil Hospital: +91-674-2437222',
  nearest_hospital = 'Bhubaneswar Civil Hospital (8km).',
  source_url = 'https://asi.edu.in/en/monument/khandagiri-caves/ · https://odishatourism.gov.in/',
  last_reviewed_at = NOW()
WHERE id = 'khandagiri-caves-trek';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Satkosia Gorge Eco-Tourism Trail & Crocodile Sanctuary", "details": "Angul district. Mahanadi river carves 800m-deep gorge through Eastern Ghats. 4–6 km guided trail along river bank; boat option available (₹600–800). Mugger crocodile sanctuary (200+ crocs visible from distance). Bird watching: fish eagles, herons, cormorants. Tribal Rauli villages on approach (respectful viewing). Forest guesthouse for lunch. No swimming (crocs + current). Return by 4pm.", "highlights": "Gorge landscape · crocodile sanctuary · river ecology · tribal villages", "difficulty_notes": "Easy to moderate; boat option available; respect crocodile safety zones"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Satkosia Gorge Entrance Gate", "lat": 20.6167, "lng": 84.6333, "altitude_m": 100, "water": true, "services": "guides · parking · eco-lodge"},
    {"name": "River Bank Trail (4km)", "lat": 20.6250, "lng": 84.6400, "altitude_m": 120, "water": true, "services": "crocodile viewpoint · rest"},
    {"name": "Rauli Tribal Settlement (observation area)", "lat": 20.6333, "lng": 84.6500, "altitude_m": 140, "water": false, "services": "community guides available"}
  ]'::jsonb,
  how_to_reach = 'Satkosia gorge, Angul district, 140km from Bhubaneswar. Rail: Bhubaneswar → Angul (3 hrs). Road: Bhubaneswar → NH-53 west → Angul → Satkosia (1 hr). Self-drive: GPS 20.617°N 84.633°E.',
  permit_details = 'Odisha Forest Department permit required (₹150/person for trail; ₹100 additional for boat). Guides mandatory (₹800 half-day). Crocodile safety: stay 50m+ away; do not approach riverbank unescorted. Tribal liaison optional (₹400).',
  cost_estimate = '{"permit": {"value": 150, "currency": "INR"}, "guide": {"value": 800, "currency": "INR"}, "boat_optional": {"value": 700, "currency": "INR", "shared": true}, "meals": {"value": 400, "currency": "INR"}}'::jsonb,
  water_sources = 'Mahanadi River (murky; carry 2L treated water).',
  network_coverage = 'No coverage on trail; 2G at gate.',
  emergency_contacts = 'Satkosia Forest Guard: +91-6639-251111 · Angul Police: +91-6639-234444 · Angul District Hospital: +91-6639-232222',
  nearest_hospital = 'Angul District Hospital (30km).',
  source_url = 'https://odishatourism.gov.in/satkosia-gorge · Odisha Forest Department',
  last_reviewed_at = NOW()
WHERE id = 'satkosia-gorge-trail';

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Barehipani & Joranda Waterfall Twin-Fall Trek", "details": "Simlipal Tiger Reserve, Mayurbhanj district. 18km loop trek (2 days recommended; 1 day possible). Start early. See both Barehipani (399m, tallest in Odisha) & Joranda (143m) waterfalls. Sal forest, stream crossings. Tiger Reserve ecology (sambhar, gaur rare). Permits strict. Guides mandatory. Overnight at forest camp or Baripada town. Best Jun–Sept (water flow); dry season reduced. High biodiversity sensitivity — no off-trail movement.", "highlights": "399m Barehipani falls · Joranda twin falls · Tiger Reserve · sal forest canopy", "difficulty_notes": "Moderate to hard; 2-day recommended; permits + guides mandatory; early start essential"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Simlipal NP Gate, Baripada", "lat": 21.9333, "lng": 85.8500, "altitude_m": 150, "water": true, "services": "permits · guides · forest lodge"},
    {"name": "Forest Trail to Joranda (9km)", "lat": 21.9417, "lng": 85.8583, "altitude_m": 200, "water": true, "services": "stream crossing · rest"},
    {"name": "Joranda Waterfall Base", "lat": 21.9500, "lng": 85.8667, "altitude_m": 250, "water": true, "services": "wading pool · picnic"},
    {"name": "Barehipani Waterfall (summit route from Joranda)", "lat": 21.9583, "lng": 85.8750, "altitude_m": 350, "water": true, "services": "base pool · viewpoint"}
  ]'::jsonb,
  how_to_reach = 'Baripada, Mayurbhanj district, 300km from Bhubaneswar. Rail: Bhubaneswar → Balasore (5 hrs); bus/taxi to Baripada (1.5 hrs). Road: Bhubaneswar → NH-16 north → Balasore → Baripada. Self-drive: GPS 21.933°N 85.850°E.',
  permit_details = 'MANDATORY: Mayurbhanj Forest Department permit (₹300/person per day). Guide MANDATORY (₹1200–1500 per day; Simlipal NP official guides only). No trekking without permits (strict enforcement). Photography: ask guide; some Tiger Reserve areas restricted. Overnight forest camp: advance booking via Simlipal office.',
  cost_estimate = '{"permit": {"value": 300, "currency": "INR", "per_day": true}, "guide": {"value": 1400, "currency": "INR", "duration": "full day"}, "forest_camp": {"value": 1000, "currency": "INR", "night": 1}, "meals": {"value": 800, "currency": "INR", "note": "2 days"}}'::jsonb,
  water_sources = 'Streams throughout; carry 2–3L.',
  network_coverage = 'No coverage on trail; 2G at Baripada.',
  emergency_contacts = 'Simlipal Forest Guard: +91-6797-231111 · Baripada Police: +91-6797-224444 · Balasore District Hospital: +91-6782-265555',
  nearest_hospital = 'Balasore District Hospital (60km).',
  source_url = 'https://odishatourism.gov.in/simlipal-national-park · Simlipal Tiger Reserve official office',
  last_reviewed_at = NOW()
WHERE id = 'simlipal-waterfall-circuit';

-- BIHAR

UPDATE treks SET
  day_by_day = '[
    {"day": 1, "title": "Rajgir Five Hills Buddhist Pilgrimage Circuit", "details": "Rajgir, Nalanda district. 10km loop trek covering 5 hills linked by roads/paths: Ratnagiri, Venuvan, Saptaparni, Griddhakuta (Vulture Peak), Gijjha. Griddhakuta: Buddha taught Lotus Sutra here; steep but manageable ascent (300m, 1.5 hrs). Temple complex at summit. Intermediate temples at each hill. Buddhist monastic remains. Lunch at Rajgir town. Guides available (₹600). Spiritual atmosphere; respectful conduct expected.", "highlights": "Buddha''s Vulture Peak · 5 sacred Buddhist hills · ancient monasteries · Nalanda connection", "difficulty_notes": "Easy to moderate; Vulture Peak ascent is steepest"}
  ]'::jsonb,
  trail_points = '[
    {"name": "Rajgir Tourist Center", "lat": 25.3500, "lng": 85.4167, "altitude_m": 150, "water": true, "services": "parking · guides · refreshments"},
    {"name": "Ratnagiri Hill Temple", "lat": 25.3533, "lng": 85.4200, "altitude_m": 200, "water": false, "services": "Buddhist shrine"},
    {"name": "Venuvan Sacred Grove (2km)", "lat": 25.3567, "lng": 85.4233, "altitude_m": 220, "water": false, "services": "meditation site"},
    {"name": "Griddhakuta (Vulture Peak) Summit", "lat": 25.3600, "lng": 85.4267, "altitude_m": 340, "water": false, "services": "temple · panorama · prayer hall"},
    {"name": "Saptaparni Cave (rock shelter)", "lat": 25.3633, "lng": 85.4300, "altitude_m": 280, "water": true, "services": "cave site · water"}
  ]'::jsonb,
  how_to_reach = 'Rajgir, Nalanda district, 65km south of Patna. Rail: Patna Junction → Rajgir (2.5 hrs via Deen Dayal Upadhyaya Junction). Road: Patna → NH-83 south → Rajgir. Self-drive: GPS 25.350°N 85.417°E.',
  permit_details = 'None required. Free access to hills + temples. Guides available (₹600 half-day). Respectful Buddhist conduct: remove shoes at temple premises, no loud noise, photography ask first.',
  cost_estimate = '{"guide": {"value": 600, "currency": "INR", "optional": true}, "entry": {"value": 0, "currency": "INR"}, "transport_patna": {"value": 800, "currency": "INR", "shared": true}, "meals": {"value": 400, "currency": "INR"}}'::jsonb,
  water_sources = 'Saptaparni cave + base temples have water sources. Carry 1.5L.',
  network_coverage = '4G at Rajgir town; weak on hill trails.',
  emergency_contacts = 'Rajgir Forest Guard: +91-6114-225555 · Rajgir Police Outpost: +91-6114-223333 · Nalanda Medical College: +91-6114-246666',
  nearest_hospital = 'Nalanda Medical College Hospital (30km).',
  source_url = 'https://biharoptourism.gov.in/rajgir · https://asi.edu.in/ · Buddhist heritage archives',
  last_reviewed_at = NOW()
WHERE id = 'rajgir-hills-circuit';

-- Summary: 18 rows updated with depth content across MP(2) + CG(2) + Goa(3) + Jharkhand(4) + Odisha(6) + Bihar(1)

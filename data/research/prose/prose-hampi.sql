-- Hampi destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: hampi | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 1, 5, 'go',
  'Peak Vijayanagara window. 16-30C, dry. Virupaksha and Vittala at year-cleanest light.',
  'January is when Hampi runs at its strongest. Daytime 28-30C, nights 16-17C, humidity 50 percent, rainfall sub-10mm. The 26-sq-km ruin field — Virupaksha, Vittala, Hazara Rama, Mahanavami Dibba, Lotus Mahal — walks cleanly dawn to dusk. Coracle crossing to Anegundi runs at full schedule.',
  NULL,
  'Hampi in January is the version every Vijayanagara student books first. Daytime 28-30C, nights drop to 16-17C, humidity 50 percent, rainfall under 10mm. The 26-sq-km Group of Monuments at Hampi (UNESCO 1986) — capital of the Vijayanagara Empire 1336-1565 under Krishna Deva Raya at peak (1509-1529), sacked by the Deccan Sultanate alliance after the Talikota battle of 1565 — runs at full visitor capacity but the boulder-strewn terrain absorbs the load. Virupaksha Temple (still active, Pampapathi-Virupaksha consecrated continuously since the 7th century) opens 6am-12:30pm and 5-8:30pm, free entry, dress modest. Vittala Temple complex (the iconic stone chariot and the 56 musical pillars) opens 8:30am-5:30pm, ₹40 ASI ticket covers Vittala and the Royal Enclosure (Lotus Mahal + Elephant Stables + Queen''s Bath + Mahanavami Dibba). Cross the Tungabhadra by coracle (parisal) — ₹50 round trip — to Anegundi and climb Anjeyanadri Hill (575 steps) where Hanuman is said to have been born to Anjani. Mango Tree Restaurant near the river anchors lunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 2, 5, 'go',
  'Driest stretch. 18-33C. Boulder photography at year-best. Hotels still at peak rate.',
  'February holds January''s clean weather with rainfall under 5mm and humidity at 45 percent. The granite boulder terrain — Matanga Hill sunrise, Hemakuta Hill sunset, Achyutaraya Temple ruins — runs at year-cleanest light. Hotel rates remain at peak through the month.',
  NULL,
  'February in Hampi is the technical peak. Rainfall under 5mm, daytime 30-33C, nights 18-19C, humidity 45 percent — the driest month of the year. The granite boulders that the Vijayanagara architects built around — the same volcanic outcrop that holds Anjeyanadri Hill on the north bank — show year-best photographic light. Matanga Hill (the highest point in the ruin field at 130m above the river plain, 600 steps from the Achyutaraya gate, ~40 min climb) holds the sunrise position over Virupaksha gopuram; arrive 5:45am for 6:30am sunrise. Hemakuta Hill (gentle 10-min walk south of Virupaksha Temple) holds the sunset position with Virupaksha gopuram silhouetted west. Vittala Temple stone chariot — the granite wheels were originally rotating, locked since restoration — at 9am clean light. Achyutaraya Temple, Pushkarni step-well, and the Krishna Bazaar long avenue walk cleanly. Hotels: Evolve Back Kamalapura Palace at ₹22-28k, Hyatt Place ₹12-15k, Heritage Resort ₹6-9k, Hampi Boulders ₹8-12k. Hospet (13km west, main railhead) homestays at ₹1,500-3,000. The Anegundi-side guesthouses (Uramma, Peshegar) ₹2,500-5,000. Lock beds 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 3, 4, 'go',
  'Last cool month. 20-36C. Daytime walks compress past 11am. Rates ease 25 percent.',
  'March is the soft-landing month before the heat dome. Daytime climbs from 34C to 36C through the month; the boulder field becomes furnace-hot by noon. Pre-9am and post-5pm walking only. Hotel rates ease 25 percent versus February.',
  NULL,
  'March in Hampi is the transition month. Daytime 33-36C, nights 20-22C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The granite boulder terrain that defines Hampi — Matanga Hill, Hemakuta Hill, the Vittala-to-Royal-Enclosure 4km axis — absorbs and re-radiates heat from late morning. Walking compresses to 6-10am and 5-8pm windows; the AC-cooled Archaeological Museum at Kamalapura (10am-5pm closed Friday, ₹5 entry, the bronze Mahishasura Mardini and the Vijayanagara coin collection are the standouts) becomes the practical mid-day refuge. Coracle crossings continue at standard schedule. Virupaksha morning aarti 6:30am at year-cleanest visibility. Vittala stone chariot pre-10am only. Hampi Bazaar (the 1km Krishna-Bazaar avenue between Virupaksha and the river ghat, the original Vijayanagara market street) walks cleanly through evening. Hotels ease 25 percent: Evolve Back Kamalapura at ₹18-22k, Hyatt Place ₹10-13k, Heritage Resort ₹5-7k, Hospet budget rooms ₹1,200-2,500. Last clean-value window before April closes the trip for the season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 4, 1, 'skip',
  'Heat dome opens. 24-42C. Boulder radiation at noon makes the trip unworkable. Skip strict.',
  NULL,
  'April pushes Hampi into furnace mode. The Northern Karnataka plateau hits 40-42C daytime; granite boulders re-radiate to 50C+ surface. The Vittala-to-Royal-Enclosure walk and Matanga climb are heat-stroke territory noon-5pm. There is no version of the Hampi trip that works in April. Push to October.',
  'April in Hampi is the start of the strict-skip stretch. Daytime 40-42C, nights 24-26C, humidity dropping to 35 percent, sea breeze does not reach 350km inland to the Tungabhadra valley. The granite boulders that the Vijayanagara built around — the same Deccan trap formation that makes the ruin field uniquely photogenic — re-radiate stored heat through the afternoon, with rock-surface temperatures hitting 48-52C by 1pm. The 26-sq-km ruin field has limited shade: Virupaksha and Vittala temples offer cool stone-interior refuge, but the open-air walks (Royal Enclosure, Hazara Rama, Achyutaraya, Krishna Temple, Mahanavami Dibba) and the hill climbs (Matanga, Hemakuta, Anjeyanadri) are heat-stroke territory between 10am and 5pm. Coracle crossings reduce to morning-only as river-side glare and surface heat make the parisal float-time unsafe. Hotel rates collapse to year-low: Evolve Back Kamalapura at ₹12-15k, Heritage Resort ₹3-4k, Hospet rooms ₹600-1,200. The Tungabhadra reservoir holds water but the city water grid runs reduced-pressure through April-May. The trip you came for cannot happen. Push to October or November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 5, 1, 'skip',
  'Furnace peak. 25-44C. Granite re-radiates to 50C plus. The ruin field is closed by physics. Skip.',
  NULL,
  'May is Hampi''s harshest month. Daytime 42-44C, granite surface 52-55C, pre-monsoon dust storms knock visibility. ASI sites stay open but the open-air boulder walks are unsafe noon-5pm. Hotel occupancy under 20 percent. Push to October.',
  'May in Hampi is the heat dome at peak intensity. Daytime 42-44C, nights 25-27C, humidity 35 percent, rainfall under 20mm. The Bayaluseeme (Northern Karnataka plateau) records its annual heat peak in the third and fourth week of May — the same belt that absorbs the rain shadow of the Western Ghats and gives Hampi its semi-arid character. Pre-monsoon dust storms hit the last fortnight, knocking visibility on the boulder-photography routes. The open-air ruin walks (Royal Enclosure, Mahanavami Dibba, Achyutaraya, Krishna Temple, the Vittala approach axis) are unsafe between 10am and 5pm. Even the early-morning Matanga Hill climb gets uncomfortable by 7:30am as granite warms quickly. Virupaksha and Vittala stone interiors hold 32-34C cool but the inter-temple walks defeat the day. Coracle crossings limited to dawn. Hotel rates at year-low: Evolve Back Kamalapura at ₹10-13k, Heritage Resort ₹2,500-4k, Hospet rooms ₹500-1,000. Hampi Bazaar shops run reduced hours; the foreign-backpacker scene around Sanapur (across the river) thins out almost entirely. Skip. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 6, 2, 'wait',
  'SW monsoon light here. 24-37C, 60-90mm rain. Heat eases but trip still compressed. Push to Oct.',
  NULL,
  'June brings 4-5C ease as the southwest monsoon spillover reaches the Tungabhadra basin (60-90mm across 6-8 wet days). Heat still 36-37C daytime; boulder walks 6-10am and 5-8pm only. The clean trip window opens in October. Wait.',
  'June in Hampi is the first ease. The southwest monsoon hits Kerala around June 1, and over the next two weeks spillover crosses the Western Ghats and reaches the Tungabhadra basin with 60-90mm of rainfall across 6-8 wet days — short late-afternoon thunderstorms that drop daytime temperatures 4-5C from May''s peak. Daytime 35-37C, nights 24-26C, humidity climbing past 65 percent. The boulder field stops re-radiating to lethal temperatures but stays uncomfortably hot 10am-5pm. The open-air ruin walks compress to 6-10am and 5-8pm. Virupaksha morning aarti at 6:30am, Vittala 9am, Royal Enclosure quick walk before noon, then AC museum or hotel pool through the heat, then Hemakuta Hill sunset. Tungabhadra river runs visibly fuller — coracle crossings smoother. The post-monsoon green that defines October-November Hampi has not arrived; the boulder field still shows its dry-season ochre-and-grey colour. Hotel rates remain at off-peak: Evolve Back Kamalapura ₹12-14k, Heritage Resort ₹3-4k, Hospet rooms ₹700-1,500. Functional only for budget travelers with no flexibility. The October 15 window is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 7, 2, 'wait',
  'SW monsoon active here. 23-33C, 90-120mm rain. Tungabhadra in flow. Walks viable AM/PM.',
  NULL,
  'July sees the proper southwest monsoon at Hampi — 90-120mm across 10-12 wet days. The Tungabhadra runs strong; coracle crossings continue with the river noticeably swifter. Daytime eases to 32-33C. Boulder walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Hampi is when the southwest monsoon does its real work on the Tungabhadra basin. Rainfall 90-120mm across 10-12 wet days — short violent afternoon thunderstorms that turn the boulder field briefly into a green-and-grey tropical-rock landscape. Daytime 32-33C, nights 23-24C, humidity 75 percent. The Tungabhadra river runs at its strongest of the year; coracle crossings continue but the river-current is noticeably swifter and operators add a second oarsman on heavier flow days. Virupaksha Temple morning aarti at 6:30am still works cleanly. Vittala Temple compound walks well 9-11am between showers. The Royal Enclosure granite walks slick — wear grip footwear. Matanga Hill climb can be slippery on the upper steps. The boulder field shows the first hints of the post-monsoon green carpet that peaks in September-October but is not yet there. Hampi Bazaar shops back at full hours. Hotel rates climb 15 percent off June lows but remain off-peak: Evolve Back Kamalapura ₹13-15k, Heritage Resort ₹3,500-5k, Hospet ₹800-1,800. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 8, 3, 'wait',
  'Monsoon tail. 22-31C, 80-110mm rain. River at full flow. Green carpet emerging. Push to Oct.',
  'August continues July''s pattern with slightly less rain (80-110mm). Daytime eases to 30-31C. The boulder field shows green moss and lichen patches. Tungabhadra at full flow. Coracle crossings active. Hotel rates 30-35 percent below January peak.',
  'August at Hampi works at 70 percent capacity. Daytime 30-31C, monsoon residue makes the open-air walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner heritage shape and post-monsoon greenest landscape. Wait if comfort matters.',
  'August in Hampi is the gradual climb-down from the monsoon. Rainfall 80-110mm across 10-12 wet days, mostly evening thunderstorms; daytime 30-31C, nights 22-23C, humidity 80 percent. The Tungabhadra remains at full monsoon flow; the boulder field starts to show its post-monsoon green — moss and lichen on the granite surfaces, sprouts in the rock crevices, the dry-season ochre slowly turning olive-green. Coracle crossings active at full schedule; the river width is at its annual maximum. Virupaksha Temple full ritual tempo. Vittala Temple compound, Hazara Rama, Royal Enclosure walks viable 6:30am-11am and 4-7pm; mid-day rain breaks the schedule. Matanga Hill climb manageable in dry windows. Hampi Utsav build-out has not started — that ramps in October. Hotel rates 30-35 percent below January peak: Evolve Back Kamalapura ₹14-16k, Hyatt Place ₹8-10k, Heritage Resort ₹4-5k, Hospet rooms ₹1,000-2,000. Functional for travelers locked to school-holiday windows; the cleaner October window is the call if flexibility exists.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 9, 3, 'wait',
  'Monsoon retreating. 21-30C, 50-80mm rain. Green carpet peaking. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 50-80mm. Daytime 29-30C, the post-monsoon green carpet on the boulder field peaks late month. Hotel rates 25 percent below January peak — last off-peak window.',
  'September is more viable than the deeper monsoon months but still below the October-February peak. Daytime 29-30C; afternoon thunderstorms still break heritage walks. Push to mid-October for the proper clean weather window.',
  'September in Hampi is the bridge month before the proper season opens. Rainfall drops to 50-80mm across 8-10 wet days — second-half of the month is materially drier. The southwest monsoon retreats from the Karnataka interior around September 25-30 (IMD declares formal withdrawal mid-October). Daytime 29-30C, nights 21-22C, humidity easing from 80 to 70 percent. The post-monsoon green carpet on the boulder field peaks in the last 10 days — this is the year-greenest visual window before the dry winter ochre returns by December. Tungabhadra still at high flow; coracle crossings smoother as river-current eases. Virupaksha and Vittala morning hours at full visibility; Matanga and Hemakuta sunrise/sunset windows return to cleaner skies. Hotel rates 25 percent below January peak: Evolve Back Kamalapura at ₹16-18k, Hyatt Place ₹9-11k, Heritage Resort ₹4,500-6k, Hospet ₹1,200-2,500. Hampi Utsav build (the Karnataka Tourism cultural festival, typically held in November) starts late September. The October 15 window is the proper clean call; September is the value side of that window for travelers who want pre-peak pricing.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 10, 4, 'go',
  'Season opens. 19-31C, 30-50mm rain. Green-carpet boulder field. Heritage walks return mid-month.',
  'October is the season opener at Hampi. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean heritage-walk weather. Post-monsoon green carpet still on the boulder field. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Hampi is the proper return to the Vijayanagara circuit. The southwest monsoon withdraws officially from interior Karnataka around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean heritage-walk mode. Daytime 30-31C, nights 19-21C, humidity falling from 70 to 60 percent. The post-monsoon green carpet on the granite boulders still holds through October before drying to winter ochre — visual sweet spot of the year. The 26-sq-km ruin field — Virupaksha (6:30am aarti), Vittala (stone chariot and musical pillars), Hazara Rama (the Mahabharata frescoes), Royal Enclosure (Lotus Mahal, Elephant Stables, Queen''s Bath, Mahanavami Dibba), Achyutaraya, Krishna Temple, Hemakuta cluster — walks comfortably through the afternoon for the first time since February. Coracle crossings to Anegundi, Anjeyanadri Hill (575 steps to the Hanuman birthplace), and Matanga sunrise/Hemakuta sunset all at full schedule. Hotel rates run 25-30 percent below January peak: Evolve Back Kamalapura at ₹18-21k, Hyatt Place ₹10-12k, Heritage Resort ₹5-7k, Hospet ₹1,500-3k. Strong call for first-time visitors who want post-monsoon greenest landscape minus peak-season prices.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 11, 5, 'go',
  'Hampi Utsav Nov 3-5. 17-29C, dry. Karnataka Rajyotsava Nov 1. Heritage walks at year-best comfort.',
  'November is the year''s second-peak window. Hampi Utsav (Vijaya Utsav, Karnataka Tourism cultural festival, Nov 3-5 in 2026) anchors the month with dance, music, and the light-and-sound show at Vittala. Karnataka Rajyotsava Nov 1. Heritage walking at year-best comfort.',
  NULL,
  'November in Hampi is the year''s peak-festival month. The Hampi Utsav (also known as Vijaya Utsav, Karnataka Tourism''s three-day cultural festival on the Vijayanagara ruins — 2026 dates November 3-5, verify against the Karnataka Tourism Department release) brings classical dance, Carnatic music, and folk performance to the Vittala Temple precinct and the Krishna Bazaar avenue. Evening light-and-sound shows at Vittala project the Vijayanagara story onto the stone chariot complex; tickets ₹200-500. Karnataka Rajyotsava (November 1, the state formation day commemorating the 1956 reorganisation that created Karnataka from the older Mysore state and surrounding princely territories) brings parade and cultural programming in nearby Hospet. Daytime 27-29C, nights 17-19C, rainfall under 20mm, humidity 55 percent — the boulder field walks at year-best comfort, the granite cool by 6am and warming gradually through the day. Hampi Utsav weekend rates spike 50-80 percent above November baseline: Evolve Back Kamalapura at ₹22-26k Nov 2-6, Hyatt Place ₹12-15k, Heritage Resort ₹6-9k, Hospet rooms ₹2,500-5k. Lock Utsav-weekend beds 8-12 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('hampi', 12, 5, 'go',
  'Peak season. 15-28C, dry. Christmas-NYE backpacker surge across the river at Sanapur and Virupapur.',
  'December is operational peak. Daytime 26-28C, nights 15-16C, year-cleanest air. Christmas-NYE backpacker scene revives at Sanapur and Virupapur Gaddi (across the river). Boulder walks year-cleanest. Lock heritage hotel beds 6-8 weeks ahead.',
  NULL,
  'December in Hampi is the operational peak and the year-cleanest weather window. Daytime 26-28C, nights drop to 15-16C, humidity 50 percent, rainfall under 10mm. Air visibility at its annual best — Matanga Hill at sunrise (5:45am arrival for 6:30am sunrise) holds 20km clarity across the boulder field toward Hospet. The post-monsoon green has dried to the winter ochre that defines classical Hampi photography. The Vijayanagara ruin walks — Virupaksha at 6:30am aarti, Vittala stone chariot at 9am clean light, Hazara Rama relief panels, Royal Enclosure, Achyutaraya, Krishna Temple, Hemakuta sunset — all at year-cleanest visibility. The Christmas-NYE corridor (December 22 to January 5) revives the foreign-backpacker scene across the river at Sanapur, Virupapur Gaddi, and Anegundi — guesthouses Mowgli, Uramma, Peshegar at peak occupancy. The Hampi-side of the river runs alcohol-dry by religious-precinct rule; the Sanapur side handles the bar and music scene. Hotel rates at peak: Evolve Back Kamalapura at ₹24-30k Christmas-NYE, Hyatt Place ₹13-16k, Heritage Resort ₹7-10k, Hospet rooms ₹2,000-4k. Lock 6-8 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

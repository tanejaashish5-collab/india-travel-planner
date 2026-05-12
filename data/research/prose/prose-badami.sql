-- Badami destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: badami | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 1, 5, 'go',
  'Peak Chalukya window. 15-29C, dry. Cave 1-4 walks at year-cleanest. Agastya Tirtha tank reflection clean.',
  'January is the strongest stretch for Badami. Daytime 27-29C, nights 15-16C. The four cave temples in the red sandstone cliff — Cave 1 Shiva, Cave 2 Vishnu, Cave 3 Vishnu-on-Sheshanaga, Cave 4 Jain — walk cleanly all day. Agastya Tirtha tank reflection at year-cleanest.',
  NULL,
  'Badami in January is the Chalukya capital walked in its proper weather. Daytime 27-29C, nights 15-16C, humidity 50 percent, rainfall under 10mm. The four cave temples (Chalukya capital 6-8c CE, rock-cut caves carved into the red sandstone cliff overlooking Agastya Tirtha tank, 578-610 CE) open 9am-5:30pm, ₹40 ASI ticket covers all four caves plus the Bhutanatha temples. Cave 1 (Shiva, the 18-armed Nataraja the standout), Cave 2 (Vishnu, Trivikrama with Varaha panel), Cave 3 (the largest, dated 578 CE by inscription — Vishnu on Sheshanaga the headline), Cave 4 (Jain, Mahavira and the Bahubali in standing kayotsarga). Walk the 60-step climb 9am for first light on Cave 3, then walk the tank circuit south to the Bhutanatha Group (early Chalukya, 7th c CE — Bhutanatha East at the water-edge) for the cliff-reflection shot in still morning water. Badami Fort (atop the north cliff, 30-min climb from the museum side) opens 9am-5pm — upper temples and granaries are loose-stone scrambles. Hotels: Krishna Heritage ₹3-5k, Mookambika Deluxe ₹2-3.5k, KSTDC Mayura Chalukya ₹1,500-2,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 2, 5, 'go',
  'Driest month. 17-32C. Cliff-reflection photography at year-best. Day-trip axis to Aihole/Pattadakal cleanest.',
  'February holds January''s clean weather with rainfall under 5mm. Red sandstone cliff face photography at year-cleanest light. Standard 3-day axis — Badami caves day 1, Aihole 35km southeast day 2, Pattadakal 22km southeast day 3 — runs at peak comfort.',
  NULL,
  'February in Badami is the technical peak for the Chalukya heritage axis. Rainfall under 5mm, daytime 30-32C, nights 17-18C, humidity 45 percent. The red sandstone cliff face that holds the four cave temples shows its year-cleanest colour — the iron-oxide red of the Kaladgi sandstone formation deepens in low humidity. Cave 3 (578 CE, Vishnu-on-Sheshanaga) at 9am clean light; the carved bracket figures (mithuna couples, the dvarapalas) hold detail in oblique sunlight. Agastya Tirtha tank (the rectangular Chalukya reservoir at the foot of the cliff, walled and stone-stepped) holds still reflection at 7am — arrive pre-dawn for the cliff-mirror shot. The cliff-side Bhutanatha temples (East cluster at water-edge, North cluster on the upper rocks) walk cleanly. Badami Fort upper trail (30-40 min climb) at year-best comfort. Day-trip axis: Aihole 35km southeast (Lad Khan Temple, Durga Temple apsidal-plan, Meguti Jain inscription) day 2; Pattadakal 22km southeast (UNESCO 10-temple complex including Virupaksha 740 CE) day 3. Hotels at peak: Krishna Heritage ₹4-6k, Mookambika Deluxe ₹2,500-4k, KSTDC Mayura Chalukya ₹2-3k, Badami Court ₹2,500-4k.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 3, 4, 'go',
  'Last cool month. 19-35C. Cave walks compress past 11am. Heat builds late month. Rates ease 25 percent.',
  'March extends February''s window with the last fortnight pushing past 34C daytime. The sandstone cliff re-radiates by noon, making the Badami Fort upper climb uncomfortable mid-day. Cave temples 9-11am and 4-5:30pm windows. Rates ease 25 percent versus February.',
  NULL,
  'March in Badami is the soft-landing month before the heat dome opens. Daytime 32-35C, nights 19-21C, humidity climbing from 50 to 60 percent, rainfall under 15mm. The red sandstone cliff that holds the four cave temples re-radiates heat from late morning; cave-interior temperatures remain pleasant (the rock-cut interior holds 26-28C even when outside is 34C), but the 60-step exterior climb to Cave 1 and the open-air Bhutanatha tank-edge walks are uncomfortable past 11am. Cave 3 (the largest, 578 CE, Vishnu-on-Sheshanaga) holds its mid-day photography clean — the south-facing cliff cuts direct overhead sun. Badami Fort upper trail (north cliff, 30-min climb) compresses to 6:30-9:30am and 4:30-6pm. Agastya Tirtha tank reflection still clean at dawn. Aihole-Pattadakal day-trip cycle works as full day with mid-day Bhutanatha-tank shade-break. Hotels ease 25 percent: Krishna Heritage at ₹3-4.5k, Mookambika ₹2-3k, KSTDC Mayura Chalukya ₹1,500-2,500, Badami Court ₹2-3k. Last clean-value window before the April-June strict-skip stretch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 4, 1, 'skip',
  'Heat dome opens. 23-41C. Red sandstone cliff radiates 48C plus. The trip cannot happen mid-day. Skip.',
  NULL,
  'April pushes Badami into the strict-skip stretch. The Northern Karnataka plateau hits 40-41C daytime; the red sandstone cliff face re-radiates to 48C surface. Cave interiors stay cool but inter-site walks unworkable noon-5pm. Badami Fort climb dangerous. Push to October.',
  'April in Badami is the start of the strict-skip stretch. Daytime 39-41C, nights 23-25C, humidity 35 percent, rainfall under 10mm — Northern Karnataka plateau (Bayaluseeme rain-shadow) at its harshest annual character. The red sandstone cliff face that gives Badami its name and visual identity becomes a radiator — surface temperatures hit 48-50C by 1pm on the south-facing cliff that holds Caves 1-4. The 60-step climb to Cave 1 is heat-stroke territory 10am-5pm. Cave interiors remain remarkably cool (the rock-cut depth holds 27-29C through the day), but the inter-cave exterior walks defeat the trip. Agastya Tirtha tank water recedes; the cliff-mirror reflection shot loses its standing water. Badami Fort upper climb (north cliff, loose-stone scramble) is unsafe past 9am. The Aihole-Pattadakal axis is similarly heat-locked. Hotels collapse to year-low: Krishna Heritage ₹2-3.5k, Mookambika ₹1,200-2k, KSTDC Mayura Chalukya ₹1,000-1,800. The Bagalkot district water grid runs reduced-pressure through April-May. Push to October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 5, 1, 'skip',
  'Heat peak. 25-43C. Cliff radiation 50C plus. Pre-monsoon dust storms knock visibility. Skip strict.',
  NULL,
  'May is the harshest Badami month. Daytime 41-43C, sandstone cliff 50-52C surface. Pre-monsoon dust storms hit the last fortnight, knocking the cliff-photography routes. Hotel occupancy under 25 percent. Push to October.',
  'May in Badami is the heat dome at peak intensity. Daytime 41-43C, nights 25-27C, humidity 35 percent, rainfall under 25mm. The Northern Karnataka plateau records its annual heat peak in the third and fourth week — Bagalkot district sits in the same Bayaluseeme rain-shadow belt as Hampi, Bijapur, and Gadag. The Kaladgi-formation red sandstone cliff that holds the four cave temples reaches 50-52C surface heat by 1pm. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand into the cave interiors and knocking visibility on the cliff-photography routes. The cliff-mirror reflection at Agastya Tirtha tank loses to receding water and dust haze. Cave interiors hold cool 28-30C but the 60-step climb to Cave 1 is heat-stroke territory after 8:30am. Badami Fort upper trail unsafe. Bhutanatha tank-edge walks unworkable. The Aihole-Pattadakal day-trip axis similarly locked. Hotels at year-low: Krishna Heritage ₹1,800-3k, Mookambika ₹1,000-1,800, KSTDC ₹900-1,500. Skip. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 6, 2, 'wait',
  'SW monsoon light. 24-36C, 50-70mm rain. Heat eases but trip still compressed. Push to Oct.',
  NULL,
  'June brings 4-5C ease as SW monsoon spillover reaches the Malaprabha basin (50-70mm across 5-7 wet days). Heat still 35-36C daytime; cliff walks 6-10am and 5-7pm only. The clean trip window opens in October.',
  'June in Badami is the first ease month. Southwest monsoon spillover crosses the Western Ghats and reaches the Malaprabha river basin with 50-70mm of rainfall across 5-7 wet days — short late-afternoon thunderstorms that drop daytime temperatures 4-5C from May''s peak. Daytime 35-36C, nights 24-25C, humidity climbing past 65 percent. The red sandstone cliff stops re-radiating to lethal temperatures but stays uncomfortably hot 10am-5pm. The cave-temple walking compresses to 6-10am and 5-7pm windows. Cave 3 morning light at 9am workable; Bhutanatha tank-edge walks viable through evening. Agastya Tirtha tank starts to refill — the cliff-mirror reflection partially restores. Badami Fort upper climb 6:30-9:30am only. The Aihole-Pattadakal day-trip axis still heat-locked through mid-day. Hotels remain off-peak: Krishna Heritage ₹2,500-3,500, Mookambika ₹1,200-2,000, KSTDC ₹1,200-2,000. The post-monsoon green that defines October Badami has not arrived; the surrounding fields still show dry-season ochre. Functional only for budget travelers; October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 7, 2, 'wait',
  'SW monsoon active. 23-32C, 80-110mm rain. Agastya Tirtha tank fills. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon at Badami — 80-110mm across 9-11 wet days. Daytime eases to 31-32C. Agastya Tirtha tank fills cleanly; the cliff-reflection returns. Cave walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Badami is the SW monsoon at moderate intensity over the Malaprabha basin. Rainfall 80-110mm across 9-11 wet days — short violent afternoon thunderstorms. Daytime 31-32C, nights 23-24C, humidity 75 percent. The red sandstone cliff that holds Caves 1-4 darkens to a deeper iron-oxide red in the wet season — the visual character changes materially from the dry ochre of January. Agastya Tirtha tank refills to its proper Chalukya-reservoir level and the cliff-mirror reflection returns at dawn. Cave 3 morning light at 9am works between showers. Bhutanatha tank-edge walks viable. Badami Fort upper climb (loose-stone scramble) slippery on the upper trail; better avoided in heavy-rain days. The Aihole-Pattadakal day-trip axis runs but with rain-interrupted exterior walks. Hotels climb 15 percent off June lows but remain off-peak: Krishna Heritage ₹2,800-4k, Mookambika ₹1,500-2,500, KSTDC ₹1,500-2,500. Hampi (140km southeast) is similarly viable but October is when both flip into clean shape. Sub-optimal weather but more viable than April-May.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 8, 3, 'wait',
  'Monsoon continues. 22-30C, 70-100mm rain. Tank at full level. Green carpet emerging. Push to Oct.',
  'August holds July''s rain pattern (70-100mm). Daytime eases to 29-30C. Surrounding fields turn green; the post-monsoon visual character begins. Cave walks viable mornings and evenings. October still cleaner.',
  'August works at 70 percent capacity. Daytime 29-30C, monsoon residue makes exterior walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner Chalukya-heritage shape. Wait if comfort matters.',
  'August in Badami is the gradual climb-down from the monsoon. Rainfall 70-100mm across 9-11 wet days, daytime 29-30C, nights 22-23C, humidity 80 percent. The Malaprabha river runs at its annual maximum; the surrounding wheat-and-jowar belt around Bagalkot district turns green from the monsoon recharge. Agastya Tirtha tank at full Chalukya-reservoir level — the cliff-mirror reflection at dawn (5:45am arrival) is at year-cleanest depth. Cave 3 morning light, Cave 1 Nataraja, Bhutanatha tank-edge walks all viable 6:30am-11am and 4-7pm; mid-day rain breaks the schedule. Badami Fort upper climb still slippery on the upper trail. The Aihole-Pattadakal day-trip axis runs at standard schedule but with rain-buffer day recommended. Hotels 30 percent below January peak: Krishna Heritage at ₹3-4k, Mookambika ₹1,500-2,500, KSTDC ₹1,500-2,500, Badami Court ₹1,800-3k. Functional for travelers on school-holiday timing; the cleaner October window is the call if flexibility exists.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 9, 3, 'wait',
  'Monsoon retreating. 21-29C, 50-70mm rain. Green-field landscape peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 50-70mm. Post-monsoon green peaks late month. Hotel rates 25 percent below January peak — last off-peak window.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 28-29C; afternoon thunderstorms still break exterior walks. Push to mid-October for the proper clean weather window.',
  'September in Badami is the bridge month before the proper season opens. Rainfall drops to 50-70mm across 7-9 wet days — second-half is materially drier. Daytime 28-29C, nights 21-22C, humidity easing from 80 to 70 percent. The post-monsoon green peaks in the last 10 days — the Bagalkot agricultural belt around the cave temples shows year-greenest fields against the red sandstone cliff, a visual contrast that disappears by November when the fields dry. Agastya Tirtha tank at full level; cliff-reflection at year-cleanest dawn. Cave 3 at 9am clean morning light. Badami Fort upper climb at improving traction. Bhutanatha tank-edge walks at peak comfort. The Aihole-Pattadakal axis runs cleanly. Hotels 25 percent below January peak: Krishna Heritage at ₹3-4.5k, Mookambika ₹2-3k, KSTDC ₹1,500-2,500, Badami Court ₹2-3k. The October 15 window is the proper clean call; September is the value side for travelers wanting pre-peak pricing and greenest landscape.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 10, 4, 'go',
  'Season opens. 19-30C, 30-50mm rain. Green-field landscape. Cave walks return mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean Chalukya-heritage weather. Green fields around the cliff still hold. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Badami is the proper return to the Chalukya circuit. Southwest monsoon withdraws from interior Karnataka around October 10-15 — first 10 days carry 30-50mm residue, the back half flips into clean weather. Daytime 29-30C, nights 19-21C, humidity falling from 70 to 60 percent. The post-monsoon green fields around the red sandstone cliff still hold through October before drying to winter ochre — visual sweet spot of the year for the cliff-and-field landscape. Cave 1 Shiva (the 18-armed Nataraja), Cave 2 Vishnu, Cave 3 (the largest, 578 CE Vishnu-on-Sheshanaga), Cave 4 Jain — all at year-best photographic light, particularly Cave 3 at 9am. Agastya Tirtha tank at full Chalukya-reservoir level; cliff-mirror reflection at dawn clean. Bhutanatha temples (East and North) walk cleanly. Badami Fort upper trail (30-min climb to the granaries and the upper temple) at year-best comfort. The Aihole 35km southeast + Pattadakal 22km southeast day-trip axis runs as a clean three-day Chalukya circuit. Hotels run 25-30 percent below January peak: Krishna Heritage ₹3.5-5k, Mookambika ₹2-3k, KSTDC ₹1,500-2,500, Badami Court ₹2-3.5k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 11, 5, 'go',
  'Peak builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Cliff-photography year-cleanest air.',
  'November is the proper pivot to peak. Rainfall under 20mm, full Chalukya-heritage walking, Karnataka Rajyotsava (Nov 1 state formation day) brings parade in Bagalkot. Air visibility at year-best for cliff-and-tank photography.',
  NULL,
  'November in Badami is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 26-28C, nights 17-19C, humidity dropping below 60 percent. Air visibility at its annual cleanest for the red-sandstone-and-tank composition that defines the Badami photograph. The four cave temples — Cave 1 Shiva Nataraja, Cave 2 Vishnu, Cave 3 Vishnu-on-Sheshanaga (578 CE inscription, the largest and finest), Cave 4 Jain — all walk cleanly through the afternoon. Agastya Tirtha tank reflection at dawn at year-cleanest; the Chalukya-era stone steps around the tank are at peak photography light. Bhutanatha tank-edge walks comfortable. Badami Fort upper climb at year-best traction. Karnataka Rajyotsava (November 1, state formation day commemorating the 1956 reorganisation) brings parade and cultural programming in Bagalkot district headquarters 35km southwest. The Aihole-Pattadakal day-trip axis runs at peak comfort. Hotels climb to 75-80 percent of January peak: Krishna Heritage ₹4-5.5k, Mookambika ₹2,500-4k, KSTDC ₹1,800-3k, Badami Court ₹2,500-4k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('badami', 12, 5, 'go',
  'Peak season. 14-27C, dry. Christmas-NYE moderate rate spike. Cliff at year-cleanest air.',
  'December is operational peak. Daytime 25-27C, nights 14-15C, year-cleanest air visibility. Cave temples and Agastya Tirtha tank reflection at year-best. Christmas-NYE 1.5-2x rates. Lock heritage hotel beds 4-6 weeks ahead.',
  NULL,
  'December in Badami is the operational peak. Daytime 25-27C, nights drop to 14-15C, humidity 50 percent, rainfall under 10mm. Air visibility at annual best — the red sandstone cliff that holds Caves 1-4 shows its cleanest contrast against the blue winter sky. The four cave temples walk comfortably from 9am opening through 5:30pm close. Cave 3 (578 CE, Vishnu-on-Sheshanaga, the standout) holds clean morning light through 11am. Agastya Tirtha tank reflection at 6am dawn (arrive 5:45am for full mirror window before wind picks up) at year-cleanest depth. Bhutanatha tank-edge walks comfortable. Badami Fort upper climb (30-min loose-stone scramble to the granaries and upper temples) at year-best traction. The Aihole-Pattadakal axis runs cleanly. Christmas-NYE corridor (December 22 to January 5) sees moderate rate lift (1.5-2x normal — less of a spike than coastal heritage): Krishna Heritage at ₹5-7k Christmas-NYE, Mookambika ₹3-4.5k, KSTDC ₹2,500-3,500, Badami Court ₹3-4.5k. Lock 4-6 weeks ahead from October. The week between Christmas and New Year sees peak weekend occupancy.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

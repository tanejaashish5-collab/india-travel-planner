-- Bidar destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: bidar | best_months [10,11,12,1,2,3] | avoid [4,5,6]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 1, 5, 'go',
  'Peak Bahmani window. 13-28C, dry. Bidar Fort, Mahmud Gawan Madarasa, Nanak Jhira at year-cleanest.',
  'January is the strongest stretch for Bidar. Daytime 26-28C, nights 13-14C. Bidar Fort (Bahmani capital 1429-1538), Madarasa Mahmud Gawan (1472 Persian college), Nanak Jhira Sahib (1512 Sikh sacred spring), and Bidriware workshops at year-cleanest light.',
  NULL,
  'Bidar in January is the proper Bahmani-Sufi-Sikh circuit walked in clean weather. Daytime 26-28C, nights 13-14C, humidity 50 percent, rainfall under 10mm — the northernmost Karnataka district sits on the higher Deccan plateau (650m), cooler than Bijapur or Gulbarga. Bidar Fort (the Bahmani capital 1429-1538 after the move from Gulbarga, built by Sultan Ahmad Shah Wali) — the Gumbad Darwaza, Sharza Darwaza tiger-bastions, Solha Khamba mosque, Rangin Mahal Persian-tile-and-mother-of-pearl walls, Tarkash Mahal — walks cleanly through afternoon. Madarasa Mahmud Gawan (1472, the Bahmani chief minister''s three-storey Persian college, half-collapsed since a 17th-c lightning strike — the surviving tile-inlay facade is Bidar''s most striking building). Nanak Jhira Sahib Gurudwara (1512 — the sacred Sikh spring of Guru Nanak''s Deccan journey) opens 4am-9pm, free entry, langar 11am-3pm. Bahmani Tombs at Ashtur (3km east, 12 royal mausoleums, the Ahmad Shah Wali interior frescoes the standout). Chaubara watchtower (71-foot cylindrical tower). Bidriware workshops on Siddiq Talim Road — GI-tagged metal-inlay craft (silver-and-gold wire on blackened zinc-copper, only Bidar makes it).'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 2, 5, 'go',
  'Driest month. 15-31C. Madarasa Mahmud Gawan facade photography at year-best. Bidriware workshops active.',
  'February holds the technical peak with rainfall under 5mm and humidity at 45 percent. The Mahmud Gawan Madarasa facade colored-tile inlay, the Bidar Fort Rangin Mahal Persian-tile interiors, and the Bahmani Tombs at Ashtur all show year-best detail.',
  NULL,
  'February in Bidar is the year''s cleanest photography window for the Bahmani-Persian architecture circuit. Rainfall under 5mm, daytime 29-31C, nights 15-16C, humidity 45 percent. The Madarasa Mahmud Gawan (1472, the three-storey Persian college half-collapsed since a 17th-century lightning strike) facade — the colored-tile inlay above the central arch, the surviving minaret, the calligraphic friezes — at year-best 9-11am morning detail. Mahmud Gawan (Persian-born, brought to Bidar 1453, rose to Bahmani chief minister, executed on conspiracy charges 1481) made the madarasa the leading Persian college in 15th-century Deccan. Bidar Fort interiors — the Rangin Mahal mother-of-pearl-and-Persian-tile walls, the Solha Khamba 16-pillar mosque, the Tarkash Mahal — at year-best photographic light. Bahmani Tombs at Ashtur (3km east, 12 tombs in a row) — Ahmad Shah Wali tomb (the founder of Bidar, died 1436, dome painted with Persian Sufi calligraphy) is the standout. Nanak Jhira Sahib free entry, langar 11am-3pm. Bidriware workshops on Siddiq Talim Road full demonstrations 10am-6pm. Hotels: KSTDC Mayura Barid Shahi ₹1,500-2,500, Hotel Sapna ₹1,800-3k, Krishna Regency ₹2,000-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 3, 4, 'go',
  'Last cool month. 18-34C. Fort walks compress past 11am. Rates ease 25 percent.',
  'March extends the February window with heat building late month. Bidar Fort (sprawling 1.5km circuit), Bahmani Tombs (open-air row), and the Madarasa walks compress to 6:30-10am and 4-6pm. Hotel rates ease 25 percent.',
  NULL,
  'March in Bidar is the soft-landing month before the heat dome opens. Daytime 31-34C, nights 18-20C, humidity climbing from 50 to 60 percent, rainfall under 15mm. Bidar Fort — the Bahmani capital walled circuit covers approximately 1.5km perimeter, with the Gumbad Darwaza, Sharza Darwaza, Solha Khamba mosque, Rangin Mahal, Tarkash Mahal — involves significant open-air walking. The 650m plateau elevation makes Bidar cooler than Bijapur or Gulbarga but the fort interior re-radiates from late morning. Walking compresses to 6:30am-10am and 4-6pm. Madarasa Mahmud Gawan walk early morning. Bahmani Tombs at Ashtur (3km east, open-air walk along 12 tomb-row) best 7-9am — outer tomb-to-tomb walks heat up by 11am. Nanak Jhira Sahib langar 11am-3pm functions as cool mid-day refuge (underground spring keeps the gurudwara interior 26-28C). Bidriware workshops AC-cool. Hotels ease 25 percent: KSTDC Mayura Barid Shahi ₹1,200-2,000, Hotel Sapna ₹1,500-2,500, Krishna Regency ₹1,500-2,800. Last clean-value window before April-June.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 4, 2, 'wait',
  'Heat dome opens. 22-39C. Fort and tomb walks compress to dawn. Push to October.',
  'April still works for dawn-only Bidar Fort visits and the Nanak Jhira gurudwara langar. Bidar plateau (650m) runs 1-2C cooler than Bijapur and Gulbarga but the day still defeats the trip by 10am. Hotel rates collapse to year-low.',
  'April in Bidar is when the Bahmani-circuit trip narrows to dawn-only. The fort walls, the Mahmud Gawan facade, the Ashtur tomb row all 38-39C daytime, stone surface 45C. The Bidar plateau elevation softens the worst of it but pre-dawn only. Push to October.',
  'April in Bidar is when the Bahmani trip narrows to dawn-only. Daytime 37-39C, nights 22-24C, humidity 35 percent, rainfall under 10mm. Bidar''s 650m plateau elevation moderates the worst of the Northern Karnataka heat dome — daytime peaks run 2-3C below Bijapur and Gulbarga''s 41-43C — but the trip-defining open-air walks (Bidar Fort 1.5km perimeter, Bahmani Tombs Ashtur 12-tomb row, Madarasa Mahmud Gawan facade study) still compress to 5:30-9am. Stone-surface temperatures at the fort walls and the open tombs reach 45-48C by 1pm. Nanak Jhira Sahib gurudwara underground-spring-cooled interior remains 26-28C through the day, langar 11am-3pm functions as AC refuge. Bidriware workshops (AC-cooled, the metal-inlay craft demonstration on blackened zinc-copper alloy with silver and gold wire) stay cool. The Rangin Mahal Persian-tile interior at the fort holds 32-34C. Hotel rates collapse to year-low: KSTDC Mayura Barid Shahi ₹900-1,500, Hotel Sapna ₹1,200-1,800, Krishna Regency ₹1,200-2,000. The pre-dawn dawn-only trip works but the Mahmud Gawan facade and Ashtur tombs walked properly demand cool weather. Push to October-November.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 5, 1, 'skip',
  'Heat peak. 23-41C. Fort walls re-radiate 48C plus. Pre-monsoon dust knocks visibility. Skip.',
  NULL,
  'May is harshest Bidar month. Daytime 39-41C, stone surface 48-50C. Pre-monsoon dust hits the open-tomb walks. Hotel occupancy under 25 percent. Push to October.',
  'May in Bidar is the heat dome at peak. Daytime 39-41C, nights 23-25C, humidity 35 percent, rainfall under 25mm. The Bidar plateau (650m) softens the worst of the Northern Karnataka furnace but the third and fourth week still record daytime peaks 39-41C — Bijapur and Gulbarga 43-45C in the same window. The trip-defining circuit — Bidar Fort 1.5km perimeter, Bahmani Tombs Ashtur 12-tomb row, Madarasa Mahmud Gawan facade — closes 9am-6pm. Stone-surface at the fort, the Mahmud Gawan facade, the open tombs reaches 48-50C by 1pm. Pre-monsoon dust storms hit the last fortnight, blowing fine red sand across the open-air Ashtur tomb-row and knocking visibility on the tomb-to-tomb photography routes. Nanak Jhira Sahib underground spring keeps gurudwara cool through the day. Bidriware workshops AC-cool. The Rangin Mahal Persian-tile interior at the fort holds cool. Hotels at year-low: KSTDC Mayura Barid Shahi ₹800-1,300, Hotel Sapna ₹1,000-1,500, Krishna Regency ₹1,000-1,800. Skip. October-February is dramatically better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 6, 2, 'wait',
  'SW monsoon arrives. 22-34C, 80-110mm rain. Heat eases. Fort walks viable AM/PM.',
  NULL,
  'June brings 5-6C ease as the SW monsoon arrives at the Bidar plateau (80-110mm across 7-9 wet days). Daytime 33-34C; fort walks 6-10am and 5-7pm. Surrounding Krishna basin fields turn green. October is materially better.',
  'June in Bidar is the first ease month. The southwest monsoon reaches the Bidar plateau (the northernmost Karnataka district borders Telangana and Maharashtra) with 80-110mm across 7-9 wet days — higher rainfall than Bijapur or Gulbarga because Bidar sits at the edge of the rain-shadow as the monsoon current crosses the Western Ghats and flows northeast toward Hyderabad. Daytime 33-34C, nights 22-24C, humidity 70 percent. Bidar Fort walls stop re-radiating to lethal temperatures; the 1.5km perimeter walks compress to 6-10am and 5-7pm. The Mahmud Gawan Madarasa facade photography viable in morning windows. The Bahmani Tombs at Ashtur 7-9am clean light, mid-day rain breaks. Nanak Jhira Sahib at standard pilgrim flow. Bidriware workshops at full demonstration. The surrounding Krishna basin fields turn green from monsoon recharge — visual character of the Bahmani circuit changes from dry-season ochre to wet-season olive-green. Hotels remain off-peak: KSTDC Mayura Barid Shahi ₹1,000-1,800, Hotel Sapna ₹1,300-2,200, Krishna Regency ₹1,300-2,500. Functional only for travelers locked to this window. October is materially better.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 7, 2, 'wait',
  'SW monsoon active. 21-31C, 130-170mm rain. Fort walls slick. Walks viable AM/PM.',
  NULL,
  'July is the proper monsoon at Bidar — 130-170mm across 12-14 wet days. Daytime 30-31C. Fort walls and Ashtur tomb stone surfaces slick. Walks workable mornings and evenings. October-February still dramatically cleaner.',
  'July in Bidar is the SW monsoon at moderate-to-strong intensity. Rainfall 130-170mm across 12-14 wet days — Bidar gets more monsoon than the rest of Northern Karnataka because the plateau edge captures the eastward-flowing current. Daytime 30-31C, nights 21-23C, humidity 80 percent. Bidar Fort walls darken in the wet — the granite-and-basalt construction shifts color materially. The 1.5km perimeter walks slick — wear grip footwear. The Rangin Mahal interior, the Solha Khamba mosque, and the Tarkash Mahal hold dry. Madarasa Mahmud Gawan facade study viable in morning windows. The Bahmani Tombs at Ashtur (open-air row 12-tomb walk) rain-interrupted afternoons. Nanak Jhira Sahib at peak pilgrim flow (the spring runs strong in monsoon recharge). Bidriware workshops at full demonstration. Hotels climb 15 percent off June lows: KSTDC Mayura Barid Shahi ₹1,200-2,000, Hotel Sapna ₹1,500-2,500. Sub-optimal weather but more viable than April-May. October 15 onward is the clean window.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 8, 3, 'wait',
  'Monsoon continues. 20-30C, 130-170mm rain. Krishna-basin fields at year-greenest. Walks AM/PM.',
  'August holds July''s rain pattern (130-170mm). Daytime 29-30C. The Bahmani circuit and the Krishna-basin agricultural belt at year-best visual character. Walks viable mornings and evenings between showers.',
  'August works at 70 percent capacity. Daytime 29-30C, monsoon residue makes exterior walks rain-interrupted 3-4 days a week. The October 15 onward window delivers dramatically cleaner Bahmani-circuit shape.',
  'August in Bidar is the gradual climb-down from the monsoon peak. Rainfall 130-170mm across 12-14 wet days, daytime 29-30C, nights 20-22C, humidity 82 percent. The Krishna-basin fields around Bidar district at year-greenest from monsoon recharge — the contrast between the Bahmani basalt walls of Bidar Fort and the green plain shows the year-best visual character before the dry-season ochre returns by November. Bidar Fort 1.5km perimeter walks viable 6:30-11am and 4-7pm between showers. The Madarasa Mahmud Gawan facade morning study clean. The Bahmani Tombs at Ashtur tomb-row walks rain-interrupted afternoons — 7-10am window. The Ahmad Shah Wali tomb interior frescoes at peak photographic visibility (the Persian Sufi calligraphic painting on the dome). Nanak Jhira Sahib langar 11am-3pm. Bidriware workshops at full demonstration; the metal-inlay craft (silver and gold wire on blackened zinc-copper alloy, only Bidar makes the craft, GI-tagged) at peak production season. Hotels 30 percent below January peak: KSTDC Mayura Barid Shahi ₹1,000-1,800, Hotel Sapna ₹1,300-2,200, Krishna Regency ₹1,300-2,500. October window is cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 9, 3, 'wait',
  'Monsoon retreating. 19-28C, 100-140mm rain. Green fields peak. Last off-peak window.',
  'September is the bridge month. Monsoon retreats through the second half; rainfall drops to 100-140mm. Post-monsoon green peaks late month. Last off-peak window before season opens.',
  'September is more viable than the deeper monsoon but still below October-February peak. Daytime 27-28C; afternoon thunderstorms still break fort walks. Push to mid-October for proper clean weather.',
  'September in Bidar is the bridge month before the proper season opens. Rainfall drops to 100-140mm across 10-12 wet days — second-half is materially drier. Daytime 27-28C, nights 19-20C, humidity easing from 82 to 72 percent. The post-monsoon green peaks in the last 10 days — the Krishna-basin agricultural belt around Bidar district shows year-greenest fields against the Bahmani basalt walls, a visual contrast that dries to ochre by November. Bidar Fort 1.5km perimeter walks at improving comfort. The Madarasa Mahmud Gawan facade at peak morning light. The Bahmani Tombs at Ashtur walk cleanly. The Ahmad Shah Wali tomb interior frescoes at peak photographic visibility. Nanak Jhira Sahib langar full schedule. Bidriware workshops at full demonstration; the festive-season metal-inlay craft production ramps for the November-December market. Hotels 25 percent below January peak: KSTDC Mayura Barid Shahi ₹1,200-2,000, Hotel Sapna ₹1,500-2,500. October 15 onward is the clean call; September offers value pricing and greenest landscape for travelers wanting to pre-empt peak season.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 10, 4, 'go',
  'Season opens. 17-29C, 30-50mm rain. Green-field landscape. Fort walks return mid-month.',
  'October is the season opener. Monsoon residue 30-50mm in the first 10 days; from mid-month full clean Bahmani-circuit walking. Green plain around the fort still holds. Hotel rates 25-30 percent below January peak.',
  NULL,
  'October in Bidar is the proper return to the Bahmani circuit. Southwest monsoon withdraws around October 10-15 — first 10 days carry 30-50mm residue, back half flips into clean weather. Daytime 28-29C, nights 17-19C, humidity falling from 72 to 60 percent. The post-monsoon green plain still holds through October — visual sweet spot for the basalt-and-green-field landscape. Bidar Fort 1.5km perimeter walks comfortably through the afternoon — Gumbad Darwaza, Sharza Darwaza tiger-bastions, Solha Khamba mosque, Rangin Mahal Persian-tile interiors. Madarasa Mahmud Gawan (1472) facade and surviving tile-inlay at year-best morning detail. Bahmani Tombs at Ashtur (3km east, 12 royal mausoleums) walk cleanly — the Ahmad Shah Wali tomb interior frescoes at clean light. Nanak Jhira Sahib gurudwara at full langar service. Bidriware workshops at peak festive-season production. Hotels 25-30 percent below January peak: KSTDC Mayura Barid Shahi ₹1,300-2,200, Hotel Sapna ₹1,500-2,500. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 11, 5, 'go',
  'Peak builds. 15-27C, dry. Karnataka Rajyotsava Nov 1. Fort and tomb-row photography year-best air.',
  'November is the proper pivot to peak. Rainfall under 20mm, full Bahmani-circuit walking, Karnataka Rajyotsava Nov 1 brings Bidar district programming. Air visibility at year-best for the basalt-and-sky photography.',
  NULL,
  'November in Bidar is the year''s second-peak month behind January-February. Rainfall under 20mm, daytime 25-27C, nights 15-17C, humidity dropping below 58 percent. Air visibility at its annual cleanest. Bidar Fort walks comfortably through the afternoon — the 1.5km perimeter, the Rangin Mahal Persian-tile and mother-of-pearl interiors, the Solha Khamba 16-pillar mosque, the Sharza Darwaza tiger-bastions — at year-best photographic light. Madarasa Mahmud Gawan (1472) facade and surviving tile-inlay at clean detail. Bahmani Tombs at Ashtur 12-tomb-row walks at year-best traction and photography light — the Ahmad Shah Wali tomb interior frescoes (Persian Sufi calligraphic painting on the dome) clean visibility. Nanak Jhira Sahib (1512 — the sacred Sikh spring of Guru Nanak''s Deccan visit) at peak winter pilgrim flow. Bidriware workshops at peak festive-season production. Karnataka Rajyotsava (November 1) cultural programming in Bidar town. Hotels climb to 75 percent of January peak: KSTDC Mayura Barid Shahi ₹1,500-2,500, Hotel Sapna ₹1,800-3k. Strong call.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('bidar', 12, 5, 'go',
  'Peak season. 12-26C, dry. Christmas-NYE moderate rate spike. Bahmani circuit year-cleanest.',
  'December is operational peak. Daytime 24-26C, nights 12-14C, year-cleanest air visibility. The Bahmani Fort and Ashtur tomb-row at year-best. Christmas-NYE 1.5-2x rates.',
  NULL,
  'December in Bidar is the operational peak. Daytime 24-26C, nights drop to 12-14C, humidity 50 percent, rainfall under 10mm. Bidar''s 650m plateau elevation makes December nights the coldest of the year in Northern Karnataka — pack light layers. Air visibility at annual best — basalt-and-granite Bahmani walls show year-cleanest contrast against the winter sky. Bidar Fort walks comfortably from dawn through 6pm close — Gumbad Darwaza, Rangin Mahal Persian-tile interior, Solha Khamba mosque, Tarkash Mahal, the Chaubara watchtower (71-foot cylindrical climbable tower). Madarasa Mahmud Gawan facade at year-best detail. Bahmani Tombs at Ashtur (3km east, 12-tomb royal row) at year-cleanest morning light — the Ahmad Shah Wali tomb frescoes hold detail through the day. Nanak Jhira Sahib at peak winter pilgrim season; langar 11am-3pm. Bidriware workshops at peak Christmas-wedding-season production. Christmas-NYE (December 22 to January 5) sees moderate rate lift: KSTDC Mayura Barid Shahi ₹1,800-3k, Hotel Sapna ₹2,200-3,500, Krishna Regency ₹2,200-3,800. Hyderabad day-trip 140km southeast viable. Lock 4-6 weeks ahead.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

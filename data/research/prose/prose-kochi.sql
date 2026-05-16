-- Kochi (Fort Kochi) destination_months prose — 12 month-rows
-- Generated 2026-05-10 — S15 Kerala batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: kochi

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 1, 5, 'go',
  'Peak Malabar coast window. 22-31C, dry, post-NYE rates ease mid-month. Biennale running if cycle year.',
  'January is when Fort Kochi runs at its strongest. The Chinese Fishing Nets work both tides, ferry to Vypeen and Willingdon runs every 30 minutes from Customs Jetty, and the Mattancherry Spice Market stays cool enough to walk before noon. Biennale season (alternate years, next likely Dec 2026-Apr 2027) anchors the visit.',
  NULL,
  'Fort Kochi in January is the version Kerala veterans book first. Daytime sits at 24-31C, nights drop to 22C, humidity manageable at 65 percent. The Chinese Fishing Nets — 11 surviving frames from the Zheng He fleet (1350-1450) — operate dawn to dusk; ₹50 tip earns a hands-on lift of the cantilevered net. St. Francis Church (1503, oldest European church in India, where Vasco da Gama was originally buried) opens 9am-5pm, free entry. Mattancherry Palace (Dutch Palace) ₹5 entry, 9:45am-4:45pm closed Friday — the Ramayana mural ceiling is the standout. Pardesi Synagogue (1568) ₹10 entry, closed Friday-Saturday for Sabbath. Kerala State Water Transport ferries Customs Jetty to Vypeen run every 30 minutes ₹5/passenger, to Willingdon every 45 minutes. Christmas-NYE rate spike eases by January 5; Brunton Boatyard CGH walk-in drops from ₹35k peak to ₹22k, Old Harbour Hotel from ₹18k to ₹12k. Princess Street homestays (₹2-4k) hold steady availability. Kashi Art Cafe and Qissa anchor breakfast.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 2, 5, 'go',
  'Driest month. 23-32C. Biennale closing weeks if cycle year. Princess Street walking is at year-best.',
  'February is Fort Kochi''s cleanest weather window — rainfall under 10mm, low humidity, the heritage walk between St. Francis, Santa Cruz Basilica, the Synagogue and Spice Market stays comfortable till noon. If the Biennale is running (alternate years, last was Dec 2024-Apr 2025), February-March are the closing weeks — fewer crowds, full venue access.',
  NULL,
  'February in Fort Kochi is the technical peak. Rainfall under 10mm, daytime 24-32C, humidity at 60 percent — the lowest of the year. The Kochi-Muziris Biennale (alternate-year cycle, last Dec 2024-Apr 2025, next likely Dec 2026-Apr 2027) wraps in February-March with closing programmes — exhibition pass ₹150 standard / ₹500 patron, Aspinwall House and Pepper House are the two anchor venues, 12 sites in total. Off-Biennale years, February still delivers full heritage hours: Indo-Portuguese Museum 9am-1pm, 2pm-5pm closed Monday; Dutch Cemetery (1724, oldest European cemetery in India) walk-in. Mattancherry Spice Market — turmeric, cardamom, black pepper at wholesale ₹400-800/kg — stays cool enough through noon. Princess Street homestays at peak (₹3-5k); Brunton Boatyard ₹30k+, Old Harbour Hotel ₹15k+. Ferry to Vypeen runs every 30 minutes from 5:30am to 9pm. Kayees Biriyani Mattancherry (since 1957) hits its annual peak — ₹220 mutton biriyani, queue 12:30-2pm.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 3, 4, 'go',
  'Last cool month. 25-33C. Biennale closing if cycle year. Hotel rates slide 20 percent versus February.',
  'March extends February''s weather minus the peak crunch. Heritage walk still works mornings and evenings. Biennale closing fortnight (cycle years) brings final-week installation tours and artist talks. Hotel rates drop 20-25 percent from February peak — Brunton Boatyard at ₹22k, Old Harbour at ₹12k.',
  NULL,
  'March in Fort Kochi is the soft-landing month. Daytime 26-33C, humidity climbing toward 75 percent in the last week, but mornings before 10am and evenings after 5pm hold comfortably. The Biennale (cycle years) closes in the last week of March — final exhibition days at Aspinwall House run 10am-9pm with 30-40 percent more weekday walk-in availability than February. Off-cycle years, March is the best-value window before April heat: Brunton Boatyard CGH at ₹22-25k, Old Harbour Hotel at ₹11-13k, Forte Kochi at ₹9-11k. Princess Street homestays in the ₹2-3k bracket run 60 percent occupancy weekdays. Chinese Fishing Nets — go at 4:30pm for the dropping-light shot. Kashi Art Cafe (since 1997) breakfast 8:30-11:30am, Qissa for an Italian-Kerala tasting, Tea Pot Cafe anchors mid-afternoon. Last comfortable window before April pushes the trip into endurance mode.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 4, 3, 'wait',
  'Pre-monsoon heat. 27-34C, humidity 80 percent. Vishu Apr 14. Heritage walks collapse mid-day.',
  'April still works for heritage-focused travelers willing to time the walks. Vishu (April 14, Malayalam new year) brings Vishukani displays at temples and family-run sadhya at Fort Kochi homestays. AC museum-and-cafe rotation handles mid-day. Hotel rates 30-35 percent below February peak.',
  'April pushes Fort Kochi into pre-monsoon stress. The 1.5km Princess Street to Mattancherry walk and the Chinese Fishing Nets stand both collapse 11am-4pm. Sea breeze helps from 5pm onward but the Spice Market warehouses are unbearable noon-3pm. Wait for late October if comfort matters.',
  'April in Fort Kochi is when the heritage trip narrows to early morning and evening. Daytime 28-34C, humidity 80 percent, sea breeze starts only after 5pm. Vishu (April 14) brings the Malayalam new year — Vishukani arrangements (gold, rice, kanikkonna flowers in front of mirrors) fill homestays the morning of the 14th, free sadhya lunches at Brunton Boatyard CGH and Old Harbour Hotel for guests. The heritage walk works as 6:30-10am and 5-8pm only. AC retreat options: Indo-Portuguese Museum, Mattancherry Palace mural room, Kashi Art Cafe, Tea Pot Cafe, David Hall gallery. Hotel rates run 30-35 percent below February: Brunton Boatyard ₹18-20k, Old Harbour Hotel ₹10k, Forte Kochi ₹7-8k. Princess Street homestays drop to ₹1.5-2.5k. Friday-Sunday weekend traffic from Bangalore continues; weekday occupancy under 50 percent.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 5, 2, 'wait',
  'Peak heat plus pre-monsoon squalls. 28-34C, humidity 85 percent. Mid-month rate floor.',
  'May functions only for heritage-only travelers willing to anchor in AC venues. Mid-month thunderstorms knock power 1-2 hours daily, drop temps temporarily but raise humidity. Hotel rates at year-low — Brunton Boatyard at ₹15k, Princess Street homestays at ₹1.2-2k.',
  'May pushes Fort Kochi past comfort. Heritage walks possible only 6-9am and 6-8pm. Pre-monsoon thunderstorms knock grid 1-2 hours daily through the third and fourth week. Spice Market warehouses unbearable. The October-March window is dramatically better.',
  'May in Fort Kochi is the closing month before the southwest monsoon arrives around June 1. Daytime 29-34C, humidity 85 percent, sea breeze unreliable. Pre-monsoon thunderstorms hit the third and fourth week — short violent squalls that drop temperatures 4-5 degrees temporarily but knock grid power 1-2 hours and raise humidity to 90 percent for the rest of the day. Tourist load drops to roughly a third of January peak. Brunton Boatyard CGH at ₹14-16k versus January''s ₹35k, Old Harbour Hotel at ₹8k, Princess Street homestays at ₹1.2-2k. Heritage walks compress into 6-9am and 6-8pm windows. Kashi Art Cafe and Qissa hold full hours; Kayees Biriyani service runs through. AC museum-cafe rotation is the only viable mid-day shape. Cochin International Airport handles cyclonic-cell diversions occasionally — build a buffer day on either side of flights. Better still: wait for October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 6, 2, 'wait',
  'SW monsoon arrives June 1. 25-30C, 600-700mm rainfall. Heritage stays open but heavy rain disrupts.',
  'June is when the southwest monsoon hits Kerala first — the country-wide arrival is officially announced from Thiruvananthapuram. Rainfall 600-700mm across 22-25 wet days. Heritage venues stay open but the walking trip collapses; AC cafe-and-museum days only.',
  'June is full southwest monsoon at Fort Kochi. The Chinese Fishing Nets are the trip — and they''re grim in 6-hour deluges. Heritage walking impossible. Push to October if anything other than monsoon-Ayurveda is on the agenda.',
  'June in Fort Kochi is the southwest monsoon''s arrival point. The current hits Kerala on or around June 1 — IMD announces formal monsoon onset annually from Thiruvananthapuram, then Kochi follows within 24-48 hours. Rainfall jumps from May''s 80mm to 600-700mm across 22-25 wet days; daytime 25-30C feels mild but 90 percent humidity and sustained downpours close down the heritage walk that defines Fort Kochi. The Chinese Fishing Nets keep operating but visitor traffic at the cantilevered platform falls 80 percent. Mattancherry Spice Market stays open weekdays but the cobbled lanes flood. St. Francis Church, the Synagogue, Mattancherry Palace, the Indo-Portuguese Museum all hold their hours — an AC-museum day works. Hotel rates at year-low: Brunton Boatyard CGH at ₹10-12k, Old Harbour Hotel at ₹6-8k. Karkidakam Ayurveda season starts mid-July; some Kochi travelers stage 1-2 days here before moving inland to Kalady, Kumarakom, or Vagamon for treatments.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 7, 1, 'skip',
  'Peak monsoon. 25-29C, 700-800mm rainfall. Heritage walk impossible. Karkidakam Ayurveda elsewhere.',
  NULL,
  'July is the wettest month at Kochi. Rainfall 700-800mm across 25-27 wet days. The heritage walk that defines Fort Kochi — Princess Street, Spice Market, Synagogue Lane — runs at zero. Karkidakam Ayurveda season pulls travelers inland to Kumarakom or Vagamon. Skip Kochi proper.',
  'July in Fort Kochi is monsoon at its most stubborn. Rainfall averages 750mm across 25-27 wet days, often as 6-12 hour sustained deluges with cyclonic-cell wind. Cochin International Airport runs reduced inbound timetables on the wettest weeks. The Chinese Fishing Nets stand soaked and unmanned most days; the Spice Market lanes flood; ferry to Vypeen runs but with reduced frequency. The trip you came for — heritage walking, sundown at the Nets, Mattancherry exploration — is functionally closed. Hotel rates remain at year-low: Brunton Boatyard CGH ₹9-11k, Old Harbour Hotel ₹5-7k, Princess Street homestays ₹800-1.5k. Karkidakam (Ayurveda month, mid-July to mid-August in the Malayalam calendar) is the only real Kerala draw of the season — but Karkidakam Ayurveda happens at Kumarakom, Vagamon, or specialised Ayurveda resorts inland, not Fort Kochi. Wait for late October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 8, 1, 'skip',
  'Monsoon plus Onam. 25-29C, 500-600mm rain. Onam Aug 25 (verify 2026) closes much of the city. Skip.',
  NULL,
  'August holds July''s rain pattern with Onam (Thiruvonam Aug 25, 2026 — verify) layered on. State holidays close businesses for 2-4 days around Thiruvonam. Sadhya at Brunton Boatyard and Old Harbour is a draw, but the broader heritage trip remains rain-locked. Skip unless Onam is the specific reason.',
  'August in Fort Kochi pairs the southwest monsoon with the Onam state holiday cluster. Rainfall 500-600mm across 22-25 wet days, daytime 25-29C, humidity 88 percent. Onam''s ten days run Atham to Thiruvonam — Thiruvonam falls on August 25, 2026 (verify exact 2026 date via Kerala Tourism keralatourism.org). Most Hindu-owned shops, restaurants, and a portion of the heritage venues run reduced hours or close entirely on Thiruvonam day and the day after. Brunton Boatyard CGH and Old Harbour Hotel run elaborate sadhya lunches (₹1500-2500 per person, 26-28 dishes on banana leaf) — these book out 4-6 weeks ahead. Pulikali (tiger dance) processions through Thrissur are a 75km drive and the year''s standout cultural draw, but Fort Kochi itself is not where the action is. The walking trip stays rain-locked. The next clean window is mid-October.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 9, 2, 'wait',
  'Monsoon retreat. 25-30C, 350-400mm rain. Onam tail in early September. Heritage walk still wet.',
  'September is the recovery month. SW monsoon retreats through the second half, rainfall drops to 350-400mm. Onam celebrations linger through the first week with snake-boat races on the Pampa. Heritage walking still gets interrupted; full clean window opens mid-October.',
  'September is on the way back to coherent but still in the run-up to it. Fort Kochi heritage walks get rain-interrupted 3-4 days a week through the first fortnight. Push to mid-October for the clean shape — October delivers materially better weather and full ferry frequency.',
  'September in Fort Kochi is the trickle back. Rainfall drops to 350-400mm across 16-18 wet days, mostly first half. The southwest monsoon retreats from Kerala around September 25-30 (IMD declares formal withdrawal). Onam celebrations linger through the first week — Aranmula Boat Race on the Pampa is a 2-hour drive south, snake-boat traditions extending the festival tail. Daytime 25-30C, humidity easing to 80 percent. Heritage venues all open at full hours; the Chinese Fishing Nets resume regular operation as crews return. Cochin International Airport runs full schedules. Hotel rates climb 20 percent versus August lows but remain 50 percent below January peak: Brunton Boatyard CGH ₹14-16k, Old Harbour Hotel ₹8-10k, Princess Street homestays ₹1.5-2.5k. Friday-Sunday occupancy lifts as Bangalore weekend traffic resumes. Cycle-specific call: a 3-day Fort Kochi visit late September works for monsoon-tolerant travelers, but the October 15 onward window is dramatically cleaner.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 10, 4, 'go',
  'Season opens. 24-31C, 200-250mm late-monsoon spillover. Heritage walks return mid-month.',
  'October is the season-opener at Fort Kochi. Late-monsoon residue still drops 200-250mm in the first half but the back half delivers full heritage-walk weather. Hotel rates 30-35 percent below December peak — strong value window for first-time visitors.',
  NULL,
  'October in Fort Kochi is the proper return to coherent. Rainfall drops to 200-250mm with the bulk falling in the first ten days; from October 15 onward Fort Kochi flips into clean heritage-walk mode. Daytime 25-31C, humidity falling from 85 to 75 percent. The Chinese Fishing Nets, Mattancherry Spice Market, St. Francis Church, the Synagogue, Mattancherry Palace all run full schedules; ferry to Vypeen returns to 30-minute frequency. Biennale build-out begins (cycle years — next likely starting October 2026 for the December opening) — early arrivals at Aspinwall House and Pepper House install tour previews from late October. Hotel rates run 30-35 percent below December peak: Brunton Boatyard CGH at ₹20-22k versus December''s ₹35k, Old Harbour Hotel at ₹10-12k, Forte Kochi at ₹8-10k. Princess Street homestays return to ₹2-3k. Strong call for first-time visitors who want full heritage hours minus the Christmas-NYE crunch.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 11, 5, 'go',
  'Peak builds. 23-30C, rainfall under 50mm. Biennale opening mid-Dec (cycle years) drives Nov room demand.',
  'November is the proper pivot to peak. Rainfall under 50mm, full heritage-walk weather, Brunton Boatyard and Old Harbour at 80 percent occupancy, Biennale build (cycle years) ramps the last week. Hotel rates 20-25 percent below December peak.',
  NULL,
  'November in Fort Kochi is the year''s second-peak month behind January. Rainfall under 50mm, daytime 24-30C, sea breeze cooling evenings to 22-23C, humidity dropping below 70 percent. The Chinese Fishing Nets work both tides cleanly, the Mattancherry Spice Market runs cool through afternoons, ferry to Vypeen and Willingdon at full frequency. Biennale (cycle years — next likely Dec 2026-Apr 2027) ramps the build through November with installation previews; press preview week is typically the third week of November, public opens around December 10-15. Hotel rates climb to 75-80 percent of December peak: Brunton Boatyard CGH at ₹26-30k, Old Harbour Hotel at ₹12-14k, Forte Kochi at ₹10-12k, Princess Street homestays at ₹2.5-3.5k. Kayees Biriyani Mattancherry — go on a Tuesday or Wednesday by 12:30pm. Kashi Art Cafe and Qissa run full hours. Strong call for first-time Fort Kochi visitors.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('kochi', 12, 5, 'go',
  'Peak season. 22-30C, dry. Christmas-NYE rates 2-3x. Biennale opens mid-Dec (cycle years).',
  'December is when Fort Kochi runs at full capacity. Christmas-NYE (Dec 22-Jan 5) sees rates 2-3x normal. Biennale opens mid-month (alternate years — Dec 2024 was last, next likely Dec 2026). Lock heritage hotel beds 6-8 weeks ahead.',
  NULL,
  'December in Fort Kochi is the operational peak and the most expensive stretch of the Kerala heritage year. Daytime 23-30C, nights 21-22C, rainfall under 30mm. The Christmas-NYE corridor (December 22 to January 5) sees rates run 2-3x the November baseline: Brunton Boatyard CGH hits ₹35-40k, Old Harbour Hotel ₹15-18k, Princess Street homestays ₹3.5-5k. The Kochi-Muziris Biennale (alternate years — Dec 2024 to Apr 2025 was last edition, next likely Dec 2026 to Apr 2027) opens mid-December at Aspinwall House and Pepper House with 12 satellite venues, exhibition pass ₹150 standard, ₹500 patron — opening fortnight pulls 3,000-5,000 daily visitors. Christmas Eve carols at Santa Cruz Basilica (consecrated 1505 by Portuguese, basilica status 1984) run from 9pm; New Year''s Eve fireworks at Marine Drive. Cochin International Airport runs at peak capacity — flight inbound load factor 90 percent plus. Book heritage hotel beds 6-8 weeks ahead from October. The first three weeks of December (before December 22) are the better-value window — peak weather minus peak chaos.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

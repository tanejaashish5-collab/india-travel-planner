-- Mysore destination_months prose — 12 month-rows
-- Generated 2026-05-12 — S19 Karnataka batch
-- Voice: locked NakshIQ FT Weekend register
-- destination_id: mysore | best_months [10,11,12,1,2,3,7,8,9] | avoid [4,5]

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 1, 5, 'go',
  'Peak palace-city window. 16-29C, dry. Palace Sunday illumination 7-7.45pm. Heritage walking clean.',
  'January is when Mysore runs at its strongest. Daytime 25-29C, nights 16-18C, humidity 60 percent. Mysore Palace Sunday and festival evening illumination (96,000 bulbs, 7-7.45pm) at full tempo. Chamundi Hills, Brindavan Gardens, Jaganmohan Palace all on clean schedule.',
  NULL,
  'Mysore in January is the version every Karnataka regular books first. Daytime 25-29C, nights 16-18C, humidity 60 percent, rainfall under 10mm. The Amba Vilas Palace — the Mysore Palace, Indo-Saracenic 1912 rebuild by Henry Irwin after the 1897 fire that destroyed the original wooden palace — runs 10am-5.30pm, ₹70 Indian, ₹200 foreign. The Sunday and government-holiday evening illumination (96,000 incandescent bulbs across the facade, 7-7.45pm sharp) holds the city''s headline visual experience; arrive by 6.45pm for unblocked viewing. Chamundi Hills (1000m, 13km from city — the temple of Chamundeshwari, Goddess Durga''s slayer-of-Mahishasura form, Chola period 1659 sanctum) holds 1000 steps from base or 8km drivable road; Nandi monolith (4.9m, 1659) sits halfway. Jaganmohan Palace Art Gallery (Raja Ravi Varma collection) 8.30am-5pm ₹40. Mysore Zoo (1892, one of India''s oldest, 157 acres) 8.30am-5.30pm ₹100 adult. Brindavan Gardens (KRS Dam, 19km, the musical fountain 7pm) ₹50. Hotel Mylari (1942, "Mylari masala dosa" thinner-crisp version, ₹60-90/plate, 6.30am-noon + 4-9pm) and Guru Sweet Mart (Mysore Pak invention 1935 by Kakasura Madappa) hold breakfast peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 2, 5, 'go',
  'Driest month. 17-31C, humidity 55 percent. Heritage walking at year-best. Palace at full tempo.',
  'February is Mysore''s cleanest weather window — rainfall under 10mm, humidity 55 percent. Heritage circuit (Palace, Chamundi Hills, Jaganmohan Palace Art Gallery, St Philomena''s Cathedral) at full operational tempo. Hotel rates near peak.',
  NULL,
  'Mysore in February is the technical sweet spot. Rainfall under 10mm, daytime 27-31C, nights 17-19C, humidity at year-low 55 percent. The Amba Vilas Palace (Indo-Saracenic 1912, ₹70 Indian) runs 10am-5.30pm — the Durbar Hall Belgian crystal chandeliers, the gold throne (assembled only for Dasara), the painted-ceiling Kalyana Mantapa hold their year-cleanest visibility. Sunday and festival illumination (96,000 bulbs, 7-7.45pm) at peak weekend traffic. Chamundi Hills (1000m, 13km, Chamundeshwari Temple 1659) holds early-morning ascent traffic; the 1000-step climb works comfortably 6-9am. St. Philomena''s Cathedral (1936 Neo-Gothic, twin spires 175ft, third-tallest church in Asia) 5am-6pm. Jaganmohan Palace Art Gallery (₹40, 8.30am-5pm) — the Raja Ravi Varma originals plus the largest jigsaw painting in India and the 1900s clockwork dummy figures hold the strongest collection in the building. Mysore Zoo (1892, 157 acres, ₹100) and Brindavan Gardens (KRS Dam 19km, ₹50) on full schedule. Mysore Sandalwood Oil Government Factory (1916 — the world''s largest sandalwood oil producer, government-owned) offers guided 10am-4pm tours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 3, 4, 'go',
  'Warming. 19-33C, humidity 60 percent. Heritage walking till 11am. Hotel rates ease 15 percent.',
  'March extends February''s pattern with rising daytime heat. Heritage walking compresses to mornings before noon and post-4pm. Hotel rates ease 15 percent versus February peak. Last clean window before April pushes outdoor itineraries into endurance shape.',
  NULL,
  'Mysore in March is the soft-landing month. Daytime 28-33C, nights 19-21C, humidity climbing toward 65 percent in the last fortnight, rainfall under 20mm. The Amba Vilas Palace (₹70 Indian, 10am-5.30pm) and Chamundi Hills (1000m, 13km) walking ascent compresses to 6-10am — by mid-day the temperature on the exposed step-route makes the climb punishing. The drivable 8km road to the temple stays viable all day. Sunday and festival illumination (96,000 bulbs, 7-7.45pm) at full tempo with reduced weekday crowds. Jaganmohan Palace Art Gallery (₹40), Mysore Zoo (₹100), Brindavan Gardens (KRS Dam, ₹50) on full schedule. St. Philomena''s Cathedral (1936) and the Mysore Sandalwood Oil Government Factory (1916) hold full hours. Hotel Mylari (1942), Vinayaka Mylari, Guru Sweet Mart, Hotel Sandesh hold breakfast hours. Devaraja Market (1886, 750-stall covered market — turmeric, kumkum, jasmine, jaggery, silk by the kg) at year-light visitor weight. Holi (variable mid-March in 2026) brings a 3-day domestic weekend bump. Mysore Yoga schools (Ashtanga Yoga Institute, founded by K.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 4, 3, 'wait',
  'Pre-monsoon heat. 22-36C, humidity 70 percent. Outdoor heritage walks collapse mid-day. Palace and AC venues only.',
  'April still works for indoor-heavy itineraries — Palace, Art Gallery, Zoo air-conditioned trams, Sandalwood Factory. Outdoor walking (Chamundi steps, Devaraja Market) collapses 11am-5pm. Hotel rates 25-30 percent below February peak.',
  'April puts Mysore into mid-day endurance shape. 22-36C, humidity 70 percent, sea breeze irrelevant inland. Outdoor heritage walks (Chamundi steps, Devaraja Market, Palace courtyard) collapse 11am-5pm. Push to October-November for clean walking weather.',
  'Mysore in April is when the trip narrows to early morning and post-sunset. Daytime 30-36C, nights 22-24C, humidity climbing past 70 percent, rainfall under 50mm with first pre-monsoon thunderstorms hitting the last 10 days. The Chamundi Hills 1000-step climb (1000m, exposed staircase) collapses 11am-5pm — drivable 8km road remains viable. Devaraja Market (1886, covered but 36C inside) becomes unbearable mid-day. The Amba Vilas Palace interior (1912, Indo-Saracenic, ₹70) at lower visitor traffic — go 10-noon when the palace is cool inside. Sunday and festival illumination (96,000 bulbs, 7-7.45pm) continues at peak summer evening crowds (5,000-8,000 viewers Sunday nights). Jaganmohan Palace Art Gallery (₹40), Mysore Sandalwood Oil Government Factory (1916), Mysore Silk Factory (Government Karnataka Silk Industries Corporation 1912) hold full hours — AC retreats. Mysore Zoo (1892, ₹100) loses peak visitor numbers as the 157-acre walk runs too long for the heat. Lalitha Mahal Palace Hotel (1921), Radisson Blu, Royal Orchid Metropole, Country Inn all hold AC pool decks.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 5, 3, 'wait',
  'Pre-monsoon plus storms. 22-35C, humidity 75 percent. Power-cut risk. Hotel rates year-low.',
  'May still works for AC-heavy palace-and-museum itineraries. Pre-monsoon thunderstorms knock power 1-2 hours daily through the last fortnight. Hotel rates at year-low. October is dramatically cleaner.',
  'May is when pre-monsoon thunderstorms hit Mysore consistently. 27-35C, humidity 75 percent. Power cuts run 1-2 hours daily through the last fortnight. Outdoor heritage walks compress to dawn-9am and post-7pm. Wait for October.',
  'Mysore in May is the pre-monsoon transition month. Daytime 30-35C, nights 22-24C, humidity climbing past 75 percent in the last fortnight. Pre-monsoon thunderstorms hit harder than April — violent 1-2 hour evening squalls knock CHESCOM (Chamundeshwari Electricity Supply Corporation) grid 1-2 hours daily across the last 10 days. Daytime temperatures peak earlier and post-storm humidity stays at 85 percent through evening. The Amba Vilas Palace (₹70, 10am-5.30pm) interior stays cool — go for the full 90-minute walkthrough. Sunday illumination (96,000 bulbs, 7-7.45pm) holds full schedule. Chamundi Hills 1000-step climb workable 6-8am only; drivable 8km road remains viable. Jaganmohan Palace Art Gallery (₹40), Mysore Sandalwood Oil Government Factory (1916), Mysore Silk Factory (KSIC 1912) hold full AC hours — the strongest mid-day rotation. Devaraja Market (1886) functions but the bulk-flower (jasmine, marigold) lanes flood after every shower. Hotel Mylari (1942, ₹60-90/plate, 6.30am-noon + 4-9pm), Guru Sweet Mart, Vinayaka Mylari hold normal hours. Hotel rates at near year-low: Lalitha Mahal ₹7-10k, Radisson Blu ₹5-8k, mid-bracket ₹3-4.5k, homestays ₹1,200-2,200.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 6, 4, 'go',
  'SW monsoon arrives. 21-29C, 70-110mm rainfall. Mild relief from heat. Heritage circuit on full schedule.',
  'June is when the SW monsoon hits Mysore. 70-110mm rainfall — far lighter than coastal Karnataka. Temperatures ease to 21-29C, among the most comfortable Karnataka cities monsoon-wise. Heritage circuit on full schedule.',
  NULL,
  'Mysore in June is the year''s most comfortable stretch by temperature — the southwest monsoon arrives in the first fortnight (Karnataka inland onset typically June 5-10), bringing 70-110mm of rainfall across 12-15 wet days, almost all as 2-3 hour afternoon downpours. Daytime 24-29C, nights 21-23C, humidity 80 percent. Mysore handles the SW monsoon better than coastal Karnataka (Mangalore 1000mm in June) or Western Ghats (Coorg/Chikmagalur 600-800mm) — the city sits in a partial rain-shadow at 750m elevation. The Amba Vilas Palace (₹70 Indian, 10am-5.30pm) and the Sunday/festival illumination (96,000 bulbs, 7-7.45pm) at full tempo. Chamundi Hills (1000m, 13km, ₹free temple entry but ₹50 vehicle entry to the hilltop) on full schedule; the 1000-step climb works fine on dry mornings. Jaganmohan Palace Art Gallery (₹40), Mysore Zoo (1892, ₹100, 157 acres at peak greenery), Brindavan Gardens (KRS Dam 19km, ₹50, the musical fountain at higher reservoir levels makes the 7pm spectacle stronger). St. Philomena''s Cathedral (1936) and Mysore Sandalwood Oil Government Factory (1916) on full hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 7, 4, 'go',
  'SW monsoon. 21-28C, 80-120mm rainfall. Heritage circuit works. Brindavan Gardens at year-peak.',
  'July holds the June pattern — 80-120mm rainfall, mild 21-28C, heritage circuit at full operational tempo. KRS Dam fills, making Brindavan Gardens musical fountain at year-peak. Hotel rates at shoulder levels.',
  NULL,
  'Mysore in July is the second comfortable monsoon month — 80-120mm rainfall across 15-18 wet days, materially lighter than coastal Karnataka (Mangalore 800-1000mm) or the Western Ghats (Coorg 800-1000mm). Daytime 24-28C, nights 21-23C, humidity 85 percent. The Amba Vilas Palace (₹70, 10am-5.30pm) and the Sunday/festival illumination (96,000 bulbs, 7-7.45pm) at full tempo. Brindavan Gardens (KRS Dam at peak monsoon reservoir level — 124.8ft maximum — water releases visible most evenings) is the year''s strongest visit window; the musical fountain at 7pm gains significantly from full-dam atmosphere. ₹50 entry, gates 6am-8.30pm. Chamundi Hills (1000m, 13km) on full schedule though the 1000-step climb works best 6-8am to avoid afternoon showers. Jaganmohan Palace Art Gallery (₹40), Mysore Zoo (₹100, 157 acres at year-greenest), St. Philomena''s Cathedral (1936) all hold full hours. The Sandalwood Oil Government Factory (1916) and KSIC Silk Factory (1912) at peak silk-season production — Mysore silk and crepe-de-chine ₹3,000-15,000/sari directly at the factory outlet. Hotel Mylari, Vinayaka Mylari, Guru Sweet Mart hold normal hours.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 8, 4, 'go',
  'SW monsoon eases. 21-29C, 90-130mm rainfall. Independence Day weekend bump. Heritage circuit at full tempo.',
  'August holds the July pattern with marginal pickup in dry hours. 90-130mm rainfall. Independence Day weekend (Aug 15) brings 3-day domestic bump from Bengaluru and Chennai. Heritage circuit at full tempo.',
  NULL,
  'Mysore in August holds the July monsoon pattern — 90-130mm rainfall across 16-18 wet days, daytime 24-29C, nights 21-23C, humidity 85 percent. The city sits in the rain-shadow of the Western Ghats at 750m elevation, catching a moderate monsoon while Coorg (1100m, 50km west) catches 800-1000mm. The Amba Vilas Palace (1912 Indo-Saracenic, ₹70 Indian, 10am-5.30pm) and Sunday/festival illumination (96,000 bulbs, 7-7.45pm) at full tempo. Brindavan Gardens (KRS Dam at peak reservoir, the musical fountain 7pm strongest of the year) at peak visitor traffic on monsoon weekends. ₹50 entry. Chamundi Hills (1000m, 13km, Chamundeshwari Temple 1659) on full schedule. Jaganmohan Palace Art Gallery (₹40), Mysore Zoo (₹100, 157 acres), St. Philomena''s Cathedral (1936) all hold full hours. Independence Day (Aug 15) brings a 3-day weekend bump from Bengaluru, Chennai, Coimbatore — Mysore Palace illumination on Aug 15 evening draws 8,000-12,000 viewers. Mysore Silk Factory (KSIC 1912) and Sandalwood Oil Government Factory (1916) hold AC tours. Hotel Mylari (1942), Vinayaka Mylari, Guru Sweet Mart (Mysore Pak invention 1935), Hotel Sandesh hold breakfast peak.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 9, 5, 'go',
  'Dasara month opens. 20-29C. Karnataka grandest festival begins Sep 22, 2026. Palace pageantry peak.',
  'September is when Mysore Dasara opens. The 10-day state festival runs Sep 22 - Oct 1, 2026 (Mahanavami Sep 29, Vijayadashami Sep 30). Palace illuminated every evening for the duration. Jamboo Savari elephant procession on Vijayadashami. Hotel rates double to triple during the 10 days.',
  NULL,
  'Mysore in September is when the city stages India''s grandest festival after Kullu Dasara — Mysore Dasara, the state festival of Karnataka, with continuous documented royal celebration since 1610 under Wadiyar King Raja Wodeyar I, then Vijayanagara-influenced ritual since the 15th century. The 10-day 2026 festival runs September 22 (Mahalaya Amavasya) to October 1 (Vijayadashami) — Mahanavami September 29, Vijayadashami September 30 (verify exact dates against IST lunar calendar). Palace illumination (96,000 bulbs across the Amba Vilas facade) runs nightly 7-10pm for the duration — significantly extended from the standard Sunday-only schedule. The Jamboo Savari elephant procession on Vijayadashami day (Sep 30, 2026) is the centrepiece: the lead elephant (named Abhimanyu in recent years, before that Arjuna and Drona) carries the goddess Chamundeshwari''s idol on a 750kg golden howdah across the 5km Palace-to-Bannimantap parade route, accompanied by 12-15 caparisoned elephants, mounted cavalry, folk troupes, military bands. 2-3 lakh viewers line the route. Cultural programmes run nightly at Palace grounds, Kalamandira, Chamundi Hills, Jaganmohan Palace.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 10, 5, 'go',
  'Dasara tail + season open. 19-29C. Vijayadashami Oct 1 finale. Then dry post-monsoon walking weather.',
  'October is the Dasara tail (Sep 22 - Oct 1 finale) into clean post-monsoon weather. Palace illumination Sunday-and-special nights only after Oct 1. Heritage walking returns to full tempo. Hotel rates 30 percent below December peak after the first week.',
  NULL,
  'Mysore in October is when the city pivots from peak festival to clean post-monsoon walking weather. Dasara 2026 finishes October 1 with Vijayadashami (the procession-and-light-and-sound finale that closes the 10-day state festival). For the first week of October, Mysore Palace runs daily 7-10pm illumination plus the festival visitor flow; from October 2 onward the Palace returns to standard Sunday-and-festival-only 7-7.45pm illumination. Daytime 23-29C, nights 19-21C, humidity dropping toward 70 percent, rainfall 100-140mm — northeast monsoon overspill from Tamil Nadu hits mostly as 1-2 hour evening showers in the first fortnight. The Amba Vilas Palace (₹70 Indian, 10am-5.30pm) at clean visibility; Chamundi Hills (1000m, 13km, 1000-step climb) returns to viable full-day operations; Jaganmohan Palace Art Gallery (₹40); Mysore Zoo (₹100, 157 acres at year-greenest); Brindavan Gardens (KRS Dam, the musical fountain 7pm) all on full schedule. Karnataka Rajyotsava (Nov 1) preparations begin late month. Hotel rates drop sharply from the Dasara surge: Lalitha Mahal ₹9-13k (was ₹25-40k Dasara week), Radisson Blu ₹7-11k, mid-bracket ₹4-7k, homestays ₹2,000-3,500.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 11, 5, 'go',
  'High season builds. 17-28C, dry. Karnataka Rajyotsava Nov 1. Heritage walking peak. Christmas-week books out from mid-month.',
  'November is the genuine pivot to Mysore high season after Dasara. Rainfall under 60mm, humidity 60 percent, full heritage-walking weather. Karnataka Rajyotsava Nov 1 brings state-wide celebration. Hotel rates climb 20-25 percent across the month.',
  NULL,
  'Mysore in November is when the city turns to its second-strongest stretch after Dasara. Northeast monsoon overspill spent by mid-month, rainfall under 60mm across 5-7 wet days. Daytime 25-28C, nights 17-19C, humidity 60 percent — among the cleanest urban weather in South India. Karnataka Rajyotsava (November 1, State Formation Day 1956) brings state-wide celebration — Mysore Palace illuminated specially Nov 1 evening, Kalamandira programmes, Vidhana Soudha-equivalent venue events. The Amba Vilas Palace (1912 Indo-Saracenic, ₹70 Indian, 10am-5.30pm) and the Sunday/festival illumination (96,000 bulbs, 7-7.45pm) at full tempo. Chamundi Hills (1000m, 13km, Chamundeshwari Temple 1659) — 1000-step climb works full-day. Jaganmohan Palace Art Gallery (Raja Ravi Varma originals, ₹40), Mysore Zoo (1892, ₹100, 157 acres), Brindavan Gardens (KRS Dam, ₹50, musical fountain 7pm), St. Philomena''s Cathedral (1936, twin spires 175ft) all on full schedule. The KSIC Silk Factory (1912) and Sandalwood Oil Government Factory (1916) at peak shopping season ahead of winter weddings.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

INSERT INTO destination_months (destination_id, month, score, verdict, note, why_go, why_not, prose_lead)
VALUES ('mysore', 12, 5, 'go',
  'Peak season. 15-27C, dry. Christmas-NYE rates 2x. Palace illuminated for Christmas weekend.',
  'December is the year''s most reliable Mysore window — peak weather, dry, full operational tempo. Christmas-NYE week (Dec 22-Jan 5) drives rates to 2x base. Palace illuminated Dec 24-26 and Dec 31-Jan 1 special evenings.',
  NULL,
  'Mysore in December is the year''s most coherent post-Dasara window — peak weather, full operational tempo, the heritage city at year-cleanest. Daytime 24-27C, nights 15-17C (some hilltop locations drop to 13C late month), humidity 55 percent, rainfall under 15mm. Christmas-NYE week (Dec 22-Jan 5) is the tight stretch: Lalitha Mahal Palace Hotel (1921 royal guest palace, the country''s oldest heritage hotel chain — Ashok run) climbs to ₹18-25k against ₹8-11k off-peak; Radisson Blu Plaza ₹13-18k against ₹7-10k off-peak; Royal Orchid Metropole (heritage-style) ₹10-14k; mid-bracket business hotels ₹5-8k; homestays double to ₹3,000-5,000. The Amba Vilas Palace (1912 Indo-Saracenic, ₹70 Indian, 10am-5.30pm) at peak weekend visitor flow (15,000-25,000 per day Dec 24-Jan 2). Sunday/festival illumination (96,000 bulbs, 7-7.45pm) plus special Christmas-NYE evenings — Dec 24-26 and Dec 31-Jan 1 confirmed annually by the Karnataka State Tourism Department. Chamundi Hills (1000m, 13km, 1000-step or drivable 8km), Jaganmohan Palace Art Gallery (₹40), Mysore Zoo (₹100), Brindavan Gardens (₹50, musical fountain 7pm), St. Philomena''s Cathedral (1936) all on full schedule.'
)
ON CONFLICT (destination_id, month) DO UPDATE SET
  score = EXCLUDED.score, verdict = EXCLUDED.verdict, note = EXCLUDED.note,
  why_go = EXCLUDED.why_go, why_not = EXCLUDED.why_not, prose_lead = EXCLUDED.prose_lead;

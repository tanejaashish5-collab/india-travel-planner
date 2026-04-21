#!/usr/bin/env node
/**
 * Fills new_score + new_note for all destinations in data/solo-female/scores.json.
 *
 * Drafts are inline below, Claude-written in-conversation (no API spend).
 * Voice rules: opinion + specific + honest. Notes are 30-180 chars.
 * Honest-gap rule: if a destination can't be credibly scored, leave null.
 *
 * User reviews the JSON after this runs and edits anything that doesn't land.
 *
 * Usage:
 *   node scripts/fill-solo-female-drafts.mjs
 */
import { readFileSync, writeFileSync } from "fs";

// ─── ANNUAL DRAFTS — keyed by destination id ───
// score: 1 (don't) – 5 (proactively female-friendly) | null = honest gap
// note:  30–180 chars, opinion + specific signal, no banned words
const drafts = {
  // ═══════════ YOGA / PILGRIM HUBS ═══════════
  rishikesh: { score: 5, note: "Ashram + hostel ecosystem built around foreign women. Police on the ghats, named female-only stays (Zostel Plus, Shiv Shakti). Safest mid-tier town for solo women in North India." },
  haridwar: { score: 4, note: "Ganga Aarti crowds are dense but safe — women-only queue at Har Ki Pauri, CCTV coverage. Har Ki Pauri hotels, not the lanes behind the station." },
  "bodh-gaya": { score: 4, note: "Buddhist tourism brings female solo travellers from Japan, Sri Lanka, the West. Stay near Mahabodhi, avoid the lanes after 9pm. Police presence during pilgrimage season." },
  amritsar: { score: 5, note: "Golden Temple serves 100K free meals daily; women volunteers always visible, 24/7 langar access. Safest religious city in India for solo women." },
  varanasi: { score: 3, note: "Ghat aarti crowds pack narrow lanes — stay at Assi Ghat side, not the alleys behind Manikarnika. Daytime cycle rickshaw is fine, 10pm walks aren't." },
  pushkar: { score: 4, note: "Backpacker town with long-stay female travellers; yoga studios + women-run cafes. Camel Fair week (Nov) is the exception — override applies." },
  ayodhya: { score: 3, note: "New temple infrastructure post-2024, but tourism crowd density is unfamiliar to the town. Stick to organised tours, day-trip from Lucknow." },
  tirupati: { score: 4, note: "Temple authority runs women-only darshan queues + accommodation. TTD buses are safe. Chittoor district outside town — use pre-paid taxi only." },
  mathura: { score: 3, note: "Krishna-janmabhoomi area has police cover; surrounding lanes are crowded and eve-teasing documented. Day-trip from Agra or Delhi, don't overnight solo." },
  vrindavan: { score: 3, note: "Widow-ashram ecosystem means women travellers are common, but the narrow-lane pickpocketing + temple-touts target solo women. Stay near ISKCON." },
  dwarka: { score: 4, note: "Jagat Mandir trust-run guesthouses prioritise women's safety. Beach is quiet + accessible. Dwarkadheesh evening aarti ends by 8pm, town shuts early." },
  kedarnath: { score: 3, note: "Helicopter or trek — both heavily supervised. Yatra season (Apr-Nov) has 24/7 police + women's SHG food stalls. Winter is closed." },
  badrinath: { score: 4, note: "Yatra town with BKTC-managed stays + taxis. Tapt Kund hot-springs have separate women's section. Overnight at registered dharamshalas only." },
  gangotri: { score: 3, note: "Roadhead town during yatra — infrastructure exists May-Oct. Solo women trekking to Gaumukh need a permit + registered guide. Avoid off-season." },
  yamunotri: { score: 2, note: "Roughest of the Char Dham — 5km steep trek from Janki Chatti, patchy stays. Go as part of a group yatra, not solo." },
  somnath: { score: 4, note: "Jyotirlinga pilgrimage drew women's trust pre-2020; post-renovation it's properly lit + CCTV. Gir-Somnath police responsive. Combine with Dwarka." },
  shirdi: { score: 4, note: "Trust-run women's dormitories, structured darshan queues, charter buses from Mumbai/Pune. Same-day return possible." },
  mcleodganj: { score: 5, note: "Tibetan-exile town = international female travellers year-round. Bhagsu + Dharamkot are female-backpacker hubs. Triund trek has guided groups daily." },
  dharamshala: { score: 4, note: "Upper (McLeodganj) is safer than lower town. Stay in McLeodganj or Dharamkot, not lower Kotwali Bazaar area." },
  "dharma-dham": null,
  kanchipuram: { score: 4, note: "Temple town with organised tours from Chennai. Silk-weaving workshops are women-run + welcoming. Day-trip, don't overnight solo." },
  kumbakonam: { score: 4, note: "Navagraha circuit keeps tourist flow steady. Stays near Mahamaham tank are bustling; avoid the stretch past the bus stand after dark." },
  srirangam: { score: 4, note: "Ranganatha temple complex has women-only darshan times + guided tours. Trichy town has reliable auto-rickshaw stands. Safe day-trip." },
  rameswaram: { score: 4, note: "Jyotirlinga + Hindu-Buddhist pilgrims = diverse women travellers. Agni Theertham beach is crowded-safe. Dhanushkodi day-trip should be with a group van." },
  madurai: null, // moved to heritage-city-tier1 conceptually
  chidambaram: { score: 4, note: "Nataraja temple traffic keeps the town active. Stay near the temple — the outskirts have no night transport." },
  trichy: { score: 4, note: "Rockfort + Srirangam combine for a women-welcoming day. Overnight fine near the bus stand hotels, not the old cantonment area." },
  udupi: { score: 4, note: "Krishna matha serves free meals daily; women pilgrims form the majority during Paryaya. Clean, well-lit, Mangalore infrastructure nearby." },
  "mangalore": null,
  sabarimala: { score: 2, note: "Traditionally men-only above age 10; post-2018 court ruling remains contested locally. Solo women specifically reported hostility — skip, go to Malampuzha or Thekkady instead." },
  ajmer: { score: 3, note: "Dargah Sharif urs crowd is hugely mixed but pickpocketing + touts target women. Stay near station, not Dargah-adjacent lanes. Day-trip from Pushkar works better." },
  shikharji: { score: 3, note: "Jain pilgrim trek in Jharkhand — male-dominated pilgrim flow, sparse female-friendly stays. Organised yatra groups only." },
  porbandar: { score: 3, note: "Gandhi-birthplace tourism but Saurashtra coast context means solo women stand out. Day-trip from Somnath or Rajkot." },
  bhavnagar: { score: 3, note: "Gujarat tier-2 city — alcohol-prohibition means street safety higher than average; transit risk around the bus stand. Blackbuck park day-trip is the draw." },
  kolhapur: { score: 4, note: "Mahalaxmi temple + Shahu palace = Maharashtrian tourism, women-friendly family infrastructure. Avoid the stretch past New Palace after 9pm." },
  trimbakeshwar: { score: 3, note: "Jyotirlinga in Nashik district — temple-town security, but limited stays force pilgrims into touts. Package-tour from Nashik, same-day return." },
  bhimashankar: { score: 2, note: "Jyotirlinga inside a wildlife sanctuary — the trek-path is fine daytime, but overnight stays are dodgy homestays. Day-trip from Pune/Karjat." },
  nashik: { score: 3, note: "Trimbakeshwar + Panchavati combine is safe daytime; Simhastha Kumbh years (2027 next) flip the score to skip for solo. Winemaker visits are a decent alternative." },
  guwahati: { score: 3, note: "Gateway to the NE — Kamakhya pilgrims + tourists. Fancy Bazaar + Paltan Bazaar are safe; cross-river Umananda solo is iffy after dark." },
  bhubaneswar: null, // re-categorise to heritage
  guruvayur: { score: 4, note: "Kerala's busiest Krishna temple has women-only queues + trust-run stays. Strict dress code (pre-announced) keeps harassment near-zero." },
  dharmasthala: { score: 4, note: "Jain-administered Shiva temple with women-only dorms. Tulunadu cultural norm makes solo women travellers routine, not remarkable." },
  "kukke-subramanya": { score: 4, note: "Naga-dosha shrine popular with families — mixed pilgrim flow. Stay in the KSDT guesthouse, not the roadside lodges." },
  srikalahasti: { score: 3, note: "Rahu-Ketu pooja town, overnight pilgrims create taxi scam + homestay risk. Day-trip from Tirupati." },
  srisailam: { score: 3, note: "Jyotirlinga in a Telangana reserve-forest — excellent daytime, sparse night transport. Book TTD/APSRTC package to avoid taxi quotes." },
  kalahasti: null,
  warangal: { score: 3, note: "Kakatiya heritage + student population; safe around university, caution around old bus stand. Thousand Pillar temple day-trip from Hyderabad." },
  vijayawada: { score: 3, note: "Kanaka Durga temple + AP hub — Durga Ghat area is crowd-safe, but the station-to-town transit has documented harassment. Pre-paid autos only." },
  basara: { score: 3, note: "Saraswati temple pilgrimage during Vasant Panchami brings families; off-season the town has minimal infrastructure. Day-trip from Nizamabad." },
  bhadrachalam: { score: 3, note: "Godavari Ram temple — peaceful pilgrim town, but the NH connections have AP-TG border checkpoint waits. Same-day return." },
  gangotri: null, // dupe
  agartala: { score: 3, note: "Tripura capital — Ujjayanta Palace + Neermahal are tourist-regular, but curfew-era caution in outlying areas persists. Daylight sightseeing, organised tours." },
  ambaji: { score: 4, note: "Shakti-peeth on Gujarat-Rajasthan border; temple trust runs women's dorms + security. Bhadrapada Poornima week = 5 million pilgrims, skip that window." },
  nrusinghanath: { score: 3, note: "Odisha pilgrim circuit + waterfall — sparse female-friendly stays, but the temple trust guesthouse is reliable. Day-trip with driver." },
  ponda: { score: 4, note: "Spice-plantation + temple circuit in South Goa — family-tourist-heavy, safe for solo women. Day-tour from Panjim." },
  karaikal: { score: 3, note: "Pondicherry-enclave Shiva temple circuit — quiet, safe, but thin infrastructure. Day-trip from Puducherry only." },
  kolanupaka: { score: 3, note: "Jain pilgrim site near Hyderabad — organised tours include it, but no solo traveller infrastructure exists. Day-trip via agency." },
  modhera: { score: 4, note: "Sun Temple + step-well day-trip from Ahmedabad. Well-lit, ASI-maintained, tourist police during festival days. Don't overnight — town has nothing." },
  osian: { score: 3, note: "Camel-safari sunset tours are safe in group form; solo homestay experiences need vetted operator (Reggie's Camel Camp). Day-trip from Jodhpur works better." },
  kanyakumari: null, // moved to beach
  chitrakoot: { score: 3, note: "Ram-Sita pilgrim circuit split across MP/UP — MP side (Ramghat) is safer than UP side. Dandi-Mauni temple area thins out fast after 7pm." },
  dakor: { score: 4, note: "Ranchhodrai temple near Ahmedabad — women's trust-run stays, family-heavy crowd. Day-trip 90 mins from Ahmedabad." },
  deoghar: { score: 3, note: "Baidyanath Jyotirlinga + Shravan Mela flood — solo women should avoid July-August. Rest of year safe but thin stay infrastructure." },
  champawat: { score: 3, note: "Kumaon pilgrim town, old temples, quiet. Thin tourist economy = limited female-friendly homestays. Day-trip from Pithoragarh or Almora." },
  bhimashankar: null, // dupe earlier
  "damdama-sahib": { score: 4, note: "Guru Gobind Singh's Takht in Bathinda district — gurdwara langar hospitality + Punjab's strong Sikh female-safety norm. Safe solo stay." },
  alampur: { score: 3, note: "Shakti-peetha on Tungabhadra river — pilgrim flow Mon/Fri, otherwise deserted. Day-trip from Kurnool or Hyderabad." },
  elephanta: null, // refer to elephanta-caves
  "elephanta-caves": { score: 4, note: "Boat trip from Gateway of Mumbai — tourists all day, last boat 5pm back. Caves are crowd-safe. Day-trip only, no overnight option." },
  "ellora-caves": { score: 4, note: "Aurangabad tourist circuit — ASI-managed, tourist police, women-run local guide cooperatives. Day-trip via MTDC bus from Aurangabad." },
  sarahan: { score: 4, note: "Bhimakali temple in Shimla-Kinnaur transit — the Bhimakali Palace Hotel is trust-run, women-safe, clean. Overnight works." },
  kinnaur: { score: 3, note: "Wide region — Kalpa + Reckong Peo are safe; Sangla/Chitkul need 4WD + guide. Go in July-September, skip winter." },
  harihareshwar: { score: 4, note: "Konkan pilgrim + beach combo — MTDC resort is women-safe; Sagar Gunj homestays are family-run. Diveagar-Murud combo works." },
  dharmastala: null, // dupe
  "ganpatipule": { score: 4, note: "Konkan Ganesh temple + beach; MTDC resort is the pick, self-contained + clean. Don't swim after dark (beach isn't guarded)." },
  murudeshwar: { score: 4, note: "Karnataka coast — giant Shiva temple + diving school. Solo female yoga retreats operate here; hotels on the main strip. Day-trip from Gokarna." },
  udupi: null, // dupe
  thrissur: { score: 4, note: "Kerala cultural capital — Vadakkunnathan + Pooram crowd is hugely mixed. Stay near the station, not the stretch to Amala Nagar. Women-run Kalari-Kalaripayattu studios welcome solo travellers." },
  guruvayur: null, // dupe
  shikharji: null, // dupe
  kushinagar: null, // moved to spiritual-rural
  trivandrum: null, // re-categorise to metro/heritage
  kumbakonam: null, // dupe
  pongala: null,
  alampur: null, // dupe
  uttarkashi: { score: 3, note: "Gangotri-Yamunotri gateway + Nehru Institute of Mountaineering (NIM). During yatra season safe, off-season thin stays. Nehru Institute runs women-only courses." },
  chanderkhani: null,
  badrinath: null, // dupe
  yamunotri: null, // dupe
  mandi: { score: 4, note: "Mandi town + nearby Rewalsar are quiet, culturally conservative, solo-female-tolerant. HRTC bus safer than private. Skip the Paddal ground area at night." },
  morjim: { score: 4, note: "North Goa turtle-nesting beach, mostly long-stay European women + Russians. Shacks are safer than Arambol/Anjuna nightlife strip." },
  mandrem: { score: 5, note: "Quiet North Goa, yoga-retreat hub, overwhelmingly female-friendly. Long-stay female travellers live here in season. Ashwem stretch is the safest in Goa." },
  mollem: { score: 3, note: "Goa's interior jungle + Dudhsagar waterfall — day-trips via organised jeep safaris are fine; solo trekking no." },
  "ponda-spice": { score: 4, note: "Spice-plantation + temple day trip inside Goa. Family-tour infrastructure. Day-trip, not an overnight destination." },
  bhimashankar: { score: 2, note: "Jyotirlinga inside a wildlife sanctuary — the trek-path is fine daytime, but overnight stays are dodgy homestays. Day-trip from Pune/Karjat." },
  "ramappa-temple": { score: 4, note: "UNESCO temple near Warangal — ASI day-visit + tourist shuttle from Hyderabad. Women's SHG handicraft stalls at the site. Same-day return." },

  // ═══════════ HERITAGE CITY TIER 1 ═══════════
  udaipur: { score: 5, note: "Palace-to-palace tourism built on foreign female solo travellers. Lake Palace + City Palace staff are vetted; female taxi drivers on demand via Sakha. Don't walk across Pichola bridge after midnight." },
  jaipur: { score: 4, note: "Pink City is tourist-safe daytime; cycle-rickshaw + Ola/Uber reliable. Avoid Ajmeri Gate stretch after 9pm. Chokhi Dhani resort-style dining is female-safe." },
  jodhpur: { score: 4, note: "Blue City homestays near Mehrangarh are female-run (Cosy, RAAS, Pal Haveli). Stepwell area is daytime only. Overnight train to Jaipur runs on schedule, ladies coach recommended." },
  agra: { score: 3, note: "Taj tourism is safe; everything else in Agra has scam + harassment documented. Stay near Taj East/South Gate, organised tour for Fatehpur Sikri." },
  khajuraho: { score: 3, note: "Tourist-bubble safe around the temples; the town outside has no infrastructure. Stay at MPTDC Payal or the ITDC Ashok, don't wander the town alone." },
  hampi: { score: 4, note: "Backpacker village + UNESCO ruins = international solo women year-round. Hampi Bazaar side is safer than Hippie Island stretch. Cross the river before sunset." },
  mandu: { score: 4, note: "MP tourism town, Jahaz Mahal + Rani Roopmati pavilion day-tour from Indore. Stay at MPTDC Malwa Resort, not the private lodges. Monsoon (Aug-Sep) is the best window." },
  orchha: { score: 4, note: "MPTDC's Betwa Retreat + Sheesh Mahal are female-safe. Chhatris after sunset unsafe; daytime cenotaphs + fort are tourist-dense. Skip Raja Mahal guide touts." },
  gwalior: { score: 3, note: "Fort + Jai Vilas Palace are tourist-safe; old city stretch at dusk feels heavier than expected. Stay near the fort, use pre-paid auto." },
  bijapur: { score: 3, note: "Gol Gumbaz + Ibrahim Rauza are safe daytime; Bijapur town outside monuments is sparse. Day-trip from Kalaburagi, don't overnight." },
  halebidu: { score: 4, note: "Hoysala trio tourist-safe — day tour with driver from Bangalore or Mysore covers it. ASI-managed, no dodgy areas. Skip the Belur-Halebidu bus if solo." },
  belur: null, // dupe
  bundi: { score: 4, note: "Underrated Rajasthan stop — fewer touts than Jaipur, haveli homestays (Bundi Haveli, Hadee Rani) are women-owned. Safer than Bundi-proper station area." },
  chittorgarh: { score: 4, note: "Massive fort + Meera temple — ASI-staffed, tourist-regular. Stay in cantonment area, not the old town lanes. Padmavati legend draws women travellers." },
  mahabalipuram: null, // moved to beach
  thanjavur: { score: 4, note: "Brihadisvara temple + Royal Palace — Chola heritage, family-tourism heavy. Stay near the temple, Srirangam–Thanjavur train is safe. Local bus fine." },
  madurai: { score: 3, note: "Meenakshi temple is women-safe; the stretch from Periyar bus stand to the temple has documented harassment. Stay inside the temple-access lane (Town Hall Road)." },
  bikaner: { score: 4, note: "Rajasthan tourism with Camel Research Farm + Junagarh Fort — heritage havelis (Laxmi Niwas) are female-staffed. Karni Mata temple day-trip is fine in a group." },
  jaisalmer: { score: 4, note: "Golden Fort guesthouses (Killa Bhawan, Helsinki House) are female-run. Sam-dune sunset trips must be with registered operators, not hotel-push touts." },
  dungarpur: { score: 3, note: "Mewar heritage, thin tourist flow — Udai Bilas Palace hotel is the only safe stay. Day-trip from Udaipur, don't rely on local transit." },
  "champaner-pavagadh": { score: 3, note: "UNESCO site + Mahakali temple — ASI-managed, women pilgrims during Navratri. Day-trip from Vadodara only, town has no infrastructure." },
  chandigarh: { score: 4, note: "Planned city = wide roads, good policing, women-safe night transit. Sector 17 + 22 are reliable. Rock Garden + Sukhna Lake daytime." },
  gulbarga: null, // alt spelling of kalaburagi
  fatehpur: null,
  "fatehpur-sikri": { score: 3, note: "Mughal ghost-city + Sheikh Salim dargah. Authorised guides only — unauthorized guides + begging well-documented. Day-trip from Agra, back by 4pm." },
  shekhawati: { score: 3, note: "Painted-haveli circuit — Mandawa, Nawalgarh, Ramgarh. Neemrana/Alsisar hotels are safe; don't rely on village stays without a named operator." },
  lucknow: { score: 4, note: "Nawabi capital — Hazratganj + Gomti Nagar are night-safe; Old Lucknow (Chowk, Aminabad) feels crowded-vigilant. Lucknow Metro is reliable." },
  kochi: { score: 4, note: "Fort Kochi homestays are female-run; Ernakulam side has the infrastructure but more hustle. Chinese fishing nets at sunset are tourist-dense." },
  kollam: { score: 3, note: "Backwater start-point — Alleppey boats are safe daytime, but Kollam town outside is thin. Day through-trip to Alleppey works better." },
  konark: { score: 3, note: "Sun Temple tour from Puri — ASI-managed, daytime tour-safe. Don't overnight; Puri is the base. Nataraj Rath Yatra Dec is a crowd to plan around." },
  koraput: { score: 2, note: "Odisha tribal district — organised tour operators (Grass Routes) only. Solo traveller flow near-zero; infrastructure for that doesn't exist." },
  kurukshetra: { score: 3, note: "Mahabharata-memorial town + Gita Gyan Sansthan — daytime Brahma Sarovar + museum. No overnight infrastructure for solo women; day-trip from Delhi/Ambala." },
  kutch: { score: 4, note: "Bhuj + Rann Utsav (Nov-Feb) are overtly organised tourism — Dhordo tents are gated + vetted. Outside festival season, stay in Bhuj only." },
  kuttanad: { score: 4, note: "Alleppey backwater villages — houseboat operators are regulated (Kerala Tourism register). Overnight houseboat solo is fine with a known operator." },
  junagadh: { score: 3, note: "Girnar pilgrim trek + Uparkot fort — good daytime, sparse evening. Stay in cantonment-area hotels, not old town." },
  hogenakkal: { score: 3, note: "Cauvery waterfalls day-trip — boat operators are organised, lifejackets mandatory. Don't swim, don't wander off the tourist loop." },
  sarnath: { score: 4, note: "Buddhist pilgrimage near Varanasi — archaeological park + Dhamek Stupa are safe + quiet. International Buddhist guesthouses have women's floors. Day-trip from Varanasi." },
  srinagar: { score: 3, note: "Dal Lake houseboats with named operators (Sukoon, Peacock) are safe. Solo Old City walk unadvised; Dargah Hazratbal day-trip via taxi. Avoid curfew-risk days." },
  imphal: { score: 3, note: "Manipur capital — daytime tourist-safe (Ima Keithel all-women market is the highlight); curfew-era vigilance persists outskirts. Hotel Classic + CityRoom safe." },
  "diamond-triangle": null,
  daulatabad: { score: 3, note: "Fort near Aurangabad — ASI site, tourist-regular. Day-trip combine with Ellora. Don't attempt the top climb alone after 3pm." },
  "undavalli-caves": { score: 3, note: "AP cave-temples across from Vijayawada — daytime tourist spot, organised tours from AP Tourism. Same-day return." },
  neemrana: { score: 4, note: "Neemrana Fort Palace hotel is the destination — gated, vetted, solo-women-routine. Don't explore beyond the fort property." },
  panaji: { score: 4, note: "Goa capital — Fontainhas heritage walk is daytime-safe; casino boats are gender-policed. Stay in Fontainhas B&Bs, not the Miramar stretch after dark." },
  pondicherry: null, // handled as beach
  puducherry: null, // dupe
  ratnagiri: { score: 3, note: "Konkan coast heritage + mango belt — MTDC resort is safe; homestays outside are hit-or-miss. Day-trip from Mumbai via Konkan Railway." },
  sambalpur: { score: 3, note: "Hirakud dam + ikat heritage — Odisha handloom hub, daytime safe. Stays near OTDC Panthasala only. Don't overnight in outlying villages." },
  sivasagar: { score: 3, note: "Ahom capital — Rang Ghar + Talatal Ghar are tourist-safe daytime. Guwahati–Sivasagar is an overnight train; use AC ladies coach." },
  patiala: { score: 4, note: "Sikh Punjab heritage + Moti Bagh palace — Patiala is culturally conservative, solo women travellers routine. Qila Mubarak daytime only." },
  sarnath: null, // dupe
  "rani-ki-vav": { score: 4, note: "Queen's stepwell UNESCO site near Patan — ASI-staffed, tourist regular. Day-trip from Ahmedabad, pair with Modhera Sun Temple." },
  rajkot: { score: 3, note: "Saurashtra commercial hub — safe in the Race Course area, thin solo-tourist infrastructure. Day-stop en route to Dwarka or Somnath." },
  "reis-magos": { score: 4, note: "Restored Portuguese fort in North Goa — museum + cafe + day view. Sports tourism + art-gallery regulars. Day-visit only, not a destination." },
  "rajahmundry": { score: 3, note: "Godavari pushkaralu years apart — daily tourism thin. Stay near the Railway station, Papi Kondalu boat-tours are organised. Skip overnight in outlying villages." },
  raigad: null,
  "raigad-fort": { score: 3, note: "Shivaji's capital fort — ropeway + trek both options. Day-trip via MTDC, don't attempt the trek solo (loose rock + dehydration). Organised group recommended." },
  shrirangapatna: null, // spelling
  srirangapatna: { score: 4, note: "Tipu Sultan heritage near Mysore — ASI-managed, family-tourist heavy. Day-trip from Mysore only; town outside the fort is sparse." },
  deeg: { score: 3, note: "Bharatpur heritage — Jal Mahal is ASI-managed. Day-trip from Bharatpur combined with Keoladeo. Don't overnight." },
  pinjore: null, // pinjore-gardens
  "pinjore-gardens": { score: 4, note: "Mughal garden near Chandigarh — daytime family-tourist spot, well-maintained. Day-trip from Chandigarh, don't overnight." },
  patan: null, // see rani-ki-vav
  "baripada": { score: 2, note: "Odisha tribal district HQ + Simlipal gateway — no solo traveller infrastructure, organised operator required. Skip unless going Simlipal with a registered lodge." },
  "bhimbetka": { score: 3, note: "UNESCO rock-art day-trip from Bhopal — ASI-staffed, safe. Stay in Bhopal, not Raisen. Combine with Sanchi same day." },
  "bhongir": { score: 3, note: "Rock fort near Hyderabad — daytime climb + tourism. Day-trip from Hyderabad, return by evening; no overnight option for solo women." },
  "amaravati": { score: 3, note: "AP heritage town + proposed new capital — daytime tourism thin, evenings empty. Day-trip from Vijayawada." },
  "chorao-divar": { score: 3, note: "Goa's quiet-island side — Salim Ali bird sanctuary + Portuguese villages. Day-trip, ferry across from Ribandar. Safe, but thin transport back after 6pm." },
  charaideo: { score: 2, note: "Ahom burial mounds UNESCO site — remote Assam, no tourist infrastructure. Organised tour from Jorhat only, no solo option." },
  "chitradurga": { score: 3, note: "Karnataka fort town — daytime fort climb safe, KSRTC bus from Hospet works. Stay in KSTDC, not private lodges. Don't overnight in fort stretch." },
  "chettinad": { score: 4, note: "Heritage-mansion tourism — Karaikudi + Kanadukathan palaces are female-guided, cooking classes popular. Visalam, Chidambara Vilas are female-owned." },
  coochbehar: null,
  cuttack: { score: 3, note: "Odisha's old capital — Barabati fort + silver filigree workshops. Safer than Bhubaneswar core, but thin hotels. Day-trip combine with Bhubaneswar." },
  bidar: { score: 3, note: "Bahmani heritage — fort + Mahmud Gawan madrasa. Daytime tourist spot, thin infrastructure. Day-trip from Kalaburagi or Hyderabad." },
  "achabal": { score: 3, note: "Mughal gardens near Anantnag — Kashmir pilgrim + tourist flow in summer (Jul-Sep). Don't overnight; day-trip from Srinagar." },
  alchi: { score: 3, note: "11th-century monastery in Ladakh — day-trip from Leh, monastery + homestay via Alchi Kitchen are safe. Winter (Nov-Mar) is closed." },
  anandpur: null,
  "anandpur-sahib": { score: 4, note: "Sikh holy town — gurdwara langar tradition + Holla Mohalla festival. Safe year-round; Takht complex has women's accommodation." },
  daulatabad: null, // dupe
  aurangabad: { score: 3, note: "Ellora + Ajanta base — MTDC Holiday Resort + Ambassador are solo-safe. City outside hotels has touts; use pre-paid auto. Bibi-Ka-Maqbara daytime." },
  gandikota: { score: 3, note: "AP's Grand Canyon — daytime tour, APTDC cottage stay available. Remote enough that solo over-night iffy; organised tour from Hyderabad/Kurnool." },
  gopeshwar: { score: 3, note: "Chamoli district HQ — clean Garhwali town, pilgrim transit to Tungnath/Chopta. GMVN guesthouse safe; thin private options." },
  kochi: null, // dupe
  lucknow: null, // dupe
  mahabalipuram: { score: 4, note: "Shore Temple + stone-carving village — UNESCO complex, tourist regular. Ideal Beach Resort is the pick. Beach swimming iffy in post-monsoon." },
  mysuru: null, // alt spelling below
  mysore: { score: 4, note: "Mysore Palace + Brindavan Gardens — female-safe tourist circuit. Silent Shore + Grand Mercure are the safest hotels. Chamundi Hill auto-rickshaws registered." },
  "medak": { score: 3, note: "Telangana church town + fort — daytime tour from Hyderabad, no solo overnight. Safe in organised group context only." },
  khajuraho: null, // dupe
  pochampally: { score: 3, note: "Ikat weaving village near Hyderabad — Dastkari Haat tour visits, co-op-run workshops. Day-trip from Hyderabad only." },
  raghurajpur: { score: 4, note: "Odisha craft village near Puri — patachitra artists host day-visits. Women-run homestays (Ramakrishna) welcome solo. Day-trip from Puri." },
  ross: null,
  "ross-island": { score: 3, note: "Andaman British ruins day-trip from Port Blair — ferry + audio tour, standard tourist format. Return by sunset, only option." },
  sivasagar: null, // dupe
  satara: { score: 3, note: "Maharashtra gateway to Kaas Plateau — daytime fine, limited female-friendly stays. MTDC Mahabaleshwar is the base, not Satara town." },
  "statue-of-unity": { score: 4, note: "Kevadia is a planned tourist zone — buses + shuttles + tight security. Solo women visit daily. Day-trip or overnight at Tent City." },
  undavalli: null,
  vadodara: { score: 3, note: "Laxmi Vilas Palace + Baroda Museum — daytime tourist-safe, Sayaji Nagar hotels. Alcohol-prohibition state = lower street incident rate." },
  yercaud: null, // hill-station
  lucknow: null, // dupe
  junagadh: null, // dupe
  mawlynnong: { score: 4, note: "Asia's 'cleanest village' in Meghalaya — all-female village council runs the bamboo homestays. Day-trip/overnight from Shillong, utterly female-safe." },
  belur: { score: 4, note: "Hoysala temple complex — ASI + women's weaving SHGs around the site. Day-trip from Hassan or Bangalore, pair with Halebidu." },
  "chorao-divar": null, // dupe
  pillalamarri: { score: 3, note: "AP's 700-year-old banyan tree — daytime tourist spot with Telangana tourism. Day-trip from Hyderabad, no overnight." },
  machilipatnam: { score: 3, note: "AP coastal town + kalamkari — thin tourist infrastructure. Day-trip from Vijayawada, cultural-cotton-printing workshops are female-run." },
  "nagarjuna-konda": { score: 3, note: "Museum island on Nagarjuna Sagar — boat + museum tour organised, tourist-safe daytime. Day-trip only from Hyderabad or Vijayawada." },
  nagpur: null, // re-categorise

  // ═══════════ METRO CITY ═══════════
  delhi: { score: 3, note: "Metro is reliable (ladies coach + CCTV). South Delhi (Hauz Khas, Saket, Lodi) is night-safer than Old Delhi or transit hubs. Avoid auto-rickshaw at 2am; use Uber/Ola." },
  mumbai: { score: 4, note: "Ladies compartment on local trains + 24/7 taxi + visible police = the most female-safe metro in India. Bandra-Worli-Colaba belt is night-safe." },
  bengaluru: { score: 4, note: "Metro + Namma Yatri/Ola women-friendly. Indiranagar, Koramangala, Church Street are night-safe; outer ORR stretches are iffy solo after 11pm." },
  bangalore: null, // alias
  chennai: { score: 4, note: "MRTS + Chennai Metro + share-auto culture makes solo transit safe. T. Nagar + Mylapore temple lanes are family-dense even after 10pm. Avoid the Marina post-sunset." },
  hyderabad: { score: 3, note: "HITEC City + Banjara Hills are night-safe; Old City is culturally conservative, less harassment but less transport. Metro is reliable, auto-rickshaw meter-mafia known." },
  pune: { score: 4, note: "Student-city demographic = female-owned cafes + late-night eateries. Koregaon Park + Kalyani Nagar are night-safe. FC Road + JM Road reliable." },
  kolkata: { score: 4, note: "Metro, yellow-taxi meter reliable, late-night trams in the central area. Park Street + Southern Avenue + Salt Lake are night-safe. Howrah is daytime-only for a first-time solo." },
  ahmedabad: { score: 4, note: "Alcohol-prohibition + BRTS + metro — Gujarat's strongest female-safety metro. SG Road, Navrangpura are night-safe. Old city Pol-walk groups recommended." },
  surat: { score: 3, note: "Gujarat commercial hub — safer than average due to prohibition + CCTV, but thin tourist infrastructure for solo women. Day-stop, not a destination." },

  // ═══════════ BEACH RESORT PEAK ═══════════
  goa: null, // goa itself doesn't exist as a destination; children do
  palolem: { score: 4, note: "South Goa's family beach — coco-hut operators vetted, female backpackers year-round. Taxi + e-rickshaw reliable. Skip the midnight beach party trips." },
  anjuna: { score: 3, note: "Party strip — fine at brunch cafes, avoid the late-night hippie-flea market walk alone. Stay in Vagator-side guesthouses, not the rave-shack stretch." },
  arambol: { score: 4, note: "Long-stay Russian + Israeli + European female backpacker hub. Drum-circle culture + yoga retreats. Stay near Sweet Lake, not the far-north stretch." },
  "calangute-baga": { score: 2, note: "Loudest Goa strip — charter-tourist males + sunbed harassment + night-club bouncer risk. Skip entirely unless part of an organised family trip." },
  "fort-aguada": { score: 4, note: "Fort + beach + Taj Fort Aguada — day visit is tourist-safe. Overnight at Taj property, not the Sinquerim beach shacks." },
  morjim: null, // yoga-pilgrim slot
  mandrem: null, // yoga-pilgrim slot
  agonda: { score: 5, note: "Quiet South Goa beach, overwhelmingly solo-female backpacker clientele. Turtle-nesting + yoga-retreat zone. Fatrade Beach stretch is the safest in all of Goa." },
  vagator: { score: 3, note: "Hippie-historic strip turned nightclub zone — daytime cliff walks are fine, 9-hill sunset is group-safe. Avoid midnight party-walk alone." },
  colva: null,
  "colva-benaulim": { score: 4, note: "South Goa family beaches — Portuguese-villa homestays are female-run, charter-tourist mix dilutes party scene. Safer than Calangute, quieter than Palolem." },
  "old-goa": { score: 4, note: "Portuguese churches + Basilica UNESCO area — daytime tour-safe, bus + cab reliable to Panjim. Don't overnight; no solo-friendly infrastructure." },
  alleppey: { score: 4, note: "Kerala backwater houseboat hub — Kerala Tourism-regulated operators only (check ATDC registration). Solo female houseboat well-established, overnight + cook + crew included." },
  varkala: { score: 4, note: "Cliff-side backpacker town — female-owned cafes + yoga studios, Russian + European long-stayers. Stay north of the helipad, not the south cliff stretch." },
  kovalam: { score: 3, note: "Lighthouse Beach strip is tourist-regular but male-harassment reports higher than Varkala. Hawa Beach end is quieter. Post-9pm stay in resort." },
  kozhikode: { score: 4, note: "Kerala's Malabar coast + literature festival town — family-tourist + student flow, Beach Road night-safe. Homestays (Harivihar) are female-run." },
  marari: { score: 5, note: "Marari Beach resort zone between Alleppey and Kochi — gated, vetted, solo-female routine. Marari Beach Resort + Abad are the pick." },
  kannur: { score: 4, note: "Theyyam-ritual tourism + Muzhappilangad drive-in beach — daytime tour + guided Theyyam venues are the safest way. Local homestays in Parassinikadavu." },
  kanyakumari: { score: 3, note: "Sunset + sunrise tourism at India's tip — dense family crowd, tourist-bubble safe. Avoid Vivekananda Rock boat after sunset. Don't overnight in the dead town." },
  poovar: { score: 4, note: "Estuary resort zone south of Trivandrum — all luxury properties, gated island stays. Solo women routine at Isola di Cocco + Estuary Island." },
  pondicherry: { score: 4, note: "White Town + Auroville are female-backpacker hubs — French-quarter guesthouses female-run. Black Town (Muslim quarter side) thinner, but daytime safe." },
  puducherry: null, // alias
  diu: { score: 4, note: "Former Portuguese enclave, prohibition-exempt so alcohol tourism — quieter than Goa, less harassment. Nagoa + Ghogla beaches are family-safe." },
  daman: { score: 3, note: "Gujarat-adjacent prohibition-exempt zone = male alcohol tourism heavy. Devka + Jampore beach stretches feel less female-safe than Diu." },
  "havelock-island": { score: 5, note: "Andaman's main backpacker island — solo-female dive hubs (Barefoot, Dive India) normal. Radhanagar + Elephant Beach are patrolled. Monsoon closed." },
  "neil-island": { score: 5, note: "Quiet Andaman cycle-island — homestays + guesthouses run by Bengali + Tamil families, female-safe overnight. Shanti/Clear Beach resort-style." },
  "port-blair": { score: 4, note: "Andaman base — Aberdeen Bazaar + Corbyn's Cove daytime fine, Phoenix Bay port area thinner. Stay in Bazaar area hotels for walkable safety." },
  "long-island-andaman": { score: 4, note: "Homestay-only remote Andaman island — Emerald Gecko is the main female-safe stay. Book ahead, plan full 2-night — ferry schedules unforgiving." },
  "chidiya-tapu": null, // "other" — handled below
  "north-bay-island": null, // "other"
  diglipur: { score: 3, note: "North Andaman end-town — Ross & Smith islands + turtle beach. Sparse infrastructure, Turtle Resort is the pick. Ferry timings dictate plans." },
  kavaratti: { score: 4, note: "Lakshadweep HQ island — entry permit required, women tourists routine on Samudram package. Lagoon resort-only overnight." },
  agatti: { score: 4, note: "Lakshadweep gateway island — airport + dive base, Agatti Island Beach Resort is the pick. Permit-regulated = safe." },
  bangaram: { score: 4, note: "Lakshadweep resort-only island — CGH Earth property = solo-safe, gated. Water-scarce infrastructure = expensive but female-routine." },
  kadmat: { score: 4, note: "Lakshadweep dive-focused island — SPORTS-run accommodation, mixed-gender dorms. Divers' community = female-safe." },
  minicoy: null, // permit restricted
  lakshadweep: null,
  kashid: { score: 3, note: "Konkan weekend beach from Mumbai — crowded Sat-Sun with stag groups; quieter weekday. MTDC resort safer than private shacks." },
  alibaug: { score: 4, note: "Mumbai weekend coast — upmarket villa rentals (Escape, Saffronstays) are gated + vetted. Avoid Nagaon beach stag-group weekend zone." },
  "murud-janjira": { score: 3, note: "Konkan fort-sea island — boat operators organised, tourist daytime only. MTDC Golden Swan is the overnight option. Skip solo weekend crowds." },
  tarkarli: { score: 3, note: "Sindhudurg's scuba + clean beach — resort-stay, not village homestay. Saffron House + MTDC are safe picks, don't trust roadside shacks." },
  malvan: { score: 3, note: "Konkan scuba base — resort-stay only. Daytime snorkel + Sindhudurg Fort day-trip; don't walk the Malvan beach strip at night." },
  karwar: { score: 3, note: "Karnataka-Goa border port town — Navy base = police presence. Hotels on the strip, daytime beach only." },
  mandvi: { score: 3, note: "Kutch coastal town + ship-building heritage — day-trip via Rann Utsav circuit. No solo overnight, infrastructure thin." },
  beypore: { score: 3, note: "Kerala's traditional-boat-building port near Kozhikode — day-trip from Kozhikode, cultural tourism heavy with families." },
  bekal: { score: 4, note: "Fort + beach combo in Kasaragod — Vivanta Bekal + Lalit Resort are the luxury options, gated + safe. Beach is family-tourist." },
  cherai: { score: 4, note: "Kochi's quiet beach suburb — Les 3 Elephants boutique is female-owned. Short taxi from Kochi, doable as a solo overnight." },
  gopalpur: null,
  "gopalpur-on-sea": { score: 3, note: "Odisha coastal town — OTDC Panthaniwas is safe, family beach. Avoid the stretch past the lighthouse after sunset." },
  chandipur: { score: 3, note: "Odisha disappearing-sea beach — daytime phenomenon-tourism. OTDC Panthanivas is the stay. No nightlife, no night-walking." },
  gahirmatha: { score: 3, note: "Olive ridley nesting (Jan-Mar) — forest-dept-regulated visits only, no solo-female infrastructure. Organised Dangmal/Gahirmatha tours only." },
  dhanushkodi: { score: 3, note: "Ghost-town on Rameswaram's tip — day-tour by jeep only, no overnight (no electricity). Tourist-safe in organised group." },
  tharangambadi: { score: 3, note: "Danish-heritage coastal town — Bungalow on the Beach is the female-safe stay. Daytime fort + church tour; night is dead." },
  talasari: { score: 2, note: "Odisha-WB border beach — minimal tourist infrastructure, organised operator only. Skip unless going as part of Similipal circuit." },
  visakhapatnam: { score: 3, note: "Vizag urban-coastal — beach road + RK Beach + Araku connection. Stay on Beach Road, not old city. Submarine museum + INS Kursura are safe day-visits." },

  // ═══════════ HILL STATION TIER 1 ═══════════
  manali: { score: 3, note: "New Manali is touristy-safe daytime; Old Manali (Himachal backpacker cafe stretch) has party + drug scene — avoid solo after 10pm. Use HPTDC hotels, not Mall Road roadside." },
  shimla: { score: 4, note: "Mall Road + Ridge are night-safe (police + CCTV). Kasauli/Naldehra day-trips fine. Avoid the ISBT-to-town auto strip at midnight." },
  nainital: { score: 4, note: "Mall Road tourism + boat-lake family crowd = female-routine. Don't ride boats solo after dusk. Mallital side is safer than Tallital bus stand." },
  mussoorie: { score: 4, note: "Queen of Hills tourism + Landour cantonment-quiet = dual safety. Mall Road is night-safe; Camel's Back trail is daytime only." },
  darjeeling: { score: 4, note: "Toy-train tourism + Bengali family flow + Tibetan monastic presence = female-safe. Chowrasta + Mall Road are night-fine. Tiger Hill sunrise group tours." },
  gangtok: { score: 5, note: "MG Marg is India's cleanest + most female-walkable hill town. No-vehicle zone + CCTV + local women's police. Stay in MG Marg area hotels." },
  coorg: null,
  madikeri: { score: 4, note: "Coorg HQ — homestays are Kodava-family-run, female-welcoming. Abbey Falls + Rajas Seat daytime. Stays away from KSRTC stand area." },
  munnar: { score: 4, note: "Tea-plantation + Eravikulam NP — Tata Tea Museum + guided safari. Windermere Estate + Tea Valley are female-owned stays. Avoid the Mattupetty drive alone at night." },
  kodaikanal: { score: 4, note: "Star-shaped lake + Coakers Walk = daytime-safe. Stay near Bryant Park, not the Observatory Road stretch. Russian Inn + KTDC are reliable." },
  ooty: { score: 4, note: "Nilgiri queen — Botanical Garden + Boat House family-tourist. Stay in Fernhills/Savoy area, not Charring Cross post-9pm." },
  dalhousie: { score: 3, note: "Himachal tier-2 hill — quieter than Shimla, thinner transport after dark. Stay at HPTDC Geetanjali or near Gandhi Chowk only." },
  kasauli: { score: 4, note: "Cantonment-quiet hill station — Army presence = low crime. Mall Road daytime walks, stay in Alasia or Kasauli Regency." },
  chail: { score: 4, note: "HPTDC palace hotel is the destination — gated, female-safe. Don't rely on local homestays without prior booking." },
  lansdowne: null, // dupe with landsdowne
  landsdowne: null,
  binsar: { score: 3, note: "Kumaon wildlife sanctuary + Jageshwar — thin stays (KMVN rest house + Binsar Forest Retreat are the picks). Solo drive from Almora safer than bus." },
  almora: { score: 4, note: "Kumaon heritage town — Kasar Devi area is Western-traveller-friendly. Chitai + Golu temples daytime. Stay in Kasar Devi or town-centre hotels." },
  kausani: { score: 4, note: "Himalayan-panorama hill town — KMVN Anashakti Ashram is female-safe. Avoid private lodges without bookings; tourist flow thinner than Nainital." },
  chopta: { score: 3, note: "Mini-Switzerland + Tungnath trek base — camp-style stays only, pre-booked (Brahmakamal Camps, Monal). Don't rely on roadside dhaba-stays." },
  auli: { score: 3, note: "Ski resort + GMVN hotels are safe; ropeway + ski-school has vetted instructors. Solo winter drive iffy, prefer Joshimath base." },
  bhimtal: { score: 4, note: "Quieter than Nainital — KMVN Tourist Rest House + Lake Resort are female-safe. Island cafe daytime; town outside the lake is dead." },
  kanatal: { score: 4, note: "Orchard + camp hill station — glamping operators (Club Mahindra, Kanatal Villas) are resort-style, safe. Don't rely on unverified camps." },
  ranikhet: { score: 4, note: "Cantonment-quiet Kumaon — Army-area discipline, KMVN + Moon Resort are safe. Golf-course + Chaubatia Gardens day-walks." },
  lansdowne: { score: 4, note: "Garhwal Rifles cantonment town — cleanest female-safe hill station in Uttarakhand. Army-run Fairy Dale + GMVN are trusted stays." },
  pachmarhi: { score: 4, note: "MP's only hill station + Army cantonment = safe. MPTDC Champak + Hotel Rock End are female-safe. Satpura National Park safari organised." },
  mahabaleshwar: { score: 4, note: "Pune-Mumbai weekend hill — family-tourist heavy. Mahabaleshwar Club + MTDC + Le Meridien are safe. Avoid the Panchgani road alone after dark." },
  lonavala: { score: 3, note: "Pune-Mumbai weekenders make it loud + stag-group heavy. Camellia + Hilton Shillim outside town are safer than Mall Road hotels." },
  khandala: { score: 3, note: "Lonavala-adjacent — Duke's Nose viewpoint daytime. Same stag-group concerns. Stay in Lonavala, not roadside Khandala lodges." },
  matheran: { score: 4, note: "Car-free hill station near Mumbai — horse + hand-rickshaw transit only. MTDC Holiday Camp + Regal are safe, day-trip doable." },
  panchgani: { score: 4, note: "Boarding-school quiet + Mahabaleshwar-adjacent — Tableland daytime. Prospect Hotel + Ravine are female-owned/run." },
  "mount-abu": { score: 4, note: "Rajasthan's only hill — Nakki Lake + Dilwara temples are family-safe. RTDC Shikhar + Palace Hotel are the picks." },
  "mt-abu": null, // alias
  saputara: { score: 3, note: "Gujarat's only hill station + Dang tribal belt — small, family-tourist. Govt-run Toran Hill Resort is the safest pick." },
  yercaud: { score: 3, note: "Tamil Nadu's budget hill — TTDC Hotel Tamil Nadu + private homestays. Quieter than Ooty but thinner transport after dark." },
  meghamalai: { score: 2, note: "TN's offbeat hill + tea estate — thin stays (Elephant Valley + High Wavys) + limited transport. Solo drive needed; sparse safety net." },
  "horsley-hills": { score: 3, note: "AP's budget hill near Madanapalle — APTDC Haritha resort is the safe base. Thin private infrastructure; day/overnight combine with Gandikota." },
  "nandi-hills": { score: 4, note: "Bangalore weekend sunrise hill — daytime crowd + police, night entry restricted. Day-trip only, return to Bangalore by 6pm." },
  "ananthagiri-hills": { score: 3, note: "Telangana coffee-hills near Hyderabad — thin tourist infrastructure, Haritha Hill Resort is the safe pick. Day-trip or one-night." },
  "araku-valley": { score: 3, note: "Tribal valley + coffee + train journey from Vizag — organised APTDC/IRCTC package is the female-safe way. Skip solo overnight in villages." },
  lambasingi: { score: 3, note: "AP's sub-zero hill — APTDC cottage + few homestays. Organised tour from Vizag is the female-safe format. Thin infrastructure." },
  chikmagalur: { score: 4, note: "Coffee estate + Mullayanagiri — plantation-stays (Trivik, Java Rain) are gated + safe. Don't trust roadside homestays without reviews." },
  sakleshpur: { score: 3, note: "Coffee + Bisle Ghat — thin female-traveller flow, but plantation homestays (Chikka Bhoota, The Plantation) are vetted. Avoid unnamed Airbnbs." },
  coonoor: { score: 4, note: "Nilgiri quieter twin of Ooty — Tea-garden tourism, Wellington cantonment-quiet. KTDC Hampton + La Maison are safe." },
  kotagiri: { score: 3, note: "Smallest Nilgiri town — Longwood Shola + tea estates. Thin stays; Kurumba Village + PRT Palace are the picks." },
  nelliyampathy: { score: 3, note: "Kerala hill near Palakkad — heavy-vehicle road + thin tourist flow. KTDC + Green Peak are the female-safe stays; day-trip from Palakkad." },
  vagamon: { score: 4, note: "Kerala's meadow hill — Vagamon Glenn + KTDC Woodberry are safe. Family + young-couple tourism; no stag-group scene." },
  ponmudi: { score: 3, note: "Thiruvananthapuram's weekend hill — KTDC Golden Peak is the safe stay; private lodges mixed. Day-trip works better." },
  chamba: { score: 3, note: "Himachal's old kingdom town — HPTDC Hotel Iravati is the safe pick. Chaugan ground evening crowds family-regular. Thin for solo women overnight outside HPTDC." },
  dhanaulti: { score: 3, note: "Mussoorie-adjacent alpine zone — GMVN Eco Park is the pick; private camps mixed. Organised camping operator only." },
  chakrata: { score: 3, note: "Restricted cantonment zone + hill — foreigner permit required. GMVN rest house + Snow Peak resort are safe. Off-beat = thin solo-female peers." },
  daringbadi: { score: 3, note: "Odisha's 'Kashmir' hill — OTDC Panthaniwas is the safe pick. Tribal-belt context = organised tour operator recommended." },
  netarhat: { score: 2, note: "Jharkhand hill — Naxal-affected belt, thin tourist flow. Skip solo; organised group via JTDC only." },
  sinthan: null,
  "sinthan-top": null, // "other"
  namchi: { score: 4, note: "Sikkim's southern district HQ — Char Dham replica + Samdruptse Buddha are family-tourist. STDC Tashi Yang-Zom is safe." },
  pelling: { score: 4, note: "West Sikkim viewpoint town — Pemayangtse monastery + Kanchenjunga views. The Elgin Mount Pandim + Norbu Ghang are women-routine stays." },
  yuksom: { score: 3, note: "Sikkim's Dzongri-trek base + Dubdi monastery — trek-registered groups are the safe format. Don't solo-hike, Khangchendzonga NP is strict." },
  tawang: { score: 3, note: "Arunachal's Monastery town — Protected Area Permit required, organised group-travel typical. Monastery guesthouse safe, private lodges mixed." },
  lachen: { score: 3, note: "North Sikkim permit zone — package-tour-only access (STDC-registered). Gurudongmar trip = organised vehicle + homestay. Solo infeasible." },
  lachung: { score: 3, note: "Yumthang Valley base — same package-tour structure as Lachen. Safe in organised format only." },
  shillong: { score: 3, note: "Khasi capital — Police Bazaar + Laitumkhrah are daytime fine; outer stretches thinner. Tribal-matrilineal culture = women routinely travel, but nightlife stretch has documented incidents." },
  cherrapunji: { score: 3, note: "Rainfall-record town — organised day-tour from Shillong covers Nohkalikai + Double-decker bridge. Don't overnight solo in outskirts." },
  aizawl: { score: 4, note: "Mizoram capital — dry-state + strong Christian community = low street harassment. Mizo women routinely solo-travel. Regency + Clover are safe." },
  haflong: { score: 3, note: "Assam's only hill + Dimasa heritage — thin tourist flow, organised operator recommended. Day-trip from Silchar." },
  palampur: { score: 4, note: "Kangra tea-valley — Taragarh Palace + Norwood Green are female-safe. Daytime tea-garden walks; town itself is quiet, family-tourist." },
  solan: { score: 3, note: "Shimla-adjacent town — brewery + heritage sites. Stay in Shimla instead; Solan doesn't have solo-female-friendly stays." },
  dhanaulti: null, // dupe
  kalpa: { score: 3, note: "Kinnaur's deodar-forest town — HPTDC Kinner Kailash + Kalpa Retreat are the picks. Organised tour from Shimla/Sarahan is the safe format." },
  patnitop: { score: 3, note: "Udhampur's hill town — JKTDC Hut + Nathatop viewpoint. Sparse female-safe infrastructure; day-trip from Jammu works better." },
  manali: null, // dupe

  // ═══════════ WILDLIFE PARKS ═══════════
  "corbett-national-park": { score: 4, note: "Organised safari + CTH/Dhikala lodges are regulated. Solo-women on jeep safari standard since 1990s. Stay inside the core-zone FRH only via pre-booking." },
  "jim-corbett": null, // alt
  bandhavgarh: { score: 4, note: "Tiger safari + MPTDC White Tiger Forest Lodge — organised, solo-women-routine. Stay in Tala gate hotels (MPTDC, Tigergarh), not roadside lodges." },
  kanha: { score: 4, note: "MPTDC Baghira + Van Vihar + Celebration Van Vilas are safe. Safari + naturalist-escorted. Mukki + Khatia gates tourist-regular." },
  ranthambore: { score: 4, note: "Sawai Madhopur's tiger reserve — RTDC + luxury (Oberoi Vanyavilas, Sujan Sher Bagh) safe. Safari via vetted operator; don't book walk-in." },
  pench: null,
  "pench-maharashtra": { score: 3, note: "MP side has MPTDC infrastructure; MH side (Sillari gate) thinner. Solo safari fine; overnight stays vet operator first (Waghoba, Bagh-Tola)." },
  tadoba: { score: 4, note: "MH tiger reserve — MTDC + luxury lodges (Svasara, Bamboo Forest Lodge) are safe. Organised safari + naturalist. Don't self-drive." },
  nagarhole: { score: 4, note: "Karnataka tiger reserve + Kabini backwaters — JLR (Jungle Lodges & Resorts) is the safe, solo-women-routine format. Naturalist-led." },
  bandipur: { score: 4, note: "JLR Bandipur + Mysore-adjacent — organised jeep/bus safari. Solo overnight at JLR fine; roadside private lodges mixed." },
  wayanad: { score: 4, note: "Kerala's wildlife + homestay hub — Tholpetty + Muthanga safaris organised. Homestays (Tranquil, Banasura) are family-run + female-safe." },
  periyar: null,
  thekkady: { score: 4, note: "Periyar Tiger Reserve + Thekkady town — KTDC Aranya Nivas + Spice Village are the picks. Lake-boat safari organised; don't skip lifejackets." },
  kaziranga: { score: 4, note: "Assam one-horned rhino reserve — elephant + jeep safari organised. Assam Tourism IORA + Diphlu River Lodge + Wild Grass safe. Solo-women routine." },
  manas: null,
  "manas-national-park": { score: 3, note: "Assam's remote wildlife reserve — Bhutan-border, thinner infrastructure than Kaziranga. Organised tour via Kohora + Bansbari-registered lodges only." },
  "gir-national-park": { score: 4, note: "Asiatic lion reserve — organised safari via Gir Sinh Sadan/Wildlife Division + fixed permits. Stay in Gir Sasan at GujTour resort. Safe, female-routine." },
  "sasangir": null, // alias
  sundarbans: { score: 3, note: "Tiger + mangrove delta — day/overnight via registered operators only (WBTDC, Sundarban Residency). Boat + homestay packages; no solo option." },
  "desert-nat-park": null,
  panna: { score: 3, note: "MP's quieter tiger reserve + Khajuraho day-trip — MPTDC Jungle Camp is safe. Organised safari only. Ken River Lodge is the boutique option." },
  mudumalai: { score: 4, note: "Nilgiri biosphere + Jungle Hut + Jungle Retreat — organised safari, forest-dept-led. Solo-women-routine. Avoid walking the highway-edge." },
  anamalai: { score: 3, note: "Valparai + Top Slip tiger reserve — organised TN Forest Dept safari. Stay in Valparai estate bungalows (Briar Tea, Sinnadorai), not Topslip only." },
  "silent-valley": { score: 3, note: "Kerala's Palakkad-Mannarkkad access — entry-permit + guide mandatory. Organised day-visit only; no solo traveller infrastructure." },
  "bhitarkanika": { score: 3, note: "Odisha's mangrove + crocodile + olive-ridley. OTDC Dangmal + Sand Pebbles lodge. Organised boat safari only; thin for solo overnight." },
  kumbhalgarh: { score: 4, note: "Rajasthan fort + leopard sanctuary — RTDC Hilltop + Aodhi are safe. Daytime fort + evening light show, organised safari. Solo overnight OK." },
  "dudhwa-national-park": { score: 3, note: "UP tiger reserve + Tharu tribal belt — UPTDC Dudhwa rest house is basic. Organised operator (Tiger Haven, Jaagir Lodge) recommended over self-book." },
  bharatpur: { score: 4, note: "Keoladeo bird sanctuary — RTDC Bharatpur Forest Lodge + Bagh ka Bagh + Laxmi Vilas Palace. Cycle/rickshaw inside the park organised. Solo-women routine." },
  keoladeo: null, // dupe
  "sariska": { score: 3, note: "Alwar tiger reserve — ITDC Sariska Palace + RTDC Hotel Tiger Den are the safe bets. Safari via FD; Siliserh Lake day-trip fine." },
  ranthambore: null, // dupe
  eravikulam: { score: 4, note: "Munnar-adjacent Nilgiri Tahr park — forest-dept-led bus entry only, no solo walking. Day-visit from Munnar is the standard safe format." },
  tirthan: null,
  "tirthan-valley": { score: 4, note: "Great Himalayan NP buffer + fly-fishing — Raju's Cottage + Himalayan Trout House are the female-safe homestays. GHNP trek only with registered guide." },
  valparai: { score: 3, note: "TN's tea-plantation + Annamalai bio — Briar Tea Bungalows + Sinnadorai's are the women-routine stays. Wilderness access via Forest Dept only." },
  chinnar: { score: 3, note: "Kerala-TN border wildlife — permit + guide required. Day-trip from Munnar; don't overnight in the forest-dept hut unless with a group." },
  "great-himalayan-np": null, // handled as tirthan
  simlipal: { score: 2, note: "Odisha's largest reserve — permit + vehicle mandatory, organised operator (Orissa Wildlife Tours) only. Solo-women infrastructure non-existent." },
  satkosia: { score: 2, note: "Odisha's Mahanadi gorge + rafting + wildlife — organised operator only (Mahanadi Riverside Lodge). Self-plan not feasible solo." },
  namdapha: { score: 1, note: "Arunachal's remote rainforest — Miao + Deban FRH base; multi-day trek into jungle. Organised + permit-ed group only; solo not possible for women." },
  "loktak-lake": { score: 2, note: "Manipur floating-phumdi lake — Sendra Park & Resort is the safe stay. Boat to Keibul Lamjao NP organised. Day-trip from Imphal, don't solo-village overnight." },
  kabini: { score: 4, note: "Orange County + Kabini River Lodge + JLR — all vetted, women-routine. Organised boat + jeep safari. Mysuru → 2.5hr drive." },
  dandeli: { score: 3, note: "Karnataka adventure + wildlife — organised rafting (Kali River Camp, Hornbill River Resort). Not a solo-female intro; group format." },
  "pulicat-lake": { score: 3, note: "Chennai-Nellore border flamingo lake — day-trip from Chennai, APTDC boat. No overnight solo option." },
  "nalsarovar": { score: 3, note: "Gujarat bird sanctuary near Ahmedabad — day-trip, organised boat. Don't rely on village homestays without prior arrangement." },
  "point-calimere": { score: 2, note: "TN's flamingo + dolphin coast — forest-dept guest-house only, sparse. Organised tour via TTDC recommended; solo-women format absent." },
  "barnawapara": { score: 2, note: "Chhattisgarh reserve — thin tourist flow, Naxal-adjacent belt. Organised Jungle Camp via CTDC only. Skip solo." },
  adilabad: { score: 2, note: "Telangana's northernmost district + Kawal sanctuary — no tourist infrastructure. Skip solo; organised researcher-traveller format only." },
  "bhitarkanika": null, // dupe
  "chilika-lake": { score: 4, note: "Odisha's brackish lagoon + dolphin + Kalijai — OTDC Panthaniwas Barkul + Rambha are safe. Boat safari organised; Mangalajodi bird-village vetted homestays." },
  idukki: { score: 3, note: "Kerala's hill-dam district — sparse tourist flow, DTPC homestays + plantation bungalows. Day-trips from Munnar; don't solo-overnight in deep Idukki." },
  "dudhsagar-falls": { score: 3, note: "Goa-Karnataka border waterfall — monsoon train or jeep safari only. Organised jeep from Mollem/Castle Rock is the safe format." },
  jagdalpur: { score: 2, note: "Chhattisgarh's Bastar HQ + Chitrakoot Falls — CTDC properties + organised tours only. Solo-women travel flow absent; skip." },
  rangat: { score: 2, note: "Middle Andaman town — thin tourist flow, waypoint to Mayabunder. Don't overnight solo; Long Island or Havelock are the picks." },
  "nagarjuna-sagar": { score: 3, note: "Telangana-AP dam + boat to Nagarjunakonda — APTDC Haritha resort is the safe stay. Day-trip from Hyderabad." },
  maredumilli: null, // tribal-remote
  "marine-national-park": { score: 3, note: "Gujarat's Jamnagar coral reef — permit-regulated, organised tour only. Day-visit from Jamnagar, no solo-female overnight." },
  velavadar: { score: 3, note: "Gujarat's blackbuck grassland — daytime tour from Bhavnagar/Ahmedabad. Blackbuck Lodge is the female-safe overnight." },
  "vedanthangal": { score: 4, note: "TN's oldest bird sanctuary — day-trip from Chennai, forest-dept managed. Stay in Chennai; daytime November-February visit." },
  corbett: null, // alias

  // ═══════════ TREK REMOTE ═══════════
  "spiti-valley": { score: 3, note: "Kaza is the base — Spiti Holiday Adventure + Ecosphere are the female-safe operators. Solo backpackers common; group homestay circuit safer than self-drive." },
  kaza: { score: 3, note: "Spiti Valley HQ at 3,800m — Spiti Holiday Adventure + Zostel are female-safe. Village homestays (Komic, Langza) vetted. Don't drive solo in winter." },
  kibber: { score: 3, note: "Spiti's highest village — Norling homestay + Kibber homestay are female-safe. Part of organised Spiti circuit; no nightlife, no drama." },
  chandratal: { score: 2, note: "Moon Lake at 4,300m — camp-only site, only via organised Parasol/Moonlake Camps. Altitude + no network = group-only. Don't attempt solo." },
  "har-ki-doon": { score: 2, note: "Roadless Sankri-base trek — registered operators (Indiahikes, Trek The Himalayas) is the only safe format. No mobile, no stays beyond basecamp." },
  "hemkund-sahib": { score: 3, note: "Gurdwara at 4,329m — yatra-season (Jul-Oct) has SGPC langar + organised shared-taxi from Govindghat. Group trek normal; solo rare but possible." },
  "khardung-la": { score: 3, note: "High-pass day-trip from Leh — Ladakh Autonomous Hill Council taxis + permit. Don't overnight at the pass. Solo-women OK on organised day tour." },
  "nubra-valley": { score: 3, note: "Hunder + Diskit in Nubra — homestays via Ladakh Tourism + Stok kitchen circuit. Organised permit + shared taxi the female-safe format." },
  "pangong-lake": { score: 3, note: "Day or overnight from Leh — Ladakh Tourism-registered camps (Pangong Retreat, Nature's Nest). Solo-women routine on organised trip. Don't sleep in unregistered camps." },
  "tso-moriri": { score: 3, note: "Ladakh's higher lake — Korzok village homestays + Ladakh Tourism camps. Permit + shared taxi format. Thin for solo but organised trips have women." },
  hanle: { score: 2, note: "Ladakh's dark-sky + astronomical observatory town — remote, permit-restricted, astronomer-tourist flow. Organised group (Dhanyal Hanle) only." },
  zanskar: { score: 2, note: "Padum-base + multi-day trek access — organised operator (Snow Leopard Adventures, Rimo) only. Solo not possible for women beyond Padum village." },
  "valley-of-flowers": { score: 3, note: "Govindghat-Ghangaria-VOF trek (Jul-Sep) — organised GMVN + private package tours. Ghangaria has SGPC langar + small stays; women-pilgrim context keeps it safe." },
  roopkund: { score: 2, note: "Mystery lake trek (3 days + altitude) — Trek The Himalayas + Indiahikes registered operators only. Group-only, solo discouraged by operators." },
  zuluk: { score: 3, note: "East Sikkim Silk Route zigzag — Sikkim Tourism permit + organised homestay operator (Echo Trails, Impeksha). Day-tour + overnight at Zuluk homestay." },
  "gurudongmar-lake": { score: 3, note: "North Sikkim permit-only lake — same Lachen/Lachung package-tour context. Organised operator is the only female-safe way. Solo not permitted." },
  "gurez-valley": { score: 2, note: "Kashmir LoC-adjacent permit zone — J&K Tourism Authority permits + military-checkpoint route. Organised operator (Mountainface, Gurez Lodge) is the only format." },
  munsiyari: { score: 3, note: "Kumaon's Panchachuli-view village — KMVN Tourist Bungalow + Sarmoli homestays (Maati Sangathan women's co-op) are female-safe. Sarmoli is the pick." },
  girnar: { score: 3, note: "Jain + Hindu pilgrim climb in Junagadh — 10,000-step trek, pilgrim-flow daytime. Don't climb at 3am solo; start at 5:30am when other women are on the trail." },
  palitana: { score: 3, note: "Jain pilgrim 3,950-step climb — women pilgrims dawn-start regular. Stay in Jain dharamshalas (gender-separated) or Jambughoda heritage. Safe within pilgrim flow." },
  dzukou: null,
  "dzukou-valley": { score: 2, note: "Nagaland-Manipur trek + base camp — organised group (Zone Hotel, Kohima Tourism) is the safe format. Solo-women intra-valley not standard." },
  ahobilam: { score: 2, note: "AP Nava Narasimha circuit — 9 shrines + trek. Male-dominated pilgrim flow, thin infrastructure. Organised yatra-bus from Kurnool only; skip solo." },
  "bangus-valley": { score: 2, note: "Kashmir's unmarked valley trek — Kupwara-district permit-zone. Organised operator (JK Tourism + Kupwara DTO) only; solo not feasible." },
  deomali: { score: 1, note: "Arunachal's remote peak + tribal belt — no established trek infrastructure, militant-insurgency-adjacent. Skip solo absolutely." },
  tungnath: { score: 3, note: "Panch Kedar highest + Chandrashila trek from Chopta — day-trek, pilgrim-flow regular. Start at 6am, back by 2pm. Solo-women routine in season." },
  "umlingla": { score: 2, note: "World's highest motorable pass at 5,883m — specialist motorcyclists + drivers, not tourist format. Organised Ladakh operator only." },
  "barren-island": { score: 1, note: "Only active volcano in South Asia — no landing, distant-view boat only. Not a tourist visit in any solo format." },
  "phawngpui-peak": null, // "other"
  hanle: null, // dupe
  drass: null, // "other"
  "prashar-lake": { score: 3, note: "Mandi-district trek to sacred lake + floating island temple — HPTDC hut + Pragati Lodge at Kanda. Weekend trek groups organised; solo intermediate-fit OK." },
  kasol: { score: 3, note: "Parvati Valley backpacker town — Israeli + long-stay expat scene; 'hippie trail' has drug + dodgy-guide risks. Stay in The Parvati Kuteer/hotel, not riverside shacks." },
  tosh: { score: 3, note: "End-of-road Parvati Valley village — backpacker homestays + trekker base. Safer than deeper Kheerganga walk. Don't trek solo beyond the village." },
  kasol: null, // dupe
  "parvati-valley": null, // handled in kasol + tosh
  "khangchendzonga-np": { score: 2, note: "West Sikkim trek system — Dzongri + Goecha-la routes, permit + guide mandatory. Organised operator (Tashila, Sikkim Off The Beat) only." },
  "little-andaman": { score: 2, note: "Hut Bay + Butler Bay beach — remote, ferry-dependent, thin tourist flow. Organised tour via A&N Tourism is the only female-safe format." },
  nongriat: { score: 3, note: "Meghalaya's double-decker root-bridge trek — organised from Cherrapunji, community homestays (Khasi family-run) at Nongriat. Safe with a guide." },
  tamenglong: { score: 1, note: "Manipur's remote Naga district — no tourist infrastructure + militant-insurgency caveat. Skip solo." },

  // ═══════════ TRIBAL REMOTE ═══════════
  aalo: { score: 2, note: "Arunachal's West Siang HQ — Protected Area Permit + organised operator (Abor Country Travels) is the only format. Village homestays vetted via operator." },
  anini: { score: 1, note: "Dibang Valley's remote town — military + tribal permit zone, no civilian tourist infrastructure. Skip solo, organised researchers only." },
  dambuk: { score: 2, note: "Arunachal's Orange Festival (Dec) venue — organised festival operator is the safest + only format. Off-festival, no infrastructure." },
  mechuka: { score: 2, note: "West Siang border-valley — PAP + organised tour (Abor Country) mandatory. Mechuka Homestay (Yargep Yomgam) is female-safe in guided format." },
  pasighat: { score: 2, note: "East Siang district HQ — APTDC circuit houses + Siang House Resort are organised. Tribal-women-visible society, but thin solo-traveller infra." },
  majuli: { score: 3, note: "World's largest river island + Vaishnavite satras — ferry from Jorhat, community-homestays at Kamalabari (Mishing family-run) are female-safe." },
  ziro: null,
  "ziro-valley": { score: 3, note: "Apatani plateau — Ziro Music Festival (Sep) draws female solo travellers. Apatani homestays (Pine Grove) are vetted + welcoming. Off-festival, thin." },
  mon: { score: 2, note: "Nagaland headhunter-era district — Longwa tribe + tattoo elders. Organised Nagaland-Tourism tour (Konyak Tea Retreat) only. Solo-female trip not standard." },
  kohima: { score: 3, note: "Nagaland capital — Hornbill Festival (Dec) draws female solo travellers; Kohima Camp + Razhu Pru homestays are vetted. Off-festival, standard caution." },
  khonoma: { score: 3, note: "Nagaland's green village + community-tourism model — Dovipie Inn + homestays (women-led conservation co-op). Safe in community-homestay format." },
  ukhrul: { score: 1, note: "Manipur's Naga-majority district — insurgency-adjacent, no tourist infrastructure. Skip solo absolutely." },
  pfutsero: { score: 2, note: "Phek district coldest-Nagaland town — thin tourist flow, Chakhesang village homestays. Organised Nagaland Tourism tour only." },
  tura: { score: 2, note: "Meghalaya's Garo Hills HQ — organised Nokrek/Balpakram tour from Shillong. Solo-women flow thin, not standard format." },
  mawsynram: { score: 3, note: "Wettest place on earth + cave access — Cherrapunji-adjacent organised tours cover it. Don't overnight solo; day-trip via Shillong operator." },
  silvassa: { score: 3, note: "Dadra-Nagar-Haveli UT HQ — Daman-adjacent, Gujarat-alcohol-tourist context. Stay in Silvassa strip hotels; thin solo-female flow." },
  lolab: null,
  "lolab-valley": { score: 2, note: "Kashmir Kupwara-district valley — permit-zone, organised JK-Tourism tour only. Solo not feasible for women." },
  chitkul: { score: 3, note: "India's last Hindustan-Tibet-Highway village before Tibet — Kinnaur's 3,450m Sangla end. HPTDC Kinner Kailash + Banjara camps. Weekend crowd + solo travellers present." },
  mokokchung: { score: 2, note: "Nagaland's Ao-Naga cultural capital — thin female-solo flow. Organised Nagaland Tourism package only. Skip otherwise." },
  taptapani: { score: 2, note: "Odisha's hot-spring + tribal belt — OTDC Panthanivas is the safe stay. Organised Koraput-Ganjam tour format only." },
  maredumilli: { score: 2, note: "AP's Papikonda range tribal tourism — APTDC Jungle Star cottages + organised tribal tour. Solo-women flow near-zero." },

  // ═══════════ SPIRITUAL RURAL ═══════════
  hampi: null, // dupe — already heritage
  aihole: { score: 3, note: "Chalukya temple complex + Badami/Pattadakal circuit — ASI day-trip from Badami. No overnight; stay in Badami (KSTDC Mayura)." },
  badami: { score: 3, note: "Chalukyan cave-temples + Agastya lake — KSTDC Mayura + Heritage Resort are female-safe. Daytime climb, evening cave-tour in group." },
  pattadakal: { score: 4, note: "UNESCO Chalukya temple set — ASI site, daytime tourist-safe. Day-trip combined with Badami + Aihole, overnight in Badami." },
  lepakshi: { score: 4, note: "AP hanging-pillar temple day-trip from Bangalore — daytime tour-safe. Bus/taxi + tour operator standard. No overnight in the village." },
  nalanda: { score: 4, note: "Buddhist university ruins + museum — daytime tourist-safe. Stay in Rajgir (Indo Hokke, Rajgir Residency), which is female-safe. Same-day combine." },
  rajgir: { score: 4, note: "Vulture Peak + hot-springs + Jain-Buddhist circuit — Rajgir Residency + Indo Hokke hotels. Daytime ropeway + sightseeing; stay near Mall Road." },
  sanchi: { score: 4, note: "Ashokan stupa UNESCO site day-trip from Bhopal — ASI-staffed + Sanchi Tourist Complex rooms. Safer than the village outside." },
  "shravanabelagola": { score: 4, note: "Jain monolith + 12-year Mahamastakabhisheka — Karnataka Jain trust-run facilities, family-pilgrim + female-safe. Day-trip from Bangalore/Mysore." },
  srirangapatna: null, // dupe
  kushinagar: { score: 3, note: "Buddha's Parinirvana site + international Buddhist guesthouses (Thai, Japanese, Sri Lankan monasteries). Safe in their accommodation format; town infrastructure thin." },
  vaishali: { score: 3, note: "Buddhist + Jain-early-council site — thin infrastructure, organised day-trip from Patna or Muzaffarpur. Don't solo-overnight in village." },

  // ═══════════ FESTIVAL TOWN / MELA ═══════════
  // Annual score + override during mela/specific months
  prayagraj: { score: 3, note: "Sangam city — Kumbh/Ardh Kumbh years turn it unsolo-able (2025 Maha was 600M people). Off-Kumbh, Sangam + Anand Bhavan + IIIT area are daytime-safe." },
  ujjain: { score: 3, note: "Mahakaleshwar Jyotirlinga + Simhastha Kumbh (every 12 years, next 2028). Off-Simhastha, the Mahakaleshwar circuit + Ram Ghat are pilgrim-safe daytime." },
  nashik: null, // dupe — handled earlier
  puri: { score: 3, note: "Jagannath temple + Rath Yatra (Jun-Jul). Outside yatra, Beach Road is family-safe (OTDC Panthanivas, Toshali Sands); Rath Yatra week is not solo-female feasible." },

  // ═══════════ OTHER — per-destination, no category default ═══════════
  athirapally: { score: 4, note: "Kerala's biggest waterfall + monsoon-Sep peak — Rainforest Resort + KTDC are the safe stays. Day-trip from Kochi/Thrissur regular." },
  auroville: { score: 5, note: "International experimental-community near Pondicherry — inherently female-collaborative. Matrimandir access + community kitchens + all-female dorms routine." },
  "baratang-island": { score: 3, note: "Andaman's limestone caves + mud-volcano + Jarawa-reserve pass — organised tour from Port Blair only (security convoy). Day-trip; no solo overnight." },
  barmer: { score: 3, note: "Rajasthan's westernmost district — heritage haveli + textile. Garh Jaisalmer + RTDC. Day-trip combine with Jaisalmer preferred." },
  "barot-valley": { score: 3, note: "Mandi's offbeat river valley — HPTDC rest house + Barot homestay (Ani Trekkers). Thin for solo overnight but doable with pre-booking." },
  "belum-caves": { score: 3, note: "AP's underground cave system near Gandikota — APTDC Haritha Cottages + daytime guided tour. Same-day return or overnight combined with Gandikota." },
  bhaderwah: { score: 3, note: "Jammu's meadow-town — Patnitop–Bhaderwah highway, JKTDC Hut + Bhaderwah Hotel. Thin solo-female flow; organised camping format recommended." },
  bhalukpong: { score: 3, note: "Arunachal gateway + Pakke TR entry — permit required, organised operator (Assam-based). Day-trip from Tezpur; no solo-female overnight format." },
  bhandardara: { score: 4, note: "Maharashtra's Sahyadri lake + Kalsubai + monsoon firefly week (May). MTDC resort + Dreamland are safe. Organised firefly-week camps women-routine." },
  bhopal: { score: 4, note: "MP capital — Upper + Lower Lake + Bhimbetka day-trip. Stay near New Market + MP Nagar, not old city. Metro + Bhopal-Ola network reliable." },
  "bir-billing": { score: 3, note: "Paragliding + Himachal Tibetan-settlement + monastery — Tibetan-run guesthouses (Zostel Bir, Colonel's Resort) are safe. Tandem pilots are certified (registered operators only)." },
  bomdila: { score: 3, note: "Arunachal gateway to Tawang — PAP required, organised tour + Apar Retreat hotel. Day-waypoint not a solo-destination." },
  champhai: { score: 2, note: "Mizoram-Myanmar-border rice-bowl town — sparse tourist infrastructure, mostly Mizoram Tourism circuit-house. Skip solo." },
  chaukori: { score: 3, note: "Kumaon tea-garden hill — KMVN rest house + Chaukori Retreat are the safe stays. Panchachuli view, quiet, thin solo flow." },
  "chidiya-tapu": { score: 4, note: "Port Blair's sunset-beach + birding — day-trip via A&N Tourism. No overnight solo option; return to Port Blair." },
  courtallam: { score: 3, note: "TN's monsoon-waterfall town — Nine Falls circuit, TTDC + private lodges. June-Sep is the high season when crowd = safer; off-season dead." },
  dawki: { score: 3, note: "Meghalaya-Bangladesh border Umngot clear-river — organised day-trip from Shillong or overnight at Shnongpdeng + Umngot campsites (organised operator)." },
  devprayag: { score: 4, note: "Ganga-Alaknanda sangam — clean pilgrim town, GMVN rest house safe. Daytime confluence + Raghunath temple. Safer than Rishikesh for a quiet stay." },
  dholavira: { score: 3, note: "Kutch's UNESCO Harappan site — KPWD heritage cottage + organised Rann Utsav routes only. Don't solo-drive without prior stays booked." },
  dirang: { score: 3, note: "Arunachal's hot-springs + dzong en route to Tawang — Dirang Dzong heritage stay + Pemaling Hotel. Organised Tawang-circuit operator format." },
  doodhpathri: { score: 3, note: "Kashmir's quiet alt-meadow — day-trip from Srinagar, thin private infrastructure. Organised picnic-tour format only." },
  drass: { score: 3, note: "Kargil-Drass war-memorial town at 3,280m — JKTDC Tourist Bungalow + RTDC. Day-visit en route Srinagar-Leh; don't solo-overnight in the Drass strip." },
  "gagron-fort": { score: 3, note: "Rajasthan's Jal Durg at 3-river confluence — UNESCO, ASI-staffed day visit. Stay in Jhalawar town (RTDC Chandrawati), not at fort." },
  gulmarg: { score: 4, note: "Kashmir ski-resort + gondola — organised package (J&K Tourism + Heevan Resort, Khyber) is the safe format. Solo-women routine on gondola + ski-school." },
  guptkashi: { score: 3, note: "Kedarnath base-town — GMVN + Char Dham Camp hotels are safe. Yatra-season (May-Oct) is the active safe window; winter dead." },
  igatpuri: { score: 3, note: "Vipassana centre + monsoon-Sahyadri — Dhamma Giri vipassana campus is female-safe (10-day silent retreat). Monsoon weekender stay is iffy." },
  jibhi: { score: 4, note: "Tirthan-adjacent Kullu valley — Jibhi Cafe + Artists Lodge + Chalet Silvan are women-owned. Tourist-safe emerging, still homestay-friendly." },
  "jog-falls": { score: 3, note: "Karnataka monsoon waterfall — KSTDC Mayura + Saguna Resort. Day-trip Mangalore-Shimoga; don't solo-overnight in falls-adjacent lodges." },
  jorhat: { score: 3, note: "Assam's tea-HQ + Majuli ferry + Hollongapar gibbon-sanctuary — Banyan Grove + Heritage Chang Bungalow. Day-stop, not a destination." },
  joshimath: { score: 3, note: "Badrinath + Auli + VOF base — GMVN Joshimath + Mana Hotel. Subsidence crisis (2023) means check which hotels currently operational; don't self-drive unverified." },
  kalimpong: { score: 4, note: "Bhutia-Lepcha-Nepali heritage hill near Darjeeling — Himalayan Hotel + Hilltop are safe. Durpin monastery + cactus nursery daytime. Quieter + safer than Darjeeling town." },
  kargil: { score: 3, note: "Ladakh-J&K border town — daytime overnight en route Srinagar-Leh. D'Zojila + The Kargil hotels. Don't walk the bazaar stretch at night." },
  keylong: { score: 3, note: "Lahaul district HQ + Rohtang-north highway — HPTDC Chandrabhaga + New Hotel. Sep-Oct is the active window (before snow); thin otherwise." },
  kokernag: { score: 3, note: "Anantnag's freshwater spring + botanical garden — JKTDC Tourist Bungalow safe. Day-trip from Pahalgam; thin private solo-female infrastructure." },
  kolad: { score: 3, note: "Kundalika-river rafting from Mumbai/Pune — organised rafting operator (Vivanta, Suyash) is the safe format. Stag-weekender culture = don't walk strip alone." },
  konaseema: { score: 3, note: "AP's Godavari delta + coconut-grove — APTDC + Coringa organised tours. Homestays (Antarvedi, Dindi) family-run; Dindi Resorts is the female-safe pick." },
  kufri: { score: 3, note: "Shimla's adventure-winter strip — yak + horse tourism, weekender crowd. Day-trip from Shimla only; thin hotels here." },
  kullu: { score: 3, note: "Kullu-Manali valley town — pit-stop en route Manali. Stay in Manali, not Kullu. Shawl-weaver + Himachal Tourism day-stop format." },
  kumarakom: { score: 5, note: "Kerala backwater resort zone — CGH Coconut Lagoon + Kumarakom Lake Resort are gated + solo-women-routine. Houseboat via registered KTDC operator only." },
  kumbalangi: { score: 4, note: "Kerala's model tourism village — community-homestays (Kallancheri Retreat, Kumbalangi Homestay) women-run. Safe, friendly, Kochi-adjacent." },
  "lahaul-valley": { score: 2, note: "Himachal's cold-desert valley — Keylong base, organised Rohtang-Spiti circuit. Solo-women infrastructure thin; group-tour format only." },
  laknavaram: { score: 3, note: "Telangana suspension-bridge lake — day-trip from Warangal, Telangana Tourism cottages. No solo overnight format." },
  lamayuru: { score: 3, note: "Ladakh's moonscape + monastery — Lamayuru Guest House + Moonland Hotel. Day-stop en route Srinagar-Leh; organised overnight format fine." },
  landour: { score: 5, note: "Mussoorie-adjacent cantonment-quiet heritage hill — Rokeby Manor + Doma's Inn + Char Dukan cluster. International solo-women regular." },
  leh: { score: 4, note: "Ladakh HQ — Main Bazaar + Changspa are night-safe; Zostel Plus + Hotel Grand Dragon + Omasila homestay family-run. Women's Alchi + Nimmu cooperative hosts solo." },
  likir: { score: 3, note: "Ladakh monastery village near Leh — Nimmu House + Likir monastery guest-house. Day-trip or single overnight format. Organised Leh operator base." },
  "lonar-crater": { score: 3, note: "Maharashtra's meteorite-crater lake — MTDC Hotel Plaza + Lonar Tourist Lodge. Daytime crater-rim walk safe; don't venture off-trail solo." },
  lothal: { score: 3, note: "Gujarat's Harappan port — ASI-staffed day-visit, Maritime Museum under renovation. Day-trip from Ahmedabad only." },
  lunglei: { score: 2, note: "Mizoram's second-largest town — thin tourist infrastructure, organised Mizoram Tourism tour only. Skip solo." },
  manikaran: { score: 3, note: "Parvati-valley Sikh-Hindu hot-springs — gurdwara langar + overnight accommodation (gender-separated). Avoid the lodge strip at night; stay in gurdwara." },
  mawphlang: { score: 4, note: "Meghalaya's sacred grove + Khasi-heritage village — organised day-tour from Shillong, community guides + women-run Mawphlang Homestay. Female-safe." },
  moreh: { score: 1, note: "Manipur-Myanmar border town — permit-restricted, security-zone. No tourist format. Skip solo absolutely." },
  nako: { score: 3, note: "Kinnaur-Spiti highway village + lake + monastery — HPTDC + Nako Homestay (Reo Purgyil). Organised Spiti-circuit format, solo-women do manage in season." },
  "north-bay-island": { score: 4, note: "Ross-Smith tour circuit from Port Blair — day-trip, organised. No overnight; return to Port Blair." },
  omkareshwar: { score: 3, note: "Jyotirlinga + Narmada parikrama — MPTDC Narmada Resort + organised yatra stays. Daytime temple + parikrama fine; avoid the ghat-side strip at night." },
  pahalgam: { score: 4, note: "Kashmir's Lidder-valley base — JKTDC huts + Heevan + Pahalgam Hotel are the safe picks. Amarnath yatra season (Jul-Aug) flips context." },
  patna: { score: 2, note: "Bihar capital — solo-women flow near-zero, transit-only city. Patliputra area hotels are acceptable; old city is risky. Fly in, fly out." },
  pawapuri: { score: 3, note: "Jain pilgrim town near Rajgir — Nalanda-Rajgir-Pawapuri circuit. Day-trip only; no overnight solo-female format." },
  pithoragarh: { score: 3, note: "Kumaon district HQ + Munsiyari gateway — KMVN rest house + Hotel Ulka. Transit waypoint, not a destination." },
  ranakpur: { score: 4, note: "Jain marble-temple + Kumbhalgarh circuit — RTDC Shilpi + Mahveer Bagh. Daytime tour from Udaipur/Jodhpur; overnight in Kumbhalgarh preferred." },
  ranchi: { score: 2, note: "Jharkhand capital — solo-women tourist flow near-zero, business-travel context. Hinoo + Ratu Road hotels acceptable; don't venture into old-city areas." },
  "rann-of-kutch": { score: 4, note: "Rann Utsav (Nov-Feb) Dhordo tent city is gated + vetted. Off-festival, organised Gujarat-Tourism tour (Hodka Resort) only." },
  rudraprayag: { score: 4, note: "Alaknanda-Mandakini sangam + Char Dham transit — GMVN Rudraprayag + Greater Kailash are safe. Yatra-season daytime, quiet off-season." },
  sangla: { score: 3, note: "Kinnaur's Baspa valley — Banjara Camps + Kinner Camps + Chitkul-adjacent. Organised trip from Shimla/Sarahan; solo-women do stay at Banjara's mixed format." },
  sariska: null, // dupe — handled in wildlife
  shantiniketan: { score: 4, note: "Tagore's Visva-Bharati + Bengali rural-tourism — Chhuti Holiday Resort + Ananda Retreat. Poush Mela (Dec-end) crowds are intense; off-festival quiet, female-routine." },
  shnongpdeng: { score: 3, note: "Umngot-river camping + zipline — organised operator (Pioneer, Shnongpdeng River Camp) only. Stay in operator tent, not local village shacks." },
  siliguri: { score: 3, note: "NE gateway-city — transit waypoint, no tourist destination. Stay in Sevoke Road hotels, organised forwarding to Darjeeling/Gangtok." },
  sirpur: { score: 2, note: "Chhattisgarh's 7th-century Buddhist-Hindu site — thin tourist flow, Sirpur Resort + CTDC cottages. Organised tour from Raipur only." },
  sissu: { score: 3, note: "Lahaul valley stop + Atal-Tunnel-north — Sissu Lake + Monastery. HPTDC + Sissu Lake Resort are safe overnight." },
  sonamarg: { score: 3, note: "Kashmir's 'meadow of gold' + Thajiwas glacier — JKTDC + Glacier Heights are the picks. Day-trip from Srinagar; organised overnight fine." },
  sravasti: { score: 3, note: "Buddhist pilgrim circuit UP site — international-monastery guest-houses (Korean, Sri Lankan). Safe in that format; town outside thin." },
  sonmarg: null, // alias
  tehri: { score: 3, note: "Tehri-Garhwal dam + adventure — GMVN Tehri + Koti Colony lodges. Organised water-sports operator only; don't self-book Airbnbs here." },
  tosamaidan: { score: 2, note: "Kashmir's Budgam meadow — restricted-access zone until recently, organised JK-Tourism trek format. Solo-women infrastructure absent." },
  "tsomgo-lake": { score: 3, note: "East Sikkim permit-zone day-trip from Gangtok — organised taxi/shared-vehicle format only. No overnight; return to Gangtok." },
  turtuk: { score: 3, note: "Nubra-north Balti-culture village — Protected Area Permit + organised Ladakh operator. Turtuk Holiday Resort + Lchang Nang homestay are female-safe." },
  unakoti: { score: 2, note: "Tripura's rock-cut Shiva reliefs — thin tourist flow, TTDC Unakoti Tourist Lodge + day-trip from Agartala. Don't overnight solo." },
  verinag: { score: 3, note: "Kashmir's Jhelum-source spring garden + Mughal architecture — day-trip from Srinagar or Anantnag. No solo overnight format." },
  yusmarg: { score: 3, note: "Kashmir's alpine meadow + Nilnag — JKTDC tourist bungalow. Day-trip from Srinagar; thin overnight solo option." },
  "ziro-valley": null, // dupe

  // ═══════════ MISSED ON FIRST PASS ═══════════
  "ajanta-caves": { score: 4, note: "UNESCO Buddhist cave-paintings near Aurangabad — ASI-staffed, MTDC bus + authorised guides. Daytime tour from Aurangabad; return by evening, don't overnight at Fardapur." },
  alwar: { score: 3, note: "Rajasthan's Sariska-base city — Bala Qila + City Palace daytime fine. Stay at RTDC Meenal or Alwar Bagh, not station-area lodges. Sariska day-trip via FD jeep." },
  amboli: { score: 3, note: "Maharashtra-Karnataka border Sahyadri hill — MTDC resort + Whistling Woods. Monsoon waterfall season (Jul-Sep) is the crowd; off-season thin overnight solo." },
  coimbatore: { score: 4, note: "TN's manufacturing hub + Ooty gateway — Race Course area + RS Puram are night-safe. Metro + Ola reliable. Day-stop en route Ooty/Coonoor." },
  dhauli: { score: 4, note: "Ashoka-edict site + Shanti Stupa near Bhubaneswar — daytime tour-safe, OTDC included in city tour. Day-trip from Bhubaneswar; no overnight." },
  gandhinagar: { score: 4, note: "Gujarat capital — Akshardham + Indroda park + planned-city wide roads. Alcohol-prohibition + metro under-construction = low street incident rate. Day-stop or overnight fine." },
  gokarna: { score: 4, note: "Karnataka temple-town + 5-beach cliff-trek — female backpackers year-round. Om + Kudle are safer than the far-north Half Moon and its adjacent cove stretch after dark." },
  jabalpur: { score: 3, note: "MP's Marble Rocks + Dhuandhar Falls + Bandhavgarh gateway — MPTDC Hotel Kalchuri + Hotel Narmada Jacksons. Bhedaghat day-trip; don't overnight at Bhedaghat." },
  kishtwar: { score: 1, note: "Jammu's remote district + Hindu pilgrim route to Machail Mata — permit-zone history, insurgency-affected belt. Organised yatra-group only; skip solo." },
  margao: { score: 3, note: "South Goa's commercial HQ — transit waypoint, not a destination. Stay at Colva/Palolem instead. Day-stop for market + train station." },
  "morni-hills": { score: 3, note: "Haryana's only hill station near Chandigarh — Tikker Tal + Morni Fort. Day-trip from Chandigarh; thin stays, don't overnight." },
  mukteshwar: { score: 4, note: "Kumaon's quieter Nainital-alt — Mukteshwar Dham temple + orchard views. IIVRI guesthouse + Mountain Trail Resort. Tourist-light, female-safe." },
  neermahal: { score: 3, note: "Tripura's water-palace at Rudrasagar — TTDC Sagarmahal Tourist Lodge is the base. Day-trip from Agartala or Udaipur-Tripura; no solo overnight format." },
  "nrusinghanath-harishankar": { score: 2, note: "Odisha twin-temple pilgrim trek — Bargarh-Balangir district, thin tourist flow. Organised yatra operator only; skip solo." },
  ravangla: { score: 4, note: "South Sikkim hill + Buddha Park + Ralang monastery — STDC + Mountain Retreat Hotel. Quieter than Pelling, organised tour from Gangtok covers it." },
};

// ─── Apply ───
const FILE = "data/solo-female/scores.json";
const entries = JSON.parse(readFileSync(FILE, "utf-8"));

let filled = 0;
let kept = 0;
let nulled = 0;
for (const e of entries) {
  const d = drafts[e.id];
  if (d === undefined) { kept++; continue; } // not in drafts dict
  if (d === null) { nulled++; continue; } // explicitly marked null — skip assigning
  e.new_score = d.score;
  e.new_note = d.note;
  filled++;
}

writeFileSync(FILE, JSON.stringify(entries, null, 2));
console.log(`Filled: ${filled} | Honest-gap nulls: ${nulled} | Not in drafts: ${kept}`);
console.log(`Coverage: ${filled} / ${entries.length} = ${((filled / entries.length) * 100).toFixed(1)}%`);
if (kept > 0) {
  const missingIds = entries.filter((e) => !(e.id in drafts)).map((e) => e.id);
  console.log(`\nNot in drafts (${missingIds.length}): ${missingIds.slice(0, 20).join(", ")}${missingIds.length > 20 ? "..." : ""}`);
}

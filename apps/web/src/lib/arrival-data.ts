/**
 * Arrival playbook — one record per major Indian international-gateway airport.
 * Content is research-backed (airport operator sites + embassy advisories +
 * tourism-board pages). Prices are 2026 approximations; verify at the counter.
 */

export type ArrivalInfo = {
  iata: string;
  name: string;
  city: string;
  state: string;
  slug: string;
  officialUrl: string;
  arrivalHall: string;
  prepaidTaxi: string;
  appCab: string;
  publicTransport: string;
  simCounters: string;
  atmNotes: string;
  scamWarning: string;
  afterMidnight: string;
};

export const ARRIVAL: Record<string, ArrivalInfo> = {
  del: {
    iata: "DEL",
    name: "Indira Gandhi International Airport",
    city: "Delhi",
    state: "Delhi",
    slug: "del",
    officialUrl: "https://www.newdelhiairport.in/",
    arrivalHall:
      "Terminal 3 handles all international arrivals. Exit the customs hall, follow signs to the forecourt. Domestic arrivals at T1 and T2 are connected to T3 by the inter-terminal shuttle (free, every 20 minutes).",
    prepaidTaxi:
      "Delhi Traffic Police runs a prepaid taxi kiosk immediately outside the arrivals exit — it is the official one, it is open 24×7, and the rate sheet is printed on the wall. Typical fare to Connaught Place / Paharganj is ₹600–700; to South Delhi (Hauz Khas, Saket) ₹800–1,000. Insist on the printed receipt.",
    appCab:
      "Uber and Ola have dedicated pickup zones on the forecourt at Gate 4 and Gate 5. Expect ₹500–800 to Central Delhi (UberGo / Ola Mini), ₹1,200+ for Uber Premier. Surge pricing is normal between 22:00 and 02:00 when flights cluster.",
    publicTransport:
      "Airport Express Metro line runs T3 to New Delhi Railway Station in 20 minutes, ₹60 flat fare. Runs 04:45–23:30. The station is underneath the terminal, well-signed.",
    simCounters:
      "Airtel, Jio, and Vi counters are in the arrivals hall near baggage claim. A passport + arrival stamp is enough for a tourist SIM (no Indian address required). Activation takes 30 minutes to 2 hours. Cost ~₹500 for a visitor SIM with 2GB/day.",
    atmNotes:
      "SBI, HDFC, and Axis ATMs are on the forecourt. All accept Visa/Mastercard international cards. Withdrawal cap is ₹10,000–20,000 per transaction. SBI is the cheapest for international fee.",
    scamWarning:
      "The oldest Delhi arrival scam: a stranger in the arrivals hall or car park says your hotel 'has burned down' / 'is overbooked' and offers to call the owner, who then confirms. Never let a stranger make calls on your behalf. Use your own phone, or the prepaid counter.",
    afterMidnight:
      "Prepaid counter runs 24×7. Airport Express metro shuts at 23:30 and restarts at 04:45 — if your flight lands between those hours and you want the metro, wait in the airside lounges or the 24-hour Costa Coffee on the departures level.",
  },
  bom: {
    iata: "BOM",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    state: "Maharashtra",
    slug: "bom",
    officialUrl: "https://csmia.adaniairports.com/",
    arrivalHall:
      "Terminal 2 handles all international arrivals (and some domestic). Terminal 1 is domestic-only; if you have a connecting flight, allow at least 90 minutes for the inter-terminal shuttle (free).",
    prepaidTaxi:
      "Prepaid taxi counters are on the kerbside outside the arrivals exit (both the Cool Cab / government-approved black-and-yellow counters). Typical fare to South Mumbai (Colaba / Churchgate) is ₹700–900, to Bandra ₹400–500.",
    appCab:
      "Uber, Ola, and Rapido pickup zones are on the forecourt, signed clearly. Expect ₹600–900 to South Mumbai (UberGo), ₹1,200+ for Premier. During monsoon (June–September) waiting times can stretch to 20+ minutes.",
    publicTransport:
      "Mumbai Metro Line 3 is the best public option — the Sahar Road metro station is a 5-minute walk from T2 (use the skywalk). Runs to BKC and eventually Colaba by 2027. The Mumbai suburban rail is not directly airport-linked — the nearest station is Vile Parle, requiring an auto-rickshaw.",
    simCounters:
      "Airtel and Jio booths in the arrivals hall. Same passport + arrival stamp process. Jio is generally the fastest activation in Mumbai (under 1 hour).",
    atmNotes:
      "HDFC and ICICI ATMs on the forecourt. Some international-card-friendly kiosks are inside the arrivals hall before immigration; domestic ATMs are outside on the kerb.",
    scamWarning:
      "The fake pre-paid taxi desk: touts will approach you with 'prepaid taxi' lanyards and walk you to a non-government car. The real counters are attached to the terminal wall with signage and a printed rate card — if it looks like a folding table, it is not official.",
    afterMidnight:
      "Prepaid counters and app cabs run all night. The Metro does not — it shuts at 23:00. For late arrivals, the prepaid black-and-yellow is slightly cheaper than Uber / Ola.",
  },
  blr: {
    iata: "BLR",
    name: "Kempegowda International Airport",
    city: "Bangalore",
    state: "Karnataka",
    slug: "blr",
    officialUrl: "https://www.bengaluruairport.com/",
    arrivalHall:
      "Terminal 2 handles most international arrivals (and some domestic full-service airlines). Terminal 1 is primarily domestic low-cost. Free inter-terminal shuttle runs every 10 minutes.",
    prepaidTaxi:
      "Meru and KSTDC counters on the forecourt at both terminals. Typical fare to Central Bangalore (MG Road / Koramangala) is ₹1,200–1,600 — the airport is 35km from the city, which is why the fare is higher than most Indian airports. Printed receipt is mandatory.",
    appCab:
      "Uber and Ola have forecourt pickup zones. Fares run ₹900–1,400 to Central Bangalore (UberGo / Ola Mini); Premier is ₹1,800+. Rapido bikes are allowed but impractical given the distance and your luggage.",
    publicTransport:
      "BMTC Vayu Vajra airport buses run to major Bangalore hubs (Majestic, Electronic City, Whitefield). Flat fares ₹200–300. Buses every 30 minutes, signed clearly outside the terminal.",
    simCounters:
      "Airtel and Jio. Activation tends to be fast in Bangalore (under an hour). Rail Yatra and Reliance have occasional kiosks too.",
    atmNotes:
      "ATMs inside the terminal and on the forecourt. HDFC and Canara Bank outlets.",
    scamWarning:
      "Airport-adjacent hotel touts around Devanahalli sometimes offer 'free taxi' to an unnamed hotel — treat as a scam. The airport is a long way from Bangalore city (35km); do not accept any 'free ride' offer without a confirmed hotel booking.",
    afterMidnight:
      "Vayu Vajra buses run 24×7 to Majestic and select hubs. App cabs operate through the night. No Bangalore metro connection yet (BMRCL Purple Line extension to the airport is under construction, opening 2026–2027).",
  },
  maa: {
    iata: "MAA",
    name: "Chennai International Airport",
    city: "Chennai",
    state: "Tamil Nadu",
    slug: "maa",
    officialUrl: "https://www.aai.aero/en/airports/chennai",
    arrivalHall:
      "Terminal 4 (new international terminal, opened 2023) handles most international arrivals. Terminal 2 handles older international and some domestic. Check your boarding pass for the correct exit.",
    prepaidTaxi:
      "Prepaid taxi counters are immediately outside the arrivals exit. Fare to T Nagar / Egmore / Central Railway Station is ₹500–650; to Marina Beach area ₹600–700. Chennai is notable for honest prepaid counters.",
    appCab:
      "Uber, Ola, and Savaari have pickup zones on the forecourt. Fares run ₹450–600 to Central Chennai. Auto-rickshaws are also abundant and metered, which is unusual for a major Indian airport.",
    publicTransport:
      "Chennai Metro connects the airport to the city — Airport metro station is linked to the terminals by an elevated walkway. Runs 05:00–23:00, ₹10–70 fare to central stations. Suburban rail stop at Tirusulam is a 10-minute walk from T4.",
    simCounters:
      "Airtel and BSNL. Chennai is traditionally BSNL-strong — if you are heading to rural Tamil Nadu, a BSNL SIM is worth considering.",
    atmNotes:
      "State Bank of India and Indian Bank ATMs are plentiful. Several accept international cards without fuss.",
    scamWarning:
      "Taxi-driver route-padding is the most common Chennai complaint — insist on the prepaid receipt and refuse any request to 'stop at one more place on the way'. The prepaid receipt includes the address and a fixed fare.",
    afterMidnight:
      "Prepaid and app cabs run 24×7. Metro and suburban rail shut at 23:00 and restart at 05:00. The airport 24-hour food court is on the first floor of T4.",
  },
  ccu: {
    iata: "CCU",
    name: "Netaji Subhas Chandra Bose International Airport",
    city: "Kolkata",
    state: "West Bengal",
    slug: "ccu",
    officialUrl: "https://www.aai.aero/en/airports/kolkata",
    arrivalHall:
      "Kolkata has a single integrated terminal (T2) for both international and domestic. International arrivals exit through a separate gate on the ground floor; domestic arrivals are one level above.",
    prepaidTaxi:
      "Two prepaid counters — the yellow-cab (no-ac, classic Ambassador) and the AC-cab. Yellow-cab to central Kolkata (Park Street / New Market) is ₹350–450; AC-cab is ₹600–750. Yellow cabs are a Kolkata institution but increasingly hard to find in good condition.",
    appCab:
      "Uber and Ola have forecourt pickup zones. Fares ₹500–700 to Park Street. Rapido bikes are available but also impractical with luggage.",
    publicTransport:
      "Kolkata Metro Yellow Line (Noapara–New Garia) does not currently reach the airport — the airport metro station is under construction (expected late 2026). For now, the Chingrighata station is the nearest, a 20-minute auto-ride away. Use app cabs or prepaid taxis instead.",
    simCounters:
      "Airtel, Jio, Vi all have booths. Activation in Kolkata can take 2–4 hours on a busy arrival.",
    atmNotes:
      "SBI and Axis ATMs on the forecourt. The airport itself has several inside the terminal; expect a queue during peak arrival hours.",
    scamWarning:
      "Kolkata taxi-drivers are generally honest but route-padding can happen with foreigners — use the printed prepaid receipt as your reference. If the driver wants to take a 'shortcut' that would involve crossing a river or the Hooghly twice, decline.",
    afterMidnight:
      "Prepaid and app cabs operate through the night. No metro connection yet. Night fare surcharge on yellow cabs is 25% (printed on the prepaid rate card).",
  },
  hyd: {
    iata: "HYD",
    name: "Rajiv Gandhi International Airport",
    city: "Hyderabad",
    state: "Telangana",
    slug: "hyd",
    officialUrl: "https://www.hyderabad.aero/",
    arrivalHall:
      "Single integrated terminal, handling both international and domestic. International arrivals exit on the left; domestic on the right. Signage is bilingual (Telugu + English) and clear.",
    prepaidTaxi:
      "Meru and Mega Cabs run prepaid counters on the forecourt. Fare to Central Hyderabad (Banjara Hills / Secunderabad) is ₹700–900; to HITEC City ₹1,100–1,400 (the airport is 25km from HITEC). Mega Cabs has English-speaking drivers by default.",
    appCab:
      "Uber and Ola have forecourt pickup zones. Fares ₹650–950 to Banjara Hills. Rapido is allowed.",
    publicTransport:
      "Pushpak airport liner buses run 24×7 to Mahatma Gandhi Bus Station (MGBS), Jubilee Bus Station (JBS), and HITEC City. Fares ₹150–250. Hyderabad Metro does not directly connect to the airport.",
    simCounters:
      "Airtel, Jio, BSNL. Activation reliable in Hyderabad, usually under 2 hours.",
    atmNotes:
      "SBI, HDFC, ICICI on the forecourt. All accept international cards.",
    scamWarning:
      "Fake 'hotel touts' offering cheap accommodation are the most frequent hassle. Hyderabad airport police are active and responsive — if someone is persistent, ask for a police officer.",
    afterMidnight:
      "Pushpak buses and app cabs run 24×7. Prepaid counters close briefly 02:00–04:00 at some times of year — app cabs are the safer late-night bet.",
  },
  cok: {
    iata: "COK",
    name: "Cochin International Airport",
    city: "Kochi",
    state: "Kerala",
    slug: "cok",
    officialUrl: "https://www.cial.aero/",
    arrivalHall:
      "Terminal 3 handles all international arrivals. Terminal 1 is domestic. The two terminals are 1km apart; free shuttle runs every 20 minutes.",
    prepaidTaxi:
      "KSRTC (Kerala State Road Transport) prepaid counter is the most trustworthy — it is a government operator. Fare to Ernakulam/Fort Kochi is ₹800–1,100; to Aluva railway station ₹300–400.",
    appCab:
      "Uber and Ola have pickup zones on the forecourt. Fares ₹750–1,000 to Ernakulam. Outside monsoon season, Rapido bikes are a fast option for solo travellers with light luggage.",
    publicTransport:
      "KSRTC airport-bus routes run to Ernakulam, Fort Kochi, and major Kerala destinations (Munnar, Alleppey) — departures multiple times per day. The Kochi Metro does not reach the airport; the nearest station is Aluva (8km).",
    simCounters:
      "Airtel, Jio, BSNL. BSNL is strongest in rural Kerala, which matters if you are heading to Munnar or the backwaters.",
    atmNotes:
      "SBI, Federal Bank (a Kerala bank, high reliability for international cards), and ICICI.",
    scamWarning:
      "Houseboat / homestay 'touts' in the arrivals hall offering aggressively cheap Alleppey packages. Kerala tourism is well-regulated — book via verified operators (Kerala Tourism site, or reputable aggregators) rather than a stranger in the terminal.",
    afterMidnight:
      "KSRTC prepaid and app cabs run 24×7. Airport liner buses to Ernakulam run through the night at 90-minute intervals.",
  },
  goi: {
    iata: "GOI",
    name: "Dabolim Airport (Goa Mopa airport is MOA, not GOI)",
    city: "Goa (South)",
    state: "Goa",
    slug: "goi",
    officialUrl: "https://www.goaairport.com/",
    arrivalHall:
      "Dabolim is the older Goa airport, near Vasco da Gama in South Goa. Note that GOI and MOA (Mopa, North Goa, opened 2023) are two different airports 60km apart — check which one your flight uses.",
    prepaidTaxi:
      "Goa Tourism Development Corporation (GTDC) runs prepaid counters. Fare from Dabolim (GOI) to South Goa beaches (Colva, Palolem) ₹1,500–2,500; to North Goa (Anjuna, Calangute) ₹1,800–2,800 — the North Goa trip is long because Dabolim is south of the Zuari river.",
    appCab:
      "Uber and Ola exist but coverage in Goa is patchy — the state has historically restricted app-based taxis to protect the local taxi union. Many drivers will refuse app bookings. GoaMiles is the state-sanctioned app and more reliable.",
    publicTransport:
      "Local Kadamba buses run from Dabolim to Panjim, Madgaon, and Vasco. Suburban rail (Madgaon station) is a 20-minute drive.",
    simCounters:
      "Airtel, Jio, BSNL. Jio generally strongest on the Goa coast.",
    atmNotes:
      "Multiple in the arrivals hall. State Bank of India and HDFC.",
    scamWarning:
      "The Goa taxi mafia is a real thing — some drivers refuse to use the prepaid receipt after you have left the airport and demand renegotiation. Keep your receipt, pay only what it says, and walk away from anyone who becomes aggressive.",
    afterMidnight:
      "Dabolim has limited late-night flights; most arrivals are daytime. Prepaid counters close 22:00–05:00 on slow nights. GoaMiles and Uber run 24×7 but drivers are scarce between 01:00 and 05:00.",
  },
  amd: {
    iata: "AMD",
    name: "Sardar Vallabhbhai Patel International Airport",
    city: "Ahmedabad",
    state: "Gujarat",
    slug: "amd",
    officialUrl: "https://www.aai.aero/en/airports/ahmedabad",
    arrivalHall:
      "Terminal 2 handles all international arrivals. Terminal 1 is domestic. The two are adjacent but not connected airside; allow 30 minutes for an inter-terminal transfer with baggage.",
    prepaidTaxi:
      "Prepaid taxi counter on the forecourt. Fare to central Ahmedabad (Ashram Road, CG Road) ₹350–450; to Gandhinagar ₹700–900. Ahmedabad is a compact city — most rides are short.",
    appCab:
      "Uber and Ola pickup zones. Fares ₹300–450 to central Ahmedabad. Auto-rickshaws are also widely available and metered.",
    publicTransport:
      "Ahmedabad BRTS does not directly connect to the airport. Ahmedabad Metro Phase 2 is extending to the airport (opening late 2026). For now, a prepaid taxi to Sabarmati BRTS or Kalupur Railway Station is the most efficient public link.",
    simCounters:
      "Airtel and Jio. Activation reliable.",
    atmNotes:
      "SBI, HDFC, ICICI. All reliable for international cards.",
    scamWarning:
      "Ahmedabad is relatively low on airport scams — the main thing to watch for is the prepaid counter being bypassed by touts who claim the counter is closed. The counter is open 24×7; walk to it directly.",
    afterMidnight:
      "Prepaid and app cabs run 24×7. Very few flights land between 02:00 and 05:00 so the terminal can feel empty at those hours.",
  },
};

export const IATA_SLUGS = Object.keys(ARRIVAL);

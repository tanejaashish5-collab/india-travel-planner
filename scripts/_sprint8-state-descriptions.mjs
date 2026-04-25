#!/usr/bin/env node
/**
 * Sprint 8 — Phase A: state descriptions.
 * Hand-curated, citation-first, voice-aligned (sentence case, no
 * influencer words, inline numerics, real verifiable facts only).
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const STATES = {
  "himachal-pradesh": "Mountain state along the western Himalayas with two distinct halves — the well-trodden tourist trail (Shimla, Manali, Dharamshala) and the deeper ranges of Spiti, Lahaul and Kinnaur that stay quiet because the roads are harder. Dharamshala holds the Tibetan government in exile; Chitkul is the last village before the China border; the Parvati Valley draws climbers and trekkers; Kinnaur's apple orchards run alongside the Sutlej. Best months vary sharply by altitude — summer for the high passes, winter for the lower hill stations. 34 destinations across the state.",

  "uttarakhand": "Two distinct halves — the Garhwal pilgrimage corridor (Kedarnath, Badrinath, Yamunotri, Gangotri, Hemkund Sahib) and the quieter Kumaon hills (Almora, Munsiyari, Lansdowne, Kanatal). Auli holds India's only meaningful ski season; Rishikesh is the rafting capital; Nainital and Mussoorie carry the Raj-era hill-station legacy; Jim Corbett is the country's oldest tiger reserve. Char Dham yatra runs April–November; the upper passes are walk-in only. 38 destinations across the state.",

  "jammu-kashmir": "The valley west of Ladakh — meadows, alpine lakes, Mughal gardens, and villages that the package-tour circuit skips. Srinagar's Dal Lake and Mughal-era gardens anchor the standard trip; Gulmarg is one of Asia's better ski destinations; Pahalgam is the Amarnath yatra base; Sonamarg, Yusmarg and Bangus Valley offer quieter alpine grazing meadows. Gurez and Kishtwar reopen each summer once the passes clear. Inner Line Permits required for some border zones. 17 destinations across the state.",

  "ladakh": "Cold-desert union territory at 3,000–5,500 m, where Buddhist monasteries sit on cliffs above the Indus and roads close half the year. Leh is the standard arrival point; Pangong and Tso Moriri are the tourist-trail high lakes; Nubra reaches up to Khardung La and Turtuk; Zanskar opens by July and ices over by October; Umlingla is the world's highest motorable road. Permits required for most of the region. AMS is a real risk above 3,500 m — acclimatise two days in Leh before going higher. 14 destinations across the state.",

  "rajasthan": "India's largest state by area — desert forts, lake palaces, and bazaar cities. Each district carries its own colour: Jaipur is pink, Jodhpur is blue, Udaipur is white-marble. Pushkar, Ajmer and Mount Abu are the pilgrimage anchors; Ranthambore and Sariska are the tiger reserves; Jaisalmer's living fort is one of the few still inhabited. Bundi, Chittorgarh, Kumbhalgarh and Deeg sit outside the standard Golden Triangle but reward the detour. October–March is the only sensible window. 23 destinations across the state.",

  "punjab": "The grain-bowl state along the Pakistan border. Amritsar's Golden Temple is among the country's most-visited religious sites — the langar feeds tens of thousands daily; Anandpur Sahib hosts Hola Mohalla every March; Patiala carries the Phulkian dynasty's palace and silver-jubilee gates; Takht Sri Damdama Sahib is one of the five Takhts of Sikhism. The Wagah border ceremony is a 30-minute drive west of Amritsar. 4 destinations across the state.",

  "delhi": "The capital — a city of 17 million stitched from seven historical settlements. Mughal Old Delhi (Jama Masjid, Chandni Chowk, Red Fort) sits 5 km north of imperial Lutyens (Rashtrapati Bhavan, India Gate, Connaught Place); Mehrauli holds the Qutub Minar and 90+ pre-Mughal monuments; Hauz Khas and Lodi Gardens are the green-space anchors. India's busiest international airport (T3) and the gateway to most northern itineraries. October–March only — the rest is heat or smog.",

  "uttar-pradesh": "India's most populous state and its spiritual spine. The Taj Mahal anchors Agra; Varanasi's ghats draw the Ganga circuit; Mathura-Vrindavan is the Krishna heartland; Sarnath holds Buddha's first sermon; Ayodhya and Prayagraj host the Kumbh Melas; Lucknow keeps the Awadhi kitchen and Nawabi monuments. Dudhwa is the under-visited tiger reserve along the Nepal border; Fatehpur Sikri is Akbar's three-year capital. 13 destinations across the state.",

  "chandigarh": "India's first planned city, designed by Le Corbusier in 1953 — a numbered-sector grid, the Capitol Complex (UNESCO 2016), Nek Chand's Rock Garden, and Sukhna Lake. The administrative capital of both Punjab and Haryana. A common one-night stop on the Delhi → Himachal route; the airport handles flights to Leh, Srinagar and Amritsar. The Kalka–Shimla narrow-gauge railway (UNESCO) starts an hour northeast.",

  "haryana": "The plains state wrapped around Delhi's south, west and north. Kurukshetra is the Mahabharata battlefield where the Bhagavad Gita was delivered; Sultanpur National Park hosts ~250 bird species across November–March; Pinjore Gardens is the Mughal-era stepped garden 22 km north of Chandigarh; Morni is the only meaningful hill station, ~1,200 m. Mostly a transit state, but the National Capital Region's expressways make day trips practical. 3 destinations across the state.",

  "madhya-pradesh": "The geographic heart of India and its tiger-reserve powerhouse. Kanha, Bandhavgarh, Pench and Satpura account for much of the country's tiger sightings; Khajuraho's Chandela temples (UNESCO) carry the most famous sculpture in the subcontinent; Sanchi and Bhimbetka (UNESCO) span Buddhist and Mesolithic art; Orchha is the unrestored Bundela capital; Mandu and Maheshwar sit on the Narmada. Pachmarhi is the only meaningful hill station in central India. 13 destinations across the state.",

  "sikkim": "The smallest fully Himalayan state and India's first to certify all its farming as organic. Kanchenjunga views from Pelling and Yuksom; Gurudongmar Lake at 5,200 m in the north; Lachung and Lachen are the staging villages for Yumthang Valley and Tso Lhamo; Zuluk is the silk-route loop-road village. Inner Line Permits required for north Sikkim and Nathu La. The state passed a near-complete plastic ban; tap water is potable in most towns. 11 destinations across the state.",

  "west-bengal": "The eastern gateway — Kolkata's colonial heritage, the Sundarbans tiger-mangroves, and the Darjeeling–Kalimpong hill belt. Darjeeling's toy train (UNESCO) and Tiger Hill sunrise; Kalimpong's Buddhist monasteries and old-British schools; Shantiniketan is Tagore's open-air university; the Sundarbans hold the world's only mangrove tigers. Kolkata's Durga Puja was inscribed by UNESCO as Intangible Cultural Heritage in 2021. The state borders Bhutan, Nepal and Bangladesh. 6 destinations across the state.",

  "arunachal-pradesh": "India's eastern-most state — the largest in the Northeast and the least densely populated. Tawang holds the country's largest Buddhist monastery (~400 years old); Bomdila and Dirang sit on the gateway road; Mechuka and Dambuk reopen each post-monsoon; Namdapha National Park spans four climate zones from sub-tropical to alpine; Ziro Valley hosts the Apatani tribe and an annual music festival. Inner Line Permit (ILP) required for all visitors, including Indians. 11 destinations across the state.",

  "assam": "The Northeast's largest economy and cultural anchor — tea gardens, Brahmaputra-river ecology, and the gateway to the rest of the region. Kaziranga (UNESCO) holds two-thirds of the world's one-horned rhinos; Manas is the second tiger reserve, also UNESCO; Majuli is the world's largest river island and the seat of Vaishnavite monastic culture; Sivasagar holds the Ahom-dynasty palaces; Jorhat is the tea capital. Charaideo's Maidam burials joined the UNESCO list in 2024. 8 destinations across the state.",

  "meghalaya": "The wettest state in India — Mawsynram and Cherrapunji (Sohra) trade the world-rainfall record annually. Living root bridges grown by the Khasi over 100+ years (Nongriat); the Garo, Khasi and Jaintia tribes are matrilineal; Mawlynnong is signed as Asia's cleanest village; Shnongpdeng's Umngot River runs glass-clear in the dry season; Dawki is the Bangladesh border crossing. The plateau averages 1,500 m. October–April is the dry window; monsoon turns the falls spectacular but the trails dangerous. 9 destinations across the state.",

  "nagaland": "Sixteen Naga tribes, each with its own dialect and dress. Kohima's WWII Cemetery memorialises the 1944 battle that turned back Japan's advance into India; Khonoma is signed as Asia's first green village; Mon is the Konyak (former headhunter) heartland; Dzukou Valley's seasonal wildflowers run May–July; Pfutsero is the highest district headquarters. The Hornbill Festival (Kisama, December 1–10) is the country's largest tribal gathering. ILP required. 6 destinations across the state.",

  "manipur": "The \"jewelled land\" between Nagaland and Myanmar. Loktak Lake holds the only floating national park (Keibul Lamjao) and the endangered Sangai deer; Kangla Fort is the former Meitei royal seat; Ima Keithel is Asia's only all-women market — about 4,000 women across centuries-old stalls; Moreh is the Indo-Myanmar border crossing; Ukhrul's Shirui lily blooms only May–June. ILP required for non-residents. 5 destinations across the state.",

  "mizoram": "Hill state along the Myanmar and Bangladesh borders — bamboo forests, blue ridges, and one of India's most literate states. Aizawl sits along a 1,100 m ridge; Phawngpui (Blue Mountain, 2,157 m) is the highest peak; Champhai is the wine valley; Lunglei is the second city. Mizo society is matrilineal in property succession. Cheraw bamboo-dance is ubiquitous at festivals. ILP required for non-residents. 4 destinations across the state.",

  "tripura": "The third-smallest state, bordering Bangladesh on three sides. Neermahal is a lake palace on Rudrasagar — one of two such palaces in India; Unakoti's rock-cut Shaiva sculptures (~7th century, ~10 m tall) are inscribed for UNESCO consideration; Ujjayanta Palace anchors Agartala. The state has the country's second-highest Bengali-speaking population after West Bengal. 3 destinations across the state.",

  "bihar": "The Buddhist pilgrimage core. Bodh Gaya holds the Mahabodhi Temple (UNESCO) where the Buddha attained enlightenment; Nalanda's ruined university (5th–12th century, UNESCO) was among the world's first residential universities; Rajgir's Vulture's Peak is where the Buddha gave the Heart Sutra; Vaishali is regarded as the world's first republic; Pawapuri is Mahavira's parinirvana site. The Pind Daan rituals at Gaya draw lakhs every Pitru Paksha. 6 destinations across the state.",

  "jharkhand": "Carved out of southern Bihar in 2000 — tribal heartland (32 listed scheduled tribes) with waterfalls, plateaus, and Jain pilgrimage sites. Shikharji (Parasnath Hill) is the most sacred Jain pilgrimage in India — 20 of 24 Tirthankaras attained moksha here; Deoghar's Baidyanath Dham is one of 12 Jyotirlingas; Netarhat is the \"Queen of Chotanagpur\" hill station; Hundru and Dassam Falls run heaviest July–October. Saraikela carries the Chhau dance form. 4 destinations across the state.",

  "chhattisgarh": "India's rice bowl and tribal heartland — central state cleaved from Madhya Pradesh in 2000. Chitrakote Falls is the country's widest waterfall; Bastar's Dussehra runs 75 days, the longest in the world; Sirpur holds the 7th-century Lakshmana brick temple; Barnawapara is a tiger reserve. The Madia, Muria, Halba and Gond tribes hold long-standing forest claims. Maoist-affected pockets restrict free travel — check advisories. 3 destinations across the state.",

  "gujarat": "The salt-and-sea state — Asia's last Asiatic-lion habitat (Gir, ~700 individuals), the world's largest salt desert (Rann of Kutch), and Portuguese-era Diu on the southern tip. Dwarka is the Krishna pilgrimage anchor; Somnath is one of 12 Jyotirlingas; Champaner-Pavagadh, Rani-ki-Vav (Patan) and the Ahmedabad Walled City carry three UNESCO inscriptions; the Statue of Unity at Kevadia is the world's tallest at 182 m. The Rann Utsav (November–February) is the staging festival; Navratri is celebrated nightly across nine days. 29 destinations across the state.",

  "maharashtra": "India's largest state economy and its widest cultural span. Mumbai handles the country's busiest port and the Bombay High Court; the Ajanta and Ellora rock-cut caves (UNESCO) are the high-water mark of Indian sculpture; Aurangabad's Bibi-ka-Maqbara is the \"mini-Taj\"; Lonavala–Khandala is the standard monsoon hill station; Mahabaleshwar and Matheran sit deeper in the Sahyadris; the Konkan coast (Ganpatipule, Tarkarli, Alibaug, Kashid) holds the cleanest beaches in mainland India. The Western Ghats UNESCO inscription includes 39 sites, most in Maharashtra. Shirdi and Shani Shingnapur are the headline pilgrimage circuits. 35 destinations across the state.",

  "goa": "India's smallest state — about 105 km of coastline, four centuries of Portuguese rule, and a year-round festival calendar that ranges from Catholic feasts to Hindu rath yatras. Old Goa (UNESCO) holds the Basilica of Bom Jesus and the relics of St. Francis Xavier; the southern beaches (Agonda, Palolem, Patnem) stay quieter than the package-tour north (Calangute, Baga, Anjuna); Dudhsagar Falls runs spectacular June–September; the Chorao and Divar river islands are accessible only by ferry. Susegad — Goa's word for unhurried ease — is the prevailing temperament. October–March is peak; monsoon halves prices. 18 destinations across the state.",

  "karnataka": "The Western Ghats spine, the Deccan plateau, and 320 km of Konkan coast — the south's most varied state. Hampi's Vijayanagara ruins (UNESCO) sprawl across granite boulders; Pattadakal, Aihole and Badami carry the Chalukya temple architecture; Belur and Halebidu hold the Hoysala stone work; Mysore's Dasara is the country's oldest continuously celebrated royal festival; Coorg (Kodagu) is India's coffee belt; Gokarna remains the alternative to Goa for a quieter beach week. Bengaluru is the country's tech capital. The Western Ghats sections in Kudremukh, Bandipur and Nagarhole are tiger and elephant strongholds. 30 destinations across the state.",

  "kerala": "Backwaters, Western Ghats, and 580 km of Arabian Sea coast. Alleppey and Kuttanad's houseboat backwaters sit below sea level — the only Indian region farming below 0 m; Munnar's tea estates climb to 2,400 m; Wayanad and Periyar are the wildlife reserves; Fort Kochi keeps the Dutch, Portuguese and British colonial layers visible; Kannur and Bekal hold the cleanest northern beaches; Kumarakom is the lake-bird sanctuary on Vembanad. Theyyam ritual performance runs October–May. The state has India's highest literacy and longest life expectancy. 30 destinations across the state.",

  "tamil-nadu": "The southern temple state — Dravidian temple architecture at its densest. The Brihadeeswarar (Thanjavur), Gangaikonda Cholisvara and Airavateswara temples are inscribed as the Great Living Chola Temples (UNESCO); Mahabalipuram's shore temples are 7th-century Pallava; Madurai's Meenakshi temple has 14 gopurams; Ooty, Coonoor and Kodaikanal are the original British hill stations; Chettinad keeps the tamarind-and-pepper kitchen; Hogenakkal is the falls and coracle ride; Rameswaram and Kanyakumari are the southern pilgrimage tips. 29 destinations across the state.",

  "andaman-nicobar": "A 572-island chain in the Bay of Bengal — closer to Myanmar than mainland India. Port Blair (Sri Vijaya Puram) holds the Cellular Jail where the British exiled freedom fighters; Havelock (Swaraj Dweep) and Neil (Shaheed Dweep) carry the country's best-rated beaches and the live coral around Radhanagar; Baratang has limestone caves and active mud volcanoes; Diglipur in the north reaches the highest peak (Saddle, 732 m); North Bay and Ross are day-trip islands. The Nicobar group is restricted to non-residents. PADI dive infrastructure runs Havelock and Neil October–May. 12 destinations across the islands.",

  "lakshadweep": "The country's smallest union territory — 36 atolls in the Arabian Sea, of which only 10 are inhabited. Bangaram, Agatti and Kadmat are the only islands open to non-resident Indian tourists; foreign visitors need an additional permit; the indigenous population is over 95% Muslim. Lagoons average 1–3 m, water clarity routinely exceeds 30 m, and the marine biodiversity is the densest along the Indian coast. Reachable only by Agatti's airstrip or by ship from Kochi. 5 destinations across the islands.",

  "puducherry": "The former French settlement on the Tamil coast — now a 4-district union territory (the Tamil-coast town, Karaikal, plus Mahé in Kerala and Yanam in Andhra). The White Town keeps mustard-yellow colonial walls, French-named streets and the Sri Aurobindo Ashram; Auroville (10 km north) is Mirra Alfassa's universal township and the Matrimandir's gold-disc dome; Karaikal sits 130 km south. Tamil-French signage is standard; the local Tamil dialect is largely unchanged from the 18th century. 3 destinations across the territory.",

  "daman-diu": "The Portuguese-coast union territory (since 2020 merged as Dadra & Nagar Haveli and Daman & Diu). Silvassa was the Portuguese capital of Dadra and Nagar Haveli; Daman holds the Moti Daman fort (16th-century Portuguese) and Devka beach; Diu is the island fortress at the southern tip of Saurashtra, with Nagoa beach and the Diu Fort still complete. Portuguese rule (1535–1961) makes the architecture and Catholic-feast calendar distinct from the surrounding Gujarat–Maharashtra region. 3 destinations across the territory.",
};

let updated = 0;
let skipped = 0;
const errors = [];
for (const [id, description] of Object.entries(STATES)) {
  const { error } = await supabase
    .from("states")
    .update({ description })
    .eq("id", id);
  if (error) {
    errors.push({ id, error: error.message });
    continue;
  }
  console.log(`  ✓ ${id.padEnd(22)} ${String(description.length).padStart(4)} ch`);
  updated++;
}

console.log(`\n  updated: ${updated} · skipped: ${skipped} · errors: ${errors.length}`);
if (errors.length) console.log(errors);

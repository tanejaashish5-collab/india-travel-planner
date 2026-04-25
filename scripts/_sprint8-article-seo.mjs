#!/usr/bin/env node
/**
 * Sprint 8 — Phase B: article SEO meta.
 * Sentence case, no years, no influencer words. Title 50-60 chars,
 * description 130-160 chars, lead with destination + value angle.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const META = {
  "varanasi-ghat-food-guide": {
    seo_title: "Varanasi ghat food: what to eat, where, what to skip",
    seo_description: "Blue Lassi, Kachori Gali, Banarasi paan — the ghat-by-ghat eating route through Varanasi, with honest food-safety warnings and the lanes worth queuing for.",
  },
  "rafting-rishikesh-guide": {
    seo_title: "White-water rafting in Rishikesh: grades, prices, operators",
    seo_description: "Three Ganga stretches compared by grade — Brahmapuri, Shivpuri, Kaudiyala. Real costs, best months, and the safety details most operators skip telling you.",
  },
  "skiing-auli-gulmarg-guide": {
    seo_title: "Skiing in India: Auli vs Gulmarg, an honest comparison",
    seo_description: "Auli vs Gulmarg compared on slopes, costs, skill level and gondola access. The verdict on India's only two ski destinations that actually deliver a season.",
  },
  "desert-safari-jaisalmer-guide": {
    seo_title: "Jaisalmer desert safari: the scam-proof Thar guide",
    seo_description: "Three safari types compared, the common scams flagged, real prices, the best months, and how to pick a Jaisalmer operator that doesn't cut corners.",
  },
  "amritsar-street-food-trail": {
    seo_title: "Amritsar street food trail: a scored guide to every lane",
    seo_description: "Kesar da Dhaba dal makhani, Bharawan kulchas, Ahuja lassi, Surjit fish fry — the full Amritsar food walk, with prices and what to skip and why.",
  },
  "delhi-street-food-walk": {
    seo_title: "Delhi street food walk: Chandni Chowk to Connaught Place",
    seo_description: "A 6 km walk through Paranthe Wali Gali, Karim's, Old Famous Jalebi Wala and Bengali Sweet House — with prices, queue tips, and which dishes earn the wait.",
  },
  "lucknow-kebab-circuit": {
    seo_title: "Lucknow kebab circuit: where Nawabi cuisine still lives",
    seo_description: "Tunday galouti, Wahid biryani, Raheem nihari — the Awadhi food circuit through Lucknow's old city, with prices, opening hours, and honest verdicts.",
  },
  "dest-chitkul": {
    seo_title: "Chitkul guide: the last village before the China border",
    seo_description: "India's last inhabited village on the Indo-Tibet border at 3,450 m — when to go, how to reach it, what the checkpoint means, and what to expect on arrival.",
  },
  "paragliding-bir-billing-guide": {
    seo_title: "Paragliding in Bir Billing: the complete guide",
    seo_description: "Tandem vs solo, the best months, real prices, the operators worth booking through, and the takeoff window. India's paragliding capital, audited end to end.",
  },
  "kayaking-meghalaya-guide": {
    seo_title: "Kayaking in Meghalaya: crystal rivers and root bridges",
    seo_description: "Dawki's transparent Umngot, Umiam Lake, and the photo-vs-reality gap — when the rivers are kayakable, what it costs, and what monsoon does to plans.",
  },
  "pk-rajasthan-trail": {
    seo_title: "PK Rajasthan trail: Mandawa havelis to Jaisalmer fort",
    seo_description: "PK filming locations across Shekhawati, Jaisalmer and Delhi — every stop scored, with what you'll find at each beyond the frame the camera held.",
  },
  "tamasha-shimla-trail": {
    seo_title: "Tamasha and Shimla: the Bollywood hill-station effect",
    seo_description: "Tamasha's Shimla against the real city — when to go, what the film got right, and the quieter hill stations 12 km away that nobody visits.",
  },
  "bungee-rishikesh-guide": {
    seo_title: "Bungee jumping in Rishikesh: the honest guide",
    seo_description: "83 m at Jumping Heights — safety record, real wait times, costs, and an honest call on who should walk away from the platform before stepping off.",
  },
  "solo-women-safe-destinations-india": {
    seo_title: "Where solo women actually feel safe: 15 audited destinations",
    seo_description: "Fifteen destinations scored 5/5 for solo women — based on infrastructure, hospital access, 4G coverage and police-station proximity. Not opinions, data.",
  },
  "viral-honeymoon-scored": {
    seo_title: "Why your honeymoon plan is wrong: the real romantic getaways",
    seo_description: "Shimla and Manali dominate honeymoon search. Score 142 destinations on couple-suitability, seasonal timing and hiddenness — a different roster emerges.",
  },
  "3-idiots-ladakh-trail": {
    seo_title: "3 Idiots Ladakh trail: every film location scored",
    seo_description: "Pangong Lake, Druk White Lotus School, Magnetic Hill — every 3 Idiots location across Ladakh, scored against what you actually find on arrival.",
  },
  "yjhd-trail": {
    seo_title: "YJHD trail: Manali, Gulmarg and Udaipur scored",
    seo_description: "Yeh Jawaani Hai Deewani filming locations — Manali treks, Gulmarg snow, Udaipur weddings — what the film showed against on-the-ground reality.",
  },
  "highway-rajasthan-trail": {
    seo_title: "Highway film trail: Delhi to Rajasthan, scored segment by segment",
    seo_description: "Imtiaz Ali's Highway tracked across Delhi, Jaipur, Pushkar, Jodhpur and Jaisalmer — every segment scored, with what each stop is and is not worth.",
  },
  "mountaineering-uttarakhand": {
    seo_title: "Mountaineering in Uttarakhand: peaks ranked by difficulty",
    seo_description: "From Chandrashila (beginner) to Kamet (expedition) — Uttarakhand peaks, costs, IMF permits, and an honest read on what each climb demands.",
  },
  "rock-climbing-india": {
    seo_title: "Rock climbing in north India: where the walls are",
    seo_description: "Manali boulders, Rishikesh riverside, Dhauj near Delhi — graded routes, the climbing seasons, and where to find partners off the gym wall.",
  },
  "caving-meghalaya": {
    seo_title: "Caving in Meghalaya: India's underground frontier",
    seo_description: "From Mawsmai's tourist cave to Krem Liat Prah's 34 km — difficulty grades, gear, the dry-season window, and why monsoon caving turns deadly.",
  },
  "zipline-india": {
    seo_title: "Zip-lining in north India: where, how high, is it worth it",
    seo_description: "Neemrana fort, Rishikesh river, Manali, Dhanaulti — heights, lengths, costs compared, and which are worth the photo and which are not.",
  },
  "best-time-to-visit-sikkim": {
    seo_title: "Best time to visit Sikkim: month by month",
    seo_description: "Sikkim every month — 5/5 in spring (rhododendrons) and autumn (Kanchenjunga views), 1/5 in monsoon. Permits, road status, festival dates included.",
  },
  "best-time-to-visit-assam": {
    seo_title: "Best time to visit Assam: month by month",
    seo_description: "Assam every month — 5/5 in winter (Kaziranga, Majuli, tea), 1/5 in monsoon (floods). Park opening dates and the Bihu festival calendar.",
  },
  "best-time-to-visit-arunachal": {
    seo_title: "Best time to visit Arunachal Pradesh: month by month",
    seo_description: "Arunachal every month — 5/5 in autumn and spring, 1/5 in monsoon. Sela Pass closures, ILP timing, and which valleys reopen when.",
  },
  "best-time-to-visit-nagaland": {
    seo_title: "Best time to visit Nagaland: month by month",
    seo_description: "Nagaland every month — 5/5 in November–December (Hornbill Festival). Dzukou Valley flower-bloom timing and what monsoon does to the trails.",
  },
  "best-time-to-visit-punjab": {
    seo_title: "Best time to visit Punjab: month by month",
    seo_description: "Punjab every month — 5/5 in autumn and spring, 1/5 in summer heat. Hola Mohalla, Baisakhi, and Golden Temple weather windows mapped.",
  },
  "best-time-to-visit-bihar": {
    seo_title: "Best time to visit Bihar: month by month",
    seo_description: "Bihar every month — 5/5 October–February for the Buddhist Circuit (Bodh Gaya, Nalanda, Rajgir). What summer and monsoon do to pilgrimage plans.",
  },
  "dest-sangla": {
    seo_title: "Sangla Valley guide: apple orchards, Kamru Fort, Kinnauri culture",
    seo_description: "Sangla Valley at 2,680 m — when to go, the Bhairon temple, Kinner Kailash views, and what the orchards look like through each season.",
  },
  "dest-nako": {
    seo_title: "Nako guide: turquoise lake and 11th-century murals",
    seo_description: "Nako at 3,662 m on the Spiti circuit — the sacred lake, the Padmasambhava monastery, and how altitude acclimatisation works on the way up.",
  },
  "dest-kalpa": {
    seo_title: "Kalpa guide: Kinner Kailash views and Roghi cliff village",
    seo_description: "Kalpa at 2,960 m — when Kinner Kailash sits clearest, the Roghi suicide-point cliffs, the Hindustan-Tibet road history, and apple-harvest season.",
  },
  "dest-tungnath": {
    seo_title: "Tungnath guide: trekking the highest Shiva temple",
    seo_description: "Tungnath at 3,680 m and Chandrashila summit at 4,000 m — the trail, when it stays open, the December snow line, and what the priest will tell you.",
  },
  "dest-chopta": {
    seo_title: "Chopta guide: Tungnath base and rhododendron meadows",
    seo_description: "Chopta at 2,680 m — the base for Tungnath–Chandrashila, the rhododendron season, and what camping looks like across winter and summer.",
  },
  "dest-munsiyari": {
    seo_title: "Munsiyari guide: Panchachuli views and Milam Glacier base",
    seo_description: "Munsiyari at 2,298 m in Pithoragarh — the five Panchachuli peaks, Johar tribal heritage, and the long Milam Glacier trek out and back.",
  },
  "manali-december-score-4-surprised-us": {
    seo_title: "Why we scored Manali in December a 4/5",
    seo_description: "We scored 142 destinations across every month. Manali in December was supposed to be the cautionary tale. It earned a 4/5. The exact reasoning, opened up.",
  },
  "viral-skip-shimla-manali": {
    seo_title: "Skip Shimla and Manali: what locals actually recommend",
    seo_description: "Shimla and Manali score 1/5 on hiddenness. Barot, Munsiyari and Tirthan score 5/5 on experience in the same months. The locals already knew.",
  },
  "every-himachal-destination-scored-october": {
    seo_title: "Every Himachal destination scored for October",
    seo_description: "All 31 Himachal destinations rated for October — 25 earned 5/5. The single one we'd send you to first is not the one search engines guess.",
  },
  "tourist-trap-index-india-overrated-destinations": {
    seo_title: "The tourist-trap index: India's overrated destinations",
    seo_description: "For every overrated destination, NakshIQ names a specific alternative and explains why it's better. Pangong, Manali, Kasol, Dharamshala — and beyond.",
  },
  "viral-kashmir-vs-rajasthan": {
    seo_title: "Kashmir vs Rajasthan in December: the data says you're wrong",
    seo_description: "Indians default to \"snow in Kashmir\" or \"forts in Rajasthan\" every December. Both run through the NakshIQ scoring engine. The result reshapes the call.",
  },
  "10-most-dangerous-roads-india-worth-driving": {
    seo_title: "10 dangerous roads in India worth driving anyway",
    seo_description: "Ten Indian routes that score \"extreme\" or \"hard\" on our reach-difficulty scale — Umlingla, Zanskar, Pangong, Kishtwar — and why each is worth it.",
  },
  "viral-infrastructure-report-card": {
    seo_title: "The infrastructure report card: India's remotest destinations",
    seo_description: "Pangong has no phone signal. Zanskar's nearest real hospital is 230 km away. Roopkund stays offline 8 days straight. The remoteness audit, opened up.",
  },
  "viral-budget-stays-under-2000": {
    seo_title: "Under Rs 2,000 a night: 20 stays that don't compromise",
    seo_description: "Budget stays catalogued across 142 destinations. These 20 — all under Rs 2,000 — earned the listing because each adds a story a chain hotel never will.",
  },
  "dharamshala-tibetan-food-trail": {
    seo_title: "The Dharamshala–McLeod Ganj Tibetan food trail",
    seo_description: "McLeod Ganj's Tibetan kitchens — Tibet Kitchen momos, butter tea, thukpa houses — the eating route through India's Little Lhasa, with prices.",
  },
  "rajasthani-thali-trail": {
    seo_title: "Rajasthani thali trail: dal baati to laal maas, by region",
    seo_description: "Rajasthani cuisine by region — Jaipur dal baati, Jodhpur mirchi bada, Jaisalmer desert kitchen — and where the real laal maas still lives.",
  },
};

let updated = 0;
const errors = [];
const tooLong = [];
for (const [id, m] of Object.entries(META)) {
  if (m.seo_title.length > 65) tooLong.push({ id, type: "title", len: m.seo_title.length });
  if (m.seo_description.length > 165) tooLong.push({ id, type: "desc", len: m.seo_description.length });
  const { error } = await supabase
    .from("articles")
    .update({ seo_title: m.seo_title, seo_description: m.seo_description })
    .eq("id", id);
  if (error) { errors.push({ id, error: error.message }); continue; }
  console.log(`  ✓ ${id.padEnd(50)} t=${String(m.seo_title.length).padStart(2)} d=${String(m.seo_description.length).padStart(3)}`);
  updated++;
}
console.log(`\n  updated: ${updated} · errors: ${errors.length}`);
if (errors.length) console.log(errors);
if (tooLong.length) console.log("over budget:", tooLong);

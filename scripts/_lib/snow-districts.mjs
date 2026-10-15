/**
 * snow-districts.mjs — the IMD district each snow watch point falls in, so an
 * IMD bulletin only counts as agreeing when it names THAT district.
 *
 * Why (review 2026-10-16): a state-level verdict let IMD Shimla's Lahaul-only
 * snow line stand as "IMD agrees" for Shimla, Kufri and Dalhousie. Points on a
 * district boundary (Rohtang: Kullu/Lahaul; Zoji La: Ganderbal/Kargil) list both.
 * District names are the ones IMD's bulletins print; aliases cover their spellings.
 */
export const DISTRICT_ALIASES = {
  "lahaul-spiti": ["Lahaul", "Lahul", "Spiti"],
  kullu: ["Kullu"], shimla: ["Shimla"], kinnaur: ["Kinnaur"], chamba: ["Chamba"], kangra: ["Kangra"],
  mandi: ["Mandi"], solan: ["Solan"],
  chamoli: ["Chamoli"], rudraprayag: ["Rudraprayag"], uttarkashi: ["Uttarkashi"], pithoragarh: ["Pithoragarh"],
  bageshwar: ["Bageshwar"], almora: ["Almora"], nainital: ["Nainital"], dehradun: ["Dehradun"], tehri: ["Tehri"],
  mangan: ["Mangan", "North Sikkim"], gangtok: ["Gangtok", "East Sikkim"], pakyong: ["Pakyong"], namchi: ["Namchi", "South Sikkim"],
  gyalshing: ["Gyalshing", "Geyzing", "West Sikkim"],
  ganderbal: ["Ganderbal"], baramulla: ["Baramulla"], budgam: ["Budgam"], bandipora: ["Bandipora"], kupwara: ["Kupwara"],
  anantnag: ["Anantnag"], shopian: ["Shopian"], poonch: ["Poonch"], kishtwar: ["Kishtwar"], udhampur: ["Udhampur"], ramban: ["Ramban"],
  leh: ["Leh"], kargil: ["Kargil"],
  tawang: ["Tawang"], "west-kameng": ["West Kameng"], "dibang-valley": ["Dibang"], "shi-yomi": ["Shi Yomi", "Shi-Yomi"],
};

export const POINT_DISTRICTS = {
  // Himachal Pradesh
  sissu: ["lahaul-spiti"], keylong: ["lahaul-spiti"], "lahaul-valley": ["lahaul-spiti"], chandratal: ["lahaul-spiti"],
  kaza: ["lahaul-spiti"], "spiti-valley": ["lahaul-spiti"], "kunzum-pass": ["lahaul-spiti"], "baralacha-la": ["lahaul-spiti"],
  "shinku-la": ["lahaul-spiti"], "rohtang-pass": ["kullu", "lahaul-spiti"], manali: ["kullu"], "parvati-valley": ["kullu"],
  shimla: ["shimla"], kufri: ["shimla"], sarahan: ["shimla"], chail: ["solan"], kasauli: ["solan"],
  kalpa: ["kinnaur"], kinnaur: ["kinnaur"], sangla: ["kinnaur"], chitkul: ["kinnaur"], nako: ["kinnaur"],
  dalhousie: ["chamba"], "sach-pass": ["chamba"], mcleodganj: ["kangra"], "barot-valley": ["mandi"], "prashar-lake": ["mandi"],
  // Uttarakhand
  badrinath: ["chamoli"], "hemkund-sahib": ["chamoli"], "valley-of-flowers": ["chamoli"], auli: ["chamoli"], joshimath: ["chamoli"],
  kedarnath: ["rudraprayag"], tungnath: ["rudraprayag"], chopta: ["rudraprayag", "chamoli"],
  gangotri: ["uttarkashi"], yamunotri: ["uttarkashi"], "har-ki-doon": ["uttarkashi"],
  munsiyari: ["pithoragarh"], chaukori: ["pithoragarh"], kausani: ["bageshwar"], binsar: ["almora"], ranikhet: ["almora"],
  mukteshwar: ["nainital"], nainital: ["nainital"], mussoorie: ["dehradun"], landour: ["dehradun"], chakrata: ["dehradun"],
  dhanaulti: ["tehri"], kanatal: ["tehri"],
  // Sikkim
  lachen: ["mangan"], lachung: ["mangan"], "yumthang-valley": ["mangan"], "gurudongmar-lake": ["mangan"],
  "tsomgo-lake": ["gangtok"], "nathu-la": ["gangtok"], zuluk: ["pakyong"], ravangla: ["namchi"], pelling: ["gyalshing"],
  // Jammu & Kashmir
  gulmarg: ["baramulla"], tosamaidan: ["budgam"], doodhpathri: ["budgam"], yusmarg: ["budgam"], sonamarg: ["ganderbal"],
  "zoji-la": ["ganderbal", "kargil"], "gurez-valley": ["bandipora"], "razdan-pass": ["bandipora"], "lolab-valley": ["kupwara"],
  "bangus-valley": ["kupwara"], pahalgam: ["anantnag"], kokernag: ["anantnag"], verinag: ["anantnag"],
  "sinthan-top": ["kishtwar", "anantnag"], "peer-ki-gali": ["shopian", "poonch"], patnitop: ["udhampur", "ramban"],
  // Ladakh
  leh: ["leh"], "khardung-la": ["leh"], "nubra-valley": ["leh"], turtuk: ["leh"], "pangong-lake": ["leh"], "chang-la": ["leh"],
  "tso-moriri": ["leh"], hanle: ["leh"], umlingla: ["leh"], likir: ["leh"], alchi: ["leh"], "taglang-la": ["leh"],
  kargil: ["kargil"], drass: ["kargil"], zanskar: ["kargil"], lamayuru: ["leh"], "fotu-la": ["leh", "kargil"],
  // Arunachal Pradesh
  tawang: ["tawang"], "sela-pass": ["tawang", "west-kameng"], bomdila: ["west-kameng"], anini: ["dibang-valley"], mechuka: ["shi-yomi"],
  // West Bengal (no IMD centre bulletin wired): darjeeling
};

export function districtNamesFor(pointId) {
  return (POINT_DISTRICTS[pointId] ?? []).flatMap((d) => DISTRICT_ALIASES[d] ?? []);
}

/**
 * Whole-word place match for verify, skipping road and district compounds:
 * "Leh" must not match "Manali–Leh" or "Manali - Leh", "Kaza" not "Manali-Kaza road",
 * "Spiti" not "Lahaul-Spiti" (review 2026-10-16: each would have confirmed a
 * forecast from snow that fell somewhere else).
 */
export function namesPlace(text, word) {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Skip the place as the SECOND half of a compound ("Manali–Leh", "Lahaul-Spiti"), and as
  // the first half only of a named road ("Leh-Manali road", "Keylong-Sarchu highway").
  // "Lahaul-Spiti admin…" or "Gulmarg—Affarwat" still name the first place (second review pass).
  const re = new RegExp(`(?<![A-Za-z])(?<![-–—]\\s*)${esc}(?![A-Za-z])(?!\\s*[-–—]\\s*[A-Za-z][A-Za-z ]{0,25}\\b(road|highway|NH|route|axis|stretch)\\b)`, "i");
  return re.test(text);
}

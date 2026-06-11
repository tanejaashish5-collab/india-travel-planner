// scripts/_lib/festival-footage-rules.mjs
//
// SINGLE SOURCE OF TRUTH for festival → footage-family classification.
// Used by:
//   - scripts/_festival-footage-plan.mjs        (coverage report + worklist)
//   - scripts/_gen-festival-footage-map.mjs     (emits the web slug→family map)
//
// A footage "family" is a visual archetype that ONE authentic, free-licensed
// clip can legitimately represent for every festival in it (e.g. one real Holi
// clip serves all Holi-named festivals). Buckets:
//   SPECIFIC — famous, visually-unique event; own named clip.
//   FAMILY   — name-family; one real family clip serves all.
//   SUBTYPE  — name-family hides a visually-distinct subtype → specific or image,
//              NEVER the generic family clip.
//   NONE     — obscure/regional; no authentic free footage → image fallback.
//
// Ordered: first match wins. SUBTYPE guards precede the generic family they'd
// otherwise hit, so a regional variant never inherits the wrong generic clip.

export const RULES = [
  // ---- SUBTYPE guards (must precede the generic family) ----
  { rx: /bastar.*dussehra|dussehra.*bastar/i, bucket: "SUBTYPE", family: "dussehra-tribal-bastar", note: "Tribal Dussehra (rath/anga deo), NOT Ravana-effigy. Specific or image." },
  { rx: /\bkullu\b.*dussehra|dussehra.*\bkullu\b/i, bucket: "SUBTYPE", family: "dussehra-kullu", note: "Deity-palanquin procession in the maidan, NOT effigy. Specific or image." },
  { rx: /mysor|mysur|dasara|dasar/i, bucket: "SUBTYPE", family: "dasara-mysore", note: "Caparisoned-elephant Jamboo Savari. Needs Mysore-specific clip." },
  { rx: /bonalu/i, bucket: "SUBTYPE", family: "bonalu", note: "Telangana pot-on-head + potharaju. Specific or image." },
  { rx: /bathukamma/i, bucket: "SUBTYPE", family: "bathukamma", note: "Flower-stack + women circle. Specific or image." },
  { rx: /theyyam/i, bucket: "SUBTYPE", family: "theyyam", note: "Kerala ritual costume/fire. Specific or image." },
  { rx: /hornbill/i, bucket: "SUBTYPE", family: "hornbill", note: "Naga morungs/log-drums. Needs Hornbill-specific clip." },
  { rx: /pooram|thrissur/i, bucket: "SUBTYPE", family: "thrissur-pooram", note: "Elephant line + parasols + percussion. Specific." },

  // ---- SPECIFIC famous, visually-unique events ----
  { rx: /pushkar.*(camel|fair|mela)|camel (fair|festival)|bikaner.*camel/i, bucket: "SPECIFIC", family: "camel-fair", note: "Camels + desert fairground." },
  { rx: /\bkumbh\b|ardh kumbh|simhastha|magh mela|\bsnan\b|shahi snan/i, bucket: "SPECIFIC", family: "kumbh-snan", note: "River mass-bathing ghats." },
  { rx: /goa carnival|carnival.*goa/i, bucket: "SPECIFIC", family: "goa-carnival", note: "Float parade, King Momo." },
  { rx: /\bbihu\b/i, bucket: "SPECIFIC", family: "bihu", note: "Assam dance, dhol, gamosa." },
  // \bcham\b is bounded so it never matches "Chamba"/"Champa"/"Champaner"/"panchami".
  { rx: /hemis|\bcham\b|losar|saga.?dawa|gompa|monaster|tawang.*fest|\btabo\b|spituk|\bmatho\b|dosmoche|gustor|mahakala.*dance/i, bucket: "SPECIFIC", family: "monastery-cham", note: "Masked Cham dance, monastery courtyard. (Wikimedia CC-BY-SA — needs credit.)" },
  { rx: /\bonam\b|vallam.?kali|aranmula.*boat|nehru trophy|boat race|snake boat/i, bucket: "SPECIFIC", family: "onam-boatrace", note: "Snake-boat race / pookalam." },
  { rx: /rath ?yatra|chariot|jagannath/i, bucket: "SPECIFIC", family: "rath-yatra", note: "Giant chariots + crowds (Puri)." },
  { rx: /\bchhath\b/i, bucket: "SPECIFIC", family: "chhath", note: "Riverbank sunrise offerings." },
  { rx: /durga puja|durgotsav|durga|navratr|navaratri|garba|dandiya/i, bucket: "SPECIFIC", family: "durga-navratri", note: "Pandals/idols OR garba circle." },
  { rx: /ganesh|ganpati|vinayaka chaturthi/i, bucket: "SPECIFIC", family: "ganesh", note: "Ganesh idol + visarjan." },
  { rx: /jaipur lit|literature|literary|lit fest/i, bucket: "SPECIFIC", family: "litfest", note: "Tented sessions/crowd. Generic conference if none." },

  // ---- FAMILY: one authentic clip serves the whole name-family ----
  // \bdol\b/\brang\b bounded so they never match "idol"/"orange"/"kaziranga"/"lokrang".
  // "hola mohalla" dropped — it's a Nihang martial display, not colour-throwing.
  { rx: /\bholi\b|braj.*holi|lathmar|phag|\bdol\b|\brang\b|shigmo/i, bucket: "FAMILY", family: "holi", note: "Colour powder + crowds." },
  { rx: /diwali|deepaval|deepawal|dev diwali|deepotsav|lantern|kartik deep/i, bucket: "FAMILY", family: "diwali", note: "Diyas / lamps at night." },
  { rx: /pongal|makar sankrant|sankranti|bhogi|uttarayan|magh bihu|lohri|maghi/i, bucket: "FAMILY", family: "harvest-sankranti", note: "Harvest / bonfire / kite." },
  { rx: /\bbaisakhi\b|vaisakhi|vishu|poila|ugadi|gudi padwa|puthandu|bestu varas/i, bucket: "FAMILY", family: "newyear-harvest", note: "Regional new-year." },
  { rx: /\beid\b|\burs\b|ramadan|ramzan|muharram|bakrid/i, bucket: "FAMILY", family: "islamic", note: "Mosque/dargah, no figures-of-worship close-ups." },
  { rx: /christmas|bonderam|bastille/i, bucket: "FAMILY", family: "colonial-christian", note: "Lights / church / parade." },
  { rx: /shivaratri|shivratri|mahashivratri/i, bucket: "FAMILY", family: "shivaratri", note: "Temple-aarti night (no idol close-up)." },
  { rx: /tulip|flower (show|festival|fest)|bloom|garden festival|rose (show|festival)/i, bucket: "FAMILY", family: "flower-bloom", note: "Flower fields/beds." },
  { rx: /tarnetar|teej|gangaur|gauri|hariyali/i, bucket: "FAMILY", family: "folk-women", note: "Folk dress/swings/fairs. Verify before mapping." },
];

export function classifyFootage(name, desc = "") {
  for (const r of RULES) {
    if (r.rx.test(name) || (desc && r.rx.test(desc))) return r;
  }
  return { bucket: "NONE", family: "obscure", note: "No obvious authentic free footage — image fallback." };
}

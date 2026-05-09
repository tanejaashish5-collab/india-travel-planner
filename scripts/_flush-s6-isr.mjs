// S6 ISR flush — touched dests × {en, hi}
const BASE = "https://www.nakshiq.com";

const dests = [
  // UK gem sweep (23)
  "almora", "badrinath", "bhimtal", "binsar", "chakrata", "champawat",
  "chaukori", "chopta", "corbett-national-park", "dhanaulti", "gopeshwar",
  "guptkashi", "haridwar", "joshimath", "kanatal", "kausani", "landour",
  "mukteshwar", "munsiyari", "pithoragarh", "ranikhet", "tehri", "uttarkashi",
  // HP gem sweep (14)
  "bir-billing", "chail", "dalhousie", "jibhi", "kasauli", "keylong",
  "kullu", "lahaul-valley", "mandi", "mcleodganj", "palampur",
  "parvati-valley", "sissu", "solan",
  // Pondy + DD (6)
  "auroville", "karaikal", "puducherry", "daman", "diu", "silvassa",
];

const locales = ["en", "hi"];
const paths = dests.flatMap((slug) =>
  locales.map((loc) => `/${loc}/destination/${slug}`)
);

console.log(`◇ flushing ${paths.length} paths (${dests.length} dests × 2 locales)`);

let ok = 0, fail = 0;
for (let i = 0; i < paths.length; i += 6) {
  const batch = paths.slice(i, i + 6);
  const results = await Promise.all(
    batch.map(async (p) => {
      try {
        const res = await fetch(
          `${BASE}/api/admin/revalidate?path=${encodeURIComponent(p)}`,
          {
            method: "POST",
            headers: { authorization: "Bearer NAKSHIQ" },
          }
        );
        return { path: p, status: res.status, body: await res.text() };
      } catch (e) {
        return { path: p, error: e.message };
      }
    })
  );
  for (const r of results) {
    if (r.status === 200) ok++;
    else {
      fail++;
      console.log(`  fail ${r.status || ""} ${r.path}: ${r.body || r.error}`);
    }
  }
}
console.log(`\nok=${ok} fail=${fail} total=${paths.length}`);

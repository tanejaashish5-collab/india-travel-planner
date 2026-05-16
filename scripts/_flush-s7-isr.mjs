const BASE = "https://www.nakshiq.com";
const dests = [
  "bir-billing", "chopta", "jaipur", "jaisalmer", "jodhpur",
  "munsiyari", "varanasi", "vrindavan", "tirthan-valley", "nalanda",
];
const locales = ["en", "hi"];
const paths = dests.flatMap((slug) => locales.map((loc) => `/${loc}/destination/${slug}`));
console.log(`◇ flushing ${paths.length} paths`);
let ok = 0, fail = 0;
for (let i = 0; i < paths.length; i += 6) {
  const batch = paths.slice(i, i + 6);
  const results = await Promise.all(
    batch.map(async (p) => {
      try {
        const res = await fetch(
          `${BASE}/api/admin/revalidate?path=${encodeURIComponent(p)}`,
          { method: "POST", headers: { authorization: "Bearer NAKSHIQ" } }
        );
        return { path: p, status: res.status };
      } catch (e) {
        return { path: p, error: e.message };
      }
    })
  );
  for (const r of results) {
    if (r.status === 200) ok++;
    else { fail++; console.log(`  fail ${r.status || ""} ${r.path}`); }
  }
}
console.log(`\nok=${ok} fail=${fail} total=${paths.length}`);

const BASE = "https://www.nakshiq.com";
const dests = [
  "somnath","dwarka","junagadh","girnar","gir-national-park","sasangir","porbandar","velavadar","bhavnagar","palitana",
  "kutch","mandvi","dholavira","rann-of-kutch","marine-national-park","ambaji","modhera","rani-ki-vav","nalsarovar","dakor",
  "ahmedabad","gandhinagar","vadodara","surat","rajkot","champaner-pavagadh","statue-of-unity","saputara","lothal",
];
const paths = dests.flatMap((slug) => ["en", "hi"].map((loc) => `/${loc}/destination/${slug}`));
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
      } catch (e) { return { path: p, error: e.message }; }
    })
  );
  for (const r of results) {
    if (r.status === 200) ok++;
    else { fail++; console.log(`  fail ${r.status || ""} ${r.path}`); }
  }
}
console.log(`\nok=${ok} fail=${fail} total=${paths.length}`);

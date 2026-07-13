import re, urllib.request, time, json

chunks = [f"https://www.nakshiq.com/sitemap/{i}.xml" for i in range(5)]
all_urls = []
per_chunk = {}
for url in chunks:
    t0 = time.time()
    with urllib.request.urlopen(url, timeout=30) as r:
        body = r.read().decode('utf-8')
        code = r.status
    dt = time.time() - t0
    locs = re.findall(r'<loc>([^<]*)</loc>', body)
    per_chunk[url] = {"http": code, "count": len(locs), "seconds": round(dt,2)}
    all_urls.extend(locs)
    print(url, code, len(locs), f"{dt:.2f}s")

with open("all-sitemap-urls.txt", "w") as f:
    f.write("\n".join(all_urls))

print("TOTAL", len(all_urls))
with open("section-H-per-chunk.json", "w") as f:
    json.dump(per_chunk, f, indent=2)

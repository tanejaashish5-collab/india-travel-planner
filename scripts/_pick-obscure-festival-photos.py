#!/usr/bin/env python3
"""Per-festival photo sourcing for the obscure long tail — every festival that
still has no video and no family photo. Searches Wikimedia Commons by festival
name (+ destination) and auto-picks a free-licensed landscape photo. Output:
.scrapes/festival-footage/obscure-photo-picks.json (keyed by slug). Candidates
must still be montage-verified before use.

Usage: python3 scripts/_pick-obscure-festival-photos.py [LIMIT]
"""
import json, urllib.parse, urllib.request, re, sys, time, os, csv

API = "https://commons.wikimedia.org/w/api.php"
UA = "NakshIQ-festival-photo-sourcing/1.0 (taneja.ashish5@gmail.com)"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, "data", "festivals", "festival-celebration-prompts.csv")
MAP = os.path.join(ROOT, "apps", "web", "src", "lib", "festival-footage-map.ts")
OUT = os.path.join(ROOT, ".scrapes", "festival-footage", "obscure-photo-picks.json")
FREE = ("cc by", "cc by-sa", "cc0", "public domain", "cc-by")
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 9999

# already-covered slugs (have a video OR a photo already)
covered = set(re.findall(r'"([a-z0-9-]+)":\s*"[^"]+"', open(MAP, encoding="utf-8").read()))

rows = list(csv.DictReader(open(CSV, encoding="utf-8")))
todo = [r for r in rows if r["festival_slug"] not in covered]
print(f"{len(rows)} festivals, {len(covered)} already covered, {len(todo)} to source", file=sys.stderr)

def search(term):
    q = {"action": "query", "format": "json", "generator": "search",
         "gsrsearch": f"filetype:bitmap {term}", "gsrnamespace": "6", "gsrlimit": "10",
         "prop": "imageinfo", "iiprop": "url|size|extmetadata"}
    req = urllib.request.Request(API + "?" + urllib.parse.urlencode(q), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def best(d):
    pages = (d.get("query", {}) or {}).get("pages", {})
    cands = []
    for p in pages.values():
        ii = (p.get("imageinfo") or [{}])[0]
        w, h = ii.get("width", 0), ii.get("height", 0)
        if not w or not h or w < 1000 or w / h < 1.2: continue
        em = ii.get("extmetadata", {}) or {}
        lic = (em.get("LicenseShortName", {}) or {}).get("value", "") or ""
        if not any(f in lic.lower() for f in FREE): continue
        artist = re.sub("<[^>]+>", "", (em.get("Artist", {}) or {}).get("value", "") or "").strip()
        cands.append({"w": w, "h": h, "ar": round(w / h, 2), "lic": lic,
                      "artist": artist[:60], "url": ii.get("url", ""), "title": p.get("title", ""),
                      "idx": p.get("index", 99)})
    cands = [c for c in cands if c["url"]]
    cands.sort(key=lambda c: (c["idx"], abs(c["ar"] - 1.6)))  # honour search rank, prefer ~16:9
    return cands[0] if cands else None

def clean(name):
    return re.sub(r"\s*\([^)]*\)", "", name).strip()

out = {}
for i, r in enumerate(todo[:LIMIT]):
    slug, name, dest = r["festival_slug"], clean(r["festival_name"]), r["destination"]
    pick = None
    for term in [f"{name} {dest}", name]:
        try:
            pick = best(search(term))
        except Exception:
            pick = None
        if pick: break
        time.sleep(0.25)
    if pick:
        out[slug] = pick
        print(f"OK  {slug}\t{pick['w']}x{pick['h']}\t{pick['lic']}\t{pick['title'][:50]}")
    else:
        print(f"--  {slug}\t(no candidate)", file=sys.stderr)
    time.sleep(0.2)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(out, open(OUT, "w"), indent=2, ensure_ascii=False)
print(f"\n# {len(out)}/{len(todo[:LIMIT])} found → {os.path.relpath(OUT, ROOT)}", file=sys.stderr)

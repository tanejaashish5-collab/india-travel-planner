#!/usr/bin/env python3
"""Second-pass photo sourcing for festivals still uncovered after the Commons
name search: grab each festival's Wikipedia LEAD/infobox image (almost always
the festival itself), verify it's a free-licensed Commons file, and emit
candidates. Same downstream montage-verify + finalize as the Commons pass.

Output: .scrapes/festival-footage/wiki-photo-picks.json (keyed by slug).
Usage: python3 scripts/_pick-festival-photos-wikipedia.py [LIMIT]
"""
import json, urllib.parse, urllib.request, re, sys, time, os, csv

WIKI = "https://en.wikipedia.org/w/api.php"
COMMONS = "https://commons.wikimedia.org/w/api.php"
UA = "NakshIQ-festival-photo-sourcing/1.0 (taneja.ashish5@gmail.com)"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(ROOT, "data", "festivals", "festival-celebration-prompts.csv")
MAP = os.path.join(ROOT, "apps", "web", "src", "lib", "festival-footage-map.ts")
OUT = os.path.join(ROOT, ".scrapes", "festival-footage", "wiki-photo-picks.json")
FREE = ("cc by", "cc by-sa", "cc0", "public domain", "cc-by")
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 9999

covered = set(re.findall(r'"([a-z0-9-]+)":\s*"[^"]+"', open(MAP, encoding="utf-8").read()))
rows = list(csv.DictReader(open(CSV, encoding="utf-8")))
todo = [r for r in rows if r["festival_slug"] not in covered]
print(f"{len(todo)} still uncovered to try via Wikipedia", file=sys.stderr)

def get(url, params):
    req = urllib.request.Request(url + "?" + urllib.parse.urlencode(params), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def lead_image(term):
    # search for the article, then read its original page image
    d = get(WIKI, {"action": "query", "format": "json", "generator": "search",
                   "gsrsearch": term, "gsrlimit": "1", "gsrnamespace": "0",
                   "prop": "pageimages", "piprop": "original"})
    pages = (d.get("query", {}) or {}).get("pages", {})
    for p in pages.values():
        orig = (p.get("original") or {}).get("source")
        if orig and re.search(r"\.(jpg|jpeg|png)$", orig, re.I):
            return orig, p.get("title", "")
    return None, None

def commons_license(image_url):
    # filename after /commons/.../ ; query Commons extmetadata
    m = re.search(r"/commons/(?:thumb/)?[0-9a-f]/[0-9a-f]{2}/([^/]+?\.(?:jpg|jpeg|png))", image_url, re.I)
    if not m:
        m = re.search(r"/([^/]+?\.(?:jpg|jpeg|png))$", image_url, re.I)
    fname = urllib.parse.unquote(m.group(1)) if m else None
    if not fname:
        return None
    d = get(COMMONS, {"action": "query", "format": "json", "titles": f"File:{fname}",
                      "prop": "imageinfo", "iiprop": "url|size|extmetadata"})
    for p in (d.get("query", {}) or {}).get("pages", {}).values():
        ii = (p.get("imageinfo") or [{}])[0]
        em = ii.get("extmetadata", {}) or {}
        lic = (em.get("LicenseShortName", {}) or {}).get("value", "") or ""
        w, h = ii.get("width", 0), ii.get("height", 0)
        artist = re.sub("<[^>]+>", "", (em.get("Artist", {}) or {}).get("value", "") or "").strip()
        if any(f in lic.lower() for f in FREE) and w >= 800:
            return {"url": ii.get("url", image_url), "lic": lic, "artist": artist[:60],
                    "w": w, "h": h, "title": fname}
    return None

def clean(name):
    return re.sub(r"\s*\([^)]*\)", "", name).strip()

out = {}
for r in todo[:LIMIT]:
    slug, name = r["festival_slug"], clean(r["festival_name"])
    pick = None
    for term in [name, f"{name} festival India"]:
        try:
            url, title = lead_image(term)
            if url:
                pick = commons_license(url)
        except Exception:
            pick = None
        if pick:
            pick["wiki_title"] = title
            break
        time.sleep(0.2)
    if pick:
        out[slug] = pick
        print(f"OK  {slug}\t{pick['w']}x{pick['h']}\t{pick['lic']}\t{pick['title'][:48]}")
    else:
        print(f"--  {slug}", file=sys.stderr)
    time.sleep(0.15)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(out, open(OUT, "w"), indent=2, ensure_ascii=False)
print(f"\n# {len(out)}/{len(todo[:LIMIT])} found → {os.path.relpath(OUT, ROOT)}", file=sys.stderr)

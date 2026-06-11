#!/usr/bin/env python3
"""Query Wikimedia Commons for a representative landscape photo per festival
family. Prints family -> chosen file (direct URL, license, author, dims).
Auto-picks the first free-licensed bitmap with width>=1100 and landscape-ish AR."""
import json, urllib.parse, urllib.request, sys

API = "https://commons.wikimedia.org/w/api.php"
UA = "NakshIQ-festival-photo-sourcing/1.0 (taneja.ashish5@gmail.com)"

# family -> search term (visual of the celebration)
TERMS = {
  "hornbill": "Hornbill Festival Nagaland dance",
  "thrissur-pooram": "Thrissur Pooram elephants",
  "dasara-mysore": "Mysore palace Dasara illuminated",
  "bonalu": "Bonalu festival Hyderabad",
  "rath-yatra": "Ratha Yatra Puri chariot",
  "bihu": "Bihu dance Assam",
  "goa-carnival": "Carnival Panaji Goa float parade",
  "chhath": "Chhath Puja river",
  "theyyam": "Theyyam Kerala",
  "dussehra-kullu": "Kullu Dussehra procession",
  "dussehra-tribal-bastar": "Bastar Dussehra",
  "flower-bloom": "Lalbagh flower show India",
  "harvest-sankranti": "Makar Sankranti kite festival India",
  "islamic": "Eid prayer India mosque",
  "colonial-christian": "Christmas illumination church Goa",
  "camel-fair": "Pushkar Camel Fair Rajasthan",
}
FREE = ("cc by", "cc by-sa", "cc0", "public domain", "cc-by")

def fetch(term):
    q = {
      "action": "query", "format": "json",
      "generator": "search", "gsrsearch": f"filetype:bitmap {term}",
      "gsrnamespace": "6", "gsrlimit": "12",
      "prop": "imageinfo", "iiprop": "url|size|extmetadata",
    }
    url = API + "?" + urllib.parse.urlencode(q)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def pick(term):
    try:
        d = fetch(term)
    except Exception as e:
        return None
    pages = (d.get("query", {}) or {}).get("pages", {})
    cands = []
    for p in pages.values():
        ii = (p.get("imageinfo") or [{}])[0]
        w, h = ii.get("width", 0), ii.get("height", 0)
        em = ii.get("extmetadata", {}) or {}
        lic = (em.get("LicenseShortName", {}) or {}).get("value", "") or ""
        artist = (em.get("Artist", {}) or {}).get("value", "") or ""
        # strip html from artist
        import re
        artist = re.sub("<[^>]+>", "", artist).strip()
        url = ii.get("url", "")
        if not url or w < 1100: continue
        if not any(f in lic.lower() for f in FREE): continue
        if h == 0: continue
        ar = w / h
        if ar < 1.2: continue  # want landscape-ish
        cands.append({"w": w, "h": h, "ar": round(ar, 2), "lic": lic, "artist": artist[:60], "url": url, "title": p.get("title", "")})
    if not cands: return None
    # prefer AR closest to 1.6, decent resolution
    cands.sort(key=lambda c: (abs(c["ar"] - 1.6), -c["w"]))
    return cands[0]

out = {}
for fam, term in TERMS.items():
    c = pick(term)
    if c:
        out[fam] = c
        print(f"{fam}\t{c['w']}x{c['h']} AR{c['ar']}\t{c['lic']}\t{c['artist']}\t{c['url']}")
    else:
        print(f"{fam}\tNO-CANDIDATE", file=sys.stderr)

import os
os.makedirs(".scrapes/festival-footage", exist_ok=True)
with open(".scrapes/festival-footage/photo-picks.json", "w") as f:
    json.dump(out, f, indent=2)
print(f"\n# wrote {len(out)} picks to .scrapes/festival-footage/photo-picks.json", file=sys.stderr)

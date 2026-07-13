#!/usr/bin/env python3
"""NakshIQ daily QA probe — 2026-07-04. Sections A,B,C,D,E,F,G,H,I,J.
Sequential honest timing via curl. Evidence CSVs written alongside.
Usage: python3 probe.py <section> [lo hi]   (slices keep each shell call <45s)
Adapted from qa/findings/2026-07-03/probe.py — same methodology, new date/seed.
"""
import subprocess, sys, json, re, random, csv, os, hashlib, statistics

BASE = "https://www.nakshiq.com"
EVID = os.path.dirname(os.path.abspath(__file__))
UA = "NakshIQ-DailyQA/2026-07-04 (curl probe; Cowork scheduled task)"
BODYF = "/tmp/_body_20260704"

def curl(url, method="GET", data=None, headers=None, max_time=60):
    """Return (http_code, ttfb_ms, total_ms, size, body, eff, nred)."""
    cmd = ["curl", "-sSL", "-o", BODYF, "-w",
           "%{http_code} %{time_starttransfer} %{time_total} %{size_download} %{url_effective} %{num_redirects}",
           "-A", UA, "--max-time", str(max_time), "-X", method]
    for h in (headers or []):
        cmd += ["-H", h]
    if data is not None:
        cmd += ["--data-binary", data]
    cmd.append(url)
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=max_time+10)
    if r.returncode != 0:
        return ("ERR", -1, -1, 0, (r.stderr.strip() or "curl rc=%d" % r.returncode)[:200], url, 0)
    parts = r.stdout.strip().split()
    code = parts[0]; ttfb = int(float(parts[1])*1000); total = int(float(parts[2])*1000)
    size = int(parts[3]); eff = parts[4]; nred = int(parts[5])
    body = open(BODYF, "r", errors="replace").read()
    return (code, ttfb, total, size, body, eff, nred)

def head_nofollow(url):
    """Status + Location without following redirects."""
    r = subprocess.run(["curl", "-sS", "-o", "/dev/null", "-D", "-", "-A", UA,
                        "--max-time", "30", url], capture_output=True, text=True)
    code, loc = "", ""
    for line in r.stdout.splitlines():
        if line.startswith("HTTP/"): code = line.split()[1]
        if line.lower().startswith("location:"): loc = line.split(":",1)[1].strip()
    return code, loc

def w(name, rows, header, append=False):
    p = os.path.join(EVID, name)
    exists = os.path.exists(p)
    mode = "a" if (append and exists) else "w"
    with open(p, mode, newline="") as f:
        cw = csv.writer(f)
        if mode == "w": cw.writerow(header)
        cw.writerows(rows)
    print(f"WROTE {name} ({len(rows)} rows, mode={mode})")

# ---------- sample: pick 10 slugs from sitemap-1 ----------
def get_sample():
    sf = os.path.join(EVID, "sample-slugs.json")
    if os.path.exists(sf):
        return json.load(open(sf))
    code, _, _, _, idx, _, _ = curl(f"{BASE}/sitemap.xml")
    assert code == "200", f"sitemap index {code}"
    chunks = re.findall(r"<loc>(https://www\.nakshiq\.com/sitemap/\d+\.xml)</loc>", idx)
    slugs = set()
    for cu in chunks:
        code, _, _, _, body, _, _ = curl(cu)
        slugs |= set(re.findall(r"<loc>https://www\.nakshiq\.com/en/destination/([a-z0-9-]+)</loc>", body))
        if len(slugs) >= 400: break
    slugs = sorted(slugs)
    random.seed("nakshiq-2026-07-04")
    sample = random.sample(slugs, 10)
    json.dump(sample, open(sf, "w"), indent=1)
    print("SAMPLE:", sample, "| pool:", len(slugs))
    return sample

# ---------- A: soft-404 ----------
def sec_a():
    probes = [
        f"{BASE}/en/destination/this-does-not-exist-xyz",
        f"{BASE}/en/destination/zzzzzz-fake",
        f"{BASE}/hi/destination/this-does-not-exist-xyz",
        f"{BASE}/en/destination/jaipur/13",
        f"{BASE}/en/destination/jaipur/0",
        f"{BASE}/en/destination/jaipur/notamonth",
        f"{BASE}/hi/destination/varanasi/99",
        f"{BASE}/destination/nonexistent-slug-qa/june",
        f"{BASE}/en/itinerary/this-does-not-exist-xyz",
    ]
    rows = []
    for u in probes:
        code, ttfb, _, size, body, eff, nred = curl(u)
        rows.append([u, code, size, eff])
        print(u, "->", code, f"({size}b)")
    w("section-A-soft404.csv", rows, ["url", "final_status", "bytes", "effective_url"])

# ---------- B: availability + TTFB ----------
def sec_b(lo=0, hi=None):
    sample = get_sample()
    part = sample[lo:hi]
    rows = []
    os.makedirs(os.path.join(EVID, "html"), exist_ok=True)
    for s in part:
        u = f"{BASE}/en/destination/{s}"
        code, ttfb, total, size, body, _, _ = curl(u)
        open(os.path.join(EVID, "html", f"en_{s}.html"), "w").write(body)
        rows.append([s, code, ttfb, total, size])
        print(s, code, f"TTFB={ttfb}ms total={total}ms {size}b")
    w("section-B-availability.csv", rows, ["slug", "status", "ttfb_ms", "total_ms", "bytes"], append=(lo > 0))

# ---------- C: Hindi parity ----------
def sec_c(lo=0, hi=None):
    sample = get_sample()
    part = sample[lo:hi]
    rows = []
    os.makedirs(os.path.join(EVID, "html"), exist_ok=True)
    for s in part:
        u = f"{BASE}/hi/destination/{s}"
        code, ttfb, _, size, body, _, _ = curl(u)
        open(os.path.join(EVID, "html", f"hi_{s}.html"), "w").write(body)
        lang = re.search(r'<html[^>]*\blang="([^"]*)"', body)
        lang = lang.group(1) if lang else ""
        title = re.search(r"<title[^>]*>(.*?)</title>", body, re.S)
        title = title.group(1).strip() if title else ""
        deva = bool(re.search(r"[ऀ-ॿ]", title))
        rows.append([s, code, lang, deva, title[:80], ttfb])
        print(s, code, f"lang={lang} devanagari={deva}")
    w("section-C-hindi.csv", rows, ["slug", "status", "html_lang", "title_devanagari", "title", "ttfb_ms"], append=(lo > 0))

# ---------- D: SEO meta ----------
def meta_checks(body):
    title = re.search(r"<title[^>]*>(.*?)</title>", body, re.S)
    title = title.group(1).strip() if title else ""
    stutter = "| NakshIQ | NakshIQ" in title or title.count("NakshIQ") > 1
    canonical = bool(re.search(r'rel="canonical"', body))
    hl_en = bool(re.search(r'hrefLang="en"|hreflang="en"', body))
    hl_hi = bool(re.search(r'hrefLang="hi"|hreflang="hi"', body))
    hl_xd = bool(re.search(r'hrefLang="x-default"|hreflang="x-default"', body))
    og = bool(re.search(r'property="og:image"', body))
    return title, stutter, canonical, hl_en, hl_hi, hl_xd, og

def sec_d():
    sample = get_sample()
    urls = [(f"{BASE}/en", "landing", None)]
    for s in sample:
        urls.append((f"{BASE}/en/destination/{s}", s, os.path.join(EVID, "html", f"en_{s}.html")))
    urls.append((f"{BASE}/en/destination/{sample[0]}/december", f"{sample[0]}/december", None))
    urls.append((f"{BASE}/en/itinerary/agra", "itinerary/agra", None))
    rows = []
    for u, label, cached in urls:
        if cached and os.path.exists(cached):
            body = open(cached, errors="replace").read(); code = "200(cached)"
        else:
            code, _, _, _, body, _, _ = curl(u)
            if label == "landing":
                open(os.path.join(EVID, "html", "en_landing.html"), "w").write(body)
        t, st, cn, he, hh, hx, og = meta_checks(body)
        rows.append([label, code, st, cn, he, hh, hx, og, t[:90]])
        print(label, code, f"stutter={st} canonical={cn} hreflang(en/hi/xd)={he}/{hh}/{hx} og={og}")
    w("section-D-seo.csv", rows, ["url", "status", "title_stutter", "canonical", "hreflang_en", "hreflang_hi", "hreflang_xdefault", "og_image", "title"])

# ---------- D2: quiz/risk-quiz og:image recheck (NEW-2026-07-03-001) ----------
def sec_d2():
    probes = [
        (f"{BASE}/en/risk-quiz", "en/risk-quiz"),
        (f"{BASE}/hi/risk-quiz", "hi/risk-quiz"),
        (f"{BASE}/en/quiz/hill-station", "en/quiz/hill-station"),
        (f"{BASE}/hi/quiz/hill-station", "hi/quiz/hill-station"),
    ]
    rows = []
    for u, label in probes:
        code, _, _, size, body, _, _ = curl(u)
        t, st, cn, he, hh, hx, og = meta_checks(body)
        rows.append([label, code, st, cn, he, hh, hx, og, t[:90]])
        print(label, code, f"stutter={st} canonical={cn} hreflang(en/hi/xd)={he}/{hh}/{hx} og={og}")
    w("section-D2-quiz-routes.csv", rows, ["url", "status", "title_stutter", "canonical", "hreflang_en", "hreflang_hi", "hreflang_xdefault", "og_image", "title"])

# ---------- E: SOS structured fields ----------
SOS_FIELDS = ["police", "ambulance", "fire", "women_helpline", "tourist_helpline",
              "road_accident", "rescue_contact", "local_police_station",
              "mountain_rescue", "mechanic_contact", "tow_service", "embassy_emergency_line"]

def sos_blob(body):
    """Extract the emergencySos:{...} object from the RSC payload (escaped JSON)."""
    i = body.find('emergencySos\\":')
    if i == -1:
        i = body.find('"emergencySos":')
        if i == -1: return None
    chunk = body[i:i+12000]
    chunk = chunk.replace('\\\\', '\x00').replace('\\"', '"').replace('\x00', '\\')
    j = chunk.find('{')
    if j == -1: return None
    depth = 0; in_str = False; esc = False
    for k in range(j, len(chunk)):
        c = chunk[k]
        if esc: esc = False; continue
        if c == '\\': esc = True; continue
        if c == '"': in_str = not in_str; continue
        if in_str: continue
        if c == '{': depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                try: return json.loads(chunk[j:k+1])
                except Exception: return None
    return None

def phone_ok(v):
    if v is None: return None
    if re.search(r"X{3,}", v, re.I): return False       # placeholder
    digits = re.sub(r"\D", "", v)
    return len(digits) >= 2

def sec_e():
    sample = get_sample()
    rows = []; total_fields = 0; malformed = 0; textonly = []
    no_blob = []; dialable_total = 0
    for s in sample:
        body = open(os.path.join(EVID, "html", f"en_{s}.html"), errors="replace").read()
        blob = sos_blob(body)
        found = {}
        helper_phones = []
        if blob is None:
            no_blob.append(s)
        else:
            for f in SOS_FIELDS:
                v = blob.get(f)
                if v not in (None, "", "null"):
                    found[f] = str(v)
            for h in (blob.get("local_helpers") or []):
                if isinstance(h, dict) and h.get("phone"):
                    helper_phones.append(str(h["phone"]))
        n_struct = len(found)
        bad = [f for f, v in found.items() if phone_ok(v) is False]
        nodigit = [f for f, v in found.items() if not re.search(r"\d", v)]
        dialable = [f for f, v in found.items() if re.search(r"\d", v) and phone_ok(v) is not False]
        total_fields += n_struct; malformed += len(bad); dialable_total += len(dialable)
        if nodigit: textonly.append((s, nodigit))
        has112 = "112" in body
        rows.append([s, n_struct, ";".join(sorted(found.keys())), len(bad), ";".join(bad),
                     ";".join(nodigit), len(dialable), len(helper_phones), has112])
        print(s, f"structured={n_struct} dialable={len(dialable)} malformed={len(bad)} textonly={nodigit} helper_phones={len(helper_phones)}")
        for f, v in sorted(found.items()):
            print(f"   {f} = {v[:70]}")
    w("section-E-sos.csv", rows, ["slug", "structured_fields", "field_names", "malformed_count",
                                   "malformed_fields", "text_no_digit_fields", "dialable_fields", "local_helper_phones", "universal_112_present"])
    print(f"TOTAL structured fields: {total_fields}, dialable: {dialable_total}, malformed: {malformed}, text-only: {textonly}")
    print(f"DESTS WITH NO emergencySos BLOB: {no_blob if no_blob else 'none'}")

# ---------- F: API smoke (part 1 = chat, part 2 = rest) ----------
def sec_f(part=0, _unused=None):
    open("/tmp/_oversized_20260704.json", "w").write("x" * 200000)
    p1 = [
        ("POST /api/chat malformed", f"{BASE}/api/chat", "POST", '{"broken', ["Content-Type: application/json"]),
        ("POST /api/chat empty", f"{BASE}/api/chat", "POST", "", ["Content-Type: application/json"]),
        ("POST /api/chat wrong-shape", f"{BASE}/api/chat", "POST", '{"message":"hi"}', ["Content-Type: application/json"]),
        ("POST /api/chat oversized-200KB", f"{BASE}/api/chat", "POST", "@/tmp/_oversized_20260704.json", ["Content-Type: application/json"]),
        ("POST /api/chat valid", f"{BASE}/api/chat", "POST", '{"question":"What is the best time to visit Leh?"}', ["Content-Type: application/json"]),
    ]
    p2 = [
        ("POST /api/itinerary malformed", f"{BASE}/api/itinerary", "POST", '{"broken', ["Content-Type: application/json"]),
        ("POST /api/itinerary empty", f"{BASE}/api/itinerary", "POST", "", ["Content-Type: application/json"]),
        ("POST /api/itinerary empty-object", f"{BASE}/api/itinerary", "POST", "{}", ["Content-Type: application/json"]),
        ("GET /api/weather?id=varanasi", f"{BASE}/api/weather?id=varanasi", "GET", None, None),
        ("GET /api/weather no-params", f"{BASE}/api/weather", "GET", None, None),
        ("GET /api/search-index", f"{BASE}/api/search-index", "GET", None, None),
        ("GET /api/destinations (expect 404)", f"{BASE}/api/destinations", "GET", None, None),
        ("GET /api/health (expect 404)", f"{BASE}/api/health", "GET", None, None),
    ]
    probes = p1 if part == 1 else (p2 if part == 2 else p1 + p2)
    rows = []
    for label, u, m, d, h in probes:
        code, ttfb, _, size, body, _, _ = curl(u, method=m, data=d, headers=h, max_time=90)
        rows.append([label, code, size, body[:150].replace("\n", " ")])
        print(label, "->", code, f"({size}b)", body[:80].replace("\n", " "))
    w("section-F-api.csv", rows, ["probe", "status", "bytes", "body_first150"], append=(part == 2))

# ---------- G: PWA ----------
def sec_g():
    rows = []
    code, _, _, size, body, _, _ = curl(f"{BASE}/sw.js")
    ver = re.search(r'CACHE_VERSION\s*=\s*"(nakshiq-v\d+)"', body)
    vstr = ver.group(1) if ver else None
    if not vstr:
        all_v = re.findall(r"nakshiq-v(\d+)", body)
        if all_v: vstr = "nakshiq-v" + str(max(int(x) for x in all_v))
    md5 = hashlib.md5(body.encode()).hexdigest()
    rows.append(["/sw.js", code, size, vstr or "?", md5])
    print("/sw.js", code, size, vstr or "?", "md5", md5)
    code, _, _, size, body, _, _ = curl(f"{BASE}/manifest.json")
    try:
        man = json.loads(body)
        icons = len(man.get("icons", [])); shorts = len(man.get("shortcuts", []))
    except Exception:
        icons = shorts = -1
    rows.append(["/manifest.json", code, size, f"icons={icons}", f"shortcuts={shorts}"])
    print("/manifest.json", code, f"icons={icons} shortcuts={shorts}")
    code, _, _, size, _, _, _ = curl(f"{BASE}/offline")
    rows.append(["/offline", code, size, "", ""])
    print("/offline", code)
    w("section-G-pwa.csv", rows, ["url", "status", "bytes", "v1", "v2"])

# ---------- H: sitemap ----------
def sec_h():
    rows = []
    code, _, _, size, body, _, _ = curl(f"{BASE}/sitemap.xml")
    chunks = re.findall(r"<loc>(https://www\.nakshiq\.com/sitemap/\d+\.xml)</loc>", body)
    rows.append(["/sitemap.xml", code, size, len(chunks), ""])
    print("/sitemap.xml", code, f"chunks={len(chunks)}")
    tot_urls = 0; dest_slug = 0; dest_month = 0; cost = 0
    for cu in chunks:
        code, _, _, size, body, _, _ = curl(cu)
        locs = body.count("<loc>")
        ds = len(re.findall(r"/en/destination/[a-z0-9-]+</loc>", body))
        dm = len(re.findall(r"/en/destination/[a-z0-9-]+/[a-z]+</loc>", body))
        co = len(re.findall(r"/en/cost/[a-z0-9-]+</loc>", body))
        tot_urls += locs; dest_slug += ds; dest_month += dm; cost += co
        rows.append([cu, code, size, locs, f"dest={ds} month={dm} cost={co}"])
        print(cu, code, f"locs={locs} dest={ds} month={dm} cost={co}")
    rows.append(["TOTAL", "", "", tot_urls, f"dest={dest_slug} month={dest_month} cost={cost}"])
    print(f"TOTAL urls={tot_urls} dest_slug={dest_slug} dest_month={dest_month} cost={cost}")
    w("section-H-sitemap.csv", rows, ["url", "status", "bytes", "url_count", "breakdown"])

# ---------- I: core routes ----------
CORE = ["/en", "/en/explore", "/en/trip", "/en/ask", "/en/sos", "/en/blog", "/en/collections",
        "/en/festivals", "/en/treks", "/en/permits", "/en/road-conditions", "/en/methodology",
        "/en/about", "/en/gap-year", "/en/destination/jaipur", "/en/destination/varanasi",
        "/hi", "/hi/explore", "/en/destination/jaipur/june", "/en/cost/jaipur",
        "/en/itinerary/agra", "/hi/itinerary/agra",
        "/en/search", "/en/compare"]

def sec_i(lo=0, hi=None):
    part = CORE[lo:hi if hi is not None else len(CORE)]
    rows = []; ttfbs = []
    for r_ in part:
        u = BASE + r_
        code, ttfb, total, size, body, eff, nred = curl(u)
        ttfbs.append(ttfb)
        rows.append([r_, code, ttfb, total, size, nred, eff if eff != u else ""])
        print(r_, code, f"TTFB={ttfb}ms", f"redirects={nred}")
    w("section-I-core-routes.csv", rows, ["route", "final_status", "ttfb_ms", "total_ms", "bytes", "num_redirects", "redirected_to"], append=(lo > 0))

def sec_istats():
    rows = list(csv.DictReader(open(os.path.join(EVID, "section-I-core-routes.csv"))))
    real = [r for r in rows if r["route"] != "/en/search"]
    ttfbs = sorted(int(r["ttfb_ms"]) for r in real)
    med = int(statistics.median(ttfbs)); p90 = ttfbs[int(len(ttfbs)*0.9)-1]
    codes = [r["final_status"] for r in real]
    print(f"routes={len(rows)} real={len(real)} 200s={codes.count('200')} non200={[ (r['route'], r['final_status']) for r in real if r['final_status'] != '200' ]}")
    print(f"/en/search phantom probe: {[ (r['final_status'], r['ttfb_ms']) for r in rows if r['route']=='/en/search' ]}")
    print(f"TTFB(real) min={min(ttfbs)} median={med} p90={p90} max={max(ttfbs)}")

# ---------- J: locale redirect ----------
def sec_j():
    probes = ["/", "/explore", "/trip", "/destination/jaipur", "/sos"]
    rows = []
    for p in probes:
        code, loc = head_nofollow(BASE + p)
        rows.append([p, code, loc])
        print(p, "->", code, loc)
    w("section-J-locale.csv", rows, ["path", "status", "location"])

if __name__ == "__main__":
    sec = sys.argv[1].lower()
    args = [int(x) for x in sys.argv[2:]]
    fn = {"sample": get_sample, "a": sec_a, "b": sec_b, "c": sec_c, "d": sec_d,
          "d2": sec_d2, "e": sec_e, "f": sec_f, "g": sec_g, "h": sec_h,
          "i": sec_i, "istats": sec_istats, "j": sec_j}[sec]
    fn(*args)

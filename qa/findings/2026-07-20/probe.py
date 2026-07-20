#!/usr/bin/env python3
"""NakshIQ daily QA probe script — 2026-07-20 run.
Adapted from the established daily methodology (see qa/SKILL.md + prior findings/*.json,
carried forward unchanged from qa/findings/2026-07-13/probe.py to keep metric definitions
consistent run-over-run — same soft-404 URL set, same core-route list, same R2 hero-image
URL pattern, same SEO check regexes).
Run with a stage argument to keep each invocation inside the 45s shell budget:
  python3 probe.py sitemap
  python3 probe.py section_a
  python3 probe.py section_b
  python3 probe.py section_c
  python3 probe.py section_d
  python3 probe.py section_f
  python3 probe.py section_g
  python3 probe.py section_i
  python3 probe.py section_j
"""
import sys, json, csv, random, re, os
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE = "https://www.nakshiq.com"
DIR = os.path.dirname(os.path.abspath(__file__))
SEED = "nakshiq-2026-07-20"
TIMEOUT = 15

def get(url, **kw):
    try:
        r = requests.get(url, timeout=TIMEOUT, **kw)
        return r
    except Exception as e:
        return e

def probe_one(url):
    try:
        r = requests.get(url, timeout=TIMEOUT)
        ttfb_ms = int(r.elapsed.total_seconds() * 1000)
        return {"url": url, "status": r.status_code, "ttfb_ms": ttfb_ms, "bytes": len(r.content), "text": r.text, "headers": dict(r.headers)}
    except Exception as e:
        return {"url": url, "status": None, "error": str(e)}

def write_csv(path, rows, fieldnames):
    with open(os.path.join(DIR, path), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for row in rows:
            w.writerow(row)

def stage_sitemap():
    idx = requests.get(f"{BASE}/sitemap.xml", timeout=TIMEOUT)
    chunk_locs = re.findall(r"<loc>([^<]+)</loc>", idx.text)
    all_urls = []
    chunk_results = []
    for cloc in chunk_locs:
        r = requests.get(cloc, timeout=TIMEOUT)
        locs = re.findall(r"<loc>([^<]+)</loc>", r.text)
        chunk_results.append({"chunk": cloc, "status": r.status_code, "count": len(locs)})
        all_urls.extend(locs)

    # breakdown
    breakdown = {}
    dest_slugs_en = set()
    dest_month_en = 0
    cost_en = 0
    for u in all_urls:
        path = u.replace(BASE + "/", "")
        parts = path.split("/")
        locale = parts[0] if parts else "?"
        if len(parts) >= 2:
            typ = parts[1]
        else:
            typ = "root"
        key = f"{locale}/{typ}"
        breakdown[key] = breakdown.get(key, 0) + 1
        if locale == "en" and typ == "destination":
            if len(parts) == 3:
                dest_slugs_en.add(parts[2])
            elif len(parts) == 4:
                dest_month_en += 1
        if locale == "en" and typ == "cost":
            cost_en += 1

    sitemap_summary = {
        "chunks": chunk_results,
        "total_urls": len(all_urls),
        "breakdown_by_locale_type": breakdown,
        "destination_slug_count_en": len(dest_slugs_en),
        "destination_month_count_en": dest_month_en,
        "cost_urls_en": cost_en,
    }
    with open(os.path.join(DIR, "section-H-sitemap.json"), "w") as f:
        json.dump(sitemap_summary, f, indent=2)

    # deterministic random sample of 10 destination slugs
    slugs_sorted = sorted(dest_slugs_en)
    rng = random.Random(SEED)
    sample = rng.sample(slugs_sorted, 10)
    with open(os.path.join(DIR, "sample-slugs.json"), "w") as f:
        json.dump({"seed": SEED, "sample": sample, "pool_size": len(slugs_sorted)}, f, indent=2)
    print("SITEMAP total_urls=", len(all_urls), "dest_slugs=", len(slugs_sorted))
    print("SAMPLE:", sample)

def load_sample():
    with open(os.path.join(DIR, "sample-slugs.json")) as f:
        return json.load(f)["sample"]

def stage_section_b():
    sample = load_sample()
    rows = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(probe_one, f"{BASE}/en/destination/{s}"): s for s in sample}
        for fut in as_completed(futs):
            s = futs[fut]
            res = fut.result()
            rows.append({"slug": s, "status": res.get("status"), "ttfb_ms": res.get("ttfb_ms"), "bytes": res.get("bytes")})
    rows.sort(key=lambda r: sample.index(r["slug"]))
    write_csv("section-B-availability.csv", rows, ["slug", "status", "ttfb_ms", "bytes"])
    print(rows)

def stage_section_c():
    sample = load_sample()
    rows = []
    os.makedirs(os.path.join(DIR, "html"), exist_ok=True)
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(probe_one, f"{BASE}/hi/destination/{s}"): s for s in sample}
        for fut in as_completed(futs):
            s = futs[fut]
            res = fut.result()
            text = res.get("text", "") or ""
            lang_hi = 'lang="hi"' in text or "lang='hi'" in text
            title_m = re.search(r"<title>([^<]*)</title>", text)
            title = title_m.group(1) if title_m else ""
            has_devanagari = bool(re.search(r"[ऀ-ॿ]", title))
            with open(os.path.join(DIR, "html", f"hi_{s}.html"), "w") as hf:
                hf.write(text[:200000])
            rows.append({"slug": s, "status": res.get("status"), "lang_hi": lang_hi, "title": title, "devanagari_title": has_devanagari})
    rows.sort(key=lambda r: sample.index(r["slug"]))
    write_csv("section-C-hindi.csv", rows, ["slug", "status", "lang_hi", "title", "devanagari_title"])
    print(rows)

def seo_check(url):
    res = probe_one(url)
    text = res.get("text", "") or ""
    title_matches = re.findall(r"<title>([^<]*)</title>", text)
    title = title_matches[0] if title_matches else ""
    stutter = bool(re.search(r"(NakshIQ)\s*\|.*\1", title, re.I)) or title.count("NakshIQ") > 1
    canonical = bool(re.search(r'rel=["\']canonical["\']', text, re.I))
    hreflang_en = bool(re.search(r'hreflang=["\']en["\']', text, re.I))
    hreflang_hi = bool(re.search(r'hreflang=["\']hi["\']', text, re.I))
    hreflang_xdefault = bool(re.search(r'hreflang=["\']x-default["\']', text, re.I))
    og_image = bool(re.search(r'property=["\']og:image["\']', text, re.I))
    return {
        "url": url, "status": res.get("status"), "title": title, "title_stutter": stutter,
        "canonical": canonical, "hreflang_en": hreflang_en, "hreflang_hi": hreflang_hi,
        "hreflang_xdefault": hreflang_xdefault, "og_image": og_image,
    }

def stage_section_d():
    sample = load_sample()
    urls = [f"{BASE}/en"] + [f"{BASE}/en/destination/{s}" for s in sample] + [f"{BASE}/en/destination/{sample[0]}/december", f"{BASE}/en/itinerary/agra"]
    rows = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = [ex.submit(seo_check, u) for u in urls]
        for fut in as_completed(futs):
            rows.append(fut.result())
    rows.sort(key=lambda r: urls.index(r["url"]))
    write_csv("section-D-seo.csv", rows, ["url", "status", "title", "title_stutter", "canonical", "hreflang_en", "hreflang_hi", "hreflang_xdefault", "og_image"])
    print(rows)

def stage_section_d2_quiz():
    urls = [f"{BASE}/en/quiz/hill-station", f"{BASE}/hi/quiz/hill-station", f"{BASE}/en/risk-quiz", f"{BASE}/hi/risk-quiz"]
    rows = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = [ex.submit(seo_check, u) for u in urls]
        for fut in as_completed(futs):
            rows.append(fut.result())
    rows.sort(key=lambda r: urls.index(r["url"]))
    write_csv("section-D2-quiz-routes.csv", rows, ["url", "status", "title", "title_stutter", "canonical", "hreflang_en", "hreflang_hi", "hreflang_xdefault", "og_image"])
    print(rows)

def stage_section_a():
    sample = load_sample()
    urls = [
        f"{BASE}/en/destination/nonexistent-slug-qa-2026",
        f"{BASE}/hi/destination/nonexistent-slug-qa-2026",
        f"{BASE}/en/destination/{sample[0]}/13",
        f"{BASE}/en/destination/{sample[0]}/0",
        f"{BASE}/en/destination/{sample[0]}/notamonth",
        f"{BASE}/hi/destination/{sample[1]}/99",
        f"{BASE}/destination/nonexistent-slug-qa-2026/june",
        f"{BASE}/en/itinerary/this-does-not-exist-xyz",
        f"{BASE}/en/cost/nonexistent-slug-qa-2026",
    ]
    rows = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(probe_one, u): u for u in urls}
        for fut in as_completed(futs):
            u = futs[fut]
            res = fut.result()
            text = res.get("text", "") or ""
            noindex = bool(re.search(r'name=["\']robots["\'][^>]*noindex', text, re.I))
            rows.append({"url": u, "status": res.get("status"), "bytes": res.get("bytes"), "noindex_meta": noindex})
    rows.sort(key=lambda r: urls.index(r["url"]))
    write_csv("section-A-soft404.csv", rows, ["url", "status", "bytes", "noindex_meta"])
    print(rows)

def stage_section_f():
    results = []
    def post(url, body, headers=None):
        try:
            r = requests.post(url, data=body, headers=headers or {"Content-Type": "application/json"}, timeout=25)
            return {"status": r.status_code, "bytes": len(r.content), "snippet": r.text[:200]}
        except Exception as e:
            return {"status": None, "error": str(e)}
    def get_(url):
        try:
            r = requests.get(url, timeout=15)
            return {"status": r.status_code, "bytes": len(r.content), "snippet": r.text[:200], "headers": dict(r.headers)}
        except Exception as e:
            return {"status": None, "error": str(e)}

    tests = []
    tests.append(("chat_malformed", "POST", lambda: post(f"{BASE}/api/chat", "{not valid json")))
    tests.append(("chat_empty", "POST", lambda: post(f"{BASE}/api/chat", "")))
    tests.append(("chat_wrong_shape", "POST", lambda: post(f"{BASE}/api/chat", json.dumps({"foo": "bar"}))))
    tests.append(("chat_oversized", "POST", lambda: post(f"{BASE}/api/chat", json.dumps({"question": "x" * 200000}))))
    tests.append(("chat_valid", "POST", lambda: post(f"{BASE}/api/chat", json.dumps({"question": "Best time to visit Leh?"}))))
    tests.append(("itinerary_malformed", "POST", lambda: post(f"{BASE}/api/itinerary", "{not valid json")))
    tests.append(("itinerary_empty", "POST", lambda: post(f"{BASE}/api/itinerary", "")))
    tests.append(("itinerary_empty_object", "POST", lambda: post(f"{BASE}/api/itinerary", "{}")))
    tests.append(("weather_no_params", "GET", lambda: get_(f"{BASE}/api/weather")))
    tests.append(("weather_valid", "GET", lambda: get_(f"{BASE}/api/weather?id=varanasi")))
    tests.append(("search_index", "GET", lambda: get_(f"{BASE}/api/search-index")))
    tests.append(("destinations_probe", "GET", lambda: get_(f"{BASE}/api/destinations")))
    tests.append(("health_probe", "GET", lambda: get_(f"{BASE}/api/health")))

    rows = []
    for name, method, fn in tests:
        r = fn()
        r["name"] = name
        r["method"] = method
        rows.append(r)
    # deploy id capture (before stripping headers)
    dpl = None
    for r in rows:
        h = r.get("headers") or {}
        for k, v in h.items():
            if "dpl" in str(v):
                dpl = v
    csv_rows = [{k: v for k, v in r.items() if k in ("name", "method", "status", "bytes", "snippet")} for r in rows]
    write_csv("section-F-api.csv", csv_rows, ["name", "method", "status", "bytes", "snippet"])
    with open(os.path.join(DIR, "section-F2-deploy.csv"), "w") as f:
        f.write(f"field,value\ndata_dpl_id_hint,{dpl}\n")
    print(rows)
    print("DPL hint:", dpl)

def stage_section_g():
    rows = []
    sw = probe_one(f"{BASE}/sw.js")
    text = sw.get("text", "") or ""
    ver_m = re.search(r"CACHE_VERSION\s*=\s*['\"]([^'\"]+)['\"]", text)
    import hashlib
    md5 = hashlib.md5(text.encode()).hexdigest()
    rows.append({"item": "sw.js", "status": sw.get("status"), "cache_version": ver_m.group(1) if ver_m else None, "md5": md5, "bytes": sw.get("bytes")})

    man = probe_one(f"{BASE}/manifest.json")
    try:
        manifest = json.loads(man.get("text", "{}"))
    except Exception:
        manifest = {}
    icons = len(manifest.get("icons", []))
    shortcuts = len(manifest.get("shortcuts", []))
    rows.append({"item": "manifest.json", "status": man.get("status"), "icons": icons, "shortcuts": shortcuts})

    off = probe_one(f"{BASE}/offline")
    rows.append({"item": "offline", "status": off.get("status")})

    write_csv("section-G-pwa.csv", rows, ["item", "status", "cache_version", "md5", "bytes", "icons", "shortcuts"])
    print(rows)

def stage_section_i():
    routes = [
        "/", "/en", "/en/explore", "/en/trip", "/en/ask", "/en/sos", "/en/blog",
        "/en/about", "/en/states", "/en/collections", "/en/festivals", "/en/quiz/hill-station",
        "/en/risk-quiz", "/en/treks", "/en/cost-index", "/en/itinerary/agra", "/hi", "/hi/explore",
        "/hi/sos", "/hi/blog", "/en/destination/jaipur", "/hi/destination/jaipur", "/en/search",
    ]
    rows = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(probe_one, f"{BASE}{p}"): p for p in routes}
        for fut in as_completed(futs):
            p = futs[fut]
            res = fut.result()
            rows.append({"path": p, "status": res.get("status"), "ttfb_ms": res.get("ttfb_ms")})
    rows.sort(key=lambda r: routes.index(r["path"]))
    write_csv("section-I-core-routes.csv", rows, ["path", "status", "ttfb_ms"])
    print(rows)

def stage_section_j():
    paths = ["/", "/explore", "/trip", "/destination/jaipur", "/sos"]
    rows = []
    for p in paths:
        try:
            r = requests.get(f"{BASE}{p}", timeout=15, allow_redirects=False)
            rows.append({"path": p, "status": r.status_code, "location": r.headers.get("Location", "")})
        except Exception as e:
            rows.append({"path": p, "status": None, "location": str(e)})
    write_csv("section-J-locale.csv", rows, ["path", "status", "location"])
    print(rows)

def stage_section_l():
    idx = requests.get(f"{BASE}/sitemap.xml", timeout=TIMEOUT)
    chunk_locs = re.findall(r"<loc>([^<]+)</loc>", idx.text)
    slugs = set()
    for cloc in chunk_locs:
        r = requests.get(cloc, timeout=TIMEOUT)
        for u in re.findall(r"<loc>([^<]+)</loc>", r.text):
            path = u.replace(BASE + "/", "")
            parts = path.split("/")
            if len(parts) == 3 and parts[0] == "en" and parts[1] == "destination":
                slugs.add(parts[2])
    slugs = sorted(slugs)
    R2 = "https://pub-d8970c901de34c218926ebf4be1ed09a.r2.dev"

    def head_probe(slug):
        url = f"{R2}/destinations/{slug}.jpg"
        try:
            r = requests.head(url, timeout=10, allow_redirects=False)
            return {"id": slug, "url": url, "status": r.status_code, "ok": 200 <= r.status_code < 400}
        except Exception as e:
            return {"id": slug, "url": url, "status": 0, "ok": False, "error": str(e)}

    results = []
    with ThreadPoolExecutor(max_workers=24) as ex:
        futs = [ex.submit(head_probe, s) for s in slugs]
        for fut in as_completed(futs):
            results.append(fut.result())

    ok = [r for r in results if r["ok"]]
    missing = [r for r in results if not r["ok"] and r.get("status") == 404]
    errors = [r for r in results if not r["ok"] and r.get("status") != 404]
    summary = {"probed": len(results), "ok": len(ok), "missing": len(missing), "errors": len(errors),
               "missing_ids": [r["id"] for r in missing], "error_ids": [(r["id"], r.get("status"), r.get("error")) for r in errors]}
    with open(os.path.join(DIR, "section-L-hero-images.json"), "w") as f:
        json.dump(summary, f, indent=2)
    print(summary)

if __name__ == "__main__":
    stage = sys.argv[1]
    globals()[f"stage_{stage}"]()

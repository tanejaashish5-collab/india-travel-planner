#!/usr/bin/env python3
"""Slice-runner around probe.py so each bash call fits the 45s sandbox cap.
Usage: python3 run_part.py <section> <start> <end>
Appends rows to section CSVs; 'finalize_<x>' not needed — headers written when start==0.
"""
import sys, os, csv, json, re, statistics
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import probe  # noqa

EVID = probe.EVID
BASE = probe.BASE

def append(name, rows, header, start):
    p = os.path.join(EVID, name)
    mode = "w" if start == 0 else "a"
    with open(p, mode, newline="") as f:
        cw = csv.writer(f)
        if start == 0:
            cw.writerow(header)
        cw.writerows(rows)
    print(f"APPENDED {name} rows={len(rows)} mode={mode}")

def part_b(i0, i1):
    sample = probe.get_sample()[i0:i1]
    rows = []
    os.makedirs(os.path.join(EVID, "html"), exist_ok=True)
    for s in sample:
        u = f"{BASE}/en/destination/{s}"
        code, ttfb, total, size, body, _, _ = probe.curl(u)
        open(os.path.join(EVID, "html", f"en_{s}.html"), "w").write(body)
        rows.append([s, code, ttfb, total, size])
        print(s, code, f"TTFB={ttfb}ms total={total}ms {size}b")
    append("section-B-availability.csv", rows, ["slug", "status", "ttfb_ms", "total_ms", "bytes"], i0)

def part_c(i0, i1):
    sample = probe.get_sample()[i0:i1]
    rows = []
    for s in sample:
        u = f"{BASE}/hi/destination/{s}"
        code, ttfb, _, size, body, _, _ = probe.curl(u)
        lang = re.search(r'<html[^>]*\blang="([^"]*)"', body)
        lang = lang.group(1) if lang else ""
        title = re.search(r"<title[^>]*>(.*?)</title>", body, re.S)
        title = title.group(1).strip() if title else ""
        deva = bool(re.search(r"[ऀ-ॿ]", title))
        rows.append([s, code, lang, deva, title[:80], ttfb])
        print(s, code, f"lang={lang} devanagari={deva}")
    append("section-C-hindi.csv", rows, ["slug", "status", "html_lang", "title_devanagari", "title", "ttfb_ms"], i0)

F_PROBES_IDX = None
def part_f(i0, i1):
    open("/tmp/_oversized_20260610.json", "w").write("x" * 200000)
    probes = [
        ("POST /api/chat malformed", f"{BASE}/api/chat", "POST", '{"broken', ["Content-Type: application/json"]),
        ("POST /api/chat empty", f"{BASE}/api/chat", "POST", "", ["Content-Type: application/json"]),
        ("POST /api/chat wrong-shape", f"{BASE}/api/chat", "POST", '{"message":"hi"}', ["Content-Type: application/json"]),
        ("POST /api/chat oversized-200KB", f"{BASE}/api/chat", "POST", "@/tmp/_oversized_20260610.json", ["Content-Type: application/json"]),
        ("POST /api/chat valid", f"{BASE}/api/chat", "POST", '{"question":"What is the best time to visit Leh?"}', ["Content-Type: application/json"]),
        ("POST /api/itinerary malformed", f"{BASE}/api/itinerary", "POST", '{"broken', ["Content-Type: application/json"]),
        ("POST /api/itinerary empty", f"{BASE}/api/itinerary", "POST", "", ["Content-Type: application/json"]),
        ("POST /api/itinerary empty-object", f"{BASE}/api/itinerary", "POST", "{}", ["Content-Type: application/json"]),
        ("GET /api/weather?id=varanasi", f"{BASE}/api/weather?id=varanasi", "GET", None, None),
        ("GET /api/weather no-params", f"{BASE}/api/weather", "GET", None, None),
        ("GET /api/search-index", f"{BASE}/api/search-index", "GET", None, None),
        ("GET /api/destinations (expect 404)", f"{BASE}/api/destinations", "GET", None, None),
        ("GET /api/health (expect 404)", f"{BASE}/api/health", "GET", None, None),
    ][i0:i1]
    rows = []
    for label, u, m, d, h in probes:
        code, ttfb, _, size, body, _, _ = probe.curl(u, method=m, data=d, headers=h, max_time=35)
        rows.append([label, code, size, body[:150].replace("\n", " ")])
        print(label, "->", code, f"({size}b)", body[:80].replace("\n", " "))
    append("section-F-api.csv", rows, ["probe", "status", "bytes", "body_first150"], i0)

def part_i(i0, i1):
    rows = []
    for r_ in probe.CORE[i0:i1]:
        u = BASE + r_
        code, ttfb, total, size, body, eff, nred = probe.curl(u)
        rows.append([r_, code, ttfb, total, size, nred, eff if eff != u else ""])
        print(r_, code, f"TTFB={ttfb}ms", f"redirects={nred}")
    append("section-I-core-routes.csv", rows, ["route", "final_status", "ttfb_ms", "total_ms", "bytes", "num_redirects", "redirected_to"], i0)

def warm_b():
    sample = probe.get_sample()
    out = []
    for s in sample:
        code, ttfb, _, _, _, _, _ = probe.curl(f"{BASE}/en/destination/{s}")
        out.append(f"{s} {code} warm_ttfb={ttfb}ms")
        print(out[-1])
    open(os.path.join(EVID, "warm-reprobe-B.txt"), "w").write("\n".join(out) + "\n")

if __name__ == "__main__":
    fn = sys.argv[1]
    if fn == "warm_b":
        warm_b()
    else:
        i0, i1 = int(sys.argv[2]), int(sys.argv[3])
        {"b": part_b, "c": part_c, "f": part_f, "i": part_i}[fn](i0, i1)

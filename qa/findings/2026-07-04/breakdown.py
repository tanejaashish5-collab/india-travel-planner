#!/usr/bin/env python3
"""Section H — full per-type sitemap composition for 2026-07-04.
Categorises every <loc> across all chunks and writes section-H-sitemap-breakdown.txt,
then diffs the OVERALL-by-type table against yesterday's (2026-07-03) stored breakdown."""
import subprocess, re, os, collections

BASE = "https://www.nakshiq.com"
EVID = os.path.dirname(os.path.abspath(__file__))
UA = "NakshIQ-DailyQA/2026-07-04 (curl probe; Cowork scheduled task)"

def fetch(url):
    r = subprocess.run(["curl", "-sS", "-A", UA, "--max-time", "60", url],
                       capture_output=True, text=True)
    return r.stdout

def classify(path):
    # path = portion after /en/ or /hi/ (or '' for home)
    if path == "" or path == "/":
        return "(home)"
    segs = path.strip("/").split("/")
    head = segs[0]
    if head == "destination":
        if len(segs) == 3:
            return "destination/<slug>/<month>"
        return "destination/<slug>"
    if head == "cost":
        return "cost/<slug>"
    if head == "itinerary":
        return "itinerary/<slug>"
    if head == "vs":
        return "vs/<pair>"
    if head.startswith("weekend-from"):
        return head
    return head

idx = fetch(f"{BASE}/sitemap.xml")
chunks = re.findall(r"<loc>(https://www\.nakshiq\.com/sitemap/\d+\.xml)</loc>", idx)
overall = collections.Counter()
lines = []
total = 0
for cu in sorted(chunks):
    body = fetch(cu)
    locs = re.findall(r"<loc>(https://www\.nakshiq\.com[^<]*)</loc>", body)
    per = collections.Counter()
    for loc in locs:
        m = re.match(r"https://www\.nakshiq\.com/(?:(en|hi)(?:/(.*))?|(.*))?$", loc)
        if m:
            if m.group(1):
                path = m.group(2) or ""
            else:
                path = m.group(3) or ""
        else:
            path = ""
        t = classify(path)
        per[t] += 1
        overall[t] += 1
    total += len(locs)
    cn = cu.split("/")[-1]
    lines.append(f"{cn}: {len(locs)} urls -> {dict(per.most_common())}")

out = "\n".join(lines) + "\n\n=== OVERALL BY TYPE ===\n"
for t, c in overall.most_common():
    out += f"  {t}: {c}\n"
out += f"  TOTAL: {total}\n"
open(os.path.join(EVID, "section-H-sitemap-breakdown.txt"), "w").write(out)
print(out)

# diff vs yesterday
ypath = os.path.join(EVID, "..", "2026-07-03", "section-H-sitemap-breakdown.txt")
if os.path.exists(ypath):
    yest = {}
    for line in open(ypath):
        m = re.match(r"\s+([^:]+): (\d+)$", line.rstrip())
        if m and "TOTAL" not in m.group(1):
            yest[m.group(1)] = int(m.group(2))
    print("\n=== DELTA vs 2026-07-03 (today - yesterday) ===")
    allkeys = set(overall) | set(yest)
    any_delta = False
    for k in sorted(allkeys):
        d = overall.get(k, 0) - yest.get(k, 0)
        if d != 0:
            any_delta = True
            print(f"  {k}: {yest.get(k,0)} -> {overall.get(k,0)} ({'+' if d>0 else ''}{d})")
    if not any_delta:
        print("  (no per-type change)")

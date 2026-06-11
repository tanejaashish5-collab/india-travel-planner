import re, sys, json
def extract(html):
    # tel: links
    tel = set(re.findall(r'tel:([+\d][\d\-\s]{2,})', html))
    # JSON-embedded "phone":"..." with optional escaped quotes
    phones = set()
    for m in re.finditer(r'\\?"phone\\?":\s*\\?"([^"\\]+)\\?"', html):
        v = m.group(1).strip()
        if v: phones.add(v)
    all_phones = tel | phones
    valid, invalid = [], []
    for p in all_phones:
        cleaned = re.sub(r'[\s\-]', '', p)
        # valid Indian phone formats: +91-XXX-XXXXXXX, 0XXX-XXXXXX, 4-digit short code (100, 112, 1070, 1090, etc.), 10-digit mobile
        if re.match(r'^\+?91\d{8,11}$', cleaned) or re.match(r'^0\d{6,10}$', cleaned) or re.match(r'^\d{3,4}$', cleaned) or re.match(r'^\d{10}$', cleaned) or re.match(r'^1800\d{6,8}$', cleaned):
            valid.append(p)
        else:
            invalid.append(p)
    return valid, invalid

slugs = open('sample-10.txt').read().split()
print("slug,phones_total,phones_valid,phones_invalid,invalid_examples")
totals = []
for s in slugs:
    try:
        h = open(f"en-{s}.html").read()
    except Exception:
        continue
    v, iv = extract(h)
    totals.append((s, v, iv))
    print(f'{s},{len(v)+len(iv)},{len(v)},{len(iv)},"{",".join(iv[:3])}"')

# targeted re-tests
import urllib.request
for slug in ('uttarkashi','khonoma'):
    try:
        with urllib.request.urlopen(f"https://www.nakshiq.com/en/destination/{slug}") as r:
            h = r.read().decode('utf-8','ignore')
        open(f"en-{slug}.html","w").write(h)
        v, iv = extract(h)
        has_xxxxx = h.count('XXXXX')
        has_94120 = h.count('94120')
        has_taxi  = h.count('Taxi Union')
        has_contact_via = h.count('Contact via Kohima')
        print(f"# {slug}: phones={len(v)} invalid={len(iv)} XXXXX={has_xxxxx} 94120={has_94120} TaxiUnion={has_taxi} ContactViaKohima={has_contact_via}")
        print(f"#   valid phones: {v}")
    except Exception as e:
        print(f"# {slug}: ERROR {e}")

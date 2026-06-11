import re, sys, json, csv

# Indian phone validator: short codes, STD landlines, +91 mobile/landline, toll-free 1800
def valid(p):
    s = p.strip()
    digits = re.sub(r'[^0-9]', '', s)
    # emergency / short codes
    if s in ('112','100','101','102','108','1070','1091','1098','181','1073','139','1363'):
        return True
    # India toll-free 1800-XXX-XXXX (10 digits starting 1800)
    if digits.startswith('1800') and len(digits) in (10,11):
        return True
    # +91 prefixed: 12 digits total (91 + 10)
    if s.startswith('+91') and len(digits) == 12:
        return True
    # STD landline 0XXX-XXXXXX : starts with 0, 10-11 digits
    if s.startswith('0') and 8 <= len(digits) <= 11:
        return True
    # bare 10-digit mobile
    if len(digits) == 10 and digits[0] in '6789':
        return True
    return False

def extract(html):
    phones = set()
    # tel: links
    for m in re.findall(r'tel:([+0-9\-\s()]{3,20})', html):
        phones.add(m.strip())
    # JSON phone fields, bare and escaped
    for m in re.findall(r'\\?"phone\\?"\s*:\s*\\?"([^"\\]{3,40})\\?"', html):
        v = m.strip()
        if v and v.lower() not in ('null','n/a','',):
            phones.add(v)
    return phones

slugs = sys.argv[1:]
rows = []
total = 0
invalid = 0
for slug in slugs:
    try:
        html = open(f'en-html/{slug}.html', encoding='utf-8', errors='ignore').read()
    except FileNotFoundError:
        rows.append([slug,'FILE_MISSING','','',''])
        continue
    phones = sorted(extract(html))
    for p in phones:
        v = valid(p)
        total += 1
        if not v: invalid += 1
        rows.append([slug, p, 'valid' if v else 'INVALID'])
    if not phones:
        rows.append([slug,'(none found)','-'])

with open('section-E-sos.csv','w',newline='') as f:
    w = csv.writer(f)
    w.writerow(['slug','phone','format'])
    w.writerows(rows)

print(f'TOTAL phones across {len(slugs)} dests: {total}')
print(f'INVALID format: {invalid}')
for r in rows:
    print('  ', r)

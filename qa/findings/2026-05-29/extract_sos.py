import re, sys, json

def extract(html):
    phones = set()
    # tel: hrefs
    for m in re.finditer(r'tel:([^"\'\s<>]+)', html):
        phones.add(m.group(1).strip())
    # JSON-embedded "phone" fields, both raw and escaped
    for m in re.finditer(r'\\?"phone\\?"\s*:\s*\\?"([^"\\]+)\\?"', html):
        phones.add(m.group(1).strip())
    return sorted(phones)

def is_valid(p):
    s = p.strip()
    if not s:
        return False
    # Strip + and leading zero
    digits = re.sub(r'[^\d]', '', s)
    # India accepted shapes:
    # 1) emergency 3-4 digit: 112, 1070, 100, 101, 102
    if re.fullmatch(r'1\d{2,3}', s) or s in ('100','101','102','108','112','1070','1091','1098','139'):
        return True
    # 2) toll-free 1800-XXX-XXXX or 1800-XX-XXXX
    if re.fullmatch(r'1800[-\s]?\d{2,4}[-\s]?\d{4}', s):
        return True
    # 3) +91-DDDD-DDDDDD or +91-DDDDDDDDDD (10-digit mobile/landline w/ STD)
    if re.fullmatch(r'\+91[-\s]?\d{2,5}[-\s]?\d{5,8}', s):
        return True
    # 4) Bare 10-digit
    if re.fullmatch(r'\d{10}', s):
        return True
    # 5) STD-prefixed landline like 0135-2559898
    if re.fullmatch(r'0\d{2,4}[-\s]?\d{5,8}', s):
        return True
    # 6) +91 followed by 10+ digits no separators
    if re.fullmatch(r'\+91\d{10,11}', s):
        return True
    # Reject suspect (X placeholders, alpha-typed)
    if 'X' in s.upper(): return False
    if re.search(r'[a-zA-Z]', s): return False
    return False

if __name__ == '__main__':
    html = open(sys.argv[1]).read()
    phones = extract(html)
    invalid = [p for p in phones if not is_valid(p)]
    print(json.dumps({'phones': phones, 'invalid': invalid, 'count': len(phones), 'invalid_count': len(invalid)}))

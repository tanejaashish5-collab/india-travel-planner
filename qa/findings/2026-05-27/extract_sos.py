import sys, re, json, html as htmllib
path = sys.argv[1]
with open(path, encoding='utf-8', errors='replace') as f:
    body = f.read()
# tel: links
tel = set(re.findall(r'tel:([+0-9 ()-]+?)["\\\']', body))
# JSON phone fields (escaped + bare)
json_phones = set(re.findall(r'"phone"\s*:\s*"([^"]+)"', body))
escaped_phones = set(re.findall(r'\\"phone\\":\\"([^\\"]+)\\"', body))
all_phones = tel | json_phones | escaped_phones
# Filter to non-empty and trimmed
all_phones = {p.strip() for p in all_phones if p and p.strip()}
# Validity check: Indian phone format heuristic (digits + optional +/- and leading zero etc.)
def valid(p):
    digits = re.sub(r'[^0-9]', '', p)
    # short codes (100, 112, 1070, 108, etc.) 3-4 digits ok
    if 3 <= len(digits) <= 4:
        return True
    # full Indian numbers 10 digits, with optional +91 / 0
    if 10 <= len(digits) <= 13:
        return True
    return False
invalid = [p for p in all_phones if not valid(p)]
# Suspicious patterns
suspicious_xxxx = [p for p in all_phones if 'X' in p.upper()]
print(json.dumps({"phones": sorted(all_phones), "invalid": invalid, "suspicious_xxxx": suspicious_xxxx}, ensure_ascii=False))

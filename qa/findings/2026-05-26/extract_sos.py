#!/usr/bin/env python3
"""Extract phones from a destination page's HTML: tel: links + JSON phone fields (bare + escaped)."""
import sys, re, json
def extract_phones(html_text):
    phones=set()
    # tel: links
    for m in re.finditer(r'href="tel:([^"]+)"', html_text):
        phones.add(m.group(1).strip())
    # JSON "phone": "<val>" (bare)
    for m in re.finditer(r'"phone"\s*:\s*"([^"]+)"', html_text):
        phones.add(m.group(1).strip())
    # JSON \"phone\":\"<val>\" (escaped, RSC payload)
    for m in re.finditer(r'\\"phone\\":\\"([^"\\]+)\\"', html_text):
        phones.add(m.group(1).strip())
    return sorted(phones)

# Validation: short codes (3-4 digits) like 112/1070/100/108 OR
# 10-11 digit phone with optional STD prefix 0NNN-XXXXXXX OR +91-NNNN-XXXXXX
def is_valid(phone):
    p=phone.strip()
    if re.fullmatch(r'\d{3,4}', p):  # short codes
        return True
    # Strip + and non-digits/dashes
    digits_only = re.sub(r'[^0-9]', '', p)
    if len(digits_only) >= 10 and len(digits_only) <= 13:
        # Reject if contains literal X placeholder
        if 'X' in p or 'x' in p:
            return False
        # Reject if it's clearly not a phone (e.g. contains letters other than X)
        if re.search(r'[a-zA-Z]', p):
            return False
        return True
    return False

if __name__ == '__main__':
    path = sys.argv[1]
    html_text = open(path).read()
    phones = extract_phones(html_text)
    invalid = [p for p in phones if not is_valid(p)]
    print(json.dumps({"phones": phones, "invalid": invalid}))

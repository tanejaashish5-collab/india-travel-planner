#!/usr/bin/env python3
"""Extract and validate SOS phones from a destination page."""
import re
import sys

def extract_phones(body: str):
    # tel: links
    tel_phones = re.findall(r'tel:([+\-()\d\s]+)', body)
    # JSON phone fields (bare and escaped variants)
    json_phones = re.findall(r'\\?"phone\\?"\s*:\s*\\?"([^"\\]+)\\?"', body)
    all_phones = set()
    for p in tel_phones + json_phones:
        p = p.strip()
        if p and p.lower() != 'null':
            all_phones.add(p)
    return all_phones

def validate(p: str) -> bool:
    # Placeholder patterns
    if re.search(r'[X]{2,}', p, re.IGNORECASE):
        return False
    if re.search(r'#{2,}', p):
        return False
    # Repeated digits (5+ of same digit in a row) — likely placeholder
    if re.search(r'(\d)\1{4,}', p):
        return False
    digits = re.sub(r'\D', '', p)
    # Indian phone: short codes 3-4 digits, landlines 8-11, mobiles 10-13
    if len(digits) < 3 or len(digits) > 13:
        return False
    return True

if __name__ == '__main__':
    url = sys.argv[1]
    body_file = sys.argv[2]
    with open(body_file, 'r', errors='ignore') as f:
        body = f.read()
    phones = extract_phones(body)
    invalid = [p for p in phones if not validate(p)]
    phones_str = '|'.join(sorted(phones))
    invalid_str = '|'.join(invalid)
    # CSV row: url,count,invalid_count,"invalid_list","phone_list"
    print(f'{url},{len(phones)},{len(invalid)},"{invalid_str}","{phones_str}"')

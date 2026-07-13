import json, sys
b30 = json.load(open('/tmp/celebration_batch.json'))
acct = int(sys.argv[1])  # 1..6
lo = (acct-1)*5
for i, b in enumerate(b30[lo:lo+5]):
    t = b['text']
    if '\nNegative prompt: ' in t:
        body, neg = t.split('\nNegative prompt: ', 1)
    else:
        body, neg = t, ''
    print('=====IDX', lo+i, 'SLUG', b['slug'])
    print('NEWLINES_IN_BODY', body.count(chr(10)))
    print('BODY>>>' + body)
    print('NEG>>>' + neg)

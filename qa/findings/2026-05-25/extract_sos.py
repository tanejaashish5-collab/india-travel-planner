import re, json, sys

def extract_phones(html):
    phones=set()
    # tel: links
    for m in re.finditer(r'tel:([+0-9\- ()]+)', html):
        phones.add(m.group(1).strip())
    # JSON "phone" fields, bare and escaped variants
    for m in re.finditer(r'\\?"phone\\?"\s*:\s*\\?"([^"\\]+)\\?"', html):
        phones.add(m.group(1).strip())
    return sorted(p for p in phones if p)

def is_valid(p):
    # placeholder / text-typed detection
    if re.search(r'[Xx]{3,}', p): return False
    if not re.search(r'\d', p): return False
    # must be mostly phone characters; reject if contains alphabetic words
    if re.search(r'[A-Za-z]', p): return False
    digits=re.sub(r'\D','',p)
    if len(digits)<3: return False
    return True

if __name__=='__main__':
    out=open('section-E-sos.csv','w')
    out.write('destination,phones_found,phones_invalid,phones_list\n')
    total=0; invalid=0
    for slug in [l.strip().split('/')[-1] for l in open('sample-10.txt')]:
        try:
            h=open('dest-%s.html'%slug,encoding='utf-8',errors='replace').read()
        except FileNotFoundError:
            out.write('%s,0,0,\n'%slug); continue
        ph=extract_phones(h)
        inv=[p for p in ph if not is_valid(p)]
        total+=len(ph); invalid+=len(inv)
        out.write('%s,%d,%d,"%s"\n'%(slug,len(ph),len(inv),'; '.join(ph)))
        print('%-24s %d phones %d invalid  %s'%(slug,len(ph),len(inv),ph))
    out.close()
    print('--- TOTAL: %d phones, %d invalid ---'%(total,invalid))
    # targeted re-tests
    tout=open('section-E-sos-targeted.csv','w')
    tout.write('destination,phones_found,phones_invalid,phones_list,placeholder_grep\n')
    for slug,greps in [('uttarkashi',['XXXXX','94120','Taxi Union']),('khonoma',['Contact via Kohima'])]:
        h=open('dest-%s.html'%slug,encoding='utf-8',errors='replace').read()
        ph=extract_phones(h)
        inv=[p for p in ph if not is_valid(p)]
        gres={g:h.count(g) for g in greps}
        tout.write('%s,%d,%d,"%s","%s"\n'%(slug,len(ph),len(inv),'; '.join(ph),json.dumps(gres)))
        print('TARGETED %-12s %d phones %d invalid  %s  grep=%s'%(slug,len(ph),len(inv),ph,gres))
    tout.close()

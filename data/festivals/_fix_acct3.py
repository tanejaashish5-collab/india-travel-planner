import zipfile, os, shutil, tempfile, datetime, sys
base=os.path.expanduser('~/Desktop/India Travel Planner/data/festivals')
viddir=os.path.join(base,'videos')
zp=os.path.expanduser('~/Downloads/download.zip')
ex=os.path.join(tempfile.gettempdir(),'flow_acct3_extract')
shutil.rmtree(ex, ignore_errors=True); os.makedirs(ex)
with zipfile.ZipFile(zp) as z: z.extractall(ex)
files={}
for root,_,fs in os.walk(ex):
    for f in fs:
        if f.lower().endswith('.mp4'): files[f]=os.path.join(root,f)
# explicit unique-substring -> slug, verified by eye from the DRY-run filenames
M=[('khajuraho','khajuraho-dance-festival'),
   ('monpa','losar-monpa-new-year'),
   ('celebration_dar','losar-tibetan-new-year-darjeeling'),
   ('celebration_gan','losar-tibetansikkimese-new-year'),
   ('celebration_mon','losar-tibetan-new-year-dharamshala')]
assigned={}
for sub,slug in M:
    hits=[p for fn,p in files.items() if sub in fn.lower()]
    if len(hits)!=1:
        print('ABORT ambiguous/missing for', sub, '->', [os.path.basename(h) for h in hits]); sys.exit(2)
    assigned[slug]=hits[0]
if len(set(assigned.values()))!=5:
    print('ABORT duplicate file assignment'); sys.exit(3)
for slug,src in assigned.items():
    shutil.copyfile(src, os.path.join(viddir, slug+'.mp4'))
    print('OK ', slug, '<=', os.path.basename(src))
today=datetime.date.today().isoformat()
inbox=os.path.join(base,'_inbox',f'acct3_{today}')
os.makedirs(inbox, exist_ok=True)
shutil.move(zp, os.path.join(inbox,'download.zip'))
print('moved zip ->', inbox, '| DONE 5/5')

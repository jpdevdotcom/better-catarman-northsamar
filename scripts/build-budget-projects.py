"""Generates app/data/budgetProjects.ts from the BetterGov budget API and the saved DPWH snapshot.

The DPWH API is behind a browser check: open DPWH_URL in a browser and save it as
data-sources/dpwh-nep-2027-ns1-deo.json.

Run:  python3 -I scripts/build-budget-projects.py [--refresh]
"""
import json, pathlib, re, sys, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / 'data-sources/bettergov-budget-2027-catarman.json'
RAW_GAA = ROOT / 'data-sources/bettergov-gaa-2020-2026-catarman.json'
BASE = 'https://budget.bettergov.ph/api/v1'
RAW_DPWH = ROOT / 'data-sources/dpwh-nep-2027-ns1-deo.json'
DPWH_URL = ('https://api.transparency.dpwh.gov.ph/nep/projects?page=1&limit=100&region=Region+VIII'
            '&office=Northern+Samar+1st+District+Engineering+Office&fiscalYear=2027')
IN_CATARMAN = re.compile(r'Catarman,?\s*(N\.|Northern)\s*Samar', re.I)
OUT = ROOT / 'app/data/budgetProjects.ts'
API = 'https://budget.bettergov.ph/api/v1/hgab/2027/datasets/{key}/projects?q=catarman&limit=200'
DATASETS = ['dpwh', 'fmr', 'hfep', 'nia']
AGENCY = {'dpwh': 'DPWH', 'fmr': 'DA farm-to-market roads', 'hfep': 'DOH health facilities', 'nia': 'NIA irrigation'}


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'BetterCatarman data build'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def fetch():
    raw = {}
    for key in DATASETS:
        body = get(API.format(key=key))
        if body['data']['next_offset'] is not None:
            sys.exit(f'{key}: more than 200 rows, add paging')
        raw[key] = body
    RAW.write_text(json.dumps(raw, ensure_ascii=False, indent=1) + '\n')


def fetch_gaa():
    departments = get(f'{BASE}/gaa/departments')['data']
    out = {'departments': {d['id']: d['description'] for d in departments}, 'rows': []}
    for d in departments:
        cursor = None
        while True:
            q = {'q': 'catarman', 'limit': 500, **({'cursor': cursor} if cursor else {})}
            body = get(f"{BASE}/gaa/departments/{d['id']}/programs?{urllib.parse.urlencode(q)}")
            out['rows'] += body['data']
            cursor = body.get('next_cursor')
            if not cursor:
                break
    RAW_GAA.write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n')


def kind(title):
    if re.search(r'Catarman,\s*Northern Samar', title, re.I) or title.startswith('Catarman '):
        return 'town'
    if re.search(r'Catarman(-\w+)? Rd|-Catarman Rd', title):
        return 'road'
    return None


if '--refresh' in sys.argv or not RAW.exists():
    fetch()
if '--refresh' in sys.argv or not RAW_GAA.exists():
    fetch_gaa()
raw = json.loads(RAW.read_text())
gaa = json.loads(RAW_GAA.read_text())

enacted = []
for r in gaa['rows']:
    title = re.sub(r'\s+', ' ', r['name']).strip()
    if not IN_CATARMAN.search(title):
        continue
    amounts = {y: v['amount'] for y, v in r['years'].items() if v['amount'] > 0}
    if amounts:
        dept = gaa['departments'][r['department_id']]
        enacted.append({'title': title, 'department': re.sub(r'^Department of ', '', dept), 'amounts': amounts})
enacted.sort(key=lambda p: -max(p['amounts'].values()))
gaa_years = sorted({int(y) for p in enacted for y in p['amounts']})

projects, unsorted = [], []
for key, body in raw.items():
    for r in body['data']['rows']:
        title = r['title'].strip()
        named = re.search(r'Catarman,\s*Northern Samar', title, re.I)
        if not named and (r['region_key'] != 'VIII' or 'Camiguin' in title or 'Cebu' in title):
            continue
        k = kind(title)
        if k is None:
            unsorted.append(title)
            continue
        projects.append({
            'id': r['id'],
            'kind': k,
            'agency': AGENCY[key],
            'title': title,
            'program': r['program'],
            'activity': r['pap'],
            'office': r['office'],
            'nep': r['nep_php'],
            'house': r['hgab3_php'],
            'change': r['group_label'],
            'unconfirmed': r['held'],
            'url': r['url'],
            'pdf': {k2: v for k2, v in (r.get('pdf_url') or {}).items() if k2 in ('nep', 'hgab3') and v},
        })

if unsorted:
    sys.exit('Rows that are neither in town nor on a Catarman road, sort them by hand:\n  ' + '\n  '.join(unsorted))

norm = lambda s: re.sub(r'[^a-z0-9]', '', s.lower())
dpwh_office_wide, dpwh_saved = [], None
if RAW_DPWH.exists():
    body = json.loads(RAW_DPWH.read_text())['data']
    if body['pagination']['hasNext']:
        sys.exit(f'{RAW_DPWH.name} has only page 1 of {body["pagination"]["totalPages"]}. Save it with limit=100.')
    dpwh = {norm(r['projectName']): r for r in body['data']}
    problems = []
    for p in projects:
        r = dpwh.get(norm(p['title']))
        p['dpwh'] = {'code': r['code'], 'amount': r['amount'] * 1000} if r else None
        if r and r['amount'] * 1000 != p['nep']:
            problems.append(f"amount differs: DPWH ₱{r['amount'] * 1000:,} vs NEP ₱{p['nep'] or 0:,}: {p['title']}")
    listed = {norm(p['title']) for p in projects}
    for key, r in dpwh.items():
        title = r['projectName']
        if key in listed:
            continue
        if kind(title):
            problems.append(f"on DPWH but not in this list: {title}")
        elif 'District Engineering Office' in title or ' DEO' in title:
            dpwh_office_wide.append({'code': r['code'], 'title': title, 'amount': r['amount'] * 1000})
    if problems:
        sys.exit('DPWH check, look at these before publishing:\n  ' + '\n  '.join(problems))
    dpwh_saved = __import__('datetime').date.fromtimestamp(RAW_DPWH.stat().st_mtime).isoformat()
else:
    for p in projects:
        p['dpwh'] = None

amount = lambda p: p['house'] if p['house'] is not None else (p['nep'] or 0)
projects.sort(key=lambda p: (p['kind'] != 'town', -amount(p)))
meta = raw['dpwh']['meta']

OUT.write_text(f'''// Generated by scripts/build-budget-projects.py — edit that script, not this file.

export interface BudgetProject {{
  id: string
  kind: 'town' | 'road'
  agency: string
  title: string
  program: string | null
  activity: string | null
  office: string | null
  nep: number | null
  house: number | null
  change: string
  unconfirmed: boolean
  url: string
  pdf: {{ nep?: string, hgab3?: string }}
  dpwh: {{ code: string, amount: number }} | null
}}

export const dpwhSource = {{
  name: 'DPWH Transparency Portal, 2027 proposed projects',
  url: 'https://transparency.dpwh.gov.ph/nep',
  office: 'Northern Samar 1st District Engineering Office',
  savedOn: {json.dumps(dpwh_saved)},
  officeWide: {json.dumps(dpwh_office_wide, ensure_ascii=False)},
}}

export const budgetSource = {{
  name: 'PH Budget Data API, FY2027 House bill against the NEP',
  publisher: 'BetterGov.PH (CC BY 4.0)',
  url: 'https://budget.bettergov.ph/hgab/2027',
  docs: 'https://budget.bettergov.ph/docs',
  builtAt: {json.dumps(meta['built_at'][:10])},
  notice: {json.dumps(meta['notice'], ensure_ascii=False)},
}}

export const budgetProjects: BudgetProject[] = {json.dumps(projects, ensure_ascii=False, indent=2)}

export interface EnactedProject {{
  title: string
  department: string
  amounts: Record<string, number>
}}

export const enactedSource = {{
  name: 'PH Budget Data API, General Appropriations Acts {gaa_years[0]} to {gaa_years[-1]}',
  publisher: 'BetterGov.PH (CC BY 4.0)',
  url: 'https://budget.bettergov.ph/',
}}

export const enactedYears: number[] = {json.dumps(gaa_years)}

export const enactedProjects: EnactedProject[] = {json.dumps(enacted, ensure_ascii=False, indent=2)}
''')
print(f"{len(projects)} projects for 2027 ({sum(p['kind'] == 'town' for p in projects)} in town), "
      f"{len(enacted)} in the {gaa_years[0]}-{gaa_years[-1]} budgets -> {OUT.relative_to(ROOT)}")

#!/usr/bin/env node
/**
 * Areas of India for the /charter pages: every state, district, pincode and
 * the localities (post office areas) under each pincode.
 *
 *   npm run areas
 *
 * Sources (both kept out of git because of their size; see scripts/data/README-areas.md):
 * - India Post "All India Pincode Directory" (data.gov.in, Government Open
 *   Data Licence - India): office name, pincode, district, state, latitude,
 *   longitude. This is the source of truth for which district a pincode is in.
 * - An older all-India pincode list (PDF, converted to text with
 *   `pdftotext -layout`). Adds locality names people still search for (e.g.
 *   "Subzi Mandi", "Timarpur" for 110007) that the current directory no
 *   longer lists. A name is only added to a pincode the directory already has.
 *
 * Writes:
 * - src/data/areas/index.json      states and districts (small; used by pages)
 * - src/data/areas/<state>.json    each district's pincodes and localities
 * - public/area-search/pin/<3>.json  pincode lookup, by first three digits
 * - public/area-search/name/<2>.json locality lookup, by first two letters
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const CSV = join(ROOT, 'scripts/data/india-post-pincodes.csv');
const PDF_TEXT = join(ROOT, 'scripts/data/pincode-list-legacy.txt');
const OUT_DATA = join(ROOT, 'src/data/areas');
const OUT_SEARCH = join(ROOT, 'public/area-search');

if (!existsSync(CSV)) {
  console.log('areas: source CSV not present, keeping the committed data');
  process.exit(0);
}

function parseLine(line) {
  const out = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    if (c === '"') {
      if (quoted && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else quoted = !quoted;
    } else if (c === ',' && !quoted) {
      out.push(cur);
      cur = '';
    } else cur += c;
  }
  out.push(cur);
  return out;
}

const SMALL = new Set(['and', 'of', 'the']);
function titleCase(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w, i) =>
      i > 0 && SMALL.has(w) ? w : w.replace(/(^|[(\-./])([a-z])/g, (_, a, b) => a + b.toUpperCase()),
    )
    .join(' ');
}
const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const key = (t) => t.toUpperCase().replace(/[^A-Z0-9]/g, '');

/** "Padam Nagar SO" -> "Padam Nagar"; keeps GPO and names in brackets. */
function cleanOffice(name) {
  // The office type (BO/SO/HO) and anything after it, e.g. "SO North Delhi".
  const bare = name.replace(/\s+[BSH]\.?O\.?(?=\s|$).*$/i, '').trim().replace(/\s+/g, ' ');
  if (/[a-z]/.test(bare)) return bare;
  // All-caps initialisms (RCAO, CRPF) stay as they are.
  return /^[A-Z.]{2,6}$/.test(bare) ? bare : titleCase(bare);
}

function stateName(raw) {
  if (raw === 'THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU') {
    return 'Dadra and Nagar Haveli and Daman and Diu';
  }
  return titleCase(raw);
}
function districtName(raw, state) {
  const name = titleCase(raw);
  if (state === 'Delhi' && !/delhi|shahdara/i.test(name)) return `${name} Delhi`;
  return name;
}

// ------------------------------------------------------------------ directory
const lines = readFileSync(CSV, 'utf8').split(/\r?\n/).filter(Boolean);
const head = parseLine(lines[0]);
const col = Object.fromEntries(head.map((h, i) => [h, i]));

/** India Post facilities that are not places people live or search for. */
const FACILITY = /nodal|\bndc\b|ecom|parcel|\bbpc\b|speed ?post|\brms\b|mail business|sorting|\bich\b|\bhub\b|\bmbc\b|delivery cent|mechanized/i;
const valid = (lat, lon) => lat > 6 && lat < 37.5 && lon > 68 && lon < 98;
/** pin -> { areas: Map<key, name>, votes: Map<districtKey, n>, coords: [] } */
const pins = new Map();
/** districtKey -> { state, district } */
const districts = new Map();

for (const line of lines.slice(1)) {
  const r = parseLine(line);
  const pin = r[col.Pincode];
  if (!/^\d{6}$/.test(pin)) continue;
  const state = stateName(r[col.StateName]);
  const district = districtName(r[col.District], state);
  const dKey = `${slugify(state)}/${slugify(district)}`;
  districts.set(dKey, { state, district });
  const entry = pins.get(pin) ?? { areas: new Map(), votes: new Map(), coords: [] };
  const office = cleanOffice(r[col.OfficeName]);
  if (!FACILITY.test(office)) entry.areas.set(key(office), office);
  entry.votes.set(dKey, (entry.votes.get(dKey) ?? 0) + 1);
  const lat = Number(r[col.Latitude]);
  const lon = Number(r[col.Longitude]);
  if (valid(lat, lon)) entry.coords.push([lat, lon]);
  pins.set(pin, entry);
}

// ------------------------------------------------------------ legacy PDF text
let added = 0;
if (existsSync(PDF_TEXT)) {
  let pending = '';
  for (const raw of readFileSync(PDF_TEXT, 'utf8').split(/\r?\n/)) {
    const m = raw.match(/^\s{0,4}(\S.*?)?\s{2,}(\d{6})\s{2,}/);
    if (m) {
      const name = `${pending} ${m[1] ?? ''}`.trim();
      pending = '';
      const entry = pins.get(m[2]);
      if (!name || !entry) continue;
      const k = key(name);
      if (k.length < 3 || entry.areas.has(k) || FACILITY.test(name)) continue;
      entry.areas.set(k, titleCase(name));
      added += 1;
    } else if (/^\s{0,4}\S/.test(raw) && !/PIN CODE|POST OFFICE NAME/.test(raw)) {
      pending = raw.trim(); // a name wrapped onto two lines
    } else {
      pending = '';
    }
  }
}

// ------------------------------------------------------------------- outputs
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : null;
};
const round = (x) => (x === null ? null : Number(x.toFixed(4)));

/** stateSlug -> { name, districts: Map<districtSlug, {...}> } */
const states = new Map();
for (const [pin, entry] of pins) {
  const dKey = [...entry.votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const { state, district } = districts.get(dKey);
  const [sSlug, dSlug] = dKey.split('/');
  const s = states.get(sSlug) ?? { name: state, districts: new Map() };
  const d = s.districts.get(dSlug) ?? { name: district, pins: [] };
  d.pins.push({
    pin,
    areas: [...entry.areas.values()].sort((a, b) => a.localeCompare(b)),
    lat: round(median(entry.coords.map((c) => c[0]))),
    lon: round(median(entry.coords.map((c) => c[1]))),
  });
  s.districts.set(dSlug, d);
  states.set(sSlug, s);
}

rmSync(OUT_DATA, { recursive: true, force: true });
rmSync(OUT_SEARCH, { recursive: true, force: true });
mkdirSync(OUT_DATA, { recursive: true });
mkdirSync(join(OUT_SEARCH, 'pin'), { recursive: true });
mkdirSync(join(OUT_SEARCH, 'name'), { recursive: true });

const index = [];
/** [stateSlug, districtSlug, districtName, stateName]; search files refer to it by position. */
const districtList = [];
const byPin3 = new Map();
const byName2 = new Map();
let areaCount = 0;

for (const [sSlug, s] of [...states.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name))) {
  const stateDistricts = [];
  const summaries = [];
  for (const [dSlug, d] of [...s.districts.entries()].sort((a, b) =>
    a[1].name.localeCompare(b[1].name),
  )) {
    d.pins.sort((a, b) => a.pin.localeCompare(b.pin));
    // District centre: median of its pincodes, then drop pincodes whose
    // coordinates are clearly misfiled (over 250 km away) and take it again.
    const pts = d.pins.filter((p) => p.lat !== null);
    let lat = median(pts.map((p) => p.lat));
    let lon = median(pts.map((p) => p.lon));
    if (lat !== null) {
      const near = pts.filter((p) => Math.hypot(p.lat - lat, p.lon - lon) < 2.3);
      if (near.length) {
        lat = median(near.map((p) => p.lat));
        lon = median(near.map((p) => p.lon));
      }
    }
    const areas = d.pins.reduce((n, p) => n + p.areas.length, 0);
    areaCount += areas;
    stateDistricts.push({ slug: dSlug, name: d.name, lat: round(lat), lon: round(lon), pins: d.pins });
    summaries.push({ slug: dSlug, name: d.name, pins: d.pins.length, areas, lat: round(lat), lon: round(lon) });
    const dId = districtList.push([sSlug, dSlug, d.name, s.name]) - 1;
    for (const p of d.pins) {
      const k3 = p.pin.slice(0, 3);
      const bucket = byPin3.get(k3) ?? {};
      bucket[p.pin] = [dId, ...p.areas];
      byPin3.set(k3, bucket);
      for (const a of p.areas) {
        const k2 = key(a).slice(0, 2).toLowerCase();
        if (k2.length < 2) continue;
        const list = byName2.get(k2) ?? [];
        list.push([a, p.pin, dId]);
        byName2.set(k2, list);
      }
    }
  }
  index.push({ slug: sSlug, name: s.name, districts: summaries });
  writeFileSync(join(OUT_DATA, `${sSlug}.json`), JSON.stringify({ slug: sSlug, name: s.name, districts: stateDistricts }));
}

writeFileSync(
  join(OUT_DATA, 'index.json'),
  JSON.stringify({
    source: {
      primary: 'India Post, All India Pincode Directory (data.gov.in), Government Open Data Licence - India',
      secondary: 'All India Pin Code List (legacy India Post list) for additional locality names',
    },
    states: index,
  }),
);
writeFileSync(join(OUT_SEARCH, 'districts.json'), JSON.stringify(districtList));
for (const [k, v] of byPin3) writeFileSync(join(OUT_SEARCH, 'pin', `${k}.json`), JSON.stringify(v));
for (const [k, v] of byName2) {
  v.sort((a, b) => a[0].localeCompare(b[0]));
  writeFileSync(join(OUT_SEARCH, 'name', `${k}.json`), JSON.stringify(v));
}

console.log(
  `areas: ${states.size} states, ${index.reduce((n, s) => n + s.districts.length, 0)} districts, ${pins.size} pincodes, ${areaCount} localities (${added} from the legacy list); search files: ${byPin3.size} pin + ${byName2.size} name`,
);

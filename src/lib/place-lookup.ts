/**
 * Client-side lookup of India Post localities and pincodes, for the quote
 * form. Reads the same small static files as the area search (built by
 * scripts/build-areas.mjs) and fetches only what the typed text needs: three
 * digits of a pincode, or the first two letters of a place name.
 *
 * A place's position is its pincode's centre, which is what the form needs
 * to suggest the nearest airports.
 */
export interface Place {
  readonly name: string;
  readonly pin: string;
  readonly district: string;
  readonly state: string;
  readonly lat: number | null;
  readonly lon: number | null;
  /** "Kamla Nagar, 110007 — North Delhi, Delhi": the value the form sends. */
  readonly label: string;
}

type DistrictRow = [stateSlug: string, districtSlug: string, district: string, state: string];
type PinBucket = Record<string, [number, number | null, number | null, ...string[]]>;
type NameRow = [name: string, pin: string, districtId: number, slug: string];

const files = new Map<string, Promise<unknown>>();
function load<T>(path: string): Promise<T | null> {
  if (!files.has(path)) {
    files.set(
      path,
      fetch(path)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    );
  }
  return files.get(path) as Promise<T | null>;
}
const norm = (t: string) => t.toUpperCase().replace(/[^A-Z0-9]/g, '');

function place(name: string, pin: string, d: DistrictRow, lat: number | null, lon: number | null): Place {
  return { name, pin, district: d[2], state: d[3], lat, lon, label: `${name}, ${pin} — ${d[2]}, ${d[3]}` };
}

/**
 * Places matching what was typed: a pincode (3 to 6 digits) gives the areas
 * under it; words give localities whose name starts with, then contains, them.
 */
export async function findPlaces(query: string, limit = 5): Promise<Place[]> {
  const q = query.trim();
  const districts = await load<DistrictRow[]>('/area-search/districts.json');
  if (!districts) return [];

  const digits = q.replace(/\s/g, '');
  if (/^\d{3,6}$/.test(digits)) {
    const bucket = await load<PinBucket>(`/area-search/pin/${digits.slice(0, 3)}.json`);
    if (!bucket) return [];
    const out: Place[] = [];
    for (const [pin, [id, lat, lon, ...areas]] of Object.entries(bucket)) {
      if (!pin.startsWith(digits)) continue;
      const d = districts[id];
      if (!d) continue;
      for (const name of areas.slice(0, digits.length === 6 ? limit : 1)) out.push(place(name, pin, d, lat, lon));
      if (out.length >= limit) break;
    }
    return out.slice(0, limit);
  }

  const k = norm(q);
  if (k.length < 3 || /^\d/.test(k)) return [];
  const rows = await load<NameRow[]>(`/area-search/name/${k.slice(0, 2).toLowerCase()}.json`);
  if (!rows) return [];
  const starts = rows.filter((r) => norm(r[0]).startsWith(k));
  const inside = starts.length < limit ? rows.filter((r) => !norm(r[0]).startsWith(k) && norm(r[0]).includes(k)) : [];
  const picked = [...starts, ...inside].slice(0, limit);
  // Positions come from the pincode files; fetch each needed file once.
  const buckets = new Map<string, PinBucket | null>();
  for (const [, pin] of picked) {
    const key = pin.slice(0, 3);
    if (!buckets.has(key)) buckets.set(key, await load<PinBucket>(`/area-search/pin/${key}.json`));
  }
  return picked.flatMap(([name, pin, id]) => {
    const d = districts[id];
    if (!d) return [];
    const entry = buckets.get(pin.slice(0, 3))?.[pin];
    return [place(name, pin, d, entry?.[1] ?? null, entry?.[2] ?? null)];
  });
}

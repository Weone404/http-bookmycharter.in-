import { absoluteUrl } from '@/lib/site';
import { AREA_SITEMAP_FILES, AREAS_PER_SITEMAP as PER_FILE, STATES, areaHref, districtsOf, pinHref } from '@/lib/areas';

/**
 * Sitemaps for the pincode and area pages, which are too many for the main
 * sitemap (a sitemap holds at most 50,000 URLs). Listed in robots.txt.
 *   /sitemaps/pincodes   every pincode page
 *   /sitemaps/areas-N    area pages, 45,000 per file
 */
const LASTMOD = '2026-09-29';

async function allUrls() {
  const pins: string[] = [];
  const areas: string[] = [];
  for (const state of STATES) {
    for (const district of await districtsOf(state.slug)) {
      for (const pin of district.pins) {
        pins.push(absoluteUrl(pinHref(state, district, pin.pin)));
        for (const area of pin.areas) areas.push(absoluteUrl(areaHref(state, district, pin.pin, area)));
      }
    }
  }
  return { pins, areas };
}


export function generateStaticParams() {
  return [
    { name: 'pincodes' },
    ...Array.from({ length: AREA_SITEMAP_FILES }, (_, i) => ({ name: `areas-${i + 1}` })),
  ];
}
export const dynamic = 'force-static';
export const dynamicParams = false;

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const { pins, areas } = await allUrls();
  let urls: string[] = [];
  if (name === 'pincodes') urls = pins;
  else {
    const n = Number(/^areas-(\d+)$/.exec(name)?.[1] ?? 0);
    urls = n > 0 ? areas.slice((n - 1) * PER_FILE, n * PER_FILE) : [];
  }
  if (urls.length === 0) return new Response('Not found', { status: 404 });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `<url><loc>${u}</loc><lastmod>${LASTMOD}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

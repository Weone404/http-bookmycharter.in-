import { SITE, LAST_MODIFIED } from '../lib/site';
import { privateAviationPageOrder } from '../data/privateAviationPages';

// Real per-page dates. Uniform "now" timestamps get discounted as fake freshness.
const PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/kedarnath-helicopter-yatra', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/char-dham-yatra-by-helicopter', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/helicopter-flower-dropping', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/private-helicopter-charter', priority: 0.8, changeFrequency: 'monthly' },
  ...privateAviationPageOrder.map((slug) => ({
    path: `/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  })),
  { path: '/fleet', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/fleet/avanti-180', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/fleet/cessna-caravan-208b', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/fleet/cessna-citation-mustang', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/fleet/challenger-604', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/fleet/challenger-605', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/fleet/citation-525-a', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/blogs', priority: 0.7, changeFrequency: 'monthly' },
];

export default function sitemap() {
  return PAGES.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: new Date(LAST_MODIFIED[p.path]),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

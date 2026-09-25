import { indexableRoutes, type RouteCluster } from '@/lib/routes';
import { ADDRESS, CONTACT, SITE, absoluteUrl } from '@/lib/site';
import { INSIGHTS } from '@/data/insights';
import { PUBLISHED_AIRCRAFT } from '@/data/aircraft';
import { HOME_FAQS } from '@/data/faqs';

/**
 * /llms.txt — a plain-text map of the site for AI answer engines (the
 * llmstxt.org convention). Built from the same registry and data as the
 * sitemap and the pages, so it cannot say anything the site does not.
 */
export const dynamic = 'force-static';

const GROUPS: readonly { heading: string; clusters: readonly RouteCluster[] }[] = [
  {
    heading: 'Charter services',
    clusters: ['private-charter', 'helicopter-charter', 'services', 'chardham'],
  },
  { heading: 'Cost and booking', clusters: ['pricing', 'empty-leg', 'conversion'] },
  { heading: 'Aircraft', clusters: ['aircraft'] },
  { heading: 'Places and routes', clusters: ['destinations', 'routes'] },
  { heading: 'Company', clusters: ['company', 'insights'] },
];

export function GET() {
  const routes = indexableRoutes().filter((r) => r.path !== '/');
  const line = (title: string, path: string, description: string) =>
    `- [${title}](${absoluteUrl(path)}): ${description}`;

  const body = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name} is based in ${ADDRESS.locality}, ${ADDRESS.region}, India, and arranges charter flights across India. Phone and WhatsApp: ${CONTACT.phoneDisplay}. Email: ${CONTACT.email}.`,
    'Charter prices are quoted per trip. The site publishes no fixed prices, because the cost depends on the aircraft, billed hours, positioning, airport fees, crew and taxes for that trip.',
    '',
    ...GROUPS.flatMap((group) => {
      const items = routes.filter((r) => group.clusters.includes(r.cluster));
      return items.length
        ? [`## ${group.heading}`, '', ...items.map((r) => line(r.title, r.path, r.description)), '']
        : [];
    }),
    '## Guides',
    '',
    ...INSIGHTS.map((i) => line(i.title, i.canonical, i.summary)),
    '',
    '## Aircraft types',
    '',
    ...PUBLISHED_AIRCRAFT.map((a) => `- [${a.name}](${absoluteUrl(a.href)})`),
    '',
    '## Common questions',
    '',
    ...HOME_FAQS.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, '']),
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

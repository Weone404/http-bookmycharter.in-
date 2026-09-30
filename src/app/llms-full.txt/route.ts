import { ADDRESS, CONTACT, SITE, absoluteUrl } from '@/lib/site';
import { SERVICES } from '@/data/services';
import { DESTINATION_PAGES } from '@/data/destinations';
import { CHARTER_ROUTES, routeHref } from '@/data/charter-routes';
import { HELICOPTER_CITIES, helicopterCityHref } from '@/data/helicopter-cities';
import { HOME_FAQS } from '@/data/faqs';
import { INSIGHTS } from '@/data/insights';
import { classFits, formatKm, greatCircleKm } from '@/lib/route-math';
import { totals } from '@/lib/areas';

/**
 * /llms-full.txt — the site's substance as one plain-text file for AI
 * systems: every service and city page's definition and questions, and the
 * computed facts of every route page. /llms.txt is the short map; this is the
 * full text. Built from the same data as the pages.
 */
export const dynamic = 'force-static';

const faq = (q: string, a: string) => [`Q: ${q}`, `A: ${a}`, ''];

export function GET() {
  const out: string[] = [
    `# ${SITE.name} — full text`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name}, ${ADDRESS.locality}, ${ADDRESS.region}, India. Phone and WhatsApp: ${CONTACT.phoneDisplay}. Email: ${CONTACT.email}. Website: ${SITE.url}`,
    'Charter prices are quoted per trip; the site publishes no fixed prices. Flying times on the site are estimates from a stated rule (straight-line distance plus 10%, divided by typical cruise speed, plus 25 minutes), not schedules.',
    `Coverage: pages for ${totals.states} states and union territories, ${totals.districts} districts, ${totals.pins} pincodes and ${totals.areas} localities, each with its nearest airports (${absoluteUrl('/charter')}).`,
    '',
    '## Common questions',
    '',
    ...HOME_FAQS.flatMap((f) => faq(f.question, f.answer)),
  ];

  for (const s of SERVICES) {
    out.push(`## ${s.headline}`, '', `URL: ${absoluteUrl(s.canonical)}`, '', s.summary, '');
    out.push(...s.definition.flatMap((p) => [p, '']));
    out.push(...s.faqs.flatMap((f) => faq(f.question, f.answer)));
  }

  for (const d of DESTINATION_PAGES) {
    out.push(`## ${d.title}`, '', `URL: ${absoluteUrl(d.canonical)}`, '', d.summary, '');
    out.push(...d.body.flatMap((p) => [p, '']));
    out.push(...d.faqs.flatMap((f) => faq(f.question, f.answer)));
  }

  for (const c of HELICOPTER_CITIES) {
    out.push(`## Helicopter Charter in ${c.city}`, '', `URL: ${absoluteUrl(helicopterCityHref(c))}`, '', c.summary, '');
    out.push(...c.body.flatMap((p) => [p, '']));
    out.push(...c.faqs.flatMap((f) => faq(f.question, f.answer)));
  }

  out.push('## Charter routes (computed)', '');
  for (const r of CHARTER_ROUTES) {
    const km = greatCircleKm(r.from.icao, r.to.icao);
    if (km === null) continue;
    const fits = classFits(km);
    const jet = fits.find((f) => f.id === 'midsize-jets')?.time;
    const heli = fits.find((f) => f.id === 'helicopters')?.time;
    out.push(
      `- ${r.from.city} to ${r.to.city} (${absoluteUrl(routeHref(r))}): ${formatKm(km)} straight line; about ${jet ?? 'n/a'} by midsize jet${heli ? `; about ${heli} by helicopter` : ''}. ${r.note.join(' ')}`,
    );
  }
  out.push('', '## Guides', '');
  out.push(...INSIGHTS.map((i) => `- ${i.title} (${absoluteUrl(i.canonical)}): ${i.summary}`), '');

  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

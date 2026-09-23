import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { ADDRESS, CONTACT, whatsappLink } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/content/PageIntro';
import { RelatedLinks } from '@/components/content/RelatedLinks';

const PATH = '/contact' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function ContactPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Contact route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <PageIntro
          path={PATH}
          title="Contact"
          summary="Call or message with the route, the date and the number of passengers, and we can usually tell you within a short time what is realistic and what it is likely to involve."
        />

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Phone className="h-5 w-5 text-[var(--color-accent-strong)]" aria-hidden="true" />
            <h2 className="mt-4 text-[length:var(--text-h3)] font-semibold tracking-tight">Phone</h2>
            <p className="mt-2">
              <a href={`tel:${CONTACT.phone}`} data-track="call_click" className="numeric font-medium">
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
              Complicated itineraries are faster to explain than to type.
            </p>
          </div>

          <div>
            <MessageCircle className="h-5 w-5 text-[var(--color-accent-strong)]" aria-hidden="true" />
            <h2 className="mt-4 text-[length:var(--text-h3)] font-semibold tracking-tight">WhatsApp</h2>
            <p className="mt-2">
              <a
                href={whatsappLink('Hello, I would like to ask about a charter.')}
                data-track="whatsapp_click"
                className="numeric font-medium"
              >
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
              Useful for sending dates and details in writing.
            </p>
          </div>

          <div>
            <Mail className="h-5 w-5 text-[var(--color-accent-strong)]" aria-hidden="true" />
            <h2 className="mt-4 text-[length:var(--text-h3)] font-semibold tracking-tight">Email</h2>
            <p className="mt-2">
              <a href={`mailto:${CONTACT.email}`} className="font-medium">
                {CONTACT.email}
              </a>
            </p>
            <p className="mt-2 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
              Best for detailed requirements and documents.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-ink)]/15 pt-8">
          <MapPin className="h-5 w-5 text-[var(--color-accent-strong)]" aria-hidden="true" />
          <h2 className="mt-4 text-[length:var(--text-h3)] font-semibold tracking-tight">Office</h2>
          <address className="mt-3 not-italic leading-relaxed text-[var(--color-ink-muted)]">
            {ADDRESS.street}
            <br />
            {ADDRESS.locality}
            <br />
            {ADDRESS.region} {ADDRESS.postalCode}, India
          </address>
        </div>

        <div className="mt-10">
          <Button href="/request-a-charter">Send a charter request instead</Button>
        </div>
      </Section>

      <Section ground="ivory" width="wide" className="pt-0">
        <RelatedLinks
          links={[
            { label: 'Request a Charter', href: '/request-a-charter', description: 'Route, date, passengers' },
            { label: 'How It Works', href: '/how-it-works', description: 'What happens after you enquire' },
            { label: 'Charter Pricing', href: '/pricing', description: 'What to ask when comparing quotes' },
            { label: 'About', href: '/about', description: 'How we handle claims' },
          ]}
        />
      </Section>

      <JsonLd
        json={graph([
          webPageSchema({ name: route.title, description: route.description, path: PATH }),
          breadcrumbSchema(PATH),
        ])}
      />
    </>
  );
}

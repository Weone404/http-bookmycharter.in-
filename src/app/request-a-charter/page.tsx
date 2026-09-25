import type { Metadata } from 'next';
import { MessageCircle, Phone } from 'lucide-react';
import { metadataForRoute } from '@/lib/metadata';
import { getRoute } from '@/lib/routes';
import { CONTACT, whatsappLink } from '@/lib/site';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CharterRequestForm } from '@/components/booking/CharterRequestForm';
import { HOW_IT_WORKS } from '@/data/home';

const PATH = '/request-a-charter' as const;

export const metadata: Metadata = metadataForRoute(PATH);

export default function RequestACharterPage() {
  const route = getRoute(PATH);
  if (!route) throw new Error('Request route missing from the registry.');

  return (
    <>
      <Section ground="ivory" width="wide">
        <Breadcrumbs path={PATH} />

        <div className="mt-8 grid gap-14 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <h1 className="text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Request a Charter Quote
            </h1>
            <p className="mt-5 max-w-[60ch] text-[length:var(--text-lead)] text-[var(--color-ink-muted)]">
              To request a private jet or helicopter charter quote, share your route, date and
              number of passengers. Everything else is optional and can follow later.
            </p>

            <div className="mt-10">
              <CharterRequestForm />
            </div>
          </div>

          <aside className="lg:pt-4">
            <div className="border-t border-[var(--color-ink)]/15 pt-6">
              <h2 className="text-[length:var(--text-h3)] font-medium">
                Prefer to talk to someone?
              </h2>
              <p className="mt-3 text-[length:var(--text-small)] text-[var(--color-ink-muted)]">
                Complex trips are often quicker to explain than to type.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track="call_click"
                  className="inline-flex items-center gap-2.5 font-medium"
                >
                  <Phone className="h-4 w-4 text-[var(--color-accent-strong)]" aria-hidden="true" />
                  <span className="numeric">{CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={whatsappLink('Hello, I would like to request a charter.')}
                  data-track="whatsapp_click"
                  className="inline-flex items-center gap-2.5 font-medium"
                >
                  <MessageCircle
                    className="h-4 w-4 text-[var(--color-accent-strong)]"
                    aria-hidden="true"
                  />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-10 border-t border-[var(--color-ink)]/15 pt-6">
              <h2 className="text-[length:var(--text-h3)] font-medium">What happens next</h2>
              <ol className="mt-5 space-y-4 text-[length:var(--text-small)]">
                {HOW_IT_WORKS.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="numeric shrink-0 font-semibold text-[var(--color-accent-strong)]">
                      {step.step}
                    </span>
                    <span className="text-[var(--color-ink-muted)]">{step.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
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

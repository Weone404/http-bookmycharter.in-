import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { RelatedLinks } from '@/components/content/RelatedLinks';

/**
 * A 404 that helps rather than apologises.
 *
 * No canonical, no indexable metadata — a not-found response should not
 * advertise itself as a page.
 */
export default function NotFound() {
  return (
    <Section ground="midnight" width="wide">
      <p className="text-[length:var(--text-micro)] uppercase tracking-[0.2em] text-[var(--color-cyan-accent)]">
        Error 404
      </p>
      <h1 className="mt-5 max-w-[16ch] text-[length:var(--text-h1)] font-semibold leading-[1.05] tracking-[-0.02em]">
        Flight path not found.
      </h1>
      <p className="mt-6 max-w-[56ch] text-[length:var(--text-lead)] text-[var(--color-ink-inverse-muted)]">
        The page you were looking for does not exist, or has moved since the link was made.
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Button href="/">
          Return home
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button href="/request-a-charter" variant="secondary">
          Request a charter
        </Button>
      </div>

      <div className="mt-16">
        <RelatedLinks
          heading="Where you may have been heading"
          links={[
            { label: 'Private Charter', href: '/private-charter', description: 'Whole-aircraft hire' },
            { label: 'Helicopter Charter', href: '/helicopter-charter', description: 'Point-to-point rotary' },
            { label: 'Aircraft & Fleet', href: '/aircraft', description: 'Types and typical figures' },
            { label: 'Charter Pricing', href: '/pricing', description: 'What a trip costs' },
            { label: 'Empty Legs', href: '/empty-leg-charter', description: 'Repositioning flights' },
            { label: 'Aviation Insights', href: '/insights', description: 'Guides to how charter works' },
          ]}
        />
      </div>
    </Section>
  );
}

import Link from 'next/link';
import FleetOptionsSection from '../../components/FleetOptionsSection';
import { getFleetImageCategories } from '../../lib/fleetImages';
import { pageMetadata } from '../../lib/site';
import { JsonLd } from '../../components/JsonLd';
import { graph, organizationSchema, webPageSchema, breadcrumbSchema } from '../../lib/schema';

const PATH = '/fleet';
const TITLE = 'Private Aircraft Fleet | Book My CharDham';
const DESC =
  'Explore private charter aircraft options for executive, VIP and regional travel across India. Enquire on +91 93556 11996.';

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function FleetPage() {
  const fleetCategories = getFleetImageCategories();
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Charter Aircraft Fleet', path: PATH },
          ]),
        ])}
      />
    <div className="w-full bg-[var(--background-subtle)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden border-b border-[var(--brand-luxury)]/20 bg-[var(--background-subtle)]">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 scale-[1.15]"
            src="https://www.youtube.com/embed/3ZdIlb6yh5Y?si=RkzeXw4MCcvxX9Mm&autoplay=1&mute=1&controls=0&loop=1&playlist=3ZdIlb6yh5Y&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-transparent" />
        </div>
        <div className="absolute inset-0 bg-[var(--brand-navy)]/40" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-10 lg:px-12 lg:py-32">
          <div className="max-w-3xl text-left">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--brand-navy)]">
              Private Aviation
            </span>
            <h1 className="text-4xl font-black uppercase tracking-[-0.04em] text-[var(--background-subtle)] sm:text-5xl lg:text-7xl">
              Charter Your Next Journey
            </h1>
            <div className="mt-8 flex justify-start">
              <Link
                href="#fleet-options"
                className="inline-flex items-center justify-center rounded-xs bg-[var(--brand-luxury)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-inverse)] transition-all duration-300 hover:bg-[var(--brand-luxury-hover)]"
              >
                Explore Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FleetOptionsSection categories={fleetCategories} />
    </div>
    </>
  );
}

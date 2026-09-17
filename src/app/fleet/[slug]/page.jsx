import Link from 'next/link';
import Image from 'next/image';
import { FaqSection } from '../../../components/FaqSection';
import { JsonLd } from '../../../components/JsonLd';
import { FLEET_DETAILS } from '../../../data/fleet';
import { breadcrumbSchema, faqSchema, graph, organizationSchema, webPageSchema } from '../../../lib/schema';
import { CONTACT, pageMetadata } from '../../../lib/site';

const PATH_PREFIX = '/fleet';
const fleetVideoUrls = {
  'cessna-caravan-208b': 'https://www.youtube.com/embed/VtlEOlhMJMg',
  'cessna-citation-mustang': 'https://www.youtube.com/embed/s5MqoLwnGrY',
  'challenger-604': 'https://www.youtube.com/embed/NiDwxkQ4ZHc',
  'challenger-605': 'https://www.youtube.com/embed/s_p4qLSUC2E',
  'citation-525-a': 'https://www.youtube.com/embed/_uALZI5qKsc',
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const detail = FLEET_DETAILS[slug];
  if (!detail) return undefined;

  return pageMetadata({
    title: detail.title,
    description: detail.description,
    path: `${PATH_PREFIX}/${detail.slug}`,
  });
}

export default async function FleetDetailPage({ params }) {
  const { slug } = await params;
  const detail = FLEET_DETAILS[slug];

  if (!detail) {
    const fleetVideoUrl = fleetVideoUrls[slug] || FLEET_DETAILS['avanti-180'].videoUrl;
    const videoId = fleetVideoUrl.split('/').pop();

    return (
      <div className="min-h-[60vh] bg-[#F3E9D0] text-[#6B4E3D]">
        <section className="relative overflow-hidden border-b border-[#A67C52]/20 bg-[#D9C7B8]">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 scale-[1.35]"
            src={`${fleetVideoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&playsinline=1`}
            title={`${slug.replace(/-/g, ' ')} background video`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="absolute inset-0 bg-[#1d120f]/55" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-10 lg:px-12 lg:py-32">
            <div className="max-w-3xl">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#E6D5C1]">
                Private Jet Charter
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-[#F3E9D0] sm:text-4xl">
                {slug.replace(/-/g, ' ')}
              </h1>
            </div>
          </div>
        </section>
        <div className="px-4 py-12 sm:px-6 md:px-10 lg:px-12">
          <div className="mx-auto max-w-3xl rounded-lg border border-[#A67C52]/20 bg-[#E6D5C1] p-8 shadow-sm">
            <p className="text-base leading-relaxed text-[#6B4E3D]/80">
              This aircraft profile page is ready for your real fleet data integration. Use this route to render detailed specs, pricing, aircraft gallery, and charter availability.
            </p>
            <Link
              href="/fleet"
              className="mt-8 inline-flex items-center rounded-xs bg-[#A67C52] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8B6639]"
            >
              Back to Fleet
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const path = `${PATH_PREFIX}/${detail.slug}`;
  const videoId = detail.videoUrl.split('/').pop();

  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: detail.title, description: detail.description, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Charter Aircraft Fleet', path: PATH_PREFIX },
            { name: detail.name, path },
          ]),
          faqSchema(detail.faqs, path),
        ])}
      />

      <div className="min-h-[60vh] bg-[#F3E9D0] text-[#6B4E3D]">
        <section className="relative overflow-hidden border-b border-[#A67C52]/20 bg-[#D9C7B8]">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[180%] w-[180%] -translate-x-1/2 -translate-y-1/2 scale-[1.35]"
            src={`${detail.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&playsinline=1`}
            title={`${detail.name} background video`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className="absolute inset-0 bg-[#1d120f]/60" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:py-28">
            <div className="max-w-3xl">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#E6D5C1]">
                Private Jet Charter
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-[#F3E9D0] sm:text-4xl lg:text-5xl">
                {detail.heroHeadline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#F3E9D0]/90 sm:text-lg">
                {detail.heroSubheadline}
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center rounded-xs bg-[#A67C52] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8B6639]"
              >
                Get a Charter Quote
              </Link>
            </div>
            <div className="hidden overflow-hidden rounded-xl border border-[#E6D5C1]/30 shadow-2xl lg:block">
              <Image
                src={detail.image}
                alt={detail.name}
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10 lg:px-12 lg:py-20">
          <section className="mx-auto max-w-4xl" aria-labelledby="overview-heading">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
              Overview
            </span>
            <h2 id="overview-heading" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Piaggio Avanti P.180 — Speed of a Jet, Comfort of a Cabin Class Above
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#6B4E3D]/85">
              {detail.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="mt-16" aria-labelledby="specifications-heading">
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A67C52]">
                Aircraft details
              </span>
              <h2 id="specifications-heading" className="mt-2 text-3xl font-black tracking-tight">
                Specifications
              </h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#A67C52]/20 bg-[#E6D5C1]">
              <div className="grid sm:grid-cols-2">
                {detail.specifications.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-[#A67C52]/15 p-4 text-sm last:border-b-0 sm:odd:border-r"
                  >
                    <span className="font-bold text-[#6B4E3D]">{label}</span>
                    <span className="text-[#6B4E3D]/80">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              ['Cabin & Comfort', 'comfort'],
              ['Why Choose the Avanti 180', 'reasons'],
              ['Ideal Use Cases', 'useCases'],
            ].map(([heading, key]) => (
              <section key={heading} className="rounded-xl border border-[#A67C52]/20 bg-[#E6D5C1] p-6" aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-xl font-black tracking-tight">
                  {heading}
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#6B4E3D]/85">
                  {detail[key].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A67C52]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-xl border border-[#A67C52]/30 bg-[#6B4E3D] p-6 text-[#F3E9D0] sm:p-8" aria-label="Charter pricing">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E6D5C1]">Charter pricing</span>
            <p className="mt-3 text-2xl font-black">Starting from ₹{detail.hourlyRate ?? '[INSERT RATE]'}/hour</p>
            <p className="mt-2 text-sm text-[#F3E9D0]/75">
              {detail.pricingNote || 'Final pricing depends on route, dates, aircraft availability, and itinerary.'}
            </p>
          </section>
        </main>

        <FaqSection
          faqs={detail.faqs}
          heading="Piaggio Avanti P.180 FAQs"
          waMessage="Hello Book My CharDham, I would like to enquire about chartering the Piaggio Avanti P.180."
        />

        <section className="border-t border-[#A67C52]/20 bg-[#E6D5C1] px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready to fly?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-[#6B4E3D]/80">
            {detail.ctaText || `Book the ${detail.name} for your next Char Dham Yatra.`}
          </p>
          <p className="mt-4 text-sm text-[#6B4E3D]/75">
            Call {CONTACT.phoneDisplay} or{' '}
            <a href={`mailto:${CONTACT.email}`} className="underline hover:text-[#A67C52]">
              email us
            </a>
            .
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center rounded-xs bg-[#A67C52] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8B6639]"
          >
            Get a Charter Quote
          </Link>
        </section>
      </div>
    </>
  );
}

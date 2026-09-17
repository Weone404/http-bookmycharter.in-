import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import { pageMetadata } from '../../lib/site';
import { JsonLd } from '../../components/JsonLd';
import { breadcrumbSchema, graph, organizationSchema, webPageSchema } from '../../lib/schema';

const PATH = '/blogs';
const TITLE = 'Travel & Helicopter Charter Guides | Book My CharDham';
const DESC =
  'Helpful guides for planning Kedarnath and Char Dham helicopter yatras, private charter flights and safe Himalayan travel.';

const ARTICLES = [
  {
    id: 'kedarnath-helicopter-yatra-guide',
    category: 'PILGRIMAGE GUIDE',
    title: 'How to Plan a Kedarnath Helicopter Yatra',
    excerpt:
      'A practical overview of routes, booking windows, weather planning and what to carry for a smooth Kedarnath journey.',
    date: 'September 14, 2026',
    image: '/images/flystar_kedarnath_helicopter_1788161902244.webp',
  },
  {
    id: 'char-dham-helicopter-yatra',
    category: 'CHAR DHAM',
    title: 'A First-Time Guide to Char Dham by Helicopter',
    excerpt:
      'Understand the 4 Dham itinerary, typical flight timings and the planning details that make a multi-dham yatra comfortable.',
    date: 'September 14, 2026',
    image: '/images/flystar_himalayan_fleet_1788161946820.webp',
  },
  {
    id: 'private-charter-flight-planning',
    category: 'CHARTER AVIATION',
    title: 'What to Know Before Booking a Private Charter',
    excerpt:
      'From aircraft selection to passenger details and dispatch coordination, here is how private charter planning works in India.',
    date: 'September 14, 2026',
    image: '/images/flystar_vip_charter_1788161931733.webp',
  },
];

export const metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH });

export default function Blogs() {
  return (
    <>
      <JsonLd
        data={graph([
          organizationSchema(),
          webPageSchema({ name: TITLE, description: DESC, path: PATH }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blogs', path: PATH },
          ]),
        ])}
      />

      <div className="w-full text-[var(--text-primary)]">
        <section className="border-b border-[var(--brand-luxury)]/20 bg-[var(--background-subtle)] px-4 pb-16 pt-24 sm:px-6 md:px-10 lg:px-12 lg:pb-24 lg:pt-32">
          <div className="mx-auto max-w-7xl">
            <span className="mb-3 block text-[11px] font-bold tracking-[0.24em] text-[var(--brand-luxury)]">
              THE BOOK MY CHARDHAM JOURNAL
            </span>
            <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-7xl">
              Travel smarter. Fly with confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[var(--text-primary)]/80 sm:text-base">
              Clear, practical advice for Himalayan pilgrimage travel and private aviation
              planning from the Book My CharDham flight operations team.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 md:px-10 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span className="mb-2 block text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury)]">
                  LATEST GUIDES
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                  From the flight desk
                </h2>
              </div>
              <BookOpen className="hidden h-10 w-10 text-[var(--brand-luxury)]/50 sm:block" />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {ARTICLES.map((article) => (
                <a
                  key={article.id}
                  href={`#${article.id}`}
                  className="group flex flex-col overflow-hidden border border-[var(--brand-luxury)]/20 bg-[var(--brand-navy)] transition-colors hover:border-[var(--brand-luxury)]/50"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[var(--brand-luxury)]">
                      {article.category}
                    </span>
                    <h3 className="mt-3 text-xl font-black uppercase leading-tight group-hover:text-[var(--brand-luxury-hover)]">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-primary)]/75">
                      {article.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      Read guide <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--brand-luxury)]/20 bg-[var(--brand-navy)] px-4 py-16 sm:px-6 md:px-10 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-4xl space-y-14">
            {ARTICLES.map((article) => (
              <article key={article.id} id={article.id} className="scroll-mt-28">
                <span className="text-[10px] font-bold tracking-[0.18em] text-[var(--brand-luxury)]">
                  {article.category} · {article.date}
                </span>
                <h2 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                  {article.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-primary)]/80">
                  {article.excerpt} Our dispatch team recommends confirming passenger
                  requirements early, keeping plans flexible around mountain weather, and
                  choosing an operator that coordinates the complete journey rather than only
                  the flight sector.
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

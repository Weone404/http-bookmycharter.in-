import Link from 'next/link';
import type { ResolvedAircraft } from '@/data/aircraft';
import { formatRange } from '@/data/aircraft';

/**
 * The comparison table.
 *
 * This is why most aircraft types do not need their own URL: a reader choosing
 * between eleven helicopters is served far better by one table than by eleven
 * pages of near-identical prose. Types with something genuinely type-specific
 * to say link out to their own page; the rest are useful here.
 *
 * Every figure is typical for the type, and the caption says so rather than
 * leaving the reader to assume it is tail-specific.
 */
export function AircraftTable({ aircraft }: { aircraft: readonly ResolvedAircraft[] }) {
  if (aircraft.length === 0) return null;

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left text-[length:var(--text-small)]">
          <caption className="sr-only">
            Aircraft types with typical passenger capacity, range and cruise speed
          </caption>
          <thead>
            <tr className="border-b border-current/25">
              <th scope="col" className="py-3 pr-4 font-semibold">Type</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Passengers</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Range</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Cruise</th>
              <th scope="col" className="py-3 font-semibold">Crew</th>
            </tr>
          </thead>
          <tbody>
            {aircraft.map((item) => {
              const passengers = formatRange(item.specs.passengers);
              const range = formatRange(item.specs.rangeNm, 'nm');
              const cruise = formatRange(item.specs.cruiseKts, 'kts');
              const crew = formatRange(item.specs.crew);
              return (
                <tr key={item.slug} className="border-b border-current/10">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    {item.published ? (
                      <Link href={item.href} className="text-[var(--color-cyan-deep)] underline underline-offset-4">
                        {item.name}
                      </Link>
                    ) : (
                      item.name
                    )}
                  </th>
                  {/* An unknown figure renders as an em dash, never as a guess. */}
                  <td className="numeric py-3 pr-4">{passengers ?? '—'}</td>
                  <td className="numeric py-3 pr-4">{range ?? '—'}</td>
                  <td className="numeric py-3 pr-4">{cruise ?? '—'}</td>
                  <td className="numeric py-3">{crew ?? '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-4 text-[length:var(--text-small)] opacity-70">
        Figures are typical for each type and vary with variant, options, weight, altitude and
        temperature. They are not specific to an individual airframe.
      </figcaption>
    </figure>
  );
}

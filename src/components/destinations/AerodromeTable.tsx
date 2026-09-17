import type { AirportRecord } from '@/data/airports.generated';
import { AIRPORT_SOURCE } from '@/data/airports.generated';

const KIND_LABEL: Record<string, string> = {
  'international-airport': 'International',
  'domestic-airport': 'Domestic',
  'private-airport': 'State / private',
  airstrip: 'Airstrip',
  heliport: 'Heliport',
  helipad: 'Helipad',
};

/**
 * Facilities as the source records them, attributed.
 *
 * Every field is reproduced from the sourced dataset rather than described in
 * prose, so a reader can see what is recorded and where it came from instead of
 * taking an unattributed assertion on trust.
 */
export function AerodromeTable({ aerodromes }: { aerodromes: readonly AirportRecord[] }) {
  if (aerodromes.length === 0) return null;

  return (
    <figure className="m-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] border-collapse text-left text-[length:var(--text-small)]">
          <caption className="sr-only">Recorded aerodromes with codes, type and operator</caption>
          <thead>
            <tr className="border-b border-current/25">
              <th scope="col" className="py-3 pr-4 font-semibold">Facility</th>
              <th scope="col" className="py-3 pr-4 font-semibold">IATA</th>
              <th scope="col" className="py-3 pr-4 font-semibold">ICAO</th>
              <th scope="col" className="py-3 pr-4 font-semibold">Type</th>
              <th scope="col" className="py-3 font-semibold">Operator</th>
            </tr>
          </thead>
          <tbody>
            {aerodromes.map((item) => (
              <tr key={item.id} className="border-b border-current/10">
                <th scope="row" className="py-3 pr-4 font-medium">{item.name}</th>
                <td className="numeric py-3 pr-4">{item.iata ?? '—'}</td>
                <td className="numeric py-3 pr-4">{item.icao ?? '—'}</td>
                <td className="py-3 pr-4">{KIND_LABEL[item.kind] ?? item.rawType}</td>
                <td className="py-3">{item.operator ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-4 text-[length:var(--text-small)] opacity-70">
        Source: {AIRPORT_SOURCE.document}, {AIRPORT_SOURCE.dated}. Which facility a given charter can
        actually use depends on the aircraft, the handling required and availability on the day.
      </figcaption>
    </figure>
  );
}

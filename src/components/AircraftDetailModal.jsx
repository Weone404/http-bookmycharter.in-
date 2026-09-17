'use client';

import Image from 'next/image';
import Link from 'next/link';

const SPEC_FIELDS = [
  ['tagline', 'Tagline'],
  ['description', 'Description'],
  ['seats', 'Seats'],
  ['range', 'Range'],
  ['cruiseSpeed', 'Cruise speed'],
  ['engines', 'Engines'],
  ['cabinDimensions', 'Cabin dimensions'],
  ['baggage', 'Baggage'],
  ['ceiling', 'Ceiling'],
  ['pilots', 'Pilots'],
  ['flightAttendant', 'Flight attendant'],
];

export default function AircraftDetailModal({ aircraft, onClose }) {
  if (!aircraft) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-[#1d120f]/70 px-2 pb-4 pt-20 sm:px-6 sm:pb-6 sm:pt-28" role="presentation" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="aircraft-modal-title"
        className="flex max-h-[calc(100dvh-6rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#A67C52]/25 bg-[#F3E9D0] shadow-[0_20px_50px_rgba(38,25,20,0.3)] sm:max-h-[calc(100dvh-8rem)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex shrink-0 items-start justify-between gap-4 border-b border-[#A67C52]/20 bg-[#F3E9D0] px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A67C52]">{aircraft.category}</p>
            <h2 id="aircraft-modal-title" className="mt-1 truncate pr-2 text-xl font-black uppercase tracking-tight text-[#6B4E3D] sm:text-2xl">
              {aircraft.name}
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close aircraft details" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B4E3D] text-2xl leading-none text-[#F3E9D0] transition-colors hover:bg-[#A67C52] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4E3D]">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain px-4 py-4 sm:px-7 sm:py-6">
          <div className="relative h-52 overflow-hidden rounded-lg bg-[#E6D5C1] sm:h-60">
            <Image src={aircraft.image} alt={aircraft.name} fill sizes="(max-width: 640px) 100vw, 640px" className="object-cover" />
          </div>

          {!aircraft.matched ? (
            <p className="mt-5 rounded-lg border border-[#A67C52]/30 bg-[#E6D5C1] p-4 text-sm font-bold text-[#6B4E3D]">
              Specs coming soon. This aircraft image does not have a matching fleetData entry yet.
            </p>
          ) : (
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {SPEC_FIELDS.filter(([key]) => aircraft[key]).map(([key, label]) => (
                <div key={key} className="rounded-lg border border-[#A67C52]/20 bg-[#E6D5C1] p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A67C52]">{label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#4D382E]">{aircraft[key]}</dd>
                </div>
              ))}
            </dl>
          )}

          <Link
            href={`/booking?aircraft=${encodeURIComponent(aircraft.name)}`}
            onClick={onClose}
            className="mt-6 flex w-full items-center justify-center rounded-sm bg-[#A67C52] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#8B6639] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B4E3D]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

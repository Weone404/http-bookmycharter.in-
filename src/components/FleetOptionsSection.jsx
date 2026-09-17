'use client';

import Image from 'next/image';
import { useState } from 'react';
import AircraftDetailModal from './AircraftDetailModal';
import FleetCategorySelector from './FleetCategorySelector';

function AircraftImageCard({ aircraft, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(aircraft)} className="group block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B4E3D] focus-visible:ring-offset-2">
      <article className="flex h-full min-h-[23rem] flex-col overflow-hidden rounded-xl border border-[#A67C52]/20 bg-[#F3E9D0] shadow-[0_4px_14px_rgba(50,33,22,0.09)] transition-all duration-250 hover:-translate-y-1 hover:border-[#A67C52]/30 hover:shadow-[0_12px_24px_rgba(50,33,22,0.14)]">
        <div className="relative h-56 shrink-0 bg-gradient-to-b from-[#D9C7B8] to-[#E6D5C1]">
          <Image src={aircraft.image} alt={aircraft.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]" />
        </div>
        <div className="flex min-h-[7rem] flex-1 flex-col gap-3 p-4 sm:p-5">
          <h3 className="line-clamp-2 min-h-[2.65rem] text-lg font-black uppercase leading-[1.15] tracking-[0.06em] text-[#6B4E3D]">{aircraft.name}</h3>
          <div className="mt-auto flex min-h-[1.75rem] items-center justify-between gap-2">
            <span className="inline-flex rounded-full border border-[#A67C52]/20 bg-[#E6D5C1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B4E3D]">{aircraft.category}</span>
            {!aircraft.matched && <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#A67C52]">Specs coming soon</span>}
          </div>
        </div>
      </article>
    </button>
  );
}

export default function FleetOptionsSection({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const visibleCategories = selectedCategory === 'all'
    ? categories
    : categories.filter((category) => category.id === selectedCategory);

  return (
    <>
      <FleetCategorySelector onSelect={setSelectedCategory} />
      <section id="fleet-options" className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12">
          {visibleCategories.map((category) => (
            <div key={category.id} className="mb-14 last:mb-0">
              <div className="mb-7 text-center">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#6B4E3D] sm:text-3xl">{category.label}</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.aircraft.map((aircraft) => <AircraftImageCard key={aircraft.image} aircraft={aircraft} onSelect={setSelectedAircraft} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <AircraftDetailModal aircraft={selectedAircraft} onClose={() => setSelectedAircraft(null)} />
    </>
  );
}

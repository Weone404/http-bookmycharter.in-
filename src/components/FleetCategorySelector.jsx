'use client';

import Image from 'next/image';
import { useState } from 'react';

export const CATEGORIES = [
  { id: 'all', label: 'All Aircraft', icon: '/icons/fleet/all.svg' },
  { id: 'helicopters', label: 'Helicopters', icon: '/icons/fleet/Helicopter.webp' },
  { id: 'turboprop', label: 'Turboprop', icon: '/icons/fleet/Turbo_Prop.webp' },
  { id: 'business-jets', label: 'Business Jets', icon: '/icons/fleet/Light_Jet.webp' },
  { id: 'airliner', label: 'Airliner', icon: '/icons/fleet/Airliner.webp' },
];

export default function FleetCategorySelector({ onSelect, defaultSelected = 'all' }) {
  const [selected, setSelected] = useState(defaultSelected);

  function handleSelect(id) {
    setSelected(id);
    onSelect?.(id);
  }

  return (
    <section className="w-full border-y border-[var(--brand-luxury)]/20 bg-[var(--brand-navy)] px-4 py-12 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--brand-luxury)]">
            Choose your category
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Browse by Aircraft Type
          </h2>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-7 sm:gap-x-10 sm:gap-y-8">
          {CATEGORIES.map((category) => {
            const active = selected === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelect(category.id)}
                aria-pressed={active}
                className="group flex min-w-[5.5rem] flex-col items-center gap-3 rounded-sm text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--brand-navy)]"
              >
                <span
                  className={[
                    'flex h-20 w-20 items-center justify-center rounded-full bg-[var(--background-subtle)] transition-[transform,box-shadow] duration-200 sm:h-28 sm:w-28',
                    active
                      ? 'scale-105 ring-2 ring-[var(--text-primary)] shadow-[0_6px_14px_var(--shadow-surface)]'
                      : 'ring-1 ring-[var(--brand-luxury)]/25 shadow-sm',
                  ].join(' ')}
                >
                  <Image
                    src={category.icon}
                    alt=""
                    width={112}
                    height={112}
                    aria-hidden="true"
                    className="h-20 w-20 object-contain sm:h-24 sm:w-24"
                  />
                </span>
                <span
                  className={[
                    'text-xs uppercase tracking-[0.08em] sm:text-sm',
                    active ? 'font-black text-[var(--text-primary)]' : 'font-bold text-[var(--brand-luxury)]',
                  ].join(' ')}
                >
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

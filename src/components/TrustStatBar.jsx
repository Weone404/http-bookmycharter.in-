import React from 'react';
import { ShieldCheck, Award, Users, Compass } from 'lucide-react';
import { TRUST_STATS } from '../data/bookmychardhamData';

export const TrustStatBar = () => {
  const icons = [Award, ShieldCheck, Users, Compass];

  return (
    <section className="w-full bg-black/90 border-y border-white/10 relative z-20 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {TRUST_STATS.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={stat.label}
                className={`flex flex-col justify-center ${
                  idx > 0 ? 'sm:pl-6 lg:pl-8 pt-6 sm:pt-0' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon className="w-4 h-4 text-[#c8102e]" />
                  <span className="text-[11px] font-bold tracking-[0.18em] text-neutral-400 uppercase">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
                  {stat.value}
                </div>
                <p className="text-[12.5px] text-neutral-400 mt-1.5 leading-relaxed font-normal">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

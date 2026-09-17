'use client';

import React, { useState } from 'react';
import { Search, X, Plane, Tag, ArrowRight } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../../data/airports';

export const SearchModal = ({
  isOpen,
  onClose,
  onSelectDestination,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = POPULAR_DESTINATIONS.filter((d) =>
    d.city.toLowerCase().includes(query.toLowerCase()) ||
    d.country.toLowerCase().includes(query.toLowerCase()) ||
    d.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#121212] border border-[#2a2a2a] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-[#222222] bg-[#161616]">
          <Search className="w-5 h-5 text-red-500 shrink-0 ml-2" />
          <input
            type="text"
            autoFocus
            placeholder="Search flights, offers, destinations, baggage rules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white text-base placeholder-neutral-500 outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-96 overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase mb-3">
              Popular Flight Searches
            </div>
            <div className="space-y-1.5">
              {filtered.slice(0, 5).map((dest) => (
                <button
                  key={dest.code}
                  onClick={() => {
                    onSelectDestination(dest);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded hover:bg-[#1a1a1a] text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Plane className="w-4 h-4 text-neutral-400 group-hover:text-red-500" />
                    <div>
                      <span className="text-sm font-semibold text-white group-hover:text-red-400">
                        Amsterdam (AMS) → {dest.city} ({dest.code})
                      </span>
                      <span className="text-xs text-neutral-500 block">
                        {dest.country} • Turkish Airlines direct flight
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#1f1f1f]">
            <div className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase mb-3">
              Quick Topics
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'Miles & Smiles Accrual',
                'Business Class Lounge Istanbul',
                'Stopover in Istanbul Program',
                'Extra Baggage Fees',
                'Student Flight Discounts',
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-full bg-[#1c1c1c] hover:bg-[#282828] border border-[#2a2a2a] text-xs text-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Tag className="w-3 h-3 text-red-500" />
                  <span>{topic}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

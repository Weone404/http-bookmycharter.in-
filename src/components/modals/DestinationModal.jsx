'use client';

import React, { useState } from 'react';
import { Search, MapPin, X, Plane, ArrowRight } from 'lucide-react';
import { POPULAR_DESTINATIONS, DEFAULT_ORIGIN } from '../../data/airports';

export const DestinationModal = ({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
  isOrigin = false,
}) => {
  const [searchTerm, setSearchTerm] = useState(currentValue);

  if (!isOpen) return null;

  const filtered = POPULAR_DESTINATIONS.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.city.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#121212] border border-[#262626] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                {isOrigin ? 'SELECT ORIGIN AIRPORT' : 'SELECT DESTINATION'}
              </h3>
              <p className="text-xs text-neutral-400">
                Fly to over 340 destinations worldwide with Turkish Airlines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-[#202020] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search city, airport name, or 3-letter IATA code (e.g. IST, JFK, AMS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#1a1a1a] border border-[#2d2d2d] focus:border-red-600 rounded-sm text-sm text-white placeholder-neutral-500 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Airport list */}
        <div className="max-h-80 overflow-y-auto px-6 py-3 space-y-2">
          {isOrigin && (
            <button
              onClick={() => {
                onSelect(DEFAULT_ORIGIN);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-sm bg-[#181818] hover:bg-[#242424] border border-[#222222] transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    {DEFAULT_ORIGIN.city} ({DEFAULT_ORIGIN.code})
                  </div>
                  <div className="text-xs text-neutral-400">
                    {DEFAULT_ORIGIN.name}, {DEFAULT_ORIGIN.country}
                  </div>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-red-950/60 text-red-400 font-mono">
                DEFAULT
              </span>
            </button>
          )}

          <div className="text-[11px] font-bold tracking-widest text-neutral-500 uppercase pt-2 pb-1">
            {searchTerm ? 'SEARCH RESULTS' : 'POPULAR DESTINATIONS'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">
              No matching destinations found. Try searching for &quot;Istanbul&quot;, &quot;Tokyo&quot;, or &quot;New York&quot;.
            </div>
          ) : (
            filtered.map((airport) => (
              <button
                key={airport.code}
                onClick={() => {
                  onSelect(airport);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-sm hover:bg-[#1f1f1f] border border-transparent hover:border-[#333333] transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#181818] flex items-center justify-center text-xs font-mono font-bold text-neutral-300 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    {airport.code}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                      {airport.city}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {airport.name}, {airport.country}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0e0e0e] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-neutral-400">
          <span>Direct & connecting Turkish Airlines flights</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

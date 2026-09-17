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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[var(--brand-navy)] border border-[var(--text-primary)] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-navy)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-[var(--text-inverse)] uppercase">
                {isOrigin ? 'SELECT ORIGIN AIRPORT' : 'SELECT DESTINATION'}
              </h3>
              <p className="text-xs text-[var(--background-subtle)]">
                Fly to over 340 destinations worldwide with Turkish Airlines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--background-subtle)] hover:text-[var(--text-inverse)] hover:bg-[var(--brand-navy)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--background-subtle)]" />
            <input
              type="text"
              autoFocus
              placeholder="Search city, airport name, or 3-letter IATA code (e.g. IST, JFK, AMS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[var(--brand-navy)] border border-[var(--text-primary)] focus:border-[var(--brand-primary)] rounded-sm text-sm text-[var(--text-inverse)] placeholder-[var(--background-subtle)] outline-none transition-colors"
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
              className="w-full flex items-center justify-between p-3.5 rounded-sm bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] border border-[var(--brand-navy)] transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[var(--text-inverse)] group-hover:text-[var(--brand-luxury)] transition-colors">
                    {DEFAULT_ORIGIN.city} ({DEFAULT_ORIGIN.code})
                  </div>
                  <div className="text-xs text-[var(--background-subtle)]">
                    {DEFAULT_ORIGIN.name}, {DEFAULT_ORIGIN.country}
                  </div>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[var(--brand-navy)]/60 text-[var(--brand-luxury)] font-mono">
                DEFAULT
              </span>
            </button>
          )}

          <div className="text-[11px] font-bold tracking-widest text-[var(--background-subtle)] uppercase pt-2 pb-1">
            {searchTerm ? 'SEARCH RESULTS' : 'POPULAR DESTINATIONS'}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[var(--background-subtle)] text-sm">
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
                className="w-full flex items-center justify-between p-3.5 rounded-sm hover:bg-[var(--border-subtle)] border border-transparent hover:border-[var(--text-primary)] transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[var(--brand-navy)] flex items-center justify-center text-xs font-mono font-bold text-[var(--background-subtle)] group-hover:bg-[var(--brand-primary)] group-hover:text-[var(--text-inverse)] transition-colors">
                    {airport.code}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-inverse)] group-hover:text-[var(--brand-luxury)] transition-colors">
                      {airport.city}
                    </div>
                    <div className="text-xs text-[var(--background-subtle)]">
                      {airport.name}, {airport.country}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--background-subtle)] group-hover:text-[var(--text-inverse)] group-hover:translate-x-1 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--surface-dark)] border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--background-subtle)]">
          <span>Direct & connecting Turkish Airlines flights</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] text-[var(--text-inverse)] rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

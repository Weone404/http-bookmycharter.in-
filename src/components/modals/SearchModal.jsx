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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[var(--brand-navy)]/90 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[var(--brand-navy)] border border-[var(--border-strong)] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-[var(--brand-navy)] bg-[var(--brand-navy)]">
          <Search className="w-5 h-5 text-[var(--brand-primary)] shrink-0 ml-2" />
          <input
            type="text"
            autoFocus
            placeholder="Search flights, offers, destinations, baggage rules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[var(--text-inverse)] text-base placeholder-[var(--background-subtle)] outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 text-[var(--background-subtle)] hover:text-[var(--text-inverse)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-96 overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold tracking-widest text-[var(--background-subtle)] uppercase mb-3">
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
                  className="w-full flex items-center justify-between p-3 rounded hover:bg-[var(--brand-navy)] text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Plane className="w-4 h-4 text-[var(--background-subtle)] group-hover:text-[var(--brand-primary)]" />
                    <div>
                      <span className="text-sm font-semibold text-[var(--text-inverse)] group-hover:text-[var(--brand-luxury)]">
                        Amsterdam (AMS) → {dest.city} ({dest.code})
                      </span>
                      <span className="text-xs text-[var(--background-subtle)] block">
                        {dest.country} • Turkish Airlines direct flight
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--brand-luxury)] group-hover:text-[var(--text-inverse)]" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <div className="text-[11px] font-bold tracking-widest text-[var(--background-subtle)] uppercase mb-3">
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
                  className="px-3 py-1.5 rounded-full bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] border border-[var(--border-strong)] text-xs text-[var(--background-subtle)] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Tag className="w-3 h-3 text-[var(--brand-primary)]" />
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

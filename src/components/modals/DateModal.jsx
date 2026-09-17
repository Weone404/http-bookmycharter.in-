'use client';

import React, { useState } from 'react';
import { Calendar as CalendarIcon, X, Check } from 'lucide-react';

export const DateModal = ({
  isOpen,
  onClose,
  departureDate,
  onSelectDate,
}) => {
  const [selected, setSelected] = useState(departureDate || 'July 29, 2026');

  if (!isOpen) return null;

  const quickDates = [
    'July 29, 2018',
    'July 29, 2026',
    'August 15, 2026',
    'September 02, 2026',
    'October 10, 2026',
    'December 24, 2026',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-md bg-[var(--brand-navy)] border border-[var(--text-primary)] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-navy)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-[var(--text-inverse)] uppercase">
                FLIGHT DATE
              </h3>
              <p className="text-xs text-[var(--background-subtle)]">Select your departure date</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--background-subtle)] hover:text-[var(--text-inverse)] hover:bg-[var(--brand-navy)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-xs font-bold tracking-widest text-[var(--background-subtle)] uppercase">
            Quick Select Date
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {quickDates.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelected(d);
                  onSelectDate(d);
                  onClose();
                }}
                className={`p-3 rounded-sm border text-left flex items-center justify-between text-xs font-medium transition-all cursor-pointer ${
                  selected === d
                    ? 'bg-[var(--brand-navy)]/30 border-[var(--brand-primary)] text-[var(--text-inverse)]'
                    : 'bg-[var(--brand-navy)] border-[var(--text-primary)] text-[var(--background-subtle)] hover:bg-[var(--brand-navy)] hover:border-[var(--brand-luxury)]'
                }`}
              >
                <span>{d}</span>
                {selected === d && <Check className="w-3.5 h-3.5 text-[var(--brand-primary)]" />}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-[var(--background-subtle)] block mb-1.5 uppercase tracking-wider">
              Custom Date Input
            </label>
            <input
              type="text"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              placeholder="e.g. July 29, 2018"
              className="w-full px-4 py-3 bg-[var(--brand-navy)] border border-[var(--text-primary)] focus:border-[var(--brand-primary)] rounded text-sm text-[var(--text-inverse)] outline-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-[var(--surface-dark)] border-t border-[var(--border-subtle)] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] text-[var(--text-inverse)] rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelectDate(selected);
              onClose();
            }}
            className="px-5 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            Confirm Date
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Users, X, Plus, Minus, Check } from 'lucide-react';

export const CabinModal = ({
  isOpen,
  onClose,
  currentClass = 'Economy',
  adults: initialAdults = 1,
  onSave,
}) => {
  const [selectedClass, setSelectedClass] = useState(currentClass || 'Economy');
  const [adults, setAdults] = useState(initialAdults || 1);

  if (!isOpen) return null;

  const classes = ['Economy', 'Business', 'First'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-md bg-[var(--brand-navy)] border border-[var(--text-primary)] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-navy)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-[var(--text-inverse)] uppercase">
                CABIN & PASSENGERS
              </h3>
              <p className="text-xs text-[var(--background-subtle)]">Choose travel class and passenger count</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--background-subtle)] hover:text-[var(--text-inverse)] hover:bg-[var(--brand-navy)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cabin Class Options */}
          <div>
            <label className="text-xs font-bold tracking-widest text-[var(--background-subtle)] uppercase block mb-3">
              Cabin Class
            </label>
            <div className="grid grid-cols-3 gap-2">
              {classes.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  className={`p-3 rounded-sm border text-center text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedClass === c
                      ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-[var(--text-inverse)] shadow-lg'
                      : 'bg-[var(--brand-navy)] border-[var(--text-primary)] text-[var(--background-subtle)] hover:bg-[var(--brand-navy)] hover:border-[var(--brand-luxury)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Passenger Counter */}
          <div className="flex items-center justify-between p-4 rounded bg-[var(--brand-navy)] border border-[var(--text-primary)]">
            <div>
              <div className="text-sm font-semibold text-[var(--text-inverse)]">Adults</div>
              <div className="text-xs text-[var(--background-subtle)]">Age 12+</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded bg-[var(--text-primary)] hover:bg-[var(--text-primary)] active:scale-95 flex items-center justify-center text-[var(--text-inverse)] transition-all cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-[var(--text-inverse)] text-sm">{adults}</span>
              <button
                onClick={() => setAdults((prev) => Math.min(9, prev + 1))}
                className="w-8 h-8 rounded bg-[var(--text-primary)] hover:bg-[var(--text-primary)] active:scale-95 flex items-center justify-center text-[var(--text-inverse)] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
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
              onSave?.(selectedClass, adults);
              onClose();
            }}
            className="px-5 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5" />
            Apply Selection
          </button>
        </div>
      </div>
    </div>
  );
};

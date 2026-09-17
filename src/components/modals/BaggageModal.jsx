'use client';

import React from 'react';
import { ShoppingBag, X, Info } from 'lucide-react';

export const BaggageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl bg-[var(--brand-navy)] border border-[var(--text-primary)] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-navy)] bg-[var(--surface-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-[var(--text-inverse)] uppercase">
                BAGGAGE ALLOWANCE & RULES
              </h3>
              <p className="text-xs text-[var(--background-subtle)]">
                Cabin baggage and checked luggage allowances
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

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Cabin Baggage */}
          <div className="p-4 rounded bg-[var(--brand-navy)] border border-[var(--text-primary)] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[var(--text-inverse)] uppercase tracking-wider">
                Cabin / Hand Baggage
              </h4>
              <span className="text-xs text-[var(--brand-luxury)] font-semibold font-mono">Included Free</span>
            </div>
            <p className="text-xs text-[var(--background-subtle)]">
              Economy Class: 1 piece up to 8 kg (55 x 40 x 23 cm) + 1 personal item.
            </p>
            <p className="text-xs text-[var(--background-subtle)]">
              Business Class: 2 pieces up to 8 kg each (16 kg total) + 1 personal item.
            </p>
          </div>

          {/* Checked Baggage */}
          <div className="p-4 rounded bg-[var(--brand-navy)] border border-[var(--text-primary)] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[var(--text-inverse)] uppercase tracking-wider">
                Checked Luggage
              </h4>
              <span className="text-xs text-[var(--background-subtle)] font-mono">Up to 30 kg</span>
            </div>
            <ul className="text-xs text-[var(--background-subtle)] space-y-1.5 list-disc list-inside">
              <li>International Economy: 23 kg or 30 kg depending on route</li>
              <li>Business Class: 32 kg allowance + priority baggage handling</li>
              <li>Miles & Smiles Elite / Elite Plus members enjoy +20 kg extra</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="p-3.5 bg-[var(--brand-navy)] rounded border border-[var(--text-primary)] flex items-start gap-2.5 text-xs text-[var(--background-subtle)]">
            <Info className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
            <span>
              Liquid containers in cabin baggage must not exceed 100 ml each and must fit inside a 1-litre transparent bag.
            </span>
          </div>
        </div>

        <div className="px-6 py-4 bg-[var(--surface-dark)] border-t border-[var(--border-subtle)] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

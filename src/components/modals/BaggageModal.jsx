'use client';

import React from 'react';
import { ShoppingBag, X, Info } from 'lucide-react';

export const BaggageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl bg-[#121212] border border-[#262626] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222] bg-[#0e0e0e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                BAGGAGE ALLOWANCE & RULES
              </h3>
              <p className="text-xs text-neutral-400">
                Cabin baggage and checked luggage allowances
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

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Cabin Baggage */}
          <div className="p-4 rounded bg-[#161616] border border-[#262626] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Cabin / Hand Baggage
              </h4>
              <span className="text-xs text-emerald-400 font-semibold font-mono">Included Free</span>
            </div>
            <p className="text-xs text-neutral-300">
              Economy Class: 1 piece up to 8 kg (55 x 40 x 23 cm) + 1 personal item.
            </p>
            <p className="text-xs text-neutral-300">
              Business Class: 2 pieces up to 8 kg each (16 kg total) + 1 personal item.
            </p>
          </div>

          {/* Checked Baggage */}
          <div className="p-4 rounded bg-[#161616] border border-[#262626] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Checked Luggage
              </h4>
              <span className="text-xs text-neutral-400 font-mono">Up to 30 kg</span>
            </div>
            <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
              <li>International Economy: 23 kg or 30 kg depending on route</li>
              <li>Business Class: 32 kg allowance + priority baggage handling</li>
              <li>Miles & Smiles Elite / Elite Plus members enjoy +20 kg extra</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="p-3.5 bg-[#181818] rounded border border-[#262626] flex items-start gap-2.5 text-xs text-neutral-400">
            <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>
              Liquid containers in cabin baggage must not exceed 100 ml each and must fit inside a 1-litre transparent bag.
            </span>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#0e0e0e] border-t border-[#1f1f1f] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

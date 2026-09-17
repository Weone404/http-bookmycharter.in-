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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#121212] border border-[#262626] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                FLIGHT DATE
              </h3>
              <p className="text-xs text-neutral-400">Select your departure date</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-[#202020] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
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
                    ? 'bg-red-900/30 border-red-600 text-white'
                    : 'bg-[#181818] border-[#262626] text-neutral-300 hover:bg-[#222222] hover:border-neutral-500'
                }`}
              >
                <span>{d}</span>
                {selected === d && <Check className="w-3.5 h-3.5 text-red-500" />}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5 uppercase tracking-wider">
              Custom Date Input
            </label>
            <input
              type="text"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              placeholder="e.g. July 29, 2018"
              className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] focus:border-red-600 rounded text-sm text-white outline-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-[#0e0e0e] border-t border-[#1f1f1f] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSelectDate(selected);
              onClose();
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            Confirm Date
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#121212] border border-[#262626] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                CABIN & PASSENGERS
              </h3>
              <p className="text-xs text-neutral-400">Choose travel class and passenger count</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-[#202020] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Cabin Class Options */}
          <div>
            <label className="text-xs font-bold tracking-widest text-neutral-400 uppercase block mb-3">
              Cabin Class
            </label>
            <div className="grid grid-cols-3 gap-2">
              {classes.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedClass(c)}
                  className={`p-3 rounded-sm border text-center text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedClass === c
                      ? 'bg-red-600 border-red-500 text-white shadow-lg'
                      : 'bg-[#181818] border-[#262626] text-neutral-300 hover:bg-[#222222] hover:border-neutral-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Passenger Counter */}
          <div className="flex items-center justify-between p-4 rounded bg-[#181818] border border-[#262626]">
            <div>
              <div className="text-sm font-semibold text-white">Adults</div>
              <div className="text-xs text-neutral-400">Age 12+</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded bg-[#252525] hover:bg-[#333333] active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-bold text-white text-sm">{adults}</span>
              <button
                onClick={() => setAdults((prev) => Math.min(9, prev + 1))}
                className="w-8 h-8 rounded bg-[#252525] hover:bg-[#333333] active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
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
              onSave?.(selectedClass, adults);
              onClose();
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5" />
            Apply Selection
          </button>
        </div>
      </div>
    </div>
  );
};

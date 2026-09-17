'use client';

import React, { useState } from 'react';
import { Clock, X, Search, Plane } from 'lucide-react';

export const FlightStatusModal = ({ isOpen, onClose }) => {
  const [flightNo, setFlightNo] = useState('TK 1952');
  const [result, setResult] = useState(true);

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
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-white uppercase">
                FLIGHT STATUS TRACKER
              </h3>
              <p className="text-xs text-neutral-400">
                Track live Turkish Airlines departures and arrivals
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

        <div className="p-6 space-y-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Enter Flight Number (e.g. TK 1952, TK 1)"
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#2d2d2d] focus:border-red-600 rounded text-sm text-white font-mono placeholder-neutral-500 outline-none uppercase"
              />
            </div>
            <button
              onClick={() => setResult(true)}
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Track
            </button>
          </div>

          {result && (
            <div className="p-5 rounded bg-[#161616] border border-[#262626] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-red-500">TK 1952</span>
                  <span className="text-xs text-neutral-400 ml-2">Boeing 787-9 Dreamliner</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-700/50 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  ● On Time
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-2xl font-black text-white">11:20</div>
                  <div className="text-xs text-neutral-400 font-semibold">AMS • Amsterdam</div>
                  <div className="text-[11px] text-neutral-500">Terminal 3, Gate D44</div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-neutral-400 font-mono mb-1">3h 35m</span>
                  <div className="w-20 sm:w-28 h-[2px] bg-neutral-700 flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5 text-red-500 transform rotate-90" />
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-1">Airborne</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-white">15:55</div>
                  <div className="text-xs text-neutral-400 font-semibold">IST • Istanbul</div>
                  <div className="text-[11px] text-neutral-500">Main Terminal, Belt 12</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[#0e0e0e] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-neutral-400">
          <span>Times shown in local airport timezones</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#222222] hover:bg-[#333333] text-white rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

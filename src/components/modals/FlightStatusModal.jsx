'use client';

import React, { useState } from 'react';
import { Clock, X, Search, Plane } from 'lucide-react';

export const FlightStatusModal = ({ isOpen, onClose }) => {
  const [flightNo, setFlightNo] = useState('TK 1952');
  const [result, setResult] = useState(true);

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
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-[var(--text-inverse)] uppercase">
                FLIGHT STATUS TRACKER
              </h3>
              <p className="text-xs text-[var(--background-subtle)]">
                Track live Turkish Airlines departures and arrivals
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

        <div className="p-6 space-y-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--background-subtle)]" />
              <input
                type="text"
                placeholder="Enter Flight Number (e.g. TK 1952, TK 1)"
                value={flightNo}
                onChange={(e) => setFlightNo(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--brand-navy)] border border-[var(--text-primary)] focus:border-[var(--brand-primary)] rounded text-sm text-[var(--text-inverse)] font-mono placeholder-[var(--background-subtle)] outline-none uppercase"
              />
            </div>
            <button
              onClick={() => setResult(true)}
              className="px-5 py-3 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Track
            </button>
          </div>

          {result && (
            <div className="p-5 rounded bg-[var(--brand-navy)] border border-[var(--text-primary)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--brand-primary)]">TK 1952</span>
                  <span className="text-xs text-[var(--background-subtle)] ml-2">Boeing 787-9 Dreamliner</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-[var(--brand-navy)]/70 border border-[var(--brand-primary)]/50 text-[var(--brand-luxury)] text-xs font-bold uppercase tracking-wider">
                  ● On Time
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-2xl font-black text-[var(--text-inverse)]">11:20</div>
                  <div className="text-xs text-[var(--background-subtle)] font-semibold">AMS • Amsterdam</div>
                  <div className="text-[11px] text-[var(--background-subtle)]">Terminal 3, Gate D44</div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-[var(--background-subtle)] font-mono mb-1">3h 35m</span>
                  <div className="w-20 sm:w-28 h-[2px] bg-[var(--text-primary)] flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5 text-[var(--brand-primary)] transform rotate-90" />
                  </div>
                  <span className="text-[10px] text-[var(--background-subtle)] mt-1">Airborne</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-[var(--text-inverse)]">15:55</div>
                  <div className="text-xs text-[var(--background-subtle)] font-semibold">IST • Istanbul</div>
                  <div className="text-[11px] text-[var(--background-subtle)]">Main Terminal, Belt 12</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[var(--surface-dark)] border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--background-subtle)]">
          <span>Times shown in local airport timezones</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] text-[var(--text-inverse)] rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

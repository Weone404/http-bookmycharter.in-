'use client';

import React, { useState } from 'react';
import { Plane, X, Search, CheckCircle, AlertCircle } from 'lucide-react';

export const CheckInModal = ({ isOpen, onClose }) => {
  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pnr && lastName) {
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-lg bg-[var(--brand-navy)] border border-[var(--text-primary)] rounded-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-navy)] bg-[var(--surface-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wider text-[var(--text-inverse)] uppercase">
                ONLINE CHECK-IN
              </h3>
              <p className="text-xs text-[var(--background-subtle)]">
                Check in 24 hours prior to scheduled departure
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

        {status === 'success' ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle className="w-14 h-14 text-[var(--brand-luxury)] mx-auto" />
            <h4 className="text-lg font-bold text-[var(--text-inverse)]">Boarding Pass Ready</h4>
            <p className="text-sm text-[var(--background-subtle)]">
              Check-in confirmed for <span className="text-[var(--text-inverse)] font-semibold">{lastName.toUpperCase()}</span> (PNR: {pnr.toUpperCase()}). Seat 14A assigned.
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                onClose();
              }}
              className="px-6 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Download Mobile Boarding Pass
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--background-subtle)] uppercase tracking-wider block mb-1.5">
                Ticket Number or Reservation Code (PNR)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. TK9X42 or 2352194830129"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--brand-navy)] border border-[var(--text-primary)] focus:border-[var(--brand-primary)] rounded text-sm text-[var(--text-inverse)] font-mono placeholder-[var(--background-subtle)] outline-none uppercase"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--background-subtle)] uppercase tracking-wider block mb-1.5">
                Passenger&apos;s Last Name / Surname
              </label>
              <input
                type="text"
                required
                placeholder="e.g. YILMAZ or SMITH"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--brand-navy)] border border-[var(--text-primary)] focus:border-[var(--brand-primary)] rounded text-sm text-[var(--text-inverse)] placeholder-[var(--background-subtle)] outline-none uppercase"
              />
            </div>

            <div className="p-3 bg-[var(--brand-navy)] rounded border border-[var(--text-primary)] flex items-start gap-2.5 text-xs text-[var(--background-subtle)]">
              <AlertCircle className="w-4 h-4 text-[var(--brand-primary)] shrink-0 mt-0.5" />
              <span>
                Online check-in closes 90 minutes before international flights and 45 minutes before domestic flights.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[var(--brand-navy)] hover:bg-[var(--text-primary)] text-[var(--text-inverse)] rounded text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                Find Booking & Check In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

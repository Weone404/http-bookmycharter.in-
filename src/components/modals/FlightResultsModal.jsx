'use client';

import React, { useState } from 'react';
import { Plane, X, Clock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_FLIGHTS } from '../../data/airports';

export const FlightResultsModal = ({
  isOpen,
  onClose,
  searchParams,
}) => {
  const [bookedFlight, setBookedFlight] = useState(null);

  if (!isOpen) return null;

  const destinationCity = searchParams?.destination?.city || searchParams?.destinationText || 'Istanbul';
  const destinationCode = searchParams?.destination?.code || 'IST';
  const originCity = searchParams?.origin?.city || 'Amsterdam';
  const originCode = searchParams?.origin?.code || 'AMS';
  const tripType = searchParams?.tripType || 'Round Trip';
  const departureDate = searchParams?.departureDate || 'May 15, 2026';
  const cabinClass = searchParams?.cabinClass || 'Economy';
  const adults = searchParams?.adults || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--brand-navy)]/90 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-[var(--brand-navy)] border border-[var(--text-primary)] rounded-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--brand-navy)] bg-[var(--surface-dark)] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[var(--brand-primary)] uppercase">
              <span>TURKISH AIRLINES FLIGHTS</span>
              <span className="text-[var(--background-subtle)]">•</span>
              <span className="text-[var(--background-subtle)]">{tripType}</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-[var(--text-inverse)] mt-1">
              {originCity} ({originCode}) → {destinationCity} ({destinationCode})
            </h2>
            <p className="text-xs text-[var(--background-subtle)] mt-0.5">
              {departureDate} • {cabinClass} • {adults} Adult(s)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--background-subtle)] hover:text-[var(--text-inverse)] hover:bg-[var(--brand-navy)] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Flight Cards List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {bookedFlight ? (
            <div className="text-center py-12 px-6 bg-[var(--brand-navy)] border border-[var(--brand-primary)]/40 rounded-sm">
              <CheckCircle2 className="w-14 h-14 text-[var(--brand-primary)] mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-[var(--text-inverse)] mb-2">Flight Reservation Confirmed!</h3>
              <p className="text-sm text-[var(--background-subtle)] max-w-md mx-auto mb-6">
                Your reservation for <span className="text-[var(--text-inverse)] font-semibold">{bookedFlight}</span> from{' '}
                {originCity} to {destinationCity} has been initiated. Check your Miles&Smiles profile for instant ticket confirmation.
              </p>
              <button
                onClick={() => setBookedFlight(null)}
                className="px-6 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Other Flight Times
              </button>
            </div>
          ) : (
            MOCK_FLIGHTS.map((flight) => (
              <div
                key={flight.id}
                className="p-5 rounded bg-[var(--brand-navy)] hover:bg-[var(--brand-navy)] border border-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                {/* Flight Times & Route */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded bg-[var(--brand-navy)]/70 border border-[var(--brand-primary)]/40 text-[var(--brand-luxury)] text-xs font-mono font-bold">
                      {flight.flightNumber}
                    </span>
                    <span className="text-xs text-[var(--background-subtle)] font-medium">
                      {flight.aircraft}
                    </span>
                    <span className="text-xs text-[var(--brand-luxury)] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> +{flight.milesReward} Miles
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-[var(--text-inverse)]">
                        {flight.departureTime}
                      </div>
                      <div className="text-xs font-medium text-[var(--background-subtle)]">
                        {flight.origin.code} ({flight.origin.city})
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[11px] text-[var(--background-subtle)] font-mono mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {flight.duration}
                      </span>
                      <div className="w-24 sm:w-32 h-[2px] bg-[var(--text-primary)] relative flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)] absolute left-0"></div>
                        <Plane className="w-3.5 h-3.5 text-[var(--background-subtle)] transform rotate-90" />
                        <div className="w-2 h-2 rounded-full bg-[var(--brand-primary)] absolute right-0"></div>
                      </div>
                      <span className="text-[10px] text-[var(--brand-luxury)] font-bold uppercase mt-1">
                        Non-stop Direct
                      </span>
                    </div>

                    <div>
                      <div className="text-xl sm:text-2xl font-black text-[var(--text-inverse)]">
                        {flight.arrivalTime}
                      </div>
                      <div className="text-xs font-medium text-[var(--background-subtle)]">
                        {destinationCode} ({destinationCity})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Book Button */}
                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-[var(--text-primary)] pt-3 md:pt-0 gap-2 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-[var(--background-subtle)] uppercase tracking-wider block">
                      Starting from
                    </span>
                    <span className="text-2xl font-black text-[var(--text-inverse)] font-mono">
                      €{flight.price}
                    </span>
                  </div>

                  <button
                    onClick={() => setBookedFlight(flight.flightNumber)}
                    className="px-6 py-2.5 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] active:scale-95 text-[var(--text-inverse)] rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg group-hover:shadow-[var(--brand-navy)]/50"
                  >
                    <span>Select Flight</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-6 py-3.5 bg-[var(--surface-dark)] border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between text-xs text-[var(--background-subtle)] gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--brand-luxury)]" />
            <span>Best price guarantee & complimentary in-flight Turkish dining</span>
          </div>
          <div className="font-mono text-[var(--background-subtle)]">
            Turkish Airlines Star Alliance Member
          </div>
        </div>
      </div>
    </div>
  );
};

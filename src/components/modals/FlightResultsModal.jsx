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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-[#121212] border border-[#262626] rounded-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#222222] bg-[#0d0d0d] shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-red-500 uppercase">
              <span>TURKISH AIRLINES FLIGHTS</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400">{tripType}</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white mt-1">
              {originCity} ({originCode}) → {destinationCity} ({destinationCode})
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {departureDate} • {cabinClass} • {adults} Adult(s)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-[#202020] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Flight Cards List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {bookedFlight ? (
            <div className="text-center py-12 px-6 bg-[#161616] border border-red-900/40 rounded-sm">
              <CheckCircle2 className="w-14 h-14 text-red-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-2">Flight Reservation Confirmed!</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
                Your reservation for <span className="text-white font-semibold">{bookedFlight}</span> from{' '}
                {originCity} to {destinationCity} has been initiated. Check your Miles&Smiles profile for instant ticket confirmation.
              </p>
              <button
                onClick={() => setBookedFlight(null)}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Other Flight Times
              </button>
            </div>
          ) : (
            MOCK_FLIGHTS.map((flight) => (
              <div
                key={flight.id}
                className="p-5 rounded bg-[#161616] hover:bg-[#1a1a1a] border border-[#262626] hover:border-[#3a3a3a] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                {/* Flight Times & Route */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded bg-red-950/70 border border-red-800/40 text-red-400 text-xs font-mono font-bold">
                      {flight.flightNumber}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {flight.aircraft}
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> +{flight.milesReward} Miles
                    </span>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        {flight.departureTime}
                      </div>
                      <div className="text-xs font-medium text-neutral-400">
                        {flight.origin.code} ({flight.origin.city})
                      </div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[11px] text-neutral-400 font-mono mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {flight.duration}
                      </span>
                      <div className="w-24 sm:w-32 h-[2px] bg-neutral-700 relative flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-600 absolute left-0"></div>
                        <Plane className="w-3.5 h-3.5 text-neutral-400 transform rotate-90" />
                        <div className="w-2 h-2 rounded-full bg-red-600 absolute right-0"></div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase mt-1">
                        Non-stop Direct
                      </span>
                    </div>

                    <div>
                      <div className="text-xl sm:text-2xl font-black text-white">
                        {flight.arrivalTime}
                      </div>
                      <div className="text-xs font-medium text-neutral-400">
                        {destinationCode} ({destinationCity})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Book Button */}
                <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-[#262626] pt-3 md:pt-0 gap-2 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                      Starting from
                    </span>
                    <span className="text-2xl font-black text-white font-mono">
                      €{flight.price}
                    </span>
                  </div>

                  <button
                    onClick={() => setBookedFlight(flight.flightNumber)}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg group-hover:shadow-red-950/50"
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
        <div className="px-6 py-3.5 bg-[#0a0a0a] border-t border-[#1f1f1f] flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Best price guarantee & complimentary in-flight Turkish dining</span>
          </div>
          <div className="font-mono text-neutral-500">
            Turkish Airlines Star Alliance Member
          </div>
        </div>
      </div>
    </div>
  );
};

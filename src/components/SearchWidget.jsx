'use client';

import React, { useState } from 'react';
import { ArrowRight, Plane, Clock, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export const SearchWidget = ({
  onQuickBook,
  onNavigate,
}) => {
  const [selectedService, setSelectedService] = useState('kedarnath-sameday');
  const [origin, setOrigin] = useState('Dehradun (Sahastradhara Helipad)');
  const [destination, setDestination] = useState('Kedarnath Shrine (Direct Shuttle)');
  const [date, setDate] = useState('May 15, 2026');
  const [passengers, setPassengers] = useState('4 Devotees (VIP Darshan)');

  const serviceTabs = [
    { id: 'kedarnath-sameday', label: 'KEDARNATH VIP', defOrigin: 'Dehradun (Sahastradhara)', defDest: 'Kedarnath Helipad' },
    { id: 'chardham-4dham', label: 'CHARDHAM 4 DHAM', defOrigin: 'Dehradun (Sahastradhara)', defDest: 'Yamunotri • Gangotri • Kedarnath • Badrinath' },
    { id: 'flower-dropping', label: 'FLOWER DROPPING', defOrigin: 'Selected City / Helipad', defDest: 'Wedding / Temple Event Venue' },
    { id: 'corporate-charter', label: 'PRIVATE CHARTER', defOrigin: 'Delhi / Mumbai / Custom', defDest: 'Any Helipad in India' },
  ];

  const handleTabChange = (tab) => {
    setSelectedService(tab.id);
    setOrigin(tab.defOrigin);
    setDestination(tab.defDest);
  };

  const handleSearchSubmit = () => {
    onQuickBook(selectedService, origin, destination);
  };

  return (
    <div className="w-full max-w-[1180px] flex flex-col z-20 relative">
      {/* 1. Service Selection Tabs */}
      <div className="flex items-center overflow-x-auto no-scrollbar mb-0 select-none w-full">
        <div className="flex items-center bg-black/40 backdrop-blur-md p-1 border-t border-x border-white/10 w-full sm:w-auto">
          {serviceTabs.map((tab) => {
            const isActive = selectedService === tab.id;
            return (
              <button
                key={tab.id}
                id={`hero-tab-${tab.id}`}
                onClick={() => handleTabChange(tab)}
                className={`px-4 sm:px-6 py-2.5 text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#c8102e] text-white shadow-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Primary Booking Bar Inputs */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-px bg-white/10 border border-white/10 shadow-2xl backdrop-blur-md select-none overflow-hidden">
        {/* Origin Field */}
        <div
          onClick={() => onQuickBook(selectedService, origin, destination)}
          className="lg:col-span-3 bg-black/75 hover:bg-black/90 p-4 lg:p-5 transition-colors cursor-pointer flex flex-col justify-center min-h-[78px] group"
        >
          <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase mb-1 group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-[#c8102e]" />
            DEPARTURE BASE
          </span>
          <div className="text-[13.5px] sm:text-[14.5px] font-semibold text-white truncate group-hover:text-white transition-colors">
            {origin}
          </div>
        </div>

        {/* Destination Field */}
        <div
          onClick={() => onQuickBook(selectedService, origin, destination)}
          className="lg:col-span-4 bg-black/75 hover:bg-black/90 p-4 lg:p-5 transition-colors cursor-pointer flex flex-col justify-center min-h-[78px] group"
        >
          <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase mb-1 group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            <Plane className="w-3 h-3 text-[#c8102e]" />
            SACRED DESTINATION / ROUTE
          </span>
          <div className="text-[13.5px] sm:text-[14.5px] font-semibold text-white truncate group-hover:text-white transition-colors">
            {destination}
          </div>
        </div>

        {/* Date Field */}
        <div
          onClick={() => onQuickBook(selectedService, origin, destination)}
          className="lg:col-span-2 bg-black/75 hover:bg-black/90 p-4 lg:p-5 transition-colors cursor-pointer flex flex-col justify-center min-h-[78px] group"
        >
          <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase mb-1 group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#c8102e]" />
            TRAVEL DATE
          </span>
          <div className="text-[13.5px] sm:text-[14.5px] font-semibold text-white truncate">
            {date}
          </div>
        </div>

        {/* Passengers / Payload */}
        <div
          onClick={() => onQuickBook(selectedService, origin, destination)}
          className="lg:col-span-2 bg-black/75 hover:bg-black/90 p-4 lg:p-5 transition-colors cursor-pointer flex flex-col justify-center min-h-[78px] group"
        >
          <span className="text-[10px] font-bold tracking-[0.16em] text-neutral-400 uppercase mb-1 group-hover:text-red-400 transition-colors flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#c8102e]" />
            PASSENGERS
          </span>
          <div className="text-[13.5px] sm:text-[14.5px] font-semibold text-white truncate">
            {passengers}
          </div>
        </div>

        {/* Submit Arrow CTA Button */}
        <div className="lg:col-span-1 bg-black/75 flex items-center justify-center p-2 lg:p-0 min-h-[60px] lg:min-h-[78px]">
          <button
            id="flight-search-submit"
            onClick={handleSearchSubmit}
            aria-label="Request Helicopter Flight"
            className="w-full h-full bg-[#c8102e] hover:bg-red-700 active:scale-95 text-white flex items-center justify-center p-4 lg:p-0 transition-all duration-200 cursor-pointer group shadow-lg"
          >
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. Quick Action Shortcut Badges */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 select-none">
        <button
          onClick={() => onNavigate('char-dham-yatra-by-helicopter')}
          className="flex items-center gap-2.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xs transition-all cursor-pointer group border border-white/10 text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase"
        >
          <Plane className="w-3.5 h-3.5 text-[#c8102e]" />
          <span>Chardham 4 Dham Packages</span>
        </button>

        <button
          onClick={() => onNavigate('helicopter-flower-dropping')}
          className="flex items-center gap-2.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xs transition-all cursor-pointer group border border-white/10 text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-[#c8102e]" />
          <span>Aerial Flower Dropping</span>
        </button>

        <button
          onClick={() => onNavigate('private-helicopter-charter')}
          className="flex items-center gap-2.5 bg-black/60 hover:bg-black/85 backdrop-blur-md text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xs transition-all cursor-pointer group border border-white/10 text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#c8102e]" />
          <span>Corporate & Medical Evacuation</span>
        </button>
      </div>
    </div>
  );
};

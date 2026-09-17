'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Clock, 
  AlertCircle, 
  Briefcase, 
  Camera, 
  Activity, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { CHARTER_SERVICES } from '../../data/bookmychardhamData';

export const CharterPage = ({
  onNavigate,
  onSelectServiceForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState('corporate-charter');

  const selectedCharter = CHARTER_SERVICES.find((s) => s.id === activeCategory) || CHARTER_SERVICES[0];

  return (
    <div className="w-full text-[#6B4E3D] bg-[#F3E9D0]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#A67C52]/20 overflow-hidden bg-gradient-to-b from-[#D9C7B8] to-[#F3E9D0]">
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/airplane_sunset_bg_1788159475386-optimized.webp"
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src="/private%20helicopter.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#1d120f]/55" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-3">
              EXECUTIVE &amp; MISSION-CRITICAL FLIGHTS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#6B4E3D] tracking-tight leading-none font-sans">
              PRIVATE HELICOPTER CHARTERS &amp; AIR AMBULANCE
            </h1>
            <p className="text-[#6B4E3D] text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
              Direct point-to-point rotary aviation across India. Whether you require executive business shuttles, discreet VIP transport, high-precision aerial cinematography, or life-saving emergency medical evacuations.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => {
                  onSelectServiceForBooking?.('corporate-charter');
                  onNavigate?.('booking');
                }}
                className="bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>REQUEST CHARTER QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919355611996"
                className="bg-[#A67C52]/10 hover:bg-[#A67C52]/20 text-[#6B4E3D] border border-[#A67C52]/20 px-6 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#8B6639]" />
                <span>24/7 CHARTER DESK</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EMERGENCY HOTLINE CALLOUT BAR */}
      <section className="bg-[#D9C7B8] border-y border-[#8B6639]/60 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#8B6639] animate-ping shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B6639] block">
                24/7 EMERGENCY AIR AMBULANCE (HEMS) DESK
              </span>
              <span className="text-sm font-bold text-[#6B4E3D]">
                Life-Support ICU Helicopters Dispatched within 45 Minutes
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919355611996"
              className="flex items-center gap-2 bg-[#A67C52] hover:bg-[#8B6639] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>EMERGENCY SOS: +91 93556 11996</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. CHARTER SERVICE CATEGORIES MATRIX */}
      <section className="py-20 lg:py-24 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          {/* Category Switcher Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-12">
            {CHARTER_SERVICES.map((s) => {
              const isSelected = activeCategory === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveCategory(s.id)}
                  className={`p-4 sm:p-5 text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D9C7B8] border-[#A67C52] text-[#6B4E3D] shadow-lg'
                      : 'bg-[#E6D5C1] border-[#A67C52]/20 text-[#A67C52] hover:text-[#6B4E3D] hover:bg-[#D9C7B8]'
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase block mb-1 text-[#A67C52]">
                    SERVICE {s.id === 'corporate-charter' ? '01' : s.id === 'vip-transport' ? '02' : s.id === 'aerial-filming' ? '03' : '04'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider block">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Solution Block */}
          <div className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#A67C52] uppercase block mb-1">
                  DETAILED CAPABILITY
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
                  {selectedCharter.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6B4E3D] mt-1 font-semibold">
                  {selectedCharter.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#A67C52] mt-4 leading-relaxed">
                  {selectedCharter.description}
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 pt-4 border-t border-[#A67C52]/20">
                {selectedCharter.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#6B4E3D]">
                    <CheckCircle2 className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#A67C52]/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A67C52] block">
                    STANDARD CHARTER TARIFF
                  </span>
                  <div className="text-lg sm:text-xl font-bold text-[#6B4E3D]">
                    {selectedCharter.startingRate}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectServiceForBooking?.(selectedCharter.id);
                    onNavigate?.('booking');
                  }}
                  className="bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>BOOK THIS SERVICE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <div className="border border-[#A67C52]/20 bg-[#D9C7B8] p-2">
                <Image
                  src={selectedCharter.image}
                  alt={selectedCharter.title}
                  width={800}
                  height={384}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-80 sm:h-96 object-cover filter brightness-95"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet section removed Sep 2026 (CLAIMS.md A6, §D). It presented named
          aircraft types as our own deployed fleet. Restore as partner framing
          once TRUE-02 establishes what we own versus what we book, and only
          with photographs of aircraft we actually fly. */}
    </div>
  );
};

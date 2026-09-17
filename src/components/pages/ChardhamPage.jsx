'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { CHARDHAM_PACKAGES, CHARDHAM_ITINERARY, CHARDHAM_GUIDELINES } from '../../data/bookmychardhamData';

export const ChardhamPage = ({
  onNavigate,
  onSelectServiceForBooking,
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState('chardham-4-dham-package');
  const [openDay, setOpenDay] = useState(1);

  const activePackage = CHARDHAM_PACKAGES.find((p) => p.id === selectedPackageId) || CHARDHAM_PACKAGES[0];

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
            <source src="/chardham%20%26%20kedarnath%20heli-yatra.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#1d120f]/55" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B6639]/40 border border-[#8B6639]/60 text-[#8B6639] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Himalayan Pilgrimage by Air</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#6B4E3D] tracking-tight leading-none font-sans">
              CHARDHAM &amp; KEDARNATH HELI-YATRA
            </h1>
            <p className="text-[#6B4E3D] text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
              Experience the divine presence of Yamunotri, Gangotri, Kedarnath, and Badrinath with India&apos;s most trusted high-altitude aviation operator. Daily departures from Sahastradhara Helipad, Dehradun with VIP priority Darshan passes.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => {
                  onSelectServiceForBooking?.('chardham-4dham', selectedPackageId);
                  onNavigate?.('booking');
                }}
                className="bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>BOOK CHARDHAM YATRA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+919355611996"
                className="bg-[#A67C52]/10 hover:bg-[#A67C52]/20 text-[#6B4E3D] border border-[#A67C52]/20 px-6 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#8B6639]" />
                <span>SPEAK WITH YATRA DESK</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PACKAGES COMPARISON MATRIX */}
      <section className="py-20 lg:py-24 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
                OFFICIAL HELI-TOUR PACKAGES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
                SELECT YOUR PILGRIMAGE ITINERARY
              </h2>
            </div>
            <span className="text-xs text-[#A67C52]">
              *All packages operate subject to DGCA weather clearance
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {CHARDHAM_PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`bg-[#D9C7B8] border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between cursor-pointer relative ${
                    isSelected
                      ? 'border-[#A67C52] shadow-xl shadow-[#A67C52]/30'
                      : 'border-[#A67C52]/20 hover:border-[#A67C52]/30'
                  }`}
                >
                  {pkg.tag && (
                    <div className="absolute -top-3 right-6 bg-[#A67C52] text-white text-[10px] font-black tracking-widest px-2.5 py-0.5 uppercase">
                      {pkg.tag}
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#A67C52] block mb-2">
                      {pkg.duration}
                    </span>
                    <h3 className="text-xl font-bold uppercase text-[#6B4E3D] mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#A67C52] leading-relaxed mb-6">
                      {pkg.subtitle}
                    </p>

                    <div className="space-y-2 mb-6">
                      {pkg.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#6B4E3D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C52] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#A67C52]/20 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] text-[#A67C52] uppercase tracking-widest block">
                        TARIFF PER DEVOTEE
                      </span>
                      <div className="text-2xl font-black text-[#6B4E3D]">
                        {pkg.price}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectServiceForBooking?.('chardham-4dham', pkg.id);
                        onNavigate?.('booking');
                      }}
                      className="bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      SELECT
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DAY-BY-DAY SACRED ITINERARY (Accordion / Detailed Walkthrough) */}
      <section className="py-20 lg:py-24 bg-[#F3E9D0] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
              DAY-BY-DAY TIMELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
              THE COMPLETE 5-DAY / 4-NIGHT CHARDHAM FLIGHT BLUEPRINT
            </h2>
            <p className="text-[#A67C52] text-xs sm:text-sm mt-3 leading-relaxed">
              Every detail is managed end-to-end: executive helipad transfers, mountain acclimatization, VIP temple slips, and luxury alpine resort accommodations.
            </p>
          </div>

          <div className="space-y-4">
            {CHARDHAM_ITINERARY.map((item) => {
              const isOpen = openDay === item.day;
              return (
                <div
                  key={item.day}
                  className="bg-[#D9C7B8] border border-[#A67C52]/20 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenDay(isOpen ? 0 : item.day)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-[#A67C52]/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-10 h-10 bg-[#A67C52]/20 border border-[#A67C52]/50 text-[#A67C52] font-black text-sm flex items-center justify-center font-mono shrink-0">
                        0{item.day}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A67C52]">
                            {item.shrine}
                          </span>
                          <span className="text-[#A67C52]/60">•</span>
                          <span className="text-xs text-[#A67C52] font-mono">
                            {item.altitude}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold uppercase text-[#6B4E3D] mt-0.5">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-[#A67C52]">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#A67C52]/10 text-[#6B4E3D] text-xs sm:text-sm leading-relaxed space-y-4">
                      <p>{item.details}</p>
                      <div className="flex flex-wrap gap-4 pt-2 text-xs">
                        <div className="bg-[#F3E9D0]/60 px-3 py-1.5 border border-[#A67C52]/20 text-[#6B4E3D]">
                          <strong>Night Stay:</strong> {item.stay}
                        </div>
                        <div className="bg-[#F3E9D0]/60 px-3 py-1.5 border border-[#A67C52]/20 text-[#6B4E3D]">
                          <strong>Darshan:</strong> {item.darshan}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PASSENGER GUIDELINES & HIGH-ALTITUDE COMFORT */}
      <section className="py-20 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
              MANDATORY AVIATION PROTOCOLS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
              PILGRIM ADVISORY &amp; DGCA COMPLIANCE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHARDHAM_GUIDELINES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/20 flex items-center justify-center text-xs font-bold text-[#A67C52] font-mono mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold uppercase text-[#6B4E3D] mb-2">
                    {item.topic}
                  </h3>
                  <p className="text-xs text-[#A67C52] leading-relaxed">
                    {item.rule}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOOKING CALLOUT */}
      <section className="py-16 bg-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#6B4E3D] mb-3">
            SEATS FOR CHARDHAM 2026 NOW OPEN
          </h2>
          <p className="text-[#A67C52] text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Slots are allocated strictly on a first-come, first-served basis as per Uttarakhand Civil Aviation Development Authority (UCADA) guidelines.
          </p>
          <button
            onClick={() => {
              onSelectServiceForBooking?.('chardham-4dham');
              onNavigate?.('booking');
            }}
            className="bg-[#A67C52] hover:bg-[#8B6639] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>RESERVE SEATS WITH ADVANCE DEPOSIT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

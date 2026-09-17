'use client';

import React from 'react';
import Image from 'next/image';
import { 
  HeartHandshake, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  MapPin,
  Clock
} from 'lucide-react';
import { FLOWER_DROPPING_PACKAGES } from '../../data/bookmychardhamData';

export const FlowerDroppingPage = ({
  onNavigate,
  onSelectServiceForBooking,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Event Venue & Helipad Feasibility Survey',
      desc: 'Our flight operations team analyzes your celebration venue GPS coordinates to identify nearby landing zones or temporary helipads.',
    },
    {
      step: '02',
      title: 'DGCA, Police & District Administration Clearances',
      desc: 'BookMyChardham manages end-to-end regulatory permissions, including District Magistrate (DM) NOC, local police clearances, and ATC flight plans.',
    },
    {
      step: '03',
      title: 'Fresh Rose Petal Procurement & Payload Prep',
      desc: 'Selected fresh, fragrant red, pink, and yellow rose/marigold petals are sorted, weighed, and loaded into specialized aerodynamic dispensing hoppers.',
    },
    {
      step: '04',
      title: 'Precision Aerial Flower Shower at Keynote Moment',
      desc: 'Our pilot synchronizes with your event planner (via ground-to-air radio) to release a celestial shower precisely as the Varmala or Aarti begins.',
    },
  ];

  const occasions = [
    {
      title: 'Royal Indian Weddings',
      tag: 'MOST POPULAR',
      desc: 'Petals released over the Varmala, the Baraat entry or the Pheras — you pick the moment, and we brief the pilot on the cue.',
    },
    {
      title: 'Temple Pran Pratishtha & Mahotsavs',
      tag: 'RELIGIOUS',
      desc: 'A sacred pushp varsha over temple spires, deities, and religious processions (Shobha Yatra, Rath Yatra, Kumbh congregations).',
    },
    {
      title: 'VIP Rallies & Stadium Events',
      tag: 'PUBLIC GATHERINGS',
      desc: 'High-impact aerial petal showers over inaugurations, political rallies, national sports celebrations, and festival gatherings.',
    },
    {
      title: 'Memorial Tributes & Shradhanjali',
      tag: 'MEMORIALS',
      desc: 'Dignified, serene aerial flower drops honoring revered souls, military veterans, and departed family elders.',
    },
  ];

  return (
    <div className="w-full text-[#6B4E3D] bg-[#F3E9D0]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#A67C52]/20 overflow-hidden bg-gradient-to-b from-[#D9C7B8] via-[#E6D5C1] to-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B6639]/50 border border-[#8B6639]/40 text-[#8B6639] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ceremonial Aerial Aviation</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#6B4E3D] tracking-tight leading-none font-sans">
                AERIAL FLOWER DROPPING CEREMONIES
              </h1>
              <p className="text-[#6B4E3D] text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
                Thousands of fresh rose petals, released over your wedding, Pran Pratishtha or public celebration from a helicopter holding a steady hover. Booked 15 to 21 days ahead, because the NOCs take that long.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={() => {
                    onSelectServiceForBooking?.('flower-dropping');
                    onNavigate?.('booking');
                  }}
                  className="bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white px-7 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span>BOOK FLOWER SHOWER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+919355611996"
                  className="bg-[#A67C52]/10 hover:bg-[#A67C52]/20 text-[#6B4E3D] border border-[#A67C52]/20 px-6 py-3.5 text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#8B6639]" />
                  <span>CONSULT WEDDING DESK</span>
                </a>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="border border-[#A67C52]/20 bg-[#D9C7B8] p-2 relative">
                <Image
                  src="/images/flystar_flower_dropping_1788161916372.webp"
                  alt="Helicopter Aerial Flower Dropping at Royal Wedding"
                  width={800}
                  height={384}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="eager"
                  className="w-full h-80 sm:h-96 object-cover filter brightness-95"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#F3E9D0]/85 backdrop-blur-md p-4 border border-[#A67C52]/20 text-xs">
                  <span className="text-[#A67C52] font-bold uppercase tracking-wider block">
                    Varmala Aerial Pushp Varsha
                  </span>
                  <span className="text-[#6B4E3D] text-[11px] block mt-0.5">
                    100 kg Fresh Red &amp; Pink Rose Petals over Lake Palace Courtyard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OCCASIONS GRID */}
      <section className="py-20 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
              CELEBRATIONS &amp; SACRED RITUALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
              PERFECT OCCASIONS FOR AERIAL PETAL SHOWERS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {occasions.map((occ) => (
              <div
                key={occ.title}
                className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 flex flex-col justify-between hover:border-[#8B6639]/40 transition-colors"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52] mb-2 block">
                    {occ.tag}
                  </span>
                  <h3 className="text-lg font-bold uppercase text-[#6B4E3D] mb-2">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-[#A67C52] leading-relaxed">
                    {occ.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: 4-STEP PROCESS */}
      <section className="py-20 lg:py-24 bg-[#F3E9D0] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
              EXECUTION BLUEPRINT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
              HOW BOOK MY CHARDHAM DELIVERS FLAWLESS CEREMONIES
            </h2>
            <p className="text-[#A67C52] text-xs sm:text-sm mt-3 leading-relaxed">
              We handle every regulatory, safety, and logistical detail so you can focus entirely on enjoying your monumental day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-[#A67C52] font-mono mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-sm font-bold uppercase text-[#6B4E3D] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#A67C52] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PACKAGES & PRICING TIERS */}
      <section className="py-20 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
                CUSTOM FLOWER DROPPING PACKAGES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
                SELECT CEREMONY SCALE
              </h2>
            </div>
            <span className="text-xs text-[#A67C52]">
              Includes Petals, Loading, Helicopter Sortie &amp; Regulatory Clearances
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {FLOWER_DROPPING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 sm:p-8 flex flex-col justify-between hover:border-[#A67C52]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#A67C52] uppercase tracking-widest">
                      {pkg.sorties}
                    </span>
                    <span className="text-xs font-semibold text-[#6B4E3D]">
                      {pkg.capacity}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase text-[#6B4E3D] mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-[#A67C52] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-[#6B4E3D] border-t border-[#A67C52]/20 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6639]" />
                      <span>Fresh natural rose &amp; marigold petals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6639]" />
                      <span>DGCA &amp; District Administration approvals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6639]" />
                      <span>Ground-to-air radio coordination</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#A67C52]/20 flex items-center justify-between">
                  <div className="text-sm font-bold text-[#6B4E3D]">
                    {pkg.price}
                  </div>
                  <button
                    onClick={() => {
                      onSelectServiceForBooking?.('flower-dropping', pkg.id);
                      onNavigate?.('booking');
                    }}
                    className="bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    BOOK CEREMONY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CEREMONY CTA */}
      <section className="py-16 bg-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#6B4E3D] mb-3">
            HAVE A UNIQUE EVENT LOCATION OR DATE?
          </h2>
          <p className="text-[#A67C52] text-xs sm:text-sm max-w-xl mx-auto mb-6">
            Our wedding &amp; special event aviation team is available 7 days a week to review your venue coordinates and coordinate all DGCA permissions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                onSelectServiceForBooking?.('flower-dropping');
                onNavigate?.('booking');
              }}
              className="bg-[#A67C52] hover:bg-[#8B6639] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
            >
              REQUEST CUSTOM FLOWER DROP QUOTE
            </button>
            <a
              href="tel:+919355611996"
              className="bg-[#A67C52]/10 hover:bg-[#A67C52]/20 text-[#6B4E3D] border border-[#A67C52]/20 px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all"
            >
              CALL +91 93556 11996
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

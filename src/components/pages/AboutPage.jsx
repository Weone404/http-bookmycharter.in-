'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  Phone,
  Plane,
  Heart
} from 'lucide-react';
import { TRUST_STATS } from '../../data/bookmychardhamData';

export const AboutPage = ({ onNavigate }) => {
  const values = [
    {
      title: 'Safety as a Sacred Mandate',
      desc: 'No commercial pressure ever overrides our pilot’s call on mountain weather or aircraft payload limits.',
    },
    {
      title: 'Devotional Reverence',
      desc: 'We treat every pilgrim journey to Kedarnath and Badrinath as a sacred seva, ensuring utmost comfort for senior citizens.',
    },
    {
      title: 'Aeronautical Precision',
      desc: 'From VIP executive charters to precision flower drops, every mission is flown with military-grade rigor.',
    },
    {
      title: 'Total Discretion & Privacy',
      desc: 'Uncompromising non-disclosure protocols and private boarding for high-net-worth individuals and statesmen.',
    },
  ];

  return (
    <div className="w-full text-[#6B4E3D] bg-[#F3E9D0]">
      {/* 1. HERO HEADER */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#A67C52]/20 overflow-hidden bg-gradient-to-b from-[#D9C7B8] to-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-3">
              ABOUT BOOKMYCHARDHAM AVIATION
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#6B4E3D] tracking-tight leading-none font-sans">
              FLYING THE CHAR DHAM CIRCUIT
            </h1>
            <p className="text-[#6B4E3D] text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
              Book My CharDham arranges chartered flights for the Char Dham and Kedarnath yatra, and private charter across India. Every sector we sell is flown by operators holding a DGCA Non-Scheduled Operator Permit &mdash; the licence Indian law requires of anyone carrying you commercially.
            </p>
          </div>
        </div>
      </section>

      {/* 2. COMPANY STORY & CERTIFICATIONS */}
      <section className="py-20 lg:py-24 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#A67C52] uppercase block">
                OUR HERITAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
                PIONEERING HIGH-ALTITUDE AVIATION IN INDIA
              </h2>
              <p className="text-[#A67C52] text-sm leading-relaxed">
                Book My CharDham arranges chartered flights into some of the most demanding flying country in the world: the Garhwal Himalaya, where thin air limits payload, valleys close without warning, and the margin for a casual decision is nil.
              </p>
              <p className="text-[#A67C52] text-sm leading-relaxed">
                We book three kinds of flying: Char Dham and Kedarnath yatra by helicopter, aerial flower dropping for weddings and temple events, and private charter from Indian airports. Every sector is flown by an operator holding a DGCA Non-Scheduled Operator Permit.
              </p>

              {/* Certifications Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-[#D9C7B8] border border-[#A67C52]/20">
                  <ShieldCheck className="w-5 h-5 text-[#A67C52] mb-2" />
                  <span className="text-xs font-bold uppercase text-[#6B4E3D] block">
                    DGCA NSOP Operators
                  </span>
                  <span className="text-[11px] text-[#A67C52] mt-0.5 block">
                    Every flight is operated under a valid Non-Scheduled Operator Permit
                  </span>
                </div>

                <div className="p-4 bg-[#D9C7B8] border border-[#A67C52]/20">
                  <Award className="w-5 h-5 text-[#A67C52] mb-2" />
                  <span className="text-xs font-bold uppercase text-[#6B4E3D] block">
                    One Accountable Desk
                  </span>
                  <span className="text-[11px] text-[#A67C52] mt-0.5 block">
                    One specialist between you and the operator &mdash; no agent chains
                  </span>
                </div>

                <div className="p-4 bg-[#D9C7B8] border border-[#A67C52]/20">
                  <CheckCircle2 className="w-5 h-5 text-[#A67C52] mb-2" />
                  <span className="text-xs font-bold uppercase text-[#6B4E3D] block">
                    Weather Comes First
                  </span>
                  <span className="text-[11px] text-[#A67C52] mt-0.5 block">
                    The pilot&apos;s call on safety is final, and we plan around it
                  </span>
                </div>
              </div>
            </div>

            {/* Right Image / Stats (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="border border-[#A67C52]/20 bg-[#D9C7B8] p-2 relative">
                <Image
                  src="/images/flystar_himalayan_fleet_1788161946820.webp"
                  alt="Himalayan peaks on the Kedarnath sector"
                  width={800}
                  height={384}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-80 sm:h-96 object-cover filter brightness-95"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#F3E9D0]/85 backdrop-blur-md p-4 border border-[#A67C52]/20 text-xs">
                  <span className="text-[#A67C52] font-bold uppercase tracking-widest block text-[10px]">
                    HOW WE FLY
                  </span>
                  <span className="text-[#6B4E3D] font-bold text-sm block mt-0.5">
                    Every sector is flown by DGCA NSOP-certified operators
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet section removed Sep 2026: the imagery was AI-generated with
          invented liveries and registrations, and the fleet claim is unverified.
          Restore only with real photographs of aircraft we operate or charter,
          and wording that matches CLAIMS.md. */}

      {/* Leadership section removed Sep 2026 (CLAIMS.md A1-A3). It named three
          individuals with military rank, licence class and flight-hour figures.
          Restore only with employment records AND each person’s written consent
          to publish their service history. Real, this is the strongest E-E-A-T
          asset on the site; unverified, it is the most serious claim on it. */}

      {/* 5. MISSION & VALUES */}
      <section className="py-20 bg-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
              GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
              OUR CORE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 bg-[#D9C7B8] border border-[#A67C52]/20">
                <h3 className="text-base font-bold uppercase text-[#6B4E3D] mb-2">
                  {v.title}
                </h3>
                <p className="text-xs text-[#A67C52] leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 p-8 bg-[#E6D5C1] border border-[#A67C52]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold uppercase text-[#6B4E3D]">
                PLANNING A HIGH-ALTITUDE OR CHARTER MISSION?
              </h3>
              <p className="text-xs text-[#A67C52] mt-1">
                Speak directly with our Chief Flight Operations Coordinator.
              </p>
            </div>
            <button
              onClick={() => onNavigate?.('contact')}
              className="bg-[#A67C52] hover:bg-[#8B6639] text-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all shrink-0 cursor-pointer"
            >
              CONTACT FLIGHT DESK
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

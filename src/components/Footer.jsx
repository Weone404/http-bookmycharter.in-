'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Mail, MapPin, Shield, ArrowUpRight } from 'lucide-react';
import { BookMyChardhamLogo } from './BookMyChardhamLogo';

export const Footer = ({ onNavigate }) => {
  const router = useRouter();

  const handleNav = (page) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      const route = page === 'home' ? '/' : `/${page}`;
      router.push(route);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#E6D5C1] border-t border-[#A67C52]/30 text-[#A67C52] text-xs relative z-20 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-10 pb-14 border-b border-white/10">
          {/* Col 1: Brand info & Credentials */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <BookMyChardhamLogo onClick={() => handleNav('home')} />
            <p className="text-[13px] text-[#A67C52] leading-relaxed font-normal pt-2 max-w-md">
              BookMyChardham (bookmychardham.in) is India's premier helicopter aviation charter service. Specializing in high-altitude Himalayan pilgrimage tours to Chardham & Kedarnath, royal aerial flower dropping ceremonies, and rapid corporate & medical emergency charter flights.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#6B4E3D]">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#D9C7B8]/60 border border-[#A67C52]/30 rounded-xs uppercase tracking-wider font-bold">
                <Shield className="w-3.5 h-3.5 text-[#A67C52]" />
                Flown by DGCA NSOP-certified operators
              </span>
            </div>
          </div>

          {/* Col 2: Pilgrimage & Services */}
          <div className="flex flex-col space-y-3">
            <span className="text-[11.5px] font-bold tracking-[0.18em] text-[#6B4E3D] uppercase mb-1">
              SACRED PILGRIMAGE
            </span>
            <button
              onClick={() => handleNav('char-dham-yatra-by-helicopter')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Chardham 4 Dham (5D/4N)
            </button>
            <button
              onClick={() => handleNav('char-dham-yatra-by-helicopter')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Kedarnath Same Day Tour
            </button>
            <button
              onClick={() => handleNav('char-dham-yatra-by-helicopter')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Do Dham (Kedarnath & Badrinath)
            </button>
            <button
              onClick={() => handleNav('char-dham-yatra-by-helicopter')}
              className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer py-0.5"
            >
              Badrinath VIP Darshan
            </button>
            <button
              onClick={() => handleNav('helicopter-flower-dropping')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5 font-semibold"
            >
              Aerial Flower Dropping →
            </button>
          </div>

          {/* Col 3: Charters & Fleet */}
          <div className="flex flex-col space-y-3">
            <span className="text-[11.5px] font-bold tracking-[0.18em] text-[#6B4E3D] uppercase mb-1">
              CHARTER & FLEET
            </span>
            <button
              onClick={() => handleNav('private-jet-charter')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Private Jet Charter
            </button>
            <button
              onClick={() => handleNav('private-jet-charter-booking')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Private Jet Charter Booking
            </button>
            <button
              onClick={() => handleNav('corporate-jet-charter')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Corporate Jet Charter
            </button>
            <button
              onClick={() => handleNav('business-jet-charter')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Business Jet Charter
            </button>
            <button
              onClick={() => handleNav('helicopter-charter-services')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Helicopter Charter Services
            </button>
          </div>

          {/* Col 5: Travel Guides */}
          <div className="flex flex-col space-y-3">
            <span className="text-[11.5px] font-bold tracking-[0.18em] text-[#6B4E3D] uppercase mb-1">
              TRAVEL GUIDES
            </span>
            <button
              onClick={() => handleNav('blogs')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Blogs &amp; Travel Advice
            </button>
            <button
              onClick={() => handleNav('blogs#kedarnath-helicopter-yatra-guide')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Kedarnath Yatra Guide
            </button>
            <button
              onClick={() => handleNav('blogs#char-dham-helicopter-yatra')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Char Dham Travel Guide
            </button>
            <button
              onClick={() => handleNav('blogs#private-charter-flight-planning')}
              className="text-left text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer py-0.5"
            >
              Private Charter Planning
            </button>
          </div>

          {/* Col 4: 24/7 Dispatch & Contact */}
          <div className="flex flex-col space-y-3">
            <span className="text-[11.5px] font-bold tracking-[0.18em] text-[#6B4E3D] uppercase mb-1">
              24/7 OPERATIONS DESK
            </span>
            <div className="flex items-start gap-2 text-[#6B4E3D]">
              <Phone className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
              <div>
                <a href="tel:+919355611996" className="font-bold hover:text-[#A67C52] transition-colors block text-[13px]">
                  +91 93556 11996
                </a>
                <span className="text-[10.5px] text-[#A67C52]/70">Toll-free / WhatsApp available</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#A67C52] shrink-0" />
              <a href="mailto:info@bookmychardham.in" className="text-[#6B4E3D] hover:text-[#A67C52] transition-colors">
                info@bookmychardham.in
              </a>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
              <span className="text-[11.5px] text-[#A67C52]/70">
                C705, Sector 7, Block C, Palam Extension, Dwarka, Delhi, 110077
              </span>
            </div>

            <button
              onClick={() => handleNav('contact')}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#6B4E3D] uppercase tracking-wider hover:text-[#A67C52] transition-colors cursor-pointer"
            >
              <span>View All 4 Bases & Helipads</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A67C52]/70 gap-4">
          <div className="tracking-wider uppercase">
            © {new Date().getFullYear()} Book My CharDham (bookmychardham.in) — All Rights Reserved.
          </div>
          <div className="flex items-center gap-6 tracking-wider uppercase font-medium">
            <button onClick={() => handleNav('about')} className="text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer">
              Safety Charter
            </button>
            <button onClick={() => handleNav('contact')} className="text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer">
              Helipad Access
            </button>
            <button onClick={() => handleNav('booking')} className="text-[#A67C52] hover:text-[#6B4E3D] transition-colors cursor-pointer font-bold">
              Book Flights
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

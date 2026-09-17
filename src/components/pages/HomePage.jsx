import React from 'react';
import Image from 'next/image';
import { HeroTitle } from '../HeroTitle';
import { HomeHero } from '../HomeHero';
import { NavigationButton } from '../NavigationButton';
import { AnimatedStats } from '../AnimatedStats';
import { TrustStatBar } from '../TrustStatBar';
import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Award,
  ChevronRight
} from 'lucide-react';
import { TESTIMONIALS } from '../../data/bookmychardhamData';
import { 
} from '../../utils/animations';
import { FadeInOnScroll, HoverLiftCard } from '../animations/AnimationComponents';

export const HomePage = () => {
  return (
    <div className="w-full text-[var(--text-primary)]">
      {/* 1. HERO SECTION (Preserving the iconic visual system) */}
      <section className="min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-end px-4 sm:px-6 md:px-10 lg:px-12 pb-14 lg:pb-18 relative z-10 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col mb-4">
            <HomeHero variant="badge" />
            <HeroTitle />
          </div>

          <HomeHero variant="search" />
        </div>
      </section>

      {/* 2. TRUST STATS BAR */}
      <TrustStatBar />

      {/* 3. OUR SERVICES OVERVIEW (Asymmetrical, High Craft Layout) */}
      <section className="py-20 lg:py-28 bg-[var(--brand-navy)] relative z-10 border-b border-[var(--brand-luxury)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <FadeInOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-[11px] font-bold tracking-[0.24em] text-[var(--brand-luxury)] uppercase block mb-2">
                EXCELLENCE IN ROTARY AVIATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase font-sans">
                Our Helicopter Charter Services
              </h2>
            </div>
            <p className="text-[var(--brand-luxury)] text-sm max-w-md leading-relaxed">
              From sacred Himalayan shrines to grand ceremonial flower showers and emergency medical evacuations, BookMyChardham delivers precision flight solutions.
            </p>
          </FadeInOnScroll>

          {/* Asymmetric Services Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Feature 1: Chardham & Kedarnath (Large 7 Cols) */}
            <FadeInOnScroll delay={0} className="lg:col-span-7">
              <HoverLiftCard className="bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 hover:border-[var(--brand-luxury)]/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <Image
                    src="/images/flystar_kedarnath_helicopter_1788161902244.webp"
                    alt="Kedarnath Helicopter Tour"
                    width={675}
                    height={320}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-subtle)] via-transparent to-[var(--background-subtle)]/30" />
                  <div className="absolute top-4 left-4 bg-[var(--brand-luxury)] text-[var(--text-inverse)] text-[10.5px] font-black tracking-widest px-3 py-1 uppercase">
                    PILGRIMAGE EXCELLENCE
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury)] uppercase">
                      SERVICE 01
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-[var(--text-primary)] mt-1 mb-3 group-hover:text-[var(--brand-luxury-hover)] transition-colors">
                      Chardham &amp; Kedarnath Heli-Tours
                    </h3>
                    <p className="text-[var(--text-primary)] text-xs sm:text-sm leading-relaxed mb-6">
                      Same-day Kedarnath shuttles and 5-Day VIP 4 Dham packages (Yamunotri, Gangotri, Kedarnath, Badrinath). Includes priority temple darshan passes and luxury stays.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--brand-luxury)]/20">
                    <div className="text-xs text-[var(--brand-luxury)]">
                      Starting from <span className="text-[var(--text-primary)] font-bold text-base">₹95,000</span> / seat
                    </div>
                    <NavigationButton
                      page="char-dham-yatra-by-helicopter"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] bg-[var(--brand-luxury)]/10 hover:bg-[var(--brand-luxury)] px-4 py-2.5 transition-all cursor-pointer"
                    >
                      <span>View All Packages</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NavigationButton>
                  </div>
                </div>
              </HoverLiftCard>
            </FadeInOnScroll>

            {/* Feature 2: Aerial Flower Dropping (5 Cols) */}
            <FadeInOnScroll delay={0.1} className="lg:col-span-5">
              <HoverLiftCard className="bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 hover:border-[var(--brand-luxury)]/30 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <Image
                    src="/images/flystar_flower_dropping_1788161916372.webp"
                    alt="Aerial Flower Dropping"
                    width={473}
                    height={320}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-subtle)] via-transparent to-[var(--background-subtle)]/30" />
                  <div className="absolute top-4 left-4 bg-[var(--background-subtle)] text-[var(--text-primary)] text-[10.5px] font-black tracking-widest px-3 py-1 uppercase">
                    CEREMONIAL FLIGHTS
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury)] uppercase">
                      SERVICE 02
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-[var(--text-primary)] mt-1 mb-3 group-hover:text-[var(--brand-luxury-hover)] transition-colors">
                      Aerial Flower Shower
                    </h3>
                    <p className="text-[var(--text-primary)] text-xs sm:text-sm leading-relaxed mb-6">
                      Awe-inspiring rose petal showers for royal weddings, temple inaugurations, and VIP events. Complete local administration and DGCA clearances handled by our operations team.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--brand-luxury)]/20">
                    <div className="text-xs text-[var(--brand-luxury)]">
                      Packages from <span className="text-[var(--text-primary)] font-bold text-base">50kg - 500kg</span>
                    </div>
                    <NavigationButton
                      page="helicopter-flower-dropping"
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] bg-[var(--brand-luxury)]/10 hover:bg-[var(--brand-luxury)] px-4 py-2.5 transition-all cursor-pointer"
                    >
                      <span>Ceremony Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NavigationButton>
                  </div>
                </div>
              </HoverLiftCard>
            </FadeInOnScroll>

            {/* Feature 3: Corporate & VIP Charter (6 Cols) */}
            <FadeInOnScroll delay={0.2} className="lg:col-span-6">
              <HoverLiftCard className="bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 hover:border-[var(--brand-luxury)]/30 transition-all duration-300 group p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury)] uppercase">
                    SERVICE 03
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 bg-[var(--brand-luxury)]/10 text-[var(--text-primary)]">
                    BUSINESS AVIATION
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-luxury-hover)] transition-colors">
                  Corporate &amp; VIP Charter
                </h3>
                <p className="text-[var(--brand-luxury)] text-xs sm:text-sm leading-relaxed mb-6">
                  Direct point-to-point rotary wing transportation for executives, site audits, and dignitaries. Skip congested terminals with seamless tarmac boarding across India.
                </p>
                <div className="pt-4 border-t border-[var(--brand-luxury)]/20 flex items-center justify-between">
                  <span className="text-xs text-[var(--brand-luxury)]">Bell 407 GX &amp; Airbus Fleet</span>
                  <NavigationButton
                    page="private-jet-charter"
                    className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--brand-luxury-hover)] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Explore Charters</span>
                    <ChevronRight className="w-4 h-4" />
                  </NavigationButton>
                </div>
              </HoverLiftCard>
            </FadeInOnScroll>

            {/* Feature 4: Emergency Medical Air Ambulance (6 Cols) */}
            <FadeInOnScroll delay={0.3} className="lg:col-span-6">
              <HoverLiftCard className="bg-[var(--background-subtle)] border border-[var(--brand-luxury-hover)]/40 hover:border-[var(--brand-luxury-hover)]/60 transition-all duration-300 group p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury-hover)] uppercase">
                    SERVICE 04 • 24/7 DISPATCH
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 bg-[var(--brand-luxury-hover)]/60 text-[var(--background-subtle)] border border-[var(--brand-luxury-hover)]/30">
                    CRITICAL CARE (HEMS)
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-luxury-hover)] transition-colors">
                  Emergency Air Ambulance
                </h3>
                <p className="text-[var(--text-primary)] text-xs sm:text-sm leading-relaxed mb-6">
                  Rapid aeromedical evacuation with onboard ICU equipment, ventilators, and emergency physicians. Rapid dispatch within 45 minutes for high-altitude mountain rescues.
                </p>
                <div className="pt-4 border-t border-[var(--brand-luxury-hover)]/40 flex items-center justify-between">
                  <a
                    href="tel:+919355611996"
                    className="text-xs font-bold text-[var(--brand-luxury-hover)] hover:text-[var(--text-primary)] flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Emergency Hotline: +91 93556 11996</span>
                  </a>
                  <NavigationButton
                    page="private-jet-charter"
                    className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--brand-luxury-hover)] transition-colors cursor-pointer"
                  >
                    Details →
                  </NavigationButton>
                </div>
              </HoverLiftCard>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE BOOKMYCHARDHAM (Pristine Craft Section) */}
      <section className="py-20 lg:py-28 bg-[var(--background-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Col: Core Value Props */}
            <FadeInOnScroll className="lg:col-span-6 flex flex-col space-y-6">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[var(--brand-luxury)] uppercase">
                UNCOMPROMISED SAFETY &amp; COMFORT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase font-sans leading-tight">
                WHY BOOKMYCHARDHAM LEADS INDIAN ROTARY AVIATION
              </h2>
              <p className="text-[var(--brand-luxury)] text-sm leading-relaxed">
                Operating in the high Himalayas demands exceptional aeronautical precision. BookMyChardham combines elite ex-defense aviators, OEM-maintained aircraft, and seamless VIP hospitality for devotees and corporate leaders alike.
              </p>

              <div className="space-y-4 pt-2">
                <FadeInOnScroll delay={0.1} className="flex items-start gap-4 p-4 bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 rounded-xs hover:border-[var(--brand-luxury)]/40 transition-colors">
                  <div className="p-2 bg-[var(--brand-luxury)]/20 text-[var(--brand-luxury)] rounded-xs shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[var(--text-primary)] tracking-wider">
                      Ex-Defense High-Altitude Captains
                    </h4>
                    <p className="text-xs text-[var(--brand-luxury)] mt-1 leading-relaxed">
                      Our command pilots average 4,000+ flying hours in extreme Himalayan terrain, mountain microclimates, and alpine helipad landings.
                    </p>
                  </div>
                </FadeInOnScroll>

                <FadeInOnScroll delay={0.2} className="flex items-start gap-4 p-4 bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 rounded-xs hover:border-[var(--brand-luxury)]/40 transition-colors">
                  <div className="p-2 bg-[var(--brand-luxury)]/20 text-[var(--brand-luxury)] rounded-xs shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[var(--text-primary)] tracking-wider">
                      Zero-Compromise Safety Protocol
                    </h4>
                    <p className="text-xs text-[var(--brand-luxury)] mt-1 leading-relaxed">
                      Strict adherence to DGCA safety directives, live satellite weather telemetry, and daily multi-point maintenance by certified AME engineers.
                    </p>
                  </div>
                </FadeInOnScroll>

                <FadeInOnScroll delay={0.3} className="flex items-start gap-4 p-4 bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 rounded-xs hover:border-[var(--brand-luxury)]/40 transition-colors">
                  <div className="p-2 bg-[var(--brand-luxury)]/20 text-[var(--brand-luxury)] rounded-xs shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[var(--text-primary)] tracking-wider">
                      Escorted VIP Darshan Passes
                    </h4>
                    <p className="text-xs text-[var(--brand-luxury)] mt-1 leading-relaxed">
                      Skip grueling 8+ hour queues. Our ground officers escort senior citizens and families directly through priority temple gates at Kedarnath and Badrinath.
                    </p>
                  </div>
                </FadeInOnScroll>
              </div>
            </FadeInOnScroll>

            {/* Right Col: Off-set Image & Fleet Highlights */}
            <FadeInOnScroll delay={0.2} className="lg:col-span-6 flex flex-col space-y-6">
              <HoverLiftCard className="relative border border-[var(--brand-luxury)]/20 bg-[var(--background-subtle)] p-2">
                <Image
                  src="/images/flystar_vip_charter_1788161931733.webp"
                  alt="BookMyChardham Executive Helicopter"
                  width={542}
                  height={384}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-80 sm:h-96 object-cover object-center filter brightness-95"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-[var(--background-subtle)]/85 backdrop-blur-md p-5 border border-[var(--brand-luxury)]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--brand-luxury)] uppercase tracking-widest block">
                        FLAGSHIP FLEET
                      </span>
                      <span className="text-lg font-bold text-[var(--text-primary)] uppercase">
                        Airbus H125 &amp; Bell 407 GX
                      </span>
                    </div>
                    <NavigationButton
                      page="about"
                      className="text-xs font-bold text-[var(--text-primary)] hover:text-[var(--brand-luxury)] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <span>Fleet Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NavigationButton>
                  </div>
                </div>
              </HoverLiftCard>

              {/* Quick Fleet Quick-Stats */}
              <AnimatedStats />
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* 5. PILGRIM & CLIENT TESTIMONIALS */}
      <section className="py-20 lg:py-24 bg-[var(--brand-navy)] border-y border-[var(--brand-luxury)]/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[var(--brand-luxury)] uppercase block mb-2">
              VERIFIED EXPERIENCES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase font-sans">
              TRUSTED BY DEVOTEES &amp; CORPORATES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 p-6 sm:p-8 flex flex-col justify-between relative hover:border-[var(--brand-luxury)]/30 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-[var(--brand-luxury)] mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <blockquote className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-[var(--brand-luxury)]/20 flex flex-col">
                  <span className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[var(--brand-luxury)] mt-0.5">
                    {item.role} • {item.location}
                  </span>
                  <span className="text-[10px] text-[var(--brand-luxury)] font-semibold uppercase tracking-widest mt-1">
                    {item.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BAND (Matches hero contrast & sharp buttons) */}
      <section className="py-20 lg:py-24 bg-[var(--background-subtle)] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="bg-[var(--brand-navy)] border border-[var(--brand-luxury)]/20 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-[11px] font-bold tracking-[0.24em] text-[var(--brand-luxury)] uppercase block mb-2">
                ELEVATE YOUR JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[var(--text-primary)] tracking-tight leading-tight">
                READY TO TAKE FLIGHT?
              </h2>
              <p className="text-[var(--brand-luxury)] text-sm mt-3 leading-relaxed">
                Connect with our 24/7 flight coordinators to reserve your Chardham heli-tour, arrange a flower dropping ceremony, or charter a private aircraft.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
              <NavigationButton
                page="booking"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--brand-luxury)] hover:bg-[var(--brand-luxury-hover)] active:scale-95 text-[var(--text-inverse)] px-8 py-4 text-xs font-bold tracking-[0.16em] uppercase transition-all shadow-xl cursor-pointer"
              >
                <span>BOOK NOW</span>
                <ArrowRight className="w-4 h-4" />
              </NavigationButton>

              <a
                href="tel:+919355611996"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-[var(--brand-luxury)]/10 text-[var(--text-primary)] border border-[var(--brand-luxury)]/20 px-8 py-4 text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[var(--brand-luxury-hover)]" />
                <span>CALL +91 93556 11996</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
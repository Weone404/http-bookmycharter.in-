'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Send,
  MessageSquare
} from 'lucide-react';
import { REGISTERED_OFFICE, DEPARTURE_POINTS } from '../../data/bookmychardhamData';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'Chardham & Kedarnath Heli-Tour',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full text-[#6B4E3D] bg-[#F3E9D0] min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-[#A67C52]/20 overflow-hidden bg-gradient-to-b from-[#D9C7B8] to-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-3">
              24/7 FLIGHT OPERATIONS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#6B4E3D] tracking-tight leading-none font-sans">
              CONTACT BOOKMYCHARDHAM AVIATION
            </h1>
            <p className="text-[#6B4E3D] text-sm sm:text-base mt-4 leading-relaxed max-w-2xl font-normal">
              Direct access to our flight dispatch desk, helipad commanders, and charter coordinators across Dehradun, Delhi, Sersi, and Mumbai.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CHANNELS & FORM */}
      <section className="py-16 lg:py-24 bg-[#E6D5C1] border-b border-[#A67C52]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Direct Contacts & Promise (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#A67C52] uppercase block mb-2">
                  DIRECT DESK
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#6B4E3D] tracking-tight">
                  SPEAK WITH A FLIGHT COORDINATOR
                </h2>
                <p className="text-xs sm:text-sm text-[#A67C52] mt-2 leading-relaxed">
                  Our operations desk is active 24/7 with real-time mountain weather monitoring and instant slot availability.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-[#D9C7B8] border border-[#A67C52]/20 p-5 flex items-start gap-4">
                  <div className="p-3 bg-[#A67C52]/20 text-[#A67C52] rounded-xs shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#A67C52] uppercase tracking-widest block">
                      CENTRAL DISPATCH &amp; SOS HOTLINE
                    </span>
                    <a href="tel:+919355611996" className="text-base sm:text-lg font-bold text-[#6B4E3D] hover:text-[#8B6639] transition-colors block mt-0.5">
                      +91 93556 11996
                    </a>
                    <span className="text-xs text-[#A67C52]">Available 24/7 on Call &amp; WhatsApp</span>
                  </div>
                </div>

                <div className="bg-[#D9C7B8] border border-[#A67C52]/20 p-5 flex items-start gap-4">
                  <div className="p-3 bg-[#A67C52]/20 text-[#A67C52] rounded-xs shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#A67C52] uppercase tracking-widest block">
                      CHARTER &amp; YATRA INQUIRIES
                    </span>
                    <a href="mailto:info@bookmychardham.in" className="text-sm font-bold text-[#6B4E3D] hover:text-[#8B6639] transition-colors block mt-0.5">
                      info@bookmychardham.in
                    </a>
                    <span className="text-xs text-[#A67C52]">Official inquiries &amp; quote submissions</span>
                  </div>
                </div>

                <div className="bg-[#D9C7B8] border border-[#A67C52]/20 p-5 flex items-start gap-4">
                  <div className="p-3 bg-[#A67C52]/20 text-[#A67C52] rounded-xs shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#A67C52] uppercase tracking-widest block">
                      GUARANTEED RESPONSE TIME
                    </span>
                    <span className="text-sm font-bold text-[#6B4E3D] block mt-0.5">
                      Under 15 Minutes
                    </span>
                    <span className="text-xs text-[#A67C52]">Average response time for all flight inquiries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 sm:p-10">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-[#8B6639]/20 border border-[#8B6639] text-[#8B6639] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold uppercase text-[#6B4E3D] mb-2">
                      MESSAGE TRANSMITTED
                    </h3>
                    <p className="text-xs text-[#A67C52] max-w-md mx-auto mb-6">
                      Thank you for contacting Book My CharDham. A dedicated Flight Coordinator will reach out to you within 15 minutes at {formData.phone || 'your phone number'}.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-[#A67C52]/10 hover:bg-[#A67C52]/20 text-[#6B4E3D] px-6 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#A67C52] uppercase block mb-1">
                      DIRECT INQUIRY FORM
                    </span>
                    <h3 className="text-xl font-black uppercase text-[#6B4E3D] mb-4">
                      SEND US A FLIGHT REQUEST
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#A67C52] mb-1 tracking-wider">
                          YOUR FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Col. Sanjay Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#E6D5C1] border border-[#A67C52]/20 px-3.5 py-2.5 text-xs text-[#6B4E3D] focus:border-[#A67C52] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[#A67C52] mb-1 tracking-wider">
                          PHONE / WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 93556 11996"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#E6D5C1] border border-[#A67C52]/20 px-3.5 py-2.5 text-xs text-[#6B4E3D] focus:border-[#A67C52] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-[#A67C52] mb-1 tracking-wider">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="sanjay.sharma@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#E6D5C1] border border-[#A67C52]/20 px-3.5 py-2.5 text-xs text-[#6B4E3D] focus:border-[#A67C52] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-[#A67C52] mb-1 tracking-wider">
                          SERVICE OF INTEREST
                        </label>
                        <select
                          value={formData.serviceInterest}
                          onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                          className="w-full bg-[#E6D5C1] border border-[#A67C52]/20 px-3.5 py-2.5 text-xs text-[#6B4E3D] focus:border-[#A67C52] focus:outline-none"
                        >
                          <option value="Chardham 4 Dham VIP Package">Chardham 4 Dham VIP Package</option>
                          <option value="Kedarnath Same Day Tour">Kedarnath Same Day Tour</option>
                          <option value="Do Dham (Kedarnath & Badrinath)">Do Dham (Kedarnath & Badrinath)</option>
                          <option value="Aerial Flower Dropping Ceremony">Aerial Flower Dropping Ceremony</option>
                          <option value="Corporate / VIP Helicopter Charter">Corporate / VIP Helicopter Charter</option>
                          <option value="Emergency Medical Evacuation">Emergency Medical Evacuation (HEMS)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-[#A67C52] mb-1 tracking-wider">
                          MESSAGE OR SPECIFIC REQUIREMENTS
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Provide preferred travel date, number of passengers, or wedding venue address..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#E6D5C1] border border-[#A67C52]/20 px-3.5 py-2.5 text-xs text-[#6B4E3D] focus:border-[#A67C52] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#A67C52] hover:bg-[#8B6639] active:scale-95 text-white py-3.5 text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT INQUIRY TO FLIGHT DESK</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REGISTERED OFFICE + DEPARTURE POINTS */}
      <section className="py-20 bg-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-2">
              OFFICE &amp; DEPARTURE POINTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#6B4E3D] tracking-tight">
              WHERE WE ARE, AND WHERE YOU FLY FROM
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[#A67C52] leading-relaxed">
              We work from one office in Dwarka. The airports and helipads below are
              public facilities we arrange departures from &mdash; we don&apos;t run
              terminals or hangars of our own. Charters can be arranged from other
              Indian and international airports on request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[REGISTERED_OFFICE, ...DEPARTURE_POINTS].map((base) => (
              <div
                key={`${base.city}-${base.venue}`}
                className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A67C52]">
                      {base.kind}
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#A67C52]" />
                  </div>

                  <h3 className="text-base font-bold uppercase text-[#6B4E3D] mb-1">
                    {base.city}
                  </h3>
                  <span className="text-xs text-[#6B4E3D] font-semibold block mb-3">
                    {base.venue}
                  </span>

                  <p className="text-xs text-[#A67C52] leading-relaxed mb-4">
                    {base.address}
                  </p>

                  <div className="text-[11px] text-[#A67C52] font-mono">
                    GPS: {base.coordinates}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#A67C52]/20">
                  <a
                    href="tel:+919355611996"
                    className="text-xs font-bold text-[#6B4E3D] hover:text-[#8B6639] transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#A67C52]" />
                    <span>+91 93556 11996</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

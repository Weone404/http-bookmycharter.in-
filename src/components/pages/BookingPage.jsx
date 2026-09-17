'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { CHARDHAM_PACKAGES } from '../../data/bookmychardhamData';
import AirportAutocomplete from '../AirportAutocomplete';

export const BookingPage = ({
  initialServiceType = 'kedarnath-sameday',
  initialPackageId,
  initialAircraft = '',
  aircraftOptions = [],
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    serviceType: initialServiceType,
    selectedPackageId: initialPackageId || 'kedarnath-same-day',
    departureBase: 'Dehradun (Sahastradhara Helipad Terminal 2)',
    selectedAirport: null,
    destination: 'Shri Kedarnath Ji Temple',
    selectedAircraft: initialAircraft,
    travelDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
    returnDate: '',
    passengers: 2,
    passengerWeights: [72, 68],
    fullName: '',
    phone: '',
    email: '',
    specialRequirements: '',
    vipDarshanAssistance: true,
    hotelAccommodation: true,
  });

  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (initialServiceType) {
      setFormData((prev) => ({
        ...prev,
        serviceType: initialServiceType,
        selectedPackageId: initialPackageId || prev.selectedPackageId,
      }));
    }
  }, [initialServiceType, initialPackageId]);

  const handlePassengerCountChange = (count) => {
    const newCount = Math.max(1, Math.min(6, count));
    const newWeights = [...formData.passengerWeights];
    while (newWeights.length < newCount) {
      newWeights.push(70);
    }
    while (newWeights.length > newCount) {
      newWeights.pop();
    }
    setFormData({
      ...formData,
      passengers: newCount,
      passengerWeights: newWeights,
    });
  };

  const handleWeightChange = (index, weight) => {
    const updated = [...formData.passengerWeights];
    updated[index] = weight;
    setFormData({
      ...formData,
      passengerWeights: updated,
    });
  };

  const getCalculatedPrice = () => {
    const pkg = CHARDHAM_PACKAGES.find((p) => p.id === formData.selectedPackageId);
    if (pkg) {
      return pkg.pricePerPerson * formData.passengers;
    }

    if (formData.serviceType === 'flower-dropping') {
      return 275000;
    }
    if (formData.serviceType === 'corporate-charter' || formData.serviceType === 'vip-transport') {
      return 125000 * 2;
    }
    if (formData.serviceType === 'emergency-air-ambulance') {
      return 195000;
    }
    return 95000 * formData.passengers;
  };

  const totalCalculated = getCalculatedPrice();
  const totalPassengerWeight = formData.passengerWeights.reduce((a, b) => a + b, 0);

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid email address is required';
    if (!formData.travelDate) errors.travelDate = 'Travel date is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const ref = `FS-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedBooking({
      referenceId: ref,
      date: formData.travelDate,
      totalAmount: totalCalculated,
    });
  };

  const selectedPkg = CHARDHAM_PACKAGES.find((p) => p.id === formData.selectedPackageId);

  return (
    <div className="w-full text-[#6B4E3D] bg-[#F3E9D0] min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 border-b border-[#A67C52]/20 overflow-hidden bg-gradient-to-b from-[#D9C7B8] to-[#F3E9D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[#A67C52] uppercase block mb-3">
              RESERVATION DESK
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-[#6B4E3D] tracking-tight leading-none font-sans">
              BOOK YOUR HELICOPTER FLIGHT
            </h1>
            <p className="text-[#6B4E3D] text-sm mt-3 leading-relaxed max-w-xl">
              Complete your flight inquiry below for instant confirmation, live DGCA payload allocation, and priority VIP Darshan arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN BOOKING INTERFACE */}
      <section className="py-12 lg:py-16 bg-[#E6D5C1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          {submittedBooking ? (
            /* Booking Confirmation State */
            <div className="max-w-2xl mx-auto bg-[#D9C7B8] border border-[#A67C52]/20 p-8 sm:p-12 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-[#A67C52]/20 border border-[#A67C52] text-[#A67C52] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-[#A67C52] uppercase tracking-widest block mb-1">
                INQUIRY REGISTERED SUCCESSFULLY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#6B4E3D] mb-2">
                RESERVATION ID: {submittedBooking.referenceId}
              </h2>
              <p className="text-xs sm:text-sm text-[#6B4E3D] max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our senior Flight Operations Executive has received your flight details for <strong>{formData.travelDate}</strong> and will contact you via WhatsApp/Phone within 15 minutes with slot clearance.
              </p>

              <div className="bg-[#F3E9D0]/60 border border-[#A67C52]/20 p-5 text-left text-xs text-[#6B4E3D] space-y-2 mb-8">
                <div className="flex justify-between border-b border-[#A67C52]/20 pb-2">
                  <span>Selected Service:</span>
                  <strong className="text-[#6B4E3D] uppercase">{formData.serviceType.replace('-', ' ')}</strong>
                </div>
                <div className="flex justify-between border-b border-[#A67C52]/20 pb-2">
                  <span>Passengers &amp; Payload:</span>
                  <strong className="text-[#6B4E3D]">{formData.passengers} Devotees ({totalPassengerWeight} kg Total)</strong>
                </div>
                <div className="flex justify-between border-b border-[#A67C52]/20 pb-2">
                  <span>Departure Base:</span>
                  <strong className="text-[#6B4E3D]">{formData.departureBase}</strong>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Estimated Total:</span>
                  <strong className="text-[#8B6639] font-bold text-sm">₹{submittedBooking.totalAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/919355611996?text=Hello%20BookMyChardham%20Aviation,%20I%20have%20submitted%20booking%20reference%20${submittedBooking.referenceId}%20for%20${formData.serviceType}%20on%20${formData.travelDate}.%20Please%20confirm.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#A67C52] hover:bg-[#8B6639] text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>CONFIRM ON WHATSAPP (+91 93556 11996)</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedBooking(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-[#A67C52]/10 hover:bg-[#A67C52]/20 text-[#6B4E3D] border border-[#A67C52]/20 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  BOOK ANOTHER FLIGHT
                </button>
              </div>
            </div>
          ) : (
            /* Active Form & Pricing Breakdown */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Form Area (7 Cols) */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Step 1: Service Type Selector */}
                  <div className="bg-[#D9C7B8] border border-[#A67C52]/20 p-6 sm:p-8">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#A67C52] uppercase block mb-3">
                      STEP 01 • SELECT SERVICE CATEGORY
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'kedarnath-sameday', label: 'Kedarnath Same Day Tour', tag: 'PILGRIMAGE' },
                        { id: 'chardham-4dham', label: 'Chardham 4 Dham (5D/4N)', tag: 'PILGRIMAGE' },
                        { id: 'dodham-kedarnath-badrinath', label: 'Do Dham (Kedarnath & Badrinath)', tag: 'PILGRIMAGE' },
                        { id: 'flower-dropping', label: 'Aerial Flower Shower Ceremony', tag: 'EVENTS' },
                        { id: 'corporate-charter', label: 'Corporate Helicopter Charter', tag: 'BUSINESS' },
                        { id: 'emergency-air-ambulance', label: 'Emergency Air Ambulance (ICU)', tag: 'HEMS' },
                      ].map((item) => {
                        const isSelected = formData.serviceType === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() =>
                              setFormData({
                                ...formData,
                                serviceType: item.id,
                                selectedPackageId:
                                  item.id === 'chardham-4dham'
                                    ? 'chardham-4-dham-package'
                                    : item.id === 'dodham-kedarnath-badrinath'
                                    ? 'do-dham-kedarnath-badrinath'
                                    : 'kedarnath-same-day',
                              })
                            }
                            className={`p-3.5 text-left border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#A67C52] border-[#A67C52] text-white shadow-md'
                                : 'bg-[#E6D5C1] border-[#A67C52]/20 text-[#6B4E3D] hover:text-[#6B4E3D]'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9.5px] font-bold tracking-widest text-[#c8102e] uppercase">
                                {item.tag}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#c8102e]" />}
                            </div>
                            <div className="text-xs font-bold uppercase text-white">
                              {item.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Aircraft selection */}
                  <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#c8102e] uppercase block mb-1">
                      PREFERRED AIRCRAFT
                    </span>
                    <label htmlFor="selected-aircraft" className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-wider">
                      SELECT AIRCRAFT
                    </label>
                    <select
                      id="selected-aircraft"
                      value={formData.selectedAircraft}
                      onChange={(e) => setFormData({ ...formData, selectedAircraft: e.target.value })}
                      className="w-full bg-[#181818] border border-white/15 px-3.5 py-3 text-xs text-white focus:border-[#c8102e] focus:outline-none"
                    >
                      <option value="">No preference — recommend the best aircraft</option>
                      {aircraftOptions.map((aircraft) => (
                        <option key={`${aircraft.category}-${aircraft.name}`} value={aircraft.name}>
                          {aircraft.name} ({aircraft.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Route & Date Selection */}
                  <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#c8102e] uppercase block mb-1">
                      STEP 02 • BASE &amp; TRAVEL DATES
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-wider">
                          DEPARTURE BASE / HELIPAD
                        </label>
                        <AirportAutocomplete
                          value={formData.departureBase}
                          onChange={(departureBase) => setFormData({ ...formData, departureBase, selectedAirport: null })}
                          onSelect={(selectedAirport) => setFormData((prev) => ({ ...prev, selectedAirport }))}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1.5 tracking-wider">
                          TRAVEL / CEREMONY DATE *
                        </label>
                        <input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                          className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#c8102e] focus:outline-none"
                          required
                        />
                        {validationErrors.travelDate && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            {validationErrors.travelDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Passenger Count & Weight Breakdown */}
                  <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[#c8102e] uppercase block">
                        STEP 03 • PASSENGERS &amp; HIGH-ALTITUDE PAYLOAD
                      </span>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        Mandatory DGCA Protocol
                      </span>
                    </div>

                    <div className="flex items-center gap-3 py-2">
                      <span className="text-xs text-neutral-300 font-bold uppercase tracking-wider">
                        Number of Passengers:
                      </span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => handlePassengerCountChange(num)}
                            className={`w-9 h-9 text-xs font-bold border transition-all cursor-pointer ${
                              formData.passengers === num
                                ? 'bg-[#c8102e] border-[#c8102e] text-white shadow-md'
                                : 'bg-[#181818] border-white/15 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Individual Weight Inputs */}
                    <div className="pt-2">
                      <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-2 tracking-wider">
                        Approximate Body Weights (kg) per Passenger:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {formData.passengerWeights.map((w, idx) => (
                          <div key={idx} className="bg-[#181818] p-2.5 border border-white/10">
                            <span className="text-[10px] text-neutral-400 block mb-1">
                              Passenger {idx + 1} Weight:
                            </span>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="20"
                                max="150"
                                value={w}
                                onChange={(e) => handleWeightChange(idx, parseInt(e.target.value) || 70)}
                                className="w-full bg-black/60 border border-white/10 px-2 py-1 text-xs text-white text-right focus:outline-none focus:border-red-500 font-mono"
                              />
                              <span className="text-xs text-neutral-400">kg</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-2 flex items-center justify-between">
                        <span>Total Passenger Payload: <strong className="text-white font-mono">{totalPassengerWeight} kg</strong></span>
                        <span className="text-[10px] text-emerald-400">✓ Within the sector payload limit</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Contact Information */}
                  <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#c8102e] uppercase block mb-1">
                      STEP 04 • PRIMARY CONTACT DETAILS
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1 tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Chandra Verma"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#c8102e] focus:outline-none"
                          required
                        />
                        {validationErrors.fullName && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            {validationErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1 tracking-wider">
                          Phone Number (WhatsApp Active) *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 93556 11996"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#c8102e] focus:outline-none"
                          required
                        />
                        {validationErrors.phone && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            {validationErrors.phone}
                          </span>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1 tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="ramesh.verma@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#c8102e] focus:outline-none"
                          required
                        />
                        {validationErrors.email && (
                          <span className="text-[10px] text-red-500 mt-1 block">
                            {validationErrors.email}
                          </span>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1 tracking-wider">
                          Special Requirements (Elderly Care, Wheelchair, Flower Petal Color)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Mention any special puja timing, senior citizen palki needs, or event venue coordinates..."
                          value={formData.specialRequirements}
                          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                          className="w-full bg-[#181818] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#c8102e] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#c8102e] hover:bg-red-700 active:scale-95 text-white py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>CONFIRM &amp; SUBMIT FLIGHT INQUIRY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Summary Sidebar (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#121212] border border-white/15 p-6 sm:p-8 sticky top-24">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[#c8102e] uppercase">
                      RESERVATION SUMMARY
                    </span>
                    <span className="text-[10px] bg-white/10 text-neutral-300 font-mono px-2 py-0.5 uppercase">
                      Instant Quote
                    </span>
                  </div>

                  {/* Selected Package Details */}
                  <div className="mb-6">
                    <h3 className="text-lg font-black uppercase text-white mb-1">
                      {selectedPkg ? selectedPkg.title : formData.serviceType.replace('-', ' ')}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Departure Base: <strong className="text-neutral-200">{formData.departureBase}</strong>
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Travel Date: <strong className="text-neutral-200">{formData.travelDate}</strong>
                    </p>
                  </div>

                  {/* Breakdown Items */}
                  <div className="space-y-3 py-4 border-t border-white/10 text-xs text-neutral-300">
                    <div className="flex justify-between">
                      <span>Passengers / Seats:</span>
                      <span className="font-bold text-white">{formData.passengers} Seats</span>
                    </div>

                    <div className="flex justify-between">
                      <span>VIP Darshan Escorts:</span>
                      <span className="text-emerald-400 font-semibold">Included</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Fuel &amp; ATC:</span>
                      <span className="text-emerald-400 font-semibold">Included</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Ground Transfers &amp; Helipad Tax:</span>
                      <span className="text-emerald-400 font-semibold">Included</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Passenger Load:</span>
                      <span className="font-mono text-white font-semibold">{totalPassengerWeight} kg</span>
                    </div>
                  </div>

                  {/* Total Tariff */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                        ESTIMATED TARIFF
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        ₹{totalCalculated.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 text-right">
                      Inclusive of GST &amp; Temple Permits
                    </span>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-[#181818] p-4 border border-white/10 space-y-2 text-[11px] text-neutral-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#c8102e] shrink-0" />
                      <span>Flown by DGCA NSOP-certified operators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Slot Confirmation within 15 - 30 Minutes</span>
                    </div>
                  </div>

                  {/* Direct Phone Call Alternative */}
                  <div className="pt-6 text-center">
                    <span className="text-xs text-neutral-400 block mb-2">
                      Prefer to book over the phone with a Flight Coordinator?
                    </span>
                    <a
                      href="tel:+919355611996"
                      className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-red-400 uppercase tracking-wider"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call +91 93556 11996</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

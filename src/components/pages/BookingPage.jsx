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
    <div className="w-full text-[var(--text-primary)] bg-[var(--background-subtle)] min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 border-b border-[var(--brand-luxury)]/20 overflow-hidden bg-gradient-to-b from-[var(--background-subtle)] to-[var(--background-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold tracking-[0.24em] text-[var(--brand-luxury)] uppercase block mb-3">
              RESERVATION DESK
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-[var(--text-primary)] tracking-tight leading-none font-sans">
              BOOK YOUR HELICOPTER FLIGHT
            </h1>
            <p className="text-[var(--text-primary)] text-sm mt-3 leading-relaxed max-w-xl">
              Complete your flight inquiry below for instant confirmation, live DGCA payload allocation, and priority VIP Darshan arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN BOOKING INTERFACE */}
      <section className="py-12 lg:py-16 bg-[var(--brand-navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12">
          {submittedBooking ? (
            /* Booking Confirmation State */
            <div className="max-w-2xl mx-auto bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 p-8 sm:p-12 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-[var(--brand-luxury)]/20 border border-[var(--brand-luxury)] text-[var(--brand-luxury)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-[var(--brand-luxury)] uppercase tracking-widest block mb-1">
                INQUIRY REGISTERED SUCCESSFULLY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-[var(--text-primary)] mb-2">
                RESERVATION ID: {submittedBooking.referenceId}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-primary)] max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Our senior Flight Operations Executive has received your flight details for <strong>{formData.travelDate}</strong> and will contact you via WhatsApp/Phone within 15 minutes with slot clearance.
              </p>

              <div className="bg-[var(--background-subtle)]/60 border border-[var(--brand-luxury)]/20 p-5 text-left text-xs text-[var(--text-primary)] space-y-2 mb-8">
                <div className="flex justify-between border-b border-[var(--brand-luxury)]/20 pb-2">
                  <span>Selected Service:</span>
                  <strong className="text-[var(--text-primary)] uppercase">{formData.serviceType.replace('-', ' ')}</strong>
                </div>
                <div className="flex justify-between border-b border-[var(--brand-luxury)]/20 pb-2">
                  <span>Passengers &amp; Payload:</span>
                  <strong className="text-[var(--text-primary)]">{formData.passengers} Devotees ({totalPassengerWeight} kg Total)</strong>
                </div>
                <div className="flex justify-between border-b border-[var(--brand-luxury)]/20 pb-2">
                  <span>Departure Base:</span>
                  <strong className="text-[var(--text-primary)]">{formData.departureBase}</strong>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Estimated Total:</span>
                  <strong className="text-[var(--brand-luxury-hover)] font-bold text-sm">₹{submittedBooking.totalAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/919355611996?text=Hello%20BookMyChardham%20Aviation,%20I%20have%20submitted%20booking%20reference%20${submittedBooking.referenceId}%20for%20${formData.serviceType}%20on%20${formData.travelDate}.%20Please%20confirm.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[var(--brand-luxury)] hover:bg-[var(--brand-luxury-hover)] text-[var(--text-inverse)] px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>CONFIRM ON WHATSAPP (+91 93556 11996)</span>
                </a>

                <button
                  onClick={() => {
                    setSubmittedBooking(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-[var(--brand-luxury)]/10 hover:bg-[var(--brand-luxury)]/20 text-[var(--text-primary)] border border-[var(--brand-luxury)]/20 px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
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
                  <div className="bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 p-6 sm:p-8">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury)] uppercase block mb-3">
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
                                ? 'bg-[var(--brand-luxury)] border-[var(--brand-luxury)] text-[var(--text-inverse)] shadow-md'
                                : 'bg-[var(--brand-navy)] border-[var(--brand-luxury)]/20 text-[var(--text-primary)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9.5px] font-bold tracking-widest text-[var(--brand-primary)] uppercase">
                                {item.tag}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[var(--brand-primary)]" />}
                            </div>
                            <div className="text-xs font-bold uppercase text-[var(--text-inverse)]">
                              {item.label}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Aircraft selection */}
                  <div className="bg-[var(--brand-navy)] border border-[var(--text-inverse)]/10 p-6 sm:p-8 space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-primary)] uppercase block mb-1">
                      PREFERRED AIRCRAFT
                    </span>
                    <label htmlFor="selected-aircraft" className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1.5 tracking-wider">
                      SELECT AIRCRAFT
                    </label>
                    <select
                      id="selected-aircraft"
                      value={formData.selectedAircraft}
                      onChange={(e) => setFormData({ ...formData, selectedAircraft: e.target.value })}
                      className="w-full bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 px-3.5 py-3 text-xs text-[var(--text-inverse)] focus:border-[var(--brand-primary)] focus:outline-none"
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
                  <div className="bg-[var(--brand-navy)] border border-[var(--text-inverse)]/10 p-6 sm:p-8 space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-primary)] uppercase block mb-1">
                      STEP 02 • BASE &amp; TRAVEL DATES
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1.5 tracking-wider">
                          DEPARTURE BASE / HELIPAD
                        </label>
                        <AirportAutocomplete
                          value={formData.departureBase}
                          onChange={(departureBase) => setFormData({ ...formData, departureBase, selectedAirport: null })}
                          onSelect={(selectedAirport) => setFormData((prev) => ({ ...prev, selectedAirport }))}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1.5 tracking-wider">
                          TRAVEL / CEREMONY DATE *
                        </label>
                        <input
                          type="date"
                          value={formData.travelDate}
                          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                          className="w-full bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 px-3.5 py-2.5 text-xs text-[var(--text-inverse)] focus:border-[var(--brand-primary)] focus:outline-none"
                          required
                        />
                        {validationErrors.travelDate && (
                          <span className="text-[10px] text-[var(--brand-primary)] mt-1 block">
                            {validationErrors.travelDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Passenger Count & Weight Breakdown */}
                  <div className="bg-[var(--brand-navy)] border border-[var(--text-inverse)]/10 p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-primary)] uppercase block">
                        STEP 03 • PASSENGERS &amp; HIGH-ALTITUDE PAYLOAD
                      </span>
                      <span className="text-[10px] text-[var(--background-subtle)] uppercase tracking-wider">
                        Mandatory DGCA Protocol
                      </span>
                    </div>

                    <div className="flex flex-col items-start gap-3 py-2 sm:flex-row sm:items-center">
                      <span className="text-xs text-[var(--background-subtle)] font-bold uppercase tracking-wider">
                        Number of Passengers:
                      </span>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => handlePassengerCountChange(num)}
                            className={`w-11 h-11 text-xs font-bold border transition-all cursor-pointer ${
                              formData.passengers === num
                                ? 'bg-[var(--brand-primary)] border-[var(--brand-primary)] text-[var(--text-inverse)] shadow-md'
                                : 'bg-[var(--brand-navy)] border-[var(--text-inverse)]/15 text-[var(--background-subtle)] hover:text-[var(--text-inverse)]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Individual Weight Inputs */}
                    <div className="pt-2">
                      <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-2 tracking-wider">
                        Approximate Body Weights (kg) per Passenger:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {formData.passengerWeights.map((w, idx) => (
                          <div key={idx} className="bg-[var(--brand-navy)] p-2.5 border border-[var(--text-inverse)]/10">
                            <span className="text-[10px] text-[var(--background-subtle)] block mb-1">
                              Passenger {idx + 1} Weight:
                            </span>
                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                min="20"
                                max="150"
                                value={w}
                                onChange={(e) => handleWeightChange(idx, parseInt(e.target.value) || 70)}
                                className="w-full bg-[var(--brand-navy)]/60 border border-[var(--text-inverse)]/10 px-2 py-1 text-xs text-[var(--text-inverse)] text-right focus:outline-none focus:border-[var(--brand-primary)] font-mono"
                              />
                              <span className="text-xs text-[var(--background-subtle)]">kg</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] text-[var(--background-subtle)] mt-2 flex items-center justify-between">
                        <span>Total Passenger Payload: <strong className="text-[var(--text-inverse)] font-mono">{totalPassengerWeight} kg</strong></span>
                        <span className="text-[10px] text-[var(--brand-luxury)]">✓ Within the sector payload limit</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Contact Information */}
                  <div className="bg-[var(--brand-navy)] border border-[var(--text-inverse)]/10 p-6 sm:p-8 space-y-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-primary)] uppercase block mb-1">
                      STEP 04 • PRIMARY CONTACT DETAILS
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1 tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Chandra Verma"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 px-3.5 py-2.5 text-xs text-[var(--text-inverse)] focus:border-[var(--brand-primary)] focus:outline-none"
                          required
                        />
                        {validationErrors.fullName && (
                          <span className="text-[10px] text-[var(--brand-primary)] mt-1 block">
                            {validationErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1 tracking-wider">
                          Phone Number (WhatsApp Active) *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 93556 11996"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 px-3.5 py-2.5 text-xs text-[var(--text-inverse)] focus:border-[var(--brand-primary)] focus:outline-none"
                          required
                        />
                        {validationErrors.phone && (
                          <span className="text-[10px] text-[var(--brand-primary)] mt-1 block">
                            {validationErrors.phone}
                          </span>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1 tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="ramesh.verma@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 px-3.5 py-2.5 text-xs text-[var(--text-inverse)] focus:border-[var(--brand-primary)] focus:outline-none"
                          required
                        />
                        {validationErrors.email && (
                          <span className="text-[10px] text-[var(--brand-primary)] mt-1 block">
                            {validationErrors.email}
                          </span>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase text-[var(--background-subtle)] mb-1 tracking-wider">
                          Special Requirements (Elderly Care, Wheelchair, Flower Petal Color)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Mention any special puja timing, senior citizen palki needs, or event venue coordinates..."
                          value={formData.specialRequirements}
                          onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                          className="w-full bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 px-3.5 py-2.5 text-xs text-[var(--text-inverse)] focus:border-[var(--brand-primary)] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)] active:scale-95 text-[var(--text-inverse)] py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>CONFIRM &amp; SUBMIT FLIGHT INQUIRY</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Summary Sidebar (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[var(--brand-navy)] border border-[var(--text-inverse)]/15 p-6 sm:p-8 sticky top-24">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--text-inverse)]/10 mb-4">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--brand-primary)] uppercase">
                      RESERVATION SUMMARY
                    </span>
                    <span className="text-[10px] bg-[var(--text-inverse)]/10 text-[var(--background-subtle)] font-mono px-2 py-0.5 uppercase">
                      Instant Quote
                    </span>
                  </div>

                  {/* Selected Package Details */}
                  <div className="mb-6">
                    <h3 className="text-lg font-black uppercase text-[var(--text-inverse)] mb-1">
                      {selectedPkg ? selectedPkg.title : formData.serviceType.replace('-', ' ')}
                    </h3>
                    <p className="text-xs text-[var(--background-subtle)]">
                      Departure Base: <strong className="text-[var(--background-subtle)]">{formData.departureBase}</strong>
                    </p>
                    <p className="text-xs text-[var(--background-subtle)] mt-0.5">
                      Travel Date: <strong className="text-[var(--background-subtle)]">{formData.travelDate}</strong>
                    </p>
                  </div>

                  {/* Breakdown Items */}
                  <div className="space-y-3 py-4 border-t border-[var(--text-inverse)]/10 text-xs text-[var(--background-subtle)]">
                    <div className="flex justify-between">
                      <span>Passengers / Seats:</span>
                      <span className="font-bold text-[var(--text-inverse)]">{formData.passengers} Seats</span>
                    </div>

                    <div className="flex justify-between">
                      <span>VIP Darshan Escorts:</span>
                      <span className="text-[var(--brand-luxury)] font-semibold">Included</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Fuel &amp; ATC:</span>
                      <span className="text-[var(--brand-luxury)] font-semibold">Included</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Ground Transfers &amp; Helipad Tax:</span>
                      <span className="text-[var(--brand-luxury)] font-semibold">Included</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Passenger Load:</span>
                      <span className="font-mono text-[var(--text-inverse)] font-semibold">{totalPassengerWeight} kg</span>
                    </div>
                  </div>

                  {/* Total Tariff */}
                  <div className="pt-4 border-t border-[var(--text-inverse)]/15 flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--background-subtle)] uppercase tracking-widest block">
                        ESTIMATED TARIFF
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-[var(--text-inverse)]">
                        ₹{totalCalculated.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--background-subtle)] text-right">
                      Inclusive of GST &amp; Temple Permits
                    </span>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-[var(--brand-navy)] p-4 border border-[var(--text-inverse)]/10 space-y-2 text-[11px] text-[var(--background-subtle)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
                      <span>Flown by DGCA NSOP-certified operators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--brand-luxury)] shrink-0" />
                      <span>Slot Confirmation within 15 - 30 Minutes</span>
                    </div>
                  </div>

                  {/* Direct Phone Call Alternative */}
                  <div className="pt-6 text-center">
                    <span className="text-xs text-[var(--background-subtle)] block mb-2">
                      Prefer to book over the phone with a Flight Coordinator?
                    </span>
                    <a
                      href="tel:+919355611996"
                      className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-inverse)] hover:text-[var(--brand-luxury)] uppercase tracking-wider"
                    >
                      <Phone className="w-3.5 h-3.5 text-[var(--brand-luxury)]" />
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

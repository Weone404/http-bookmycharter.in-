'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AboutPage } from '../../components/pages/AboutPage';

export default function Client() {
  const router = useRouter();

  const handleNavigate = (page) => {
    router.push(page === 'home' ? '/' : `/${page}`);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceType, packageId) => {
    const params = new URLSearchParams();
    if (serviceType) params.set('service', serviceType);
    if (packageId) params.set('package', packageId);
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <AboutPage
      onNavigate={handleNavigate}
      onSelectServiceForBooking={handleSelectServiceForBooking}
    />
  );
}

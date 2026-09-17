'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChardhamPage } from '../../components/pages/ChardhamPage';

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
    <ChardhamPage
      onNavigate={handleNavigate}
      onSelectServiceForBooking={handleSelectServiceForBooking}
    />
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FlowerDroppingPage } from '../../components/pages/FlowerDroppingPage';

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
    <FlowerDroppingPage
      onNavigate={handleNavigate}
      onSelectServiceForBooking={handleSelectServiceForBooking}
    />
  );
}

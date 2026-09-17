'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookingPage } from '../../components/pages/BookingPage';

function BookingContent({ aircraftOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const service = searchParams.get('service') || 'kedarnath-sameday';
  const pkg = searchParams.get('package') || undefined;
  const aircraft = searchParams.get('aircraft') || '';

  const handleNavigate = (page) => {
    router.push(page === 'home' ? '/' : `/${page}`);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BookingPage
      initialServiceType={service}
      initialPackageId={pkg}
      initialAircraft={aircraft}
      aircraftOptions={aircraftOptions}
      onNavigate={handleNavigate}
    />
  );
}

export default function Client({ aircraftOptions }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center bg-[#F3E9D0]">
          <div className="text-xs uppercase tracking-widest text-[#A67C52] animate-pulse">
            Loading reservation desk...
          </div>
        </div>
      }
    >
      <BookingContent aircraftOptions={aircraftOptions} />
    </Suspense>
  );
}

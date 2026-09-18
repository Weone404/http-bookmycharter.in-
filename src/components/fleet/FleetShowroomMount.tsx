'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy mount for the showroom.
 *
 * The WebGL runtime is only fetched by readers who reach the aircraft page,
 * and never on the server. The aircraft list, specification tables and links
 * on that page are server-rendered and independent of this.
 */
const FleetShowroom = dynamic(
  () => import('./FleetShowroom').then((m) => ({ default: m.FleetShowroom })),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="h-[clamp(26rem,58vh,40rem)] w-full bg-[var(--color-midnight)]"
      />
    ),
  },
);

export function FleetShowroomMount() {
  return <FleetShowroom />;
}

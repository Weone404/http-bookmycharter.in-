'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { SearchWidget } from './SearchWidget';
import { fadeInUp, transitionDefault } from '../utils/animations';

export function HomeHero({ variant }) {
  const router = useRouter();

  const handleNavigate = (page) => {
    router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceType, packageId) => {
    const params = new URLSearchParams();
    if (serviceType) params.set('service', serviceType);
    if (packageId) params.set('package', packageId);
    router.push(`/booking?${params.toString()}`);
  };

  if (variant === 'badge') {
    return (
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={transitionDefault}
        className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--brand-navy)]/75 backdrop-blur-md border border-[var(--brand-luxury)]/30 rounded-xs w-fit mb-3 text-[11px] font-bold tracking-[0.2em] text-[var(--brand-luxury)] uppercase"
      >
        <Sparkles className="w-3 h-3" />
        <span>India&apos;s Premier Helicopter Charter Service</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ ...transitionDefault, delay: 0.4 }}
      initial="initial"
      animate="animate"
    >
      <SearchWidget
        onQuickBook={(service) => {
          handleSelectServiceForBooking(service);
          handleNavigate('booking');
        }}
        onNavigate={handleNavigate}
      />
    </motion.div>
  );
}

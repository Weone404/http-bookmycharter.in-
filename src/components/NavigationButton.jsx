'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { safeVariants, hoverScale } from '../utils/animations';

export function NavigationButton({ page, className, children }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(page === 'home' ? '/' : `/${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      whileHover={safeVariants(hoverScale).whileHover || {}}
      whileTap={safeVariants(hoverScale).whileTap || {}}
      onClick={handleClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

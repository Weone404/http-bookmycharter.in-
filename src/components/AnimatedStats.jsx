'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, transitionDefault } from '../utils/animations';

export function AnimatedStats() {
  return (
    <motion.div
      className="grid grid-cols-3 gap-3 text-center"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
    >
      <motion.div
        variants={fadeInUp}
        transition={transitionDefault}
        className="p-3 bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 hover:border-[var(--brand-luxury)]/40 transition-colors"
      >
        <span className="text-lg font-black text-[var(--text-primary)] block">23,000 FT</span>
        <span className="text-[10px] uppercase tracking-wider text-[var(--brand-luxury)]">Altitude Ceiling</span>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        transition={transitionDefault}
        className="p-3 bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 hover:border-[var(--brand-luxury)]/40 transition-colors"
      >
        <span className="text-lg font-black text-[var(--text-primary)] block">260 KM/H</span>
        <span className="text-[10px] uppercase tracking-wider text-[var(--brand-luxury)]">Max Cruise Speed</span>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        transition={transitionDefault}
        className="p-3 bg-[var(--background-subtle)] border border-[var(--brand-luxury)]/20 hover:border-[var(--brand-luxury)]/40 transition-colors"
      >
        <span className="text-lg font-black text-[var(--text-primary)] block">45 MINS</span>
        <span className="text-[10px] uppercase tracking-wider text-[var(--brand-luxury)]">Rapid Dispatch</span>
      </motion.div>
    </motion.div>
  );
}

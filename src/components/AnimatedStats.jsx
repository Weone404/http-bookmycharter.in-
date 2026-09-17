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
        className="p-3 bg-[#D9C7B8] border border-[#A67C52]/20 hover:border-[#A67C52]/40 transition-colors"
      >
        <span className="text-lg font-black text-[#6B4E3D] block">23,000 FT</span>
        <span className="text-[10px] uppercase tracking-wider text-[#A67C52]">Altitude Ceiling</span>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        transition={transitionDefault}
        className="p-3 bg-[#D9C7B8] border border-[#A67C52]/20 hover:border-[#A67C52]/40 transition-colors"
      >
        <span className="text-lg font-black text-[#6B4E3D] block">260 KM/H</span>
        <span className="text-[10px] uppercase tracking-wider text-[#A67C52]">Max Cruise Speed</span>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        transition={transitionDefault}
        className="p-3 bg-[#D9C7B8] border border-[#A67C52]/20 hover:border-[#A67C52]/40 transition-colors"
      >
        <span className="text-lg font-black text-[#6B4E3D] block">45 MINS</span>
        <span className="text-[10px] uppercase tracking-wider text-[#A67C52]">Rapid Dispatch</span>
      </motion.div>
    </motion.div>
  );
}

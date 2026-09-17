'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { safeVariants, safeTransition, scrollFadeUp, prefersReducedMotion } from '../../utils/animations';

/**
 * InViewAnimator: Animates children when they come into view
 * Supports staggered animations for multiple children
 */
export const InViewAnimator = ({
  children,
  variants = scrollFadeUp,
  stagger = 0.1,
  delay = 0,
  once = true,
  className = '',
}) => {
  return (
    <motion.div
      className={className}
      {...safeVariants(variants)}
      transition={safeTransition({ 
        duration: 0.5, 
        ease: 'easeOut',
        delay,
      })}
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxImage: Background image that moves based on scroll
 * Creates depth effect without harming performance
 */
export const ParallaxImage = ({ 
  src, 
  alt, 
  strength = 0.5,
  className = '',
  offset = 0,
}) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        y: scrollY * strength,
      }}
      transition={safeTransition({ duration: 0, ease: 'linear' })}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

/**
 * AnimatedButton: Button with hover and tap animations
 */
export const AnimatedButton = ({
  children,
  onClick,
  className = '',
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.98 },
  ...props
}) => {
  return (
    <motion.button
      whileHover={safeVariants({ whileHover }).whileHover || {}}
      whileTap={safeVariants({ whileTap }).whileTap || {}}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * FadeInOnScroll: Simple fade-in when element enters viewport
 */
export const FadeInOnScroll = ({
  children,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={safeTransition({ 
        duration: 0.4, 
        ease: 'easeOut',
        delay,
      })}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * HoverLiftCard: Card that lifts on hover with shadow
 */
export const HoverLiftCard = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      whileHover={safeVariants({ 
        whileHover: { 
          y: -8,
          boxShadow: '0 25px 50px rgba(166, 124, 82, 0.15)',
        }
      }).whileHover || {}}
      transition={safeTransition({ duration: 0.3, ease: 'easeOut' })}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

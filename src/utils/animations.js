/**
 * Reusable Framer Motion animation variants and utilities
 * All animations respect prefers-reduced-motion for accessibility
 */

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ============ FADE & SLIDE ANIMATIONS ============

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// ============ SCALE ANIMATIONS ============

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const scaleInSmall = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// ============ STAGGER CONTAINER ============

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// ============ TRANSITION CONFIGS ============

export const transitionDefault = {
  duration: 0.4,
  ease: 'easeOut',
};

export const transitionSlow = {
  duration: 0.6,
  ease: 'easeOut',
};

export const transitionFast = {
  duration: 0.2,
  ease: 'easeOut',
};

// ============ HOVER & TAP ANIMATIONS ============

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
};

export const hoverScaleSmall = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.99 },
};

export const hoverLift = {
  whileHover: { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
  transition: { duration: 0.3, ease: 'easeOut' },
};

// ============ PARALLAX & SCROLL ANIMATIONS ============

export const createScrollVariant = (startOffset = 0, endOffset = 100) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: `${endOffset}px 0px ${-startOffset}px 0px` },
  transition: { duration: 0.5, ease: 'easeOut' },
});

// For staggered scroll animations (cards in a grid)
export const scrollFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -50px 0px' },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export const scrollFadeUpStagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -50px 0px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// ============ PARALLAX WRAPPER ============

export const createParallaxVariant = (offset = 30) => ({
  initial: { y: 0 },
  animate: (scrollY) => ({
    y: scrollY * 0.5 > offset ? offset : scrollY * 0.5,
  }),
});

// ============ BUTTON & CARD HOVER ============

export const buttonHover = {
  initial: { scale: 1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const cardHover = {
  whileHover: { 
    y: -8,
    boxShadow: '0 25px 50px rgba(166, 124, 82, 0.15)',
  },
  transition: { duration: 0.3, ease: 'easeOut' },
};

// ============ ICON ANIMATIONS ============

export const iconPulse = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const iconRotate = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

// ============ UTILITY: Safe Animation Wrapper ============

/**
 * Wraps animation variants to disable them if user prefers reduced motion
 * @param {Object} variants - Motion variants object
 * @returns {Object} - Modified variants or empty object if reduced motion
 */
export const safeVariants = (variants) => {
  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return {
      initial: {},
      animate: {},
      exit: {},
      whileHover: {},
      whileTap: {},
      whileInView: {},
    };
  }
  return variants;
};

/**
 * Create a safe transition config
 * @param {Object} config - Transition configuration
 * @returns {Object} - Modified transition or immediate if reduced motion
 */
export const safeTransition = (config) => {
  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return { duration: 0 };
  }
  return config;
};

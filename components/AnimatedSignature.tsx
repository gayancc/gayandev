'use client';

import { motion } from 'framer-motion';

export function AnimatedSignature() {
  return (
    <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M6 34 C 22 6, 42 6, 58 34 S 94 62, 122 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
    </svg>
  );
}

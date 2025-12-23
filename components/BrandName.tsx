'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/content';

export function BrandName() {
  const letters = profile.name.split('');

  return (
    <motion.div
      className="flex flex-wrap items-center gap-[2px]"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="relative inline-block text-sm font-semibold uppercase tracking-[0.2em] text-fg/80"
          variants={{
            rest: { rotateX: 0 },
            hover: { rotateX: 180 },
          }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.01 }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center', transformPerspective: 800 }}
        >
          <span className="inline-block" style={{ backfaceVisibility: 'hidden' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
          <span
            className="absolute inset-0 inline-block text-accent"
            style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </motion.span>
      ))}
    </motion.div>
  );
}

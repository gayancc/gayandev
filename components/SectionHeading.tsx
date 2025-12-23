'use client';

import { motion } from 'framer-motion';
import { useGsapReveal } from '@/hooks/useGsapReveal';

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const ref = useGsapReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="mb-10 max-w-2xl">
      <motion.p
        className="text-sm uppercase tracking-[0.4em] text-fg/60"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        className="mt-3 font-display text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

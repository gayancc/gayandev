'use client';

import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function useParallax(distance = 120) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 0.6]);

  return { ref, y, opacity };
}

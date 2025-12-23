'use client';

import { AnimatePresence, motion } from 'framer-motion';

export function TransitionOverlay({
  phase,
  label,
}: {
  phase: 'cover' | 'reveal' | null;
  label: string;
}) {
  const isVisible = phase !== null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute left-0 top-0 h-1/2 w-full bg-bg"
            initial={{ y: phase === 'cover' ? '-100%' : '0%' }}
            animate={{ y: phase === 'cover' ? '0%' : '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 h-1/2 w-full bg-bg"
            initial={{ y: phase === 'cover' ? '100%' : '0%' }}
            animate={{ y: phase === 'cover' ? '0%' : '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-0.5 w-[60%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs uppercase tracking-[0.5em] text-fg/60"
            >
              {label}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

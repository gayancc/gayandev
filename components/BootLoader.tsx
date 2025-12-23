'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function BootLoader({ title, onDone }: { title: string; onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let start = 0;
    const tick = () => {
      start += Math.random() * 6 + 4;
      const next = Math.min(100, start);
      setProgress(next);
      if (next >= 100) {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 200);
        return;
      }
      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="relative flex w-[90%] max-w-xl flex-col items-center gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-[0.5em] text-fg/60"
            >
              Portfolio Loading
            </motion.div>
            <motion.h1
              className="font-display text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              {title}
            </motion.h1>
            <div className="w-full rounded-full border border-white/10 bg-card/60 p-1">
              <motion.div
                className="h-2 rounded-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </div>
            <div className="text-xs uppercase tracking-[0.4em] text-fg/50">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

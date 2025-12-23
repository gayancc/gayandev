'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePreferences } from './PreferencesProvider';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { playClick } = usePreferences();

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleDown = () => {
      setIsPointer(true);
      playClick();
    };

    const handleUp = () => setIsPointer(false);
    const handleLeave = () => setIsVisible(false);

    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mouseleave', handleLeave);
    };
  }, [playClick]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 md:block"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.6 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
    >
      <span className="absolute inset-0 rounded-full border border-accent/30 animate-cursor-pulse" />
    </motion.div>
  );
}

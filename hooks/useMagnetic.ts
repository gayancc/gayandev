'use client';

import { useEffect, useRef } from 'react';

export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const reset = () => {
      node.style.transform = 'translate(0px, 0px)';
    };

    node.addEventListener('mousemove', handleMove);
    node.addEventListener('mouseleave', reset);

    return () => {
      node.removeEventListener('mousemove', handleMove);
      node.removeEventListener('mouseleave', reset);
    };
  }, [strength]);

  return ref;
}

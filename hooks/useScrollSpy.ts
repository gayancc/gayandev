'use client';

import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], offsetPx = 140) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    let ticking = false;

    const update = () => {
      const scrollPosition = window.scrollY + offsetPx;
      let current = elements[0];
      for (let i = elements.length - 1; i >= 0; i -= 1) {
        if (elements[i].offsetTop <= scrollPosition) {
          current = elements[i];
          break;
        }
      }
      if (current) {
        setActiveId((prev) => (prev === current.id ? prev : current.id));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offsetPx]);

  return activeId;
}

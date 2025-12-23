'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { BootLoader } from '@/components/BootLoader';
import { TransitionOverlay } from '@/components/TransitionOverlay';
import { profile } from '@/data/content';

interface SectionItem {
  id: string;
  label: string;
  node: React.ReactNode;
}

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 40 : -40,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -40 : 40,
    scale: 0.98,
  }),
};

export function FullPage({ sections }: { sections: SectionItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const scrollAreas = useRef<Record<string, HTMLDivElement | null>>({});
  const [booting, setBooting] = useState(true);
  const [transition, setTransition] = useState<{ phase: 'cover' | 'reveal' | null; label: string }>({
    phase: null,
    label: '',
  });

  const activeId = useMemo(() => sections[activeIndex]?.id ?? '', [sections, activeIndex]);

  const clampIndex = (nextIndex: number) =>
    Math.max(0, Math.min(sections.length - 1, nextIndex));

  const runTransition = (nextIndex: number) => {
    const clamped = clampIndex(nextIndex);
    if (clamped === activeIndex) return;
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDirection(clamped > activeIndex ? 1 : -1);
    const label = sections[clamped]?.label ?? '';
    setTransition({ phase: 'cover', label });

    window.setTimeout(() => {
      setActiveIndex(clamped);
      const nextId = sections[clamped]?.id ?? activeId;
      if (nextId) window.history.replaceState(null, '', `#${nextId}`);
      setTransition({ phase: 'reveal', label });
      window.requestAnimationFrame(() => {
        const scrollArea = scrollAreas.current[nextId];
        if (scrollArea) scrollArea.scrollTop = 0;
        window.dispatchEvent(new Event('resize'));
      });
    }, 420);

    window.setTimeout(() => {
      setTransition({ phase: null, label: '' });
      isAnimating.current = false;
    }, 900);
  };

  useEffect(() => {
    const initialHash = window.location.hash.replace('#', '');
    if (!initialHash) return;
    const matchIndex = sections.findIndex((section) => section.id === initialHash);
    if (matchIndex >= 0) {
      setActiveIndex(matchIndex);
    }
  }, [sections]);

  useEffect(() => {
    const onHashChange = () => {
      const nextHash = window.location.hash.replace('#', '');
      const matchIndex = sections.findIndex((section) => section.id === nextHash);
      if (matchIndex >= 0) {
        setActiveIndex(matchIndex);
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [sections]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const scrollArea = scrollAreas.current[activeId];
    if (scrollArea) scrollArea.scrollTop = 0;
  }, [activeId]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isAnimating.current || !sections.length || booting) return;

      const scrollArea = scrollAreas.current[activeId];
      if (scrollArea) {
        const atTop = scrollArea.scrollTop <= 0;
        const atBottom = scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 1;
        if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) {
          return;
        }
      }

      event.preventDefault();
      const nextIndex = event.deltaY > 0 ? activeIndex + 1 : activeIndex - 1;
      runTransition(nextIndex);
    };

    const handleKey = (event: KeyboardEvent) => {
      if (isAnimating.current || booting) return;
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        runTransition(activeIndex + 1);
      }
      if (['ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        runTransition(activeIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeId, activeIndex, sections]);

  return (
    <div className="relative h-screen overflow-hidden">
      <BootLoader title={profile.name} onDone={() => setBooting(false)} />
      <TransitionOverlay phase={transition.phase} label={transition.label} />
      <Navigation
        activeId={activeId}
        onNavigate={(id) => runTransition(sections.findIndex((s) => s.id === id))}
      />
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => {
          isAnimating.current = false;
        }}
      >
        <motion.section
          key={activeId}
          custom={direction}
          variants={SLIDE_VARIANTS}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (transition.phase === null) {
              isAnimating.current = false;
            }
          }}
          className="absolute inset-0"
        >
          <div
            ref={(el) => {
              scrollAreas.current[activeId] = el;
            }}
            className="h-full overflow-y-auto scrollbar-hide"
          >
            {sections[activeIndex]?.node}
          </div>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

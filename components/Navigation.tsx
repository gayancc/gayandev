'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { usePreferences } from './PreferencesProvider';
import { cn } from '@/lib/utils';
import { BrandName } from './BrandName';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation({
  activeId,
  onNavigate,
}: {
  activeId?: string;
  onNavigate?: (id: string) => void;
}) {
  const currentId = activeId ?? useScrollSpy(NAV_ITEMS.map((item) => item.id));
  const { toggleTheme, theme } = usePreferences();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2">
      <div className="glass flex items-center justify-between rounded-full px-6 py-3 shadow-glass">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <BrandName />
        </div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = currentId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  if (onNavigate) {
                    event.preventDefault();
                    onNavigate(item.id);
                  }
                }}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  isActive ? 'text-fg' : 'text-fg/60 hover:text-fg'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="neo flex h-9 w-9 items-center justify-center rounded-full border border-white/5 text-[10px] font-semibold text-fg/70 transition md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            Menu
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="neo flex h-9 w-9 items-center justify-center rounded-full border border-white/5 text-fg/70 transition hover:text-fg"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M21 14.5A9 9 0 0 1 9.5 3a7 7 0 1 0 11.5 11.5Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M12 2.5V5.5M12 18.5V21.5M21.5 12H18.5M5.5 12H2.5M18.7 5.3L16.6 7.4M7.4 16.6L5.3 18.7M18.7 18.7L16.6 16.6M7.4 7.4L5.3 5.3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mt-3 rounded-3xl p-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    setOpen(false);
                    if (onNavigate) {
                      event.preventDefault();
                      onNavigate(item.id);
                    }
                  }}
                  className="rounded-xl px-3 py-2 text-sm text-fg/80 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

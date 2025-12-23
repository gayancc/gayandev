'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

interface PreferencesContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
}

function createClickSound() {
  if (typeof window === 'undefined') return () => undefined;
  const AudioContextCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof window.AudioContext })
      .webkitAudioContext;
  if (!AudioContextCtor) return () => undefined;
  let ctx: AudioContext | null = null;

  return () => {
    if (!ctx) ctx = new AudioContextCtor();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = 420;
    gain.gain.value = 0.04;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    oscillator.stop(ctx.currentTime + 0.12);
  };
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const storedSound = window.localStorage.getItem('sound');
    const nextTheme = (storedTheme as ThemeMode) || 'light';
    const nextSound = storedSound ? storedSound === 'on' : true;

    setTheme(nextTheme);
    setSoundEnabled(nextSound);
    applyTheme(nextTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem('sound', soundEnabled ? 'on' : 'off');
  }, [soundEnabled]);

  const clickSound = useMemo(() => createClickSound(), []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      soundEnabled,
      toggleSound: () => setSoundEnabled((prev) => !prev),
      playClick: () => {
        if (soundEnabled) clickSound();
      },
    }),
    [theme, soundEnabled, clickSound]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used inside PreferencesProvider');
  }
  return context;
}

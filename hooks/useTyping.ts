'use client';

import { useEffect, useMemo, useState } from 'react';

interface TypingOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

export function useTyping({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseMs = 1600,
}: TypingOptions) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (safeWords.length === 0) return;
    const current = safeWords[index % safeWords.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, display.length + 1);
        setDisplay(next);
        if (next === current) {
          setIsDeleting(true);
        }
      } else {
        const next = current.slice(0, display.length - 1);
        setDisplay(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % safeWords.length);
        }
      }
    },
    isDeleting ? deleteSpeed : display === current ? pauseMs : typeSpeed);

    return () => clearTimeout(timeout);
  }, [safeWords, index, display, isDeleting, typeSpeed, deleteSpeed, pauseMs]);

  return display;
}

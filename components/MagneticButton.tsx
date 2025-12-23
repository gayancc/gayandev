'use client';

import { AnchorHTMLAttributes } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';
import { usePreferences } from './PreferencesProvider';

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: 'primary' | 'ghost';
  label: string;
}

export function MagneticButton({ href, variant = 'primary', label, ...props }: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.2);
  const { playClick } = usePreferences();

  return (
    <a
      href={href}
      ref={ref}
      onClick={playClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition',
        variant === 'primary'
          ? 'bg-accent text-black shadow-lg shadow-accent/30 hover:-translate-y-1'
          : 'border border-white/10 bg-card/60 text-fg hover:-translate-y-1'
      )}
      {...props}
    >
      {label}
    </a>
  );
}

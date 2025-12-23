import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './hooks/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        card: 'hsl(var(--card))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))',
        accent2: 'hsl(var(--accent-2))',
        muted: 'hsl(var(--muted))',
      },
      boxShadow: {
        glass: '0 12px 40px rgba(0, 0, 0, 0.25)',
        neo: '8px 8px 16px rgba(0,0,0,0.25), -8px -8px 16px rgba(255,255,255,0.05)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(59,130,246,0.35), transparent 55%)',
        'glass-gradient': 'linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(59,130,246,0.35)' },
          '50%': { boxShadow: '0 0 60px rgba(59,130,246,0.6)' },
        },
        'cursor-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        gradient: 'gradient 12s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        glow: 'glow 4s ease-in-out infinite',
        'cursor-pulse': 'cursor-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

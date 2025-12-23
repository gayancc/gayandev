'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { profile } from '@/data/content';
import { useEffect } from 'react';
import { useTyping } from '@/hooks/useTyping';
import { useParallax } from '@/hooks/useParallax';
import { MagneticButton } from './MagneticButton';
import { SocialLinks } from './SocialLinks';
import { SceneCanvas } from './SceneCanvas';
import { Particles } from './Particles';
import { FloatingOrbs } from './FloatingOrbs';
import { AnimatedSignature } from './AnimatedSignature';

export function Hero() {
  const typed = useTyping({
    words: ['Technical Lead', 'C# Developer'],
  });
  const { ref, y, opacity } = useParallax(100);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      window.setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen overflow-hidden pt-32">
      <div className="absolute inset-0 bg-hero-glow" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${profile.background})` }}
        aria-hidden="true"
      />
      <Particles className="absolute inset-0 h-full w-full" />
      <FloatingOrbs />
      <div className="noise" />

      <div className="relative mx-auto grid w-[92%] max-w-6xl items-center gap-12 pb-24 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-fg/60">Hello, I’m</p>
          <h1 className="font-display text-4xl md:text-6xl">
            <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="text-xl text-fg/70">
            <span className="font-semibold text-fg">{typed}</span>
            <span className="ml-2 inline-block h-5 w-0.5 animate-pulse bg-accent" />
          </p>
          <p className="max-w-xl text-fg/70">{profile.tagline}</p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href={profile.resumeUrl} label="Download CV" />
            <MagneticButton href="#contact" label="Contact Me" variant="ghost" />
          </div>
          <div className="text-accent/60">
            <AnimatedSignature />
          </div>
          <SocialLinks />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <motion.div
            style={{ y, opacity }}
            className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-accent/40 blur-2xl"
          />
          <div className="glass relative mx-auto h-[360px] w-[360px] overflow-hidden rounded-[36px] p-4 shadow-glass">
            <div className="absolute inset-0">
              <SceneCanvas />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 rounded-2xl bg-black/40 p-3 text-sm text-white/80 backdrop-blur">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMTExODI3Ii8+PC9zdmc+"
                  priority
                />
              </div>
              <div>
                <p className="text-white">{profile.name}</p>
                <p className="text-xs text-white/60">{profile.title}</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 h-28 w-28 rounded-full bg-accent/30 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
